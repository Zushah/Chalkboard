/*
    The Chalkboard Library - Real Numbers Namespace
    Version 2.4.0 Noether
*/
/// <reference path="Chalkboard.ts"/>
namespace Chalkboard {
    /**
     * The real numbers namespace.
     * @namespace
     */
    export namespace real {
        /**
         * Calculates the absolute value of a function.
         * @param {ChalkboardFunction} func - The function
         * @returns {ChalkboardFunction}
         */
        export const absolute = (func: ChalkboardFunction): ChalkboardFunction => {
            if (func.field !== "real") {
                throw new TypeError('Chalkboard.real.absolute: Property "field" of "func" must be "real".');
            }
            if (func.type.startsWith("scalar")) {
                const f = func.rule as ((...x: number[]) => number);
                const g = (...x: number[]) => Math.abs(f(...x));
                return Chalkboard.real.define(g, func.type);
            } else if (func.type.startsWith("vector")) {
                const f = func.rule as ((...x: number[]) => number)[];
                const g = [];
                for (let i = 0; i < f.length; i++) {
                    g.push((...x: number[]) => Math.abs(f[i](...x)));
                }
                return Chalkboard.real.define(g, func.type);
            } else if (func.type.startsWith("curve")) {
                const f = func.rule as ((t: number) => number)[];
                const g = [];
                for (let i = 0; i < f.length; i++) {
                    g.push((t: number) => Math.abs(f[i](t)));
                }
                return Chalkboard.real.define(g, func.type);
            } else if (func.type.startsWith("surface")) {
                const f = func.rule as ((s: number, t: number) => number)[];
                const g = [];
                for (let i = 0; i < f.length; i++) {
                    g.push((s: number, t: number) => Math.abs(f[i](s, t)));
                }
                return Chalkboard.real.define(g, func.type);
            }
            throw new TypeError('Chalkboard.real.absolute: Property "type" of "func" is not supported.');
        };

        /**
         * Calculates the addition of two functions.
         * @param {ChalkboardFunction} func1 - The first function
         * @param {ChalkboardFunction} func2 - The second function
         * @returns {ChalkboardFunction}
         */
        export const add = (func1: ChalkboardFunction, func2: ChalkboardFunction): ChalkboardFunction => {
            if (func1.field !== "real" || func2.field !== "real") {
                throw new TypeError('Chalkboard.real.add: Properties "field" of "func1" and "func2" must be "real".');
            }
            if (func1.type !== func2.type) {
                throw new TypeError('Chalkboard.real.add: Properties "type" of "func1" and "func2" must be the same.');
            }
            if (func1.type.startsWith("scalar")) {
                const f1 = func1.rule as ((...x: number[]) => number);
                const f2 = func2.rule as ((...x: number[]) => number);
                const g = (...x: number[]) => f1(...x) + f2(...x);
                return Chalkboard.real.define(g, func1.type);
            } else if (func1.type.startsWith("vector")) {
                const f1 = func1.rule as ((...x: number[]) => number)[];
                const f2 = func2.rule as ((...x: number[]) => number)[];
                const g = [];
                for (let i = 0; i < f1.length; i++) {
                    g.push((...x: number[]) => f1[i](...x) + f2[i](...x));
                }
                return Chalkboard.real.define(g, func1.type);
            } else if (func1.type.startsWith("curve")) {
                const f1 = func1.rule as ((t: number) => number)[];
                const f2 = func2.rule as ((t: number) => number)[];
                const g = [];
                for (let i = 0; i < f1.length; i++) {
                    g.push((t: number) => f1[i](t) + f2[i](t));
                }
                return Chalkboard.real.define(g, func1.type);
            } else if (func1.type.startsWith("surface")) {
                const f1 = func1.rule as ((s: number, t: number) => number)[];
                const f2 = func2.rule as ((s: number, t: number) => number)[];
                const g = [];
                for (let i = 0; i < f1.length; i++) {
                    g.push((s: number, t: number) => f1[i](s, t) + f2[i](s, t));
                }
                return Chalkboard.real.define(g, func1.type);
            }
            throw new TypeError('Chalkboard.real.add: Properties "type" of "func1" and "func2" are not supported.');
        };

        /**
         * Calculates the composition of two functions.
         * @param {ChalkboardFunction} func1 - The outer function
         * @param {ChalkboardFunction} func2 - The inner function
         * @returns {ChalkboardFunction}
         */
        export const compose = (func1: ChalkboardFunction, func2: ChalkboardFunction): ChalkboardFunction => {
            if (func1.field !== "real" || func2.field !== "real") {
                throw new TypeError('Chalkboard.real.compose: Properties "field" of "func1" and "func2" must be "real".');
            }
            if (func1.type !== func2.type) {
                throw new TypeError('Chalkboard.real.compose: Properties "type" of "func1" and "func2" must be the same.');
            }
            if (func1.type.startsWith("scalar")) {
                const f1 = func1.rule as ((...x: number[]) => number);
                const f2 = func2.rule as ((...x: number[]) => number);
                const g = (...x: number[]) => f1(f2(...x));
                return Chalkboard.real.define(g, func1.type);
            } else if (func1.type.startsWith("vector")) {
                const f1 = func1.rule as ((...x: number[]) => number)[];
                const f2 = func2.rule as ((...x: number[]) => number)[];
                const g = [];
                for (let i = 0; i < f1.length; i++) {
                    g.push((...x: number[]) => f1[i](f2[i](...x)));
                }
                return Chalkboard.real.define(g, func1.type);
            }
            throw new TypeError('Chalkboard.real.compose: Properties "type" of "func1" and "func2" are not supported.');
        };

        /**
         * Defines a mathematical function in the field of real numbers.
         * @param {Function | Function[]} rule - The rule(s) of the function
         * @param {"scalar2d" | "scalar3d" | "scalar4d" | "vector2d" | "vector3d" | "vector4d" | "curve2d" | "curve3d" | "curve4d" | "surface3d"} [type="scalar2d"] - The type of the function (optional, automatically configured if not explicitly provided)
         * @returns {ChalkboardFunction}
         */
        export const define = (
            rule: ((...x: number[]) => number) | (((...x: number[]) => number)[]),
            type: "scalar2d" | "scalar3d" | "scalar4d" | "vector2d" | "vector3d" | "vector4d" | "curve2d" | "curve3d" | "curve4d" | "surface3d" = "scalar2d"
        ): ChalkboardFunction => {
            if (!type) {
                if (Array.isArray(rule)) {
                    const f = rule[0];
                    if (rule.length === 2) {
                        if (f.length === 1) {
                            type = "curve2d";
                        } else if (f.length === 2) {
                            type = "vector2d";
                        } else {
                            throw new Error("The function must have one variable to define a parametric curve or two variables to define a vector field.");
                        }
                    } else if (rule.length === 3) {
                        if (f.length === 1) {
                            type = "curve3d";
                        } else if (f.length === 2) {
                            type = "surface3d";
                        } else if (f.length === 3) {
                            type = "vector3d";
                        } else {
                            throw new Error("The function must have one variable to define a parametric curve, two variables to define a parametric surface, or three variables to define a vector field.");
                        }
                    } else if (rule.length === 4) {
                        if (f.length === 1) {
                            type = "curve4d";
                        } else if (f.length === 4) {
                            type = "vector4d";
                        } else {
                            throw new Error("The function must have one variable to define a parametric curve or four variables to define a vector field.");
                        }
                    }
                } else {
                    const f = rule as (...x: number[]) => number;
                    if (f.length === 1) {
                        type = "scalar2d";
                    } else if (f.length === 2) {
                        type = "scalar3d";
                    } else if (f.length === 3) {
                        type = "scalar4d";
                    } else {
                        throw new Error("The function must have one, two, or three variables to define a scalar function.");
                    }
                }
            }
            type = type || "scalar2d";
            return { rule, field: "real", type } as ChalkboardFunction;
        };

        /**
         * Evaluates the Dirac delta function on a number.
         * @param {number} num - The number
         * @param {number} [edge=0] - The edge of the function
         * @param {number} [scl=1] - The scale of the function
         * @returns {number}
         */
        export const Dirac = (num: number, edge: number = 0, scl: number = 1): number => {
            if (num === edge) {
                return scl;
            } else {
                return 0;
            }
        };

        /**
         * Calculates the discriminant of a quadratic polynomial given its coefficients and form.
         * @param {number} a - The leading coefficient
         * @param {number} b - The middle coefficient
         * @param {number} c - The last coefficient (the constant)
         * @param {"stan" | "vert"} [form="stan"] - The form of the polynomial, which can be "stan" for standard form or "vert" for vertex form
         * @returns {number}
         */
        export const discriminant = (a: number, b: number, c: number, form: "stan" | "vert" = "stan"): number => {
            if (form === "stan") {
                return b * b - 4 * a * c;
            } else if (form === "vert") {
                return 2 * a * b * (2 * a * b) - 4 * a * c;
            } else {
                throw new TypeError('Parameter "form" must be "stan" or "vert".');
            }
        };

        /**
         * Calculates the division of two functions
         * @param {ChalkboardFunction} func1 - The numerator function
         * @param {ChalkboardFunction} func2 - The denominator function
         * @returns {ChalkboardFunction}
         */
        export const div = (func1: ChalkboardFunction, func2: ChalkboardFunction): ChalkboardFunction => {
            if (func1.field !== "real" || func2.field !== "real") {
                throw new TypeError('Chalkboard.real.div: Properties "field" of "func1" and "func2" must be "real".');
            }
            if (func1.type !== func2.type) {
                throw new TypeError('Chalkboard.real.div: Properties "type" of "func1" and "func2" must be the same.');
            }
            if (func1.type.startsWith("scalar")) {
                const f1 = func1.rule as ((...x: number[]) => number);
                const f2 = func2.rule as ((...x: number[]) => number);
                const g = (...x: number[]) => f1(...x) / f2(...x);
                return Chalkboard.real.define(g, func1.type);
            } else if (func1.type.startsWith("vector")) {
                const f1 = func1.rule as ((...x: number[]) => number)[];
                const f2 = func2.rule as ((...x: number[]) => number)[];
                const g = [];
                for (let i = 0; i < f1.length; i++) {
                    g.push((...x: number[]) => f1[i](...x) / f2[i](...x));
                }
                return Chalkboard.real.define(g, func1.type);
            } else if (func1.type.startsWith("curve")) {
                const f1 = func1.rule as ((t: number) => number)[];
                const f2 = func2.rule as ((t: number) => number)[];
                const g = [];
                for (let i = 0; i < f1.length; i++) {
                    g.push((t: number) => f1[i](t) / f2[i](t));
                }
                return Chalkboard.real.define(g, func1.type);
            } else if (func1.type.startsWith("surface")) {
                const f1 = func1.rule as ((s: number, t: number) => number)[];
                const f2 = func2.rule as ((s: number, t: number) => number)[];
                const g = [];
                for (let i = 0; i < f1.length; i++) {
                    g.push((s: number, t: number) => f1[i](s, t) / f2[i](s, t));
                }
                return Chalkboard.real.define(g, func1.type);
            }
            throw new TypeError('Chalkboard.real.div: Properties "type" of "func1" and "func2" are not supported.');
        };

        /**
         * Evaluates the Heaviside step function on a number.
         * @param {number} num - The number
         * @param {number} edge - The edge of the function
         * @param {number} scl - The scale of the function
         * @returns {number}
         */
        export const Heaviside = (num: number, edge: number = 0, scl: number = 1): number => {
            if (num >= edge) {
                return scl;
            } else {
                return 0;
            }
        };

        /**
         * Calculates the linear interpolation between a point and a variable.
         * @param {number} p - The point
         * @param {number} t - The variable
         * @returns {number}
         */
        export const lerp = (p: [number, number], t: number): number => {
            return (p[1] - p[0]) * t + p[0];
        };

        /**
         * Defines a linear function with two points.
         * @param {number} x1 - The x-coordinate of the first point
         * @param {number} y1 - The y-coordinate of the first point
         * @param {number} x2 - The x-coordinate of the second point
         * @param {number} y2 - The y-coordinate of the second point
         * @returns {ChalkboardFunction}
         */
        export const linear = (x1: number, y1: number, x2: number, y2: number): ChalkboardFunction => {
            return Chalkboard.real.define((x: number) => Chalkboard.real.slope(x1, y1, x2, y2) * (x - x2) + y2);
        };

        /**
         * Solves a linear equation.
         * @param {number} a - The slope (in slope-intercept form)
         * @param {number} b - The y-intercept (in slope-intercept form)
         * @param {number} [c] - The y-intercept (in standard form)
         * @param {number} [d] - The y-coordinate of the second point (in point-slope form)
         * @returns {number}
         */
        export const linearFormula = (a: number, b: number, c?: number, d?: number): number => {
            if (typeof c === "undefined" && typeof d === "undefined") {
                return -b / a;
            } else if (typeof c === "number" && typeof d === "undefined") {
                return c / a;
            } else {
                return -b / Chalkboard.real.slope(a, b, c as number, d as number) + a;
            }
        };

        /**
         * Calculates the natural logarithm of a number.
         * @param {number} num - The number
         * @returns {number}
         */
        export const ln = (num: number): number => {
            return Chalkboard.calc.fxdx(Chalkboard.real.define((x: number) => 1 / x), 1, num) as number;
        };

        /**
         * Calculates the logarithm of a number with a particular base.
         * @param {number} base - The base
         * @param {number} num - The number
         * @returns {number}
         */
        export const log = (base: number, num: number): number => {
            return Chalkboard.real.ln(num) / Chalkboard.real.ln(base);
        };

        /**
         * Calculates the logarithm of a number with base 10.
         * @param {number} num - The number
         * @returns {number}
         */
        export const log10 = (num: number): number => {
            return Chalkboard.real.log(10, num);
        };

        /**
         * Calculates the multiplication of two functions.
         * @param {ChalkboardFunction} func1 - The first function
         * @param {ChalkboardFunction} func2 - The second function
         * @returns {ChalkboardFunction}
         */
        export const mul = (func1: ChalkboardFunction, func2: ChalkboardFunction): ChalkboardFunction => {
            if (func1.field !== "real" || func2.field !== "real") {
                throw new TypeError('Chalkboard.real.mul: Properties "field" of "func1" and "func2" must be "real".');
            }
            if (func1.type !== func2.type) {
                throw new TypeError('Chalkboard.real.mul: Properties "type" of "func1" and "func2" must be the same.');
            }
            if (func1.type.startsWith("scalar")) {
                const f1 = func1.rule as ((...x: number[]) => number);
                const f2 = func2.rule as ((...x: number[]) => number);
                const g = (...x: number[]) => f1(...x) * f2(...x);
                return Chalkboard.real.define(g, func1.type);
            } else if (func1.type.startsWith("vector")) {
                const f1 = func1.rule as ((...x: number[]) => number)[];
                const f2 = func2.rule as ((...x: number[]) => number)[];
                const g = [];
                for (let i = 0; i < f1.length; i++) {
                    g.push((...x: number[]) => f1[i](...x) * f2[i](...x));
                }
                return Chalkboard.real.define(g, func1.type);
            } else if (func1.type.startsWith("curve")) {
                const f1 = func1.rule as ((t: number) => number)[];
                const f2 = func2.rule as ((t: number) => number)[];
                const g = [];
                for (let i = 0; i < f1.length; i++) {
                    g.push((t: number) => f1[i](t) * f2[i](t));
                }
                return Chalkboard.real.define(g, func1.type);
            } else if (func1.type.startsWith("surface")) {
                const f1 = func1.rule as ((s: number, t: number) => number)[];
                const f2 = func2.rule as ((s: number, t: number) => number)[];
                const g = [];
                for (let i = 0; i < f1.length; i++) {
                    g.push((s: number, t: number) => f1[i](s, t) * f2[i](s, t));
                }
                return Chalkboard.real.define(g, func1.type);
            }
            throw new TypeError('Chalkboard.real.mul: Properties "type" of "func1" and "func2" are not supported.');
        };

        /**
         * Calculates the negation of a function.
         * @param {ChalkboardFunction} func - The function
         * @returns {ChalkboardFunction}
         */
        export const negate = (func: ChalkboardFunction): ChalkboardFunction => {
            return Chalkboard.real.scl(func, -1);
        };

        /**
         * Parses a string of JavaScript code.
         * @param {string} str - The string
         * @returns {Function}
         */
        export const parse = (str: string): Function => {
            return Function('"use strict"; ' + Chalkboard.PARSEPREFIX + " return (" + str + ")")();
        };

        /**
         * Evaluates the ping-pong function at a number.
         * @param {number} num - The number
         * @param {number} edge - The edge of the function
         * @param {number} scl - The scale of the function
         * @returns {number}
         */
        export const pingpong = (num: number, edge: number = 0, scl: number = 1): number => {
            if ((num + edge) % (2 * scl) < scl) {
                return (num + edge) % scl;
            } else {
                return scl - ((num + edge) % scl);
            }
        };

        /**
         * Defines a polynomial function by its coefficients.
         * @param {...number[]} coeffs - The coefficients of the polynomial, starting with the leading coefficient and ending with the constant term, which can be written either in an array or as separate arguments
         * @returns {ChalkboardFunction}
         */
        export const polynomial = (...coeffs: number[]): ChalkboardFunction => {
            let arr: number[];
            if (coeffs.length === 1 && Array.isArray(coeffs[0])) {
                arr = coeffs[0];
            } else {
                arr = coeffs;
            }
            while (arr.length > 1 && arr[0] === 0) {
                arr.shift();
            }
            const f = (x: number): number => {
                if (arr.length === 0) return 0;
                let result = arr[0];
                for (let i = 1; i < arr.length; i++) {
                    result = result * x + arr[i];
                }
                return result;
            };
            return Chalkboard.real.define(f);
        };

        /**
         * Calculates the exponentiation of a number or a function to the power of a number.
         * @param {number | ChalkboardFunction} base - The number or function
         * @param {number} num - The power
         * @returns {number | ChalkboardFunction}
         */
        export const pow = (base: number | ChalkboardFunction, num: number): number | ChalkboardFunction => {
            if (typeof base === "number") {
                if (base === 0 && num === 0) {
                    return 1;
                } else {
                    return Math.exp(num * Math.log(base));
                }
            } else {
                const func = base;
                if (func.field !== "real") {
                    throw new TypeError('Chalkboard.real.pow: Property "field" of "func" must be "real".');
                }
                if (func.type.startsWith("scalar")) {
                    const f = func.rule as ((...x: number[]) => number);
                    const g = (...x: number[]) => f(...x) ** num;
                    return Chalkboard.real.define(g, func.type);
                } else if (func.type.startsWith("vector")) {
                    const f = func.rule as ((...x: number[]) => number)[];
                    const g = [];
                    for (let i = 0; i < f.length; i++) {
                        g.push((...x: number[]) => f[i](...x) ** num);
                    }
                    return Chalkboard.real.define(g, func.type);
                } else if (func.type.startsWith("curve")) {
                    const f = func.rule as ((t: number) => number)[];
                    const g = [];
                    for (let i = 0; i < f.length; i++) {
                        g.push((t: number) => f[i](t) ** num);
                    }
                    return Chalkboard.real.define(g, func.type);
                } else if (func.type.startsWith("surface")) {
                    const f = func.rule as ((s: number, t: number) => number)[];
                    const g = [];
                    for (let i = 0; i < f.length; i++) {
                        g.push((s: number, t: number) => f[i](s, t) ** num);
                    }
                    return Chalkboard.real.define(g, func.type);
                }
                throw new TypeError('Chalkboard.real.pow: Property "type" of "func" is not supported.');
            }
        };

        /**
         * Calculates the quadratic interpolation between three points.
         * @param {number[]} p1 - The first point
         * @param {number[]} p2 - The second point
         * @param {number[]} p3 - The third point
         * @param {number} t - The variable
         * @returns {number}
         */
        export const qerp = (p1: [number, number], p2: [number, number], p3: [number, number], t: number): number => {
            const a = p1[1] / ((p1[0] - p2[0]) * (p1[0] - p3[0])) + p2[1] / ((p2[0] - p1[0]) * (p2[0] - p3[0])) + p3[1] / ((p3[0] - p1[0]) * (p3[0] - p2[0]));
            const b =
                (-p1[1] * (p2[0] + p3[0])) / ((p1[0] - p2[0]) * (p1[0] - p3[0])) -
                (p2[1] * (p1[0] + p3[0])) / ((p2[0] - p1[0]) * (p2[0] - p3[0])) -
                (p3[1] * (p1[0] + p2[0])) / ((p3[0] - p1[0]) * (p3[0] - p2[0]));
            const c =
                (p1[1] * p2[0] * p3[0]) / ((p1[0] - p2[0]) * (p1[0] - p3[0])) +
                (p2[1] * p1[0] * p3[0]) / ((p2[0] - p1[0]) * (p2[0] - p3[0])) +
                (p3[1] * p1[0] * p2[0]) / ((p3[0] - p1[0]) * (p3[0] - p2[0]));
            return a * t * t + b * t + c;
        };

        /**
         * Defines a quadratic function.
         * @param {number} a - The leading coefficient
         * @param {number} b - The middle coefficient
         * @param {number} c - The last coefficient (the constant)
         * @param {"stan" | "vert"} [form="stan"] - The form of the polynomial, which can be "stan" for standard form or "vert" for vertex form
         * @returns {ChalkboardFunction}
         */
        export const quadratic = (a: number, b: number, c: number, form: "stan" | "vert" = "stan"): ChalkboardFunction => {
            if (form === "stan") {
                return Chalkboard.real.define((x: number) => a * x * x + b * x + c);
            } else if (form === "vert") {
                return Chalkboard.real.define((x: number) => a * (x - b) * (x - b) + c);
            } else {
                throw new TypeError('Parameter "form" must be "stan" or "vert".');
            }
        };

        /**
         * Solves a quadratic equation.
         * @param {number} a - The leading coefficient
         * @param {number} b - The middle coefficient
         * @param {number} c - The last coefficient (the constant)
         * @param {"stan" | "vert"} [form="stan"] - The form of the polynomial, which can be "stan" for standard form or "vert" for vertex form
         * @returns {number[]}
         */
        export const quadraticFormula = (a: number, b: number, c: number, form: "stan" | "vert" = "stan"): [number, number] => {
            if (form === "stan") {
                return [(-b + Chalkboard.real.sqrt(Chalkboard.real.discriminant(a, b, c, "stan"))) / (2 * a), (-b - Math.sqrt(Chalkboard.real.discriminant(a, b, c, "stan"))) / (2 * a)];
            } else if (form === "vert") {
                return [b + Chalkboard.real.sqrt(-c / a), b - Chalkboard.real.sqrt(-c / a)];
            } else {
                throw new TypeError('Parameter "form" must be "stan" or "vert".');
            }
        };

        /**
         * Evaluates the ramp function at a number.
         * @param {number} num - The number
         * @param {number} edge - The edge of the function
         * @param {number} scl - The scale of the function
         * @returns {number}
         */
        export const ramp = (num: number, edge: number = 0, scl: number = 1): number => {
            if (num >= edge) {
                return num * scl;
            } else {
                return 0;
            }
        };

        /**
         * Defines a polynomial with random coefficients.
         * @param {number} degree - The degree of the polynomial
         * @param {number} [inf=0] - The lower bound of the coefficients (optional, defaults to 0)
         * @param {number} [sup=1] - The upper bound of the coefficients (optional, defaults to 1)
         * @returns {ChalkboardFunction}
         */
        export const randomPolynomial = (degree: number, inf: number = 0, sup: number = 1): ChalkboardFunction => {
            return Chalkboard.real.polynomial(...Chalkboard.stat.random(degree + 1, inf, sup));
        };

        /**
         * Calculates the reciprocation of a function.
         * @param {ChalkboardFunction} func - The function
         * @returns {ChalkboardFunction}
         */
        export const reciprocate = (func: ChalkboardFunction): ChalkboardFunction => {
            if (func.field !== "real") {
                throw new TypeError('Chalkboard.real.reciprocate: Property "field" of "func" must be "real".');
            }
            if (func.type.startsWith("scalar")) {
                const f = func.rule as ((...x: number[]) => number);
                const g = (...x: number[]) => 1 / f(...x);
                return Chalkboard.real.define(g, func.type);
            } else if (func.type.startsWith("vector")) {
                const f = func.rule as ((...x: number[]) => number)[];
                const g = [];
                for (let i = 0; i < f.length; i++) {
                    g.push((...x: number[]) => 1 / f[i](...x));
                }
                return Chalkboard.real.define(g, func.type);
            } else if (func.type.startsWith("curve")) {
                const f = func.rule as ((t: number) => number)[];
                const g = [];
                for (let i = 0; i < f.length; i++) {
                    g.push((t: number) => 1 / f[i](t));
                }
                return Chalkboard.real.define(g, func.type);
            } else if (func.type.startsWith("surface")) {
                const f = func.rule as ((s: number, t: number) => number)[];
                const g = [];
                for (let i = 0; i < f.length; i++) {
                    g.push((s: number, t: number) => 1 / f[i](s, t));
                }
                return Chalkboard.real.define(g, func.type);
            }
            throw new TypeError('Chalkboard.real.reciprocate: Property "type" of "func" is not supported.');
        };

        /**
         * Evaluates the rect function at a number.
         * @param {number} num the number
         * @param {number} center - The position of the function
         * @param {number} width - The width of the function
         * @param {number} scl - The scale of the function
         * @returns {number}
         */
        export const rect = (num: number, center: number = 0, width: number = 2, scl: number = 1): number => {
            if (num > center + width / 2 || num < center - width / 2) {
                return 0;
            } else {
                return scl;
            }
        };

        /**
         * Calculates the nth-root of a number.
         * @param {number} num - The number
         * @param {number} index - The index to root by
         * @returns {number}
         */
        export const root = (num: number, index: number = 3): number => {
            return Math.exp(Math.log(num) / index);
        };

        /**
         * Calculates the scalar multiplication of a function.
         * @param {ChalkboardFunction} func - The function
         * @param {number} num - The scalar
         * @returns {ChalkboardFunction}
         */
        export const scl = (func: ChalkboardFunction, num: number): ChalkboardFunction => {
            if (func.field !== "real") {
                throw new TypeError('Chalkboard.real.scl: Property "field" of "func" must be "real".');
            }
            if (func.type.startsWith("scalar")) {
                const f = func.rule as ((...x: number[]) => number);
                const g = (...x: number[]) => f(...x) * num;
                return Chalkboard.real.define(g, func.type);
            } else if (func.type.startsWith("vector")) {
                const f = func.rule as ((...x: number[]) => number)[];
                const g = [];
                for (let i = 0; i < f.length; i++) {
                    g.push((...x: number[]) => f[i](...x) * num);
                }
                return Chalkboard.real.define(g, func.type);
            } else if (func.type.startsWith("curve")) {
                const f = func.rule as ((t: number) => number)[];
                const g = [];
                for (let i = 0; i < f.length; i++) {
                    g.push((t: number) => f[i](t) * num);
                }
                return Chalkboard.real.define(g, func.type);
            } else if (func.type.startsWith("surface")) {
                const f = func.rule as ((s: number, t: number) => number)[];
                const g = [];
                for (let i = 0; i < f.length; i++) {
                    g.push((s: number, t: number) => f[i](s, t) * num);
                }
                return Chalkboard.real.define(g, func.type);
            }
            throw new TypeError('Chalkboard.real.scl: Property "type" of "func" is not supported.');
        };

        /**
         * Calculates the slope of two points.
         * @param {number} x1 - The x-coordinate of the first point
         * @param {number} y1 - The y-coordinate of the first point
         * @param {number} x2 - The x-coordinate of the first point
         * @param {number} y2 - The y-coordinate of the second point
         * @returns {number}
         */
        export const slope = (x1: number, y1: number, x2: number, y2: number): number => {
            return (y2 - y1) / (x2 - x1);
        };

        /**
         * Calculates the square root of a number.
         * @param {number} num - The number
         * @returns {number}
         */
        export const sqrt = (num: number): number => {
            if (num >= 0) {
                return Math.exp(Math.log(num) / 2);
            } else {
                return NaN;
            }
        };

        /**
         * Calculates the subtraction of two functions.
         * @param {ChalkboardFunction} func1 - The first function
         * @param {ChalkboardFunction} func2 - The second function
         * @returns {ChalkboardFunction}
         */
        export const sub = (func1: ChalkboardFunction, func2: ChalkboardFunction): ChalkboardFunction => {
            if (func1.field !== "real" || func2.field !== "real") {
                throw new TypeError('Chalkboard.real.sub: Properties "field" of "func1" and "func2" must be "real".');
            }
            if (func1.type !== func2.type) {
                throw new TypeError('Chalkboard.real.sub: Properties "type" of "func1" and "func2" must be the same.');
            }
            if (func1.type.startsWith("scalar")) {
                const f1 = func1.rule as ((...x: number[]) => number);
                const f2 = func2.rule as ((...x: number[]) => number);
                const g = (...x: number[]) => f1(...x) - f2(...x);
                return Chalkboard.real.define(g, func1.type);
            } else if (func1.type.startsWith("vector")) {
                const f1 = func1.rule as ((...x: number[]) => number)[];
                const f2 = func2.rule as ((...x: number[]) => number)[];
                const g = [];
                for (let i = 0; i < f1.length; i++) {
                    g.push((...x: number[]) => f1[i](...x) - f2[i](...x));
                }
                return Chalkboard.real.define(g, func1.type);
            } else if (func1.type.startsWith("curve")) {
                const f1 = func1.rule as ((t: number) => number)[];
                const f2 = func2.rule as ((t: number) => number)[];
                const g = [];
                for (let i = 0; i < f1.length; i++) {
                    g.push((t: number) => f1[i](t) - f2[i](t));
                }
                return Chalkboard.real.define(g, func1.type);
            } else if (func1.type.startsWith("surface")) {
                const f1 = func1.rule as ((s: number, t: number) => number)[];
                const f2 = func2.rule as ((s: number, t: number) => number)[];
                const g = [];
                for (let i = 0; i < f1.length; i++) {
                    g.push((s: number, t: number) => f1[i](s, t) - f2[i](s, t));
                }
                return Chalkboard.real.define(g, func1.type);
            }
            throw new TypeError('Chalkboard.real.sub: Properties "type" of "func1" and "func2" are not supported.');
        };

        /**
         * Calculates the tetration of a number.
         * @param {number} base - The number
         * @param {number} num - The tetratant
         * @returns {number}
         */
        export const tetration = (base: number, num: number): number | undefined => {
            if (num === 0) {
                return 1;
            } else if (num > 0) {
                return Math.pow(base, Chalkboard.real.tetration(base, num - 1) as number);
            }
        };

        /**
         * Calculates the translation of a function, which can be horizontally, vertically, or both.
         * @param {ChalkboardFunction} func - The function
         * @param {number} h - Horizontal translation (positive moves right)
         * @param {number} v - Vertical translation (positive moves up)
         * @returns {ChalkboardFunction}
         */
        export const translate = (func: ChalkboardFunction, h: number = 0, v: number = 0): ChalkboardFunction => {
            if (func.field !== "real") {
                throw new TypeError('Chalkboard.real.translate: Property "field" of "func" must be "real".');
            }
            if (func.type === "scalar2d") {
                const f = func.rule as (x: number) => number;
                const g = (x: number) => f(x - h) + v;
                return Chalkboard.real.define(g, func.type);
            }
            throw new TypeError('Chalkboard.real.translate: Property "type" of "func" is not supported.');
        };

        /**
         * Calculates the value of a function at a value.
         * @param {ChalkboardFunction} func - The function
         * @param {number} x - The value
         * @returns {number | ChalkboardVector}
         */
        export const val = (func: ChalkboardFunction, x: number | ChalkboardVector): number | ChalkboardVector => {
            if (func.field !== "real") {
                throw new TypeError('Chalkboard.real.val: Property "field" of "func" must be "real".');
            }
            if (func.type === "scalar2d") {
                const f = func.rule as (x: number) => number;
                return f(x as number);
            } else if (func.type === "scalar3d") {
                const f = func.rule as (x: number, y: number) => number;
                const v = x as ChalkboardVector as { x: number, y: number };
                return f(v.x, v.y);
            } else if (func.type === "scalar4d") {
                const f = func.rule as (x: number, y: number, z: number) => number;
                const v = x as ChalkboardVector as { x: number, y: number, z: number };
                return f(v.x, v.y, v.z);
            } else if (func.type === "vector2d") {
                const f = func.rule as [(x: number, y: number) => number, (x: number, y: number) => number];
                const v = x as ChalkboardVector as { x: number, y: number };
                return Chalkboard.vect.init(f[0](v.x, v.y), f[1](v.x, v.y));
            } else if (func.type === "vector3d") {
                const f = func.rule as [(x: number, y: number, z: number) => number, (x: number, y: number, z: number) => number, (x: number, y: number, z: number) => number];
                const v = x as ChalkboardVector as { x: number, y: number, z: number };
                return Chalkboard.vect.init(f[0](v.x, v.y, v.z), f[1](v.x, v.y, v.z), f[2](v.x, v.y, v.z));
            } else if (func.type === "vector4d") {
                const f = func.rule as [(x: number, y: number, z: number, w: number) => number, (x: number, y: number, z: number, w: number) => number, (x: number, y: number, z: number, w: number) => number, (x: number, y: number, z: number, w: number) => number];
                const v = x as ChalkboardVector as { x: number, y: number, z: number, w: number };
                return Chalkboard.vect.init(f[0](v.x, v.y, v.z, v.w), f[1](v.x, v.y, v.z, v.w), f[2](v.x, v.y, v.z, v.w), f[3](v.x, v.y, v.z, v.w));
            } else if (func.type === "curve2d") {
                const f = func.rule as [(t: number) => number, (t: number) => number];
                const t = x as number;
                return Chalkboard.vect.init(f[0](t), f[1](t));
            } else if (func.type === "curve3d") {
                const f = func.rule as [(t: number) => number, (t: number) => number, (t: number) => number];
                const t = x as number;
                return Chalkboard.vect.init(f[0](t), f[1](t), f[2](t));
            } else if (func.type === "curve4d") {
                const f = func.rule as [(t: number) => number, (t: number) => number, (t: number) => number, (t: number) => number];
                const t = x as number;
                return Chalkboard.vect.init(f[0](t), f[1](t), f[2](t), f[3](t));
            } else if (func.type === "surface3d") {
                const f = func.rule as [(s: number, t: number) => number, (s: number, t: number) => number, (s: number, t: number) => number];
                const v = x as ChalkboardVector as { x: number, y: number };
                return Chalkboard.vect.init(f[0](v.x, v.y), f[1](v.x, v.y), f[2](v.x, v.y));
            }
            throw new TypeError('Chalkboard.real.val: Property "type" of "func" is not supported.');
        };

        /**
         * Defines a zero function of a particular type.
         * @param {"scalar2d" | "scalar3d" | "scalar4d" | "vector2d" | "vector3d" | "vector4d" | "curve2d" | "curve3d" | "curve4d" | "surface3d"} [type="scalar2d"] - The type of the function
         * @returns {ChalkboardFunction}
         */
        export const zero = (type: "scalar2d" | "scalar3d" | "scalar4d" | "vector2d" | "vector3d" | "vector4d" | "curve2d" | "curve3d" | "curve4d" | "surface3d" = "scalar2d"): ChalkboardFunction => {
            if (type === "scalar2d") {
                return Chalkboard.real.define(() => 0, type);
            } else if (type === "scalar3d") {
                return Chalkboard.real.define(() => 0, type);
            } else if (type === "scalar4d") {
                return Chalkboard.real.define(() => 0, type);
            } else if (type === "vector2d") {
                return Chalkboard.real.define([() => 0, () => 0], type);
            } else if (type === "vector3d") {
                return Chalkboard.real.define([() => 0, () => 0, () => 0], type);
            } else if (type === "vector4d") {
                return Chalkboard.real.define([() => 0, () => 0, () => 0, () => 0], type);
            } else if (type === "curve2d") {
                return Chalkboard.real.define([() => 0, () => 0], type);
            } else if (type === "curve3d") {
                return Chalkboard.real.define([() => 0, () => 0, () => 0], type);
            } else if (type === "curve4d") {
                return Chalkboard.real.define([() => 0, () => 0, () => 0, () => 0], type);
            } else if (type === "surface3d") {
                return Chalkboard.real.define([() => 0, () => 0, () => 0], type);
            }
            throw new TypeError('Chalkboard.real.zero: Inputted "type" is not supported.');
        };
    }
}
