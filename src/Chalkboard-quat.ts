/*
    The Chalkboard Library - Quaternion Namespace
    Version 2.3.0 Boole
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
         * @example
         * // Returns 2 + 3i + 4j + 5k
         * const q = Chalkboard.quat.absolute(Chalkboard.quat.init(-2, 3, -4, 5));
         */
        export const absolute = (quat: ChalkboardQuaternion): ChalkboardQuaternion => {
            return Chalkboard.quat.init(Math.abs(quat.a), Math.abs(quat.b), Math.abs(quat.c), Math.abs(quat.d));
        };

        /**
         * Calculates the addition of two quaternions.
         * @param {ChalkboardQuaternion | number} quat1 - The first quaternion
         * @param {ChalkboardQuaternion | number} quat2 - The second quaternion
         * @returns {ChalkboardQuaternion}
         * @example
         * // Returns 3 + 5i + 7j + 9k
         * const sum = Chalkboard.quat.add(Chalkboard.quat.init(1, 2, 3, 4), Chalkboard.quat.init(2, 3, 4, 5));
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
         * @example
         * // Returns 2 - 3i - 4j - 5k
         * const conj = Chalkboard.quat.conjugate(Chalkboard.quat.init(2, 3, 4, 5));
         */
        export const conjugate = (quat: ChalkboardQuaternion): ChalkboardQuaternion => {
            return Chalkboard.quat.init(quat.a, -quat.b, -quat.c, -quat.d);
        };

        /**
         * Calculates a quaternion constrained within a range.
         * @param {ChalkboardQuaternion} quat - The quaternion
         * @param {number[]} [range=[0, 1]] - The range
         * @returns {ChalkboardQuaternion}
         * @example
         * // Returns 1 + 0.6i + 0.7j + 0.8k
         * const constrained = Chalkboard.quat.constrain(Chalkboard.quat.init(1.2, 0.6, 0.7, 0.8), [0, 1]);
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
         * @example
         * // Returns 2 + 3i + 4j + 5k
         * const copied = Chalkboard.quat.copy(Chalkboard.quat.init(2, 3, 4, 5));
         */
        export const copy = (quat: ChalkboardQuaternion): ChalkboardQuaternion => {
            return Object.create(Object.getPrototypeOf(quat), Object.getOwnPropertyDescriptors(quat));
        };

        /**
         * Calculates the distance between two quaternions.
         * @param {ChalkboardQuaternion | number} quat1 - The first quaternion
         * @param {ChalkboardQuaternion | number} quat2 - The second quaternion
         * @returns {ChalkboardQuaternion}
         * @example
         * // Returns 2
         * const distance = Chalkboard.quat.dist(Chalkboard.quat.init(1, 0, 0, 0), Chalkboard.quat.init(3, 0, 0, 0));
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
         * @example
         * // Returns 4
         * const distanceSquared = Chalkboard.quat.distsq(Chalkboard.quat.init(1, 0, 0, 0), Chalkboard.quat.init(3, 0, 0, 0));
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
         * @example
         * // Returns 0.5 + 0i + 0j + 0k
         * const quotient = Chalkboard.quat.div(Chalkboard.quat.init(1, 0, 0, 0), Chalkboard.quat.init(2, 0, 0, 0));
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
         * @example
         * // Returns 0.7071 + 0i + 0.7071j + 0k
         * const q = Chalkboard.quat.fromAxis(Chalkboard.vect.init(0, 1, 0), Chalkboard.PI(0.5));
         */
        export const fromAxis = (vect: ChalkboardVector, rad: number): ChalkboardQuaternion => {
            vect = vect as { x: number, y: number, z?: number, w?: number };
            if (typeof vect.z !== "undefined") {
                return Chalkboard.quat.init(Chalkboard.trig.cos(rad / 2), vect.x * Chalkboard.trig.sin(rad / 2), vect.y * Chalkboard.trig.sin(rad / 2), vect.z * Chalkboard.trig.sin(rad / 2));
            } else {
                throw new TypeError('Parameter "vect" must be of type "ChalkboardVector" with 3 dimensions.');
            }
        };

        /**
         * Initializes a new quaternion
         * @param {number} a - The real part
         * @param {number} [b=0] - The first imaginary part
         * @param {number} [c=0] - The second imaginary part
         * @param {number} [d=0] - The third imaginary part
         * @returns {ChalkboardQuaternion}
         * @example
         * // Returns 1 + 2i + 3j + 4k
         * const q = Chalkboard.quat.init(1, 2, 3, 4);
         */
        export const init = (a: number, b: number = 0, c: number = 0, d: number = 0): ChalkboardQuaternion => {
            return { a: a, b: b, c: c, d: d };
        };

        /**
         * Calculates the inverse of a quaternion.
         * @param {ChalkboardQuaternion} quat - The quaternion
         * @returns {ChalkboardQuaternion}
         * @example
         * // Returns 0.0333 - 0.0667i - 0.1j - 0.1333k
         * const inverse = Chalkboard.quat.invert(Chalkboard.quat.init(1, 2, 3, 4));
         */
        export const invert = (quat: ChalkboardQuaternion): ChalkboardQuaternion => {
            return Chalkboard.quat.init(quat.a / Chalkboard.quat.magsq(quat), -quat.b / Chalkboard.quat.magsq(quat), -quat.c / Chalkboard.quat.magsq(quat), -quat.d / Chalkboard.quat.magsq(quat));
        };

        /**
         * Calculates the magnitude of a quaternion.
         * @param {ChalkboardQuaternion} quat - The quaternion
         * @returns {number}
         * @example
         * // Returns 5.4772
         * const r = Chalkboard.quat.mag(Chalkboard.quat.init(1, 2, 3, 4));
         */
        export const mag = (quat: ChalkboardQuaternion): number => {
            return Chalkboard.real.sqrt(quat.a * quat.a + quat.b * quat.b + quat.c * quat.c + quat.d * quat.d);
        };

        /**
         * Calculates a quaternion with the inputted magnitude.
         * @param {ChalkboardQuaternion} quat - The quaternion
         * @param {number} num - The magnitude to set to
         * @returns {ChalkboardQuaternion}
         * @example
         * // Returns 0.3651 + 0.7303i + 1.0954j + 1.4606k
         * const normscl = Chalkboard.quat.magset(Chalkboard.quat.init(1, 2, 3, 4), 2);
         */
        export const magset = (quat: ChalkboardQuaternion, num: number): ChalkboardQuaternion => {
            return Chalkboard.quat.scl(Chalkboard.quat.normalize(quat), num);
        };

        /**
         * Calculates the magnitude squared of a quaternion.
         * @param {ChalkboardQuaternion} quat - The quaternion
         * @returns {number}
         * @example
         * // Returns 30
         * const r2 = Chalkboard.quat.magsq(Chalkboard.quat.init(1, 2, 3, 4));
         */
        export const magsq = (quat: ChalkboardQuaternion): number => {
            return quat.a * quat.a + quat.b * quat.b + quat.c * quat.c + quat.d * quat.d;
        };

        /**
         * Calculates the multiplication of two quaternions.
         * @param {ChalkboardQuaternion | number} quat1 - The first quaternion
         * @param {ChalkboardQuaternion | number} quat2 - The second quaternion
         * @returns {ChalkboardQuaternion}
         * @example
         * // Returns -4 + 8i + 8j + 2k
         * const product = Chalkboard.quat.mul(Chalkboard.quat.init(1, 2, 3, 0), Chalkboard.quat.init(2, 2, 0, 1));
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
         * Calculates the negation of a quaternion.
         * @param {ChalkboardQuaternion} quat - The quaternion
         * @returns {ChalkboardQuaternion}
         * @example
         * // Returns -1 - 2i - 3j - 4k
         * const negated = Chalkboard.quat.negate(Chalkboard.quat.init(1, 2, 3, 4));
         */
        export const negate = (quat: ChalkboardQuaternion): ChalkboardQuaternion => {
            return Chalkboard.quat.init(-quat.a, -quat.b, -quat.c, -quat.d);
        };

        /**
         * Calculates the normalization of a quaternion.
         * @param {ChalkboardQuaternion} quat - The quaternion
         * @returns {ChalkboardQuaternion}
         * @example
         * // Returns 0.1826 + 0.3651i + 0.5477j + 0.7303k
         * const normalized = Chalkboard.quat.normalize(Chalkboard.quat.init(1, 2, 3, 4));
         */
        export const normalize = (quat: ChalkboardQuaternion): ChalkboardQuaternion => {
            return Chalkboard.quat.init(quat.a / Chalkboard.quat.mag(quat), quat.b / Chalkboard.quat.mag(quat), quat.c / Chalkboard.quat.mag(quat), quat.d / Chalkboard.quat.mag(quat));
        };

        /**
         * Prints a quaternion in the console.
         * @param {ChalkboardQuaternion} quat - The quaternion
         * @returns {void}
         * @example
         * // Prints "1 + 2i + 3j + 4k" in the console
         * Chalkboard.quat.print(Chalkboard.quat.init(1, 2, 3, 4));
         */
        export const print = (quat: ChalkboardQuaternion): void => {
            console.log(Chalkboard.quat.toString(quat));
        };

        /**
         * Initializes a random quaternion.
         * @param {number} [inf=0] - The lower bound
         * @param {number} [sup=1] - The upper bound
         * @returns {ChalkboardQuaternion}
         * @example
         * // Returns a random quaternion with components between 0 and 1
         * const q = Chalkboard.quat.random();
         */
        export const random = (inf: number = 0, sup: number = 1): ChalkboardQuaternion => {
            return Chalkboard.quat.init(Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup));
        };

        /**
         * Calculates the reciprocal of a quaternion.
         * @param {ChalkboardQuaternion} quat - The quaternion
         * @returns {ChalkboardQuaternion}
         * @example
         * // Returns 1 + 0.5i + 0.3333j + 0.25k
         * const reciprocated = Chalkboard.quat.reciprocate(Chalkboard.quat.init(1, 2, 3, 4));
         */
        export const reciprocate = (quat: ChalkboardQuaternion): ChalkboardQuaternion => {
            return Chalkboard.quat.init(1 / quat.a, 1 / quat.b, 1 / quat.c, 1 / quat.d);
        };

        /**
         * Calculates the rounding of a quaternion.
         * @param {ChalkboardQuaternion} quat - The quaternion
         * @returns {ChalkboardQuaternion}
         * @example
         * // Returns 1 + 2i + 3j + 4k
         * const rounded = Chalkboard.quat.round(Chalkboard.quat.init(0.6, 2.3, 2.7, 4.1));
         */
        export const round = (quat: ChalkboardQuaternion): ChalkboardQuaternion => {
            return Chalkboard.quat.init(Math.round(quat.a), Math.round(quat.b), Math.round(quat.c), Math.round(quat.d));
        };

        /**
         * Calculates the scalar multiplication of a quaternion.
         * @param {ChalkboardQuaternion} quat - The quaternion
         * @param {number} num - The scalar
         * @returns {ChalkboardQuaternion}
         * @example
         * // Returns 2 + 4i + 6j + 8k
         * const scaled = Chalkboard.quat.scl(Chalkboard.quat.init(1, 2, 3, 4), 2);
         */
        export const scl = (quat: ChalkboardQuaternion, num: number): ChalkboardQuaternion => {
            return Chalkboard.quat.init(quat.a * num, quat.b * num, quat.c * num, quat.d * num);
        };

        /**
         * Calculates the subtraction of two quaternions.
         * @param {ChalkboardQuaternion | number} quat1 - The first quaternion
         * @param {ChalkboardQuaternion | number} quat2 - The second quaternion
         * @returns {ChalkboardQuaternion}
         * @example
         * // Returns -1 - 1i - 1j - 1k
         * const difference = Chalkboard.quat.sub(Chalkboard.quat.init(1, 2, 3, 4), Chalkboard.quat.init(2, 3, 4, 5));
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
         * @example
         * // Returns [1, 2, 3, 4]
         * const arr = Chalkboard.quat.toArray(Chalkboard.quat.init(1, 2, 3, 4));
         */
        export const toArray = (quat: ChalkboardQuaternion): [number, number, number, number] => {
            return [quat.a, quat.b, quat.c, quat.d];
        };

        /**
         * Converts a quaternion to a matrix.
         * @param {ChalkboardQuaternion} quat - The quaternion
         * @returns {ChalkboardMatrix}
         * @example
         * // Returns a 4×4 matrix representing the quaternion
         * const matr = Chalkboard.quat.toMatrix(Chalkboard.quat.init(1, 2, 3, 4));
         */
        export const toMatrix = (quat: ChalkboardQuaternion): ChalkboardMatrix => {
            return Chalkboard.matr.init([quat.a, -quat.b, -quat.c, -quat.d], [quat.b, quat.a, -quat.d, quat.c], [quat.c, quat.d, quat.a, -quat.b], [quat.d, -quat.c, quat.b, quat.a]);
        };

        /**
         * Converts a quaternion to an axis-angle rotation.
         * @param {ChalkboardQuaternion} quat - The quaternion
         * @param {ChalkboardVector} vect - The vector to rotate around
         * @returns {ChalkboardVector}
         * @example
         * // Returns the vector (1, 1, 1)
         * const rotated = Chalkboard.quat.toRotation(
         *   Chalkboard.quat.fromAxis(Chalkboard.vect.init(0, 0, 1), Chalkboard.PI(0.5)),
         *   Chalkboard.vect.init(1, 0, 1)
         * );
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
         * @example
         * // Returns "1 + 2i + 3j + 4k"
         * const str = Chalkboard.quat.toString(Chalkboard.quat.init(1, 2, 3, 4));
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
         * Converts a quaternion to a typed array.
         * @param {ChalkboardQuaternion} quat - The quaternion
         * @param {"int8" | "int16" | "int32" | "float32" | "float64" | "bigint64"} [type="float32"] - The type of the typed array, which can be "int8", "int16", "int32", "float32", "float64", or "bigint64" (optional, defaults to "float32")
         * @returns {Int8Array | Int16Array | Int32Array | Float32Array | Float64Array | BigInt64Array}
         * @example
         * // Returns a Float32Array [1, 2, 3, 4]
         * const q = Chalkboard.quat.init(1, 2, 3, 4);
         * const qf32 = Chalkboard.quat.toTypedArray(q);
         */
        export const toTypedArray = (quat: ChalkboardQuaternion, type: "int8" | "int16" | "int32" | "float32" | "float64" | "bigint64" = "float32"): Int8Array | Int16Array | Int32Array | Float32Array | Float64Array | BigInt64Array => {
            const arr = Chalkboard.quat.toArray(quat);
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
         * Converts a quaternion to a vector.
         * @param {ChalkboardQuaternion} quat - The quaternion
         * @returns {ChalkboadVector}
         * @example
         * // Returns the vector (1, 2, 3, 4)
         * const v = Chalkboard.quat.toVector(Chalkboard.quat.init(1, 2, 3, 4));
         */
        export const toVector = (quat: ChalkboardQuaternion): ChalkboardVector => {
            return Chalkboard.vect.init(quat.a, quat.b, quat.c, quat.d);
        };
    }
}
