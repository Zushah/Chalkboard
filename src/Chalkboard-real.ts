/*
    The Chalkboard Library - Real Numbers Namespace
    Version 2.3.0 Boole
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
            if (func.type === "expl" || func.type === "inve" || func.type === "pola" || func.type === "mult") {
                return Chalkboard.real.define(`Math.abs(${func.definition})`, func.type);
            } else if (func.type === "curv" && Array.isArray(func.definition)) {
                if (func.definition.length === 2) {
                    return Chalkboard.real.define([`Math.abs(${func.definition[0]})`, `Math.abs(${func.definition[1]})`], "curv");
                } else if (func.definition.length === 3) {
                    return Chalkboard.real.define([`Math.abs(${func.definition[0]})`, `Math.abs(${func.definition[1]})`, `Math.abs(${func.definition[2]})`], "curv");
                }
            } else if (func.type === "surf" && Array.isArray(func.definition)) {
                return Chalkboard.real.define([`Math.abs(${func.definition[0]})`, `Math.abs(${func.definition[1]})`, `Math.abs(${func.definition[2]})`], "surf");
            }
            throw new TypeError('Property "type" of "func" must be either "expl", "inve", "pola", "curv", "surf", or "mult".');
        };

        /**
         * Calculates the addition of two functions.
         * @param {ChalkboardFunction} func1 - The first function
         * @param {ChalkboardFunction} func2 - The second function
         * @returns {ChalkboardFunction}
         */
        export const add = (func1: ChalkboardFunction, func2: ChalkboardFunction): ChalkboardFunction => {
            if ((func1.type === "expl" && func2.type === "expl") || (func1.type === "inve" && func2.type === "inve") || (func1.type === "pola" && func2.type === "pola") || (func1.type === "mult" && func2.type === "mult")) {
                return Chalkboard.real.define(`(${func1.definition}) + (${func2.definition})`, func1.type);
            } else if (func1.type === "curv" && func2.type === "curv" && Array.isArray(func1.definition) && Array.isArray(func2.definition)) {
                if (func1.definition.length === 2 && func2.definition.length === 2) {
                    return Chalkboard.real.define([`(${func1.definition[0]}) + (${func2.definition[0]})`, `(${func1.definition[1]}) + (${func2.definition[1]})`], "curv");
                } else if (func1.definition.length === 3 && func2.definition.length === 3) {
                    return Chalkboard.real.define([`(${func1.definition[0]}) + (${func2.definition[0]})`, `(${func1.definition[1]}) + (${func2.definition[1]})`, `(${func1.definition[2]}) + (${func2.definition[2]})`], "curv");
                }
            } else if (func1.type === "surf" && func2.type === "surf" && Array.isArray(func1.definition) && Array.isArray(func2.definition)) {
                return Chalkboard.real.define([`(${func1.definition[0]}) + (${func2.definition[0]})`, `(${func1.definition[1]}) + (${func2.definition[1]})`, `(${func1.definition[2]}) + (${func2.definition[2]})`], "surf");
            }
            throw new TypeError('Property "type" of "func1" and "func2" must be either "expl", "inve", "pola", "curv", "surf", or "mult".');
        };

        /**
         * Calculates the composition of two functions.
         * @param {ChalkboardFunction} func1 - The outer function
         * @param {ChalkboardFunction} func2 - The inner function
         * @returns {ChalkboardFunction}
         */
        export const compose = (func1: ChalkboardFunction, func2: ChalkboardFunction): ChalkboardFunction => {
            if (func1.type === "expl" && func2.type === "expl") {
                return Chalkboard.real.define(`(${func1.definition.toString().replace(/x/g, `(${func2.definition})`)})`, "expl");
            } else if (func1.type === "inve" && func2.type === "inve") {
                return Chalkboard.real.define(`(${func1.definition.toString().replace(/y/g, `(${func2.definition})`)})`, "inve");
            } else if (func1.type === "pola" && func2.type === "pola") {
                return Chalkboard.real.define(`(${func1.definition.toString().replace(/O/g, `(${func2.definition})`)})`, "pola");
            } else if (func1.type === "curv" && func2.type === "curv" && Array.isArray(func1.definition) && Array.isArray(func2.definition)) {
                if (func1.definition.length === 2 && func2.definition.length === 2) {
                    return Chalkboard.real.define([`(${func1.definition[0].toString().replace(/x/g, `(${func2.definition[0]})`)})`, `(${func1.definition[1].toString().replace(/y/g, `(${func2.definition[1]})`)})`], "curv");
                } else if (func1.definition.length === 3 && func2.definition.length === 3) {
                    return Chalkboard.real.define([`(${func1.definition[0].toString().replace(/x/g, `(${func2.definition[0]})`)})`, `(${func1.definition[1].toString().replace(/y/g, `(${func2.definition[1]})`)})`, `(${func1.definition[2].toString().replace(/z/g, `(${func2.definition[2]})`)})`], "curv");
                }
            } else if (func1.type === "surf" && func2.type === "surf" && Array.isArray(func1.definition) && Array.isArray(func2.definition)) {
                return Chalkboard.real.define([`(${func1.definition[0].toString().replace(/x/g, `(${func2.definition[0]})`)})`, `(${func1.definition[1].toString().replace(/y/g, `(${func2.definition[1]})`)})`, `(${func1.definition[2].toString().replace(/z/g, `(${func2.definition[2]})`)})`], "surf");
            }
            throw new TypeError('Property "type" of "func1" and "func2" must be either "expl", "inve", "pola", "curv", or "surf".');
        };

        /**
         * Defines an explicit, inverse, polar, parametric curve, parametric surface, or multivariable function.
         * @param {string | string[]} definition - The definition, which can use the variable "x" for explicit, "y" for inverse, "O" for polar, "t" for parametric curve, "s" and "t" for parametric surface, and "x" and "y" for multivariable
         * @param {"expl" | "inve" | "pola" | "curv" | "surf" | "mult"} [type="expl"] - The type, which can be "expl" for explicit, "inve" for inverse, "pola" for polar, "curv" for parametric curve, "surf" for parametric surface, or "mult" for multivariable
         * @returns {ChalkboardFunction}
         */
        export const define = (definition: string | string[], type: "expl" | "inve" | "pola" | "curv" | "surf" | "mult" = "expl"): ChalkboardFunction => {
            if (type === "expl" || type === "inve" || type === "pola" || type === "mult") {
                return { definition, type };
            } else if (type === "curv" && Array.isArray(definition)) {
                const _definition = definition.length === 2 ? [definition[0], definition[1]] : [definition[0], definition[1], definition[2]];
                return { definition: _definition, type };
            } else if (type === "surf" && Array.isArray(definition)) {
                return { definition: [definition[0], definition[1], definition[2]], type };
            }
            throw new TypeError('Parameter "type" must be either "expl", "inve", "pola", "curv", "surf", or "mult".');
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
            if ((func1.type === "expl" && func2.type === "expl") || (func1.type === "inve" && func2.type === "inve") || (func1.type === "pola" && func2.type === "pola") || (func1.type === "mult" && func2.type === "mult")) {
                return Chalkboard.real.define(`(${func1.definition}) / (${func2.definition})`, func1.type);
            } else if (func1.type === "curv" && func2.type === "curv" && Array.isArray(func1.definition) && Array.isArray(func2.definition)) {
                if (func1.definition.length === 2) {
                    return Chalkboard.real.define([`(${func1.definition[0]}) / (${func2.definition[0]})`, `(${func1.definition[1]}) / (${func2.definition[1]})`], "curv");
                } else if (func1.definition.length === 3) {
                    return Chalkboard.real.define([`(${func1.definition[0]}) / (${func2.definition[0]})`, `(${func1.definition[1]}) / (${func2.definition[1]})`, `(${func1.definition[2]}) / (${func2.definition[2]})`], "curv");
                }
            } else if (func1.type === "surf" && func2.type === "surf" && Array.isArray(func1.definition) && Array.isArray(func2.definition)) {
                return Chalkboard.real.define([`(${func1.definition[0]}) / (${func2.definition[0]})`, `(${func1.definition[1]}) / (${func2.definition[1]})`, `(${func1.definition[2]}) / (${func2.definition[2]})`], "surf");
            }
            throw new TypeError('Property "type" of "func1" and "func2" must be either "expl", "inve", "pola", "curv", "surf", or "mult".');
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
            return Chalkboard.real.define(Chalkboard.real.slope(x1, y1, x2, y2).toString() + " * (x - " + x2.toString() + ") + " + y2.toString());
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
            return Chalkboard.calc.fxdx(Chalkboard.real.define("1 / x"), 1, num) as number;
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
            if ((func1.type === "expl" && func2.type === "expl") || (func1.type === "inve" && func2.type === "inve") || (func1.type === "pola" && func2.type === "pola") || (func1.type === "mult" && func2.type === "mult")) {
                return Chalkboard.real.define(`(${func1.definition}) * (${func2.definition})`, func1.type);
            } else if (func1.type === "curv" && func2.type === "curv" && Array.isArray(func1.definition) && Array.isArray(func2.definition)) {
                if (func1.definition.length === 2) {
                    return Chalkboard.real.define([`(${func1.definition[0]}) * (${func2.definition[0]})`, `(${func1.definition[1]}) * (${func2.definition[1]})`], "curv");
                } else if (func1.definition.length === 3) {
                    return Chalkboard.real.define([`(${func1.definition[0]}) * (${func2.definition[0]})`, `(${func1.definition[1]}) * (${func2.definition[1]})`, `(${func1.definition[2]}) * (${func2.definition[2]})`], "curv");
                }
            } else if (func1.type === "surf" && func2.type === "surf" && Array.isArray(func1.definition) && Array.isArray(func2.definition)) {
                return Chalkboard.real.define([`(${func1.definition[0]}) * (${func2.definition[0]})`, `(${func1.definition[1]}) * (${func2.definition[1]})`, `(${func1.definition[2]}) * (${func2.definition[2]})`], "surf");
            }
            throw new TypeError('Property "type" of "func1" and "func2" must be either "expl", "inve", "pola", "curv", "surf", or "mult".');
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
                arr = coeffs as number[];
            }
            let result = "";
            for (let i = 0; i < arr.length; i++) {
                const coeff = arr[i];
                const exponent = arr.length - i - 1;
                if (coeff === 0 && exponent !== 0) continue;
                if (result !== "") {
                    result += coeff >= 0 ? " + " : " - ";
                } else if (coeff < 0) {
                    result += "-";
                }
                const abscoeff = Math.abs(coeff);
                let term = "";
                if (exponent === 0) {
                    term = abscoeff.toString();
                } else if (exponent === 1) {
                    term = (abscoeff === 1 ? "" : abscoeff + " * ") + "x";
                } else {
                    term = (abscoeff === 1 ? "" : abscoeff + " * ") + "x ** " + exponent;
                }
                result += "(" + term + ")";
            }
            if (result === "") result = "0";
            return Chalkboard.real.define(result, "expl");
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
                if (func.type === "expl" || func.type === "inve" || func.type === "pola" || func.type === "mult") {
                    return Chalkboard.real.define(`(${func.definition}) ** ${num}`, func.type);
                } else if (func.type === "curv" && Array.isArray(func.definition)) {
                    if (func.definition.length === 2) {
                        return Chalkboard.real.define([`(${func.definition[0]}) ** ${num}`, `(${func.definition[1]}) ** ${num}`], "curv");
                    } else if (func.definition.length === 3) {
                        return Chalkboard.real.define([`(${func.definition[0]}) ** ${num}`, `(${func.definition[1]}) ** ${num}`, `(${func.definition[2]}) ** ${num}`], "curv");
                    }
                } else if (func.type === "surf" && Array.isArray(func.definition)) {
                    return Chalkboard.real.define([`(${func.definition[0]}) ** ${num}`, `(${func.definition[1]}) ** ${num}`, `(${func.definition[2]}) ** ${num}`], "surf");
                }
                throw new TypeError('Property "type" of "base" must be either "expl", "inve", "pola", "curv", "surf", or "mult".');
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
                return Chalkboard.real.define(a.toString() + "* x * x + " + b.toString() + " * x +" + c.toString());
            } else if (form === "vert") {
                return Chalkboard.real.define(a.toString() + " * ((x - " + b.toString() + ") * (x - " + b.toString() + ")) +" + c.toString());
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
            if (func.type === "expl" || func.type === "inve" || func.type === "pola" || func.type === "mult") {
                return Chalkboard.real.define(`1 / (${func.definition})`, func.type);
            } else if (func.type === "curv" && Array.isArray(func.definition)) {
                if (func.definition.length === 2) {
                    return Chalkboard.real.define([`1 / (${func.definition[0]})`, `1 / (${func.definition[1]})`], "curv");
                } else if (func.definition.length === 3) {
                    return Chalkboard.real.define([`1 / (${func.definition[0]})`, `1 / (${func.definition[1]})`, `1 / (${func.definition[2]})`], "curv");
                }
            } else if (func.type === "surf" && Array.isArray(func.definition)) {
                return Chalkboard.real.define([`1 / (${func.definition[0]})`, `1 / (${func.definition[1]})`, `1 / (${func.definition[2]})`], "surf");
            }
            throw new TypeError('Property "type" of "func" must be either "expl", "inve", "pola", "curv", "surf", or "mult".');
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
            if (func.type === "expl" || func.type === "inve" || func.type === "pola" || func.type === "mult") {
                return Chalkboard.real.define(`${num} * (${func.definition})`, func.type);
            } else if (func.type === "curv" && Array.isArray(func.definition)) {
                if (func.definition.length === 2) {
                    return Chalkboard.real.define([`${num} * (${func.definition[0]})`, `${num} * (${func.definition[1]})`], "curv");
                } else if (func.definition.length === 3) {
                    return Chalkboard.real.define([`${num} * (${func.definition[0]})`, `${num} * (${func.definition[1]})`, `${num} * (${func.definition[2]})`], "curv");
                }
            } else if (func.type === "surf" && Array.isArray(func.definition)) {
                return Chalkboard.real.define([`${num} * (${func.definition[0]})`, `${num} * (${func.definition[1]})`, `${num} * (${func.definition[2]})`], "surf");
            }
            throw new TypeError('Property "type" of "func" must be either "expl", "inve", "pola", "curv", "surf", or "mult".');
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
            if ((func1.type === "expl" && func2.type === "expl") || (func1.type === "inve" && func2.type === "inve") || (func1.type === "pola" && func2.type === "pola") || (func1.type === "mult" && func2.type === "mult")) {
                return Chalkboard.real.define(`(${func1.definition}) - (${func2.definition})`, func1.type);
            } else if (func1.type === "curv" && func2.type === "curv" && Array.isArray(func1.definition) && Array.isArray(func2.definition)) {
                if (func1.definition.length === 2 && func2.definition.length === 2) {
                    return Chalkboard.real.define([`(${func1.definition[0]}) - (${func2.definition[0]})`, `(${func1.definition[1]}) - (${func2.definition[1]})`], "curv");
                } else if (func1.definition.length === 3 && func2.definition.length === 3) {
                    return Chalkboard.real.define([`(${func1.definition[0]}) - (${func2.definition[0]})`, `(${func1.definition[1]}) - (${func2.definition[1]})`, `(${func1.definition[2]}) - (${func2.definition[2]})`], "curv");
                }
            } else if (func1.type === "surf" && func2.type === "surf" && Array.isArray(func1.definition) && Array.isArray(func2.definition)) {
                return Chalkboard.real.define([`(${func1.definition[0]}) - (${func2.definition[0]})`, `(${func1.definition[1]}) - (${func2.definition[1]})`, `(${func1.definition[2]}) - (${func2.definition[2]})`], "surf");
            }
            throw new TypeError('Property "type" of "func1" and "func2" must be either "expl", "inve", "pola", "curv", "surf", or "mult".');
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
            if (func.type === "expl") {
                if (h !== 0 && v !== 0) {
                    return Chalkboard.real.define(`(${func.definition.toString().replace(/x/g, `(x - ${h})`)}) + ${v}`, "expl");
                } else if (h !== 0) {
                    return Chalkboard.real.define(`${func.definition.toString().replace(/x/g, `(x - ${h})`)}`, "expl");
                } else if (v !== 0) {
                    return Chalkboard.real.define(`(${func.definition}) + ${v}`, "expl");
                } else {
                    return func;
                }
            }
            throw new TypeError('Property "type" of "func" must be "expl".');
        };

        /**
         * Calculates the value of a function at a value.
         * @param {ChalkboardFunction} func - The function
         * @param {number} val - The value
         * @returns {number | ChalkboardVector}
         */
        export const val = (func: ChalkboardFunction, val: number | ChalkboardVector): number | ChalkboardVector => {
            if (func.type === "expl") {
                const f = Chalkboard.real.parse("x => " + func.definition);
                return f(val);
            } else if (func.type === "inve") {
                const f = Chalkboard.real.parse("y => " + func.definition);
                return f(val);
            } else if (func.type === "pola") {
                const r = Chalkboard.real.parse("O => " + func.definition);
                return r(val);
            } else if (func.type === "curv") {
                if (func.definition.length === 2) {
                    const x = Chalkboard.real.parse("t => " + func.definition[0]),
                        y = Chalkboard.real.parse("t => " + func.definition[1]);
                    return Chalkboard.vect.init(x(val), y(val));
                } else {
                    const x = Chalkboard.real.parse("t => " + func.definition[0]),
                        y = Chalkboard.real.parse("t => " + func.definition[1]),
                        z = Chalkboard.real.parse("t => " + func.definition[2]);
                    return Chalkboard.vect.init(x(val), y(val), z(val));
                }
            } else if (func.type === "surf") {
                const vect = val as ChalkboardVector;
                const x = Chalkboard.real.parse("(s, t) => " + func.definition[0]),
                    y = Chalkboard.real.parse("(s, t) => " + func.definition[1]),
                    z = Chalkboard.real.parse("(s, t) => " + func.definition[2]);
                return Chalkboard.vect.init(x(vect.x, vect.y), y(vect.x, vect.y), z(vect.x, vect.y));
            } else if (func.type === "mult" && typeof val !== "number") {
                const vect = val as ChalkboardVector;
                const f = Chalkboard.real.parse("(x, y) => " + func.definition);
                return f(vect.x, vect.y);
            } else {
                throw new TypeError('Parameter "func" must be of type "ChalkboardFunction" with a "type" property of "expl", "pola", "curv", "surf", or "mult".');
            }
        };
    }
}
