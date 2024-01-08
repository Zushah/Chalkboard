/*
    The Chalkboard Library - Geometry Namespace
    Version 2.0.0 al-Khwarizmi
*/
/// <reference path="Chalkboard.ts"/>
namespace Chalkboard {
    /**
     * The geometry namespace.
     * @namespace
     */
    export namespace geom {
        /**
         * Calculates the area of a circle.
         * @param {number} r - The radius
         * @returns {number}
         */
        export const circleA = (r: number): number => {
            return Chalkboard.PI() * r * r;
        };

        /**
         * Calculates the perimeter (circumference) of a circle.
         * @param {number} r - The radius
         * @returns {number}
         */
        export const circleP = (r: number): number => {
            return 2 * Chalkboard.PI() * r;
        };

        /**
         * Calculates the surface area of a cone.
         * @param {number} r - The radius
         * @param {number} h - The height
         * @returns {number}
         */
        export const coneA = (r: number, h: number): number => {
            return Chalkboard.PI() * r * (r + Chalkboard.real.sqrt(h * h + r * r));
        };

        /**
         * Calculates the volume of a cone.
         * @param {number} r - The radius
         * @param {number} h - The height
         * @returns {number}
         */
        export const coneV = (r: number, h: number): number => {
            return (Chalkboard.PI() * r * r * h) / 3;
        };

        /**
         * Calculates the surface area of a cube.
         * @param {number} s - The side length
         * @returns {number}
         */
        export const cubeA = (s: number): number => {
            return 6 * s * s;
        };

        /**
         * Calculates the volume of a cube.
         * @param {number} s - The side length
         * @returns {number}
         */
        export const cubeV = (s: number): number => {
            return s * s * s;
        };

        /**
         * Calculates the surface area of a cylinder.
         * @param {number} r - The radius
         * @param {number} h - The height
         * @returns {number}
         */
        export const cylinderA = (r: number, h: number): number => {
            return 2 * Chalkboard.PI() * r * r + 2 * Chalkboard.PI() * r * h;
        };

        /**
         * Calculates the volume of a cylinder.
         * @param {number} r - The radius
         * @param {number} h - The height
         * @returns {number}
         */
        export const cylinderV = (r: number, h: number): number => {
            return Chalkboard.PI() * r * r * h;
        };

        /**
         * Calculates the distance between two n-dimensional points.
         * @param {number[]} p1 - The first point
         * @param {number[]} p2 - The second point
         * @returns {number}
         */
        export const dist = (p1: number[], p2: number[]): number => {
            if (p1.length === p2.length) {
                let result = 0;
                for (let i = 0; i < p1.length; i++) {
                    result += (p1[i] - p2[i]) * (p1[i] - p2[i]);
                }
                return Chalkboard.real.sqrt(result);
            } else {
                throw new RangeError('Parameters "p1" and "p2" must be of type "number[]" with the same "length" property.');
            }
        };

        /**
         * Calculates the distance squared between two n-dimensional points.
         * @param {number[]} p1 - The first point
         * @param {number[]} p2 - The second point
         * @returns {number}
         */
        export const distsq = (p1: number[], p2: number[]): number => {
            if (p1.length === p2.length) {
                let result = 0;
                for (let i = 0; i < p1.length; i++) {
                    result += (p1[i] - p2[i]) * (p1[i] - p2[i]);
                }
                return result;
            } else {
                throw new RangeError('Parameters "p1" and "p2" must be of type "number[]" with the same "length" property.');
            }
        };

        /**
         * Calculates the area of an ellipse.
         * @param {number} a - The major axis length
         * @param {number} b - The minor axis length
         * @returns {number}
         */
        export const ellipseA = (a: number, b: number): number => {
            return Chalkboard.PI() * a * b;
        };

        /**
         * Calculates the perimeter of an ellipse.
         * @param {number} a - The major axis length
         * @param {number} b - The minor axis length
         * @returns {number}
         */
        export const ellipseP = (a: number, b: number): number => {
            const h = ((a - b) * (a - b)) / ((a + b) * (a + b));
            return Chalkboard.PI() * (a + b) * (1 + (3 * h) / (10 + Math.sqrt(4 - 3 * h)));
        };

        /**
         * Calculates the Euler characteristic of a shape.
         * @param {number} v - The number of vertices
         * @param {number} e - The number of edges
         * @param {number} f - The number of faces
         * @returns {number}
         */
        export const Euler = (v: number, e: number, f: number): number => {
            return v - e + f;
        };

        /**
         * Draws a three-dimensional line (or rather, a two-dimensional line with three-dimensional perspective).
         * @param {number} x1 - The first x-coordinate
         * @param {number} y1 - The first y-coordinate
         * @param {number} z1 - The first z-coordinate
         * @param {number} x2 - The second x-coordinate
         * @param {number} y2 - The second y-coordinate
         * @param {number} z2 - The second z-coordinate
         * @param {CanvasRenderingContext2D} context
         */
        export const line3D = (
            x1: number,
            y1: number,
            z1: number,
            x2: number,
            y2: number,
            z2: number,
            context: CanvasRenderingContext2D = Chalkboard.real.parse(Chalkboard.CONTEXT) as unknown as CanvasRenderingContext2D
        ): void => {
            context.beginPath();
            context.moveTo(x1 / (z1 * 0.0025 + 1), y1 / (z1 * 0.0025 + 1));
            context.lineTo(x2 / (z2 * 0.0025 + 1), y2 / (z2 * 0.0025 + 1));
            context.stroke();
        };

        /**
         * Calculates the median between two n-dimensional points.
         * @param {number[]} p1 - The first point
         * @param {number[]} p2 - The second point
         * @returns {number[]}
         */
        export const mid = (p1: number[], p2: number[]): number[] => {
            if (p1.length === p2.length) {
                const result = [];
                for (let i = 0; i < p1.length; i++) {
                    result[i] = (p1[i] + p2[i]) / 2;
                }
                return result;
            } else {
                throw new RangeError('Parameters "p1" and "p2" must be of type "number[]" with the same "length" property.');
            }
        };

        /**
         * Calculates the area of a parallelogram.
         * @param {number} l - The length
         * @param {number} w - The width
         * @returns {number}
         */
        export const parallelogramA = (l: number, w: number): number => {
            return l * w;
        };

        /**
         * Calculates the perimeter of a parallelogram.
         * @param {number} l - The length
         * @param {number} w - The width
         * @returns {number}
         */
        export const parallelogramP = (l: number, w: number): number => {
            return 2 * (l + w);
        };

        /**
         * Calculates the area of a regular polygon.
         * @param {number} n - The number of sides
         * @param {number} s - The side length
         * @param {number} a - The apothem length
         * @returns {number}
         */
        export const polygonA = (n: number, s: number, a: number): number => {
            return (n * s * a) / 2;
        };

        /**
         * Calculates the perimeter of a regular polygon.
         * @param {number} n - The number of sides
         * @param {number} s - The side length
         * @returns {number}
         */
        export const polygonP = (n: number, s: number): number => {
            return n * s;
        };

        /**
         * Calculates the third side length of a triangle (either the hypotenuse or the second leg) given two side lengths with the Pythagorean theorem.
         * @param {number} a - The first side length
         * @param {number} b - The second side length
         * @param {"hyp" | "leg"} [type="hyp"] - The type of calculation, either "hyp" for hypotenuse or "leg" for leg
         * @returns {number}
         */
        export const Pythagorean = (a: number, b: number, type: "hyp" | "leg" = "hyp"): number => {
            if (type === "hyp") {
                return Math.sqrt(a * a + b * b);
            } else {
                return Math.sqrt(b * b - a * a);
            }
        };

        /**
         * Calculates a random Pythagorean triple.
         * @param {number} inf - The lower bound
         * @param {number} sup - The upper bound
         * @returns {number}
         */
        export const PythagoreanTriple = (inf: number, sup: number): [number, number, number] => {
            const a = 2 * Math.round(Chalkboard.numb.random(inf, sup)) - 1,
                b = (a * a) / 2 - 0.5,
                c = (a * a) / 2 + 0.5;
            return [a, b, c];
        };

        /**
         * Calculates the surface area of a rectangular prism.
         * @param {number} l - The length
         * @param {number} w - The width
         * @param {number} h - The height
         * @returns {number}
         */
        export const rectangularprismA = (l: number, w: number, h: number): number => {
            return 2 * (l * h + l * h + w * h);
        };

        /**
         * Calculates the volume of a rectangular prism.
         * @param {number} l - The length
         * @param {number} w - The width
         * @param {number} h - The height
         * @returns {number}
         */
        export const rectangularprismV = (l: number, w: number, h: number): number => {
            return l * w * h;
        };

        /**
         * Calculates the area of a sector of a circle.
         * @param {number} r - The radius
         * @param {number} rad - The spanned radians
         * @returns {number}
         */
        export const sectorA = (r: number, rad: number): number => {
            return (r * r * rad) / 2;
        };

        /**
         * Calculates the perimeter of a sector of a circle.
         * @param {number} r - The radius
         * @param {number} rad - The spanned radians
         * @returns {number}
         */
        export const sectorP = (r: number, rad: number): number => {
            return r * rad;
        };

        /**
         * Calculates the surface area of a sphere.
         * @param {number} r - The radius
         * @returns {number}
         */
        export const sphereA = (r: number): number => {
            return 4 * Chalkboard.PI() * r * r;
        };

        /**
         * Calculates the volume of a sphere.
         * @param {number} r - The radius
         * @returns {number}
         */
        export const sphereV = (r: number): number => {
            return (4 * Chalkboard.PI() * r * r * r) / 3;
        };

        /**
         * Calculates the area of a square.
         * @param {number} s - The side length
         * @returns {number}
         */
        export const squareA = (s: number): number => {
            return s * s;
        };

        /**
         * Calculates the perimeter of a square.
         * @param {number} s - The side length
         * @returns {number}
         */
        export const squareP = (s: number): number => {
            return 4 * s;
        };

        /**
         * Calculates the area of a trapezoid.
         * @param {number} b1 - The first base
         * @param {number} b2 - The second base
         * @param {number} h - The height
         * @returns {number}
         */
        export const trapezoidA = (b1: number, b2: number, h: number): number => {
            return ((b1 + b2) / 2) * h;
        };

        /**
         * Calculates the perimeter of a trapezoid.
         * @param {number} a - The first side length
         * @param {number} b - The second side length
         * @param {number} c - The third side length
         * @param {number} d - The fourth side length
         * @returns {number}
         */
        export const trapezoidP = (a: number, b: number, c: number, d: number): number => {
            return a + b + c + d;
        };

        /**
         * Calculates the area of a triangle.
         * @param {number} b - The base
         * @param {number} h - The height
         * @returns {number}
         */
        export const triangleA = (b: number, h: number): number => {
            return (b * h) / 2;
        };

        /**
         * Calculates the perimeter of a triangle.
         * @param {number} a - The first side length
         * @param {number} b - The second side length
         * @param {number} c - The third side length
         * @returns {number}
         */
        export const triangleP = (a: number, b: number, c: number): number => {
            return a + b + c;
        };

        /**
         * Calculates the area of a triangle with its side lengths
         * @param {number} a - The first side length
         * @param {number} b - The second side length
         * @param {number} c - The third side length
         * @returns {number}
         */
        export const trianglesidesA = (a: number, b: number, c: number): number => {
            const s = (a + b + c) / 2;
            return Chalkboard.real.sqrt(s * ((s - a) * (s - b) * (s - c)));
        };

        /**
         * Calculates the surface area of a triangular prism.
         * @param {number} a - The base's first side length
         * @param {number} b - The base's second side length
         * @param {number} c - The base's third side length
         * @param {number} h - The height
         * @returns {number}
         */
        export const triangularprismA = (a: number, b: number, c: number, h: number): number => {
            const s = (a + b + c) / 2;
            return 2 * Chalkboard.real.sqrt(s * ((s - a) * (s - b) * (s - c))) + h * (a + b + c);
        };

        /**
         * Calculates the volume of a triangular prism.
         * @param {number} a - The base's first side length
         * @param {number} b - The base's second side length
         * @param {number} c - The base's third side length
         * @param {number} h - The height
         * @returns {number}
         */
        export const triangularprismV = (a: number, b: number, c: number, h: number): number => {
            return (h * Chalkboard.real.sqrt(-(a * a * a * a) + 2 * (a * b) * (a * b) + 2 * (a * c) * (a * c) - b * b * b * b + 2 * (b * c) * (b * c) - c * c * c * c)) / 4;
        };
    }
}
