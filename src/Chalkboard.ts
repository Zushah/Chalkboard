/*
    The Chalkboard Library
    Version 1.7.0 Descartes released 01/01/2024
    Authored by Zushah ===> https://www.github.com/Zushah
    Available under the MIT License ===> https://www.opensource.org/license/mit/

    The Chalkboard library is a JavaScript namespace that provides a plethora of both practical and abstract mathematical functionalities for its user.

    Repository ===> https://www.github.com/Zushah/Chalkboard
    Website ===> https://zushah.github.io/Chalkboard/home.html
*/

type ChalkboardComplex = { a: number; b: number; };
type ChalkboardFunction = { definition: string | string[]; type: "expl" | "inve" | "pola" | "curv" | "surf" | "mult" | "comp"; };
type ChalkboardMatrix = number[][];
type ChalkboardQuaternion = { a: number; b: number; c: number; d: number; };
type ChalkboardTensor = number | ChalkboardTensor[];
type ChalkboardVector = { x: number; y: number; z?: number; w?: number; };
type ChalkboardVectorField = { p: string; q: string; r?: string; s?: string; };

namespace Chalkboard {
    export const CONTEXT: string = "ctx";
    export const E = (exponent: number = 1): number => {
        return Math.pow(Math.pow(10, 1 / Math.log(10)), exponent);
    }
    export const LOGO = (x: number = (Chalkboard.real.parse(Chalkboard.CONTEXT) as unknown as CanvasRenderingContext2D).canvas.width / 2, y: number = (Chalkboard.real.parse(Chalkboard.CONTEXT) as unknown as CanvasRenderingContext2D).canvas.height / 2, s: number = 1, context: CanvasRenderingContext2D = Chalkboard.real.parse(Chalkboard.CONTEXT) as unknown as CanvasRenderingContext2D): void => {
        context.save();
        context.translate(x, y);
        context.scale(s, s);
        context.fillStyle = "rgb(25, 25, 25)";
        context.fillRect(-50, -50, 100, 100);
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
    export const PARSEPREFIX: string = "";
    export const PI = (coefficient: number = 1): number => {
        return coefficient * 4 * (4 * Math.atan(1/5) - Math.atan(1/239));
    }
    export const README = (): void => {
        console.log("The Chalkboard Library\nVersion " + Chalkboard.VERSION + " Descartes released 01/01/2024\nAuthored by Zushah ===> https://www.github.com/Zushah\nAvailable under the MIT License ===> https://www.opensource.org/license/mit/\n\nThe Chalkboard library is a JavaScript namespace that provides a plethora of both practical and abstract mathematical functionalities for its user.\n\nRepository ===> https://www.github.com/Zushah/Chalkboard\nWebsite ===> https://zushah.github.io/Chalkboard/home.html");
    }
    export const VERSION: "1.7.0" = "1.7.0";
}

if(typeof window === "undefined") {
    module.exports = Chalkboard;
} else {
    window.Chalkboard = Chalkboard;
}
