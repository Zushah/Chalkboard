/*
    The Chalkboard Library - Differential Equations Namespace
    Version 2.4.0 Noether
*/
/// <reference path="Chalkboard.ts"/>
namespace Chalkboard {
    /**
     * The differential equations namespace.
     * @namespace
     */
    export namespace diff {
        /**
         * Samples a solution at a time using linear interpolation between the nearest grid points. (No extrapolation as it clamps to endpoints.)
         * @param {{ t: number[]; y: number[][] }} sol - The solution.
         * @param {number} time - The time to sample at.
         * @returns {number[]}
         */
        export const at = (sol: { t: number[]; y: number[][] }, time: number): number[] => {
            if (typeof time !== "number" || !Number.isFinite(time)) throw new Error(`Chalkboard.diff.at: Parameter "time" must be a finite number.`);
            const t = sol.t;
            const y = sol.y;
            if (t.length !== y.length || t.length === 0) throw new Error(`Chalkboard.diff.at: Invalid solution object.`);
            if (time <= t[0]) return y[0].slice();
            if (time >= t[t.length - 1]) return y[y.length - 1].slice();
            let i = 0;
            while (i < t.length - 1 && !(t[i] <= time && time <= t[i + 1])) i++;
            const t0 = t[i], t1 = t[i + 1];
            const a = (time - t0) / (t1 - t0);
            const result: number[] = [];
            for (let k = 0; k < y[i].length; k++) result.push((1 - a) * y[i][k] + a * y[i + 1][k]);
            return result;
        };

        /**
         * Defines a Bernoulli equation: y' + p(t)y = q(t)y^n. Equivalent: y' = -p(t)y + q(t)y^n.
         * @param {number | ((t: number) => number)} p - p or p(t)
         * @param {number | ((t: number) => number)} q - q or q(t)
         * @param {number} n - Exponent
         * @returns {ChalkboardODE}
         */
        export const Bernoulli = (p: number | ((t: number) => number), q: number | ((t: number) => number), n: number): ChalkboardODE => {
            if (typeof n !== "number" || !Number.isFinite(n)) throw new Error(`Chalkboard.diff.Bernoulli: Parameter "n" must be a finite number.`);
            const P = (typeof p === "number") ? ((t: number) => p) : p;
            const Q = (typeof q === "number") ? ((t: number) => q) : q;
            return Chalkboard.diff.init((t: number, y: number) => -P(t) * y + Q(t) * Math.pow(y, n));
        };

        /**
         * Defines a modified Bessel equation of order ν: x²y'' + xy' - (x² + ν²)y = 0. Equivalent: y'' = -(1/x)y' + (1 + (ν²/x²))y. Note: singular at x=0. Start from x>0.
         * @param {number} nu - Order ν
         * @returns {ChalkboardODE}
         */
        export const BesselI = (nu: number = 0): ChalkboardODE => {
            if (typeof nu !== "number" || !Number.isFinite(nu)) throw new Error(`Chalkboard.diff.BesselI: Parameter "nu" must be a finite number.`);
            return Chalkboard.diff.init((t: number, y: number, dy: number) => {
                if (t === 0) throw new Error(`Chalkboard.diff.BesselI: Singular at t = 0.`);
                const x = t;
                return -(1 / x) * dy + (1 + (nu * nu) / (x * x)) * y;
            });
        };

        /**
         * Defines a Bessel equation of order ν: x²y'' + xy' + (x² - ν²)y = 0. Equivalent: y'' = -(1/x)y' - (1 - (ν²/x²))y. Note: singular at x=0. Start from x>0.
         * @param {number} nu - Order ν
         * @returns {ChalkboardODE}
         */
        export const BesselJ = (nu: number = 0): ChalkboardODE => {
            if (typeof nu !== "number" || !Number.isFinite(nu)) throw new Error(`Chalkboard.diff.BesselJ: Parameter "nu" must be a finite number.`);
            return Chalkboard.diff.init((t: number, y: number, dy: number) => {
                if (t === 0) throw new Error(`Chalkboard.diff.BesselJ: Singular at t = 0.`);
                const x = t;
                const term = 1 - (nu * nu) / (x * x);
                return -(1 / x) * dy - term * y;
            });
        };

        /**
         * Returns the index of the time grid closest to a target time.
         * @param {number[]} t - Time array.
         * @param {number} target - Target time.
         * @returns {number}
         */
        export const closestIndex = (t: number[], target: number): number => {
            if (!Array.isArray(t) || t.length === 0) throw new Error(`Chalkboard.diff.closestIndex: Parameter "t" must be a non-empty array.`);
            if (typeof target !== "number" || !Number.isFinite(target)) throw new Error(`Chalkboard.diff.closestIndex: Parameter "target" must be a finite number.`);
            let result = 0;
            let resultDist = Math.abs(t[0] - target);
            for (let i = 1; i < t.length; i++) {
                const d = Math.abs(t[i] - target);
                if (d < resultDist) {
                    resultDist = d;
                    result = i;
                }
            }
            return result;
        };

        /**
         * Returns a single component series from the solution of an ODE.
         * @param {{ t: number[]; y: number[][] }} sol - The solution of the ODE.
         * @param {number} index - Component index.
         * @returns {number[]}
         */
        export const component = (sol: { t: number[]; y: number[][] }, index: number): number[] => {
            if (!Number.isInteger(index) || index < 0) throw new Error(`Chalkboard.diff.component: Parameter "index" must be an integer >= 0.`);
            const result: number[] = [];
            for (let i = 0; i < sol.y.length; i++) {
                if (index >= sol.y[i].length) throw new Error(`Chalkboard.diff.component: "index" out of range for solution dimension.`);
                result.push(sol.y[i][index]);
            }
            return result;
        };

        /**
         * Returns an estimate of y'(t) (an estimate of the derivative series) from a solved solution using finite differences on the solution grid.
         * @param {{ t: number[]; y: number[][] }} sol - Solution
         * @returns {number[][]}
         */
        export const derivative = (sol: { t: number[]; y: number[][] }): number[][] => {
            if (!sol || !Array.isArray(sol.t) || !Array.isArray(sol.y)) throw new Error(`Chalkboard.diff.derivative: Invalid solution object.`);
            const t = sol.t;
            const y = sol.y;
            if (t.length !== y.length || t.length < 2) throw new Error(`Chalkboard.diff.derivative: Need at least 2 samples.`);
            const n = y[0].length;
            const dy: number[][] = new Array(y.length);
            for (let i = 0; i < y.length; i++) dy[i] = new Array(n).fill(0);
            for (let i = 0; i < y.length; i++) {
                if (i === 0) {
                    const dt = t[1] - t[0];
                    for (let k = 0; k < n; k++) dy[i][k] = (y[1][k] - y[0][k]) / dt;
                } else if (i === y.length - 1) {
                    const dt = t[t.length - 1] - t[t.length - 2];
                    for (let k = 0; k < n; k++) dy[i][k] = (y[y.length - 1][k] - y[y.length - 2][k]) / dt;
                } else {
                    const dt = t[i + 1] - t[i - 1];
                    for (let k = 0; k < n; k++) dy[i][k] = (y[i + 1][k] - y[i - 1][k]) / dt;
                }
            }
            return dy;
        };

        /**
         * Defines a Duffing equation: x'' + δx' + αx + βx^3 = γcos(ωt). Equivalent: x'' = -δx' - αx - βx^3 + γcos(ωt).
         * @param {number} delta - δ
         * @param {number} alpha - α
         * @param {number} beta - β
         * @param {number} gamma - γ
         * @param {number} omega - ω
         * @returns {ChalkboardODE}
         */
        export const Duffing = (delta: number, alpha: number, beta: number, gamma: number, omega: number): ChalkboardODE => {
            if (![delta, alpha, beta, gamma, omega].every((n) => typeof n === "number" && Number.isFinite(n))) throw new Error(`Chalkboard.diff.Duffing: Parameters must be finite numbers.`);
            return Chalkboard.diff.init((t: number, x: number, v: number) => -delta * v - alpha * x - beta * x * x * x + gamma * Math.cos(omega * t));
        };

        /**
         * Calculates a simple residual error diagnostic for a solution: | |y'(t) - f(t,y) ||. Note that y'(t) is estimated from the discrete solution grid (finite differences) and f(t,y) is the ODE right-hand side in canonical first-order system form.
         * @param {{ t: number[]; y: number[][] }} sol - Solution
         * @param {ChalkboardODE} ode - ODE which produced the solution
         * @param {"L1" | "L2" | "LInfinity"} [norm="L2"] - Norm type for the residual per sample
         * @returns {{ t: number[]; e: number[]; max: number; mean: number; rmse: number; }}
         * @example
         * const ode = Chalkboard.diff.init((t, y) => -2 * y);
         * const sol = Chalkboard.diff.solveAdaptive(ode, {
         *     t0: 0, t1: 5,
         *     y0: 1,
         *     h0: 0.1,
         *     hMin: 0.01,
         *     hMax: 0.5
         * });
         * const err = Chalkboard.diff.error(sol, ode, "LInfinity");
         * console.log(err.max);
         */
        export const error = (sol: { t: number[]; y: number[][] }, ode: ChalkboardODE, norm: "L1" | "L2" | "LInfinity" = "L2"): { t: number[]; e: number[]; max: number; mean: number; rmse: number } => {
            if (!sol || !Array.isArray(sol.t) || !Array.isArray(sol.y)) throw new Error(`Chalkboard.diff.error: Invalid solution object.`);
            if (sol.t.length !== sol.y.length) throw new Error(`Chalkboard.diff.error: "sol.t" and "sol.y" must have the same length.`);
            if (sol.t.length < 2) throw new Error(`Chalkboard.diff.error: Need at least 2 samples to estimate derivative.`);
            if (!ode || typeof ode !== "object" || typeof ode.rule !== "function") throw new Error(`Chalkboard.diff.error: Parameter "ode" must be a ChalkboardODE.`);
            if (["L1", "L2", "LInfinity"].indexOf(norm) === -1) throw new Error(`Chalkboard.diff.error: Unknown norm type.`);
            const t = sol.t;
            const y = sol.y;
            const n = y[0].length;
            if (!Number.isInteger(ode.dimension) || ode.dimension !== n) throw new Error(`Chalkboard.diff.error: "ode.dimension" must match solution dimension.`);
            const dydt = Chalkboard.diff.derivative(sol);
            const e: number[] = [];
            let maxErr = 0;
            let sumErr = 0;
            let sumSq = 0;
            for (let i = 0; i < t.length; i++) {
                const fi = ode.rule(t[i], y[i]);
                if (!Array.isArray(fi) || fi.length !== n) throw new Error(`Chalkboard.diff.error: ODE rule returned invalid derivative at sample ${i}.`);
                const r: number[] = new Array(n);
                for (let k = 0; k < n; k++) {
                    r[k] = dydt[i][k] - fi[k];
                    if (typeof r[k] !== "number" || !Number.isFinite(r[k])) throw new Error(`Chalkboard.diff.error: Non-finite residual at sample ${i}, index ${k}.`);
                }
                let ri: number;
                if (norm === "L1") {
                    let s = 0;
                    for (let k = 0; k < n; k++) s += Math.abs(r[k]);
                    ri = s;
                } else if (norm === "LInfinity") {
                    let m = 0;
                    for (let k = 0; k < n; k++) m = Math.max(m, Math.abs(r[k]));
                    ri = m;
                } else {
                    let s2 = 0;
                    for (let k = 0; k < n; k++) s2 += r[k] * r[k];
                    ri = Math.sqrt(s2);
                }
                e.push(ri);
                maxErr = Math.max(maxErr, ri);
                sumErr += ri;
                sumSq += ri * ri;
            }
            const mean = sumErr / e.length;
            const rmse = Math.sqrt(sumSq / e.length);
            return { t: t.slice(), e, max: maxErr, mean, rmse };
        };

        /**
         * Defines an exponential growth/decay equation: y' = ky
         * @param {number} k - Rate
         * @returns {ChalkboardODE}
         */
        export const exponential = (k: number = 1): ChalkboardODE => {
            if (typeof k !== "number" || !Number.isFinite(k)) throw new Error(`Chalkboard.diff.exponential: Parameter "k" must be a finite number.`);
            return Chalkboard.diff.init((t: number, y: number) => k * y);
        };

        /**
         * Defines a Gompertz equation: y' = ayln(K/y).
         * @param {number} a - Growth rate
         * @param {number} K - Carrying capacity (K > 0)
         * @returns {ChalkboardODE}
         */
        export const Gompertz = (a: number = 1, K: number = 1): ChalkboardODE => {
            if (typeof a !== "number" || !Number.isFinite(a)) throw new Error(`Chalkboard.diff.Gompertz: Parameter "a" must be a finite number.`);
            if (typeof K !== "number" || !Number.isFinite(K) || K <= 0) throw new Error(`Chalkboard.diff.Gompertz: Parameter "K" must be greater than 0.`);
            return Chalkboard.diff.init((t: number, y: number) => a * y * Math.log(K / y));
        };

        /**
         * Defines an undamped harmonic oscillator: y'' + (w²)y = 0. Equivalent: y'' = -(w²)y.
         * @param {number} w - Angular frequency (must be greater than or equal to 0)
         * @returns {ChalkboardODE}
         */
        export const harmonic = (w: number = 1): ChalkboardODE => {
            if (typeof w !== "number" || !Number.isFinite(w) || w < 0) throw new Error(`Chalkboard.diff.harmonic: Parameter "w" must be a finite number greater than or equal to 0.`);
            return Chalkboard.diff.init((t: number, y: number, dy: number) => -(w * w) * y);
        };

        /**
         * Defines a damped harmonic oscillator: y'' + (2ζω)y' + (ω²)y = 0. Equivalent: y'' = -(2ζω)y' - (ω²)y.
         * @param {number} w - Angular frequency (must be greater than or equal to 0)
         * @param {number} zeta - Damping ratio (must be greater than or equal to 0)
         * @returns {ChalkboardODE}
         */
        export const harmonicDamped = (w: number = 1, zeta: number = 0.1): ChalkboardODE => {
            if (typeof w !== "number" || !Number.isFinite(w) || w < 0) throw new Error(`Chalkboard.diff.harmonicDamped: Parameter "w" must be a finite number greater than or equal to 0.`);
            if (typeof zeta !== "number" || !Number.isFinite(zeta) || zeta < 0) throw new Error(`Chalkboard.diff.harmonicDamped: Parameter "zeta" must be a finite number greater than or equal to 0.`);
            return Chalkboard.diff.init((t: number, y: number, dy: number) => -2 * zeta * w * dy - (w * w) * y);
        };

        /**
         * Defines a forced harmonic oscillator: y'' + (2ζω)y' + (ω²)y = F(t). Equivalent: y'' = F(t) - (2ζω)y' - (ω²)y.
         * @param {number} w - Angular frequency (must be greater than or equal to 0)
         * @param {number} zeta - Damping ratio (must be greater than or equal to 0)
         * @param {(t: number) => number} F - Forcing term
         * @returns {ChalkboardODE}
         */
        export const harmonicForced = (w: number, zeta: number, F: (t: number) => number): ChalkboardODE => {
            if (typeof w !== "number" || !Number.isFinite(w) || w < 0) throw new Error(`Chalkboard.diff.harmonicForced: Parameter "w" must be a finite number greater than or equal to 0.`);
            if (typeof zeta !== "number" || !Number.isFinite(zeta) || zeta < 0) throw new Error(`Chalkboard.diff.harmonicForced: Parameter "zeta" must be a finite number greater than or equal to 0.`);
            if (typeof F !== "function") throw new Error(`Chalkboard.diff.harmonicForced: Parameter "F" must be a function.`);
            return Chalkboard.diff.init((t: number, y: number, dy: number) => F(t) - 2 * zeta * w * dy - (w * w) * y);
        };

        /**
         * Defines an ordinary differential equation.
         * @param {((t: number, y: number) => number) | ((t: number, y: number, dy: number) => number) | ((t: number, y: number[]) => number[])} rule - The differential equation rule function.
         * @param {number} [dimension] - Optional, the dimension of the system only required for system equations.
         * @returns {ChalkboardODE}
         * @example
         * // First-order scalar ODE: y' = -2y
         * const ode1 = Chalkboard.diff.init((t, y) => -2 * y);
         * 
         * // Second-order scalar ODE: y'' = -y  (harmonic oscillator)
         * const ode2 = Chalkboard.diff.init((t, y, dy) => -y);
         * 
         * // System ODE: dy/dt = [y2, -y1]  (2D system)
         * const odeSys = Chalkboard.diff.init((t, y) => [y[1], -y[0]], 2);
         */
        export const init = (
            rule: ((t: number, y: number) => number) | ((t: number, y: number, dy: number) => number) | ((t: number, y: number[]) => number[]),
            dimension?: number
        ): ChalkboardODE => {
            if (typeof rule !== "function") throw new Error(`Chalkboard.diff.init: Parameter "rule" must be a function.`);
            if (typeof dimension === "number") {
                if (!Number.isInteger(dimension) || dimension < 1) throw new Error(`Chalkboard.diff.init: Parameter "dimension" must be an integer >= 1.`);
                const sys = rule as (t: number, y: number[]) => number[];
                const ode: ChalkboardODE = {
                    rule: (t: number, y: number[]) => {
                        const out = sys(t, y);
                        if (!Array.isArray(out)) throw new Error(`Chalkboard.diff.init: System rule must return an array of numbers.`);
                        if (out.length !== dimension) throw new Error(`Chalkboard.diff.init: System rule must return an array of length ${dimension}.`);
                        for (let i = 0; i < out.length; i++) if (typeof out[i] !== "number" || !Number.isFinite(out[i])) throw new Error(`Chalkboard.diff.init: System rule output must be finite numbers (index ${i}).`);
                        return out;
                    },
                    type: "system",
                    order: 1,
                    dimension
                };
                return ode;
            }
            const arity = (rule as Function).length;
            if (arity === 2) {
                const f = rule as (t: number, y: number) => number;
                return {
                    rule: (t: number, y: number[]) => {
                        if (y.length !== 1) throw new Error(`Chalkboard.diff.init: Internal error (expected dimension 1).`);
                        const dy = f(t, y[0]);
                        if (typeof dy !== "number" || !Number.isFinite(dy)) throw new Error(`Chalkboard.diff.init: Scalar rule must return a finite number.`);
                        return [dy];
                    },
                    type: "single",
                    order: 1,
                    dimension: 1
                };
            }
            if (arity === 3) {
                const g = rule as (t: number, y: number, dy: number) => number;
                return {
                    rule: (t: number, y: number[]) => {
                        if (y.length !== 2) throw new Error(`Chalkboard.diff.init: Internal error (expected dimension 2 for second-order scalar).`);
                        const ddy = g(t, y[0], y[1]);
                        if (typeof ddy !== "number" || !Number.isFinite(ddy)) throw new Error(`Chalkboard.diff.init: Second-order scalar rule must return a finite number.`);
                        return [y[1], ddy];
                    },
                    type: "single",
                    order: 2,
                    dimension: 2
                };
            }
            throw new Error(`Chalkboard.diff.init: Invalid "rule" arity. Expected (t,y) or (t,y,dy), or provide dimension for systems.`);
        };

        /**
         * Defines a Kepler two-body problem in 2D (inverse-square central force). Unit mass: r'' = -μr / |r|^3. State: [x, y, vx, vy].
         * @param {number} [mu=1] - Gravitational parameter μ = G(M+m)
         * @returns {ChalkboardODE}
         */
        export const Kepler2D = (mu: number = 1): ChalkboardODE => {
            if (typeof mu !== "number" || !Number.isFinite(mu) || mu < 0) throw new Error(`Chalkboard.diff.Kepler2D: Parameter "mu" must be a finite number >= 0.`);
            return Chalkboard.diff.init((t: number, y: number[]) => {
                const x = y[0], yy = y[1], vx = y[2], vy = y[3];
                const r2 = x * x + yy * yy;
                const r = Math.sqrt(r2);
                if (r === 0) throw new Error(`Chalkboard.diff.Kepler2D: Encountered r=0 singularity.`);
                const invr3 = 1 / (r2 * r);
                const ax = -mu * x * invr3;
                const ay = -mu * yy * invr3;
                return [vx, vy, ax, ay];
            }, 4);
        };

        /**
         * Defines a Kepler two-body problem in 3D (inverse-square central force). Unit mass: r'' = -μr / |r|^3. State: [x, y, z, vx, vy, vz].
         * @param {number} [mu=1] - Gravitational parameter μ = G(M+m)
         * @returns {ChalkboardODE}
         */
        export const Kepler3D = (mu: number = 1): ChalkboardODE => {
            if (typeof mu !== "number" || !Number.isFinite(mu) || mu < 0) throw new Error(`Chalkboard.diff.Kepler3D: Parameter "mu" must be a finite number >= 0.`);
            return Chalkboard.diff.init((t: number, y: number[]) => {
                const x = y[0], yy = y[1], z = y[2];
                const vx = y[3], vy = y[4], vz = y[5];
                const r2 = x * x + yy * yy + z * z;
                const r = Math.sqrt(r2);
                if (r === 0) throw new Error(`Chalkboard.diff.Kepler3D: Encountered r=0 singularity.`);
                const invr3 = 1 / (r2 * r);
                const ax = -mu * x * invr3;
                const ay = -mu * yy * invr3;
                const az = -mu * z * invr3;
                return [vx, vy, vz, ax, ay, az];
            }, 6);
        };

        /**
         * Defines a first-order linear scalar ODE: y' = a(t)y + b(t).
         * @param {((t: number) => number) | number} a - Coefficient a(t) or constant a.
         * @param {((t: number) => number) | number} b - Coefficient b(t) or constant b.
         * @returns {ChalkboardODE}
         */
        export const linear1 = (a: ((t: number) => number) | number, b: ((t: number) => number) | number): ChalkboardODE => {
            const A = typeof a === "number" ? (() => a) : a;
            const B = typeof b === "number" ? (() => b) : b;
            return Chalkboard.diff.init((t: number, y: number) => A(t) * y + B(t));
        };

        /**
         * Defines a second-order linear scalar ODE: y'' = a(t)y' + b(t)y + c(t).
         * @param {((t: number) => number) | number} a - Coefficient a(t) or constant a.
         * @param {((t: number) => number) | number} b - Coefficient b(t) or constant b.
         * @param {((t: number) => number) | number} c - Coefficient c(t) or constant c.
         * @returns {ChalkboardODE}
         */
        export const linear2 = (a: ((t: number) => number) | number, b: ((t: number) => number) | number, c: ((t: number) => number) | number): ChalkboardODE => {
            const A = typeof a === "number" ? (() => a) : a;
            const B = typeof b === "number" ? (() => b) : b;
            const C = typeof c === "number" ? (() => c) : c;
            return Chalkboard.diff.init((t: number, y: number, dy: number) => A(t) * dy + B(t) * y + C(t));
        };

        /**
         * Defines a logistic growth model: y' = ry(1 - y/K).
         * @param {number} r - Growth rate
         * @param {number} K - Carrying capacity (non-zero)
         * @returns {ChalkboardODE}
         */
        export const logistic = (r: number = 1, K: number = 1): ChalkboardODE => {
            if (typeof r !== "number" || !Number.isFinite(r)) throw new Error(`Chalkboard.diff.logistic: Parameter "r" must be a finite number.`);
            if (typeof K !== "number" || !Number.isFinite(K) || K === 0) throw new Error(`Chalkboard.diff.logistic: Parameter "K" must be a finite non-zero number.`);
            return Chalkboard.diff.init((t: number, y: number) => r * y * (1 - y / K));
        };

        /**
         * Defines a Lorenz attractor: x' = σ(y - x), y' = x(ρ - z) - y, z' = xy - βz, state: [x, y, z].
         * @param {number} [sigma=10] - σ, Prandtl number
         * @param {number} [rho=28] - ρ, Rayleigh number
         * @param {number} [beta=8/3] - β, geometric factor
         * @returns {ChalkboardODE}
         */
        export const Lorenz = (sigma: number = 10, rho: number = 28, beta: number = 8 / 3): ChalkboardODE => {
            if (![sigma, rho, beta].every((n) => typeof n === "number" && Number.isFinite(n))) throw new Error(`Chalkboard.diff.Lorenz: Parameters must be finite numbers.`);
            return Chalkboard.diff.init((t: number, y: number[]) => {
                const x = y[0], yy = y[1], z = y[2];
                return [
                    sigma * (yy - x),
                    x * (rho - z) - yy,
                    x * yy - beta * z
                ];
            }, 3);
        };

        /**
         * Defines a Lotka–Volterra predator-prey model: x' = αx - βxy, y' = δxy - γy.
         * @param {number} alpha - Prey growth rate
         * @param {number} beta - Predation rate
         * @param {number} gamma - Predator death rate
         * @param {number} delta - Predator reproduction rate
         * @returns {ChalkboardODE}
         */
        export const LotkaVolterra = (alpha: number = 1, beta: number = 1, gamma: number = 1, delta: number = 1): ChalkboardODE => {
            if (![alpha, beta, gamma, delta].every((n) => typeof n === "number" && Number.isFinite(n))) throw new Error(`Chalkboard.diff.LotkaVolterra: Parameters must be finite numbers.`);
            return Chalkboard.diff.init((t: number, y: number[]) => {
                const x = y[0], p = y[1];
                return [alpha * x - beta * x * p, delta * x * p - gamma * p];
            }, 2);
        };

        /**
         * Defines a mass-spring-damper system: mx'' + cx' + kx = 0. Equivalent: x'' = -(c/m)x' - (k/m)x.
         * @param {number} m - Mass (non-zero)
         * @param {number} c - Damping
         * @param {number} k - Spring constant
         * @returns {ChalkboardODE}
         */
        export const massSpringDamper = (m: number, c: number, k: number): ChalkboardODE => {
            if (typeof m !== "number" || !Number.isFinite(m) || m === 0) throw new Error(`Chalkboard.diff.massSpringDamper: Parameter "m" must be finite and non-zero.`);
            if (typeof c !== "number" || !Number.isFinite(c)) throw new Error(`Chalkboard.diff.massSpringDamper: Parameter "c" must be a finite number.`);
            if (typeof k !== "number" || !Number.isFinite(k)) throw new Error(`Chalkboard.diff.massSpringDamper: Parameter "k" must be a finite number.`);
            return Chalkboard.diff.init((t: number, x: number, v: number) => -(c / m) * v - (k / m) * x);
        };

        /**
         * Defines a pendulum (nonlinear) with optional damping and external torque: θ'' + (b)θ' + (g/L)sin(θ) = τ(t). Equivalent: θ'' = τ(t) - bθ' - (g/L)sin(θ).
         * @param {number} [params.g=9.81] - Gravity (greater than or equal to 0)
         * @param {number} [params.L=1] - Length (non-zero)
         * @param {number} [params.b=0] - Damping coefficient
         * @param {(t:number)=>number} [params.tau] - External torque τ(t) (0 by default)
         * @returns {ChalkboardODE}
         */
        export const pendulum = (params: { g?: number; L?: number; b?: number; tau?: (t: number) => number; } = {}): ChalkboardODE => {
            const g = params.g ?? 9.81;
            const L = params.L ?? 1;
            const b = params.b ?? 0;
            const tau = params.tau ?? (() => 0);
            if (typeof g !== "number" || !Number.isFinite(g) || g < 0) throw new Error(`Chalkboard.diff.pendulum: "g" must be a finite number greater than or equal to 0.`);
            if (typeof L !== "number" || !Number.isFinite(L) || L === 0) throw new Error(`Chalkboard.diff.pendulum: "L" must be a finite non-zero number.`);
            if (typeof b !== "number" || !Number.isFinite(b)) throw new Error(`Chalkboard.diff.pendulum: "b" must be a finite number.`);
            if (typeof tau !== "function") throw new Error(`Chalkboard.diff.pendulum: "tau" must be a function.`);
            return Chalkboard.diff.init((t, theta, omega) => tau(t) - b * omega - (g / L) * Math.sin(theta));
        };

        /**
         * Defines a pendulum with linear (viscous) and quadratic (turbulent-ish) drag: θ'' + bθ' + c|θ'|θ' + (g/L)sin(θ) = τ(t). Equivalent: θ'' = τ(t) - bθ' - c|θ'|θ' - (g/L)sin(θ).
         * @param {number} [params.g=9.81] - Gravity (greater than or equal to 0)
         * @param {number} [params.L=1] - Length (non-zero)
         * @param {number} [params.b=0] - Linear damping coefficient
         * @param {number} [params.c=0] - Quadratic damping coefficient
         * @param {(t:number)=>number} [params.tau] - External torque τ(t) (0 by default)
         * @returns {ChalkboardODE}
         */
        export const pendulumDrag = (params: { g?: number; L?: number; b?: number; c?: number; tau?: (t: number) => number; } = {}): ChalkboardODE => {
            const g = params.g ?? 9.81;
            const L = params.L ?? 1;
            const b = params.b ?? 0;
            const c = params.c ?? 0;
            const tau = params.tau ?? (() => 0);
            if (typeof g !== "number" || !Number.isFinite(g) || g < 0) throw new Error(`Chalkboard.diff.pendulumDrag: "g" must be a finite number greater than or equal to 0.`);
            if (typeof L !== "number" || !Number.isFinite(L) || L === 0) throw new Error(`Chalkboard.diff.pendulumDrag: "L" must be a finite non-zero number.`);
            if (typeof b !== "number" || !Number.isFinite(b)) throw new Error(`Chalkboard.diff.pendulumDrag: "b" must be a finite number.`);
            if (typeof c !== "number" || !Number.isFinite(c)) throw new Error(`Chalkboard.diff.pendulumDrag: "c" must be a finite number.`);
            if (typeof tau !== "function") throw new Error(`Chalkboard.diff.pendulumDrag: "tau" must be a function.`);
            return Chalkboard.diff.init((t, theta, omega) => {
                const quad = c * Math.abs(omega) * omega;
                return tau(t) - b * omega - quad - (g / L) * Math.sin(theta);
            });
        };

        /**
         * Defines a driven damped pendulum in a common parameterization: θ'' + qθ' + sin(θ) = Acos(Ωt). Equivalent: θ'' = Acos(Ωt) - qθ' - sin(θ). This is the dimensionless form (g/L scaled out).
         * @param {number} [q=0.5] - Damping
         * @param {number} [A=1.2] - Drive amplitude
         * @param {number} [Omega=2/3] - Drive frequency
         * @returns {ChalkboardODE}
         */
        export const pendulumDriven = (q: number = 0.5, A: number = 1.2, Omega: number = 2 / 3): ChalkboardODE => {
            if (![q, A, Omega].every((n) => typeof n === "number" && Number.isFinite(n))) throw new Error(`Chalkboard.diff.pendulumDriven: Parameters must be finite numbers.`);
            return Chalkboard.diff.init((t, theta, omega) => A * Math.cos(Omega * t) - q * omega - Math.sin(theta));
        };

        /**
         * Returns phase-plot data from a solution of an ODE (pairs of components). Useful for plotting trajectories such as (y, dy), (x, y), (x, z), etc.
         * @param {{ t: number[]; y: number[][] }} sol - Solution of an ODE
         * @param {number} i - The first component index
         * @param {number} j - The second component index
         * @returns {number[][]}
         * @example
         * // Phase plot of harmonic oscillator (y vs dy)
         * const ode = Chalkboard.diff.harmonic();
         * const sol = Chalkboard.diff.solve(ode, { t0: 0, t1: 20, steps: 2000, y0: { y0: 1, dy0: 0 } });
         * const data = Chalkboard.diff.phase(sol, 0, 1);
         */
        export const phase = (sol: { t: number[]; y: number[][] }, i: number, j: number): number[][] => {
            if (!sol || !Array.isArray(sol.t) || !Array.isArray(sol.y)) throw new Error(`Chalkboard.diff.phase: Invalid solution object.`);
            if (sol.t.length !== sol.y.length) throw new Error(`Chalkboard.diff.phase: "sol.t" and "sol.y" must have the same length.`);
            if (sol.y.length === 0) throw new Error(`Chalkboard.diff.phase: Solution has no samples.`);
            if (!Number.isInteger(i) || i < 0) throw new Error(`Chalkboard.diff.phase: Parameter "i" must be an integer >= 0.`);
            if (!Number.isInteger(j) || j < 0) throw new Error(`Chalkboard.diff.phase: Parameter "j" must be an integer >= 0.`);
            if (i === j) throw new Error(`Chalkboard.diff.phase: Parameters "i" and "j" must be different indices.`);
            if (i >= sol.y[0].length || j >= sol.y[0].length) throw new Error(`Chalkboard.diff.phase: Indices out of bounds for solution dimension.`);
            const result: number[][] = [];
            for (let k = 0; k < sol.y.length; k++) {
                const row = sol.y[k];
                result.push([row[i], row[j]]);
            }
            return result;
        };

        /**
         * Samples the solution at multiple times using Chalkboard.diff.at.
         * @param {{ t: number[]; y: number[][] }} sol - Solution of an ODE
         * @param {number[]} times - Times to sample at
         * @returns {number[][]}
         * @example
         * const ode = Chalkboard.diff.harmonic();
         * const sol = Chalkboard.diff.solve(ode, { t0: 0, t1: 20, steps: 2000, y0: { y0: 1, dy0: 0 } });
         * const ys = Chalkboard.diff.sample(sol, [0, 0.5, 1.0, 1.5, 2.0]);
         */
        export const sample = (sol: { t: number[]; y: number[][] }, times: number[]): number[][] => {
            if (!sol || !Array.isArray(sol.t) || !Array.isArray(sol.y)) throw new Error(`Chalkboard.diff.sample: Invalid solution object.`);
            if (!Array.isArray(times)) throw new Error(`Chalkboard.diff.sample: Parameter "times" must be an array.`);
            const result: number[][] = [];
            for (let i = 0; i < times.length; i++) {
                if (typeof times[i] !== "number" || !Number.isFinite(times[i])) throw new Error(`Chalkboard.diff.sample: "times"[${i}] must be a finite number.`);
                result.push(Chalkboard.diff.at(sol, times[i]));
            }
            return result;
        };

        /**
         * Defines a separable ODE: y' = f(t)g(y)
         * @param {(t: number) => number} f - f(t)
         * @param {(y: number) => number} g - g(y)
         * @returns {ChalkboardODE}
         */
        export const separable = (f: (t: number) => number, g: (y: number) => number): ChalkboardODE => {
            if (typeof f !== "function" || typeof g !== "function") throw new Error(`Chalkboard.diff.separable: Parameters must be functions.`);
            return Chalkboard.diff.init((t: number, y: number) => f(t) * g(y));
        };

        /**
         * Defines a SEIR epidemic model: S' = -βSI, E' = βSI - σE, I' = σE - γI, R' = γI.
         * @param {number} beta - Infection rate
         * @param {number} sigma - Incubation rate
         * @param {number} gamma - Recovery rate
         * @returns {ChalkboardODE}
         */
        export const SEIR = (beta: number = 1, sigma: number = 1, gamma: number = 1): ChalkboardODE => {
            if (![beta, sigma, gamma].every((n) => typeof n === "number" && Number.isFinite(n))) throw new Error(`Chalkboard.diff.SEIR: Parameters must be finite numbers.`);
            return Chalkboard.diff.init((t: number, y: number[]) => {
                const S = y[0], E = y[1], I = y[2], R = y[3];
                const inf = beta * S * I;
                return [
                    -inf,
                    inf - sigma * E,
                    sigma * E - gamma * I,
                    gamma * I
                ];
            }, 4);
        };

        /**
         * Defines a SIR epidemic model: S' = -βSI, I' = βSI - γI, R' = γI.
         * @param {number} beta - Infection rate
         * @param {number} gamma - Recovery rate
         * @returns {ChalkboardODE}
         */
        export const SIR = (beta: number = 1, gamma: number = 1): ChalkboardODE => {
            if (![beta, gamma].every((n) => typeof n === "number" && Number.isFinite(n))) throw new Error(`Chalkboard.diff.SIR: Parameters must be finite numbers.`);
            return Chalkboard.diff.init((t: number, y: number[]) => {
                const S = y[0], I = y[1], R = y[2];
                return [-beta * S * I, beta * S * I - gamma * I, gamma * I];
            }, 3);
        };

        /**
         * Defines a SIS epidemic model with total population normalized to 1: S + I = 1, I' = βI(1 - I) - γI.
         * @param {number} beta - Infection rate
         * @param {number} gamma - Recovery rate
         * @returns {ChalkboardODE}
         */
        export const SIS = (beta: number = 1, gamma: number = 0.5): ChalkboardODE => {
            if (![beta, gamma].every((n) => typeof n === "number" && Number.isFinite(n))) throw new Error(`Chalkboard.diff.SIS: Parameters must be finite numbers.`);
            return Chalkboard.diff.init((t: number, I: number) => beta * I * (1 - I) - gamma * I);
        };

        /**
         * Solves an ordinary differential equation using an explicit method.
         * @param {ChalkboardODE} ode - The ordinary differential equation to solve.
         * @param {number} [config.t0=0] - The initial time.
         * @param {number} config.t1 - The final time.
         * @param {number} [config.h] - The time step size. Either this or `steps` must be provided.
         * @param {number} [config.steps] - The number of steps to take. Either this or `h` must be provided.
         * @param {number | number[] | Object} config.y0 - The initial state.
         * @param {"euler" | "midpoint" | "heun" | "ralston" | "rk4"} [config.method="rk4"] - The integration method to use: "euler", "midpoint", "heun", "ralston", or "rk4".
         * @param {boolean} [config.returnObject=false] - Whether to return the results as an array of objects (only if initial state was provided as an object).
         * @returns {{ t: number[]; y: number[][]; yObj?: {[key: string]: number}[]; }} The solution containing time points `t`, state array `y`, and optionally state objects `yObj`.
         * @example
         * // Solve first-order ODE using Euler's method:
         * const ode1 = Chalkboard.diff.init((t, y) => -2 * y);
         * const sol1 = Chalkboard.diff.solve(ode1, {
         *     t0: 0, t1: 5, h: 0.1,
         *     y0: 1,
         *     method: "euler"
         * });
         * 
         * // Solve second-order ODE using Ralston method:
         * const ode2 = Chalkboard.diff.init((t, y, dy) => -y);
         * const sol2 = Chalkboard.diff.solve(ode2, {
         *     t0: 0, t1: 10, steps: 100,
         *     y0: { y0: 1, dy0: 0 },
         *     method: "ralston",
         *     returnObject: true
         * });
         * 
         * // Solve system ODE using fourth-order Runge-Kutta method:
         * const odeSys = Chalkboard.diff.init((t, y) => [y[1], -y[0]], 2);
         * const solSys = Chalkboard.diff.solve(odeSys, {
         *     t0: 0, t1: 10, steps: 100,
         *     y0: [1, 0]
         * });
         */
        export const solve = (
            ode: ChalkboardODE,
            config: {
                t0?: number;
                t1: number;
                h?: number;
                steps?: number;
                y0: number | number[] | Record<string, any>;
                method?: "euler" | "midpoint" | "heun" | "ralston" | "rk4";
                returnObject?: boolean;
            }
        ): { t: number[]; y: number[][]; yObj?: {[key: string]: number}[]; } => {
            if (!ode || typeof ode !== "object") throw new Error(`Chalkboard.diff.solve: Parameter "ode" must be a ChalkboardODE.`);
            if (typeof ode.rule !== "function") throw new Error(`Chalkboard.diff.solve: "ode.rule" must be a function.`);
            if (!Number.isInteger(ode.dimension) || ode.dimension < 1) throw new Error(`Chalkboard.diff.solve: "ode.dimension" must be an integer >= 1.`);
            if (typeof config !== "object" || config === null) throw new Error(`Chalkboard.diff.solve: Parameter "config" must be an object.`);
            if (typeof config.t1 !== "number" || !Number.isFinite(config.t1)) throw new Error(`Chalkboard.diff.solve: "config.t1" must be a finite number.`);
            const t0 = config.t0 ?? 0;
            if (typeof t0 !== "number" || !Number.isFinite(t0)) throw new Error(`Chalkboard.diff.solve: "config.t0" must be a finite number.`);
            if (config.t1 === t0) throw new Error(`Chalkboard.diff.solve: "config.t1" must be different from "config.t0".`);
            const method: "euler" | "midpoint" | "heun" | "ralston" | "rk4" = (config.method ?? "rk4").toLowerCase() as "euler" | "midpoint" | "heun" | "ralston" | "rk4";
            if (["euler", "midpoint", "heun", "ralston", "rk4"].indexOf(method) === -1) throw new Error(`Chalkboard.diff.solve: Unknown method.`);
            let y0: number[];
            let keys: string[] | undefined;
            if (typeof config.y0 === "number" && Number.isFinite(config.y0)) {
                if (ode.dimension !== 1) throw new Error(`Chalkboard.diff.solve: Scalar "y0" is only allowed when "ode.dimension" === 1.`);
                y0 = [config.y0];
            } else if (Array.isArray(config.y0)) {
                if (config.y0.length !== ode.dimension) throw new Error(`Chalkboard.diff.solve: Array "y0" must have length ${ode.dimension}.`);
                for (let i = 0; i < config.y0.length; i++) if (typeof config.y0[i] !== "number" || !Number.isFinite(config.y0[i])) throw new Error(`Chalkboard.diff.solve: "y0"[${i}] must be a finite number.`);
                y0 = config.y0.slice();
            } else {
                if (typeof config.y0 !== "object" || config.y0 === null) throw new Error(`Chalkboard.diff.solve: "y0" must be of type number, number[], or object.`);
                const y0obj = config.y0 as any;
                if (ode.type === "single" && ode.order === 2) {
                    if (("y0" in y0obj) && ("dy0" in y0obj)) {
                        const a = y0obj.y0;
                        const b = y0obj.dy0;
                        if (typeof a !== "number" || !Number.isFinite(a) || typeof b !== "number" || !Number.isFinite(b)) throw new Error(`Chalkboard.diff.solve: For second-order scalar, "y0.y0" and "y0.dy0" must be finite numbers.`);
                        y0 = [a, b];
                        if (config.returnObject) keys = ["y", "dy"];
                    } else if (("y" in y0obj) && ("dy" in y0obj)) {
                        const a = y0obj.y;
                        const b = y0obj.dy;
                        if (typeof a !== "number" || !Number.isFinite(a) || typeof b !== "number" || !Number.isFinite(b)) throw new Error(`Chalkboard.diff.solve: For second-order scalar, "y0.y" and "y0.dy" must be finite numbers.`);
                        y0 = [a, b];
                        if (config.returnObject) keys = ["y", "dy"];
                    } else {
                        throw new Error(`Chalkboard.diff.solve: For second-order scalar, provide initial conditions as { y0, dy0 } or { y, dy }.`);
                    }
                } else if (ode.dimension === 1 && ("y0" in y0obj) && typeof y0obj.y0 === "number" && Number.isFinite(y0obj.y0)) {
                    y0 = [y0obj.y0];
                    if (config.returnObject) keys = ["y"];
                } else if (ode.dimension === 1 && ("y" in y0obj) && typeof y0obj.y === "number" && Number.isFinite(y0obj.y)) {
                    y0 = [y0obj.y];
                    if (config.returnObject) keys = ["y"];
                } else if ("y0" in y0obj && Array.isArray(y0obj.y0)) {
                    const arr = y0obj.y0 as number[];
                    if (arr.length !== ode.dimension) throw new Error(`Chalkboard.diff.solve: Object "y0.y0" must have length ${ode.dimension}.`);
                    for (let i = 0; i < arr.length; i++) if (typeof arr[i] !== "number" || !Number.isFinite(arr[i])) throw new Error(`Chalkboard.diff.solve: y0.y0[${i}] must be a finite number.`);
                    y0 = arr.slice();
                } else {
                    keys = Object.keys(config.y0).sort();
                    if (keys.length !== ode.dimension) throw new Error(`Chalkboard.diff.solve: Object "y0" must have exactly ${ode.dimension} numeric properties (got ${keys.length}).`);
                    const arr: number[] = [];
                    for (let i = 0; i < keys.length; i++) {
                        const v = (config.y0 as any)[keys[i]];
                        if (typeof v !== "number" || !Number.isFinite(v)) throw new Error(`Chalkboard.diff.solve: y0.${keys[i]} must be a finite number.`);
                        arr.push(v);
                    }
                    y0 = arr;
                }
            }
            if (config.returnObject && !keys) {
                if (ode.type === "single" && ode.order === 2 && ode.dimension === 2) {
                    keys = ["y", "dy"];
                } else if (ode.dimension === 1) {
                    keys = ["y"];
                } else {
                    keys = Array.from({ length: ode.dimension }, (_, i) => `y${i + 1}`);
                }
            }
            let h: number;
            let steps: number;
            if (typeof config.h === "number") {
                if (typeof config.h !== "number" || !Number.isFinite(config.h) || config.h === 0) throw new Error(`Chalkboard.diff.solve: "config.h" must be a finite non-zero number.`);
                h = config.h;
                steps = Math.max(1, Math.floor(Math.abs((config.t1 - t0) / h)));
                h = (config.t1 - t0) / steps;
            } else if (typeof config.steps === "number") {
                if (!Number.isInteger(config.steps) || config.steps < 1) throw new Error(`Chalkboard.diff.solve: "config.steps" must be an integer greater than or equal to 1.`);
                steps = config.steps;
                h = (config.t1 - t0) / steps;
            } else {
                throw new Error(`Chalkboard.diff.solve: Provide either "config.h" or "config.steps".`);
            }
            const add = (a: number[], b: number[]): number[] => Chalkboard.stat.add(a, b);
            const scl = (a: number[], k: number): number[] => Chalkboard.stat.scl(a, k);
            const f = ode.rule;
            const t: number[] = new Array(steps + 1);
            const y: number[][] = new Array(steps + 1);
            t[0] = t0;
            y[0] = y0.slice();
            const stepper = (() => {
                if (method === "euler") return (f: (t: number, y: number[]) => number[], t: number, y: number[], h: number): number[] => {
                    const k1 = f(t, y);
                    return add(y, scl(k1, h));
                };
                if (method === "midpoint") return (f: (t: number, y: number[]) => number[], t: number, y: number[], h: number): number[] => {
                    const k1 = f(t, y);
                    const ymid = add(y, scl(k1, h / 2));
                    const k2 = f(t + h / 2, ymid);
                    return add(y, scl(k2, h));
                };
                if (method === "heun") return (f: (t: number, y: number[]) => number[], t: number, y: number[], h: number): number[] => {
                    const k1 = f(t, y);
                    const ypred = add(y, scl(k1, h));
                    const k2 = f(t + h, ypred);
                    return add(y, scl(add(k1, k2), h / 2));
                };
                if (method === "ralston") return (f: (t: number, y: number[]) => number[], t: number, y: number[], h: number): number[] => {
                    const k1 = f(t, y);
                    const y2 = add(y, scl(k1, (2 / 3) * h));
                    const k2 = f(t + (2 / 3) * h, y2);
                    return add(y, scl(add(scl(k1, 1 / 4), scl(k2, 3 / 4)), h));
                };
                return (f: (t: number, y: number[]) => number[], t: number, y: number[], h: number): number[] => {
                    const k1 = f(t, y);
                    const k2 = f(t + h / 2, add(y, scl(k1, h / 2)));
                    const k3 = f(t + h / 2, add(y, scl(k2, h / 2)));
                    const k4 = f(t + h, add(y, scl(k3, h)));
                    const sum23 = add(scl(k2, 2), scl(k3, 2));
                    const total = add(add(k1, sum23), k4);
                    return add(y, scl(total, h / 6));
                };
            })();
            for (let i = 0; i < steps; i++) {
                const ti = t[i];
                const yi = y[i];
                const yNext = stepper(f, ti, yi, h);
                if (!Array.isArray(yNext) || yNext.length !== ode.dimension) throw new Error(`Chalkboard.diff.solve: Internal step produced invalid state length (expected ${ode.dimension}).`);
                for (let k = 0; k < yNext.length; k++) if (typeof yNext[k] !== "number" || !Number.isFinite(yNext[k])) throw new Error(`Chalkboard.diff.solve: State became non-finite at step ${i + 1}, index ${k}.`);
                t[i + 1] = ti + h;
                y[i + 1] = yNext;
            }
            const result: { t: number[]; y: number[][]; yObj?: {[key: string]: number}[]; } = { t, y };
            if (config.returnObject && keys && keys.length === ode.dimension) {
                result.yObj = y.map((row) => {
                    const obj: { [key: string]: number } = {};
                    for (let i = 0; i < keys.length; i++) obj[keys[i]] = row[i];
                    return obj;
                });
            }
            return result;
        };

        /**
         * Solves an ordinary differential equation using the adaptive Dormand–Prince RK45 method. Produces a variable-step solution.
         * @param {ChalkboardODE} ode - The ordinary differential equation to solve.
         * @param {number} [config.t0=0] - Initial time.
         * @param {number} config.t1 - Final time.
         * @param {number | number[] | Object} config.y0 - Initial state (same conventions as Chalkboard.diff.solve).
         * @param {number} [config.h0] - Initial step guess.
         * @param {number} [config.hMin] - Minimum step size magnitude.
         * @param {number} [config.hMax] - Maximum step size magnitude.
         * @param {number} [config.rtol=1e-6] - Relative tolerance.
         * @param {number} [config.atol=1e-9] - Absolute tolerance.
         * @param {number} [config.maxSteps=100000] - Maximum accepted+rejected iterations.
         * @param {boolean} [config.returnObject=false] - Whether to return yObj (same as Chalkboard.diff.solve).
         * @returns {{ t: number[]; y: number[][]; yObj?: {[key: string]: number}[]; }}
         * @example
         * // Solve first-order ODE with adaptive RK45:
         * const ode1 = Chalkboard.diff.init((t, y) => -2 * y);
         * const sol1 = Chalkboard.diff.solveAdaptive(ode1, {
         *     t0: 0, t1: 5,
         *     y0: 1,
         *     h0: 0.1,
         *     hMin: 0.01,
         *     hMax: 0.5
         * });
         * 
         * // Solve second-order ODE with adaptive RK45:
         * const ode2 = Chalkboard.diff.init((t, y, dy) => dy - y);
         * const sol2 = Chalkboard.diff.solveAdaptive(ode2, {
         *     t0: 0, t1: 10,
         *     y0: { y0: 1, dy0: 0 },
         *     h0: 0.1,
         *     hMin: 0.01,
         *     hMax: 0.5,
         *     returnObject: true
         * });
         * 
         * // Solve system ODE with adaptive RK45:
         * const odeSys = Chalkboard.diff.init((t, y) => [y[1], -y[0]], 2);
         * const solSys = Chalkboard.diff.solveAdaptive(odeSys, {
         *     t0: 0, t1: 10,
         *     y0: [1, 0],
         *     h0: 0.1,
         *     hMin: 0.01,
         *     hMax: 0.5
         * });
         */
        export const solveAdaptive = (
            ode: ChalkboardODE,
            config: {
                t0?: number;
                t1: number;
                y0: number | number[] | Record<string, any>;
                h0?: number;
                hMin?: number;
                hMax?: number;
                rtol?: number;
                atol?: number;
                maxSteps?: number;
                returnObject?: boolean;
            }
        ): { t: number[]; y: number[][]; yObj?: { [key: string]: number }[] } => {
            if (!ode || typeof ode !== "object") throw new Error(`Chalkboard.diff.solveAdaptive: Parameter "ode" must be a ChalkboardODE.`);
            if (typeof ode.rule !== "function") throw new Error(`Chalkboard.diff.solveAdaptive: "ode.rule" must be a function.`);
            if (!Number.isInteger(ode.dimension) || ode.dimension < 1) throw new Error(`Chalkboard.diff.solveAdaptive: "ode.dimension" must be an integer >= 1.`);
            if (typeof config !== "object" || config === null) throw new Error(`Chalkboard.diff.solveAdaptive: Parameter "config" must be an object.`);
            if (typeof config.t1 !== "number" || !Number.isFinite(config.t1)) throw new Error(`Chalkboard.diff.solveAdaptive: "config.t1" must be a finite number.`);
            const t0 = config.t0 ?? 0;
            if (typeof t0 !== "number" || !Number.isFinite(t0)) throw new Error(`Chalkboard.diff.solveAdaptive: "config.t0" must be a finite number.`);
            if (config.t1 === t0) throw new Error(`Chalkboard.diff.solveAdaptive: "config.t1" must be different from "config.t0".`);
            const rtol = config.rtol ?? 1e-6;
            const atol = config.atol ?? 1e-9;
            if (typeof rtol !== "number" || !Number.isFinite(rtol) || rtol <= 0) throw new Error(`Chalkboard.diff.solveAdaptive: "rtol" must be > 0.`);
            if (typeof atol !== "number" || !Number.isFinite(atol) || atol < 0) throw new Error(`Chalkboard.diff.solveAdaptive: "atol" must be >= 0.`);
            const maxSteps = config.maxSteps ?? 100000;
            if (!Number.isInteger(maxSteps) || maxSteps < 1) throw new Error(`Chalkboard.diff.solveAdaptive: "maxSteps" must be an integer >= 1.`);
            let y0: number[];
            let keys: string[] | undefined;
            if (typeof config.y0 === "number" && Number.isFinite(config.y0)) {
                if (ode.dimension !== 1) throw new Error(`Chalkboard.diff.solveAdaptive: Scalar "y0" is only allowed when "ode.dimension" === 1.`);
                y0 = [config.y0];
            } else if (Array.isArray(config.y0)) {
                if (config.y0.length !== ode.dimension) throw new Error(`Chalkboard.diff.solveAdaptive: Array "y0" must have length ${ode.dimension}.`);
                for (let i = 0; i < config.y0.length; i++) if (typeof config.y0[i] !== "number" || !Number.isFinite(config.y0[i])) throw new Error(`Chalkboard.diff.solveAdaptive: "y0"[${i}] must be a finite number.`);
                y0 = config.y0.slice();
            } else {
                if (typeof config.y0 !== "object" || config.y0 === null) throw new Error(`Chalkboard.diff.solveAdaptive: "y0" must be of type number, number[], or object.`);
                const y0obj = config.y0 as any;
                if (ode.type === "single" && ode.order === 2) {
                    if (("y0" in y0obj) && ("dy0" in y0obj)) {
                        const a = y0obj.y0;
                        const b = y0obj.dy0;
                        if (typeof a !== "number" || !Number.isFinite(a) || typeof b !== "number" || !Number.isFinite(b)) throw new Error(`Chalkboard.diff.solveAdaptive: For second-order scalar, "y0.y0" and "y0.dy0" must be finite numbers.`);
                        y0 = [a, b];
                        if (config.returnObject) keys = ["y", "dy"];
                    } else if (("y" in y0obj) && ("dy" in y0obj)) {
                        const a = y0obj.y;
                        const b = y0obj.dy;
                        if (typeof a !== "number" || !Number.isFinite(a) || typeof b !== "number" || !Number.isFinite(b)) throw new Error(`Chalkboard.diff.solveAdaptive: For second-order scalar, "y0.y" and "y0.dy" must be finite numbers.`);
                        y0 = [a, b];
                        if (config.returnObject) keys = ["y", "dy"];
                    } else {
                        throw new Error(`Chalkboard.diff.solveAdaptive: For second-order scalar, provide initial conditions as { y0, dy0 } or { y, dy }.`);
                    }
                } else if (ode.dimension === 1 && ("y0" in y0obj) && typeof y0obj.y0 === "number" && Number.isFinite(y0obj.y0)) {
                    y0 = [y0obj.y0];
                    if (config.returnObject) keys = ["y"];
                } else if (ode.dimension === 1 && ("y" in y0obj) && typeof y0obj.y === "number" && Number.isFinite(y0obj.y)) {
                    y0 = [y0obj.y];
                    if (config.returnObject) keys = ["y"];
                } else if ("y0" in y0obj && Array.isArray(y0obj.y0)) {
                    const arr = y0obj.y0 as number[];
                    if (arr.length !== ode.dimension) throw new Error(`Chalkboard.diff.solveAdaptive: Object "y0.y0" must have length ${ode.dimension}.`);
                    for (let i = 0; i < arr.length; i++) if (typeof arr[i] !== "number" || !Number.isFinite(arr[i])) throw new Error(`Chalkboard.diff.solveAdaptive: y0.y0[${i}] must be a finite number.`);
                    y0 = arr.slice();
                } else {
                    keys = Object.keys(config.y0).sort();
                    if (keys.length !== ode.dimension) throw new Error(`Chalkboard.diff.solveAdaptive: Object "y0" must have exactly ${ode.dimension} numeric properties (got ${keys.length}).`);
                    const arr: number[] = [];
                    for (let i = 0; i < keys.length; i++) {
                        const v = (config.y0 as any)[keys[i]];
                        if (typeof v !== "number" || !Number.isFinite(v)) throw new Error(`Chalkboard.diff.solveAdaptive: y0.${keys[i]} must be a finite number.`);
                        arr.push(v);
                    }
                    y0 = arr;
                }
            }
            if (config.returnObject && !keys) {
                if (ode.type === "single" && ode.order === 2 && ode.dimension === 2) keys = ["y", "dy"];
                else if (ode.dimension === 1) keys = ["y"];
                else keys = Array.from({ length: ode.dimension }, (_, i) => `y${i + 1}`);
            }
            const sign = Math.sign(config.t1 - t0);
            let h = config.h0 ?? (config.t1 - t0) / 100;
            if (typeof h !== "number" || !Number.isFinite(h) || h === 0) throw new Error(`Chalkboard.diff.solveAdaptive: "h0" must be a finite non-zero number (or omitted).`);
            h = Math.abs(h) * sign;
            const hMin = (config.hMin ?? 1e-12);
            const hMax = (config.hMax ?? Math.abs(config.t1 - t0));
            if (typeof hMin !== "number" || !Number.isFinite(hMin) || hMin <= 0) throw new Error(`Chalkboard.diff.solveAdaptive: "hMin" must be > 0.`);
            if (typeof hMax !== "number" || !Number.isFinite(hMax) || hMax <= 0) throw new Error(`Chalkboard.diff.solveAdaptive: "hMax" must be > 0.`);
            const clampAbs = (value: number, minAbs: number, maxAbs: number): number => {
                const s = Math.sign(value) || 1;
                const a = Math.min(maxAbs, Math.max(minAbs, Math.abs(value)));
                return s * a;
            };
            const add = (a: number[], b: number[]): number[] => Chalkboard.stat.add(a, b);
            const scl = (a: number[], k: number): number[] => Chalkboard.stat.scl(a, k);
            const f = ode.rule;
            const t: number[] = [t0];
            const y: number[][] = [y0.slice()];
            const c2 = 1 / 5;
            const c3 = 3 / 10;
            const c4 = 4 / 5;
            const c5 = 8 / 9;
            const c6 = 1;
            const c7 = 1;
            const a21 = 1 / 5;
            const a31 = 3 / 40, a32 = 9 / 40;
            const a41 = 44 / 45, a42 = -56 / 15, a43 = 32 / 9;
            const a51 = 19372 / 6561, a52 = -25360 / 2187, a53 = 64448 / 6561, a54 = -212 / 729;
            const a61 = 9017 / 3168, a62 = -355 / 33, a63 = 46732 / 5247, a64 = 49 / 176, a65 = -5103 / 18656;
            const a71 = 35 / 384, a72 = 0, a73 = 500 / 1113, a74 = 125 / 192, a75 = -2187 / 6784, a76 = 11 / 84;
            const b1 = 35 / 384, b2 = 0, b3 = 500 / 1113, b4 = 125 / 192, b5 = -2187 / 6784, b6 = 11 / 84, b7 = 0;
            const bs1 = 5179 / 57600, bs2 = 0, bs3 = 7571 / 16695, bs4 = 393 / 640, bs5 = -92097 / 339200, bs6 = 187 / 2100, bs7 = 1 / 40;
            const errNorm = (y5: number[], y4: number[], yScale: number[]): number => {
                let m = 0;
                for (let i = 0; i < y5.length; i++) {
                    const e = Math.abs(y5[i] - y4[i]) / yScale[i];
                    if (e > m) m = e;
                }
                return m;
            };
            const makeScale = (yCurr: number[], yNext: number[]): number[] => {
                const s: number[] = [];
                for (let i = 0; i < yCurr.length; i++) s.push(atol + rtol * Math.max(Math.abs(yCurr[i]), Math.abs(yNext[i])));
                return s;
            };
            let iter = 0;
            while (iter < maxSteps) {
                iter++;
                const ti = t[t.length - 1];
                const yi = y[y.length - 1];
                if ((sign > 0 && ti >= config.t1) || (sign < 0 && ti <= config.t1)) break;
                const remaining = config.t1 - ti;
                if (Math.abs(h) > Math.abs(remaining)) h = remaining;
                h = clampAbs(h, hMin, hMax);
                const k1 = f(ti, yi);
                const y2 = add(yi, scl(k1, h * a21));
                const k2 = f(ti + c2 * h, y2);
                const y3 = add(add(yi, scl(k1, h * a31)), scl(k2, h * a32));
                const k3 = f(ti + c3 * h, y3);
                const y4 = add(add(add(yi, scl(k1, h * a41)), scl(k2, h * a42)), scl(k3, h * a43));
                const k4 = f(ti + c4 * h, y4);
                const y5s = add(add(add(add(yi, scl(k1, h * a51)), scl(k2, h * a52)), scl(k3, h * a53)), scl(k4, h * a54));
                const k5 = f(ti + c5 * h, y5s);
                const y6 = add(add(add(add(add(yi, scl(k1, h * a61)), scl(k2, h * a62)), scl(k3, h * a63)), scl(k4, h * a64)), scl(k5, h * a65));
                const k6 = f(ti + c6 * h, y6);
                const y7 = add(add(add(add(add(add(yi, scl(k1, h * a71)), scl(k2, h * a72)), scl(k3, h * a73)), scl(k4, h * a74)), scl(k5, h * a75)), scl(k6, h * a76));
                const k7 = f(ti + c7 * h, y7);
                const yNext5 = add(yi, scl(add(add(add(scl(k1, b1), scl(k2, b2)), add(scl(k3, b3), scl(k4, b4))), add(add(scl(k5, b5), scl(k6, b6)), scl(k7, b7))), h));
                const yNext4 = add(yi, scl(add(add(add(scl(k1, bs1), scl(k2, bs2)), add(scl(k3, bs3), scl(k4, bs4))), add(add(scl(k5, bs5), scl(k6, bs6)), scl(k7, bs7))), h));
                const scale = makeScale(yi, yNext5);
                const e = errNorm(yNext5, yNext4, scale);
                const safety = 0.9;
                const minFactor = 0.2;
                const maxFactor = 5.0;
                if (e <= 1) {
                    const tNext = ti + h;
                    t.push(tNext);
                    y.push(yNext5);
                    const factor = e === 0 ? maxFactor : Math.min(maxFactor, Math.max(minFactor, safety * Math.pow(1 / e, 1 / 5)));
                    h = h * factor;
                } else {
                    const factor = Math.min(1.0, Math.max(minFactor, safety * Math.pow(1 / e, 1 / 5)));
                    h = h * factor;
                    if (Math.abs(h) < hMin) throw new Error(`Chalkboard.diff.solveAdaptive: Step size underflow (h < hMin).`);
                }
            }
            if (iter >= maxSteps) throw new Error(`Chalkboard.diff.solveAdaptive: Exceeded maxSteps=${maxSteps}.`);
            const result: { t: number[]; y: number[][]; yObj?: { [key: string]: number }[] } = { t, y };
            if (config.returnObject && keys && keys.length === ode.dimension) {
                result.yObj = y.map((row) => {
                    const obj: { [key: string]: number } = {};
                    for (let i = 0; i < keys.length; i++) obj[keys[i]] = row[i];
                    return obj;
                });
            }
            return result;
        };

        /**
         * Returns the first component of a solution of an ODE.
         * @param {{ t: number[]; y: number[][] }} sol - The solution of the ODE.
         * @returns {number[]}
         */
        export const toScalarSeries = (sol: { t: number[]; y: number[][] }): number[] => {
            const result: number[] = [];
            for (let i = 0; i < sol.y.length; i++) result.push(sol.y[i][0]);
            return result;
        };
    }
}
