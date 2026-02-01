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
    }
}
