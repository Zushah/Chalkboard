/*
 * Chalkboard - Trigonometry Namespace
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

/// <reference path="Chalkboard.ts"/>
namespace Chalkboard {
    /**
     * The trigonometry namespace.
     * @namespace
     */
    export namespace trig {
        /**
         * Calculates the inverse cosine of a number.
         * @param {number} rad - The number in radians
         * @returns {number | undefined}
         * @example
         * const angle = Chalkboard.trig.arccos(0.5); // Returns π/3
         */
        export const arccos = (rad: number): number | undefined => {
            if (typeof rad !== "number" || Number.isNaN(rad)) throw new Error(`Chalkboard.trig.arccos: Parameter "rad" must be a number that is not NaN.`);
            if (rad === 1) {
                return 0;
            } else if (rad === -1) {
                return Chalkboard.PI();
            } else if (rad > -1 && rad < 1) {
                if (rad >= 0) {
                    return 2 * Chalkboard.trig.arctan(Chalkboard.real.sqrt((1 - rad) / (1 + rad)));
                } else {
                    return Chalkboard.PI() - 2 * Chalkboard.trig.arctan(Chalkboard.real.sqrt((1 + rad) / (1 - rad)));
                }
            } else {
                return undefined;
            }
        };

        /**
         * Calculates the inverse hyperbolic cosine of a number.
         * @param {number} rad - The number in radians
         * @returns {number | undefined}
         * @example
         * const angle = Chalkboard.trig.arccosh(1); // Returns 0
         */
        export const arccosh = (rad: number): number | undefined => {
            if (typeof rad !== "number" || Number.isNaN(rad)) throw new Error(`Chalkboard.trig.arccosh: Parameter "rad" must be a number that is not NaN.`);
            if (rad >= 1) {
                return Math.log(rad + Math.sqrt(rad * rad - 1));
            } else {
                return undefined;
            }
        };

        /**
         * Calculates the inverse cotangent of a number.
         * @param {number} rad - The number in radians
         * @returns {number}
         * @example
         * const angle = Chalkboard.trig.arccot(1); // Returns π/4
         */
        export const arccot = (rad: number): number => {
            if (typeof rad !== "number" || Number.isNaN(rad)) throw new Error(`Chalkboard.trig.arccot: Parameter "rad" must be a number that is not NaN.`);
            return Chalkboard.PI(0.5) - Chalkboard.trig.arctan(rad);
        };

        /**
         * Calculates the inverse hyperbolic cotangent of a number.
         * @param {number} rad - The number in radians
         * @returns {number | undefined}
         * @example
         * const angle = Chalkboard.trig.arccoth(2); // Returns approximately 0.5493
         */
        export const arccoth = (rad: number): number | undefined => {
            if (typeof rad !== "number" || Number.isNaN(rad)) throw new Error(`Chalkboard.trig.arccoth: Parameter "rad" must be a number that is not NaN.`);
            if (!Number.isFinite(rad)) return 0;
            if (rad < -1 || rad > 1) {
                return Math.log((rad + 1) / (rad - 1)) / 2;
            } else {
                return undefined;
            }
        };

        /**
         * Calculates the inverse cosecant of a number.
         * @param {number} rad - The number in radians
         * @returns {number | undefined}
         * @example
         * const angle = Chalkboard.trig.arccsc(2); // Returns π/6
         */
        export const arccsc = (rad: number): number | undefined => {
            if (typeof rad !== "number" || Number.isNaN(rad)) throw new Error(`Chalkboard.trig.arccsc: Parameter "rad" must be a number that is not NaN.`);
            if (rad === 1) {
                return Chalkboard.PI(0.5);
            } else if (rad === -1) {
                return Chalkboard.PI(-0.5);
            } else if (rad > 1 || rad < -1) {
                return Chalkboard.trig.arcsin(1 / rad);
            } else {
                return undefined;
            }
        };

        /**
         * Calculates the inverse hyperbolic cosecant of a number.
         * @param {number} rad - The number in radians
         * @returns {number | undefined}
         * @example
         * const angle = Chalkboard.trig.arccsch(1); // Returns approximately 0.8814
         */
        export const arccsch = (rad: number): number | undefined => {
            if (typeof rad !== "number" || Number.isNaN(rad)) throw new Error(`Chalkboard.trig.arccsch: Parameter "rad" must be a number that is not NaN.`);
            if (!Number.isFinite(rad)) return 0;
            if (rad !== 0) {
                return Math.log(1 / rad + Math.sqrt(1 / (rad * rad) + 1));
            } else {
                return undefined;
            }
        };

        /**
         * Calculates the inverse secant of a number.
         * @param {number} rad - The number in radians
         * @returns {number | undefined}
         * @example
         * const angle = Chalkboard.trig.arcsec(2); // Returns π/3
         */
        export const arcsec = (rad: number): number | undefined => {
            if (typeof rad !== "number" || Number.isNaN(rad)) throw new Error(`Chalkboard.trig.arcsec: Parameter "rad" must be a number that is not NaN.`);
            if (rad === 1) {
                return 0;
            } else if (rad === -1) {
                return Chalkboard.PI();
            } else if (rad > 1 || rad < -1) {
                return Chalkboard.trig.arccos(1 / rad);
            } else {
                return undefined;
            }
        };

        /**
         * Calculates the inverse hyperbolic secant of a number.
         * @param {number} rad - The number in radians
         * @returns {number | undefined}
         * @example
         * const angle = Chalkboard.trig.arcsech(1); // Returns 0
         */
        export const arcsech = (rad: number): number | undefined => {
            if (typeof rad !== "number" || Number.isNaN(rad)) throw new Error(`Chalkboard.trig.arcsech: Parameter "rad" must be a number that is not NaN.`);
            if (rad > 0 && rad <= 1) {
                return Math.log(1 / rad + Math.sqrt(1 / (rad * rad) - 1));
            } else {
                return undefined;
            }
        };

        /**
         * Calculates the inverse sine of a number.
         * @param {number} rad - The number in radians
         * @returns {number | undefined}
         * @example
         * const angle = Chalkboard.trig.arcsin(0.5); // Returns π/6
         */
        export const arcsin = (rad: number): number | undefined => {
            if (typeof rad !== "number" || Number.isNaN(rad)) throw new Error(`Chalkboard.trig.arcsin: Parameter "rad" must be a number that is not NaN.`);
            if (rad > -1 && rad < 1) {
                const t = 1 - rad * rad;
                const s = Chalkboard.real.sqrt(t < 0 ? 0 : t);
                return 2 * Chalkboard.trig.arctan(rad / (1 + s));
            } else if (rad === 1) {
                return Chalkboard.PI(0.5);
            } else if (rad === -1) {
                return Chalkboard.PI(-0.5);
            } else {
                return undefined;
            }
        };

        /**
         * Calculates the inverse hyperbolic sine of a number.
         * @param {number} rad - The number in radians
         * @returns {number}
         * @example
         * const angle = Chalkboard.trig.arcsinh(0); // Returns 0
         */
        export const arcsinh = (rad: number): number => {
            if (typeof rad !== "number" || Number.isNaN(rad)) throw new Error(`Chalkboard.trig.arcsinh: Parameter "rad" must be a number that is not NaN.`);
            if (!Number.isFinite(rad)) return rad;
            return Math.log(rad + Math.sqrt(rad * rad + 1));
        };

        /**
         * Calculates the inverse tangent of a number.
         * @param {number} rad - The number in radians
         * @returns {number}
         * @example
         * const angle = Chalkboard.trig.arctan(1); // Returns π/4
         */
        export const arctan = (rad: number): number => {
            if (typeof rad !== "number" || Number.isNaN(rad)) throw new Error(`Chalkboard.trig.arctan: Parameter "rad" must be a number that is not NaN.`);
            const series = (x: number): number => {
                const x2 = x * x, x3 = x2 * x, x5 = x3 * x2, x7 = x5 * x2, x9 = x7 * x2, x11 = x9 * x2, x13 = x11 * x2, x15 = x13 * x2, x17 = x15 * x2, x19 = x17 * x2, x21 = x19 * x2, x23 = x21 * x2, x25 = x23 * x2, x27 = x25 * x2, x29 = x27 * x2, x31 = x29 * x2, x33 = x31 * x2, x35 = x33 * x2, x37 = x35 * x2, x39 = x37 * x2;
                return x - x3 / 3 + x5 / 5 - x7 / 7 + x9 / 9 - x11 / 11 + x13 / 13 - x15 / 15 + x17 / 17 - x19 / 19 + x21 / 21 - x23 / 23 + x25 / 25 - x27 / 27 + x29 / 29 - x31 / 31 + x33 / 33 - x35 / 35 + x37 / 37 - x39 / 39;
            };
            if (rad === 0) return 0;
            if (!Number.isFinite(rad)) return rad > 0 ? Chalkboard.PI(0.5) : Chalkboard.PI(-0.5);
            const sign = rad < 0 ? -1 : 1;
            const x = Math.abs(rad);
            const SQRT2_MINUS_1 = Math.SQRT2 - 1, SQRT2_PLUS_1 = Math.SQRT2 + 1;
            const PI_FOURTH = Math.PI * 0.25, PI_HALF = Math.PI * 0.5;
            let result: number;
            if (x <= SQRT2_MINUS_1) {
                result = series(x);
            } else if (x <= SQRT2_PLUS_1) {
                result = PI_FOURTH + series((x - 1) / (x + 1));
            } else {
                result = PI_HALF - series(1 / x);
            }
            return sign * result;
        };

        /**
         * Calculates the inverse hyperbolic tangent of a number.
         * @param {number} rad - The number in radians
         * @returns {number | undefined}
         * @example
         * const angle = Chalkboard.trig.arctanh(0.5); // Returns approximately 0.5493
         */
        export const arctanh = (rad: number): number | undefined => {
            if (typeof rad !== "number" || Number.isNaN(rad)) throw new Error(`Chalkboard.trig.arctanh: Parameter "rad" must be a number that is not NaN.`);
            if (rad > -1 && rad < 1) {
                return Math.log((1 + rad) / (1 - rad)) / 2;
            } else {
                return undefined;
            }
        };

        /**
         * Calculates the two-argument inverse tangent of a point.
         * @param {number} y - The y-coordinate of the point
         * @param {number} x - The x-coordinate of the point
         * @returns {number}
         * @example
         * const angle = Chalkboard.trig.arctan2(1, 1); // Returns π/4
         */
        export const arctan2 = (y: number, x: number): number => {
            if (typeof y !== "number" || Number.isNaN(y)) throw new Error(`Chalkboard.trig.arctan2: Parameter "y" must be a number that is not NaN.`);
            if (typeof x !== "number" || Number.isNaN(x)) throw new Error(`Chalkboard.trig.arctan2: Parameter "x" must be a number that is not NaN.`);
            if (!Number.isFinite(y) || !Number.isFinite(x)) return Math.atan2(y, x);
            if (x === 0) {
                if (y > 0) {
                    return Chalkboard.PI(0.5);
                } else if (y < 0) {
                    return Chalkboard.PI(-0.5);
                } else {
                    return 0;
                }
            } else {
                if (x > 0 && y >= 0) {
                    return Chalkboard.trig.arctan(y / x);
                } else if (x < 0 && y >= 0) {
                    return Chalkboard.trig.arctan(y / x) + Chalkboard.PI();
                } else if (x < 0 && y < 0) {
                    return Chalkboard.trig.arctan(y / x) - Chalkboard.PI();
                } else {
                    return Chalkboard.trig.arctan(y / x);
                }
            }
        };

        /**
         * Calculates the cosine of a number.
         * @param {number} rad - The number in radians
         * @returns {number}
         * @example
         * const x = Chalkboard.trig.cos(Chalkboard.PI()); // Returns -1
         */
        export const cos = (rad: number): number => {
            if (!Number.isFinite(rad)) throw new Error(`Chalkboard.trig.cos: Parameter "rad" must be a finite number.`);
            const x = Chalkboard.trig.coterminal(rad);
            const x2 = x * x, x4 = x2 * x2, x6 = x4 * x2, x8 = x4 * x4, x10 = x6 * x4, x12 = x8 * x4, x14 = x8 * x6, x16 = x8 * x8, x18 = x10 * x8, x20 = x10 * x10, x22 = x12 * x10, x24 = x12 * x12, x26 = x14 * x12, x28 = x14 * x14;
            return (
                1 -
                x2 / 2 +
                x4 / 24 -
                x6 / 720 +
                x8 / 40320 -
                x10 / 3628800 +
                x12 / 479001600 -
                x14 / 87178291200 +
                x16 / 20922789888000 -
                x18 / 6402373705728000 +
                x20 / 2.43290200817664e+18 -
                x22 / 1.1240007277776077e+21 +
                x24 / 6.204484017332394e+23 -
                x26 / 4.0329146112660565e+26 +
                x28 / 3.0488834461171384e+29
            );
        };

        /**
         * Calculates the hyperbolic cosine of a number.
         * @param {number} rad - The number in radians
         * @returns {number}
         * @example
         * const x = Chalkboard.trig.cosh(0); // Returns 1
         */
        export const cosh = (rad: number): number => {
            if (typeof rad !== "number" || Number.isNaN(rad)) throw new Error(`Chalkboard.trig.cosh: Parameter "rad" must be a number that is not NaN.`);
            if (!Number.isFinite(rad)) return Infinity;
            return (Math.pow(Chalkboard.E(), rad) + Math.pow(Chalkboard.E(), -rad)) / 2;
        };

        /**
         * Calculates the cotangent of a number.
         * @param {number} rad - The number in radians
         * @returns {number}
         * @example
         * const x = Chalkboard.trig.cot(Chalkboard.PI(1 / 4)); // Returns approximately 1
         */
        export const cot = (rad: number): number => {
            if (!Number.isFinite(rad)) throw new Error(`Chalkboard.trig.cot: Parameter "rad" must be a finite number.`);
            return 1 / Chalkboard.trig.tan(rad);
        };

        /**
         * Calculates the hyperbolic cotangent of a number.
         * @param {number} rad - The number in radians
         * @returns {number}
         * @example
         * const x = Chalkboard.trig.coth(1); // Returns approximately 1.3130
         */
        export const coth = (rad: number): number => {
            if (typeof rad !== "number" || Number.isNaN(rad)) throw new Error(`Chalkboard.trig.coth: Parameter "rad" must be a number that is not NaN.`);
            if (!Number.isFinite(rad)) return rad > 0 ? 1 : -1;
            return 1 / Chalkboard.trig.tanh(rad);
        };

        /**
         * Calculates the coterminal angle of an angle.
         * @param {number} rad - The angle in radians
         * @returns {number}
         * @example
         * const angle = Chalkboard.trig.coterminal(Chalkboard.PI(5)); // Returns π
         */
        export const coterminal = (rad: number): number => {
            if (!Number.isFinite(rad)) throw new Error(`Chalkboard.trig.coterminal: Parameter "rad" must be a finite number.`);
            return rad % (2 * Chalkboard.PI());
        };

        /**
         * Calculates the cosecant of a number.
         * @param {number} rad - The number in radians
         * @returns {number}
         * @example
         * const x = Chalkboard.trig.csc(Chalkboard.PI(1 / 2)); // Returns 1
         */
        export const csc = (rad: number): number => {
            if (!Number.isFinite(rad)) throw new Error(`Chalkboard.trig.csc: Parameter "rad" must be a finite number.`);
            return 1 / Chalkboard.trig.sin(rad);
        };

        /**
         * Calculates the hyperbolic cosecant of a number.
         * @param {number} rad - The number in radians
         * @returns {number}
         * @example
         * const x = Chalkboard.trig.csch(1); // Returns approximately 0.8509
         */
        export const csch = (rad: number): number => {
            if (typeof rad !== "number" || Number.isNaN(rad)) throw new Error(`Chalkboard.trig.csch: Parameter "rad" must be a number that is not NaN.`);
            if (!Number.isFinite(rad)) return 0;
            return 1 / Chalkboard.trig.sinh(rad);
        };

        /**
         * Calculates the secant of a number.
         * @param {number} rad - The number in radians
         * @returns {number}
         * @example
         * const x = Chalkboard.trig.sec(0); // Returns 1
         */
        export const sec = (rad: number): number => {
            if (!Number.isFinite(rad)) throw new Error(`Chalkboard.trig.sec: Parameter "rad" must be a finite number.`);
            return 1 / Chalkboard.trig.cos(rad);
        };

        /**
         * Calculates the hyperbolic cosecant of a number.
         * @param {number} rad - The number in radians
         * @returns {number}
         * @example
         * const x = Chalkboard.trig.sech(0); // Returns 1
         */
        export const sech = (rad: number): number => {
            if (typeof rad !== "number" || Number.isNaN(rad)) throw new Error(`Chalkboard.trig.sech: Parameter "rad" must be a number that is not NaN.`);
            if (!Number.isFinite(rad)) return 0;
            return 1 / Chalkboard.trig.cosh(rad);
        };

        /**
         * Calculates the sine of a number.
         * @param {number} rad - The number in radians
         * @returns {number}
         * @example
         * const x = Chalkboard.trig.sin(Chalkboard.PI(1 / 2)); // Returns 1
         */
        export const sin = (rad: number): number => {
            if (!Number.isFinite(rad)) throw new Error(`Chalkboard.trig.sin: Parameter "rad" must be a finite number.`);
            const x = Chalkboard.trig.coterminal(rad);
            const x2 = x * x, x3 = x2 * x, x5 = x3 * x2, x7 = x5 * x2, x9 = x7 * x2, x11 = x9 * x2, x13 = x11 * x2, x15 = x13 * x2, x17 = x15 * x2, x19 = x17 * x2, x21 = x19 * x2, x23 = x21 * x2, x25 = x23 * x2, x27 = x25 * x2, x29 = x27 * x2;
            return (
                x -
                x3 / 6 +
                x5 / 120 -
                x7 / 5040 +
                x9 / 362880 -
                x11 / 39916800 +
                x13 / 6227020800 -
                x15 / 1307674368000 +
                x17 / 355687428096000 -
                x19 / 1.21645100408832e+17 +
                x21 / 5.109094217170944e+19 -
                x23 / 2.585201673888498e+22 +
                x25 / 1.5511210043330986e+25 -
                x27 / 1.0888869450418352e+28 +
                x29 / 8.841761993739701e+30
            );
        };

        /**
         * Calculates the hyperbolic sine of a number.
         * @param {number} rad - The number in radians
         * @returns {number}
         * @example
         * const x = Chalkboard.trig.sinh(0); // Returns 0
         */
        export const sinh = (rad: number): number => {
            if (typeof rad !== "number" || Number.isNaN(rad)) throw new Error(`Chalkboard.trig.sinh: Parameter "rad" must be a number that is not NaN.`);
            if (!Number.isFinite(rad)) return rad;
            return (Math.pow(Chalkboard.E(), rad) - Math.pow(Chalkboard.E(), -rad)) / 2;
        };

        /**
         * Calculates the tangent of a number.
         * @param {number} rad - The number in radians
         * @returns {number}
         * @example
         * const x = Chalkboard.trig.tan(Chalkboard.PI(1 / 4)); // Returns approximately 1
         */
        export const tan = (rad: number): number => {
            if (!Number.isFinite(rad)) throw new Error(`Chalkboard.trig.tan: Parameter "rad" must be a finite number.`);
            return Chalkboard.trig.sin(rad) / Chalkboard.trig.cos(rad);
        };

        /**
         * Calculates the hyperbolic tangent of a number.
         * @param {number} rad - The number in radians
         * @returns {number}
         * @example
         * const x = Chalkboard.trig.tanh(0); // Returns 0
         */
        export const tanh = (rad: number): number => {
            if (typeof rad !== "number" || Number.isNaN(rad)) throw new Error(`Chalkboard.trig.tanh: Parameter "rad" must be a number that is not NaN.`);
            if (!Number.isFinite(rad)) return rad > 0 ? 1 : -1;
            return Chalkboard.trig.sinh(rad) / Chalkboard.trig.cosh(rad);
        };

        /**
         * Calculates a radian converted to a degree.
         * @param {number} rad - The radian
         * @returns {number}
         * @example
         * const degrees = Chalkboard.trig.toDeg(Chalkboard.PI()); // Returns 180
         */
        export const toDeg = (rad: number): number => {
            if (typeof rad !== "number" || Number.isNaN(rad)) throw new Error(`Chalkboard.trig.toDeg: Parameter "rad" must be a number that is not NaN.`);
            return rad * (180 / Chalkboard.PI());
        };

        /**
         * Calculates a degree converted to a radian.
         * @param {number} deg - The degree
         * @returns {number}
         * @example
         * const radians = Chalkboard.trig.toRad(180); // Returns π
         */
        export const toRad = (deg: number): number => {
            if (typeof deg !== "number" || Number.isNaN(deg)) throw new Error(`Chalkboard.trig.toRad: Parameter "deg" must be a number that is not NaN.`);
            return deg * (Chalkboard.PI() / 180);
        };
    }
}
