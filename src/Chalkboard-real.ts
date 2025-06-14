/*
    The Chalkboard Library - Real Numbers Namespace
    Version 2.4.0 Noether
*/
/// <reference path="Chalkboard.ts"/>
namespace Chalkboard {
    /**
     * The real numbers namespace.
     * @namespace
     */
    export namespace real {
        /**
         * Calculates the absolute value of a function.
         * @param {ChalkboardFunction} func - The function
         * @returns {ChalkboardFunction}
         */
        export const absolute = (func: ChalkboardFunction): ChalkboardFunction => {
            if (func.field !== "real") throw new TypeError("Chalkboard.real.absolute: Property 'field' of 'func' must be 'real'.");
            if (func.type.startsWith("scalar")) {
                const f = func.rule as ((...x: number[]) => number);
                const g = (...x: number[]) => Math.abs(f(...x));
                return Chalkboard.real.define(g);
            } else if (func.type.startsWith("vector")) {
                const f = func.rule as ((...x: number[]) => number)[];
                const g = [];
                for (let i = 0; i < f.length; i++) {
                    g.push((...x: number[]) => Math.abs(f[i](...x)));
                }
                return Chalkboard.real.define(g);
            } else if (func.type.startsWith("curve")) {
                const f = func.rule as ((t: number) => number)[];
                const g = [];
                for (let i = 0; i < f.length; i++) {
                    g.push((t: number) => Math.abs(f[i](t)));
                }
                return Chalkboard.real.define(g);
            } else if (func.type.startsWith("surface")) {
                const f = func.rule as ((s: number, t: number) => number)[];
                const g = [];
                for (let i = 0; i < f.length; i++) {
                    g.push((s: number, t: number) => Math.abs(f[i](s, t)));
                }
                return Chalkboard.real.define(g);
            }
            throw new TypeError("Chalkboard.real.absolute: Property 'type' of 'func' must be 'scalar2d', 'scalar3d', 'scalar4d', 'vector2d', 'vector3d', 'vector4d', 'curve2d', 'curve3d', 'curve4d', or 'surface3d'.");
        };

        /**
         * Calculates the addition of two functions.
         * @param {ChalkboardFunction} func1 - The first function
         * @param {ChalkboardFunction} func2 - The second function
         * @returns {ChalkboardFunction}
         */
        export const add = (func1: ChalkboardFunction, func2: ChalkboardFunction): ChalkboardFunction => {
            if (func1.field !== "real" || func2.field !== "real") throw new TypeError("Chalkboard.real.add: Properties 'field' of 'func1' and 'func2' must be 'real'.");
            if (func1.type !== func2.type) throw new TypeError("Chalkboard.real.add: Properties 'type' of 'func1' and 'func2' must be the same.");
            if (func1.type.startsWith("scalar")) {
                const f1 = func1.rule as ((...x: number[]) => number);
                const f2 = func2.rule as ((...x: number[]) => number);
                const g = (...x: number[]) => f1(...x) + f2(...x);
                return Chalkboard.real.define(g);
            } else if (func1.type.startsWith("vector")) {
                const f1 = func1.rule as ((...x: number[]) => number)[];
                const f2 = func2.rule as ((...x: number[]) => number)[];
                const g = [];
                for (let i = 0; i < f1.length; i++) {
                    g.push((...x: number[]) => f1[i](...x) + f2[i](...x));
                }
                return Chalkboard.real.define(g);
            } else if (func1.type.startsWith("curve")) {
                const f1 = func1.rule as ((t: number) => number)[];
                const f2 = func2.rule as ((t: number) => number)[];
                const g = [];
                for (let i = 0; i < f1.length; i++) {
                    g.push((t: number) => f1[i](t) + f2[i](t));
                }
                return Chalkboard.real.define(g);
            } else if (func1.type.startsWith("surface")) {
                const f1 = func1.rule as ((s: number, t: number) => number)[];
                const f2 = func2.rule as ((s: number, t: number) => number)[];
                const g = [];
                for (let i = 0; i < f1.length; i++) {
                    g.push((s: number, t: number) => f1[i](s, t) + f2[i](s, t));
                }
                return Chalkboard.real.define(g);
            }
            throw new TypeError("Chalkboard.real.add: Properties 'type' of 'func1' and 'func2' must be 'scalar2d', 'scalar3d', 'scalar4d', 'vector2d', 'vector3d', 'vector4d', 'curve2d', 'curve3d', 'curve4d', or 'surface3d'.");
        };

        /**
         * Calculates the composition of two functions.
         * @param {ChalkboardFunction} func1 - The outer function
         * @param {ChalkboardFunction} func2 - The inner function
         * @returns {ChalkboardFunction}
         */
        export const compose = (func1: ChalkboardFunction, func2: ChalkboardFunction): ChalkboardFunction => {
            if (func1.field !== "real" || func2.field !== "real") throw new TypeError("Chalkboard.real.compose: Properties 'field' of 'func1' and 'func2' must be 'real'.");
            if (func1.type !== func2.type) throw new TypeError("Chalkboard.real.compose: Properties 'type' of 'func1' and 'func2' must be the same.");
            if (func1.type.startsWith("scalar")) {
                const f1 = func1.rule as ((...x: number[]) => number);
                const f2 = func2.rule as ((...x: number[]) => number);
                const g = (...x: number[]) => f1(f2(...x));
                return Chalkboard.real.define(g);
            } else if (func1.type.startsWith("vector")) {
                const f1 = func1.rule as ((...x: number[]) => number)[];
                const f2 = func2.rule as ((...x: number[]) => number)[];
                const g = [];
                for (let i = 0; i < f1.length; i++) {
                    g.push((...x: number[]) => f1[i](f2[i](...x)));
                }
                return Chalkboard.real.define(g);
            }
            throw new TypeError("Chalkboard.real.compose: Properties 'type' of 'func1' and 'func2' must be 'scalar2d', 'scalar3d', 'scalar4d', 'vector2d', 'vector3d', or 'vector4d'.");
        };

        /**
         * Defines a mathematical function in the field of real numbers.
         * @param {Function | Function[]} rule - The rule(s) of the function
         * @returns {ChalkboardFunction}
         */
        export const define = (...rule: (((...x: number[]) => number) | ((...x: number[]) => number)[])[]): ChalkboardFunction => {
            let f: ((...x: number[]) => number) | ((...x: number[]) => number)[];
            let type: "scalar2d" | "scalar3d" | "scalar4d" | "vector2d" | "vector3d" | "vector4d" | "curve2d" | "curve3d" | "curve4d" | "surface3d" = "scalar2d";
            if (rule.length === 1 && Array.isArray(rule[0])) {
                f = rule[0] as ((...x: number[]) => number)[];
            } else if (rule.length > 1) {
                f = rule as ((...x: number[]) => number)[];
            } else {
                f = rule[0] as ((...x: number[]) => number);
            }
            if (Array.isArray(f)) {
                if (f.length === 2) {
                    if (f[0].length === 1) {
                        type = "curve2d";
                    } else if (f[0].length === 2) {
                        type = "vector2d";
                    } else {
                        throw new TypeError("Chalkboard.real.define: Functions in array 'rule' must have one variable to define a parametric curve or two variables to define a vector field.");
                    }
                } else if (f.length === 3) {
                    if (f[0].length === 1) {
                        type = "curve3d";
                    } else if (f[0].length === 2) {
                        type = "surface3d";
                    } else if (f[0].length === 3) {
                        type = "vector3d";
                    } else {
                        throw new TypeError("Chalkboard.real.define: Functions in array 'rule' must have one variable to define a parametric curve, two variables to define a parametric surface, or three variables to define a vector field.");
                    }
                } else if (f.length === 4) {
                    if (f[0].length === 1) {
                        type = "curve4d";
                    } else if (f[0].length === 4) {
                        type = "vector4d";
                    } else {
                        throw new TypeError("Chalkboard.real.define: Functions in array 'rule' must have one variable to define a parametric curve or four variables to define a vector field.");
                    }
                }
            } else {
                if (f.length === 1) {
                    type = "scalar2d";
                } else if (f.length === 2) {
                    type = "scalar3d";
                } else if (f.length === 3) {
                    type = "scalar4d";
                } else {
                    throw new TypeError("Chalkboard.real.define: Function 'rule' must have one, two, or three variables to define a scalar function.");
                }
            }
            return { rule: f, field: "real", type } as ChalkboardFunction;
        };

        /**
         * Evaluates the Dirac delta function on a number.
         * @param {number} num - The number
         * @param {number} [edge=0] - The edge of the function
         * @param {number} [scl=1] - The scale of the function
         * @returns {number}
         */
        export const Dirac = (num: number, edge: number = 0, scl: number = 1): number => {
            if (num === edge) {
                return scl;
            } else {
                return 0;
            }
        };

        /**
         * Calculates the discriminant of a quadratic polynomial given its coefficients and form.
         * @param {number} a - The leading coefficient
         * @param {number} b - The middle coefficient
         * @param {number} c - The last coefficient (the constant)
         * @param {"stan" | "vert"} [form="stan"] - The form of the polynomial, which can be "stan" for standard form or "vert" for vertex form
         * @returns {number}
         */
        export const discriminant = (a: number, b: number, c: number, form: "stan" | "vert" = "stan"): number => {
            if (form === "stan") {
                return b * b - 4 * a * c;
            } else if (form === "vert") {
                return 2 * a * b * (2 * a * b) - 4 * a * c;
            } else {
                throw new TypeError("Chalkboard.real.discriminant: String 'form' must be 'stan' or 'vert'.");
            }
        };

        /**
         * Calculates the division of two functions
         * @param {ChalkboardFunction} func1 - The numerator function
         * @param {ChalkboardFunction} func2 - The denominator function
         * @returns {ChalkboardFunction}
         */
        export const div = (func1: ChalkboardFunction, func2: ChalkboardFunction): ChalkboardFunction => {
            if (func1.field !== "real" || func2.field !== "real") throw new TypeError("Chalkboard.real.div: Properties 'field' of 'func1' and 'func2' must be 'real'.");
            if (func1.type !== func2.type) throw new TypeError("Chalkboard.real.div: Properties 'type' of 'func1' and 'func2' must be the same.");
            if (func1.type.startsWith("scalar")) {
                const f1 = func1.rule as ((...x: number[]) => number);
                const f2 = func2.rule as ((...x: number[]) => number);
                const g = (...x: number[]) => f1(...x) / f2(...x);
                return Chalkboard.real.define(g);
            } else if (func1.type.startsWith("vector")) {
                const f1 = func1.rule as ((...x: number[]) => number)[];
                const f2 = func2.rule as ((...x: number[]) => number)[];
                const g = [];
                for (let i = 0; i < f1.length; i++) {
                    g.push((...x: number[]) => f1[i](...x) / f2[i](...x));
                }
                return Chalkboard.real.define(g);
            } else if (func1.type.startsWith("curve")) {
                const f1 = func1.rule as ((t: number) => number)[];
                const f2 = func2.rule as ((t: number) => number)[];
                const g = [];
                for (let i = 0; i < f1.length; i++) {
                    g.push((t: number) => f1[i](t) / f2[i](t));
                }
                return Chalkboard.real.define(g);
            } else if (func1.type.startsWith("surface")) {
                const f1 = func1.rule as ((s: number, t: number) => number)[];
                const f2 = func2.rule as ((s: number, t: number) => number)[];
                const g = [];
                for (let i = 0; i < f1.length; i++) {
                    g.push((s: number, t: number) => f1[i](s, t) / f2[i](s, t));
                }
                return Chalkboard.real.define(g);
            }
            throw new TypeError("Chalkboard.real.div: Properties 'type' of 'func1' and 'func2' must be 'scalar2d', 'scalar3d', 'scalar4d', 'vector2d', 'vector3d', 'vector4d', 'curve2d', 'curve3d', 'curve4d', or 'surface3d'.");
        };

        /**
         * Evaluates the Heaviside step function on a number.
         * @param {number} num - The number
         * @param {number} edge - The edge of the function
         * @param {number} scl - The scale of the function
         * @returns {number}
         */
        export const Heaviside = (num: number, edge: number = 0, scl: number = 1): number => {
            if (num >= edge) {
                return scl;
            } else {
                return 0;
            }
        };

        /**
         * Calculates the linear interpolation between a point and a variable.
         * @param {number} p - The point
         * @param {number} t - The variable
         * @returns {number}
         */
        export const lerp = (p: [number, number], t: number): number => {
            return (p[1] - p[0]) * t + p[0];
        };

        /**
         * Defines a linear function with two points.
         * @param {number} x1 - The x-coordinate of the first point
         * @param {number} y1 - The y-coordinate of the first point
         * @param {number} x2 - The x-coordinate of the second point
         * @param {number} y2 - The y-coordinate of the second point
         * @returns {ChalkboardFunction}
         */
        export const linear = (x1: number, y1: number, x2: number, y2: number): ChalkboardFunction => {
            return Chalkboard.real.define((x: number) => Chalkboard.real.slope(x1, y1, x2, y2) * (x - x2) + y2);
        };

        /**
         * Solves a linear equation.
         * @param {number} a - The slope (in slope-intercept form)
         * @param {number} b - The y-intercept (in slope-intercept form)
         * @param {number} [c] - The y-intercept (in standard form)
         * @param {number} [d] - The y-coordinate of the second point (in point-slope form)
         * @returns {number}
         */
        export const linearFormula = (a: number, b: number, c?: number, d?: number): number => {
            if (typeof c === "undefined" && typeof d === "undefined") {
                return -b / a;
            } else if (typeof c === "number" && typeof d === "undefined") {
                return c / a;
            } else {
                return -b / Chalkboard.real.slope(a, b, c as number, d as number) + a;
            }
        };

        /**
         * Calculates the natural logarithm of a number.
         * @param {number} num - The number
         * @returns {number}
         */
        export const ln = (num: number): number => {
            return Chalkboard.calc.fxdx(Chalkboard.real.define((x: number) => 1 / x), 1, num) as number;
        };

        /**
         * Calculates the logarithm of a number with a particular base.
         * @param {number} base - The base
         * @param {number} num - The number
         * @returns {number}
         */
        export const log = (base: number, num: number): number => {
            return Chalkboard.real.ln(num) / Chalkboard.real.ln(base);
        };

        /**
         * Calculates the logarithm of a number with base 10.
         * @param {number} num - The number
         * @returns {number}
         */
        export const log10 = (num: number): number => {
            return Chalkboard.real.log(10, num);
        };

        /**
         * Calculates the multiplication of two functions.
         * @param {ChalkboardFunction} func1 - The first function
         * @param {ChalkboardFunction} func2 - The second function
         * @returns {ChalkboardFunction}
         */
        export const mul = (func1: ChalkboardFunction, func2: ChalkboardFunction): ChalkboardFunction => {
            if (func1.field !== "real" || func2.field !== "real") throw new TypeError("Chalkboard.real.mul: Properties 'field' of 'func1' and 'func2' must be 'real'.");
            if (func1.type !== func2.type) throw new TypeError("Chalkboard.real.mul: Properties 'type' of 'func1' and 'func2' must be the same.");
            if (func1.type.startsWith("scalar")) {
                const f1 = func1.rule as ((...x: number[]) => number);
                const f2 = func2.rule as ((...x: number[]) => number);
                const g = (...x: number[]) => f1(...x) * f2(...x);
                return Chalkboard.real.define(g);
            } else if (func1.type.startsWith("vector")) {
                const f1 = func1.rule as ((...x: number[]) => number)[];
                const f2 = func2.rule as ((...x: number[]) => number)[];
                const g = [];
                for (let i = 0; i < f1.length; i++) {
                    g.push((...x: number[]) => f1[i](...x) * f2[i](...x));
                }
                return Chalkboard.real.define(g);
            } else if (func1.type.startsWith("curve")) {
                const f1 = func1.rule as ((t: number) => number)[];
                const f2 = func2.rule as ((t: number) => number)[];
                const g = [];
                for (let i = 0; i < f1.length; i++) {
                    g.push((t: number) => f1[i](t) * f2[i](t));
                }
                return Chalkboard.real.define(g);
            } else if (func1.type.startsWith("surface")) {
                const f1 = func1.rule as ((s: number, t: number) => number)[];
                const f2 = func2.rule as ((s: number, t: number) => number)[];
                const g = [];
                for (let i = 0; i < f1.length; i++) {
                    g.push((s: number, t: number) => f1[i](s, t) * f2[i](s, t));
                }
                return Chalkboard.real.define(g);
            }
            throw new TypeError("Chalkboard.real.mul: Properties 'type' of 'func1' and 'func2' must be 'scalar2d', 'scalar3d', 'scalar4d', 'vector2d', 'vector3d', 'vector4d', 'curve2d', 'curve3d', 'curve4d', or 'surface3d'.");
        };

        /**
         * Calculates the negation of a function.
         * @param {ChalkboardFunction} func - The function
         * @returns {ChalkboardFunction}
         */
        export const negate = (func: ChalkboardFunction): ChalkboardFunction => {
            if (func.field !== "real") throw new TypeError("Chalkboard.real.negate: Property 'field' of 'func' must be 'real'.");
            if (func.type.startsWith("scalar")) {
                const f = func.rule as ((...x: number[]) => number);
                const g = (...x: number[]) => -f(...x);
                return Chalkboard.real.define(g);
            } else if (func.type.startsWith("vector")) {
                const f = func.rule as ((...x: number[]) => number)[];
                const g = [];
                for (let i = 0; i < f.length; i++) {
                    g.push((...x: number[]) => -f[i](...x));
                }
                return Chalkboard.real.define(g);
            } else if (func.type.startsWith("curve")) {
                const f = func.rule as ((t: number) => number)[];
                const g = [];
                for (let i = 0; i < f.length; i++) {
                    g.push((t: number) => -f[i](t));
                }
                return Chalkboard.real.define(g);
            } else if (func.type.startsWith("surface")) {
                const f = func.rule as ((s: number, t: number) => number)[];
                const g = [];
                for (let i = 0; i < f.length; i++) {
                    g.push((s: number, t: number) => -f[i](s, t));
                }
                return Chalkboard.real.define(g);
            }
            throw new TypeError("Chalkboard.real.negate: Property 'type' of 'func' must be 'scalar2d', 'scalar3d', 'scalar4d', 'vector2d', 'vector3d', 'vector4d', 'curve2d', 'curve3d', 'curve4d', or 'surface3d'.");
        };

        /**
         * Parses, simplifies, and optionally evaluates a real number expression.
         * @param {string} expr - The real number expression to parse
         * @param {Record<string, number>} [config.values] - Optional object mapping variable names to values
         * @param {number} [config.roundTo] - Optional number of decimal places to round the result to
         * @param {boolean} [config.returnAST=false] - If true, returns an abstract syntax tree (AST) instead of a string
         * @param {boolean} [config.returnJSON=false] - If true, returns an AST in JSON instead of a string
         * @param {boolean} [config.returnLATEX=false] - If true, returns LaTeX code instead of a string
         * @returns {string | number | { type: string, [key: string]: any }}
         */
        export const parse = (
            expr: string,
            config: {
                values?: Record<string, number>,
                roundTo?: number,
                returnAST?: boolean,
                returnJSON?: boolean,
                returnLATEX?: boolean
            } = { returnAST: false, returnJSON: false, returnLATEX: false }
        ): string | number | { type: string, [key: string]: any } => {
            if (expr === "") return "";
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
                        if (ch === ")" && i < input.length && (/[a-zA-Z0-9_(]/.test(input[i]))) tokens.push("*");
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
                    } else if (/[0-9]/.test(ch) || (ch === "." && /[0-9]/.test(input[i + 1]))) {
                        let num = "";
                        let hasDecimal = false;
                        while (i < input.length && ((/[0-9]/.test(input[i])) || (input[i] === "." && !hasDecimal))) {
                            if (input[i] === ".") hasDecimal = true;
                            num += input[i++];
                        }
                        tokens.push(num);
                        if (i < input.length && (/[a-zA-Z_(]/.test(input[i]))) tokens.push("*");
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
                        throw new Error(`Chalkboard.real.parse: Unexpected character ${ch}`);
                    }
                }
                return tokens;
            };
            const parseTokens = (tokens: string[]): { type: string, [key: string]: any } => {
                let pos = 0;
                const peek = (): string => tokens[pos] || "";
                const consume = (token?: string): string => {
                    if (token && tokens[pos] !== token) throw new Error(`Chalkboard.real.parse: Expected token '${token}' but found '${tokens[pos]}'`);
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
                    throw new Error(`Chalkboard.real.parse: Unexpected token ${token}`);
                };
                const ast = parseExpression();
                if (pos < tokens.length) throw new Error(`Chalkboard.real.parse: Unexpected token ${tokens[pos]}`);
                return ast;
            };
            const evaluateNode = (node: { type: string, [key: string]: any }, values: Record<string, number>): number => {
                switch (node.type) {
                    case "num": {
                        return node.value;
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
                                    return values[left] * rightResult;
                                } catch {
                                    continue;
                                }
                            }
                        }
                        throw new Error(`Chalkboard.real.parse: Variable '${varname}' not defined in values`);
                    }
                    case "add": {
                        return evaluateNode(node.left, values) + evaluateNode(node.right, values);
                    }
                    case "sub": {
                        return evaluateNode(node.left, values) - evaluateNode(node.right, values);
                    }
                    case "mul": {
                        return evaluateNode(node.left, values) * evaluateNode(node.right, values);
                    }
                    case "div": {
                        const numerator = evaluateNode(node.left, values);
                        const denominator = evaluateNode(node.right, values);
                        if (denominator === 0) throw new Error(`Chalkboard.real.parse: Division by zero`);
                        return numerator / denominator;
                    }
                    case "pow": {
                        return Math.pow(evaluateNode(node.base, values), evaluateNode(node.exponent, values));
                    }
                    case "neg": {
                        return -evaluateNode(node.expr, values);
                    }
                    case "func": {
                        const funcName = node.name.toLowerCase();
                        const args = node.args.map((arg: { type: string, [key: string]: any }) => evaluateNode(arg, values));
                        if (Chalkboard.REGISTRY[funcName] !== undefined) return Chalkboard.REGISTRY[funcName](...args);
                        switch (funcName) {
                            case "sin": return Math.sin(args[0]);
                            case "cos": return Math.cos(args[0]);
                            case "tan": return Math.tan(args[0]);
                            case "abs": return Math.abs(args[0]);
                            case "sqrt": return Math.sqrt(args[0]);
                            case "log": return args.length > 1 ? Math.log(args[0]) / Math.log(args[1]) : Math.log(args[0]);
                            case "ln": return Math.log(args[0]);
                            case "exp": return Math.exp(args[0]);
                            case "min": return Math.min(...args);
                            case "max": return Math.max(...args);
                            default: throw new Error(`Chalkboard.real.parse: Unknown function ${node.name}`);
                        }
                    }
                }
                throw new Error(`Chalkboard.real.parse: Unknown node type ${node.type}`);
            };
            const nodeToString = (node: { type: string, [key: string]: any }): string => {
                switch (node.type) {
                    case "num": {
                        return node.value.toString();
                    }
                    case "var": {
                        return node.name;
                    }
                    case "add": {
                        if (node.right.type === "num" && node.right.value < 0) return `${nodeToString(node.left)} - ${nodeToString({ type: "num", value: -node.right.value })}`;
                        if (node.right.type === "neg") return `${nodeToString(node.left)} - ${nodeToString(node.right.expr)}`;
                        if (node.right.type === "mul" && node.right.left.type === "num" && node.right.left.value < 0) return `${nodeToString(node.left)} - ${nodeToString({ type: "mul", left: { type: "num", value: -node.right.left.value }, right: node.right.right })}`;
                        return `${nodeToString(node.left)} + ${nodeToString(node.right)}`;
                    }
                    case "sub": {
                        const rightStr = node.right.type === "add" || node.right.type === "sub" ?`(${nodeToString(node.right)})` : nodeToString(node.right);
                        return `${nodeToString(node.left)} - ${rightStr}`;
                    }
                    case "mul": {
                        if (node.left.type === "num" && node.left.value === -1 && node.right.type === "var") return `-${nodeToString(node.right)}`;
                        if (node.left.type === "num" && (node.right.type === "var" || node.right.type === "pow")) return `${nodeToString(node.left)}${nodeToString(node.right)}`;
                        if (node.left.type === "var" && node.right.type === "var") return `${nodeToString(node.left)}${nodeToString(node.right)}`;
                        if (node.left.type === "mul" && ((node.left.left.type === "num" || node.left.right.type === "var" || node.left.right.type === "pow") || (node.left.right.type === "var" || node.left.right.type === "pow")) && (node.right.type === "var" || node.right.type === "pow")) return `${nodeToString(node.left)}${nodeToString(node.right)}`;
                        return `${nodeToString(node.left)} * ${nodeToString(node.right)}`;
                    }
                    case "div": {
                        const powNode = { type: "pow", base: node.right, exponent: { type: "num", value: -1 } };
                        const mulNode = { type: "mul", left: node.left, right: powNode };
                        return nodeToString(mulNode);
                    }
                    case "pow": {
                        const baseStr = (node.base.type !== "num" && node.base.type !== "var") ? `(${nodeToString(node.base)})` : nodeToString(node.base);
                        const expStr = (node.exponent.type !== "num" && node.exponent.type !== "var") ? `(${nodeToString(node.exponent)})` : nodeToString(node.exponent);
                        return `${baseStr}^${expStr}`;
                    }
                    case "neg": {
                        if (node.expr.type === "add" || node.expr.type === "sub") return `-(${ nodeToString(node.expr) })`;
                        const exprStr = (node.expr.type !== "num" && node.expr.type !== "var") ? `(${ nodeToString(node.expr) })` : nodeToString(node.expr);
                        return `-${ exprStr }`;
                    }
                    case "func": {
                        return `${node.name}(${node.args.map((arg: { type: string, [key: string]: any }) => nodeToString(arg)).join(", ")})`;
                    }
                }
                return "";
            };
            const areEqualVars = (a: { type: string, [key: string]: any }, b: { type: string, [key: string]: any }): boolean => {
                if (a.type === "var" && b.type === "var") return a.name === b.name;
                return JSON.stringify(a) === JSON.stringify(b);
            };
            const simplifyNode = (node: { type: string, [key: string]: any }): { type: string, [key: string]: any } => {
                switch (node.type) {
                    case "num": {
                        return node;
                    }
                    case "var": {
                        return node;
                    }
                    case "add": {
                        const left = simplifyNode(node.left);
                        const right = simplifyNode(node.right);
                        const flatten = (n: any): any[] => n.type === "add" ? [...flatten(n.left), ...flatten(n.right)] : [n];
                        const terms = flatten({ type: "add", left, right });
                        const coeffs: Record<string, number> = {};
                        let constants = 0;
                        const others: any[] = [];
                        const powers: { pow: number, name: string }[] = [];
                        for (let i = 0; i < terms.length; i++) {
                            const t = terms[i];
                            if (t.type === "num") {
                                constants += t.value;
                            } else if (t.type === "mul" && t.left.type === "num" && t.right.type === "var") {
                                const k = t.right.name;
                                coeffs[k] = (coeffs[k] || 0) + t.left.value;
                            } else if (t.type === "var") {
                                const k = t.name;
                                coeffs[k] = (coeffs[k] || 0) + 1;
                            } else if (t.type === "pow" && t.base.type === "var" && t.exponent.type === "num") {
                                const k = t.base.name + "^" + t.exponent.value;
                                coeffs[k] = (coeffs[k] || 0) + 1;
                                powers.push({ pow: t.exponent.value, name: k });
                            } else if (t.type === "mul" && t.left.type === "num" && t.right.type === "pow" && t.right.base.type === "var" && t.right.exponent.type === "num") {
                                const k = t.right.base.name + "^" + t.right.exponent.value;
                                coeffs[k] = (coeffs[k] || 0) + t.left.value;
                                powers.push({ pow: t.right.exponent.value, name: k });
                            } else {
                                others.push(t);
                            }
                        }
                        const powerKeys: string[] = [];
                        for (let i = 0; i < powers.length; i++) {
                            let exists = false;
                            for (let j = 0; j < powerKeys.length; j++) {
                                if (powerKeys[j] === powers[i].name) {
                                    exists = true;
                                    break;
                                }
                            }
                            if (!exists) powerKeys.push(powers[i].name);
                        }
                        for (let i = 0; i < powerKeys.length - 1; i++) {
                            for (let j = i + 1; j < powerKeys.length; j++) {
                                const pa = powers.find((p) => p.name === powerKeys[i])?.pow ?? 1;
                                const pb = powers.find((p) => p.name === powerKeys[j])?.pow ?? 1;
                                if (pb > pa) {
                                    const tmp = powerKeys[i];
                                    powerKeys[i] = powerKeys[j];
                                    powerKeys[j] = tmp;
                                }
                            }
                        }
                        const coeffKeys = Object.keys(coeffs);
                        const varKeys = coeffKeys.filter((k) => k.indexOf("^") === -1);
                        let result: any = null;
                        for (let i = 0; i < powerKeys.length; i++) {
                            const k = powerKeys[i];
                            if (coeffs[k] === 0) continue;
                            const split = k.split("^");
                            const name = split[0];
                            const exp = split[1];
                            const pownode = { type: "pow", base: { type: "var", name }, exponent: { type: "num", value: Number(exp) } };
                            const term = coeffs[k] === 1 ? pownode : { type: "mul", left: { type: "num", value: coeffs[k] }, right: pownode };
                            result = result ? { type: "add", left: result, right: term } : term;
                        }
                        for (let i = 0; i < varKeys.length; i++) {
                            const k = varKeys[i];
                            if (coeffs[k] === 0) continue;
                            const term = coeffs[k] === 1 ? { type: "var", name: k } : { type: "mul", left: { type: "num", value: coeffs[k] }, right: { type: "var", name: k } };
                            result = result ? { type: "add", left: result, right: term } : term;
                        }
                        if (constants !== 0) result = result ? { type: "add", left: result, right: { type: "num", value: constants } } : { type: "num", value: constants };
                        for (let i = 0; i < others.length; i++) result = result ? { type: "add", left: result, right: others[i] } : others[i];
                        return result || { type: "num", value: 0 };
                    }
                    case "sub": {
                        const leftSub = simplifyNode(node.left);
                        const rightSub = simplifyNode(node.right);
                        return simplifyNode({ type: "add", left: leftSub, right: { type: "mul", left: { type: "num", value: -1 }, right: rightSub } });
                    }
                    case "mul": {
                        const leftMul = simplifyNode(node.left);
                        const rightMul = simplifyNode(node.right);
                        if (rightMul.type === "add" || rightMul.type === "sub") return simplifyNode({ type: rightMul.type, left: { type: "mul", left: leftMul, right: rightMul.left }, right: { type: "mul", left: leftMul, right: rightMul.right } });
                        if (leftMul.type === "add" || leftMul.type === "sub") return simplifyNode({ type: leftMul.type, left: { type: "mul", left: rightMul, right: leftMul.left }, right: { type: "mul", left: rightMul, right: leftMul.right } });
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
                        const flattenMul = (n: any): any[] => n.type === "mul" ? [...flattenMul(n.left), ...flattenMul(n.right)] : [n];
                        const factors = flattenMul({ type: "mul", left: leftMul, right: rightMul });
                        let coeffMul = 1;
                        const powersMul: Record<string, number> = {};
                        const othersMul: any[] = [];
                        for (let i = 0; i < factors.length; i++) {
                            const f = factors[i];
                            if (f.type === "num") {
                                coeffMul *= f.value;
                            } else if (f.type === "var") {
                                powersMul[f.name] = (powersMul[f.name] || 0) + 1;
                            } else if (f.type === "pow" && f.base.type === "var" && f.exponent.type === "num") {
                                powersMul[f.base.name] = (powersMul[f.base.name] || 0) + f.exponent.value;
                            } else {
                                othersMul.push(f);
                            }
                        }
                        const powerKeysMul: string[] = [];
                        const powerValsMul: number[] = [];
                        for (const k in powersMul) {
                            if (powersMul.hasOwnProperty(k)) {
                                powerKeysMul.push(k);
                                powerValsMul.push(powersMul[k]);
                            }
                        }
                        for (let i = 0; i < powerKeysMul.length - 1; i++) {
                            for (let j = i + 1; j < powerKeysMul.length; j++) {
                                if (powerValsMul[j] > powerValsMul[i]) {
                                    const tmpK = powerKeysMul[i];
                                    const tmpV = powerValsMul[i];
                                    powerKeysMul[i] = powerKeysMul[j];
                                    powerValsMul[i] = powerValsMul[j];
                                    powerKeysMul[j] = tmpK;
                                    powerValsMul[j] = tmpV;
                                }
                            }
                        }
                        let resultMul: any = null;
                        if (coeffMul !== 1 || (powerKeysMul.length === 0 && othersMul.length === 0)) resultMul = { type: "num", value: coeffMul };
                        for (let i = 0; i < powerKeysMul.length; i++) {
                            const k = powerKeysMul[i];
                            const v = powerValsMul[i];
                            if (v === 0) continue;
                            if (v === 1) {
                                resultMul = resultMul ? { type: "mul", left: resultMul, right: { type: "var", name: k } } : { type: "var", name: k };
                            } else {
                                resultMul = resultMul ? { type: "mul", left: resultMul, right: { type: "pow", base: { type: "var", name: k }, exponent: { type: "num", value: v } } } : { type: "pow", base: { type: "var", name: k }, exponent: { type: "num", value: v } };
                            }
                        }
                        for (let i = 0; i < othersMul.length; i++) resultMul = resultMul ? { type: "mul", left: resultMul, right: othersMul[i] } : othersMul[i];
                        return resultMul;
                    }
                    case "div": {
                        const leftDiv = simplifyNode(node.left);
                        const rightDiv = simplifyNode(node.right);
                        if (leftDiv.type === "num" && leftDiv.value === 1 && (rightDiv.type === "add" || rightDiv.type === "sub")) return { type: "pow", base: rightDiv, exponent: { type: "num", value: -1 } };
                        if (leftDiv.type === "add" || leftDiv.type === "sub") {
                            const left = { type: "div", left: leftDiv.left, right: JSON.parse(JSON.stringify(rightDiv)) };
                            const right = { type: "div", left: leftDiv.right, right: JSON.parse(JSON.stringify(rightDiv)) };
                            return { type: leftDiv.type, left: simplifyNode(left), right: simplifyNode(right) };
                        }
                        if (leftDiv.type === "num" && leftDiv.value === 0) return { type: "num", value: 0 };
                        if (rightDiv.type === "num" && rightDiv.value === 1) return leftDiv;
                        if (leftDiv.type === "num" && rightDiv.type === "num") return { type: "num", value: leftDiv.value / rightDiv.value };
                        if (areEqualVars(leftDiv, rightDiv)) return { type: "num", value: 1 };
                        if (leftDiv.type === "num" && leftDiv.value === 1 && (rightDiv.type === "add" || rightDiv.type === "sub")) return { type: "pow", base: rightDiv, exponent: { type: "num", value: -1 } };
                        if (leftDiv.type === "mul" && areEqualVars(leftDiv.right, rightDiv)) return simplifyNode(leftDiv.left);
                        if (leftDiv.type === "mul" && areEqualVars(leftDiv.left, rightDiv)) return simplifyNode(leftDiv.right);
                        if (leftDiv.type === "pow" && rightDiv.type === "pow" && areEqualVars(leftDiv.base, rightDiv.base)) return { type: "pow", base: leftDiv.base, exponent: { type: "sub", left: simplifyNode(leftDiv.exponent), right: simplifyNode(rightDiv.exponent) } };
                        if (leftDiv.type === "pow" && areEqualVars(leftDiv.base, rightDiv)) return { type: "pow", base: rightDiv, exponent: { type: "sub", left: simplifyNode(leftDiv.exponent), right: { type: "num", value: 1 } } };
                        if (rightDiv.type === "pow" && areEqualVars(leftDiv, rightDiv.base)) return { type: "pow", base: leftDiv, exponent: { type: "sub", left: { type: "num", value: 1 }, right: simplifyNode(rightDiv.exponent) } };
                        const flattenDiv = (n: any, type: string): any[] => {
                            if (!n) return [];
                            return n.type === type ? [...flattenDiv(n.left, type), ...flattenDiv(n.right, type)] : [n];
                        };
                        const numFactors = flattenDiv(leftDiv, "mul");
                        const denFactors = flattenDiv(rightDiv, "mul");
                        let coeffNum = 1, coeffDen = 1;
                        const powersNum: Record<string, number> = {}, powersDen: Record<string, number> = {};
                        const othersNum: any[] = [], othersDen: any[] = [];
                        for (let i = 0; i < numFactors.length; i++) {
                            const f = numFactors[i];
                            if (f.type === "num") {
                                coeffNum *= f.value;
                            } else if (f.type === "var") {
                                powersNum[f.name] = (powersNum[f.name] || 0) + 1;
                            } else if (f.type === "pow" && f.base.type === "var" && f.exponent.type === "num") {
                                powersNum[f.base.name] = (powersNum[f.base.name] || 0) + f.exponent.value;
                            } else {
                                othersNum.push(f);
                            }
                        }
                        for (let i = 0; i < denFactors.length; i++) {
                            const f = denFactors[i];
                            if (f.type === "num") {
                                coeffDen *= f.value;
                            } else if (f.type === "var") {
                                powersDen[f.name] = (powersDen[f.name] || 0) + 1;
                            } else if (f.type === "pow" && f.base.type === "var" && f.exponent.type === "num") {
                                powersDen[f.base.name] = (powersDen[f.base.name] || 0) + f.exponent.value;
                            } else {
                                othersDen.push(f);
                            }
                        }
                        let resultDiv: any = null;
                        const coeffQuot = coeffNum / coeffDen;
                        if (coeffQuot !== 1 || (Object.keys(powersNum).length === 0 && Object.keys(powersDen).length === 0 && othersNum.length === 0 && othersDen.length === 0)) resultDiv = { type: "num", value: coeffQuot };
                        const allPowerKeys: string[] = [];
                        for (const k in powersNum) if (allPowerKeys.indexOf(k) === -1) allPowerKeys.push(k);
                        for (const k in powersDen) if (allPowerKeys.indexOf(k) === -1) allPowerKeys.push(k);
                        for (let i = 0; i < allPowerKeys.length - 1; i++) {
                            for (let j = i + 1; j < allPowerKeys.length; j++) {
                                const pa = (powersNum[allPowerKeys[i]] || 0) - (powersDen[allPowerKeys[i]] || 0);
                                const pb = (powersNum[allPowerKeys[j]] || 0) - (powersDen[allPowerKeys[j]] || 0);
                                if (pb > pa) {
                                    const tmp = allPowerKeys[i];
                                    allPowerKeys[i] = allPowerKeys[j];
                                    allPowerKeys[j] = tmp;
                                }
                            }
                        }
                        for (let i = 0; i < allPowerKeys.length; i++) {
                            const k = allPowerKeys[i];
                            const exp = (powersNum[k] || 0) - (powersDen[k] || 0);
                            if (exp === 0) continue;
                            if (exp === 1) {
                                resultDiv = resultDiv ? { type: "mul", left: resultDiv, right: { type: "var", name: k } } : { type: "var", name: k };
                            } else {
                                resultDiv = resultDiv ? { type: "mul", left: resultDiv, right: { type: "pow", base: { type: "var", name: k }, exponent: { type: "num", value: exp } } } : { type: "pow", base: { type: "var", name: k }, exponent: { type: "num", value: exp } };
                            }
                        }
                        for (let i = 0; i < othersNum.length; i++) resultDiv = resultDiv ? { type: "mul", left: resultDiv, right: othersNum[i] } : othersNum[i];
                        for (let i = 0; i < othersDen.length; i++) resultDiv = { type: "div", left: resultDiv, right: othersDen[i] };
                        return resultDiv;
                    }
                    case "pow": {
                        const base = simplifyNode(node.base);
                        const exponent = simplifyNode(node.exponent);
                        if ((base.type === "add" || base.type === "sub") && exponent.type === "num" && Number.isInteger(exponent.value)) {
                            if (exponent.value < 0) {
                                const absExpr = Math.abs(exponent.value);
                                if (absExpr === 1) {
                                    return { type: "pow", base: base, exponent: { type: "num", value: -1 } };
                                } else {
                                    const positiveExpr = { type: "pow", base, exponent: { type: "num", value: absExpr } };
                                    const expanded = simplifyNode(positiveExpr);
                                    return { type: "pow", base: expanded, exponent: { type: "num", value: -1 } };
                                }
                            } else if (exponent.value > 0) {
                                const n = exponent.value;
                                const a = base.left;
                                const b = base.right;
                                const sign = base.type === "add" ? 1 : -1;
                                let result = null;
                                for (let k = 0; k <= n; k++) {
                                    const c = Chalkboard.numb.binomial(n, k);
                                    const leftPower = n - k === 0 ? { type: "num", value: 1 } : (n - k === 1 ? a : simplifyNode({ type: "pow", base: a, exponent: { type: "num", value: n - k } }));
                                    const rightPower = k === 0 ? { type: "num", value: 1 } : (k === 1 ? (sign === 1 ? b : { type: "neg", expr: b }) : simplifyNode({ type: "pow", base: b, exponent: { type: "num", value: k } }));
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
                                        term = simplifyNode({ type: "mul", left: { type: "num", value: termSign * c }, right: term });
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
                        if (exponent.type === "num" && exponent.value === 0) return { type: "num", value: 1 };
                        if (exponent.type === "num" && exponent.value === 1) return base;
                        if (base.type === "num" && base.value === 0 && exponent.type === "num" && exponent.value > 0) return { type: "num", value: 0 };
                        if (base.type === "num" && base.value === 1) return { type: "num", value: 1 };
                        if (base.type === "num" && exponent.type === "num") return { type: "num", value: Math.pow(base.value, exponent.value) };
                        if (base.type === "pow") return { type: "pow", base: base.base, exponent: { type: "mul", left: simplifyNode(base.exponent), right: exponent } };
                        if (base.type === "mul" && exponent.type === "num") return simplifyNode({ type: "mul", left: { type: "pow", base: base.left, exponent }, right: { type: "pow", base: base.right, exponent } });
                        return { type: "pow", base, exponent };
                    }
                    case "neg": {
                        const expr = simplifyNode(node.expr);
                        if (expr.type === "neg") return expr.expr;
                        if (expr.type === "num") return { type: "num", value: -expr.value };
                        if (expr.type === "add") return simplifyNode({ type: "add", left: simplifyNode({ type: "neg", expr: expr.left }), right: simplifyNode({ type: "neg", expr: expr.right }) });
                        if (expr.type === "sub") return simplifyNode({ type: "add", left: simplifyNode({ type: "neg", expr: expr.left }), right: expr.right });
                        return { type: "neg", expr };
                    }
                    case "func": {
                        const args = node.args.map((arg: { type: string, [key: string]: any }) => simplifyNode(arg));
                        if (args.every((arg: { type: string, [key: string]: any }) => arg.type === "num")) {
                            try {
                                const funcName = node.name.toLowerCase();
                                if (Chalkboard.REGISTRY[funcName] !== undefined) {
                                    const argValues = args.map((arg: { type: string, [key: string]: any }) => arg.value);
                                    return { type: "num", value: Chalkboard.REGISTRY[funcName](...argValues) };
                                }
                                const result = evaluateNode({ type: "func", name: node.name, args }, {});
                                return { type: "num", value: result };
                            } catch (e) {
                                return { type: "func", name: node.name, args };
                            }
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
                        return Chalkboard.numb.roundTo(result, config.roundTo);
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
                return nodeToString(simplified);
            } catch (err) {
                if (err instanceof Error) {
                    throw new Error(`Chalkboard.real.parse: Error parsing real expression ${err.message}`);
                } else {
                    throw new Error(`Chalkboard.real.parse: Error parsing real expression ${String(err)}`);
                }
            }
        };

        /**
         * Evaluates the ping-pong function at a number.
         * @param {number} num - The number
         * @param {number} edge - The edge of the function
         * @param {number} scl - The scale of the function
         * @returns {number}
         */
        export const pingpong = (num: number, edge: number = 0, scl: number = 1): number => {
            if ((num + edge) % (2 * scl) < scl) {
                return (num + edge) % scl;
            } else {
                return scl - ((num + edge) % scl);
            }
        };

        /**
         * Defines a polynomial function by its coefficients.
         * @param {...number[]} coeffs - The coefficients of the polynomial, starting with the leading coefficient and ending with the constant term, which can be written either in an array or as separate arguments
         * @returns {ChalkboardFunction}
         */
        export const polynomial = (...coeffs: number[]): ChalkboardFunction => {
            let arr: number[];
            if (coeffs.length === 1 && Array.isArray(coeffs[0])) {
                arr = coeffs[0];
            } else {
                arr = coeffs;
            }
            while (arr.length > 1 && arr[0] === 0) {
                arr.shift();
            }
            const f = (x: number): number => {
                if (arr.length === 0) return 0;
                let result = arr[0];
                for (let i = 1; i < arr.length; i++) {
                    result = result * x + arr[i];
                }
                return result;
            };
            return Chalkboard.real.define(f);
        };

        /**
         * Calculates the exponentiation of a number or a function to the power of a number.
         * @param {number | ChalkboardFunction} base - The number or function
         * @param {number} num - The power
         * @returns {number | ChalkboardFunction}
         */
        export const pow = (base: number | ChalkboardFunction, num: number): number | ChalkboardFunction => {
            if (typeof base === "number") {
                if (base === 0 && num === 0) {
                    return 1;
                } else {
                    return Math.exp(num * Math.log(base));
                }
            } else {
                const func = base;
                if (func.field !== "real") throw new TypeError("Chalkboard.real.pow: Property 'field' of 'func' must be 'real'.");
                if (func.type.startsWith("scalar")) {
                    const f = func.rule as ((...x: number[]) => number);
                    const g = (...x: number[]) => f(...x) ** num;
                    return Chalkboard.real.define(g);
                } else if (func.type.startsWith("vector")) {
                    const f = func.rule as ((...x: number[]) => number)[];
                    const g = [];
                    for (let i = 0; i < f.length; i++) {
                        g.push((...x: number[]) => f[i](...x) ** num);
                    }
                    return Chalkboard.real.define(g);
                } else if (func.type.startsWith("curve")) {
                    const f = func.rule as ((t: number) => number)[];
                    const g = [];
                    for (let i = 0; i < f.length; i++) {
                        g.push((t: number) => f[i](t) ** num);
                    }
                    return Chalkboard.real.define(g);
                } else if (func.type.startsWith("surface")) {
                    const f = func.rule as ((s: number, t: number) => number)[];
                    const g = [];
                    for (let i = 0; i < f.length; i++) {
                        g.push((s: number, t: number) => f[i](s, t) ** num);
                    }
                    return Chalkboard.real.define(g);
                }
                throw new TypeError("Chalkboard.real.pow: Property 'type' of 'func' must be 'scalar2d', 'scalar3d', 'scalar4d', 'vector2d', 'vector3d', 'vector4d', 'curve2d', 'curve3d', 'curve4d', or 'surface3d'.");
            }
        };

        /**
         * Calculates the quadratic interpolation between three points.
         * @param {number[]} p1 - The first point
         * @param {number[]} p2 - The second point
         * @param {number[]} p3 - The third point
         * @param {number} t - The variable
         * @returns {number}
         */
        export const qerp = (p1: [number, number], p2: [number, number], p3: [number, number], t: number): number => {
            const a = p1[1] / ((p1[0] - p2[0]) * (p1[0] - p3[0])) + p2[1] / ((p2[0] - p1[0]) * (p2[0] - p3[0])) + p3[1] / ((p3[0] - p1[0]) * (p3[0] - p2[0]));
            const b =
                (-p1[1] * (p2[0] + p3[0])) / ((p1[0] - p2[0]) * (p1[0] - p3[0])) -
                (p2[1] * (p1[0] + p3[0])) / ((p2[0] - p1[0]) * (p2[0] - p3[0])) -
                (p3[1] * (p1[0] + p2[0])) / ((p3[0] - p1[0]) * (p3[0] - p2[0]));
            const c =
                (p1[1] * p2[0] * p3[0]) / ((p1[0] - p2[0]) * (p1[0] - p3[0])) +
                (p2[1] * p1[0] * p3[0]) / ((p2[0] - p1[0]) * (p2[0] - p3[0])) +
                (p3[1] * p1[0] * p2[0]) / ((p3[0] - p1[0]) * (p3[0] - p2[0]));
            return a * t * t + b * t + c;
        };

        /**
         * Defines a quadratic function.
         * @param {number} a - The leading coefficient
         * @param {number} b - The middle coefficient
         * @param {number} c - The last coefficient (the constant)
         * @param {"stan" | "vert"} [form="stan"] - The form of the polynomial, which can be "stan" for standard form or "vert" for vertex form
         * @returns {ChalkboardFunction}
         */
        export const quadratic = (a: number, b: number, c: number, form: "stan" | "vert" = "stan"): ChalkboardFunction => {
            if (form === "stan") {
                return Chalkboard.real.define((x: number) => a * x * x + b * x + c);
            } else if (form === "vert") {
                return Chalkboard.real.define((x: number) => a * (x - b) * (x - b) + c);
            } else {
                throw new TypeError("Chalkboard.real.quadratic: String 'form' must be 'stan' or 'vert'.");
            }
        };

        /**
         * Solves a quadratic equation.
         * @param {number} a - The leading coefficient
         * @param {number} b - The middle coefficient
         * @param {number} c - The last coefficient (the constant)
         * @param {"stan" | "vert"} [form="stan"] - The form of the polynomial, which can be "stan" for standard form or "vert" for vertex form
         * @returns {number[]}
         */
        export const quadraticFormula = (a: number, b: number, c: number, form: "stan" | "vert" = "stan"): [number, number] => {
            if (form === "stan") {
                return [(-b + Chalkboard.real.sqrt(Chalkboard.real.discriminant(a, b, c, "stan"))) / (2 * a), (-b - Math.sqrt(Chalkboard.real.discriminant(a, b, c, "stan"))) / (2 * a)];
            } else if (form === "vert") {
                return [b + Chalkboard.real.sqrt(-c / a), b - Chalkboard.real.sqrt(-c / a)];
            } else {
                throw new TypeError("Chalkboard.real.quadraticFormula: String 'form' must be 'stan' or 'vert'.");
            }
        };

        /**
         * Evaluates the ramp function at a number.
         * @param {number} num - The number
         * @param {number} edge - The edge of the function
         * @param {number} scl - The scale of the function
         * @returns {number}
         */
        export const ramp = (num: number, edge: number = 0, scl: number = 1): number => {
            if (num >= edge) {
                return num * scl;
            } else {
                return 0;
            }
        };

        /**
         * Defines a polynomial with random coefficients.
         * @param {number} degree - The degree of the polynomial
         * @param {number} [inf=0] - The lower bound of the coefficients (optional, defaults to 0)
         * @param {number} [sup=1] - The upper bound of the coefficients (optional, defaults to 1)
         * @returns {ChalkboardFunction}
         */
        export const randomPolynomial = (degree: number, inf: number = 0, sup: number = 1): ChalkboardFunction => {
            return Chalkboard.real.polynomial(...Chalkboard.stat.random(degree + 1, inf, sup));
        };

        /**
         * Calculates the reciprocation of a function.
         * @param {ChalkboardFunction} func - The function
         * @returns {ChalkboardFunction}
         */
        export const reciprocate = (func: ChalkboardFunction): ChalkboardFunction => {
            if (func.field !== "real") throw new TypeError("Chalkboard.real.reciprocate: Property 'field' of 'func' must be 'real'.");
            if (func.type.startsWith("scalar")) {
                const f = func.rule as ((...x: number[]) => number);
                const g = (...x: number[]) => 1 / f(...x);
                return Chalkboard.real.define(g);
            } else if (func.type.startsWith("vector")) {
                const f = func.rule as ((...x: number[]) => number)[];
                const g = [];
                for (let i = 0; i < f.length; i++) {
                    g.push((...x: number[]) => 1 / f[i](...x));
                }
                return Chalkboard.real.define(g);
            } else if (func.type.startsWith("curve")) {
                const f = func.rule as ((t: number) => number)[];
                const g = [];
                for (let i = 0; i < f.length; i++) {
                    g.push((t: number) => 1 / f[i](t));
                }
                return Chalkboard.real.define(g);
            } else if (func.type.startsWith("surface")) {
                const f = func.rule as ((s: number, t: number) => number)[];
                const g = [];
                for (let i = 0; i < f.length; i++) {
                    g.push((s: number, t: number) => 1 / f[i](s, t));
                }
                return Chalkboard.real.define(g);
            }
            throw new TypeError("Chalkboard.real.reciprocate: Property 'type' of 'func' must be 'scalar2d', 'scalar3d', 'scalar4d', 'vector2d', 'vector3d', 'vector4d', 'curve2d', 'curve3d', 'curve4d', or 'surface3d'.");
        };

        /**
         * Evaluates the rect function at a number.
         * @param {number} num the number
         * @param {number} center - The position of the function
         * @param {number} width - The width of the function
         * @param {number} scl - The scale of the function
         * @returns {number}
         */
        export const rect = (num: number, center: number = 0, width: number = 2, scl: number = 1): number => {
            if (num > center + width / 2 || num < center - width / 2) {
                return 0;
            } else {
                return scl;
            }
        };

        /**
         * Calculates the nth-root of a number.
         * @param {number} num - The number
         * @param {number} index - The index to root by
         * @returns {number}
         */
        export const root = (num: number, index: number = 3): number => {
            return Math.exp(Math.log(num) / index);
        };

        /**
         * Calculates the scalar multiplication of a function.
         * @param {ChalkboardFunction} func - The function
         * @param {number} num - The scalar
         * @returns {ChalkboardFunction}
         */
        export const scl = (func: ChalkboardFunction, num: number): ChalkboardFunction => {
            if (func.field !== "real") throw new TypeError("Chalkboard.real.scl: Property 'field' of 'func' must be 'real'.");
            if (func.type.startsWith("scalar")) {
                const f = func.rule as ((...x: number[]) => number);
                const g = (...x: number[]) => f(...x) * num;
                return Chalkboard.real.define(g);
            } else if (func.type.startsWith("vector")) {
                const f = func.rule as ((...x: number[]) => number)[];
                const g = [];
                for (let i = 0; i < f.length; i++) {
                    g.push((...x: number[]) => f[i](...x) * num);
                }
                return Chalkboard.real.define(g);
            } else if (func.type.startsWith("curve")) {
                const f = func.rule as ((t: number) => number)[];
                const g = [];
                for (let i = 0; i < f.length; i++) {
                    g.push((t: number) => f[i](t) * num);
                }
                return Chalkboard.real.define(g);
            } else if (func.type.startsWith("surface")) {
                const f = func.rule as ((s: number, t: number) => number)[];
                const g = [];
                for (let i = 0; i < f.length; i++) {
                    g.push((s: number, t: number) => f[i](s, t) * num);
                }
                return Chalkboard.real.define(g);
            }
            throw new TypeError("Chalkboard.real.scl: Property 'type' of 'func' must be 'scalar2d', 'scalar3d', 'scalar4d', 'vector2d', 'vector3d', 'vector4d', 'curve2d', 'curve3d', 'curve4d', or 'surface3d'.");
        };

        /**
         * Calculates the slope of two points.
         * @param {number} x1 - The x-coordinate of the first point
         * @param {number} y1 - The y-coordinate of the first point
         * @param {number} x2 - The x-coordinate of the first point
         * @param {number} y2 - The y-coordinate of the second point
         * @returns {number}
         */
        export const slope = (x1: number, y1: number, x2: number, y2: number): number => {
            return (y2 - y1) / (x2 - x1);
        };

        /**
         * Calculates the square root of a number.
         * @param {number} num - The number
         * @returns {number}
         */
        export const sqrt = (num: number): number => {
            if (num >= 0) {
                return Math.exp(Math.log(num) / 2);
            } else {
                return NaN;
            }
        };

        /**
         * Calculates the subtraction of two functions.
         * @param {ChalkboardFunction} func1 - The first function
         * @param {ChalkboardFunction} func2 - The second function
         * @returns {ChalkboardFunction}
         */
        export const sub = (func1: ChalkboardFunction, func2: ChalkboardFunction): ChalkboardFunction => {
            if (func1.field !== "real" || func2.field !== "real") throw new TypeError("Chalkboard.real.sub: Properties 'field' of 'func1' and 'func2' must be 'real'.");
            if (func1.type !== func2.type) throw new TypeError("Chalkboard.real.sub: Properties 'type' of 'func1' and 'func2' must be the same.");
            if (func1.type.startsWith("scalar")) {
                const f1 = func1.rule as ((...x: number[]) => number);
                const f2 = func2.rule as ((...x: number[]) => number);
                const g = (...x: number[]) => f1(...x) - f2(...x);
                return Chalkboard.real.define(g);
            } else if (func1.type.startsWith("vector")) {
                const f1 = func1.rule as ((...x: number[]) => number)[];
                const f2 = func2.rule as ((...x: number[]) => number)[];
                const g = [];
                for (let i = 0; i < f1.length; i++) {
                    g.push((...x: number[]) => f1[i](...x) - f2[i](...x));
                }
                return Chalkboard.real.define(g);
            } else if (func1.type.startsWith("curve")) {
                const f1 = func1.rule as ((t: number) => number)[];
                const f2 = func2.rule as ((t: number) => number)[];
                const g = [];
                for (let i = 0; i < f1.length; i++) {
                    g.push((t: number) => f1[i](t) - f2[i](t));
                }
                return Chalkboard.real.define(g);
            } else if (func1.type.startsWith("surface")) {
                const f1 = func1.rule as ((s: number, t: number) => number)[];
                const f2 = func2.rule as ((s: number, t: number) => number)[];
                const g = [];
                for (let i = 0; i < f1.length; i++) {
                    g.push((s: number, t: number) => f1[i](s, t) - f2[i](s, t));
                }
                return Chalkboard.real.define(g);
            }
            throw new TypeError("Chalkboard.real.sub: Properties 'type' of 'func1' and 'func2' must be 'scalar2d', 'scalar3d', 'scalar4d', 'vector2d', 'vector3d', 'vector4d', 'curve2d', 'curve3d', 'curve4d', or 'surface3d'.");
        };

        /**
         * Calculates the tetration of a number.
         * @param {number} base - The number
         * @param {number} num - The tetratant
         * @returns {number}
         */
        export const tetration = (base: number, num: number): number | undefined => {
            if (num === 0) {
                return 1;
            } else if (num > 0) {
                return Math.pow(base, Chalkboard.real.tetration(base, num - 1) as number);
            }
        };

        /**
         * Calculates the translation of a function, which can be horizontally, vertically, or both.
         * @param {ChalkboardFunction} func - The function
         * @param {number} h - Horizontal translation (positive moves right)
         * @param {number} v - Vertical translation (positive moves up)
         * @returns {ChalkboardFunction}
         */
        export const translate = (func: ChalkboardFunction, h: number = 0, v: number = 0): ChalkboardFunction => {
            if (func.field !== "real") throw new TypeError("Chalkboard.real.translate: Property 'field' of 'func' must be 'real'.");
            if (func.type === "scalar2d") {
                const f = func.rule as (x: number) => number;
                const g = (x: number) => f(x - h) + v;
                return Chalkboard.real.define(g);
            }
            throw new TypeError("Chalkboard.real.translate: Property 'type' of 'func' must be 'scalar2d'.");
        };

        /**
         * Calculates the value of a function at a value.
         * @param {ChalkboardFunction} func - The function
         * @param {number} val - The value
         * @returns {number | ChalkboardVector}
         */
        export const val = (func: ChalkboardFunction, val: number | ChalkboardVector): number | ChalkboardVector => {
            if (func.field !== "real") throw new TypeError("Chalkboard.real.val: Property 'field' of 'func' must be 'real'.");
            if (func.type === "scalar2d") {
                const f = func.rule as (x: number) => number;
                const x = val as number;
                return f(x);
            } else if (func.type === "scalar3d") {
                const f = func.rule as (x: number, y: number) => number;
                const v = val as ChalkboardVector as { x: number, y: number };
                return f(v.x, v.y);
            } else if (func.type === "scalar4d") {
                const f = func.rule as (x: number, y: number, z: number) => number;
                const v = val as ChalkboardVector as { x: number, y: number, z: number };
                return f(v.x, v.y, v.z);
            } else if (func.type === "vector2d") {
                const f = func.rule as [(x: number, y: number) => number, (x: number, y: number) => number];
                const v = val as ChalkboardVector as { x: number, y: number };
                return Chalkboard.vect.init(f[0](v.x, v.y), f[1](v.x, v.y));
            } else if (func.type === "vector3d") {
                const f = func.rule as [(x: number, y: number, z: number) => number, (x: number, y: number, z: number) => number, (x: number, y: number, z: number) => number];
                const v = val as ChalkboardVector as { x: number, y: number, z: number };
                return Chalkboard.vect.init(f[0](v.x, v.y, v.z), f[1](v.x, v.y, v.z), f[2](v.x, v.y, v.z));
            } else if (func.type === "vector4d") {
                const f = func.rule as [(x: number, y: number, z: number, w: number) => number, (x: number, y: number, z: number, w: number) => number, (x: number, y: number, z: number, w: number) => number, (x: number, y: number, z: number, w: number) => number];
                const v = val as ChalkboardVector as { x: number, y: number, z: number, w: number };
                return Chalkboard.vect.init(f[0](v.x, v.y, v.z, v.w), f[1](v.x, v.y, v.z, v.w), f[2](v.x, v.y, v.z, v.w), f[3](v.x, v.y, v.z, v.w));
            } else if (func.type === "curve2d") {
                const f = func.rule as [(t: number) => number, (t: number) => number];
                const t = val as number;
                return Chalkboard.vect.init(f[0](t), f[1](t));
            } else if (func.type === "curve3d") {
                const f = func.rule as [(t: number) => number, (t: number) => number, (t: number) => number];
                const t = val as number;
                return Chalkboard.vect.init(f[0](t), f[1](t), f[2](t));
            } else if (func.type === "curve4d") {
                const f = func.rule as [(t: number) => number, (t: number) => number, (t: number) => number, (t: number) => number];
                const t = val as number;
                return Chalkboard.vect.init(f[0](t), f[1](t), f[2](t), f[3](t));
            } else if (func.type === "surface3d") {
                const f = func.rule as [(s: number, t: number) => number, (s: number, t: number) => number, (s: number, t: number) => number];
                const v = val as ChalkboardVector as { x: number, y: number };
                return Chalkboard.vect.init(f[0](v.x, v.y), f[1](v.x, v.y), f[2](v.x, v.y));
            }
            throw new TypeError("Chalkboard.real.val: Property 'type' of 'func' must be 'scalar2d', 'scalar3d', 'scalar4d', 'vector2d', 'vector3d', 'vector4d', 'curve2d', 'curve3d', 'curve4d', or 'surface3d'");
        };

        /**
         * Defines a zero function of a particular type.
         * @param {"scalar2d" | "scalar3d" | "scalar4d" | "vector2d" | "vector3d" | "vector4d" | "curve2d" | "curve3d" | "curve4d" | "surface3d"} [type="scalar2d"] - The type of the function
         * @returns {ChalkboardFunction}
         */
        export const zero = (type: "scalar2d" | "scalar3d" | "scalar4d" | "vector2d" | "vector3d" | "vector4d" | "curve2d" | "curve3d" | "curve4d" | "surface3d" = "scalar2d"): ChalkboardFunction => {
            if (type === "scalar2d") {
                return Chalkboard.real.define((x) => 0);
            } else if (type === "scalar3d") {
                return Chalkboard.real.define((x, y) => 0);
            } else if (type === "scalar4d") {
                return Chalkboard.real.define((x, y, z) => 0);
            } else if (type === "vector2d") {
                return Chalkboard.real.define((x, y) => 0, (x, y) => 0);
            } else if (type === "vector3d") {
                return Chalkboard.real.define((x, y, z) => 0, (x, y, z) => 0, (x, y, z) => 0);
            } else if (type === "vector4d") {
                return Chalkboard.real.define((x, y, z, w) => 0, (x, y, z, w) => 0, (x, y, z, w) => 0, (x, y, z, w) => 0);
            } else if (type === "curve2d") {
                return Chalkboard.real.define((t) => 0, (t) => 0);
            } else if (type === "curve3d") {
                return Chalkboard.real.define((t) => 0, (t) => 0, (t) => 0);
            } else if (type === "curve4d") {
                return Chalkboard.real.define((t) => 0, (t) => 0, (t) => 0, (t) => 0);
            } else if (type === "surface3d") {
                return Chalkboard.real.define((s, t) => 0, (s, t) => 0, (s, t) => 0);
            }
            throw new TypeError("Chalkboard.real.zero: String 'type' must be 'scalar2d', 'scalar3d', 'scalar4d', 'vector2d', 'vector3d', 'vector4d', 'curve2d', 'curve3d', 'curve4d', or 'surface3d'.");
        };
    }
}
