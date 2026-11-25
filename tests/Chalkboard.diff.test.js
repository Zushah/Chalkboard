/*
 * Chalkboard v3.1.0 Ricci - Differential Equations Namespace Tests
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import assert from "assert";
import cb from "@zushah/chalkboard";

// diff.init
{
    const ode = cb.diff.init((t, y) => -y);
    assert.strictEqual(ode.order, 1);
    assert.strictEqual(ode.dimension, 1);
    assert.deepStrictEqual(ode.rule(0, [2]), [-2]);
    const pde = cb.diff.init((t, x, u, ux, uxx) => uxx, { dimension: 1 });
    assert.strictEqual(pde.type, "pde");
    assert.strictEqual(pde.order, 1);
    assert.strictEqual(pde.dimension, 1);
    assert.strictEqual(pde.components, 1);
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
    const sol1 = { t: [0, 1, 2, 3], y: [[0, 10], [1, 11], [2, 12], [3, 13]] };
    assert.deepStrictEqual(cb.diff.at(sol1, 1.5), [1.5, 11.5]);
    assert.deepStrictEqual(cb.diff.sample(sol1, [0, 1.5, 3]), [[0, 10], [1.5, 11.5], [3, 13]]);
    const sol2 = { t: [3, 2, 1, 0], y: [[3, 13], [2, 12], [1, 11], [0, 10]] };
    assert.deepStrictEqual(cb.diff.at(sol2, 1.5), [1.5, 11.5]);
    assert.deepStrictEqual(cb.diff.sample(sol2, [0, 1.5, 3]), [[0, 10], [1.5, 11.5], [3, 13]]);
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
    assert.deepStrictEqual(cb.diff.pendulum({ L: 2, g: 10 }).rule(0, [cb.PI(1/2), 0]), [0, -5]);
    assert.deepStrictEqual(cb.diff.pendulumDrag({ L: 2, g: 10, c: 0.1 }).rule(0, [cb.PI(1/2), 10]), [10, -15]);
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

// diff.advection, diff.advectionDiffusion, diff.heat, diff.Laplace, diff.Poisson, diff.wave
{
    assert.strictEqual(cb.diff.heat(2).rule(0, 0, 1, 2, 3), 6);
    assert.strictEqual(cb.diff.heat(2, 2).rule(0, 0, 0, 1, 2, 3, 4, 5), 18);
    assert.strictEqual(cb.diff.wave(2, 0.5).rule(0, 0, 1, 2, 3, 4), 10);
    assert.strictEqual(cb.diff.wave(2, 0.5, 2).rule(0, 0, 0, 1, 2, 3, 4, 5, 6, 4), 34);
    assert.strictEqual(cb.diff.advection(2).rule(0, 0, 1, 3, 5), -6);
    assert.strictEqual(cb.diff.advection([1, 0.5], 2).rule(0, 0, 0, 0, 2, 4), -4);
    assert.strictEqual(cb.diff.advectionDiffusion(2, 0.5).rule(0, 0, 1, 3, 4), -4);
    assert.strictEqual(cb.diff.advectionDiffusion([1, 0.5], 0.5, 2).rule(0, 0, 0, 0, 2, 4, 6, 8), 3);
    assert.strictEqual(cb.diff.Laplace().rule(0, 0, 1, 2, 3), 3);
    assert.strictEqual(cb.diff.Laplace(2).rule(0, 0, 0, 1, 2, 3, 4, 5), 9);
    assert.strictEqual(cb.diff.Poisson(-2).rule(0, 0.5, 1, 2, 3), 5);
    assert.strictEqual(cb.diff.Poisson((x, y) => x * y, 2).rule(0, 2, 3, 0, 0, 0, 1, 1), -4);
    assert.deepStrictEqual([cb.diff.heat(), cb.diff.wave(), cb.diff.advection(), cb.diff.advectionDiffusion(), cb.diff.Laplace(), cb.diff.Poisson()].map((pde) => pde.order), [1, 2, 1, 1, 0, 0]);
}

// diff.solve, diff.solveAdaptive, diff.error, diff.snapshot
{
    const final = (sol) => sol.y[sol.y.length - 1];
    const maxError = (sol, time, exact, component = 0) => {
        const u = cb.diff.snapshot(sol, time, component), x = sol.grid.x, y = sol.grid.y;
        let result = 0;
        if (!y) for (let i = 0; i < x.length; i++) result = Math.max(result, Math.abs(u[i] - exact(x[i])));
        else for (let j = 0; j < y.length; j++) for (let i = 0; i < x.length; i++) result = Math.max(result, Math.abs(u[j][i] - exact(x[i], y[j])));
        return result;
    };
    const sinpi = (x) => Math.sin(Math.PI * x);
    const square = (n) => ({ x: [0, 1], y: [0, 1], nx: n, ny: n });
    const fixed1 = { left: 0, right: 0 }, fixed2 = { left: 0, right: 0, bottom: 0, top: 0 };
    const flux = (value) => ({ type: "neumann", value });
    const heat = cb.diff.init((t, x, u, ux, uxx) => uxx, { dimension: 1 });
    const heatExact = (x) => Math.exp(-Math.PI * Math.PI * 0.1) * sinpi(x);
    const heat2 = cb.diff.init((t, x, y, u, ux, uy, uxx, uyy) => uxx + uyy, { dimension: 2 });
    const wave = cb.diff.init((t, x, u, ux, uxx, ut) => uxx, { dimension: 1, order: 2 });
    const ring = { y0: { u: (x) => Math.sin(2 * Math.PI * x), ut: () => 0 }, grid: { x: [0, 1], nx: 200 }, boundary: "periodic" };

    const ode = cb.diff.exponential(1);
    const solRK4 = cb.diff.solve(ode, { t0: 0, t1: 1, y0: 1, steps: 200, method: "rk4" });
    assert.ok(Math.abs(final(solRK4)[0] - Math.E) < 1e-4);
    const residual = cb.diff.error(solRK4, ode, "LInfinity");
    assert.ok(Number.isFinite(residual.max));
    assert.ok(residual.max < 1);
    const solObj = cb.diff.solve(ode, { t0: 0, t1: 1, y0: { y: 1 }, steps: 50, method: "rk4", returnObject: true });
    assert.strictEqual(solObj.yObj[0].y, 1);
    assert.ok(Math.abs(solObj.yObj[solObj.yObj.length - 1].y - final(solObj)[0]) < 1e-12);
    const solFrames = cb.diff.solve(ode, { t1: 1, y0: 1, steps: 100, frames: 11 });
    assert.strictEqual(solFrames.t.length, 11);
    assert.strictEqual(solFrames.t[10], 1);
    const solRK45 = cb.diff.solveAdaptive(ode, { t0: 0, t1: 1, y0: 1, h0: 0.1, rtol: 1e-6 });
    assert.ok(Math.abs(final(solRK45)[0] - Math.E) < 1e-4);
    const solClamped = cb.diff.solveAdaptive(ode, { t0: 0, t1: 1, y0: 1, h0: 0.3, hMin: 0.3, hMax: 0.3, rtol: 1, atol: 1 });
    assert.strictEqual(solClamped.t[solClamped.t.length - 1], 1);

    const solHeat = cb.diff.solve(heat, { t1: 0.1, h: 0.4 * 0.02 * 0.02, y0: sinpi, grid: { x: [0, 1], nx: 51 }, boundary: fixed1 });
    assert.strictEqual(solHeat.t.length, 101);
    assert.strictEqual(solHeat.t[100], 0.1);
    assert.strictEqual(solHeat.grid.x.length, 51);
    assert.ok(maxError(solHeat, 0.1, heatExact) < 2e-4);
    const solHeatAdaptive = cb.diff.solveAdaptive(heat, { t1: 0.1, y0: sinpi, grid: { x: [0, 1], nx: 51 }, boundary: fixed1 });
    assert.ok(maxError(solHeatAdaptive, 0.1, heatExact) < 2e-4);
    const solInsulated = cb.diff.solve(heat, { t1: 0.05, h: 0.4 * 0.01 * 0.01, y0: (x) => Math.exp(-100 * (x - 0.3) * (x - 0.3)), grid: { x: [0, 1], nx: 101 }, boundary: { left: flux(0), right: flux(0) } });
    const mass = (u) => 0.01 * (u.reduce((s, v) => s + v, 0) - (u[0] + u[u.length - 1]) / 2);
    assert.ok(Math.abs(mass(final(solInsulated)) - mass(solInsulated.y[0])) < 1e-12);
    const solWave = cb.diff.solve(wave, Object.assign({ t1: 1, h: 0.5 / 200 }, ring));
    assert.strictEqual(solWave.y[0].length, 400);
    assert.ok(maxError(solWave, 1, (x) => Math.sin(2 * Math.PI * x)) < 1e-6);
    const pair = cb.diff.init((t, x, u, ux, uxx) => [uxx[0], 0.5 * uxx[1]], { dimension: 1, components: 2 });
    const solPair = cb.diff.solve(pair, { t1: 0.1, h: 0.4 * 0.02 * 0.02, y0: (x) => [sinpi(x), sinpi(x)], grid: { x: [0, 1], nx: 51 }, boundary: { left: [0, 0], right: 0 } });
    assert.ok(maxError(solPair, 0.1, (x) => Math.exp(-0.5 * Math.PI * Math.PI * 0.1) * sinpi(x), 1) < 2e-4);

    const solHeat2 = cb.diff.solve(heat2, { t1: 0.05, h: 0.2 / (30 * 30), y0: (x, y) => sinpi(x) * sinpi(y), grid: square(31), boundary: fixed2 });
    const U = cb.diff.snapshot(solHeat2, 0.05);
    assert.strictEqual(U.length, 31);
    assert.strictEqual(U[0].length, 31);
    assert.ok(maxError(solHeat2, 0.05, (x, y) => Math.exp(-2 * Math.PI * Math.PI * 0.05) * sinpi(x) * sinpi(y)) < 5e-4);
    const mixed = cb.diff.init((t, x, y, u, ux, uy, uxx, uyy, uxy) => uxx + uyy + uxy, { dimension: 2 });
    const quadratic = (x, y, t) => x * x + y * y + x * y + 5 * t;
    const solMixed = cb.diff.solve(mixed, { t1: 0.1, h: 0.002, y0: (x, y) => quadratic(x, y, 0), grid: square(11), boundary: { left: flux((t, y) => -y), right: flux((t, y) => 2 + y), bottom: flux((t, x) => -x), top: flux((t, x) => 2 + x) } });
    assert.ok(maxError(solMixed, 0.1, (x, y) => quadratic(x, y, 0.1)) < 1e-9);
    const solCorner = cb.diff.solve(heat2, { t1: 0.001, steps: 1, y0: () => 0, grid: square(5), boundary: { left: 0, right: 0, bottom: 0, top: 1 } });
    assert.deepStrictEqual(cb.diff.snapshot(solCorner, 0)[4], [0.5, 1, 1, 1, 0.5]);

    const implicit = { t1: 0.1, y0: sinpi, grid: { x: [0, 1], nx: 201 }, boundary: fixed1 };
    assert.ok(maxError(cb.diff.solve(heat, Object.assign({ steps: 10, method: "backwardeuler" }, implicit)), 0.1, heatExact) < 2.5e-2);
    assert.ok(maxError(cb.diff.solve(heat, Object.assign({ steps: 10, method: "cranknicolson" }, implicit)), 0.1, heatExact) < 5e-4);
    assert.ok(maxError(cb.diff.solve(heat, Object.assign({ steps: 20, method: "bdf2" }, implicit)), 0.1, heatExact) < 6e-4);
    const solPulse = cb.diff.solve(heat, { t1: 0.05, steps: 5, method: "bdf2", y0: (x) => (x > 0.4 && x < 0.6 ? 1 : 0), grid: { x: [0, 1], nx: 201 }, boundary: fixed1 });
    assert.ok(Math.min(...final(solPulse)) > -1e-12);
    const solWaveCN = cb.diff.solve(wave, Object.assign({ t1: 1, steps: 100, method: "cranknicolson" }, ring));
    assert.ok(Math.abs(Math.max(...cb.diff.snapshot(solWaveCN, 1)) - 1) < 1e-3);
    const stiff = cb.diff.init((t, y) => [-1000 * y[0] + 999 * y[1], -y[1]], 2);
    const solStiff = cb.diff.solve(stiff, { t1: 1, y0: [2, 1], steps: 20, method: "bdf2" });
    assert.ok(Math.abs(final(solStiff)[0] - Math.exp(-1)) < 1e-3);

    const poisson = cb.diff.init((t, x, y, u, ux, uy, uxx, uyy) => uxx + uyy + 2 * Math.PI * Math.PI * sinpi(x) * sinpi(y), { dimension: 2, order: 0 });
    assert.strictEqual(poisson.order, 0);
    const solPoisson = cb.diff.solve(poisson, { grid: square(41), boundary: fixed2 });
    assert.strictEqual(solPoisson.t.length, 1);
    assert.ok(maxError(solPoisson, 0, (x, y) => sinpi(x) * sinpi(y)) < 1e-3);
    const laplace = cb.diff.init((t, x, y, u, ux, uy, uxx, uyy) => uxx + uyy, { dimension: 2, order: 0 });
    const solLaplace = cb.diff.solve(laplace, { grid: square(41), boundary: { left: 0, right: 0, bottom: 0, top: 1 } });
    assert.ok(Math.abs(cb.diff.snapshot(solLaplace, 0)[20][20] - 0.25) < 1e-12);
    const bratu = cb.diff.init((t, x, u, ux, uxx) => uxx + Math.exp(u), { dimension: 1, order: 0 });
    const solBratu = cb.diff.solve(bratu, { grid: { x: [0, 1], nx: 101 }, boundary: fixed1 });
    assert.ok(Math.abs(cb.diff.snapshot(solBratu, 0)[50] - 0.140539) < 2e-5);
}
