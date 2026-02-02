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
         * Samples the solution at a time using linear interpolation between the nearest grid points. (No extrapolation as it clamps to endpoints.)
         * @param {{ t: number[]; y: number[][] }} sol - The solution.
         * @param {number} time - The time to sample at.
         * @returns {number[]}
         */
        export const at = (sol: { t: number[]; y: number[][] }, time: number): number[] => {
            ASSERT(typeof time === "number" && Number.isFinite(time), `Chalkboard.diff.at: Parameter "time" must be a finite number.`);
            const t = sol.t;
            const y = sol.y;
            ASSERT(t.length === y.length && t.length > 0, `Chalkboard.diff.at: Invalid solution object.`);
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
            ASSERT(typeof n === "number" && Number.isFinite(n), `Chalkboard.diff.Bernoulli: Parameter "n" must be a finite number.`);
            const P = (typeof p === "number") ? ((t: number) => p) : p;
            const Q = (typeof q === "number") ? ((t: number) => q) : q;
            return Chalkboard.diff.init((t: number, y: number) => -P(t) * y + Q(t) * Math.pow(y, n));
        };

        /**
         * Returns the index of the time grid closest to a target time.
         * @param {number[]} t - Time array.
         * @param {number} target - Target time.
         * @returns {number}
         */
        export const closestIndex = (t: number[], target: number): number => {
            ASSERT(Array.isArray(t) && t.length > 0, `Chalkboard.diff.closestIndex: Parameter "t" must be a non-empty array.`);
            ASSERT(typeof target === "number" && Number.isFinite(target), `Chalkboard.diff.closestIndex: Parameter "target" must be a finite number.`);
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
            ASSERT(Number.isInteger(index) && index >= 0, `Chalkboard.diff.component: Parameter "index" must be an integer >= 0.`);
            const result: number[] = [];
            for (let i = 0; i < sol.y.length; i++) {
                ASSERT(index < sol.y[i].length, `Chalkboard.diff.component: "index" out of range for solution dimension.`);
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
            ASSERT(sol && Array.isArray(sol.t) && Array.isArray(sol.y), `Chalkboard.diff.derivative: Invalid solution object.`);
            const t = sol.t;
            const y = sol.y;
            ASSERT(t.length === y.length && t.length >= 2, `Chalkboard.diff.derivative: Need at least 2 samples.`);
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
            ASSERT([delta, alpha, beta, gamma, omega].every((n) => typeof n === "number" && Number.isFinite(n)), `Chalkboard.diff.Duffing: Parameters must be finite numbers.`);
            return Chalkboard.diff.init((t: number, x: number, v: number) => -delta * v - alpha * x - beta * x * x * x + gamma * Math.cos(omega * t));
        };

        /**
         * Defines an exponential growth/decay equation: y' = ky
         * @param {number} k - Rate
         * @returns {ChalkboardODE}
         */
        export const exponential = (k: number = 1): ChalkboardODE => {
            ASSERT(typeof k === "number" && Number.isFinite(k), `Chalkboard.diff.exponential: Parameter "k" must be a finite number.`);
            return Chalkboard.diff.init((t: number, y: number) => k * y);
        };

        /**
         * Defines a Gompertz equation: y' = ayln(K/y).
         * @param {number} a - Growth rate
         * @param {number} K - Carrying capacity (K > 0)
         * @returns {ChalkboardODE}
         */
        export const Gompertz = (a: number = 1, K: number = 1): ChalkboardODE => {
            ASSERT(typeof a === "number" && Number.isFinite(a), `Chalkboard.diff.Gompertz: Parameter "a" must be a finite number.`);
            ASSERT(typeof K === "number" && Number.isFinite(K) && K > 0, `Chalkboard.diff.Gompertz: Parameter "K" must be greater than 0.`);
            return Chalkboard.diff.init((t: number, y: number) => a * y * Math.log(K / y));
        };

        /**
         * Defines an undamped harmonic oscillator: y'' + (w^2)y = 0. Equivalent: y'' = -(w^2)y.
         * @param {number} w - Angular frequency (must be greater than or equal to 0)
         * @returns {ChalkboardODE}
         */
        export const harmonic = (w: number = 1): ChalkboardODE => {
            ASSERT(typeof w === "number" && Number.isFinite(w) && w >= 0, `Chalkboard.diff.harmonic: Parameter "w" must be a finite number greater than or equal to 0.`);
            return Chalkboard.diff.init((t: number, y: number, dy: number) => -(w * w) * y);
        };

        /**
         * Defines a damped harmonic oscillator: y'' + (2ζω)y' + (ω^2)y = 0. Equivalent: y'' = -(2ζω)y' - (ω^2)y.
         * @param {number} w - Angular frequency (must be greater than or equal to 0)
         * @param {number} zeta - Damping ratio (must be greater than or equal to 0)
         * @returns {ChalkboardODE}
         */
        export const harmonicDamped = (w: number = 1, zeta: number = 0.1): ChalkboardODE => {
            ASSERT(typeof w === "number" && Number.isFinite(w) && w >= 0, `Chalkboard.diff.harmonicDamped: Parameter "w" must be a finite number greater than or equal to 0.`);
            ASSERT(typeof zeta === "number" && Number.isFinite(zeta) && zeta >= 0, `Chalkboard.diff.harmonicDamped: Parameter "zeta" must be a finite number greater than or equal to 0.`);
            return Chalkboard.diff.init((t: number, y: number, dy: number) => -2 * zeta * w * dy - (w * w) * y);
        };

        /**
         * Defines a forced harmonic oscillator: y'' + (2ζω)y' + (ω^2)y = F(t). Equivalent: y'' = F(t) - (2ζω)y' - (ω^2)y.
         * @param {number} w - Angular frequency (must be greater than or equal to 0)
         * @param {number} zeta - Damping ratio (must be greater than or equal to 0)
         * @param {(t: number) => number} F - Forcing term
         * @returns {ChalkboardODE}
         */
        export const harmonicForced = (w: number, zeta: number, F: (t: number) => number): ChalkboardODE => {
            ASSERT(typeof w === "number" && Number.isFinite(w) && w >= 0, `Chalkboard.diff.harmonicForced: Parameter "w" must be a finite number greater than or equal to 0.`);
            ASSERT(typeof zeta === "number" && Number.isFinite(zeta) && zeta >= 0, `Chalkboard.diff.harmonicForced: Parameter "zeta" must be a finite number greater than or equal to 0.`);
            ASSERT(typeof F === "function", `Chalkboard.diff.harmonicForced: Parameter "F" must be a function.`);
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
            ASSERT(typeof rule === "function", `Chalkboard.diff.init: Parameter "rule" must be a function.`);
            if (typeof dimension === "number") {
                ASSERT(Number.isInteger(dimension) && dimension >= 1, `Chalkboard.diff.init: Parameter "dimension" must be an integer >= 1.`);
                const sys = rule as (t: number, y: number[]) => number[];
                const ode: ChalkboardODE = {
                    rule: (t: number, y: number[]) => {
                        const out = sys(t, y);
                        ASSERT(Array.isArray(out), `Chalkboard.diff: System rule must return a number[].`);
                        ASSERT(out.length === dimension, `Chalkboard.diff: System rule must return an array of length ${dimension}.`);
                        for (let i = 0; i < out.length; i++) {
                            ASSERT(typeof out[i] === "number" && Number.isFinite(out[i]), `Chalkboard.diff: System rule output must be finite numbers (index ${i}).`);
                        }
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
                        ASSERT(y.length === 1, `Chalkboard.diff: Internal error (expected dimension 1).`);
                        const dy = f(t, y[0]);
                        ASSERT(typeof dy === "number" && Number.isFinite(dy), `Chalkboard.diff: Scalar rule must return a finite number.`);
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
                        ASSERT(y.length === 2, `Chalkboard.diff: Internal error (expected dimension 2 for second-order scalar).`);
                        const ddy = g(t, y[0], y[1]);
                        ASSERT(typeof ddy === "number" && Number.isFinite(ddy), `Chalkboard.diff: Second-order scalar rule must return a finite number.`);
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
            ASSERT(typeof r === "number" && Number.isFinite(r), `Chalkboard.diff.logistic: Parameter "r" must be a finite number.`);
            ASSERT(typeof K === "number" && Number.isFinite(K) && K !== 0, `Chalkboard.diff.logistic: Parameter "K" must be a finite non-zero number.`);
            return Chalkboard.diff.init((t: number, y: number) => r * y * (1 - y / K));
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
            ASSERT([alpha, beta, gamma, delta].every((n) => typeof n === "number" && Number.isFinite(n)), `Chalkboard.diff.LotkaVolterra: Parameters must be finite numbers.`);
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
            ASSERT(typeof m === "number" && Number.isFinite(m) && m !== 0, `Chalkboard.diff.massSpringDamper: Parameter "m" must be finite and non-zero.`);
            ASSERT(typeof c === "number" && Number.isFinite(c), `Chalkboard.diff.massSpringDamper: Parameter "c" must be a finite number.`);
            ASSERT(typeof k === "number" && Number.isFinite(k), `Chalkboard.diff.massSpringDamper: Parameter "k" must be a finite number.`);
            return Chalkboard.diff.init((t: number, x: number, v: number) => -(c / m) * v - (k / m) * x);
        };

        /**
         * Defines a separable ODE: y' = f(t)g(y)
         * @param {(t: number) => number} f - f(t)
         * @param {(y: number) => number} g - g(y)
         * @returns {ChalkboardODE}
         */
        export const separable = (f: (t: number) => number, g: (y: number) => number): ChalkboardODE => {
            ASSERT(typeof f === "function" && typeof g === "function", `Chalkboard.diff.separable: Parameters must be functions.`);
            return Chalkboard.diff.init((t: number, y: number) => f(t) * g(y));
        };

        /**
         * Defines an SIR epidemic model: S' = -βSI, I' = βSI - γI, R' = γI.
         * @param {number} beta - Infection rate
         * @param {number} gamma - Recovery rate
         * @returns {ChalkboardODE}
         */
        export const SIR = (beta: number = 1, gamma: number = 1): ChalkboardODE => {
            ASSERT([beta, gamma].every((n) => typeof n === "number" && Number.isFinite(n)), `Chalkboard.diff.SIR: Parameters must be finite numbers.`);
            return Chalkboard.diff.init((t: number, y: number[]) => {
                const S = y[0], I = y[1], R = y[2];
                return [-beta * S * I, beta * S * I - gamma * I, gamma * I];
            }, 3);
        };

        /**
         * Solves an ordinary differential equation using an explicit method.
         * @param {ChalkboardODE} ode - The ordinary differential equation to solve.
         * @param {Object} config - The solver configuration object.
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
            ASSERT(ode && typeof ode === "object", `Chalkboard.diff.solve: Parameter "ode" must be a ChalkboardODE.`);
            ASSERT(typeof ode.rule === "function", `Chalkboard.diff.solve: "ode.rule" must be a function.`);
            ASSERT(Number.isInteger(ode.dimension) && ode.dimension >= 1, `Chalkboard.diff.solve: "ode.dimension" must be an integer >= 1.`);
            ASSERT(typeof config === "object" && config !== null, `Chalkboard.diff.solve: Parameter "config" must be an object.`);
            ASSERT(typeof config.t1 === "number" && Number.isFinite(config.t1), `Chalkboard.diff.solve: "config.t1" must be a finite number.`);
            const t0 = config.t0 ?? 0;
            ASSERT(typeof t0 === "number" && Number.isFinite(t0), `Chalkboard.diff.solve: "config.t0" must be a finite number.`);
            ASSERT(config.t1 !== t0, `Chalkboard.diff.solve: "config.t1" must be different from "config.t0".`);
            const method: "euler" | "midpoint" | "heun" | "ralston" | "rk4" = (config.method ?? "rk4").toLowerCase() as "euler" | "midpoint" | "heun" | "ralston" | "rk4";
            ASSERT(["euler", "midpoint", "heun", "ralston", "rk4"].indexOf(method) !== -1, `Chalkboard.diff.solve: Unknown method.`);
            let y0: number[];
            let keys: string[] | undefined;
            if (typeof config.y0 === "number" && Number.isFinite(config.y0)) {
                ASSERT(ode.dimension === 1, `Chalkboard.diff.solve: Scalar "y0" is only allowed when "ode.dimension" === 1.`);
                y0 = [config.y0];
            } else if (Array.isArray(config.y0)) {
                ASSERT(config.y0.length === ode.dimension, `Chalkboard.diff.solve: Array "y0" must have length ${ode.dimension}.`);
                for (let i = 0; i < config.y0.length; i++) ASSERT(typeof config.y0[i] === "number" && Number.isFinite(config.y0[i]), `Chalkboard.diff.solve: "y0"[${i}] must be a finite number.`);
                y0 = config.y0.slice();
            } else {
                ASSERT(typeof config.y0 === "object" && config.y0 !== null, `Chalkboard.diff.solve: "y0" must be of type number, number[], or object.`);
                const y0obj = config.y0 as any;
                if (ode.type === "single" && ode.order === 2) {
                    if (("y0" in y0obj) && ("dy0" in y0obj)) {
                        const a = y0obj.y0;
                        const b = y0obj.dy0;
                        ASSERT(typeof a === "number" && Number.isFinite(a) && typeof b === "number" && Number.isFinite(b), `Chalkboard.diff.solve: For second-order scalar, "y0.y0" and "y0.dy0" must be finite numbers.`);
                        y0 = [a, b];
                        if (config.returnObject) keys = ["y", "dy"];
                    } else if (("y" in y0obj) && ("dy" in y0obj)) {
                        const a = y0obj.y;
                        const b = y0obj.dy;
                        ASSERT(typeof a === "number" && Number.isFinite(a) && typeof b === "number" && Number.isFinite(b), `Chalkboard.diff.solve: For second-order scalar, "y0.y" and "y0.dy" must be finite numbers.`);
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
                    ASSERT(arr.length === ode.dimension, `Chalkboard.diff.solve: Object "y0.y0" must have length ${ode.dimension}.`);
                    for (let i = 0; i < arr.length; i++) ASSERT(typeof arr[i] === "number" && Number.isFinite(arr[i]), `Chalkboard.diff.solve: y0.y0[${i}] must be a finite number.`);
                    y0 = arr.slice();
                } else {
                    keys = Object.keys(config.y0).sort();
                    ASSERT(keys.length === ode.dimension, `Chalkboard.diff.solve: Object "y0" must have exactly ${ode.dimension} numeric properties (got ${keys.length}).`);
                    const arr: number[] = [];
                    for (let i = 0; i < keys.length; i++) {
                        const v = (config.y0 as any)[keys[i]];
                        ASSERT(typeof v === "number" && Number.isFinite(v), `Chalkboard.diff.solve: y0.${keys[i]} must be a finite number.`);
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
                ASSERT(typeof config.h === "number" && Number.isFinite(config.h) && config.h !== 0, `Chalkboard.diff.solve: "config.h" must be a finite non-zero number.`);
                h = config.h;
                steps = Math.max(1, Math.floor(Math.abs((config.t1 - t0) / h)));
                h = (config.t1 - t0) / steps;
            } else if (typeof config.steps === "number") {
                ASSERT(Number.isInteger(config.steps) && config.steps >= 1, `Chalkboard.diff.solve: "config.steps" must be an integer >= 1.`);
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
                ASSERT(Array.isArray(yNext) && yNext.length === ode.dimension, `Chalkboard.diff.solve: Internal step produced invalid state length (expected ${ode.dimension}).`);
                for (let k = 0; k < yNext.length; k++) ASSERT(typeof yNext[k] === "number" && Number.isFinite(yNext[k]), `Chalkboard.diff.solve: State became non-finite at step ${i + 1}, index ${k}.`);
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
