/*
    The Chalkboard Library - Trigonometry Namespace
    Version 2.4.0 Noether
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
         */
        export const arccos = (rad: number): number | undefined => {
            if (rad > -1 && rad < 1) {
                return Chalkboard.calc.fxdx(Chalkboard.real.define((x) => 1 / (Math.sqrt(1 - x * x))), rad, 1) as number;
            } else if (rad === 1) {
                return 0;
            } else if (rad === -1) {
                return Chalkboard.PI();
            } else {
                return undefined;
            }
        };

        /**
         * Calculates the inverse hyperbolic cosine of a number.
         * @param {number} rad - The number in radians
         * @returns {number | undefined}
         */
        export const arccosh = (rad: number): number | undefined => {
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
         */
        export const arccot = (rad: number): number => {
            return Chalkboard.calc.fxdx(Chalkboard.real.define((x) => 1 / (1 + x * x)), rad, 1000) as number;
        };

        /**
         * Calculates the inverse hyperbolic cotangent of a number.
         * @param {number} rad - The number in radians
         * @returns {number | undefined}
         */
        export const arccoth = (rad: number): number | undefined => {
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
         */
        export const arccsc = (rad: number): number | undefined => {
            if (rad > 1) {
                return Chalkboard.calc.fxdx(Chalkboard.real.define((x) => 1 / (x * Math.sqrt(x * x - 1))), rad, 1000) as number;
            } else if (rad === 1) {
                return Chalkboard.PI() / 2;
            } else if (rad === -1) {
                return -Chalkboard.PI() / 2;
            } else if (rad < 1) {
                return -Chalkboard.calc.fxdx(Chalkboard.real.define((x) => 1 / (x * Math.sqrt(x * x - 1))), Math.abs(rad), 1000);
            } else {
                return undefined;
            }
        };

        /**
         * Calculates the inverse hyperbolic cosecant of a number.
         * @param {number} rad - The number in radians
         * @returns {number | undefined}
         */
        export const arccsch = (rad: number): number | undefined => {
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
         */
        export const arcsec = (rad: number): number | undefined => {
            if (rad > 1) {
                return Chalkboard.calc.fxdx(Chalkboard.real.define((x) => 1 / (x * Math.sqrt(x * x - 1))), 1.000001, rad) as number;
            } else if (rad === 1) {
                return 0;
            } else if (rad === -1) {
                return Chalkboard.PI();
            } else {
                return undefined;
            }
        };

        /**
         * Calculates the inverse hyperbolic secant of a number.
         * @param {number} rad - The number in radians
         * @returns {number | undefined}
         */
        export const arcsech = (rad: number): number | undefined => {
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
         */
        export const arcsin = (rad: number): number | undefined => {
            if (rad > -1 && rad < 1) {
                return Chalkboard.calc.fxdx(Chalkboard.real.define((x) => 1 / (Math.sqrt(1 - x * x))), 0, rad) as number;
            } else if (rad === 1) {
                return Chalkboard.PI() / 2;
            } else if (rad === -1) {
                return -Chalkboard.PI() / 2;
            } else {
                return undefined;
            }
        };

        /**
         * Calculates the inverse hyperbolic sine of a number.
         * @param {number} rad - The number in radians
         * @returns {number}
         */
        export const arcsinh = (rad: number): number => {
            return Math.log(rad + Math.sqrt(rad * rad + 1));
        };

        /**
         * Calculates the inverse tangent of a number.
         * @param {number} rad - The number in radians
         * @returns {number}
         */
        export const arctan = (rad: number): number => {
            return Chalkboard.calc.fxdx(Chalkboard.real.define((x) => 1 / (1 + x * x)), 0, rad) as number;
        };

        /**
         * Calculates the inverse hyperbolic tangent of a number.
         * @param {number} rad - The number in radians
         * @returns {number | undefined}
         */
        export const arctanh = (rad: number): number | undefined => {
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
         */
        export const arctan2 = (y: number, x: number): number => {
            if (x === 0) {
                if (y > 0) {
                    return Math.PI / 2;
                } else if (y < 0) {
                    return -Math.PI / 2;
                } else {
                    return 0;
                }
            } else {
                if (x > 0 && y >= 0) {
                    return Math.atan(Math.abs(y / x));
                } else if (x < 0 && y >= 0) {
                    return Math.PI - Math.atan(Math.abs(y / x));
                } else if (x < 0 && y < 0) {
                    return -Math.PI + Math.atan(Math.abs(y / x));
                } else {
                    return -Math.atan(Math.abs(y / x));
                }
            }
        };

        /**
         * Calculates the cosine of a number.
         * @param {number} rad - The number in radians
         * @returns {number}
         */
        export const cos = (rad: number): number => {
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
         */
        export const cosh = (rad: number): number => {
            return (Math.pow(Chalkboard.E(), rad) + Math.pow(Chalkboard.E(), -rad)) / 2;
        };

        /**
         * Calculates the cotangent of a number.
         * @param {number} rad - The number in radians
         * @returns {number}
         */
        export const cot = (rad: number): number => {
            return 1 / Chalkboard.trig.tan(rad);
        };

        /**
         * Calculates the hyperbolic cotangent of a number.
         * @param {number} rad - The number in radians
         * @returns {number}
         */
        export const coth = (rad: number): number => {
            return 1 / Chalkboard.trig.tanh(rad);
        };

        /**
         * Calculates the coterminal angle of an angle.
         * @param {number} rad - The angle in radians
         * @returns {number}
         */
        export const coterminal = (rad: number): number => {
            return rad % (2 * Chalkboard.PI());
        };

        /**
         * Calculates the cosecant of a number.
         * @param {number} rad - The number in radians
         * @returns {number}
         */
        export const csc = (rad: number): number => {
            return 1 / Chalkboard.trig.sin(rad);
        };

        /**
         * Calculates the hyperbolic cosecant of a number.
         * @param {number} rad - The number in radians
         * @returns {number}
         */
        export const csch = (rad: number): number => {
            return 1 / Chalkboard.trig.sinh(rad);
        };

        /**
         * Calculates the secant of a number.
         * @param {number} rad - The number in radians
         * @returns {number}
         */
        export const sec = (rad: number): number => {
            return 1 / Chalkboard.trig.cos(rad);
        };

        /**
         * Calculates the hyperbolic cosecant of a number.
         * @param {number} rad - The number in radians
         * @returns {number}
         */
        export const sech = (rad: number): number => {
            return 1 / Chalkboard.trig.cosh(rad);
        };

        /**
         * Calculates the sine of a number.
         * @param {number} rad - The number in radians
         * @returns {number}
         */
        export const sin = (rad: number): number => {
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
         */
        export const sinh = (rad: number): number => {
            return (Math.pow(Chalkboard.E(), rad) - Math.pow(Chalkboard.E(), -rad)) / 2;
        };

        /**
         * Calculates the tangent of a number.
         * @param {number} rad - The number in radians
         * @returns {number}
         */
        export const tan = (rad: number): number => {
            return Chalkboard.trig.sin(rad) / Chalkboard.trig.cos(rad);
        };

        /**
         * Calculates the hyperbolic tangent of a number.
         * @param {number} rad - The number in radians
         * @returns {number}
         */
        export const tanh = (rad: number): number => {
            return Chalkboard.trig.sinh(rad) / Chalkboard.trig.cosh(rad);
        };

        /**
         * Calculates a radian converted to a degree.
         * @param {number} rad - The radian
         * @returns {number}
         */
        export const toDeg = (rad: number): number => {
            return rad * (180 / Chalkboard.PI());
        };

        /**
         * Calculates a degree converted to a radian.
         * @param {number} deg - The degree
         * @returns {number}
         */
        export const toRad = (deg: number): number => {
            return deg * (Chalkboard.PI() / 180);
        };
    }
}
