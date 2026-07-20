/*
    Chalkboard - Geometry Namespace
    Version 3.0.4 Euler
    Released July 20th, 2026
*/
/*
    This Source Code Form is subject to the terms of the
    Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed
    with this file, You can obtain one at http://mozilla.org/MPL/2.0/.
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
         * @example
         * // Returns 78.53981633974483
         * const area = Chalkboard.geom.circleA(5);
         */
        export const circleA = (r: number): number => {
            if (!Number.isFinite(r) || r < 0) throw new Error(`Chalkboard.geom.circleA: Parameter "r" must be a non-negative finite number.`);
            return Chalkboard.PI() * r * r;
        };

        /**
         * Calculates the perimeter (circumference) of a circle.
         * @param {number} r - The radius
         * @returns {number}
         * @example
         * // Returns 31.415926535897935
         * const perimeter = Chalkboard.geom.circleP(5);
         */
        export const circleP = (r: number): number => {
            if (!Number.isFinite(r) || r < 0) throw new Error(`Chalkboard.geom.circleP: Parameter "r" must be a non-negative finite number.`);
            return 2 * Chalkboard.PI() * r;
        };

        /**
         * Calculates the surface area of a cone.
         * @param {number} r - The radius
         * @param {number} h - The height
         * @returns {number}
         * @example
         * // Returns 254.1601846157631
         * const area = Chalkboard.geom.coneA(5, 10);
         */
        export const coneA = (r: number, h: number): number => {
            if (!Number.isFinite(r) || r < 0) throw new Error(`Chalkboard.geom.coneA: Parameter "r" must be a non-negative finite number.`);
            if (!Number.isFinite(h) || h < 0) throw new Error(`Chalkboard.geom.coneA: Parameter "h" must be a non-negative finite number.`);
            return Chalkboard.PI() * r * (r + Chalkboard.real.sqrt(h * h + r * r));
        };

        /**
         * Calculates the volume of a cone.
         * @param {number} r - The radius
         * @param {number} h - The height
         * @returns {number}
         * @example
         * // Returns 261.79938779914943
         * const volume = Chalkboard.geom.coneV(5, 10);
         */
        export const coneV = (r: number, h: number): number => {
            if (!Number.isFinite(r) || r < 0) throw new Error(`Chalkboard.geom.coneV: Parameter "r" must be a non-negative finite number.`);
            if (!Number.isFinite(h) || h < 0) throw new Error(`Chalkboard.geom.coneV: Parameter "h" must be a non-negative finite number.`);
            return (Chalkboard.PI() * r * r * h) / 3;
        };

        /**
         * Calculates the surface area of a cube.
         * @param {number} s - The side length
         * @returns {number}
         * @example
         * // Returns 6
         * const area = Chalkboard.geom.cubeA(1);
         */
        export const cubeA = (s: number): number => {
            if (!Number.isFinite(s) || s < 0) throw new Error(`Chalkboard.geom.cubeA: Parameter "s" must be a non-negative finite number.`);
            return 6 * s * s;
        };

        /**
         * Calculates the volume of a cube.
         * @param {number} s - The side length
         * @returns {number}
         * @example
         * // Returns 1
         * const volume = Chalkboard.geom.cubeV(1);
         */
        export const cubeV = (s: number): number => {
            if (!Number.isFinite(s) || s < 0) throw new Error(`Chalkboard.geom.cubeV: Parameter "s" must be a non-negative finite number.`);
            return s * s * s;
        };

        /**
         * Calculates the surface area of a cylinder.
         * @param {number} r - The radius
         * @param {number} h - The height
         * @returns {number}
         * @example
         * // Returns 471.23889803846896
         * const area = Chalkboard.geom.cylinderA(5, 10);
         */
        export const cylinderA = (r: number, h: number): number => {
            if (!Number.isFinite(r) || r < 0) throw new Error(`Chalkboard.geom.cylinderA: Parameter "r" must be a non-negative finite number.`);
            if (!Number.isFinite(h) || h < 0) throw new Error(`Chalkboard.geom.cylinderA: Parameter "h" must be a non-negative finite number.`);
            return 2 * Chalkboard.PI() * r * r + 2 * Chalkboard.PI() * r * h;
        };

        /**
         * Calculates the volume of a cylinder.
         * @param {number} r - The radius
         * @param {number} h - The height
         * @returns {number}
         * @example
         * // Returns 785.3981633974483
         * const volume = Chalkboard.geom.cylinderV(5, 10);
         */
        export const cylinderV = (r: number, h: number): number => {
            if (!Number.isFinite(r) || r < 0) throw new Error(`Chalkboard.geom.cylinderV: Parameter "r" must be a non-negative finite number.`);
            if (!Number.isFinite(h) || h < 0) throw new Error(`Chalkboard.geom.cylinderV: Parameter "h" must be a non-negative finite number.`);
            return Chalkboard.PI() * r * r * h;
        };

        /**
         * Calculates the distance between two n-dimensional points.
         * @param {number[]} p1 - The first point
         * @param {number[]} p2 - The second point
         * @returns {number}
         * @example
         * // Returns 11.224972160321824
         * const distance = Chalkboard.geom.dist([1, 2, -6], [3, 1, 5]);
         */
        export const dist = (p1: number[], p2: number[]): number => {
            if (p1.length === p2.length) {
                let result = 0;
                for (let i = 0; i < p1.length; i++) {
                    result += (p1[i] - p2[i]) * (p1[i] - p2[i]);
                }
                return Chalkboard.real.sqrt(result);
            } else {
                throw new Error(`Chalkboard.geom.dist: Parameters "p1" and "p2" must be of type number[] with the same "length" property.`);
            }
        };

        /**
         * Calculates the distance squared between two n-dimensional points.
         * @param {number[]} p1 - The first point
         * @param {number[]} p2 - The second point
         * @returns {number}
         * @example
         * // Returns 126
         * const distanceSq = Chalkboard.geom.distsq([1, 2, -6], [3, 1, 5]); 
         */
        export const distsq = (p1: number[], p2: number[]): number => {
            if (p1.length === p2.length) {
                let result = 0;
                for (let i = 0; i < p1.length; i++) {
                    result += (p1[i] - p2[i]) * (p1[i] - p2[i]);
                }
                return result;
            } else {
                throw new Error(`Chalkboard.geom.distsq: Parameters "p1" and "p2" must be of type number[] with the same "length" property.`);
            }
        };

        /**
         * Calculates the area of an ellipse.
         * @param {number} a - The major axis length
         * @param {number} b - The minor axis length
         * @returns {number}
         * @example
         * // Returns 94.2477796076938
         * const area = Chalkboard.geom.ellipseA(5, 6);
         */
        export const ellipseA = (a: number, b: number): number => {
            if (!Number.isFinite(a) || a < 0) throw new Error(`Chalkboard.geom.ellipseA: Parameter "a" must be a non-negative finite number.`);
            if (!Number.isFinite(b) || b < 0) throw new Error(`Chalkboard.geom.ellipseA: Parameter "b" must be a non-negative finite number.`);
            return Chalkboard.PI() * a * b;
        };

        /**
         * Calculates the perimeter of an ellipse.
         * @param {number} a - The major axis length
         * @param {number} b - The minor axis length
         * @returns {number}
         * @example
         * // Returns 34.62895597904838
         * const perimeter = Chalkboard.geom.ellipseP(5, 6);
         */
        export const ellipseP = (a: number, b: number): number => {
            if (!Number.isFinite(a) || a < 0) throw new Error(`Chalkboard.geom.ellipseP: Parameter "a" must be a non-negative finite number.`);
            if (!Number.isFinite(b) || b < 0) throw new Error(`Chalkboard.geom.ellipseP: Parameter "b" must be a non-negative finite number.`);
            if (a === 0 && b === 0) return 0;
            const h = ((a - b) * (a - b)) / ((a + b) * (a + b));
            return Chalkboard.PI() * (a + b) * (1 + (3 * h) / (10 + Math.sqrt(4 - 3 * h)));
        };

        /**
         * Calculates the Euler characteristic of a shape.
         * @param {number} v - The number of vertices
         * @param {number} e - The number of edges
         * @param {number} f - The number of faces
         * @returns {number}
         * @example
         * // Returns 2
         * const euler = Chalkboard.geom.Euler(8, 12, 6);
         */
        export const Euler = (v: number, e: number, f: number): number => {
            if (!Number.isInteger(v) || v < 0) throw new Error(`Chalkboard.geom.Euler: Parameter "v" must be a non-negative integer.`);
            if (!Number.isInteger(e) || e < 0) throw new Error(`Chalkboard.geom.Euler: Parameter "e" must be a non-negative integer.`);
            if (!Number.isInteger(f) || f < 0) throw new Error(`Chalkboard.geom.Euler: Parameter "f" must be a non-negative integer.`);
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
         * @example
         * // Note: you must have a canvas tag somewhere.
         * 
         * // Draws a line on the screen from (0, 0, 0) to (200, 100, -10)
         * Chalkboard.geom.line3D(0, 0, 0, 200, 100, -10);
         */
        export const line3D = (
            x1: number,
            y1: number,
            z1: number,
            x2: number,
            y2: number,
            z2: number,
            context: CanvasRenderingContext2D = Function('"use strict"; return (' + Chalkboard.CONTEXT + ')')() as CanvasRenderingContext2D
        ): void => {
            if (!Number.isFinite(x1)) throw new Error(`Chalkboard.geom.line3D: Parameter "x1" must be a finite number.`);
            if (!Number.isFinite(y1)) throw new Error(`Chalkboard.geom.line3D: Parameter "y1" must be a finite number.`);
            if (!Number.isFinite(z1)) throw new Error(`Chalkboard.geom.line3D: Parameter "z1" must be a finite number.`);
            if (!Number.isFinite(x2)) throw new Error(`Chalkboard.geom.line3D: Parameter "x2" must be a finite number.`);
            if (!Number.isFinite(y2)) throw new Error(`Chalkboard.geom.line3D: Parameter "y2" must be a finite number.`);
            if (!Number.isFinite(z2)) throw new Error(`Chalkboard.geom.line3D: Parameter "z2" must be a finite number.`);
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
         * @example
         * // Returns [75, -25, 305.5]
         * const median = Chalkboard.geom.mid([50, 0, 100], [100, -50, 511]); 
         */
        export const mid = (p1: number[], p2: number[]): number[] => {
            if (p1.length === p2.length) {
                const result = [];
                for (let i = 0; i < p1.length; i++) {
                    result[i] = (p1[i] + p2[i]) / 2;
                }
                return result;
            } else {
                throw new Error(`Chalkboard.geom.mid: Parameters "p1" and "p2" must be of type number[] with the same "length" property.`);
            }
        };

        /**
         * Calculates the area of a parallelogram.
         * @param {number} l - The length
         * @param {number} w - The width
         * @returns {number}
         * @example
         * // Returns 500
         * const area = Chalkboard.geom.parallelogramA(50, 10);
         */
        export const parallelogramA = (l: number, w: number): number => {
            if (!Number.isFinite(l) || l < 0) throw new Error(`Chalkboard.geom.parallelogramA: Parameter "l" must be a non-negative finite number.`);
            if (!Number.isFinite(w) || w < 0) throw new Error(`Chalkboard.geom.parallelogramA: Parameter "w" must be a non-negative finite number.`);
            return l * w;
        };

        /**
         * Calculates the perimeter of a parallelogram.
         * @param {number} l - The length
         * @param {number} w - The width
         * @returns {number}
         * @example
         * // Returns 120
         * const perimeter = Chalkboard.geom.parallelogramP(50, 10);
         */
        export const parallelogramP = (l: number, w: number): number => {
            if (!Number.isFinite(l) || l < 0) throw new Error(`Chalkboard.geom.parallelogramP: Parameter "l" must be a non-negative finite number.`);
            if (!Number.isFinite(w) || w < 0) throw new Error(`Chalkboard.geom.parallelogramP: Parameter "w" must be a non-negative finite number.`);
            return 2 * (l + w);
        };

        /**
         * Calculates the area of a regular polygon.
         * @param {number} n - The number of sides
         * @param {number} s - The side length
         * @param {number} a - The apothem length
         * @returns {number}
         * @example
         * // Returns 100
         * const area = Chalkboard.geom.polygonA(4, 10, 5);
         */
        export const polygonA = (n: number, s: number, a: number): number => {
            if (!Number.isInteger(n) || n < 3) throw new Error(`Chalkboard.geom.polygonA: Parameter "n" must be an integer greater than or equal to 3.`);
            if (!Number.isFinite(s) || s < 0) throw new Error(`Chalkboard.geom.polygonA: Parameter "s" must be a non-negative finite number.`);
            if (!Number.isFinite(a) || a < 0) throw new Error(`Chalkboard.geom.polygonA: Parameter "a" must be a non-negative finite number.`);
            return (n * s * a) / 2;
        };

        /**
         * Calculates the perimeter of a regular polygon.
         * @param {number} n - The number of sides
         * @param {number} s - The side length
         * @returns {number}
         * @example
         * // Returns 40
         * const perimeter = Chalkboard.geom.polygonP(4, 10);
         */
        export const polygonP = (n: number, s: number): number => {
            if (!Number.isInteger(n) || n < 3) throw new Error(`Chalkboard.geom.polygonP: Parameter "n" must be an integer greater than or equal to 3.`);
            if (!Number.isFinite(s) || s < 0) throw new Error(`Chalkboard.geom.polygonP: Parameter "s" must be a non-negative finite number.`);
            return n * s;
        };

        /**
         * Calculates the third side length of a triangle (either the hypotenuse or the second leg) given two side lengths with the Pythagorean theorem.
         * @param {number} a - The first side length
         * @param {number} b - The second side length
         * @param {"hyp" | "leg"} [type="hyp"] - The type of calculation, either "hyp" for hypotenuse or "leg" for leg
         * @returns {number}
         * @example
         * // Returns 3
         * const leg = Chalkboard.geom.Pythagorean(4, 5, "leg");
         * 
         * // Returns 5
         * const hyp = Chalkboard.geom.Pythagorean(3, 4, "hyp");
         */
        export const Pythagorean = (a: number, b: number, type: "hyp" | "leg" = "hyp"): number => {
            if (!Number.isFinite(a) || a < 0) throw new Error(`Chalkboard.geom.Pythagorean: Parameter "a" must be a non-negative finite number.`);
            if (!Number.isFinite(b) || b < 0) throw new Error(`Chalkboard.geom.Pythagorean: Parameter "b" must be a non-negative finite number.`);
            if (type !== "hyp" && type !== "leg") throw new Error(`Chalkboard.geom.Pythagorean: Parameter "type" must be either hyp or leg.`);
            if (type === "leg" && a > b) throw new Error(`Chalkboard.geom.Pythagorean: Parameter "a" must be less than or equal to parameter "b" when parameter "type" is leg.`);
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
         * @example
         * // Returns a random pythagorean triple with a side length between 2*1 and 2*10
         * const tri = Chalkboard.geom.PythagoreanTriple(1, 10);
         */
        export const PythagoreanTriple = (inf: number, sup: number): [number, number, number] => {
            if (!Number.isFinite(inf) || inf < 1) throw new Error(`Chalkboard.geom.PythagoreanTriple: Parameter "inf" must be a finite number greater than or equal to 1.`);
            if (!Number.isFinite(sup) || sup < inf) throw new Error(`Chalkboard.geom.PythagoreanTriple: Parameter "sup" must be a finite number greater than or equal to parameter "inf".`);
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
         * @example
         * // Returns 220
         * const area = Chalkboard.geom.rectangularprismA(5, 4, 10);
         */
        export const rectangularprismA = (l: number, w: number, h: number): number => {
            if (!Number.isFinite(l) || l < 0) throw new Error(`Chalkboard.geom.rectangularprismA: Parameter "l" must be a non-negative finite number.`);
            if (!Number.isFinite(w) || w < 0) throw new Error(`Chalkboard.geom.rectangularprismA: Parameter "w" must be a non-negative finite number.`);
            if (!Number.isFinite(h) || h < 0) throw new Error(`Chalkboard.geom.rectangularprismA: Parameter "h" must be a non-negative finite number.`);
            return 2 * (l * h + l * w + w * h);
        };

        /**
         * Calculates the volume of a rectangular prism.
         * @param {number} l - The length
         * @param {number} w - The width
         * @param {number} h - The height
         * @returns {number}
         * @example
         * // Returns 200
         * const volume = Chalkboard.geom.rectangularprismV(5, 4, 10);
         */
        export const rectangularprismV = (l: number, w: number, h: number): number => {
            if (!Number.isFinite(l) || l < 0) throw new Error(`Chalkboard.geom.rectangularprismV: Parameter "l" must be a non-negative finite number.`);
            if (!Number.isFinite(w) || w < 0) throw new Error(`Chalkboard.geom.rectangularprismV: Parameter "w" must be a non-negative finite number.`);
            if (!Number.isFinite(h) || h < 0) throw new Error(`Chalkboard.geom.rectangularprismV: Parameter "h" must be a non-negative finite number.`);
            return l * w * h;
        };

        /**
         * Calculates the area of a sector of a circle.
         * @param {number} r - The radius
         * @param {number} rad - The spanned radians
         * @returns {number}
         * @example
         * // Returns 39.26990816987242
         * const area = Chalkboard.geom.sectorA(5, Chalkboard.PI());
         */
        export const sectorA = (r: number, rad: number): number => {
            if (!Number.isFinite(r) || r < 0) throw new Error(`Chalkboard.geom.sectorA: Parameter "r" must be a non-negative finite number.`);
            if (!Number.isFinite(rad) || rad < 0 || rad > Chalkboard.PI(2)) throw new Error(`Chalkboard.geom.sectorA: Parameter "rad" must be between 0 and 2π.`);
            return (r * r * rad) / 2;
        };

        /**
         * Calculates the perimeter of a sector of a circle.
         * @param {number} r - The radius
         * @param {number} rad - The spanned radians
         * @returns {number}
         * @example
         * // Returns 15.707963267948967
         * const perimeter = Chalkboard.geom.sectorP(5, Chalkboard.PI());
         */
        export const sectorP = (r: number, rad: number): number => {
            if (!Number.isFinite(r) || r < 0) throw new Error(`Chalkboard.geom.sectorP: Parameter "r" must be a non-negative finite number.`);
            if (!Number.isFinite(rad) || rad < 0 || rad > Chalkboard.PI(2)) throw new Error(`Chalkboard.geom.sectorP: Parameter "rad" must be between 0 and 2π.`);
            return r * rad;
        };

        /**
         * Calculates the surface area of a sphere.
         * @param {number} r - The radius
         * @returns {number}
         * @example
         * // Returns 314.1592653589793
         * const area = Chalkboard.geom.sphereA(5);
         */
        export const sphereA = (r: number): number => {
            if (!Number.isFinite(r) || r < 0) throw new Error(`Chalkboard.geom.sphereA: Parameter "r" must be a non-negative finite number.`);
            return 4 * Chalkboard.PI() * r * r;
        };

        /**
         * Calculates the volume of a sphere.
         * @param {number} r - The radius
         * @returns {number}
         * @example
         * // Returns 523.5987755982989
         * const volume = Chalkboard.geom.sphereV(5);
         */
        export const sphereV = (r: number): number => {
            if (!Number.isFinite(r) || r < 0) throw new Error(`Chalkboard.geom.sphereV: Parameter "r" must be a non-negative finite number.`);
            return (4 * Chalkboard.PI() * r * r * r) / 3;
        };

        /**
         * Calculates the area of a square.
         * @param {number} s - The side length
         * @returns {number}
         * @example
         * // Returns 9
         * const area = Chalkboard.geom.squareA(3);
         */
        export const squareA = (s: number): number => {
            if (!Number.isFinite(s) || s < 0) throw new Error(`Chalkboard.geom.squareA: Parameter "s" must be a non-negative finite number.`);
            return s * s;
        };

        /**
         * Calculates the perimeter of a square.
         * @param {number} s - The side length
         * @returns {number}
         * @example
         * // Returns 12
         * const perimeter = Chalkboard.geom.squareP(3);
         */
        export const squareP = (s: number): number => {
            if (!Number.isFinite(s) || s < 0) throw new Error(`Chalkboard.geom.squareP: Parameter "s" must be a non-negative finite number.`);
            return 4 * s;
        };

        /**
         * Calculates the area of a trapezoid.
         * @param {number} b1 - The first base
         * @param {number} b2 - The second base
         * @param {number} h - The height
         * @returns {number}
         * @example
         * // Returns 42.5
         * const area = Chalkboard.geom.trapezoidA(10, 7, 5);
         */
        export const trapezoidA = (b1: number, b2: number, h: number): number => {
            if (!Number.isFinite(b1) || b1 < 0) throw new Error(`Chalkboard.geom.trapezoidA: Parameter "b1" must be a non-negative finite number.`);
            if (!Number.isFinite(b2) || b2 < 0) throw new Error(`Chalkboard.geom.trapezoidA: Parameter "b2" must be a non-negative finite number.`);
            if (!Number.isFinite(h) || h < 0) throw new Error(`Chalkboard.geom.trapezoidA: Parameter "h" must be a non-negative finite number.`);
            return ((b1 + b2) / 2) * h;
        };

        /**
         * Calculates the perimeter of a trapezoid.
         * @param {number} a - The first side length
         * @param {number} b - The second side length
         * @param {number} c - The third side length
         * @param {number} d - The fourth side length
         * @returns {number}
         * @example
         * // Returns 24
         * const perimeter = Chalkboard.geom.trapezoidP(10, 7, 5, 2);
         */
        export const trapezoidP = (a: number, b: number, c: number, d: number): number => {
            if (!Number.isFinite(a) || a < 0) throw new Error(`Chalkboard.geom.trapezoidP: Parameter "a" must be a non-negative finite number.`);
            if (!Number.isFinite(b) || b < 0) throw new Error(`Chalkboard.geom.trapezoidP: Parameter "b" must be a non-negative finite number.`);
            if (!Number.isFinite(c) || c < 0) throw new Error(`Chalkboard.geom.trapezoidP: Parameter "c" must be a non-negative finite number.`);
            if (!Number.isFinite(d) || d < 0) throw new Error(`Chalkboard.geom.trapezoidP: Parameter "d" must be a non-negative finite number.`);
            return a + b + c + d;
        };

        /**
         * Calculates the area of a triangle.
         * @param {number} b - The base
         * @param {number} h - The height
         * @returns {number}
         * @example
         * // Returns 17.5
         * const area = Chalkboard.geom.triangleA(5, 7);
         */
        export const triangleA = (b: number, h: number): number => {
            if (!Number.isFinite(b) || b < 0) throw new Error(`Chalkboard.geom.triangleA: Parameter "b" must be a non-negative finite number.`);
            if (!Number.isFinite(h) || h < 0) throw new Error(`Chalkboard.geom.triangleA: Parameter "h" must be a non-negative finite number.`);
            return (b * h) / 2;
        };

        /**
         * Calculates the perimeter of a triangle.
         * @param {number} a - The first side length
         * @param {number} b - The second side length
         * @param {number} c - The third side length
         * @returns {number}
         * @example
         * // Returns 22
         * const perimeter = Chalkboard.geom.triangleP(10, 7, 5);
         */
        export const triangleP = (a: number, b: number, c: number): number => {
            if (!Number.isFinite(a) || a < 0) throw new Error(`Chalkboard.geom.triangleP: Parameter "a" must be a non-negative finite number.`);
            if (!Number.isFinite(b) || b < 0) throw new Error(`Chalkboard.geom.triangleP: Parameter "b" must be a non-negative finite number.`);
            if (!Number.isFinite(c) || c < 0) throw new Error(`Chalkboard.geom.triangleP: Parameter "c" must be a non-negative finite number.`);
            if (a + b <= c || a + c <= b || b + c <= a) throw new Error(`Chalkboard.geom.triangleP: Parameters "a", "b", and "c" must form a non-degenerate triangle.`);
            return a + b + c;
        };

        /**
         * Calculates the area of a triangle with its side lengths
         * @param {number} a - The first side length
         * @param {number} b - The second side length
         * @param {number} c - The third side length
         * @returns {number}
         * @example
         * // Returns 31.30495168499705
         * const area = Chalkboard.geom.trianglesidesA(9, 7, 12);
         */
        export const trianglesidesA = (a: number, b: number, c: number): number => {
            if (!Number.isFinite(a) || a < 0) throw new Error(`Chalkboard.geom.trianglesidesA: Parameter "a" must be a non-negative finite number.`);
            if (!Number.isFinite(b) || b < 0) throw new Error(`Chalkboard.geom.trianglesidesA: Parameter "b" must be a non-negative finite number.`);
            if (!Number.isFinite(c) || c < 0) throw new Error(`Chalkboard.geom.trianglesidesA: Parameter "c" must be a non-negative finite number.`);
            if (a + b <= c || a + c <= b || b + c <= a) throw new Error(`Chalkboard.geom.trianglesidesA: Parameters "a", "b", and "c" must form a non-degenerate triangle.`);
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
         * @example
         * // Returns 342.6099033699941
         * const area = Chalkboard.geom.triangularprismA(9, 7, 12, 10);
         */
        export const triangularprismA = (a: number, b: number, c: number, h: number): number => {
            if (!Number.isFinite(a) || a < 0) throw new Error(`Chalkboard.geom.triangularprismA: Parameter "a" must be a non-negative finite number.`);
            if (!Number.isFinite(b) || b < 0) throw new Error(`Chalkboard.geom.triangularprismA: Parameter "b" must be a non-negative finite number.`);
            if (!Number.isFinite(c) || c < 0) throw new Error(`Chalkboard.geom.triangularprismA: Parameter "c" must be a non-negative finite number.`);
            if (!Number.isFinite(h) || h < 0) throw new Error(`Chalkboard.geom.triangularprismA: Parameter "h" must be a non-negative finite number.`);
            if (a + b <= c || a + c <= b || b + c <= a) throw new Error(`Chalkboard.geom.triangularprismA: Parameters "a", "b", and "c" must form a non-degenerate triangle.`);
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
         * @example
         * // Returns 313.0495168499706
         * const volume = Chalkboard.geom.triangularprismV(9, 7, 12, 10);
         */
        export const triangularprismV = (a: number, b: number, c: number, h: number): number => {
            if (!Number.isFinite(a) || a < 0) throw new Error(`Chalkboard.geom.triangularprismV: Parameter "a" must be a non-negative finite number.`);
            if (!Number.isFinite(b) || b < 0) throw new Error(`Chalkboard.geom.triangularprismV: Parameter "b" must be a non-negative finite number.`);
            if (!Number.isFinite(c) || c < 0) throw new Error(`Chalkboard.geom.triangularprismV: Parameter "c" must be a non-negative finite number.`);
            if (!Number.isFinite(h) || h < 0) throw new Error(`Chalkboard.geom.triangularprismV: Parameter "h" must be a non-negative finite number.`);
            if (a + b <= c || a + c <= b || b + c <= a) throw new Error(`Chalkboard.geom.triangularprismV: Parameters "a", "b", and "c" must form a non-degenerate triangle.`);
            return (h * Chalkboard.real.sqrt(-(a * a * a * a) + 2 * (a * b) * (a * b) + 2 * (a * c) * (a * c) - b * b * b * b + 2 * (b * c) * (b * c) - c * c * c * c)) / 4;
        };
    }
}
