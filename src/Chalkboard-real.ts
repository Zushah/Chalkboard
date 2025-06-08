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
         * @param {string} input - The real number expression to parse
         * @param {Record<string, number>} [values] - Optional object mapping variable names to values
         * @param {boolean} [returnAST=false] - If true, returns an abstract syntax tree (AST) instead of a string
         * @returns {string | number | { type: string, [key: string]: any }}
         */
        export const parse = (input: string, values?: Record<string, number>, returnAST: boolean = false): string | number | { type: string, [key: string]: any } => {
            const tokenize = (input: string): string[] => {
                const tokens: string[] = [];
                let i = 0;
                while (i < input.length) {
                    const ch = input[i];
                    if (/\s/.test(ch)) {
                        i++;
                        continue;
                    }
                    if ("+-*/^(),".indexOf(ch) !== -1) {
                        tokens.push(ch);
                        i++;
                        if (ch === ")" && i < input.length && (/[a-zA-Z0-9_]/.test(input[i]))) tokens.push("*");
                    } else if (/[0-9]/.test(ch) || (ch === "." && /[0-9]/.test(input[i+1]))) {
                        let num = "";
                        let hasDecimal = false;
                        while (i < input.length && ((/[0-9]/.test(input[i])) || (input[i] === "." && !hasDecimal))) {
                            if (input[i] === ".") hasDecimal = true;
                            num += input[i++];
                        }
                        tokens.push(num);
                        if (i < input.length && (/[a-zA-Z_]/.test(input[i]) || input[i] === "(")) tokens.push("*");
                    } else if (/[a-zA-Z_]/.test(ch)) {
                        let name = "";
                        while (i < input.length && /[a-zA-Z0-9_]/.test(input[i])) {
                            name += input[i++];
                        }
                        tokens.push(name);
                        if (i < input.length && (/[a-zA-Z_]/.test(input[i]) || input[i] === "(")) tokens.push("*");
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
                    let node = parseExponent();
                    while (peek() === "*" || peek() === "/") {
                        const op = consume();
                        const right = parseExponent();
                        node = { type: op === "*" ? "mul" : "div", left: node, right };
                    }
                    return node;
                };
                const parseExponent = (): { type: string, [key: string]: any } => {
                    let node = parseUnary();
                    if (peek() === "^") {
                        consume("^");
                        const right = parseExponent();
                        node = { type: "pow", base: node, exponent: right };
                    }
                    return node;
                };
                const parseUnary = (): { type: string, [key: string]: any } => {
                    if (peek() === "-") {
                        consume("-");
                        return { type: "neg", expr: parseUnary() };
                    } else if (peek() === "+") {
                        consume("+");
                        return parseUnary();
                    }
                    return parsePrimary();
                };
                const parsePrimary = (): { type: string, [key: string]: any } => {
                    const token = peek();
                    if (/^[0-9.]/.test(token)) {
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
                    case "num":
                        return node.value;
                    case "var":
                        const varname = node.name;
                        if (!(varname in values)) throw new Error(`Chalkboard.real.parse: Variable '${varname}' not defined in values`);
                        return values[varname];
                    case "add": return evaluateNode(node.left, values) + evaluateNode(node.right, values);
                    case "sub": return evaluateNode(node.left, values) - evaluateNode(node.right, values);
                    case "mul": return evaluateNode(node.left, values) * evaluateNode(node.right, values);
                    case "div": return evaluateNode(node.left, values) / evaluateNode(node.right, values);
                    case "pow": return Math.pow(evaluateNode(node.base, values), evaluateNode(node.exponent, values));
                    case "neg": return -evaluateNode(node.expr, values);
                    case "func":
                        const funcName = node.name.toLowerCase();
                        const args = node.args.map((arg: { type: string, [key: string]: any }) => evaluateNode(arg, values));
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
                throw new Error(`Chalkboard.real.parse: Unknown node type ${node.type}`);
            };
            const nodeToString = (node: { type: string, [key: string]: any }): string => {
                switch (node.type) {
                    case "num":
                        return node.value.toString();
                    case "var":
                        return node.name;
                    case "add":
                        return `${nodeToString(node.left)} + ${nodeToString(node.right)}`;
                    case "sub":
                        const rightStr = node.right.type === "add" || node.right.type === "sub" ?`(${nodeToString(node.right)})` : nodeToString(node.right);
                        return `${nodeToString(node.left)} - ${rightStr}`;
                    case "mul":
                        const leftMul = (node.left.type === "add" || node.left.type === "sub") ? `(${nodeToString(node.left)})` : nodeToString(node.left);
                        const rightMul = (node.right.type === "add" || node.right.type === "sub") ? `(${nodeToString(node.right)})` : nodeToString(node.right);
                        if ((node.left.type === "num" && node.right.type === "var") || 
                            (node.left.type === "var" && node.right.type === "var")) {
                            return `${leftMul}${rightMul}`;
                        } else {
                            return `${leftMul} * ${rightMul}`;
                        }
                    case "div":
                        const leftDiv = (node.left.type === "add" || node.left.type === "sub") ? `(${nodeToString(node.left)})` : nodeToString(node.left);
                        const rightDiv = (node.right.type === "add" || node.right.type === "sub" || node.right.type === "mul" || node.right.type === "div") ? `(${nodeToString(node.right)})` : nodeToString(node.right);
                        return `${leftDiv} / ${rightDiv}`;
                    case "pow":
                        const baseStr = (node.base.type !== "num" && node.base.type !== "var") ? `(${nodeToString(node.base)})` : nodeToString(node.base);
                        const expStr = (node.exponent.type !== "num" && node.exponent.type !== "var") ? `(${nodeToString(node.exponent)})` : nodeToString(node.exponent);
                        return `${baseStr}^${expStr}`;
                    case "neg":
                        const exprStr = (node.expr.type !== "num" && node.expr.type !== "var") ? `(${nodeToString(node.expr)})` : nodeToString(node.expr);
                        return `-${exprStr}`;
                    case "func":
                        return `${node.name}(${node.args.map((arg: { type: string, [key: string]: any }) => nodeToString(arg)).join(", ")})`;
                }
                return "";
            };
            const areEqualVars = (a: { type: string, [key: string]: any }, b: { type: string, [key: string]: any }): boolean => {
                if (a.type === "var" && b.type === "var") return a.name === b.name;
                return JSON.stringify(a) === JSON.stringify(b);
            };
            const simplifyNode = (node: { type: string, [key: string]: any }): { type: string, [key: string]: any } => {
                switch (node.type) {
                    case "num":
                    case "var":
                        return node;
                    case "add":
                        const left = simplifyNode(node.left);
                        const right = simplifyNode(node.right);
                        if (left.type === "num" && left.value === 0) return right;
                        if (right.type === "num" && right.value === 0) return left;
                        if (left.type === "num" && right.type === "num") return { type: "num", value: left.value + right.value };
                        if (areEqualVars(left, right)) return { type: "mul", left: { type: "num", value: 2 }, right: left };
                        if (left.type === "mul" && right.type === "mul" && areEqualVars(left.right, right.right)) return { type: "mul", left: { type: "add", left: simplifyNode(left.left), right: simplifyNode(right.left) }, right: left.right };
                        if (right.type === "mul" && areEqualVars(left, right.right)) return { type: "mul", left: { type: "add", left: { type: "num", value: 1 }, right: simplifyNode(right.left) }, right: left };
                        if (left.type === "mul" && areEqualVars(right, left.right)) return { type: "mul", left: { type: "add", left: simplifyNode(left.left), right: { type: "num", value: 1 } }, right: right };
                        return { type: "add", left, right };
                    case "sub":
                        const leftSub = simplifyNode(node.left);
                        const rightSub = simplifyNode(node.right);
                        if (rightSub.type === "num" && rightSub.value === 0) return leftSub;
                        if (leftSub.type === "num" && rightSub.type === "num") return { type: "num", value: leftSub.value - rightSub.value };
                        if (areEqualVars(leftSub, rightSub)) return { type: "num", value: 0 };
                        if (leftSub.type === "mul" && rightSub.type === "mul" && areEqualVars(leftSub.right, rightSub.right)) return { type: "mul", left: { type: "sub", left: simplifyNode(leftSub.left), right: simplifyNode(rightSub.left) }, right: leftSub.right };
                        return { type: "sub", left: leftSub, right: rightSub };
                    case "mul":
                        const leftMul = simplifyNode(node.left);
                        const rightMul = simplifyNode(node.right);
                        if ((leftMul.type === "num" && leftMul.value === 0) || (rightMul.type === "num" && rightMul.value === 0)) return { type: "num", value: 0 };
                        if (leftMul.type === "num" && leftMul.value === 1) return rightMul;
                        if (rightMul.type === "num" && rightMul.value === 1) return leftMul;
                        if (leftMul.type === "num" && rightMul.type === "num") return { type: "num", value: leftMul.value * rightMul.value };
                        if (areEqualVars(leftMul, rightMul)) return { type: "pow", base: leftMul, exponent: { type: "num", value: 2 } };
                        if (rightMul.type === "pow" && areEqualVars(leftMul, rightMul.base)) return { type: "pow", base: leftMul, exponent: { type: "add", left: { type: "num", value: 1 }, right: rightMul.exponent } };
                        if (leftMul.type === "pow" && areEqualVars(rightMul, leftMul.base)) return { type: "pow", base: rightMul, exponent: { type: "add",left: leftMul.exponent, right: { type: "num", value: 1 } } };
                        if (leftMul.type === "pow" && rightMul.type === "pow" && areEqualVars(leftMul.base, rightMul.base)) return { type: "pow", base: leftMul.base, exponent: { type: "add", left: simplifyNode(leftMul.exponent), right: simplifyNode(rightMul.exponent) } };
                        return { type: "mul", left: leftMul, right: rightMul };
                    case "div":
                        const leftDiv = simplifyNode(node.left);
                        const rightDiv = simplifyNode(node.right);
                        if (leftDiv.type === "num" && leftDiv.value === 0) return { type: "num", value: 0 };
                        if (rightDiv.type === "num" && rightDiv.value === 1) return leftDiv;
                        if (leftDiv.type === "num" && rightDiv.type === "num") return { type: "num", value: leftDiv.value / rightDiv.value };
                        if (areEqualVars(leftDiv, rightDiv)) return { type: "num", value: 1 };
                        if (leftDiv.type === "pow" && rightDiv.type === "pow" && areEqualVars(leftDiv.base, rightDiv.base)) return { type: "pow", base: leftDiv.base, exponent: { type: "sub", left: simplifyNode(leftDiv.exponent), right: simplifyNode(rightDiv.exponent) } };
                        if (leftDiv.type === "pow" && areEqualVars(leftDiv.base, rightDiv)) return { type: "pow", base: rightDiv, exponent: { type: "sub", left: simplifyNode(leftDiv.exponent), right: { type: "num", value: 1 } } };
                        if (rightDiv.type === "pow" && areEqualVars(leftDiv, rightDiv.base)) return { type: "pow", base: leftDiv, exponent: { type: "sub", left: { type: "num", value: 1 }, right: simplifyNode(rightDiv.exponent) } };
                        return { type: "div", left: leftDiv, right: rightDiv };
                    case "pow":
                        const base = simplifyNode(node.base);
                        const exponent = simplifyNode(node.exponent);
                        if (exponent.type === "num" && exponent.value === 0) return { type: "num", value: 1 };
                        if (exponent.type === "num" && exponent.value === 1) return base;
                        if (base.type === "num" && base.value === 0 && exponent.type === "num" && exponent.value > 0) return { type: "num", value: 0 };
                        if (base.type === "num" && base.value === 1) return { type: "num", value: 1 };
                        if (base.type === "num" && exponent.type === "num") return { type: "num", value: Math.pow(base.value, exponent.value) };
                        if (base.type === "pow") return { type: "pow", base: base.base, exponent: { type: "mul", left: simplifyNode(base.exponent), right: exponent } };
                        return { type: "pow", base, exponent };
                    case "neg":
                        const expr = simplifyNode(node.expr);
                        if (expr.type === "neg") return expr.expr;
                        if (expr.type === "num") return { type: "num", value: -expr.value };
                        return { type: "neg", expr };
                    case "func": 
                        const args = node.args.map((arg: { type: string, [key: string]: any }) => simplifyNode(arg));
                        if (args.every((arg: { type: string, [key: string]: any }) => arg.type === "num")) {
                            try {
                                const result = evaluateNode({ type: "func", name: node.name, args }, {});
                                return { type: "num", value: result };
                            } catch (e) {
                                return { type: "func", name: node.name, args };
                            }
                        }
                        return { type: "func", name: node.name, args };
                }
                return node;
            };
            try {
                const tokens = tokenize(input);
                const ast = parseTokens(tokens);
                if (values && Object.keys(values).length > 0) return evaluateNode(ast, values);
                const simplified = simplifyNode(ast);
                if (returnAST) return simplified;
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
