/*
    Chalkboard
    Version 3.0.2 Euler
    Released April 13th, 2026
    Authored by Zushah: https://www.github.com/Zushah
    Test: Plotting Namespace
*/

import assert from "assert";
import cb from "../dist/Chalkboard.js";
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

// plot.ode
{
    assert.deepStrictEqual(cb.plot.ode({ t: [0, 1, 2], y: [[0], [1], [4]] }, { x: 150, y: 100, size: 100, strokeStyle: "black", lineWidth: 2, isPhase: false, context: ctx }), [[0, 0], [1, 1], [2, 4]]);
}
