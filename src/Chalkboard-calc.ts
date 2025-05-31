/*
    The Chalkboard Library - Calculus Namespace
    Version 2.4.0 Noether
*/
/// <reference path="Chalkboard.ts"/>
namespace Chalkboard {
    /**
     * The calculus namespace.
     * @namespace
     */
    export namespace calc {
        /**
         * Calculates the autocorrelation of a function at a value.
         * @param {ChalkboardFunction} func - The function
         * @param {number} val - The value
         * @returns {number}
         */
        export const autocorrelation = (func: ChalkboardFunction, val: number): number => {
            if (func.field !== "real" || func.type !== "scalar2d") throw new TypeError("Chalkboard.calc.autocorrelation: Property 'field' of 'func' must be 'real' and property 'type' of 'func' must be 'scalar2d'.");
            return Chalkboard.calc.correlation(func, func, val);
        };

        /**
         * Calculates the binormal vector of a parametric curve at a value.
         * @param {ChalkboardFunction} func - The function
         * @param {number} val - The value
         * @returns {ChalkboardVector}
         */
        export const binormal = (func: ChalkboardFunction, val: number): ChalkboardVector => {
            if (func.field !== "real") throw new TypeError("Chalkboard.calc.binormal: Property 'field' of 'func' must be 'real'.");
            if (func.type.startsWith("curve")) {
                return Chalkboard.vect.cross(Chalkboard.calc.tangent(func, val), Chalkboard.calc.normal(func, val));
            }
            throw new TypeError("Chalkboard.real.binormal: Property 'type' of 'func' must be 'curve2d' or 'curve3d'.");
        };

        /**
         * Calculates the convolution of two functions at a value.
         * @param {ChalkboardFunction} func1 - The first function
         * @param {ChalkboardFunction} func2 - The second function
         * @param {number} val - The value
         * @returns {number}
         */
        export const convolution = (func1: ChalkboardFunction, func2: ChalkboardFunction, val: number): number => {
            if (func1.field !== "real" || func2.field !== "real" || func1.type !== "scalar2d" || func2.type !== "scalar2d") throw new TypeError("Chalkboard.calc.convolution: Properties 'field' of 'func1' and 'func2' must be 'real' and properties 'type' of 'func1' and 'func2' must be 'scalar2d'.");
            const f1 = func1.rule as (x: number) => number;
            const f2 = func2.rule as (x: number) => number;
            const g = (x: number): number => f1(x) * f2(val - x);
            return Chalkboard.calc.fxdx(Chalkboard.real.define(g), -100, 100) as number;
        };

        /**
         * Calculates the cross-correlation of two functions at a value.
         * @param {ChalkboardFunction} func1 - The first function
         * @param {ChalkboardFunction} func2 - The second function
         * @param {number} val - The value
         * @returns {number}
         */
        export const correlation = (func1: ChalkboardFunction, func2: ChalkboardFunction, val: number): number => {
            if (func1.field !== "real" || func2.field !== "real" || func1.type !== "scalar2d" || func2.type !== "scalar2d") throw new TypeError("Chalkboard.calc.correlation: Properties 'field' of 'func1' and 'func2' must be 'real' and properties 'type' of 'func1' and 'func2' must be 'scalar2d'.");
            const f1 = func1.rule as (x: number) => number; 
            const f2 = func2.rule as (x: number) => number;
            const g = (x: number): number => f1(x) * f2(val + x);
            return Chalkboard.calc.fxdx(Chalkboard.real.define(g), -100, 100) as number;
        };

        /**
         * Calculates the curl of a 2D or 3D vector field at a vector.
         * @param {ChalkboardFunction} vectfield - The vector field
         * @param {ChalkboardVector} vect - The vector
         * @returns {ChalkboardVector}
         */
        export const curl = (vectfield: ChalkboardFunction, vect: ChalkboardVector): ChalkboardVector => {
            if (vectfield.field !== "real") throw new TypeError("Chalkboard.calc.curl: Property 'field' of 'vectfield' must be 'real'.");
            const f = vectfield.rule as ((...x: number[]) => number)[];
            const v = vect as { x: number, y: number, z?: number, w?: number };
            const h = 0.000000001;
            if (vectfield.type === "vector2d") {
                const dpdy = (f[0](v.x, v.y + h) - f[0](v.x, v.y)) / h;
                const dqdx = (f[1](v.x + h, v.y) - f[1](v.x, v.y)) / h;
                return Chalkboard.vect.init(0, 0, dqdx - dpdy);
            } else if (vectfield.type === "vector3d") {
                const dpdy = (f[0](v.x, v.y + h, v.z!) - f[0](v.x, v.y, v.z!)) / h;
                const dpdz = (f[0](v.x, v.y, v.z! + h) - f[0](v.x, v.y, v.z!)) / h;
                const dqdx = (f[1](v.x + h, v.y, v.z!) - f[1](v.x, v.y, v.z!)) / h;
                const dqdz = (f[1](v.x, v.y, v.z! + h) - f[1](v.x, v.y, v.z!)) / h;
                const drdx = (f[2](v.x + h, v.y, v.z!) - f[2](v.x, v.y, v.z!)) / h;
                const drdy = (f[2](v.x, v.y + h, v.z!) - f[2](v.x, v.y, v.z!)) / h;
                return Chalkboard.vect.init(drdy - dqdz, dpdz - drdx, dqdx - dpdy);
            }
            throw new TypeError("Chalkboard.real.curl: Property 'type' of 'vectfield' must be 'vector2d' or 'vector3d'.");
        };

        /**
         * Calculates the curvature of a parametric curve at a value.
         * @param {ChalkboardFunction} func - The function
         * @param {number} val - The value
         * @returns {number}
         */
        export const curvature = (func: ChalkboardFunction, val: number): number => {
            if (func.field !== "real") throw new TypeError("Chalkboard.calc.curvature: Property 'field' of 'func' must be 'real'.");
            if (func.type === "curve2d") {
                const d = Chalkboard.calc.dfdx(func, val) as ChalkboardVector as { x: number, y: number, z?: number, w?: number };
                const d2 = Chalkboard.calc.d2fdx2(func, val) as ChalkboardVector as { x: number, y: number, z?: number, w?: number };
                return Math.abs(d.x * d2.y - d.y * d2.x) / Math.sqrt((d.x * d.x + d.y * d.y) * (d.x * d.x + d.y * d.y) * (d.x * d.x + d.y * d.y));
            } else if (func.type === "curve3d") {
                return Chalkboard.vect.mag(Chalkboard.calc.normal(func, val)) / Chalkboard.vect.mag(Chalkboard.calc.dfdx(func, val) as ChalkboardVector);
            }
            throw new TypeError("Chalkboard.real.curvature: Property 'type' of 'func' must be 'curve2d' or 'curve3d'.");
        };

        /**
         * Calculates the directional derivative of a multivariable function at a vector in a direction.
         * @param {ChalkboardFunction} func - The function
         * @param {ChalkboardVector} vectpos - The position vector
         * @param {ChalkboardVector} vectdir - The direction vector
         * @returns {number}
         */
        export const dfdv = (func: ChalkboardFunction, vectpos: ChalkboardVector, vectdir: ChalkboardVector): number => {
            if (func.field !== "real") throw new TypeError('Chalkboard.calc.dfdv: Property "field" of "func" must be "real".');
            if (func.type === "scalar3d") {
                const grad = Chalkboard.calc.grad(func, vectpos) as ChalkboardVector as { x: number, y: number, z?: number, w?: number };
                const dir = Chalkboard.vect.normalize(vectdir);
                return Chalkboard.vect.dot(grad, dir);
            }
            throw new TypeError("Chalkboard.real.dfdv: Property 'type' of 'func' must be 'scalar3d'.");
        };

        /**
         * Calculates the first-order derivative of a 2D scalar or parametric function at a value.
         * @param {ChalkboardFunction} func - The function
         * @param {number} val - The value
         * @returns {number | ChalkboardVector}
         */
        export const dfdx = (func: ChalkboardFunction, val: number): number | ChalkboardVector => {
            if (func.field !== "real") throw new TypeError("Chalkboard.calc.dfdx: Property 'field' of 'func' must be 'real'.");
            const h = 0.000000001;
            if (func.type === "scalar2d") {
                const f = func.rule as (x: number) => number;
                return (f(val + h) - f(val)) / h;
            } else if (func.type === "curve2d") {
                const f = func.rule as ((t: number) => number)[];
                return Chalkboard.vect.init((f[0](val + h) - f[0](val)) / h, (f[1](val + h) - f[1](val)) / h);
            } else if (func.type === "curve3d") {
                const f = func.rule as ((t: number) => number)[];
                return Chalkboard.vect.init((f[0](val + h) - f[0](val)) / h, (f[1](val + h) - f[1](val)) / h, (f[2](val + h) - f[2](val)) / h);
            }
            throw new TypeError("Chalkboard.real.dfdx: Property 'type' of 'func' must be 'scalar2d', 'curve2d', or 'curve3d'.");
        };

        /**
         * Calculates the second-order derivative of a 2D scalar or parametric function at a value.
         * @param {ChalkboardFunction} func - The function
         * @param {number} val - The value
         * @returns {number | ChalkboardVector}
         */
        export const d2fdx2 = (func: ChalkboardFunction, val: number): number | ChalkboardVector => {
            if (func.field !== "real") throw new TypeError("Chalkboard.calc.d2fdx2: Property 'field' of 'func' must be 'real'.");
            const h = 0.00001;
            if (func.type === "scalar2d") {
                const f = func.rule as (x: number) => number;
                return (f(val + h) - 2 * f(val) + f(val - h)) / (h * h);
            } else if (func.type === "curve2d") {
                const f = func.rule as ((t: number) => number)[];
                return Chalkboard.vect.init((f[0](val + h) - 2 * f[0](val) + f[0](val - h)) / (h * h), (f[1](val + h) - 2 * f[1](val) + f[1](val - h)) / (h * h));
            } else if (func.type === "curve3d") {
                const f = func.rule as ((t: number) => number)[];
                return Chalkboard.vect.init((f[0](val + h) - 2 * f[0](val) + f[0](val - h)) / (h * h), (f[1](val + h) - 2 * f[1](val) + f[1](val - h)) / (h * h), (f[2](val + h) - 2 * f[2](val) + f[2](val - h)) / (h * h));
            }
            throw new TypeError("Chalkboard.real.d2fdx2: Property 'type' of 'func' must be 'scalar2d', 'curve2d', or 'curve3d'.");
        };

        /**
         * Calculates the first-order complex derivative of a complex function at a complex number.
         * @param {ChalkboardFunction} func - The function
         * @param {ChalkboardComplex} comp - The complex number
         * @returns {ChalkboardComplex[]}
         */
        export const dfdz = (func: ChalkboardFunction, comp: ChalkboardComplex): [ChalkboardComplex, ChalkboardComplex] => {
            if (func.field !== "comp") throw new TypeError("Chalkboard.calc.dfdz: Property 'field' of 'func' must be 'comp'.");
            const h = 0.000000001;
            if (func.type === "vector2d") {
                const f = func.rule as [(a: number, b: number) => number, (a: number, b: number) => number];
                const duda = (f[0](comp.a + h, comp.b) - f[0](comp.a, comp.b)) / h;
                const dudb = (f[0](comp.a, comp.b + h) - f[0](comp.a, comp.b)) / h;
                const dvda = (f[1](comp.a + h, comp.b) - f[1](comp.a, comp.b)) / h;
                const dvdb = (f[1](comp.a, comp.b + h) - f[1](comp.a, comp.b)) / h;
                return [Chalkboard.comp.init(duda, dvda), Chalkboard.comp.init(dudb, dvdb)];
            }
            throw new TypeError("Chalkboard.real.dfdz: Property 'type' of 'func' must be 'vector2d'.");
        };

        /**
         * Calculates the second-order complex derivative of a complex function at a complex number.
         * @param {ChalkboardFunction} func - The function
         * @param {ChalkboardComplex} comp - The complex number
         * @returns {ChalkboardComplex[]}
         */
        export const d2fdz2 = (func: ChalkboardFunction, comp: ChalkboardComplex): [ChalkboardComplex, ChalkboardComplex] => {
            if (func.field !== "comp") throw new TypeError("Chalkboard.calc.d2fdz2: Property 'field' of 'func' must be 'comp'.");
            const h = 0.00001;
            if (func.type === "vector2d") {
                const f = func.rule as [(a: number, b: number) => number, (a: number, b: number) => number];
                const d2uda2 = (f[0](comp.a + h, comp.b) - 2 * f[0](comp.a, comp.b) + f[0](comp.a - h, comp.b)) / (h * h);
                const d2udb2 = (f[0](comp.a, comp.b + h) - 2 * f[0](comp.a, comp.b) + f[0](comp.a, comp.b - h)) / (h * h);
                const d2vda2 = (f[1](comp.a + h, comp.b) - 2 * f[1](comp.a, comp.b) + f[1](comp.a - h, comp.b)) / (h * h);
                const d2vdb2 = (f[1](comp.a, comp.b + h) - 2 * f[1](comp.a, comp.b) + f[1](comp.a, comp.b - h)) / (h * h);
                return [Chalkboard.comp.init(d2uda2, d2vda2), Chalkboard.comp.init(d2udb2, d2vdb2)];
            }
            throw new TypeError("Chalkboard.real.d2fdz2: Property 'type' of 'func' must be 'vector2d'.");
        };

        /**
         * Calculates the first-order multivariable chained derivative of a multivariable function composed with a parametric curve at a value.
         * @param {ChalkboardFunction} func1 - The multivariable function
         * @param {ChalkboardFunction} func2 - The parametric curve function
         * @param {number} val - The value
         * @returns {number}
         */
        export const dfrdt = (func1: ChalkboardFunction, func2: ChalkboardFunction, val: number): number => {
            if (func1.field !== "real" || func2.field !== "real") throw new TypeError("Chalkboard.calc.dfrdt: Properties 'field' of 'func1' and 'func2' must be 'real'.");
            if (func1.type !== "scalar3d") throw new TypeError("Chalkboard.calc.dfrdt: Property 'type' of 'func1' must be 'scalar3d'.");
            const g = Chalkboard.calc.grad(func1, Chalkboard.real.val(func2, val) as ChalkboardVector) as ChalkboardVector as { x: number, y: number, z?: number, w?: number };
            const d = Chalkboard.calc.dfdx(func2, val) as ChalkboardVector as { x: number, y: number, z?: number, w?: number };
            if (func2.type === "curve2d") {
                return g.x * d.x + g.y * d.y;
            } else if (func2.type === "curve3d") {
                return g.x * d.x + g.y * d.y + g.z! * d.z!;
            }
            throw new TypeError("Chalkboard.calc.dfrdt: Property 'type' of 'func2' must be 'curve2d' or 'curve3d'.");
        };

        /**
         * Calculates the divergence of a vector field at a vector.
         * @param {ChalkboardFunction} vectfield - The vector field
         * @param {ChalkboardVector} vect - The vector
         * @returns {number}
         */
        export const div = (vectfield: ChalkboardFunction, vect: ChalkboardVector): number => {
            if (vectfield.field !== "real") throw new TypeError("Chalkboard.calc.div: Property 'field' of 'vectfield' must be 'real'.");
            if (vectfield.type === "vector2d" || vectfield.type === "vector3d" || vectfield.type === "vector4d") {
                return Chalkboard.matr.trace(Chalkboard.calc.grad(vectfield, vect) as ChalkboardMatrix);
            }
            throw new TypeError("Chalkboard.calc.div: Property 'type' of 'vectfield' must be 'vector2d', 'vector3d', or 'vector4d'.");
        };

        /**
         * Calculates the extrema of a function within an interval of its domain.
         * @param {ChalkboardFunction} func - The function
         * @param {number[]} domain - The interval
         * @returns {number[]}
         */
        export const extrema = (func: ChalkboardFunction, domain: [number, number]): number[] => {
            if (func.field !== "real" || func.type !== "scalar2d") throw new TypeError("Chalkboard.calc.extrema: Property 'field' of 'func' must be 'real' and property 'type' of 'func' must be 'scalar2d'.");
            const result = [];
            for (let i = domain[0]; i <= domain[1]; i++) {
                if (Math.round(Chalkboard.calc.dfdx(func, i) as number) === 0) {
                    result.push(i);
                }
            }
            return result;
        };

        /**
         * Calculates the curve length or surface area of a parametric curve or a parametric surface, respectively.
         * @param {ChalkboardFunction} func - The function
         * @param {number} tinf - The lower t-bound (for both curve length and surface area)
         * @param {number} tsup - The upper t-bound (for both curve length and surface area)
         * @param {number} [sinf] - The lower s-bound (only for surface area)
         * @param {number} [ssup] - The upper s-bound (only for surface area)
         * @returns {number}
         */
        export const fds = (func: ChalkboardFunction, tinf: number, tsup: number, sinf?: number, ssup?: number): number => {
            if (func.field !== "real") throw new TypeError("Chalkboard.calc.fds: Property 'field' of 'func' must be 'real'.");
            let result = 0;
            let drdt, drds;
            if (func.type === "curve2d" || func.type === "curve3d") {
                const dt = (tsup - tinf) / 10000;
                for (let t = tinf; t <= tsup; t += dt) {
                    drdt = Chalkboard.calc.dfdx(func, t);
                    result += Chalkboard.vect.mag(drdt as ChalkboardVector);
                }
                return result * dt;
            } else if (func.type === "surface3d") {
                const dt = (tsup - tinf) / 100;
                const ds = (ssup! - sinf!) / 100;
                for (let s = sinf; s! <= ssup!; s! += ds) {
                    for (let t = tinf; t <= tsup; t += dt) {
                        drds = Chalkboard.matr.toVector(Chalkboard.calc.grad(func, Chalkboard.vect.init(s!, t)) as ChalkboardMatrix, 3, 0, 0);
                        drdt = Chalkboard.matr.toVector(Chalkboard.calc.grad(func, Chalkboard.vect.init(s!, t)) as ChalkboardMatrix, 3, 1, 0);
                        result += Chalkboard.vect.mag(Chalkboard.vect.cross(drds, drdt));
                    }
                }
                return result * ds * dt;
            }
            throw new TypeError("Chalkboard.calc.fds: Property 'type' of 'func' must be 'curve2d', 'curve3d', or 'surface3d'.");
        };

        /**
         * Calculates the flux (line/surface integration over a vector field) of a parametric curve or a parametric surface through a 2D or 3D vector field, respectively.
         * @param {ChalkboardFunction} vectfield - The vector field
         * @param {ChalkboardFunction} func - The function
         * @param {number} tinf - The lower t-bound (for both 2D and 3D)
         * @param {number} tsup - The upper t-bound (for both 2D and 3D)
         * @param {number} [sinf] - The lower s-bound (only for 3D)
         * @param {number} [ssup] - The upper s-bound (only for 3D)
         * @returns {number}
         */
        export const fnds = (vectfield: ChalkboardFunction, func: ChalkboardFunction, tinf: number, tsup: number, sinf?: number, ssup?: number): number => {
            if (vectfield.field !== "real" || func.field !== "real") throw new TypeError("Chalkboard.calc.fnds: Properties 'field' of 'vectfield' and 'func' must be 'real'.");
            let result = 0;
            let drdt, drds;
            if (vectfield.type === "vector2d" && func.type === "curve2d") {
                const dt = (tsup - tinf) / 10000;
                for (let t = tinf; t <= tsup; t += dt) {
                    drdt = Chalkboard.calc.dfdx(func, t) as ChalkboardVector as { x: number, y: number, z?: number, w?: number };
                    result += Chalkboard.vect.dot(Chalkboard.vect.fromField(vectfield, Chalkboard.real.val(func, t) as ChalkboardVector), Chalkboard.vect.init(-drdt.y, drdt.x)) * Chalkboard.vect.mag(drdt);
                }
                return result * dt;
            } else if (vectfield.type === "vector3d" && func.type === "curve3d") {
                const dt = (tsup - tinf) / 10000;
                for (let t = tinf; t <= tsup; t += dt) {
                    drdt = Chalkboard.calc.dfdx(func, t) as ChalkboardVector;
                    result += Chalkboard.vect.dot(Chalkboard.vect.fromField(vectfield, Chalkboard.real.val(func, t) as ChalkboardVector), Chalkboard.calc.normal(func, t)) * Chalkboard.vect.mag(drdt);
                }
                return result * dt;
            } else if (vectfield.type === "vector3d" && func.type === "surface3d") {
                const dt = (tsup - tinf) / 100;
                const ds = (ssup! - sinf!) / 100;
                for (let s = sinf; s! <= ssup!; s! += ds) {
                    for (let t = tinf; t <= tsup; t += dt) {
                        drds = Chalkboard.matr.toVector(Chalkboard.calc.grad(func, Chalkboard.vect.init(s!, t)) as ChalkboardMatrix, 3, 0, 0);
                        drdt = Chalkboard.matr.toVector(Chalkboard.calc.grad(func, Chalkboard.vect.init(s!, t)) as ChalkboardMatrix, 3, 1, 0);
                        result += Chalkboard.vect.scalarTriple(Chalkboard.vect.fromField(vectfield, Chalkboard.real.val(func, Chalkboard.vect.init(s!, t)) as ChalkboardVector), drds, drdt);
                    }
                }
                return result * ds * dt;
            }
            throw new TypeError("Chalkboard.calc.fnds: Property 'type' of 'vectfield' must be 'vector2d' or 'vector3d' and property 'type' of 'func' must be 'curve2d', 'curve3d', or 'surface3d'.");
        };

        /**
         * Calculates the Fourier transform of a function at a value.
         * @param {ChalkboardFunction} func - The function
         * @param {number} val - The value
         * @returns {number}
         */
        export const Fourier = (func: ChalkboardFunction, val: number): number => {
            if (func.field !== "real" || func.type !== "scalar2d") throw new TypeError("Chalkboard.calc.Fourier: Property 'field' of 'func' must be 'real' and property 'type' of 'func' must be 'scalar2d'.");
            const f = func.rule as (x: number) => number;
            const g = (x: number): number => f(x) * Math.cos(val * x);
            return (2 * (Chalkboard.calc.fxdx(Chalkboard.real.define(g), 0, 10) as number)) / Chalkboard.PI();
        };

        /**
         * Calculates the circulation (line integration over a scalar/vector field) of a parametric curve through a multivariable function or a vector field.
         * @param {ChalkboardFunction} funcORvectfield - The multivariable function or vector field
         * @param {ChalkboardFunction} func - The parametric curve function
         * @param {number} inf - The lower bound
         * @param {number} sup - The upper bound
         * @returns {number}
         */
        export const frds = (funcORvectfield: ChalkboardFunction, func: ChalkboardFunction, inf: number, sup: number): number => {
            if (funcORvectfield.field !== "real" || func.field !== "real") throw new TypeError("Chalkboard.calc.frds: Properties 'field' of 'funcORvectfield' and 'func' must be 'real'.");
            const f = funcORvectfield.rule as (x: number, y: number) => number;
            if (func.type === "curve2d" || func.type === "curve3d") {
                let result = 0;
                const dt = (sup - inf) / 10000;
                if (funcORvectfield.type === "scalar2d") {
                    for (let t = inf; t <= sup; t += dt) {
                        const val = Chalkboard.real.val(func, t) as ChalkboardVector as { x: number, y: number, z?: number, w?: number };
                        result += f(val.x, val.y) * Chalkboard.vect.mag(Chalkboard.calc.dfdx(func, t) as ChalkboardVector);
                    }
                    return result * dt;
                } else if (funcORvectfield.type === "vector2d") {
                    for (let t = inf; t <= sup; t += dt) {
                        const val = Chalkboard.real.val(func, t) as ChalkboardVector;
                        result += Chalkboard.vect.dot(Chalkboard.vect.fromField(funcORvectfield, val), Chalkboard.calc.dfdx(func, t) as ChalkboardVector);
                    }
                    return result * dt;
                } else if (funcORvectfield.type === "vector3d") {
                    for (let t = inf; t <= sup; t += dt) {
                        const val = Chalkboard.real.val(func, t) as ChalkboardVector;
                        result += Chalkboard.vect.dot(Chalkboard.vect.fromField(funcORvectfield, val), Chalkboard.calc.dfdx(func, t) as ChalkboardVector);
                    }
                    return result * dt;
                }
                throw new TypeError("Chalkboard.calc.frds: Property 'type' of 'funcORvectfield' must be 'scalar2d', 'vector2d', or 'vector3d'.");
            }
            throw new TypeError("Chalkboard.calc.frds: Property 'type' of 'func' must be 'curve2d' or 'curve3d'.");
        };

        /**
         * Calculates the antiderivative (or integral) of a 2D scalar or parametric function within an interval.
         * @param {ChalkboardFunction} func - The function
         * @param {number} inf - The lower bound
         * @param {number} sup - The upper bound
         * @returns {number | ChalkboardVector}
         */
        export const fxdx = (func: ChalkboardFunction, inf: number, sup: number): number | ChalkboardVector => {
            if (func.field !== "real") throw new TypeError("Chalkboard.calc.fxdx: Property 'field' of 'func' must be 'real'.");
            if (func.type === "scalar2d") {
                const f = func.rule as (x: number) => number;
                let fx = f(inf) + f(sup);
                const dx = (sup - inf) / 1000000;
                for (let i = 1; i < 1000000; i++) {
                    fx += i % 2 === 0 ? 2 * f(inf + i * dx) : 4 * f(inf + i * dx);
                }
                return (fx * dx) / 3;
            } else if (func.type === "curve2d") {
                const f = func.rule as ((t: number) => number)[];
                let fx = f[0](inf) + f[0](sup);
                let fy = f[1](inf) + f[1](sup);
                const dt = (sup - inf) / 1000000;
                for (let i = 1; i < 1000000; i++) {
                    fx += i % 2 === 0 ? 2 * f[0](inf + i * dt) : 4 * f[0](inf + i * dt);
                    fy += i % 2 === 0 ? 2 * f[1](inf + i * dt) : 4 * f[1](inf + i * dt);
                }
                return Chalkboard.vect.init((fx * dt) / 3, (fy * dt) / 3);
            } else if (func.type === "curve3d") {
                const f = func.rule as ((t: number) => number)[];
                let fx = f[0](inf) + f[0](sup);
                let fy = f[1](inf) + f[1](sup);
                let fz = f[2](inf) + f[2](sup);
                const dt = (sup - inf) / 1000000;
                for (let i = 1; i < 1000000; i++) {
                    fx += i % 2 === 0 ? 2 * f[0](inf + i * dt) : 4 * f[0](inf + i * dt);
                    fy += i % 2 === 0 ? 2 * f[1](inf + i * dt) : 4 * f[1](inf + i * dt);
                    fz += i % 2 === 0 ? 2 * f[2](inf + i * dt) : 4 * f[2](inf + i * dt);
                }
                return Chalkboard.vect.init((fx * dt) / 3, (fy * dt) / 3, (fz * dt) / 3);
            }
            throw new TypeError("Chalkboard.calc.fxdx: Property 'type' of 'func' must be 'scalar2d', 'curve2d', or 'curve3d'.");
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
            if (func.field !== "real") throw new TypeError("Chalkboard.calc.fxydxdy: Property 'field' of 'func' must be 'real'.");
            if (func.type === "scalar3d") {
                const f = func.rule as (x: number, y: number) => number;
                let result = 0;
                const dx = (xsup - xinf) / 10000;
                const dy = (ysup - yinf) / 10000;
                for (let x = xinf; x <= xsup; x += dx) {
                    for (let y = yinf; y <= ysup; y += dy) {
                        result += f(x, y);
                    }
                }
                return result * dx * dy;
            }
            throw new TypeError("Chalkboard.calc.fxydxdy: Property 'type' of 'func' must be 'scalar3d'.");
        };

        /**
         * Calculates the complex integration of a complex function composed with a parametric curve.
         * @param {ChalkboardFunction} func1 - The complex function
         * @param {ChalkboardFunction} func2 - The parametric curve
         * @param {number} inf - The lower bound
         * @param {number} sup - The upper bound
         * @returns {ChalkboardComplex}
         */
        export const fzdz = (func1: ChalkboardFunction, func2: ChalkboardFunction, inf: number, sup: number): ChalkboardComplex => {
            if (func1.field !== "comp" || func2.field !== "real") throw new TypeError("Chalkboard.calc.fzdz: Property 'field' of 'func1' must be 'comp' and property 'field' of 'func2' must be 'real'.");
            if (func1.type === "vector2d" && func2.type === "curve2d") {
                let result = Chalkboard.comp.init(0, 0);
                const dt = (sup - inf) / 10000;
                for (let t = inf; t <= sup; t += dt) {
                    const fz = Chalkboard.comp.val(func1, Chalkboard.vect.toComplex(Chalkboard.real.val(func2, t) as ChalkboardVector));
                    const rt = Chalkboard.calc.dfdx(func2, t) as ChalkboardVector as { x: number, y: number, z?: number, w?: number };
                    result = Chalkboard.comp.add(result, Chalkboard.comp.init(fz.a * rt.x - fz.b * rt.y, fz.b * rt.x + fz.a * rt.y)) as ChalkboardComplex;
                }
                return Chalkboard.comp.scl(result, dt) as ChalkboardComplex;
            }
            throw new TypeError("Chalkboard.calc.fzdz: Property 'type' of 'func1' must be 'vector2d' and property 'type' of 'func2' must be 'curve2d'.");
        };

        /**
         * Calculates the first-order gradient of a multivariable function, a parametric surface, or a vector field at a vector.
         * @param {ChalkboardFunction} funcORvectfield - The function or vector field
         * @param {ChalkboardVector} vect - The vector
         * @returns {ChalkboardVector | ChalkboardMatrix}
         */
        export const grad = (funcORvectfield: ChalkboardFunction, vect: ChalkboardVector): ChalkboardVector | ChalkboardMatrix => {
            if (funcORvectfield.field !== "real") throw new TypeError("Chalkboard.calc.grad: Property 'field' of 'funcORvectfield' must be 'real'.");
            const f = funcORvectfield.rule as (x: number, y: number) => number;
            const r = funcORvectfield.rule as ((s: number, t: number) => number)[];
            const F = funcORvectfield.rule as ((...x: number[]) => number)[];
            const v = vect as { x: number, y: number, z?: number, w?: number };
            const h = 0.000000001;
            if (funcORvectfield.type === "scalar3d") {
                const dfdx = (f(v.x + h, v.y) - f(v.x, v.y)) / h;
                const dfdy = (f(v.x, v.y + h) - f(v.x, v.y)) / h;
                return Chalkboard.vect.init(dfdx, dfdy);
            } else if (funcORvectfield.type === "surface3d") {
                const dxds = (r[0](v.x + h, v.y) - r[0](v.x, v.y)) / h;
                const dxdt = (r[0](v.x, v.y + h) - r[0](v.x, v.y)) / h;
                const dyds = (r[1](v.x + h, v.y) - r[1](v.x, v.y)) / h;
                const dydt = (r[1](v.x, v.y + h) - r[1](v.x, v.y)) / h;
                const dzds = (r[2](v.x + h, v.y) - r[2](v.x, v.y)) / h;
                const dzdt = (r[2](v.x, v.y + h) - r[2](v.x, v.y)) / h;
                return Chalkboard.matr.init([dxds, dxdt], [dyds, dydt], [dzds, dzdt]);
            } else if (funcORvectfield.type === "vector2d") {
                const dpdx = (F[0](v.x + h, v.y) - F[0](v.x, v.y)) / h;
                const dpdy = (F[0](v.x, v.y + h) - F[0](v.x, v.y)) / h;
                const dqdx = (F[1](v.x + h, v.y) - F[1](v.x, v.y)) / h;
                const dqdy = (F[1](v.x, v.y + h) - F[1](v.x, v.y)) / h;
                return Chalkboard.matr.init([dpdx, dpdy], [dqdx, dqdy]);
            } else if (funcORvectfield.type === "vector3d") {
                const dpdx = (F[0](v.x + h, v.y, v.z!) - F[0](v.x, v.y, v.z!)) / h;
                const dpdy = (F[0](v.x, v.y + h, v.z!) - F[0](v.x, v.y, v.z!)) / h;
                const dpdz = (F[0](v.x, v.y, v.z! + h) - F[0](v.x, v.y, v.z!)) / h;
                const dqdx = (F[1](v.x + h, v.y, v.z!) - F[1](v.x, v.y, v.z!)) / h;
                const dqdy = (F[1](v.x, v.y + h, v.z!) - F[1](v.x, v.y, v.z!)) / h;
                const dqdz = (F[1](v.x, v.y, v.z! + h) - F[1](v.x, v.y, v.z!)) / h;
                const drdx = (F[2](v.x + h, v.y, v.z!) - F[2](v.x, v.y, v.z!)) / h;
                const drdy = (F[2](v.x, v.y + h, v.z!) - F[2](v.x, v.y, v.z!)) / h;
                const drdz = (F[2](v.x, v.y, v.z! + h) - F[2](v.x, v.y, v.z!)) / h;
                return Chalkboard.matr.init([dpdx, dpdy, dpdz], [dqdx, dqdy, dqdz], [drdx, drdy, drdz]);
            } else if (funcORvectfield.type === "vector4d") {
                const dpdx = (F[0](v.x + h, v.y, v.z!, v.w!) - F[0](v.x, v.y, v.z!, v.w!)) / h;
                const dpdy = (F[0](v.x, v.y + h, v.z!, v.w!) - F[0](v.x, v.y, v.z!, v.w!)) / h;
                const dpdz = (F[0](v.x, v.y, v.z! + h, v.w!) - F[0](v.x, v.y, v.z!, v.w!)) / h;
                const dpdw = (F[0](v.x, v.y, v.z!, v.w! + h) - F[0](v.x, v.y, v.z!, v.w!)) / h;
                const dqdx = (F[1](v.x + h, v.y, v.z!, v.w!) - F[1](v.x, v.y, v.z!, v.w!)) / h;
                const dqdy = (F[1](v.x, v.y + h, v.z!, v.w!) - F[1](v.x, v.y, v.z!, v.w!)) / h;
                const dqdz = (F[1](v.x, v.y, v.z! + h, v.w!) - F[1](v.x, v.y, v.z!, v.w!)) / h;
                const dqdw = (F[1](v.x, v.y, v.z!, v.w! + h) - F[1](v.x, v.y, v.z!, v.w!)) / h;
                const drdx = (F[2](v.x + h, v.y, v.z!, v.w!) - F[2](v.x, v.y, v.z!, v.w!)) / h;
                const drdy = (F[2](v.x, v.y + h, v.z!, v.w!) - F[2](v.x, v.y, v.z!, v.w!)) / h;
                const drdz = (F[2](v.x, v.y, v.z! + h, v.w!) - F[2](v.x, v.y, v.z!, v.w!)) / h;
                const drdw = (F[2](v.x, v.y, v.z!, v.w! + h) - F[2](v.x, v.y, v.z!, v.w!)) / h;
                const dsdx = (F[3](v.x + h, v.y, v.z!, v.w!) - F[3](v.x, v.y, v.z!, v.w!)) / h;
                const dsdy = (F[3](v.x, v.y + h, v.z!, v.w!) - F[3](v.x, v.y, v.z!, v.w!)) / h;
                const dsdz = (F[3](v.x, v.y, v.z! + h, v.w!) - F[3](v.x, v.y, v.z!, v.w!)) / h;
                const dsdw = (F[3](v.x, v.y, v.z!, v.w! + h) - F[3](v.x, v.y, v.z!, v.w!)) / h;
                return Chalkboard.matr.init([dpdx, dpdy, dpdz, dpdw], [dqdx, dqdy, dqdz, dqdw], [drdx, drdy, drdz, drdw], [dsdx, dsdy, dsdz, dsdw]);
            }
            throw new TypeError("Chalkboard.calc.grad: Property 'type' of 'funcORvectfield' must be 'scalar3d', 'surface3d', 'vector2d', 'vector3d', or 'vector4d'.");
        };

        /**
         * Calculates the second-order gradient of a multivariable function, a parametric surface function, or a vector field at a vector.
         * @param {ChalkboardFunction} funcORvectfield - The function or vector field
         * @param {ChalkboardVector} vect - The vector
         * @returns {ChalkboardMatrix}
         */
        export const grad2 = (funcORvectfield: ChalkboardFunction, vect: ChalkboardVector): ChalkboardMatrix => {
            if (funcORvectfield.field !== "real") throw new TypeError("Chalkboard.calc.grad2: Property 'field' of 'funcORvectfield' must be 'real'.");
            const f = funcORvectfield.rule as (x: number, y: number) => number;
            const r = funcORvectfield.rule as ((s: number, t: number) => number)[];
            const F = funcORvectfield.rule as ((...x: number[]) => number)[];
            const v = vect as { x: number, y: number, z?: number, w?: number };
            const h = 0.00001;
            if (funcORvectfield.type === "scalar3d") {
                const d2fdx2 = (f(v.x + h, v.y) - 2 * f(v.x, v.y) + f(v.x - h, v.y)) / (h * h);
                const d2fdy2 = (f(v.x, v.y + h) - 2 * f(v.x, v.y) + f(v.x, v.y - h)) / (h * h);
                const d2fdxdy = (f(v.x + h, v.y + h) - f(v.x + h, v.y) - f(v.x, v.y + h) + f(v.x, v.y)) / (h * h);
                const d2fdydx = (f(v.x + h, v.y + h) - f(v.x, v.y + h) - f(v.x + h, v.y) + f(v.x, v.y)) / (h * h);
                return Chalkboard.matr.init([d2fdx2, d2fdxdy], [d2fdydx, d2fdy2]);
            } else if (funcORvectfield.type === "surface3d") {
                const d2xds2 = (r[0](v.x + h, v.y) - 2 * r[0](v.x, v.y) + r[0](v.x - h, v.y)) / (h * h);
                const d2xdt2 = (r[0](v.x, v.y + h) - 2 * r[0](v.x, v.y) + r[0](v.x, v.y - h)) / (h * h);
                const d2yds2 = (r[1](v.x + h, v.y) - 2 * r[1](v.x, v.y) + r[1](v.x - h, v.y)) / (h * h);
                const d2ydt2 = (r[1](v.x, v.y + h) - 2 * r[1](v.x, v.y) + r[1](v.x, v.y - h)) / (h * h);
                const d2zds2 = (r[2](v.x + h, v.y) - 2 * r[2](v.x, v.y) + r[2](v.x - h, v.y)) / (h * h);
                const d2zdt2 = (r[2](v.x, v.y + h) - 2 * r[2](v.x, v.y) + r[2](v.x, v.y - h)) / (h * h);
                return Chalkboard.matr.init([d2xds2, d2xdt2], [d2yds2, d2ydt2], [d2zds2, d2zdt2]);
            } else if (funcORvectfield.type === "vector2d") {
                const d2pdx2 = (F[0](v.x + h, v.y) - 2 * F[0](v.x, v.y) + F[0](v.x - h, v.y)) / (h * h);
                const d2pdy2 = (F[0](v.x, v.y + h) - 2 * F[0](v.x, v.y) + F[0](v.x, v.y - h)) / (h * h);
                const d2qdx2 = (F[1](v.x + h, v.y) - 2 * F[1](v.x, v.y) + F[1](v.x - h, v.y)) / (h * h);
                const d2qdy2 = (F[1](v.x, v.y + h) - 2 * F[1](v.x, v.y) + F[1](v.x, v.y - h)) / (h * h);
                return Chalkboard.matr.init([d2pdx2, d2pdy2], [d2qdx2, d2qdy2]);
            } else if (funcORvectfield.type === "vector3d") {
                const d2pdx2 = (F[0](v.x + h, v.y, v.z!) - 2 * F[0](v.x, v.y, v.z!) + F[0](v.x - h, v.y, v.z!)) / (h * h);
                const d2pdy2 = (F[0](v.x, v.y + h, v.z!) - 2 * F[0](v.x, v.y, v.z!) + F[0](v.x, v.y - h, v.z!)) / (h * h);
                const d2pdz2 = (F[0](v.x, v.y, v.z! + h) - 2 * F[0](v.x, v.y, v.z!) + F[0](v.x, v.y, v.z! - h)) / (h * h);
                const d2qdx2 = (F[1](v.x + h, v.y, v.z!) - 2 * F[1](v.x, v.y, v.z!) + F[1](v.x - h, v.y, v.z!)) / (h * h);
                const d2qdy2 = (F[1](v.x, v.y + h, v.z!) - 2 * F[1](v.x, v.y, v.z!) + F[1](v.x, v.y - h, v.z!)) / (h * h);
                const d2qdz2 = (F[1](v.x, v.y, v.z! + h) - 2 * F[1](v.x, v.y, v.z!) + F[1](v.x, v.y, v.z! - h)) / (h * h);
                const d2rdx2 = (F[2](v.x + h, v.y, v.z!) - 2 * F[2](v.x, v.y, v.z!) + F[2](v.x - h, v.y, v.z!)) / (h * h);
                const d2rdy2 = (F[2](v.x, v.y + h, v.z!) - 2 * F[2](v.x, v.y, v.z!) + F[2](v.x, v.y - h, v.z!)) / (h * h);
                const d2rdz2 = (F[2](v.x, v.y, v.z! + h) - 2 * F[2](v.x, v.y, v.z!) + F[2](v.x, v.y, v.z! - h)) / (h * h);
                return Chalkboard.matr.init([d2pdx2, d2pdy2, d2pdz2], [d2qdx2, d2qdy2, d2qdz2], [d2rdx2, d2rdy2, d2rdz2]);
            } else if (funcORvectfield.type === "vector4d") {
                const d2pdx2 = (F[0](v.x + h, v.y, v.z!, v.w!) - 2 * F[0](v.x, v.y, v.z!, v.w!) + F[0](v.x - h, v.y, v.z!, v.w!)) / (h * h);
                const d2pdy2 = (F[0](v.x, v.y + h, v.z!, v.w!) - 2 * F[0](v.x, v.y, v.z!, v.w!) + F[0](v.x, v.y - h, v.z!, v.w!)) / (h * h);
                const d2pdz2 = (F[0](v.x, v.y, v.z! + h, v.w!) - 2 * F[0](v.x, v.y, v.z!, v.w!) + F[0](v.x, v.y, v.z! - h, v.w!)) / (h * h);
                const d2pdw2 = (F[0](v.x, v.y, v.z!, v.w! + h) - 2 * F[0](v.x, v.y, v.z!, v.w!) + F[0](v.x, v.y, v.z!, v.w! - h)) / (h * h);
                const d2qdx2 = (F[1](v.x + h, v.y, v.z!, v.w!) - 2 * F[1](v.x, v.y, v.z!, v.w!) + F[1](v.x - h, v.y, v.z!, v.w!)) / (h * h);
                const d2qdy2 = (F[1](v.x, v.y + h, v.z!, v.w!) - 2 * F[1](v.x, v.y, v.z!, v.w!) + F[1](v.x, v.y - h, v.z!, v.w!)) / (h * h);
                const d2qdz2 = (F[1](v.x, v.y, v.z! + h, v.w!) - 2 * F[1](v.x, v.y, v.z!, v.w!) + F[1](v.x, v.y, v.z! - h, v.w!)) / (h * h);
                const d2qdw2 = (F[1](v.x, v.y, v.z!, v.w! + h) - 2 * F[1](v.x, v.y, v.z!, v.w!) + F[1](v.x, v.y, v.z!, v.w! - h)) / (h * h);
                const d2rdx2 = (F[2](v.x + h, v.y, v.z!, v.w!) - 2 * F[2](v.x, v.y, v.z!, v.w!) + F[2](v.x - h, v.y, v.z!, v.w!)) / (h * h);
                const d2rdy2 = (F[2](v.x, v.y + h, v.z!, v.w!) - 2 * F[2](v.x, v.y, v.z!, v.w!) + F[2](v.x, v.y - h, v.z!, v.w!)) / (h * h);
                const d2rdz2 = (F[2](v.x, v.y, v.z! + h, v.w!) - 2 * F[2](v.x, v.y, v.z!, v.w!) + F[2](v.x, v.y, v.z! - h, v.w!)) / (h * h);
                const d2rdw2 = (F[2](v.x, v.y, v.z!, v.w! + h) - 2 * F[2](v.x, v.y, v.z!, v.w!) + F[2](v.x, v.y, v.z!, v.w! - h)) / (h * h);
                const d2sdx2 = (F[3](v.x + h, v.y, v.z!, v.w!) - 2 * F[3](v.x, v.y, v.z!, v.w!) + F[3](v.x - h, v.y, v.z!, v.w!)) / (h * h);
                const d2sdy2 = (F[3](v.x, v.y + h, v.z!, v.w!) - 2 * F[3](v.x, v.y, v.z!, v.w!) + F[3](v.x, v.y - h, v.z!, v.w!)) / (h * h);
                const d2sdz2 = (F[3](v.x, v.y, v.z! + h, v.w!) - 2 * F[3](v.x, v.y, v.z!, v.w!) + F[3](v.x, v.y, v.z! - h, v.w!)) / (h * h);
                const d2sdw2 = (F[3](v.x, v.y, v.z!, v.w! + h) - 2 * F[3](v.x, v.y, v.z!, v.w!) + F[3](v.x, v.y, v.z!, v.w! - h)) / (h * h);
                return Chalkboard.matr.init([d2pdx2, d2pdy2, d2pdz2, d2pdw2], [d2qdx2, d2qdy2, d2qdz2, d2qdw2], [d2rdx2, d2rdy2, d2rdz2, d2rdw2], [d2sdx2, d2sdy2, d2sdz2, d2sdw2]);
            }
            throw new TypeError("Chalkboard.calc.grad: Property 'type' of 'funcORvectfield' must be 'scalar3d', 'surface3d', 'vector2d', 'vector3d', or 'vector4d'.");
        };

        /**
         * Calculates the Laplace transform of a function at a value.
         * @param {ChalkboardFunction} func - The function
         * @param {number} val - The value
         * @returns {number}
         */
        export const Laplace = (func: ChalkboardFunction, val: number): number => {
            if (func.field !== "real" || func.type !== "scalar2d") throw new TypeError("Chalkboard.calc.Laplace: Property 'field' of 'func' must be 'real' and property 'type' of 'func' must be 'scalar2d'.");
            if (val > 0) {
                const f = func.rule as (x: number) => number;
                const g = (x: number): number => f(x) * Math.exp(-val * x);
                return Chalkboard.calc.fxdx(Chalkboard.real.define(g), 0, 10) as number;
            }
            throw new RangeError("Chalkboard.calc.Laplace: 'val' must be greater than 0.");
        };

        /**
         * Calculates the limit of a function as it approaches a value.
         * @param {ChalkboardFunction} func - The function
         * @param {number} val - The value
         * @returns {number | undefined}
         */
        export const lim = (func: ChalkboardFunction, val: number): number | undefined => {
            if (func.field !== "real" || func.type !== "scalar2d") throw new TypeError("Chalkboard.calc.lim: Property 'field' of 'func' must be 'real' and property 'type' of 'func' must be 'scalar2d'.");
            const f = func.rule as (x: number) => number;
            if (val === Infinity) {
                if (f(101) > f(100)) {
                    return Infinity;
                } else if (f(101) < f(100)) {
                    return -Infinity;
                } else {
                    return f(100);
                }
            } else if (val === -Infinity) {
                if (f(-101) > f(-100)) {
                    return Infinity;
                } else if (f(-101) < f(-100)) {
                    return -Infinity;
                } else {
                    return f(-100);
                }
            } else {
                if (f(val - 0.000001).toFixed(4) === f(val + 0.000001).toFixed(4)) {
                    if (f(val) !== Infinity && f(val) !== -Infinity) {
                        return f(val);
                    } else {
                        return undefined;
                    }
                } else {
                    return undefined;
                }
            }
        };

        /**
         * Calculates the mean value of a function within an interval.
         * @param {ChalkboardFunction} func - The function
         * @param {number} inf - The lower bound
         * @param {number} sup - The upper bound
         * @returns {number}
         */
        export const mean = (func: ChalkboardFunction, inf: number, sup: number): number => {
            if (func.field !== "real" || func.type !== "scalar2d") throw new TypeError("Chalkboard.calc.mean: Property 'field' of 'func' must be 'real' and property 'type' of 'func' must be 'scalar2d'.");
            return (Chalkboard.calc.fxdx(func, inf, sup) as number) / (sup - inf);
        };

        /**
         * Calculates a root of a function with Newton's method within an interval.
         * @param {ChalkboardFunction} func - The function
         * @param {number[]} [domain=[-1, 1]] - The interval
         * @returns {number}
         */
        export const Newton = (func: ChalkboardFunction, domain: [number, number] = [-1, 1]): number => {
            if (func.field !== "real" || func.type !== "scalar2d") throw new TypeError("Chalkboard.calc.Newton: Property 'field' of 'func' must be 'real' and property 'type' of 'func' must be 'scalar2d'.");
            const f = func.rule as (x: number) => number;
            let x = Chalkboard.numb.random(domain[0], domain[1]);
            for (let i = 0; i < 10; i++) {
                x = x - f(x) / (Chalkboard.calc.dfdx(func, x) as number);
            }
            return x;
        };

        /**
         * Calculates the unit normal vector of a parametric curve at a value.
         * @param {ChalkboardFunction} func - The function
         * @param {number} val - The value
         * @returns {ChalkboardVector}
         */
        export const normal = (func: ChalkboardFunction, val: number): ChalkboardVector => {
            if (func.field !== "real" || !func.type.startsWith("curve")) throw new TypeError("Chalkboard.calc.normal: Property 'field' of 'func' must be 'real' and property 'type' of 'func' must be 'curve2d' or 'curve3d'.");
            return Chalkboard.vect.normalize(Chalkboard.calc.d2fdx2(func, val) as ChalkboardVector);
        };

        /**
         * Calculates the unit tangent vector of a parametric curve at a value.
         * @param {ChalkboardFunction} func - The function
         * @param {number} val - The value
         * @returns {ChalkboardVector}
         */
        export const tangent = (func: ChalkboardFunction, val: number): ChalkboardVector => {
            if (func.field !== "real" || !func.type.startsWith("curve")) throw new TypeError("Chalkboard.calc.tangent: Property 'field' of 'func' must be 'real' and property 'type' of 'func' must be 'curve2d' or 'curve3d'.");
            return Chalkboard.vect.normalize(Chalkboard.calc.dfdx(func, val) as ChalkboardVector);
        };

        /**
         * Calculates the nth-degree Taylor series approximation of a function at a value centered around another value.
         * @param {ChalkboardFunction} func - The function
         * @param {number} val - The value
         * @param {number} n - The degree
         * @param {number} a - The center
         * @returns {number}
         */
        export const Taylor = (func: ChalkboardFunction, val: number, n: 0 | 1 | 2, a: number): number => {
            if (func.field !== "real" || func.type !== "scalar2d") throw new TypeError("Chalkboard.calc.Taylor: Property 'field' of 'func' must be 'real' and property 'type' of 'func' must be 'scalar2d'.");
            const f = func.rule as (x: number) => number;
            const x = val;
            if (n === 0) {
                return f(x);
            } else if (n === 1) {
                return f(x) + (Chalkboard.calc.dfdx(func, a) as number) * (x - a);
            } else if (n === 2) {
                return f(x) + (Chalkboard.calc.dfdx(func, a) as number) * (x - a) + ((Chalkboard.calc.d2fdx2(func, a) as number) * (x - a) * (x - a)) / 2;
            }
            throw new RangeError("Chalkboard.calc.Taylor: 'n' must be 0, 1, or 2.");
        };
    }
}
