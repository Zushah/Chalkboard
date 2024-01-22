/*
    The Chalkboard Library - Quaternion Namespace
    Version 2.1.0 Seki
*/
/// <reference path="Chalkboard.ts"/>
namespace Chalkboard {
    /**
     * The quaternion namespace.
     * @namespace
     */
    export namespace quat {
        /**
         * Calculates the absolute value of a quaternion.
         * @param {ChalkboardQuaternion} quat - The quaternion
         * @returns {ChalkboardQuaternion}
         */
        export const absolute = (quat: ChalkboardQuaternion): ChalkboardQuaternion => {
            return Chalkboard.quat.init(Math.abs(quat.a), Math.abs(quat.b), Math.abs(quat.c), Math.abs(quat.d));
        };

        /**
         * Calculates the addition of two quaternions.
         * @param {ChalkboardQuaternion | number} quat1 - The first quaternion
         * @param {ChalkboardQuaternion | number} quat2 - The second quaternion
         * @returns {ChalkboardQuaternion}
         */
        export const add = (quat1: ChalkboardQuaternion | number, quat2: ChalkboardQuaternion | number): ChalkboardQuaternion => {
            if (typeof quat1 === "number") quat1 = Chalkboard.quat.init(quat1, 0, 0, 0);
            if (typeof quat2 === "number") quat2 = Chalkboard.quat.init(quat2, 0, 0, 0);
            return Chalkboard.quat.init(quat1.a + quat2.a, quat1.b + quat2.b, quat1.c + quat2.c, quat1.d + quat2.d);
        };

        /**
         * Calculates the conjugate of a quaternion.
         * @param {ChalkboardQuaternion} quat - The quaternion
         * @returns {ChalkboardQuaternion}
         */
        export const conjugate = (quat: ChalkboardQuaternion): ChalkboardQuaternion => {
            return Chalkboard.quat.init(quat.a, -quat.b, -quat.c, -quat.d);
        };

        /**
         * Calculates a quaternion constrained within a range.
         * @param {ChalkboardQuaternion} quat - The quaternion
         * @param {number[]} [range=[0, 1]] - The range
         * @returns {ChalkboardQuaternion}
         */
        export const constrain = (quat: ChalkboardQuaternion, range: [number, number] = [0, 1]): ChalkboardQuaternion => {
            return Chalkboard.quat.init(
                Chalkboard.numb.constrain(quat.a, range),
                Chalkboard.numb.constrain(quat.b, range),
                Chalkboard.numb.constrain(quat.c, range),
                Chalkboard.numb.constrain(quat.d, range)
            );
        };

        /**
         * Copies a quaternion.
         * @param {ChalkboardQuaternion} quat - The quaternion
         * @returns {ChalkboardQuaternion}
         */
        export const copy = (quat: ChalkboardQuaternion): ChalkboardQuaternion => {
            return Object.create(Object.getPrototypeOf(quat), Object.getOwnPropertyDescriptors(quat));
        };

        /**
         * Calculates the distance between two quaternions.
         * @param {ChalkboardQuaternion | number} quat1 - The first quaternion
         * @param {ChalkboardQuaternion | number} quat2 - The second quaternion
         * @returns {ChalkboardQuaternion}
         */
        export const dist = (quat1: ChalkboardQuaternion | number, quat2: ChalkboardQuaternion | number): number => {
            if (typeof quat1 === "number") quat1 = Chalkboard.quat.init(quat1, 0, 0, 0);
            if (typeof quat2 === "number") quat2 = Chalkboard.quat.init(quat2, 0, 0, 0);
            return Chalkboard.real.sqrt(
                (quat2.a - quat1.a) * (quat2.a - quat1.a) + (quat2.b - quat1.b) * (quat2.b - quat1.b) + (quat2.c - quat1.c) * (quat2.c - quat1.c) + (quat2.d - quat1.d) * (quat2.d - quat1.d)
            );
        };

        /**
         * Calculates the distance squared between two quaternions.
         * @param {ChalkboardQuaternion | number} quat1 - The first quaternion
         * @param {ChalkboardQuaternion | number} quat2 - The second quaternion
         * @returns {ChalkboardQuaternion}
         */
        export const distsq = (quat1: ChalkboardQuaternion | number, quat2: ChalkboardQuaternion | number): number => {
            if (typeof quat1 === "number") quat1 = Chalkboard.quat.init(quat1, 0, 0, 0);
            if (typeof quat2 === "number") quat2 = Chalkboard.quat.init(quat2, 0, 0, 0);
            return (quat2.a - quat1.a) * (quat2.a - quat1.a) + (quat2.b - quat1.b) * (quat2.b - quat1.b) + (quat2.c - quat1.c) * (quat2.c - quat1.c) + (quat2.d - quat1.d) * (quat2.d - quat1.d);
        };

        /**
         * Calculates the division of two quaternions.
         * @param {ChalkboardQuaternion | number} quat1 - The first quaternion
         * @param {ChalkboardQuaternion | number} quat2 - The second quaternion
         * @returns {ChalkboardQuaternion}
         */
        export const div = (quat1: ChalkboardQuaternion | number, quat2: ChalkboardQuaternion | number): ChalkboardQuaternion => {
            if (typeof quat1 === "number") quat1 = Chalkboard.quat.init(quat1, 0, 0, 0);
            if (typeof quat2 === "number") quat2 = Chalkboard.quat.init(quat2, 0, 0, 0);
            return Chalkboard.quat.init(
                (quat1.a * quat2.a + quat1.b * quat2.b + quat1.c * quat2.c + quat1.d * quat2.d) / Chalkboard.quat.magsq(quat2),
                (quat1.b * quat2.a - quat1.a * quat2.b - quat1.d * quat2.c + quat1.c * quat2.d) / Chalkboard.quat.magsq(quat2),
                (quat1.c * quat2.a + quat1.d * quat2.b - quat1.a * quat2.c - quat1.b * quat2.d) / Chalkboard.quat.magsq(quat2),
                (quat1.d * quat2.a - quat1.c * quat2.b + quat1.b * quat2.c - quat1.a * quat2.d) / Chalkboard.quat.magsq(quat2)
            );
        };

        /**
         * Initializes a quaternion from a 3D vector representing an axis and a number representing an angle (that is, an axis-angle rotation).
         * @param {ChalkboardVector} vect - The vector
         * @param {number} rad - The angle in radians
         * @returns {ChalkboardQuaternion}
         */
        export const fromAxis = (vect: ChalkboardVector, rad: number): ChalkboardQuaternion => {
            if (typeof vect.z !== "undefined") {
                return Chalkboard.quat.init(Chalkboard.trig.cos(rad / 2), vect.x * Chalkboard.trig.sin(rad / 2), vect.y * Chalkboard.trig.sin(rad / 2), vect.z * Chalkboard.trig.sin(rad / 2));
            } else {
                throw new TypeError('Parameter "vect" must be of type "ChalkboardVector" that has properties "x", "y", and "z".');
            }
        };

        /**
         * Initializes a new quaternion
         * @param {number} a - The real part
         * @param {number} [b=0] - The first imaginary part
         * @param {number} [c=0] - The second imaginary part
         * @param {number} [d=0] - The third imaginary part
         * @returns {ChalkboardQuaternion}
         */
        export const init = (a: number, b: number = 0, c: number = 0, d: number = 0): ChalkboardQuaternion => {
            return { a: a, b: b, c: c, d: d };
        };

        /**
         * Calculates the inverse of a quaternion.
         * @param {ChalkboardQuaternion} quat - The quaternion
         * @returns {ChalkboardQuaternion}
         */
        export const invert = (quat: ChalkboardQuaternion): ChalkboardQuaternion => {
            return Chalkboard.quat.init(quat.a / Chalkboard.quat.magsq(quat), -quat.b / Chalkboard.quat.magsq(quat), -quat.c / Chalkboard.quat.magsq(quat), -quat.d / Chalkboard.quat.magsq(quat));
        };

        /**
         * Calculates the magnitude of a quaternion.
         * @param {ChalkboardQuaternion} quat - The quaternion
         * @returns {number}
         */
        export const mag = (quat: ChalkboardQuaternion): number => {
            return Chalkboard.real.sqrt(quat.a * quat.a + quat.b * quat.b + quat.c * quat.c + quat.d * quat.d);
        };

        /**
         * Calculates a quaternion with the inputted magnitude.
         * @param {ChalkboardQuaternion} quat - The quaternion
         * @param {number} num - The magnitude to set to
         * @returns {ChalkboardQuaternion}
         */
        export const magset = (quat: ChalkboardQuaternion, num: number): ChalkboardQuaternion => {
            return Chalkboard.quat.scl(Chalkboard.quat.normalize(quat), num);
        };

        /**
         * Calculates the magnitude squared of a quaternion.
         * @param {ChalkboardQuaternion} quat - The quaternion
         * @returns {number}
         */
        export const magsq = (quat: ChalkboardQuaternion): number => {
            return quat.a * quat.a + quat.b * quat.b + quat.c * quat.c + quat.d * quat.d;
        };

        /**
         * Calculates the multiplication of two quaternions.
         * @param {ChalkboardQuaternion | number} quat1 - The first quaternion
         * @param {ChalkboardQuaternion | number} quat2 - The second quaternion
         * @returns {ChalkboardQuaternion}
         */
        export const mul = (quat1: ChalkboardQuaternion | number, quat2: ChalkboardQuaternion | number): ChalkboardQuaternion => {
            if (typeof quat1 === "number") quat1 = Chalkboard.quat.init(quat1, 0, 0, 0);
            if (typeof quat2 === "number") quat2 = Chalkboard.quat.init(quat2, 0, 0, 0);
            return Chalkboard.quat.init(
                quat1.a * quat2.a - quat1.b * quat2.b - quat1.c * quat2.c - quat1.d * quat2.d,
                quat1.a * quat2.b + quat1.b * quat2.a + quat1.c * quat2.d - quat1.d * quat2.c,
                quat1.a * quat2.c - quat1.b * quat2.d + quat1.c * quat2.a + quat1.d * quat2.b,
                quat1.a * quat2.d + quat1.b * quat2.c - quat1.c * quat2.b + quat1.d * quat2.a
            );
        };

        /**
         * Calculates the negation of two quaternions.
         * @param {ChalkboardQuaternion} quat - The quaternion
         * @returns {ChalkboardQuaternion}
         */
        export const negate = (quat: ChalkboardQuaternion): ChalkboardQuaternion => {
            return Chalkboard.quat.init(-quat.a, -quat.b, -quat.c, -quat.d);
        };

        /**
         * Calculates the normalization of a quaternion.
         * @param {ChalkboardQuaternion} quat - The quaternion
         * @returns {ChalkboardQuaternion}
         */
        export const normalize = (quat: ChalkboardQuaternion): ChalkboardQuaternion => {
            return Chalkboard.quat.init(quat.a / Chalkboard.quat.mag(quat), quat.b / Chalkboard.quat.mag(quat), quat.c / Chalkboard.quat.mag(quat), quat.d / Chalkboard.quat.mag(quat));
        };

        /**
         * Prints a quaternion in the console.
         * @param {ChalkboardQuaternion} quat - The quaternion
         * @returns {void}
         */
        export const print = (quat: ChalkboardQuaternion): void => {
            console.log(Chalkboard.quat.toString(quat));
        };

        /**
         * Initializes a random quaternion.
         * @param {number} [inf=0] - The lower bound
         * @param {number} [sup=1] - The upper bound
         * @returns {ChalkboardQuaternion}
         */
        export const random = (inf: number = 0, sup: number = 1): ChalkboardQuaternion => {
            return Chalkboard.quat.init(Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup));
        };

        /**
         * Calculates the reciprocal of a quaternion.
         * @param {ChalkboardQuaternion} quat - The quaternion
         * @returns {ChalkboardQuaternion}
         */
        export const reciprocate = (quat: ChalkboardQuaternion): ChalkboardQuaternion => {
            return Chalkboard.quat.init(1 / quat.a, 1 / quat.b, 1 / quat.c, 1 / quat.d);
        };

        /**
         * Calculates the rounding of a quaternion.
         * @param {ChalkboardQuaternion} quat - The quaternion
         * @returns {ChalkboardQuaternion}
         */
        export const round = (quat: ChalkboardQuaternion): ChalkboardQuaternion => {
            return Chalkboard.quat.init(Math.round(quat.a), Math.round(quat.b), Math.round(quat.c), Math.round(quat.d));
        };

        /**
         * Calculates the scalar multiplication of a quaternion.
         * @param {ChalkboardQuaternion} quat - The quaternion
         * @param {number} num - The scalar
         * @returns {ChalkboardQuaternion}
         */
        export const scl = (quat: ChalkboardQuaternion, num: number): ChalkboardQuaternion => {
            return Chalkboard.quat.init(quat.a * num, quat.b * num, quat.c * num, quat.d * num);
        };

        /**
         * Calculates the subtraction of two quaternions.
         * @param {ChalkboardQuaternion | number} quat1 - The first quaternion
         * @param {ChalkboardQuaternion | number} quat2 - The second quaternion
         * @returns {ChalkboardQuaternion}
         */
        export const sub = (quat1: ChalkboardQuaternion | number, quat2: ChalkboardQuaternion | number): ChalkboardQuaternion => {
            if (typeof quat1 === "number") quat1 = Chalkboard.quat.init(quat1, 0, 0, 0);
            if (typeof quat2 === "number") quat2 = Chalkboard.quat.init(quat2, 0, 0, 0);
            return Chalkboard.quat.init(quat1.a - quat2.a, quat1.b - quat2.b, quat1.c - quat2.c, quat1.d - quat2.d);
        };

        /**
         * Converts a quaternion to an array.
         * @param {ChalkboardQuaternion} quat - The quaternion
         * @returns {number[]}
         */
        export const toArray = (quat: ChalkboardQuaternion): [number, number, number, number] => {
            return [quat.a, quat.b, quat.c, quat.d];
        };

        /**
         * Converts a quaternion to a matrix.
         * @param {ChalkboardQuaternion} quat - The quaternion
         * @returns {ChalkboardMatrix}
         */
        export const toMatrix = (quat: ChalkboardQuaternion): ChalkboardMatrix => {
            return Chalkboard.matr.init([quat.a, -quat.b, -quat.c, -quat.d], [quat.b, quat.a, -quat.d, quat.c], [quat.c, quat.d, quat.a, -quat.b], [quat.d, -quat.c, quat.b, quat.a]);
        };

        /**
         * Converts a quaternion to an axis-angle rotation.
         * @param {ChalkboardQuaternion} quat - The quaternion
         * @param {ChalkboardVector} vect - The vector to rotate around
         * @returns {ChalkboardVector}
         */
        export const toRotation = (quat: ChalkboardQuaternion, vect: ChalkboardVector): ChalkboardVector => {
            const vector = Chalkboard.vect.toQuaternion(vect);
            const inverse = Chalkboard.quat.invert(quat);
            const quat_vector_inverse = Chalkboard.quat.mul(quat, Chalkboard.quat.mul(vector, inverse));
            return Chalkboard.vect.init(quat_vector_inverse.b, quat_vector_inverse.c, quat_vector_inverse.d);
        };

        /**
         * Converts a quaternion to a string
         * @param {ChalkboardQuaternion} quat - The quaternion
         * @returns {string}
         */
        export const toString = (quat: ChalkboardQuaternion): string => {
            let quat_b = "";
            let quat_c = "";
            let quat_d = "";
            if (quat.b >= 0) {
                quat_b = " + " + quat.b.toString() + "i ";
            } else if (quat.b < 0) {
                quat_b = " - " + Math.abs(quat.b).toString() + "i ";
            }
            if (quat.c >= 0) {
                quat_c = "+ " + quat.c.toString() + "j ";
            } else if (quat.c < 0) {
                quat_c = "- " + Math.abs(quat.c).toString() + "j ";
            }
            if (quat.d >= 0) {
                quat_d = "+ " + quat.d.toString() + "k ";
            } else if (quat.d < 0) {
                quat_d = "- " + Math.abs(quat.d).toString() + "k ";
            }
            return quat.a.toString() + quat_b + quat_c + quat_d;
        };

        /**
         * Converts a quaternion to a vector.
         * @param {ChalkboardQuaternion} quat - The quaternion
         * @returns {ChalkboadVector}
         */
        export const toVector = (quat: ChalkboardQuaternion): ChalkboardVector => {
            return Chalkboard.vect.init(quat.a, quat.b, quat.c, quat.d);
        };

        /**
         * Calculates a quaternion multiplied by zero.
         * @param {ChalkboardQuaternion} quat - The quaternion
         * @returns {ChalkboardQuaternion}
         */
        export const zero = (quat: ChalkboardQuaternion): ChalkboardQuaternion => {
            return Chalkboard.quat.init(quat.a * 0, quat.b * 0, quat.c * 0, quat.d * 0);
        };
    }
}
