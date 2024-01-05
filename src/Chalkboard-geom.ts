/*
    The Chalkboard Library - Geometry Namespace
    Version 1.7.0 Descartes
*/
/// <reference path="Chalkboard.ts"/>
namespace Chalkboard {
    export namespace geom {
        export const circleA = (r: number): number => {
            return Chalkboard.PI() * r * r;
        }
        export const circleP = (r: number): number => {
            return 2 * Chalkboard.PI() * r;
        }
        export const coneA = (r: number, h: number): number => {
            return Chalkboard.PI() * r * (r + Chalkboard.real.sqrt(h * h + r * r));
        }
        export const coneV = (r: number, h: number): number => {
            return (Chalkboard.PI() * r * r * h) / 3;
        }
        export const cubeA = (s: number): number => {
            return 6 * s * s;
        }
        export const cubeV = (s: number): number => {
            return s * s * s;
        }
        export const cylinderA = (r: number, h: number): number => {
            return 2 * Chalkboard.PI() * r * r + 2 * Chalkboard.PI() * r * h;
        }
        export const cylinderV = (r: number, h: number): number => {
            return Chalkboard.PI() * r * r * h;
        }
        export const dist = (p1: number[], p2: number[]): number => {
            if(p1.length === p2.length) {
                let result = 0;
                for(let i = 0; i < p1.length; i++) {
                    result += (p1[i] - p2[i]) * (p1[i] - p2[i]);
                }
                return Chalkboard.real.sqrt(result);
            } else {
                throw new RangeError("Parameters \"p1\" and \"p2\" must be of type \"number[]\" with the same \"length\" property.");
            }
        }
        export const distsq = (p1: number[], p2: number[]): number => {
            if(p1.length === p2.length) {
                let result = 0;
                for(let i = 0; i < p1.length; i++) {
                    result += (p1[i] - p2[i]) * (p1[i] - p2[i]);
                }
                return result;
            } else {
                throw new RangeError("Parameters \"p1\" and \"p2\" must be of type \"number[]\" with the same \"length\" property.");
            }
        }
        export const ellipseA = (a: number, b: number): number => {
            return Chalkboard.PI() * a * b;
        }
        export const ellipseP = (a: number, b: number): number => {
            let h = ((a - b) * (a - b)) / ((a + b) * (a + b));
            return Chalkboard.PI() * (a + b) * (1 + (3 * h) / (10 + Math.sqrt(4 - 3 * h)));
        }
        export const Euler = (v: number, e: number, f: number): number => {
            return v - e + f;
        }
        export const line3D = (x1: number, y1: number, z1: number, x2: number, y2: number, z2: number, context: CanvasRenderingContext2D = Chalkboard.real.parse(Chalkboard.CONTEXT) as unknown as CanvasRenderingContext2D): void => {
            context.beginPath();
            context.moveTo(x1 / (z1 * 0.0025 + 1), y1 / (z1 * 0.0025 + 1));
            context.lineTo(x2 / (z2 * 0.0025 + 1), y2 / (z2 * 0.0025 + 1));
            context.stroke();
        }
        export const mid = (p1: number[], p2: number[]): number[] => {
            if(p1.length === p2.length) {
                let result = [];
                for(let i = 0; i < p1.length; i++) {
                    result[i] = (p1[i] + p2[i]) / 2;
                }
                return result;
            } else {
                throw new RangeError("Parameters \"p1\" and \"p2\" must be of type \"number[]\" with the same \"length\" property.");
            }
        }
        export const parallelogramA = (l: number, w: number): number => {
            return l * w;
        }
        export const parallelogramP = (l: number, w: number): number => {
            return 2 * (l + w);
        }
        export const polygonA = (n: number, s: number, a: number): number => {
            return (n * s * a) / 2;
        }
        export const polygonP = (n: number, s: number): number => {
            return n * s;
        }
        export const Pythagorean = (a: number, b: number, type: "hyp" | "leg" = "hyp"): number => {
            if(type === "hyp") {
                return Math.sqrt((a * a) + (b * b));
            } else {
                return Math.sqrt((b * b) - (a * a));
            }
        }
        export const PythagoreanTriple = (inf: number, sup: number): [number, number, number] => {
            let a = 2 * Math.round(Chalkboard.numb.random(inf, sup)) - 1,
                b = ((a * a) / 2) - 0.5,
                c = ((a * a) / 2) + 0.5;
            return [a, b, c];
        }
        export const rectangularprismA = (l: number, w: number, h: number): number => {
            return 2 * (l * h + l * h + w * h);
        }
        export const rectangularprismV = (l: number, w: number, h: number): number => {
            return l * w * h;
        }
        export const sectorA = (r: number, rad: number): number => {
            return (r * r * rad) / 2;
        }
        export const sectorP = (r: number, rad: number): number => {
            return r * rad;
        }
        export const sphereA = (r: number): number => {
            return 4 * Chalkboard.PI() * r * r;
        }
        export const sphereV = (r: number): number => {
            return (4 * Chalkboard.PI() * r * r * r) / 3;
        }
        export const squareA = (s: number): number => {
            return s * s;
        }
        export const squareP = (s: number): number => {
            return 4 * s;
        }
        export const trapezoidA = (b1: number, b2: number, h: number): number => {
            return ((b1 + b2) / 2) * h;
        }
        export const trapezoidP = (a: number, b: number, c: number, d: number): number => {
            return a + b + c + d;
        }
        export const triangleA = (b: number, h: number): number => {
            return (b * h) / 2;
        }
        export const triangleP = (a: number, b: number, c: number): number => {
            return a + b + c;
        }
        export const trianglesidesA = (a: number, b: number, c: number): number => {
            let s = (a + b + c) / 2;
            return Chalkboard.real.sqrt(s * ((s - a) * (s - b) * (s - c)));
        }
        export const triangularprismA = (a: number, b: number, c: number, h: number): number => {
            let s = (a + b + c) / 2;
            return 2 * Chalkboard.real.sqrt(s * ((s - a) * (s - b) * (s - c))) + h * (a + b + c);
        }
        export const triangularprismV = (a: number, b: number, c: number, h: number): number => {
            return h * (Chalkboard.real.sqrt(-(a * a * a * a) + 2 * (a * b) * (a * b) + 2 * (a * c) * (a * c) - (b * b * b * b) + 2 * (b * c) * (b * c) - (c * c * c * c))) / 4;
        }
    }
}