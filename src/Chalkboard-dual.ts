/*
    The Chalkboard Library - Dual Numbers Namespace
    Version 2.1.0 Seki
*/
/// <reference path="Chalkboard.ts"/>
namespace Chalkboard {
    /**
     * The dual number namespace.
     * @namespace
     */
    export namespace dual {
        /**
         * Calculates the absolute value of a dual number.
         * @param {ChalkboardDual} dual - The dual number
         * @returns {ChalkboardDual}
         */
        export const absolute = (dual: ChalkboardDual): ChalkboardDual => {
            return Chalkboard.dual.init(Math.abs(dual.a), Math.abs(dual.b));
        };

        /**
         * Calculates the addition of two dual numbers.
         * @param {ChalkboardDual | number} dual1 - The first dual number
         * @param {ChalkboardDual | number} dual2 - The second dual number
         * @returns {ChalkboardDual}
         */
        export const add = (dual1: ChalkboardDual | number, dual2: ChalkboardDual | number): ChalkboardDual => {
            if (typeof dual1 === "number") dual1 = Chalkboard.dual.init(dual1, 0);
            if (typeof dual2 === "number") dual2 = Chalkboard.dual.init(dual2, 0);
            return Chalkboard.dual.init(dual1.a + dual2.a, dual1.b + dual2.b);
        };

        /**
         * Calculates the conjugate of a dual number.
         * @param {ChalkboardDual} dual - The dual number
         * @returns {ChalkboardDual}
         */
        export const conjugate = (dual: ChalkboardDual): ChalkboardDual => {
            return Chalkboard.dual.init(dual.a, -dual.b);
        };

        /**
         * Calculates a dual number constrained within a range.
         * @param {ChalkboardDual} dual - The dual number
         * @param {number[]} [range=[0, 1]] - The range
         * @returns {ChalkboardDual}
         */
        export const constrain = (dual: ChalkboardDual, range: [number, number] = [0, 1]): ChalkboardDual => {
            return Chalkboard.dual.init(Chalkboard.numb.constrain(dual.a, range), Chalkboard.numb.constrain(dual.b, range));
        };

        /**
         * Copies a dual number.
         * @param {ChalkboardDual} dual - The dual number
         * @returns {ChalkboardDual}
         */
        export const copy = (dual: ChalkboardDual): ChalkboardDual => {
            return Object.create(Object.getPrototypeOf(dual), Object.getOwnPropertyDescriptors(dual));
        };

        /**
         * Calculates the distance between two dual numbers.
         * @param {ChalkboardDual | number} dual1 - The first dual number
         * @param {ChalkboardDual | number} dual2 - The second dual number
         * @returns {ChalkboardDual}
         */
        export const dist = (dual1: ChalkboardDual | number, dual2: ChalkboardDual | number): number => {
            if (typeof dual1 === "number") dual1 = Chalkboard.dual.init(dual1, 0);
            if (typeof dual2 === "number") dual2 = Chalkboard.dual.init(dual2, 0);
            return Chalkboard.real.sqrt((dual2.a - dual1.a) * (dual2.a - dual1.a) + (dual2.b - dual1.b) * (dual2.b - dual1.b));
        };

        /**
         * Calculates the distance squared between two dual numbers.
         * @param {ChalkboardDual | number} dual1 - The first dual number
         * @param {ChalkboardDual | number} dual2 - The second dual number
         * @returns {ChalkboardDual}
         */
        export const distsq = (dual1: ChalkboardDual | number, dual2: ChalkboardDual | number): number => {
            if (typeof dual1 === "number") dual1 = Chalkboard.dual.init(dual1, 0);
            if (typeof dual2 === "number") dual2 = Chalkboard.dual.init(dual2, 0);
            return (dual2.a - dual1.a) * (dual2.a - dual1.a) + (dual2.b - dual1.b) * (dual2.b - dual1.b);
        };

        /**
         * Calculates the division of two dual numbers.
         * @param {ChalkboardDual | number} dual1 - The first dual number
         * @param {ChalkboardDual | number} dual2 - The second dual number
         * @returns {ChalkboardDual}
         */
        export const div = (dual1: ChalkboardDual | number, dual2: ChalkboardDual | number): ChalkboardDual => {
            if (typeof dual1 === "number") dual1 = Chalkboard.dual.init(dual1, 0);
            if (typeof dual2 === "number") dual2 = Chalkboard.dual.init(dual2, 0);
            return Chalkboard.dual.init(dual1.a / dual2.a, (dual1.b * dual2.a - dual1.a * dual2.b) / (dual2.a * dual2.a));
        };

        /**
         * Initializes a new dual number
         * @param {number} a - The real part
         * @param {number} [b=0] - The imaginary part
         * @returns {ChalkboardDual}
         */
        export const init = (a: number, b: number = 0): ChalkboardDual => {
            return { a: a, b: b };
        };

        /**
         * Calculates the magnitude of a dual number.
         * @param {ChalkboardDual} dual - The dual number
         * @returns {number}
         */
        export const mag = (dual: ChalkboardDual): number => {
            return Chalkboard.real.sqrt(dual.a * dual.a + dual.b * dual.b);
        };

        /**
         * Calculates a dual number with the inputted magnitude.
         * @param {ChalkboardDual} dual - The dual number
         * @param {number} num - The magnitude to set to
         * @returns {ChalkboardDual}
         */
        export const magset = (dual: ChalkboardDual, num: number): ChalkboardDual => {
            return Chalkboard.dual.scl(Chalkboard.dual.normalize(dual), num);
        };

        /**
         * Calculates the magnitude squared of a dual number.
         * @param {ChalkboardDual} dual - The dual number
         * @returns {number}
         */
        export const magsq = (dual: ChalkboardDual): number => {
            return dual.a * dual.a + dual.b * dual.b;
        };

        /**
         * Calculates the multiplication of two dual numbers.
         * @param {ChalkboardDual | number} dual1 - The first dual number
         * @param {ChalkboardDual | number} dual2 - The second dual number
         * @returns {ChalkboardDual}
         */
        export const mul = (dual1: ChalkboardDual | number, dual2: ChalkboardDual | number): ChalkboardDual => {
            if (typeof dual1 === "number") dual1 = Chalkboard.dual.init(dual1, 0);
            if (typeof dual2 === "number") dual2 = Chalkboard.dual.init(dual2, 0);
            return Chalkboard.dual.init(dual1.a * dual2.a, dual1.a * dual2.b + dual1.b * dual2.a);
        };

        /**
         * Calculates the negation of a dual number.
         * @param {ChalkboardDual} dual - The dual number
         * @returns {ChalkboardDual}
         */
        export const negate = (dual: ChalkboardDual): ChalkboardDual => {
            return Chalkboard.dual.init(-dual.a, -dual.b);
        };

        /**
         * Calculates the normalization of a dual number.
         * @param {ChalkboardDual} dual - The dual number
         * @returns {ChalkboardDual}
         */
        export const normalize = (dual: ChalkboardDual): ChalkboardDual => {
            return Chalkboard.dual.init(dual.a / Chalkboard.dual.mag(dual), dual.b / Chalkboard.dual.mag(dual));
        };

        /**
         * Prints a dual number in the console.
         * @param {ChalkboardDual} dual - The dual number
         * @returns {void}
         */
        export const print = (dual: ChalkboardDual): void => {
            console.log(Chalkboard.dual.toString(dual));
        };

        /**
         * Initializes a random dual number.
         * @param {number} [inf=0] - The lower bound
         * @param {number} [sup=1] - The upper bound
         * @returns {ChalkboardDual}
         */
        export const random = (inf: number = 0, sup: number = 1): ChalkboardDual => {
            return Chalkboard.dual.init(Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup));
        };

        /**
         * Calculates the reciprocal of a dual number.
         * @param {ChalkboardDual} dual - The dual number
         * @returns {ChalkboardDual}
         */
        export const reciprocate = (dual: ChalkboardDual): ChalkboardDual => {
            return Chalkboard.dual.init(1 / dual.a, 1 / dual.b);
        };

        /**
         * Calculates the rounding of a dual number.
         * @param {ChalkboardDual} dual - The dual number
         * @returns {ChalkboardDual}
         */
        export const round = (dual: ChalkboardDual): ChalkboardDual => {
            return Chalkboard.dual.init(Math.round(dual.a), Math.round(dual.b));
        };

        /**
         * Calculates the scalar multiplication of a dual number.
         * @param {ChalkboardDual} dual - The dual number
         * @param {number} num - The scalar
         * @returns {ChalkboardDual}
         */
        export const scl = (dual: ChalkboardDual, num: number): ChalkboardDual => {
            return Chalkboard.dual.init(dual.a * num, dual.b * num);
        };

        /**
         * Calculates the slope of a dual number.
         * @param {ChalkboardDual} dual - The dual number
         * @returns {number}
         */
        export const slope = (dual: ChalkboardDual): number => {
            return dual.b / dual.a;
        };

        /**
         * Calculates the subtraction of two dual numbers.
         * @param {ChalkboardDual | number} dual1 - The first dual number
         * @param {ChalkboardDual | number} dual2 - The second dual number
         * @returns {ChalkboardDual}
         */
        export const sub = (dual1: ChalkboardDual | number, dual2: ChalkboardDual | number): ChalkboardDual => {
            if (typeof dual1 === "number") dual1 = Chalkboard.dual.init(dual1, 0);
            if (typeof dual2 === "number") dual2 = Chalkboard.dual.init(dual2, 0);
            return Chalkboard.dual.init(dual1.a - dual2.a, dual1.b - dual2.b);
        };

        /**
         * Converts a dual number to an array.
         * @param {ChalkboardDual} dual - The dual number
         * @returns {number[]}
         */
        export const toArray = (dual: ChalkboardDual): [number, number] => {
            return [dual.a, dual.b];
        };

        /**
         * Converts a dual number to a matrix.
         * @param {ChalkboardDual} dual - The dual number
         * @returns {ChalkboardMatrix}
         */
        export const toMatrix = (dual: ChalkboardDual): ChalkboardMatrix => {
            return Chalkboard.matr.init([dual.a, dual.b], [0, dual.a]);
        };

        /**
         * Converts a dual number to a string
         * @param {ChalkboardDual} dual - The dual number
         * @returns {string}
         */
        export const toString = (dual: ChalkboardDual): string => {
            if (dual.b >= 0) {
                return dual.a.toString() + " + " + dual.b.toString() + "ε";
            } else {
                return dual.a.toString() + " - " + Math.abs(dual.b).toString() + "ε";
            }
        };

        /**
         * Converts a dual number to a vector.
         * @param {ChalkboardDual} dual - The dual number
         * @returns {ChalkboadVector}
         */
        export const toVector = (dual: ChalkboardDual): ChalkboardVector => {
            return Chalkboard.vect.init(dual.a, dual.b);
        };

        /**
         * Calculates a dual number multiplied by zero.
         * @param {ChalkboardDual} dual - The dual number
         * @returns {ChalkboardDual}
         */
        export const zero = (dual: ChalkboardDual): ChalkboardDual => {
            return Chalkboard.dual.init(dual.a * 0, dual.b * 0);
        };
    }
}
