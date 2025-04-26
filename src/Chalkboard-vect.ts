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
        /** @ignore */
        const $ = (input: ChalkboardVector): ChalkboardVector => {
            const v = input as { x: number, y: number, z?: number, w?: number };
            if (v && typeof v.x === "number" && typeof v.y === "number") {
                return input as ChalkboardVector;
            }
            if (Array.isArray(input)) {
                if (input.length > 0 && Array.isArray(input[0])) {
                    const matr = input as ChalkboardMatrix;
                    const rows = Chalkboard.matr.rows(matr);
                    const cols = Chalkboard.matr.cols(matr);
                    if (cols === 1) {
                        if (rows === 2) return Chalkboard.vect.init(matr[0][0], matr[1][0]);
                        if (rows === 3) return Chalkboard.vect.init(matr[0][0], matr[1][0], matr[2][0]);
                        if (rows === 4) return Chalkboard.vect.init(matr[0][0], matr[1][0], matr[2][0], matr[3][0]);
                    } else if (rows === 1) {
                        if (cols === 2) return Chalkboard.vect.init(matr[0][0], matr[0][1]);
                        if (cols === 3) return Chalkboard.vect.init(matr[0][0], matr[0][1], matr[0][2]);
                        if (cols === 4) return Chalkboard.vect.init(matr[0][0], matr[0][1], matr[0][2], matr[0][3]);
                    }
                } else {
                    const arr = input as number[];
                    if (arr.length === 2) return Chalkboard.vect.init(arr[0], arr[1]);
                    if (arr.length === 3) return Chalkboard.vect.init(arr[0], arr[1], arr[2]);
                    if (arr.length === 4) return Chalkboard.vect.init(arr[0], arr[1], arr[2], arr[3]);
                }
            }
            if (input instanceof Float32Array || input instanceof Float64Array) {
                const arr = input as Float32Array | Float64Array;
                if (arr.length === 2) return Chalkboard.vect.init(arr[0], arr[1]);
                if (arr.length === 3) return Chalkboard.vect.init(arr[0], arr[1], arr[2]);
                if (arr.length === 4) return Chalkboard.vect.init(arr[0], arr[1], arr[2], arr[3]);
            }
            if (typeof input === "string") {
                try {
                    const parsed = JSON.parse(input as string);
                    if (parsed && typeof parsed === "object" && typeof parsed.x === "number" && typeof parsed.y === "number") {
                        return Chalkboard.vect.init(parsed.x, parsed.y, parsed.z !== undefined ? parsed.z : undefined, parsed.w !== undefined ? parsed.w : undefined);
                    }
                } catch (e) {
                    const str = (input as string).trim();
                    if (str.startsWith("(") && str.endsWith(")")) {
                        const content = str.substring(1, str.length - 1);
                        const components = content.split(",").map(part => parseFloat(part.trim()));
                        if (components.length >= 2 && components.every(p => !isNaN(p))) {
                            if (components.length === 2) return Chalkboard.vect.init(components[0], components[1]);
                            if (components.length === 3) return Chalkboard.vect.init(components[0], components[1], components[2]);
                            if (components.length === 4) return Chalkboard.vect.init(components[0], components[1], components[2], components[3]);
                        }
                    }
                }
            }
            throw new TypeError(`Invalid ChalkboardVector input: ${JSON.stringify(input)}`);
        };

        /**
         * Calculates the absolute value of a vector.
         * @param {ChalkboardVector} vect - The vector
         * @returns {ChalkboardVector}
         * @example
         * // Returns (1, 2, 3)
         * const v = Chalkboard.vect.absolute(Chalkboard.vect.init(-1, -2, 3));
         */
        export const absolute = (vect: ChalkboardVector): ChalkboardVector => {
            vect = $(vect) as { x: number, y: number, z?: number, w?: number };
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
         * @example
         * // Returns (5, 7, 9)
         * const sum = Chalkboard.vect.add(Chalkboard.vect.init(2, 3, 4), Chalkboard.vect.init(3, 4, 5));
         */
        export const add = (vect1: ChalkboardVector, vect2: ChalkboardVector): ChalkboardVector => {
            vect1 = $(vect1) as { x: number, y: number, z?: number, w?: number };
            vect2 = $(vect2) as { x: number, y: number, z?: number, w?: number };
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
         * @example
         * // Returns 0.7854 (approximately π/4 radians)
         * const angle = Chalkboard.vect.ang(Chalkboard.vect.init(1, 1));
         */
        export const ang = (vect: ChalkboardVector): number | number[] => {
            vect = $(vect) as { x: number, y: number, z?: number, w?: number };
            if (Chalkboard.vect.isDimensionOf(vect, 2)) {
                return Chalkboard.trig.arctan2(vect.y, vect.x);
            } else if (Chalkboard.vect.isDimensionOf(vect, 3)) {
                const m = Chalkboard.vect.mag(vect);
                return [Math.acos(vect.x / m), Math.acos(vect.y / m), Math.acos(vect.z! / m)];
            } else if (Chalkboard.vect.isDimensionOf(vect, 4)) {
                const m = Chalkboard.vect.mag(vect);
                return [Math.acos(vect.x / m), Math.acos(vect.y / m), Math.acos(vect.z! / m), Math.acos(vect.w! / m)];
            } else {
                throw new TypeError('Parameter "vect" must be of type "ChalkboardVector" with 2, 3, or 4 dimensions.');
            }
        };

        /**
         * Calculates the angle between two vectors
         * @param {ChalkboardVector} vect1 - The first vector
         * @param {ChalkboardVector} vect2 - The second vector
         * @returns {number}
         * @example
         * // Returns 0.5236 (approximately π/6 radians)
         * const angle = Chalkboard.vect.angBetween(Chalkboard.vect.init(1, 0), Chalkboard.vect.init(0.866, 0.5));
         */
        export const angBetween = (vect1: ChalkboardVector, vect2: ChalkboardVector): number => {
            return Math.acos(Chalkboard.vect.dot(vect1, vect2) / (Chalkboard.vect.mag(vect1) * Chalkboard.vect.mag(vect2)));
        };

        /**
         * Calculates a vector constrained within a range.
         * @param {ChalkboardVector} vect - The vector
         * @param {number[]} [range=[0, 1]] - The range
         * @returns {ChalkboardVector}
         * @example
         * // Returns (0.5, 1, 0.7)
         * const v = Chalkboard.vect.constrain(Chalkboard.vect.init(1.5, 2, 0.7), [0, 1]);
         */
        export const constrain = (vect: ChalkboardVector, range: [number, number] = [0, 1]): ChalkboardVector => {
            vect = $(vect) as { x: number, y: number, z?: number, w?: number };
            if (Chalkboard.vect.isDimensionOf(vect, 2)) {
                return Chalkboard.vect.init(Chalkboard.numb.constrain(vect.x, range), Chalkboard.numb.constrain(vect.y, range));
            } else if (Chalkboard.vect.isDimensionOf(vect, 3)) {
                return Chalkboard.vect.init(Chalkboard.numb.constrain(vect.x, range), Chalkboard.numb.constrain(vect.y, range), Chalkboard.numb.constrain(vect.z!, range));
            } else if (Chalkboard.vect.isDimensionOf(vect, 4)) {
                return Chalkboard.vect.init(Chalkboard.numb.constrain(vect.x, range), Chalkboard.numb.constrain(vect.y, range), Chalkboard.numb.constrain(vect.z!, range), Chalkboard.numb.constrain(vect.w!, range));
            } else {
                throw new TypeError('Parameter "vect" must be of type "ChalkboardVector" with 2, 3, or 4 dimensions.');
            }
        };

        /**
         * Copies a vector.
         * @param {ChalkboardVector} vect - The vector
         * @returns {ChalkboardVector}
         * @example
         * // Returns (2, 3, 4)
         * const v2 = Chalkboard.vect.copy(Chalkboard.vect.init(2, 3, 4));
         */
        export const copy = (vect: ChalkboardVector): ChalkboardVector => {
            vect = $(vect) as { x: number, y: number, z?: number, w?: number };
            const _vect = Object.create(Object.getPrototypeOf(vect), Object.getOwnPropertyDescriptors(vect));
            if (mode === "vector") return _vect;
            if (mode === "array") return Chalkboard.vect.toArray(_vect);
            if (mode === "float32array") return new Float32Array(Chalkboard.vect.toArray(_vect));
            if (mode === "float64array") return new Float64Array(Chalkboard.vect.toArray(_vect));
            if (mode === "matrix") return Chalkboard.vect.toMatrix(_vect);
            if (mode === "string") return Chalkboard.vect.toString(_vect);
            if (mode === "json") return JSON.stringify(_vect);
            return _vect;
        };

        /**
         * Calculates the cross product of two vectors.
         * @param {ChalkboardVector} vect1 - The first vector
         * @param {ChalkboardVector} vect2 - The second vector
         * @returns {ChalkboardVector}
         * @example
         * // Returns (0, 0, 1) (the z-component of cross product)
         * const c = Chalkboard.vect.cross(Chalkboard.vect.init(1, 0), Chalkboard.vect.init(0, 1));
         */
        export const cross = (vect1: ChalkboardVector, vect2: ChalkboardVector): ChalkboardVector => {
            vect1 = $(vect1) as { x: number, y: number, z?: number, w?: number };
            vect2 = $(vect2) as { x: number, y: number, z?: number, w?: number };
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
         * @example
         * // Returns 3
         * const dim = Chalkboard.vect.dimension(Chalkboard.vect.init(1, 2, 3));
         */
        export const dimension = (vectORvectfield: ChalkboardVector | ChalkboardVectorField): 2 | 3 | 4 => {
            try {
                const v = $(vectORvectfield as ChalkboardVector) as { x: number, y: number, z?: number, w?: number };
                if (typeof v.x === "number" && typeof v.y === "number" && typeof v.z === "undefined" && typeof v.w === "undefined") {
                    return 2;
                } else if (typeof v.x === "number" && typeof v.y === "number" && typeof v.z === "number" && typeof v.w === "undefined") {
                    return 3;
                } else if (typeof v.x === "number" && typeof v.y === "number" && typeof v.z === "number" && typeof v.w === "number") {
                    return 4;
                }
            } catch {
                const f = vectORvectfield as ChalkboardVectorField;
                if (typeof f.p === "string" && typeof f.q === "string" && typeof f.r === "undefined" && typeof f.s === "undefined") {
                    return 2;
                } else if (typeof f.p === "string" && typeof f.q === "string" && typeof f.r === "string" && typeof f.s === "undefined") {
                    return 3;
                } else if (typeof f.p === "string" && typeof f.q === "string" && typeof f.r === "string" && typeof f.s === "string") {
                    return 4;
                }
            }
            throw new TypeError('Parameter "vectORvectfield" must be a vector or vector field with 2, 3, or 4 dimensions.');
        };

        /**
         * Calculates the distance between two vectors.
         * @param {ChalkboardVector} vect1 - The first vector
         * @param {ChalkboardVector} vect2 - The second vector
         * @returns {ChalkboardVector}
         * @example
         * // Returns 5 (distance from origin to (3, 4))
         * const d = Chalkboard.vect.dist(Chalkboard.vect.init(0, 0), Chalkboard.vect.init(3, 4));
         */
        export const dist = (vect1: ChalkboardVector, vect2: ChalkboardVector): number => {
            vect1 = $(vect1) as { x: number, y: number, z?: number, w?: number };
            vect2 = $(vect2) as { x: number, y: number, z?: number, w?: number };
            if (Chalkboard.vect.isDimensionOf(vect1, 2) && Chalkboard.vect.isDimensionOf(vect2, 2)) {
                return Chalkboard.real.sqrt((vect2.x - vect1.x) * (vect2.x - vect1.x) + (vect2.y - vect1.y) * (vect2.y - vect1.y));
            } else if (Chalkboard.vect.isDimensionOf(vect1, 3) && Chalkboard.vect.isDimensionOf(vect2, 3)) {
                return Chalkboard.real.sqrt((vect2.x - vect1.x) * (vect2.x - vect1.x) + (vect2.y - vect1.y) * (vect2.y - vect1.y) + (vect2.z! - vect1.z!) * (vect2.z! - vect1.z!));
            } else if (Chalkboard.vect.isDimensionOf(vect1, 4) && Chalkboard.vect.isDimensionOf(vect2, 4)) {
                return Chalkboard.real.sqrt((vect2.x - vect1.x) * (vect2.x - vect1.x) + (vect2.y - vect1.y) * (vect2.y - vect1.y) + (vect2.z! - vect1.z!) * (vect2.z! - vect1.z!) + (vect2.w! - vect1.w!) * (vect2.w! - vect1.w!));
            } else {
                throw new TypeError('Parameters "vect1" and "vect2" must be of type "ChalkboardVector" with 2, 3, or 4 dimensions.');
            }
        };

        /**
         * Calculates the distance squared between two vectors.
         * @param {ChalkboardVector} vect1 - The first vector
         * @param {ChalkboardVector} vect2 - The second vector
         * @returns {ChalkboardVector}
         * @example
         * // Returns 25 (squared distance from origin to (3, 4))
         * const d2 = Chalkboard.vect.distsq(Chalkboard.vect.init(0, 0), Chalkboard.vect.init(3, 4));
         */
        export const distsq = (vect1: ChalkboardVector, vect2: ChalkboardVector): number => {
            vect1 = $(vect1) as { x: number, y: number, z?: number, w?: number };
            vect2 = $(vect2) as { x: number, y: number, z?: number, w?: number };
            if (Chalkboard.vect.isDimensionOf(vect1, 2) && Chalkboard.vect.isDimensionOf(vect2, 2)) {
                return (vect2.x - vect1.x) * (vect2.x - vect1.x) + (vect2.y - vect1.y) * (vect2.y - vect1.y);
            } else if (Chalkboard.vect.isDimensionOf(vect1, 3) && Chalkboard.vect.isDimensionOf(vect2, 3)) {
                return (vect2.x - vect1.x) * (vect2.x - vect1.x) + (vect2.y - vect1.y) * (vect2.y - vect1.y) + (vect2.z! - vect1.z!) * (vect2.z! - vect1.z!);
            } else if (Chalkboard.vect.isDimensionOf(vect1, 4) && Chalkboard.vect.isDimensionOf(vect2, 4)) {
                return ((vect2.x - vect1.x) * (vect2.x - vect1.x) + (vect2.y - vect1.y) * (vect2.y - vect1.y) + (vect2.z! - vect1.z!) * (vect2.z! - vect1.z!) + (vect2.w! - vect1.w!) * (vect2.w! - vect1.w!));
            } else {
                throw new TypeError('Parameters "vect1" and "vect2" must be of type "ChalkboardVector" with 2, 3, or 4 dimensions.');
            }
        };

        /**
         * Calculates the dot product of two vectors.
         * @param {ChalkboardVector} vect1 - The first vector
         * @param {ChalkboardVector} vect2 - The second vector
         * @returns {number}
         * @example
         * // Returns 32
         * const dot = Chalkboard.vect.dot(Chalkboard.vect.init(2, 3, 4), Chalkboard.vect.init(3, 4, 5));
         */
        export const dot = (vect1: ChalkboardVector, vect2: ChalkboardVector): number => {
            vect1 = $(vect1) as { x: number, y: number, z?: number, w?: number };
            vect2 = $(vect2) as { x: number, y: number, z?: number, w?: number };
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
         * @example
         * // Returns (null, null, null)
         * const v = Chalkboard.vect.empty(3);
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
         * @example
         * // Defines f(x, y) = (x^2, y^2)
         * const f = Chalkboard.vect.field("x*x", "y*y");
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
         * @example
         * // Returns (5, 5, 5)
         * const v = Chalkboard.vect.fill(5, 3);
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
         * @example
         * // Returns (1, 0) (converts polar coordinates (1, 0) to Cartesian)
         * const v = Chalkboard.vect.fromAlternateToCartesian(Chalkboard.vect.init(1, 0), "polar");
         */
        export const fromAlternateToCartesian = (vect: ChalkboardVector, type: "polar" | "bipolar" | "cylindrical" | "spherical"): ChalkboardVector => {
            vect = $(vect) as { x: number, y: number, z?: number, w?: number };
            if (type === "polar" && Chalkboard.vect.isDimensionOf(vect, 2)) {
                return Chalkboard.vect.init(vect.x * Chalkboard.trig.cos(vect.y), vect.y * Chalkboard.trig.sin(vect.y));
            } else if (type === "bipolar" && Chalkboard.vect.isDimensionOf(vect, 2)) {
                return Chalkboard.vect.init((vect.x * vect.x - vect.y * vect.y) / 4, Chalkboard.real.sqrt(16 * vect.x * vect.x - (vect.x * vect.x - vect.y * vect.y + 4) * (vect.x * vect.x - vect.y * vect.y + 4)));
            } else if (type === "cylindrical" && Chalkboard.vect.isDimensionOf(vect, 3)) {
                return Chalkboard.vect.init(vect.x * Chalkboard.trig.cos(vect.y), vect.x * Chalkboard.trig.sin(vect.y), vect.z!);
            } else if (type === "spherical" && Chalkboard.vect.isDimensionOf(vect, 3)) {
                return Chalkboard.vect.init(vect.x * Chalkboard.trig.sin(vect.z!) * Chalkboard.trig.cos(vect.y), vect.x * Chalkboard.trig.sin(vect.z!) * Chalkboard.trig.sin(vect.y), vect.x * Chalkboard.trig.cos(vect.z!));
            } else {
                throw new TypeError('Parameter "type" must be "polar", "bipolar", "cylindrical", or "spherical".');
            }
        };

        /**
         * Converts an angle or two angles to a 2D vector or a 3D vector, respectively.
         * @param {number} rad1 - The only angle (for 2D vectors) or the first angle (for 3D vectors)
         * @param {number} [rad2] - The second angle (for 3D vectors)
         * @returns {ChalkboardVector}
         * @example
         * // Returns (1, 0) (unit vector at 0 radians)
         * const v = Chalkboard.vect.fromAngle(0);
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
         * @example
         * // Returns (1, 0) (radius and angle of the vector (1, 0))
         * const v = Chalkboard.vect.fromCartesianToAlternate(Chalkboard.vect.init(1, 0), "polar");
         */
        export const fromCartesianToAlternate = (vect: ChalkboardVector, type: "polar" | "bipolar" | "cylindrical" | "spherical"): ChalkboardVector => {
            vect = $(vect) as { x: number, y: number, z?: number, w?: number };
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
         * @example
         * // Returns (4, 1) (evaluates f(x, y) at point (2, 1))
         * const f = Chalkboard.vect.field("x*x", "y");
         * const v = Chalkboard.vect.fromField(f, Chalkboard.vect.init(2, 1));
         */
        export const fromField = (vectfield: ChalkboardVectorField, vect: ChalkboardVector): ChalkboardVector => {
            vect = $(vect) as { x: number, y: number, z?: number, w?: number };
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
         * @example
         * // Returns (2, 3, 0) (converts a 2D vector to a 3D vector)
         * const v3d = Chalkboard.vect.fromVector(Chalkboard.vect.init(2, 3));
         */
        export const fromVector = (vect: ChalkboardVector): ChalkboardVector => {
            vect = $(vect) as { x: number, y: number, z?: number, w?: number };
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
         * @example
         * // Returns (2, 3, 4)
         * const v = Chalkboard.vect.init(2, 3, 4);
         */
        export const init = (x: number, y: number, z?: number, w?: number): ChalkboardVector => {
            let v: ChalkboardVector;
            if (z === undefined && w === undefined) {
                v = { x: x, y: y };
            } else if (w === undefined) {
                v = { x: x, y: y, z: z };
            } else {
                v = { x: x, y: y, z: z, w: w };
            }
            if (mode === "vector") return v;
            if (mode === "array") return Chalkboard.vect.toArray(v);
            if (mode === "float32array") return new Float32Array(Chalkboard.vect.toArray(v));
            if (mode === "float64array") return new Float64Array(Chalkboard.vect.toArray(v));
            if (mode === "matrix") return Chalkboard.vect.toMatrix(v);
            if (mode === "string") return Chalkboard.vect.toString(v);
            if (mode === "json") return JSON.stringify(v);
            return v;
        };

        /**
         * Calculates the interpolation of a vector.
         * @param {ChalkboardVector} vect - The vector
         * @param {number} a - The x-value (for 2D, 3D, and 4D vectors)
         * @param {number} b - The y-value (for 2D, 3D, and 4D vectors)
         * @param {number} [c] - The z-value (for 3D and 4D vectors)
         * @param {number} [d] - The w-value (for 4D vectors)
         * @returns {ChalkboardVector}
         * @example
         * // Returns (2.33, 2.33, 2.33) (interpolated vector with weights 2, 3, 1)
         * const v = Chalkboard.vect.interpolate(Chalkboard.vect.init(1, 2, 4), 2, 3, 1);
         */
        export const interpolate = (vect: ChalkboardVector, a: number, b: number, c?: number, d?: number): ChalkboardVector => {
            vect = $(vect) as { x: number, y: number, z?: number, w?: number };
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
         * @example
         * // Returns true (both vectors are 2D)
         * const equal = Chalkboard.vect.isDimensionEqual(Chalkboard.vect.init(1, 2), Chalkboard.vect.init(3, 4));
         */
        export const isDimensionEqual = (vect1: ChalkboardVector, vect2: ChalkboardVector): boolean => {
            return Chalkboard.vect.dimension(vect1) === Chalkboard.vect.dimension(vect2);
        };

        /**
         * Checks if a vector or vector field is of a particular dimension.
         * @param {ChalkboardVector | ChalkboardVectorField} vectORvectfield - The vector or vector field
         * @param {number} dimension - The dimension, which must be 2, 3, or 4
         * @returns {boolean}
         * @example
         * // Returns true (the vector is 3D)
         * const is3D = Chalkboard.vect.isDimensionOf(Chalkboard.vect.init(1, 2, 3), 3);
         */
        export const isDimensionOf = (vectORvectfield: ChalkboardVector | ChalkboardVectorField, dimension: 2 | 3 | 4): boolean => {
            try {
                const vect = $(vectORvectfield as ChalkboardVector) as { x: number, y: number, z?: number, w?: number };
                if (dimension === 2) {
                    return Chalkboard.vect.dimension(vect) === 2;
                } else if (dimension === 3) {
                    return Chalkboard.vect.dimension(vect) === 3;
                } else if (dimension === 4) {
                    return Chalkboard.vect.dimension(vect) === 4;
                }
            } catch {
                const vectfield = vectORvectfield as ChalkboardVectorField;
                if (dimension === 2) {
                    return Chalkboard.vect.dimension(vectfield) === 2;
                } else if (dimension === 3) {
                    return Chalkboard.vect.dimension(vectfield) === 3;
                } else if (dimension === 4) {
                    return Chalkboard.vect.dimension(vectfield) === 4;
                }
            }
            throw new TypeError('Parameter "dimension" must be 2, 3, or 4.');
        };

        /**
         * Checks if two vectors are equal.
         * @param {ChalkboardVector} vect1 - The first vector
         * @param {ChalkboardVector} vect2 - The second vector
         * @returns {boolean}
         * @example
         * // Returns true (the vectors are equal)
         * const equal = Chalkboard.vect.isEqual(Chalkboard.vect.init(1, 2, 3), Chalkboard.vect.init(1, 2, 3));
         */
        export const isEqual = (vect1: ChalkboardVector, vect2: ChalkboardVector): boolean => {
            vect1 = $(vect1) as { x: number, y: number, z?: number, w?: number };
            vect2 = $(vect2) as { x: number, y: number, z?: number, w?: number };
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
         * @example
         * // Returns true (the vector has magnitude 1)
         * const normalized = Chalkboard.vect.isNormalized(Chalkboard.vect.init(0.6, 0.8));
         */
        export const isNormalized = (vect: ChalkboardVector): boolean => {
            return Chalkboard.vect.magsq(vect) === 1;
        };

        /**
         * Checks if two vectors are orthogonal.
         * @param {ChalkboardVector} vect1 - The first vector
         * @param {ChalkboardVector} vect2 - The second vector
         * @returns {boolean}
         * @example
         * // Returns true (the vectors are perpendicular)
         * const orthogonal = Chalkboard.vect.isOrthogonal(Chalkboard.vect.init(1, 0), Chalkboard.vect.init(0, 1));
         */
        export const isOrthogonal = (vect1: ChalkboardVector, vect2: ChalkboardVector): boolean => {
            return Chalkboard.vect.dot(vect1, vect2) === 0;
        };

        /**
         * Checks if two vectors are parallel.
         * @param {ChalkboardVector} vect1 - The first vector
         * @param {ChalkboardVector} vect2 - The second vector
         * @returns {boolean}
         * @example
         * // Returns true (the vectors point in the same direction)
         * const parallel = Chalkboard.vect.isParallel(Chalkboard.vect.init(2, 0), Chalkboard.vect.init(4, 0));
         */
        export const isParallel = (vect1: ChalkboardVector, vect2: ChalkboardVector): boolean => {
            return Chalkboard.numb.isApproxEqual(Chalkboard.vect.dot(vect1, vect2), Chalkboard.vect.mag(vect1) * Chalkboard.vect.mag(vect2));
        };

        /**
         * Checks if a vector is a zero vector.
         * @param {ChalkboardVector} vect - The vector
         * @returns {boolean}
         * @example
         * // Returns true (the vector is a zero vector)
         * const zero = Chalkboard.vect.isZero(Chalkboard.vect.init(0, 0));
         */
        export const isZero = (vect: ChalkboardVector): boolean => {
            return Chalkboard.vect.isEqual(vect, Chalkboard.vect.zero(Chalkboard.vect.dimension(vect)));
        };

        /**
         * Calculates the magnitude of a vector.
         * @param {ChalkboardVector} vect - The vector
         * @returns {number}
         * @example
         * // Returns 5 (magnitude of vector (3, 4))
         * const r = Chalkboard.vect.mag(Chalkboard.vect.init(3, 4));
         */
        export const mag = (vect: ChalkboardVector): number => {
            vect = $(vect) as { x: number, y: number, z?: number, w?: number };
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
         * @example
         * // Returns (6, 8) (normalized (3, 4) scaled to magnitude 10)
         * const v = Chalkboard.vect.magset(Chalkboard.vect.init(3, 4), 10);
         */
        export const magset = (vect: ChalkboardVector, num: number): ChalkboardVector => {
            return Chalkboard.vect.scl(Chalkboard.vect.normalize(vect), num);
        };

        /**
         * Calculates the magnitude squared of a vector.
         * @param {ChalkboardVector} vect - The vector
         * @returns {number}
         * @example
         * // Returns 25 (squared magnitude of vector (3, 4))
         * const r2 = Chalkboard.vect.magsq(Chalkboard.vect.init(3, 4));
         */
        export const magsq = (vect: ChalkboardVector): number => {
            vect = $(vect) as { x: number, y: number, z?: number, w?: number };
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

        /** @ignore */
        let mode: "vector" | "array" | "float32array" | "float64array" | "matrix" | "string" | "json" = "vector";

        /**
         * Configures the output mode for vector operations. The default is "vector."
         * @param {"vector" | "array" | "float32array" | "float64array" | "matrix" | "string" | "json"} config - The output mode: "vector" for ChalkboardVector objects, "array" for JavaScript arrays, "float32array" for Float32Arrays, "float64array" for Float64Arrays, or "matrix" for ChalkboardMatrix arrays
         * @returns {void}
         * @example
         * Chalkboard.vect.modeConfig("array"); // Sets "array" mode
         * const v1 = Chalkboard.vect.init(1, 2); // Returns [1, 2]
         * Chalkboard.vect.modeConfig("matrix"); // Sets "matrix" mode
         * const v2 = Chalkboard.vect.init(1, 2); // Returns [[1], [2]]
         * Chalkboard.vect.modeConfig("string"); // Sets "string" mode
         * const v3 = Chalkboard.vect.init(1, 2); // Returns "(1, 2)"
         */
        export const modeConfig = (config: "vector" | "array" | "float32array" | "float64array" | "matrix" | "string" | "json"): void => {
            const _config = config.toLowerCase() as "vector" | "array" | "float32array" | "float64array" | "matrix" | "string" | "json";
            if (["vector", "array", "float32array", "float64array", "matrix", "string", "json"].indexOf(_config) === -1) {
                throw new Error('The mode must be "vector", "array", "float32array", "float64array", "matrix", "string", or "json".');
            }
            mode = _config;
        };

        /**
         * Calculates the negation of a vector.
         * @param {ChalkboardVector} vect - The vector
         * @returns {ChalkboardVector}
         * @example
         * // Returns (-1, -2, -3)
         * const v = Chalkboard.vect.negate(Chalkboard.vect.init(1, 2, 3));
         */
        export const negate = (vect: ChalkboardVector): ChalkboardVector => {
            vect = $(vect) as { x: number, y: number, z?: number, w?: number };
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
         * @example
         * // Returns (0.6, 0.8)
         * const unit = Chalkboard.vect.normalize(Chalkboard.vect.init(3, 4));
         */
        export const normalize = (vect: ChalkboardVector): ChalkboardVector => {
            vect = $(vect) as { x: number, y: number, z?: number, w?: number };
            const m = Chalkboard.vect.mag(vect);
            if (Chalkboard.vect.isDimensionOf(vect, 2)) {
                return Chalkboard.vect.init(vect.x / m, vect.y / m);
            } else if (Chalkboard.vect.isDimensionOf(vect, 3)) {
                return Chalkboard.vect.init(vect.x / m, vect.y / m, vect.z! / m);
            } else if (Chalkboard.vect.isDimensionOf(vect, 4)) {
                return Chalkboard.vect.init(vect.x / m, vect.y / m, vect.z! / m, vect.w! / m);
            } else {
                throw new TypeError('Parameter "vect" must be of type "ChalkboardVector" with 2, 3, or 4 dimensions.');
            }
        };

        /**
         * Calculates the vector rejection of two vectors.
         * @param {ChalkboardVector} vect1 - The first vector
         * @param {ChalkboardVector} vect2 - The second vector
         * @returns {ChalkboardVector}
         * @example
         * // Returns (0.6, 0.8) (component of (1, 1) orthogonal to (0.8, -0.6))
         * const rejection = Chalkboard.vect.oproj(Chalkboard.vect.init(1, 1), Chalkboard.vect.init(0.8, -0.6));
         */
        export const oproj = (vect1: ChalkboardVector, vect2: ChalkboardVector): ChalkboardVector => {
            return Chalkboard.vect.sub(vect1, Chalkboard.vect.proj(vect1, vect2));
        };

        /**
         * Prints a vector in the console.
         * @param {ChalkboardVector} vect - The vector
         * @returns {void}
         * @example
         * // Prints "(1, 2, 3)" in the console
         * Chalkboard.vect.print(Chalkboard.vect.init(1, 2, 3));
         */
        export const print = (vect: ChalkboardVector): void => {
            console.log(Chalkboard.vect.toString(vect));
        };

        /**
         * Calculates the vector projection of two vectors.
         * @param {ChalkboardVector} vect1 - The first vector
         * @param {ChalkboardVector} vect2 - The second vector
         * @returns {ChalkboardVector}
         * @example
         * // Returns (1.2, 1.6) (projection of (3, 4) onto (4, 3))
         * const projection = Chalkboard.vect.proj(Chalkboard.vect.init(3, 4), Chalkboard.vect.init(4, 3));
         */
        export const proj = (vect1: ChalkboardVector, vect2: ChalkboardVector): ChalkboardVector => {
            return Chalkboard.vect.scl(vect2, Chalkboard.vect.dot(vect1, vect2) / Chalkboard.vect.dot(vect2, vect2));
        };

        /**
         * Initializes a random vector.
         * @param {number} dimension - The dimension of the vector, which can be 2, 3, or 4
         * @param {number} [inf=0] - The lower bound
         * @param {number} [sup=1] - The upper bound
         * @returns {ChalkboardVector}
         * @example
         * // Returns a random 2D vector with components between 0 and 1
         * const random = Chalkboard.vect.random(2);
         */
        export const random = (dimension: 2 | 3 | 4, inf: number = 0, sup: number = 1): ChalkboardVector => {
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
         * @example
         * // Returns (0.5, 0.5, 0.25)
         * const v = Chalkboard.vect.reciprocate(Chalkboard.vect.init(2, 2, 4));
         */
        export const reciprocate = (vect: ChalkboardVector): ChalkboardVector => {
            vect = $(vect) as { x: number, y: number, z?: number, w?: number };
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
         * @example
         * // Returns (-0.2, 0.96) (reflection of (0.6, 0.8) across (0, 1))
         * const reflected = Chalkboard.vect.reflect(Chalkboard.vect.init(0.6, 0.8), Chalkboard.vect.init(0, 1));
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
         * @example
         * // Returns a refracted vector when light passes from air to water
         * const refracted = Chalkboard.vect.refract(Chalkboard.vect.init(0, -1), Chalkboard.vect.init(0, 1), 1.33);
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
         * @example
         * // Returns (2, 3, 4)
         * const v = Chalkboard.vect.round(Chalkboard.vect.init(1.6, 3.2, 3.8));
         */
        export const round = (vect: ChalkboardVector): ChalkboardVector => {
            vect = $(vect) as { x: number, y: number, z?: number, w?: number };
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
         * @example
         * // Returns 0 (scalar quadruple product of orthogonal vector pairs)
         * const product = Chalkboard.vect.scalarQuadruple(
         *     Chalkboard.vect.init(1, 0, 0), 
         *     Chalkboard.vect.init(0, 1, 0), 
         *     Chalkboard.vect.init(0, 0, 1), 
         *     Chalkboard.vect.init(1, 1, 0)
         * );
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
         * @example
         * // Returns 1 (volume of parallelepiped formed by three vectors)
         * const volume = Chalkboard.vect.scalarTriple(
         *     Chalkboard.vect.init(1, 0, 0), 
         *     Chalkboard.vect.init(0, 1, 0), 
         *     Chalkboard.vect.init(0, 0, 1)
         * );
         */
        export const scalarTriple = (vect1: ChalkboardVector, vect2: ChalkboardVector, vect3: ChalkboardVector): number => {
            return Chalkboard.vect.dot(vect1, Chalkboard.vect.cross(vect2, vect3));
        };

        /**
         * Calculates the scalar multiplication of a vector.
         * @param {ChalkboardVector} vect - The vector
         * @param {number} num - The scalar
         * @returns {ChalkboardVector}
         * @example
         * // Returns (3, 6, 9)
         * const v = Chalkboard.vect.scl(Chalkboard.vect.init(1, 2, 3), 3);
         */
        export const scl = (vect: ChalkboardVector, num: number): ChalkboardVector => {
            vect = $(vect) as { x: number, y: number, z?: number, w?: number };
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
         * @example
         * // Returns 1.5
         * const m = Chalkboard.vect.slope(Chalkboard.vect.init(2, 3));
         */
        export const slope = (vect: ChalkboardVector): number => {
            vect = $(vect) as { x: number, y: number, z?: number, w?: number };
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
         * @example
         * // Returns (-1, -1, -1)
         * const difference = Chalkboard.vect.sub(Chalkboard.vect.init(2, 3, 4), Chalkboard.vect.init(3, 4, 5));
         */
        export const sub = (vect1: ChalkboardVector, vect2: ChalkboardVector): ChalkboardVector => {
            vect1 = $(vect1) as { x: number, y: number, z?: number, w?: number };
            vect2 = $(vect2) as { x: number, y: number, z?: number, w?: number };
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
         * @example
         * // Returns [2, 3, 4]
         * const a = Chalkboard.vect.toArray(Chalkboard.vect.init(2, 3, 4));
         */
        export const toArray = (vect: ChalkboardVector): [number, number] | [number, number, number] | [number, number, number, number] => {
            vect = $(vect) as { x: number, y: number, z?: number, w?: number };
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
         * @example
         * // Returns 2 + 3i
         * const z = Chalkboard.vect.toComplex(Chalkboard.vect.init(2, 3));
         */
        export const toComplex = (vect: ChalkboardVector): ChalkboardComplex => {
            vect = $(vect) as { x: number, y: number, z?: number, w?: number };
            return Chalkboard.comp.init(vect.x, vect.y);
        };

        /**
         * Converts a vector to a matrix.
         * @param {ChalkboardVector} vect - The vector
         * @param {number} [axis=0] - The axis of the matrix to convert to, which can be 0 for a column matrix or 1 for a row matrix
         * @returns {ChalkboardMatrix}
         * @example
         * // Returns a 3×1 column matrix containing [2, 3, 4]
         * const m = Chalkboard.vect.toMatrix(Chalkboard.vect.init(2, 3, 4));
         */
        export const toMatrix = (vect: ChalkboardVector, axis: 0 | 1 = 0): ChalkboardMatrix => {
            vect = $(vect) as { x: number, y: number, z?: number, w?: number };
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
         * @example
         * // Returns a quaternion with components (0, 2, 3, 4)
         * const q = Chalkboard.vect.toQuaternion(Chalkboard.vect.init(2, 3, 4));
         */
        export const toQuaternion = (vect: ChalkboardVector): ChalkboardQuaternion => {
            vect = $(vect) as { x: number, y: number, z?: number, w?: number };
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
         * @example
         * // Returns "(2, 3, 4)"
         * const s = Chalkboard.vect.toString(Chalkboard.vect.init(2, 3, 4));
         */
        export const toString = (vect: ChalkboardVector): string => {
            vect = $(vect) as { x: number, y: number, z?: number, w?: number };
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
         * @example
         * // Returns a tensor reshaped from vector (1, 2, 3, 4)
         * const t = Chalkboard.vect.toTensor(Chalkboard.vect.init(1, 2, 3, 4), 2, 2);
         */
        export const toTensor = (vect: ChalkboardVector, ...size: number[]): ChalkboardTensor => {
            vect = $(vect) as { x: number, y: number, z?: number, w?: number };
            if (Array.isArray(size[0])) {
                size = size[0];
            }
            return Chalkboard.tens.resize(Chalkboard.vect.toMatrix(vect), ...size);
        };

        /**
         * Converts a vector to a typed array.
         * @param {ChalkboardVector} vect - The vector
         * @param {"int8" | "int16" | "int32" | "float32" | "float64" | "bigint64"} [type="float32"] - The type of the typed array, which can be "int8", "int16", "int32", "float32", "float64", or "bigint64" (optional, defaults to "float32")
         * @returns {Int8Array | Int16Array | Int32Array | Float32Array | Float64Array | BigInt64Array}
         * @example
         * // Returns a Float32Array [3, 4]
         * const v = Chalkboard.vect.init(3, 4);
         * const vf32 = Chalkboard.vect.toTypedArray(v);
         */
        export const toTypedArray = (vect: ChalkboardVector, type: "int8" | "int16" | "int32" | "float32" | "float64" | "bigint64" = "float32"): Int8Array | Int16Array | Int32Array | Float32Array | Float64Array | BigInt64Array => {
            vect = $(vect) as { x: number, y: number, z?: number, w?: number };
            const arr = Chalkboard.vect.toArray(vect);
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
         * Calculates the vector quadruple product of four vectors.
         * @param {ChalkboardVector} vect1 - The first vector
         * @param {ChalkboardVector} vect2 - The second vector
         * @param {ChalkboardVector} vect3 - The third vector
         * @param {ChalkboardVector} vect4 - The fourth vector
         * @returns {ChalkboardVector}
         * @example
         * // Returns (-1, -1, 0)
         * const product = Chalkboard.vect.vectorQuadruple(
         *     Chalkboard.vect.init(1, 0, 0), 
         *     Chalkboard.vect.init(0, 1, 0),
         *     Chalkboard.vect.init(0, 0, 1),
         *     Chalkboard.vect.init(1, 1, 0)
         * );
         */
        export const vectorQuadruple = (vect1: ChalkboardVector, vect2: ChalkboardVector, vect3: ChalkboardVector, vect4: ChalkboardVector): ChalkboardVector => {
            return Chalkboard.vect.cross(Chalkboard.vect.cross(vect1, vect2), Chalkboard.vect.cross(vect3, vect4));
        };

        /**
         * Calculates the vector triple product of three vectors.
         * @param {ChalkboardVector} vect1 - The first vector
         * @param {ChalkboardVector} vect2 - The second vector
         * @param {ChalkboardVector} vect3 - The third vector
         * @returns {ChalkboardVector}
         * @example
         * // Returns (0, 0, 0)
         * const product = Chalkboard.vect.vectorTriple(
         *     Chalkboard.vect.init(1, 0, 0),
         *     Chalkboard.vect.init(0, 1, 0),
         *     Chalkboard.vect.init(0, 0, 1)
         * );
         */
        export const vectorTriple = (vect1: ChalkboardVector, vect2: ChalkboardVector, vect3: ChalkboardVector): ChalkboardVector => {
            return Chalkboard.vect.cross(vect1, Chalkboard.vect.cross(vect2, vect3));
        };

        /**
         * Initializes the zero vector of a particular dimension.
         * @param {2 | 3 | 4} dimension - The dimension of the vector, which can be 2, 3, or 4
         * @returns {ChalkboardVector}
         * @example
         * // Returns (0, 0, 0, 0)
         * const v = Chalkboard.vect.zero(4);
         */
        export const zero = (dimension: 2 | 3 | 4): ChalkboardVector => {
            if (dimension === 2) {
                return Chalkboard.vect.init(0, 0);
            } else if (dimension === 3) {
                return Chalkboard.vect.init(0, 0, 0);
            } else if (dimension === 4) {
                return Chalkboard.vect.init(0, 0, 0, 0);
            } else {
                throw new TypeError('Parameter "dimension" must be either 2, 3, or 4.');
            }
        };
    }
}
