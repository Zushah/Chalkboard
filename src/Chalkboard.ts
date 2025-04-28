/*
    The Chalkboard Library
    Version 2.4.0 Noether released 04/28/2025
    Authored by Zushah ===> https://www.github.com/Zushah
    Available under the MIT License ===> https://www.opensource.org/license/mit/

    The Chalkboard library is a JavaScript namespace that provides a plethora of both practical and abstract mathematical functionalities for its user.

    Repository ===> https://www.github.com/Zushah/Chalkboard
    Website ===> https://zushah.github.io/Chalkboard
*/

/**
 * The type for complex numbers.
 * @property {number} a - The real part
 * @property {number} b - The imaginary part
 */
type ChalkboardComplex = { a: number; b: number };

/**
 * The type for mathematical functions.
 * @property {string | string[]} definition - The function's definition
 * @property {"expl" | "inve" | "pola" | "curv" | "surf" | "mult" | "comp"} type - The function's type, which can be "expl" for explicit functions, "inve" for inverse functions, "pola" for polar functions, "curv" for parametric curves, "surf" for parametric surfaces, "mult" for explicit multivariable functions, or "comp" for explicit complex-valued functions
 */
type ChalkboardFunction = { definition: string | string[]; type: "expl" | "inve" | "pola" | "curv" | "surf" | "mult" | "comp" };

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
 * The type for vector fields.
 * @property {string} p - The x-component (defined for 2D, 3D, and 4D vector fields)
 * @property {string} q - The y-component (defined for 2D, 3D, and 4D vector fields)
 * @property {string} [r] - The z-component (defined for 3D and 4D vector fields)
 * @property {string} [s] - The w-component (defined for 4D vector fields)
 */
type ChalkboardVectorField = { p: string; q: string; r?: string; s?: string };

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
        return Math.pow(Math.pow(10, 1 / Math.log(10)), exponent);
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
     * Draws the Chalkboard logo.
     * @param {number} [x=canvas.width/2] - The x-position
     * @param {number} [y=canvas.height/2] - The y-position
     * @param {number} [size=1] - The size
     * @param {CanvasRenderingContext2D} [context=Chalkboard.CONTEXT] - The JavaScript Canvas API context
     * @returns {void}
     * @example
     * // Draws the logo at (250, 250) with a scale of 2
     * Chalkboard.LOGO(250, 250, 2);
     */
    export const LOGO = (
        x: number = (Chalkboard.real.parse(Chalkboard.CONTEXT) as unknown as CanvasRenderingContext2D).canvas.width / 2,
        y: number = (Chalkboard.real.parse(Chalkboard.CONTEXT) as unknown as CanvasRenderingContext2D).canvas.height / 2,
        size: number = 1,
        context: CanvasRenderingContext2D = Chalkboard.real.parse(Chalkboard.CONTEXT) as unknown as CanvasRenderingContext2D
    ): void => {
        context.save();
        context.translate(x, y);
        context.scale(size, size);
        context.fillStyle = "rgb(25, 25, 25)";
        context.beginPath();
        context.ellipse(0, 0, 50, 50, 0, 0, Chalkboard.PI(2));
        context.fill();
        context.fillStyle = "rgb(50, 125, 200)";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.font = "75px Times New Roman";
        context.fillText("C", -25, 6);
        context.fillText("B", 25, 6);
        context.strokeStyle = "rgb(50, 125, 200)";
        context.lineWidth = 6;
        context.lineCap = "butt";
        context.beginPath();
        context.moveTo(-30, 25);
        context.lineTo(-30, -22.5);
        context.stroke();
        context.beginPath();
        context.moveTo(22, 25);
        context.lineTo(22, -22.5);
        context.stroke();
        context.restore();
    };

    /**
     * The variable for adding custom functions to the Chalkboard parsers.
     * @type {string}
     * @example
     * // Doesn't work
     * const twentyfour = Chalkboard.real.parse("Math.factorial(4)");
     *
     * // Does work
     * Chalkboard.PARSEPREFIX = "Math.factorial = function(num) { let n = 1; for (var i = 1; i <= num; i++) { n *= i; } i--; return n; };";
     * const twentyfour = Chalkboard.real.parse("Math.factorial(4)");
     */
    export let PARSEPREFIX: string = "";
    if (typeof window !== "undefined") Chalkboard.PARSEPREFIX += "const ctx = document.querySelector('canvas').getContext('2d');";

    /**
     * Computes the number pi.
     * @param {number} [coefficient=1] - The coefficient to multiply pi with
     * @returns {number}
     * @example
     * const PI = Chalkboard.PI(); // returns 3.1415926535897936
     * const TAU = Chalkboard.PI(2); // returns 6.283185307179587
     */
    export const PI = (coefficient: number = 1): number => {
        return coefficient * 4 * (4 * Math.atan(1 / 5) - Math.atan(1 / 239));
    };

    /**
     * Prints basic information about Chalkboard into the console.
     * @returns {void}
     * @example
     * Chalkboard.README();
     * // Returns in the console:
     * //   The Chalkboard Library
     * //   Version 2.4.0 Noether released 04/28/2025
     * //   Authored by Zushah ===> https://www.github.com/Zushah
     * //   Available under the MIT License ===> https://www.opensource.org/license/mit/
     * //
     * //   The Chalkboard library is a JavaScript namespace that provides a plethora of both practical and abstract mathematical functionalities for its user.
     * //
     * //   Repository ===> https://www.github.com/Zushah/Chalkboard
     * //   Website ===> https://zushah.github.io/Chalkboard
     */
    export const README = (): void => {
        console.log(
            "The Chalkboard Library\nVersion " +
                Chalkboard.VERSION +
                " " +
                Chalkboard.VERSIONALIAS +
                " released 04/28/2025\nAuthored by Zushah ===> https://www.github.com/Zushah\nAvailable under the MIT License ===> https://www.opensource.org/license/mit/\n\nThe Chalkboard library is a JavaScript namespace that provides a plethora of both practical and abstract mathematical functionalities for its user.\n\nRepository ===> https://www.github.com/Zushah/Chalkboard\nWebsite ===> https://zushah.github.io/Chalkboard"
        );
    };

    /**
     * The version of Chalkboard.
     * @type {"2.4.0"}
     * @example
     * // Returns "2.4.0"
     * const version = Chalkboard.VERSION;
     */
    export const VERSION: "2.4.0" = "2.4.0";

    /**
     * The alias of the version of Chalkboard.
     * @type {"Noether"}
     * @example
     * // Returns "Noether"
     * const versionalias = Chalkboard.VERSIONALIAS;
     */
    export const VERSIONALIAS: "Noether" = "Noether";
}

if (typeof window === "undefined") {
    module.exports = Chalkboard;
} else {
    window.Chalkboard = Chalkboard;
}
