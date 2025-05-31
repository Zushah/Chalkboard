/*
    The Chalkboard Library - Complex Numbers Namespace
    Version 2.4.0 Noether
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
                const f = (comp as ChalkboardFunction).rule as [(a: number, b: number) => number, (a: number, b: number) => number];
                const g = [(a: number, b: number) => Math.abs(f[0](a, b)), (a: number, b: number) => Math.abs(f[1](a, b))];
                return Chalkboard.comp.define(g as [(a: number, b: number) => number, (a: number, b: number) => number]);
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
            } else if (comp1.hasOwnProperty("rule") || comp2.hasOwnProperty("rule")) {
                if (comp1.hasOwnProperty("rule")) {
                    if ((comp1 as ChalkboardFunction).field !== "comp") throw new TypeError("Chalkboard.comp.add: Property 'field' of 'comp1' must be 'comp'.");
                    if (comp2.hasOwnProperty("rule")) {
                        if ((comp2 as ChalkboardFunction).field !== "comp") throw new TypeError("Chalkboard.comp.add: Property 'field' of 'comp2' must be 'comp'.");
                        const f1 = (comp1 as ChalkboardFunction).rule as [(a: number, b: number) => number, (a: number, b: number) => number];
                        const f2 = (comp2 as ChalkboardFunction).rule as [(a: number, b: number) => number, (a: number, b: number) => number];
                        const g = [(a: number, b: number) => f1[0](a, b) + f2[0](a, b), (a: number, b: number) => f1[1](a, b) + f2[1](a, b)];
                        return Chalkboard.comp.define(g as [(a: number, b: number) => number, (a: number, b: number) => number]);
                    } else {
                        const f = (comp1 as ChalkboardFunction).rule as [(a: number, b: number) => number, (a: number, b: number) => number];
                        const z = comp2 as ChalkboardComplex;
                        const g = [(a: number, b: number) => f[0](a, b) + z.a, (a: number, b: number) => f[1](a, b) + z.b];
                        return Chalkboard.comp.define(g as [(a: number, b: number) => number, (a: number, b: number) => number]);
                    }
                } else {
                    if ((comp2 as ChalkboardFunction).field !== "comp") throw new TypeError("Chalkboard.comp.add: Property 'field' of 'comp2' must be 'comp'.");
                    const z = comp1 as ChalkboardComplex;
                    const f = (comp2 as ChalkboardFunction).rule as [(a: number, b: number) => number, (a: number, b: number) => number];
                    const g = [(a: number, b: number) => z.a + f[0](a, b), (a: number, b: number) => z.b + f[1](a, b)];
                    return Chalkboard.comp.define(g as [(a: number, b: number) => number, (a: number, b: number) => number]);
                }
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
                const f = (comp as ChalkboardFunction).rule as [(a: number, b: number) => number, (a: number, b: number) => number];
                const g = [(a: number, b: number) => f[0](a, b), (a: number, b: number) => -f[1](a, b)];
                return Chalkboard.comp.define(g as [(a: number, b: number) => number, (a: number, b: number) => number]);
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
         * Defines a complex function by its real part and imaginary part.
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
        export const define = (
            rule: ((z: ChalkboardComplex) => ChalkboardComplex) | ([(a: number, b: number) => number, (a: number, b: number) => number])
        ): ChalkboardFunction => {
            if (Array.isArray(rule)) {
                if (rule.length !== 2 || rule[0].length !== 2 || rule[1].length !== 2) throw new TypeError("Chalkboard.comp.define: If 'rule' is an array, it must be an array of two functions of two variables.");
                if (typeof rule[0](0, 0) !== "number" || typeof rule[1](0, 0) !== "number") throw new TypeError("Chalkboard.comp.define: If 'rule' is an array, the functions in it must return real numbers.");
                return { rule, field: "comp", type: "vector2d" } as ChalkboardFunction;
            } else {
                if (rule.length !== 1) throw new TypeError("Chalkboard.comp.define: If 'rule' is a function, it must be a function of one variable.");
                if (!rule(Chalkboard.comp.init(0, 0)).hasOwnProperty("a") || !rule(Chalkboard.comp.init(0, 0)).hasOwnProperty("b")) throw new TypeError("Chalkboard.comp.define: If 'rule' is a function, it must return a complex number.");
                const f = rule as (z: ChalkboardComplex) => ChalkboardComplex;
                return { rule: [
                    (a: number, b: number) => f(Chalkboard.comp.init(a, b)).a,
                    (a: number, b: number) => f(Chalkboard.comp.init(a, b)).b
                ], field: "comp", type: "vector2d" } as ChalkboardFunction;
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
                if (comp1.hasOwnProperty("rule")) {
                    if ((comp1 as ChalkboardFunction).field !== "comp") throw new TypeError("Chalkboard.comp.div: Property 'field' of 'comp1' must be 'comp'.");
                    if (comp2.hasOwnProperty("rule")) {
                        if ((comp2 as ChalkboardFunction).field !== "comp") throw new TypeError("Chalkboard.comp.div: Property 'field' of 'comp2' must be 'comp'.");
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
                        return Chalkboard.comp.define(g as [(a: number, b: number) => number, (a: number, b: number) => number]);
                    } else {
                        const f = (comp1 as ChalkboardFunction).rule as [(a: number, b: number) => number, (a: number, b: number) => number];
                        const z = comp2 as ChalkboardComplex;
                        const d = z.a * z.a + z.b * z.b;
                        const g = [
                            (a: number, b: number) => (f[0](a, b) * z.a + f[1](a, b) * z.b) / d,
                            (a: number, b: number) => (f[1](a, b) * z.a - f[0](a, b) * z.b) / d
                        ];
                        return Chalkboard.comp.define(g as [(a: number, b: number) => number, (a: number, b: number) => number]);
                    }
                } else {
                    if ((comp2 as ChalkboardFunction).field !== "comp") throw new TypeError("Chalkboard.comp.div: Property 'field' of 'comp2' must be 'comp'.");
                    const z = comp1 as ChalkboardComplex;
                    const f = (comp2 as ChalkboardFunction).rule as [(a: number, b: number) => number, (a: number, b: number) => number];
                    const g = [
                        (a: number, b: number) => {
                            const d = f[0](a, b) * f[0](a, b) + f[1](a, b) * f[1](a, b);
                            return (z.a * f[0](a, b) + z.b * f[1](a, b)) / d;
                        },
                        (a: number, b: number) => {
                            const d = f[0](a, b) * f[0](a, b) + f[1](a, b) * f[1](a, b);
                            return (z.b * f[0](a, b) - z.a * f[1](a, b)) / d;
                        }
                    ];
                    return Chalkboard.comp.define(g as [(a: number, b: number) => number, (a: number, b: number) => number]);
                }
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
                if (comp1.hasOwnProperty("rule")) {
                    if ((comp1 as ChalkboardFunction).field !== "comp") throw new TypeError("Chalkboard.comp.mul: Property 'field' of 'comp1' must be 'comp'.");
                    if (comp2.hasOwnProperty("rule")) {
                        if ((comp2 as ChalkboardFunction).field !== "comp") throw new TypeError("Chalkboard.comp.mul: Property 'field' of 'comp2' must be 'comp'.");
                        const f1 = (comp1 as ChalkboardFunction).rule as [(a: number, b: number) => number, (a: number, b: number) => number];
                        const f2 = (comp2 as ChalkboardFunction).rule as [(a: number, b: number) => number, (a: number, b: number) => number];
                        const g = [(a: number, b: number) => f1[0](a, b) * f2[0](a, b) - f1[1](a, b) * f2[1](a, b), (a: number, b: number) => f1[0](a, b) * f2[1](a, b) + f1[1](a, b) * f2[0](a, b)];
                        return Chalkboard.comp.define(g as [(a: number, b: number) => number, (a: number, b: number) => number]);
                    } else {
                        const f = (comp1 as ChalkboardFunction).rule as [(a: number, b: number) => number, (a: number, b: number) => number];
                        const z = comp2 as ChalkboardComplex;
                        const g = [(a: number, b: number) => f[0](a, b) * z.a - f[1](a, b) * z.b, (a: number, b: number) => f[0](a, b) * z.b + f[1](a, b) * z.a];
                        return Chalkboard.comp.define(g as [(a: number, b: number) => number, (a: number, b: number) => number]);
                    }
                } else {
                    if ((comp2 as ChalkboardFunction).field !== "comp") throw new TypeError("Chalkboard.comp.mul: Property 'field' of 'comp2' must be 'comp'.");
                    const z = comp1 as ChalkboardComplex;
                    const f = (comp2 as ChalkboardFunction).rule as [(a: number, b: number) => number, (a: number, b: number) => number];
                    const g = [(a: number, b: number) => z.a * f[0](a, b) - z.b * f[1](a, b), (a: number, b: number) => z.a * f[1](a, b) + z.b * f[0](a, b)];
                    return Chalkboard.comp.define(g as [(a: number, b: number) => number, (a: number, b: number) => number]);
                }
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
                const f = (comp as ChalkboardFunction).rule as [(a: number, b: number) => number, (a: number, b: number) => number];
                const g = [(a: number, b: number) => -f[0](a, b), (a: number, b: number) => -f[1](a, b)];
                return Chalkboard.comp.define(g as [(a: number, b: number) => number, (a: number, b: number) => number]);
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
         * Parses a string of JavaScript code.
         * @param {string} str - The string
         * @returns {Function}
         * @example
         * // Creates a function that computes a complex operation
         * const f = Chalkboard.comp.parse("(a, b) => a*a - b*b");
         */
        export const parse = (str: string): Function => {
            return Function('"use strict"; ' + Chalkboard.PARSEPREFIX + " return (" + str + ")")();
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
                const f = (comp as ChalkboardFunction).rule as [(a: number, b: number) => number, (a: number, b: number) => number];
                const g = [
                    (a: number, b: number) => {
                        const mag = Math.sqrt(f[0](a, b) * f[0](a, b) + f[1](a, b) * f[1](a, b));
                        const arg = Math.atan2(f[1](a, b), f[0](a, b));
                        return Math.pow(mag, num) * Math.cos(num * arg);
                    },
                    (a: number, b: number) => {
                        const mag = Math.sqrt(f[0](a, b) * f[0](a, b) + f[1](a, b) * f[1](a, b));
                        const arg = Math.atan2(f[1](a, b), f[0](a, b));
                        return Math.pow(mag, num) * Math.sin(num * arg);
                    }
                ];
                return Chalkboard.comp.define(g as [(a: number, b: number) => number, (a: number, b: number) => number]);
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
                const f = (comp as ChalkboardFunction).rule as [(a: number, b: number) => number, (a: number, b: number) => number];
                const g = [(a: number, b: number) => 1 / f[0](a, b), (a: number, b: number) => 1 / f[1](a, b)];
                return Chalkboard.comp.define(g as [(a: number, b: number) => number, (a: number, b: number) => number]);
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
                const f = (comp as ChalkboardFunction).rule as [(a: number, b: number) => number, (a: number, b: number) => number];
                const g = [(a: number, b: number) => f[0](a, b) * num, (a: number, b: number) => f[1](a, b) * num];
                return Chalkboard.comp.define(g as [(a: number, b: number) => number, (a: number, b: number) => number]);
            }
            throw new TypeError("Chalkboard.comp.scl: Parameter 'comp' must be of type ChalkboardComplex, number, or ChalkboardFunction.");
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
                const f = (comp as ChalkboardFunction).rule as [(a: number, b: number) => number, (a: number, b: number) => number];
                const g = [(a: number, b: number) => f[0](a, b) * f[0](a, b) - f[1](a, b) * f[1](a, b), (a: number, b: number) => 2 * f[0](a, b) * f[1](a, b)];
                return Chalkboard.comp.define(g as [(a: number, b: number) => number, (a: number, b: number) => number]);
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
                    Chalkboard.numb.sgn(z.b) * Chalkboard.real.sqrt((-z.a + Chalkboard.real.sqrt(z.a * z.a + z.b * z.b)) / 2)
                );
            } else if (comp.hasOwnProperty("rule")) {
                if ((comp as ChalkboardFunction).field !== "comp") throw new TypeError("Chalkboard.comp.sqrt: Property 'field' of 'comp' must be 'comp'.");
                const f = (comp as ChalkboardFunction).rule as [(a: number, b: number) => number, (a: number, b: number) => number];
                const g = [
                    (a: number, b: number) => {
                        const re = f[0](a, b);
                        const im = f[1](a, b);
                        return Math.sqrt((re + Math.sqrt(re * re + im * im)) / 2);
                    },
                    (a: number, b: number) => {
                        const re = f[0](a, b);
                        const im = f[1](a, b);
                        return Math.sign(im) * Math.sqrt((-re + Math.sqrt(re * re + im * im)) / 2);
                    }
                ];
                return Chalkboard.comp.define(g as [(a: number, b: number) => number, (a: number, b: number) => number]);
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
                if (comp1.hasOwnProperty("rule")) {
                    if ((comp1 as ChalkboardFunction).field !== "comp") throw new TypeError("Chalkboard.comp.sub: Property 'field' of 'comp1' must be 'comp'.");
                    if (comp2.hasOwnProperty("rule")) {
                        if ((comp2 as ChalkboardFunction).field !== "comp") throw new TypeError("Chalkboard.comp.sub: Property 'field' of 'comp2' must be 'comp'.");
                        const f1 = (comp1 as ChalkboardFunction).rule as [(a: number, b: number) => number, (a: number, b: number) => number];
                        const f2 = (comp2 as ChalkboardFunction).rule as [(a: number, b: number) => number, (a: number, b: number) => number];
                        const g = [(a: number, b: number) => f1[0](a, b) - f2[0](a, b), (a: number, b: number) => f1[1](a, b) - f2[1](a, b)];
                        return Chalkboard.comp.define(g as [(a: number, b: number) => number, (a: number, b: number) => number]);
                    } else {
                        const f = (comp1 as ChalkboardFunction).rule as [(a: number, b: number) => number, (a: number, b: number) => number];
                        const z = comp2 as ChalkboardComplex;
                        const g = [(a: number, b: number) => f[0](a, b) - z.a, (a: number, b: number) => f[1](a, b) - z.b];
                        return Chalkboard.comp.define(g as [(a: number, b: number) => number, (a: number, b: number) => number]);
                    }
                } else {
                    if ((comp2 as ChalkboardFunction).field !== "comp") throw new TypeError("Chalkboard.comp.sub: Property 'field' of 'comp2' must be 'comp'.");
                    const z = comp1 as ChalkboardComplex;
                    const f = (comp2 as ChalkboardFunction).rule as [(a: number, b: number) => number, (a: number, b: number) => number];
                    const g = [(a: number, b: number) => z.a - f[0](a, b), (a: number, b: number) => z.b - f[1](a, b)];
                    return Chalkboard.comp.define(g as [(a: number, b: number) => number, (a: number, b: number) => number]);
                }
            }
            throw new TypeError("Chalkboard.comp.sub: Parameters 'comp1' and 'comp2' must be of type ChalkboardComplex, number, or ChalkboardFunction.");
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
                return comp.a.toString() + " + " + comp.b.toString() + "i";
            } else {
                return comp.a.toString() + " - " + Math.abs(comp.b).toString() + "i";
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
         * const f = Chalkboard.comp.define(
         *     (a, b) => a*a - b*b,
         *     (a, b) => 2*a*b
         * );
         * const z = Chalkboard.comp.val(f, Chalkboard.comp.init(2, 1));
         */
        export const val = (func: ChalkboardFunction, comp: ChalkboardComplex): ChalkboardComplex => {
            if (func.field !== "comp") throw new TypeError("Chalkboard.comp.val: Property 'field' of 'func' must be 'comp'.");
            const f = func.rule as [(a: number, b: number) => number, (a: number, b: number) => number];
            return Chalkboard.comp.init(f[0](comp.a, comp.b), f[1](comp.a, comp.b));
        };
    }
}
