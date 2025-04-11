/*
    The Chalkboard Library - Boolean Algebra Namespace
    Version 2.2.0 Galois
*/
/// <reference path="Chalkboard.ts"/>
namespace Chalkboard {
    /**
     * The boolean algebra namespace
     * @namespace
     */
    export namespace bool {
        /** @ignore */
        const $ = (x: boolean): boolean | 0 | 1 => mode === "boolean" ? x : (x ? 1 : 0);

        /**
         * Calculates the logical AND operation on two or more values.
         * @param {...(boolean | 0 | 1)[]} vals - Two or more values
         * @returns {boolean | 0 | 1}
         * @example
         * const x = Chalkboard.bool.AND(true, true); // Returns true
         * const y = Chalkboard.bool.AND(true, true, false); // Returns false
         */
        export const AND = (...vals: (boolean | 0 | 1)[]): boolean | 0 | 1 => {
            let result = true;
            for (let i = 0; i < vals.length; i++) {
                const current = vals[i] === true || vals[i] === 1;
                if (!current) {
                    result = false;
                    break;
                }
            }
            return $(result);
        };

        /**
         * Calculates the biconditional (if and only if) operation on two or more values.
         * @param {...(boolean | 0 | 1)[]} vals - Two or more values.
         * @returns {boolean | 0 | 1}
         * @example
         * const x = Chalkboard.bool.BICOND(true, true, true); // Returns true
         * const y = Chalkboard.bool.BICOND(true, false, true); // Returns false
         * const z = Chalkboard.bool.BICOND(false, false, false); // Returns true
         */
        export const BICOND = (...vals: (boolean | 0 | 1)[]): boolean | 0 | 1 => {
            if (vals.length === 0) return $(true);
            const first = (vals[0] === true || vals[0] === 1);
            for (let i = 1; i < vals.length; i++) {
                const current = (vals[i] === true || vals[i] === 1);
                if (first !== current) return $(false);
            }
            return $(true);
        };

        /**
         * Calculates the conditional (implication) operation on two or more values. It works as a chain, i.e. it returns true if every adjacent pair (p, q) satisfies p ∧ ¬q.
         * @param {...(boolean | 0 | 1)[]} vals - Two or more values
         * @returns {boolean | 0 | 1}
         * @example
         * const x = Chalkboard.bool.COND(false, false, true); // Returns true
         * const y = Chalkboard.bool.COND(true, false, true); // Returns false
         */
        export const COND = (...vals: (boolean | 0 | 1)[]): boolean | 0 | 1 => {
            if (vals.length < 2) return $(true);
            for (let i = 0; i < vals.length - 1; i++) {
                const xp = (vals[i] === true || vals[i] === 1);
                const xq = (vals[i + 1] === true || vals[i + 1] === 1);
                if (xp && !xq) return $(false);
            }
            return $(true);
        };

        /**
         * Calculates the converse of the conditional operation on two or more values. It works as a chain, i.e. it returns true if every adjacent pair (p, q) satisfies q ∧ ¬p.
         * @param {...(boolean | 0 | 1)[]} vals - Two or more values
         * @returns {boolean | 0 | 1}
         * @example
         * const x = Chalkboard.bool.CONV(false, false, true); // Returns true
         * const y = Chalkboard.bool.CONV(true, false, true); // Returns false
         */
        export const CONV = (...vals: (boolean | 0 | 1)[]): boolean | 0 | 1 => {
            if (vals.length < 2) return $(true);
            for (let i = 0; i < vals.length - 1; i++) {
                const xp = (vals[i] === true || vals[i] === 1);
                const xq = (vals[i + 1] === true || vals[i + 1] === 1);
                if (xq && !xp) return $(false);
            }
            return $(true);
        };

        /**
         * Calculates a Karnaugh map (K-map) for a boolean expression. It supports 2, 3, or 4 variables and returns a 2D array representing the K-map with cells as 0 or 1.
         * @param {string} input - The boolean expression to map
         * @param {string[]} variables - An array of variable names (order matters)
         * @returns {(boolean | 0 | 1)[][]}
         * @example
         * // For a 3-variable expression
         * const kmap = Chalkboard.bool.Karnaugh("x & !y | z", ["x", "y", "z"]);
         */
        export const Karnaugh = (input: string, variables: string[]): (boolean | 0 | 1)[][] => {
            const n = variables.length;
            if(n !== 2 && n !== 3 && n !== 4) {
                throw new Error("Chalkboard.bool.Karnaugh only supports 2, 3, or 4 variables.");
            }
            let rowvars: string[];
            let colvars: string[];
            let rows: string[];
            let cols: string[];
            const grayCodes = (bits: number): string[] => {
                if (bits === 0) return [""];
                const prev = grayCodes(bits - 1);
                const result: string[] = [];
                for (let code of prev) {
                    result.push("0" + code);
                }
                for (let code of prev.slice().reverse()) {
                    result.push("1" + code);
                }
                return result;
            };
            if (n === 2) {
                rowvars = [variables[0]];
                colvars = [variables[1]];
                rows = grayCodes(1);
                cols = grayCodes(1);
            } else if (n === 3) {
                rowvars = [variables[0]];
                colvars = variables.slice(1);
                rows = grayCodes(1);
                cols = grayCodes(2);
            } else {
                rowvars = variables.slice(0,2);
                colvars = variables.slice(2);
                rows = grayCodes(2);
                cols = grayCodes(2);
            }
            const result: (boolean | 0 | 1)[][] = [];
            for (let r of rows) {
                const row: (boolean | 0 | 1)[] = [];
                for (let c of cols) {
                    const values: Record<string, boolean | 0 | 1> = {};
                    for (let i = 0; i < rowvars.length; i++) {
                        values[rowvars[i]] = r[i] === "1";
                    }
                    for (let j = 0; j < colvars.length; j++) {
                        values[colvars[j]] = c[j] === "1";
                    }
                    const parsed = Chalkboard.bool.parse(input, values);
                    const booled = parsed === true || parsed === 1;
                    row.push($(booled));
                }
                result.push(row);
            }
            return result;
        };

        /**
         * Calculates the minimization of a boolean expression using the Quine-McCluskey algorithm.
         * @param {string} input - The boolean expression
         * @param {string[]} variables - An array of variable names (order matters)
         * @returns {string}
         * @example
         * const min = Chalkboard.bool.minimize("x & y | x & z", ["x", "y", "z"]); // Returns "x & (y | z)"
         */
        export const minimize = (input: string, variables: string[]): string => {
            if (variables.length === 0) {
                const result = Chalkboard.bool.parse(input, {});
                return result ? "true" : "false";
            }
            if (variables.length !== 2 && variables.length !== 3 && variables.length !== 4) {
                throw new Error("Chalkboard.bool.minimize only supports 2, 3, or 4 variables.");
            }
            try {
                const primes = Chalkboard.bool.primeImplicants(input, variables);
                if (primes.length === 0) {
                    return "false";
                }
                if (primes.some((term) => term === "true")) {
                    return "true";
                }
                return primes.join(" | ");
            } catch (e) {
                if (e instanceof Error) {
                    throw new Error(`Error minimizing expression: ${e.message}`);
                } else {
                    throw new Error(`Error minimizing expression: ${String(e)}`);
                }
            }
        };

        /** @ignore */
        let mode: "boolean" | "binary" = "boolean";

        /**
         * Configures the output mode for boolean operations. The default is "boolean".
         * @param {"boolean" | "binary"} config - The new mode to set, which can be either "boolean" or "binary"
         * @returns {void}
         * @example
         * Chalkboard.bool.modeConfig("binary"); // Sets the mode to binary
         * const x = Chalkboard.bool.AND(true, false); // Returns 0 in binary mode
         * Chalkboard.bool.modeConfig("boolean"); // Sets the mode to boolean
         * const y = Chalkboard.bool.AND(true, false); // Returns false in boolean mode
         */
        export const modeConfig = (config: "boolean" | "binary"): void => {
            if (config !== "boolean" && config !== "binary") {
                throw new Error('The mode must be either "boolean" or "binary".');
            }
            mode = config;
        };

        /**
         * Calculates the logical NAND (NOT AND) operation on two or more values.
         * @param {...(boolean | 0 | 1)[]} vals - Two or more values
         * @returns {boolean | 0 | 1}
         * @example
         * const x = Chalkboard.bool.NAND(true, true, true); // Returns false
         * const y = Chalkboard.bool.NAND(true, true, false); // Returns true
         */
        export const NAND = (...vals: (boolean | 0 | 1)[]): boolean | 0 | 1 => {
            const andResult = AND(...vals);
            return $(!(andResult === true || andResult === 1));
        };

        /**
         * Calculates the opposite of the biconditional operation on two or more values.
         * @param {...(boolean | 0 | 1)[]} vals - Two or more values
         * @returns {boolean | 0 | 1}
         * @example
         * const x = Chalkboard.bool.BICOND(true, true, true); // Returns false
         * const y = Chalkboard.bool.BICOND(true, false, true); // Returns true
         * const z = Chalkboard.bool.BICOND(false, false, false); // Returns false
         */
        export const NBICOND = (...vals: (boolean | 0 | 1)[]): boolean | 0 | 1 => {
            const bicondResult = BICOND(...vals);
            return $(!(bicondResult === true || bicondResult === 1));
        };

        /**
         * Calculates the opposite of the conditional (non-implication) on two or more values. It works as a chain, i.e. it returns true only if every adjacent pair (p, q) satisfies ¬p ∨ q.
         * @param {...(boolean | 0 | 1)[]} vals - Two or more values
         * @returns {boolean | 0 | 1}
         * @example
         * const x = Chalkboard.bool.COND(false, false, true); // Returns false
         * const y = Chalkboard.bool.COND(true, false, true); // Returns true
         */
        export const NCOND = (...vals: (boolean | 0 | 1)[]): boolean | 0 | 1 => {
            if (vals.length < 2) return $(false);
            for (let i = 0; i < vals.length - 1; i++) {
                const xp = (vals[i] === true || vals[i] === 1);
                const xq = (vals[i + 1] === true || vals[i + 1] === 1);
                if (!(xp && !xq)) return $(false);
            }
            return $(true);
        };

        /**
         * Calculates the opposite of the converse of the conditional on two or more values. It works as a chain, i.e. it returns true only if every adjacent pair (p, q) satisfies ¬q ∨ p.
         * @param {...(boolean | 0 | 1)[]} vals - Two or more values
         * @returns {boolean | 0 | 1}
         * @example
         * const x = Chalkboard.bool.CONV(false, false, true); // Returns false
         * const y = Chalkboard.bool.CONV(true, false, true); // Returns true
         */
        export const NCONV = (...vals: (boolean | 0 | 1)[]): boolean | 0 | 1 => {
            if (vals.length < 2) return $(false);
            for (let i = 0; i < vals.length - 1; i++) {
                const xp = (vals[i] === true || vals[i] === 1);
                const xq = (vals[i + 1] === true || vals[i + 1] === 1);
                if (!(xq && !xp)) return $(false);
            }
            return $(true);
        };

        /**
         * Calculates the logical NOR (NOT OR) operation on two or more values.
         * @param {...(boolean | 0 | 1)[]} vals - Two or more values
         * @returns {boolean | 0 | 1}
         * @example
         * const x = Chalkboard.bool.NOR(false, false, false); // Returns true
         * const y = Chalkboard.bool.NOR(true, false, false); // Returns false
         */
        export const NOR = (...vals: (boolean | 0 | 1)[]): boolean | 0 | 1 => {
            for (let i = 0; i < vals.length; i++) {
                const x = (vals[i] === true || vals[i] === 1);
                if (x) return $(false);
            }
            return $(true);
        };

        /**
         * Calculates the logical NOT operation on one or more values. When more than one value is inputted, it applies NOT to each and then returns true only if all values are false.
         * @param {...(boolean | 0 | 1)[]} vals - One or more values.
         * @returns {boolean | 0 | 1}
         * @example
         * const x = Chalkboard.bool.NOT(false); // Returns true
         * const y = Chalkboard.bool.NOT(true, false, false); // Returns false
         * const z = Chalkboard.bool.NOT(false, false, false); // Returns true
         */
        export const NOT = (...vals: (boolean | 0 | 1)[]): boolean | 0 | 1 => {
            if (vals.length === 0) return $(true);
            let result = true;
            for (let i = 0; i < vals.length; i++) {
                const x = (vals[i] === true || vals[i] === 1);
                result = result && !x;
            }
            return $(result);
        };

        /**
         * Calculates the logical OR operation on two or more values.
         * @param {...(boolean | 0 | 1)[]} vals - Two or more values
         * @returns {boolean | 0 | 1}
         * @example
         * const x = Chalkboard.bool.OR(false, false, true); // Returns true
         * const y = Chalkboard.bool.OR(false, false, false); // Returns false
         */
        export const OR = (...vals: (boolean | 0 | 1)[]): boolean | 0 | 1 => {
            let result = false;
            for (let i = 0; i < vals.length; i++) {
                const x = (vals[i] === true || vals[i] === 1);
                if (x) { result = true; break; }
            }
            return $(result);
        };

        /**
         * Parses, simplifies, and optionally evaluates a boolean expression. When called with values, it evaluates the expression with the provided variable values, and otherwise, it simplifies the expression to its minimal form. Supports variables (a-z, A-Z, 0-9, _), operators (!, &, |), and parentheses.
         * @param {string} input - The boolean expression to parse
         * @param {Record<string, boolean | 0 | 1>} [values] - Optional object mapping variable names to values
         * @param {boolean} [returnAST=false] - If true, returns an abstract syntax tree (AST) instead of a string
         * @returns {string | boolean | 0 | 1 | { type: string, [key: string]: any }}
         * @example
         * // Simplify expression
         * const p = Chalkboard.bool.parse("x & !x | y & x | y & !x"); // Returns "y"
         * const q = Chalkboard.bool.parse("(x & y) | (x & z)"); // Returns "x & (y | z)"
         * 
         * // Evaluate expression with values
         * const r = Chalkboard.bool.parse("x & y | z", { x: true, y: false, z: true }); // Returns true
         * const s = Chalkboard.bool.parse("a & !b", { a: 1, b: 0 }); // Returns true
         * 
         * // Get AST representation
         * const t = Chalkboard.bool.parse("x & y", {}, true); // Returns AST object
         */
        export const parse = (input: string, values?: Record<string, boolean | 0 | 1>, returnAST: boolean = false): string | boolean | 0 | 1 | { type: string, [key: string]: any } => {
            const tokenize = (input: string): string[] => {
                const tokens: string[] = [];
                let i = 0;
                while (i < input.length) {
                    const ch = input[i];
                    if (/\s/.test(ch)) {
                        i++;
                        continue;
                    }
                    if ("!&|()".indexOf(ch) !== -1) {
                        tokens.push(ch);
                        i++;
                    } else {
                        let name = "";
                        while (i < input.length && /[a-zA-Z0-9_]/.test(input[i])) {
                            name += input[i++];
                        }
                        tokens.push(name);
                    }
                }
                return tokens;
            };
            const parseTokens = (tokens: string[]): { type: string, [key: string]: any } => {
                let pos = 0;
                const peek = (): string => tokens[pos];
                const consume = (token?: string): string => {
                    if (token && tokens[pos] !== token) {
                        throw new Error(`Expected token ${token} but found ${tokens[pos]}`);
                    }
                    return tokens[pos++];
                };
                const parseExpression = (): { type: string, [key: string]: any } => parseOr();
                const parseOr = (): { type: string, [key: string]: any } => {
                    let node = parseAnd();
                    while (peek() === "|") {
                        consume("|");
                        node = { type: "or", left: node, right: parseAnd() };
                    }
                    return node;
                };
                const parseAnd = (): { type: string, [key: string]: any } => {
                    let node = parseNot();
                    while (peek() === "&") {
                        consume("&");
                        node = { type: "and", left: node, right: parseNot() };
                    }
                    return node;
                };
                const parseNot = (): { type: string, [key: string]: any } => {
                    if (peek() === "!") {
                        consume("!");
                        return { type: "not", expr: parseNot() };
                    }
                    return parsePrimary();
                };
                const parsePrimary = (): { type: string, [key: string]: any } => {
                    const token = peek();
                    if (token === "(") {
                        consume("(");
                        const node = parseExpression();
                        consume(")");
                        return node;
                    }
                    if (token === "true") {
                        consume();
                        return { type: "bool", value: true };
                    }
                    if (token === "false") {
                        consume();
                        return { type: "bool", value: false };
                    }
                    consume();
                    return { type: "var", name: token };
                };
                const ast = parseExpression();
                if (pos < tokens.length) throw new Error("Unexpected tokens at end");
                return ast;
            };
            const nodeEqual = (a: { type: string, [key: string]: any }, b: { type: string, [key: string]: any }): boolean => {
                if (a.type !== b.type) return false;
                switch(a.type) {
                    case "bool":
                        return a.value === b.value;
                    case "var":
                        return a.name === b.name;
                    case "not":
                        return nodeEqual(a.expr, b.expr);
                    case "and":
                    case "or":
                        return nodeEqual(a.left, b.left) && nodeEqual(a.right, b.right);
                }
                return false;
            };
            const nodeToString = (node: { type: string, [key: string]: any }): string => {
                switch (node.type) {
                    case "bool":
                        return node.value ? "true" : "false";
                    case "var":
                        return node.name;
                    case "not":
                        const inner = node.expr.type === "var" ? 
                            nodeToString(node.expr) : 
                            `(${nodeToString(node.expr)})`;
                        return `!${inner}`;
                    case "and":
                        const leftAnd = node.left.type === "or" ? 
                            `(${nodeToString(node.left)})` : 
                            nodeToString(node.left);
                        const rightAnd = node.right.type === "or" ? 
                            `(${nodeToString(node.right)})` : 
                            nodeToString(node.right);
                        return `${leftAnd} & ${rightAnd}`;
                    case "or":
                        return `${nodeToString(node.left)} | ${nodeToString(node.right)}`;
                }
                return "";
            };
            const getAndFactors = (node: { type: string, [key: string]: any }): Array<{ type: string, [key: string]: any }> => {
                if (node.type === "and") {
                    return [...getAndFactors(node.left), ...getAndFactors(node.right)];
                }
                return [node];
            };
            const detectTautology = (left: { type: string, [key: string]: any }, right: { type: string, [key: string]: any }): boolean => {
                if (left.type === "not" && right.type === "var" && 
                    nodeEqual(left.expr, right)) {
                    return true;
                }
                if (right.type === "not" && left.type === "var" && 
                    nodeEqual(right.expr, left)) {
                    return true;
                }
                return false;
            };
            const simplifyOrNode = (node: { type: string, left: any, right: any, [key: string]: any }): { type: string, [key: string]: any } => {
                if (node.type !== "or") return node;
                const left = simplifyNode(node.left);
                const right = simplifyNode(node.right);
                if (detectTautology(left, right)) {
                    return { type: "bool", value: true };
                }
                if (left.type === "bool" && left.value === true) return { type: "bool", value: true };
                if (right.type === "bool" && right.value === true) return { type: "bool", value: true };
                if (left.type === "bool" && left.value === false) return right;
                if (right.type === "bool" && right.value === false) return left;
                const leftFactors = left.type === "and" ? getAndFactors(left) : [left];
                const rightFactors = right.type === "and" ? getAndFactors(right) : [right];
                const commons: Array<{ type: string, [key: string]: any }> = [];
                leftFactors.forEach(fa => {
                    if (rightFactors.some(fb => nodeEqual(fa, fb)) &&
                        !commons.some(c => nodeEqual(c, fa))) {
                        commons.push(fa);
                    }
                });
                for (let i = 0; i < leftFactors.length; i++) {
                    for (let j = 0; j < rightFactors.length; j++) {
                        if (detectTautology(leftFactors[i], rightFactors[j])) {
                            return commons.length === 0 ? 
                                { type: "bool", value: true } : 
                                commons.reduce((acc, cur) => ({ type: "and", left: acc, right: cur }));
                        }
                    }
                }
                if (commons.length > 0) {
                    const removeCommon = (factors: Array<{ type: string, [key: string]: any }>): { type: string, [key: string]: any } => {
                        const remaining = factors.filter(f => 
                            !commons.some(c => nodeEqual(c, f))
                        );
                        if (remaining.length === 0) return { type: "bool", value: true };
                        if (remaining.length === 1) return remaining[0];
                        return remaining.reduce((acc, cur) => 
                            ({ type: "and", left: acc, right: cur })
                        );
                    };
                    
                    const newLeft = removeCommon(leftFactors);
                    const newRight = removeCommon(rightFactors);

                    let combined: { type: string, [key: string]: any };
                    if ((newLeft.type === "bool" && newLeft.value === true) || 
                        (newRight.type === "bool" && newRight.value === true)) {
                        combined = { type: "bool", value: true };
                    } else {
                        combined = { type: "or", left: newLeft, right: newRight };
                    }

                    return commons.reduce((acc, cur) => 
                        ({ type: "and", left: acc, right: cur }), combined);
                }
                return { type: "or", left, right };
            };
            const simplifyNode = (node: { type: string, [key: string]: any }): { type: string, [key: string]: any } => {
                switch (node.type) {
                    case "bool":
                    case "var":
                        return node;
                    case "not":
                        const expr = simplifyNode(node.expr);
                        if (expr.type === "not") return simplifyNode(expr.expr);
                        if (expr.type === "bool") return { type: "bool", value: !expr.value };
                        return { type: "not", expr };
                    case "and":
                        const left = simplifyNode(node.left);
                        const right = simplifyNode(node.right);

                        if ((left.type === "bool" && left.value === false) || 
                            (right.type === "bool" && right.value === false)) {
                            return { type: "bool", value: false };
                        }
                        if (left.type === "bool" && left.value === true) return right;
                        if (right.type === "bool" && right.value === true) return left;
                        if (nodeEqual(left, right)) return left;

                        if ((left.type === "not" && nodeEqual(left.expr, right)) ||
                            (right.type === "not" && nodeEqual(right.expr, left))) {
                            return { type: "bool", value: false };
                        }
                        return { type: "and", left, right };
                    case "or":
                        return simplifyOrNode(node as { type: string, left: any, right: any, [key: string]: any });
                }
                return node;
            };
            const evaluateNode = (node: { type: string, [key: string]: any }, values: Record<string, boolean | 0 | 1>): boolean => {
                switch (node.type) {
                    case "bool":
                        return node.value;
                    case "var":
                        const varname = node.name;
                        if (!(varname in values)) {
                            throw new Error(`Variable "${varname}" not defined in values`);
                        }
                        const value = values[varname];
                        return value === true || value === 1;
                    case "not":
                        return !evaluateNode(node.expr, values);
                    case "and":
                        return evaluateNode(node.left, values) && evaluateNode(node.right, values);
                    case "or":
                        return evaluateNode(node.left, values) || evaluateNode(node.right, values);
                }
                throw new Error(`Unknown node type: ${node.type}`);
            };
            try {
                const tokens = tokenize(input);
                const ast = parseTokens(tokens);
                if (values && Object.keys(values).length > 0) {
                    return $(evaluateNode(ast, values));
                }
                const simplified = simplifyNode(ast);
                if (returnAST) {
                    return simplified;
                }
                return nodeToString(simplified);
            } catch (err) {
                if (err instanceof Error) {
                    throw new Error(`Error parsing expression: ${err.message}`);
                } else {
                    throw new Error(`Error parsing expression: ${String(err)}`);
                }
            }
        };

        /**
         * Calculates the prime implicants of a boolean expression using its Karnaugh map.
         * @param {string} input - The boolean expression
         * @param {string[]} variables - An array of variable names (order matters)
         * @returns {string[]}
         * @example
         * const primes = Chalkboard.bool.primeImplicants("x & y | x & z", ["x", "y", "z"]); // Returns ["x & y", "x & z"]
         */
        export const primeImplicants = (input: string, variables: string[]): string[] => {
            if (variables.length !== 2 && variables.length !== 3 && variables.length !== 4) {
                throw new Error("Chalkboard.bool.primeImplicants only supports 2, 3, or 4 variables.");
            }
            const kmap = Chalkboard.bool.Karnaugh(input, variables);
            const grayCodes = (bits: number): string[] => {
                if (bits === 0) return [""];
                const prev = grayCodes(bits - 1);
                const result: string[] = [];
                for (let code of prev) {
                    result.push("0" + code);
                }
                for (let code of prev.slice().reverse()) {
                    result.push("1" + code);
                }
                return result;
            };
            let rowbits: number, colbits: number;
            let rowvars: string[], colvars: string[];
            if (variables.length === 2) {
                rowbits = 1;
                colbits = 1;
                rowvars = [variables[0]];
                colvars = [variables[1]];
            } else if (variables.length === 3) {
                rowbits = 1;
                colbits = 2;
                rowvars = [variables[0]];
                colvars = variables.slice(1);
            } else {
                rowbits = 2;
                colbits = 2;
                rowvars = variables.slice(0, 2);
                colvars = variables.slice(2);
            }
            const rows = grayCodes(rowbits);
            const cols = grayCodes(colbits);
            const cells: ({ row: number; col: number; rowcode: string; colcode: string; })[] = [];
            for (let i = 0; i < rows.length; i++) {
                for (let j = 0; j < cols.length; j++) {
                    if (kmap[i][j] === true || kmap[i][j] === 1) {
                        cells.push({ row: i, col: j, rowcode: rows[i], colcode: cols[j] });
                    }
                }
            }
            const isAdjacent = (c1: { row: number; col: number; rowcode: string; colcode: string; }, c2: { row: number; col: number; rowcode: string; colcode: string; }): boolean => {
                const rowdiff = c1.row === rows.length - 1 && c2.row === 0 || c2.row === rows.length - 1 && c1.row === 0 ? 1 : Math.abs(c1.row - c2.row);
                const coldiff = c1.col === cols.length - 1 && c2.col === 0 || c2.col === cols.length - 1 && c1.col === 0 ? 1 : Math.abs(c1.col - c2.col);
                return (rowdiff === 1 && coldiff === 0) || (rowdiff === 0 && coldiff === 1);
            };
            const isGroup = (groupcells: ({ row: number; col: number; rowcode: string; colcode: string; })[]): boolean => {
                const size = groupcells.length;
                if ((size & (size - 1)) !== 0) return false;
                if (size === 1) return true;
                const uniquerows = new Set(groupcells.map((c) => c.row)).size;
                const uniquecols = new Set(groupcells.map((c) => c.col)).size;
                const rowswrap = groupcells.some(c => c.row === 0) && groupcells.some(c => c.row === rows.length - 1);
                const colswrap = groupcells.some(c => c.col === 0) && groupcells.some(c => c.col === cols.length - 1);
                const effectiverows = rowswrap ? 1 : uniquerows;
                const effectivecols = colswrap ? 1 : uniquecols;
                const isRectangle = (size === effectiverows * effectivecols) && (size === 1 || size === 2 || size === 4 || size === 8 || size === 16);
                if (!isRectangle) return false;
                const visited = new Set<string>();
                const queue: ({ row: number; col: number; rowcode: string; colcode: string; })[] = [groupcells[0]];
                visited.add(`${groupcells[0].row},${groupcells[0].col}`);
                while (queue.length > 0) {
                    const current = queue.shift()!;
                    for (const neighbor of groupcells) {
                        const key = `${neighbor.row},${neighbor.col}`;
                        if (!visited.has(key) && isAdjacent(current, neighbor)) {
                            visited.add(key);
                            queue.push(neighbor);
                        }
                    }
                }
                return visited.size === size;
            };
            const generateGroups = (): ({ cells: ({ row: number; col: number; rowcode: string; colcode: string; })[]; size: number; term: string; })[] => {
                const groups: ({ cells: ({ row: number; col: number; rowcode: string; colcode: string; })[]; size: number; term: string; })[] = [];
                const maxsize = Chalkboard.stat.min([16, Chalkboard.real.pow(2, variables.length) as number]);
                for (const cell of cells) {
                    groups.push({
                        cells: [cell],
                        size: 1,
                        term: ""
                    });
                }
                for (let size = 2; size <= maxsize; size *= 2) {
                    const prevgroups = groups.filter((g) => g.size === size / 2);
                    for (let i = 0; i < prevgroups.length; i++) {
                        for (let j = i + 1; j < prevgroups.length; j++) {
                            const group1 = prevgroups[i];
                            const group2 = prevgroups[j];
                            const merged = [...group1.cells, ...group2.cells];
                            const unique = new Set(merged.map((c) => `${c.row},${c.col}`));
                            if (unique.size === size && isGroup(merged)) {
                                groups.push({
                                    cells: merged,
                                    size: size,
                                    term: ""
                                });
                            }
                        }
                    }
                }
                return groups;
            };
            const groups = generateGroups();
            const primes: ({ cells: ({ row: number; col: number; rowcode: string; colcode: string; })[]; size: number; term: string; })[] = [];
            groups.sort((a, b) => b.size - a.size);
            const covered = new Set<string>();
            for (const group of groups) {
                const uncovered = group.cells.some((cell) => !covered.has(`${cell.row},${cell.col}`));
                if (uncovered) {
                    primes.push(group);
                    group.cells.forEach((cell) => covered.add(`${cell.row},${cell.col}`));
                }
            }
            primes.forEach((group) => {
                const constants: Record<string, boolean> = {};
                variables.forEach((variable) => {
                    constants[variable] = true;
                });
                for (let i = 0; i < rowvars.length; i++) {
                    const varname = rowvars[i];
                    const values = new Set(group.cells.map((c) => c.rowcode[i]));
                    if (values.size > 1) {
                        constants[varname] = false;
                    }
                }
                for (let i = 0; i < colvars.length; i++) {
                    const varname = colvars[i];
                    const values = new Set(group.cells.map((c) => c.colcode[i]));
                    if (values.size > 1) {
                        constants[varname] = false;
                    }
                }
                const terms: string[] = [];
                for (const [varname, isConstant] of Object.entries(constants)) {
                    if (isConstant) {
                        const sampleCell = group.cells[0];
                        let value: boolean;
                        const rowindex = rowvars.indexOf(varname);
                        if (rowindex >= 0) {
                            value = sampleCell.rowcode[rowindex] === '1';
                        } else {
                            const colindex = colvars.indexOf(varname);
                            value = sampleCell.colcode[colindex] === '1';
                        }
                        terms.push(value ? varname : `!${varname}`);
                    }
                }
                group.term = terms.length > 0 ? terms.join(" & ") : "true";
            });
            return primes.map((group) => group.term);
        };

        /**
         * Converts a boolean expression into conjunctive normal form (CNF).
         * @param {string} input - The boolean expression
         * @returns {string}
         * @example
         * const cnf = Chalkboard.bool.toCNF("x & (y | z)"); // Returns "(x) & (y | z)"
         */
        export const toCNF = (input: string): string => {
            const variables: string[] = [];
            const ast = Chalkboard.bool.parse(input, {}, true) as { type: string, [key: string]: any };
            const varextract = (node: { type: string, [key: string]: any }): void => {
                switch (node.type) {
                    case "var":
                        if (!variables.includes(node.name)) {
                            variables.push(node.name);
                        }
                        break;
                    case "not":
                        varextract(node.expr);
                        break;
                    case "and":
                    case "or":
                        varextract(node.left);
                        varextract(node.right);
                        break;
                }
            };
            varextract(ast);
            const generateCombinations = (vars: string[]): Record<string, boolean>[] => {
                if (vars.length === 0) return [{}];
                const [first, ...rest] = vars;
                const restcombos = generateCombinations(rest);
                return [...restcombos.map((combo) => ({ ...combo, [first]: true })), ...restcombos.map((combo) => ({ ...combo, [first]: false }))];
            };
            const combinations = generateCombinations(variables);
            const falserows = combinations.filter((values) => !Chalkboard.bool.parse(input, values));
            const result: string[] = falserows.map((values) => {
                const literals = variables.map((variable) => values[variable] ? `!${variable}` : variable);
                return literals.length > 1 ? `(${literals.join(" | ")})` : literals[0];
            });
            if (result.length === 0) return "true";
            if (result.length === Chalkboard.real.pow(2, variables.length)) return "false";
            return result.join(" & ");
        };

        /**
         * Converts a boolean expression into disjunctive normal form (DNF).
         * @param {string} input - The boolean expression
         * @returns {string}
         * @example
         * const dnf = Chalkboard.bool.toDNF("x & (y | z)"); // Returns "(x & y) | (x & z)"
         */
        export const toDNF = (input: string): string => {
            const variables: string[] = [];
            const ast = Chalkboard.bool.parse(input, {}, true) as { type: string, [key: string]: any };
            const varextract = (node: { type: string, [key: string]: any }): void => {
                switch (node.type) {
                    case "var":
                        if (!variables.includes(node.name)) {
                            variables.push(node.name);
                        }
                        break;
                    case "not":
                        varextract(node.expr);
                        break;
                    case "and":
                    case "or":
                        varextract(node.left);
                        varextract(node.right);
                        break;
                }
            };
            varextract(ast);
            const generateCombinations = (vars: string[]): Record<string, boolean>[] => {
                if (vars.length === 0) return [{}];
                const [first, ...rest] = vars;
                const restcombos = generateCombinations(rest);
                return [...restcombos.map((combo) => ({ ...combo, [first]: true })), ...restcombos.map((combo) => ({ ...combo, [first]: false }))];
            };
            const combinations = generateCombinations(variables);
            const truerows = combinations.filter((values) => Chalkboard.bool.parse(input, values));
            const result: string[] = truerows.map((values) => {
                const literals = variables.map((variable) => values[variable] ? variable : `!${variable}`);
                return literals.length > 1 ? `(${literals.join(" & ")})` : literals[0];
            });
            if (result.length === 0) return "false";
            if (result.length === Chalkboard.real.pow(2, variables.length)) return "true";
            return result.join(" | ");
        };

        /**
         * Calculates a truth table for one or more binary boolean operators. The truth table is represented as a 2D array where each row is [p, q, op1(p,q), op2(p,q), ...].
         * @param {...((p: boolean | 0 | 1, q: boolean | 0 | 1) => boolean | 0 | 1)[]} operations - One or more binary boolean operators
         * @returns {(boolean | 0 | 1)[][]}
         * @example
         * const table = Chalkboard.bool.truthTable(Chalkboard.bool.AND, Chalkboard.bool.OR);
         * // Returns:
         * // [
         * //    [false, false, false, false],
         * //    [false, true, false, true],
         * //    [true, false, false, true],
         * //    [true, true, true, true]
         * // ]
         */
        export const truthTable = (...operations: ((p: boolean | 0 | 1, q: boolean | 0 | 1) => boolean | 0 | 1)[]): (boolean | 0 | 1)[][] => {
            const result: (boolean | 0 | 1)[][] = [];
            const inputs: (boolean | 0 | 1)[] = [false, true];
            for (let p of inputs) {
                for (let q of inputs) {
                    const row: (boolean | 0 | 1)[] = [$(p === true), $(q === true)];
                    for (let op of operations) {
                        const result = op(p, q);
                        row.push((result === true || result === 1 ? $(true) : $(false)));
                    }
                    result.push(row);
                }
            }
            return result;
        };

        /**
         * Calculates the logical XOR (exclusive OR) operation on two or more values.
         * @param {...(boolean | 0 | 1)[]} vals - Two or more values
         * @returns {boolean | 0 | 1}
         * @example
         * const x = Chalkboard.bool.XOR(true, false, false); // Returns true
         * const y = Chalkboard.bool.XOR(true, true, false); // Returns false
         */
        export const XOR = (...vals: (boolean | 0 | 1)[]): boolean | 0 | 1 => {
            let count = 0;
            for (let i = 0; i < vals.length; i++) {
                const x = (vals[i] === true || vals[i] === 1);
                if (x) count++;
            }
            return $(count % 2 === 1);
        };
    }
}
