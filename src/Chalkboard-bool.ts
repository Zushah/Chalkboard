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
         * Chalkboard.bool.AND(true, true); // Returns true
         * Chalkboard.bool.AND(true, true, false); // Returns false
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
         * Chalkboard.bool.BICOND(true, true, true); // Returns true
         * Chalkboard.bool.BICOND(true, false, true); // Returns false
         * Chalkboard.bool.BICOND(false, false, false); // Returns true
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
         * Chalkboard.bool.COND(false, false, true); // Returns true
         * Chalkboard.bool.COND(true, false, true); // Returns false
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
         * Chalkboard.bool.CONV(false, false, true); // Returns true
         * Chalkboard.bool.CONV(true, false, true); // Returns false
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

        /** @ignore */
        let mode: "boolean" | "binary" = "boolean";

        /**
         * Configures the output mode for boolean operations. The default is "boolean".
         * @param {"boolean" | "binary"} config - The new mode to set, which can be either "boolean" or "binary"
         * @returns {void}
         * @example
         * Chalkboard.bool.modeConfig("binary"); // Sets the mode to binary
         * const bin = Chalkboard.bool.AND(true, false); // Returns 0 in binary mode
         * Chalkboard.bool.modeConfig("boolean"); // Sets the mode to boolean
         * const boo = Chalkboard.bool.AND(true, false); // Returns false in boolean mode
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
         * Chalkboard.bool.NAND(true, true, true); // Returns false
         * Chalkboard.bool.NAND(true, true, false); // Returns true
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
         * Chalkboard.bool.BICOND(true, true, true); // Returns false
         * Chalkboard.bool.BICOND(true, false, true); // Returns true
         * Chalkboard.bool.BICOND(false, false, false); // Returns false
         */
        export const NBICOND = (...vals: (boolean | 0 | 1)[]): boolean | 0 | 1 => {
            const bicondResult = BICOND(...vals);
            return $(!(bicondResult === true || bicondResult === 1));
        };

        /**
         * Calculates the opposite of the conditional (non-implication) on two or more values. It works as a chain, i.e. it returns true only if every adjacent pair satisfies ¬p ∨ q.
         * @param {...(boolean | 0 | 1)[]} vals - Two or more values
         * @returns {boolean | 0 | 1}
         * @example
         * Chalkboard.bool.COND(false, false, true); // Returns false
         * Chalkboard.bool.COND(true, false, true); // Returns true
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
         * Calculates the opposite of the converse on two or more values. It works as a chain, i.e. it returns true only if every adjacent pair satisfies ¬q ∨ p.
         * @param {...(boolean | 0 | 1)[]} vals - Two or more values
         * @returns {boolean | 0 | 1}
         * @example
         * Chalkboard.bool.CONV(false, false, true); // Returns false
         * Chalkboard.bool.CONV(true, false, true); // Returns true
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
         * Chalkboard.bool.NOR(false, false, false); // Returns true
         * Chalkboard.bool.NOR(true, false, false); // Returns false
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
         * Chalkboard.bool.NOT(false); // Returns true
         * Chalkboard.bool.NOT(true, false, false); // Returns false
         * Chalkboard.bool.NOT(false, false, false); // Returns true
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
         * Chalkboard.bool.OR(false, false, true); // Returns true
         * Chalkboard.bool.OR(false, false, false); // Returns false
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
         * Chalkboard.bool.parse("x & !x | y & x | y & !x"); // Returns "y"
         * Chalkboard.bool.parse("(x & y) | (x & z)"); // Returns "x & (y | z)"
         * 
         * // Evaluate expression with values
         * Chalkboard.bool.parse("x & y | z", { x: true, y: false, z: true }); // Returns true
         * Chalkboard.bool.parse("a & !b", { a: 1, b: 0 }); // Returns true
         * 
         * // Get AST representation
         * Chalkboard.bool.parse("x & y", {}, true); // Returns AST object
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
                        const varName = node.name;
                        if (!(varName in values)) {
                            throw new Error(`Variable "${varName}" not defined in values`);
                        }
                        const value = values[varName];
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
         * Calculates a truth table for one or more binary boolean operators. The truth table is represented as a 2D array where each row is [p, q, op1(p,q), op2(p,q), ...].
         * @param {...Array<(p: boolean | 0 | 1, q: boolean | 0 | 1) => boolean | 0 | 1>} operations - One or more binary boolean operators
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
        export const truthTable = (...operations: Array<(p: boolean | 0 | 1, q: boolean | 0 | 1) => boolean | 0 | 1>): (boolean | 0 | 1)[][] => {
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
         * Chalkboard.bool.XOR(true, false, false); // Returns true
         * Chalkboard.bool.XOR(true, true, false); // Returns false
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
