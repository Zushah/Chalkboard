/*
    Chalkboard
    Version 3.0.2 Euler
    Released April 13th, 2026
    Authored by Zushah: https://www.github.com/Zushah
    Example Program: ODE Solver Error vs. Step Size Study
*/
/*
    This program benchmarks Chalkboard's fixed-step ODE solvers on standard initial-value problems with known exact solutions.
    For each method and step count, it solves the same system, measures trajectory and endpoint errors on the solver's native
    time grid, and estimates observed convergence rates from the error-vs-step-size data. The full results can be exported as
    JSON or CSV. The goal is to show that Chalkboard can not only generate solutions and plots in the browser, but also that
    it can support computational experiments of the kind expected in research software.
*/

const cb = Chalkboard;

/*

    BROWSER SETUP AND PAGE LAYOUT

*/

const ensureCanvas = () => {
    let element = document.getElementById("canvas");
    if (element instanceof HTMLCanvasElement) return element;
    element = document.createElement("canvas");
    element.id = "canvas";
    document.body.appendChild(element);
    return element;
};

const ensureLayout = () => {
    document.body.style.margin = "0";
    document.body.style.background = "rgb(250, 240, 230)";
    document.body.style.color = "black";
    document.body.style.fontFamily = "serif";
    const controls = document.createElement("div");
    controls.style.display = "flex";
    controls.style.flexWrap = "wrap";
    controls.style.gap = "10px";
    controls.style.padding = "16px 16px 8px 16px";
    controls.style.alignItems = "center";
    controls.style.justifyContent = "center";
    controls.style.margin = "0 auto";
    const notes = document.createElement("div");
    notes.style.padding = "0 16px 12px 16px";
    notes.style.lineHeight = "1.4";
    notes.style.maxWidth = "1500px";
    notes.style.margin = "0 auto";
    notes.textContent = `
        This program benchmarks Chalkboard's fixed-step ODE solvers on standard initial-value problems with known exact solutions.
        For each method and step count, it solves the same system, measures trajectory and endpoint errors on the solver's native
        time grid, and estimates observed convergence rates from the error-vs-step-size data. The full results can be exported as
        JSON or CSV. The goal is to show that Chalkboard can not only generate solutions and plots in the browser, but also that
        it can support computational experiments of the kind expected in research software.`;
    const canvas = ensureCanvas();
    canvas.style.display = "block";
    canvas.style.width = "100%";
    canvas.style.maxWidth = "1600px";
    canvas.style.margin = "0 auto";
    const summary = document.createElement("pre");
    summary.style.padding = "12px 16px 16px 16px";
    summary.style.whiteSpace = "pre-wrap";
    summary.style.fontSize = "15px";
    summary.style.lineHeight = "1.45";
    summary.style.maxWidth = "1600px";
    summary.style.margin = "0 auto";
    document.body.appendChild(controls);
    document.body.appendChild(notes);
    document.body.appendChild(canvas);
    document.body.appendChild(summary);
    return { controls, notes, canvas, summary };
};

const elements = ensureLayout();
const canvas = elements.canvas;
const ctx = canvas.getContext("2d");
if (!ctx) throw new Error("Unable to acquire a 2D canvas context.");

/*

    EXPERIMENT CONFIGURATION AND SOLVER MENU

*/

const STUDY_ID = "ode-study";
const STUDY_TITLE = "Ordinary Differential Equations: Solver Error vs. Step Size Study";
const DEFAULT_METRIC = "trajectoryMaxL2";
const METRIC_OPTIONS = [
    { id: "trajectoryMaxL2", label: "Worst Trajectory Error" },
    { id: "trajectoryMeanL2", label: "Average Trajectory Error" },
    { id: "trajectoryRmseL2", label: "Typical Trajectory Error" }
];

const FIXED_STEPS = [32, 64, 128, 256, 512, 1024, 2048, 4096];
const METHODS = [
    { id: "euler", label: "Euler", color: "rgb(200, 100, 100)", theoreticalOrder: 1, mode: "fixed" },
    { id: "midpoint", label: "Midpoint", color: "rgb(100, 100, 200)", theoreticalOrder: 2, mode: "fixed" },
    { id: "heun", label: "Heun", color: "rgb(100, 200, 100)", theoreticalOrder: 2, mode: "fixed" },
    { id: "ralston", label: "Ralston", color: "rgb(200, 150, 100)", theoreticalOrder: 2, mode: "fixed" },
    { id: "rk4", label: "Runge-Kutta", color: "rgb(175, 100, 200)", theoreticalOrder: 4, mode: "fixed" }
];

const METHOD_INDEX = {};
for (let i = 0; i < METHODS.length; i++) METHOD_INDEX[METHODS[i].id] = i;

/*

    BENCHMARK ODE SYSTEMS AND EXACT REFERENCE SOLUTIONS

*/

const SYSTEMS = [
    (() => {
        const lambda = -1.35;
        const y0 = 1.25;
        const t0 = 0;
        const t1 = 6;
        return {
            id: "exponential-decay",
            name: "Exponential Decay",
            equation: "y' = λy",
            exactSummary: "y(t) = y₀exp(λ(t - t₀))",
            components: ["y"],
            focusComponent: 0,
            t0,
            t1,
            y0,
            ode: cb.diff.exponential(lambda),
            exactState: (t) => [y0 * Math.exp(lambda * (t - t0))],
            parameters: { lambda, y0 }
        };
    })(),
    (() => {
        const r = 1.1;
        const K = 9.0;
        const y0 = 0.65;
        const t0 = 0;
        const t1 = 8;
        const ratio = (K - y0) / y0;
        return {
            id: "logistic-growth",
            name: "Logistic Growth",
            equation: "y' = ry(1 - y / K)",
            exactSummary: "y(t) = K / (1 + ((K - y₀) / y₀)exp(-r(t - t₀)))",
            components: ["y"],
            focusComponent: 0,
            t0,
            t1,
            y0,
            ode: cb.diff.logistic(r, K),
            exactState: (t) => [K / (1 + ratio * Math.exp(-r * (t - t0)))],
            parameters: { r, K, y0 }
        };
    })(),
    (() => {
        const omega = 2.4;
        const y0 = 1.1;
        const dy0 = -0.35;
        const t0 = 0;
        const t1 = 5.1;
        return {
            id: "harmonic-oscillator",
            name: "Harmonic Oscillator",
            equation: "y'' + ω²y = 0",
            exactSummary: "y(t) = y₀cos(ωτ) + (dy₀ / ω)sin(ωτ)",
            components: ["y", "dy"],
            focusComponent: 0,
            t0,
            t1,
            y0: { y0, dy0 },
            ode: cb.diff.harmonic(omega),
            exactState: (t) => {
                const tau = t - t0, c = Math.cos(omega * tau), s = Math.sin(omega * tau);
                return [y0 * c + (dy0 / omega) * s, -y0 * omega * s + dy0 * c];
            },
            parameters: { omega, y0, dy0 }
        };
    })()
];

const SYSTEM_BY_ID = {};
for (let i = 0; i < SYSTEMS.length; i++) SYSTEM_BY_ID[SYSTEMS[i].id] = SYSTEMS[i];

/*

    GENERIC FORMATTING AND EXPORTING HELPERS

*/

const formatNumber = (value, digits = 5) => {
    if (typeof value !== "number" || !Number.isFinite(value)) return "n/a";
    const abs = Math.abs(value);
    if ((abs >= 10000 || (abs < 0.001 && abs !== 0))) return value.toExponential(Math.max(1, digits - 1));
    return value.toFixed(digits);
};

const formatShort = (value) => {
    if (typeof value !== "number" || !Number.isFinite(value)) return "n/a";
    const abs = Math.abs(value);
    if ((abs >= 1000 || (abs < 0.01 && abs !== 0))) return value.toExponential(2);
    return value.toFixed(3);
};

const csvEscape = (value) => {
    const text = value == null ? "" : String(value);
    if (text.indexOf(",") >= 0 || text.indexOf("\"") >= 0 || text.indexOf("\n") >= 0) return "\"" + text.replace(/\"/g, "\"\"") + "\"";
    return text;
};

const downloadText = (filename, text, mimeType) => {
    const blob = new Blob([text], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};

const makeKey = (row) => row.systemId + ":" + row.method + ":" + row.configurationLabel;

const downsample = (arr, maxPoints) => {
    if (arr.length <= maxPoints) return arr.slice();
    const result = [];
    const stride = (arr.length - 1) / (maxPoints - 1);
    for (let i = 0; i < maxPoints; i++) result.push(arr[Math.round(i * stride)]);
    return result;
};

/*

    CHALKBOARD-BASED ERROR METRICS AND CONVERGENCE ANALYSIS

*/

const solutionCache = {};

const computeMetrics = (sol, system) => {
    const sampleL2 = [];
    const componentErrors = [];
    let linfMaxAbs = 0;
    for (let i = 0; i < sol.t.length; i++) {
        const exact = system.exactState(sol.t[i]);
        const diff = cb.stat.add(sol.y[i], cb.stat.negate(exact));
        const absDiff = cb.stat.absolute(diff);
        componentErrors.push(absDiff[system.focusComponent]);
        sampleL2.push(cb.stat.norm(diff, "L2"));
        linfMaxAbs = Math.max(linfMaxAbs, cb.stat.max(absDiff));
    }
    const endpointExact = system.exactState(sol.t[sol.t.length - 1]);
    const endpointDiff = cb.stat.add(sol.y[sol.y.length - 1], cb.stat.negate(endpointExact));
    const endpointAbs = cb.stat.absolute(endpointDiff);
    const sampleSquares = [];
    for (let i = 0; i < sampleL2.length; i++) sampleSquares.push(sampleL2[i] * sampleL2[i]);
    return {
        endpointAbs,
        endpointMaxAbs: cb.stat.max(endpointAbs),
        endpointL2: cb.stat.norm(endpointDiff, "L2"),
        linfMaxAbs,
        trajectoryMaxL2: cb.stat.max(sampleL2),
        trajectoryMeanL2: cb.stat.mean(sampleL2),
        trajectoryRmseL2: cb.real.sqrt(cb.stat.mean(sampleSquares)),
        componentFocusMaxAbs: cb.stat.max(componentErrors),
        componentFocusMeanAbs: cb.stat.mean(componentErrors),
        componentFocusErrors: componentErrors
    };
};

const meanStepSize = (sol) => {
    const steps = [];
    for (let i = 1; i < sol.t.length; i++) steps.push(sol.t[i] - sol.t[i - 1]);
    return cb.stat.mean(cb.stat.absolute(steps));
};

const buildOrderFit = (rows, metricKey) => {
    const data = [];
    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const error = row.metrics[metricKey];
        if (!(row.hEffective > 0) || !(error > 0)) continue;
        data.push([cb.real.ln(row.hEffective), cb.real.ln(error)]);
    }
    if (data.length < 2) return null;
    const fit = cb.stat.regression(data, "linear");
    return {
        slope: fit.rule(1) - fit.rule(0),
        intercept: fit.rule(0),
        points: data.length
    };
};

/*

    CHALKBOARD SOLVER SWEEP AND MACHINE-READABLE DATASET CONSTRUCTION

*/

const runStudy = () => {
    for (const key in solutionCache) delete solutionCache[key];
    const rows = [];
    for (let s = 0; s < SYSTEMS.length; s++) {
        const system = SYSTEMS[s];
        const duration = system.t1 - system.t0;
        for (let m = 0; m < METHODS.length; m++) {
            const method = METHODS[m];
            const stepsList = FIXED_STEPS;
            for (let j = 0; j < stepsList.length; j++) {
                const steps = stepsList[j];
                const started = performance.now();
                try {
                    const sol = cb.diff.solve(system.ode, {
                        t0: system.t0,
                        t1: system.t1,
                        steps,
                        y0: system.y0,
                        method: method.id
                    });
                    const metrics = computeMetrics(sol, system);
                    const residual = cb.diff.error(sol, system.ode, "L2");
                    const key = system.id + ":" + method.id + ":steps-" + steps;
                    solutionCache[key] = { sol, system, method };
                    rows.push({
                        studyId: STUDY_ID,
                        systemId: system.id,
                        systemName: system.name,
                        method: method.id,
                        methodLabel: method.label,
                        solverMode: method.mode,
                        theoreticalOrder: method.theoreticalOrder,
                        configurationLabel: "steps=" + steps,
                        steps,
                        rtol: null,
                        atol: null,
                        hEffective: duration / steps,
                        samples: sol.t.length,
                        runtimeMs: performance.now() - started,
                        status: "ok",
                        metrics,
                        residualRmse: residual.rmse,
                        residualMax: residual.max,
                        key
                    });
                } catch (error) {
                    rows.push({
                        studyId: STUDY_ID,
                        systemId: system.id,
                        systemName: system.name,
                        method: method.id,
                        methodLabel: method.label,
                        solverMode: method.mode,
                        theoreticalOrder: method.theoreticalOrder,
                        configurationLabel: "steps=" + steps,
                        steps,
                        rtol: null,
                        atol: null,
                        hEffective: duration / steps,
                        samples: steps + 1,
                        runtimeMs: performance.now() - started,
                        status: "failed",
                        metrics: null,
                        residualRmse: NaN,
                        residualMax: NaN,
                        key: "",
                        message: error instanceof Error ? error.message : String(error)
                    });
                }
            }
        }
    }
    const summaries = [];
    for (let s = 0; s < SYSTEMS.length; s++) {
        const system = SYSTEMS[s];
        const systemRows = rows.filter((row) => row.systemId === system.id && row.status === "ok");
        const methods = [];
        for (let m = 0; m < METHODS.length; m++) {
            const method = METHODS[m];
            const methodRows = systemRows
                .filter((row) => row.method === method.id)
                .sort((a, b) => a.hEffective - b.hEffective);
            methods.push({
                method: method.id,
                methodLabel: method.label,
                theoreticalOrder: method.theoreticalOrder,
                fit: buildOrderFit(methodRows, DEFAULT_METRIC),
                best: methodRows.length > 0 ? methodRows[0] : null
            });
        }
        summaries.push({
            systemId: system.id,
            systemName: system.name,
            equation: system.equation,
            exactSummary: system.exactSummary,
            methods
        });
    }
    const dataset = {
        studyId: STUDY_ID,
        title: STUDY_TITLE,
        generatedAt: new Date().toISOString(),
        chalkboard: {
            version: cb.VERSION,
            alias: cb.VERSIONALIAS
        },
        environment: {
            userAgent: navigator.userAgent,
            language: navigator.language,
            url: window.location.href
        },
        configuration: {
            mainMetric: DEFAULT_METRIC,
            fixedSteps: FIXED_STEPS.slice(),
            note: "Errors are evaluated on each solver's native time grid."
        },
        systems: SYSTEMS.map((system) => ({
            id: system.id,
            name: system.name,
            equation: system.equation,
            exactSummary: system.exactSummary,
            components: system.components.slice(),
            t0: system.t0,
            t1: system.t1,
            y0: system.y0,
            parameters: system.parameters
        })),
        rows,
        summaries
    };
    window.CHALKBOARD_ODE_STEP_STUDY = dataset;
    return dataset;
};

/*

    DATASET EXPORTING AND RUN-SELECTION HELPERS

*/

const datasetToCSV = (dataset) => {
    const fitMap = {};
    for (let i = 0; i < dataset.summaries.length; i++) {
        const summary = dataset.summaries[i];
        fitMap[summary.systemId] = {};
        for (let j = 0; j < summary.methods.length; j++) {
            fitMap[summary.systemId][summary.methods[j].method] = summary.methods[j].fit;
        }
    }
    const header = [
        "generated_at", "chalkboard_version", "chalkboard_alias", "system_id", "system_name",
        "method", "solver_mode", "configuration_label", "theoretical_order", "observed_order",
        "h_effective", "steps", "rtol", "atol", "samples", "runtime_ms", "status",
        "endpoint_max_abs", "endpoint_l2", "linf_max_abs", "trajectory_max_l2", "trajectory_mean_l2",
        "trajectory_rmse_l2", "focus_component_max_abs", "focus_component_mean_abs", "residual_rmse", "residual_max"
    ];
    const lines = [header.join(",")];
    for (let i = 0; i < dataset.rows.length; i++) {
        const row = dataset.rows[i];
        const fit = fitMap[row.systemId][row.method];
        const metrics = row.metrics || {};
        lines.push([
            dataset.generatedAt,
            dataset.chalkboard.version,
            dataset.chalkboard.alias,
            row.systemId,
            row.systemName,
            row.method,
            row.solverMode,
            row.configurationLabel,
            row.theoreticalOrder,
            fit ? fit.slope : "",
            row.hEffective,
            row.steps,
            row.rtol,
            row.atol,
            row.samples,
            row.runtimeMs,
            row.status,
            metrics.endpointMaxAbs,
            metrics.endpointL2,
            metrics.linfMaxAbs,
            metrics.trajectoryMaxL2,
            metrics.trajectoryMeanL2,
            metrics.trajectoryRmseL2,
            metrics.componentFocusMaxAbs,
            metrics.componentFocusMeanAbs,
            row.residualRmse,
            row.residualMax
        ].map(csvEscape).join(","));
    }
    return lines.join("\n");
};

const rowsForSystem = (dataset, systemId) => dataset.rows.filter((row) => row.systemId === systemId && row.status === "ok");

const rowsForFocus = (dataset, systemId) => rowsForSystem(dataset, systemId).sort((a, b) => {
    const methodDelta = METHOD_INDEX[a.method] - METHOD_INDEX[b.method];
    if (methodDelta !== 0) return methodDelta;
    return b.hEffective - a.hEffective;
});

const buildSystemSummary = (dataset, systemId, metricKey) => {
    const systemRows = rowsForSystem(dataset, systemId);
    const methods = [];
    for (let i = 0; i < METHODS.length; i++) {
        const method = METHODS[i];
        const methodRows = systemRows
            .filter((row) => row.method === method.id)
            .sort((a, b) => a.hEffective - b.hEffective);
        methods.push({
            method: method.id,
            methodLabel: method.label,
            theoreticalOrder: method.theoreticalOrder,
            fit: buildOrderFit(methodRows, metricKey),
            finest: methodRows.length > 0 ? methodRows[0] : null
        });
    }
    return { systemId, methods };
};

/*

    CANVAS LAYOUT CONSTANTS AND PLOTTING NORMALIZATION

*/

const getLayout = () => {
    const width = Math.max(380, window.innerWidth - 20);
    const oneColumn = width < 980;
    const topHeight = 410;
    const gap = 18;
    const smallHeight = 300;
    const height = oneColumn ? 1120 : 820;
    return { width, height, topHeight, gap, smallHeight, oneColumn };
};

const resizeCanvas = (layout) => {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.floor(layout.width * dpr);
    canvas.height = Math.floor(layout.height * dpr);
    canvas.style.width = layout.width + "px";
    canvas.style.height = layout.height + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
};

const TEXT_LAYOUT = {
    frameTitleX: 14,
    frameTitleY: 24,
    frameSubtitleY: 42,
    convergenceLegendY: 62,
    convergenceLeftPad: 64,
    convergenceRightPad: 24,
    convergenceTopPad: 96,
    convergenceBottomPad: 70,
    lowerPlotTop: 54,
    lowerPlotBottom: 70,
    xLabelYPad: 26,
    yLabelX: 24
};

const drawFrameBox = (box, title, subtitle) => {
    ctx.fillStyle = "rgb(255, 252, 245)";
    ctx.strokeStyle = "rgb(186, 180, 169)";
    ctx.lineWidth = 1;
    ctx.fillRect(box.x, box.y, box.width, box.height);
    ctx.strokeRect(box.x, box.y, box.width, box.height);
    ctx.fillStyle = "rgb(28, 28, 28)";
    ctx.font = "bold 18px Times New Roman";
    ctx.fillText(title, box.x + TEXT_LAYOUT.frameTitleX, box.y + TEXT_LAYOUT.frameTitleY);
    if (subtitle) {
        ctx.font = "14px Times New Roman";
        ctx.fillStyle = "rgb(72, 72, 72)";
        ctx.fillText(subtitle, box.x + TEXT_LAYOUT.frameTitleX, box.y + TEXT_LAYOUT.frameSubtitleY);
    }
};

const normalizeSeries = (xs, ys, width, height, xMin, xMax, yMin, yMax) => {
    const xUnits = [];
    const yUnits = [];
    for (let i = 0; i < xs.length; i++) {
        xUnits.push(((xs[i] - xMin) / (xMax - xMin || 1)) * width);
        yUnits.push(((ys[i] - yMin) / (yMax - yMin || 1)) * height);
    }
    return { sol: { t: xUnits, y: yUnits.map((value) => [value]) }, xUnits, yUnits };
};

/*

    CHALKBOARD PLOTTING ADAPTERS FOR NORMALIZED CANVAS DATA

*/

const plotSeries = (normalized, origin, color, lineWidth) => {
    cb.plot.ode(normalized.sol, {
        x: origin.x,
        y: origin.y,
        size: 100,
        strokeStyle: color,
        lineWidth,
        context: ctx
    });
};

const plotScatterSeries = (normalized, origin, color, pointRadius = 3) => {
    cb.plot.scatterplot(normalized.xUnits, normalized.yUnits, {
        x: origin.x,
        y: origin.y,
        size: 100,
        fillStyle: color,
        lineWidth: pointRadius,
        context: ctx
    });
};

/*

    CONVERGENCE CHART RENDERING

*/

const drawConvergenceChart = (dataset, systemId, metricKey, focusRow, now, box) => {
    const system = SYSTEM_BY_ID[systemId];
    const summary = buildSystemSummary(dataset, systemId, metricKey);
    const systemRows = rowsForSystem(dataset, systemId);
    drawFrameBox(box, system.name, "Equation: " + system.equation + ".\n Metric: " + metricKey + ".");
    const plot = {
        x: box.x + TEXT_LAYOUT.convergenceLeftPad,
        y: box.y + TEXT_LAYOUT.convergenceTopPad,
        width: box.width - TEXT_LAYOUT.convergenceLeftPad - TEXT_LAYOUT.convergenceRightPad,
        height: box.height - TEXT_LAYOUT.convergenceTopPad - TEXT_LAYOUT.convergenceBottomPad
    };
    const xLogs = [];
    const yLogs = [];
    for (let i = 0; i < systemRows.length; i++) {
        xLogs.push(cb.real.log10(systemRows[i].hEffective));
        yLogs.push(cb.real.log10(Math.max(systemRows[i].metrics[metricKey], Number.MIN_VALUE)));
    }
    const xMin = cb.stat.min(xLogs);
    const xMax = cb.stat.max(xLogs);
    const yMin = cb.stat.min(yLogs) - 0.1;
    const yMax = cb.stat.max(yLogs) + 0.1;
    ctx.strokeStyle = "rgb(226, 220, 210)";
    ctx.fillStyle = "rgb(90, 84, 76)";
    ctx.font = "12px Times New Roman";
    for (let i = 0; i < FIXED_STEPS.length; i++) {
        const h = (system.t1 - system.t0) / FIXED_STEPS[i];
        const x = plot.x + ((cb.real.log10(h) - xMin) / (xMax - xMin || 1)) * plot.width;
        ctx.beginPath();
        ctx.moveTo(x, plot.y);
        ctx.lineTo(x, plot.y + plot.height);
        ctx.stroke();
        if (plot.width >= 520 || i % 2 === 0 || i === FIXED_STEPS.length - 1) ctx.fillText(formatShort(h), x - 14, plot.y + plot.height + TEXT_LAYOUT.xLabelYPad - 6);
    }
    for (let p = Math.ceil(yMin); p <= Math.floor(yMax); p++) {
        const y = plot.y + plot.height - ((p - yMin) / (yMax - yMin || 1)) * plot.height;
        ctx.beginPath();
        ctx.moveTo(plot.x, y);
        ctx.lineTo(plot.x + plot.width, y);
        ctx.stroke();
        ctx.fillText((10 ** p).toExponential(0), box.x + 25, y + 5);
    }
    ctx.strokeStyle = "rgb(52, 52, 52)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(plot.x, plot.y);
    ctx.lineTo(plot.x, plot.y + plot.height);
    ctx.lineTo(plot.x + plot.width, plot.y + plot.height);
    ctx.stroke();
    const pulse = 1 + 0.35 * cb.trig.sin(now / 250);
    for (let i = 0; i < METHODS.length; i++) {
        const method = METHODS[i];
        const methodRows = systemRows.filter((row) => row.method === method.id).sort((a, b) => a.hEffective - b.hEffective);
        if (methodRows.length === 0) continue;
        const xs = methodRows.map((row) => cb.real.log10(row.hEffective));
        const ys = methodRows.map((row) => cb.real.log10(Math.max(row.metrics[metricKey], Number.MIN_VALUE)));
        const normalized = normalizeSeries(xs, ys, plot.width - 8, plot.height - 8, xMin, xMax, yMin, yMax);
        const origin = { x: plot.x + 4, y: plot.y + plot.height - 4 };
        plotSeries(normalized, origin, method.color, 2.2);
        plotScatterSeries(normalized, origin, method.color, focusRow.method === method.id ? 6 : 3);
        for (let j = 0; j < methodRows.length; j++) {
            if (methodRows[j].key === focusRow.key) {
                const hx = origin.x + normalized.xUnits[j];
                const hy = origin.y - normalized.yUnits[j];
                ctx.strokeStyle = method.color;
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.arc(hx, hy, 7 * pulse, 0, cb.PI(2));
                ctx.stroke();
            }
        }
    }
    let legendX = plot.x + 6;
    let legendY = box.y + TEXT_LAYOUT.convergenceLegendY;
    const legendRight = plot.x + plot.width - 10;
    for (let i = 0; i < summary.methods.length; i++) {
        const methodSummary = summary.methods[i];
        const method = METHODS[METHOD_INDEX[methodSummary.method]];
        const legendLabel = methodSummary.methodLabel + " (expected=" + methodSummary.theoreticalOrder + ", " + (methodSummary.fit ? "observed≈" + formatShort(methodSummary.fit.slope) : "p=undefined") + ")";
        ctx.font = "12px Times New Roman";
        const itemWidth = 12 + ctx.measureText(legendLabel).width;
        if (legendX + itemWidth > legendRight) {
            legendX = plot.x + 6;
            legendY += 16;
        }
        ctx.fillStyle = method.color;
        ctx.fillRect(legendX, legendY - 8, 12, 8);
        ctx.fillStyle = "rgb(28, 28, 28)";
        ctx.fillText(legendLabel, legendX + 18, legendY);
        legendX += itemWidth + 18;
    }
    ctx.fillStyle = "rgb(32, 32, 32)";
    ctx.font = "14px Times New Roman";
    ctx.fillText("Effective Step Size", plot.x + plot.width / 2 - 50, box.y + box.height - 18);
    ctx.save();
    ctx.translate(box.x + TEXT_LAYOUT.yLabelX - 5, plot.y + plot.height / 2 + 70);
    ctx.rotate(-cb.PI(1/2));
    ctx.fillText("Error Calculated by Metric", 0, 0);
    ctx.restore();
};

/*

    FOCUSED-RUN RENDERING AND LOCAL DIAGNOSTICS

*/

const drawSolutionPanel = (cacheEntry, focusRow, box) => {
    if (!cacheEntry) return;
    const system = cacheEntry.system;
    const sol = cacheEntry.sol;
    const component = system.focusComponent;
    drawFrameBox(box, "Focused Run",
        focusRow.methodLabel + " method, " +
        focusRow.configurationLabel +
        ", samples=" + focusRow.samples
    );
    const plot = { x: box.x + 16, y: box.y + TEXT_LAYOUT.lowerPlotTop, width: box.width - 32, height: box.height - TEXT_LAYOUT.lowerPlotBottom };
    ctx.strokeStyle = "rgb(198, 191, 179)";
    ctx.strokeRect(plot.x, plot.y, plot.width, plot.height);
    const duration = system.t1 - system.t0;
    const sampleTimes = cb.stat.array(0, duration, 220);
    const exactValues = [];
    const approxValues = [];
    for (let i = 0; i < sampleTimes.length; i++) {
        const t = system.t0 + sampleTimes[i];
        exactValues.push(system.exactState(t)[component]);
        approxValues.push(cb.diff.at(sol, t)[component]);
    }
    const yMin = Math.min(cb.stat.min(exactValues), cb.stat.min(approxValues));
    const yMax = Math.max(cb.stat.max(exactValues), cb.stat.max(approxValues));
    const pad = Math.max(1e-6, (yMax - yMin) * 0.08);
    const exactNorm = normalizeSeries(sampleTimes, exactValues, plot.width - 8, plot.height - 8, 0, duration, yMin - pad, yMax + pad);
    const approxNorm = normalizeSeries(sampleTimes, approxValues, plot.width - 8, plot.height - 8, 0, duration, yMin - pad, yMax + pad);
    const origin = { x: plot.x + 4, y: plot.y + plot.height - 4 };
    plotSeries(exactNorm, origin, "rgb(36, 36, 36)", 2.4);
    plotSeries(approxNorm, origin, METHODS[METHOD_INDEX[focusRow.method]].color, 2);
    plotScatterSeries({ xUnits: downsample(approxNorm.xUnits, 24), yUnits: downsample(approxNorm.yUnits, 24) }, origin, METHODS[METHOD_INDEX[focusRow.method]].color, 2.4);
    if (yMin <= 0 && 0 <= yMax) {
        const zeroNorm = ((0 - (yMin - pad)) / ((yMax + pad) - (yMin - pad) || 1)) * (plot.height - 8);
        ctx.strokeStyle = "rgb(226, 220, 210)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(plot.x + 4, origin.y - zeroNorm);
        ctx.lineTo(plot.x + plot.width - 4, origin.y - zeroNorm);
        ctx.stroke();
    }
    ctx.fillStyle = "rgb(45, 45, 45)";
    ctx.font = "12px Times New Roman";
    ctx.fillText("black = exact, colored = calculated, component = " + system.components[component], plot.x, box.y + box.height - 5);
};

const drawErrorInset = (focusRow, box) => {
    const errors = focusRow.metrics.componentFocusErrors;
    drawFrameBox(box, "Focused Error Diagnostic",
        "Largest error = " + formatNumber(focusRow.metrics.componentFocusMaxAbs, 3) +
        ", average error = " + formatNumber(focusRow.metrics.componentFocusMeanAbs, 3) +
        ", endpoint error = " + formatNumber(focusRow.metrics.endpointL2, 3) +
        ", typical trajectory error = " + formatNumber(focusRow.metrics.trajectoryRmseL2, 3)
    );
    const plotBox = { x: box.x + 16, y: box.y + TEXT_LAYOUT.lowerPlotTop, width: box.width - 32, height: box.height - TEXT_LAYOUT.lowerPlotBottom };
    ctx.strokeStyle = "rgb(198, 191, 179)";
    ctx.strokeRect(plotBox.x, plotBox.y, plotBox.width, plotBox.height);
    const errorTimes = cb.stat.array(0, 1, errors.length);
    const maxError = Math.max(1e-12, cb.stat.max(errors));
    const errorNorm = normalizeSeries(errorTimes, errors, plotBox.width - 8, plotBox.height - 8, 0, 1, 0, maxError * 1.08);
    const origin = { x: plotBox.x + 4, y: plotBox.y + plotBox.height - 4 };
    const methodColor = METHODS[METHOD_INDEX[focusRow.method]].color;
    plotSeries(errorNorm, origin, methodColor, 2);
    plotScatterSeries({ xUnits: downsample(errorNorm.xUnits, 28), yUnits: downsample(errorNorm.yUnits, 28) }, origin, methodColor, 2.2);
    ctx.fillStyle = "rgb(55, 55, 55)";
    ctx.font = "12px Times New Roman";
    ctx.fillText("pointwise absolute error on the solver time grid", box.x + 16, box.y + box.height - 5);
};

/*

    SUMMARY TEXT GENERATION

*/

const buildSummaryText = (dataset, systemId, metricKey, focusRow) => {
    const system = SYSTEM_BY_ID[systemId];
    const summary = buildSystemSummary(dataset, systemId, metricKey);
    const lines = [];
    lines.push("SUMMARY");
    lines.push(system.name + " Equation: " + system.equation);
    lines.push("Exact Solution: " + system.exactSummary);
    lines.push("Main Metric: " + metricKey + "");
    lines.push("Focused Run: " + focusRow.methodLabel + ", " + focusRow.configurationLabel + ", stepsize≈" + formatNumber(focusRow.hEffective, 4));
    lines.push("");
    for (let i = 0; i < summary.methods.length; i++) {
        const method = summary.methods[i];
        const fitText = method.fit ? formatShort(method.fit.slope) : "n/a";
        lines.push(
            method.methodLabel.padEnd(11, " ") +
            " | expected=" + method.theoreticalOrder +
            " | observed=" + fitText +
            (method.finest ? " | finest=" + formatNumber(method.finest.metrics[metricKey], 4) : "")
        );
    }
    return lines.join("\n");
};

/*

    INTERACTIVE CONTROLS AND INITIAL STATE

*/

const currentState = {
    dataset: null,
    systemId: SYSTEMS[0].id,
    metricKey: DEFAULT_METRIC,
    focusRows: [],
    focusIndex: 0,
    playing: true,
    intervalId: null
};

const systemSelect = document.createElement("select");
for (let i = 0; i < SYSTEMS.length; i++) {
    const option = document.createElement("option");
    option.value = SYSTEMS[i].id;
    option.textContent = SYSTEMS[i].name;
    systemSelect.appendChild(option);
}

const metricSelect = document.createElement("select");
for (let i = 0; i < METRIC_OPTIONS.length; i++) {
    const option = document.createElement("option");
    option.value = METRIC_OPTIONS[i].id;
    option.textContent = METRIC_OPTIONS[i].label;
    metricSelect.appendChild(option);
}

const makeButton = (label, handler) => {
    const button = document.createElement("button");
    button.textContent = label;
    button.style.padding = "8px 12px";
    button.style.border = "1px solid rgb(120, 120, 120)";
    button.style.background = "rgb(255, 250, 245)";
    button.style.cursor = "pointer";
    button.style.font = "14px \"Times New Roman\", Times, serif";
    button.addEventListener("click", handler);
    return button;
};

const playButton = makeButton("Pause", () => {
    currentState.playing = !currentState.playing;
    playButton.textContent = currentState.playing ? "Pause" : "Play";
});

const stepFocus = (delta) => {
    if (currentState.focusRows.length === 0) return;
    currentState.focusIndex = (currentState.focusIndex + delta + currentState.focusRows.length) % currentState.focusRows.length;
};

systemSelect.value = currentState.systemId;
metricSelect.value = currentState.metricKey;
elements.controls.appendChild(systemSelect);
elements.controls.appendChild(metricSelect);
elements.controls.appendChild(playButton);
elements.controls.appendChild(makeButton("Prev", () => stepFocus(-1)));
elements.controls.appendChild(makeButton("Next", () => stepFocus(1)));
elements.controls.appendChild(makeButton("Download JSON", () => {
    if (!currentState.dataset) return;
    downloadText(STUDY_ID + ".json", JSON.stringify(currentState.dataset, null, 2), "application/json");
}));
elements.controls.appendChild(makeButton("Download CSV", () => {
    if (!currentState.dataset) return;
    downloadText(STUDY_ID + ".csv", datasetToCSV(currentState.dataset), "text/csv");
}));
const refreshFocusRows = () => {
    if (!currentState.dataset) {
        currentState.focusRows = [];
        currentState.focusIndex = 0;
        return;
    }
    currentState.focusRows = rowsForFocus(currentState.dataset, currentState.systemId);
    currentState.focusIndex = 0;
};
systemSelect.addEventListener("change", () => {
    currentState.systemId = systemSelect.value;
    refreshFocusRows();
});
metricSelect.addEventListener("change", () => {
    currentState.metricKey = metricSelect.value;
});

/*

    MAIN RENDER LOOP

*/

const main = (now = 0) => {
    if (!currentState.dataset || currentState.focusRows.length === 0) {
        requestAnimationFrame(main);
        return;
    }
    const layout = getLayout();
    resizeCanvas(layout);
    ctx.fillStyle = "rgb(250, 240, 230)";
    ctx.fillRect(0, 0, layout.width, layout.height);
    ctx.fillStyle = "black";
    ctx.font = "bold 30px Times New Roman";
    ctx.fillText(STUDY_TITLE, 18, 40);
    const topBox = { x: 14, y: 86, width: layout.width - 28, height: layout.topHeight };
    const focusRow = currentState.focusRows[currentState.focusIndex];
    drawConvergenceChart(currentState.dataset, currentState.systemId, currentState.metricKey, focusRow, now, topBox);
    if (layout.oneColumn) {
        const solutionBox = { x: 14, y: topBox.y + topBox.height + layout.gap, width: layout.width - 28, height: layout.smallHeight };
        const errorBox = { x: 14, y: solutionBox.y + solutionBox.height + layout.gap, width: layout.width - 28, height: layout.smallHeight - 10 };
        drawSolutionPanel(solutionCache[focusRow.key], focusRow, solutionBox);
        drawErrorInset(focusRow, errorBox);
    } else {
        const lowerY = topBox.y + topBox.height + layout.gap;
        const lowerWidth = (layout.width - 14 * 2 - layout.gap) / 2;
        const solutionBox = { x: 14, y: lowerY, width: lowerWidth, height: layout.smallHeight };
        const errorBox = { x: 14 + lowerWidth + layout.gap, y: lowerY, width: lowerWidth, height: layout.smallHeight };
        drawSolutionPanel(solutionCache[focusRow.key], focusRow, solutionBox);
        drawErrorInset(focusRow, errorBox);
    }
    elements.summary.textContent = buildSummaryText(currentState.dataset, currentState.systemId, currentState.metricKey, focusRow);
    requestAnimationFrame(main);
};

const startAnimation = () => {
    if (currentState.intervalId) clearInterval(currentState.intervalId);
    currentState.intervalId = window.setInterval(() => {
        if (currentState.playing) stepFocus(1);
    }, 1400);
};

currentState.dataset = runStudy();
refreshFocusRows();
startAnimation();
requestAnimationFrame(main);

window.addEventListener("resize", () => requestAnimationFrame(main));
window.CHALKBOARD_ODE_STEP_STUDY_EXPORT_CSV = () => currentState.dataset ? datasetToCSV(currentState.dataset) : "";
window.CHALKBOARD_ODE_STEP_STUDY_RERUN = () => {
    currentState.dataset = runStudy();
    refreshFocusRows();
};
