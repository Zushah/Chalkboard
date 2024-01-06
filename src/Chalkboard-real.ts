/*
    The Chalkboard Library - Real Namespace
    Version 1.7.0 Descartes
*/
/// <reference path="Chalkboard.ts"/>
namespace Chalkboard {
    export namespace real {
        export const define = (definition: string | string[], type: "expl" | "inve" | "pola" | "curv" | "surf" | "mult" = "expl"): ChalkboardFunction => {
            if(type === "expl") {
                return {definition: definition, type: type};
            } else if(type === "inve") {
                return {definition: definition, type: type};
            } else if(type === "pola") {
                return {definition: definition, type: type};
            } else if(type === "curv") {
                return definition.length === 2 ? {definition: [definition[0], definition[1]], type: type} : {definition: [definition[0], definition[1], definition[2]], type: type};
            } else if(type === "surf") {
                return {definition: [definition[0], definition[1], definition[2]], type: type};
            } else if(type === "mult") {
                return {definition: definition, type: type};
            } else {
                throw new TypeError("Parameter \"type\" must be either \"expl\", \"inve\", \"pola\", \"curv\", \"surf\", or \"mult\".");
            }
        }
        export const Dirac = (num: number, edge: number = 0, scl: number = 1): number => {
            if(num === edge) {
                return scl;
            } else {
                return 0;
            }
        }
        export const discriminant = (a: number, b: number, c: number, form: "stan" | "vert" = "stan"): number => {
            if(form === "stan") {
                return b * b - 4 * a * c;
            } else if(form === "vert") {
                return (2 * a * b) * (2 * a * b) - 4 * a * c;
            } else {
                throw new TypeError("Parameter \"form\" must be \"stan\" or \"vert\".");
            }
        }
        export const Heaviside = (num: number, edge: number = 0, scl: number = 1): number => {
            if(num >= edge) {
                return scl;
            } else {
                return 0;
            }
        }
        export const lerp = (p: [number, number], t: number): number => {
            return (p[1] - p[0]) * t + p[0];
        }
        export const linear = (x1: number, y1: number, x2: number, y2: number): ChalkboardFunction => {
            return Chalkboard.real.define(Chalkboard.real.slope(x1, y1, x2, y2).toString() + " * (x - " + x2.toString() + ") + " + y2.toString());
        }
        export const linearFormula = (a: number, b: number, c?: number, d?: number): number => {
            if(typeof c === "undefined" && typeof d === "undefined") {
                return -b / a;
            } else if(typeof c === "number" && typeof d === "undefined") {
                return c / a;
            } else {
                return -b / Chalkboard.real.slope(a, b, c as number, d as number) + a;
            }
        }
        export const ln = (num: number): number => {
            return Chalkboard.calc.fxdx(Chalkboard.real.define("1 / x"), 1, num) as number;
        }
        export const log = (base: number, num: number): number => {
            return Chalkboard.real.ln(num) / Chalkboard.real.ln(base);
        }
        export const log10 = (num: number): number => {
            return Chalkboard.real.log(10, num);
        }
        export const parse = (str: string): Function => {
            return Function('"use strict"; ' + Chalkboard.PARSEPREFIX + ' return (' + str + ')')();
        }
        export const pingpong = (num: number, edge: number = 0, scl: number = 1): number => {
            if((num + edge) % (2 * scl) < scl) {
                return (num + edge) % scl;
            } else {
                return scl - (num + edge) % scl;
            }
        }
        export const pow = (base: number, num: number): number => {
            if(base === 0 && num === 0) {
                return 1;
            } else {
                return Math.exp(num * Math.log(base));
            }
        }
        export const qerp = (p1: [number, number], p2: [number, number], p3: [number, number], t: number): number => {
            let a = p1[1] / ((p1[0] - p2[0]) * (p1[0] - p3[0])) + p2[1] / ((p2[0] - p1[0]) * (p2[0] - p3[0])) + p3[1] / ((p3[0] - p1[0]) * (p3[0] - p2[0]));
            let b = -p1[1] * (p2[0] + p3[0]) / ((p1[0] - p2[0]) * (p1[0] - p3[0])) - p2[1] * (p1[0] + p3[0]) / ((p2[0] - p1[0]) * (p2[0] - p3[0])) - p3[1] * (p1[0] + p2[0]) / ((p3[0] - p1[0]) * (p3[0] - p2[0]));
            let c = p1[1] * p2[0] * p3[0] / ((p1[0] - p2[0]) * (p1[0] - p3[0])) + p2[1] * p1[0] * p3[0] / ((p2[0] - p1[0]) * (p2[0] - p3[0])) + p3[1] * p1[0] * p2[0] / ((p3[0] - p1[0]) * (p3[0] - p2[0]));
            return a * t * t + b * t + c;
        }
        export const quadratic = (a: number, b: number, c: number, form: "stan" | "vert" = "stan"): ChalkboardFunction => {
            if(form === "stan") {
                return Chalkboard.real.define(a.toString() + "* x * x + " + b.toString() + " * x +" + c.toString());
            } else if(form === "vert") {
                return Chalkboard.real.define(a.toString() + " * ((x - " + b.toString() + ") * (x - " + b.toString() + ")) +" + c.toString());
            } else {
                throw new TypeError("Parameter \"form\" must be \"stan\" or \"vert\".");
            }
        }
        export const quadraticFormula = (a: number, b: number, c: number, form: "stan" | "vert" = "stan"): [number, number] => {
            if(form === "stan") {
                return [(-b + Chalkboard.real.sqrt(Chalkboard.real.discriminant(a, b, c, "stan"))) / (2 * a), (-b - Math.sqrt(Chalkboard.real.discriminant(a, b, c, "stan"))) / (2 * a)];
            } else if(form === "vert") {
                return [b + Chalkboard.real.sqrt(-c / a), b - Chalkboard.real.sqrt(-c / a)];
            } else {
                throw new TypeError("Parameter \"form\" must be \"stan\" or \"vert\".");
            }
        }
        export const ramp = (num: number, edge: number = 0, scl: number = 1): number => {
            if(num >= edge) {
                return num * scl;
            } else {
                return 0;
            }
        }
        export const rect = (num: number, center: number = 0, width: number = 2, scl: number = 1): number => {
            if(num > (center + width / 2) || num < (center - width / 2)) {
                return 0;
            } else {
                return scl;
            }
        }
        export const root = (num: number, index: number = 3): number => {
            return Math.exp(Math.log(num) / index);
        }
        export const slope = (x1: number, y1: number, x2: number, y2: number): number => {
            return (y2 - y1) / (x2 - x1);
        }
        export const sqrt = (num: number): number => {
            if(num >= 0) {
                return Math.exp(Math.log(num) / 2);
            } else {
                return NaN;
            }
        }
        export const tetration = (base: number, num: number): number | undefined => {
            if(num === 0) {
                return 1;
            } else if(num > 0) {
                return Math.pow(base, Chalkboard.real.tetration(base, num - 1) as number);
            }
        }
        export const val = (func: ChalkboardFunction, val: number | ChalkboardVector): number | ChalkboardVector => {
            if(func.type === "expl") {
                let f = Chalkboard.real.parse("x => " + func.definition);
                return f(val);
            } else if(func.type === "inve") {
                let f = Chalkboard.real.parse("y => " + func.definition);
                return f(val);
            } else if(func.type === "pola") {
                let r = Chalkboard.real.parse("O => " + func.definition);
                return r(val);
            } else if(func.type === "curv") {
                if(func.definition.length === 2) {
                    let x = Chalkboard.real.parse("t => " + func.definition[0]),
                        y = Chalkboard.real.parse("t => " + func.definition[1]);
                    return Chalkboard.vect.init(x(val), y(val));
                } else {
                    let x = Chalkboard.real.parse("t => " + func.definition[0]),
                        y = Chalkboard.real.parse("t => " + func.definition[1]),
                        z = Chalkboard.real.parse("t => " + func.definition[2]);
                    return Chalkboard.vect.init(x(val), y(val), z(val));
                }
            } else if(func.type === "surf") {
                let vect = val as ChalkboardVector;
                let x = Chalkboard.real.parse("(s, t) => " + func.definition[0]),
                    y = Chalkboard.real.parse("(s, t) => " + func.definition[1]),
                    z = Chalkboard.real.parse("(s, t) => " + func.definition[2]);
                return Chalkboard.vect.init(x(vect.x, vect.y), y(vect.x, vect.y), z(vect.x, vect.y));
            } else if(func.type === "mult" && typeof val !== "number") {
                let vect = val as ChalkboardVector;
                let f = Chalkboard.real.parse("(x, y) => " + func.definition);
                return f(vect.x, vect.y);
            } else {
                throw new TypeError("Parameter \"func\" must be of type \"ChalkboardFunction\" with a \"type\" property of \"expl\", \"pola\", \"curv\", \"surf\", or \"mult\".");
            }
        }
    }
}