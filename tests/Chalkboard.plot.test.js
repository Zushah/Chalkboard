/*
 * Chalkboard v3.1.0 Ricci - Plotting Namespace Tests
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import assert from "assert";
import cb from "@zushah/chalkboard";
const ctx = (() => {
    const calls = [];
    const ctx = {
        canvas: { width: 500, height: 500 },
        calls,
        lineWidth: 1,
        strokeStyle: "black",
        fillStyle: "white",
        save: () => calls.push("save"),
        restore: () => calls.push("restore"),
        translate: (...args) => calls.push(["translate", ...args]),
        beginPath: () => calls.push("beginPath"),
        closePath: () => calls.push("closePath"),
        moveTo: (...args) => calls.push(["moveTo", ...args]),
        lineTo: (...args) => calls.push(["lineTo", ...args]),
        stroke: () => calls.push("stroke"),
        fill: () => calls.push("fill"),
        fillRect: (...args) => calls.push(["fillRect", ...args]),
        strokeRect: (...args) => calls.push(["strokeRect", ...args]),
        ellipse: (...args) => calls.push(["ellipse", ...args]),
        arc: (...args) => calls.push(["arc", ...args])
    };
    return ctx;
})();
globalThis.__ChalkboardPlotContext = ctx;
cb.CONTEXT = "globalThis.__ChalkboardPlotContext";

// plot.xyplane, plot.rOplane
{
    cb.plot.xyplane({ x: 150, y: 100, size: 100, strokeStyle: "black", lineWidth: 2, context: ctx });
    cb.plot.rOplane({ x: 150, y: 100, size: 100, strokeStyle: "black", lineWidth: 2, context: ctx });
    assert.ok(ctx.calls.includes("beginPath"));
    assert.ok(ctx.calls.includes("stroke"));
}

// plot.vect, plot.comp, plot.matr
{
    assert.deepStrictEqual(cb.plot.vect(cb.vect.init(3, 4), { x: 150, y: 100, size: 100, strokeStyle: "black", lineWidth: 2, context: ctx }), [[3], [4]]);
    assert.deepStrictEqual(cb.plot.comp(cb.comp.init(1, -2), { x: 150, y: 100, size: 100, fillStyle: "black", lineWidth: 5, context: ctx }), [[1], [-2]]);
    assert.deepStrictEqual(cb.plot.matr(cb.matr.init([1, 0], [0, 1]), { x: 150, y: 100, size: 100, strokeStyle: "black", lineWidth: 2, domain: [0, 0], context: ctx }), [[1, 0], [0, 1]]);
}

// plot.definition, plot.dfdx, plot.d2fdx2, plot.fxdx
{
    assert.deepStrictEqual(cb.plot.definition(cb.real.define((x) => 0), { x: 150, y: 100, size: 100, strokeStyle: "black", lineWidth: 2, domain: [-1, 1], res: 1, isInverse: false, isPolar: false, context: ctx }), [[-1, 0], [0, 0], [1, 0]]);
    assert.deepStrictEqual(cb.plot.dfdx(cb.real.define((x) => x*x), { x: 150, y: 100, size: 100, strokeStyle: "black", lineWidth: 2, domain: [2, 2], res: 1, isInverse: false, context: ctx }), [[ 2, 4.000000330961484 ] ])
    assert.deepStrictEqual(cb.plot.d2fdx2(cb.real.define((x) => x*x), { x: 150, y: 100, size: 100, strokeStyle: "black", lineWidth: 2, domain: [2, 2], res: 1, isInverse: false, context: ctx }), [[2, 2.0000001654807416]]);
    assert.deepStrictEqual(cb.plot.fxdx(cb.real.define((x) => x*x), { x: 150, y: 100, size: 100, strokeStyle: "black", lineWidth: 2, domain: [1, 1], res: 1000, isInverse: false, context: ctx }), [[1, 0.3333333333333333]]);
}

// plot.Fourier, plot.Laplace, plot.Taylor
{
    assert.deepStrictEqual(cb.plot.Fourier(cb.real.define((x) => 0), { x: 150, y: 100, size: 100, strokeStyle: "black", lineWidth: 2, domain: [0, 0], res: 1, context: ctx }), [[0, 0]]);
    assert.deepStrictEqual(cb.plot.Laplace(cb.real.define((x) => 0), { x: 150, y: 100, size: 100, strokeStyle: "black", lineWidth: 2, domain: [1, 1], res: 1000, context: ctx }), [[1, 0]]);
    assert.deepStrictEqual(cb.plot.Taylor(cb.real.define((x) => x*x), 2, 0, { x: 150, y: 100, size: 100, strokeStyle: "black", lineWidth: 2, domain: [2, 2], res: 1, context: ctx }), [[2, 8.000000002]]);
}

// plot.convolution, plot.correlation, plot.autocorrelation
{
    assert.deepStrictEqual(cb.plot.convolution(cb.real.define((x) => 0), cb.real.define((x) => 0), { x: 150, y: 100, size: 100, strokeStyle: "black", lineWidth: 2, domain: [0, 0], res: 1000, context: ctx }), [[0, 0]]);
    assert.deepStrictEqual(cb.plot.correlation(cb.real.define((x) => 0), cb.real.define((x) => 0), { x: 150, y: 100, size: 100, strokeStyle: "black", lineWidth: 2, domain: [0, 0], res: 1000, context: ctx }), [[0, 0]]);
    assert.deepStrictEqual(cb.plot.autocorrelation(cb.real.define((x) => 0), { x: 150, y: 100, size: 100, strokeStyle: "black", lineWidth: 2, domain: [0, 0], res: 1000, context: ctx }), [[0, 0]]);
}

// plot.field
{
    assert.deepStrictEqual(cb.plot.field(cb.real.define([(x, y) => 1, (x, y) => 0]), { x: 150, y: 100, size: 100, strokeStyle: "black", lineWidth: 2, domain: [[-1, 1], [-1, 1]], res: 1, context: ctx }), [[0, -1], [0, 0], [0, 1], [1, -1], [1, 0],  [1, 1], [2, -1], [2, 0], [2, 1]]);
}

// plot.barplot, plot.lineplot, plot.scatterplot
{
    assert.deepStrictEqual(cb.plot.barplot([1, 2, 2, 3, 4], [1, 2, 3, 4], { x: 150, y: 100, size: 100, fillStyle: "white", strokeStyle: "black", lineWidth: 1, context: ctx }), [[1, 2, 2], [3], [4]]);
    assert.deepStrictEqual(cb.plot.lineplot([1, 2, 2, 3, 4], [1, 2, 3, 4], { x: 150, y: 100, size: 100, strokeStyle: "black", lineWidth: 1, context: ctx }), [[1, 2, 2], [3], [4]]);
    assert.deepStrictEqual(cb.plot.scatterplot([1, 2], [3, 4], { x: 150, y: 100, size: 100, fillStyle: "black", lineWidth: 2, context: ctx }), [[1, 3], [2, 4]]);
}

// plot.ode, plot.pde
{
    assert.deepStrictEqual(cb.plot.ode({ t: [0, 1, 2], y: [[0], [1], [4]] }, { x: 150, y: 100, size: 100, strokeStyle: "black", lineWidth: 2, isPhase: false, context: ctx }), [[0, 0], [1, 1], [2, 4]]);
    assert.deepStrictEqual(cb.plot.pde({ t: [0, 1], y: [[0, 0, 0, 0, 0, 0], [0, 1, 2, 3, 4, 5]], grid: { x: [0, 1, 2] } }, { x: 150, y: 100, size: 100, strokeStyle: "black", lineWidth: 2, context: ctx }), [[0, 0], [1, 1], [2, 2]]);
    assert.deepStrictEqual(cb.plot.pde({ t: [0, 1], y: [[0, 0, 0, 0, 0, 0], [0, 1, 2, 3, 4, 5]], grid: { x: [0, 1, 2] } }, { x: 150, y: 100, size: 100, strokeStyle: "black", lineWidth: 2, time: 0.5, component: 1, context: ctx }), [[0, 1.5], [1, 2], [2, 2.5]]);
    assert.deepStrictEqual(cb.plot.pde({ t: [0], y: [[0, 1, 2, 3]], grid: { x: [0, 1], y: [0, 1] } }, { x: 150, y: 100, size: 100, context: ctx }), [[0, 1], [2, 3]]);
}

// plot.colormap, plot.colorpalette, plot.colorpaletteConfig, plot.barplot, plot.definition, plot.field, plot.ode, plot.pde, plot.scatterplot
{
    const rec = { canvas: { width: 500, height: 500 }, calls: [], lines: [], rects: [] };
    for (const name of ["save", "restore", "translate", "beginPath", "moveTo", "ellipse", "strokeRect"]) rec[name] = () => {};
    rec.lineTo = (...args) => rec.lines.push(args);
    rec.stroke = () => rec.calls.push(rec.strokeStyle);
    rec.fill = () => rec.calls.push(rec.fillStyle);
    rec.fillRect = (...args) => { rec.calls.push(rec.fillStyle); rec.rects.push(args); };
    const run = (draw) => { rec.calls.length = 0; rec.lines.length = 0; rec.rects.length = 0; const result = draw(); return [result, rec.calls.slice()]; };

    assert.strictEqual(cb.plot.colormap("viridis", 0), "rgb(68, 1, 84)");
    assert.strictEqual(cb.plot.colormap("viridis", 1), "rgb(253, 231, 37)");
    assert.strictEqual(cb.plot.colormap("viridis", 5, [0, 10], 0.5), "rgba(33, 144, 141, 0.5)");
    assert.strictEqual(cb.plot.colormap("grayscale", 2), "rgb(255, 255, 255)");
    assert.strictEqual(cb.plot.colormap("hsv", 0.25), "rgb(128, 255, 0)");
    assert.strictEqual(cb.plot.colormap(["#000000", "rgb(255, 0, 0)"], 0.5), "rgb(128, 0, 0)");
    assert.strictEqual(cb.plot.colorpalette("tab10", 0), "rgb(31, 119, 180)");
    assert.strictEqual(cb.plot.colorpalette("tab10", 10), "rgb(31, 119, 180)");
    assert.strictEqual(cb.plot.colorpalette("chartjs", 0, 0.5), "rgba(54, 162, 235, 0.5)");
    assert.strictEqual(cb.plot.colorpalette("okabeito", 1), "rgb(230, 159, 0)");
    assert.throws(() => cb.plot.colormap("rainbow", 0));
    assert.throws(() => cb.plot.colormap(["red", "blue"], 0));

    const f = cb.real.define((x) => x), g = cb.real.define((x) => -x);
    const draw = (config) => run(() => {
        cb.plot.definition(f, Object.assign({ context: rec, domain: [0, 1], res: 50 }, config));
        cb.plot.definition(g, { context: rec, domain: [0, 1], res: 50 });
    })[1];
    assert.deepStrictEqual(draw(), ["black", "black"]);
    cb.plot.colorpaletteConfig("tab10");
    assert.deepStrictEqual(draw(), ["rgb(31, 119, 180)", "rgb(255, 127, 14)"]);
    assert.deepStrictEqual(draw(), ["rgb(31, 119, 180)", "rgb(255, 127, 14)"]);
    assert.deepStrictEqual(draw({ strokeStyle: "red" }), ["red", "rgb(255, 127, 14)"]);
    cb.plot.colorpaletteConfig("okabeito", [g, f]);
    assert.deepStrictEqual(draw(), ["rgb(230, 159, 0)", "rgb(0, 0, 0)"]);
    cb.plot.colorpaletteConfig("tab10");
    const sol = { t: [0, 1], y: [[1, 2, 3], [1, 2, 3]] };
    assert.deepStrictEqual(run(() => {
        cb.plot.ode(sol, { context: rec, i: 0 });
        cb.plot.ode(sol, { context: rec, i: 2 });
        cb.plot.barplot([1, 2], [0, 1, 2], { context: rec });
    })[1], ["rgb(31, 119, 180)", "rgb(44, 160, 44)", "rgba(214, 39, 40, 0.5)", "rgba(214, 39, 40, 0.5)"]);
    cb.plot.colorpaletteConfig(null);
    assert.deepStrictEqual(draw(), ["black", "black"]);

    const line = cb.real.define((x) => x);
    assert.deepStrictEqual(run(() => cb.plot.definition(line, { context: rec, size: 100, domain: [0, 2], res: 1, colormap: "grayscale" })), [[[0, 0], [1, 1], [2, 2]], ["rgb(64, 64, 64)", "rgb(191, 191, 191)"]]);
    assert.deepStrictEqual(run(() => cb.plot.definition(line, { context: rec, size: 100, domain: [0, 2], res: 1, colormap: "grayscale", colorby: "x", colorrange: [0, 4] }))[1], ["rgb(32, 32, 32)", "rgb(96, 96, 96)"]);
    assert.deepStrictEqual(run(() => cb.plot.scatterplot([0, 1, 2], [0, 1, 2], { context: rec, size: 100, colormap: "grayscale" }))[1], ["rgb(0, 0, 0)", "rgb(128, 128, 128)", "rgb(255, 255, 255)"]);
    assert.deepStrictEqual(run(() => cb.plot.ode({ t: [0, 1, 2], y: [[0], [1], [4]] }, { context: rec, size: 100, colormap: "grayscale" })), [[[0, 0], [1, 1], [2, 4]], ["rgb(64, 64, 64)", "rgb(191, 191, 191)"]]);
    const sol1 = { t: [0, 1], y: [[0, 0, 0, 0, 0, 0], [0, 1, 2, 3, 4, 5]], grid: { x: [0, 1, 2] } };
    assert.deepStrictEqual(run(() => cb.plot.pde(sol1, { context: rec, size: 100, colormap: "grayscale" }))[1], ["rgb(64, 64, 64)", "rgb(191, 191, 191)"]);
    const sol2 = { t: [0], y: [[0, 1, 2, 3]], grid: { x: [0, 1], y: [0, 1] } };
    assert.deepStrictEqual(run(() => cb.plot.pde(sol2, { context: rec, size: 100, colormap: "grayscale" }))[1], ["rgb(0, 0, 0)", "rgb(85, 85, 85)", "rgb(170, 170, 170)", "rgb(255, 255, 255)"]);
    assert.deepStrictEqual(rec.rects[0], [-0.5, -0.5, 2, 2]);
    assert.deepStrictEqual(rec.rects[2], [-0.5, -1.5, 2, 2]);
    assert.strictEqual(run(() => cb.plot.pde(sol2, { context: rec, size: 100 }))[1][0], "rgb(68, 1, 84)");

    const rotation = cb.real.define([(x, y) => -y, (x, y) => x]);
    assert.deepStrictEqual(run(() => cb.plot.field(rotation, { context: rec, size: 100, domain: [[1, 1], [0, 0]], res: 1 }))[0], [[1, -1]]);
    assert.deepStrictEqual(rec.lines, [[1, -1]]);

    const z = cb.comp.define((a, b) => a, (a, b) => b);
    const tiles = (config) => run(() => cb.plot.definition(z, Object.assign({ context: rec, size: 100, domain: [[-1, 1], [-1, 1]], res: 1 }, config)))[1];
    const both = tiles();
    assert.strictEqual(both.length, 9);
    assert.strictEqual(both[3], "rgb(128, 255, 0)");
    assert.strictEqual(both[4], "rgb(0, 0, 0)");
    assert.strictEqual(both[7], "rgb(255, 0, 0)");
    assert.strictEqual(both[6], "rgb(255, 205, 55)");
    assert.strictEqual(tiles({ colorby: "argument" })[6], "rgb(255, 191, 0)");
    assert.strictEqual(tiles({ colorby: "magnitude", colormap: "grayscale" })[7], "rgb(180, 180, 180)");
    const inverse = cb.comp.define((a, b) => a / (a * a + b * b), (a, b) => -b / (a * a + b * b));
    assert.strictEqual(run(() => cb.plot.definition(inverse, { context: rec, size: 100, domain: [[-1, 1], [-1, 1]], res: 1 }))[1][4], "rgb(255, 255, 255)");
}
