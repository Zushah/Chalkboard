/*
 * Chalkboard v3.1.0 Ricci - Differential Equations Namespace
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

/// <reference path="Chalkboard.ts"/>
namespace Chalkboard {
    /**
     * The differential equations namespace.
     * @namespace
     */
    export namespace diff {
        /** @ignore */
        const $prepare = (diff: ChalkboardODE | ChalkboardPDE, config: any, caller: string): {
            rule: (t: number, y: number[]) => number[];
            y0: number[];
            keys?: string[];
            grid?: { x: number[]; y?: number[] };
            mesh?: { nx: number; ny: number; fields: number; periodicX: boolean; periodicY: boolean };
        } => {
            const t0 = config.t0 ?? 0;
            if (diff.type === "pde") {
                if (config.returnObject) throw new Error(`${caller}: Property "config.returnObject" is not supported for partial differential equations.`);
                const m = diff.components, order = diff.order, dim = diff.dimension;
                if (dim !== 1 && dim !== 2) throw new Error(`${caller}: Property "diff.dimension" must be 1 or 2.`);
                if (order !== 1 && order !== 2) throw new Error(`${caller}: Property "diff.order" must be 1 or 2.`);
                if (!Number.isInteger(m) || m < 1) throw new Error(`${caller}: Property "diff.components" must be a positive integer.`);
                const mesh = config.grid as any;
                if (mesh === null || typeof mesh !== "object" || Array.isArray(mesh)) throw new Error(`${caller}: Property "config.grid" must be an object for partial differential equations.`);
                const axis = (range: any, count: any, letter: string): void => {
                    if (!Array.isArray(range) || range.length !== 2 || !Number.isFinite(range[0]) || !Number.isFinite(range[1]) || range[1] <= range[0]) throw new Error(`${caller}: Property "config.grid.${letter}" must be an array of two finite numbers in increasing order.`);
                    if (!Number.isInteger(count) || count < 3) throw new Error(`${caller}: Property "config.grid.n${letter}" must be an integer greater than or equal to 3.`);
                };
                axis(mesh.x, mesh.nx, "x");
                if (dim === 2) axis(mesh.y, mesh.ny, "y");
                const names = dim === 1 ? ["left", "right"] : ["left", "right", "bottom", "top"];
                const boundary = config.boundary as any;
                if (boundary !== "periodic" && (boundary === null || typeof boundary !== "object" || Array.isArray(boundary) || names.some((name) => boundary[name] === undefined))) throw new Error(`${caller}: Property "config.boundary" must be "periodic" or an object with properties ${dim === 1 ? `"left" and "right"` : `"left", "right", "bottom", and "top"`}.`);
                type Side = { type: "periodic" | "dirichlet" | "neumann"; value: any; name: string };
                const side = (name: string): Side => {
                    const spec = boundary === "periodic" ? "periodic" : boundary[name];
                    if (spec === "periodic") return { type: "periodic", value: 0, name };
                    if (typeof spec === "number" || Array.isArray(spec) || typeof spec === "function") return { type: "dirichlet", value: spec, name };
                    if (spec !== null && typeof spec === "object" && (spec.type === "dirichlet" || spec.type === "neumann")) return { type: spec.type, value: spec.value ?? 0, name };
                    throw new Error(`${caller}: Property "config.boundary.${name}" must be "periodic", a number, an array, a function, or an object with type "dirichlet" or "neumann".`);
                };
                const sides = names.map(side);
                const left = sides[0], right = sides[1], bottom = sides[2], top = sides[3];
                const periodicX = left.type === "periodic", periodicY = dim === 2 && bottom.type === "periodic";
                if (periodicX !== (right.type === "periodic")) throw new Error(`${caller}: Properties "config.boundary.left" and "config.boundary.right" must both be periodic or both be non-periodic.`);
                if (dim === 2 && periodicY !== (top.type === "periodic")) throw new Error(`${caller}: Properties "config.boundary.bottom" and "config.boundary.top" must both be periodic or both be non-periodic.`);
                const fill = (s: Side, t: number, coord: number, out: Float64Array, offset: number = 0): void => {
                    const v = typeof s.value === "function" ? (dim === 1 ? s.value(t) : s.value(t, coord)) : s.value;
                    if (typeof v === "number" && Number.isFinite(v)) {
                        for (let c = 0; c < m; c++) out[offset + c] = v;
                        return;
                    }
                    if (Array.isArray(v) && v.length === m) {
                        let ok = true;
                        for (let c = 0; c < m; c++) ok = ok && Number.isFinite(v[c]);
                        if (ok) {
                            for (let c = 0; c < m; c++) out[offset + c] = v[c];
                            return;
                        }
                    }
                    throw new Error(`${caller}: Value of "config.boundary.${s.name}" must be a finite number, an array of ${m} finite numbers, or a function returning one of them.`);
                };
                const ahead = new Float64Array(m), behind = new Float64Array(m);
                const rate = (s: Side, t: number, coord: number, out: Float64Array): void => {
                    if (typeof s.value !== "function") {
                        for (let c = 0; c < m; c++) out[c] = 0;
                        return;
                    }
                    const eps = 1e-6 * Math.max(1, Math.abs(t));
                    fill(s, t + eps, coord, ahead);
                    fill(s, t - eps, coord, behind);
                    for (let c = 0; c < m; c++) out[c] = (ahead[c] - behind[c]) / (2 * eps);
                };
                const coords = (lo: number, hi: number, n: number, periodic: boolean): [number[], number] => {
                    const d = periodic ? (hi - lo) / n : (hi - lo) / (n - 1);
                    const result: number[] = new Array(n);
                    for (let i = 0; i < n; i++) result[i] = lo + i * d;
                    if (!periodic) result[n - 1] = hi;
                    return [result, d];
                };
                const nx: number = mesh.nx, ny: number = dim === 2 ? mesh.ny : 1, N = nx * ny;
                const [x, dx] = coords(mesh.x[0], mesh.x[1], nx, periodicX);
                const [yc, dy]: [number[], number] = dim === 2 ? coords(mesh.y[0], mesh.y[1], ny, periodicY) : [[0], 1];
                const fixed = new Uint8Array(N);
                const fixedNodes: number[] = [];
                const fixedSides: { s: Side; coord: number }[][] = [];
                for (let j = 0; j < ny; j++) {
                    for (let i = 0; i < nx; i++) {
                        const on: { s: Side; coord: number }[] = [];
                        if (i === 0 && left.type === "dirichlet") on.push({ s: left, coord: yc[j] });
                        if (i === nx - 1 && right.type === "dirichlet") on.push({ s: right, coord: yc[j] });
                        if (dim === 2 && j === 0 && bottom.type === "dirichlet") on.push({ s: bottom, coord: x[i] });
                        if (dim === 2 && j === ny - 1 && top.type === "dirichlet") on.push({ s: top, coord: x[i] });
                        if (on.length === 0) continue;
                        fixed[j * nx + i] = 1;
                        fixedNodes.push(j * nx + i);
                        fixedSides.push(on);
                    }
                }
                const scratch = new Float64Array(m), sum = new Float64Array(m);
                const average = (q: number, t: number, how: (s: Side, t: number, coord: number, out: Float64Array) => void): void => {
                    const on = fixedSides[q];
                    for (let c = 0; c < m; c++) sum[c] = 0;
                    for (let r = 0; r < on.length; r++) {
                        how(on[r].s, t, on[r].coord, scratch);
                        for (let c = 0; c < m; c++) sum[c] += scratch[c];
                    }
                    for (let c = 0; c < m; c++) sum[c] /= on.length;
                };
                for (let r = 0; r < sides.length; r++) {
                    if (sides[r].type !== "periodic" && typeof sides[r].value !== "function") fill(sides[r], 0, 0, scratch);
                }
                const length = order * m * N;
                const state: number[] = new Array(length).fill(0);
                const sampled = (f: any, name: string, offset: number): void => {
                    for (let j = 0; j < ny; j++) {
                        for (let i = 0; i < nx; i++) {
                            const p = j * nx + i;
                            const v = dim === 1 ? f(x[i]) : f(x[i], yc[j]);
                            if (m === 1 && typeof v === "number" && Number.isFinite(v)) {
                                state[offset + p] = v;
                                continue;
                            }
                            if (!Array.isArray(v) || v.length !== m) throw new Error(`${caller}: Property "${name}" must return ${m === 1 ? "a finite number" : `an array of ${m} finite numbers`} at every grid node.`);
                            for (let c = 0; c < m; c++) {
                                if (!Number.isFinite(v[c])) throw new Error(`${caller}: Property "${name}" must return ${m === 1 ? "a finite number" : `an array of ${m} finite numbers`} at every grid node.`);
                                state[offset + c * N + p] = v[c];
                            }
                        }
                    }
                };
                const copied = (arr: any[], name: string, offset: number, size: number): void => {
                    if (arr.length !== size) throw new Error(`${caller}: Property "${name}" must have length ${size}.`);
                    for (let i = 0; i < size; i++) {
                        if (!Number.isFinite(arr[i])) throw new Error(`${caller}: Property "${name}" must contain only finite numbers.`);
                        state[offset + i] = arr[i];
                    }
                };
                const initial = config.y0 as any;
                if (typeof initial === "function" && order === 1) {
                    sampled(initial, "config.y0", 0);
                } else if (Array.isArray(initial)) {
                    copied(initial, "config.y0", 0, length);
                } else if (order === 2 && initial !== null && typeof initial === "object" && ("u" in initial) && ("ut" in initial)) {
                    const parts: [string, number][] = [["u", 0], ["ut", m * N]];
                    for (let i = 0; i < parts.length; i++) {
                        const part = initial[parts[i][0]], name = `config.y0.${parts[i][0]}`;
                        if (typeof part === "function") sampled(part, name, parts[i][1]);
                        else if (Array.isArray(part)) copied(part, name, parts[i][1], m * N);
                        else throw new Error(`${caller}: Property "${name}" must be a function or an array of length ${m * N}.`);
                    }
                } else {
                    throw new Error(`${caller}: Property "config.y0" must be ${order === 1 ? `a function or an array of length ${length}` : `an object { u, ut } or an array of length ${length}`} for partial differential equations.`);
                }
                for (let q = 0; q < fixedNodes.length; q++) {
                    const p = fixedNodes[q];
                    average(q, t0, fill);
                    for (let c = 0; c < m; c++) state[c * N + p] = sum[c];
                    if (order === 2) {
                        average(q, t0, rate);
                        for (let c = 0; c < m; c++) state[m * N + c * N + p] = sum[c];
                    }
                }
                const W = nx + 2, pad = dim === 2 ? 1 : 0;
                const bufs: Float64Array[] = [];
                for (let c = 0; c < m; c++) bufs.push(new Float64Array(W * (ny + 2 * pad)));
                const xt: number[] = new Array(W);
                for (let i = 0; i < W; i++) xt[i] = i === 0 ? (periodicX ? x[nx - 1] : x[0] - dx) : i === W - 1 ? (periodicX ? x[0] : x[nx - 1] + dx) : x[i - 1];
                const ghostL = new Float64Array(ny * m), ghostR = new Float64Array(ny * m), ghostB = new Float64Array(W * m), ghostT = new Float64Array(W * m);
                const reflect = (t: number, constants: boolean): void => {
                    if (left.type === "neumann" && (constants === (typeof left.value !== "function"))) for (let j = 0; j < ny; j++) fill(left, t, yc[j], ghostL, j * m);
                    if (right.type === "neumann" && (constants === (typeof right.value !== "function"))) for (let j = 0; j < ny; j++) fill(right, t, yc[j], ghostR, j * m);
                    if (dim === 1) return;
                    if (bottom.type === "neumann" && (constants === (typeof bottom.value !== "function"))) for (let i = 0; i < W; i++) fill(bottom, t, xt[i], ghostB, i * m);
                    if (top.type === "neumann" && (constants === (typeof top.value !== "function"))) for (let i = 0; i < W; i++) fill(top, t, xt[i], ghostT, i * m);
                };
                reflect(t0, true);
                const U: number[] = new Array(m).fill(0), UX: number[] = new Array(m).fill(0), UY: number[] = new Array(m).fill(0), UXX: number[] = new Array(m).fill(0), UYY: number[] = new Array(m).fill(0), UXY: number[] = new Array(m).fill(0), UT: number[] = new Array(m).fill(0);
                const single = diff.rule as (t: number, x: number, u: number, ux: number, uxx: number, ut?: number) => number;
                const system = diff.rule as (t: number, x: number, u: number[], ux: number[], uxx: number[], ut?: number[]) => number[];
                const planar = diff.rule as (t: number, x: number, y: number, u: number, ux: number, uy: number, uxx: number, uyy: number, uxy: number, ut?: number) => number;
                const planarSystem = diff.rule as (t: number, x: number, y: number, u: number[], ux: number[], uy: number[], uxx: number[], uyy: number[], uxy: number[], ut?: number[]) => number[];
                const unstable = `${caller}: Rule of a partial differential equation must return finite numbers; a smaller step size may be needed for stability.`;
                const rule = (t: number, y: number[]): number[] => {
                    const out: number[] = new Array(length);
                    reflect(t, false);
                    for (let c = 0; c < m; c++) {
                        const g = bufs[c], base = c * N;
                        for (let j = 0; j < ny; j++) {
                            const row = (j + pad) * W, src = base + j * nx;
                            for (let i = 0; i < nx; i++) g[row + i + 1] = y[src + i];
                            if (periodicX) {
                                g[row] = g[row + nx];
                                g[row + nx + 1] = g[row + 1];
                            } else {
                                if (left.type === "neumann") g[row] = g[row + 2] + 2 * dx * ghostL[j * m + c];
                                if (right.type === "neumann") g[row + nx + 1] = g[row + nx - 1] + 2 * dx * ghostR[j * m + c];
                            }
                        }
                        if (dim === 2) {
                            const last = ny * W, beyond = (ny + 1) * W;
                            if (periodicY) {
                                for (let i = 0; i < W; i++) {
                                    g[i] = g[last + i];
                                    g[beyond + i] = g[W + i];
                                }
                            } else {
                                if (bottom.type === "neumann") for (let i = 0; i < W; i++) g[i] = g[2 * W + i] + 2 * dy * ghostB[i * m + c];
                                if (top.type === "neumann") for (let i = 0; i < W; i++) g[beyond + i] = g[(ny - 1) * W + i] + 2 * dy * ghostT[i * m + c];
                            }
                        }
                    }
                    for (let q = 0; q < fixedNodes.length; q++) {
                        const p = fixedNodes[q];
                        average(q, t, rate);
                        for (let c = 0; c < m; c++) {
                            out[c * N + p] = sum[c];
                            if (order === 2) out[m * N + c * N + p] = 0;
                        }
                    }
                    for (let j = 0; j < ny; j++) {
                        for (let i = 0; i < nx; i++) {
                            const p = j * nx + i;
                            if (fixed[p]) continue;
                            const k = (j + pad) * W + i + 1;
                            if (m === 1) {
                                const g = bufs[0];
                                const u = g[k], ux = (g[k + 1] - g[k - 1]) / (2 * dx), uxx = (g[k + 1] - 2 * g[k] + g[k - 1]) / (dx * dx);
                                let r: number;
                                if (dim === 1) {
                                    r = order === 1 ? single(t, x[i], u, ux, uxx) : single(t, x[i], u, ux, uxx, y[N + p]);
                                } else {
                                    const uy = (g[k + W] - g[k - W]) / (2 * dy), uyy = (g[k + W] - 2 * g[k] + g[k - W]) / (dy * dy), uxy = (g[k + W + 1] - g[k + W - 1] - g[k - W + 1] + g[k - W - 1]) / (4 * dx * dy);
                                    r = order === 1 ? planar(t, x[i], yc[j], u, ux, uy, uxx, uyy, uxy) : planar(t, x[i], yc[j], u, ux, uy, uxx, uyy, uxy, y[N + p]);
                                }
                                if (!Number.isFinite(r)) throw new Error(typeof r === "number" ? unstable : `${caller}: Rule of a partial differential equation with one component must return a number.`);
                                if (order === 1) {
                                    out[p] = r;
                                } else {
                                    out[p] = y[N + p];
                                    out[N + p] = r;
                                }
                            } else {
                                for (let c = 0; c < m; c++) {
                                    const g = bufs[c];
                                    U[c] = g[k];
                                    UX[c] = (g[k + 1] - g[k - 1]) / (2 * dx);
                                    UXX[c] = (g[k + 1] - 2 * g[k] + g[k - 1]) / (dx * dx);
                                    if (dim === 2) {
                                        UY[c] = (g[k + W] - g[k - W]) / (2 * dy);
                                        UYY[c] = (g[k + W] - 2 * g[k] + g[k - W]) / (dy * dy);
                                        UXY[c] = (g[k + W + 1] - g[k + W - 1] - g[k - W + 1] + g[k - W - 1]) / (4 * dx * dy);
                                    }
                                    if (order === 2) UT[c] = y[m * N + c * N + p];
                                }
                                let r: number[];
                                if (dim === 1) r = order === 1 ? system(t, x[i], U, UX, UXX) : system(t, x[i], U, UX, UXX, UT);
                                else r = order === 1 ? planarSystem(t, x[i], yc[j], U, UX, UY, UXX, UYY, UXY) : planarSystem(t, x[i], yc[j], U, UX, UY, UXX, UYY, UXY, UT);
                                if (!Array.isArray(r) || r.length !== m) throw new Error(`${caller}: Rule of a partial differential equation with ${m} components must return an array of length ${m}.`);
                                for (let c = 0; c < m; c++) {
                                    if (!Number.isFinite(r[c])) throw new Error(unstable);
                                    if (order === 1) {
                                        out[c * N + p] = r[c];
                                    } else {
                                        out[c * N + p] = UT[c];
                                        out[m * N + c * N + p] = r[c];
                                    }
                                }
                            }
                        }
                    }
                    return out;
                };
                return { rule, y0: state, grid: dim === 2 ? { x, y: yc } : { x }, mesh: { nx, ny, fields: order * m, periodicX, periodicY } };
            } else {
                let y0: number[];
                let keys: string[] | undefined;
                if (typeof config.y0 === "number" && Number.isFinite(config.y0)) {
                    if (diff.dimension !== 1) throw new Error(`${caller}: Property "config.y0" can be a scalar only when property "diff.dimension" is equal to 1.`);
                    y0 = [config.y0];
                } else if (Array.isArray(config.y0)) {
                    if (config.y0.length !== diff.dimension) throw new Error(`${caller}: Property "config.y0" must have length ${diff.dimension}.`);
                    if (config.y0.length > 0 && !Number.isFinite(config.y0[0]) || config.y0.length > 1 && !Number.isFinite(config.y0[config.y0.length - 1])) throw new Error(`${caller}: Parameter "config.y0" must begin and end with finite numbers.`);
                    y0 = config.y0.slice();
                } else {
                    if (typeof config.y0 !== "object" || config.y0 === null) throw new Error(`${caller}: Property "config.y0" must be a number, number array, or object.`);
                    const y0obj = config.y0 as any;
                    if (diff.type === "single" && diff.order === 2) {
                        if (("y0" in y0obj) && ("dy0" in y0obj)) {
                            const a = y0obj.y0;
                            const b = y0obj.dy0;
                            if (!Number.isFinite(a) || !Number.isFinite(b)) throw new Error(`${caller}: Properties "config.y0.y0" and "config.y0.dy0" must be finite numbers.`);
                            y0 = [a, b];
                            if (config.returnObject) keys = ["y", "dy"];
                        } else if (("y" in y0obj) && ("dy" in y0obj)) {
                            const a = y0obj.y;
                            const b = y0obj.dy;
                            if (!Number.isFinite(a) || !Number.isFinite(b)) throw new Error(`${caller}: Properties "config.y0.y" and "config.y0.dy" must be finite numbers.`);
                            y0 = [a, b];
                            if (config.returnObject) keys = ["y", "dy"];
                        } else {
                            throw new Error(`${caller}: For second-order scalar, provide initial conditions as { y0, dy0 } or { y, dy }.`);
                        }
                    } else if (diff.dimension === 1 && ("y0" in y0obj) && typeof y0obj.y0 === "number" && Number.isFinite(y0obj.y0)) {
                        y0 = [y0obj.y0];
                        if (config.returnObject) keys = ["y"];
                    } else if (diff.dimension === 1 && ("y" in y0obj) && typeof y0obj.y === "number" && Number.isFinite(y0obj.y)) {
                        y0 = [y0obj.y];
                        if (config.returnObject) keys = ["y"];
                    } else if ("y0" in y0obj && Array.isArray(y0obj.y0)) {
                        const arr = y0obj.y0 as number[];
                        if (arr.length !== diff.dimension) throw new Error(`${caller}: Property "config.y0.y0" must have length ${diff.dimension}.`);
                        if (arr.length > 0 && !Number.isFinite(arr[0]) || arr.length > 1 && !Number.isFinite(arr[arr.length - 1])) throw new Error(`${caller}: Property "config.y0.y0" must begin and end with finite numbers.`);
                        y0 = arr.slice();
                    } else {
                        keys = Object.keys(config.y0).sort();
                        if (keys.length !== diff.dimension) throw new Error(`${caller}: Property "config.y0" must have exactly ${diff.dimension} numeric properties, but it has ${keys.length}.`);
                        if (keys.length > 0 && !Number.isFinite((config.y0 as any)[keys[0]]) || keys.length > 1 && !Number.isFinite((config.y0 as any)[keys[keys.length - 1]])) throw new Error(`${caller}: Parameter "config.y0" must begin and end with finite numeric properties.`);
                        const arr: number[] = [];
                        for (let i = 0; i < keys.length; i++) {
                            const v = (config.y0 as any)[keys[i]];
                            arr.push(v);
                        }
                        y0 = arr;
                    }
                }
                if (config.returnObject && !keys) {
                    if (diff.type === "single" && diff.order === 2 && diff.dimension === 2) {
                        keys = ["y", "dy"];
                    } else if (diff.dimension === 1) {
                        keys = ["y"];
                    } else {
                        keys = Array.from({ length: diff.dimension }, (_, i) => `y${i + 1}`);
                    }
                }
                return { rule: diff.rule, y0, keys };
            }
        };

        /**
         * Samples a solution at a time using linear interpolation between the nearest grid points, with times that may be ascending or descending. (No extrapolation as it clamps to endpoints.)
         * @param {{ t: number[]; y: number[][] }} sol - The solution.
         * @param {number} time - The time to sample at.
         * @returns {number[]}
         * @example
         * const result = Chalkboard.diff.at({ t: [0, 1, 2], y: [[0], [1], [4]] }, 1.5); // Interpolates the solution at t = 1.5
         */
        export const at = (sol: { t: number[]; y: number[][] }, time: number): number[] => {
            if (!Number.isFinite(time)) throw new Error(`Chalkboard.diff.at: Parameter "time" must be a finite number.`);
            const t = sol.t;
            const y = sol.y;
            if (t.length !== y.length || t.length === 0) throw new Error(`Chalkboard.diff.at: Invalid solution object.`);
            if (t.length > 1) {
                const s = Math.sign(t[1] - t[0]);
                for (let i = 1; i < t.length; i++) {
                    if (s === 0 || Math.sign(t[i] - t[i - 1]) !== s) throw new Error(`Chalkboard.diff.at: Property "sol.t" must be strictly increasing or strictly decreasing.`);
                }
            }
            const last = t.length - 1;
            const descending = t[last] < t[0];
            if (descending ? time >= t[0] : time <= t[0]) return y[0].slice();
            if (descending ? time <= t[last] : time >= t[last]) return y[last].slice();
            let lo = 0, hi = last;
            while (hi - lo > 1) {
                const mid = Math.floor((lo + hi) / 2);
                if (descending ? t[mid] >= time : t[mid] <= time) lo = mid;
                else hi = mid;
            }
            const a = (time - t[lo]) / (t[hi] - t[lo]);
            const result: number[] = [];
            for (let k = 0; k < y[lo].length; k++) result.push((1 - a) * y[lo][k] + a * y[hi][k]);
            return result;
        };

        /**
         * Defines a Bernoulli equation: y' + p(t)y = q(t)y^n. Equivalent: y' = -p(t)y + q(t)y^n.
         * @param {number | ((t: number) => number)} p - p or p(t)
         * @param {number | ((t: number) => number)} q - q or q(t)
         * @param {number} n - Exponent
         * @returns {ChalkboardODE}
         * @example
         * const ode = Chalkboard.diff.Bernoulli(1, 1, 2);
         * const derivative = ode.rule(0, [2]); // Evaluates the Bernoulli equation
         */
        export const Bernoulli = (p: number | ((t: number) => number), q: number | ((t: number) => number), n: number): ChalkboardODE => {
            if (!Number.isFinite(n)) throw new Error(`Chalkboard.diff.Bernoulli: Parameter "n" must be a finite number.`);
            const P = (typeof p === "number") ? ((t: number) => p) : p;
            const Q = (typeof q === "number") ? ((t: number) => q) : q;
            return Chalkboard.diff.init((t: number, y: number) => -P(t) * y + Q(t) * Math.pow(y, n)) as ChalkboardODE;
        };

        /**
         * Defines a modified Bessel equation of order ν: x²y'' + xy' - (x² + ν²)y = 0. Equivalent: y'' = -(1/x)y' + (1 + (ν²/x²))y. Note: singular at x=0. Start from x>0.
         * @param {number} nu - Order ν
         * @returns {ChalkboardODE}
         * @example
         * const ode = Chalkboard.diff.BesselI(0);
         * const derivative = ode.rule(1, [1, 0]); // Evaluates the modified Bessel equation
         */
        export const BesselI = (nu: number = 0): ChalkboardODE => {
            if (!Number.isFinite(nu)) throw new Error(`Chalkboard.diff.BesselI: Parameter "nu" must be a finite number.`);
            return Chalkboard.diff.init((t: number, y: number, dy: number) => {
                if (t === 0) throw new Error(`Chalkboard.diff.BesselI: Singular at t = 0.`);
                const x = t;
                return -(1 / x) * dy + (1 + (nu * nu) / (x * x)) * y;
            }) as ChalkboardODE;
        };

        /**
         * Defines a Bessel equation of order ν: x²y'' + xy' + (x² - ν²)y = 0. Equivalent: y'' = -(1/x)y' - (1 - (ν²/x²))y. Note: singular at x=0. Start from x>0.
         * @param {number} nu - Order ν
         * @returns {ChalkboardODE}
         * @example
         * const ode = Chalkboard.diff.BesselJ(0);
         * const derivative = ode.rule(1, [1, 0]); // Evaluates Bessel's equation
         */
        export const BesselJ = (nu: number = 0): ChalkboardODE => {
            if (!Number.isFinite(nu)) throw new Error(`Chalkboard.diff.BesselJ: Parameter "nu" must be a finite number.`);
            return Chalkboard.diff.init((t: number, y: number, dy: number) => {
                if (t === 0) throw new Error(`Chalkboard.diff.BesselJ: Singular at t = 0.`);
                const x = t;
                const term = 1 - (nu * nu) / (x * x);
                return -(1 / x) * dy - term * y;
            }) as ChalkboardODE;
        };

        /**
         * Returns the index of the time grid closest to a target time.
         * @param {number[]} t - Time array.
         * @param {number} target - Target time.
         * @returns {number}
         * @example
         * const result = Chalkboard.diff.closestIndex([0, 0.5, 1, 1.5], 0.9); // Returns 2
         */
        export const closestIndex = (t: number[], target: number): number => {
            if (!Array.isArray(t) || t.length === 0) throw new Error(`Chalkboard.diff.closestIndex: Parameter "t" must be a non-empty array.`);
            if (!Number.isFinite(target)) throw new Error(`Chalkboard.diff.closestIndex: Parameter "target" must be a finite number.`);
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
         * @example
         * const result = Chalkboard.diff.component({ t: [0, 1], y: [[1, 2], [3, 4]] }, 1); // Returns [2, 4]
         */
        export const component = (sol: { t: number[]; y: number[][] }, index: number): number[] => {
            if (!Number.isInteger(index) || index < 0) throw new Error(`Chalkboard.diff.component: Parameter "index" must be a non-negative integer.`);
            if (sol.y.length > 0 && index >= sol.y[0].length || sol.y.length > 1 && index >= sol.y[sol.y.length - 1].length) throw new Error(`Chalkboard.diff.component: Parameter "index" must be within the first and last solution rows.`);
            const result: number[] = [];
            for (let i = 0; i < sol.y.length; i++) {
                result.push(sol.y[i][index]);
            }
            return result;
        };

        /**
         * Returns an estimate of y'(t) (an estimate of the derivative series) from a solved solution using finite differences on the solution grid.
         * @param {{ t: number[]; y: number[][] }} sol - Solution
         * @returns {number[][]}
         * @example
         * const result = Chalkboard.diff.derivative({ t: [0, 1, 2], y: [[0], [1], [4]] }); // Estimates the derivative samples
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
         * @example
         * const ode = Chalkboard.diff.Duffing(0.2, -1, 1, 0.3, 1.2);
         * const acceleration = ode.rule(0, [1, 0]); // Evaluates a Duffing oscillator
         */
        export const Duffing = (delta: number, alpha: number, beta: number, gamma: number, omega: number): ChalkboardODE => {
            if (!Number.isFinite(delta) || !Number.isFinite(alpha) || !Number.isFinite(beta) || !Number.isFinite(gamma) || !Number.isFinite(omega)) throw new Error(`Chalkboard.diff.Duffing: Parameters "delta", "alpha", "beta", "gamma", and "omega" must be finite numbers.`);
            return Chalkboard.diff.init((t: number, x: number, v: number) => -delta * v - alpha * x - beta * x * x * x + gamma * Math.cos(omega * t)) as ChalkboardODE;
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
            if ((ode as { type: string }).type === "pde") throw new Error(`Chalkboard.diff.error: Parameter "ode" must be an ordinary differential equation.`);
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
         * @example
         * const ode = Chalkboard.diff.exponential(-2);
         * const derivative = ode.rule(0, [3]); // Returns [-6]
         */
        export const exponential = (k: number = 1): ChalkboardODE => {
            if (!Number.isFinite(k)) throw new Error(`Chalkboard.diff.exponential: Parameter "k" must be a finite number.`);
            return Chalkboard.diff.init((t: number, y: number) => k * y) as ChalkboardODE;
        };

        /**
         * Defines a Gompertz equation: y' = ayln(K/y).
         * @param {number} a - Growth rate
         * @param {number} K - Carrying capacity (K > 0)
         * @returns {ChalkboardODE}
         * @example
         * const ode = Chalkboard.diff.Gompertz(1, 100);
         * const derivative = ode.rule(0, [10]); // Evaluates Gompertz growth
         */
        export const Gompertz = (a: number = 1, K: number = 1): ChalkboardODE => {
            if (!Number.isFinite(a)) throw new Error(`Chalkboard.diff.Gompertz: Parameter "a" must be a finite number.`);
            if (!Number.isFinite(K) || K <= 0) throw new Error(`Chalkboard.diff.Gompertz: Parameter "K" must be greater than 0.`);
            return Chalkboard.diff.init((t: number, y: number) => a * y * Math.log(K / y)) as ChalkboardODE;
        };

        /**
         * Defines an undamped harmonic oscillator: y'' + (w²)y = 0. Equivalent: y'' = -(w²)y.
         * @param {number} w - Angular frequency (must be greater than or equal to 0)
         * @returns {ChalkboardODE}
         * @example
         * const ode = Chalkboard.diff.harmonic(2);
         * const acceleration = ode.rule(0, [3, 0]); // Returns [0, -12]
         */
        export const harmonic = (w: number = 1): ChalkboardODE => {
            if (!Number.isFinite(w) || w < 0) throw new Error(`Chalkboard.diff.harmonic: Parameter "w" must be a finite number greater than or equal to 0.`);
            return Chalkboard.diff.init((t: number, y: number, dy: number) => -(w * w) * y) as ChalkboardODE;
        };

        /**
         * Defines a damped harmonic oscillator: y'' + (2ζω)y' + (ω²)y = 0. Equivalent: y'' = -(2ζω)y' - (ω²)y.
         * @param {number} w - Angular frequency (must be greater than or equal to 0)
         * @param {number} zeta - Damping ratio (must be greater than or equal to 0)
         * @returns {ChalkboardODE}
         * @example
         * const ode = Chalkboard.diff.harmonicDamped(2, 0.1);
         * const acceleration = ode.rule(0, [3, 4]); // Evaluates damped harmonic motion
         */
        export const harmonicDamped = (w: number = 1, zeta: number = 0.1): ChalkboardODE => {
            if (!Number.isFinite(w) || w < 0) throw new Error(`Chalkboard.diff.harmonicDamped: Parameter "w" must be a finite number greater than or equal to 0.`);
            if (!Number.isFinite(zeta) || zeta < 0) throw new Error(`Chalkboard.diff.harmonicDamped: Parameter "zeta" must be a finite number greater than or equal to 0.`);
            return Chalkboard.diff.init((t: number, y: number, dy: number) => -2 * zeta * w * dy - (w * w) * y) as ChalkboardODE;
        };

        /**
         * Defines a forced harmonic oscillator: y'' + (2ζω)y' + (ω²)y = F(t). Equivalent: y'' = F(t) - (2ζω)y' - (ω²)y.
         * @param {number} w - Angular frequency (must be greater than or equal to 0)
         * @param {number} zeta - Damping ratio (must be greater than or equal to 0)
         * @param {(t: number) => number} F - Forcing term
         * @returns {ChalkboardODE}
         * @example
         * const ode = Chalkboard.diff.harmonicForced(2, 0.1, (t) => Math.cos(t));
         * const acceleration = ode.rule(0, [3, 4]); // Evaluates forced harmonic motion
         */
        export const harmonicForced = (w: number, zeta: number, F: (t: number) => number): ChalkboardODE => {
            if (!Number.isFinite(w) || w < 0) throw new Error(`Chalkboard.diff.harmonicForced: Parameter "w" must be a finite number greater than or equal to 0.`);
            if (!Number.isFinite(zeta) || zeta < 0) throw new Error(`Chalkboard.diff.harmonicForced: Parameter "zeta" must be a finite number greater than or equal to 0.`);
            if (typeof F !== "function") throw new Error(`Chalkboard.diff.harmonicForced: Parameter "F" must be a function.`);
            return Chalkboard.diff.init((t: number, y: number, dy: number) => F(t) - 2 * zeta * w * dy - (w * w) * y) as ChalkboardODE;
        };

        /**
         * Defines an ordinary differential equation or a partial differential equation.
         * @param {((t: number, y: number) => number) | ((t: number, y: number, dy: number) => number) | ((t: number, y: number[]) => number[]) | ChalkboardPDE["rule"]} rule - The differential equation rule function.
         * @param {number | { dimension: number; order?: number; components?: number }} [config] - Optional, the dimension of an ODE system, or an object `{ dimension, order, components }` defining a partial differential equation.
         * @returns {ChalkboardODE | ChalkboardPDE}
         * @example
         * // First-order scalar ODE: y' = -2y
         * const ode1 = Chalkboard.diff.init((t, y) => -2 * y);
         * 
         * // Second-order scalar ODE: y'' = -y  (harmonic oscillator)
         * const ode2 = Chalkboard.diff.init((t, y, dy) => -y);
         * 
         * // System ODE: dy/dt = [y2, -y1]  (2D system)
         * const odeSys = Chalkboard.diff.init((t, y) => [y[1], -y[0]], 2);
         * 
         * // One-dimensional heat equation: u_t = 0.1 u_xx
         * const pde1 = Chalkboard.diff.init((t, x, u, ux, uxx) => 0.1 * uxx, { dimension: 1 });
         * 
         * // Two-dimensional heat equation: u_t = u_xx + u_yy
         * const pde2 = Chalkboard.diff.init((t, x, y, u, ux, uy, uxx, uyy) => uxx + uyy, { dimension: 2 });
         */
        export const init = (
            rule: ((t: number, y: number) => number) | ((t: number, y: number, dy: number) => number) | ((t: number, y: number[]) => number[]) | ChalkboardPDE["rule"],
            config?: number | { dimension: 1 | 2; order?: 1 | 2; components?: number }
        ): ChalkboardODE | ChalkboardPDE => {
            if (typeof rule !== "function") throw new Error(`Chalkboard.diff.init: Parameter "rule" must be a function.`);
            if (config === undefined || typeof config === "number") {
                const dimension = config;
                if (typeof dimension === "number") {
                    if (!Number.isInteger(dimension) || dimension < 1) throw new Error(`Chalkboard.diff.init: Parameter "dimension" must be a positive integer.`);
                    const sys = rule as (t: number, y: number[]) => number[];
                    const ode: ChalkboardODE = {
                        rule: (t: number, y: number[]) => {
                            const out = sys(t, y);
                            if (!Array.isArray(out)) throw new Error(`Chalkboard.diff.init: System rule must return an array of numbers.`);
                            if (out.length !== dimension) throw new Error(`Chalkboard.diff.init: System rule must return an array of length ${dimension}.`);
                            if (out.length > 0 && !Number.isFinite(out[0]) || out.length > 1 && !Number.isFinite(out[out.length - 1])) throw new Error(`Chalkboard.diff.init: System rule output must begin and end with finite numbers.`);
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
                            if (!Number.isFinite(dy)) throw new Error(`Chalkboard.diff.init: Scalar rule must return a finite number.`);
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
                            if (!Number.isFinite(ddy)) throw new Error(`Chalkboard.diff.init: Second-order scalar rule must return a finite number.`);
                            return [y[1], ddy];
                        },
                        type: "single",
                        order: 2,
                        dimension: 2
                    };
                }
                throw new Error(`Chalkboard.diff.init: Invalid "rule" arity. Expected (t,y) or (t,y,dy), or provide dimension for systems.`);
            }
            if (config !== null && typeof config === "object" && !Array.isArray(config)) {
                const dimension = config.dimension;
                if (dimension !== 1 && dimension !== 2) throw new Error(`Chalkboard.diff.init: Property "config.dimension" must be 1 or 2.`);
                const order = config.order ?? 1;
                if (order !== 1 && order !== 2) throw new Error(`Chalkboard.diff.init: Property "config.order" must be 1 or 2.`);
                const components = config.components ?? 1;
                if (!Number.isInteger(components) || components < 1) throw new Error(`Chalkboard.diff.init: Property "config.components" must be a positive integer.`);
                return { rule: rule as ChalkboardPDE["rule"], order, dimension, components, type: "pde" };
            }
            throw new Error(`Chalkboard.diff.init: Parameter "config" must be a number or an object.`);
        };

        /**
         * Defines a Kepler two-body problem in 2D (inverse-square central force). Unit mass: r'' = -μr / |r|^3. State: [x, y, vx, vy].
         * @param {number} [mu=1] - Gravitational parameter μ = G(M+m)
         * @returns {ChalkboardODE}
         * @example
         * const ode = Chalkboard.diff.Kepler2D(1);
         * const derivative = ode.rule(0, [1, 0, 0, 1]); // Evaluates a circular-orbit state
         */
        export const Kepler2D = (mu: number = 1): ChalkboardODE => {
            if (!Number.isFinite(mu) || mu < 0) throw new Error(`Chalkboard.diff.Kepler2D: Parameter "mu" must be a finite non-negative number.`);
            return Chalkboard.diff.init((t: number, y: number[]) => {
                const x = y[0], yy = y[1], vx = y[2], vy = y[3];
                const r2 = x * x + yy * yy;
                const r = Math.sqrt(r2);
                if (r === 0) throw new Error(`Chalkboard.diff.Kepler2D: Encountered r=0 singularity.`);
                const invr3 = 1 / (r2 * r);
                const ax = -mu * x * invr3;
                const ay = -mu * yy * invr3;
                return [vx, vy, ax, ay];
            }, 4) as ChalkboardODE;
        };

        /**
         * Defines a Kepler two-body problem in 3D (inverse-square central force). Unit mass: r'' = -μr / |r|^3. State: [x, y, z, vx, vy, vz].
         * @param {number} [mu=1] - Gravitational parameter μ = G(M+m)
         * @returns {ChalkboardODE}
         * @example
         * const ode = Chalkboard.diff.Kepler3D(1);
         * const derivative = ode.rule(0, [1, 0, 0, 0, 1, 0]); // Evaluates a three-dimensional orbit state
         */
        export const Kepler3D = (mu: number = 1): ChalkboardODE => {
            if (!Number.isFinite(mu) || mu < 0) throw new Error(`Chalkboard.diff.Kepler3D: Parameter "mu" must be a finite non-negative number.`);
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
            }, 6) as ChalkboardODE;
        };

        /**
         * Defines a first-order linear scalar ODE: y' = a(t)y + b(t).
         * @param {((t: number) => number) | number} a - Coefficient a(t) or constant a.
         * @param {((t: number) => number) | number} b - Coefficient b(t) or constant b.
         * @returns {ChalkboardODE}
         * @example
         * const ode = Chalkboard.diff.linear1(-2, 1);
         * const derivative = ode.rule(0, [3]); // Returns [-5]
         */
        export const linear1 = (a: ((t: number) => number) | number, b: ((t: number) => number) | number): ChalkboardODE => {
            if ((!Number.isFinite(a)) && typeof a !== "function") throw new Error(`Chalkboard.diff.linear1: Parameter "a" must be a finite number or a function.`);
            if ((!Number.isFinite(b)) && typeof b !== "function") throw new Error(`Chalkboard.diff.linear1: Parameter "b" must be a finite number or a function.`);
            const A = typeof a === "number" ? (() => a) : a;
            const B = typeof b === "number" ? (() => b) : b;
            return Chalkboard.diff.init((t: number, y: number) => A(t) * y + B(t)) as ChalkboardODE;
        };

        /**
         * Defines a second-order linear scalar ODE: y'' = a(t)y' + b(t)y + c(t).
         * @param {((t: number) => number) | number} a - Coefficient a(t) or constant a.
         * @param {((t: number) => number) | number} b - Coefficient b(t) or constant b.
         * @param {((t: number) => number) | number} c - Coefficient c(t) or constant c.
         * @returns {ChalkboardODE}
         * @example
         * const ode = Chalkboard.diff.linear2(-1, -4, 0);
         * const derivative = ode.rule(0, [3, 2]); // Evaluates a second-order linear equation
         */
        export const linear2 = (a: ((t: number) => number) | number, b: ((t: number) => number) | number, c: ((t: number) => number) | number): ChalkboardODE => {
            if ((!Number.isFinite(a)) && typeof a !== "function") throw new Error(`Chalkboard.diff.linear2: Parameter "a" must be a finite number or a function.`);
            if ((!Number.isFinite(b)) && typeof b !== "function") throw new Error(`Chalkboard.diff.linear2: Parameter "b" must be a finite number or a function.`);
            if ((!Number.isFinite(c)) && typeof c !== "function") throw new Error(`Chalkboard.diff.linear2: Parameter "c" must be a finite number or a function.`);
            const A = typeof a === "number" ? (() => a) : a;
            const B = typeof b === "number" ? (() => b) : b;
            const C = typeof c === "number" ? (() => c) : c;
            return Chalkboard.diff.init((t: number, y: number, dy: number) => A(t) * dy + B(t) * y + C(t)) as ChalkboardODE;
        };

        /**
         * Defines a logistic growth model: y' = ry(1 - y/K).
         * @param {number} r - Growth rate
         * @param {number} K - Carrying capacity (non-zero)
         * @returns {ChalkboardODE}
         * @example
         * const ode = Chalkboard.diff.logistic(1, 100);
         * const derivative = ode.rule(0, [50]); // Returns [25]
         */
        export const logistic = (r: number = 1, K: number = 1): ChalkboardODE => {
            if (!Number.isFinite(r)) throw new Error(`Chalkboard.diff.logistic: Parameter "r" must be a finite number.`);
            if (!Number.isFinite(K) || K === 0) throw new Error(`Chalkboard.diff.logistic: Parameter "K" must be a finite non-zero number.`);
            return Chalkboard.diff.init((t: number, y: number) => r * y * (1 - y / K)) as ChalkboardODE;
        };

        /**
         * Defines a Lorenz attractor: x' = σ(y - x), y' = x(ρ - z) - y, z' = xy - βz, state: [x, y, z].
         * @param {number} [sigma=10] - σ, Prandtl number
         * @param {number} [rho=28] - ρ, Rayleigh number
         * @param {number} [beta=8/3] - β, geometric factor
         * @returns {ChalkboardODE}
         * @example
         * const ode = Chalkboard.diff.Lorenz();
         * const derivative = ode.rule(0, [1, 1, 1]); // Evaluates the Lorenz system
         */
        export const Lorenz = (sigma: number = 10, rho: number = 28, beta: number = 8 / 3): ChalkboardODE => {
            if (!Number.isFinite(sigma) || !Number.isFinite(rho) || !Number.isFinite(beta)) throw new Error(`Chalkboard.diff.Lorenz: Parameters "sigma", "rho", and "beta" must be finite numbers.`);
            return Chalkboard.diff.init((t: number, y: number[]) => {
                const x = y[0], yy = y[1], z = y[2];
                return [
                    sigma * (yy - x),
                    x * (rho - z) - yy,
                    x * yy - beta * z
                ];
            }, 3) as ChalkboardODE;
        };

        /**
         * Defines a Lotka–Volterra predator-prey model: x' = αx - βxy, y' = δxy - γy.
         * @param {number} alpha - Prey growth rate
         * @param {number} beta - Predation rate
         * @param {number} gamma - Predator death rate
         * @param {number} delta - Predator reproduction rate
         * @returns {ChalkboardODE}
         * @example
         * const ode = Chalkboard.diff.LotkaVolterra(1.5, 1, 3, 1);
         * const derivative = ode.rule(0, [10, 5]); // Evaluates predator-prey dynamics
         */
        export const LotkaVolterra = (alpha: number = 1, beta: number = 1, gamma: number = 1, delta: number = 1): ChalkboardODE => {
            if (!Number.isFinite(alpha) || !Number.isFinite(beta) || !Number.isFinite(gamma) || !Number.isFinite(delta)) throw new Error(`Chalkboard.diff.LotkaVolterra: Parameters "alpha", "beta", "gamma", and "delta" must be finite numbers.`);
            return Chalkboard.diff.init((t: number, y: number[]) => {
                const x = y[0], p = y[1];
                return [alpha * x - beta * x * p, delta * x * p - gamma * p];
            }, 2) as ChalkboardODE;
        };

        /**
         * Defines a mass-spring-damper system: mx'' + cx' + kx = 0. Equivalent: x'' = -(c/m)x' - (k/m)x.
         * @param {number} m - Mass (non-zero)
         * @param {number} c - Damping
         * @param {number} k - Spring constant
         * @returns {ChalkboardODE}
         * @example
         * const ode = Chalkboard.diff.massSpringDamper(2, 0.5, 8);
         * const acceleration = ode.rule(0, [1, 0]); // Evaluates a mass-spring-damper system
         */
        export const massSpringDamper = (m: number, c: number, k: number): ChalkboardODE => {
            if (!Number.isFinite(m) || m === 0) throw new Error(`Chalkboard.diff.massSpringDamper: Parameter "m" must be finite and non-zero.`);
            if (!Number.isFinite(c)) throw new Error(`Chalkboard.diff.massSpringDamper: Parameter "c" must be a finite number.`);
            if (!Number.isFinite(k)) throw new Error(`Chalkboard.diff.massSpringDamper: Parameter "k" must be a finite number.`);
            return Chalkboard.diff.init((t: number, x: number, v: number) => -(c / m) * v - (k / m) * x) as ChalkboardODE;
        };

        /**
         * Defines a pendulum (nonlinear) with optional damping and external torque: θ'' + (b)θ' + (g/L)sin(θ) = τ(t). Equivalent: θ'' = τ(t) - bθ' - (g/L)sin(θ).
         * @param {number} [params.g=9.81] - Gravity (greater than or equal to 0)
         * @param {number} [params.L=1] - Length (non-zero)
         * @param {number} [params.b=0] - Damping coefficient
         * @param {(t:number)=>number} [params.tau] - External torque τ(t) (0 by default)
         * @returns {ChalkboardODE}
         * @example
         * const ode = Chalkboard.diff.pendulum({ L: 2, g: 9.81 });
         * const acceleration = ode.rule(0, [Chalkboard.PI(1 / 2), 0]); // Evaluates a simple pendulum
         */
        export const pendulum = (params: { g?: number; L?: number; b?: number; tau?: (t: number) => number; } = {}): ChalkboardODE => {
            if (params === null || typeof params !== "object" || Array.isArray(params)) throw new Error(`Chalkboard.diff.pendulum: Parameter "params" must be an object.`);
            const g = params.g ?? 9.81;
            const L = params.L ?? 1;
            const b = params.b ?? 0;
            const tau = params.tau ?? (() => 0);
            if (!Number.isFinite(g) || g < 0) throw new Error(`Chalkboard.diff.pendulum: Property "params.g" must be a finite number greater than or equal to 0.`);
            if (!Number.isFinite(L) || L <= 0) throw new Error(`Chalkboard.diff.pendulum: Property "params.L" must be greater than 0.`);
            if (!Number.isFinite(b) || b < 0) throw new Error(`Chalkboard.diff.pendulum: Property "params.b" must be greater than or equal to 0.`);
            if (typeof tau !== "function") throw new Error(`Chalkboard.diff.pendulum: Property "params.tau" must be a function.`);
            return Chalkboard.diff.init((t: number, theta: number, omega: number) => tau(t) - b * omega - (g / L) * Math.sin(theta)) as ChalkboardODE;
        };

        /**
         * Defines a pendulum with linear (viscous) and quadratic (turbulent-ish) drag: θ'' + bθ' + c|θ'|θ' + (g/L)sin(θ) = τ(t). Equivalent: θ'' = τ(t) - bθ' - c|θ'|θ' - (g/L)sin(θ).
         * @param {number} [params.g=9.81] - Gravity (greater than or equal to 0)
         * @param {number} [params.L=1] - Length (non-zero)
         * @param {number} [params.b=0] - Linear damping coefficient
         * @param {number} [params.c=0] - Quadratic damping coefficient
         * @param {(t:number)=>number} [params.tau] - External torque τ(t) (0 by default)
         * @returns {ChalkboardODE}
         * @example
         * const ode = Chalkboard.diff.pendulumDrag({ L: 2, g: 9.81, c: 0.1 });
         * const acceleration = ode.rule(0, [Chalkboard.PI(1 / 2), 1]); // Includes quadratic drag
         */
        export const pendulumDrag = (params: { g?: number; L?: number; b?: number; c?: number; tau?: (t: number) => number; } = {}): ChalkboardODE => {
            if (params === null || typeof params !== "object" || Array.isArray(params)) throw new Error(`Chalkboard.diff.pendulumDrag: Parameter "params" must be an object.`);
            const g = params.g ?? 9.81;
            const L = params.L ?? 1;
            const b = params.b ?? 0;
            const c = params.c ?? 0;
            const tau = params.tau ?? (() => 0);
            if (!Number.isFinite(g) || g < 0) throw new Error(`Chalkboard.diff.pendulumDrag: Property "params.g" must be a finite number greater than or equal to 0.`);
            if (!Number.isFinite(L) || L <= 0) throw new Error(`Chalkboard.diff.pendulumDrag: Property "params.L" must be greater than 0.`);
            if (!Number.isFinite(b) || b < 0) throw new Error(`Chalkboard.diff.pendulumDrag: Property "params.b" must be greater than or equal to 0.`);
            if (!Number.isFinite(c) || c < 0) throw new Error(`Chalkboard.diff.pendulumDrag: Property "params.c" must be greater than or equal to 0.`);
            if (typeof tau !== "function") throw new Error(`Chalkboard.diff.pendulumDrag: Property "params.tau" must be a function.`);
            return Chalkboard.diff.init((t: number, theta: number, omega: number) => {
                const quad = c * Math.abs(omega) * omega;
                return tau(t) - b * omega - quad - (g / L) * Math.sin(theta);
            }) as ChalkboardODE;
        };

        /**
         * Defines a driven damped pendulum in a common parameterization: θ'' + qθ' + sin(θ) = Acos(Ωt). Equivalent: θ'' = Acos(Ωt) - qθ' - sin(θ). This is the dimensionless form (g/L scaled out).
         * @param {number} [q=0.5] - Damping
         * @param {number} [A=1.2] - Drive amplitude
         * @param {number} [Omega=2/3] - Drive frequency
         * @returns {ChalkboardODE}
         * @example
         * const ode = Chalkboard.diff.pendulumDriven(0.5, 1.2, 2 / 3);
         * const acceleration = ode.rule(0, [0, 0]); // Evaluates a driven pendulum
         */
        export const pendulumDriven = (q: number = 0.5, A: number = 1.2, Omega: number = 2 / 3): ChalkboardODE => {
            if (!Number.isFinite(q) || !Number.isFinite(A) || !Number.isFinite(Omega)) throw new Error(`Chalkboard.diff.pendulumDriven: Parameters "q", "A", and "Omega" must be finite numbers.`);
            return Chalkboard.diff.init((t: number, theta: number, omega: number) => A * Math.cos(Omega * t) - q * omega - Math.sin(theta)) as ChalkboardODE;
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
            if (!Number.isInteger(i) || i < 0) throw new Error(`Chalkboard.diff.phase: Parameter "i" must be a non-negative integer.`);
            if (!Number.isInteger(j) || j < 0) throw new Error(`Chalkboard.diff.phase: Parameter "j" must be a non-negative integer.`);
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
            if (times.length > 0 && !Number.isFinite(times[0]) || times.length > 1 && !Number.isFinite(times[times.length - 1])) throw new Error(`Chalkboard.diff.sample: Parameter "times" must begin and end with finite numbers.`);
            const t = sol.t;
            const y = sol.y;
            if (t.length !== y.length || t.length === 0) throw new Error(`Chalkboard.diff.sample: Invalid solution object.`);
            if (t.length > 1) {
                const s = Math.sign(t[1] - t[0]);
                for (let i = 1; i < t.length; i++) {
                    if (s === 0 || Math.sign(t[i] - t[i - 1]) !== s) throw new Error(`Chalkboard.diff.sample: Property "sol.t" must be strictly increasing or strictly decreasing.`);
                }
            }
            const last = t.length - 1;
            const descending = t[last] < t[0];
            const result: number[][] = [];
            for (let i = 0; i < times.length; i++) {
                const time = times[i];
                if (!Number.isFinite(time)) throw new Error(`Chalkboard.diff.sample: Parameter "times" must contain finite numbers.`);
                if (descending ? time >= t[0] : time <= t[0]) {
                    result.push(y[0].slice());
                    continue;
                }
                if (descending ? time <= t[last] : time >= t[last]) {
                    result.push(y[last].slice());
                    continue;
                }
                let lo = 0, hi = last;
                while (hi - lo > 1) {
                    const mid = Math.floor((lo + hi) / 2);
                    if (descending ? t[mid] >= time : t[mid] <= time) lo = mid;
                    else hi = mid;
                }
                const a = (time - t[lo]) / (t[hi] - t[lo]);
                const row: number[] = [];
                for (let k = 0; k < y[lo].length; k++) row.push((1 - a) * y[lo][k] + a * y[hi][k]);
                result.push(row);
            }
            return result;
        };

        /**
         * Defines a separable ODE: y' = f(t)g(y)
         * @param {(t: number) => number} f - f(t)
         * @param {(y: number) => number} g - g(y)
         * @returns {ChalkboardODE}
         * @example
         * const ode = Chalkboard.diff.separable((t) => t, (y) => y);
         * const derivative = ode.rule(2, [3]); // Returns [6]
         */
        export const separable = (f: (t: number) => number, g: (y: number) => number): ChalkboardODE => {
            if (typeof f !== "function" || typeof g !== "function") throw new Error(`Chalkboard.diff.separable: Parameters "f" and "g" must be functions.`);
            return Chalkboard.diff.init((t: number, y: number) => f(t) * g(y)) as ChalkboardODE;
        };

        /**
         * Defines a SEIR epidemic model: S' = -βSI, E' = βSI - σE, I' = σE - γI, R' = γI.
         * @param {number} beta - Infection rate
         * @param {number} sigma - Incubation rate
         * @param {number} gamma - Recovery rate
         * @returns {ChalkboardODE}
         * @example
         * const ode = Chalkboard.diff.SEIR(0.8, 0.2, 0.1);
         * const derivative = ode.rule(0, [0.99, 0.01, 0, 0]); // Evaluates an SEIR state
         */
        export const SEIR = (beta: number = 1, sigma: number = 1, gamma: number = 1): ChalkboardODE => {
            if (!Number.isFinite(beta) || !Number.isFinite(sigma) || !Number.isFinite(gamma)) throw new Error(`Chalkboard.diff.SEIR: Parameters "beta", "sigma", and "gamma" must be finite numbers.`);
            return Chalkboard.diff.init((t: number, y: number[]) => {
                const S = y[0], E = y[1], I = y[2], R = y[3];
                const inf = beta * S * I;
                return [
                    -inf,
                    inf - sigma * E,
                    sigma * E - gamma * I,
                    gamma * I
                ];
            }, 4) as ChalkboardODE;
        };

        /**
         * Defines a SIR epidemic model: S' = -βSI, I' = βSI - γI, R' = γI.
         * @param {number} beta - Infection rate
         * @param {number} gamma - Recovery rate
         * @returns {ChalkboardODE}
         * @example
         * const ode = Chalkboard.diff.SIR(0.8, 0.1);
         * const derivative = ode.rule(0, [0.99, 0.01, 0]); // Evaluates an SIR state
         */
        export const SIR = (beta: number = 1, gamma: number = 1): ChalkboardODE => {
            if (!Number.isFinite(beta) || !Number.isFinite(gamma)) throw new Error(`Chalkboard.diff.SIR: Parameters "beta" and "gamma" must be finite numbers.`);
            return Chalkboard.diff.init((t: number, y: number[]) => {
                const S = y[0], I = y[1], R = y[2];
                return [-beta * S * I, beta * S * I - gamma * I, gamma * I];
            }, 3) as ChalkboardODE;
        };

        /**
         * Defines a SIS epidemic model with total population normalized to 1: S + I = 1, I' = βI(1 - I) - γI.
         * @param {number} beta - Infection rate
         * @param {number} gamma - Recovery rate
         * @returns {ChalkboardODE}
         * @example
         * const ode = Chalkboard.diff.SIS(0.8, 0.1);
         * const derivative = ode.rule(0, [0.01]); // Evaluates an SIS state
         */
        export const SIS = (beta: number = 1, gamma: number = 0.5): ChalkboardODE => {
            if (!Number.isFinite(beta) || !Number.isFinite(gamma)) throw new Error(`Chalkboard.diff.SIS: Parameters "beta" and "gamma" must be finite numbers.`);
            return Chalkboard.diff.init((t: number, I: number) => beta * I * (1 - I) - gamma * I) as ChalkboardODE;
        };

        /**
         * Returns the values of one field of a partial differential equation solution at a time, shaped like the grid.
         * @param {{ t: number[]; y: number[][]; grid: { x: number[]; y?: number[] } }} sol - The solution of the partial differential equation.
         * @param {number} time - The time to sample at.
         * @param {number} [component=0] - The field index. For second-order equations, the indices after the fields select their time derivatives.
         * @returns {number[] | number[][]} In one dimension, an array with one value per x coordinate. In two dimensions, a matrix whose row j holds the values along x at the j-th y coordinate.
         * @example
         * const heat = Chalkboard.diff.init((t, x, u, ux, uxx) => uxx, { dimension: 1 });
         * const sol = Chalkboard.diff.solve(heat, { t1: 0.1, h: 0.0001, y0: (x) => Math.sin(Math.PI * x), grid: { x: [0, 1], nx: 51 }, boundary: { left: 0, right: 0 } });
         * const u = Chalkboard.diff.snapshot(sol, 0.1); // Returns the profile at t = 0.1 with one value per grid node
         * 
         * const heat2 = Chalkboard.diff.init((t, x, y, u, ux, uy, uxx, uyy) => uxx + uyy, { dimension: 2 });
         * const sol2 = Chalkboard.diff.solve(heat2, { t1: 0.05, h: 0.0002, y0: (x, y) => Math.sin(Math.PI * x) * Math.sin(Math.PI * y), grid: { x: [0, 1], y: [0, 1], nx: 31, ny: 31 }, boundary: { left: 0, right: 0, bottom: 0, top: 0 } });
         * const U = Chalkboard.diff.snapshot(sol2, 0.05); // Returns a 31×31 matrix indexed by y, then x
         */
        export const snapshot = (sol: { t: number[]; y: number[][]; grid: { x: number[]; y?: number[] } }, time: number, component: number = 0): number[] | number[][] => {
            if (!sol || !Array.isArray(sol.t) || !Array.isArray(sol.y) || !sol.grid || !Array.isArray(sol.grid.x)) throw new Error(`Chalkboard.diff.snapshot: Parameter "sol" must have properties "t", "y", and "grid.x" as arrays.`);
            if (sol.grid.y !== undefined && !Array.isArray(sol.grid.y)) throw new Error(`Chalkboard.diff.snapshot: Property "sol.grid.y" must be an array if it is provided.`);
            if (!Number.isFinite(time)) throw new Error(`Chalkboard.diff.snapshot: Parameter "time" must be a finite number.`);
            const nx = sol.grid.x.length, ny = sol.grid.y ? sol.grid.y.length : 1;
            const N = nx * ny;
            if (N === 0 || sol.y.length === 0 || !Array.isArray(sol.y[0]) || sol.y[0].length === 0 || !Number.isInteger(sol.y[0].length / N)) throw new Error(`Chalkboard.diff.snapshot: Property "sol.y" must contain a whole number of fields on the grid.`);
            const fields = sol.y[0].length / N;
            if (!Number.isInteger(component) || component < 0 || component >= fields) throw new Error(`Chalkboard.diff.snapshot: Parameter "component" must be an integer from 0 to ${fields - 1}.`);
            const field = Chalkboard.diff.at(sol, time).slice(component * N, (component + 1) * N);
            if (!sol.grid.y) return field;
            const result: number[][] = [];
            for (let j = 0; j < ny; j++) result.push(field.slice(j * nx, (j + 1) * nx));
            return result;
        };

        /**
         * Solves an ordinary or partial differential equation using an explicit or implicit method with fixed steps.
         * @param {ChalkboardODE | ChalkboardPDE} diff - The differential equation to solve.
         * @param {number} [config.t0=0] - The initial time.
         * @param {number} config.t1 - The final time.
         * @param {number} [config.h] - The time step size. Either this or `steps` must be provided.
         * @param {number} [config.steps] - The number of steps to take. Either this or `h` must be provided.
         * @param {number | number[] | Object | Function} config.y0 - The initial state. For partial differential equations, a function of position (x, or x and y in two dimensions) sampled at every grid node (returning an array for several fields), a flattened array, or for second-order equations an object `{ u, ut }` of such functions or arrays.
         * @param {{ x: number[]; nx: number; y?: number[]; ny?: number }} [config.grid] - The uniform grid of a partial differential equation: the interval `x: [a, b]` and the number of nodes `nx` (at least 3), plus `y: [c, d]` and `ny` in two dimensions. A periodic axis leaves out the repeated endpoint.
         * @param {string | Object} [config.boundary] - The boundary conditions of a partial differential equation: "periodic" or `{ left, right }`, plus `bottom` and `top` in two dimensions, where each side is "periodic", a fixed value (a number, an array with one value per field, or a function of time, which in two dimensions also receives y on the left and right and x on the bottom and top), or `{ type: "dirichlet" | "neumann", value }` with "neumann" prescribing the outward normal derivative. Both sides of an axis are periodic or neither is, and a node on two fixed-value sides takes their average.
         * @param {"euler" | "midpoint" | "heun" | "ralston" | "rk4" | "backwardeuler" | "cranknicolson" | "bdf2"} [config.method="rk4"] - The integration method to use: "euler", "midpoint", "heun", "ralston", "rk4", "backwardeuler", "cranknicolson", or "bdf2". The implicit methods ("backwardeuler", "cranknicolson", and "bdf2") apply Newton's method at every step and suit stiff problems, where explicit methods need very small steps. Crank–Nicolson may oscillate on very stiff or nonsmooth problems, where backward Euler and BDF2 do not. The cost of the implicit methods grows quickly with the size of two-dimensional grids.
         * @param {boolean} [config.returnObject=false] - Whether to return the results as an array of objects (only if initial state was provided as an object, and not for partial differential equations).
         * @param {number} [config.frames] - The number of samples to store, evenly spaced over the steps and including both endpoints (an integer of at least 2). Defaults to every step for ordinary differential equations and 101 for partial differential equations, and never exceeds the number of steps plus one.
         * @returns {{ t: number[]; y: number[][]; yObj?: {[key: string]: number}[]; grid?: { x: number[]; y?: number[] } }} The solution containing time points `t`, state array `y`, optionally state objects `yObj`, and the grid coordinates `grid` for partial differential equations.
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
         * 
         * // Solve the heat equation u_t = u_xx with fixed ends:
         * const heat = Chalkboard.diff.init((t, x, u, ux, uxx) => uxx, { dimension: 1 });
         * const solHeat = Chalkboard.diff.solve(heat, {
         *     t0: 0, t1: 0.1, h: 0.0001,
         *     y0: (x) => Math.sin(Math.PI * x),
         *     grid: { x: [0, 1], nx: 51 },
         *     boundary: { left: 0, right: 0 }
         * });
         * 
         * // Solve the heat equation with the implicit BDF2 method and large steps:
         * const solStiff = Chalkboard.diff.solve(heat, {
         *     t0: 0, t1: 0.1, steps: 20,
         *     y0: (x) => Math.sin(Math.PI * x),
         *     grid: { x: [0, 1], nx: 201 },
         *     boundary: { left: 0, right: 0 },
         *     method: "bdf2"
         * });
         */
        export const solve = (
            diff: ChalkboardODE | ChalkboardPDE,
            config: {
                t0?: number;
                t1: number;
                h?: number;
                steps?: number;
                y0: number | number[] | Record<string, any> | ((x: number, y: number) => number | number[]);
                method?: "euler" | "midpoint" | "heun" | "ralston" | "rk4" | "backwardeuler" | "cranknicolson" | "bdf2";
                returnObject?: boolean;
                grid?: { x: number[]; nx: number; y?: number[]; ny?: number };
                boundary?: "periodic" | { left: "periodic" | number | number[] | ((t: number, y: number) => number | number[]) | { type: "dirichlet" | "neumann"; value?: number | number[] | ((t: number, y: number) => number | number[]) }; right: "periodic" | number | number[] | ((t: number, y: number) => number | number[]) | { type: "dirichlet" | "neumann"; value?: number | number[] | ((t: number, y: number) => number | number[]) }; bottom?: "periodic" | number | number[] | ((t: number, x: number) => number | number[]) | { type: "dirichlet" | "neumann"; value?: number | number[] | ((t: number, x: number) => number | number[]) }; top?: "periodic" | number | number[] | ((t: number, x: number) => number | number[]) | { type: "dirichlet" | "neumann"; value?: number | number[] | ((t: number, x: number) => number | number[]) } };
                frames?: number;
            }
        ): { t: number[]; y: number[][]; yObj?: {[key: string]: number}[]; grid?: { x: number[]; y?: number[] } } => {
            if (!diff || typeof diff !== "object") throw new Error(`Chalkboard.diff.solve: Parameter "diff" must be a ChalkboardODE or ChalkboardPDE.`);
            if (typeof diff.rule !== "function") throw new Error(`Chalkboard.diff.solve: "diff.rule" must be a function.`);
            if (!Number.isInteger(diff.dimension) || diff.dimension < 1) throw new Error(`Chalkboard.diff.solve: Property "diff.dimension" must be a positive integer.`);
            if (typeof config !== "object" || config === null) throw new Error(`Chalkboard.diff.solve: Parameter "config" must be an object.`);
            if (typeof config.t1 !== "number" || !Number.isFinite(config.t1)) throw new Error(`Chalkboard.diff.solve: "config.t1" must be a finite number.`);
            const t0 = config.t0 ?? 0;
            if (!Number.isFinite(t0)) throw new Error(`Chalkboard.diff.solve: "config.t0" must be a finite number.`);
            if (config.t1 === t0) throw new Error(`Chalkboard.diff.solve: "config.t1" must be different from "config.t0".`);
            const method: "euler" | "midpoint" | "heun" | "ralston" | "rk4" | "backwardeuler" | "cranknicolson" | "bdf2" = (config.method ?? "rk4").toLowerCase() as "euler" | "midpoint" | "heun" | "ralston" | "rk4" | "backwardeuler" | "cranknicolson" | "bdf2";
            if (["euler", "midpoint", "heun", "ralston", "rk4", "backwardeuler", "cranknicolson", "bdf2"].indexOf(method) === -1) throw new Error(`Chalkboard.diff.solve: Unknown method.`);
            if (config.frames !== undefined && (!Number.isInteger(config.frames) || config.frames < 2)) throw new Error(`Chalkboard.diff.solve: Property "config.frames" must be an integer greater than or equal to 2.`);
            const { rule: f, y0, keys, grid, mesh } = $prepare(diff, config, "Chalkboard.diff.solve");
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
            const frames = Math.min(config.frames ?? (grid ? 101 : steps + 1), steps + 1);
            const t: number[] = [t0];
            const y: number[][] = [y0.slice()];
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
            if (method === "backwardeuler" || method === "cranknicolson" || method === "bdf2") {
                const M = y0.length, N = mesh ? mesh.nx * mesh.ny : M, F = mesh ? mesh.fields : 1;
                const perm = new Int32Array(M);
                const groups: number[][] = [];
                let neighbors: number[][] | null = null;
                let kl = M - 1;
                if (!mesh) {
                    for (let s = 0; s < M; s++) {
                        perm[s] = s;
                        groups.push([s]);
                    }
                } else {
                    const nx = mesh.nx, ny = mesh.ny;
                    const fold = (i: number, n: number, periodic: boolean): number => periodic ? (i < Math.ceil(n / 2) ? 2 * i : 2 * (n - 1 - i) + 1) : i;
                    const rank = new Int32Array(N);
                    for (let j = 0; j < ny; j++) {
                        for (let i = 0; i < nx; i++) {
                            const fi = fold(i, nx, mesh.periodicX), fj = fold(j, ny, mesh.periodicY);
                            rank[j * nx + i] = ny === 1 || nx <= ny ? fj * nx + fi : fi * ny + fj;
                        }
                    }
                    for (let phi = 0; phi < F; phi++) {
                        for (let p = 0; p < N; p++) perm[phi * N + p] = rank[p] * F + phi;
                    }
                    const stencils: number[][] = [];
                    const span = ny === 1 ? 0 : 1;
                    let reach = 0;
                    for (let j = 0; j < ny; j++) {
                        for (let i = 0; i < nx; i++) {
                            const p = j * nx + i;
                            const near: number[] = [];
                            for (let dj = -span; dj <= span; dj++) {
                                let jj = j + dj;
                                if (jj < 0 || jj >= ny) {
                                    if (!mesh.periodicY) continue;
                                    jj = (jj + ny) % ny;
                                }
                                for (let di = -1; di <= 1; di++) {
                                    let ii = i + di;
                                    if (ii < 0 || ii >= nx) {
                                        if (!mesh.periodicX) continue;
                                        ii = (ii + nx) % nx;
                                    }
                                    const q = jj * nx + ii;
                                    if (near.indexOf(q) !== -1) continue;
                                    near.push(q);
                                    reach = Math.max(reach, Math.abs(rank[p] - rank[q]));
                                }
                            }
                            stencils.push(near);
                        }
                    }
                    const color = new Int32Array(N).fill(-1);
                    const used: number[] = [];
                    const members: number[][] = [];
                    for (let p = 0; p < N; p++) {
                        const near = stencils[p];
                        for (let k = 0; k < near.length; k++) {
                            const around = stencils[near[k]];
                            for (let r = 0; r < around.length; r++) {
                                if (color[around[r]] >= 0) used[color[around[r]]] = p;
                            }
                        }
                        let c = 0;
                        while (used[c] === p) c++;
                        color[p] = c;
                        if (c === members.length) members.push([]);
                        members[c].push(p);
                    }
                    for (let c = 0; c < members.length; c++) {
                        for (let phi = 0; phi < F; phi++) groups.push(members[c].map((p) => phi * N + p));
                    }
                    neighbors = stencils;
                    kl = reach * F + F - 1;
                }
                const ku = kl, w = 2 * kl + ku + 1;
                const piv = new Int32Array(M);
                const b = new Float64Array(M);
                const c: number[] = new Array(M), G: number[] = new Array(M), delta: number[] = new Array(M);
                const perturbation = Math.sqrt(Number.EPSILON);
                let a = new Float64Array(0);
                let bandGamma = NaN, lastIterations = 0;
                let yn = y0.slice(), yPrev = y0;
                let frame = 1;
                let target = Math.round(steps / (frames - 1));
                for (let n = 0; n < steps; n++) {
                    const tn = t0 + n * h, tn1 = n + 1 === steps ? config.t1 : t0 + (n + 1) * h;
                    const bdf = method === "bdf2" && n > 0;
                    const gamma = method === "cranknicolson" ? 1 / 2 : bdf ? 2 / 3 : 1;
                    const gh = gamma * h;
                    if (method === "cranknicolson") {
                        const fn = f(tn, yn);
                        for (let i = 0; i < M; i++) c[i] = yn[i] + (h / 2) * fn[i];
                    } else if (bdf) {
                        for (let i = 0; i < M; i++) c[i] = (4 / 3) * yn[i] - (1 / 3) * yPrev[i];
                    } else {
                        for (let i = 0; i < M; i++) c[i] = yn[i];
                    }
                    const z = yn.slice();
                    let fz = f(tn1, z);
                    let fresh = false;
                    const refresh = (): void => {
                        const A = new Float64Array(M * w);
                        for (let s = 0; s < M; s++) A[perm[s] * w + kl] = 1;
                        const zp = z.slice();
                        for (let g = 0; g < groups.length; g++) {
                            const group = groups[g];
                            for (let k = 0; k < group.length; k++) zp[group[k]] = z[group[k]] + perturbation * Math.max(1, Math.abs(z[group[k]]));
                            const f1 = f(tn1, zp);
                            for (let k = 0; k < group.length; k++) {
                                const s = group[k], eps = perturbation * Math.max(1, Math.abs(z[s])), col = perm[s];
                                zp[s] = z[s];
                                if (!neighbors) {
                                    for (let r = 0; r < M; r++) {
                                        const v = (f1[r] - fz[r]) / eps;
                                        if (v !== 0) A[perm[r] * w + col - perm[r] + kl] -= gh * v;
                                    }
                                    continue;
                                }
                                const near = neighbors[s % N];
                                for (let psi = 0; psi < F; psi++) {
                                    for (let q = 0; q < near.length; q++) {
                                        const r = psi * N + near[q], row = perm[r];
                                        const v = (f1[r] - fz[r]) / eps;
                                        if (v !== 0) A[row * w + col - row + kl] -= gh * v;
                                    }
                                }
                            }
                        }
                        for (let k = 0; k < M; k++) {
                            const lim = Math.min(M - 1, k + kl), last = Math.min(M - 1, k + kl + ku);
                            let p = k, big = Math.abs(A[k * w + kl]);
                            for (let i = k + 1; i <= lim; i++) {
                                const v = Math.abs(A[i * w + k - i + kl]);
                                if (v > big) {
                                    big = v;
                                    p = i;
                                }
                            }
                            if (A[p * w + k - p + kl] === 0) throw new Error(`Chalkboard.diff.solve: The linearized equations of an implicit step are singular at time ${tn1}.`);
                            piv[k] = p;
                            const rk = k * w - k + kl;
                            if (p !== k) {
                                const rp = p * w - p + kl;
                                for (let j = k; j <= last; j++) {
                                    const swap = A[rk + j];
                                    A[rk + j] = A[rp + j];
                                    A[rp + j] = swap;
                                }
                            }
                            const pivot = A[rk + k];
                            for (let i = k + 1; i <= lim; i++) {
                                const ri = i * w - i + kl;
                                const l = A[ri + k] / pivot;
                                A[ri + k] = l;
                                if (l !== 0) for (let j = k + 1; j <= last; j++) A[ri + j] -= l * A[rk + j];
                            }
                        }
                        a = A;
                        bandGamma = gamma;
                        fresh = true;
                    };
                    if (a.length === 0 || gamma !== bandGamma || lastIterations > 4) refresh();
                    let prev = Infinity, failures = 0, iterations = 0, converged = false, stale = true;
                    while (iterations < 25) {
                        iterations++;
                        if (stale) for (let s = 0; s < M; s++) G[s] = z[s] - c[s] - gh * fz[s];
                        for (let s = 0; s < M; s++) b[perm[s]] = -G[s];
                        for (let k = 0; k < M; k++) {
                            const p = piv[k];
                            if (p !== k) {
                                const swap = b[k];
                                b[k] = b[p];
                                b[p] = swap;
                            }
                            const lim = Math.min(M - 1, k + kl);
                            for (let i = k + 1; i <= lim; i++) b[i] -= a[i * w - i + kl + k] * b[k];
                        }
                        for (let k = M - 1; k >= 0; k--) {
                            const rk = k * w - k + kl, last = Math.min(M - 1, k + kl + ku);
                            let sum = b[k];
                            for (let j = k + 1; j <= last; j++) sum -= a[rk + j] * b[j];
                            b[k] = sum / a[rk + k];
                        }
                        let size = 0, finite = true;
                        for (let s = 0; s < M; s++) {
                            delta[s] = b[perm[s]];
                            const v = Math.abs(delta[s]);
                            if (!Number.isFinite(v)) finite = false;
                            else if (v > size) size = v;
                        }
                        if (!finite) break;
                        if (size > 0.5 * prev) {
                            failures++;
                            if (fresh && failures >= 2) break;
                            refresh();
                            prev = Infinity;
                            stale = false;
                            continue;
                        }
                        let scale = 0;
                        for (let s = 0; s < M; s++) {
                            z[s] += delta[s];
                            scale = Math.max(scale, Math.abs(z[s]));
                        }
                        fresh = false;
                        prev = size;
                        if (size <= 1e-10 * (1 + scale)) {
                            converged = true;
                            break;
                        }
                        fz = f(tn1, z);
                        stale = true;
                    }
                    if (!converged) throw new Error(`Chalkboard.diff.solve: Newton's method did not converge at time ${tn1}; a smaller step size may be needed.`);
                    lastIterations = iterations;
                    yPrev = yn;
                    yn = z;
                    if (n + 1 === target) {
                        t.push(tn1);
                        y.push(z);
                        frame++;
                        target = Math.round(frame * steps / (frames - 1));
                    }
                }
            } else {
                let yi = y[0];
                let frame = 1;
                let target = Math.round(steps / (frames - 1));
                for (let i = 0; i < steps; i++) {
                    yi = stepper(f, t0 + i * h, yi, h);
                    if (i + 1 === target) {
                        t.push(i + 1 === steps ? config.t1 : t0 + (i + 1) * h);
                        y.push(yi);
                        frame++;
                        target = Math.round(frame * steps / (frames - 1));
                    }
                }
            }
            const result: { t: number[]; y: number[][]; yObj?: {[key: string]: number}[]; grid?: { x: number[]; y?: number[] } } = { t, y };
            if (grid) result.grid = grid;
            if (config.returnObject && keys && keys.length === diff.dimension) {
                result.yObj = y.map((row) => {
                    const obj: { [key: string]: number } = {};
                    for (let i = 0; i < keys.length; i++) obj[keys[i]] = row[i];
                    return obj;
                });
            }
            return result;
        };

        /**
         * Solves an ordinary or partial differential equation using the adaptive Dormand–Prince (or Runge–Kutta–Fehlberg) method. Produces a variable-step solution.
         * @param {ChalkboardODE | ChalkboardPDE} diff - The differential equation to solve.
         * @param {number} [config.t0=0] - Initial time.
         * @param {number} config.t1 - Final time.
         * @param {number | number[] | Object | Function} config.y0 - Initial state (same conventions as Chalkboard.diff.solve).
         * @param {{ x: number[]; nx: number; y?: number[]; ny?: number }} [config.grid] - Grid of a partial differential equation (same as Chalkboard.diff.solve).
         * @param {string | Object} [config.boundary] - Boundary conditions of a partial differential equation (same as Chalkboard.diff.solve).
         * @param {number} [config.h0] - Initial step guess.
         * @param {number} [config.hMin] - Minimum step size magnitude.
         * @param {number} [config.hMax] - Maximum step size magnitude.
         * @param {number} [config.rtol=1e-6] - Relative tolerance.
         * @param {number} [config.atol=1e-9] - Absolute tolerance.
         * @param {number} [config.maxSteps=100000] - Maximum accepted+rejected iterations.
         * @param {boolean} [config.returnObject=false] - Whether to return yObj (same as Chalkboard.diff.solve).
         * @param {number} [config.frames] - The number of samples to store at evenly spaced times including both endpoints (an integer of at least 2), interpolated linearly between accepted steps. Without it, ordinary differential equations store every accepted step and partial differential equations store 101 samples.
         * @returns {{ t: number[]; y: number[][]; yObj?: {[key: string]: number}[]; grid?: { x: number[]; y?: number[] } }}
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
            diff: ChalkboardODE | ChalkboardPDE,
            config: {
                t0?: number;
                t1: number;
                y0: number | number[] | Record<string, any> | ((x: number, y: number) => number | number[]);
                h0?: number;
                hMin?: number;
                hMax?: number;
                rtol?: number;
                atol?: number;
                maxSteps?: number;
                returnObject?: boolean;
                grid?: { x: number[]; nx: number; y?: number[]; ny?: number };
                boundary?: "periodic" | { left: "periodic" | number | number[] | ((t: number, y: number) => number | number[]) | { type: "dirichlet" | "neumann"; value?: number | number[] | ((t: number, y: number) => number | number[]) }; right: "periodic" | number | number[] | ((t: number, y: number) => number | number[]) | { type: "dirichlet" | "neumann"; value?: number | number[] | ((t: number, y: number) => number | number[]) }; bottom?: "periodic" | number | number[] | ((t: number, x: number) => number | number[]) | { type: "dirichlet" | "neumann"; value?: number | number[] | ((t: number, x: number) => number | number[]) }; top?: "periodic" | number | number[] | ((t: number, x: number) => number | number[]) | { type: "dirichlet" | "neumann"; value?: number | number[] | ((t: number, x: number) => number | number[]) } };
                frames?: number;
            }
        ): { t: number[]; y: number[][]; yObj?: { [key: string]: number }[]; grid?: { x: number[]; y?: number[] } } => {
            if (!diff || typeof diff !== "object") throw new Error(`Chalkboard.diff.solveAdaptive: Parameter "diff" must be a ChalkboardODE or ChalkboardPDE.`);
            if (typeof diff.rule !== "function") throw new Error(`Chalkboard.diff.solveAdaptive: "diff.rule" must be a function.`);
            if (!Number.isInteger(diff.dimension) || diff.dimension < 1) throw new Error(`Chalkboard.diff.solveAdaptive: Property "diff.dimension" must be a positive integer.`);
            if (typeof config !== "object" || config === null) throw new Error(`Chalkboard.diff.solveAdaptive: Parameter "config" must be an object.`);
            if (typeof config.t1 !== "number" || !Number.isFinite(config.t1)) throw new Error(`Chalkboard.diff.solveAdaptive: "config.t1" must be a finite number.`);
            const t0 = config.t0 ?? 0;
            if (!Number.isFinite(t0)) throw new Error(`Chalkboard.diff.solveAdaptive: "config.t0" must be a finite number.`);
            if (config.t1 === t0) throw new Error(`Chalkboard.diff.solveAdaptive: "config.t1" must be different from "config.t0".`);
            const rtol = config.rtol ?? 1e-6;
            const atol = config.atol ?? 1e-9;
            if (!Number.isFinite(rtol) || rtol <= 0) throw new Error(`Chalkboard.diff.solveAdaptive: Property "config.rtol" must be greater than 0.`);
            if (!Number.isFinite(atol) || atol < 0) throw new Error(`Chalkboard.diff.solveAdaptive: Property "config.atol" must be greater than or equal to 0.`);
            const maxSteps = config.maxSteps ?? 100000;
            if (!Number.isInteger(maxSteps) || maxSteps < 1) throw new Error(`Chalkboard.diff.solveAdaptive: Property "config.maxSteps" must be a positive integer.`);
            if (config.frames !== undefined && (!Number.isInteger(config.frames) || config.frames < 2)) throw new Error(`Chalkboard.diff.solveAdaptive: Property "config.frames" must be an integer greater than or equal to 2.`);
            const { rule: f, y0, keys, grid } = $prepare(diff, config, "Chalkboard.diff.solveAdaptive");
            const sign = Math.sign(config.t1 - t0);
            let h = config.h0 ?? (config.t1 - t0) / 100;
            if (!Number.isFinite(h) || h === 0) throw new Error(`Chalkboard.diff.solveAdaptive: "h0" must be a finite non-zero number (or omitted).`);
            h = Math.abs(h) * sign;
            const hMin = (config.hMin ?? 1e-12);
            const hMax = (config.hMax ?? Math.abs(config.t1 - t0));
            if (!Number.isFinite(hMin) || hMin <= 0) throw new Error(`Chalkboard.diff.solveAdaptive: Parameter "hMin" must be greater than 0.`);
            if (!Number.isFinite(hMax) || hMax <= 0) throw new Error(`Chalkboard.diff.solveAdaptive: Parameter "hMax" must be greater than 0.`);
            const clampAbs = (value: number, minAbs: number, maxAbs: number): number => {
                const s = Math.sign(value) || 1;
                const a = Math.min(maxAbs, Math.max(minAbs, Math.abs(value)));
                return s * a;
            };
            const add = (a: number[], b: number[]): number[] => Chalkboard.stat.add(a, b);
            const scl = (a: number[], k: number): number[] => Chalkboard.stat.scl(a, k);
            const frames = config.frames ?? (grid ? 101 : undefined);
            const t: number[] = [t0];
            const y: number[][] = [y0.slice()];
            let tCurr = t0;
            let yCurr = y[0];
            let frame = 1;
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
                const ti = tCurr;
                const yi = yCurr;
                if ((sign > 0 && ti >= config.t1) || (sign < 0 && ti <= config.t1)) break;
                const remaining = config.t1 - ti;
                h = clampAbs(h, hMin, hMax);
                if (Math.abs(h) >= Math.abs(remaining)) h = remaining;
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
                    const tNext = h === remaining ? config.t1 : ti + h;
                    if (frames === undefined) {
                        t.push(tNext);
                        y.push(yNext5);
                    } else {
                        while (frame < frames) {
                            const tau = frame === frames - 1 ? config.t1 : t0 + frame * (config.t1 - t0) / (frames - 1);
                            if (tNext !== config.t1 && (sign > 0 ? tau > tNext : tau < tNext)) break;
                            if (frame === frames - 1) {
                                y.push(yNext5);
                            } else {
                                const a = (tau - ti) / (tNext - ti);
                                const row: number[] = new Array(yi.length);
                                for (let k = 0; k < yi.length; k++) row[k] = (1 - a) * yi[k] + a * yNext5[k];
                                y.push(row);
                            }
                            t.push(tau);
                            frame++;
                        }
                    }
                    tCurr = tNext;
                    yCurr = yNext5;
                    const factor = e === 0 ? maxFactor : Math.min(maxFactor, Math.max(minFactor, safety * Math.pow(1 / e, 1 / 5)));
                    h = h * factor;
                } else {
                    const factor = Math.min(1.0, Math.max(minFactor, safety * Math.pow(1 / e, 1 / 5)));
                    h = h * factor;
                    if (Math.abs(h) < hMin) throw new Error(`Chalkboard.diff.solveAdaptive: Step size became smaller than the minimum step size.`);
                }
            }
            const tEnd = tCurr;
            if ((sign > 0 && tEnd < config.t1) || (sign < 0 && tEnd > config.t1)) throw new Error(`Chalkboard.diff.solveAdaptive: Property "config.maxSteps" cannot be exceeded; its value is ${maxSteps}.`);
            const result: { t: number[]; y: number[][]; yObj?: { [key: string]: number }[]; grid?: { x: number[]; y?: number[] } } = { t, y };
            if (grid) result.grid = grid;
            if (config.returnObject && keys && keys.length === diff.dimension) {
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
         * @example
         * const result = Chalkboard.diff.toScalarSeries({ t: [0, 1, 2], y: [[1], [2], [4]] }); // Returns [1, 2, 4]
         */
        export const toScalarSeries = (sol: { t: number[]; y: number[][] }): number[] => {
            if (sol === null || typeof sol !== "object") throw new Error(`Chalkboard.diff.toScalarSeries: Parameter "sol" must be an object.`);
            const result: number[] = [];
            for (let i = 0; i < sol.y.length; i++) result.push(sol.y[i][0]);
            return result;
        };
    }
}
