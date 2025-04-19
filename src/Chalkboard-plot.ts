/*
    The Chalkboard Library - Plotting Namespace
    Version 2.3.0 Boole
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
                return Chalkboard.real.parse(Chalkboard.CONTEXT) as unknown as CanvasRenderingContext2D;
            } catch (e) {
                throw new Error("Cannot initialize canvas context. Make sure an HTML <canvas> element exists in the webpage before using Chalkboard.plot functions.");
            }
        };

        /**
         * Plots the autocorrelation of an explicit function.
         * @param {ChalkboardFunction} func - The function
         * @param {object} config - The configuration options
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
            (config = {
                x: (config = config || {}).x || getContext().canvas.width / 2,
                y: config.y || getContext().canvas.height / 2,
                size: config.size || 1,
                strokeStyle: config.strokeStyle || "black",
                lineWidth: config.lineWidth || 2,
                domain: config.domain || [-10, 10],
                res: config.res || 25,
                context: config.context || getContext()
            }).size /= 100;
            const data = [];
            config.context.save();
            config.context.translate(config.x, config.y);
            config.context.lineWidth = config.lineWidth;
            config.context.strokeStyle = config.strokeStyle;
            config.context.beginPath();
            for (let i = config.domain[0] / config.size; i <= config.domain[1] / config.size; i += config.res) {
                config.context.lineTo(i, -Chalkboard.calc.autocorrelation(func, i * config.size) / config.size);
                data.push([i, Chalkboard.calc.autocorrelation(func, i)]);
            }
            config.context.stroke();
            config.context.restore();
            return data;
        };

        /**
         * Plots a bar plot/chart/graph for an array of data with bins specified by another array.
         * @param arr
         * @param bins
         * @param {object} config - The configuration options
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
            (config = {
                x: (config = config || {}).x || getContext().canvas.width / 2,
                y: config.y || getContext().canvas.height / 2,
                size: config.size || 1,
                fillStyle: config.fillStyle || "white",
                strokeStyle: config.strokeStyle || "black",
                lineWidth: config.lineWidth || 2,
                context: config.context || getContext()
            }).size /= 100;
            config.context.save();
            config.context.translate(config.x, config.y);
            config.context.lineWidth = config.lineWidth;
            config.context.strokeStyle = config.strokeStyle;
            config.context.fillStyle = config.fillStyle;
            const bars = [];
            for (let i = 0; i < bins.length; i++) {
                if (i === 0) {
                    bars.push(Chalkboard.stat.lt(arr, bins[0], true));
                } else if (i === bins.length) {
                    bars.push(Chalkboard.stat.gt(arr, bins[bins.length - 1], true));
                } else {
                    bars.push(Chalkboard.stat.ineq(arr, bins[i - 1], bins[i], false, true));
                }
            }
            const counts = [];
            for (let i = 0; i < bars.length; i++) {
                counts.push(bars[i].length);
            }
            let x = 0;
            const width = counts.length / (2 * config.size);
            for (let i = 0; i < counts.length; i++) {
                config.context.fillRect(x - width, 0, 1 / config.size, -counts[i] / config.size);
                config.context.strokeRect(x - width, 0, 1 / config.size, -counts[i] / config.size);
                x += 1 / config.size;
            }
            config.context.restore();
            return bars;
        };

        /**
         * Plots a complex number.
         * @param comp
         * @param {object} config - The configuration options
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
            (config = {
                x: (config = config || {}).x || getContext().canvas.width / 2,
                y: config.y || getContext().canvas.height / 2,
                size: config.size || 1,
                fillStyle: config.fillStyle || "black",
                lineWidth: config.lineWidth || 5,
                context: config.context || getContext()
            }).size /= 100;
            config.context.fillStyle = config.fillStyle;
            config.context.save();
            config.context.translate(config.x, config.y);
            config.context.beginPath();
            config.context.ellipse(comp.a / config.size, -comp.b / config.size, config.lineWidth, config.lineWidth, 0, 0, Chalkboard.PI(2));
            config.context.fill();
            config.context.restore();
            return [[comp.a], [comp.b]];
        };

        /**
         * Plots the convolution of two explicit functions.
         * @param {ChalkboardFunction} func1 - The first function
         * @param {ChalkboardFunction} func2 - The second function
         * @param {object} config - The configuration options
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
            (config = {
                x: (config = config || {}).x || getContext().canvas.width / 2,
                y: config.y || getContext().canvas.height / 2,
                size: config.size || 1,
                strokeStyle: config.strokeStyle || "black",
                lineWidth: config.lineWidth || 2,
                domain: config.domain || [-10, 10],
                res: config.res || 25,
                context: config.context || getContext()
            }).size /= 100;
            const data = [];
            config.context.save();
            config.context.translate(config.x, config.y);
            config.context.lineWidth = config.lineWidth;
            config.context.strokeStyle = config.strokeStyle;
            config.context.beginPath();
            for (let i = config.domain[0] / config.size; i <= config.domain[1] / config.size; i += config.res) {
                config.context.lineTo(i, -Chalkboard.calc.convolution(func1, func2, i * config.size) / config.size);
                data.push([i, Chalkboard.calc.convolution(func1, func2, i)]);
            }
            config.context.stroke();
            config.context.restore();
            return data;
        };

        /**
         * Plots the cross-correlation of two explicit functions.
         * @param {ChalkboardFunction} func1 - The first function
         * @param {ChalkboardFunction} func2 - The second function
         * @param {object} config - The configuration options
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
            (config = {
                x: (config = config || {}).x || getContext().canvas.width / 2,
                y: config.y || getContext().canvas.height / 2,
                size: config.size || 1,
                strokeStyle: config.strokeStyle || "black",
                lineWidth: config.lineWidth || 2,
                domain: config.domain || [-10, 10],
                res: config.res || 25,
                context: config.context || getContext()
            }).size /= 100;
            const data = [];
            config.context.save();
            config.context.translate(config.x, config.y);
            config.context.lineWidth = config.lineWidth;
            config.context.strokeStyle = config.strokeStyle;
            config.context.beginPath();
            for (let i = config.domain[0] / config.size; i <= config.domain[1] / config.size; i += config.res) {
                config.context.lineTo(i, -Chalkboard.calc.correlation(func1, func2, i * config.size) / config.size);
                data.push([i, Chalkboard.calc.correlation(func1, func2, i)]);
            }
            config.context.stroke();
            config.context.restore();
            return data;
        };

        /**
         * Plots an explicit, inverse, polar, parametric curve, or complex function.
         * @param {ChalkboardFunction} func - The function
         * @param {object} config - The configuration options
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
                context: CanvasRenderingContext2D;
            }
        ): number[][] => {
            (config = {
                x: (config = config || {}).x || getContext().canvas.width / 2,
                y: config.y || getContext().canvas.height / 2,
                size: config.size || 1,
                strokeStyle: config.strokeStyle || "black",
                lineWidth: config.lineWidth || 2,
                domain:
                    config.domain ||
                    (func.type === "comp"
                        ? [
                              [-10, 10],
                              [-10, 10]
                          ]
                        : [-10, 10]),
                context: config.context || getContext()
            }).size /= 100;
            const xdomain = config.domain as [number, number];
            const xydomain = config.domain as [[number, number], [number, number]];
            const data = [];
            config.context.save();
            config.context.translate(config.x, config.y);
            config.context.lineWidth = config.lineWidth;
            config.context.strokeStyle = config.strokeStyle;
            config.context.beginPath();
            if (func.type === "expl") {
                const f = Chalkboard.real.parse("x => " + func.definition);
                for (let i = xdomain[0] / config.size; i <= xdomain[1] / config.size; i++) {
                    config.context.lineTo(i, -f(i * config.size) / config.size);
                    data.push([i, f(i)]);
                }
            } else if (func.type === "inve") {
                const f = Chalkboard.real.parse("y => " + func.definition);
                for (let i = xdomain[0] / config.size; i <= xdomain[1] / config.size; i++) {
                    config.context.lineTo(f(i * config.size) / config.size, -i);
                    data.push([f(i), i]);
                }
            } else if (func.type === "pola") {
                const r = Chalkboard.real.parse("O => " + func.definition);
                for (let i = xdomain[0] / config.size; i <= xdomain[1] / config.size; i++) {
                    config.context.lineTo((r(i * config.size) / config.size) * Chalkboard.trig.cos(i * config.size), (-r(i * config.size) / config.size) * Chalkboard.trig.sin(i * config.size));
                    data.push([i, r(i)]);
                }
            } else if (func.type === "curv") {
                const x = Chalkboard.real.parse("t => " + func.definition[0]),
                    y = Chalkboard.real.parse("t => " + func.definition[1]);
                for (let i = xdomain[0] / config.size; i <= xdomain[1] / config.size; i++) {
                    config.context.lineTo(x(i * config.size) / config.size, -y(i * config.size) / config.size);
                    data.push([x(i), y(i)]);
                }
            } else if (func.type === "comp") {
                const u = Chalkboard.comp.parse("(a, b) => " + func.definition[0]),
                    v = Chalkboard.comp.parse("(a, b) => " + func.definition[1]);
                for (let i = xydomain[0][0] / config.size; i <= xydomain[0][1] / config.size; i += 5) {
                    for (let j = xydomain[1][0] / config.size; j <= xydomain[1][1] / config.size; j += 5) {
                        const z = Chalkboard.comp.init(u(i * config.size, j * config.size) / config.size, v(i * config.size, j * config.size) / config.size);
                        if (z.a === 0 && z.b === 0) {
                            config.context.fillStyle = "rgb(0, 0, 0)";
                        } else if (z.a === Infinity && z.b === Infinity) {
                            config.context.fillStyle = "rgb(255, 255, 255)";
                        } else {
                            config.context.fillStyle =
                                "hsl(" + Chalkboard.trig.toDeg(Chalkboard.comp.arg(z)) + ", 100%, " + (Chalkboard.trig.tanh(Chalkboard.comp.mag(z) / (Chalkboard.real.pow(10, 20) as number)) + 0.5) * 100 + "%)";
                        }
                        config.context.fillRect(i, j, 5, 5);
                        data.push([u(i, j), v(i, j)]);
                    }
                }
            } else {
                throw new TypeError('Parameter "func" must be of type "ChalkboardFunction" with a property "type" of "expl", "inve", "pola", "curv", or "comp".');
            }
            config.context.stroke();
            config.context.restore();
            return data;
        };

        /**
         * Plots the first-order derivative of an explicit or inverse function.
         * @param {ChalkboardFunction} func - The function
         * @param {object} config - The configuration options
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
                context: CanvasRenderingContext2D;
            }
        ): number[][] => {
            (config = {
                x: (config = config || {}).x || getContext().canvas.width / 2,
                y: config.y || getContext().canvas.height / 2,
                size: config.size || 1,
                strokeStyle: config.strokeStyle || "black",
                lineWidth: config.lineWidth || 2,
                domain: config.domain || [-10, 10],
                res: config.res || 25,
                context: config.context || getContext()
            }).size /= 100;
            const data = [];
            config.context.save();
            config.context.translate(config.x, config.y);
            config.context.lineWidth = config.lineWidth;
            config.context.strokeStyle = config.strokeStyle;
            config.context.beginPath();
            for (let i = config.domain[0] / config.size; i <= config.domain[1] / config.size; i += config.res) {
                if (func.type === "expl") {
                    config.context.lineTo(i, -Chalkboard.calc.dfdx(func, i * config.size) / config.size);
                    data.push([i, Chalkboard.calc.dfdx(func, i) as number]);
                } else if (func.type === "inve") {
                    config.context.lineTo((Chalkboard.calc.dfdx(func, i * config.size) as number) / config.size, -i);
                    data.push([Chalkboard.calc.dfdx(func, i) as number, i]);
                }
            }
            config.context.stroke();
            config.context.restore();
            return data;
        };

        /**
         * Plots the second-order derivative of an explicit or inverse function.
         * @param {ChalkboardFunction} func - The function
         * @param {object} config - The configuration options
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
                context: CanvasRenderingContext2D;
            }
        ): number[][] => {
            (config = {
                x: (config = config || {}).x || getContext().canvas.width / 2,
                y: config.y || getContext().canvas.height / 2,
                size: config.size || 1,
                strokeStyle: config.strokeStyle || "black",
                lineWidth: config.lineWidth || 2,
                domain: config.domain || [-10, 10],
                res: config.res || 25,
                context: config.context || getContext()
            }).size /= 100;
            const data = [];
            config.context.save();
            config.context.translate(config.x, config.y);
            config.context.lineWidth = config.lineWidth;
            config.context.strokeStyle = config.strokeStyle;
            config.context.beginPath();
            for (let i = config.domain[0] / config.size; i <= config.domain[1] / config.size; i += config.res) {
                if (func.type === "expl") {
                    config.context.lineTo(i, -Chalkboard.calc.d2fdx2(func, i * config.size) / config.size);
                    data.push([i, Chalkboard.calc.d2fdx2(func, i) as number]);
                } else if (func.type === "inve") {
                    config.context.lineTo((Chalkboard.calc.d2fdx2(func, i * config.size) as number) / config.size, -i);
                    data.push([Chalkboard.calc.d2fdx2(func, i) as number, i]);
                }
            }
            config.context.stroke();
            config.context.restore();
            return data;
        };

        /**
         * Plots a 2D vector field.
         * @param vectfield
         * @param {object} config - The configuration options
         * @returns {number[][]}
         */
        export const field = (
            vectfield: ChalkboardVectorField,
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
            (config = {
                x: (config = config || {}).x || getContext().canvas.width / 2,
                y: config.y || getContext().canvas.height / 2,
                size: config.size || 1,
                strokeStyle: config.strokeStyle || "black",
                lineWidth: config.lineWidth || 2,
                domain: config.domain || [
                    [-10, 10],
                    [-10, 10]
                ],
                res: config.res || 25,
                context: config.context || getContext()
            }).size /= 100;
            const data = [];
            config.context.strokeStyle = config.strokeStyle;
            config.context.lineWidth = config.lineWidth;
            config.context.save();
            config.context.translate(config.x, config.y);
            for (let i = config.domain[0][0] / config.size; i <= config.domain[0][1] / config.size; i += config.res) {
                for (let j = config.domain[1][0] / config.size; j <= config.domain[1][1] / config.size; j += config.res) {
                    const v = Chalkboard.vect.fromField(vectfield, Chalkboard.vect.init(i, j));
                    config.context.beginPath();
                    config.context.moveTo(i, j);
                    config.context.lineTo(i + v.x, j + v.y);
                    config.context.stroke();
                    data.push([i + v.x, j + v.y]);
                }
            }
            config.context.restore();
            return data;
        };

        /**
         * Plots the Fourier transform of an explicit function.
         * @param {ChalkboardFunction} func - The function
         * @param {object} config - The configuration options
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
            (config = {
                x: (config = config || {}).x || getContext().canvas.width / 2,
                y: config.y || getContext().canvas.height / 2,
                size: config.size || 1,
                strokeStyle: config.strokeStyle || "black",
                lineWidth: config.lineWidth || 2,
                domain: config.domain || [-10, 10],
                res: config.res || 25,
                context: config.context || getContext()
            }).size /= 100;
            const data = [];
            config.context.save();
            config.context.translate(config.x, config.y);
            config.context.lineWidth = config.lineWidth;
            config.context.strokeStyle = config.strokeStyle;
            config.context.beginPath();
            for (let i = config.domain[0] / config.size; i <= config.domain[1] / config.size; i += config.res) {
                config.context.lineTo(i, -Chalkboard.calc.Fourier(func, i * config.size) / config.size);
                data.push([i, Chalkboard.calc.Fourier(func, i)]);
            }
            config.context.stroke();
            config.context.restore();
            return data;
        };

        /**
         * Plots the antiderivative (or integral) of an explicit or inverse function.
         * @param {ChalkboardFunction} func - The function
         * @param {object} config - The configuration options
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
                context: CanvasRenderingContext2D;
            }
        ): number[][] => {
            (config = {
                x: (config = config || {}).x || getContext().canvas.width / 2,
                y: config.y || getContext().canvas.height / 2,
                size: config.size || 1,
                strokeStyle: config.strokeStyle || "black",
                lineWidth: config.lineWidth || 2,
                domain: config.domain || [-10, 10],
                res: config.res || 25,
                context: config.context || getContext()
            }).size /= 100;
            const data = [];
            config.context.save();
            config.context.translate(config.x, config.y);
            config.context.lineWidth = config.lineWidth;
            config.context.strokeStyle = config.strokeStyle;
            config.context.beginPath();
            for (let i = config.domain[0] / config.size; i <= config.domain[1] / config.size; i += config.res) {
                if (func.type === "expl") {
                    config.context.lineTo(i, -Chalkboard.calc.fxdx(func, 0, i * config.size) / config.size);
                    data.push([i, Chalkboard.calc.fxdx(func, 0, i) as number]);
                } else if (func.type === "inve") {
                    config.context.lineTo((Chalkboard.calc.fxdx(func, 0, i * config.size) as number) / config.size, -i);
                    data.push([Chalkboard.calc.fxdx(func, 0, i) as number, i]);
                }
            }
            config.context.stroke();
            config.context.restore();
            return data;
        };

        /**
         * Plots the Laplace transform of an explicit function.
         * @param {ChalkboardFunction} func - The function
         * @param {object} config - The configuration options
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
            (config = {
                x: (config = config || {}).x || getContext().canvas.width / 2,
                y: config.y || getContext().canvas.height / 2,
                size: config.size || 1,
                strokeStyle: config.strokeStyle || "black",
                lineWidth: config.lineWidth || 2,
                domain: config.domain || [-10, 10],
                res: config.res || 25,
                context: config.context || getContext()
            }).size /= 100;
            const data = [];
            config.context.save();
            config.context.translate(config.x, config.y);
            config.context.lineWidth = config.lineWidth;
            config.context.strokeStyle = config.strokeStyle;
            config.context.beginPath();
            if (config.domain[0] >= 0) {
                for (let i = config.domain[0] / config.size; i <= config.domain[1] / config.size; i += config.res) {
                    config.context.lineTo(i, -Chalkboard.calc.Laplace(func, i * config.size) / config.size);
                    data.push([i, Chalkboard.calc.Laplace(func, i)]);
                }
            } else {
                for (let i = 0; i <= config.domain[1] / config.size; i += config.res) {
                    config.context.lineTo(i, -Chalkboard.calc.Laplace(func, i * config.size) / config.size);
                    data.push([i, Chalkboard.calc.Laplace(func, i)]);
                }
            }
            config.context.stroke();
            config.context.restore();
            return data;
        };

        /**
         * Plots a line chart/plot/graph for an array of data with bins specified by another array.
         * @param arr
         * @param bins
         * @param {object} config - The configuration options
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
            (config = {
                x: (config = config || {}).x || getContext().canvas.width / 2,
                y: config.y || getContext().canvas.height / 2,
                size: config.size || 1,
                strokeStyle: config.strokeStyle || "black",
                lineWidth: config.lineWidth || 2,
                context: config.context || getContext()
            }).size /= 100;
            config.context.save();
            config.context.translate(config.x, config.y);
            config.context.lineWidth = config.lineWidth;
            config.context.strokeStyle = config.strokeStyle;
            const verts = [];
            for (let i = 0; i < bins.length; i++) {
                if (i === 0) {
                    verts.push(Chalkboard.stat.lt(arr, bins[0], true));
                } else if (i === bins.length) {
                    verts.push(Chalkboard.stat.gt(arr, bins[bins.length - 1], true));
                } else {
                    verts.push(Chalkboard.stat.ineq(arr, bins[i - 1], bins[i], false, true));
                }
            }
            const counts = [];
            for (let i = 0; i < verts.length; i++) {
                counts.push(verts[i].length);
            }
            config.context.beginPath();
            for (let i = 0; i < counts.length; i++) {
                config.context.lineTo(i / config.size, -counts[i] / config.size);
            }
            config.context.stroke();
            config.context.restore();
            return verts;
        };

        /**
         * Plots a 2x2 matrix.
         * @param matr
         * @param {object} config - The configuration options
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
            (config = {
                x: (config = config || {}).x || getContext().canvas.width / 2,
                y: config.y || getContext().canvas.height / 2,
                size: config.size || 1,
                strokeStyle: config.strokeStyle || "black",
                lineWidth: config.lineWidth || 2,
                domain: config.domain || [-10, 10],
                context: config.context || getContext()
            }).size /= 100;
            for (let i = config.domain[0]; i <= config.domain[1]; i++) {
                Chalkboard.plot.vect(Chalkboard.vect.init(matr[0][0], matr[1][0]), {
                    x: config.x,
                    y: config.y + (i / config.size) * matr[1][1],
                    size: config.size,
                    strokeStyle: config.strokeStyle,
                    lineWidth: config.lineWidth / 4,
                    context: config.context
                });
                Chalkboard.plot.vect(Chalkboard.vect.init(-matr[0][0], -matr[1][0]), {
                    x: config.x,
                    y: config.y + (i / config.size) * matr[1][1],
                    size: config.size,
                    strokeStyle: config.strokeStyle,
                    lineWidth: config.lineWidth / 4,
                    context: config.context
                });
                Chalkboard.plot.vect(Chalkboard.vect.init(matr[0][1], matr[1][1]), {
                    x: config.x + (i / config.size) * matr[0][0],
                    y: config.y,
                    size: config.size,
                    strokeStyle: config.strokeStyle,
                    lineWidth: config.lineWidth / 4,
                    context: config.context
                });
                Chalkboard.plot.vect(Chalkboard.vect.init(-matr[0][1], -matr[1][1]), {
                    x: config.x + (i / config.size) * matr[0][0],
                    y: config.y,
                    size: config.size,
                    strokeStyle: config.strokeStyle,
                    lineWidth: config.lineWidth / 4,
                    context: config.context
                });
            }
            Chalkboard.plot.vect(Chalkboard.vect.init(matr[0][0], matr[1][0]), config);
            Chalkboard.plot.vect(Chalkboard.vect.init(-matr[0][0], -matr[1][0]), config);
            Chalkboard.plot.vect(Chalkboard.vect.init(matr[0][1], matr[1][1]), config);
            Chalkboard.plot.vect(Chalkboard.vect.init(-matr[0][1], -matr[1][1]), config);
            return matr;
        };

        /**
         * Plots the polar coordinate plane.
         * @param {object} config - The configuration options
         * @returns {void}
         */
        export const rOplane = (config: {
            x: number; //
            y: number; //
            size: number; //
            strokeStyle: string; //
            lineWidth: number; //
            context: CanvasRenderingContext2D; //
        }): void => {
            (config = {
                x: (config = config || {}).x || getContext().canvas.width / 2,
                y: config.y || getContext().canvas.height / 2,
                size: config.size || 1,
                strokeStyle: config.strokeStyle || "black",
                lineWidth: config.lineWidth || 2,
                context: config.context || getContext()
            }).size /= 100;
            const cw = getContext().canvas.width;
            config.context.save();
            config.context.translate(config.x, config.y);
            config.context.strokeStyle = config.strokeStyle;
            config.context.lineWidth = config.lineWidth / 4;
            config.context.beginPath();
            for (let i = 0; i <= (config.size * cw) / 2; i++) {
                config.context.ellipse(0, 0, i / config.size, i / config.size, 0, 0, Chalkboard.PI(2));
            }
            config.context.stroke();
            config.context.lineWidth = config.lineWidth;
            config.context.beginPath();
            config.context.moveTo(-config.x, 0);
            config.context.lineTo(cw - config.x, 0);
            config.context.stroke();
            config.context.beginPath();
            config.context.moveTo(0, -config.y);
            config.context.lineTo(0, cw - config.y);
            config.context.stroke();
            config.context.restore();
        };

        /**
         * Plots a scatter plot of two arrays of data.
         * @param arr1
         * @param arr2
         * @param {object} config - The configuration options
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
            (config = {
                x: (config = config || {}).x || getContext().canvas.width / 2,
                y: config.y || getContext().canvas.height / 2,
                size: config.size || 1,
                fillStyle: config.fillStyle || "black",
                lineWidth: config.lineWidth || 5,
                context: config.context || getContext()
            }).size /= 100;
            const data = [];
            config.context.save();
            config.context.translate(config.x, config.y);
            config.context.fillStyle = config.fillStyle;
            if (arr1.length === arr2.length) {
                for (let i = 0; i < arr1.length; i++) {
                    config.context.beginPath();
                    config.context.ellipse(
                        arr1[i] / config.size - arr1.length / (2 * config.size),
                        -arr2[i] / config.size + arr1.length / (2 * config.size),
                        config.lineWidth,
                        config.lineWidth,
                        0,
                        0,
                        Chalkboard.PI(2)
                    );
                    config.context.fill();
                    data.push([arr1[i], arr2[i]]);
                }
            }
            config.context.restore();
            return data;
        };

        /**
         * Plots the nth-degree Taylor series approximation for an explicit function.
         * @param {ChalkboardFunction} func - The function
         * @param n
         * @param a
         * @param {object} config - The configuration options
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
            (config = {
                x: (config = config || {}).x || getContext().canvas.width / 2,
                y: config.y || getContext().canvas.height / 2,
                size: config.size || 1,
                strokeStyle: config.strokeStyle || "black",
                lineWidth: config.lineWidth || 2,
                domain: config.domain || [-10, 10],
                res: config.res || 25,
                context: config.context || getContext()
            }).size /= 100;
            const data = [];
            config.context.save();
            config.context.translate(config.x, config.y);
            config.context.lineWidth = config.lineWidth;
            config.context.strokeStyle = config.strokeStyle;
            config.context.beginPath();
            for (let i = config.domain[0] / config.size; i <= config.domain[1] / config.size; i += config.res) {
                config.context.lineTo(i, -Chalkboard.calc.Taylor(func, i * config.size, n, a) / config.size);
                data.push([i, Chalkboard.calc.Taylor(func, i, n, a)]);
            }
            config.context.stroke();
            config.context.restore();
            return data;
        };

        /**
         * Plots a 2D vector.
         * @param vect
         * @param {object} config - The configuration options
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
            (config = {
                x: (config = config || {}).x || getContext().canvas.width / 2,
                y: config.y || getContext().canvas.height / 2,
                size: config.size || 1,
                strokeStyle: config.strokeStyle || "black",
                lineWidth: config.lineWidth || 5,
                context: config.context || getContext()
            }).size /= 100;
            config.context.strokeStyle = config.strokeStyle;
            config.context.lineWidth = config.lineWidth;
            config.context.save();
            config.context.translate(config.x, config.y);
            config.context.beginPath();
            config.context.moveTo(0, 0);
            config.context.lineTo(vect.x / config.size, -vect.y / config.size);
            config.context.stroke();
            config.context.restore();
            return [[vect.x], [vect.y]];
        };

        /**
         * Plots the Cartesian coordinate plane.
         * @param {object} config - The configuration options
         * @returns {void}
         */
        export const xyplane = (config: {
            x: number; //
            y: number; //
            size: number; //
            strokeStyle: string; //
            lineWidth: number; //
            context: CanvasRenderingContext2D; //
        }): void => {
            (config = {
                x: (config = config || {}).x || getContext().canvas.width / 2,
                y: config.y || getContext().canvas.height / 2,
                size: config.size || 1,
                strokeStyle: config.strokeStyle || "black",
                lineWidth: config.lineWidth || 2,
                context: config.context || getContext()
            }).size /= 100;
            const cw = getContext().canvas.width;
            config.context.save();
            config.context.translate(config.x, config.y);
            config.context.strokeStyle = config.strokeStyle;
            config.context.lineWidth = config.lineWidth / 4;
            config.context.beginPath();
            for (let i = Math.floor(-config.x / config.size); i <= (cw - config.x) / config.size; i++) {
                config.context.moveTo(i / config.size, -config.y);
                config.context.lineTo(i / config.size, cw - config.y);
            }
            config.context.stroke();
            config.context.beginPath();
            for (let i = Math.floor(-config.y / config.size); i <= (cw - config.y) / config.size; i++) {
                config.context.moveTo(-config.x, i / config.size);
                config.context.lineTo(cw - config.x, i / config.size);
            }
            config.context.stroke();
            config.context.lineWidth = config.lineWidth;
            config.context.beginPath();
            config.context.moveTo(-config.x, 0);
            config.context.lineTo(cw - config.x, 0);
            config.context.stroke();
            config.context.beginPath();
            config.context.moveTo(0, -config.y);
            config.context.lineTo(0, cw - config.y);
            config.context.stroke();
            config.context.restore();
        };
    }
}
