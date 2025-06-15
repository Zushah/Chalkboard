/*
    The Chalkboard Library - Complex Numbers Namespace
    Version 2.4.0 Noether
*/
/// <reference path="Chalkboard.ts"/>
namespace Chalkboard {
    /**
     * The complex numbers namespace.
     * @namespace
     */
    export namespace comp {
        /**
         * Calculates the absolute value of a complex number or complex function.
         * @param {ChalkboardComplex | number | ChalkboardFunction} comp - The complex number or function
         * @returns {ChalkboardComplex | ChalkboardFunction}
         * @example
         * // Returns 2 + 3i
         * const z = Chalkboard.comp.absolute(Chalkboard.comp.init(-2, 3));
         */
        export const absolute = (comp: ChalkboardComplex | number | ChalkboardFunction): ChalkboardComplex | ChalkboardFunction => {
            if (typeof comp === "number") comp = Chalkboard.comp.init(comp, 0);
            if (comp.hasOwnProperty("a") && comp.hasOwnProperty("b")) {
                const z = comp as ChalkboardComplex;
                return Chalkboard.comp.init(Math.abs(z.a), Math.abs(z.b));
            } else if (comp.hasOwnProperty("rule")) {
                if ((comp as ChalkboardFunction).field !== "comp") throw new TypeError("Chalkboard.comp.absolute: Property 'field' of 'comp' must be 'comp'.");
                const f = (comp as ChalkboardFunction).rule as ((a: number, b: number) => number)[];
                const g = [(a: number, b: number) => Math.abs(f[0](a, b)), (a: number, b: number) => Math.abs(f[1](a, b))];
                return Chalkboard.comp.define(...g);
            }
            throw new TypeError("Chalkboard.comp.absolute: Parameter 'comp' must be of type ChalkboardComplex, number, or ChalkboardFunction.");
        };

        /**
         * Calculates the addition of two complex numbers or functions.
         * @param {ChalkboardComplex | number | ChalkboardFunction} comp1 - The first complex number or function
         * @param {ChalkboardComplex | number | ChalkboardFunction} comp2 - The second complex number or function
         * @returns {ChalkboardComplex | ChalkboardFunction}
         * @example
         * // Returns 3 + 4i
         * const sum = Chalkboard.comp.add(Chalkboard.comp.init(2, 3), Chalkboard.comp.init(1, 1));
         */
        export const add = (comp1: ChalkboardComplex | number | ChalkboardFunction, comp2: ChalkboardComplex | number | ChalkboardFunction): ChalkboardComplex | ChalkboardFunction => {
            if (typeof comp1 === "number") comp1 = Chalkboard.comp.init(comp1, 0);
            if (typeof comp2 === "number") comp2 = Chalkboard.comp.init(comp2, 0);
            if (comp1.hasOwnProperty("a") && comp1.hasOwnProperty("b") && comp2.hasOwnProperty("a") && comp2.hasOwnProperty("b")) {
                const z1 = comp1 as ChalkboardComplex;
                const z2 = comp2 as ChalkboardComplex;
                return Chalkboard.comp.init(z1.a + z2.a, z1.b + z2.b);
            } else if (comp1.hasOwnProperty("rule") && comp2.hasOwnProperty("rule")) {
                if ((comp1 as ChalkboardFunction).field !== "comp" || (comp2 as ChalkboardFunction).field !== "comp") throw new TypeError("Chalkboard.comp.add: Properties 'field' of 'comp1' and 'comp2' must be 'comp'.");
                const f1 = (comp1 as ChalkboardFunction).rule as [(a: number, b: number) => number, (a: number, b: number) => number];
                const f2 = (comp2 as ChalkboardFunction).rule as [(a: number, b: number) => number, (a: number, b: number) => number];
                const g = [(a: number, b: number) => f1[0](a, b) + f2[0](a, b), (a: number, b: number) => f1[1](a, b) + f2[1](a, b)];
                return Chalkboard.comp.define(...g);
            }
            throw new TypeError("Chalkboard.comp.add: Parameters 'comp1' and 'comp2' must be of type ChalkboardComplex, number, or ChalkboardFunction.");
        };

        /**
         * Calculates the argument of a complex number.
         * @param {ChalkboardComplex} comp - The complex number
         * @returns {number}
         * @example
         * // Returns 0.9273 (approximately π/3 radians)
         * const argument = Chalkboard.comp.arg(Chalkboard.comp.init(1, 1.7321));
         */
        export const arg = (comp: ChalkboardComplex): number => {
            return Chalkboard.trig.arctan2(comp.b, comp.a);
        };

        /**
         * Calculates the argument between two complex numbers.
         * @param {ChalkboardComplex} comp1 - The first complex number
         * @param {ChalkboardComplex} comp2 - The second complex number
         * @returns {number}
         * @example
         * // Returns 0.7854 (approximately π/4 radians)
         * const angle = Chalkboard.comp.argBetween(Chalkboard.comp.init(1, 0), Chalkboard.comp.init(1, 1));
         */
        export const argBetween = (comp1: ChalkboardComplex, comp2: ChalkboardComplex): number => {
            return Chalkboard.vect.angBetween(Chalkboard.comp.toVector(comp1), Chalkboard.comp.toVector(comp2));
        };

        /**
         * Calculates the conjugate of a complex number or function.
         * @param {ChalkboardComplex | number | ChalkboardFunction} comp - The complex number or function
         * @returns {ChalkboardComplex | ChalkboardFunction}
         * @example
         * // Returns 2 - 3i
         * const conj = Chalkboard.comp.conjugate(Chalkboard.comp.init(2, 3));
         */
        export const conjugate = (comp: ChalkboardComplex | number | ChalkboardFunction): ChalkboardComplex | ChalkboardFunction => {
            if (typeof comp === "number") comp = Chalkboard.comp.init(comp, 0);
            if (comp.hasOwnProperty("a") && comp.hasOwnProperty("b")) {
                const z = comp as ChalkboardComplex;
                return Chalkboard.comp.init(z.a, -z.b);
            } else if (comp.hasOwnProperty("rule")) {
                if ((comp as ChalkboardFunction).field !== "comp") throw new TypeError("Chalkboard.comp.conjugate: Property 'field' of 'comp' must be 'comp'.");
                const f = (comp as ChalkboardFunction).rule as ((a: number, b: number) => number)[];
                const g = [(a: number, b: number) => f[0](a, b), (a: number, b: number) => -f[1](a, b)];
                return Chalkboard.comp.define(...g);
            }
            throw new TypeError("Chalkboard.comp.conjugate: Parameter 'comp' must be of type ChalkboardComplex, number, or ChalkboardFunction.");
        };

        /**
         * Calculates a complex number constrained within a range.
         * @param {ChalkboardComplex} comp - The complex number
         * @param {number[]} [range=[0, 1]] - The range
         * @returns {ChalkboardComplex}
         * @example
         * // Returns 1 + 0.5i
         * const constrained = Chalkboard.comp.constrain(Chalkboard.comp.init(2, 0.5));
         */
        export const constrain = (comp: ChalkboardComplex, range: [number, number] = [0, 1]): ChalkboardComplex => {
            return Chalkboard.comp.init(Chalkboard.numb.constrain(comp.a, range), Chalkboard.numb.constrain(comp.b, range));
        };

        /**
         * Copies a complex number.
         * @param {ChalkboardComplex} comp - The complex number
         * @returns {ChalkboardComplex}
         * @example
         * // Returns 2 + 3i
         * const copied = Chalkboard.comp.copy(Chalkboard.comp.init(2, 3));
         */
        export const copy = (comp: ChalkboardComplex): ChalkboardComplex => {
            return Object.create(Object.getPrototypeOf(comp), Object.getOwnPropertyDescriptors(comp));
        };

        /**
         * Defines a mathematical function in the field of complex numbers.
         * @param {Function | Function[]} rule - The rule of the function, which can be a single function that takes a complex number or an array of two functions that take real and imaginary parts respectively.
         * @returns {ChalkboardFunction}
         * @example
         * // Defines f(z) = z² or f(a+bi) = (a²-b²) + (2ab)i
         * const f = Chalkboard.comp.define((z) => Chalkboard.comp.sq(z));
         * 
         * // Defines g(a+bi) = (a²-b²) + (2ab)i or g(z) = z²
         * const g = Chalkboard.comp.define([
         *     (a, b) => a*a - b*b,
         *     (a, b) => 2*a*b
         * ]);
         */
        export const define = (...rule: (((z: ChalkboardComplex) => ChalkboardComplex) | ((a: number, b: number) => number))[]): ChalkboardFunction => {
            let f: ((z: ChalkboardComplex) => ChalkboardComplex) | ((a: number, b: number) => number)[] | ((a: number, b: number) => number);
            if (rule.length === 1 && Array.isArray(rule[0])) {
                f = rule[0] as ((a: number, b: number) => number)[];
            } else if (rule.length > 1) {
                f = rule as ((a: number, b: number) => number)[];
            } else {
                f = rule[0] as ((z: ChalkboardComplex) => ChalkboardComplex);
            }
            if (Array.isArray(f)) {
                if (f.length !== 2 || f[0].length !== 2 || f[1].length !== 2) throw new TypeError("Chalkboard.comp.define: If 'rule' is an array, it must be an array of two functions of two variables.");
                if (typeof f[0](0, 0) !== "number" || typeof f[1](0, 0) !== "number") throw new TypeError("Chalkboard.comp.define: If 'rule' is an array, the functions in it must return real numbers.");
                return { rule: f, field: "comp", type: "vector2d" } as ChalkboardFunction;
            } else {
                if (f.length !== 1) throw new TypeError("Chalkboard.comp.define: If 'rule' is a function, it must be a function of one variable.");
                const F = f as (z: ChalkboardComplex) => ChalkboardComplex;
                if (!F(Chalkboard.comp.init(0, 0)).hasOwnProperty("a") || !F(Chalkboard.comp.init(0, 0)).hasOwnProperty("b")) throw new TypeError("Chalkboard.comp.define: If 'rule' is a function, it must return a complex number.");
                return { rule: [(a: number, b: number) => F(Chalkboard.comp.init(a, b)).a, (a: number, b: number) => F(Chalkboard.comp.init(a, b)).b], field: "comp", type: "vector2d" } as ChalkboardFunction;
            }
        };

        /**
         * Calculates the distance between two complex numbers.
         * @param {ChalkboardComplex | number} comp1 - The first complex number
         * @param {ChalkboardComplex | number} comp2 - The second complex number
         * @returns {ChalkboardComplex}
         * @example
         * // Returns 5 (distance from origin to 3+4i)
         * const distance = Chalkboard.comp.dist(Chalkboard.comp.init(0, 0), Chalkboard.comp.init(3, 4));
         */
        export const dist = (comp1: ChalkboardComplex | number, comp2: ChalkboardComplex | number): number => {
            if (typeof comp1 === "number") comp1 = Chalkboard.comp.init(comp1, 0);
            if (typeof comp2 === "number") comp2 = Chalkboard.comp.init(comp2, 0);
            return Chalkboard.real.sqrt((comp2.a - comp1.a) * (comp2.a - comp1.a) + (comp2.b - comp1.b) * (comp2.b - comp1.b));
        };

        /**
         * Calculates the distance squared between two complex numbers.
         * @param {ChalkboardComplex | number} comp1 - The first complex number
         * @param {ChalkboardComplex | number} comp2 - The second complex number
         * @returns {ChalkboardComplex}
         * @example
         * // Returns 25 (squared distance from origin to 3+4i)
         * const distanceSquared = Chalkboard.comp.distsq(Chalkboard.comp.init(0, 0), Chalkboard.comp.init(3, 4));
         */
        export const distsq = (comp1: ChalkboardComplex | number, comp2: ChalkboardComplex | number): number => {
            if (typeof comp1 === "number") comp1 = Chalkboard.comp.init(comp1, 0);
            if (typeof comp2 === "number") comp2 = Chalkboard.comp.init(comp2, 0);
            return (comp2.a - comp1.a) * (comp2.a - comp1.a) + (comp2.b - comp1.b) * (comp2.b - comp1.b);
        };

        /**
         * Calculates the division of two complex numbers or functions.
         * @param {ChalkboardComplex | number | ChalkboardFunction} comp1 - The first complex number or function
         * @param {ChalkboardComplex | number | ChalkboardFunction} comp2 - The second complex number or function
         * @returns {ChalkboardComplex | ChalkboardFunction}
         * @example
         * // Returns 0.44 + 0.08i (approximate)
         * const quotient = Chalkboard.comp.div(Chalkboard.comp.init(2, 1), Chalkboard.comp.init(4, 2));
         */
        export const div = (comp1: ChalkboardComplex | number | ChalkboardFunction, comp2: ChalkboardComplex | number | ChalkboardFunction): ChalkboardComplex | ChalkboardFunction => {
            if (typeof comp1 === "number") comp1 = Chalkboard.comp.init(comp1, 0);
            if (typeof comp2 === "number") comp2 = Chalkboard.comp.init(comp2, 0);
            if (comp1.hasOwnProperty("a") && comp1.hasOwnProperty("b") && comp2.hasOwnProperty("a") && comp2.hasOwnProperty("b")) {
                const z1 = comp1 as ChalkboardComplex;
                const z2 = comp2 as ChalkboardComplex;
                const d = z2.a * z2.a + z2.b * z2.b;
                return Chalkboard.comp.init((z1.a * z2.a + z1.b * z2.b) / d, (z1.b * z2.a - z1.a * z2.b) / d);
            } else if (comp1.hasOwnProperty("rule") || comp2.hasOwnProperty("rule")) {
                if ((comp1 as ChalkboardFunction).field !== "comp" || (comp2 as ChalkboardFunction).field !== "comp") throw new TypeError("Chalkboard.comp.div: Properties 'field' of 'comp1' and 'comp2' must be 'comp'.");
                const f1 = (comp1 as ChalkboardFunction).rule as [(a: number, b: number) => number, (a: number, b: number) => number];
                const f2 = (comp2 as ChalkboardFunction).rule as [(a: number, b: number) => number, (a: number, b: number) => number];
                const g = [
                    (a: number, b: number) => {
                        const d = f2[0](a, b) * f2[0](a, b) + f2[1](a, b) * f2[1](a, b);
                        return (f1[0](a, b) * f2[0](a, b) + f1[1](a, b) * f2[1](a, b)) / d;
                    },
                    (a: number, b: number) => {
                        const d = f2[0](a, b) * f2[0](a, b) + f2[1](a, b) * f2[1](a, b);
                        return (f1[1](a, b) * f2[0](a, b) - f1[0](a, b) * f2[1](a, b)) / d;
                    }
                ];
                return Chalkboard.comp.define(...g);
            }
            throw new TypeError("Chalkboard.comp.div: Parameters 'comp1' and 'comp2' must be of type ChalkboardComplex, number, or ChalkboardFunction.");
        };

        /**
         * Calculates Euler's formula (the complex exponential) for the inputted radian.
         * @param {number} rad
         * @returns {ChalkboardComplex}
         * @example
         * // Returns 0.5403 + 0.8415i (approximate - e^(iπ/4))
         * const e = Chalkboard.comp.Euler(Chalkboard.PI(0.25));
         */
        export const Euler = (rad: number): ChalkboardComplex => {
            return Chalkboard.comp.init(Chalkboard.trig.cos(rad), Chalkboard.trig.sin(rad));
        };

        /**
         * Returns the imaginary part of a complex number or complex function.
         * @param {ChalkboardFunction | ChalkboardComplex} funcORcomp
         * @returns {Function | ChalkboardComplex}
         * @example
         * // Returns 3
         * const im = Chalkboard.comp.Im(Chalkboard.comp.init(2, 3));
         */
        export const Im = (funcORcomp: ChalkboardFunction | ChalkboardComplex): Function | number => {
            if (funcORcomp.hasOwnProperty("rule")) {
                return ((funcORcomp as ChalkboardFunction).rule as ([(a: number, b: number) => number, (a: number, b: number) => number]))[1];
            } else {
                return (funcORcomp as ChalkboardComplex).b;
            }
        };

        /**
         * Initializes a new complex number
         * @param {number} a - The real part
         * @param {number} [b=0] - The imaginary part
         * @returns {ChalkboardComplex}
         * @example
         * const z = Chalkboard.comp.init(2, 3); // Returns 2 + 3i
         * const w = Chalkboard.comp.init(2); // Returns 2 + 0i also known as 2
         * const i = Chalkboard.comp.init(0, 1); // Returns i
         */
        export const init = (a: number, b: number = 0): ChalkboardComplex => {
            return { a: a, b: b };
        };

        /**
         * Calculates the inverse of a complex number.
         * @param {ChalkboardComplex} comp - The complex number
         * @returns {ChalkboardComplex}
         * @example
         * // Returns 0.2 - 0.1i
         * const inverse = Chalkboard.comp.invert(Chalkboard.comp.init(4, 2));
         */
        export const invert = (comp: ChalkboardComplex): ChalkboardComplex => {
            return Chalkboard.comp.init(comp.a / Chalkboard.comp.magsq(comp), -comp.b / Chalkboard.comp.magsq(comp));
        };

        /**
         * Calculates the complex logarithm of a complex number.
         * @param {ChalkboardComplex} comp - The complex number
         * @returns {ChalkboardComplex}
         * @example
         * // Returns 1.6094 + 0.9828i (approximate)
         * const log = Chalkboard.comp.ln(Chalkboard.comp.init(3, 4));
         */
        export const ln = (comp: ChalkboardComplex): ChalkboardComplex => {
            return Chalkboard.comp.init(Chalkboard.real.ln(Chalkboard.comp.mag(comp)), Chalkboard.trig.arctan2(comp.b, comp.a));
        };

        /**
         * Calculates the magnitude (or modulus) of a complex number.
         * @param {ChalkboardComplex} comp - The complex number
         * @returns {number}
         * @example
         * // Returns 5
         * const r = Chalkboard.comp.mag(Chalkboard.comp.init(3, 4));
         */
        export const mag = (comp: ChalkboardComplex): number => {
            return Chalkboard.real.sqrt(comp.a * comp.a + comp.b * comp.b);
        };

        /**
         * Calculates a complex number with the inputted magnitude.
         * @param {ChalkboardComplex} comp - The complex number
         * @param {number} num - The magnitude to set to
         * @returns {ChalkboardComplex}
         * @example
         * // Returns 6 + 8i (scaled to magnitude 10)
         * const normscl = Chalkboard.comp.magset(Chalkboard.comp.init(3, 4), 10);
         */
        export const magset = (comp: ChalkboardComplex, num: number): ChalkboardComplex => {
            return Chalkboard.comp.scl(Chalkboard.comp.normalize(comp), num) as ChalkboardComplex;
        };

        /**
         * Calculates the magnitude (or modulus) squared of a complex number.
         * @param {ChalkboardComplex} comp - The complex number
         * @returns {number}
         * @example
         * // Returns 25
         * const r2 = Chalkboard.comp.magsq(Chalkboard.comp.init(3, 4));
         */
        export const magsq = (comp: ChalkboardComplex): number => {
            return comp.a * comp.a + comp.b * comp.b;
        };

        /**
         * Calculates the multiplication of two complex numbers or functions.
         * @param {ChalkboardComplex | number | ChalkboardFunction} comp1 - The first complex number or function
         * @param {ChalkboardComplex | number | ChalkboardFunction} comp2 - The second complex number or function
         * @returns {ChalkboardComplex | ChalkboardFunction}
         * @example
         * // Returns -5 + 10i
         * const product = Chalkboard.comp.mul(Chalkboard.comp.init(2, 3), Chalkboard.comp.init(1, 2));
         */
        export const mul = (comp1: ChalkboardComplex | number | ChalkboardFunction, comp2: ChalkboardComplex | number | ChalkboardFunction): ChalkboardComplex | ChalkboardFunction => {
            if (typeof comp1 === "number") comp1 = Chalkboard.comp.init(comp1, 0);
            if (typeof comp2 === "number") comp2 = Chalkboard.comp.init(comp2, 0);
            if (comp1.hasOwnProperty("a") && comp1.hasOwnProperty("b") && comp2.hasOwnProperty("a") && comp2.hasOwnProperty("b")) {
                const z1 = comp1 as ChalkboardComplex;
                const z2 = comp2 as ChalkboardComplex;
                return Chalkboard.comp.init(z1.a * z2.a - z1.b * z2.b, z1.a * z2.b + z1.b * z2.a);
            } else if (comp1.hasOwnProperty("rule") || comp2.hasOwnProperty("rule")) {
                if ((comp1 as ChalkboardFunction).field !== "comp" || (comp2 as ChalkboardFunction).field !== "comp") throw new TypeError("Chalkboard.comp.mul: Properties 'field' of 'comp1' and 'comp2' must be 'comp'.");
                const f1 = (comp1 as ChalkboardFunction).rule as [(a: number, b: number) => number, (a: number, b: number) => number];
                const f2 = (comp2 as ChalkboardFunction).rule as [(a: number, b: number) => number, (a: number, b: number) => number];
                const g = [(a: number, b: number) => f1[0](a, b) * f2[0](a, b) - f1[1](a, b) * f2[1](a, b), (a: number, b: number) => f1[0](a, b) * f2[1](a, b) + f1[1](a, b) * f2[0](a, b)];
                return Chalkboard.comp.define(...g);
            }
            throw new TypeError("Chalkboard.comp.mul: Parameters 'comp1' and 'comp2' must be of type ChalkboardComplex, number, or ChalkboardFunction.");
        };

        /**
         * Calculates the negation of a complex number or function.
         * @param {ChalkboardComplex | number | ChalkboardFunction} comp - The complex number or function
         * @returns {ChalkboardComplex | ChalkboardFunction}
         * @example
         * // Returns -2 - 3i
         * const negated = Chalkboard.comp.negate(Chalkboard.comp.init(2, 3));
         */
        export const negate = (comp: ChalkboardComplex | number | ChalkboardFunction): ChalkboardComplex | ChalkboardFunction => {
            if (typeof comp === "number") comp = Chalkboard.comp.init(comp, 0);
            if (comp.hasOwnProperty("a") && comp.hasOwnProperty("b")) {
                const z = comp as ChalkboardComplex;
                return Chalkboard.comp.init(-z.a, -z.b);
            } else if (comp.hasOwnProperty("rule")) {
                if ((comp as ChalkboardFunction).field !== "comp") throw new TypeError("Chalkboard.comp.negate: Property 'field' of 'comp' must be 'comp'.");
                const f = (comp as ChalkboardFunction).rule as ((a: number, b: number) => number)[];
                const g = [(a: number, b: number) => -f[0](a, b), (a: number, b: number) => -f[1](a, b)];
                return Chalkboard.comp.define(...g);
            }
            throw new TypeError("Chalkboard.comp.negate: Parameter 'comp' must be of type ChalkboardComplex, number, or ChalkboardFunction.");
        };

        /**
         * Calculates the normalization of a complex number.
         * @param {ChalkboardComplex} comp - The complex number
         * @returns {ChalkboardComplex}
         * @example
         * // Returns 0.6 + 0.8i
         * const unit = Chalkboard.comp.normalize(Chalkboard.comp.init(3, 4));
         */
        export const normalize = (comp: ChalkboardComplex): ChalkboardComplex => {
            return Chalkboard.comp.init(comp.a / Chalkboard.comp.mag(comp), comp.b / Chalkboard.comp.mag(comp));
        };

        /**
         * Parses, simplifies, and optionally evaluates a complex number expression.
         * @param {string} expr - The complex number expression to parse
         * @param {Record<string, number>} [config.values] - Optional object mapping variable names to values
         * @param {number} [config.roundTo] - Optional number of decimal places to round the result to
         * @param {boolean} [config.returnAST=false] - If true, returns an abstract syntax tree (AST) instead of a string
         * @param {boolean} [config.returnJSON=false] - If true, returns an AST in JSON instead of a string
         * @param {boolean} [config.returnLaTeX=false] - If true, returns LaTeX code instead of a string
         * @returns {string | ChalkboardComplex | { type: string, [key: string]: any }}
         */
        export const parse = (
            expr: string,
            config: {
                values?: Record<string, ChalkboardComplex>,
                roundTo?: number,
                returnAST?: boolean,
                returnJSON?: boolean,
                returnLaTeX?: boolean
            } = { returnAST: false, returnJSON: false, returnLaTeX: false }
        ): string | ChalkboardComplex | { type: string, [key: string]: any } => {
            const tokenize = (input: string): string[] => {
                const tokens: string[] = [];
                let i = 0;
                const registered = ["sin", "cos", "tan", "abs", "sqrt", "log", "ln", "exp", "min", "max"];
                const isFunction = (name: string): boolean => registered.includes(name) || Chalkboard.REGISTRY[name] !== undefined;
                while (i < input.length) {
                    const ch = input[i];
                    if (/\s/.test(ch)) {
                        i++;
                        continue;
                    }
                    if ("+-*/(),".indexOf(ch) !== -1) {
                        tokens.push(ch);
                        i++;
                        if (ch === ")" && i < input.length && (/[a-zA-Z0-9_i]/.test(input[i]))) tokens.push("*");
                    } else if (ch === "^") {
                        tokens.push(ch);
                        i++;
                        if (i < input.length && input[i] === "-") {
                            let num = "-";
                            i++;
                            while (i < input.length && /[0-9.]/.test(input[i])) {
                                num += input[i++];
                            }
                            if (num !== "-") {
                                tokens.push(num);
                            } else {
                                tokens.push("-");
                            }
                        }
                    } else if (ch === "i" && (i === 0 || !/[a-zA-Z0-9_]/.test(input[i - 1]))) {
                        tokens.push("i");
                        i++;
                        if (i < input.length && (/[a-zA-Z0-9_(]/.test(input[i]))) tokens.push("*");
                    } else if (/[0-9]/.test(ch) || (ch === "." && /[0-9]/.test(input[i + 1]))) {
                        let num = "";
                        let hasDecimal = false;
                        while (i < input.length && ((/[0-9]/.test(input[i])) || (input[i] === "." && !hasDecimal))) {
                            if (input[i] === ".") hasDecimal = true;
                            num += input[i++];
                        }
                        tokens.push(num);
                        if (i < input.length && input[i] === "i") {
                            tokens.push("*");
                            tokens.push("i");
                            i++;
                        }
                        if (i < input.length && (/[a-zA-Z_]/.test(input[i]) || input[i] === "(")) tokens.push("*");
                    } else if (/[a-zA-Z_]/.test(ch)) {
                        let name = "";
                        while (i < input.length && /[a-zA-Z0-9_]/.test(input[i])) {
                            name += input[i++];
                        }
                        tokens.push(name);
                        if (i < input.length && input[i] === "(") {
                            if (!isFunction(name)) {
                                tokens.push("*");
                            }
                        } else if (i < input.length && (/[a-zA-Z_]/.test(input[i]))) {
                            tokens.push("*");
                        }
                    } else {
                        throw new Error(`Chalkboard.comp.parse: Unexpected character ${ch}`);
                    }
                }
                return tokens;
            };
            const parseTokens = (tokens: string[]): { type: string, [key: string]: any } => {
                let pos = 0;
                const peek = (): string => tokens[pos] || "";
                const consume = (token?: string): string => {
                    if (token && tokens[pos] !== token) throw new Error(`Chalkboard.comp.parse: Expected token '${token}' but found '${tokens[pos]}'`);
                    return tokens[pos++];
                };
                const parseExpression = (): { type: string, [key: string]: any } => parseAdditive();
                const parseAdditive = (): { type: string, [key: string]: any } => {
                    let node = parseMultiplicative();
                    while (peek() === "+" || peek() === "-") {
                        const op = consume();
                        const right = parseMultiplicative();
                        node = { type: op === "+" ? "add" : "sub", left: node, right };
                    }
                    return node;
                };
                const parseMultiplicative = (): { type: string, [key: string]: any } => {
                    let node = parseUnary();
                    while (peek() === "*" || peek() === "/") {
                        const op = consume();
                        const right = parseUnary();
                        node = { type: op === "*" ? "mul" : "div", left: node, right };
                    }
                    return node;
                };
                const parseUnary = (): { type: string, [key: string]: any } => {
                    if (peek() === "-") {
                        consume("-");
                        return { type: "neg", expr: parseExponent() }; 
                    } else if (peek() === "+") {
                        consume("+");
                        return parseExponent();
                    }
                    return parseExponent();
                };
                const parseExponent = (): { type: string, [key: string]: any } => {
                    let node = parsePrimary();
                    if (peek() === "^") {
                        consume("^");
                        const right = parseExponent(); 
                        node = { type: "pow", base: node, exponent: right };
                    }
                    return node;
                };
                const parsePrimary = (): { type: string, [key: string]: any } => {
                    const token = peek();
                    if (/^-?[0-9]/.test(token) || /^-?\.[0-9]/.test(token)) {
                        consume();
                        return { type: "num", value: parseFloat(token) };
                    }
                    if (token === "i") {
                        consume();
                        return { type: "complex", a: 0, b: 1 };
                    }
                    if (/^[a-zA-Z_]/.test(token)) {
                        const name = consume();
                        if (peek() === "(") {
                            consume("(");
                            const args: { type: string, [key: string]: any }[] = [];
                            if (peek() !== ")") {
                                args.push(parseExpression());
                                while (peek() === ",") {
                                    consume(",");
                                    args.push(parseExpression());
                                }
                            }
                            consume(")");
                            return { type: "func", name, args };
                        }
                        return { type: "var", name };
                    }
                    if (token === "(") {
                        consume("(");
                        const node = parseExpression();
                        consume(")");
                        return node;
                    }
                    throw new Error(`Chalkboard.comp.parse: Unexpected token ${token}`);
                };
                const ast = parseExpression();
                if (pos < tokens.length) throw new Error(`Chalkboard.comp.parse: Unexpected token ${tokens[pos]}`);
                return ast;
            };
            const evaluateNode = (node: { type: string, [key: string]: any }, values: Record<string, ChalkboardComplex>): ChalkboardComplex => {
                switch (node.type) {
                    case "num": {
                        return Chalkboard.comp.init(node.value, 0);
                    }
                    case "complex": {
                        return Chalkboard.comp.init(node.a, node.b);
                    }
                    case "var": {
                        const varname = node.name;
                        if (varname in values) return values[varname];
                        for (let i = 1; i < varname.length; i++) {
                            const left = varname.substring(0, i);
                            const right = varname.substring(i);
                            if (left in values) {
                                try {
                                    const rightResult = evaluateNode({ type: "var", name: right }, values);
                                    return Chalkboard.comp.mul(values[left], rightResult) as ChalkboardComplex;
                                } catch {
                                    continue;
                                }
                            }
                        }
                        throw new Error(`Chalkboard.comp.parse: Variable '${varname}' not defined in values`);
                    }
                    case "add": {
                        return Chalkboard.comp.add(evaluateNode(node.left, values), evaluateNode(node.right, values)) as ChalkboardComplex;
                    }
                    case "sub": {
                        return Chalkboard.comp.sub(evaluateNode(node.left, values), evaluateNode(node.right, values)) as ChalkboardComplex;
                    }
                    case "mul": {
                        return Chalkboard.comp.mul(evaluateNode(node.left, values), evaluateNode(node.right, values)) as ChalkboardComplex;
                    }
                    case "div": {
                        return Chalkboard.comp.div(evaluateNode(node.left, values), evaluateNode(node.right, values)) as ChalkboardComplex;
                    }
                    case "pow": {
                        const base = evaluateNode(node.base, values);
                        const exponent = evaluateNode(node.exponent, values);
                        if (exponent.b === 0) {
                            return Chalkboard.comp.pow(base, exponent.a) as ChalkboardComplex;
                        } else {
                            throw new Error("Chalkboard.comp.parse: Complex exponentiation with complex exponent not supported");
                        }
                    }
                    case "neg": {
                        return Chalkboard.comp.negate(evaluateNode(node.expr, values)) as ChalkboardComplex;
                    }
                    case "func": {
                        const funcName = node.name.toLowerCase();
                        const args = node.args.map((arg: { type: string, [key: string]: any }) => evaluateNode(arg, values));
                        if (Chalkboard.REGISTRY && Chalkboard.REGISTRY[funcName]) {
                            try {
                                const realArgs = args.map((arg: { type: string, [key: string]: any }) => {
                                    if (arg.b !== 0) throw new Error("Complex argument in real function");
                                    return arg.a;
                                });
                                const result = Chalkboard.REGISTRY[funcName](...realArgs);
                                return Chalkboard.comp.init(result, 0);
                            } catch (e) {}
                        }
                        switch (funcName) {
                            case "conj": {
                                return Chalkboard.comp.conjugate(args[0]) as ChalkboardComplex;
                            }
                            case "conjugate": {
                                return Chalkboard.comp.conjugate(args[0]) as ChalkboardComplex;
                            }
                            case "mag": {
                                return Chalkboard.comp.init(Chalkboard.comp.mag(args[0]), 0);
                            }
                            case "arg": {
                                return Chalkboard.comp.init(Chalkboard.comp.arg(args[0]), 0);
                            }
                            case "re": {
                                return Chalkboard.comp.init(Chalkboard.comp.Re(args[0]) as number, 0);
                            }
                            case "im": {
                                return Chalkboard.comp.init(Chalkboard.comp.Im(args[0]) as number, 0);
                            }
                            case "ln": {
                                return Chalkboard.comp.ln(args[0]);
                            }
                            case "invert": {
                                return Chalkboard.comp.invert(args[0]);
                            }
                            case "sq": {
                                return Chalkboard.comp.sq(args[0]) as ChalkboardComplex;
                            }
                            case "sqrt": {
                                return Chalkboard.comp.sqrt(args[0]) as ChalkboardComplex;
                            }
                            case "pow": {
                                if (args.length < 2) throw new Error("Chalkboard.comp.parse: Function pow requires two arguments");
                                return Chalkboard.comp.pow(args[0], args[1].a) as ChalkboardComplex;
                            }
                            case "root": {
                                if (args.length < 2) throw new Error("Chalkboard.comp.parse: Function root requires two arguments");
                                const index = args[1].a;
                                if (!Number.isInteger(index) || index <= 0) throw new Error("Chalkboard.comp.parse: Root index must be a positive integer");
                                return Chalkboard.comp.root(args[0], index)[0];
                            }
                            default: {
                                throw new Error(`Chalkboard.comp.parse: Unknown function ${node.name}`);
                            }
                        }
                    }
                }
                throw new Error(`Chalkboard.comp.parse: Unknown node type ${node.type}`);
            };
            const nodeToString = (node: { type: string, [key: string]: any }): string => {
                switch (node.type) {
                    case "num": {
                        return node.value.toString();
                    }
                    case "complex": {
                        if (node.a === 0 && node.b === 1) return "i";
                        if (node.a === 0 && node.b === -1) return "-i";
                        if (node.a === 0) return node.b + "i";
                        if (node.b === 0) return node.a.toString();
                        return node.b > 0 ? `${node.a} + ${node.b}i` : `${node.a} - ${-node.b}i`;
                    }
                    case "var": {
                        return node.name;
                    }
                    case "add": {
                        return `${nodeToString(node.left)} + ${nodeToString(node.right)}`;
                    }
                    case "sub": {
                        const rightStr = node.right.type === "add" || node.right.type === "sub" ? `(${nodeToString(node.right)})` : nodeToString(node.right);
                        return `${nodeToString(node.left)} - ${rightStr}`;
                    }
                    case "mul": {
                        const leftMul = (node.left.type === "add" || node.left.type === "sub") ? `(${nodeToString(node.left)})` : nodeToString(node.left);
                        const rightMul = (node.right.type === "add" || node.right.type === "sub") ? `(${nodeToString(node.right)})` : nodeToString(node.right);
                        if (node.left.type === "num" && node.left.value === -1 && node.right.type === "var") return `-${nodeToString(node.right)}`;
                        if ((node.left.type === "num" || node.left.type === "complex") && (node.right.type === "var" || (node.right.type === "complex" && node.right.a === 0 && node.right.b === 1))) {
                            return `${leftMul}${rightMul}`;
                        } else {
                            return `${leftMul} * ${rightMul}`;
                        }
                    }
                    case "div": {
                        const powNode = { type: "pow", base: node.right, exponent: { type: "num", value: -1 } };
                        const mulNode = { type: "mul", left: node.left, right: powNode };
                        return nodeToString(mulNode);
                    }
                    case "pow": {
                        const baseStr = (node.base.type !== "num" && node.base.type !== "var" && node.base.type !== "complex") ? `(${nodeToString(node.base)})` : nodeToString(node.base);
                        const expStr = (node.exponent.type !== "num" && node.exponent.type !== "var" && node.exponent.type !== "complex") ? `(${nodeToString(node.exponent)})` : nodeToString(node.exponent);
                        return `${baseStr}^${expStr}`;
                    }
                    case "neg": {
                        const exprStr = (node.expr.type !== "num" && node.expr.type !== "var" && node.expr.type !== "complex") ? `(${nodeToString(node.expr)})` : nodeToString(node.expr);
                        return `-${exprStr}`;
                    }
                    case "func": {
                        return `${node.name}(${node.args.map((arg: { type: string, [key: string]: any }) => nodeToString(arg)).join(", ")})`;
                    }
                }
                return "";
            };
            const nodeToLaTeX = (node: { type: string, [key: string]: any }): string => {
                switch (node.type) {
                    case "num": {
                        return node.value.toString();
                    }
                    case "complex": {
                        const re = node.a !== 0 ? node.a.toString() : "";
                        const im = node.b !== 0 ? (node.b === 1 ? "i" : node.b === -1 ? "-i" : `${node.b}i`) : "";
                        if (re && im) {
                            return node.b > 0 ? `${re} + ${im}` : `${re} - ${im.slice(1)}`;
                        }
                        return re || im || "0";
                    }
                    case "var": {
                        return node.name;
                    }
                    case "add": {
                        return `${nodeToLaTeX(node.left)} + ${nodeToLaTeX(node.right)}`;
                    }
                    case "sub": {
                        return `${nodeToLaTeX(node.left)} - ${nodeToLaTeX(node.right)}`;
                    }
                    case "mul": {
                        return `${nodeToLaTeX(node.left)}${nodeToLaTeX(node.right)}`;
                    }
                    case "div": {
                        return `\\frac{${nodeToLaTeX(node.left)}}{${nodeToLaTeX(node.right)}}`;
                    }
                    case "pow": {
                        return `${nodeToLaTeX(node.base)}^{${nodeToLaTeX(node.exponent)}}`;
                    }
                    case "neg": {
                        return `-${nodeToLaTeX(node.expr)}`;
                    }
                    case "func": {
                        return `\\mathrm{${node.name}}\\left(${node.args.map(nodeToLaTeX).join(", ")}\\right)`;
                    }
                    default: {
                        throw new Error(`Chalkboard.comp.parse: Unknown node type ${node.type}`);
                    }
                }
            };
            const areEqualVars = (a: { type: string, [key: string]: any }, b: { type: string, [key: string]: any }): boolean => {
                if (a.type === "var" && b.type === "var") return a.name === b.name;
                if (a.type === "complex" && b.type === "complex") return a.a === b.a && a.b === b.b;
                return JSON.stringify(a) === JSON.stringify(b);
            };
            const simplifyNode = (node: { type: string, [key: string]: any }): { type: string, [key: string]: any } => {
                const isRealOnly = (node: { type: string, [key: string]: any }): boolean => {
                    if (node.type === "complex") return node.b === 0;
                    if (node.type === "num") return true;
                    if (node.type === "var") return false;
                    if (node.type === "add" || node.type === "sub" || node.type === "mul" || node.type === "div" || node.type === "pow") return isRealOnly(node.left) && isRealOnly(node.right);
                    if (node.type === "neg") return isRealOnly(node.expr);
                    return false;
                };
                switch (node.type) {
                    case "num": {
                        return { type: "complex", a: node.value, b: 0 };
                    }
                    case "complex": {
                        return node;
                    }
                    case "var": {
                        return node;
                    }
                    case "add": {
                        const leftAdd = simplifyNode(node.left);
                        const rightAdd = simplifyNode(node.right);
                        if (leftAdd.type === "complex" && rightAdd.type === "complex") return { type: "complex", a: leftAdd.a + rightAdd.a, b: leftAdd.b + rightAdd.b };
                        if (leftAdd.type === "complex" && leftAdd.a === 0 && leftAdd.b === 0) return rightAdd;
                        if (rightAdd.type === "complex" && rightAdd.a === 0 && rightAdd.b === 0) return leftAdd;
                        if (areEqualVars(leftAdd, rightAdd)) return { type: "mul", left: { type: "num", value: 2 }, right: leftAdd };
                        return { type: "add", left: leftAdd, right: rightAdd };
                    }
                    case "sub": {
                        const leftSub = simplifyNode(node.left);
                        const rightSub = simplifyNode(node.right);
                        if (leftSub.type === "complex" && rightSub.type === "complex") return { type: "complex", a: leftSub.a - rightSub.a, b: leftSub.b - rightSub.b };
                        if (rightSub.type === "complex" && rightSub.a === 0 && rightSub.b === 0) return leftSub;
                        if (leftSub.type === "complex" && leftSub.a === 0 && leftSub.b === 0) return { type: "neg", expr: rightSub };
                        if (areEqualVars(leftSub, rightSub)) return { type: "complex", a: 0, b: 0 };
                        return { type: "sub", left: leftSub, right: rightSub };
                    }
                    case "mul": {
                        const leftMul = simplifyNode(node.left);
                        const rightMul = simplifyNode(node.right);
                        if ((leftMul.type === "add" || leftMul.type === "sub") && (rightMul.type === "add" || rightMul.type === "sub")) {
                            const extractTerms = (node: any): any[] => {
                                if (node.type === "add") {
                                    return [...extractTerms(node.left), ...extractTerms(node.right)];
                                } else if (node.type === "sub") {
                                    const rightTerms = extractTerms(node.right).map(term => ({ 
                                        type: "neg", 
                                        expr: term 
                                    }));
                                    return [...extractTerms(node.left), ...rightTerms];
                                } else {
                                    return [node];
                                }
                            };
                            const leftTerms = extractTerms(leftMul);
                            const rightTerms = extractTerms(rightMul);
                            const products = [];
                            for (const leftTerm of leftTerms) {
                                for (const rightTerm of rightTerms) {
                                    if (leftTerm.type === "neg" && rightTerm.type === "neg") {
                                        products.push(simplifyNode({ type: "mul", left: leftTerm.expr, right: rightTerm.expr }));
                                    } else if (leftTerm.type === "neg") {
                                        products.push(simplifyNode({ type: "neg", expr: { type: "mul", left: leftTerm.expr, right: rightTerm } }));
                                    } else if (rightTerm.type === "neg") {
                                        products.push(simplifyNode({ type: "neg", expr: { type: "mul", left: leftTerm, right: rightTerm.expr } }));
                                    } else {
                                        products.push(simplifyNode({ type: "mul", left: leftTerm, right: rightTerm }));
                                    }
                                }
                            }
                            let result = products[0];
                            for (let i = 1; i < products.length; i++) {
                                result = { 
                                    type: "add", 
                                    left: result, 
                                    right: products[i] 
                                };
                            }
                            return simplifyNode(result);
                        }
                        if (leftMul.type === "complex" && rightMul.type === "complex") return { type: "complex", a: leftMul.a * rightMul.a - leftMul.b * rightMul.b, b: leftMul.a * rightMul.b + leftMul.b * rightMul.a };
                        if ((leftMul.type === "complex" && leftMul.a === 0 && leftMul.b === 0) || (rightMul.type === "complex" && rightMul.a === 0 && rightMul.b === 0)) return { type: "complex", a: 0, b: 0 };
                        if (leftMul.type === "complex" && leftMul.a === 1 && leftMul.b === 0) return rightMul;
                        if (rightMul.type === "complex" && rightMul.a === 1 && rightMul.b === 0) return leftMul;
                        if (leftMul.type === "complex" && leftMul.a === 0 && leftMul.b === 1 && rightMul.type === "complex") return { type: "complex", a: -rightMul.b, b: rightMul.a };
                        return { type: "mul", left: leftMul, right: rightMul };
                    }
                    case "div": {
                        const leftDiv = simplifyNode(node.left);
                        const rightDiv = simplifyNode(node.right);
                        if (leftDiv.type === "add" || leftDiv.type === "sub") {
                            const left = { type: "div", left: leftDiv.left, right: JSON.parse(JSON.stringify(rightDiv)) };
                            const right = { type: "div", left: leftDiv.right, right: JSON.parse(JSON.stringify(rightDiv)) };
                            return { type: leftDiv.type, left: simplifyNode(left), right: simplifyNode(right) };
                        }
                        if (leftDiv.type === "complex" && rightDiv.type === "complex") {
                            const denominator = rightDiv.a * rightDiv.a + rightDiv.b * rightDiv.b;
                            if (denominator === 0) throw new Error("Chalkboard.comp.parse: Division by zero.");
                            return { type: "complex", a: (leftDiv.a * rightDiv.a + leftDiv.b * rightDiv.b) / denominator, b: (leftDiv.b * rightDiv.a - leftDiv.a * rightDiv.b) / denominator };
                        }
                        if (rightDiv.type === "complex" && rightDiv.a === 1 && rightDiv.b === 0) return leftDiv;
                        if (leftDiv.type === "complex" && leftDiv.a === 0 && leftDiv.b === 0) return { type: "complex", a: 0, b: 0 };
                        return { type: "div", left: leftDiv, right: rightDiv };
                    }
                    case "pow": {
                        const base = simplifyNode(node.base);
                        const exponent = simplifyNode(node.exponent);
                        if ((base.type === "add" || base.type === "sub") && exponent.type === "complex" && exponent.b === 0 && Number.isInteger(exponent.a)) {
                            if (exponent.a < 0) {
                                const absExpr = Math.abs(exponent.a);
                                if (absExpr === 1) {
                                    return { type: "pow", base: base, exponent: { type: "complex", a: -1, b: 0 } };
                                } else {
                                    const positiveExpr = { type: "pow", base, exponent: { type: "complex", a: absExpr, b: 0 } };
                                    const expanded = simplifyNode(positiveExpr);
                                    return { type: "pow", base: expanded, exponent: { type: "complex", a: -1, b: 0 } };
                                }
                            } else if (exponent.a > 0) {
                                const n = exponent.a;
                                const a = base.left;
                                const b = base.right;
                                const sign = base.type === "add" ? 1 : -1;
                                let result = null;
                                for (let k = 0; k <= n; k++) {
                                    const c = Chalkboard.numb.binomial(n, k);
                                    const leftPower = n - k === 0 ? { type: "complex", a: 1, b: 0 } : (n - k === 1 ? a : simplifyNode({ type: "pow", base: a, exponent: { type: "complex", a: n - k, b: 0 } }));
                                    const rightPower = k === 0 ? { type: "complex", a: 1, b: 0 } : (k === 1 ? (sign === 1 ? b : { type: "neg", expr: b }) : simplifyNode({ type: "pow", base: b, exponent: { type: "complex", a: k, b: 0 } }));
                                    const termSign = (sign === -1 && k % 2 === 1) ? -1 : 1;
                                    let term;
                                    if (k === 0) {
                                        term = leftPower;
                                    } else if (n - k === 0) {
                                        term = rightPower;
                                    } else {
                                        term = simplifyNode({ type: "mul", left: leftPower, right: rightPower });
                                    }
                                    if (c !== 1) {
                                        term = simplifyNode({ type: "mul", left: { type: "complex", a: termSign * c, b: 0 }, right: term });
                                    } else if (termSign === -1) {
                                        term = { type: "neg", expr: term };
                                    }
                                    if (result === null) {
                                        result = term;
                                    } else {
                                        result = simplifyNode({ type: "add", left: result, right: term });
                                    }
                                }
                                return result;
                            }
                        }
                        if (base.type === "complex" && exponent.type === "complex" && exponent.b === 0) {
                            const power = exponent.a;
                            if (power === 0) return { type: "complex", a: 1, b: 0 };
                            if (power === 1) return base;
                            if (base.a === 0 && base.b === 0 && power > 0) return { type: "complex", a: 0, b: 0 };
                            if (base.a === 1 && base.b === 0) return { type: "complex", a: 1, b: 0 };
                            if (base.a === 0 && base.b === 1) {
                                const mod4 = Math.floor(power) % 4;
                                if (mod4 === 0) return { type: "complex", a: 1, b: 0 };
                                if (mod4 === 1) return { type: "complex", a: 0, b: 1 };
                                if (mod4 === 2) return { type: "complex", a: -1, b: 0 };
                                if (mod4 === 3) return { type: "complex", a: 0, b: -1 };
                            }
                            if (Number.isInteger(power) && power > 1 && power <= 3) {
                                let result = base;
                                for (let i = 1; i < power; i++) {
                                    result = { type: "complex", a: result.a * base.a - result.b * base.b, b: result.a * base.b + result.b * base.a };
                                }
                                return result;
                            }
                        }
                        return { type: "pow", base, exponent };
                    }
                    case "neg": {
                        const expr = simplifyNode(node.expr);
                        if (expr.type === "complex") return { type: "complex", a: -expr.a, b: -expr.b };
                        if (expr.type === "neg") return expr.expr;
                        return { type: "neg", expr };
                    }
                    case "func": {
                        const args = node.args.map((arg: { type: string, [key: string]: any }) => simplifyNode(arg));
                        const funcName = node.name.toLowerCase();
                        if (args.every((arg: { type: string, [key: string]: any }) => arg.type === "complex")) {
                            try {
                                switch (funcName) {
                                    case "conj":
                                    case "conjugate":
                                        return { type: "complex", a: args[0].a, b: -args[0].b };
                                    case "mag":
                                        return { type: "complex", a: Math.sqrt(args[0].a * args[0].a + args[0].b * args[0].b), b: 0 };
                                    case "magsq":
                                        return { type: "complex", a: args[0].a * args[0].a + args[0].b * args[0].b, b: 0 };
                                    case "arg":
                                        return { type: "complex", a: Math.atan2(args[0].b, args[0].a), b: 0 };
                                    case "re":
                                        return { type: "complex", a: args[0].a, b: 0 };
                                    case "im":
                                        return { type: "complex", a: args[0].b, b: 0 };
                                    case "sqrt":
                                        if (args[0].b === 0 && args[0].a >= 0) {
                                            const z = Chalkboard.comp.sqrt(Chalkboard.comp.init(args[0].a, args[0].b)) as ChalkboardComplex;
                                            return { type: "complex", a: z.a, b: z.b };
                                        }
                                        break;
                                    case "sq":
                                        const z = Chalkboard.comp.sq(Chalkboard.comp.init(args[0].a, args[0].b)) as ChalkboardComplex;
                                        return { type: "complex", a: z.a, b: z.b };
                                }
                            } catch (e) {}
                        }
                        if (args.every((arg: { type: string, [key: string]: any }) => arg.type === "complex" && arg.b === 0)) {
                            try {
                                switch (funcName) {
                                    case "sin":
                                    case "cos":
                                    case "tan":
                                    case "log":
                                    case "ln":
                                    case "exp":
                                    case "abs":
                                        break;
                                }
                            } catch (e) {}
                        }
                        return { type: "func", name: node.name, args };
                    }
                }
                return node;
            };
            try {
                const tokens = tokenize(expr);
                const ast = parseTokens(tokens);
                if (config.values && Object.keys(config.values).length > 0) {
                    const result = evaluateNode(ast, config.values);
                    if (config.roundTo !== undefined) {
                        return Chalkboard.comp.init(Chalkboard.numb.roundTo(result.a, config.roundTo), Chalkboard.numb.roundTo(result.b, config.roundTo));
                    }
                    return result;
                }
                let simplified = simplifyNode(ast);
                let normalizedast = parseTokens(tokenize(nodeToString(simplified)));
                simplified = simplifyNode(normalizedast);
                simplified = simplifyNode(simplified);
                if (config.roundTo !== undefined) {
                    const roundNodes = (node: { type: string, [key: string]: any }): { type: string, [key: string]: any } => {
                        if (node.type === "num") return { ...node, value: Chalkboard.numb.roundTo(node.value, config.roundTo!) };
                        if (node.type === "complex") return { ...node, a: Chalkboard.numb.roundTo(node.a, config.roundTo!), b: Chalkboard.numb.roundTo(node.b, config.roundTo!) };
                        const n = Object.keys(node).length;
                        for (let i = 0; i < n; i++) {
                            const key = Object.keys(node)[i];
                            if (key !== "type" && node[key] && typeof node[key] === "object" && "type" in node[key]) node[key] = roundNodes(node[key]);
                        }
                        return node;
                    };
                    simplified = roundNodes(simplified);
                }
                if (config.returnAST) return simplified;
                if (config.returnJSON) return JSON.stringify(simplified);
                if (config.returnLaTeX) return nodeToLaTeX(simplified);
                return nodeToString(simplified);
            } catch (err) {
                if (err instanceof Error) {
                    throw new Error(`Chalkboard.comp.parse: Error parsing complex expression ${err.message}`);
                } else {
                    throw new Error(`Chalkboard.comp.parse: Error parsing complex expression ${String(err)}`);
                }
            }
        };

        /**
         * Calculates the exponentiation of a complex number or function.
         * @param {ChalkboardComplex | number | ChalkboardFunction} comp - The complex number or function
         * @param {number} num - The exponent
         * @returns {ChalkboardComplex | ChalkboardFunction}
         * @example
         * // Returns -11 + 2i
         * const pow = Chalkboard.comp.pow(Chalkboard.comp.init(2, 1), 3);
         */
        export const pow = (comp: ChalkboardComplex | number | ChalkboardFunction, num: number): ChalkboardComplex | ChalkboardFunction => {
            if (typeof comp === "number") comp = Chalkboard.comp.init(comp, 0);
            if (comp.hasOwnProperty("a") && comp.hasOwnProperty("b")) {
                const z = comp as ChalkboardComplex;
                const mag = Chalkboard.comp.mag(z);
                const arg = Chalkboard.comp.arg(z);
                return Chalkboard.comp.init(
                    (Chalkboard.real.pow(mag, num) as number) * Chalkboard.trig.cos(num * arg),
                    (Chalkboard.real.pow(mag, num) as number) * Chalkboard.trig.sin(num * arg)
                );
            } else if (comp.hasOwnProperty("rule")) {
                if ((comp as ChalkboardFunction).field !== "comp") throw new TypeError("Chalkboard.comp.pow: Property 'field' of 'comp' must be 'comp'.");
                const f = (comp as ChalkboardFunction).rule as ((a: number, b: number) => number)[];
                const g = [
                    (a: number, b: number) => {
                        const mag = Chalkboard.real.sqrt(f[0](a, b) * f[0](a, b) + f[1](a, b) * f[1](a, b));
                        const arg = Chalkboard.trig.arctan2(f[1](a, b), f[0](a, b));
                        return (Chalkboard.real.pow(mag, num) as number) * Chalkboard.trig.cos(num * arg);
                    },
                    (a: number, b: number) => {
                        const mag = Chalkboard.real.sqrt(f[0](a, b) * f[0](a, b) + f[1](a, b) * f[1](a, b));
                        const arg = Chalkboard.trig.arctan2(f[1](a, b), f[0](a, b));
                        return (Chalkboard.real.pow(mag, num) as number) * Chalkboard.trig.sin(num * arg);
                    }
                ];
                return Chalkboard.comp.define(...g);
            }
            throw new TypeError("Chalkboard.comp.pow: Parameter 'comp' must be of type ChalkboardComplex, number, or ChalkboardFunction.");
        };

        /**
         * Prints a complex number in the console.
         * @param {ChalkboardComplex} comp - The complex number
         * @returns {void}
         * @example
         * // Prints "2 + 3i" in the console
         * Chalkboard.comp.print(Chalkboard.comp.init(2, 3));
         */
        export const print = (comp: ChalkboardComplex): void => {
            console.log(Chalkboard.comp.toString(comp));
        };

        /**
         * Initializes a random complex number.
         * @param {number} [inf=0] - The lower bound
         * @param {number} [sup=1] - The upper bound
         * @returns {ChalkboardComplex}
         * @example
         * // Returns a random complex number with real and imaginary parts between 0 and 1
         * const z = Chalkboard.comp.random();
         */
        export const random = (inf: number = 0, sup: number = 1): ChalkboardComplex => {
            return Chalkboard.comp.init(Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup));
        };

        /**
         * Returns the real part of a complex function or a complex number.
         * @param {ChalkboardFunction | ChalkboardComplex} funcORcomp - The complex function or complex number
         * @returns {Function | ChalkboardComplex}
         * @example
         * // Returns 2
         * const re = Chalkboard.comp.Re(Chalkboard.comp.init(2, 3));
         */
        export const Re = (funcORcomp: ChalkboardFunction | ChalkboardComplex): Function | number => {
            if (funcORcomp.hasOwnProperty("rule")) {
                return ((funcORcomp as ChalkboardFunction).rule as ([(a: number, b: number) => number, (a: number, b: number) => number]))[0];
            } else {
                return (funcORcomp as ChalkboardComplex).a;
            }
        };

        /**
         * Calculates the reciprocal of a complex number or function.
         * @param {ChalkboardComplex | number | ChalkboardFunction} comp - The complex number or function
         * @returns {ChalkboardComplex | ChalkboardFunction}
         * @example
         * // Returns 0.5 + 0.3333i
         * const reciprocated = Chalkboard.comp.reciprocate(Chalkboard.comp.init(2, 3));
         */
        export const reciprocate = (comp: ChalkboardComplex | number | ChalkboardFunction): ChalkboardComplex | ChalkboardFunction => {
            if (typeof comp === "number") comp = Chalkboard.comp.init(comp, 0);
            if (comp.hasOwnProperty("a") && comp.hasOwnProperty("b")) {
                const z = comp as ChalkboardComplex;
                return Chalkboard.comp.init(1 / z.a, 1 / z.b);
            } else if (comp.hasOwnProperty("rule")) {
                if ((comp as ChalkboardFunction).field !== "comp") throw new TypeError("Chalkboard.comp.reciprocate: Property 'field' of 'comp' must be 'comp'.");
                const f = (comp as ChalkboardFunction).rule as ((a: number, b: number) => number)[];
                const g = [(a: number, b: number) => 1 / f[0](a, b), (a: number, b: number) => 1 / f[1](a, b)];
                return Chalkboard.comp.define(...g);
            }
            throw new TypeError("Chalkboard.comp.reciprocate: Parameter 'comp' must be of type ChalkboardComplex, number, or ChalkboardFunction.");
        };

        /**
         * Calculates the nth-root of a complex number.
         * @param {ChalkboardComplex} comp - The complex number
         * @param {number} [index=3] - The index
         * @returns {ChalkboardComplex}
         * @example
         * // Returns an array of cube roots of 8
         * const roots = Chalkboard.comp.root(Chalkboard.comp.init(8), 3);
         */
        export const root = (comp: ChalkboardComplex, index: number = 3): ChalkboardComplex[] => {
            const result = [];
            const r = Chalkboard.comp.mag(comp);
            const t = Chalkboard.comp.arg(comp);
            for (let i = 0; i < index; i++) {
                result.push(
                    Chalkboard.comp.init(
                        Chalkboard.real.root(r, index) * Chalkboard.trig.cos((t + Chalkboard.PI(2 * i)) / index),
                        Chalkboard.real.root(r, index) * Chalkboard.trig.sin((t + Chalkboard.PI(2 * i)) / index)
                    )
                );
            }
            return result;
        };

        /**
         * Calculates the rotation of a complex number.
         * @param {ChalkboardComplex} comp - The complex number
         * @param {number} rad - The radians to rotate by
         * @returns {ChalkboardComplex}
         * @example
         * // Returns 0 + 1i (1 rotated by π/2 radians)
         * const rotated = Chalkboard.comp.rotate(Chalkboard.comp.init(1, 0), Chalkboard.PI(0.5));
         */
        export const rotate = (comp: ChalkboardComplex, rad: number): ChalkboardComplex => {
            return Chalkboard.comp.init(
                Chalkboard.comp.mag(comp) * Chalkboard.trig.cos(Chalkboard.comp.arg(comp) + rad),
                Chalkboard.comp.mag(comp) * Chalkboard.trig.sin(Chalkboard.comp.arg(comp) + rad)
            );
        };

        /**
         * Calculates the rounding of a complex number.
         * @param {ChalkboardComplex} comp - The complex number
         * @returns {ChalkboardComplex}
         * @example
         * // Returns 2 + 3i
         * const rounded = Chalkboard.comp.round(Chalkboard.comp.init(1.9, 3.4));
         */
        export const round = (comp: ChalkboardComplex): ChalkboardComplex => {
            return Chalkboard.comp.init(Math.round(comp.a), Math.round(comp.b));
        };

        /**
         * Calculates the scalar multiplication of a complex number or function.
         * @param {ChalkboardComplex | number | ChalkboardFunction} comp - The complex number or function
         * @param {number} num - The scalar
         * @returns {ChalkboardComplex | ChalkboardFunction}
         * @example
         * // Returns 6 + 9i
         * const scaled = Chalkboard.comp.scl(Chalkboard.comp.init(2, 3), 3);
         */
        export const scl = (comp: ChalkboardComplex | number | ChalkboardFunction, num: number): ChalkboardComplex | ChalkboardFunction => {
            if (typeof comp === "number") comp = Chalkboard.comp.init(comp, 0);
            if (comp.hasOwnProperty("a") && comp.hasOwnProperty("b")) {
                const z = comp as ChalkboardComplex;
                return Chalkboard.comp.init(z.a * num, z.b * num);
            } else if (comp.hasOwnProperty("rule")) {
                if ((comp as ChalkboardFunction).field !== "comp") throw new TypeError("Chalkboard.comp.scl: Property 'field' of 'comp' must be 'comp'.");
                const f = (comp as ChalkboardFunction).rule as ((a: number, b: number) => number)[];
                const g = [(a: number, b: number) => f[0](a, b) * num, (a: number, b: number) => f[1](a, b) * num];
                return Chalkboard.comp.define(...g);
            }
            throw new TypeError("Chalkboard.comp.scl: Parameter 'comp' must be of type ChalkboardComplex, number, or ChalkboardFunction.");
        };

        /**
         * Calculates the slope of a complex number.
         * @param {ChalkboardComplex} comp - The complex number
         * @returns {number}
         * @example
         * // Returns 1.5
         * const m = Chalkboard.comp.slope(Chalkboard.comp.init(2, 3));
         */
        export const slope = (comp: ChalkboardComplex): number => {
            return comp.b / comp.a;
        };

        /**
         * Calculates the square of a complex number or function.
         * @param {ChalkboardComplex | number | ChalkboardFunction} comp - The complex number or function
         * @returns {ChalkboardComplex | ChalkboardFunction}
         * @example
         * // Returns -5 + 12i
         * const sq = Chalkboard.comp.sq(Chalkboard.comp.init(3, 2));
         */
        export const sq = (comp: ChalkboardComplex | number | ChalkboardFunction): ChalkboardComplex | ChalkboardFunction => {
            if (typeof comp === "number") comp = Chalkboard.comp.init(comp, 0);
            if (comp.hasOwnProperty("a") && comp.hasOwnProperty("b")) {
                const z = comp as ChalkboardComplex;
                return Chalkboard.comp.init(z.a * z.a - z.b * z.b, 2 * z.a * z.b);
            } else if (comp.hasOwnProperty("rule")) {
                if ((comp as ChalkboardFunction).field !== "comp") throw new TypeError("Chalkboard.comp.sq: Property 'field' of 'comp' must be 'comp'.");
                const f = (comp as ChalkboardFunction).rule as ((a: number, b: number) => number)[];
                const g = [(a: number, b: number) => f[0](a, b) * f[0](a, b) - f[1](a, b) * f[1](a, b), (a: number, b: number) => 2 * f[0](a, b) * f[1](a, b)];
                return Chalkboard.comp.define(...g);
            }
            throw new TypeError("Chalkboard.comp.sq: Parameter 'comp' must be of type ChalkboardComplex, number, or ChalkboardFunction.");
        };

        /**
         * Calculates the square root of a complex number or function.
         * @param {ChalkboardComplex | number | ChalkboardFunction} comp - The complex number or function
         * @returns {ChalkboardComplex | ChalkboardFunction}
         * @example
         * // Returns 2 + 0.5i
         * const sqrt = Chalkboard.comp.sqrt(Chalkboard.comp.init(4, 2));
         */
        export const sqrt = (comp: ChalkboardComplex | number | ChalkboardFunction): ChalkboardComplex | ChalkboardFunction => {
            if (typeof comp === "number") comp = Chalkboard.comp.init(comp, 0);
            if (comp.hasOwnProperty("a") && comp.hasOwnProperty("b")) {
                const z = comp as ChalkboardComplex;
                return Chalkboard.comp.init(
                    Chalkboard.real.sqrt((z.a + Chalkboard.real.sqrt(z.a * z.a + z.b * z.b)) / 2),
                    Chalkboard.numb.sgn(z.b) * Chalkboard.real.sqrt((-z.a + Chalkboard.real.sqrt(z.a * z.a + z.b * z.b)) / 2)
                );
            } else if (comp.hasOwnProperty("rule")) {
                if ((comp as ChalkboardFunction).field !== "comp") throw new TypeError("Chalkboard.comp.sqrt: Property 'field' of 'comp' must be 'comp'.");
                const f = (comp as ChalkboardFunction).rule as ((a: number, b: number) => number)[];
                const g = [
                    (a: number, b: number) => {
                        const re = f[0](a, b);
                        const im = f[1](a, b);
                        return Chalkboard.real.sqrt((re + Chalkboard.real.sqrt(re * re + im * im)) / 2);
                    },
                    (a: number, b: number) => {
                        const re = f[0](a, b);
                        const im = f[1](a, b);
                        return Chalkboard.numb.sgn(im) * Chalkboard.real.sqrt((-re + Chalkboard.real.sqrt(re * re + im * im)) / 2);
                    }
                ];
                return Chalkboard.comp.define(...g);
            }
            throw new TypeError("Chalkboard.comp.sqrt: Parameter 'comp' must be of type ChalkboardComplex, number, or ChalkboardFunction.");
        };

        /**
         * Calculates the subtraction of two complex numbers or functions.
         * @param {ChalkboardComplex | number | ChalkboardFunction} comp1 - The first complex number or function
         * @param {ChalkboardComplex | number | ChalkboardFunction} comp2 - The second complex number or function
         * @returns {ChalkboardComplex | ChalkboardFunction}
         * @example
         * // Returns 1 - 1i
         * const difference = Chalkboard.comp.sub(Chalkboard.comp.init(3, 2), Chalkboard.comp.init(2, 3));
         */
        export const sub = (comp1: ChalkboardComplex | number | ChalkboardFunction, comp2: ChalkboardComplex | number | ChalkboardFunction): ChalkboardComplex | ChalkboardFunction => {
            if (typeof comp1 === "number") comp1 = Chalkboard.comp.init(comp1, 0);
            if (typeof comp2 === "number") comp2 = Chalkboard.comp.init(comp2, 0);
            if (comp1.hasOwnProperty("a") && comp1.hasOwnProperty("b") && comp2.hasOwnProperty("a") && comp2.hasOwnProperty("b")) {
                const z1 = comp1 as ChalkboardComplex;
                const z2 = comp2 as ChalkboardComplex;
                return Chalkboard.comp.init(z1.a - z2.a, z1.b - z2.b);
            } else if (comp1.hasOwnProperty("rule") || comp2.hasOwnProperty("rule")) {
                if ((comp1 as ChalkboardFunction).field !== "comp" || (comp2 as ChalkboardFunction).field !== "comp") throw new TypeError("Chalkboard.comp.sub: Properties 'field' of 'comp1' and 'comp2' must be 'comp'.");
                const f1 = (comp1 as ChalkboardFunction).rule as [(a: number, b: number) => number, (a: number, b: number) => number];
                const f2 = (comp2 as ChalkboardFunction).rule as [(a: number, b: number) => number, (a: number, b: number) => number];
                const g = [(a: number, b: number) => f1[0](a, b) - f2[0](a, b), (a: number, b: number) => f1[1](a, b) - f2[1](a, b)];
                return Chalkboard.comp.define(...g);
            }
            throw new TypeError("Chalkboard.comp.sub: Parameters 'comp1' and 'comp2' must be of type ChalkboardComplex, number, or ChalkboardFunction.");
        };

        /**
         * Converts a complex number to an array.
         * @param {ChalkboardComplex} comp - The complex number
         * @returns {number[]}
         * @example
         * // Returns [3, 4]
         * const arr = Chalkboard.comp.toArray(Chalkboard.comp.init(3, 4));
         */
        export const toArray = (comp: ChalkboardComplex): [number, number] => {
            return [comp.a, comp.b];
        };

        /**
         * Converts a complex number to a matrix.
         * @param {ChalkboardComplex} comp - The complex number
         * @returns {ChalkboardMatrix}
         * @example
         * // Returns the 2×2 matrix:
         * // [
         * //     [3, -4],
         * //     [4,  3]
         * // ]
         * const matr = Chalkboard.comp.toMatrix(Chalkboard.comp.init(3, 4));
         */
        export const toMatrix = (comp: ChalkboardComplex): ChalkboardMatrix => {
            return Chalkboard.matr.init([comp.a, -comp.b], [comp.b, comp.a]);
        };

        /**
         * Converts a complex number to a string
         * @param {ChalkboardComplex} comp - The complex number
         * @returns {string}
         * @example
         * // Returns "2 + 3i"
         * const str = Chalkboard.comp.toString(Chalkboard.comp.init(2, 3));
         */
        export const toString = (comp: ChalkboardComplex): string => {
            if (comp.a === 1 && comp.b === 0) {
                return "1";
            } else if (comp.a === 0 && comp.b === 1) {
                return "i";
            } else if (comp.a === -1 && comp.b === 0) {
                return "-1";
            } else if (comp.a === 0 && comp.b === -1) {
                return "-i";
            } else if (comp.b >= 0) {
                return comp.a.toString() + " + " + comp.b.toString() + "i";
            } else {
                return comp.a.toString() + " - " + Math.abs(comp.b).toString() + "i";
            }
        };

        /**
         * Converts a complex number to a typed array.
         * @param {ChalkboardComplex} comp - The complex number
         * @param {"int8" | "int16" | "int32" | "float32" | "float64" | "bigint64"} [type="float32"] - The type of the typed array, which can be "int8", "int16", "int32", "float32", "float64", or "bigint64" (optional, defaults to "float32")
         * @returns {Int8Array | Int16Array | Int32Array | Float32Array | Float64Array | BigInt64Array}
         * @example
         * // Returns a Float32Array [3, 4]
         * const z = Chalkboard.comp.init(3, 4);
         * const zf32 = Chalkboard.comp.toTypedArray(z);
         */
        export const toTypedArray = (comp: ChalkboardComplex, type: "int8" | "int16" | "int32" | "float32" | "float64" | "bigint64" = "float32"): Int8Array | Int16Array | Int32Array | Float32Array | Float64Array | BigInt64Array => {
            const arr = Chalkboard.comp.toArray(comp);
            if (type === "int8") {
                return new Int8Array(arr);
            } else if (type === "int16") {
                return new Int16Array(arr);
            } else if (type === "int32") {
                return new Int32Array(arr);
            } else if (type === "float32") {
                return new Float32Array(arr);
            } else if (type === "float64") {
                return new Float64Array(arr);
            } else if (type === "bigint64") {
                return new BigInt64Array(arr.map((n) => BigInt(Math.floor(n))));
            }
            throw new TypeError('Parameter "type" must be "int8", "int16", "int32", "float32", "float64", or "bigint64".');
        };

        /**
         * Converts a complex number to a vector.
         * @param {ChalkboardComplex} comp - The complex number
         * @returns {ChalkboadVector}
         * @example
         * // Returns the 2D vector (3, 4)
         * const v = Chalkboard.comp.toVector(Chalkboard.comp.init(3, 4));
         */
        export const toVector = (comp: ChalkboardComplex): ChalkboardVector => {
            return Chalkboard.vect.init(comp.a, comp.b);
        };

        /**
         * Evaluates a complex function at a complex number
         * @param {ChalkboardFunction} func - The function
         * @param {ChalkboardComplex} comp - The complex number
         * @returns {ChalkboardComplex}
         * @example
         * // Returns 3 + 4i
         * const f = Chalkboard.comp.define((z) => Chalkboard.comp.sq(z));
         * const z = Chalkboard.comp.val(f, Chalkboard.comp.init(2, 1));
         */
        export const val = (func: ChalkboardFunction, comp: ChalkboardComplex): ChalkboardComplex => {
            if (func.field !== "comp") throw new TypeError("Chalkboard.comp.val: Property 'field' of 'func' must be 'comp'.");
            const f = func.rule as [(a: number, b: number) => number, (a: number, b: number) => number];
            return Chalkboard.comp.init(f[0](comp.a, comp.b), f[1](comp.a, comp.b));
        };
    }
}
