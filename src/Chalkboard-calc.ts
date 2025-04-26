/*
    The Chalkboard Library - Calculus Namespace
    Version 2.3.0 Boole
*/
/// <reference path="Chalkboard.ts"/>
namespace Chalkboard {
    /**
     * The calculus namespace.
     * @namespace
     */
    export namespace calc {
        /**
         * Calculates the autocorrelation of an explicit function at a value.
         * @param {ChalkboardFunction} func - The function
         * @param {number} val - The value
         * @returns {number}
         */
        export const autocorrelation = (func: ChalkboardFunction, val: number): number => {
            return Chalkboard.calc.correlation(func, func, val);
        };

        /**
         * Calculates the binormal vector of a parametric curve function at a value.
         * @param {ChalkboardFunction} func - The function
         * @param {number} val - The value
         * @returns {ChalkboardVector}
         */
        export const binormal = (func: ChalkboardFunction, val: number): ChalkboardVector => {
            if (func.type === "curv") {
                if (func.definition.length === 2) {
                    return Chalkboard.vect.cross(Chalkboard.calc.tangent(func, val), Chalkboard.calc.normal(func, val));
                } else {
                    return Chalkboard.vect.cross(Chalkboard.calc.tangent(func, val), Chalkboard.calc.normal(func, val));
                }
            } else {
                throw new TypeError('Parameter "func" must be of type "ChalkboardFunction" with a "type" property of "curv".');
            }
        };

        /**
         * Calculates the convolution of two explicit functions at a value.
         * @param {ChalkboardFunction} func1 - The first function
         * @param {ChalkboardFunction} func2 - The second function
         * @param {number} val - The value
         * @returns {number}
         */
        export const convolution = (func1: ChalkboardFunction, func2: ChalkboardFunction, val: number): number => {
            return Chalkboard.calc.fxdx(Chalkboard.real.define("(" + func1.definition + ") * (" + (func2.definition as string).replace(/x/g, "(" + val + " - x)") + ")"), -100, 100) as number;
        };

        /**
         * Calculates the cross-correlation of two explicit functions at a value.
         * @param {ChalkboardFunction} func1 - The first function
         * @param {ChalkboardFunction} func2 - The second function
         * @param {number} val - The value
         * @returns {number}
         */
        export const correlation = (func1: ChalkboardFunction, func2: ChalkboardFunction, val: number): number => {
            return Chalkboard.calc.fxdx(Chalkboard.real.define("(" + func1.definition + ") * (" + (func2.definition as string).replace(/x/g, "(" + val + " + x)") + ")"), -100, 100) as number;
        };

        /**
         * Calculates the curl of a 2D or 3D vector field at a vector.
         * @param {ChalkboardVectorField} vectfield - The vector field
         * @param {ChalkboardVector} vect - The vector
         * @returns {ChalkboardVector}
         */
        export const curl = (vectfield: ChalkboardVectorField, vect: ChalkboardVector): ChalkboardVector => {
            vect = vect as { x: number, y: number, z?: number, w?: number };
            const h = 0.000000001;
            if (Chalkboard.vect.dimension(vectfield) === 2 && typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "undefined" && typeof vect.w === "undefined") {
                const p = Chalkboard.real.parse("(x, y) => " + vectfield.p),
                    q = Chalkboard.real.parse("(x, y) => " + vectfield.q);
                const dpdy = (p(vect.x, vect.y + h) - p(vect.x, vect.y)) / h,
                    dqdx = (q(vect.x + h, vect.y) - q(vect.x, vect.y)) / h;
                return Chalkboard.vect.init(0, 0, dqdx - dpdy);
            } else if (Chalkboard.vect.dimension(vectfield) === 3 && typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "undefined") {
                const p = Chalkboard.real.parse("(x, y, z) => " + vectfield.p),
                    q = Chalkboard.real.parse("(x, y, z) => " + vectfield.q),
                    r = Chalkboard.real.parse("(x, y, z) => " + vectfield.r);
                const dpdy = (p(vect.x, vect.y + h, vect.z) - p(vect.x, vect.y, vect.z)) / h,
                    dpdz = (p(vect.x, vect.y, vect.z + h) - p(vect.x, vect.y, vect.z)) / h,
                    dqdx = (q(vect.x + h, vect.y, vect.z) - q(vect.x, vect.y, vect.z)) / h,
                    dqdz = (q(vect.x, vect.y, vect.z + h) - q(vect.x, vect.y, vect.z)) / h,
                    drdx = (r(vect.x + h, vect.y, vect.z) - r(vect.x, vect.y, vect.z)) / h,
                    drdy = (r(vect.x, vect.y + h, vect.z) - r(vect.x, vect.y, vect.z)) / h;
                return Chalkboard.vect.init(drdy - dqdz, dpdz - drdx, dqdx - dpdy);
            } else {
                throw new TypeError('Parameter "vectfield" must be of type "ChalkboardVectorField" with 2 or 3 dimensions.');
            }
        };

        /**
         * Calculates the curvature of a parametric curve function at a value.
         * @param {ChalkboardFunction} func - The function
         * @param {number} val - The value
         * @returns {number}
         */
        export const curvature = (func: ChalkboardFunction, val: number): number => {
            if (func.type === "curv") {
                if (func.definition.length === 2) {
                    const d = Chalkboard.calc.dfdx(func, val) as ChalkboardVector as { x: number, y: number, z?: number, w?: number },
                        d2 = Chalkboard.calc.d2fdx2(func, val) as ChalkboardVector as { x: number, y: number, z?: number, w?: number };
                    const dxdt = d.x,
                        dydt = d.y,
                        d2xdt2 = d2.x,
                        d2ydt2 = d2.y;
                    return Math.abs(dxdt * d2ydt2 - dydt * d2xdt2) / Math.sqrt((dxdt * dxdt + dydt * dydt) * (dxdt * dxdt + dydt * dydt) * (dxdt * dxdt + dydt * dydt));
                } else {
                    return Chalkboard.vect.mag(Chalkboard.calc.normal(func, val)) / Chalkboard.vect.mag(Chalkboard.calc.dfdx(func, val) as ChalkboardVector);
                }
            } else {
                throw new TypeError('Parameter "func" must be of type "ChalkboardFunction" with a "type" property of "curv".');
            }
        };

        /**
         * Calculates the directional derivative of a multivariable function at a vector in a direction.
         * @param {ChalkboardFunction} func - The function
         * @param {ChalkboardVector} vectpos - The position vector
         * @param {ChalkboardVector} vectdir - The direction vector
         * @returns {number}
         */
        export const dfdv = (func: ChalkboardFunction, vectpos: ChalkboardVector, vectdir: ChalkboardVector): number => {
            if (func.type === "mult") {
                return Chalkboard.vect.dot(Chalkboard.calc.grad(func, vectpos) as ChalkboardVector, Chalkboard.vect.normalize(vectdir));
            } else {
                throw new TypeError('Parameter "func" must be of type "ChalkboardFunction" with a "type" property of "mult".');
            }
        };

        /**
         * Calculates the first-order derivative of an explicit, inverse, polar, or parametric curve function at a value.
         * @param {ChalkboardFunction} func - The function
         * @param {number} val - The value
         * @returns {number | ChalkboardVector}
         */
        export const dfdx = (func: ChalkboardFunction, val: number): number | ChalkboardVector => {
            const h = 0.000000001;
            if (func.type === "expl") {
                const f = Chalkboard.real.parse("x => " + func.definition);
                return (f(val + h) - f(val)) / h;
            } else if (func.type === "inve") {
                const f = Chalkboard.real.parse("y => " + func.definition);
                return (f(val + h) - f(val)) / h;
            } else if (func.type === "pola") {
                const r = Chalkboard.real.parse("O => " + func.definition);
                return (r(val + h) - r(val)) / h;
            } else if (func.type === "curv") {
                if (func.definition.length === 2) {
                    const x = Chalkboard.real.parse("t => " + func.definition[0]),
                        y = Chalkboard.real.parse("t => " + func.definition[1]);
                    return Chalkboard.vect.init((x(val + h) - x(val)) / h, (y(val + h) - y(val)) / h);
                } else {
                    const x = Chalkboard.real.parse("t => " + func.definition[0]),
                        y = Chalkboard.real.parse("t => " + func.definition[1]),
                        z = Chalkboard.real.parse("t => " + func.definition[2]);
                    return Chalkboard.vect.init((x(val + h) - x(val)) / h, (y(val + h) - y(val)) / h, (z(val + h) - z(val)) / h);
                }
            } else {
                throw new TypeError('Parameter "func" must be of type "ChalkboardFunction" with a "type" property of "expl", "inve", "pola", or "curv".');
            }
        };

        /**
         * Calculates the second-order derivative of an explicit, inverse, polar, or parametric curve function at a value.
         * @param {ChalkboardFunction} func - The function
         * @param {number} val - The value
         * @returns {number | ChalkboardVector}
         */
        export const d2fdx2 = (func: ChalkboardFunction, val: number): number | ChalkboardVector => {
            const h = 0.00001;
            if (func.type === "expl") {
                const f = Chalkboard.real.parse("x => " + func.definition);
                return (f(val + h) - 2 * f(val) + f(val - h)) / (h * h);
            } else if (func.type === "inve") {
                const f = Chalkboard.real.parse("y => " + func.definition);
                return (f(val + h) - 2 * f(val) + f(val - h)) / (h * h);
            } else if (func.type === "pola") {
                const r = Chalkboard.real.parse("O => " + func.definition);
                return (r(val + h) - 2 * r(val) + r(val - h)) / (h * h);
            } else if (func.type === "curv") {
                if (func.definition.length === 2) {
                    const x = Chalkboard.real.parse("t => " + func.definition[0]),
                        y = Chalkboard.real.parse("t => " + func.definition[1]);
                    return Chalkboard.vect.init((x(val + h) - 2 * x(val) + x(val - h)) / (h * h), (y(val + h) - 2 * y(val) + y(val - h)) / (h * h));
                } else {
                    const x = Chalkboard.real.parse("t => " + func.definition[0]),
                        y = Chalkboard.real.parse("t => " + func.definition[1]),
                        z = Chalkboard.real.parse("t => " + func.definition[2]);
                    return Chalkboard.vect.init((x(val + h) - 2 * x(val) + x(val - h)) / (h * h), (y(val + h) - 2 * y(val) + y(val - h)) / (h * h), (z(val + h) - 2 * z(val) + z(val - h)) / (h * h));
                }
            } else {
                throw new TypeError('Parameter "func" must be of type "ChalkboardFunction" with a "type" property of "expl", "inve", "pola", or "curv".');
            }
        };

        /**
         * Calculates the first-order complex derivative of a complex function at a complex number.
         * @param {ChalkboardFunction} func - The function
         * @param {ChalkboardComplex} comp - The complex number
         * @returns {ChalkboardComplex[]}
         */
        export const dfdz = (func: ChalkboardFunction, comp: ChalkboardComplex): [ChalkboardComplex, ChalkboardComplex] => {
            const h = 0.000000001;
            if (func.type === "comp") {
                const u = Chalkboard.comp.parse("(a, b) => " + func.definition[0]),
                    v = Chalkboard.comp.parse("(a, b) => " + func.definition[1]);
                const duda = (u(comp.a + h, comp.b) - u(comp.a, comp.b)) / h,
                    dudb = (u(comp.a, comp.b + h) - u(comp.a, comp.b)) / h,
                    dvda = (v(comp.a + h, comp.b) - v(comp.a, comp.b)) / h,
                    dvdb = (v(comp.a, comp.b + h) - v(comp.a, comp.b)) / h;
                return [Chalkboard.comp.init(duda, dvda), Chalkboard.comp.init(dudb, dvdb)];
            } else {
                throw new TypeError('Parameter "func" must be of type "ChalkboardFunction" with a "type" property of "comp".');
            }
        };

        /**
         * Calculates the second-order complex derivative of a complex function at a complex number.
         * @param {ChalkboardFunction} func - The function
         * @param {ChalkboardComplex} comp - The complex number
         * @returns {ChalkboardComplex[]}
         */
        export const d2fdz2 = (func: ChalkboardFunction, comp: ChalkboardComplex): [ChalkboardComplex, ChalkboardComplex] => {
            const h = 0.00001;
            if (func.type === "comp") {
                const u = Chalkboard.comp.parse("(a, b) => " + func.definition[0]),
                    v = Chalkboard.comp.parse("(a, b) => " + func.definition[1]);
                const d2uda2 = (u(comp.a + h, comp.b) - 2 * u(comp.a, comp.b) + u(comp.a - h, comp.b)) / (h * h),
                    d2udb2 = (u(comp.a, comp.b + h) - 2 * u(comp.a, comp.b) + u(comp.a, comp.b - h)) / (h * h),
                    d2vda2 = (v(comp.a + h, comp.b) - 2 * v(comp.a, comp.b) + v(comp.a - h, comp.b)) / (h * h),
                    d2vdb2 = (v(comp.a, comp.b + h) - 2 * v(comp.a, comp.b) + v(comp.a, comp.b - h)) / (h * h);
                return [Chalkboard.comp.init(d2uda2, d2vda2), Chalkboard.comp.init(d2udb2, d2vdb2)];
            } else {
                throw new TypeError('Parameter "func" must be of type "ChalkboardFunction" with a "type" property of "comp".');
            }
        };

        /**
         * Calculates the first-order multivariable chained derivative of a multivariable function composed with a parametric curve function at a value.
         * @param {ChalkboardFunction} func1 - The multivariable function
         * @param {ChalkboardFunction} func2 - The parametric curve function
         * @param {number} val - The value
         * @returns {number}
         */
        export const dfrdt = (func1: ChalkboardFunction, func2: ChalkboardFunction, val: number): number => {
            if (func1.type === "mult") {
                if (func2.type === "curv") {
                    if (func2.definition.length === 2) {
                        const g = Chalkboard.calc.grad(func1, Chalkboard.real.val(func2, val) as ChalkboardVector) as ChalkboardVector as { x: number, y: number, z?: number, w?: number },
                            d = Chalkboard.calc.dfdx(func2, val) as ChalkboardVector as { x: number, y: number, z?: number, w?: number };
                        const dfdx = g.x,
                            dfdy = g.y,
                            dxdt = d.x,
                            dydt = d.y;
                        return dfdx * dxdt + dfdy * dydt;
                    } else {
                        const g = Chalkboard.calc.grad(func1, Chalkboard.real.val(func2, val) as ChalkboardVector) as ChalkboardVector as { x: number, y: number, z?: number, w?: number },
                            d = Chalkboard.calc.dfdx(func2, val) as ChalkboardVector as { x: number, y: number, z?: number, w?: number };
                        const dfdx = g.x,
                            dfdy = g.y,
                            dfdz = g.z,
                            dxdt = d.x,
                            dydt = d.y,
                            dzdt = d.z;
                        return dfdx * dxdt + dfdy * dydt + dfdz! * dzdt!;
                    }
                } else {
                    throw new TypeError('Parameter "func2" must be of type "ChalkboardFunction" with a "type" property of "curv".');
                }
            } else {
                throw new TypeError('Parameter "func1" must be of type "ChalkboardFunction" with a "type" property of "mult".');
            }
        };

        /**
         * Calculates the divergence of a vector field at a vector.
         * @param {ChalkboardVectorField} vectfield - The vector field
         * @param {ChalkboardVector} vect - The vector
         * @returns {number}
         */
        export const div = (vectfield: ChalkboardVectorField, vect: ChalkboardVector): number => {
            if (Chalkboard.vect.dimension(vectfield) === 2 || Chalkboard.vect.dimension(vectfield) === 3 || Chalkboard.vect.dimension(vectfield) === 4) {
                return Chalkboard.matr.trace(Chalkboard.calc.grad(vectfield, vect) as ChalkboardMatrix);
            } else {
                throw new TypeError('Parameter "vectfield" must be of type "ChalkboardVectorField" with 2, 3, or 4 dimensions.');
            }
        };

        /**
         * Calculates the extrema of an explicit function within an interval of its domain.
         * @param {ChalkboardFunction} func - The function
         * @param {number[]} domain - The interval
         * @returns {number[]}
         */
        export const extrema = (func: ChalkboardFunction, domain: [number, number]): number[] => {
            const result = [];
            for (let i = domain[0]; i <= domain[1]; i++) {
                if (Math.round(Chalkboard.calc.dfdx(func, i) as number) === 0) {
                    result.push(i);
                }
            }
            return result;
        };

        /**
         * Calculates the curve length or surface area of a parametric curve function or a parametric surface function, respectively.
         * @param {ChalkboardFunction} func - The function
         * @param {number} tinf - The lower t-bound (for both curve length and surface area)
         * @param {number} tsup - The upper t-bound (for both curve length and surface area)
         * @param {number} [sinf] - The lower s-bound (only for surface area)
         * @param {number} [ssup] - The upper s-bound (only for surface area)
         * @returns {number}
         */
        export const fds = (func: ChalkboardFunction, tinf: number, tsup: number, sinf?: number, ssup?: number): number => {
            let result = 0;
            let drdt, drds;
            if (func.type === "curv") {
                const dt = (tsup - tinf) / 10000;
                if (func.definition.length === 2) {
                    for (let t = tinf; t <= tsup; t += dt) {
                        drdt = Chalkboard.calc.dfdx(func, t);
                        result += Chalkboard.vect.mag(drdt as ChalkboardVector);
                    }
                    return result * dt;
                } else {
                    for (let t = tinf; t <= tsup; t += dt) {
                        drdt = Chalkboard.calc.dfdx(func, t);
                        result += Chalkboard.vect.mag(drdt as ChalkboardVector);
                    }
                    return result * dt;
                }
            } else if (func.type === "surf") {
                const dt = (tsup - tinf) / 100,
                    ds = (ssup! - sinf!) / 100;
                for (let s = sinf; s! <= ssup!; s! += ds) {
                    for (let t = tinf; t <= tsup; t += dt) {
                        drds = Chalkboard.matr.toVector(Chalkboard.calc.grad(func, Chalkboard.vect.init(s!, t)) as ChalkboardMatrix, 3, 0, 0);
                        drdt = Chalkboard.matr.toVector(Chalkboard.calc.grad(func, Chalkboard.vect.init(s!, t)) as ChalkboardMatrix, 3, 1, 0);
                        result += Chalkboard.vect.mag(Chalkboard.vect.cross(drds, drdt));
                    }
                }
                return result * ds * dt;
            } else {
                throw new TypeError('Parameter "func" must be of type "ChalkboardFunction" with a "type" property of "curv" or "surf".');
            }
        };

        /**
         * Calculates the flux (line/surface integration over a vector field) of a parametric curve function or a parametric surface function through a 2D or 3D vector field, respectively.
         * @param {ChalkboardVectorField} vectfield - The vector field
         * @param {ChalkboardFunction} func - The function
         * @param {number} tinf - The lower t-bound (for both 2D and 3D)
         * @param {number} tsup - The upper t-bound (for both 2D and 3D)
         * @param {number} [sinf] - The lower s-bound (only for 3D)
         * @param {number} [ssup] - The upper s-bound (only for 3D)
         * @returns {number}
         */
        export const fnds = (vectfield: ChalkboardVectorField, func: ChalkboardFunction, tinf: number, tsup: number, sinf?: number, ssup?: number): number => {
            let result = 0;
            let drdt, drds;
            if (func.type === "curv") {
                const dt = (tsup - tinf) / 10000;
                if (func.definition.length === 2) {
                    for (let t = tinf; t <= tsup; t += dt) {
                        drdt = Chalkboard.calc.dfdx(func, t) as ChalkboardVector as { x: number, y: number, z?: number, w?: number };
                        result +=
                            Chalkboard.vect.dot(Chalkboard.vect.fromField(vectfield, Chalkboard.real.val(func, t) as ChalkboardVector), Chalkboard.vect.init(-drdt.y, drdt.x)) *
                            Chalkboard.vect.mag(drdt);
                    }
                    return result * dt;
                } else {
                    for (let t = tinf; t <= tsup; t += dt) {
                        drdt = Chalkboard.calc.dfdx(func, t) as ChalkboardVector;
                        result +=
                            Chalkboard.vect.dot(Chalkboard.vect.fromField(vectfield, Chalkboard.real.val(func, t) as ChalkboardVector), Chalkboard.calc.normal(func, t)) * Chalkboard.vect.mag(drdt);
                    }
                    return result * dt;
                }
            } else if (func.type === "surf") {
                const dt = (tsup - tinf) / 100,
                    ds = (ssup! - sinf!) / 100;
                for (let s = sinf; s! <= ssup!; s! += ds) {
                    for (let t = tinf; t <= tsup; t += dt) {
                        drds = Chalkboard.matr.toVector(Chalkboard.calc.grad(func, Chalkboard.vect.init(s!, t)) as ChalkboardMatrix, 3, 0, 0);
                        drdt = Chalkboard.matr.toVector(Chalkboard.calc.grad(func, Chalkboard.vect.init(s!, t)) as ChalkboardMatrix, 3, 1, 0);
                        result += Chalkboard.vect.scalarTriple(Chalkboard.vect.fromField(vectfield, Chalkboard.real.val(func, Chalkboard.vect.init(s!, t)) as ChalkboardVector), drds, drdt);
                    }
                }
                return result * ds * dt;
            } else {
                throw new TypeError('Parameter "func" must be of type "ChalkboardFunction" with a "type" property of "curv" or "surf".');
            }
        };

        /**
         * Calculates the Fourier transform of an explicit function at a value.
         * @param {ChalkboardFunction} func - The function
         * @param {number} val - The value
         * @returns {number}
         */
        export const Fourier = (func: ChalkboardFunction, val: number): number => {
            return (2 * (Chalkboard.calc.fxdx(Chalkboard.real.define("(" + func.definition + ") * Math.cos(" + val + " * x)"), 0, 10) as number)) / Chalkboard.PI();
        };

        /**
         * Calculates the circulation (line integration over a scalar/vector field) of a parametric curve through a multivariable function or a vector field.
         * @param {ChalkboardFunction | ChalkboardVectorField} funcORvectfield - The multivariable function or vector field
         * @param {ChalkboardFunction} func - The parametric curve function
         * @param {number} inf - The lower bound
         * @param {number} sup - The upper bound
         * @returns {number}
         */
        export const frds = (funcORvectfield: ChalkboardFunction | ChalkboardVectorField, func: ChalkboardFunction, inf: number, sup: number): number => {
            const funct = funcORvectfield as ChalkboardFunction;
            const vectfield = funcORvectfield as ChalkboardVectorField;
            if (func.type === "curv") {
                let result = 0;
                const dt = (sup - inf) / 10000;
                if (funct.type === "mult") {
                    for (let t = inf; t <= sup; t += dt) {
                        result += (Chalkboard.real.val(funct, Chalkboard.real.val(func, t)) as number) * Chalkboard.vect.mag(Chalkboard.calc.dfdx(func, t) as ChalkboardVector);
                    }
                    return result * dt;
                } else if (Chalkboard.vect.dimension(vectfield) === 2) {
                    for (let t = inf; t <= sup; t += dt) {
                        result += Chalkboard.vect.dot(Chalkboard.vect.fromField(vectfield, Chalkboard.real.val(func, t) as ChalkboardVector), Chalkboard.calc.dfdx(func, t) as ChalkboardVector);
                    }
                    return result * dt;
                } else if (Chalkboard.vect.dimension(vectfield) === 3) {
                    for (let t = inf; t <= sup; t += dt) {
                        result += Chalkboard.vect.dot(Chalkboard.vect.fromField(vectfield, Chalkboard.real.val(func, t) as ChalkboardVector), Chalkboard.calc.dfdx(func, t) as ChalkboardVector);
                    }
                    return result * dt;
                } else {
                    throw new TypeError('Parameter "func" must be of type "ChalkboardFunction" with a "type" property of "mult" or it must be of type "ChalkboardVectorField".');
                }
            } else {
                throw new TypeError('Parameter "func" must be of type "ChalkboardFunction" with a "type" property of "curv".');
            }
        };

        /**
         * Calculates the antiderivative (or integral) of an explicit, inverse, polar, or parametric curve function.
         * @param {ChalkboardFunction} func - The function
         * @param {number} inf - The lower bound
         * @param {number} sup - The upper bound
         * @returns {number | ChalkboardVector}
         */
        export const fxdx = (func: ChalkboardFunction, inf: number, sup: number): number | ChalkboardVector => {
            if (func.type === "expl" || func.type === "inve" || func.type === "pola") {
                let f;
                if (func.type === "expl") {
                    f = Chalkboard.real.parse("x => " + func.definition);
                } else if (func.type === "inve") {
                    f = Chalkboard.real.parse("y => " + func.definition);
                } else if (func.type === "pola") {
                    f = Chalkboard.real.parse("O => " + "((" + func.definition + ") * (" + func.definition + ")) / 2");
                }
                let fx = f!(inf) + f!(sup);
                const dx = (sup - inf) / 1000000;
                for (let i = 1; i < 1000000; i++) {
                    fx += i % 2 === 0 ? 2 * f!(inf + i * dx) : 4 * f!(inf + i * dx);
                }
                return (fx * dx) / 3;
            } else if (func.type === "curv") {
                if (func.definition.length === 2) {
                    const x = Chalkboard.real.parse("t => " + func.definition[0]),
                        y = Chalkboard.real.parse("t => " + func.definition[1]);
                    let xt = x(inf) + x(sup),
                        yt = y(inf) + y(sup);
                    const dt = (sup - inf) / 1000000;
                    for (let i = 1; i < 1000000; i++) {
                        xt += i % 2 === 0 ? 2 * x(inf + i * dt) : 4 * x(inf + i * dt);
                        yt += i % 2 === 0 ? 2 * y(sup + i * dt) : 4 * y(sup + i * dt);
                    }
                    return Chalkboard.vect.init((xt * dt) / 3, (yt * dt) / 3);
                } else {
                    const x = Chalkboard.real.parse("t => " + func.definition[0]),
                        y = Chalkboard.real.parse("t => " + func.definition[1]),
                        z = Chalkboard.real.parse("t => " + func.definition[2]);
                    let xt = x(inf) + x(sup),
                        yt = y(inf) + y(sup),
                        zt = z(inf) + z(sup);
                    const dt = (sup - inf) / 1000000;
                    for (let i = 1; i < 1000000; i++) {
                        xt += i % 2 === 0 ? 2 * x(inf + i * dt) : 4 * x(inf + i * dt);
                        yt += i % 2 === 0 ? 2 * y(inf + i * dt) : 4 * y(inf + i * dt);
                        zt += i % 2 === 0 ? 2 * z(inf + i * dt) : 4 * z(inf + i * dt);
                    }
                    return Chalkboard.vect.init((xt * dt) / 3, (yt * dt) / 3, (zt * dt) / 3);
                }
            } else {
                throw new TypeError('Parameter "func" must be of type "ChalkboardFunction" with a "type" property of "expl", "inve", "pola", or "curv".');
            }
        };

        /**
         * Calculates the double integration of a multivariable function.
         * @param {ChalkboardFunction} func - The function
         * @param {number} xinf - The lower x-bound
         * @param {number} xsup - The upper x-bound
         * @param {number} yinf - The lower y-bound
         * @param {number} ysup - The upper y-bound
         * @returns {number}
         */
        export const fxydxdy = (func: ChalkboardFunction, xinf: number, xsup: number, yinf: number, ysup: number): number => {
            if (func.type === "mult") {
                const f = Chalkboard.real.parse("(x, y) => " + func.definition);
                let result = 0;
                const dx = (xsup - xinf) / 10000,
                    dy = (ysup - yinf) / 10000;
                for (let x = xinf; x <= xsup; x += dx) {
                    for (let y = yinf; y <= ysup; y += dy) {
                        result += f(x, y);
                    }
                }
                return result * dx * dy;
            } else {
                throw new TypeError('Parameter "func" must be of type "ChalkboardFunction" with a "type" property of "mult".');
            }
        };

        /**
         * Calculates the complex integration of a complex function composed with a parametric curve function.
         * @param {ChalkboardFunction} func1 - The complex function
         * @param {ChalkboardFunction} func2 - The parametric curve function
         * @param {number} inf - The lower bound
         * @param {number} sup - The upper bound
         * @returns
         */
        export const fzdz = (func1: ChalkboardFunction, func2: ChalkboardFunction, inf: number, sup: number): ChalkboardComplex => {
            if (func1.type === "comp") {
                if (func2.type === "curv") {
                    let result = Chalkboard.comp.init(0, 0);
                    const dt = (sup - inf) / 10000;
                    for (let t = inf; t <= sup; t += dt) {
                        const fz = Chalkboard.comp.val(func1, Chalkboard.vect.toComplex(Chalkboard.real.val(func2, t) as ChalkboardVector));
                        const rt = Chalkboard.calc.dfdx(func2, t) as ChalkboardVector as { x: number, y: number, z?: number, w?: number };
                        result = Chalkboard.comp.add(result, Chalkboard.comp.init(fz.a * rt.x - fz.b * rt.y, fz.b * rt.x + fz.a * rt.y));
                    }
                    return Chalkboard.comp.scl(result, dt);
                } else {
                    throw new TypeError('Parameter "func2" must be of type "ChalkboardFunction" with a "type" property of "curv".');
                }
            } else {
                throw new TypeError('Parameter "func1" must be of type "ChalkboardFunction" with a "type" property of "comp".');
            }
        };

        /**
         * Calculates the first-order gradient of a multivariable function, a parametric surface function, or a vector field at a vector.
         * @param {ChalkboardFunction | ChalkboardVectorField} funcORvectfield - The function or vector field
         * @param {ChalkboardVector} vect - The vector
         * @returns {ChalkboardVector | ChalkboardMatrix}
         */
        export const grad = (funcORvectfield: ChalkboardFunction | ChalkboardVectorField, vect: ChalkboardVector): ChalkboardVector | ChalkboardMatrix => {
            vect = vect as { x: number, y: number, z?: number, w?: number };
            const h = 0.000000001;
            const func = funcORvectfield as ChalkboardFunction;
            const vectfield = funcORvectfield as ChalkboardVectorField;
            if (func.type === "surf" && typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "undefined" && typeof vect.w === "undefined") {
                const x = Chalkboard.real.parse("(s, t) => " + func.definition[0]),
                    y = Chalkboard.real.parse("(s, t) => " + func.definition[1]),
                    z = Chalkboard.real.parse("(s, t) => " + func.definition[2]);
                const dxds = (x(vect.x + h, vect.y) - x(vect.x, vect.y)) / h,
                    dxdt = (x(vect.x, vect.y + h) - x(vect.x, vect.y)) / h,
                    dyds = (y(vect.x + h, vect.y) - y(vect.x, vect.y)) / h,
                    dydt = (y(vect.x, vect.y + h) - y(vect.x, vect.y)) / h,
                    dzds = (z(vect.x + h, vect.y) - z(vect.x, vect.y)) / h,
                    dzdt = (z(vect.x, vect.y + h) - z(vect.x, vect.y)) / h;
                return Chalkboard.matr.init([dxds, dxdt], [dyds, dydt], [dzds, dzdt]);
            } else if (func.type === "mult" && typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "undefined" && typeof vect.w === "undefined") {
                const f = Chalkboard.real.parse("(x, y) => " + func.definition);
                const dfdx = (f(vect.x + h, vect.y) - f(vect.x, vect.y)) / h,
                    dfdy = (f(vect.x, vect.y + h) - f(vect.x, vect.y)) / h;
                return Chalkboard.vect.init(dfdx, dfdy);
            } else if (Chalkboard.vect.dimension(vectfield) === 2 && typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "undefined" && typeof vect.w === "undefined") {
                const p = Chalkboard.real.parse("(x, y) => " + vectfield.p),
                    q = Chalkboard.real.parse("(x, y) => " + vectfield.q);
                const dpdx = (p(vect.x + h, vect.y) - p(vect.x, vect.y)) / h,
                    dpdy = (p(vect.x, vect.y + h) - p(vect.x, vect.y)) / h,
                    dqdx = (q(vect.x + h, vect.y) - q(vect.x, vect.y)) / h,
                    dqdy = (q(vect.x, vect.y + h) - q(vect.x, vect.y)) / h;
                return Chalkboard.matr.init([dpdx, dpdy], [dqdx, dqdy]);
            } else if (Chalkboard.vect.dimension(vectfield) === 3 && typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "undefined") {
                const p = Chalkboard.real.parse("(x, y, z) => " + vectfield.p),
                    q = Chalkboard.real.parse("(x, y, z) => " + vectfield.q),
                    r = Chalkboard.real.parse("(x, y, z) => " + vectfield.r);
                const dpdx = (p(vect.x + h, vect.y, vect.z) - p(vect.x, vect.y, vect.z)) / h,
                    dpdy = (p(vect.x, vect.y + h, vect.z) - p(vect.x, vect.y, vect.z)) / h,
                    dpdz = (p(vect.x, vect.y, vect.z + h) - p(vect.x, vect.y, vect.z)) / h,
                    dqdx = (q(vect.x + h, vect.y, vect.z) - q(vect.x, vect.y, vect.z)) / h,
                    dqdy = (q(vect.x, vect.y + h, vect.z) - q(vect.x, vect.y, vect.z)) / h,
                    dqdz = (q(vect.x, vect.y, vect.z + h) - q(vect.x, vect.y, vect.z)) / h,
                    drdx = (r(vect.x + h, vect.y, vect.z) - r(vect.x, vect.y, vect.z)) / h,
                    drdy = (r(vect.x, vect.y + h, vect.z) - r(vect.x, vect.y, vect.z)) / h,
                    drdz = (r(vect.x, vect.y, vect.z + h) - r(vect.x, vect.y, vect.z)) / h;
                return Chalkboard.matr.init([dpdx, dpdy, dpdz], [dqdx, dqdy, dqdz], [drdx, drdy, drdz]);
            } else if (Chalkboard.vect.dimension(vectfield) === 4 && typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "number") {
                const p = Chalkboard.real.parse("(x, y, z, w) => " + vectfield.p),
                    q = Chalkboard.real.parse("(x, y, z, w) => " + vectfield.q),
                    r = Chalkboard.real.parse("(x, y, z, w) => " + vectfield.r),
                    s = Chalkboard.real.parse("(x, y, z, w) => " + vectfield.s);
                const dpdx = (p(vect.x + h, vect.y, vect.z, vect.w) - p(vect.x, vect.y, vect.z, vect.w)) / h,
                    dpdy = (p(vect.x, vect.y + h, vect.z, vect.w) - p(vect.x, vect.y, vect.z, vect.w)) / h,
                    dpdz = (p(vect.x, vect.y, vect.z + h, vect.w) - p(vect.x, vect.y, vect.z, vect.w)) / h,
                    dpdw = (p(vect.x, vect.y, vect.z, vect.w + h) - p(vect.x, vect.y, vect.z, vect.w)) / h,
                    dqdx = (q(vect.x + h, vect.y, vect.z, vect.w) - q(vect.x, vect.y, vect.z, vect.w)) / h,
                    dqdy = (q(vect.x, vect.y + h, vect.z, vect.w) - q(vect.x, vect.y, vect.z, vect.w)) / h,
                    dqdz = (q(vect.x, vect.y, vect.z + h, vect.w) - q(vect.x, vect.y, vect.z, vect.w)) / h,
                    dqdw = (q(vect.x, vect.y, vect.z, vect.w + h) - q(vect.x, vect.y, vect.z, vect.w)) / h,
                    drdx = (r(vect.x + h, vect.y, vect.z, vect.w) - r(vect.x, vect.y, vect.z, vect.w)) / h,
                    drdy = (r(vect.x, vect.y + h, vect.z, vect.w) - r(vect.x, vect.y, vect.z, vect.w)) / h,
                    drdz = (r(vect.x, vect.y, vect.z + h, vect.w) - r(vect.x, vect.y, vect.z, vect.w)) / h,
                    drdw = (r(vect.x, vect.y, vect.z, vect.w + h) - r(vect.x, vect.y, vect.z, vect.w)) / h,
                    dsdx = (s(vect.x + h, vect.y, vect.z, vect.w) - s(vect.x, vect.y, vect.z, vect.w)) / h,
                    dsdy = (s(vect.x, vect.y + h, vect.z, vect.w) - s(vect.x, vect.y, vect.z, vect.w)) / h,
                    dsdz = (s(vect.x, vect.y, vect.z + h, vect.w) - s(vect.x, vect.y, vect.z, vect.w)) / h,
                    dsdw = (s(vect.x, vect.y, vect.z, vect.w + h) - s(vect.x, vect.y, vect.z, vect.w)) / h;
                return Chalkboard.matr.init([dpdx, dpdy, dpdz, dpdw], [dqdx, dqdy, dqdz, dqdw], [drdx, drdy, drdz, drdw], [dsdx, dsdy, dsdz, dsdw]);
            } else {
                throw new TypeError('Parameter "funcORvectfield" must be of type "ChalkboardFunction" with a "type" property of "surf" or "mult" or of type "ChalkboardVectorField".');
            }
        };

        /**
         * Calculates the second-order gradient of a multivariable function, a parametric surface function, or a vector field at a vector.
         * @param {ChalkboardFunction | ChalkboardVectorField} funcORvectfield - The function or vector field
         * @param {ChalkboardVector} vect - The vector
         * @returns {ChalkboardMatrix}
         */
        export const grad2 = (funcORvectfield: ChalkboardFunction | ChalkboardVectorField, vect: ChalkboardVector): ChalkboardMatrix => {
            vect = vect as { x: number, y: number, z?: number, w?: number };
            const h = 0.00001;
            const func = funcORvectfield as ChalkboardFunction;
            const vectfield = funcORvectfield as ChalkboardVectorField;
            if (func.type === "surf" && typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "undefined" && typeof vect.w === "undefined") {
                const x = Chalkboard.real.parse("(s, t) => " + func.definition[0]),
                    y = Chalkboard.real.parse("(s, t) => " + func.definition[1]),
                    z = Chalkboard.real.parse("(s, t) => " + func.definition[2]);
                const d2xds2 = (x(vect.x + h, vect.y) - 2 * x(vect.x, vect.y) + x(vect.x - h, vect.y)) / (h * h),
                    d2xdt2 = (x(vect.x, vect.y + h) - 2 * x(vect.x, vect.y) + x(vect.x, vect.y - h)) / (h * h),
                    d2yds2 = (y(vect.x + h, vect.y) - 2 * y(vect.x, vect.y) + y(vect.x - h, vect.y)) / (h * h),
                    d2ydt2 = (y(vect.x, vect.y + h) - 2 * y(vect.x, vect.y) + y(vect.x, vect.y - h)) / (h * h),
                    d2zds2 = (z(vect.x + h, vect.y) - 2 * z(vect.x, vect.y) + z(vect.x - h, vect.y)) / (h * h),
                    d2zdt2 = (z(vect.x, vect.y + h) - 2 * z(vect.x, vect.y) + z(vect.x, vect.y - h)) / (h * h);
                return Chalkboard.matr.init([d2xds2, d2xdt2], [d2yds2, d2ydt2], [d2zds2, d2zdt2]);
            } else if (func.type === "mult" && typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "undefined" && typeof vect.w === "undefined") {
                const f = Chalkboard.real.parse("(x, y) => " + func.definition);
                const d2fdx2 = (f(vect.x + h, vect.y) - 2 * f(vect.x, vect.y) + f(vect.x - h, vect.y)) / (h * h),
                    d2fdy2 = (f(vect.x, vect.y + h) - 2 * f(vect.x, vect.y) + f(vect.x, vect.y - h)) / (h * h),
                    d2fdxdy = (f(vect.x + h, vect.y + h) - f(vect.x + h, vect.y) - f(vect.x, vect.y + h) + f(vect.x, vect.y)) / (h * h),
                    d2fdydx = (f(vect.x + h, vect.y + h) - f(vect.x, vect.y + h) - f(vect.x + h, vect.y) + f(vect.x, vect.y)) / (h * h);
                return Chalkboard.matr.init([d2fdx2, d2fdxdy], [d2fdydx, d2fdy2]);
            } else if (Chalkboard.vect.dimension(vectfield) === 2 && typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "undefined" && typeof vect.w === "undefined") {
                const p = Chalkboard.real.parse("(x, y) => " + vectfield.p),
                    q = Chalkboard.real.parse("(x, y) => " + vectfield.q);
                const d2pdx2 = (p(vect.x + h, vect.y) - 2 * p(vect.x, vect.y) + p(vect.x - h, vect.y)) / (h * h),
                    d2pdy2 = (p(vect.x, vect.y + h) - 2 * p(vect.x, vect.y) + p(vect.x, vect.y - h)) / (h * h),
                    d2qdx2 = (q(vect.x + h, vect.y) - 2 * q(vect.x, vect.y) + q(vect.x - h, vect.y)) / (h * h),
                    d2qdy2 = (q(vect.x, vect.y + h) - 2 * q(vect.x, vect.y) + q(vect.x, vect.y - h)) / (h * h);
                return Chalkboard.matr.init([d2pdx2, d2pdy2], [d2qdx2, d2qdy2]);
            } else if (Chalkboard.vect.dimension(vectfield) === 3 && typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "undefined") {
                const p = Chalkboard.real.parse("(x, y, z) => " + vectfield.p),
                    q = Chalkboard.real.parse("(x, y, z) => " + vectfield.q),
                    r = Chalkboard.real.parse("(x, y, z) => " + vectfield.r);
                const d2pdx2 = (p(vect.x + h, vect.y, vect.z) - 2 * p(vect.x, vect.y, vect.z) + p(vect.x - h, vect.y, vect.z)) / (h * h),
                    d2pdy2 = (p(vect.x, vect.y + h, vect.z) - 2 * p(vect.x, vect.y, vect.z) + p(vect.x, vect.y - h, vect.z)) / (h * h),
                    d2pdz2 = (p(vect.x, vect.y, vect.z + h) - 2 * p(vect.x, vect.y, vect.z) + p(vect.x, vect.y, vect.z - h)) / (h * h),
                    d2qdx2 = (q(vect.x + h, vect.y, vect.z) - 2 * q(vect.x, vect.y, vect.z) + q(vect.x - h, vect.y, vect.z)) / (h * h),
                    d2qdy2 = (q(vect.x, vect.y + h, vect.z) - 2 * q(vect.x, vect.y, vect.z) + q(vect.x, vect.y - h, vect.z)) / (h * h),
                    d2qdz2 = (q(vect.x, vect.y, vect.z + h) - 2 * q(vect.x, vect.y, vect.z) + q(vect.x, vect.y, vect.z - h)) / (h * h),
                    d2rdx2 = (r(vect.x + h, vect.y, vect.z) - 2 * r(vect.x, vect.y, vect.z) + r(vect.x - h, vect.y, vect.z)) / (h * h),
                    d2rdy2 = (r(vect.x, vect.y + h, vect.z) - 2 * r(vect.x, vect.y, vect.z) + r(vect.x, vect.y - h, vect.z)) / (h * h),
                    d2rdz2 = (r(vect.x, vect.y, vect.z + h) - 2 * r(vect.x, vect.y, vect.z) + r(vect.x, vect.y, vect.z - h)) / (h * h);
                return Chalkboard.matr.init([d2pdx2, d2pdy2, d2pdz2], [d2qdx2, d2qdy2, d2qdz2], [d2rdx2, d2rdy2, d2rdz2]);
            } else if (Chalkboard.vect.dimension(vectfield) === 4 && typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "number") {
                const p = Chalkboard.real.parse("(x, y, z, w) => " + vectfield.p),
                    q = Chalkboard.real.parse("(x, y, z, w) => " + vectfield.q),
                    r = Chalkboard.real.parse("(x, y, z, w) => " + vectfield.r),
                    s = Chalkboard.real.parse("(x, y, z, w) => " + vectfield.s);
                const d2pdx2 = (p(vect.x + h, vect.y, vect.z, vect.w) - 2 * p(vect.x, vect.y, vect.z, vect.w) + p(vect.x - h, vect.y, vect.z, vect.w)) / (h * h),
                    d2pdy2 = (p(vect.x, vect.y + h, vect.z, vect.w) - 2 * p(vect.x, vect.y, vect.z, vect.w) + p(vect.x, vect.y - h, vect.z, vect.w)) / (h * h),
                    d2pdz2 = (p(vect.x, vect.y, vect.z + h, vect.w) - 2 * p(vect.x, vect.y, vect.z, vect.w) + p(vect.x, vect.y, vect.z - h, vect.w)) / (h * h),
                    d2pdw2 = (p(vect.x, vect.y, vect.z, vect.w + h) - 2 * p(vect.x, vect.y, vect.z, vect.w) + p(vect.x, vect.y, vect.z, vect.w - h)) / (h * h),
                    d2qdx2 = (q(vect.x + h, vect.y, vect.z, vect.w) - 2 * q(vect.x, vect.y, vect.z, vect.w) + q(vect.x - h, vect.y, vect.z, vect.w)) / (h * h),
                    d2qdy2 = (q(vect.x, vect.y + h, vect.z, vect.w) - 2 * q(vect.x, vect.y, vect.z, vect.w) + q(vect.x, vect.y - h, vect.z, vect.w)) / (h * h),
                    d2qdz2 = (q(vect.x, vect.y, vect.z + h, vect.w) - 2 * q(vect.x, vect.y, vect.z, vect.w) + q(vect.x, vect.y, vect.z - h, vect.w)) / (h * h),
                    d2qdw2 = (q(vect.x, vect.y, vect.z, vect.w + h) - 2 * q(vect.x, vect.y, vect.z, vect.w) + q(vect.x, vect.y, vect.z, vect.w - h)) / (h * h),
                    d2rdx2 = (r(vect.x + h, vect.y, vect.z, vect.w) - 2 * r(vect.x, vect.y, vect.z, vect.w) + r(vect.x - h, vect.y, vect.z, vect.w)) / (h * h),
                    d2rdy2 = (r(vect.x, vect.y + h, vect.z, vect.w) - 2 * r(vect.x, vect.y, vect.z, vect.w) + r(vect.x, vect.y - h, vect.z, vect.w)) / (h * h),
                    d2rdz2 = (r(vect.x, vect.y, vect.z + h, vect.w) - 2 * r(vect.x, vect.y, vect.z, vect.w) + r(vect.x, vect.y, vect.z - h, vect.w)) / (h * h),
                    d2rdw2 = (r(vect.x, vect.y, vect.z, vect.w + h) - 2 * r(vect.x, vect.y, vect.z, vect.w) + r(vect.x, vect.y, vect.z, vect.w - h)) / (h * h),
                    d2sdx2 = (s(vect.x + h, vect.y, vect.z, vect.w) - 2 * s(vect.x, vect.y, vect.z, vect.w) + s(vect.x - h, vect.y, vect.z, vect.w)) / (h * h),
                    d2sdy2 = (s(vect.x, vect.y + h, vect.z, vect.w) - 2 * s(vect.x, vect.y, vect.z, vect.w) + s(vect.x, vect.y - h, vect.z, vect.w)) / (h * h),
                    d2sdz2 = (s(vect.x, vect.y, vect.z + h, vect.w) - 2 * s(vect.x, vect.y, vect.z, vect.w) + s(vect.x, vect.y, vect.z - h, vect.w)) / (h * h),
                    d2sdw2 = (s(vect.x, vect.y, vect.z, vect.w + h) - 2 * s(vect.x, vect.y, vect.z, vect.w) + s(vect.x, vect.y, vect.z, vect.w - h)) / (h * h);
                return Chalkboard.matr.init([d2pdx2, d2pdy2, d2pdz2, d2pdw2], [d2qdx2, d2qdy2, d2qdz2, d2qdw2], [d2rdx2, d2rdy2, d2rdz2, d2rdw2], [d2sdx2, d2sdy2, d2sdz2, d2sdw2]);
            } else {
                throw new TypeError('Parameter "funcORvectfield" must be of type "ChalkboardFunction" with a "type" property of "surf" or "mult" or it must be of type "ChalkboardVectorField".');
            }
        };

        /**
         * Calculates the Laplace transform of a function at a value.
         * @param {ChalkboardFunction} func - The function
         * @param {number} val - The value
         * @returns {number}
         */
        export const Laplace = (func: ChalkboardFunction, val: number): number => {
            if (val > 0) {
                return Chalkboard.calc.fxdx(Chalkboard.real.define("(" + func.definition + ") * Math.exp(-" + val + " * x)"), 0, 10) as number;
            } else {
                throw new RangeError('Parameter "val" must be of type "number" greater than 0.');
            }
        };

        /**
         * Calculates the limit of an explicit function as it approaches a value.
         * @param {ChalkboardFunction} func - The function
         * @param {number} val - The value
         * @returns {number | undefined}
         */
        export const lim = (func: ChalkboardFunction, val: number): number | undefined => {
            if (func.type === "expl") {
                if (val === Infinity) {
                    if (Chalkboard.real.val(func, 101) > Chalkboard.real.val(func, 100)) {
                        return Infinity;
                    } else if (Chalkboard.real.val(func, 101) < Chalkboard.real.val(func, 100)) {
                        return -Infinity;
                    }
                } else if (val === -Infinity) {
                    if (Chalkboard.real.val(func, -101) > Chalkboard.real.val(func, -100)) {
                        return Infinity;
                    } else if (Chalkboard.real.val(func, -101) < Chalkboard.real.val(func, -100)) {
                        return -Infinity;
                    }
                } else {
                    if ((Chalkboard.real.val(func, val - 0.000001) as number).toFixed(4) === (Chalkboard.real.val(func, val + 0.000001) as number).toFixed(4)) {
                        if (Chalkboard.real.val(func, val) !== Infinity || Chalkboard.real.val(func, val) !== -Infinity) {
                            return Chalkboard.real.val(func, val) as number;
                        } else {
                            return undefined;
                        }
                    } else {
                        return undefined;
                    }
                }
            } else {
                throw new TypeError('Parameter "func" must be of type "ChalkboardFunction" with a "type" property of "expl".');
            }
        };

        /**
         * Calculates the mean value of an explicit function within an interval.
         * @param {ChalkboardFunction} func - The function
         * @param {number} inf - The lower bound
         * @param {number} sup - The upper bound
         * @returns {number}
         */
        export const mean = (func: ChalkboardFunction, inf: number, sup: number): number => {
            return (Chalkboard.calc.fxdx(func, inf, sup) as number) / (sup - inf);
        };

        /**
         * Calculates a root of an explicit function with Newton's method within an interval.
         * @param {ChalkboardFunction} func - The function
         * @param {number[]} [domain=[-1, 1]] - The interval
         * @returns {number}
         */
        export const Newton = (func: ChalkboardFunction, domain: [number, number] = [-1, 1]): number => {
            let x = Chalkboard.numb.random(domain[0], domain[1]);
            for (let i = 0; i < 10; i++) {
                x = x - (Chalkboard.real.val(func, x) as number) / (Chalkboard.calc.dfdx(func, x) as number);
            }
            return x;
        };

        /**
         * Calculates the unit normal vector of a parametric curve function at a value.
         * @param {ChalkboardFunction} func - The function
         * @param {number} val - The value
         * @returns {ChalkboardVector}
         */
        export const normal = (func: ChalkboardFunction, val: number): ChalkboardVector => {
            if (func.type === "curv") {
                if (func.definition.length === 2) {
                    return Chalkboard.vect.normalize(Chalkboard.calc.d2fdx2(func, val) as ChalkboardVector);
                } else {
                    return Chalkboard.vect.normalize(Chalkboard.calc.d2fdx2(func, val) as ChalkboardVector);
                }
            } else {
                throw new TypeError('Parameter "func" must be of type "ChalkboardFunction" with a "type" property of "curv".');
            }
        };

        /**
         * Calculates the unit tangent vector of a parametric curve function at a value.
         * @param {ChalkboardFunction} func - The function
         * @param {number} val - The value
         * @returns {ChalkboardVector}
         */
        export const tangent = (func: ChalkboardFunction, val: number): ChalkboardVector => {
            if (func.type === "curv") {
                if (func.definition.length === 2) {
                    return Chalkboard.vect.normalize(Chalkboard.calc.dfdx(func, val) as ChalkboardVector);
                } else {
                    return Chalkboard.vect.normalize(Chalkboard.calc.dfdx(func, val) as ChalkboardVector);
                }
            } else {
                throw new TypeError('Parameter "func" must be of type "ChalkboardFunction" with a "type" property of "curv".');
            }
        };

        /**
         * Calculates the nth-degree Taylor series approximation of an explicit function at a value centered around another value.
         * @param {ChalkboardFunction} func - The function
         * @param {number} val - The value
         * @param {number} n - The degree
         * @param {number} a - The center
         * @returns {number}
         */
        export const Taylor = (func: ChalkboardFunction, val: number, n: 0 | 1 | 2, a: number): number => {
            if (func.type === "expl") {
                if (n === 0) {
                    return Chalkboard.real.val(func, a) as number;
                } else if (n === 1) {
                    return (Chalkboard.real.val(func, a) as number) + (Chalkboard.calc.dfdx(func, a) as number) * (val - a);
                } else if (n === 2) {
                    return (Chalkboard.real.val(func, a) as number) + (Chalkboard.calc.dfdx(func, a) as number) * (val - a) + ((Chalkboard.calc.d2fdx2(func, a) as number) * (val - a) * (val - a)) / 2;
                } else {
                    throw new RangeError('Parameter "n" must be of type "number" greater than 0 and less than 3');
                }
            } else {
                throw new TypeError('Parameter "func" must be of type "ChalkboardFunction" with a "type" property of "expl".');
            }
        };
    }
}
