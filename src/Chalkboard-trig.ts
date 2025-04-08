/*
    The Chalkboard Library - Trigonometry Namespace
    Version 2.2.0 Galois
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
                return Chalkboard.calc.fxdx(Chalkboard.real.define("1 / (Math.sqrt(1 - x * x))"), rad, 1) as number;
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
            return Chalkboard.calc.fxdx(Chalkboard.real.define("1 / (1 + x * x)"), rad, 1000) as number;
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
                return Chalkboard.calc.fxdx(Chalkboard.real.define("1 / (x * Math.sqrt(x * x - 1))"), rad, 1000) as number;
            } else if (rad === 1) {
                return Chalkboard.PI() / 2;
            } else if (rad === -1) {
                return -Chalkboard.PI() / 2;
            } else if (rad < 1) {
                return -Chalkboard.calc.fxdx(Chalkboard.real.define("1 / (x * Math.sqrt(x * x - 1))"), Math.abs(rad), 1000);
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
                return Chalkboard.calc.fxdx(Chalkboard.real.define("1 / (x * Math.sqrt(x * x - 1))"), 1.000001, rad) as number;
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
                return Chalkboard.calc.fxdx(Chalkboard.real.define("1 / (Math.sqrt(1 - x * x))"), 0, rad) as number;
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
            return Chalkboard.calc.fxdx(Chalkboard.real.define("1 / (1 + x * x)"), 0, rad) as number;
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
            rad = Chalkboard.trig.coterminal(rad);
            return (
                1 -
                Math.pow(rad, 2) / Chalkboard.numb.factorial(2) +
                Math.pow(rad, 4) / Chalkboard.numb.factorial(4) -
                Math.pow(rad, 6) / Chalkboard.numb.factorial(6) +
                Math.pow(rad, 8) / Chalkboard.numb.factorial(8) -
                Math.pow(rad, 10) / Chalkboard.numb.factorial(10) +
                Math.pow(rad, 12) / Chalkboard.numb.factorial(12) -
                Math.pow(rad, 14) / Chalkboard.numb.factorial(14) +
                Math.pow(rad, 16) / Chalkboard.numb.factorial(16) -
                Math.pow(rad, 18) / Chalkboard.numb.factorial(18) +
                Math.pow(rad, 20) / Chalkboard.numb.factorial(20) -
                Math.pow(rad, 22) / Chalkboard.numb.factorial(22) +
                Math.pow(rad, 24) / Chalkboard.numb.factorial(24) -
                Math.pow(rad, 26) / Chalkboard.numb.factorial(26) +
                Math.pow(rad, 28) / Chalkboard.numb.factorial(28)
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
            rad = Chalkboard.trig.coterminal(rad);
            return (
                rad -
                Math.pow(rad, 3) / Chalkboard.numb.factorial(3) +
                Math.pow(rad, 5) / Chalkboard.numb.factorial(5) -
                Math.pow(rad, 7) / Chalkboard.numb.factorial(7) +
                Math.pow(rad, 9) / Chalkboard.numb.factorial(9) -
                Math.pow(rad, 11) / Chalkboard.numb.factorial(11) +
                Math.pow(rad, 13) / Chalkboard.numb.factorial(13) -
                Math.pow(rad, 15) / Chalkboard.numb.factorial(15) +
                Math.pow(rad, 17) / Chalkboard.numb.factorial(17) -
                Math.pow(rad, 19) / Chalkboard.numb.factorial(19) +
                Math.pow(rad, 21) / Chalkboard.numb.factorial(21) -
                Math.pow(rad, 23) / Chalkboard.numb.factorial(23) +
                Math.pow(rad, 25) / Chalkboard.numb.factorial(25) -
                Math.pow(rad, 27) / Chalkboard.numb.factorial(27) +
                Math.pow(rad, 29) / Chalkboard.numb.factorial(29)
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
