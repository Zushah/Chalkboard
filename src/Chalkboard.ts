/*
    The Chalkboard Library
    Version 1.7.0 Descartes released 01/01/2024
    Authored by Zushah ===> https://www.github.com/Zushah
    Available under the MIT License ===> https://www.opensource.org/license/mit/

    The Chalkboard library is a JavaScript namespace that provides a plethora of both practical and abstract mathematical functionalities for its user.

    Repository ===> https://www.github.com/Zushah/Chalkboard
    Website ===> https://zushah.github.io/Chalkboard/home.html
*/

/**
 * The type for complex numbers.
 * @property {number} a - The real part
 * @property {number} b - The imaginary part
 */
type ChalkboardComplex = { a: number; b: number; };

/**
 * The type for mathematical functions.
 * @property {string | string[]} definition - The function's definition
 * @property {"expl" | "inve" | "pola" | "curv" | "surf" | "mult" | "comp"} type - The function's type, which can be "expl" for explicit functions, "inve" for inverse functions, "pola" for polar functions, "curv" for parametric curves, "surf" for parametric surfaces, "mult" for explicit multivariable functions, or "comp" for explicit complex-valued functions
 */
type ChalkboardFunction = { definition: string | string[]; type: "expl" | "inve" | "pola" | "curv" | "surf" | "mult" | "comp"; };

/**
 * The type for matrices.
 */
type ChalkboardMatrix = number[][];

/**
 * The type for quaternions.
 * @property {number} a - The real part
 * @property {number} b - The first imaginary part
 * @property {number} c - The second imaginary part
 * @property {number} d - The third imaginary part
 */
type ChalkboardQuaternion = { a: number; b: number; c: number; d: number; };

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
type ChalkboardVector = { x: number; y: number; z?: number; w?: number; };

/**
 * The type for vector fields.
 * @property {string} p - The x-component (defined for 2D, 3D, and 4D vector fields)
 * @property {string} q - The y-component (defined for 2D, 3D, and 4D vector fields)
 * @property {string} [r] - The z-component (defined for 3D and 4D vector fields)
 * @property {string} [s] - The w-component (defined for 4D vector fields)
 */
type ChalkboardVectorField = { p: string; q: string; r?: string; s?: string; };

/**
 * The Chalkboard namespace.
 * @namespace
 */
namespace Chalkboard {

    /**
     * The variable for setting the default JavaScript Canvas API context for Chalkboard to use.
     * @type {string}
     * @example
     * // This must be done if the CanvasRenderingContext2D variable is not named "ctx"
     * // In this example, it is named "context"
     * const context = document.getElementById("canvas").getContext("2d");
     * Chalkboard.CONTEXT = "context";
     */
    export let CONTEXT: string = "ctx";

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
    }

    /**
     * Draws the Chalkboard logo.
     * @param {number} [x=canvas.width/2] - The x-position
     * @param {number} [y=canvas.height/2] - The y-position
     * @param {number} [s=1] - The size
     * @param {CanvasRenderingContext2D} [context=Chalkboard.CONTEXT] - The JavaScript Canvas API context
     * @returns {void}
     * @example
     * // Draws the logo at (250, 250) with a scale of 2
     * Chalkboard.LOGO(250, 250, 2);
     */
    export const LOGO = (x: number = (Chalkboard.real.parse(Chalkboard.CONTEXT) as unknown as CanvasRenderingContext2D).canvas.width / 2, y: number = (Chalkboard.real.parse(Chalkboard.CONTEXT) as unknown as CanvasRenderingContext2D).canvas.height / 2, s: number = 1, context: CanvasRenderingContext2D = Chalkboard.real.parse(Chalkboard.CONTEXT) as unknown as CanvasRenderingContext2D): void => {
        context.save();
        context.translate(x, y);
        context.scale(s, s);
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
    }

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
    Chalkboard.PARSEPREFIX += "const ctx = document.querySelector('canvas').getContext('2d');";

    /**
     * Computes the number pi.
     * @param {number} [coefficient=1] - The coefficient to multiply pi with
     * @returns {number}
     * @example
     * const PI = Chalkboard.PI(); // returns 3.1415926535897936
     * const TAU = Chalkboard.PI(2); // returns 6.283185307179587
     */
    export const PI = (coefficient: number = 1): number => {
        return coefficient * 4 * (4 * Math.atan(1/5) - Math.atan(1/239));
    }

    /**
     * Prints basic information about Chalkboard into the console.
     * @returns {void}
     * @example
     * Chalkboard.README();
     * // Returns in the console:
     * //   The Chalkboard Library
     * //   Version 1.7.0 Descartes released 01/01/2024
     * //   Authored by Zushah ===> https://www.github.com/Zushah
     * //   Available under the MIT License ===> https://www.opensource.org/license/mit/
     * //   
     * //   The Chalkboard library is a JavaScript namespace that provides a plethora of both practical and abstract mathematical functionalities for its user.
     * //   
     * //   Repository ===> https://www.github.com/Zushah/Chalkboard
     * //   Website ===> https://zushah.github.io/Chalkboard/home.html
     */
    export const README = (): void => {
        console.log("The Chalkboard Library\nVersion " + Chalkboard.VERSION + " " + Chalkboard.VERSIONALIAS + " released 01/01/2024\nAuthored by Zushah ===> https://www.github.com/Zushah\nAvailable under the MIT License ===> https://www.opensource.org/license/mit/\n\nThe Chalkboard library is a JavaScript namespace that provides a plethora of both practical and abstract mathematical functionalities for its user.\n\nRepository ===> https://www.github.com/Zushah/Chalkboard\nWebsite ===> https://zushah.github.io/Chalkboard/home.html");
    }

    /**
     * The version of Chalkboard.
     * @type {string}
     * @example
     * // Returns 1.7.0
     * const version = Chalkboard.VERSION;
     */
    export const VERSION: "1.7.0" = "1.7.0";

    /**
     * The alias of the version of Chalkboard.
     * @type {string}
     * @example
     * // Returns Descartes
     * const versionalias = Chalkboard.VERSIONALIAS;
     */
    export const VERSIONALIAS: "Descartes" = "Descartes";
}

if(typeof window === "undefined") {
    module.exports = Chalkboard;
} else {
    window.Chalkboard = Chalkboard;
}
