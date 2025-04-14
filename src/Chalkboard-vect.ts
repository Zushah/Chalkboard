/*
    The Chalkboard Library - Vector Namespace
    Version 2.3.0 Boole
*/
/// <reference path="Chalkboard.ts"/>
namespace Chalkboard {
    /**
     * The vector namespace.
     * @namespace
     */
    export namespace vect {
        /**
         * Calculates the absolute value of a vector.
         * @param {ChalkboardVector} vect - The vector
         * @returns {ChalkboardVector}
         */
        export const absolute = (vect: ChalkboardVector): ChalkboardVector => {
            if (Chalkboard.vect.isDimensionOf(vect, 2)) {
                return Chalkboard.vect.init(Math.abs(vect.x), Math.abs(vect.y));
            } else if (Chalkboard.vect.isDimensionOf(vect, 3)) {
                return Chalkboard.vect.init(Math.abs(vect.x), Math.abs(vect.y), Math.abs(vect.z!));
            } else if (Chalkboard.vect.isDimensionOf(vect, 4)) {
                return Chalkboard.vect.init(Math.abs(vect.x), Math.abs(vect.y), Math.abs(vect.z!), Math.abs(vect.w!));
            } else {
                throw new TypeError('Parameter "vect" must be of type "ChalkboardVector" with 2, 3, or 4 dimensions.');
            }
        };

        /**
         * Calculates the addition of two vectors.
         * @param {ChalkboardVector} vect1 - The first vector
         * @param {ChalkboardVector} vect2 - The second vector
         * @returns {ChalkboardVector}
         */
        export const add = (vect1: ChalkboardVector, vect2: ChalkboardVector): ChalkboardVector => {
            if (Chalkboard.vect.isDimensionOf(vect1, 2) && Chalkboard.vect.isDimensionOf(vect2, 2)) {
                return Chalkboard.vect.init(vect1.x + vect2.x, vect1.y + vect2.y);
            } else if (Chalkboard.vect.isDimensionOf(vect1, 3) && Chalkboard.vect.isDimensionOf(vect2, 3)) {
                return Chalkboard.vect.init(vect1.x + vect2.x, vect1.y + vect2.y, vect1.z! + vect2.z!);
            } else if (Chalkboard.vect.isDimensionOf(vect1, 4) && Chalkboard.vect.isDimensionOf(vect2, 4)) {
                return Chalkboard.vect.init(vect1.x + vect2.x, vect1.y + vect2.y, vect1.z! + vect2.z!, vect1.w! + vect2.w!);
            } else {
                throw new TypeError('Parameters "vect1" and "vect2" must be of type "ChalkboardVector" with 2, 3, or 4 dimensions.');
            }
        };

        /**
         * Calculates the angle of a vector.
         * @param {ChalkboardVector} vect - The vector
         * @returns {ChalkboardVector}
         */
        export const ang = (vect: ChalkboardVector): number | number[] => {
            if (Chalkboard.vect.isDimensionOf(vect, 2)) {
                return Chalkboard.trig.arctan2(vect.y, vect.x);
            } else if (Chalkboard.vect.isDimensionOf(vect, 3)) {
                return [Math.acos(vect.x / Chalkboard.vect.mag(vect)), Math.acos(vect.y / Chalkboard.vect.mag(vect)), Math.acos(vect.z! / Chalkboard.vect.mag(vect))];
            } else if (Chalkboard.vect.isDimensionOf(vect, 4)) {
                return [
                    Math.acos(vect.x / Chalkboard.vect.mag(vect)),
                    Math.acos(vect.y / Chalkboard.vect.mag(vect)),
                    Math.acos(vect.z! / Chalkboard.vect.mag(vect)),
                    Math.acos(vect.w! / Chalkboard.vect.mag(vect))
                ];
            } else {
                throw new TypeError('Parameter "vect" must be of type "ChalkboardVector" with 2, 3, or 4 dimensions.');
            }
        };

        /**
         * Calculates the angle between two vectors
         * @param {ChalkboardVector} vect1 - The first vector
         * @param {ChalkboardVector} vect2 - The second vector
         * @returns {number}
         */
        export const angBetween = (vect1: ChalkboardVector, vect2: ChalkboardVector): number => {
            return Math.acos(Chalkboard.vect.dot(vect1, vect2) / (Chalkboard.vect.mag(vect1) * Chalkboard.vect.mag(vect2)));
        };

        /**
         * Calculates a vector constrained within a range.
         * @param {ChalkboardVector} vect - The vector
         * @param {number[]} [range=[0, 1]] - The range
         * @returns {ChalkboardVector}
         */
        export const constrain = (vect: ChalkboardVector, range: [number, number] = [0, 1]): ChalkboardVector => {
            if (Chalkboard.vect.isDimensionOf(vect, 2)) {
                return Chalkboard.vect.init(Chalkboard.numb.constrain(vect.x, range), Chalkboard.numb.constrain(vect.y, range));
            } else if (Chalkboard.vect.isDimensionOf(vect, 3)) {
                return Chalkboard.vect.init(Chalkboard.numb.constrain(vect.x, range), Chalkboard.numb.constrain(vect.y, range), Chalkboard.numb.constrain(vect.z!, range));
            } else if (Chalkboard.vect.isDimensionOf(vect, 4)) {
                return Chalkboard.vect.init(
                    Chalkboard.numb.constrain(vect.x, range),
                    Chalkboard.numb.constrain(vect.y, range),
                    Chalkboard.numb.constrain(vect.z!, range),
                    Chalkboard.numb.constrain(vect.w!, range)
                );
            } else {
                throw new TypeError('Parameter "vect" must be of type "ChalkboardVector" with 2, 3, or 4 dimensions.');
            }
        };

        /**
         * Copies a vector.
         * @param {ChalkboardVector} vect - The vector
         * @returns {ChalkboardVector}
         */
        export const copy = (vect: ChalkboardVector): ChalkboardVector => {
            return Object.create(Object.getPrototypeOf(vect), Object.getOwnPropertyDescriptors(vect));
        };

        /**
         * Calculates the cross product of two vectors.
         * @param {ChalkboardVector} vect1 - The first vector
         * @param {ChalkboardVector} vect2 - The second vector
         * @returns
         */
        export const cross = (vect1: ChalkboardVector, vect2: ChalkboardVector): ChalkboardVector => {
            if (Chalkboard.vect.isDimensionOf(vect1, 2) && Chalkboard.vect.isDimensionOf(vect2, 2)) {
                return Chalkboard.vect.init(0, 0, vect1.x * vect2.y - vect1.y * vect2.x);
            } else if (Chalkboard.vect.isDimensionOf(vect1, 3) && Chalkboard.vect.isDimensionOf(vect2, 3)) {
                return Chalkboard.vect.init(vect1.y * vect2.z! - vect1.z! * vect2.y, vect1.z! * vect2.x - vect1.x * vect2.z!, vect1.x * vect2.y - vect1.y * vect2.x);
            } else {
                throw new TypeError('Parameters "vect1" and "vect2" must be of type "ChalkboardVector" with 2 or 3 dimensions.');
            }
        };

        /**
         * Returns the dimension of a vector or vector field, which can be 2, 3, or 4.
         * @param {ChalkboardVector | ChalkboardVectorField} vectORvectfield - The vector or vector field
         * @returns {number}
         */
        export const dimension = (vectORvectfield: ChalkboardVector | ChalkboardVectorField): 2 | 3 | 4 => {
            const vect = vectORvectfield as ChalkboardVector;
            const vectfield = vectORvectfield as ChalkboardVectorField;
            if (
                (typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "undefined" && typeof vect.w === "undefined") ||
                (typeof vectfield.p === "string" && typeof vectfield.q === "string" && typeof vectfield.r === "undefined" && typeof vectfield.s === "undefined")
            ) {
                return 2;
            } else if (
                (typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "undefined") ||
                (typeof vectfield.p === "string" && typeof vectfield.q === "string" && typeof vectfield.r === "string" && typeof vectfield.s === "undefined")
            ) {
                return 3;
            } else if (
                (typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "number") ||
                (typeof vectfield.p === "string" && typeof vectfield.q === "string" && typeof vectfield.r === "string" && typeof vectfield.s === "string")
            ) {
                return 4;
            } else {
                throw new TypeError('Parameter "vectORvectfield" must be of type "ChalkboardVector" or "ChalkboardVectorField" with 2, 3, or 4 dimensions.');
            }
        };

        /**
         * Calculates the distance between two vectors.
         * @param {ChalkboardVector} vect1 - The first vector
         * @param {ChalkboardVector} vect2 - The second vector
         * @returns {ChalkboardVector}
         */
        export const dist = (vect1: ChalkboardVector, vect2: ChalkboardVector): number => {
            if (Chalkboard.vect.isDimensionOf(vect1, 2) && Chalkboard.vect.isDimensionOf(vect2, 2)) {
                return Chalkboard.real.sqrt((vect2.x - vect1.x) * (vect2.x - vect1.x) + (vect2.y - vect1.y) * (vect2.y - vect1.y));
            } else if (Chalkboard.vect.isDimensionOf(vect1, 3) && Chalkboard.vect.isDimensionOf(vect2, 3)) {
                return Chalkboard.real.sqrt((vect2.x - vect1.x) * (vect2.x - vect1.x) + (vect2.y - vect1.y) * (vect2.y - vect1.y) + (vect2.z! - vect1.z!) * (vect2.z! - vect1.z!));
            } else if (Chalkboard.vect.isDimensionOf(vect1, 4) && Chalkboard.vect.isDimensionOf(vect2, 4)) {
                return Chalkboard.real.sqrt(
                    (vect2.x - vect1.x) * (vect2.x - vect1.x) +
                        (vect2.y - vect1.y) * (vect2.y - vect1.y) +
                        (vect2.z! - vect1.z!) * (vect2.z! - vect1.z!) +
                        (vect2.w! - vect1.w!) * (vect2.w! - vect1.w!)
                );
            } else {
                throw new TypeError('Parameters "vect1" and "vect2" must be of type "ChalkboardVector" with 2, 3, or 4 dimensions.');
            }
        };

        /**
         * Calculates the distance squared between two vectors.
         * @param {ChalkboardVector} vect1 - The first vector
         * @param {ChalkboardVector} vect2 - The second vector
         * @returns {ChalkboardVector}
         */
        export const distsq = (vect1: ChalkboardVector, vect2: ChalkboardVector): number => {
            if (Chalkboard.vect.isDimensionOf(vect1, 2) && Chalkboard.vect.isDimensionOf(vect2, 2)) {
                return (vect2.x - vect1.x) * (vect2.x - vect1.x) + (vect2.y - vect1.y) * (vect2.y - vect1.y);
            } else if (Chalkboard.vect.isDimensionOf(vect1, 3) && Chalkboard.vect.isDimensionOf(vect2, 3)) {
                return (vect2.x - vect1.x) * (vect2.x - vect1.x) + (vect2.y - vect1.y) * (vect2.y - vect1.y) + (vect2.z! - vect1.z!) * (vect2.z! - vect1.z!);
            } else if (Chalkboard.vect.isDimensionOf(vect1, 4) && Chalkboard.vect.isDimensionOf(vect2, 4)) {
                return (
                    (vect2.x - vect1.x) * (vect2.x - vect1.x) +
                    (vect2.y - vect1.y) * (vect2.y - vect1.y) +
                    (vect2.z! - vect1.z!) * (vect2.z! - vect1.z!) +
                    (vect2.w! - vect1.w!) * (vect2.w! - vect1.w!)
                );
            } else {
                throw new TypeError('Parameters "vect1" and "vect2" must be of type "ChalkboardVector" with 2, 3, or 4 dimensions.');
            }
        };

        /**
         * Calculates the dot product of two vectors.
         * @param {ChalkboardVector} vect1 - The first vector
         * @param {ChalkboardVector} vect2 - The second vector
         * @returns {number}
         */
        export const dot = (vect1: ChalkboardVector, vect2: ChalkboardVector): number => {
            if (Chalkboard.vect.isDimensionOf(vect1, 2) && Chalkboard.vect.isDimensionOf(vect2, 2)) {
                return vect1.x * vect2.x + vect1.y * vect2.y;
            } else if (Chalkboard.vect.isDimensionOf(vect1, 3) && Chalkboard.vect.isDimensionOf(vect2, 3)) {
                return vect1.x * vect2.x + vect1.y * vect2.y + vect1.z! * vect2.z!;
            } else if (Chalkboard.vect.isDimensionOf(vect1, 4) && Chalkboard.vect.isDimensionOf(vect2, 4)) {
                return vect1.x * vect2.x + vect1.y * vect2.y + vect1.z! * vect2.z! + vect1.w! * vect2.w!;
            } else {
                throw new TypeError('Parameters "vect1" and "vect2" must be of type "ChalkboardVector" with 2, 3, or 4 dimensions.');
            }
        };

        /**
         * Initializes an empty vector.
         * @param {number} dimension - The dimension of the vector, which can be 2, 3, or 4
         * @returns {ChalkboardVector}
         */
        export const empty = (dimension: 2 | 3 | 4): ChalkboardVector => {
            const _null = null as unknown as number;
            if (dimension === 2) {
                return Chalkboard.vect.init(_null, _null);
            } else if (dimension === 3) {
                return Chalkboard.vect.init(_null, _null, _null);
            } else if (dimension === 4) {
                return Chalkboard.vect.init(_null, _null, _null, _null);
            } else {
                throw new TypeError('Parameter "dimension" must be 2, 3, or 4.');
            }
        };

        /**
         * Defines a vector field.
         * @param {string} p - The x-component (defined for 2D, 3D, and 4D vector fields)
         * @param {string} q - The y-component (defined for 2D, 3D, and 4D vector fields)
         * @param {string} [r] - The z-component (defined for 3D and 4D vector fields)
         * @param {string} [s] - The w-component (defined for 4D vector fields)
         * @returns {ChalkboardVectorField}
         */
        export const field = (p: string, q: string, r?: string, s?: string): ChalkboardVectorField => {
            if (r === undefined && s === undefined) {
                return { p: p, q: q };
            } else if (s === undefined) {
                return { p: p, q: q, r: r };
            } else {
                return { p: p, q: q, r: r, s: s };
            }
        };

        /**
         * Initializes a vector with all its components filled with one number.
         * @param {number} num - The number
         * @param {number} dimension - The dimension of the vector, which can be 2, 3, or 4
         * @returns {ChalkboardVector}
         */
        export const fill = (num: number, dimension: 2 | 3 | 4): ChalkboardVector => {
            if (dimension === 2) {
                return Chalkboard.vect.init(num, num);
            } else if (dimension === 3) {
                return Chalkboard.vect.init(num, num, num);
            } else if (dimension === 4) {
                return Chalkboard.vect.init(num, num, num, num);
            } else {
                throw new TypeError('Parameter "dimension" must be 2, 3, or 4.');
            }
        };

        /**
         * Converts a vector from an alternate coordinate system to the Cartesian coordinate system.
         * @param {ChalkboardVector} vect - The vector
         * @param {"polar" | "bipolar" | "cylindrical" | "spherical"} type - The alternate coordinate system, which can be "polar", "bipolar", "cylindrical", or "spherical"
         * @returns {ChalkboardVector}
         */
        export const fromAlternateToCartesian = (vect: ChalkboardVector, type: "polar" | "bipolar" | "cylindrical" | "spherical"): ChalkboardVector => {
            if (type === "polar" && Chalkboard.vect.isDimensionOf(vect, 2)) {
                return Chalkboard.vect.init(vect.x * Chalkboard.trig.cos(vect.y), vect.y * Chalkboard.trig.sin(vect.y));
            } else if (type === "bipolar" && Chalkboard.vect.isDimensionOf(vect, 2)) {
                return Chalkboard.vect.init(
                    (vect.x * vect.x - vect.y * vect.y) / 4,
                    Chalkboard.real.sqrt(16 * vect.x * vect.x - (vect.x * vect.x - vect.y * vect.y + 4) * (vect.x * vect.x - vect.y * vect.y + 4))
                );
            } else if (type === "cylindrical" && Chalkboard.vect.isDimensionOf(vect, 3)) {
                return Chalkboard.vect.init(vect.x * Chalkboard.trig.cos(vect.y), vect.x * Chalkboard.trig.sin(vect.y), vect.z!);
            } else if (type === "spherical" && Chalkboard.vect.isDimensionOf(vect, 3)) {
                return Chalkboard.vect.init(
                    vect.x * Chalkboard.trig.sin(vect.z!) * Chalkboard.trig.cos(vect.y),
                    vect.x * Chalkboard.trig.sin(vect.z!) * Chalkboard.trig.sin(vect.y),
                    vect.x * Chalkboard.trig.cos(vect.z!)
                );
            } else {
                throw new TypeError('Parameter "type" must be "polar", "bipolar", "cylindrical", or "spherical".');
            }
        };

        /**
         * Converts an angle or two angles to a 2D vector or a 3D vector, respectively.
         * @param {number} rad1 - The only angle (for 2D vectors) or the first angle (for 3D vectors)
         * @param {number} [rad2] - The second angle (for 3D vectors)
         * @returns {ChalkboardVector}
         */
        export const fromAngle = (rad1: number, rad2?: number): ChalkboardVector => {
            if (typeof rad2 === "undefined") {
                return Chalkboard.vect.init(Chalkboard.trig.cos(rad1), Chalkboard.trig.sin(rad1));
            } else {
                return Chalkboard.vect.init(Chalkboard.trig.cos(rad1) * Chalkboard.trig.cos(rad2), Chalkboard.trig.sin(rad1) * Chalkboard.trig.cos(rad2), Chalkboard.trig.sin(rad2));
            }
        };

        /**
         * Converts a vector from the Cartesian coordinate system to an alternate coordinate system.
         * @param {ChalkboardVector} vect - The vector
         * @param {"polar" | "bipolar" | "cylindrical" | "spherical"} type - The alternate coordinate system, which can be "polar", "bipolar", "cylindrical", or "spherical"
         * @returns {ChalkboardVector}
         */
        export const fromCartesianToAlternate = (vect: ChalkboardVector, type: "polar" | "bipolar" | "cylindrical" | "spherical"): ChalkboardVector => {
            if (type === "polar" && Chalkboard.vect.isDimensionOf(vect, 2)) {
                return Chalkboard.vect.init(Chalkboard.vect.mag(vect), Chalkboard.vect.ang(vect) as number);
            } else if (type === "bipolar" && Chalkboard.vect.isDimensionOf(vect, 2)) {
                return Chalkboard.vect.init((vect.x + 1) * (vect.x + 1) + vect.y * vect.y, (vect.x - 1) * (vect.x - 1) + vect.y * vect.y);
            } else if (type === "cylindrical" && Chalkboard.vect.isDimensionOf(vect, 3)) {
                return Chalkboard.vect.init(Chalkboard.vect.mag(Chalkboard.vect.init(vect.x, vect.y)), Chalkboard.vect.ang(Chalkboard.vect.init(vect.x, vect.y)) as number, vect.z!);
            } else if (type === "spherical" && Chalkboard.vect.isDimensionOf(vect, 3)) {
                return Chalkboard.vect.init(Chalkboard.vect.mag(vect), Chalkboard.vect.ang(Chalkboard.vect.init(vect.x, vect.y)) as number, (Chalkboard.vect.ang(vect) as number[])[2]);
            } else {
                throw new TypeError('Parameter "type" must be "polar", "bipolar", "cylindrical", or "spherical".');
            }
        };

        /**
         * Evaluates a vector field at a vector.
         * @param {ChalkboardVectorField} vectfield - The vector field
         * @param {ChalkboardVector} vect - The vector
         * @returns {ChalkboardVector}
         */
        export const fromField = (vectfield: ChalkboardVectorField, vect: ChalkboardVector): ChalkboardVector => {
            if (Chalkboard.vect.dimension(vectfield) === 2 && Chalkboard.vect.isDimensionOf(vect, 2)) {
                const p = Chalkboard.real.parse("(x, y) => " + vectfield.p),
                    q = Chalkboard.real.parse("(x, y) => " + vectfield.q);
                return Chalkboard.vect.init(p(vect.x, vect.y), q(vect.x, vect.y));
            } else if (Chalkboard.vect.dimension(vectfield) === 3 && Chalkboard.vect.isDimensionOf(vect, 3)) {
                const p = Chalkboard.real.parse("(x, y, z) => " + vectfield.p),
                    q = Chalkboard.real.parse("(x, y, z) => " + vectfield.q),
                    r = Chalkboard.real.parse("(x, y, z) => " + vectfield.r);
                return Chalkboard.vect.init(p(vect.x, vect.y, vect.z!), q(vect.x, vect.y, vect.z!), r(vect.x, vect.y, vect.z!));
            } else if (Chalkboard.vect.dimension(vectfield) === 4 && Chalkboard.vect.isDimensionOf(vect, 4)) {
                const p = Chalkboard.real.parse("(x, y, z, w) => " + vectfield.p),
                    q = Chalkboard.real.parse("(x, y, z, w) => " + vectfield.q),
                    r = Chalkboard.real.parse("(x, y, z, w) => " + vectfield.r),
                    s = Chalkboard.real.parse("(x, y, z, w) => " + vectfield.s);
                return Chalkboard.vect.init(p(vect.x, vect.y, vect.z!, vect.w!), q(vect.x, vect.y, vect.z!, vect.w!), r(vect.x, vect.y, vect.z!, vect.w!), s(vect.x, vect.y, vect.z!, vect.w!));
            } else {
                throw new TypeError('Parameters "vectfield" and "vect" must respectively be of type "ChalkboardVector" and "ChalkboardVectorField" with 2, 3, or 4 dimensions.');
            }
        };

        /**
         * Converts a vector from one dimension to another dimension.
         * @param {ChalkboardVector} vect - The vector
         * @returns {ChalkboardVector}
         */
        export const fromVector = (vect: ChalkboardVector): ChalkboardVector => {
            if (Chalkboard.vect.isDimensionOf(vect, 2)) {
                return Chalkboard.vect.init(vect.x, vect.y, 0);
            } else if (Chalkboard.vect.isDimensionOf(vect, 3)) {
                return Chalkboard.vect.init(vect.x, vect.y, vect.z!, 0);
            } else if (Chalkboard.vect.isDimensionOf(vect, 4)) {
                return Chalkboard.vect.init(vect.x, vect.y);
            } else {
                throw new TypeError('Parameter "vect" must be of type "ChalkboardVector" with 2, 3, or 4 dimensions.');
            }
        };

        /**
         * Initializes a new vector.
         * @param {number} x - The x-component (defined for 2D, 3D, and 4D vectors)
         * @param {number} y - The y-component (defined for 2D, 3D, and 4D vectors)
         * @param {number} [z] - The z-component (defined for 3D and 4D vectors)
         * @param {number} [w] - The w-component (defined for 4D vectors)
         * @returns {ChalkboardVector}
         */
        export const init = (x: number, y: number, z?: number, w?: number): ChalkboardVector => {
            if (z === undefined && w === undefined) {
                return { x: x, y: y };
            } else if (w === undefined) {
                return { x: x, y: y, z: z };
            } else {
                return { x: x, y: y, z: z, w: w };
            }
        };

        /**
         * Calculates the interpolation of a vector.
         * @param {ChalkboardVector} vect - The vector
         * @param {number} a - The x-value (for 2D, 3D, and 4D vectors)
         * @param {number} b - The y-value (for 2D, 3D, and 4D vectors)
         * @param {number} [c] - The z-value (for 3D and 4D vectors)
         * @param {number} [d] - The w-value (for 4D vectors)
         * @returns {ChalkboardVector}
         */
        export const interp = (vect: ChalkboardVector, a: number, b: number, c?: number, d?: number): ChalkboardVector => {
            if (Chalkboard.vect.isDimensionOf(vect, 2) && typeof c === "undefined" && typeof d === "undefined") {
                return Chalkboard.vect.init((a * vect.x + b * vect.y) / (a + b), (a * vect.x + b * vect.y) / (a + b));
            } else if (Chalkboard.vect.isDimensionOf(vect, 3) && typeof c === "number" && typeof d === "undefined") {
                return Chalkboard.vect.init(
                    (a * vect.x + b * vect.y + c * vect.z!) / (a + b + c),
                    (a * vect.x + b * vect.y + c * vect.z!) / (a + b + c),
                    (a * vect.x + b * vect.y + c * vect.z!) / (a + b + c)
                );
            } else if (Chalkboard.vect.isDimensionOf(vect, 4) && typeof c === "number" && typeof d === "number") {
                return Chalkboard.vect.init(
                    (a * vect.x + b * vect.y + c * vect.z! + d * vect.w!) / (a + b + c + d),
                    (a * vect.x + b * vect.y + c * vect.z! + d * vect.w!) / (a + b + c + d),
                    (a * vect.x + b * vect.y + c * vect.z! + d * vect.w!) / (a + b + c + d),
                    (a * vect.x + b * vect.y + c * vect.z! + d * vect.w!) / (a + b + c + d)
                );
            } else {
                throw new TypeError('Parameter "vect" must be of type "ChalkboardVector" with 2, 3, or 4 dimensions.');
            }
        };

        /**
         * Checks if the dimensions of two vectors are equal.
         * @param {ChalkboardVector} vect1 - The first vector
         * @param {ChalkboardVector} vect2 - The second vector
         * @returns {boolean}
         */
        export const isDimensionEqual = (vect1: ChalkboardVector, vect2: ChalkboardVector): boolean => {
            return Chalkboard.vect.dimension(vect1) === Chalkboard.vect.dimension(vect2);
        };

        /**
         * Checks if a vector or vector field is of a particular dimension.
         * @param {ChalkboardVector | ChalkboardVectorField} vectORvectfield - The vector or vector field
         * @param {number} dimension - The dimension, which must be 2, 3, or 4
         * @returns {boolean}
         */
        export const isDimensionOf = (vectORvectfield: ChalkboardVector | ChalkboardVectorField, dimension: 2 | 3 | 4): boolean => {
            if (dimension === 2) {
                return Chalkboard.vect.dimension(vectORvectfield) === 2;
            } else if (dimension === 3) {
                return Chalkboard.vect.dimension(vectORvectfield) === 3;
            } else if (dimension === 4) {
                return Chalkboard.vect.dimension(vectORvectfield) === 4;
            } else {
                throw new TypeError('Parameter "dimension" must be 2, 3, or 4.');
            }
        };

        /**
         * Checks if two vectors are equal.
         * @param {ChalkboardVector} vect1 - The first vector
         * @param {ChalkboardVector} vect2 - The second vector
         * @returns {boolean}
         */
        export const isEqual = (vect1: ChalkboardVector, vect2: ChalkboardVector): boolean => {
            if (Chalkboard.vect.isDimensionEqual(vect1, vect2)) {
                if (Chalkboard.vect.isDimensionOf(vect1, 2)) {
                    return vect1.x === vect2.x && vect1.y === vect2.y;
                } else if (Chalkboard.vect.isDimensionOf(vect1, 3)) {
                    return vect1.x === vect2.x && vect1.y === vect2.y && vect1.z === vect2.z;
                } else if (Chalkboard.vect.isDimensionOf(vect1, 4)) {
                    return vect1.x === vect2.x && vect1.y === vect2.y && vect1.z === vect2.z && vect1.w === vect2.w;
                } else {
                    throw new TypeError('Parameters "vect1" and "vect2" must be of type "ChalkboardVector" with 2, 3, or 4 dimensions.');
                }
            } else {
                return false;
            }
        };

        /**
         * Checks if a vector is normalized (has a magnitude of one).
         * @param {ChalkboardVector} vect - The vector
         * @returns {boolean}
         */
        export const isNormalized = (vect: ChalkboardVector): boolean => {
            return Chalkboard.vect.magsq(vect) === 1;
        };

        /**
         * Checks if two vectors are orthogonal.
         * @param {ChalkboardVector} vect1 - The first vector
         * @param {ChalkboardVector} vect2 - The second vector
         * @returns {boolean}
         */
        export const isOrthogonal = (vect1: ChalkboardVector, vect2: ChalkboardVector): boolean => {
            return Chalkboard.vect.dot(vect1, vect2) === 0;
        };

        /**
         * Checks if two vectors are parallel.
         * @param {ChalkboardVector} vect1 - The first vector
         * @param {ChalkboardVector} vect2 - The second vector
         * @returns {boolean}
         */
        export const isParallel = (vect1: ChalkboardVector, vect2: ChalkboardVector): boolean => {
            return Chalkboard.numb.isApproxEqual(Chalkboard.vect.dot(vect1, vect2), Chalkboard.vect.mag(vect1) * Chalkboard.vect.mag(vect2));
        };

        /**
         * Checks if a vector is a zero vector.
         * @param {ChalkboardVector} vect - The vector
         * @returns {boolean}
         */
        export const isZero = (vect: ChalkboardVector): boolean => {
            return Chalkboard.vect.isEqual(vect, Chalkboard.vect.zero(vect));
        };

        /**
         * Calculates the magnitude of a vector.
         * @param {ChalkboardVector} vect - The vector
         * @returns {number}
         */
        export const mag = (vect: ChalkboardVector): number => {
            if (Chalkboard.vect.isDimensionOf(vect, 2)) {
                return Chalkboard.real.sqrt(vect.x * vect.x + vect.y * vect.y);
            } else if (Chalkboard.vect.isDimensionOf(vect, 3)) {
                return Chalkboard.real.sqrt(vect.x * vect.x + vect.y * vect.y + vect.z! * vect.z!);
            } else if (Chalkboard.vect.isDimensionOf(vect, 4)) {
                return Chalkboard.real.sqrt(vect.x * vect.x + vect.y * vect.y + vect.z! * vect.z! + vect.w! * vect.w!);
            } else {
                throw new TypeError('Parameter "vect" must be of type "ChalkboardVector" with 2, 3, or 4 dimensions.');
            }
        };

        /**
         * Calculates a vector with the inputted magnitude.
         * @param {ChalkboardVector} vect - The vector
         * @param {number} num - The magnitude to set to
         * @returns {ChalkboardVector}
         */
        export const magset = (vect: ChalkboardVector, num: number): ChalkboardVector => {
            return Chalkboard.vect.scl(Chalkboard.vect.normalize(vect), num);
        };

        /**
         * Calculates the magnitude squared of a vector.
         * @param {ChalkboardVector} vect - The vector
         * @returns {number}
         */
        export const magsq = (vect: ChalkboardVector): number => {
            if (Chalkboard.vect.isDimensionOf(vect, 2)) {
                return vect.x * vect.x + vect.y * vect.y;
            } else if (Chalkboard.vect.isDimensionOf(vect, 3)) {
                return vect.x * vect.x + vect.y * vect.y + vect.z! * vect.z!;
            } else if (Chalkboard.vect.isDimensionOf(vect, 4)) {
                return vect.x * vect.x + vect.y * vect.y + vect.z! * vect.z! + vect.w! * vect.w!;
            } else {
                throw new TypeError('Parameter "vect" must be of type "ChalkboardVector" with 2, 3, or 4 dimensions.');
            }
        };

        /**
         * Calculates the negation of a vector.
         * @param {ChalkboardVector} vect - The vector
         * @returns {ChalkboardVector}
         */
        export const negate = (vect: ChalkboardVector): ChalkboardVector => {
            if (Chalkboard.vect.isDimensionOf(vect, 2)) {
                return Chalkboard.vect.init(-vect.x, -vect.y);
            } else if (Chalkboard.vect.isDimensionOf(vect, 3)) {
                return Chalkboard.vect.init(-vect.x, -vect.y, -vect.z!);
            } else if (Chalkboard.vect.isDimensionOf(vect, 4)) {
                return Chalkboard.vect.init(-vect.x, -vect.y, -vect.z!, -vect.w!);
            } else {
                throw new TypeError('Parameter "vect" must be of type "ChalkboardVector" with 2, 3, or 4 dimensions.');
            }
        };

        /**
         * Calculates the normalization of a vector.
         * @param {ChalkboardVector} vect - The vector
         * @returns {ChalkboardVector}
         */
        export const normalize = (vect: ChalkboardVector): ChalkboardVector => {
            if (Chalkboard.vect.isDimensionOf(vect, 2)) {
                return Chalkboard.vect.init(vect.x / Chalkboard.vect.mag(vect), vect.y / Chalkboard.vect.mag(vect));
            } else if (Chalkboard.vect.isDimensionOf(vect, 3)) {
                return Chalkboard.vect.init(vect.x / Chalkboard.vect.mag(vect), vect.y / Chalkboard.vect.mag(vect), vect.z! / Chalkboard.vect.mag(vect));
            } else if (Chalkboard.vect.isDimensionOf(vect, 4)) {
                return Chalkboard.vect.init(vect.x / Chalkboard.vect.mag(vect), vect.y / Chalkboard.vect.mag(vect), vect.z! / Chalkboard.vect.mag(vect), vect.w! / Chalkboard.vect.mag(vect));
            } else {
                throw new TypeError('Parameter "vect" must be of type "ChalkboardVector" with 2, 3, or 4 dimensions.');
            }
        };

        /**
         * Calculates the vector rejection of two vectors.
         * @param {ChalkboardVector} vect1 - The first vector
         * @param {ChalkboardVector} vect2 - The second vector
         * @returns {ChalkboardVector}
         */
        export const oproj = (vect1: ChalkboardVector, vect2: ChalkboardVector): ChalkboardVector => {
            return Chalkboard.vect.sub(vect1, Chalkboard.vect.proj(vect1, vect2));
        };

        /**
         * Prints a vector in the console.
         * @param {ChalkboardVector} vect - The vector
         * @returns {void}
         */
        export const print = (vect: ChalkboardVector): void => {
            console.log(Chalkboard.vect.toString(vect));
        };

        /**
         * Calculates the vector projection of two vectors.
         * @param {ChalkboardVector} vect1 - The first vector
         * @param {ChalkboardVector} vect2 - The second vector
         * @returns {ChalkboardVector}
         */
        export const proj = (vect1: ChalkboardVector, vect2: ChalkboardVector): ChalkboardVector => {
            return Chalkboard.vect.scl(vect2, Chalkboard.vect.dot(vect1, vect2) / Chalkboard.vect.dot(vect2, vect2));
        };

        /**
         * Initializes a random vector.
         * @param {number} inf - The lower bound
         * @param {number} sup - The upper bound
         * @param {number} dimension - The dimension of the vector, which can be 2, 3, or 4
         * @returns {ChalkboardVector}
         */
        export const random = (inf: number, sup: number, dimension: 2 | 3 | 4): ChalkboardVector => {
            if (dimension === 2) {
                return Chalkboard.vect.init(Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup));
            } else if (dimension === 3) {
                return Chalkboard.vect.init(Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup));
            } else if (dimension === 4) {
                return Chalkboard.vect.init(Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup));
            } else {
                throw new TypeError('Parameter "dimension" must be 2, 3, or 4.');
            }
        };

        /**
         * Calculates the reciprocal of a vector.
         * @param {ChalkboardVector} vect - The vector
         * @returns {ChalkboardVector}
         */
        export const reciprocate = (vect: ChalkboardVector): ChalkboardVector => {
            if (Chalkboard.vect.isDimensionOf(vect, 2)) {
                return Chalkboard.vect.init(1 / vect.x, 1 / vect.y);
            } else if (Chalkboard.vect.isDimensionOf(vect, 3)) {
                return Chalkboard.vect.init(1 / vect.x, 1 / vect.y, 1 / vect.z!);
            } else if (Chalkboard.vect.isDimensionOf(vect, 4)) {
                return Chalkboard.vect.init(1 / vect.x, 1 / vect.y, 1 / vect.z!, 1 / vect.w!);
            } else {
                throw new TypeError('Parameter "vect" must be of type "ChalkboardVector" with 2, 3, or 4 dimensions.');
            }
        };

        /**
         * Calculates the reflection vector of two vectors.
         * @param {ChalkboardVector} vect1 - The first vector (the incident vector)
         * @param {ChalkboardVector} vect2 - The second vector (the normal vector)
         * @returns {ChalkboardVector}
         */
        export const reflect = (vect1: ChalkboardVector, vect2: ChalkboardVector): ChalkboardVector => {
            return Chalkboard.vect.sub(vect1, Chalkboard.vect.scl(vect2, 2 * Chalkboard.vect.dot(vect1, vect2)));
        };

        /**
         * Calculates the refraction vector of two vectors.
         * @param {ChalkboardVector} vect1 - The first vector (the incident vector)
         * @param {ChalkboardVector} vect2 - The second vector (the normal vector)
         * @param {number} refractiveIndex - The refractive index of the refractive medium
         * @returns {ChalkboardVector}
         */
        export const refract = (vect1: ChalkboardVector, vect2: ChalkboardVector, refractiveIndex: number): ChalkboardVector => {
            if (refractiveIndex > 0) {
                const perp = Chalkboard.vect.scl(Chalkboard.vect.sub(vect1, Chalkboard.vect.scl(vect2, Chalkboard.vect.dot(vect1, vect2))), refractiveIndex);
                const parr = Chalkboard.vect.scl(vect2, -Chalkboard.real.sqrt(1 - refractiveIndex * refractiveIndex * (1 - Chalkboard.vect.dot(vect1, vect2) * Chalkboard.vect.dot(vect1, vect2))));
                return Chalkboard.vect.add(perp, parr);
            } else {
                throw new RangeError('Parameter "refractiveIndex" must be of type "number" greater than 0.');
            }
        };

        /**
         * Calculates the rounding of a vector.
         * @param {ChalkboardVector} vect - The vector
         * @returns {ChalkboardVector}
         */
        export const round = (vect: ChalkboardVector): ChalkboardVector => {
            if (Chalkboard.vect.isDimensionOf(vect, 2)) {
                return Chalkboard.vect.init(Math.round(vect.x), Math.round(vect.y));
            } else if (Chalkboard.vect.isDimensionOf(vect, 3)) {
                return Chalkboard.vect.init(Math.round(vect.x), Math.round(vect.y), Math.round(vect.z!));
            } else if (Chalkboard.vect.isDimensionOf(vect, 4)) {
                return Chalkboard.vect.init(Math.round(vect.x), Math.round(vect.y), Math.round(vect.z!), Math.round(vect.w!));
            } else {
                throw new TypeError('Parameter "vect" must be of type "ChalkboardVector" with 2, 3, or 4 dimensions.');
            }
        };

        /**
         * Calculates the scalar quadruple product of four vectors.
         * @param {ChalkboardVector} vect1 - The first vector
         * @param {ChalkboardVector} vect2 - The second vector
         * @param {ChalkboardVector} vect3 - The third vector
         * @param {ChalkboardVector} vect4 - The fourth vector
         * @returns {ChalkboardVector}
         */
        export const scalarQuadruple = (vect1: ChalkboardVector, vect2: ChalkboardVector, vect3: ChalkboardVector, vect4: ChalkboardVector): number => {
            return Chalkboard.vect.dot(Chalkboard.vect.cross(vect1, vect2), Chalkboard.vect.cross(vect3, vect4));
        };

        /**
         * Calculates the scalar triple product of three vectors.
         * @param {ChalkboardVector} vect1 - The first vector
         * @param {ChalkboardVector} vect2 - The second vector
         * @param {ChalkboardVector} vect3 - The third vector
         * @returns {ChalkboardVector}
         */
        export const scalarTriple = (vect1: ChalkboardVector, vect2: ChalkboardVector, vect3: ChalkboardVector): number => {
            return Chalkboard.vect.dot(vect1, Chalkboard.vect.cross(vect2, vect3));
        };

        /**
         * Calculates the scalar multiplication of a vector.
         * @param {ChalkboardVector} vect - The vector
         * @param {number} num - The scalar
         * @returns {ChalkboardVector}
         */
        export const scl = (vect: ChalkboardVector, num: number): ChalkboardVector => {
            if (Chalkboard.vect.isDimensionOf(vect, 2)) {
                return Chalkboard.vect.init(vect.x * num, vect.y * num);
            } else if (Chalkboard.vect.isDimensionOf(vect, 3)) {
                return Chalkboard.vect.init(vect.x * num, vect.y * num, vect.z! * num);
            } else if (Chalkboard.vect.isDimensionOf(vect, 4)) {
                return Chalkboard.vect.init(vect.x * num, vect.y * num, vect.z! * num, vect.w! * num);
            } else {
                throw new TypeError('Parameter "vect" must be of type "ChalkboardVector" with 2, 3, or 4 dimensions.');
            }
        };

        /**
         * Calculates the slope of a vector.
         * @param {ChalkboardVector} vect - The vector
         * @returns {number}
         */
        export const slope = (vect: ChalkboardVector): number => {
            if (Chalkboard.vect.isDimensionOf(vect, 2)) {
                return vect.y / vect.x;
            } else if (Chalkboard.vect.isDimensionOf(vect, 3)) {
                return vect.z! / Chalkboard.real.sqrt(vect.x * vect.x + vect.y * vect.y);
            } else if (Chalkboard.vect.isDimensionOf(vect, 4)) {
                return vect.w! / Chalkboard.real.sqrt(vect.x * vect.x + vect.y * vect.y + vect.z! * vect.z!);
            } else {
                throw new TypeError('Parameter "vect" must be of type "ChalkboardVector" with 2, 3, or 4 dimensions.');
            }
        };

        /**
         * Calculates the subtraction of two vectors.
         * @param {ChalkboardVector} vect1 - The first vector
         * @param {ChalkboardVector} vect2 - The second vector
         * @returns {ChalkboardVector}
         */
        export const sub = (vect1: ChalkboardVector, vect2: ChalkboardVector): ChalkboardVector => {
            if (Chalkboard.vect.isDimensionOf(vect1, 2) && Chalkboard.vect.isDimensionOf(vect2, 2)) {
                return Chalkboard.vect.init(vect1.x - vect2.x, vect1.y - vect2.y);
            } else if (Chalkboard.vect.isDimensionOf(vect1, 3) && Chalkboard.vect.isDimensionOf(vect2, 3)) {
                return Chalkboard.vect.init(vect1.x - vect2.x, vect1.y - vect2.y, vect1.z! - vect2.z!);
            } else if (Chalkboard.vect.isDimensionOf(vect1, 4) && Chalkboard.vect.isDimensionOf(vect2, 4)) {
                return Chalkboard.vect.init(vect1.x - vect2.x, vect1.y - vect2.y, vect1.z! - vect2.z!, vect1.w! - vect2.w!);
            } else {
                throw new TypeError('Parameters "vect1" and "vect2" must be of type "ChalkboardVector" with 2, 3, or 4 dimensions.');
            }
        };

        /**
         * Converts a vector to an array.
         * @param {ChalkboardVector} vect - The vector
         * @returns {number[]}
         */
        export const toArray = (vect: ChalkboardVector): [number, number] | [number, number, number] | [number, number, number, number] => {
            if (Chalkboard.vect.isDimensionOf(vect, 2)) {
                return [vect.x, vect.y];
            } else if (Chalkboard.vect.isDimensionOf(vect, 3)) {
                return [vect.x, vect.y, vect.z!];
            } else if (Chalkboard.vect.isDimensionOf(vect, 4)) {
                return [vect.x, vect.y, vect.z!, vect.w!];
            } else {
                throw new TypeError('Parameter "vect" must be of type "ChalkboardVector" with 2, 3, or 4 dimensions.');
            }
        };

        /**
         * Converts a vector to a complex number.
         * @param {ChalkboardVector} vect - The vector
         * @returns {ChalkboardComplex}
         */
        export const toComplex = (vect: ChalkboardVector): ChalkboardComplex => {
            return Chalkboard.comp.init(vect.x, vect.y);
        };

        /**
         * Converts a vector to a matrix.
         * @param {ChalkboardVector} vect - The vector
         * @param {number} [axis=0] - The axis of the matrix to convert to, which can be 0 for a column matrix or 1 for a row matrix
         * @returns {ChalkboardMatrix}
         */
        export const toMatrix = (vect: ChalkboardVector, axis: 0 | 1 = 0): ChalkboardMatrix => {
            if (Chalkboard.vect.isDimensionOf(vect, 2)) {
                if (axis === 0) {
                    return Chalkboard.matr.init([vect.x], [vect.y]);
                } else if (axis === 1) {
                    return Chalkboard.matr.init([vect.x, vect.y]);
                } else {
                    throw new TypeError('Parameter "axis" must be 0 or 1.');
                }
            } else if (Chalkboard.vect.isDimensionOf(vect, 3)) {
                if (axis === 0) {
                    return Chalkboard.matr.init([vect.x], [vect.y], [vect.z!]);
                } else if (axis === 1) {
                    return Chalkboard.matr.init([vect.x, vect.y, vect.z!]);
                } else {
                    throw new TypeError('Parameter "axis" must be 0 or 1.');
                }
            } else if (Chalkboard.vect.isDimensionOf(vect, 4)) {
                if (axis === 0) {
                    return Chalkboard.matr.init([vect.x], [vect.y], [vect.z!], [vect.w!]);
                } else if (axis === 1) {
                    return Chalkboard.matr.init([vect.x, vect.y, vect.z!, vect.w!]);
                } else {
                    throw new TypeError('Parameter "axis" must be 0 or 1.');
                }
            } else {
                throw new TypeError('Parameter "vect" must be of type "ChalkboardVector" with 2, 3, or 4 dimensions.');
            }
        };

        /**
         * Converts a vector to a quaternion.
         * @param {ChalkboardVector} vect - The vector
         * @returns {ChalkboardQuaternion}
         */
        export const toQuaternion = (vect: ChalkboardVector): ChalkboardQuaternion => {
            if (Chalkboard.vect.isDimensionOf(vect, 2)) {
                return Chalkboard.quat.init(vect.x, vect.y, 0, 0);
            } else if (Chalkboard.vect.isDimensionOf(vect, 3)) {
                return Chalkboard.quat.init(0, vect.x, vect.y, vect.z!);
            } else if (Chalkboard.vect.isDimensionOf(vect, 4)) {
                return Chalkboard.quat.init(vect.x, vect.y, vect.z!, vect.w!);
            } else {
                throw new TypeError('Parameter "vect" must be of type "ChalkboardVector" with 2, 3, or 4 dimensions.');
            }
        };

        /**
         * Converts a vector to a string
         * @param {ChalkboardVector} vect - The vector
         * @returns {string}
         */
        export const toString = (vect: ChalkboardVector): string => {
            if (Chalkboard.vect.isDimensionOf(vect, 2)) {
                return "(" + vect.x.toString() + ", " + vect.y.toString() + ")";
            } else if (Chalkboard.vect.isDimensionOf(vect, 3)) {
                return "(" + vect.x.toString() + ", " + vect.y.toString() + ", " + vect.z!.toString() + ")";
            } else if (Chalkboard.vect.isDimensionOf(vect, 4)) {
                return "(" + vect.x.toString() + ", " + vect.y.toString() + ", " + vect.z!.toString() + ", " + vect.w!.toString() + ")";
            } else {
                throw new TypeError('Parameter "vect" must be of type "ChalkboardVector" with 2, 3, or 4 dimensions.');
            }
        };

        /**
         * Converts a vector to a tensor.
         * @param {ChalkboardVector} vect - The vector
         * @param {number[]} size - The size of the tensor
         * @returns {ChalkboardTensor}
         */
        export const toTensor = (vect: ChalkboardVector, ...size: number[]): ChalkboardTensor => {
            if (Array.isArray(size[0])) {
                size = size[0];
            }
            return Chalkboard.tens.resize(Chalkboard.vect.toMatrix(vect), ...size);
        };

        /**
         * Calculates the vector quadruple product of four vectors.
         * @param {ChalkboardVector} vect1 - The first vector
         * @param {ChalkboardVector} vect2 - The second vector
         * @param {ChalkboardVector} vect3 - The third vector
         * @param {ChalkboardVector} vect4 - The fourth vector
         * @returns {ChalkboardVector}
         */
        export const vectorQuadruple = (vect1: ChalkboardVector, vect2: ChalkboardVector, vect3: ChalkboardVector, vect4: ChalkboardVector): ChalkboardVector => {
            return Chalkboard.vect.cross(Chalkboard.vect.cross(vect1, vect2), Chalkboard.vect.cross(vect3, vect4));
        };

        /**
         * Calculates the vector triple product of four vectors.
         * @param {ChalkboardVector} vect1 - The first vector
         * @param {ChalkboardVector} vect2 - The second vector
         * @param {ChalkboardVector} vect3 - The third vector
         * @returns {ChalkboardVector}
         */
        export const vectorTriple = (vect1: ChalkboardVector, vect2: ChalkboardVector, vect3: ChalkboardVector): ChalkboardVector => {
            return Chalkboard.vect.cross(vect1, Chalkboard.vect.cross(vect2, vect3));
        };

        /**
         * Calculates a vector multiplied by zero.
         * @param {ChalkboardVector} vect - The vector
         * @returns {ChalkboardVector}
         */
        export const zero = (vect: ChalkboardVector): ChalkboardVector => {
            if (Chalkboard.vect.isDimensionOf(vect, 2)) {
                return Chalkboard.vect.init(0, 0);
            } else if (Chalkboard.vect.isDimensionOf(vect, 3)) {
                return Chalkboard.vect.init(0, 0, 0);
            } else if (Chalkboard.vect.isDimensionOf(vect, 4)) {
                return Chalkboard.vect.init(0, 0, 0, 0);
            } else {
                throw new TypeError('Parameter "vect" must be of type "ChalkboardVector" with 2, 3, or 4 dimensions.');
            }
        };
    }
}
