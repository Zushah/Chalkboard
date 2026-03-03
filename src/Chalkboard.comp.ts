/*
    Chalkboard - Complex Numbers Namespace
    Version 3.0.0 Euler
    Released March 2nd, 2026
*/
/*
    This Source Code Form is subject to the terms of the
    Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed
    with this file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/
/// <reference path="Chalkboard.ts"/>
namespace Chalkboard {
    /**
     * The complex numbers namespace.
     * @namespace
     */
    export namespace comp {
        /**
         * Calculates the absolute value of a complex number or complex function.
         * @param {ChalkboardComplex | number | ChalkboardFunction} comp - The complex number or function
         * @returns {ChalkboardComplex | ChalkboardFunction}
         * @example
         * // Returns 2 + 3i
         * const z = Chalkboard.comp.absolute(Chalkboard.comp.init(-2, 3));
         */
        export const absolute = (comp: ChalkboardComplex | number | ChalkboardFunction): ChalkboardComplex | ChalkboardFunction => {
            if (typeof comp === "number") comp = Chalkboard.comp.init(comp, 0);
            if (comp.hasOwnProperty("a") && comp.hasOwnProperty("b")) {
                const z = comp as ChalkboardComplex;
                return Chalkboard.comp.init(Math.abs(z.a), Math.abs(z.b));
            } else if (comp.hasOwnProperty("rule")) {
                if ((comp as ChalkboardFunction).field !== "comp") throw new TypeError("Chalkboard.comp.absolute: Property 'field' of 'comp' must be 'comp'.");
                const f = (comp as ChalkboardFunction).rule as ((a: number, b: number) => number)[];
                const g = [(a: number, b: number) => Math.abs(f[0](a, b)), (a: number, b: number) => Math.abs(f[1](a, b))];
                return Chalkboard.comp.define(...g);
            }
            throw new TypeError("Chalkboard.comp.absolute: Parameter 'comp' must be of type ChalkboardComplex, number, or ChalkboardFunction.");
        };

        /**
         * Calculates the addition of two complex numbers or functions.
         * @param {ChalkboardComplex | number | ChalkboardFunction} comp1 - The first complex number or function
         * @param {ChalkboardComplex | number | ChalkboardFunction} comp2 - The second complex number or function
         * @returns {ChalkboardComplex | ChalkboardFunction}
         * @example
         * // Returns 3 + 4i
         * const sum = Chalkboard.comp.add(Chalkboard.comp.init(2, 3), Chalkboard.comp.init(1, 1));
         */
        export const add = (comp1: ChalkboardComplex | number | ChalkboardFunction, comp2: ChalkboardComplex | number | ChalkboardFunction): ChalkboardComplex | ChalkboardFunction => {
            if (typeof comp1 === "number") comp1 = Chalkboard.comp.init(comp1, 0);
            if (typeof comp2 === "number") comp2 = Chalkboard.comp.init(comp2, 0);
            if (comp1.hasOwnProperty("a") && comp1.hasOwnProperty("b") && comp2.hasOwnProperty("a") && comp2.hasOwnProperty("b")) {
                const z1 = comp1 as ChalkboardComplex;
                const z2 = comp2 as ChalkboardComplex;
                return Chalkboard.comp.init(z1.a + z2.a, z1.b + z2.b);
            } else if (comp1.hasOwnProperty("rule") && comp2.hasOwnProperty("rule")) {
                if ((comp1 as ChalkboardFunction).field !== "comp" || (comp2 as ChalkboardFunction).field !== "comp") throw new TypeError("Chalkboard.comp.add: Properties 'field' of 'comp1' and 'comp2' must be 'comp'.");
                const f1 = (comp1 as ChalkboardFunction).rule as [(a: number, b: number) => number, (a: number, b: number) => number];
                const f2 = (comp2 as ChalkboardFunction).rule as [(a: number, b: number) => number, (a: number, b: number) => number];
                const g = [(a: number, b: number) => f1[0](a, b) + f2[0](a, b), (a: number, b: number) => f1[1](a, b) + f2[1](a, b)];
                return Chalkboard.comp.define(...g);
            }
            throw new TypeError("Chalkboard.comp.add: Parameters 'comp1' and 'comp2' must be of type ChalkboardComplex, number, or ChalkboardFunction.");
        };

        /**
         * Calculates the argument of a complex number.
         * @param {ChalkboardComplex} comp - The complex number
         * @returns {number}
         * @example
         * // Returns 0.9273 (approximately π/3 radians)
         * const argument = Chalkboard.comp.arg(Chalkboard.comp.init(1, 1.7321));
         */
        export const arg = (comp: ChalkboardComplex): number => {
            return Chalkboard.trig.arctan2(comp.b, comp.a);
        };

        /**
         * Calculates the argument between two complex numbers.
         * @param {ChalkboardComplex} comp1 - The first complex number
         * @param {ChalkboardComplex} comp2 - The second complex number
         * @returns {number}
         * @example
         * // Returns 0.7854 (approximately π/4 radians)
         * const angle = Chalkboard.comp.argBetween(Chalkboard.comp.init(1, 0), Chalkboard.comp.init(1, 1));
         */
        export const argBetween = (comp1: ChalkboardComplex, comp2: ChalkboardComplex): number => {
            return Chalkboard.vect.angBetween(Chalkboard.comp.toVector(comp1), Chalkboard.comp.toVector(comp2));
        };

        /**
         * Calculates the conjugate of a complex number or function.
         * @param {ChalkboardComplex | number | ChalkboardFunction} comp - The complex number or function
         * @returns {ChalkboardComplex | ChalkboardFunction}
         * @example
         * // Returns 2 - 3i
         * const conj = Chalkboard.comp.conjugate(Chalkboard.comp.init(2, 3));
         */
        export const conjugate = (comp: ChalkboardComplex | number | ChalkboardFunction): ChalkboardComplex | ChalkboardFunction => {
            if (typeof comp === "number") comp = Chalkboard.comp.init(comp, 0);
            if (comp.hasOwnProperty("a") && comp.hasOwnProperty("b")) {
                const z = comp as ChalkboardComplex;
                return Chalkboard.comp.init(z.a, -z.b);
            } else if (comp.hasOwnProperty("rule")) {
                if ((comp as ChalkboardFunction).field !== "comp") throw new TypeError("Chalkboard.comp.conjugate: Property 'field' of 'comp' must be 'comp'.");
                const f = (comp as ChalkboardFunction).rule as ((a: number, b: number) => number)[];
                const g = [(a: number, b: number) => f[0](a, b), (a: number, b: number) => -f[1](a, b)];
                return Chalkboard.comp.define(...g);
            }
            throw new TypeError("Chalkboard.comp.conjugate: Parameter 'comp' must be of type ChalkboardComplex, number, or ChalkboardFunction.");
        };

        /**
         * Calculates a complex number constrained within a range.
         * @param {ChalkboardComplex} comp - The complex number
         * @param {number[]} [range=[0, 1]] - The range
         * @returns {ChalkboardComplex}
         * @example
         * // Returns 1 + 0.5i
         * const constrained = Chalkboard.comp.constrain(Chalkboard.comp.init(2, 0.5));
         */
        export const constrain = (comp: ChalkboardComplex, range: [number, number] = [0, 1]): ChalkboardComplex => {
            return Chalkboard.comp.init(Chalkboard.numb.constrain(comp.a, range), Chalkboard.numb.constrain(comp.b, range));
        };

        /**
         * Copies a complex number.
         * @param {ChalkboardComplex} comp - The complex number
         * @returns {ChalkboardComplex}
         * @example
         * // Returns 2 + 3i
         * const copied = Chalkboard.comp.copy(Chalkboard.comp.init(2, 3));
         */
        export const copy = (comp: ChalkboardComplex): ChalkboardComplex => {
            return Object.create(Object.getPrototypeOf(comp), Object.getOwnPropertyDescriptors(comp));
        };

        /**
         * Calculates the cosine of a complex number or function.
         * @param {ChalkboardComplex | number | ChalkboardFunction} comp - The complex number or function
         * @returns {ChalkboardComplex | ChalkboardFunction}
         * @example
         * // Returns 1
         * const z = Chalkboard.comp.random();
         * const sin = Chalkboard.comp.sin(z);
         * const cos = Chalkboard.comp.cos(z);
         * const w = Chalkboard.comp.add(Chalkboard.comp.sq(sin), Chalkboard.comp.sq(cos));
         */
        export const cos = (comp: ChalkboardComplex | number | ChalkboardFunction): ChalkboardComplex | ChalkboardFunction => {
            if (typeof comp === "number") comp = Chalkboard.comp.init(comp, 0);
            if (comp.hasOwnProperty("a") && comp.hasOwnProperty("b")) {
                const z = comp as ChalkboardComplex;
                return Chalkboard.comp.init(
                    Chalkboard.trig.cos(z.a) * Chalkboard.trig.cosh(z.b),
                    -Chalkboard.trig.sin(z.a) * Chalkboard.trig.sinh(z.b)
                );
            } else if (comp.hasOwnProperty("rule")) {
                if ((comp as ChalkboardFunction).field !== "comp") throw new TypeError("Chalkboard.comp.cos: Property 'field' of 'comp' must be 'comp'.");
                const f = (comp as ChalkboardFunction).rule as [(a: number, b: number) => number, (a: number, b: number) => number];
                return Chalkboard.comp.define(
                    (a: number, b: number) => {
                        const re = f[0](a, b);
                        const im = f[1](a, b);
                        return Chalkboard.trig.cos(re) * Chalkboard.trig.cosh(im);
                    },
                    (a: number, b: number) => {
                        const re = f[0](a, b);
                        const im = f[1](a, b);
                        return -Chalkboard.trig.sin(re) * Chalkboard.trig.sinh(im);
                    }
                );
            }
            throw new TypeError("Chalkboard.comp.cos: Parameter 'comp' must be of type ChalkboardComplex, number, or ChalkboardFunction.");
        };

        /**
         * Defines a mathematical function in the field of complex numbers.
         * @param {Function | Function[]} rule - The rule of the function, which can be a single function that takes a complex number or an array of two functions that take real and imaginary parts respectively.
         * @returns {ChalkboardFunction}
         * @example
         * // Defines f(z) = z² or f(a+bi) = (a²-b²) + (2ab)i
         * const f = Chalkboard.comp.define((z) => Chalkboard.comp.sq(z));
         * 
         * // Defines g(a+bi) = (a²-b²) + (2ab)i or g(z) = z²
         * const g = Chalkboard.comp.define([
         *     (a, b) => a*a - b*b,
         *     (a, b) => 2*a*b
         * ]);
         */
        export const define = (...rule: (((z: ChalkboardComplex) => ChalkboardComplex) | ((a: number, b: number) => number))[]): ChalkboardFunction => {
            let f: ((z: ChalkboardComplex) => ChalkboardComplex) | ((a: number, b: number) => number)[] | ((a: number, b: number) => number);
            if (rule.length === 1 && Array.isArray(rule[0])) {
                f = rule[0] as ((a: number, b: number) => number)[];
            } else if (rule.length > 1) {
                f = rule as ((a: number, b: number) => number)[];
            } else {
                f = rule[0] as ((z: ChalkboardComplex) => ChalkboardComplex);
            }
            if (Array.isArray(f)) {
                if (f.length !== 2 || f[0].length !== 2 || f[1].length !== 2) throw new TypeError("Chalkboard.comp.define: If 'rule' is an array, it must be an array of two functions of two variables.");
                if (typeof f[0](0, 0) !== "number" || typeof f[1](0, 0) !== "number") throw new TypeError("Chalkboard.comp.define: If 'rule' is an array, the functions in it must return real numbers.");
                return { rule: f, field: "comp", type: "vector2d" } as ChalkboardFunction;
            } else {
                if (f.length !== 1) throw new TypeError("Chalkboard.comp.define: If 'rule' is a function, it must be a function of one variable.");
                const F = f as (z: ChalkboardComplex) => ChalkboardComplex;
                if (!F(Chalkboard.comp.init(0, 0)).hasOwnProperty("a") || !F(Chalkboard.comp.init(0, 0)).hasOwnProperty("b")) throw new TypeError("Chalkboard.comp.define: If 'rule' is a function, it must return a complex number.");
                return { rule: [(a: number, b: number) => F(Chalkboard.comp.init(a, b)).a, (a: number, b: number) => F(Chalkboard.comp.init(a, b)).b], field: "comp", type: "vector2d" } as ChalkboardFunction;
            }
        };

        /**
         * Calculates the distance between two complex numbers.
         * @param {ChalkboardComplex | number} comp1 - The first complex number
         * @param {ChalkboardComplex | number} comp2 - The second complex number
         * @returns {ChalkboardComplex}
         * @example
         * // Returns 5 (distance from origin to 3+4i)
         * const distance = Chalkboard.comp.dist(Chalkboard.comp.init(0, 0), Chalkboard.comp.init(3, 4));
         */
        export const dist = (comp1: ChalkboardComplex | number, comp2: ChalkboardComplex | number): number => {
            if (typeof comp1 === "number") comp1 = Chalkboard.comp.init(comp1, 0);
            if (typeof comp2 === "number") comp2 = Chalkboard.comp.init(comp2, 0);
            return Chalkboard.real.sqrt((comp2.a - comp1.a) * (comp2.a - comp1.a) + (comp2.b - comp1.b) * (comp2.b - comp1.b));
        };

        /**
         * Calculates the distance squared between two complex numbers.
         * @param {ChalkboardComplex | number} comp1 - The first complex number
         * @param {ChalkboardComplex | number} comp2 - The second complex number
         * @returns {ChalkboardComplex}
         * @example
         * // Returns 25 (squared distance from origin to 3+4i)
         * const distanceSquared = Chalkboard.comp.distsq(Chalkboard.comp.init(0, 0), Chalkboard.comp.init(3, 4));
         */
        export const distsq = (comp1: ChalkboardComplex | number, comp2: ChalkboardComplex | number): number => {
            if (typeof comp1 === "number") comp1 = Chalkboard.comp.init(comp1, 0);
            if (typeof comp2 === "number") comp2 = Chalkboard.comp.init(comp2, 0);
            return (comp2.a - comp1.a) * (comp2.a - comp1.a) + (comp2.b - comp1.b) * (comp2.b - comp1.b);
        };

        /**
         * Calculates the division of two complex numbers or functions.
         * @param {ChalkboardComplex | number | ChalkboardFunction} comp1 - The first complex number or function
         * @param {ChalkboardComplex | number | ChalkboardFunction} comp2 - The second complex number or function
         * @returns {ChalkboardComplex | ChalkboardFunction}
         * @example
         * // Returns 0.44 + 0.08i (approximate)
         * const quotient = Chalkboard.comp.div(Chalkboard.comp.init(2, 1), Chalkboard.comp.init(4, 2));
         */
        export const div = (comp1: ChalkboardComplex | number | ChalkboardFunction, comp2: ChalkboardComplex | number | ChalkboardFunction): ChalkboardComplex | ChalkboardFunction => {
            if (typeof comp1 === "number") comp1 = Chalkboard.comp.init(comp1, 0);
            if (typeof comp2 === "number") comp2 = Chalkboard.comp.init(comp2, 0);
            if (comp1.hasOwnProperty("a") && comp1.hasOwnProperty("b") && comp2.hasOwnProperty("a") && comp2.hasOwnProperty("b")) {
                const z1 = comp1 as ChalkboardComplex;
                const z2 = comp2 as ChalkboardComplex;
                const d = z2.a * z2.a + z2.b * z2.b;
                return Chalkboard.comp.init((z1.a * z2.a + z1.b * z2.b) / d, (z1.b * z2.a - z1.a * z2.b) / d);
            } else if (comp1.hasOwnProperty("rule") || comp2.hasOwnProperty("rule")) {
                if ((comp1 as ChalkboardFunction).field !== "comp" || (comp2 as ChalkboardFunction).field !== "comp") throw new TypeError("Chalkboard.comp.div: Properties 'field' of 'comp1' and 'comp2' must be 'comp'.");
                const f1 = (comp1 as ChalkboardFunction).rule as [(a: number, b: number) => number, (a: number, b: number) => number];
                const f2 = (comp2 as ChalkboardFunction).rule as [(a: number, b: number) => number, (a: number, b: number) => number];
                const g = [
                    (a: number, b: number) => {
                        const d = f2[0](a, b) * f2[0](a, b) + f2[1](a, b) * f2[1](a, b);
                        return (f1[0](a, b) * f2[0](a, b) + f1[1](a, b) * f2[1](a, b)) / d;
                    },
                    (a: number, b: number) => {
                        const d = f2[0](a, b) * f2[0](a, b) + f2[1](a, b) * f2[1](a, b);
                        return (f1[1](a, b) * f2[0](a, b) - f1[0](a, b) * f2[1](a, b)) / d;
                    }
                ];
                return Chalkboard.comp.define(...g);
            }
            throw new TypeError("Chalkboard.comp.div: Parameters 'comp1' and 'comp2' must be of type ChalkboardComplex, number, or ChalkboardFunction.");
        };

        /**
         * Calculates Euler's formula (the complex exponential) for the inputted radian.
         * @param {number} rad
         * @returns {ChalkboardComplex}
         * @example
         * // Returns 0.5403 + 0.8415i (approximate - e^(iπ/4))
         * const e = Chalkboard.comp.Euler(Chalkboard.PI(0.25));
         */
        export const Euler = (rad: number): ChalkboardComplex => {
            return Chalkboard.comp.init(Chalkboard.trig.cos(rad), Chalkboard.trig.sin(rad));
        };

        /**
         * Calculates the exponential of a complex number or function.
         * @param {ChalkboardComplex | number | ChalkboardFunction} comp - The complex number or function
         * @returns {ChalkboardComplex | ChalkboardFunction}
         * @example
         * // Returns approximately -e
         * const z = Chalkboard.comp.exp(Chalkboard.comp.init(1, Chalkboard.PI()));
         */
        export const exp = (comp: ChalkboardComplex | number | ChalkboardFunction): ChalkboardComplex | ChalkboardFunction => {
            if (typeof comp === "number") comp = Chalkboard.comp.init(comp, 0);
            if (comp.hasOwnProperty("a") && comp.hasOwnProperty("b")) {
                const z = comp as ChalkboardComplex;
                const expRe = Math.exp(z.a);
                return Chalkboard.comp.init(expRe * Math.cos(z.b), expRe * Math.sin(z.b));
            } else if (comp.hasOwnProperty("rule")) {
                if ((comp as ChalkboardFunction).field !== "comp") throw new TypeError("Chalkboard.comp.exp: Property 'field' of 'comp' must be 'comp'.");
                const f = (comp as ChalkboardFunction).rule as [(a: number, b: number) => number, (a: number, b: number) => number];
                return Chalkboard.comp.define(
                    (a: number, b: number) => {
                        const expRe = Math.exp(f[0](a, b));
                        return expRe * Math.cos(f[1](a, b));
                    },
                    (a: number, b: number) => {
                        const expRe = Math.exp(f[0](a, b));
                        return expRe * Math.sin(f[1](a, b));
                    }
                );
            }
            throw new TypeError("Chalkboard.comp.exp: Parameter 'comp' must be of type ChalkboardComplex, number, or ChalkboardFunction.");
        };

        /**
         * Returns the imaginary part of a complex number or complex function.
         * @param {ChalkboardFunction | ChalkboardComplex} funcORcomp
         * @returns {Function | ChalkboardComplex}
         * @example
         * // Returns 3
         * const im = Chalkboard.comp.Im(Chalkboard.comp.init(2, 3));
         */
        export const Im = (funcORcomp: ChalkboardFunction | ChalkboardComplex): Function | number => {
            if (funcORcomp.hasOwnProperty("rule")) {
                return ((funcORcomp as ChalkboardFunction).rule as ([(a: number, b: number) => number, (a: number, b: number) => number]))[1];
            } else {
                return (funcORcomp as ChalkboardComplex).b;
            }
        };

        /**
         * Initializes a new complex number
         * @param {number} a - The real part
         * @param {number} [b=0] - The imaginary part
         * @returns {ChalkboardComplex}
         * @example
         * const z = Chalkboard.comp.init(2, 3); // Returns 2 + 3i
         * const w = Chalkboard.comp.init(2); // Returns 2 + 0i also known as 2
         * const i = Chalkboard.comp.init(0, 1); // Returns i
         */
        export const init = (a: number, b: number = 0): ChalkboardComplex => {
            return { a: a, b: b };
        };

        /**
         * Calculates the inverse of a complex number.
         * @param {ChalkboardComplex} comp - The complex number
         * @returns {ChalkboardComplex}
         * @example
         * // Returns 0.2 - 0.1i
         * const inverse = Chalkboard.comp.invert(Chalkboard.comp.init(4, 2));
         */
        export const invert = (comp: ChalkboardComplex): ChalkboardComplex => {
            return Chalkboard.comp.init(comp.a / Chalkboard.comp.magsq(comp), -comp.b / Chalkboard.comp.magsq(comp));
        };

        /**
         * Checks if two complex numbers are approximately equal within a particular precision.
         * @param {ChalkboardComplex | number} comp1 - The first complex number
         * @param {ChalkboardComplex | number} comp2 - The second complex number
         * @param {number} [precision=0.000001] - The precision to check
         * @returns {boolean}
         * @example
         * // Returns true
         * const yes = Chalkboard.comp.isApproxEqual(Chalkboard.comp.init(2, 3), Chalkboard.comp.init(2.0000001, 3.0000001));
         * 
         * // Returns false
         * const no = Chalkboard.comp.isApproxEqual(Chalkboard.comp.init(2, 3), Chalkboard.comp.init(2.1, 3.1));
         */
        export const isApproxEqual = (comp1: ChalkboardComplex | number, comp2: ChalkboardComplex | number, precision: number = 0.000001): boolean => {
            if (typeof comp1 === "number") comp1 = Chalkboard.comp.init(comp1, 0);
            if (typeof comp2 === "number") comp2 = Chalkboard.comp.init(comp2, 0);
            return Chalkboard.numb.isApproxEqual(comp1.a, comp2.a, precision) && Chalkboard.numb.isApproxEqual(comp1.b, comp2.b, precision);
        };

        /**
         * Checks if two complex numbers are equal.
         * @param {ChalkboardComplex | number} comp1 - The first complex number
         * @param {ChalkboardComplex | number} comp2 - The second complex number
         * @returns {boolean}
         * @example
         * // Returns true
         * const yes = Chalkboard.comp.isEqual(Chalkboard.comp.init(2, 3), Chalkboard.comp.init(2, 3));
         * 
         * // Returns false
         * const no = Chalkboard.comp.isEqual(Chalkboard.comp.init(2, 3), Chalkboard.comp.init(2.0000001, 3.0000001));
         */
        export const isEqual = (comp1: ChalkboardComplex | number, comp2: ChalkboardComplex | number): boolean => {
            if (typeof comp1 === "number") comp1 = Chalkboard.comp.init(comp1, 0);
            if (typeof comp2 === "number") comp2 = Chalkboard.comp.init(comp2, 0);
            return comp1.a === comp2.a && comp1.b === comp2.b;
        };

        /**
         * Checks if two complex numbers are inverses of each other within a particular precision.
         * @param {ChalkboardComplex | number} comp1 - The first complex number
         * @param {ChalkboardComplex | number} comp2 - The second complex number
         * @param {number} [precision=0.000001] - The precision to check
         * @returns {boolean}
         * @example
         * // Returns true
         * const z = Chalkboard.comp.init(2, 3);
         * const zi = Chalkboard.comp.invert(z);
         * const yes = Chalkboard.comp.isInverse(z, zi);
         */
        export const isInverse = (comp1: ChalkboardComplex | number, comp2: ChalkboardComplex | number, precision: number = 0.000001): boolean => {
            if (typeof comp1 === "number") comp1 = Chalkboard.comp.init(comp1, 0);
            if (typeof comp2 === "number") comp2 = Chalkboard.comp.init(comp2, 0);
            return Chalkboard.comp.isApproxEqual(Chalkboard.comp.mul(comp1, comp2) as ChalkboardComplex, Chalkboard.comp.init(1, 0), precision);
        };

        /**
         * Checks if a complex number is normalized.
         * @param {ChalkboardComplex} comp - The complex number
         * @returns {boolean}
         * @example
         * // Returns true
         * const yes = Chalkboard.comp.isNormalized(Chalkboard.comp.init(1, 0));
         * 
         * // Returns false
         * const no = Chalkboard.comp.isNormalized(Chalkboard.comp.init(2, 3));
         */
        export const isNormalized = (comp: ChalkboardComplex): boolean => {
            return Chalkboard.numb.isApproxEqual(Chalkboard.comp.magsq(comp), 1);
        };

        /**
         * Checks if a complex number is zero.
         * @param {ChalkboardComplex | number} comp - The complex number
         * @returns {boolean}
         * @example
         * // Returns true
         * const yes = Chalkboard.comp.isZero(Chalkboard.comp.init(0, 0));
         * 
         * // Returns false
         * const no = Chalkboard.comp.isZero(Chalkboard.comp.init(1, 2));
         */
        export const isZero = (comp: ChalkboardComplex | number): boolean => {
            if (typeof comp === "number") comp = Chalkboard.comp.init(comp, 0);
            return Chalkboard.comp.isApproxEqual(comp, Chalkboard.comp.init(0, 0));
        };

        /**
         * Calculates the complex logarithm of a complex number.
         * @param {ChalkboardComplex} comp - The complex number
         * @returns {ChalkboardComplex}
         * @example
         * // Returns 1.6094 + 0.9828i (approximate)
         * const log = Chalkboard.comp.ln(Chalkboard.comp.init(3, 4));
         */
        export const ln = (comp: ChalkboardComplex): ChalkboardComplex => {
            return Chalkboard.comp.init(Chalkboard.real.ln(Chalkboard.comp.mag(comp)), Chalkboard.trig.arctan2(comp.b, comp.a));
        };

        /**
         * Calculates the magnitude (or modulus) of a complex number.
         * @param {ChalkboardComplex} comp - The complex number
         * @returns {number}
         * @example
         * // Returns 5
         * const r = Chalkboard.comp.mag(Chalkboard.comp.init(3, 4));
         */
        export const mag = (comp: ChalkboardComplex): number => {
            return Chalkboard.real.sqrt(comp.a * comp.a + comp.b * comp.b);
        };

        /**
         * Calculates a complex number with the inputted magnitude.
         * @param {ChalkboardComplex} comp - The complex number
         * @param {number} num - The magnitude to set to
         * @returns {ChalkboardComplex}
         * @example
         * // Returns 6 + 8i (scaled to magnitude 10)
         * const normscl = Chalkboard.comp.magset(Chalkboard.comp.init(3, 4), 10);
         */
        export const magset = (comp: ChalkboardComplex, num: number): ChalkboardComplex => {
            return Chalkboard.comp.scl(Chalkboard.comp.normalize(comp), num) as ChalkboardComplex;
        };

        /**
         * Calculates the magnitude (or modulus) squared of a complex number.
         * @param {ChalkboardComplex} comp - The complex number
         * @returns {number}
         * @example
         * // Returns 25
         * const r2 = Chalkboard.comp.magsq(Chalkboard.comp.init(3, 4));
         */
        export const magsq = (comp: ChalkboardComplex): number => {
            return comp.a * comp.a + comp.b * comp.b;
        };

        /**
         * Calculates the multiplication of two complex numbers or functions.
         * @param {ChalkboardComplex | number | ChalkboardFunction} comp1 - The first complex number or function
         * @param {ChalkboardComplex | number | ChalkboardFunction} comp2 - The second complex number or function
         * @returns {ChalkboardComplex | ChalkboardFunction}
         * @example
         * // Returns -5 + 10i
         * const product = Chalkboard.comp.mul(Chalkboard.comp.init(2, 3), Chalkboard.comp.init(1, 2));
         */
        export const mul = (comp1: ChalkboardComplex | number | ChalkboardFunction, comp2: ChalkboardComplex | number | ChalkboardFunction): ChalkboardComplex | ChalkboardFunction => {
            if (typeof comp1 === "number") comp1 = Chalkboard.comp.init(comp1, 0);
            if (typeof comp2 === "number") comp2 = Chalkboard.comp.init(comp2, 0);
            if (comp1.hasOwnProperty("a") && comp1.hasOwnProperty("b") && comp2.hasOwnProperty("a") && comp2.hasOwnProperty("b")) {
                const z1 = comp1 as ChalkboardComplex;
                const z2 = comp2 as ChalkboardComplex;
                return Chalkboard.comp.init(z1.a * z2.a - z1.b * z2.b, z1.a * z2.b + z1.b * z2.a);
            } else if (comp1.hasOwnProperty("rule") || comp2.hasOwnProperty("rule")) {
                if ((comp1 as ChalkboardFunction).field !== "comp" || (comp2 as ChalkboardFunction).field !== "comp") throw new TypeError("Chalkboard.comp.mul: Properties 'field' of 'comp1' and 'comp2' must be 'comp'.");
                const f1 = (comp1 as ChalkboardFunction).rule as [(a: number, b: number) => number, (a: number, b: number) => number];
                const f2 = (comp2 as ChalkboardFunction).rule as [(a: number, b: number) => number, (a: number, b: number) => number];
                const g = [(a: number, b: number) => f1[0](a, b) * f2[0](a, b) - f1[1](a, b) * f2[1](a, b), (a: number, b: number) => f1[0](a, b) * f2[1](a, b) + f1[1](a, b) * f2[0](a, b)];
                return Chalkboard.comp.define(...g);
            }
            throw new TypeError("Chalkboard.comp.mul: Parameters 'comp1' and 'comp2' must be of type ChalkboardComplex, number, or ChalkboardFunction.");
        };

        /**
         * Calculates the negation of a complex number or function.
         * @param {ChalkboardComplex | number | ChalkboardFunction} comp - The complex number or function
         * @returns {ChalkboardComplex | ChalkboardFunction}
         * @example
         * // Returns -2 - 3i
         * const negated = Chalkboard.comp.negate(Chalkboard.comp.init(2, 3));
         */
        export const negate = (comp: ChalkboardComplex | number | ChalkboardFunction): ChalkboardComplex | ChalkboardFunction => {
            if (typeof comp === "number") comp = Chalkboard.comp.init(comp, 0);
            if (comp.hasOwnProperty("a") && comp.hasOwnProperty("b")) {
                const z = comp as ChalkboardComplex;
                return Chalkboard.comp.init(-z.a, -z.b);
            } else if (comp.hasOwnProperty("rule")) {
                if ((comp as ChalkboardFunction).field !== "comp") throw new TypeError("Chalkboard.comp.negate: Property 'field' of 'comp' must be 'comp'.");
                const f = (comp as ChalkboardFunction).rule as ((a: number, b: number) => number)[];
                const g = [(a: number, b: number) => -f[0](a, b), (a: number, b: number) => -f[1](a, b)];
                return Chalkboard.comp.define(...g);
            }
            throw new TypeError("Chalkboard.comp.negate: Parameter 'comp' must be of type ChalkboardComplex, number, or ChalkboardFunction.");
        };

        /**
         * Calculates the normalization of a complex number.
         * @param {ChalkboardComplex} comp - The complex number
         * @returns {ChalkboardComplex}
         * @example
         * // Returns 0.6 + 0.8i
         * const unit = Chalkboard.comp.normalize(Chalkboard.comp.init(3, 4));
         */
        export const normalize = (comp: ChalkboardComplex): ChalkboardComplex => {
            return Chalkboard.comp.init(comp.a / Chalkboard.comp.mag(comp), comp.b / Chalkboard.comp.mag(comp));
        };

        /**
         * Parses, simplifies, and optionally evaluates a complex number expression.
         * @param {string} expr - The complex number expression to parse
         * @param {Record<string, number>} [config.values] - Optional object mapping variable names to values
         * @param {number} [config.roundTo] - Optional number of decimal places to round the result to
         * @param {boolean} [config.returnAST=false] - If true, returns an abstract syntax tree (AST) instead of a string
         * @param {boolean} [config.returnJSON=false] - If true, returns an AST in JSON instead of a string
         * @param {boolean} [config.returnLaTeX=false] - If true, returns LaTeX code instead of a string
         * @returns {string | ChalkboardComplex | { type: string, [key: string]: any }}
         * @example
         * // Returns -2 + 4i
         * const expr1 = Chalkboard.comp.parse("z^2 + 1", { values: { z: Chalkboard.comp.init(1, 2) } });
         * 
         * // Returns 16x^4 + 81y^4 + 96x^3y + 216x^2y^2 + 216y^3x
         * const expr2 = Chalkboard.comp.parse("(2x + 3y)^4");
         * 
         * // Returns -23.0631 + 18.6612i
         * const expr3 = Chalkboard.comp.parse("(1 + exp(2i))(3 + sin(4i))");
         * 
         * // Returns w\mathrm{exp}\left(z\right) + \mathrm{exp}\left(z\right)
         * const expr4 = Chalkboard.comp.parse("exp(z)(w + 1)", { returnLaTeX: true });
         * 
         * // Returns {"type":"add","left":{"type":"mul","left":{"type":"var","name":"w"},"right":{"type":"func","name":"exp","args":[{"type":"var","name":"z"}]}},"right":{"type":"func","name":"exp","args":[{"type":"var","name":"z"}]}}
         * const expr5 = Chalkboard.comp.parse("exp(z)(w + 1)", { returnJSON: true });
         */
        export const parse = (
            expr: string,
            config: {
                values?: Record<string, ChalkboardComplex>,
                roundTo?: number,
                returnAST?: boolean,
                returnJSON?: boolean,
                returnLaTeX?: boolean
            } = { returnAST: false, returnJSON: false, returnLaTeX: false }
        ): string | ChalkboardComplex | { type: string, [key: string]: any } => {
            const tokenize = (input: string): string[] => {
                const tokens: string[] = [];
                let i = 0;
                const registered = ["sin", "cos", "tan", "abs", "sq", "sqrt", "root", "ln", "exp", "conj", "conjugate", "invert", "mag", "arg", "re", "im"];
                const isFunction = (name: string): boolean => registered.includes(name) || Chalkboard.REGISTRY[name] !== undefined;
                while (i < input.length) {
                    const ch = input[i];
                    if (/\s/.test(ch)) {
                        i++;
                        continue;
                    }
                    if ("+-*/(),^".indexOf(ch) !== -1) {
                        tokens.push(ch);
                        i++;
                        if (ch === ")" && i < input.length && (/[a-zA-Z0-9_i(]/.test(input[i]))) {
                            if (tokens[tokens.length - 1] !== "*") tokens.push("*");
                        }
                    } else if (ch === "i" && (i === 0 || !/[a-zA-Z0-9_]/.test(input[i - 1]))) {
                        tokens.push("i");
                        i++;
                        if (i < input.length && (/[a-zA-Z0-9_(]/.test(input[i]))) {
                            if (tokens[tokens.length - 1] !== "*") tokens.push("*");
                        }
                    } else if (/[0-9]/.test(ch) || (ch === "." && /[0-9]/.test(input[i + 1]))) {
                        let num = "";
                        let hasDecimal = false;
                        while (i < input.length && ((/[0-9]/.test(input[i])) || (input[i] === "." && !hasDecimal))) {
                            if (input[i] === ".") hasDecimal = true;
                            num += input[i++];
                        }
                        tokens.push(num);
                        if (i < input.length && input[i] === "i") {
                            if (tokens[tokens.length - 1] !== "*") tokens.push("*");
                            tokens.push("i");
                            i++;
                        }
                        if (i < input.length && (/[a-zA-Z_]/.test(input[i]) || input[i] === "(")) {
                            if (tokens[tokens.length - 1] !== "*") tokens.push("*");
                        }
                    } else if (/[a-zA-Z_]/.test(ch)) {
                        let name = "";
                        while (i < input.length && /[a-zA-Z0-9_]/.test(input[i])) {
                            name += input[i++];
                        }
                        if (/^[a-zA-Z]+$/.test(name) && name.length > 1 && !isFunction(name)) {
                            for (let j = 0; j < name.length; j++) {
                                tokens.push(name[j]);
                                if (j < name.length - 1) tokens.push("*");
                            }
                        } else {
                            tokens.push(name);
                        }
                        if (i < input.length && input[i] === "(") {
                            if (!isFunction(name)) {
                                if (tokens[tokens.length - 1] !== "*") tokens.push("*");
                            }
                        } else if (i < input.length && (/[a-zA-Z_]/.test(input[i]))) {
                            if (tokens[tokens.length - 1] !== "*") tokens.push("*");
                        }
                    } else {
                        throw new Error(`Chalkboard.comp.parse: Unexpected character ${ch}`);
                    }
                }
                return tokens;
            };
            const parseTokens = (tokens: string[]): { type: string, [key: string]: any } => {
                let pos = 0;
                const peek = (): string => tokens[pos] || "";
                const consume = (token?: string): string => {
                    if (token && tokens[pos] !== token) throw new Error(`Chalkboard.comp.parse: Expected token '${token}' but found '${tokens[pos]}'`);
                    return tokens[pos++];
                };
                const parseExpression = (): { type: string, [key: string]: any } => parseAdditive();
                const parseAdditive = (): { type: string, [key: string]: any } => {
                    let node = parseMultiplicative();
                    while (peek() === "+" || peek() === "-") {
                        const op = consume();
                        const right = parseMultiplicative();
                        node = { type: op === "+" ? "add" : "sub", left: node, right };
                    }
                    return node;
                };
                const parseMultiplicative = (): { type: string, [key: string]: any } => {
                    let node = parseUnary();
                    while (peek() === "*" || peek() === "/") {
                        const op = consume();
                        const right = parseUnary();
                        node = { type: op === "*" ? "mul" : "div", left: node, right };
                    }
                    return node;
                };
                const parseUnary = (): { type: string, [key: string]: any } => {
                    if (peek() === "-") {
                        consume("-");
                        return { type: "neg", expr: parseExponent() };
                    } else if (peek() === "+") {
                        consume("+");
                        return parseExponent();
                    }
                    return parseExponent();
                };
                const parseExponent = (): { type: string, [key: string]: any } => {
                    let node = parsePrimary();
                    if (peek() === "^") {
                        consume("^");
                        const right = parseExponentUnary();
                        node = { type: "pow", base: node, exponent: right };
                    }
                    return node;
                };
                const parseExponentUnary = (): { type: string, [key: string]: any } => {
                    if (peek() === "-") { consume("-"); return { type:"neg", expr: parseExponentUnary() }; }
                    if (peek() === "+") { consume("+"); return parseExponentUnary(); }
                    return parseExponent();
                };
                const parsePrimary = (): { type: string, [key: string]: any } => {
                    const token = peek();
                    if (/^-?[0-9]/.test(token) || /^-?\.[0-9]/.test(token)) {
                        consume();
                        return { type: "num", value: parseFloat(token) };
                    }
                    if (token === "i") {
                        consume();
                        return { type: "complex", a: 0, b: 1 };
                    }
                    if (/^[a-zA-Z_]/.test(token)) {
                        const name = consume();
                        if (peek() === "(") {
                            consume("(");
                            const args: { type: string, [key: string]: any }[] = [];
                            if (peek() !== ")") {
                                args.push(parseExpression());
                                while (peek() === ",") {
                                    consume(",");
                                    args.push(parseExpression());
                                }
                            }
                            consume(")");
                            return { type: "func", name, args };
                        }
                        return { type: "var", name };
                    }
                    if (token === "(") {
                        consume("(");
                        const node = parseExpression();
                        consume(")");
                        return node;
                    }
                    throw new Error(`Chalkboard.comp.parse: Unexpected token ${token}`);
                };
                const ast = parseExpression();
                if (pos < tokens.length) throw new Error(`Chalkboard.comp.parse: Unexpected token ${tokens[pos]}`);
                return ast;
            };
            const evaluateNode = (node: { type: string, [key: string]: any }, values: Record<string, ChalkboardComplex>): ChalkboardComplex => {
                switch (node.type) {
                    case "num": {
                        return Chalkboard.comp.init(node.value, 0);
                    }
                    case "complex": {
                        return Chalkboard.comp.init(node.a, node.b);
                    }
                    case "var": {
                        const varname = node.name;
                        if (varname in values) return values[varname];
                        throw new Error(`Chalkboard.comp.parse: Variable '${varname}' not defined in values`);
                    }
                    case "add": {
                        return Chalkboard.comp.add(evaluateNode(node.left, values), evaluateNode(node.right, values)) as ChalkboardComplex;
                    }
                    case "sub": {
                        return Chalkboard.comp.sub(evaluateNode(node.left, values), evaluateNode(node.right, values)) as ChalkboardComplex;
                    }
                    case "mul": {
                        return Chalkboard.comp.mul(evaluateNode(node.left, values), evaluateNode(node.right, values)) as ChalkboardComplex;
                    }
                    case "div": {
                        return Chalkboard.comp.div(evaluateNode(node.left, values), evaluateNode(node.right, values)) as ChalkboardComplex;
                    }
                    case "pow": {
                        const base = evaluateNode(node.base, values);
                        const exponent = evaluateNode(node.exponent, values);
                        if (exponent.b === 0) {
                            return Chalkboard.comp.pow(base, exponent.a) as ChalkboardComplex;
                        } else {
                            throw new Error("Chalkboard.comp.parse: Complex exponentiation with complex exponent not supported");
                        }
                    }
                    case "neg": {
                        return Chalkboard.comp.negate(evaluateNode(node.expr, values)) as ChalkboardComplex;
                    }
                    case "func": {
                        const funcName = node.name.toLowerCase();
                        const args = node.args.map((arg: { type: string, [key: string]: any }) => evaluateNode(arg, values));
                        if (Chalkboard.REGISTRY && Chalkboard.REGISTRY[funcName]) {
                            try {
                                const realArgs = args.map((arg: { type: string, [key: string]: any }) => {
                                    if (arg.b !== 0) throw new Error("Complex argument in real function");
                                    return arg.a;
                                });
                                const result = Chalkboard.REGISTRY[funcName](...realArgs);
                                return Chalkboard.comp.init(result, 0);
                            } catch (e) {}
                        }
                        switch (funcName) {
                            case "abs": {
                                return Chalkboard.comp.absolute(args[0]) as ChalkboardComplex;
                            }
                            case "conj":
                            case "conjugate": {
                                return Chalkboard.comp.conjugate(args[0]) as ChalkboardComplex;
                            }
                            case "mag": {
                                return Chalkboard.comp.init(Chalkboard.comp.mag(args[0]), 0);
                            }
                            case "arg": {
                                return Chalkboard.comp.init(Chalkboard.comp.arg(args[0]), 0);
                            }
                            case "re": {
                                return Chalkboard.comp.init(Chalkboard.comp.Re(args[0]) as number, 0);
                            }
                            case "im": {
                                return Chalkboard.comp.init(Chalkboard.comp.Im(args[0]) as number, 0);
                            }
                            case "ln": {
                                return Chalkboard.comp.ln(args[0]);
                            }
                            case "sin": {
                                return Chalkboard.comp.sin(args[0]) as ChalkboardComplex;
                            }
                            case "cos": {
                                return Chalkboard.comp.cos(args[0]) as ChalkboardComplex;
                            }
                            case "tan": {
                                return Chalkboard.comp.tan(args[0]) as ChalkboardComplex;
                            }
                            case "exp": {
                                return Chalkboard.comp.exp(args[0]) as ChalkboardComplex;
                            }
                            case "invert": {
                                return Chalkboard.comp.invert(args[0]);
                            }
                            case "sq": {
                                return Chalkboard.comp.sq(args[0]) as ChalkboardComplex;
                            }
                            case "sqrt": {
                                return Chalkboard.comp.sqrt(args[0]) as ChalkboardComplex;
                            }
                            case "pow": {
                                if (args.length < 2) throw new Error("Chalkboard.comp.parse: Function pow requires two arguments");
                                return Chalkboard.comp.pow(args[0], args[1].a) as ChalkboardComplex;
                            }
                            case "root": {
                                if (args.length < 2) throw new Error("Chalkboard.comp.parse: Function root requires two arguments");
                                const index = args[1].a;
                                if (!Number.isInteger(index) || index <= 0) throw new Error("Chalkboard.comp.parse: Root index must be a positive integer");
                                return Chalkboard.comp.root(args[0], index)[0];
                            }
                            default: {
                                throw new Error(`Chalkboard.comp.parse: Unknown function ${node.name}`);
                            }
                        }
                    }
                }
                throw new Error(`Chalkboard.comp.parse: Unknown node type ${node.type}`);
            };
            const needsParensInPow = (z: { a: number, b: number }): boolean => {
                if (z.b === 0) return false;
                if (z.a === 0 && (z.b === 1 || z.b === -1)) return false;
                return true;
            };
            const nodeToString = (node: { type: string, [key: string]: any }): string => {
                switch (node.type) {
                    case "num": {
                        return node.value.toString();
                    }
                    case "complex": {
                        if (node.a === 0 && node.b === 1) return "i";
                        if (node.a === 0 && node.b === -1) return "-i";
                        if (node.a === 0) return `${node.b}i`;
                        if (node.b === 0) return node.a.toString();
                        if (node.b === 1) return `${node.a} + i`;
                        if (node.b === -1) return `${node.a} - i`;
                        return node.b > 0 ? `${node.a} + ${node.b}i` : `${node.a} - ${-node.b}i`;
                    }
                    case "var": {
                        return node.name;
                    }
                    case "add": {
                        const rightStr = nodeToString(node.right);
                        if (rightStr.startsWith("-")) return `${nodeToString(node.left)} - ${rightStr.slice(1)}`;
                        return `${nodeToString(node.left)} + ${rightStr}`;
                    }
                    case "sub": {
                        const rightStr = node.right.type === "add" || node.right.type === "sub" ? `(${nodeToString(node.right)})` : nodeToString(node.right);
                        return `${nodeToString(node.left)} - ${rightStr}`;
                    }
                    case "mul": {
                        if (node.left.type === "num" && node.left.value === 1) return nodeToString(node.right);
                        if (node.right.type === "num" && node.right.value === 1) return nodeToString(node.left);
                        const leftMul = (node.left.type === "add" || node.left.type === "sub") ? `(${nodeToString(node.left)})` : nodeToString(node.left);
                        const rightMul = (node.right.type === "add" || node.right.type === "sub") ? `(${nodeToString(node.right)})` : nodeToString(node.right);
                        if (node.left.type === "num" && node.left.value === -1 && node.right.type === "var") return `-${nodeToString(node.right)}`;
                        if (node.left.type === "num" && node.left.value === -1 && node.right.type === "pow") return `-${nodeToString(node.right)}`;
                        if ((node.left.type === "num" || node.left.type === "complex") && (node.right.type === "var" || (node.right.type === "complex" && node.right.a === 0 && node.right.b === 1))) {
                            return `${leftMul}${rightMul}`;
                        } else {
                            return `${leftMul} * ${rightMul}`;
                        }
                    }
                    case "div": {
                        const powNode = { type: "pow", base: node.right, exponent: { type: "num", value: -1 } };
                        const mulNode = { type: "mul", left: node.left, right: powNode };
                        return nodeToString(mulNode);
                    }
                    case "pow": {
                        const baseIsComplex = node.base?.type === "complex";
                        const baseStrRaw = nodeToString(node.base);
                        const baseStr =
                            baseIsComplex && needsParensInPow(node.base)
                                ? `(${baseStrRaw})`
                                : (node.base.type !== "num" && node.base.type !== "var" && node.base.type !== "complex")
                                    ? `(${baseStrRaw})`
                                    : baseStrRaw;

                        const expStr = (node.exponent.type !== "num" && node.exponent.type !== "var" && node.exponent.type !== "complex") ? `(${nodeToString(node.exponent)})` : nodeToString(node.exponent);
                        return `${baseStr}^${expStr}`;
                    }
                    case "neg": {
                        const exprStr = (node.expr.type !== "num" && node.expr.type !== "var" && node.expr.type !== "complex") ? `(${nodeToString(node.expr)})` : nodeToString(node.expr);
                        return `-${exprStr}`;
                    }
                    case "func": {
                        return `${node.name}(${node.args.map((arg: { type: string, [key: string]: any }) => nodeToString(arg)).join(", ")})`;
                    }
                }
                return "";
            };
            const nodeToLaTeX = (node: { type: string, [key: string]: any }): string => {
                switch (node.type) {
                    case "num": {
                        return node.value.toString();
                    }
                    case "complex": {
                        const re = node.a !== 0 ? node.a.toString() : "";
                        const im = node.b !== 0 ? (node.b === 1 ? "i" : node.b === -1 ? "-i" : `${node.b}i`) : "";
                        if (re && im) {
                            return node.b > 0 ? `${re} + ${im}` : `${re} - ${im.slice(1)}`;
                        }
                        return re || im || "0";
                    }
                    case "var": {
                        return node.name;
                    }
                    case "add": {
                        const right = nodeToLaTeX(node.right);
                        if (right.startsWith("-")) return `${nodeToLaTeX(node.left)} - ${right.slice(1)}`;
                        return `${nodeToLaTeX(node.left)} + ${right}`;
                    }
                    case "sub": {
                        const right = nodeToLaTeX(node.right);
                        if (right.startsWith("-")) return `${nodeToLaTeX(node.left)} + ${right.slice(1)}`;
                        return `${nodeToLaTeX(node.left)} - ${right}`;
                    }
                    case "mul": {
                        const isAtomicLaTeX = (n: any): boolean => n.type === "num" || n.type === "var" || n.type === "complex" || n.type === "pow" || n.type === "func";
                        const wrapIfNeeded = (n: any): string => {
                            const s = nodeToLaTeX(n);
                            if (n.type === "add" || n.type === "sub") return `\\left(${s}\\right)`;
                            return s;
                        };
                        const left = wrapIfNeeded(node.left);
                        const right = wrapIfNeeded(node.right);
                        if (isAtomicLaTeX(node.left) && isAtomicLaTeX(node.right)) return `${left}${right}`;
                        return `${left} \\cdot ${right}`;
                    }
                    case "div": {
                        return `\\frac{${nodeToLaTeX(node.left)}}{${nodeToLaTeX(node.right)}}`;
                    }
                    case "pow": {
                        return `${nodeToLaTeX(node.base)}^{${nodeToLaTeX(node.exponent)}}`;
                    }
                    case "neg": {
                        return `-${nodeToLaTeX(node.expr)}`;
                    }
                    case "func": {
                        return `\\mathrm{${node.name}}\\left(${node.args.map(nodeToLaTeX).join(", ")}\\right)`;
                    }
                    default: {
                        throw new Error(`Chalkboard.comp.parse: Unknown node type ${node.type}`);
                    }
                }
            };
            const areEqualVars = (a: { type: string, [key: string]: any }, b: { type: string, [key: string]: any }): boolean => {
                if (a.type === "var" && b.type === "var") return a.name === b.name;
                if (a.type === "complex" && b.type === "complex") return a.a === b.a && a.b === b.b;
                return JSON.stringify(a) === JSON.stringify(b);
            };
            const simplifyNode = (node: { type: string, [key: string]: any }): { type: string, [key: string]: any } => {
                switch (node.type) {
                    case "num": {
                        return { type: "complex", a: node.value, b: 0 };
                    }
                    case "complex": {
                        return node;
                    }
                    case "var": {
                        return node;
                    }
                    case "add": {
                        const leftAdd = simplifyNode(node.left);
                        const rightAdd = simplifyNode(node.right);
                        if (leftAdd.type === "complex" && rightAdd.type === "complex") return { type: "complex", a: leftAdd.a + rightAdd.a, b: leftAdd.b + rightAdd.b };
                        if (leftAdd.type === "complex" && leftAdd.a === 0 && leftAdd.b === 0) return rightAdd;
                        if (rightAdd.type === "complex" && rightAdd.a === 0 && rightAdd.b === 0) return leftAdd;
                        if (areEqualVars(leftAdd, rightAdd)) return { type: "mul", left: { type: "num", value: 2 }, right: leftAdd };
                        return { type: "add", left: leftAdd, right: rightAdd };
                    }
                    case "sub": {
                        const leftSub = simplifyNode(node.left);
                        const rightSub = simplifyNode(node.right);
                        if (leftSub.type === "complex" && rightSub.type === "complex") return { type: "complex", a: leftSub.a - rightSub.a, b: leftSub.b - rightSub.b };
                        if (rightSub.type === "complex" && rightSub.a === 0 && rightSub.b === 0) return leftSub;
                        if (leftSub.type === "complex" && leftSub.a === 0 && leftSub.b === 0) return { type: "neg", expr: rightSub };
                        if (areEqualVars(leftSub, rightSub)) return { type: "complex", a: 0, b: 0 };
                        return { type: "sub", left: leftSub, right: rightSub };
                    }
                    case "mul": {
                        const leftMul = simplifyNode(node.left);
                        const rightMul = simplifyNode(node.right);
                        if ((leftMul.type === "add" || leftMul.type === "sub") && (rightMul.type === "add" || rightMul.type === "sub")) {
                            const extractTerms = (node: any): any[] => {
                                if (node.type === "add") {
                                    return [...extractTerms(node.left), ...extractTerms(node.right)];
                                } else if (node.type === "sub") {
                                    const rightTerms = extractTerms(node.right).map(term => ({
                                        type: "neg",
                                        expr: term
                                    }));
                                    return [...extractTerms(node.left), ...rightTerms];
                                } else {
                                    return [node];
                                }
                            };
                            const leftTerms = extractTerms(leftMul);
                            const rightTerms = extractTerms(rightMul);
                            const products = [];
                            for (const leftTerm of leftTerms) {
                                for (const rightTerm of rightTerms) {
                                    if (leftTerm.type === "neg" && rightTerm.type === "neg") {
                                        products.push(simplifyNode({ type: "mul", left: leftTerm.expr, right: rightTerm.expr }));
                                    } else if (leftTerm.type === "neg") {
                                        products.push(simplifyNode({ type: "neg", expr: { type: "mul", left: leftTerm.expr, right: rightTerm } }));
                                    } else if (rightTerm.type === "neg") {
                                        products.push(simplifyNode({ type: "neg", expr: { type: "mul", left: leftTerm, right: rightTerm.expr } }));
                                    } else {
                                        products.push(simplifyNode({ type: "mul", left: leftTerm, right: rightTerm }));
                                    }
                                }
                            }
                            let result = products[0];
                            for (let i = 1; i < products.length; i++) {
                                result = {
                                    type: "add",
                                    left: result,
                                    right: products[i]
                                };
                            }
                            return simplifyNode(result);
                        }
                        if (leftMul.type === "complex" && rightMul.type === "complex") return { type: "complex", a: leftMul.a * rightMul.a - leftMul.b * rightMul.b, b: leftMul.a * rightMul.b + leftMul.b * rightMul.a };
                        if ((leftMul.type === "complex" && leftMul.a === 0 && leftMul.b === 0) || (rightMul.type === "complex" && rightMul.a === 0 && rightMul.b === 0)) return { type: "complex", a: 0, b: 0 };
                        if (leftMul.type === "complex" && leftMul.a === 1 && leftMul.b === 0) return rightMul;
                        if (rightMul.type === "complex" && rightMul.a === 1 && rightMul.b === 0) return leftMul;
                        if (leftMul.type === "complex" && leftMul.a === 0 && leftMul.b === 1 && rightMul.type === "complex") return { type: "complex", a: -rightMul.b, b: rightMul.a };
                        return { type: "mul", left: leftMul, right: rightMul };
                    }
                    case "div": {
                        const leftDiv = simplifyNode(node.left);
                        const rightDiv = simplifyNode(node.right);
                        if (leftDiv.type === "add" || leftDiv.type === "sub") {
                            const left = { type: "div", left: leftDiv.left, right: JSON.parse(JSON.stringify(rightDiv)) };
                            const right = { type: "div", left: leftDiv.right, right: JSON.parse(JSON.stringify(rightDiv)) };
                            return { type: leftDiv.type, left: simplifyNode(left), right: simplifyNode(right) };
                        }
                        if (leftDiv.type === "complex" && rightDiv.type === "complex") {
                            const denominator = rightDiv.a * rightDiv.a + rightDiv.b * rightDiv.b;
                            if (denominator === 0) throw new Error("Chalkboard.comp.parse: Division by zero.");
                            return { type: "complex", a: (leftDiv.a * rightDiv.a + leftDiv.b * rightDiv.b) / denominator, b: (leftDiv.b * rightDiv.a - leftDiv.a * rightDiv.b) / denominator };
                        }
                        if (rightDiv.type === "complex" && rightDiv.a === 1 && rightDiv.b === 0) return leftDiv;
                        if (leftDiv.type === "complex" && leftDiv.a === 0 && leftDiv.b === 0) return { type: "complex", a: 0, b: 0 };
                        return { type: "div", left: leftDiv, right: rightDiv };
                    }
                    case "pow": {
                        const base = simplifyNode(node.base);
                        const exponent = simplifyNode(node.exponent);
                        return { type: "pow", base, exponent };
                    }
                    case "neg": {
                        const expr = simplifyNode(node.expr);
                        if (expr.type === "complex") return { type: "complex", a: -expr.a, b: -expr.b };
                        if (expr.type === "neg") return expr.expr;
                        return { type: "neg", expr };
                    }
                    case "func": {
                        const args = node.args.map((arg: { type: string, [key: string]: any }) => simplifyNode(arg));
                        return { type: "func", name: node.name, args };
                    }
                }
                return node;
            };
            const isRealOnly = (node: { type: string, [key: string]: any }): boolean => {
                switch (node.type) {
                    case "num": return true;
                    case "var": return true;
                    case "complex": return node.b === 0;
                    case "neg": return isRealOnly(node.expr);
                    case "add":
                    case "sub":
                    case "mul":
                    case "div": return isRealOnly(node.left) && isRealOnly(node.right);
                    case "pow": return isRealOnly(node.base) && isRealOnly(node.exponent);
                    case "func": return node.args.every(isRealOnly);
                    default: return false;
                }
            };
            const realNum = (n: number): any => ({ type: "num", value: n });
            const realAdd = (l: any, r: any): any => ({ type: "add", left: l, right: r });
            const realSub = (l: any, r: any): any => ({ type: "sub", left: l, right: r });
            const realMul = (l: any, r: any): any => ({ type: "mul", left: l, right: r });
            const realDiv = (l: any, r: any): any => ({ type: "div", left: l, right: r });
            const realPow = (b: any, e: any): any => ({ type: "pow", base: b, exponent: e });
            const realNeg = (x: any): any => ({ type: "neg", expr: x });
            const realNodeToString = (node: any): string => {
                switch (node.type) {
                    case "num": return node.value.toString();
                    case "var": return node.name;
                    case "add": return `${realNodeToString(node.left)} + ${realNodeToString(node.right)}`;
                    case "sub": return `${realNodeToString(node.left)} - ${realNodeToString(node.right)}`;
                    case "mul": {
                        const L = (node.left.type === "add" || node.left.type === "sub") ? `(${realNodeToString(node.left)})` : realNodeToString(node.left);
                        const R = (node.right.type === "add" || node.right.type === "sub") ? `(${realNodeToString(node.right)})` : realNodeToString(node.right);
                        return `${L} * ${R}`;
                    }
                    case "div": {
                        const L = (node.left.type === "add" || node.left.type === "sub") ? `(${realNodeToString(node.left)})` : realNodeToString(node.left);
                        const R = (node.right.type === "add" || node.right.type === "sub") ? `(${realNodeToString(node.right)})` : realNodeToString(node.right);
                        return `${L} / ${R}`;
                    }
                    case "pow": {
                        const B = (node.base.type === "num" || node.base.type === "var") ? realNodeToString(node.base) : `(${realNodeToString(node.base)})`;
                        const E = (node.exponent.type === "num" || node.exponent.type === "var") ? realNodeToString(node.exponent) : `(${realNodeToString(node.exponent)})`;
                        return `${B}^${E}`;
                    }
                    case "neg": {
                        const inner = (node.expr.type === "num" || node.expr.type === "var") ? realNodeToString(node.expr) : `(${realNodeToString(node.expr)})`;
                        return `-${inner}`;
                    }
                    default: {
                        throw new Error(`Chalkboard.comp.parse: Unsupported real-node type ${node.type}`);
                    }
                }
            };
            const simplifyRealString = (s: string): string => {
                return Chalkboard.real.parse(s, {
                    roundTo: config.roundTo,
                    returnAST: false,
                    returnJSON: false,
                    returnLaTeX: false
                }) as string;
            };
            const toReIm = (node: any): { re: any, im: any } => {
                switch (node.type) {
                    case "num": {
                        return { re: realNum(node.value), im: realNum(0) };
                    }
                    case "var": {
                        if (node.name === "i") return { re: realNum(0), im: realNum(1) };
                        return { re: { type: "var", name: node.name }, im: realNum(0) };
                    }
                    case "complex": {
                        return { re: realNum(node.a), im: realNum(node.b) };
                    }
                    case "neg": {
                        const p = toReIm(node.expr);
                        return { re: realNeg(p.re), im: realNeg(p.im) };
                    }
                    case "add": {
                        const L = toReIm(node.left);
                        const R = toReIm(node.right);
                        return { re: realAdd(L.re, R.re), im: realAdd(L.im, R.im) };
                    }
                    case "sub": {
                        const L = toReIm(node.left);
                        const R = toReIm(node.right);
                        return { re: realSub(L.re, R.re), im: realSub(L.im, R.im) };
                    }
                    case "mul": {
                        const L = toReIm(node.left);
                        const R = toReIm(node.right);
                        const ac = realMul(L.re, R.re);
                        const bd = realMul(L.im, R.im);
                        const ad = realMul(L.re, R.im);
                        const bc = realMul(L.im, R.re);
                        return { re: realSub(ac, bd), im: realAdd(ad, bc) };
                    }
                    case "div": {
                        const L = toReIm(node.left);
                        const R = toReIm(node.right);
                        const c2 = realPow(R.re, realNum(2));
                        const d2 = realPow(R.im, realNum(2));
                        const denom = realAdd(c2, d2);
                        const ac = realMul(L.re, R.re);
                        const bd = realMul(L.im, R.im);
                        const bc = realMul(L.im, R.re);
                        const ad = realMul(L.re, R.im);
                        const reNum = realAdd(ac, bd);
                        const imNum = realSub(bc, ad);
                        return { re: realDiv(reNum, denom), im: realDiv(imNum, denom) };
                    }
                    case "pow": {
                        const expParts = toReIm(node.exponent);
                        const expImStr = simplifyRealString(realNodeToString(expParts.im));
                        if (expImStr !== "0") throw new Error("Chalkboard.comp.parse: Complex exponent not supported in symbolic splitting.");
                        const expReStr = simplifyRealString(realNodeToString(expParts.re));
                        const n = Number(expReStr);
                        if (!Number.isInteger(n)) throw new Error("Chalkboard.comp.parse: Non-integer exponent not supported in symbolic splitting.");
                        const baseParts = toReIm(node.base);
                        let re = realNum(1);
                        let im = realNum(0);
                        const steps = Math.abs(n);
                        for (let i = 0; i < steps; i++) {
                            const a = re;
                            const b = im;
                            const c = baseParts.re;
                            const d = baseParts.im;
                            const newRe = realSub(realMul(a, c), realMul(b, d));
                            const newIm = realAdd(realMul(a, d), realMul(b, c));
                            re = newRe;
                            im = newIm;
                        }
                        if (n < 0) {
                            const denom = realAdd(realPow(re, realNum(2)), realPow(im, realNum(2)));
                            const reInv = realDiv(re, denom);
                            const imInv = realNeg(realDiv(im, denom));
                            return { re: reInv, im: imInv };
                        }
                        return { re, im };
                    }
                    case "func": {
                        throw new Error(`Chalkboard.comp.parse: Symbolic splitting for function '${node.name}' not supported.`);
                    }
                }
                throw new Error(`Chalkboard.comp.parse: Unsupported node type '${node.type}' in symbolic splitting.`);
            };
            const combineReImStrings = (reStr: string, imStr: string): string => {
                const reS = reStr.trim();
                const imS = imStr.trim();
                const isZero = (s: string): boolean => s === "0" || s === "0.0";
                const needsParens = (s: string): boolean => {
                    return s.includes(" + ") || s.includes(" - ");
                };
                if (isZero(imS)) return reS;
                if (isZero(reS)) {
                    if (imS === "1") return "i";
                    if (imS === "-1") return "-i";
                    return needsParens(imS) ? `(${imS})i` : `${imS}i`;
                }
                const imWithI = imS === "1" ? "i" : imS === "-1" ? "-i" : needsParens(imS) ? `(${imS})i` : `${imS}i`;
                if (!needsParens(imS) && imS.startsWith("-")) {
                    const mag = imS.slice(1);
                    if (mag === "1") return `${reS} - i`;
                    return `${reS} - ${mag}i`;
                } else {
                    if (imWithI.startsWith("-")) return `${reS} - ${imWithI.slice(1)}`;
                    return `${reS} + ${imWithI}`;
                }
            };
            try {
                const tokens = tokenize(expr);
                const ast = parseTokens(tokens);
                const hasVars = (node: { type: string, [key: string]: any }): boolean => {
                    switch (node.type) {
                        case "var": return true;
                        case "num": return false;
                        case "complex": return false;
                        case "neg": return hasVars(node.expr);
                        case "add":
                        case "sub":
                        case "mul":
                        case "div": return hasVars(node.left) || hasVars(node.right);
                        case "pow": return hasVars(node.base) || hasVars(node.exponent);
                        case "func": return node.args.some(hasVars);
                        default: return false;
                    }
                };
                if (!config.returnAST && !config.returnJSON) {
                    const values = config.values || {};
                    if ((config.values && Object.keys(config.values).length > 0) || !hasVars(ast)) {
                        try {
                            let result = evaluateNode(ast, values);
                            if (config.roundTo !== undefined) {
                                result = Chalkboard.comp.init(
                                    Chalkboard.numb.roundTo(result.a, config.roundTo),
                                    Chalkboard.numb.roundTo(result.b, config.roundTo)
                                );
                            }
                            if (config.returnLaTeX) return nodeToLaTeX({ type: "complex", a: result.a, b: result.b });
                            return result;
                        } catch (e) {
                            
                        }
                    }
                }
                if (isRealOnly(ast)) {
                    return Chalkboard.real.parse(expr, {
                        roundTo: config.roundTo,
                        returnAST: config.returnAST,
                        returnJSON: config.returnJSON,
                        returnLaTeX: config.returnLaTeX
                    }) as any;
                }
                if (!config.returnAST && !config.returnJSON) {
                    try {
                        const parts = toReIm(ast);
                        const reExprStr = realNodeToString(parts.re);
                        const imExprStr = realNodeToString(parts.im);
                        if (reExprStr.includes("i") || imExprStr.includes("i")) {
                            throw new Error("Chalkboard.comp.parse: Internal error: 'i' leaked into real split.");
                        }
                        const reSimpl = simplifyRealString(reExprStr);
                        const imSimpl = simplifyRealString(imExprStr);
                        if (config.returnLaTeX) {
                            const reTex = Chalkboard.real.parse(reExprStr, { returnLaTeX: true, roundTo: config.roundTo }) as string;
                            const imTex = Chalkboard.real.parse(imExprStr, { returnLaTeX: true, roundTo: config.roundTo }) as string;
                            if (imTex.trim() === "0") return reTex;
                            if (reTex.trim() === "0") return `${imTex}i`;
                            return `${reTex} + ${String.raw`\left(${imTex}\right)`}i`;
                        }
                        return combineReImStrings(reSimpl, imSimpl);
                    } catch (e) {

                    }
                }
                let simplified = simplifyNode(ast);
                simplified = simplifyNode(simplified);
                if (config.roundTo !== undefined) {
                    const roundNodes = (node: { type: string, [key: string]: any }): { type: string, [key: string]: any } => {
                        if (node.type === "num") return { ...node, value: Chalkboard.numb.roundTo(node.value, config.roundTo!) };
                        if (node.type === "complex") return { ...node, a: Chalkboard.numb.roundTo(node.a, config.roundTo!), b: Chalkboard.numb.roundTo(node.b, config.roundTo!) };
                        const n = Object.keys(node).length;
                        for (let i = 0; i < n; i++) {
                            const key = Object.keys(node)[i];
                            if (key !== "type" && node[key] && typeof node[key] === "object" && "type" in node[key]) node[key] = roundNodes(node[key]);
                        }
                        return node;
                    };
                    simplified = roundNodes(simplified);
                }
                if (config.returnAST) return simplified;
                if (config.returnJSON) return JSON.stringify(simplified);
                if (config.returnLaTeX) {
                    return nodeToLaTeX(simplified);
                }
                return nodeToString(simplified);
            } catch (err) {
                if (err instanceof Error) {
                    throw new Error(`Chalkboard.comp.parse: Error parsing complex expression ${err.message}`);
                } else {
                    throw new Error(`Chalkboard.comp.parse: Error parsing complex expression ${String(err)}`);
                }
            }
        };

        /**
         * Calculates the exponentiation of a complex number or function.
         * @param {ChalkboardComplex | number | ChalkboardFunction} comp - The complex number or function
         * @param {number} num - The exponent
         * @returns {ChalkboardComplex | ChalkboardFunction}
         * @example
         * // Returns -11 + 2i
         * const pow = Chalkboard.comp.pow(Chalkboard.comp.init(2, 1), 3);
         */
        export const pow = (comp: ChalkboardComplex | number | ChalkboardFunction, num: number): ChalkboardComplex | ChalkboardFunction => {
            if (typeof comp === "number") comp = Chalkboard.comp.init(comp, 0);
            if (comp.hasOwnProperty("a") && comp.hasOwnProperty("b")) {
                const z = comp as ChalkboardComplex;
                const mag = Chalkboard.comp.mag(z);
                const arg = Chalkboard.comp.arg(z);
                return Chalkboard.comp.init(
                    (Chalkboard.real.pow(mag, num) as number) * Chalkboard.trig.cos(num * arg),
                    (Chalkboard.real.pow(mag, num) as number) * Chalkboard.trig.sin(num * arg)
                );
            } else if (comp.hasOwnProperty("rule")) {
                if ((comp as ChalkboardFunction).field !== "comp") throw new TypeError("Chalkboard.comp.pow: Property 'field' of 'comp' must be 'comp'.");
                const f = (comp as ChalkboardFunction).rule as ((a: number, b: number) => number)[];
                const g = [
                    (a: number, b: number) => {
                        const mag = Chalkboard.real.sqrt(f[0](a, b) * f[0](a, b) + f[1](a, b) * f[1](a, b));
                        const arg = Chalkboard.trig.arctan2(f[1](a, b), f[0](a, b));
                        return (Chalkboard.real.pow(mag, num) as number) * Chalkboard.trig.cos(num * arg);
                    },
                    (a: number, b: number) => {
                        const mag = Chalkboard.real.sqrt(f[0](a, b) * f[0](a, b) + f[1](a, b) * f[1](a, b));
                        const arg = Chalkboard.trig.arctan2(f[1](a, b), f[0](a, b));
                        return (Chalkboard.real.pow(mag, num) as number) * Chalkboard.trig.sin(num * arg);
                    }
                ];
                return Chalkboard.comp.define(...g);
            }
            throw new TypeError("Chalkboard.comp.pow: Parameter 'comp' must be of type ChalkboardComplex, number, or ChalkboardFunction.");
        };

        /**
         * Prints a complex number in the console.
         * @param {ChalkboardComplex} comp - The complex number
         * @returns {void}
         * @example
         * // Prints "2 + 3i" in the console
         * Chalkboard.comp.print(Chalkboard.comp.init(2, 3));
         */
        export const print = (comp: ChalkboardComplex): void => {
            console.log(Chalkboard.comp.toString(comp));
        };

        /**
         * Initializes a random complex number.
         * @param {number} [inf=0] - The lower bound
         * @param {number} [sup=1] - The upper bound
         * @returns {ChalkboardComplex}
         * @example
         * // Returns a random complex number with real and imaginary parts between 0 and 1
         * const z = Chalkboard.comp.random();
         */
        export const random = (inf: number = 0, sup: number = 1): ChalkboardComplex => {
            return Chalkboard.comp.init(Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup));
        };

        /**
         * Returns the real part of a complex function or a complex number.
         * @param {ChalkboardFunction | ChalkboardComplex} funcORcomp - The complex function or complex number
         * @returns {Function | ChalkboardComplex}
         * @example
         * // Returns 2
         * const re = Chalkboard.comp.Re(Chalkboard.comp.init(2, 3));
         */
        export const Re = (funcORcomp: ChalkboardFunction | ChalkboardComplex): Function | number => {
            if (funcORcomp.hasOwnProperty("rule")) {
                return ((funcORcomp as ChalkboardFunction).rule as ([(a: number, b: number) => number, (a: number, b: number) => number]))[0];
            } else {
                return (funcORcomp as ChalkboardComplex).a;
            }
        };

        /**
         * Calculates the reciprocal of a complex number or function.
         * @param {ChalkboardComplex | number | ChalkboardFunction} comp - The complex number or function
         * @returns {ChalkboardComplex | ChalkboardFunction}
         * @example
         * // Returns 0.5 + 0.3333i
         * const reciprocated = Chalkboard.comp.reciprocate(Chalkboard.comp.init(2, 3));
         */
        export const reciprocate = (comp: ChalkboardComplex | number | ChalkboardFunction): ChalkboardComplex | ChalkboardFunction => {
            if (typeof comp === "number") comp = Chalkboard.comp.init(comp, 0);
            if (comp.hasOwnProperty("a") && comp.hasOwnProperty("b")) {
                const z = comp as ChalkboardComplex;
                return Chalkboard.comp.init(1 / z.a, 1 / z.b);
            } else if (comp.hasOwnProperty("rule")) {
                if ((comp as ChalkboardFunction).field !== "comp") throw new TypeError("Chalkboard.comp.reciprocate: Property 'field' of 'comp' must be 'comp'.");
                const f = (comp as ChalkboardFunction).rule as ((a: number, b: number) => number)[];
                const g = [(a: number, b: number) => 1 / f[0](a, b), (a: number, b: number) => 1 / f[1](a, b)];
                return Chalkboard.comp.define(...g);
            }
            throw new TypeError("Chalkboard.comp.reciprocate: Parameter 'comp' must be of type ChalkboardComplex, number, or ChalkboardFunction.");
        };

        /**
         * Calculates the nth-root of a complex number.
         * @param {ChalkboardComplex} comp - The complex number
         * @param {number} [index=3] - The index
         * @returns {ChalkboardComplex}
         * @example
         * // Returns an array of cube roots of 8
         * const roots = Chalkboard.comp.root(Chalkboard.comp.init(8), 3);
         */
        export const root = (comp: ChalkboardComplex, index: number = 3): ChalkboardComplex[] => {
            const result = [];
            const r = Chalkboard.comp.mag(comp);
            const t = Chalkboard.comp.arg(comp);
            for (let i = 0; i < index; i++) {
                result.push(
                    Chalkboard.comp.init(
                        Chalkboard.real.root(r, index) * Chalkboard.trig.cos((t + Chalkboard.PI(2 * i)) / index),
                        Chalkboard.real.root(r, index) * Chalkboard.trig.sin((t + Chalkboard.PI(2 * i)) / index)
                    )
                );
            }
            return result;
        };

        /**
         * Calculates the rotation of a complex number.
         * @param {ChalkboardComplex} comp - The complex number
         * @param {number} rad - The radians to rotate by
         * @returns {ChalkboardComplex}
         * @example
         * // Returns 0 + 1i (1 rotated by π/2 radians)
         * const rotated = Chalkboard.comp.rotate(Chalkboard.comp.init(1, 0), Chalkboard.PI(0.5));
         */
        export const rotate = (comp: ChalkboardComplex, rad: number): ChalkboardComplex => {
            return Chalkboard.comp.init(
                Chalkboard.comp.mag(comp) * Chalkboard.trig.cos(Chalkboard.comp.arg(comp) + rad),
                Chalkboard.comp.mag(comp) * Chalkboard.trig.sin(Chalkboard.comp.arg(comp) + rad)
            );
        };

        /**
         * Calculates the rounding of a complex number.
         * @param {ChalkboardComplex} comp - The complex number
         * @returns {ChalkboardComplex}
         * @example
         * // Returns 2 + 3i
         * const rounded = Chalkboard.comp.round(Chalkboard.comp.init(1.9, 3.4));
         */
        export const round = (comp: ChalkboardComplex): ChalkboardComplex => {
            return Chalkboard.comp.init(Math.round(comp.a), Math.round(comp.b));
        };

        /**
         * Calculates the scalar multiplication of a complex number or function.
         * @param {ChalkboardComplex | number | ChalkboardFunction} comp - The complex number or function
         * @param {number} num - The scalar
         * @returns {ChalkboardComplex | ChalkboardFunction}
         * @example
         * // Returns 6 + 9i
         * const scaled = Chalkboard.comp.scl(Chalkboard.comp.init(2, 3), 3);
         */
        export const scl = (comp: ChalkboardComplex | number | ChalkboardFunction, num: number): ChalkboardComplex | ChalkboardFunction => {
            if (typeof comp === "number") comp = Chalkboard.comp.init(comp, 0);
            if (comp.hasOwnProperty("a") && comp.hasOwnProperty("b")) {
                const z = comp as ChalkboardComplex;
                return Chalkboard.comp.init(z.a * num, z.b * num);
            } else if (comp.hasOwnProperty("rule")) {
                if ((comp as ChalkboardFunction).field !== "comp") throw new TypeError("Chalkboard.comp.scl: Property 'field' of 'comp' must be 'comp'.");
                const f = (comp as ChalkboardFunction).rule as ((a: number, b: number) => number)[];
                const g = [(a: number, b: number) => f[0](a, b) * num, (a: number, b: number) => f[1](a, b) * num];
                return Chalkboard.comp.define(...g);
            }
            throw new TypeError("Chalkboard.comp.scl: Parameter 'comp' must be of type ChalkboardComplex, number, or ChalkboardFunction.");
        };

        /**
         * Calculates the sine of a complex number or function.
         * @param {ChalkboardComplex | number | ChalkboardFunction} comp - The complex number or function
         * @returns {ChalkboardComplex | ChalkboardFunction}
         * @example
         * // Returns 1
         * const z = Chalkboard.comp.random();
         * const sin = Chalkboard.comp.sin(z);
         * const cos = Chalkboard.comp.cos(z);
         * const w = Chalkboard.comp.add(Chalkboard.comp.sq(sin), Chalkboard.comp.sq(cos));
         */
        export const sin = (comp: ChalkboardComplex | number | ChalkboardFunction): ChalkboardComplex | ChalkboardFunction => {
            if (typeof comp === "number") comp = Chalkboard.comp.init(comp, 0);
            if (comp.hasOwnProperty("a") && comp.hasOwnProperty("b")) {
                const z = comp as ChalkboardComplex;
                return Chalkboard.comp.init(
                    Chalkboard.trig.sin(z.a) * Chalkboard.trig.cosh(z.b),
                    Chalkboard.trig.cos(z.a) * Chalkboard.trig.sinh(z.b)
                );
            } else if (comp.hasOwnProperty("rule")) {
                if ((comp as ChalkboardFunction).field !== "comp") throw new TypeError("Chalkboard.comp.sin: Property 'field' of 'comp' must be 'comp'.");
                const f = (comp as ChalkboardFunction).rule as [(a: number, b: number) => number, (a: number, b: number) => number];
                return Chalkboard.comp.define(
                    (a: number, b: number) => {
                        const re = f[0](a, b);
                        const im = f[1](a, b);
                        return Chalkboard.trig.sin(re) * Chalkboard.trig.cosh(im);
                    },
                    (a: number, b: number) => {
                        const re = f[0](a, b);
                        const im = f[1](a, b);
                        return Chalkboard.trig.cos(re) * Chalkboard.trig.sinh(im);
                    }
                );
            }
            throw new TypeError("Chalkboard.comp.sin: Parameter 'comp' must be of type ChalkboardComplex, number, or ChalkboardFunction.");
        };

        /**
         * Calculates the slope of a complex number.
         * @param {ChalkboardComplex} comp - The complex number
         * @returns {number}
         * @example
         * // Returns 1.5
         * const m = Chalkboard.comp.slope(Chalkboard.comp.init(2, 3));
         */
        export const slope = (comp: ChalkboardComplex): number => {
            return comp.b / comp.a;
        };

        /**
         * Calculates the square of a complex number or function.
         * @param {ChalkboardComplex | number | ChalkboardFunction} comp - The complex number or function
         * @returns {ChalkboardComplex | ChalkboardFunction}
         * @example
         * // Returns -5 + 12i
         * const sq = Chalkboard.comp.sq(Chalkboard.comp.init(3, 2));
         */
        export const sq = (comp: ChalkboardComplex | number | ChalkboardFunction): ChalkboardComplex | ChalkboardFunction => {
            if (typeof comp === "number") comp = Chalkboard.comp.init(comp, 0);
            if (comp.hasOwnProperty("a") && comp.hasOwnProperty("b")) {
                const z = comp as ChalkboardComplex;
                return Chalkboard.comp.init(z.a * z.a - z.b * z.b, 2 * z.a * z.b);
            } else if (comp.hasOwnProperty("rule")) {
                if ((comp as ChalkboardFunction).field !== "comp") throw new TypeError("Chalkboard.comp.sq: Property 'field' of 'comp' must be 'comp'.");
                const f = (comp as ChalkboardFunction).rule as ((a: number, b: number) => number)[];
                const g = [(a: number, b: number) => f[0](a, b) * f[0](a, b) - f[1](a, b) * f[1](a, b), (a: number, b: number) => 2 * f[0](a, b) * f[1](a, b)];
                return Chalkboard.comp.define(...g);
            }
            throw new TypeError("Chalkboard.comp.sq: Parameter 'comp' must be of type ChalkboardComplex, number, or ChalkboardFunction.");
        };

        /**
         * Calculates the square root of a complex number or function.
         * @param {ChalkboardComplex | number | ChalkboardFunction} comp - The complex number or function
         * @returns {ChalkboardComplex | ChalkboardFunction}
         * @example
         * // Returns 2 + 0.5i
         * const sqrt = Chalkboard.comp.sqrt(Chalkboard.comp.init(4, 2));
         */
        export const sqrt = (comp: ChalkboardComplex | number | ChalkboardFunction): ChalkboardComplex | ChalkboardFunction => {
            if (typeof comp === "number") comp = Chalkboard.comp.init(comp, 0);
            if (comp.hasOwnProperty("a") && comp.hasOwnProperty("b")) {
                const z = comp as ChalkboardComplex;
                return Chalkboard.comp.init(
                    Chalkboard.real.sqrt((z.a + Chalkboard.real.sqrt(z.a * z.a + z.b * z.b)) / 2),
                    (Chalkboard.numb.sgn(z.b) as 0 | 1 | -1) * Chalkboard.real.sqrt((-z.a + Chalkboard.real.sqrt(z.a * z.a + z.b * z.b)) / 2)
                );
            } else if (comp.hasOwnProperty("rule")) {
                if ((comp as ChalkboardFunction).field !== "comp") throw new TypeError("Chalkboard.comp.sqrt: Property 'field' of 'comp' must be 'comp'.");
                const f = (comp as ChalkboardFunction).rule as ((a: number, b: number) => number)[];
                const g = [
                    (a: number, b: number) => {
                        const re = f[0](a, b);
                        const im = f[1](a, b);
                        return Chalkboard.real.sqrt((re + Chalkboard.real.sqrt(re * re + im * im)) / 2);
                    },
                    (a: number, b: number) => {
                        const re = f[0](a, b);
                        const im = f[1](a, b);
                        return (Chalkboard.numb.sgn(im) as 0 | 1 | -1) * Chalkboard.real.sqrt((-re + Chalkboard.real.sqrt(re * re + im * im)) / 2);
                    }
                ];
                return Chalkboard.comp.define(...g);
            }
            throw new TypeError("Chalkboard.comp.sqrt: Parameter 'comp' must be of type ChalkboardComplex, number, or ChalkboardFunction.");
        };

        /**
         * Calculates the subtraction of two complex numbers or functions.
         * @param {ChalkboardComplex | number | ChalkboardFunction} comp1 - The first complex number or function
         * @param {ChalkboardComplex | number | ChalkboardFunction} comp2 - The second complex number or function
         * @returns {ChalkboardComplex | ChalkboardFunction}
         * @example
         * // Returns 1 - 1i
         * const difference = Chalkboard.comp.sub(Chalkboard.comp.init(3, 2), Chalkboard.comp.init(2, 3));
         */
        export const sub = (comp1: ChalkboardComplex | number | ChalkboardFunction, comp2: ChalkboardComplex | number | ChalkboardFunction): ChalkboardComplex | ChalkboardFunction => {
            if (typeof comp1 === "number") comp1 = Chalkboard.comp.init(comp1, 0);
            if (typeof comp2 === "number") comp2 = Chalkboard.comp.init(comp2, 0);
            if (comp1.hasOwnProperty("a") && comp1.hasOwnProperty("b") && comp2.hasOwnProperty("a") && comp2.hasOwnProperty("b")) {
                const z1 = comp1 as ChalkboardComplex;
                const z2 = comp2 as ChalkboardComplex;
                return Chalkboard.comp.init(z1.a - z2.a, z1.b - z2.b);
            } else if (comp1.hasOwnProperty("rule") || comp2.hasOwnProperty("rule")) {
                if ((comp1 as ChalkboardFunction).field !== "comp" || (comp2 as ChalkboardFunction).field !== "comp") throw new TypeError("Chalkboard.comp.sub: Properties 'field' of 'comp1' and 'comp2' must be 'comp'.");
                const f1 = (comp1 as ChalkboardFunction).rule as [(a: number, b: number) => number, (a: number, b: number) => number];
                const f2 = (comp2 as ChalkboardFunction).rule as [(a: number, b: number) => number, (a: number, b: number) => number];
                const g = [(a: number, b: number) => f1[0](a, b) - f2[0](a, b), (a: number, b: number) => f1[1](a, b) - f2[1](a, b)];
                return Chalkboard.comp.define(...g);
            }
            throw new TypeError("Chalkboard.comp.sub: Parameters 'comp1' and 'comp2' must be of type ChalkboardComplex, number, or ChalkboardFunction.");
        };

        /**
         * Calculates the tangent of a complex number or function.
         * @param {ChalkboardComplex | number | ChalkboardFunction} comp - The complex number or function
         * @returns {ChalkboardComplex | ChalkboardFunction}
         * @example
         * // Returns ((e² - 1) / (e² + 1))i
         * const z = Chalkboard.comp.tan(Chalkboard.I());
         */
        export const tan = (comp: ChalkboardComplex | number | ChalkboardFunction): ChalkboardComplex | ChalkboardFunction => {
            return Chalkboard.comp.div(Chalkboard.comp.sin(comp), Chalkboard.comp.cos(comp));
        };

        /**
         * Converts a complex number to an array.
         * @param {ChalkboardComplex} comp - The complex number
         * @returns {number[]}
         * @example
         * // Returns [3, 4]
         * const arr = Chalkboard.comp.toArray(Chalkboard.comp.init(3, 4));
         */
        export const toArray = (comp: ChalkboardComplex): [number, number] => {
            return [comp.a, comp.b];
        };

        /**
         * Converts a complex number to a matrix.
         * @param {ChalkboardComplex} comp - The complex number
         * @returns {ChalkboardMatrix}
         * @example
         * // Returns the 2×2 matrix:
         * // [
         * //     [3, -4],
         * //     [4,  3]
         * // ]
         * const matr = Chalkboard.comp.toMatrix(Chalkboard.comp.init(3, 4));
         */
        export const toMatrix = (comp: ChalkboardComplex): ChalkboardMatrix => {
            return Chalkboard.matr.init([comp.a, -comp.b], [comp.b, comp.a]);
        };

        /**
         * Converts a complex number to a string
         * @param {ChalkboardComplex} comp - The complex number
         * @returns {string}
         * @example
         * // Returns "2 + 3i"
         * const str = Chalkboard.comp.toString(Chalkboard.comp.init(2, 3));
         */
        export const toString = (comp: ChalkboardComplex): string => {
            if (comp.a === 1 && comp.b === 0) {
                return "1";
            } else if (comp.a === 0 && comp.b === 1) {
                return "i";
            } else if (comp.a === -1 && comp.b === 0) {
                return "-1";
            } else if (comp.a === 0 && comp.b === -1) {
                return "-i";
            } else if (comp.b >= 0) {
                return comp.a.toString() + " + " + (comp.b === 1 ? "i" : comp.b.toString() + "i");
            } else {
                return comp.a.toString() + " - " + (comp.b === -1 ? "i" : Math.abs(comp.b).toString() + "i");
            }
        };

        /**
         * Converts a complex number to a typed array.
         * @param {ChalkboardComplex} comp - The complex number
         * @param {"int8" | "int16" | "int32" | "float32" | "float64" | "bigint64"} [type="float32"] - The type of the typed array, which can be "int8", "int16", "int32", "float32", "float64", or "bigint64" (optional, defaults to "float32")
         * @returns {Int8Array | Int16Array | Int32Array | Float32Array | Float64Array | BigInt64Array}
         * @example
         * // Returns a Float32Array [3, 4]
         * const z = Chalkboard.comp.init(3, 4);
         * const zf32 = Chalkboard.comp.toTypedArray(z);
         */
        export const toTypedArray = (comp: ChalkboardComplex, type: "int8" | "int16" | "int32" | "float32" | "float64" | "bigint64" = "float32"): Int8Array | Int16Array | Int32Array | Float32Array | Float64Array | BigInt64Array => {
            const arr = Chalkboard.comp.toArray(comp);
            if (type === "int8") {
                return new Int8Array(arr);
            } else if (type === "int16") {
                return new Int16Array(arr);
            } else if (type === "int32") {
                return new Int32Array(arr);
            } else if (type === "float32") {
                return new Float32Array(arr);
            } else if (type === "float64") {
                return new Float64Array(arr);
            } else if (type === "bigint64") {
                return new BigInt64Array(arr.map((n) => BigInt(Math.floor(n))));
            }
            throw new TypeError('Parameter "type" must be "int8", "int16", "int32", "float32", "float64", or "bigint64".');
        };

        /**
         * Converts a complex number to a vector.
         * @param {ChalkboardComplex} comp - The complex number
         * @returns {ChalkboadVector}
         * @example
         * // Returns the 2D vector (3, 4)
         * const v = Chalkboard.comp.toVector(Chalkboard.comp.init(3, 4));
         */
        export const toVector = (comp: ChalkboardComplex): ChalkboardVector => {
            return Chalkboard.vect.init(comp.a, comp.b);
        };

        /**
         * Evaluates a complex function at a complex number
         * @param {ChalkboardFunction} func - The function
         * @param {ChalkboardComplex} comp - The complex number
         * @returns {ChalkboardComplex}
         * @example
         * // Returns 3 + 4i
         * const f = Chalkboard.comp.define((z) => Chalkboard.comp.sq(z));
         * const z = Chalkboard.comp.val(f, Chalkboard.comp.init(2, 1));
         */
        export const val = (func: ChalkboardFunction, comp: ChalkboardComplex): ChalkboardComplex => {
            if (func.field !== "comp") throw new TypeError("Chalkboard.comp.val: Property 'field' of 'func' must be 'comp'.");
            const f = func.rule as [(a: number, b: number) => number, (a: number, b: number) => number];
            return Chalkboard.comp.init(f[0](comp.a, comp.b), f[1](comp.a, comp.b));
        };
    }
}
