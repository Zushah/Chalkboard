/*
    Chalkboard
    Version 3.0.0 Euler
    Released March 2nd, 2026
    Authored by Zushah: https://www.github.com/Zushah
    Test: Differential Equations Namespace
*/

import assert from "assert";
import cb from "../dist/Chalkboard.js";

// diff.init
{
    const ode = cb.diff.init((t, y) => -y);
    assert.strictEqual(ode.order, 1);
    assert.strictEqual(ode.dimension, 1);
    assert.deepStrictEqual(ode.rule(0, [2]), [-2]);
}

// diff.closestIndex, diff.component, diff.toScalarSeries
{
    const sol = { t: [0, 1, 2, 3], y: [[0, 10], [1, 11], [2, 12], [3, 13]] };
    assert.strictEqual(cb.diff.closestIndex(sol.t, 1.6), 2);
    assert.deepStrictEqual(cb.diff.component(sol, 0), [0, 1, 2, 3]);
    assert.deepStrictEqual(cb.diff.component(sol, 1), [10, 11, 12, 13]);
    const s0 = cb.diff.toScalarSeries(sol);
    assert.deepStrictEqual(sol.t, [0, 1, 2, 3]);
    assert.deepStrictEqual(s0, [0, 1, 2, 3]);
}

// diff.at, diff.sample
{
    const sol = { t: [0, 1, 2, 3], y: [[0, 10], [1, 11], [2, 12], [3, 13]] };
    assert.deepStrictEqual(cb.diff.at(sol, 1.5), [1.5, 11.5]);
    assert.deepStrictEqual(cb.diff.sample(sol, [0, 1.5, 3]), [[0, 10], [1.5, 11.5], [3, 13]]);
}

// diff.derivative, diff.phase
{
    const sol = { t: [0, 1, 2], y: [[0, 0], [1, 1], [2, 0]] };
    assert.deepStrictEqual(cb.diff.derivative(sol), [[1, 1], [1, 0], [1, -1]]);
    assert.deepStrictEqual(cb.diff.phase(sol, 0, 1), [[0, 0], [1, 1], [2, 0]]);
}

// diff.separable, diff.linear1, diff.linear2, diff.exponential, diff.logistic, diff.Gompertz, diff.Bernoulli
{
    assert.deepStrictEqual(cb.diff.separable((t) => 2, (y) => y).rule(1, [3]), [6]);
    assert.deepStrictEqual(cb.diff.linear1(2, (t) => 1).rule(0, [3]), [7]);
    assert.deepStrictEqual(cb.diff.linear2(1, 2, 3).rule(0, [4, 5]), [5, 16]);
    assert.deepStrictEqual(cb.diff.exponential(3).rule(0, [2]), [6]);
    assert.ok(Math.abs(cb.diff.logistic(1, 10).rule(0, [5])[0] - 2.5) < 1e-12);
    assert.ok(Math.abs(cb.diff.Gompertz(1, 10).rule(0, [5])[0] - (5 * Math.log(2))) < 1e-12);
    assert.deepStrictEqual(cb.diff.Bernoulli(1, (t) => 1, 2).rule(0, [2]), [2]);
}

// diff.harmonic, diff.harmonicDamped, diff.harmonicForced, diff.Duffing, diff.massSpringDamper, diff.pendulum, diff.pendulumDrag, diff.pendulumDriven
{
    assert.deepStrictEqual(cb.diff.harmonic(2).rule(0, [3, 4]), [4, -12]);
    assert.deepStrictEqual(cb.diff.harmonicDamped(2, 0.5).rule(0, [3, 4]), [4, -20]);
    assert.deepStrictEqual(cb.diff.harmonicForced(2, 0.2, (t) => 1).rule(0, [3, 4]), [4, -14.2]);
    assert.deepStrictEqual(cb.diff.Duffing(1, 1, 0, 0, 1).rule(0, [2, 3]), [3, -5]);
    assert.deepStrictEqual(cb.diff.massSpringDamper(2, 4, 1, (t) => 0).rule(0, [3, 5]), [5, -11.5]);
    assert.deepStrictEqual(cb.diff.pendulum(2, 10).rule(0, [cb.PI(1/2), 0]), [0, -9.81]);
    assert.deepStrictEqual(cb.diff.pendulumDrag(2, 10, 0.1).rule(0, [cb.PI(1/2), 10]), [10, -9.81]);
    assert.deepStrictEqual(cb.diff.pendulumDriven(2, 10, 1, 0).rule(0, [cb.PI(1/2), 0]), [0, 9]);
}

// diff.BesselI, diff.BesselJ, diff.Kepler2D, diff.Kepler3D, diff.Lorenz, diff.LotkaVolterra, diff.SEIR, diff.SIR, diff.SIS
{
    assert.deepStrictEqual(cb.diff.BesselI(0).rule(1, [1, 0]), [0, 1]);
    assert.deepStrictEqual(cb.diff.BesselJ(0).rule(1, [1, 0]), [0, -1]);
    assert.deepStrictEqual(cb.diff.Kepler2D(1).rule(0, [1, 0, 0, 1]), [0, 1, -1, -0]);
    assert.deepStrictEqual(cb.diff.Kepler3D(1).rule(0, [1, 0, 0, 0, 1, 0]), [0, 1, 0, -1, -0, -0]);
    assert.deepStrictEqual(cb.diff.Lorenz(10, 28, 8 / 3).rule(0, [1, 1, 1]), [0, 26, -1.6666666666666665]);
    assert.deepStrictEqual(cb.diff.LotkaVolterra(1, 0.1, 0.1, 1).rule(0, [10, 5]), [5, 49.5]);
    assert.deepStrictEqual(cb.diff.SEIR(1, 2, 3, 100).rule(0, [90, 5, 5, 0]), [-450, 440, -5, 15]);
    assert.deepStrictEqual(cb.diff.SIR(1, 0.5, 100).rule(0, [90, 10, 0]), [-900, 895, 5]);
    assert.deepStrictEqual(cb.diff.SIS(1, 0.5, 100).rule(0, [90]), [-8055]);
}

// diff.solve, diff.solveAdaptive, diff.error
{
    const ode = cb.diff.exponential(1);
    const sol = cb.diff.solve(ode, { t0: 0, t1: 1, y0: 1, steps: 200, method: "rk4" });
    const yEnd = sol.y[sol.y.length - 1][0];
    assert.ok(Math.abs(yEnd - Math.E) < 1e-4);

    const solObj = cb.diff.solve(ode, { t0: 0, t1: 1, y0: { y: 1 }, steps: 50, method: "rk4", returnObject: true });
    assert.strictEqual(solObj.yObj[0].y, 1);
    assert.ok(Math.abs(solObj.yObj[solObj.yObj.length - 1].y - solObj.y[solObj.y.length - 1][0]) < 1e-12);

    const solRK45 = cb.diff.solveAdaptive(ode, { t0: 0, t1: 1, y0: 1, h0: 0.1, tol: 1e-6 });
    const yEndA = solRK45.y[solRK45.y.length - 1][0];
    assert.ok(Math.abs(yEndA - Math.E) < 1e-4);

    const err = cb.diff.error(sol, ode, "LInfinity");
    assert.ok(Number.isFinite(err.max));
    assert.ok(err.max < 1);
}
