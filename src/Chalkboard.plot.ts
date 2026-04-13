/*
    Chalkboard - Plotting Namespace
    Version 3.0.2 Euler
    Released April 13th, 2026
*/
/*
    This Source Code Form is subject to the terms of the
    Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed
    with this file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/
/// <reference path="Chalkboard.ts"/>
namespace Chalkboard {
    /**
     * The plotting namespace
     * @namespace
     */
    export namespace plot {
        /** @ignore */
        const getContext = (): CanvasRenderingContext2D => {
            try {
                return Function('"use strict"; return (' + Chalkboard.CONTEXT + ')')() as CanvasRenderingContext2D;
            } catch (e) {
                throw new Error("Cannot initialize canvas context. Make sure an HTML <canvas> element exists in the webpage before using Chalkboard.plot functions.");
            }
        };

        /** @ignore */
        const $ = <T extends { x?: number; y?: number; size?: number; strokeStyle?: string; lineWidth?: number; context?: CanvasRenderingContext2D }, D extends Partial<T>>(config?: T, defaults?: D): T & D & { x: number; y: number; size: number; strokeStyle: string; lineWidth: number; context: CanvasRenderingContext2D } => {
            const ctx = (config?.context ?? defaults?.context ?? getContext()) as CanvasRenderingContext2D;
            const configMap = (config ?? {}) as Record<string, unknown>;
            const defaultsMap = { x: ctx.canvas.width / 2, y: ctx.canvas.height / 2, size: 1, strokeStyle: "black", lineWidth: 2, context: ctx, ...((defaults ?? {}) as Record<string, unknown>) } as Record<string, unknown>;
            const merged = {} as Record<string, unknown>;
            const keys = new Set([...Object.keys(defaultsMap), ...Object.keys(configMap)]);
            for (const key of keys) merged[key] = configMap[key] ?? defaultsMap[key];
            merged.context = ctx;
            merged.x = (merged.x ?? ctx.canvas.width / 2) as number;
            merged.y = (merged.y ?? ctx.canvas.height / 2) as number;
            merged.size = ((merged.size ?? 1) as number) / 100;
            return merged as T & D & { x: number; y: number; size: number; strokeStyle: string; lineWidth: number; context: CanvasRenderingContext2D };
        };

        /**
         * Plots the autocorrelation of an explicit function.
         * @param {ChalkboardFunction} func - The function
         * @param {number} [config.x] - x-offset (canvas translation), defaults to canvas center
         * @param {number} [config.y] - y-offset (canvas translation), defaults to canvas center
         * @param {number} [config.size=1] - Scale, defaults to 1, divided by 100 internally for finer control
         * @param {string} [config.strokeStyle="black"] - Stroke color
         * @param {number} [config.lineWidth=2] - Stroke width
         * @param {number[]} [config.domain=[-10, 10]] - Domain over which to plot (in units of the function, not pixels)
         * @param {number} [config.res=25] - Resolution (distance in pixels between sampled points), higher values result in faster plotting but less smooth plots
         * @param {CanvasRenderingContext2D} [config.context] - Optional custom canvas context to draw on
         * @returns {number[][]}
         */
        export const autocorrelation = (
            func: ChalkboardFunction,
            config: {
                x: number;
                y: number;
                size: number;
                strokeStyle: string;
                lineWidth: number;
                domain: [number, number];
                res: number;
                context: CanvasRenderingContext2D;
            }
        ): number[][] => {
            const _config = $(config, { domain: [-10, 10], res: 25 });
            const data = [];
            _config.context.save();
            _config.context.translate(_config.x, _config.y);
            _config.context.lineWidth = _config.lineWidth;
            _config.context.strokeStyle = _config.strokeStyle;
            _config.context.beginPath();
            const discontinuityThreshold = (_config.context.canvas.height / _config.size) * 1.5;
            let previousY: number | null = null;
            for (let i = _config.domain[0] / _config.size; i <= _config.domain[1] / _config.size; i += _config.res) {
                const currentY = -Chalkboard.calc.autocorrelation(func, i * _config.size) / _config.size;
                if (previousY === null || Math.abs(currentY - previousY) > discontinuityThreshold) {
                    _config.context.moveTo(i, currentY);
                } else {
                    _config.context.lineTo(i, currentY);
                }
                previousY = currentY;
                data.push([i, Chalkboard.calc.autocorrelation(func, i)]);
            }
            _config.context.stroke();
            _config.context.restore();
            return data;
        };

        /**
         * Plots a bar plot/chart/graph for an array of data with bins specified by another array.
         * @param {number[]} arr - The data array
         * @param {number[]} bins - The bins array (must be sorted in ascending order)
         * @param {number} [config.x] - x-offset (canvas translation), defaults to canvas center
         * @param {number} [config.y] - y-offset (canvas translation), defaults to canvas center
         * @param {number} [config.size=1] - Scale, defaults to 1, divided by 100 internally for finer control
         * @param {string} [config.fillStyle="white"] - Fill color for bars
         * @param {string} [config.strokeStyle="black"] - Stroke color for bars
         * @param {number} [config.lineWidth=2] - Stroke width for bars
         * @param {CanvasRenderingContext2D} [config.context] - Optional custom canvas context to draw on
         * @returns {number[][]}
         */
        export const barplot = (
            arr: number[],
            bins: number[],
            config: {
                x: number;
                y: number;
                size: number;
                fillStyle: string;
                strokeStyle: string;
                lineWidth: number;
                context: CanvasRenderingContext2D;
            }
        ): number[][] => {
            const _config = $(config, { fillStyle: "white" });
            _config.context.save();
            _config.context.translate(_config.x, _config.y);
            _config.context.lineWidth = _config.lineWidth;
            _config.context.strokeStyle = _config.strokeStyle;
            _config.context.fillStyle = _config.fillStyle;
            const bars = [];
            for (let i = 1; i < bins.length; i++) {
                bars.push(Chalkboard.stat.ineq(arr, bins[i - 1], bins[i], i === 1, true));
            }
            const counts = [];
            for (let i = 0; i < bars.length; i++) {
                counts.push(bars[i].length);
            }
            for (let i = 0; i < counts.length; i++) {
                const xStart = bins[i] / _config.size;
                const xEnd = bins[i + 1] / _config.size;
                const dynamicWidth = xEnd - xStart;
                _config.context.fillRect(xStart, 0, dynamicWidth, -counts[i] / _config.size);
                _config.context.strokeRect(xStart, 0, dynamicWidth, -counts[i] / _config.size);
            }
            _config.context.restore();
            return bars;
        };

        /**
         * Plots a complex number.
         * @param {ChalkboardComplex} comp - The complex number
         * @param {number} [config.x] - x-offset (canvas translation), defaults to canvas center
         * @param {number} [config.y] - y-offset (canvas translation), defaults to canvas center
         * @param {number} [config.size=1] - Scale, defaults to 1, divided by 100 internally for finer control
         * @param {string} [config.fillStyle="black"] - Fill color for the complex number
         * @param {number} [config.lineWidth=5] - Line width for the complex number
         * @param {CanvasRenderingContext2D} [config.context] - Optional custom canvas context to draw on
         * @returns {number[][]}
         */
        export const comp = (
            comp: ChalkboardComplex,
            config: {
                x: number;
                y: number;
                size: number;
                fillStyle: string;
                lineWidth: number;
                context: CanvasRenderingContext2D;
            }
        ): number[][] => {
            const _config = $(config, { fillStyle: "black", lineWidth: 5 });
            _config.context.fillStyle = _config.fillStyle;
            _config.context.save();
            _config.context.translate(_config.x, _config.y);
            _config.context.beginPath();
            _config.context.ellipse(comp.a / _config.size, -comp.b / _config.size, _config.lineWidth, _config.lineWidth, 0, 0, Chalkboard.PI(2));
            _config.context.fill();
            _config.context.restore();
            return [[comp.a], [comp.b]];
        };

        /**
         * Plots the convolution of two explicit functions.
         * @param {ChalkboardFunction} func1 - The first function
         * @param {ChalkboardFunction} func2 - The second function
         * @param {number} [config.x] - x-offset (canvas translation), defaults to canvas center
         * @param {number} [config.y] - y-offset (canvas translation), defaults to canvas center
         * @param {number} [config.size=1] - Scale, defaults to 1, divided by 100 internally for finer control
         * @param {string} [config.strokeStyle="black"] - Stroke color
         * @param {number} [config.lineWidth=2] - Stroke width
         * @param {number[]} [config.domain=[-10, 10]] - Domain over which to plot (in units of the function, not pixels)
         * @param {number} [config.res=25] - Resolution (distance in pixels between sampled points), higher values result in faster plotting but less smooth plots
         * @param {CanvasRenderingContext2D} [config.context] - Optional custom canvas context to draw on
         * @returns {number[][]}
         */
        export const convolution = (
            func1: ChalkboardFunction,
            func2: ChalkboardFunction,
            config: {
                x: number;
                y: number;
                size: number;
                strokeStyle: string;
                lineWidth: number;
                domain: [number, number];
                res: number;
                context: CanvasRenderingContext2D;
            }
        ): number[][] => {
            const _config = $(config, { domain: [-10, 10], res: 25 });
            const data = [];
            _config.context.save();
            _config.context.translate(_config.x, _config.y);
            _config.context.lineWidth = _config.lineWidth;
            _config.context.strokeStyle = _config.strokeStyle;
            _config.context.beginPath();
            const discontinuityThreshold = (_config.context.canvas.height / _config.size) * 1.5;
            let previousY: number | null = null;
            for (let i = _config.domain[0] / _config.size; i <= _config.domain[1] / _config.size; i += _config.res) {
                const currentY = -Chalkboard.calc.convolution(func1, func2, i * _config.size) / _config.size;
                if (previousY === null || Math.abs(currentY - previousY) > discontinuityThreshold) {
                    _config.context.moveTo(i, currentY);
                } else {
                    _config.context.lineTo(i, currentY);
                }
                previousY = currentY;
                data.push([i, Chalkboard.calc.convolution(func1, func2, i)]);
            }
            _config.context.stroke();
            _config.context.restore();
            return data;
        };

        /**
         * Plots the cross-correlation of two explicit functions.
         * @param {ChalkboardFunction} func1 - The first function
         * @param {ChalkboardFunction} func2 - The second function
         * @param {number} [config.x] - x-offset (canvas translation), defaults to canvas center
         * @param {number} [config.y] - y-offset (canvas translation), defaults to canvas center
         * @param {number} [config.size=1] - Scale, defaults to 1, divided by 100 internally for finer control
         * @param {string} [config.strokeStyle="black"] - Stroke color
         * @param {number} [config.lineWidth=2] - Stroke width
         * @param {number[]} [config.domain=[-10, 10]] - Domain over which to plot (in units of the function, not pixels)
         * @param {number} [config.res=25] - Resolution (distance in pixels between sampled points), higher values result in faster plotting but less smooth plots
         * @param {CanvasRenderingContext2D} [config.context] - Optional custom canvas context to draw on
         * @returns {number[][]}
         */
        export const correlation = (
            func1: ChalkboardFunction,
            func2: ChalkboardFunction,
            config: {
                x: number;
                y: number;
                size: number;
                strokeStyle: string;
                lineWidth: number;
                domain: [number, number];
                res: number;
                context: CanvasRenderingContext2D;
            }
        ): number[][] => {
            const _config = $(config, { domain: [-10, 10], res: 25 });
            const data = [];
            _config.context.save();
            _config.context.translate(_config.x, _config.y);
            _config.context.lineWidth = _config.lineWidth;
            _config.context.strokeStyle = _config.strokeStyle;
            _config.context.beginPath();
            const discontinuityThreshold = (_config.context.canvas.height / _config.size) * 1.5;
            let previousY: number | null = null;
            for (let i = _config.domain[0] / _config.size; i <= _config.domain[1] / _config.size; i += _config.res) {
                const currentY = -Chalkboard.calc.correlation(func1, func2, i * _config.size) / _config.size;
                if (previousY === null || Math.abs(currentY - previousY) > discontinuityThreshold) {
                    _config.context.moveTo(i, currentY);
                } else {
                    _config.context.lineTo(i, currentY);
                }
                previousY = currentY;
                data.push([i, Chalkboard.calc.correlation(func1, func2, i)]);
            }
            _config.context.stroke();
            _config.context.restore();
            return data;
        };

        /**
         * Plots a 2D scalar function, a parametric curve, or a complex function.
         * @param {ChalkboardFunction} func - The function
         * @param {number} [config.x] - x-offset (canvas translation), defaults to canvas center
         * @param {number} [config.y] - y-offset (canvas translation), defaults to canvas center
         * @param {number} [config.size=1] - Scale, defaults to 1, divided by 100 internally for finer control
         * @param {string} [config.strokeStyle="black"] - Stroke color
         * @param {number} [config.lineWidth=2] - Stroke width
         * @param {number[]} [config.domain=[-10, 10]] - Domain over which to plot (in units of the function, not pixels)
         * @param {number} [config.res=25] - Resolution (distance in pixels between sampled points), higher values result in faster plotting but less smooth plots
         * @param {boolean} [config.isInverse=false] - Whether to plot the inverse of the function (only for scalar2d)
         * @param {boolean} [config.isPolar=false] - Whether to plot in polar coordinates (only for scalar2d)
         * @param {CanvasRenderingContext2D} [config.context] - Optional custom canvas context to draw on
         * @returns {number[][]}
         */
        export const definition = (
            func: ChalkboardFunction,
            config: {
                x: number;
                y: number;
                size: number;
                strokeStyle: string;
                lineWidth: number;
                domain: [number, number] | [[number, number], [number, number]];
                res: number;
                isInverse: boolean;
                isPolar: boolean;
                context: CanvasRenderingContext2D;
            }
        ): number[][] => {
            const _config = $(config, { domain: (func.field === "comp" ? [[-10, 10], [-10, 10]] : [-10, 10]), res: (func.field === "comp" ? 5 : 1), isInverse: false, isPolar: false });
            const xdomain = _config.domain as [number, number];
            const xydomain = _config.domain as [[number, number], [number, number]];
            const data = [];
            _config.context.save();
            _config.context.translate(_config.x, _config.y);
            _config.context.lineWidth = _config.lineWidth;
            _config.context.strokeStyle = _config.strokeStyle;
            _config.context.beginPath();
            const discontinuityThreshold = (_config.context.canvas.height / _config.size) * 1.5;
            let previousY: number | null = null;
            let previousX: number | null = null;
            if (func.type === "scalar2d" && !_config.isInverse && !_config.isPolar) {
                const f = func.rule as (x: number) => number;
                for (let i = xdomain[0] / _config.size; i <= xdomain[1] / _config.size; i += _config.res) {
                    const currentY = -f(i * _config.size) / _config.size;
                    if (previousY === null || Math.abs(currentY - previousY) > discontinuityThreshold) {
                        _config.context.moveTo(i, currentY);
                    } else {
                        _config.context.lineTo(i, currentY);
                    }
                    previousY = currentY;
                    data.push([i, f(i)]);
                }
            } else if (func.type === "scalar2d" && _config.isInverse && !_config.isPolar) {
                const f = func.rule as (y: number) => number;
                for (let i = xdomain[0] / _config.size; i <= xdomain[1] / _config.size; i += _config.res) {
                    const currentX = f(i * _config.size) / _config.size;
                    const currentY = -i;
                    if (previousX === null || Math.abs(currentX - previousX) > discontinuityThreshold) {
                        _config.context.moveTo(currentX, currentY);
                    } else {
                        _config.context.lineTo(currentX, currentY);
                    }
                    previousX = currentX;
                    data.push([f(i), i]);
                }
            } else if (func.type === "scalar2d" && !_config.isInverse && _config.isPolar) {
                const r = func.rule as (theta: number) => number;
                for (let i = xdomain[0] / _config.size; i <= xdomain[1] / _config.size; i += _config.res) {
                    const currentX = (r(i * _config.size) / _config.size) * Chalkboard.trig.cos(i * _config.size);
                    const currentY = (-r(i * _config.size) / _config.size) * Chalkboard.trig.sin(i * _config.size);
                    if (previousY === null || Math.abs(currentY - previousY) > discontinuityThreshold) {
                        _config.context.moveTo(currentX, currentY);
                    } else {
                        _config.context.lineTo(currentX, currentY);
                    }
                    previousY = currentY;
                    data.push([i, r(i)]);
                }
            } else if (func.type === "curve2d") {
                const f = func.rule as [(t: number) => number, (t: number) => number];
                for (let i = xdomain[0] / _config.size; i <= xdomain[1] / _config.size; i += _config.res) {
                    const currentX = f[0](i * _config.size) / _config.size;
                    const currentY = -f[1](i * _config.size) / _config.size;
                    if (previousY === null || Math.abs(currentY - previousY) > discontinuityThreshold) {
                        _config.context.moveTo(currentX, currentY);
                    } else {
                        _config.context.lineTo(currentX, currentY);
                    }
                    previousY = currentY;
                    data.push([f[0](i), f[1](i)]);
                }
            } else if (func.field === "comp") {
                const f = func.rule as [(a: number, b: number) => number, (a: number, b: number) => number];
                for (let i = xydomain[0][0] / _config.size; i <= xydomain[0][1] / _config.size; i += _config.res) {
                    for (let j = xydomain[1][0] / _config.size; j <= xydomain[1][1] / _config.size; j += _config.res) {
                        const z = Chalkboard.comp.init(f[0](i * _config.size, j * _config.size) / _config.size, f[1](i * _config.size, j * _config.size) / _config.size);
                        if (z.a === 0 && z.b === 0) {
                            _config.context.fillStyle = "rgb(0, 0, 0)";
                        } else if (z.a === Infinity && z.b === Infinity) {
                            _config.context.fillStyle = "rgb(255, 255, 255)";
                        } else {
                            _config.context.fillStyle = "hsl(" + Chalkboard.trig.toDeg(Chalkboard.comp.arg(z)) + ", 100%, " + (Chalkboard.trig.tanh(Chalkboard.comp.mag(z) / (Chalkboard.real.pow(10, 20) as number)) + 0.5) * 100 + "%)";
                        }
                        _config.context.fillRect(i, j, 5, 5);
                        data.push([f[0](i, j), f[1](i, j)]);
                    }
                }
            } else {
                throw new TypeError('Parameter "func" must be of type "ChalkboardFunction" with a property "type" of "expl", "inve", "pola", "curv", or "comp".');
            }
            _config.context.stroke();
            _config.context.restore();
            return data;
        };

        /**
         * Plots the first-order derivative of an explicit or inverse function.
         * @param {ChalkboardFunction} func - The function
         * @param {number} [config.x] - x-offset (canvas translation), defaults to canvas center
         * @param {number} [config.y] - y-offset (canvas translation), defaults to canvas center
         * @param {number} [config.size=1] - Scale, defaults to 1, divided by 100 internally for finer control
         * @param {string} [config.strokeStyle="black"] - Stroke color
         * @param {number} [config.lineWidth=2] - Stroke width
         * @param {number[]} [config.domain=[-10, 10]] - Domain over which to plot (in units of the function, not pixels)
         * @param {number} [config.res=25] - Resolution (distance in pixels between sampled points), higher values result in faster plotting but less smooth plots
         * @param {boolean} [config.isInverse=false] - Whether to plot the derivative of the inverse of the function (only for scalar2d)
         * @param {CanvasRenderingContext2D} [config.context] - Optional custom canvas context to draw on
         * @returns {number[][]}
         */
        export const dfdx = (
            func: ChalkboardFunction,
            config: {
                x: number;
                y: number;
                size: number;
                strokeStyle: string;
                lineWidth: number;
                domain: [number, number];
                res: number;
                isInverse: boolean;
                context: CanvasRenderingContext2D;
            }
        ): number[][] => {
            const _config = $(config, { domain: [-10, 10], res: 25, isInverse: false });
            const data = [];
            _config.context.save();
            _config.context.translate(_config.x, _config.y);
            _config.context.lineWidth = _config.lineWidth;
            _config.context.strokeStyle = _config.strokeStyle;
            _config.context.beginPath();
            const discontinuityThreshold = (_config.context.canvas.height / _config.size) * 1.5;
            let previousY: number | null = null;
            let previousX: number | null = null;
            for (let i = _config.domain[0] / _config.size; i <= _config.domain[1] / _config.size; i += _config.res) {
                if (func.type === "scalar2d" && !_config.isInverse) {
                    const currentY = -Chalkboard.calc.dfdx(func, i * _config.size) / _config.size;
                    if (previousY === null || Math.abs(currentY - previousY) > discontinuityThreshold) {
                        _config.context.moveTo(i, currentY);
                    } else {
                        _config.context.lineTo(i, currentY);
                    }
                    previousY = currentY;
                    data.push([i, Chalkboard.calc.dfdx(func, i) as number]);
                } else if (func.type === "scalar2d" && _config.isInverse) {
                    const currentX = (Chalkboard.calc.dfdx(func, i * _config.size) as number) / _config.size;
                    const currentY = -i;
                    if (previousX === null || Math.abs(currentX - previousX) > discontinuityThreshold) {
                        _config.context.moveTo(currentX, currentY);
                    } else {
                        _config.context.lineTo(currentX, currentY);
                    }
                    previousX = currentX;
                    data.push([Chalkboard.calc.dfdx(func, i) as number, i]);
                }
            }
            _config.context.stroke();
            _config.context.restore();
            return data;
        };

        /**
         * Plots the second-order derivative of an explicit or inverse function.
         * @param {ChalkboardFunction} func - The function
         * @param {number} [config.x] - x-offset (canvas translation), defaults to canvas center
         * @param {number} [config.y] - y-offset (canvas translation), defaults to canvas center
         * @param {number} [config.size=1] - Scale, defaults to 1, divided by 100 internally for finer control
         * @param {string} [config.strokeStyle="black"] - Stroke color
         * @param {number} [config.lineWidth=2] - Stroke width
         * @param {number[]} [config.domain=[-10, 10]] - Domain over which to plot (in units of the function, not pixels)
         * @param {number} [config.res=25] - Resolution (distance in pixels between sampled points), higher values result in faster plotting but less smooth plots
         * @param {boolean} [config.isInverse=false] - Whether to plot the second derivative of the inverse of the function (only for scalar2d)
         * @param {CanvasRenderingContext2D} [config.context] - Optional custom canvas context to draw on
         * @returns {number[][]}
         */
        export const d2fdx2 = (
            func: ChalkboardFunction,
            config: {
                x: number;
                y: number;
                size: number;
                strokeStyle: string;
                lineWidth: number;
                domain: [number, number];
                res: number;
                isInverse: boolean;
                context: CanvasRenderingContext2D;
            }
        ): number[][] => {
            const _config = $(config, { domain: [-10, 10], res: 25, isInverse: false });
            const data = [];
            _config.context.save();
            _config.context.translate(_config.x, _config.y);
            _config.context.lineWidth = _config.lineWidth;
            _config.context.strokeStyle = _config.strokeStyle;
            _config.context.beginPath();
            const discontinuityThreshold = (_config.context.canvas.height / _config.size) * 1.5;
            let previousY: number | null = null;
            let previousX: number | null = null;
            for (let i = _config.domain[0] / _config.size; i <= _config.domain[1] / _config.size; i += _config.res) {
                if (func.type === "scalar2d" && !_config.isInverse) {
                    const currentY = -Chalkboard.calc.d2fdx2(func, i * _config.size) / _config.size;
                    if (previousY === null || Math.abs(currentY - previousY) > discontinuityThreshold) {
                        _config.context.moveTo(i, currentY);
                    } else {
                        _config.context.lineTo(i, currentY);
                    }
                    previousY = currentY;
                    data.push([i, Chalkboard.calc.d2fdx2(func, i) as number]);
                } else if (func.type === "scalar2d" && _config.isInverse) {
                    const currentX = (Chalkboard.calc.d2fdx2(func, i * _config.size) as number) / _config.size;
                    const currentY = -i;
                    if (previousX === null || Math.abs(currentX - previousX) > discontinuityThreshold) {
                        _config.context.moveTo(currentX, currentY);
                    } else {
                        _config.context.lineTo(currentX, currentY);
                    }
                    previousX = currentX;
                    data.push([Chalkboard.calc.d2fdx2(func, i) as number, i]);
                }
            }
            _config.context.stroke();
            _config.context.restore();
            return data;
        };

        /**
         * Plots a 2D vector field.
         * @param {ChalkboardFunction} vectfield
         * @param {number} [config.x] - x-offset (canvas translation), defaults to canvas center
         * @param {number} [config.y] - y-offset (canvas translation), defaults to canvas center
         * @param {number} [config.size=1] - Scale, defaults to 1, divided by 100 internally for finer control
         * @param {string} [config.strokeStyle="black"] - Stroke color
         * @param {number} [config.lineWidth=2] - Stroke width
         * @param {number[][]} [config.domain=[[-10, 10], [-10, 10]]] - Domain over which to plot (in units of the function, not pixels)
         * @param {number} [config.res=25] - Resolution (distance in pixels between sampled points), higher values result in faster plotting but less smooth plots
         * @param {CanvasRenderingContext2D} [config.context] - Optional custom canvas context to draw on
         * @returns {number[][]}
         */
        export const field = (
            vectfield: ChalkboardFunction,
            config: {
                x: number;
                y: number;
                size: number;
                strokeStyle: string;
                lineWidth: number;
                domain: [[number, number], [number, number]];
                res: number;
                context: CanvasRenderingContext2D;
            }
        ): number[][] => {
            const _config = $(config, { domain: [[-10, 10], [-10, 10]], res: 25 });
            const data = [];
            _config.context.strokeStyle = _config.strokeStyle;
            _config.context.lineWidth = _config.lineWidth;
            _config.context.save();
            _config.context.translate(_config.x, _config.y);
            for (let i = _config.domain[0][0] / _config.size; i <= _config.domain[0][1] / _config.size; i += _config.res) {
                for (let j = _config.domain[1][0] / _config.size; j <= _config.domain[1][1] / _config.size; j += _config.res) {
                    const v = Chalkboard.vect.fromField(vectfield, Chalkboard.vect.init(i, j)) as { x: number, y: number, z?: number, w?: number };
                    _config.context.beginPath();
                    _config.context.moveTo(i, j);
                    _config.context.lineTo(i + v.x, j + v.y);
                    _config.context.stroke();
                    data.push([i + v.x, j + v.y]);
                }
            }
            _config.context.restore();
            return data;
        };

        /**
         * Plots the Fourier transform of an explicit function.
         * @param {ChalkboardFunction} func - The function
         * @param {number} [config.x] - x-offset (canvas translation), defaults to canvas center
         * @param {number} [config.y] - y-offset (canvas translation), defaults to canvas center
         * @param {number} [config.size=1] - Scale, defaults to 1, divided by 100 internally for finer control
         * @param {string} [config.strokeStyle="black"] - Stroke color
         * @param {number} [config.lineWidth=2] - Stroke width
         * @param {number[]} [config.domain=[-10, 10]] - Domain over which to plot (in units of the function, not pixels)
         * @param {number} [config.res=25] - Resolution (distance in pixels between sampled points), higher values result in faster plotting but less smooth plots
         * @param {CanvasRenderingContext2D} [config.context] - Optional custom canvas context to draw on
         * @returns {number[][]}
         */
        export const Fourier = (
            func: ChalkboardFunction,
            config: {
                x: number;
                y: number;
                size: number;
                strokeStyle: string;
                lineWidth: number;
                domain: [number, number];
                res: number;
                context: CanvasRenderingContext2D;
            }
        ): number[][] => {
            const _config = $(config, { domain: [-10, 10], res: 25 });
            const data = [];
            _config.context.save();
            _config.context.translate(_config.x, _config.y);
            _config.context.lineWidth = _config.lineWidth;
            _config.context.strokeStyle = _config.strokeStyle;
            _config.context.beginPath();
            const discontinuityThreshold = (_config.context.canvas.height / _config.size) * 1.5;
            let previousY: number | null = null;
            for (let i = _config.domain[0] / _config.size; i <= _config.domain[1] / _config.size; i += _config.res) {
                const currentY = -Chalkboard.calc.Fourier(func, i * _config.size) / _config.size;
                if (previousY === null || Math.abs(currentY - previousY) > discontinuityThreshold) {
                    _config.context.moveTo(i, currentY);
                } else {
                    _config.context.lineTo(i, currentY);
                }
                previousY = currentY;
                data.push([i, Chalkboard.calc.Fourier(func, i)]);
            }
            _config.context.stroke();
            _config.context.restore();
            return data;
        };

        /**
         * Plots the antiderivative (or integral) of an explicit or inverse function.
         * @param {ChalkboardFunction} func - The function
         * @param {number} [config.x] - x-offset (canvas translation), defaults to canvas center
         * @param {number} [config.y] - y-offset (canvas translation), defaults to canvas center
         * @param {number} [config.size=1] - Scale, defaults to 1, divided by 100 internally for finer control
         * @param {string} [config.strokeStyle="black"] - Stroke color
         * @param {number} [config.lineWidth=2] - Stroke width
         * @param {number[]} [config.domain=[-10, 10]] - Domain over which to plot (in units of the function, not pixels)
         * @param {number} [config.res=25] - Resolution (distance in pixels between sampled points), higher values result in faster plotting but less smooth plots
         * @param {boolean} [config.isInverse=false] - Whether to plot the inverse function
         * @param {CanvasRenderingContext2D} [config.context] - Optional custom canvas context to draw on
         * @returns {number[][]}
         */
        export const fxdx = (
            func: ChalkboardFunction,
            config: {
                x: number;
                y: number;
                size: number;
                strokeStyle: string;
                lineWidth: number;
                domain: [number, number];
                res: number;
                isInverse: boolean;
                context: CanvasRenderingContext2D;
            }
        ): number[][] => {
            const _config = $(config, { domain: [-10, 10], res: 25, isInverse: false });
            const data = [];
            _config.context.save();
            _config.context.translate(_config.x, _config.y);
            _config.context.lineWidth = _config.lineWidth;
            _config.context.strokeStyle = _config.strokeStyle;
            _config.context.beginPath();
            const discontinuityThreshold = (_config.context.canvas.height / _config.size) * 1.5;
            let previousY: number | null = null;
            let previousX: number | null = null;
            for (let i = _config.domain[0] / _config.size; i <= _config.domain[1] / _config.size; i += _config.res) {
                if (func.type === "scalar2d" && !_config.isInverse) {
                    const currentY = -Chalkboard.calc.fxdx(func, 0, i * _config.size) / _config.size;
                    if (previousY === null || Math.abs(currentY - previousY) > discontinuityThreshold) {
                        _config.context.moveTo(i, currentY);
                    } else {
                        _config.context.lineTo(i, currentY);
                    }
                    previousY = currentY;
                    data.push([i, Chalkboard.calc.fxdx(func, 0, i) as number]);
                } else if (func.type === "scalar2d" && _config.isInverse) {
                    const currentX = (Chalkboard.calc.fxdx(func, 0, i * _config.size) as number) / _config.size;
                    const currentY = -i;
                    if (previousX === null || Math.abs(currentX - previousX) > discontinuityThreshold) {
                        _config.context.moveTo(currentX, currentY);
                    } else {
                        _config.context.lineTo(currentX, currentY);
                    }
                    previousX = currentX;
                    data.push([Chalkboard.calc.fxdx(func, 0, i) as number, i]);
                }
            }
            _config.context.stroke();
            _config.context.restore();
            return data;
        };

        /**
         * Plots the Laplace transform of an explicit function.
         * @param {ChalkboardFunction} func - The function
         * @param {number} [config.x] - x-offset (canvas translation), defaults to canvas center
         * @param {number} [config.y] - y-offset (canvas translation), defaults to canvas center
         * @param {number} [config.size=1] - Scale, defaults to 1, divided by 100 internally for finer control
         * @param {string} [config.strokeStyle="black"] - Stroke color
         * @param {number} [config.lineWidth=2] - Stroke width
         * @param {number[]} [config.domain=[-10, 10]] - Domain over which to plot (in units of the function, not pixels)
         * @param {number} [config.res=25] - Resolution (distance in pixels between sampled points), higher values result in faster plotting but less smooth plots
         * @param {CanvasRenderingContext2D} [config.context] - Optional custom canvas context to draw on
         * @returns {number[][]}
         */
        export const Laplace = (
            func: ChalkboardFunction,
            config: {
                x: number;
                y: number;
                size: number;
                strokeStyle: string;
                lineWidth: number;
                domain: [number, number];
                res: number;
                context: CanvasRenderingContext2D;
            }
        ): number[][] => {
            const _config = $(config, { domain: [-10, 10], res: 25 });
            const data = [];
            _config.context.save();
            _config.context.translate(_config.x, _config.y);
            _config.context.lineWidth = _config.lineWidth;
            _config.context.strokeStyle = _config.strokeStyle;
            _config.context.beginPath();
            const discontinuityThreshold = (_config.context.canvas.height / _config.size) * 1.5;
            let previousY: number | null = null;
            if (_config.domain[0] >= 0) {
                for (let i = _config.domain[0] / _config.size; i <= _config.domain[1] / _config.size; i += _config.res) {
                    const currentY = -Chalkboard.calc.Laplace(func, i * _config.size) / _config.size;
                    if (previousY === null || Math.abs(currentY - previousY) > discontinuityThreshold) {
                        _config.context.moveTo(i, currentY);
                    } else {
                        _config.context.lineTo(i, currentY);
                    }
                    previousY = currentY;
                    data.push([i, Chalkboard.calc.Laplace(func, i)]);
                }
            } else {
                for (let i = 0; i <= _config.domain[1] / _config.size; i += _config.res) {
                    const currentY = -Chalkboard.calc.Laplace(func, i * _config.size) / _config.size;
                    if (previousY === null || Math.abs(currentY - previousY) > discontinuityThreshold) {
                        _config.context.moveTo(i, currentY);
                    } else {
                        _config.context.lineTo(i, currentY);
                    }
                    previousY = currentY;
                    data.push([i, Chalkboard.calc.Laplace(func, i)]);
                }
            }
            _config.context.stroke();
            _config.context.restore();
            return data;
        };

        /**
         * Plots a line chart/plot/graph for an array of data with bins specified by another array.
         * @param {number[]} arr - The data array
         * @param {number[]} bins - The bin edges array (length should be one more than the number of bins)
         * @param {number} [config.x] - x-offset (canvas translation), defaults to canvas center
         * @param {number} [config.y] - y-offset (canvas translation), defaults to canvas center
         * @param {number} [config.size=1] - Scale, defaults to 1, divided by 100 internally for finer control
         * @param {string} [config.strokeStyle="black"] - Stroke color
         * @param {number} [config.lineWidth=2] - Stroke width
         * @param {CanvasRenderingContext2D} [config.context] - Optional custom canvas context to draw on
         * @returns {number[][]}
         */
        export const lineplot = (
            arr: number[],
            bins: number[],
            config: {
                x: number;
                y: number;
                size: number;
                strokeStyle: string;
                lineWidth: number;
                context: CanvasRenderingContext2D;
            }
        ): number[][] => {
            const _config = $(config);
            _config.context.save();
            _config.context.translate(_config.x, _config.y);
            _config.context.lineWidth = _config.lineWidth;
            _config.context.strokeStyle = _config.strokeStyle;
            const verts = [];
            for (let i = 1; i < bins.length; i++) {
                verts.push(Chalkboard.stat.ineq(arr, bins[i - 1], bins[i], i === 1, true));
            }
            const counts = [];
            for (let i = 0; i < verts.length; i++) {
                counts.push(verts[i].length);
            }
            _config.context.beginPath();
            _config.context.moveTo(bins[0] / _config.size, 0);
            for (let i = 0; i < counts.length; i++) {
                const midX = (bins[i] + bins[i + 1]) / 2 / _config.size;
                _config.context.lineTo(midX, -counts[i] / _config.size);
            }
            _config.context.lineTo(bins[bins.length - 1] / _config.size, 0);
            _config.context.stroke();
            _config.context.restore();
            return verts;
        };

        /**
         * Plots a 2x2 matrix.
         * @param {ChalkboardMatrix} matr - The matrix
         * @param {number} [config.x] - x-offset (canvas translation), defaults to canvas center
         * @param {number} [config.y] - y-offset (canvas translation), defaults to canvas center
         * @param {number} [config.size=1] - Scale, defaults to 1, divided by 100 internally for finer control
         * @param {string} [config.strokeStyle="black"] - Stroke color
         * @param {number} [config.lineWidth=2] - Stroke width
         * @param {number[]} [config.domain=[-10, 10]] - Domain over which to plot (in units of the matrix, not pixels)
         * @param {CanvasRenderingContext2D} [config.context] - Optional custom canvas context to draw on
         * @returns {number[][]}
         */
        export const matr = (
            matr: ChalkboardMatrix,
            config: {
                x: number;
                y: number;
                size: number;
                strokeStyle: string;
                lineWidth: number;
                domain: [number, number];
                context: CanvasRenderingContext2D;
            }
        ): number[][] => {
            const _config = $(config, { domain: [-10, 10] });
            for (let i = _config.domain[0]; i <= _config.domain[1]; i++) {
                Chalkboard.plot.vect(Chalkboard.vect.init(matr[0][0], matr[1][0]), {
                    x: _config.x,
                    y: _config.y + (i / _config.size) * matr[1][1],
                    size: _config.size,
                    strokeStyle: _config.strokeStyle,
                    lineWidth: _config.lineWidth / 4,
                    context: _config.context
                });
                Chalkboard.plot.vect(Chalkboard.vect.init(-matr[0][0], -matr[1][0]), {
                    x: _config.x,
                    y: _config.y + (i / _config.size) * matr[1][1],
                    size: _config.size,
                    strokeStyle: _config.strokeStyle,
                    lineWidth: _config.lineWidth / 4,
                    context: _config.context
                });
                Chalkboard.plot.vect(Chalkboard.vect.init(matr[0][1], matr[1][1]), {
                    x: _config.x + (i / _config.size) * matr[0][0],
                    y: _config.y,
                    size: _config.size,
                    strokeStyle: _config.strokeStyle,
                    lineWidth: _config.lineWidth / 4,
                    context: _config.context
                });
                Chalkboard.plot.vect(Chalkboard.vect.init(-matr[0][1], -matr[1][1]), {
                    x: _config.x + (i / _config.size) * matr[0][0],
                    y: _config.y,
                    size: _config.size,
                    strokeStyle: _config.strokeStyle,
                    lineWidth: _config.lineWidth / 4,
                    context: _config.context
                });
            }
            Chalkboard.plot.vect(Chalkboard.vect.init(matr[0][0], matr[1][0]), _config);
            Chalkboard.plot.vect(Chalkboard.vect.init(-matr[0][0], -matr[1][0]), _config);
            Chalkboard.plot.vect(Chalkboard.vect.init(matr[0][1], matr[1][1]), _config);
            Chalkboard.plot.vect(Chalkboard.vect.init(-matr[0][1], -matr[1][1]), _config);
            return matr;
        };

        /**
         * Plots an ODE solution. Supports both scalar and system ODEs. For scalar ODEs, plots y(t). For systems, can plot either y[j] vs t or y[j] vs y[i] (phase plot) based on the "phase" config option.
         * @param {{ t: number[]; y: number[][] }} sol - The solution object from Chalkboard.diff.solve or Chalkboard.diff.solveAdaptive
         * @param {number} [config.x] - x-offset (canvas translation), defaults to canvas center
         * @param {number} [config.y] - y-offset (canvas translation), defaults to canvas center
         * @param {number} [config.size=1] - Scale, defaults to 1, divided by 100 internally for finer control
         * @param {string} [config.strokeStyle="black"] - Stroke color
         * @param {number} [config.lineWidth=2] - Stroke width
         * @param {number} [config.i=0] - x-component index (for phase plots)
         * @param {number} [config.j=1] - y-component index (for phase plots)
         * @param {boolean} [config.phase=false] - If true, plots y[j] vs y[i] (phase plot), if false, plots y[i] vs t
         * @param {CanvasRenderingContext2D} [config.context] - Canvas context
         * @returns {number[][]}
         * @example
         * // Plot scalar solution y(t)
         * const ode1 = Chalkboard.diff.exponential(-1);
         * const sol1 = Chalkboard.diff.solve(ode1, { t0: 0, t1: 5, steps: 300, y0: 1 });
         * Chalkboard.plot.ode(sol1, { strokeStyle: "red", size: 1 });
         * 
         * // Phase plot for harmonic oscillator (y vs dy)
         * const ode2 = Chalkboard.diff.harmonic();
         * const sol2 = Chalkboard.diff.solve(ode2, { t0: 0, t1: 20, steps: 2000, y0: { y0: 1, dy0: 0 } });
         * Chalkboard.plot.ode(sol2, { phase: true, i: 0, j: 1, strokeStyle: "blue" });
         */
        export const ode = (
            sol: { t: number[]; y: number[][] },
            config: {
                x?: number;
                y?: number;
                size?: number;
                strokeStyle?: string;
                lineWidth?: number;
                i?: number;
                j?: number;
                phase?: boolean;
                context?: CanvasRenderingContext2D;
            } = {}
        ): number[][] => {
            const _config = $(config, { phase: false, i: 0, j: 1 });
            if (!sol || !Array.isArray(sol.t) || !Array.isArray(sol.y)) throw new Error(`Chalkboard.plot.ode: Parameter "sol" must have properties "t" and "y" as arrays.`);
            if (sol.t.length !== sol.y.length || sol.t.length === 0) throw new Error(`Chalkboard.plot.ode: Invalid solution object (length mismatch or empty).`);
            const dim = sol.y[0].length;
            if (!Number.isInteger(_config.i) || _config.i < 0) throw new Error(`Chalkboard.plot.ode: "i" must be an integer >= 0.`);
            if (_config.i >= dim) throw new Error(`Chalkboard.plot.ode: "i" is out of range for solution dimension.`);
            if (_config.phase) {
                if (!Number.isInteger(_config.j) || _config.j < 0) throw new Error(`Chalkboard.plot.ode: "j" must be an integer >= 0.`);
                if (_config.j >= dim) throw new Error(`Chalkboard.plot.ode: "j" is out of range for solution dimension.`);
                if (_config.i === _config.j) throw new Error(`Chalkboard.plot.ode: For phase plots, "i" and "j" must be different.`);
            }
            const data: number[][] = [];
            _config.context.save();
            _config.context.translate(_config.x, _config.y);
            _config.context.lineWidth = _config.lineWidth;
            _config.context.strokeStyle = _config.strokeStyle;
            _config.context.beginPath();
            if (!_config.phase) {
                for (let k = 0; k < sol.t.length; k++) {
                    const X = sol.t[k] / _config.size;
                    const Y = -sol.y[k][_config.i] / _config.size;
                    if (k === 0) _config.context.moveTo(X, Y);
                    else _config.context.lineTo(X, Y);
                    data.push([sol.t[k], sol.y[k][_config.i]]);
                }
            } else {
                for (let k = 0; k < sol.y.length; k++) {
                    const X = sol.y[k][_config.i] / _config.size;
                    const Y = -sol.y[k][_config.j] / _config.size;
                    if (k === 0) _config.context.moveTo(X, Y);
                    else _config.context.lineTo(X, Y);
                    data.push([sol.y[k][_config.i], sol.y[k][_config.j]]);
                }
            }
            _config.context.stroke();
            _config.context.restore();
            return data;
        };

        /**
         * Plots the polar coordinate plane.
         * @param {number} [config.x] - x-offset (canvas translation), defaults to canvas center
         * @param {number} [config.y] - y-offset (canvas translation), defaults to canvas center
         * @param {number} [config.size=1] - Scale, defaults to 1, divided by 100 internally for finer control
         * @param {string} [config.strokeStyle="black"] - Stroke color
         * @param {number} [config.lineWidth=2] - Stroke width
         * @param {CanvasRenderingContext2D} [config.context] - Optional custom canvas context to draw on
         * @returns {void}
         */
        export const rOplane = (config: {
            x: number;
            y: number;
            size: number;
            strokeStyle: string;
            lineWidth: number;
            context: CanvasRenderingContext2D;
        }): void => {
            const _config = $(config);
            const cw = getContext().canvas.width;
            _config.context.save();
            _config.context.translate(_config.x, _config.y);
            _config.context.strokeStyle = _config.strokeStyle;
            _config.context.lineWidth = _config.lineWidth / 4;
            _config.context.beginPath();
            for (let i = 0; i <= (_config.size * cw) / 2; i++) {
                _config.context.ellipse(0, 0, i / _config.size, i / _config.size, 0, 0, Chalkboard.PI(2));
            }
            _config.context.stroke();
            _config.context.lineWidth = _config.lineWidth;
            _config.context.beginPath();
            _config.context.moveTo(-_config.x, 0);
            _config.context.lineTo(cw - _config.x, 0);
            _config.context.stroke();
            _config.context.beginPath();
            _config.context.moveTo(0, -_config.y);
            _config.context.lineTo(0, cw - _config.y);
            _config.context.stroke();
            _config.context.restore();
        };

        /**
         * Plots a scatter plot of two arrays of data.
         * @param {number[]} arr1 - The first data array (x-coordinates)
         * @param {number[]} arr2 - The second data array (y-coordinates)
         * @param {number} [config.x] - x-offset (canvas translation), defaults to canvas center
         * @param {number} [config.y] - y-offset (canvas translation), defaults to canvas center
         * @param {number} [config.size=1] - Scale, defaults to 1, divided by 100 internally for finer control
         * @param {string} [config.fillStyle="black"] - Fill color for the points
         * @param {number} [config.lineWidth=5] - Diameter of the points in pixels
         * @param {CanvasRenderingContext2D} [config.context] - Optional custom canvas context to draw on
         * @returns {number[][]}
         */
        export const scatterplot = (
            arr1: number[],
            arr2: number[],
            config: {
                x: number;
                y: number;
                size: number;
                fillStyle: string;
                lineWidth: number;
                context: CanvasRenderingContext2D;
            }
        ): number[][] => {
            const _config = $(config, { fillStyle: "black", lineWidth: 5 });
            const data = [];
            _config.context.save();
            _config.context.translate(_config.x, _config.y);
            _config.context.fillStyle = _config.fillStyle;
            if (arr1.length === arr2.length) {
                for (let i = 0; i < arr1.length; i++) {
                    _config.context.beginPath();
                    _config.context.ellipse(arr1[i] / _config.size, -arr2[i] / _config.size, _config.lineWidth, _config.lineWidth, 0, 0, Chalkboard.PI(2));
                    _config.context.fill();
                    data.push([arr1[i], arr2[i]]);
                }
            }
            _config.context.restore();
            return data;
        };

        /**
         * Plots the nth-degree Taylor series approximation for an explicit function.
         * @param {ChalkboardFunction} func - The function
         * @param {0 | 1 | 2} n - The degree of the Taylor approximation (0 for constant, 1 for linear, 2 for quadratic)
         * @param {number} a - The point of expansion (in units of the function, not pixels)
         * @param {number} [config.x] - x-offset (canvas translation), defaults to canvas center
         * @param {number} [config.y] - y-offset (canvas translation), defaults to canvas center
         * @param {number} [config.size=1] - Scale, defaults to 1, divided by 100 internally for finer control
         * @param {string} [config.strokeStyle="black"] - Stroke color
         * @param {number} [config.lineWidth=2] - Stroke width
         * @param {number[]} [config.domain=[-10, 10]] - Domain over which to plot (in units of the matrix, not pixels)
         * @param {number} [config.res=25] - Resolution of the plot
         * @param {CanvasRenderingContext2D} [config.context] - Optional custom canvas context to draw on
         * @returns {number[][]}
         */
        export const Taylor = (
            func: ChalkboardFunction,
            n: 0 | 1 | 2,
            a: number,
            config: {
                x: number;
                y: number;
                size: number;
                strokeStyle: string;
                lineWidth: number;
                domain: [number, number];
                res: number;
                context: CanvasRenderingContext2D;
            }
        ): number[][] => {
            const _config = $(config, { domain: [-10, 10], res: 25 });
            const data = [];
            _config.context.save();
            _config.context.translate(_config.x, _config.y);
            _config.context.lineWidth = _config.lineWidth;
            _config.context.strokeStyle = _config.strokeStyle;
            _config.context.beginPath();
            const discontinuityThreshold = (_config.context.canvas.height / _config.size) * 1.5;
            let previousY: number | null = null;
            for (let i = _config.domain[0] / _config.size; i <= _config.domain[1] / _config.size; i += _config.res) {
                const currentY = -Chalkboard.calc.Taylor(func, i * _config.size, n, a) / _config.size;
                if (previousY === null || Math.abs(currentY - previousY) > discontinuityThreshold) {
                    _config.context.moveTo(i, currentY);
                } else {
                    _config.context.lineTo(i, currentY);
                }
                previousY = currentY;
                data.push([i, Chalkboard.calc.Taylor(func, i, n, a)]);
            }
            _config.context.stroke();
            _config.context.restore();
            return data;
        };

        /**
         * Plots a 2D vector.
         * @param {ChalkboardVector} vect - The vector
         * @param {number} [config.x] - x-offset (canvas translation), defaults to canvas center
         * @param {number} [config.y] - y-offset (canvas translation), defaults to canvas center
         * @param {number} [config.size=1] - Scale, defaults to 1, divided by 100 internally for finer control
         * @param {string} [config.strokeStyle="black"] - Stroke color
         * @param {number} [config.lineWidth=5] - Stroke width
         * @param {CanvasRenderingContext2D} [config.context] - Optional custom canvas context to draw on
         * @returns {number[][]}
         */
        export const vect = (
            vect: ChalkboardVector,
            config: {
                x: number;
                y: number;
                size: number;
                strokeStyle: string;
                lineWidth: number;
                context: CanvasRenderingContext2D;
            }
        ): number[][] => {
            const _config = $(config, { lineWidth: 5 });
            vect = vect as { x: number, y: number, z?: number, w?: number }
            _config.context.strokeStyle = _config.strokeStyle;
            _config.context.lineWidth = _config.lineWidth;
            _config.context.save();
            _config.context.translate(_config.x, _config.y);
            _config.context.beginPath();
            _config.context.moveTo(0, 0);
            _config.context.lineTo(vect.x / _config.size, -vect.y / _config.size);
            _config.context.stroke();
            _config.context.restore();
            return [[vect.x], [vect.y]];
        };

        /**
         * Plots the Cartesian coordinate plane.
         * @param {number} [config.x] - x-offset (canvas translation), defaults to canvas center
         * @param {number} [config.y] - y-offset (canvas translation), defaults to canvas center
         * @param {number} [config.size=1] - Scale, defaults to 1, divided by 100 internally for finer control
         * @param {string} [config.strokeStyle="black"] - Stroke color
         * @param {number} [config.lineWidth=2] - Stroke width
         * @param {CanvasRenderingContext2D} [config.context] - Optional custom canvas context to draw on
         * @returns {void}
         */
        export const xyplane = (config: {
            x: number;
            y: number;
            size: number;
            strokeStyle: string;
            lineWidth: number;
            context: CanvasRenderingContext2D;
        }): void => {
            const _config = $(config);
            const cw = getContext().canvas.width;
            _config.context.save();
            _config.context.translate(_config.x, _config.y);
            _config.context.strokeStyle = _config.strokeStyle;
            _config.context.lineWidth = _config.lineWidth / 4;
            _config.context.beginPath();
            for (let i = Math.floor(-_config.x / _config.size); i <= (cw - _config.x) / _config.size; i++) {
                _config.context.moveTo(i / _config.size, -_config.y);
                _config.context.lineTo(i / _config.size, cw - _config.y);
            }
            _config.context.stroke();
            _config.context.beginPath();
            for (let i = Math.floor(-_config.y / _config.size); i <= (cw - _config.y) / _config.size; i++) {
                _config.context.moveTo(-_config.x, i / _config.size);
                _config.context.lineTo(cw - _config.x, i / _config.size);
            }
            _config.context.stroke();
            _config.context.lineWidth = _config.lineWidth;
            _config.context.beginPath();
            _config.context.moveTo(-_config.x, 0);
            _config.context.lineTo(cw - _config.x, 0);
            _config.context.stroke();
            _config.context.beginPath();
            _config.context.moveTo(0, -_config.y);
            _config.context.lineTo(0, cw - _config.y);
            _config.context.stroke();
            _config.context.restore();
        };
    }
}
