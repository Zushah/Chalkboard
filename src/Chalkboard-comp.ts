/*
    The Chalkboard Library - Complex Numbers Namespace
    Version 2.0.0 al-Khwarizmi
*/
/// <reference path="Chalkboard.ts"/>
namespace Chalkboard {
    /**
     * The complex number namespace.
     * @namespace
     */
    export namespace comp {
        /**
         * Calculates the absolute value of a complex number.
         * @param {ChalkboardComplex} comp - The complex number
         * @returns {ChalkboardComplex}
         */
        export const absolute = (comp: ChalkboardComplex): ChalkboardComplex => {
            return Chalkboard.comp.init(Math.abs(comp.a), Math.abs(comp.b));
        };

        /**
         * Calculates the addition of two complex numbers.
         * @param {ChalkboardComplex | number} comp1 - The first complex number
         * @param {ChalkboardComplex | number} comp2 - The second complex number
         * @returns {ChalkboardComplex}
         */
        export const add = (comp1: ChalkboardComplex | number, comp2: ChalkboardComplex | number): ChalkboardComplex => {
            if (typeof comp1 === "number") comp1 = Chalkboard.comp.init(comp1, 0);
            if (typeof comp2 === "number") comp2 = Chalkboard.comp.init(comp2, 0);
            return Chalkboard.comp.init(comp1.a + comp2.a, comp1.b + comp2.b);
        };

        /**
         * Calculates the argument of a complex number.
         * @param {ChalkboardComplex} comp - The complex number
         * @returns {number}
         */
        export const arg = (comp: ChalkboardComplex): number => {
            return Chalkboard.trig.arctan2(comp.b, comp.a);
        };

        /**
         * Calculates the argument between two complex numbers.
         * @param {ChalkboardComplex} comp1 - The first complex number
         * @param {ChalkboardComplex} comp2 - The second complex number
         * @returns {number}
         */
        export const argBetween = (comp1: ChalkboardComplex, comp2: ChalkboardComplex): number => {
            return Chalkboard.vect.angBetween(Chalkboard.comp.toVector(comp1), Chalkboard.comp.toVector(comp2));
        };

        /**
         * Calculates the conjugate of a complex number.
         * @param {ChalkboardComplex} comp - The complex number
         * @returns {ChalkboardComplex}
         */
        export const conjugate = (comp: ChalkboardComplex): ChalkboardComplex => {
            return Chalkboard.comp.init(comp.a, -comp.b);
        };

        /**
         * Calculates a complex number constrained within a range.
         * @param {ChalkboardComplex} comp - The complex number
         * @param {number[]} [range=[0, 1]] - The range
         * @returns {ChalkboardComplex}
         */
        export const constrain = (comp: ChalkboardComplex, range: [number, number] = [0, 1]): ChalkboardComplex => {
            return Chalkboard.comp.init(Chalkboard.numb.constrain(comp.a, range), Chalkboard.numb.constrain(comp.b, range));
        };

        /**
         * Copies a complex number.
         * @param {ChalkboardComplex} comp - The complex number
         * @returns {ChalkboardComplex}
         */
        export const copy = (comp: ChalkboardComplex): ChalkboardComplex => {
            return Object.create(Object.getPrototypeOf(comp), Object.getOwnPropertyDescriptors(comp));
        };

        /**
         * Defines a complex function.
         * @param {string} realDefinition
         * @param {string} imagDefinition
         * @returns {ChalkboardFunction}
         */
        export const define = (realDefinition: string, imagDefinition: string): ChalkboardFunction => {
            return { definition: [realDefinition, imagDefinition], type: "comp" };
        };

        /**
         * Calculates the distance between two complex numbers.
         * @param {ChalkboardComplex | number} comp1 - The first complex number
         * @param {ChalkboardComplex | number} comp2 - The second complex number
         * @returns {ChalkboardComplex}
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
         */
        export const distsq = (comp1: ChalkboardComplex | number, comp2: ChalkboardComplex | number): number => {
            if (typeof comp1 === "number") comp1 = Chalkboard.comp.init(comp1, 0);
            if (typeof comp2 === "number") comp2 = Chalkboard.comp.init(comp2, 0);
            return (comp2.a - comp1.a) * (comp2.a - comp1.a) + (comp2.b - comp1.b) * (comp2.b - comp1.b);
        };

        /**
         * Calculates the division of two complex numbers.
         * @param {ChalkboardComplex | number} comp1 - The first complex number
         * @param {ChalkboardComplex | number} comp2 - The second complex number
         * @returns {ChalkboardComplex}
         */
        export const div = (comp1: ChalkboardComplex | number, comp2: ChalkboardComplex | number): ChalkboardComplex => {
            if (typeof comp1 === "number") comp1 = Chalkboard.comp.init(comp1, 0);
            if (typeof comp2 === "number") comp2 = Chalkboard.comp.init(comp2, 0);
            return Chalkboard.comp.init((comp1.a * comp2.a - comp1.b * comp2.b) / Chalkboard.comp.magsq(comp2), (comp1.a * comp2.b + comp1.b * comp2.a) / Chalkboard.comp.magsq(comp2));
        };

        /**
         * Calculates Euler's formula (the complex exponential) for the inputted radian.
         * @param {number} rad
         * @returns
         */
        export const Euler = (rad: number): ChalkboardComplex => {
            return Chalkboard.comp.init(Chalkboard.trig.cos(rad), Chalkboard.trig.sin(rad));
        };

        /**
         * Returns the imaginary part of a complex number or complex function.
         * @param funcORcomp
         * @returns {ChalkboardComplex}
         */
        export const Im = (funcORcomp: ChalkboardFunction | ChalkboardComplex): string | number => {
            if (funcORcomp.hasOwnProperty("definition")) {
                return (funcORcomp as ChalkboardFunction).definition[1];
            } else {
                return (funcORcomp as ChalkboardComplex).b;
            }
        };

        /**
         * Initializes a new complex number
         * @param {number} a - The real part
         * @param {number} [b=0] - The imaginary part
         * @returns {ChalkboardComplex}
         */
        export const init = (a: number, b: number = 0): ChalkboardComplex => {
            return { a: a, b: b };
        };

        /**
         * Calculates the inverse of a complex number.
         * @param {ChalkboardComplex} comp - The complex number
         * @returns {ChalkboardComplex}
         */
        export const invert = (comp: ChalkboardComplex): ChalkboardComplex => {
            return Chalkboard.comp.init(comp.a / Chalkboard.comp.magsq(comp), -comp.b / Chalkboard.comp.magsq(comp));
        };

        /**
         * Calculates the complex logarithm of a complex number.
         * @param {ChalkboardComplex} comp - The complex number
         * @returns {ChalkboardComplex}
         */
        export const ln = (comp: ChalkboardComplex): ChalkboardComplex => {
            return Chalkboard.comp.init(Chalkboard.real.ln(Chalkboard.comp.mag(comp)), Chalkboard.trig.arctan2(comp.b, comp.a));
        };

        /**
         * Calculates the magnitude (or modulus) of a complex number.
         * @param {ChalkboardComplex} comp - The complex number
         * @returns {number}
         */
        export const mag = (comp: ChalkboardComplex): number => {
            return Chalkboard.real.sqrt(comp.a * comp.a + comp.b * comp.b);
        };

        /**
         * Calculates a complex number with the inputted magnitude.
         * @param {ChalkboardComplex} comp - The complex number
         * @param {number} num - The magnitude to set to
         * @returns {ChalkboardComplex}
         */
        export const magset = (comp: ChalkboardComplex, num: number): ChalkboardComplex => {
            return Chalkboard.comp.scl(Chalkboard.comp.normalize(comp), num);
        };

        /**
         * Calculates the magnitude (or modulus) squared of a complex number.
         * @param {ChalkboardComplex} comp - The complex number
         * @returns {number}
         */
        export const magsq = (comp: ChalkboardComplex): number => {
            return comp.a * comp.a + comp.b * comp.b;
        };

        /**
         * Calculates the multiplication of two complex numbers.
         * @param {ChalkboardComplex | number} comp1 - The first complex number
         * @param {ChalkboardComplex | number} comp2 - The second complex number
         * @returns {ChalkboardComplex}
         */
        export const mul = (comp1: ChalkboardComplex | number, comp2: ChalkboardComplex | number): ChalkboardComplex => {
            if (typeof comp1 === "number") comp1 = Chalkboard.comp.init(comp1, 0);
            if (typeof comp2 === "number") comp2 = Chalkboard.comp.init(comp2, 0);
            return Chalkboard.comp.init(comp1.a * comp2.a - comp1.b * comp2.b, comp1.a * comp2.b + comp1.b * comp2.a);
        };

        /**
         * Calculates the negation a complex number.
         * @param {ChalkboardComplex} comp - The complex number
         * @returns {ChalkboardComplex}
         */
        export const negate = (comp: ChalkboardComplex): ChalkboardComplex => {
            return Chalkboard.comp.init(-comp.a, -comp.b);
        };

        /**
         * Calculates the normalization of a complex number.
         * @param {ChalkboardComplex} comp - The complex number
         * @returns {ChalkboardComplex}
         */
        export const normalize = (comp: ChalkboardComplex): ChalkboardComplex => {
            return Chalkboard.comp.init(comp.a / Chalkboard.comp.mag(comp), comp.b / Chalkboard.comp.mag(comp));
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
         * Calculates the exponentiation of a complex number.
         * @param {ChalkboardComplex} comp - The complex number
         * @param {number} num - The exponent
         * @returns {ChalkboardComplex}
         */
        export const pow = (comp: ChalkboardComplex, num: number): ChalkboardComplex => {
            return Chalkboard.comp.init(
                Chalkboard.real.pow(Chalkboard.comp.mag(comp), num) * Chalkboard.trig.cos(num * Chalkboard.comp.arg(comp)),
                Chalkboard.real.pow(Chalkboard.comp.mag(comp), num) * Chalkboard.trig.sin(num * Chalkboard.comp.arg(comp))
            );
        };

        /**
         * Prints a complex number in the console.
         * @param {ChalkboardComplex} comp - The complex number
         * @returns {void}
         */
        export const print = (comp: ChalkboardComplex): void => {
            console.log(Chalkboard.comp.toString(comp));
        };

        /**
         * Initializes a random complex number.
         * @param {number} [inf=0] - The lower bound
         * @param {number} [sup=1] - The upper bound
         * @returns {ChalkboardComplex}
         */
        export const random = (inf: number = 0, sup: number = 1): ChalkboardComplex => {
            return Chalkboard.comp.init(Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup));
        };

        /**
         * Returns the real part of a complex function or a complex number.
         * @param {ChalkboardFunction | ChalkboardComplex} funcORcomp - The complex function or complex number
         * @returns {ChalkboardComplex}
         */
        export const Re = (funcORcomp: ChalkboardFunction | ChalkboardComplex): string | number => {
            if (funcORcomp.hasOwnProperty("definition")) {
                return (funcORcomp as ChalkboardFunction).definition[0];
            } else {
                return (funcORcomp as ChalkboardComplex).a;
            }
        };

        /**
         * Calculates the reciprocal of a complex number.
         * @param {ChalkboardComplex} comp - The complex number
         * @returns {ChalkboardComplex}
         */
        export const reciprocate = (comp: ChalkboardComplex): ChalkboardComplex => {
            return Chalkboard.comp.init(1 / comp.a, 1 / comp.b);
        };

        /**
         * Calculates the nth-root of a complex number.
         * @param {ChalkboardComplex} comp - The complex number
         * @param {number} [index=3] - The index
         * @returns {ChalkboardComplex}
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
         */
        export const round = (comp: ChalkboardComplex): ChalkboardComplex => {
            return Chalkboard.comp.init(Math.round(comp.a), Math.round(comp.b));
        };

        /**
         * Calculates the scalar multiplication of a complex number.
         * @param {ChalkboardComplex} comp - The complex number
         * @param {number} num - The scalar
         * @returns {ChalkboardComplex}
         */
        export const scl = (comp: ChalkboardComplex, num: number): ChalkboardComplex => {
            return Chalkboard.comp.init(comp.a * num, comp.b * num);
        };

        /**
         * Calculates the slope of a complex number.
         * @param {ChalkboardComplex} comp - The complex number
         * @returns {number}
         */
        export const slope = (comp: ChalkboardComplex): number => {
            return comp.b / comp.a;
        };

        /**
         * Calculates the square of a complex number.
         * @param {ChalkboardComplex} comp - The complex number
         * @returns {ChalkboardComplex}
         */
        export const sq = (comp: ChalkboardComplex): ChalkboardComplex => {
            return Chalkboard.comp.init(comp.a * comp.a - comp.b * comp.b, 2 * comp.a * comp.b);
        };

        /**
         * Calculates the square root of a complex number.
         * @param {ChalkboardComplex} comp - The complex number
         * @returns {ChalkboardComplex}
         */
        export const sqrt = (comp: ChalkboardComplex): ChalkboardComplex => {
            return Chalkboard.comp.init(
                Chalkboard.real.sqrt((comp.a + Chalkboard.real.sqrt(comp.a * comp.a + comp.b * comp.b)) / 2),
                Chalkboard.numb.sgn(comp.b) * Chalkboard.real.sqrt((-comp.a + Chalkboard.real.sqrt(comp.a * comp.a + comp.b * comp.b)) / 2)
            );
        };

        /**
         * Calculates the subtraction of two complex numbers.
         * @param {ChalkboardComplex | number} comp1 - The first complex number
         * @param {ChalkboardComplex | number} comp2 - The second complex number
         * @returns {ChalkboardComplex}
         */
        export const sub = (comp1: ChalkboardComplex | number, comp2: ChalkboardComplex | number): ChalkboardComplex => {
            if (typeof comp1 === "number") comp1 = Chalkboard.comp.init(comp1, 0);
            if (typeof comp2 === "number") comp2 = Chalkboard.comp.init(comp2, 0);
            return Chalkboard.comp.init(comp1.a - comp2.a, comp1.b - comp2.b);
        };

        /**
         * Converts a complex number to an array.
         * @param {ChalkboardComplex} comp - The complex number
         * @returns {number[]}
         */
        export const toArray = (comp: ChalkboardComplex): [number, number] => {
            return [comp.a, comp.b];
        };

        /**
         * Converts a complex number to a matrix.
         * @param {ChalkboardComplex} comp - The complex number
         * @returns {ChalkboardMatrix}
         */
        export const toMatrix = (comp: ChalkboardComplex): ChalkboardMatrix => {
            return Chalkboard.matr.init([comp.a, -comp.b],
                                        [comp.b, comp.a]);
        };

        /**
         * Converts a complex number to a string
         * @param {ChalkboardComplex} comp - The complex number
         * @returns {string}
         */
        export const toString = (comp: ChalkboardComplex): string => {
            if (comp.b >= 0) {
                return comp.a.toString() + " + " + comp.b.toString() + "i";
            } else {
                return comp.a.toString() + " - " + Math.abs(comp.b).toString() + "i";
            }
        };

        /**
         * Converts a complex number to a vector.
         * @param {ChalkboardComplex} comp - The complex number
         * @returns {ChalkboadVector}
         */
        export const toVector = (comp: ChalkboardComplex): ChalkboardVector => {
            return Chalkboard.vect.init(comp.a, comp.b);
        };

        /**
         * Evaluates a complex function at a complex number
         * @param {ChalkboardFunction} func - The function
         * @param {ChalkboardComplex} comp - The complex number
         * @returns {ChalkboardComplex}
         */
        export const val = (func: ChalkboardFunction, comp: ChalkboardComplex): ChalkboardComplex => {
            if (func.type === "comp") {
                const u = Chalkboard.comp.parse("(a, b) => " + func.definition[0]),
                    v = Chalkboard.comp.parse("(a, b) => " + func.definition[1]);
                return Chalkboard.comp.init(u(comp.a, comp.b), v(comp.a, comp.b));
            } else {
                throw new TypeError('Parameter "func" must be of type "ChalkboardFunction" with a type property of "comp".');
            }
        };

        /**
         * Calculates a complex number multiplied by zero.
         * @param {ChalkboardComplex} comp - The complex number
         * @returns {ChalkboardComplex}
         */
        export const zero = (comp: ChalkboardComplex): ChalkboardComplex => {
            return Chalkboard.comp.init(comp.a * 0, comp.b * 0);
        };
    }
}
