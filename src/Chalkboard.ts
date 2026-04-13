/*
    Chalkboard
    Version 3.0.2 Euler
    Released April 13th, 2026
    Authored by Zushah: https://www.github.com/Zushah
    Licensed under MPL-2.0: https://opensource.org/license/mpl-2-0
    Repository: https://www.github.com/Zushah/Chalkboard
    Website: https://zushah.github.io/Chalkboard
*/
/*
    This Source Code Form is subject to the terms of the
    Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed
    with this file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/

/**
 * The type for complex numbers.
 * @property {number} a - The real part
 * @property {number} b - The imaginary part
 */
type ChalkboardComplex = { a: number; b: number };

/**
 * The type for mathematical functions.
 * @property {Function | Function[]} rule - The rule of the function
 * @property {"real" | "comp"} field - The field of the function, which can be "real" for the field of real numbers or "comp" for the field of complex numbers
 * @property {"scalar2d" | "scalar3d" | "scalar4d" | "vector2d" | "vector3d" | "vector4d" | "curve2d" | "curve3d" | "curve4d" | "surface3d"} type - The type of the function
 */
type ChalkboardFunction = {
    rule: ((...x: number[]) => number) | (((...x: number[]) => number)[]);
    field: "real" | "comp";
    type: "scalar2d" | "scalar3d" | "scalar4d" | "vector2d" | "vector3d" | "vector4d" | "curve2d" | "curve3d" | "curve4d" | "surface3d"
};

/**
 * The type for matrices.
 */
type ChalkboardMatrix = number[][];

/**
 * The type for morphisms in abstract algebra.
 * @template T, U
 * @property {ChalkboardStructure<T>} struc1 - The first algebraic structure which is the domain of the morphism
 * @property {ChalkboardStructure<U>} struc2 - The second algebraic structure which is the codomain of the morphism
 * @property {(a: T) => U} mapping - The function that takes an element from the first structure and maps it to the second structure
 */
type ChalkboardMorphism<T, U> = {
    struc1: ChalkboardStructure<T>;
    struc2: ChalkboardStructure<U>;
    mapping: (a: T) => U;
};

/**
 * The type for ordinary differential equations.
 * @property {(t: number, y: number[]) => number[]} rule - Canonical first-order system rule: y' = F(t, y)
 * @property {number} order - Original order of equation if constructed from scalar, else 1 for systems
 * @property {number} dimension - Dimension of canonical state vector y
 * @property {"single" | "system"} type - "single" for scalar input rules (order 1 or 2), "system" for user-supplied systems
 */
type ChalkboardODE = {
    rule: (t: number, y: number[]) => number[];
    order: number;
    dimension: number;
    type: "single" | "system";
};

/**
 * The type for quaternions.
 * @property {number} a - The real part
 * @property {number} b - The first imaginary part
 * @property {number} c - The second imaginary part
 * @property {number} d - The third imaginary part
 */
type ChalkboardQuaternion = { a: number; b: number; c: number; d: number };

/**
 * The type for sets.
 * @property {Function} contains - Function to check if an element belongs to the set
 * @property {T[]} [elements] - Optional array for the elements of a finite set
 * @property {string} [id] - Unique identifier for known sets (e.g., "Z", "Q", "R", "C")
 */
type ChalkboardSet<T> = {
    contains: (element: T) => boolean;
    elements?: T[];
    id?: string;
};

/**
 * The type for algebraic structures.
 * @template T
 * @property {ChalkboardSet<T>} set - The set of the structure
 * @property {(a: T, b: T) => T} [operation] - The binary operation (e.g., for groups/monoids)
 * @property {T} [identity] - The identity element (e.g., for groups/monoids)
 * @property {(a: T) => T} [inverter] - The function to compute inverses (e.g., for groups)
 * @property {(a: T, b: T) => T} [add] - The additive operation (e.g., for rings/fields)
 * @property {(a: T, b: T) => T} [mul] - The multiplicative operation (e.g., for rings/fields)
 * @property {T} [addIdentity] - The additive identity element (e.g., for rings/fields)
 * @property {T} [mulIdentity] - The multiplicative identity element (e.g., for rings/fields)
 * @property {(a: T) => T} [addInverter] - The function to compute additive inverses (e.g., for rings/fields)
 * @property {(a: T) => T} [mulInverter] - The function to compute multiplicative inverses (e.g., for fields)
 */
type ChalkboardStructure<T> = {
    set: ChalkboardSet<T>;
    operation?: (a: T, b: T) => T;
    identity?: T;
    inverter?: (a: T) => T;
    add?: (a: T, b: T) => T;
    mul?: (a: T, b: T) => T;
    addIdentity?: T;
    mulIdentity?: T;
    addInverter?: (a: T) => T;
    mulInverter?: (a: T) => T;
};

/**
 * The type for algebraic structure extensions in abstract algebra.
 * @template T, U
 * @property {ChalkboardStructure<T>} base - The algebraic structure which is a substructure of the extension structure
 * @property {ChalkboardStructure<U>} extension - The algebraic structure which is an extension of the base structure
 * @property {number} degree - The dimension of the extension structure as a vector space over the base structure
 * @property {ChalkboardVector[]} basis - The basis vectors of the extension structure
 * @property {boolean} isFinite - Whether the extension structure is finite or not
 * @property {boolean} isSimple - Whether the extension structure is simple or not
 * @property {boolean} isAlgebraic - Whether the extension structure is algebraic or not
 * 
 */
type ChalkboardStructureExtension<T, U extends T> = {
    base: ChalkboardStructure<T>;
    extension: ChalkboardStructure<U>;
    degree: number;
    basis: ChalkboardVector[];
    isFinite: boolean;
    isSimple: boolean;
    isAlgebraic: boolean;
};

/**
 * The type for tensors.
 */
type ChalkboardTensor = number | ChalkboardTensor[];

/**
 * The type for vectors.
 * @property {number} x - The x-component (defined for 2D, 3D, and 4D vectors)
 * @property {number} y - The y-component (defined for 2D, 3D, and 4D vectors)
 * @property {number} [z] - The z-component (defined for 3D and 4D vectors)
 * @property {number} [w] - The w-component (defined for 4D vectors)
 */
type ChalkboardVector = { x: number; y: number; z?: number; w?: number } | number[] | Float32Array | Float64Array | ChalkboardMatrix | string;

/**
 * The Chalkboard library namespace.
 * @namespace
 */
namespace Chalkboard {
    /**
     * Applies a callback function in an element-wise manner on a complex number, matrix, quaternion, tensor, vector, set, or structure.
     * @template T
     * @param {ChalkboardComplex | ChalkboardMatrix | ChalkboardQuaternion | ChalkboardTensor | ChalkboardVector | ChalkboardSet<T> | ChalkboardStructure<T>} object - The complex number, matrix, quaternion, tensor, vector, set, or structure
     * @param {(x: any) => any} callback - The callback function
     * @returns {ChalkboardComplex | ChalkboardMatrix | ChalkboardQuaternion | ChalkboardTensor | ChalkboardVector | ChalkboardSet<T> | ChalkboardStructure<T>}
     * @example
     * // Returns the vector (1, 2, 6, 24)
     * let v = Chalkboard.vect.init(1, 2, 3, 4);
     * let factorialv = Chalkboard.APPLY(v, (x) => {
     *     return Chalkboard.numb.factorial(x)
     * });
     */
    export const APPLY = <T>(
        object: ChalkboardComplex | ChalkboardMatrix | ChalkboardQuaternion | ChalkboardTensor | ChalkboardVector | ChalkboardSet<T> | ChalkboardStructure<T>,
        callback: (x: any) => any
    ): ChalkboardComplex | ChalkboardMatrix | ChalkboardQuaternion | ChalkboardTensor | ChalkboardVector | ChalkboardSet<T> | ChalkboardStructure<T> => {
        if (object && typeof (object as any).a === "number" && typeof (object as any).b === "number" && typeof (object as any).c === "undefined") {
            const comp = object as ChalkboardComplex;
            return Chalkboard.comp.init(callback(comp.a), callback(comp.b));
        }
        if (object && typeof (object as any).a === "number" && typeof (object as any).b === "number" && typeof (object as any).c === "number" && typeof (object as any).d === "number") {
            const quat = object as ChalkboardQuaternion;
            return Chalkboard.quat.init(callback(quat.a), callback(quat.b), callback(quat.c), callback(quat.d));
        }
        if (object && typeof (object as any).x === "number" && typeof (object as any).y === "number") {
            const vect = object as ChalkboardVector as {x: number; y: number; z?: number; w?: number };
            if (typeof vect.w === "number" && typeof vect.z === "number") {
                return Chalkboard.vect.init(callback(vect.x), callback(vect.y), callback(vect.z), callback(vect.w));
            } else if (typeof vect.z === "number") {
                return Chalkboard.vect.init(callback(vect.x), callback(vect.y), callback(vect.z));
            } else {
                return Chalkboard.vect.init(callback(vect.x), callback(vect.y));
            }
        }
        if (Array.isArray(object)) {
            let isMatrix = true;
            for (let i = 0; i < object.length; i++) {
                if (!Array.isArray(object[i]) || ((object[i] as number[]).length > 0 && typeof (object as number[][])[i][0] !== "number")) {
                    isMatrix = false;
                    break;
                }
            }
            if (isMatrix) {
                const matr = object as ChalkboardMatrix;
                const rows = Chalkboard.matr.rows(matr);
                const cols = Chalkboard.matr.cols(matr);
                const result = Chalkboard.matr.fill(0, rows, cols);
                for (let i = 0; i < rows; i++) {
                    for (let j = 0; j < cols; j++) {
                        result[i][j] = callback(matr[i][j]);
                    }
                }
                return result;
            } else {
                const result: ChalkboardTensor[] = [];
                for (let i = 0; i < object.length; i++) {
                    result.push(Chalkboard.APPLY(object[i], callback) as ChalkboardTensor);
                }
                return result;
            }
        }
        if (typeof object === "number") {
            return callback(object);
        }
        if (object && typeof (object as any).contains === "function" && typeof (object as any).set === "undefined") {
            const set = object as ChalkboardSet<T>;
            if (Array.isArray(set.elements)) {
                const result = [];
                for (let i = 0; i < set.elements.length; i++) {
                    result.push(callback(set.elements[i]));
                }
                return result;
            } else {
                throw new TypeError('Chalkboard.APPLY cannot operate on an infinite "ChalkboardSet".');
            }
        }
        if (object && typeof (object as any).set?.contains === "function") {
            const struc = object as ChalkboardStructure<T>;
            if (Array.isArray(struc.set.elements)) {
                const result = [];
                for (let i = 0; i < struc.set.elements.length; i++) {
                    result.push(callback(struc.set.elements[i]));
                }
                return result;
            } else {
                throw new TypeError('Chalkboard.APPLY cannot operate on an infinite "ChalkboardStructure".');
            }
        }
        throw new TypeError('Chalkboard.APPLY can only operate on a "ChalkboardComplex", "ChalkboardMatrix", "ChalkboardQuaternion", "ChalkboardTensor", "ChalkboardVector", "ChalkboardSet", or "ChalkboardStructure".');
    };

    /**
     * The variable for setting the default JavaScript Canvas API context for Chalkboard to use.
     * @type {string}
     * @example
     * // This must be done if the CanvasRenderingContext2D variable is not named "ctx"
     * // In this example, it is named "context"
     * const context = document.getElementById("canvas").getContext("2d");
     * Chalkboard.CONTEXT = "context";
     */
    export let CONTEXT: string = typeof window !== "undefined" ? "ctx" : "0";

    /**
     * Computes the number e.
     * @param {number} [exponent=1] - The exponent to raise e to the power of
     * @returns {number}
     * @example
     * const one = Chalkboard.E(0); // returns 1
     * const E = Chalkboard.E(); // returns 2.7182818284590446
     */
    export const E = (exponent: number = 1): number => {
        if (exponent === 0) return 1;
        if (exponent === 1) return 2.718281828459045;
        const LN2 = 0.6931471805599453, INV_LN2 = 1.4426950408889634;
        const k = Math.round(exponent * INV_LN2);
        const r = exponent - k * LN2, r2 = r * r, r3 = r2 * r, r4 = r3 * r, r5 = r4 * r, r6 = r5 * r, r7 = r6 * r, r8 = r7 * r, r9 = r8 * r, r10 = r9 * r;
        const exp_r = 1 + r + r2 / 2 + r3 / 6 + r4 / 24 + r5 / 120 + r6 / 720 + r7 / 5040 + r8 / 40320 + r9 / 362880 + r10 / 3628800;
        return exp_r * (2 ** k);
    };

    /**
     * Computes the number i.
     * @param {number} [exponent=1] - The exponent to raise i to the power of
     * @returns {ChalkboardComplex}
     * @example
     * const i = Chalkboard.I(); // returns the complex number i
     * const i2 = Chalkboard.I(2); // returns the complex number -1
     * const i3 = Chalkboard.I(3); // returns the complex number -i
     * const i4 = Chalkboard.I(4); // returns the complex number 1
     */
    export const I = (exponent: number = 1): ChalkboardComplex => {
        if (exponent % 4 === 0) return Chalkboard.comp.init(1, 0);
        if (exponent % 4 === 1) return Chalkboard.comp.init(0, 1);
        if (exponent % 4 === 2) return Chalkboard.comp.init(-1, 0);
        if (exponent % 4 === 3) return Chalkboard.comp.init(0, -1);
        return Chalkboard.comp.init(0, 0);
    };

    /**
     * Computes the number pi.
     * @param {number} [coefficient=1] - The coefficient to multiply pi with
     * @returns {number}
     * @example
     * const PI = Chalkboard.PI(); // returns 3.1415926535897936
     * const TAU = Chalkboard.PI(2); // returns 6.283185307179587
     */
    export const PI = (coefficient: number = 1): number => {
        let a = 1.0, b = Math.sqrt(0.5), t = 0.25, p = 1.0;
        let aNext = (a + b) * 0.5, bNext = Math.sqrt(a * b); t -= p * (a - aNext) * (a - aNext); a = aNext; b = bNext; p *= 2.0;
        aNext = (a + b) * 0.5; bNext = Math.sqrt(a * b); t -= p * (a - aNext) * (a - aNext); a = aNext; b = bNext; p *= 2.0;
        aNext = (a + b) * 0.5; bNext = Math.sqrt(a * b); t -= p * (a - aNext) * (a - aNext); a = aNext; b = bNext; p *= 2.0;
        aNext = (a + b) * 0.5; bNext = Math.sqrt(a * b); t -= p * (a - aNext) * (a - aNext); a = aNext; b = bNext;
        return coefficient * (((a + b) * (a + b)) / (4.0 * t));
    };

    /**
     * Registers a custom function to use with real/complex-valued parsing.
     * @param {string} name - The name of the function to register
     * @param {(...x: number[]) => number} func - The function
     * @returns {void}
     * @example
     * // Register factorial function
     * Chalkboard.REGISTER("factorial", (x) => {
     *   let n = 1;
     *   for (let i = 1; i <= x; i++) n *= i;
     *   return n;
     * });
     * 
     * // Returns 24
     * const twentyfour = Chalkboard.real.parse("factorial(4)");
     */
    export const REGISTER = (name: string, func: (...x: number[]) => number): void => {
        Chalkboard.REGISTRY[name] = func;
    };
    
    /**
     * The object for storing registered custom real functions.
     * @type {Record<string, (...x: number[]) => number>}
     * @example
     * // Returns { "plusone": (x) => x + 1 }
     * Chalkboard.REGISTER("plusone", (x) => x + 1);
     * const plusone = Chalkboard.REGISTRY["plusone"];
     */
    export const REGISTRY: Record<string, (...x: number[]) => number> = {};

    /**
     * The version of Chalkboard.
     * @type {"3.0.2"}
     * @example
     * // Returns "3.0.2"
     * const version = Chalkboard.VERSION;
     */
    export const VERSION: "3.0.2" = "3.0.2";

    /**
     * The alias of the version of Chalkboard.
     * @type {"Euler"}
     * @example
     * // Returns "Euler"
     * const versionalias = Chalkboard.VERSIONALIAS;
     */
    export const VERSIONALIAS: "Euler" = "Euler";
}

if (typeof window === "undefined") module.exports = Chalkboard;
else window.Chalkboard = Chalkboard;
