/*
    Chalkboard - Matrix Namespace
    Version 3.0.3 Euler
    Released July 6th, 2026
*/
/*
    This Source Code Form is subject to the terms of the
    Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed
    with this file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/
/// <reference path="Chalkboard.ts"/>
namespace Chalkboard {
    /**
     * The matrix namespace.
     * @namespace
     */
    export namespace matr {
        /** @ignore */
        const $ = (input: ChalkboardVector, caller: string): ChalkboardVector => {
            const $$ = (x: number, y: number, z?: number, w?: number): ChalkboardVector => {
                if (!Number.isFinite(x) || !Number.isFinite(y) || z !== undefined && !Number.isFinite(z) || w !== undefined && !Number.isFinite(w)) throw new Error(`${caller}: Parameter "vect" must be a vector with 2, 3, or 4 finite components.`);
                if (z === undefined && w === undefined) {
                    return { x: x, y: y };
                } else if (w === undefined) {
                    return { x: x, y: y, z: z };
                } else {
                    return { x: x, y: y, z: z, w: w };
                }
            };
            const v = input as { x: number, y: number, z?: number, w?: number };
            if (v && typeof v.x === "number" && typeof v.y === "number") {
                if (v.z !== undefined && typeof v.z !== "number" || v.w !== undefined && (typeof v.z !== "number" || typeof v.w !== "number")) throw new Error(`${caller}: Parameter "vect" must be a vector with 2, 3, or 4 finite components.`);
                if (typeof v.z === "number" && typeof v.w === "number") return $$(v.x, v.y, v.z, v.w);
                if (typeof v.z === "number") return $$(v.x, v.y, v.z);
                return $$(v.x, v.y);
            }
            if (Array.isArray(input)) {
                if (input.length > 0 && Array.isArray(input[0])) {
                    const matr = input as ChalkboardMatrix;
                    const rows = Chalkboard.matr.rows(matr);
                    const cols = Chalkboard.matr.cols(matr);
                    if (cols === 1) {
                        if (rows === 2) return $$(matr[0][0], matr[1][0]);
                        if (rows === 3) return $$(matr[0][0], matr[1][0], matr[2][0]);
                        if (rows === 4) return $$(matr[0][0], matr[1][0], matr[2][0], matr[3][0]);
                    } else if (rows === 1) {
                        if (cols === 2) return $$(matr[0][0], matr[0][1]);
                        if (cols === 3) return $$(matr[0][0], matr[0][1], matr[0][2]);
                        if (cols === 4) return $$(matr[0][0], matr[0][1], matr[0][2], matr[0][3]);
                    }
                } else {
                    const arr = input as number[];
                    if (arr.length === 2) return $$(arr[0], arr[1]);
                    if (arr.length === 3) return $$(arr[0], arr[1], arr[2]);
                    if (arr.length === 4) return $$(arr[0], arr[1], arr[2], arr[3]);
                }
            }
            if (input instanceof Float32Array || input instanceof Float64Array) {
                const arr = input as Float32Array | Float64Array;
                if (arr.length === 2) return $$(arr[0], arr[1]);
                if (arr.length === 3) return $$(arr[0], arr[1], arr[2]);
                if (arr.length === 4) return $$(arr[0], arr[1], arr[2], arr[3]);
            }
            if (typeof input === "string") {
                try {
                    const parsed = JSON.parse(input as string);
                    if (parsed && typeof parsed === "object" && typeof parsed.x === "number" && typeof parsed.y === "number") {
                        return $$(parsed.x, parsed.y, parsed.z !== undefined ? parsed.z : undefined, parsed.w !== undefined ? parsed.w : undefined);
                    }
                } catch (e) {
                    const str = (input as string).trim();
                    if (str.startsWith("(") && str.endsWith(")")) {
                        const content = str.substring(1, str.length - 1);
                        const components = content.split(",").map((part) => part.trim() === "" ? NaN : Number(part.trim()));
                        if (components.length === 2 && !Number.isNaN(components[0]) && !Number.isNaN(components[1])) return $$(components[0], components[1]);
                        if (components.length === 3 && !Number.isNaN(components[0]) && !Number.isNaN(components[1]) && !Number.isNaN(components[2])) return $$(components[0], components[1], components[2]);
                        if (components.length === 4 && !Number.isNaN(components[0]) && !Number.isNaN(components[1]) && !Number.isNaN(components[2]) && !Number.isNaN(components[3])) return $$(components[0], components[1], components[2], components[3]);
                    }
                }
            }
            throw new Error(`${caller}: Parameter "vect" must be a vector with 2, 3, or 4 finite components.`);
        };

        /**
         * Calculates the absolute value of a matrix.
         * @param {ChalkboardMatrix} matr - The matrix
         * @returns {ChalkboardMatrix}
         * @example
         * const result = Chalkboard.matr.absolute([[-1, 2], [-3, 4]]); // Returns [[1, 2], [3, 4]]
         */
        export const absolute = (matr: ChalkboardMatrix): ChalkboardMatrix => {
            if (!Array.isArray(matr) || matr.length > 0 && !Array.isArray(matr[0])) throw new Error(`Chalkboard.matr.absolute: Parameter "matr" must be a matrix.`);
            if (Chalkboard.matr.isSizeOf(matr, 2)) {
                return Chalkboard.matr.init([Math.abs(matr[0][0]), Math.abs(matr[0][1])], [Math.abs(matr[1][0]), Math.abs(matr[1][1])]);
            } else if (Chalkboard.matr.isSizeOf(matr, 3)) {
                return Chalkboard.matr.init([Math.abs(matr[0][0]), Math.abs(matr[0][1]), Math.abs(matr[0][2])], [Math.abs(matr[1][0]), Math.abs(matr[1][1]), Math.abs(matr[1][2])], [Math.abs(matr[2][0]), Math.abs(matr[2][1]), Math.abs(matr[2][2])]);
            } else if (Chalkboard.matr.isSizeOf(matr, 4)) {
                return Chalkboard.matr.init([Math.abs(matr[0][0]), Math.abs(matr[0][1]), Math.abs(matr[0][2]), Math.abs(matr[0][3])], [Math.abs(matr[1][0]), Math.abs(matr[1][1]), Math.abs(matr[1][2]), Math.abs(matr[1][3])], [Math.abs(matr[2][0]), Math.abs(matr[2][1]), Math.abs(matr[2][2]), Math.abs(matr[2][3])], [Math.abs(matr[3][0]), Math.abs(matr[3][1]), Math.abs(matr[3][2]), Math.abs(matr[3][3])]);
            } else {
                const result = Chalkboard.matr.init();
                for (let i = 0; i < Chalkboard.matr.rows(matr); i++) {
                    result[i] = [];
                    for (let j = 0; j < Chalkboard.matr.cols(matr); j++) {
                        result[i][j] = Math.abs(matr[i][j]);
                    }
                }
                return result;
            }
        };

        /**
         * Calculates the addition of two matrices.
         * @param {ChalkboardMatrix} matr1 - The first matrix
         * @param {ChalkboardMatrix} matr2 - The second matrix
         * @returns {ChalkboardMatrix}
         * @example
         * const result = Chalkboard.matr.add([[1, 1], [1, 0]], [[0, 1], [1, 1]]); // Returns [[1, 2], [2, 1]]
         */
        export const add = (matr1: ChalkboardMatrix, matr2: ChalkboardMatrix): ChalkboardMatrix => {
            if (Chalkboard.matr.isSizeEqual(matr1, matr2)) {
                if (Chalkboard.matr.isSizeOf(matr1, 2)) {
                    return Chalkboard.matr.init(
                        [matr1[0][0] + matr2[0][0], matr1[0][1] + matr2[0][1]],
                        [matr1[1][0] + matr2[1][0], matr1[1][1] + matr2[1][1]]
                    );
                } else if (Chalkboard.matr.isSizeOf(matr1, 3)) {
                    return Chalkboard.matr.init(
                        [matr1[0][0] + matr2[0][0], matr1[0][1] + matr2[0][1], matr1[0][2] + matr2[0][2]],
                        [matr1[1][0] + matr2[1][0], matr1[1][1] + matr2[1][1], matr1[1][2] + matr2[1][2]],
                        [matr1[2][0] + matr2[2][0], matr1[2][1] + matr2[2][1], matr1[2][2] + matr2[2][2]]
                    );
                } else if (Chalkboard.matr.isSizeOf(matr1, 4)) {
                    return Chalkboard.matr.init(
                        [matr1[0][0] + matr2[0][0], matr1[0][1] + matr2[0][1], matr1[0][2] + matr2[0][2], matr1[0][3] + matr2[0][3]],
                        [matr1[1][0] + matr2[1][0], matr1[1][1] + matr2[1][1], matr1[1][2] + matr2[1][2], matr1[1][3] + matr2[1][3]],
                        [matr1[2][0] + matr2[2][0], matr1[2][1] + matr2[2][1], matr1[2][2] + matr2[2][2], matr1[2][3] + matr2[2][3]],
                        [matr1[3][0] + matr2[3][0], matr1[3][1] + matr2[3][1], matr1[3][2] + matr2[3][2], matr1[3][3] + matr2[3][3]]
                    );
                } else {
                    const result = Chalkboard.matr.init();
                    for (let i = 0; i < Chalkboard.matr.rows(matr1); i++) {
                        result[i] = [];
                        for (let j = 0; j < Chalkboard.matr.cols(matr1); j++) {
                            result[i][j] = matr1[i][j] + matr2[i][j];
                        }
                    }
                    return result;
                }
            } else {
                throw new Error(`Chalkboard.matr.add: Parameters "matr1" and "matr2" must be of type ChalkboardMatrix with equivalent numbers of rows and columns.`);
            }
        };

        /**
         * Calculates the Kronecker addition of two matrices.
         * @param {ChalkboardMatrix} matr1 - The first matrix
         * @param {ChalkboardMatrix} matr2 - The second matrix
         * @returns {ChalkboardMatrix}
         * @example
         * const result = Chalkboard.matr.addKronecker([[1, 0], [0, 1]], [[0, 1], [1, 0]]); // Returns the Kronecker sum
         */
        export const addKronecker = (matr1: ChalkboardMatrix, matr2: ChalkboardMatrix): ChalkboardMatrix => {
            if (Chalkboard.matr.isSquare(matr1) && Chalkboard.matr.isSquare(matr2)) {
                return Chalkboard.matr.add(
                    Chalkboard.matr.mulKronecker(matr1, Chalkboard.matr.identity(Chalkboard.matr.rows(matr2))),
                    Chalkboard.matr.mulKronecker(Chalkboard.matr.identity(Chalkboard.matr.rows(matr1)), matr2)
                );
            } else {
                throw new Error(`Chalkboard.matr.addKronecker: Parameters "matr1" and "matr2" must be of type ChalkboardMatrix that are square.`);
            }
        };

        /**
         * Calculates the adjugate matrix of a matrix at a row and column.
         * @param {ChalkboardMatrix} matr - The matrix
         * @param {number} row - The row
         * @param {number} col - The column
         * @returns {ChalkboardMatrix}
         * @example
         * const result = Chalkboard.matr.adjugate([[1, 2, 3], [0, 4, 5], [1, 0, 6]], 0, 0); // Returns the selected minor
         */
        export const adjugate = (matr: ChalkboardMatrix, row: number, col: number): ChalkboardMatrix => {
            if (!Array.isArray(matr) || matr.length > 0 && !Array.isArray(matr[0])) throw new Error(`Chalkboard.matr.adjugate: Parameter "matr" must be a matrix.`);
            if (!Number.isInteger(row) || row < 0 || row >= matr.length) throw new Error(`Chalkboard.matr.adjugate: Parameter "row" must be an integer within the matrix bounds.`);
            if (!Number.isInteger(col) || col < 0 || col >= Chalkboard.matr.cols(matr)) throw new Error(`Chalkboard.matr.adjugate: Parameter "col" must be an integer within the matrix bounds.`);
            return Chalkboard.matr.transpose(Chalkboard.matr.cofactor(matr, row, col));
        };

        /**
         * Calculates the Cholesky decomposition of a symmetric positive definite matrix.
         * @param {ChalkboardMatrix} matr - The matrix
         * @returns {{ L: ChalkboardMatrix, U: ChalkboardMatrix }}
         * @example
         * const result = Chalkboard.matr.Cholesky([[4, 2], [2, 3]]); // Returns the Cholesky factors
         */
        export const Cholesky = (matr: ChalkboardMatrix): { L: ChalkboardMatrix; U: ChalkboardMatrix } => {
            if (!Chalkboard.matr.isSquare(matr)) throw new Error(`Chalkboard.matr.Cholesky: Parameter "matr" must be a square matrix.`);
            if (!Chalkboard.matr.isSymmetric(matr)) throw new Error(`Chalkboard.matr.Cholesky: Parameter "matr" must be symmetric.`);
            const n = Chalkboard.matr.rows(matr);
            const L = Chalkboard.matr.fill(0, n);
            for (let i = 0; i < n; i++) {
                for (let j = 0; j <= i; j++) {
                    let sum = matr[i][j];
                    for (let k = 0; k < j; k++) {
                        sum -= L[i][k] * L[j][k];
                    }
                    if (i === j) {
                        if (sum <= 0) throw new Error(`Chalkboard.matr.Cholesky: Matrix is not positive definite.`);
                        L[i][j] = Chalkboard.real.sqrt(sum);
                    } else {
                        L[i][j] = sum / L[j][j];
                    }
                }
            }
            return { L: L, U: Chalkboard.matr.transpose(L) };
        };

        /**
         * Calculates the cofactor matrix of a matrix at a row and column.
         * @param {ChalkboardMatrix} matr - The matrix
         * @param {number} row - The row
         * @param {number} col - The column
         * @returns {ChalkboardMatrix}
         * @example
         * const result = Chalkboard.matr.cofactor([[1, 2, 3], [0, 4, 5], [1, 0, 6]], 0, 1); // Returns the signed minor
         */
        export const cofactor = (matr: ChalkboardMatrix, row: number, col: number): ChalkboardMatrix => {
            if (!Array.isArray(matr) || matr.length > 0 && !Array.isArray(matr[0])) throw new Error(`Chalkboard.matr.cofactor: Parameter "matr" must be a matrix.`);
            if (!Number.isInteger(row) || row < 0 || row >= matr.length) throw new Error(`Chalkboard.matr.cofactor: Parameter "row" must be an integer within the matrix bounds.`);
            if (!Number.isInteger(col) || col < 0 || col >= Chalkboard.matr.cols(matr)) throw new Error(`Chalkboard.matr.cofactor: Parameter "col" must be an integer within the matrix bounds.`);
            return matr.slice(0, row).concat(matr.slice(row + 1)).map((row) => row.slice(0, col).concat(row.slice(col + 1)));
        };

        /**
         * Returns the number of columns in a matrix.
         * @param {ChalkboardMatrix} matr - The matrix
         * @returns {number}
         * @example
         * const result = Chalkboard.matr.cols([[1, 2, 3], [4, 5, 6]]); // Returns 3
         */
        export const cols = (matr: ChalkboardMatrix): number => {
            if (!Array.isArray(matr) || matr.length > 0 && !Array.isArray(matr[0])) throw new Error(`Chalkboard.matr.cols: Parameter "matr" must be a matrix.`);
            return matr[0].length;
        };

        /**
         * Calculates the column space of a matrix.
         * @param {ChalkboardMatrix} matr - The matrix
         * @returns {ChalkboardMatrix}
         * @example
         * const result = Chalkboard.matr.colspace([[1, 2], [2, 4], [0, 1]]); // Returns a basis for the column space
         */
        export const colspace = (matr: ChalkboardMatrix): ChalkboardMatrix => {
            if (!Array.isArray(matr) || matr.length > 0 && !Array.isArray(matr[0])) throw new Error(`Chalkboard.matr.colspace: Parameter "matr" must be a matrix.`);
            return Chalkboard.matr.transpose(Chalkboard.matr.rowspace(Chalkboard.matr.transpose(matr)));
        };

        /**
         * Calculates the concatentation of two matrices.
         * @param {ChalkboardMatrix} matr1 - The first matrix
         * @param {ChalkboardMatrix} matr2 - The second matrix
         * @param {number} [axis=0] - The axis to concatenate over, which is 0 for the rows or 1 for the columns
         * @returns {ChalkboardMatrix}
         * @example
         * const result = Chalkboard.matr.concat([[1, 2]], [[3, 4]], 0); // Returns [[1, 2], [3, 4]]
         */
        export const concat = (matr1: ChalkboardMatrix, matr2: ChalkboardMatrix, axis: 0 | 1 = 0): ChalkboardMatrix => {
            if (axis === 0) {
                if (Chalkboard.matr.cols(matr1) === Chalkboard.matr.cols(matr2)) {
                    if (Chalkboard.matr.isSizeOf(matr1, 2) && Chalkboard.matr.rows(matr2) === 2) {
                        return Chalkboard.matr.init(
                            [matr1[0][0], matr1[0][1]], [matr1[1][0], matr1[1][1]],
                            [matr2[0][0], matr2[0][1]], [matr2[1][0], matr2[1][1]]
                        );
                    } else if (Chalkboard.matr.isSizeOf(matr1, 3) && Chalkboard.matr.rows(matr2) === 3) {
                        return Chalkboard.matr.init(
                            [matr1[0][0], matr1[0][1], matr1[0][2]],
                            [matr1[1][0], matr1[1][1], matr1[1][2]],
                            [matr1[2][0], matr1[2][1], matr1[2][2]],
                            [matr2[0][0], matr2[0][1], matr2[0][2]],
                            [matr2[1][0], matr2[1][1], matr2[1][2]],
                            [matr2[2][0], matr2[2][1], matr2[2][2]]
                        );
                    } else if (Chalkboard.matr.isSizeOf(matr1, 4) && Chalkboard.matr.rows(matr2) === 4) {
                        return Chalkboard.matr.init(
                            [matr1[0][0], matr1[0][1], matr1[0][2], matr1[0][3]],
                            [matr1[1][0], matr1[1][1], matr1[1][2], matr1[1][3]],
                            [matr1[2][0], matr1[2][1], matr1[2][2], matr1[2][3]],
                            [matr1[3][0], matr1[3][1], matr1[3][2], matr1[3][3]],
                            [matr2[0][0], matr2[0][1], matr2[0][2], matr2[0][3]],
                            [matr2[1][0], matr2[1][1], matr2[1][2], matr2[1][3]],
                            [matr2[2][0], matr2[2][1], matr2[2][2], matr2[2][3]],
                            [matr2[3][0], matr2[3][1], matr2[3][2], matr2[3][3]]
                        );
                    } else {
                        return Chalkboard.matr.init(matr1.concat(matr2));
                    }
                } else {
                    throw new Error(`Chalkboard.matr.concat: Parameters "matr1" and "matr2" must be of type ChalkboardMatrix with equivalent numbers of columns.`);
                }
            } else if (axis === 1) {
                if (Chalkboard.matr.rows(matr1) === Chalkboard.matr.rows(matr2)) {
                    if (Chalkboard.matr.isSizeOf(matr1, 2) && Chalkboard.matr.cols(matr2) === 2) {
                        return Chalkboard.matr.init(
                            [matr1[0][0], matr1[0][1], matr2[0][0], matr2[0][1]],
                            [matr1[1][0], matr1[1][1], matr2[1][0], matr2[1][1]]
                        );
                    } else if (Chalkboard.matr.isSizeOf(matr1, 3) && Chalkboard.matr.cols(matr2) === 3) {
                        return Chalkboard.matr.init(
                            [matr1[0][0], matr1[0][1], matr1[0][2], matr2[0][0], matr2[0][1], matr2[0][2]],
                            [matr1[1][0], matr1[1][1], matr1[1][2], matr2[1][0], matr2[1][1], matr2[1][2]],
                            [matr1[2][0], matr1[2][1], matr1[2][2], matr2[2][0], matr2[2][1], matr2[2][2]]
                        );
                    } else if (Chalkboard.matr.isSizeOf(matr1, 4) && Chalkboard.matr.cols(matr2) === 4) {
                        return Chalkboard.matr.init(
                            [matr1[0][0], matr1[0][1], matr1[0][2], matr1[0][3], matr2[0][0], matr2[0][1], matr2[0][2], matr2[0][3]],
                            [matr1[1][0], matr1[1][1], matr1[1][2], matr1[1][3], matr2[1][0], matr2[1][1], matr2[1][2], matr2[1][3]],
                            [matr1[2][0], matr1[2][1], matr1[2][2], matr1[2][3], matr2[2][0], matr2[2][1], matr2[2][2], matr2[2][3]],
                            [matr1[3][0], matr1[3][1], matr1[3][2], matr1[3][3], matr2[3][0], matr2[3][1], matr2[3][2], matr2[3][3]]
                        );
                    } else {
                        const result = Chalkboard.matr.init();
                        for (let i = 0; i < Chalkboard.matr.rows(matr1); i++) {
                            result.push(matr1[i].concat(matr2[i]));
                        }
                        return result;
                    }
                } else {
                    throw new Error(`Chalkboard.matr.concat: Parameters "matr1" and "matr2" must be of type ChalkboardMatrix with equivalent numbers of rows.`);
                }
            } else {
                throw new Error(`Chalkboard.matr.concat: Parameter "axis" must be 0 or 1.`);
            }
        };

        /**
         * Calculates a matrix constrained within a range.
         * @param {ChalkboardMatrix} matr - The matrix
         * @param {number[]} [range=[0, 1]] - The range
         * @returns {ChalkboardMatrix}
         * @example
         * const result = Chalkboard.matr.constrain([[-1, 0.5], [2, 1]], [0, 1]); // Returns [[0, 0.5], [1, 1]]
         */
        export const constrain = (matr: ChalkboardMatrix, range: [number, number] = [0, 1]): ChalkboardMatrix => {
            if (!Array.isArray(matr) || matr.length > 0 && !Array.isArray(matr[0])) throw new Error(`Chalkboard.matr.constrain: Parameter "matr" must be a matrix.`);
            if (Chalkboard.matr.isSizeOf(matr, 2)) {
                return Chalkboard.matr.init(
                    [Chalkboard.numb.constrain(matr[0][0], range), Chalkboard.numb.constrain(matr[0][1], range)],
                    [Chalkboard.numb.constrain(matr[1][0], range), Chalkboard.numb.constrain(matr[1][1], range)]
                );
            } else if (Chalkboard.matr.isSizeOf(matr, 3)) {
                return Chalkboard.matr.init(
                    [Chalkboard.numb.constrain(matr[0][0], range), Chalkboard.numb.constrain(matr[0][1], range), Chalkboard.numb.constrain(matr[0][2], range)],
                    [Chalkboard.numb.constrain(matr[1][0], range), Chalkboard.numb.constrain(matr[1][1], range), Chalkboard.numb.constrain(matr[1][2], range)],
                    [Chalkboard.numb.constrain(matr[2][0], range), Chalkboard.numb.constrain(matr[2][1], range), Chalkboard.numb.constrain(matr[2][2], range)]
                );
            } else if (Chalkboard.matr.isSizeOf(matr, 4)) {
                return Chalkboard.matr.init(
                    [Chalkboard.numb.constrain(matr[0][0], range), Chalkboard.numb.constrain(matr[0][1], range), Chalkboard.numb.constrain(matr[0][2], range), Chalkboard.numb.constrain(matr[0][3], range)],
                    [Chalkboard.numb.constrain(matr[1][0], range), Chalkboard.numb.constrain(matr[1][1], range), Chalkboard.numb.constrain(matr[1][2], range), Chalkboard.numb.constrain(matr[1][3], range)],
                    [Chalkboard.numb.constrain(matr[2][0], range), Chalkboard.numb.constrain(matr[2][1], range), Chalkboard.numb.constrain(matr[2][2], range), Chalkboard.numb.constrain(matr[2][3], range)],
                    [Chalkboard.numb.constrain(matr[3][0], range), Chalkboard.numb.constrain(matr[3][1], range), Chalkboard.numb.constrain(matr[3][2], range), Chalkboard.numb.constrain(matr[3][3], range)]
                );
            } else {
                const result = Chalkboard.matr.init();
                for (let i = 0; i < Chalkboard.matr.rows(matr); i++) {
                    result[i] = [];
                    for (let j = 0; j < Chalkboard.matr.cols(matr); j++) {
                        result[i][j] = Chalkboard.numb.constrain(matr[i][j], range);
                    }
                }
                return result;
            }
        };

        /**
         * Copies a matrix.
         * @param {ChalkboardMatrix} matr - The matrix
         * @returns {ChalkboardMatrix}
         * @example
         * const result = Chalkboard.matr.copy([[1, 2], [3, 4]]); // Returns an independent copy
         */
        export const copy = (matr: ChalkboardMatrix): ChalkboardMatrix => {
            if (!Array.isArray(matr) || matr.length > 0 && !Array.isArray(matr[0])) throw new Error(`Chalkboard.matr.copy: Parameter "matr" must be a matrix.`);
            if (Chalkboard.matr.isSizeOf(matr, 2)) {
                return Chalkboard.matr.init([matr[0][0], matr[0][1]], [matr[1][0], matr[1][1]]);
            } else if (Chalkboard.matr.isSizeOf(matr, 3)) {
                return Chalkboard.matr.init([matr[0][0], matr[0][1], matr[0][2]], [matr[1][0], matr[1][1], matr[1][2]], [matr[2][0], matr[2][1], matr[2][2]]);
            } else if (Chalkboard.matr.isSizeOf(matr, 4)) {
                return Chalkboard.matr.init([matr[0][0], matr[0][1], matr[0][2], matr[0][3]], [matr[1][0], matr[1][1], matr[1][2], matr[1][3]], [matr[2][0], matr[2][1], matr[2][2], matr[2][3]], [matr[3][0], matr[3][1], matr[3][2], matr[3][3]]);
            } else {
                const result = Chalkboard.matr.init();
                for (let i = 0; i < Chalkboard.matr.rows(matr); i++) {
                    result.push([]);
                    for (let j = 0; j < Chalkboard.matr.cols(matr); j++) {
                        result[i].push(matr[i][j]);
                    }
                }
                return result;
            }
        };

        /**
         * Calculates the determinant of a matrix.
         * @param {ChalkboardMatrix} matr - The matrix
         * @returns {number}
         * @example
         * const result = Chalkboard.matr.det([[1, 2], [3, 4]]); // Returns -2
         */
        export const det = (matr: ChalkboardMatrix): number => {
            if (Chalkboard.matr.isSquare(matr)) {
                if (Chalkboard.matr.rows(matr) === 1) {
                    return matr[0][0];
                } else if (Chalkboard.matr.rows(matr) === 2) {
                    return matr[0][0] * matr[1][1] - matr[0][1] * matr[1][0];
                } else if (Chalkboard.matr.rows(matr) === 3) {
                    return matr[0][0] * (matr[1][1] * matr[2][2] - matr[1][2] * matr[2][1]) - matr[0][1] * (matr[1][0] * matr[2][2] - matr[1][2] * matr[2][0]) + matr[0][2] * (matr[1][0] * matr[2][1] - matr[1][1] * matr[2][0]);
                } else if (Chalkboard.matr.rows(matr) === 4) {
                    return matr[0][0] * (matr[1][1] * (matr[2][2] * matr[3][3] - matr[2][3] * matr[3][2]) - matr[1][2] * (matr[2][1] * matr[3][3] - matr[2][3] * matr[3][1]) + matr[1][3] * (matr[2][1] * matr[3][2] - matr[2][2] * matr[3][1])) - matr[0][1] * (matr[1][0] * (matr[2][2] * matr[3][3] - matr[2][3] * matr[3][2]) - matr[1][2] * (matr[2][0] * matr[3][3] - matr[2][3] * matr[3][0]) + matr[1][3] * (matr[2][0] * matr[3][2] - matr[2][2] * matr[3][0])) + matr[0][2] * (matr[1][0] * (matr[2][1] * matr[3][3] - matr[2][3] * matr[3][1]) - matr[1][1] * (matr[2][0] * matr[3][3] - matr[2][3] * matr[3][0]) + matr[1][3] * (matr[2][0] * matr[3][1] - matr[2][1] * matr[3][0])) - matr[0][3] * (matr[1][0] * (matr[2][1] * matr[3][2] - matr[2][2] * matr[3][1]) - matr[1][1] * (matr[2][0] * matr[3][2] - matr[2][2] * matr[3][0]) + matr[1][2] * (matr[2][0] * matr[3][1] - matr[2][1] * matr[3][0]));
                } else {
                    let result = 0;
                    for (let i = 0; i < Chalkboard.matr.rows(matr); i++) {
                        const cofactor = matr[0][i] * Chalkboard.matr.det(Chalkboard.matr.cofactor(matr, 0, i));
                        result += i % 2 === 0 ? cofactor : -cofactor;
                    }
                    return result;
                }
            } else {
                throw new Error(`Chalkboard.matr.det: Parameter "matr" must be of type ChalkboardMatrix that is square.`);
            }
        };

        /**
         * Initializes a diagonal matrix.
         * @param {number} size - The number of rows or columns
         * @param {number[]} elements - The elements on the main diagonal
         * @returns {ChalkboardMatrix}
         * @example
         * const result = Chalkboard.matr.diagonal(3, 2, 3, 5); // Returns a diagonal matrix
         */
        export const diagonal = (size: number, ...elements: number[]): ChalkboardMatrix => {
            if (!Number.isInteger(size) || size < 1) throw new Error(`Chalkboard.matr.diagonal: Parameter "size" must be a positive integer.`);
            if (elements.length > 0 && !Number.isFinite(elements[0]) || elements.length > 1 && !Number.isFinite(elements[elements.length - 1])) throw new Error(`Chalkboard.matr.diagonal: Parameter "elements" must begin and end with finite numbers.`);
            if (size === 2) {
                return Chalkboard.matr.init([elements[0] || 0, 0], [0, elements[1] || 0]);
            } else if (size === 3) {
                return Chalkboard.matr.init([elements[0] || 0, 0, 0], [0, elements[1] || 0, 0], [0, 0, elements[2] || 0]);
            } else if (size === 4) {
                return Chalkboard.matr.init([elements[0] || 0, 0, 0, 0], [0, elements[1] || 0, 0, 0], [0, 0, elements[2] || 0, 0], [0, 0, 0, elements[3] || 0]);
            } else {
                elements = Array.isArray(elements[0]) ? elements[0] : elements;
                const result = Chalkboard.matr.init();
                for (let i = 0; i < size; i++) {
                    result.push(Array(size).fill(0));
                    result[i][i] = elements[i] || 0;
                }
                return result;
            }
        };

        /**
         * Calculates the dominant eigenvalue of a matrix.
         * @param {ChalkboardMatrix} matr - The matrix
         * @param {number} [maxIterations=100] - The number of iterations the algorithm runs
         * @returns {number}
         * @example
         * const result = Chalkboard.matr.eigenvalue([[2, 1], [1, 2]]); // Returns the dominant eigenvalue
         */
        export const eigenvalue = (matr: ChalkboardMatrix, maxIterations: number = 100): number => {
            if (!Array.isArray(matr) || matr.length > 0 && !Array.isArray(matr[0])) throw new Error(`Chalkboard.matr.eigenvalue: Parameter "matr" must be a matrix.`);
            if (!Number.isInteger(maxIterations) || maxIterations < 1) throw new Error(`Chalkboard.matr.eigenvalue: Parameter "maxIterations" must be a positive integer.`);
            let v = Chalkboard.matr.fill(1, Chalkboard.matr.rows(matr), 1);
            for (let i = 0; i < maxIterations; i++) {
                const matrv = Chalkboard.matr.mul(matr, v);
                const max = Chalkboard.stat.max(Chalkboard.matr.toArray(Chalkboard.matr.absolute(matrv)));
                v = Chalkboard.stat.toMatrix(
                    Chalkboard.matr.toArray(matrv).map((i) => i / max),
                    Chalkboard.matr.rows(matr),
                    1
                );
            }
            const dot = function (v1: number[], v2: number[]): number {
                let result = 0;
                for (let i = 0; i < v1.length; i++) {
                    result += v1[i] * v2[i];
                }
                return result;
            };
            return (
                dot(Chalkboard.matr.toArray(Chalkboard.matr.transpose(v)), Chalkboard.matr.toArray(Chalkboard.matr.mul(matr, v))) /
                dot(Chalkboard.matr.toArray(Chalkboard.matr.transpose(v)), Chalkboard.matr.toArray(v))
            );
        };

        /**
         * Calculates the dominant eigenvector of a matrix.
         * @param {ChalkboardMatrix} matr - The matrix
         * @param {number} [maxIterations=100] - The number of iterations the algorithm runs
         * @returns {number[]}
         * @example
         * const result = Chalkboard.matr.eigenvector([[2, 1], [1, 2]]); // Returns a dominant eigenvector
         */
        export const eigenvector = (matr: ChalkboardMatrix, maxIterations: number = 100): number[] => {
            if (!Array.isArray(matr) || matr.length > 0 && !Array.isArray(matr[0])) throw new Error(`Chalkboard.matr.eigenvector: Parameter "matr" must be a matrix.`);
            if (!Number.isInteger(maxIterations) || maxIterations < 1) throw new Error(`Chalkboard.matr.eigenvector: Parameter "maxIterations" must be a positive integer.`);
            let v = Chalkboard.matr.fill(1, Chalkboard.matr.rows(matr), 1);
            for (let i = 0; i < maxIterations; i++) {
                const matrv = Chalkboard.matr.mul(matr, v);
                const max = Chalkboard.stat.max(Chalkboard.matr.toArray(Chalkboard.matr.absolute(matrv)));
                v = Chalkboard.stat.toMatrix(Chalkboard.matr.toArray(matrv).map((i) => i / max), Chalkboard.matr.rows(matr), 1 );
            }
            const result = Chalkboard.matr.toArray(v);
            return result;
        };

        /**
         * Initializes an empty matrix.
         * @param {number} rows - The number of rows or (if the cols parameter is blank) the number of rows or columns (the size)
         * @param {number} [cols=rows] - The number of columns
         * @returns {ChalkboardMatrix}
         * @example
         * const result = Chalkboard.matr.empty(2, 3); // Returns a 2-by-3 empty matrix
         */
        export const empty = (rows: number, cols: number = rows): ChalkboardMatrix => {
            if (!Number.isInteger(rows) || rows < 0) throw new Error(`Chalkboard.matr.empty: Parameter "rows" must be a non-negative integer.`);
            if (!Number.isInteger(cols) || cols < 0) throw new Error(`Chalkboard.matr.empty: Parameter "cols" must be a non-negative integer.`);
            const _null = null as unknown as number;
            if (rows === 2 && cols === 2) {
                return Chalkboard.matr.init([_null, _null], [_null, _null]);
            } else if (rows === 3 && cols === 3) {
                return Chalkboard.matr.init([_null, _null, _null], [_null, _null, _null], [_null, _null, _null]);
            } else if (rows === 4 && cols === 4) {
                return Chalkboard.matr.init([_null, _null, _null, _null], [_null, _null, _null, _null], [_null, _null, _null, _null], [_null, _null, _null, _null]);
            } else {
                const result = Chalkboard.matr.init();
                for (let i = 0; i < rows; i++) {
                    result.push([]);
                    for (let j = 0; j < cols; j++) {
                        result[i].push(_null);
                    }
                }
                return result;
            }
        };

        /**
         * Initializes an exchange matrix.
         * @param {number} size - The number of rows or columns of the matrix
         * @returns {ChalkboardMatrix}
         * @example
         * const result = Chalkboard.matr.exchange(3); // Returns the 3-by-3 exchange matrix
         */
        export const exchange = (size: number): ChalkboardMatrix => {
            if (!Number.isInteger(size) || size < 1) throw new Error(`Chalkboard.matr.exchange: Parameter "size" must be a positive integer.`);
            if (size === 2) {
                return Chalkboard.matr.init([0, 1], [1, 0]);
            } else if (size === 3) {
                return Chalkboard.matr.init([0, 0, 1], [0, 1, 0], [1, 0, 0]);
            } else if (size === 4) {
                return Chalkboard.matr.init([0, 0, 0, 1], [0, 0, 1, 0], [0, 1, 0, 0], [1, 0, 0, 0]);
            } else {
                const result = Chalkboard.matr.fill(0, size, size);
                for (let i = 0; i < size; i++) {
                    for (let j = 0; j < size; j++) {
                        if (i + j === size - 1) {
                            result[i][j] = 1;
                        }
                    }
                }
                return result;
            }
        };

        /**
         * Initializes a matrix filled with one number.
         * @param {number} element - The number to fill the elements with
         * @param {number} rows - The number of rows or (if the cols parameter is blank) the number of rows or columns (the size)
         * @param {number} [cols=rows] - The number of columns
         * @returns {ChalkboardMatrix}
         * @example
         * const result = Chalkboard.matr.fill(7, 2, 3); // Returns a 2-by-3 matrix filled with 7
         */
        export const fill = (element: number, rows: number, cols: number = rows): ChalkboardMatrix => {
            if (!Number.isFinite(element)) throw new Error(`Chalkboard.matr.fill: Parameter "element" must be a finite number.`);
            if (!Number.isInteger(rows) || rows < 0) throw new Error(`Chalkboard.matr.fill: Parameter "rows" must be a non-negative integer.`);
            if (!Number.isInteger(cols) || cols < 0) throw new Error(`Chalkboard.matr.fill: Parameter "cols" must be a non-negative integer.`);
            if (rows === 2 && cols === 2) {
                return Chalkboard.matr.init([element, element], [element, element]);
            } else if (rows === 3 && cols === 3) {
                return Chalkboard.matr.init([element, element, element], [element, element, element], [element, element, element]);
            } else if (rows === 4 && cols === 4) {
                return Chalkboard.matr.init([element, element, element, element], [element, element, element, element], [element, element, element, element], [element, element, element, element]);
            } else {
                const result = Chalkboard.matr.init();
                for (let i = 0; i < rows; i++) {
                    result.push([]);
                    for (let j = 0; j < cols; j++) {
                        result[i].push(element);
                    }
                }
                return result;
            }
        };

        /**
         * Calculates the row echelon form of a matrix (performs Gaussian elimination on it).
         * @param {ChalkboardMatrix} matr - The matrix
         * @returns {ChalkboardMatrix}
         * @example
         * const result = Chalkboard.matr.Gaussian([[1, 2, 1], [2, 4, 0], [3, 6, 3]]); // Returns its row-echelon form
         */
        export const Gaussian = (matr: ChalkboardMatrix): ChalkboardMatrix => {
            if (!Array.isArray(matr) || matr.length > 0 && !Array.isArray(matr[0])) throw new Error(`Chalkboard.matr.Gaussian: Parameter "matr" must be a matrix.`);
            let lead = 0;
            for (let row = 0; row < Chalkboard.matr.rows(matr); row++) {
                if (lead >= Chalkboard.matr.cols(matr)) {
                    break;
                }
                let i = row;
                while (matr[i][lead] === 0) {
                    i++;
                    if (i === Chalkboard.matr.rows(matr)) {
                        i = row;
                        lead++;
                        if (Chalkboard.matr.cols(matr) === lead) {
                            return matr;
                        }
                    }
                }
                const temp = matr[i];
                matr[i] = matr[row];
                matr[row] = temp;
                const scl = matr[row][lead];
                for (let j = 0; j < Chalkboard.matr.cols(matr); j++) {
                    matr[row][j] /= scl;
                }
                for (let i = 0; i < Chalkboard.matr.rows(matr); i++) {
                    if (i !== row) {
                        const coeff = matr[i][lead];
                        for (let j = 0; j < Chalkboard.matr.cols(matr); j++) {
                            matr[i][j] -= coeff * matr[row][j];
                        }
                    }
                }
                lead++;
            }
            return matr;
        };

        /**
         * Initializes a Hilbert matrix.
         * @param {number} size - The number of rows or columns of the matrix
         * @returns {ChalkboardMatrix}
         * @example
         * const result = Chalkboard.matr.Hilbert(3); // Returns the 3-by-3 Hilbert matrix
         */
        export const Hilbert = (size: number): ChalkboardMatrix => {
            if (!Number.isInteger(size) || size < 1) throw new Error(`Chalkboard.matr.Hilbert: Parameter "size" must be a positive integer.`);
            if (size === 2) {
                return Chalkboard.matr.init([1 / 1, 1 / 2], [1 / 2, 1 / 3]);
            } else if (size === 3) {
                return Chalkboard.matr.init([1 / 1, 1 / 2, 1 / 3], [1 / 2, 1 / 3, 1 / 4], [1 / 3, 1 / 4, 1 / 5]);
            } else if (size === 4) {
                return Chalkboard.matr.init([1 / 1, 1 / 2, 1 / 3, 1 / 4], [1 / 2, 1 / 3, 1 / 4, 1 / 5], [1 / 3, 1 / 4, 1 / 5, 1 / 6], [1 / 4, 1 / 5, 1 / 6, 1 / 7]);
            } else {
                const result = Chalkboard.matr.init();
                for (let i = 0; i < size; i++) {
                    result.push([]);
                    for (let j = 0; j < size; j++) {
                        result[i].push(1 / (i + j + 1));
                    }
                }
                return result;
            }
        };

        /**
         * Initializes an identity matrix.
         * @param {number} size - The number of rows or columns of the matrix
         * @returns {ChalkboardMatrix}
         * @example
         * const result = Chalkboard.matr.identity(3); // Returns the 3-by-3 identity matrix
         */
        export const identity = (size: number): ChalkboardMatrix => {
            if (!Number.isInteger(size) || size < 1) throw new Error(`Chalkboard.matr.identity: Parameter "size" must be a positive integer.`);
            if (size === 2) {
                return Chalkboard.matr.init([1, 0], [0, 1]);
            } else if (size === 3) {
                return Chalkboard.matr.init([1, 0, 0], [0, 1, 0], [0, 0, 1]);
            } else if (size === 4) {
                return Chalkboard.matr.init([1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]);
            } else {
                const result = Chalkboard.matr.init();
                for (let i = 0; i < size; i++) {
                    result.push(Array(size).fill(0));
                    result[i][i] = 1;
                }
                return result;
            }
        };

        /**
         * Initializes a new matrix.
         * @param {number[][] | number[][][]} matrix - Either a sequence of 1D arrays to be used as rows for the matrix or one 2D array to be used as the matrix
         * @returns {ChalkboardMatrix}
         * @example
         * // Defines a 3x3 matrix [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
         * let A = Chalkboard.matr.init([1, 2, 3],
         *                              [4, 5, 6],
         *                              [7, 8, 9]);
         * let B = Chalkboard.matr.init([[1, 2, 3],
         *                               [4, 5, 6],
         *                               [7, 8, 9]]);
         */
        export const init = (...matrix: number[][] | number[][][]): ChalkboardMatrix => {
            if (matrix.length > 0 && !Array.isArray(matrix[0])) throw new Error(`Chalkboard.matr.init: Parameter "matrix" must contain only matrix rows.`);
            if (matrix.length === 0) {
                return [];
            } else if (Array.isArray(matrix[0]) && Array.isArray(matrix[0][0])) {
                return (matrix as number[][][])[0];
            } else {
                return matrix as number[][];
            }
        };

        /**
         * Calculates the inverse of a matrix.
         * @param {ChalkboardMatrix} matr - The matrix
         * @returns {ChalkboardMatrix}
         * @example
         * const result = Chalkboard.matr.invert([[1, 1], [1, 2]]); // Returns [[2, -1], [-1, 1]]
         */
        export const invert = (matr: ChalkboardMatrix): ChalkboardMatrix => {
            if (Chalkboard.matr.isInvertible(matr)) {
                if (Chalkboard.matr.rows(matr) === 2) {
                    const det = Chalkboard.matr.det(matr);
                    return Chalkboard.matr.init(
                        [matr[1][1] / det, -matr[0][1] / det],
                        [-matr[1][0] / det, matr[0][0] / det]
                    );
                } else if (Chalkboard.matr.rows(matr) === 3) {
                    const det = Chalkboard.matr.det(matr);
                    return Chalkboard.matr.init(
                        [(matr[1][1] * matr[2][2] - matr[1][2] * matr[2][1]) / det, (matr[0][2] * matr[2][1] - matr[0][1] * matr[2][2]) / det, (matr[0][1] * matr[1][2] - matr[0][2] * matr[1][1]) / det],
                        [(matr[1][2] * matr[2][0] - matr[1][0] * matr[2][2]) / det, (matr[0][0] * matr[2][2] - matr[0][2] * matr[2][0]) / det, (matr[0][2] * matr[1][0] - matr[0][0] * matr[1][2]) / det],
                        [(matr[1][0] * matr[2][1] - matr[1][1] * matr[2][0]) / det, (matr[0][1] * matr[2][0] - matr[0][0] * matr[2][1]) / det, (matr[0][0] * matr[1][1] - matr[0][1] * matr[1][0]) / det]
                    );
                } else if (Chalkboard.matr.rows(matr) === 4) {
                    const det = Chalkboard.matr.det(matr);
                    const adj00 = matr[0][0] * matr[1][1] - matr[0][1] * matr[1][0],
                        adj01 = matr[0][0] * matr[1][2] - matr[0][2] * matr[1][0],
                        adj02 = matr[0][0] * matr[1][3] - matr[0][3] * matr[1][0],
                        adj03 = matr[0][1] * matr[1][2] - matr[0][2] * matr[1][1],
                        adj04 = matr[0][1] * matr[1][3] - matr[0][3] * matr[1][1],
                        adj05 = matr[0][2] * matr[1][3] - matr[0][3] * matr[1][2],
                        adj06 = matr[2][0] * matr[3][1] - matr[2][1] * matr[3][0],
                        adj07 = matr[2][0] * matr[3][2] - matr[2][2] * matr[3][0],
                        adj08 = matr[2][0] * matr[3][3] - matr[2][3] * matr[3][0],
                        adj09 = matr[2][1] * matr[3][2] - matr[2][2] * matr[3][1],
                        adj10 = matr[2][1] * matr[3][3] - matr[2][3] * matr[3][1],
                        adj11 = matr[2][2] * matr[3][3] - matr[2][3] * matr[3][2];
                    return Chalkboard.matr.init(
                        [(matr[1][1] * adj11 - matr[1][2] * adj10 + matr[1][3] * adj09) / det, (matr[0][2] * adj10 - matr[0][1] * adj11 - matr[0][3] * adj09) / det, (matr[3][1] * adj05 - matr[3][2] * adj04 + matr[3][3] * adj03) / det, (matr[2][2] * adj04 - matr[2][1] * adj05 - matr[2][3] * adj03) / det],
                        [(matr[1][2] * adj08 - matr[1][0] * adj11 - matr[1][3] * adj07) / det, (matr[0][0] * adj11 - matr[0][2] * adj08 + matr[0][3] * adj07) / det, (matr[3][2] * adj02 - matr[3][0] * adj05 - matr[3][3] * adj01) / det, (matr[2][0] * adj05 - matr[2][2] * adj02 + matr[2][3] * adj01) / det],
                        [(matr[1][0] * adj10 - matr[1][1] * adj08 + matr[1][3] * adj06) / det, (matr[0][1] * adj08 - matr[0][0] * adj10 - matr[0][3] * adj06) / det, (matr[3][0] * adj04 - matr[3][1] * adj02 + matr[3][3] * adj00) / det, (matr[2][1] * adj02 - matr[2][0] * adj04 - matr[2][3] * adj00) / det],
                        [(matr[1][1] * adj07 - matr[1][0] * adj09 - matr[1][2] * adj06) / det, (matr[0][0] * adj09 - matr[0][1] * adj07 + matr[0][2] * adj06) / det, (matr[3][1] * adj01 - matr[3][0] * adj03 - matr[3][2] * adj00) / det, (matr[2][0] * adj03 - matr[2][1] * adj01 + matr[2][2] * adj00) / det]
                    );
                } else {
                    const result = Chalkboard.matr.init();
                    const augmented = Chalkboard.matr.init();
                    for (let i = 0; i < Chalkboard.matr.rows(matr); i++) {
                        augmented.push(matr[i].concat(Array(Chalkboard.matr.rows(matr)).fill(0)));
                        augmented[i][Chalkboard.matr.cols(matr) + i] = 1;
                    }
                    for (let row = 0; row < Chalkboard.matr.rows(matr); row++) {
                        let diagonal = augmented[row][row];
                        if (diagonal === 0) {
                            let max = row;
                            for (let i = row + 1; i < Chalkboard.matr.rows(matr); i++) {
                                if (Math.abs(augmented[i][row]) > Math.abs(augmented[max][row])) {
                                    max = i;
                                }
                            }
                            const temp = augmented[row];
                            augmented[row] = augmented[max];
                            augmented[max] = temp;
                            diagonal = augmented[row][row];
                        }
                        for (let col = 0; col < 2 * Chalkboard.matr.cols(matr); col++) {
                            augmented[row][col] /= diagonal;
                        }
                        for (let i = 0; i < Chalkboard.matr.rows(matr); i++) {
                            if (i !== row) {
                                const coeff = augmented[i][row];
                                for (let j = 0; j < 2 * Chalkboard.matr.cols(matr); j++) {
                                    augmented[i][j] -= coeff * augmented[row][j];
                                }
                            }
                        }
                    }
                    for (let i = 0; i < Chalkboard.matr.rows(matr); i++) {
                        result.push(augmented[i].slice(Chalkboard.matr.cols(matr), 2 * Chalkboard.matr.cols(matr)));
                    }
                    return result;
                }
            } else {
                throw new Error(`Chalkboard.matr.invert: Parameter "matr" must be of type ChalkboardMatrix that is square and has a non-zero determinant.`);
            }
        };

        /**
         * Checks if two matrices are approximately equal to each other within a particular precision.
         * @param {ChalkboardMatrix} matr1 - The first matrix
         * @param {ChalkboardMatrix} matr2 - The second matrix
         * @param {number} [precision=0.000001] - The precision to check
         * @returns {boolean}
         * @example
         * const result = Chalkboard.matr.isApproxEqual([[1, 2]], [[1, 2.0000001]]); // Returns true
         */
        export const isApproxEqual = (matr1: ChalkboardMatrix, matr2: ChalkboardMatrix, precision: number = 0.000001): boolean => {
            if (!Array.isArray(matr1) || matr1.length > 0 && !Array.isArray(matr1[0])) throw new Error(`Chalkboard.matr.isApproxEqual: Parameter "matr1" must be a matrix.`);
            if (!Array.isArray(matr2) || matr2.length > 0 && !Array.isArray(matr2[0])) throw new Error(`Chalkboard.matr.isApproxEqual: Parameter "matr2" must be a matrix.`);
            if (precision !== undefined && (!Number.isFinite(precision))) throw new Error(`Chalkboard.matr.isApproxEqual: Parameter "precision" must be a finite number.`);
            if (Chalkboard.matr.isSizeEqual(matr1, matr2)) {
                for (let i = 0; i < Chalkboard.matr.rows(matr1); i++) {
                    for (let j = 0; j < Chalkboard.matr.cols(matr1); j++) {
                        if (!Chalkboard.numb.isApproxEqual(matr1[i][j], matr2[i][j], precision)) {
                            return false;
                        }
                    }
                }
                return true;
            } else {
                return false;
            }
        };

        /**
         * Checks if a matrix is a diagonal matrix.
         * @param {ChalkboardMatrix} matr - The matrix
         * @returns {boolean}
         * @example
         * const result = Chalkboard.matr.isDiagonal([[2, 0], [0, 3]]); // Returns true
         */
        export const isDiagonal = (matr: ChalkboardMatrix): boolean => {
            if (!Array.isArray(matr) || matr.length > 0 && !Array.isArray(matr[0])) throw new Error(`Chalkboard.matr.isDiagonal: Parameter "matr" must be a matrix.`);
            if (Chalkboard.matr.isSquare(matr)) {
                if (Chalkboard.matr.isSizeOf(matr, 2)) {
                    return Chalkboard.numb.isApproxEqual(matr[0][1], 0) && Chalkboard.numb.isApproxEqual(matr[1][0], 0);
                } else if (Chalkboard.matr.isSizeOf(matr, 3)) {
                    return Chalkboard.numb.isApproxEqual(matr[0][1], 0) && Chalkboard.numb.isApproxEqual(matr[0][2], 0) && Chalkboard.numb.isApproxEqual(matr[1][0], 0) && Chalkboard.numb.isApproxEqual(matr[1][2], 0) && Chalkboard.numb.isApproxEqual(matr[2][0], 0) && Chalkboard.numb.isApproxEqual(matr[2][1], 0);
                } else if (Chalkboard.matr.isSizeOf(matr, 4)) {
                    return Chalkboard.numb.isApproxEqual(matr[0][1], 0) && Chalkboard.numb.isApproxEqual(matr[0][2], 0) && Chalkboard.numb.isApproxEqual(matr[0][3], 0) && Chalkboard.numb.isApproxEqual(matr[1][0], 0) && Chalkboard.numb.isApproxEqual(matr[1][2], 0) && Chalkboard.numb.isApproxEqual(matr[1][3], 0) && Chalkboard.numb.isApproxEqual(matr[2][0], 0) && Chalkboard.numb.isApproxEqual(matr[2][1], 0) && Chalkboard.numb.isApproxEqual(matr[2][3], 0) && Chalkboard.numb.isApproxEqual(matr[3][0], 0) && Chalkboard.numb.isApproxEqual(matr[3][1], 0) && Chalkboard.numb.isApproxEqual(matr[3][2], 0);
                } else {
                    for (let i = 0; i < Chalkboard.matr.rows(matr); i++) {
                        for (let j = 0; j < Chalkboard.matr.cols(matr); j++) {
                            if (i !== j && !Chalkboard.numb.isApproxEqual(matr[i][j], 0)) return false;
                        }
                    }
                    return true;
                }
            } else {
                return false;
            }
        };

        /**
         * Checks if two matrices are equal.
         * @param {ChalkboardMatrix} matr1 - The first matrix
         * @param {ChalkboardMatrix} matr2 - The second matrix
         * @returns {boolean}
         * @example
         * const result = Chalkboard.matr.isEqual([[1, 2]], [[1, 2]]); // Returns true
         */
        export const isEqual = (matr1: ChalkboardMatrix, matr2: ChalkboardMatrix): boolean => {
            if (!Array.isArray(matr1) || matr1.length > 0 && !Array.isArray(matr1[0])) throw new Error(`Chalkboard.matr.isEqual: Parameter "matr1" must be a matrix.`);
            if (!Array.isArray(matr2) || matr2.length > 0 && !Array.isArray(matr2[0])) throw new Error(`Chalkboard.matr.isEqual: Parameter "matr2" must be a matrix.`);
            if (Chalkboard.matr.isSizeEqual(matr1, matr2)) {
                if (Chalkboard.matr.isSizeOf(matr1, 2)) {
                    return matr1[0][0] === matr2[0][0] && matr1[0][1] === matr2[0][1] && matr1[1][0] === matr2[1][0] && matr1[1][1] === matr2[1][1];
                } else if (Chalkboard.matr.isSizeOf(matr1, 3)) {
                    return matr1[0][0] === matr2[0][0] && matr1[0][1] === matr2[0][1] && matr1[0][2] === matr2[0][2] && matr1[1][0] === matr2[1][0] && matr1[1][1] === matr2[1][1] && matr1[1][2] === matr2[1][2] && matr1[2][0] === matr2[2][0] && matr1[2][1] === matr2[2][1] && matr1[2][2] === matr2[2][2];
                } else if (Chalkboard.matr.isSizeOf(matr1, 4)) {
                    return matr1[0][0] === matr2[0][0] && matr1[0][1] === matr2[0][1] && matr1[0][2] === matr2[0][2] && matr1[0][3] === matr2[0][3] && matr1[1][0] === matr2[1][0] && matr1[1][1] === matr2[1][1] && matr1[1][2] === matr2[1][2] && matr1[1][3] === matr2[1][3] && matr1[2][0] === matr2[2][0] && matr1[2][1] === matr2[2][1] && matr1[2][2] === matr2[2][2] && matr1[2][3] === matr2[2][3] && matr1[3][0] === matr2[3][0] && matr1[3][1] === matr2[3][1] && matr1[3][2] === matr2[3][2] && matr1[3][3] === matr2[3][3];
                } else {
                    for (let i = 0; i < Chalkboard.matr.rows(matr1); i++) {
                        for (let j = 0; j < Chalkboard.matr.cols(matr2); j++) {
                            if (!(matr1[i][j] === matr2[i][j])) return false;
                        }
                    }
                    return true;
                }
            } else {
                return false;
            }
        };

        /**
         * Checks if a matrix is an identity matrix.
         * @param {ChalkboardMatrix} matr - The matrix
         * @returns {boolean}
         * @example
         * const result = Chalkboard.matr.isIdentity([[1, 0], [0, 1]]); // Returns true
         */
        export const isIdentity = (matr: ChalkboardMatrix): boolean => {
            if (!Array.isArray(matr) || matr.length > 0 && !Array.isArray(matr[0])) throw new Error(`Chalkboard.matr.isIdentity: Parameter "matr" must be a matrix.`);
            if (Chalkboard.matr.isDiagonal(matr)) {
                if (Chalkboard.matr.isSizeOf(matr, 2)) {
                    return Chalkboard.matr.isApproxEqual(matr, Chalkboard.matr.identity(2));
                } else if (Chalkboard.matr.isSizeOf(matr, 3)) {
                    return Chalkboard.matr.isApproxEqual(matr, Chalkboard.matr.identity(3));
                } else if (Chalkboard.matr.isSizeOf(matr, 4)) {
                    return Chalkboard.matr.isApproxEqual(matr, Chalkboard.matr.identity(4));
                } else {
                    return Chalkboard.matr.isApproxEqual(matr, Chalkboard.matr.identity(Chalkboard.matr.rows(matr)));
                }
            } else {
                return false;
            }
        };

        /**
         * Checks if a matrix is invertible.
         * @param {ChalkboardMatrix} matr - The matrix
         * @returns {boolean}
         * @example
         * const result = Chalkboard.matr.isInvertible([[1, 2], [3, 4]]); // Returns true
         */
        export const isInvertible = (matr: ChalkboardMatrix): boolean => {
            if (!Array.isArray(matr) || matr.length > 0 && !Array.isArray(matr[0])) throw new Error(`Chalkboard.matr.isInvertible: Parameter "matr" must be a matrix.`);
            return Chalkboard.matr.isSquare(matr) && Chalkboard.matr.det(matr) !== 0;
        };

        /**
         * Checks if a matrix is a lower triangular matrix.
         * @param {ChalkboardMatrix} matr - The matrix
         * @returns {boolean}
         * @example
         * const result = Chalkboard.matr.isLowerTriangular([[1, 0], [2, 3]]); // Returns true
         */
        export const isLowerTriangular = (matr: ChalkboardMatrix): boolean => {
            if (!Array.isArray(matr) || matr.length > 0 && !Array.isArray(matr[0])) throw new Error(`Chalkboard.matr.isLowerTriangular: Parameter "matr" must be a matrix.`);
            if (Chalkboard.matr.isSquare(matr)) {
                if (Chalkboard.matr.isSizeOf(matr, 2)) {
                    return Chalkboard.matr.isApproxEqual(matr, Chalkboard.matr.init([matr[0][0], 0], [matr[1][0], matr[1][1]]));
                } else if (Chalkboard.matr.isSizeOf(matr, 3)) {
                    return Chalkboard.matr.isApproxEqual(matr, Chalkboard.matr.init([matr[0][0], 0, 0], [matr[1][0], matr[1][1], 0], [matr[2][0], matr[2][1], matr[2][2]]));
                } else if (Chalkboard.matr.isSizeOf(matr, 4)) {
                    return Chalkboard.matr.isApproxEqual(matr, Chalkboard.matr.init([matr[0][0], 0, 0, 0], [matr[1][0], matr[1][1], 0, 0], [matr[2][0], matr[2][1], matr[2][2], 0], [matr[3][0], matr[3][1], matr[3][2], matr[3][3]]));
                } else {
                    let score = 0;
                    for (let i = 0; i < Chalkboard.matr.rows(matr); i++) {
                        for (let j = i + 1; j < Chalkboard.matr.cols(matr); j++) {
                            if (matr[i][j] !== 0) score++;
                        }
                    }
                    return score === 0;
                }
            } else {
                return false;
            }
        };

        /**
         * Checks if a matrix is orthogonal.
         * @param {ChalkboardMatrix} matr - The matrix
         * @returns {boolean}
         * @example
         * const result = Chalkboard.matr.isOrthogonal([[0, -1], [1, 0]]); // Returns true
         */
        export const isOrthogonal = (matr: ChalkboardMatrix): boolean => {
            if (!Array.isArray(matr) || matr.length > 0 && !Array.isArray(matr[0])) throw new Error(`Chalkboard.matr.isOrthogonal: Parameter "matr" must be a matrix.`);
            if (Chalkboard.matr.isInvertible(matr)) {
                return Chalkboard.matr.isApproxEqual(Chalkboard.matr.transpose(matr), Chalkboard.matr.invert(matr));
            } else {
                return false;
            }
        };

        /**
         * Checks if two matrices have equal sizes.
         * @param {ChalkboardMatrix} matr1 - The first matrix
         * @param {ChalkboardMatrix} matr2 - The second matrix
         * @returns {boolean}
         * @example
         * const result = Chalkboard.matr.isSizeEqual([[1, 2]], [[3, 4]]); // Returns true
         */
        export const isSizeEqual = (matr1: ChalkboardMatrix, matr2: ChalkboardMatrix): boolean => {
            if (!Array.isArray(matr1) || matr1.length > 0 && !Array.isArray(matr1[0])) throw new Error(`Chalkboard.matr.isSizeEqual: Parameter "matr1" must be a matrix.`);
            if (!Array.isArray(matr2) || matr2.length > 0 && !Array.isArray(matr2[0])) throw new Error(`Chalkboard.matr.isSizeEqual: Parameter "matr2" must be a matrix.`);
            return Chalkboard.matr.rows(matr1) === Chalkboard.matr.rows(matr2) && Chalkboard.matr.cols(matr1) === Chalkboard.matr.cols(matr2);
        };

        /**
         * Checks if a matrix is of a particular size.
         * @param {ChalkboardMatrix} matr - The matrix
         * @param {number} rows - The number of rows or (if the cols parameter is blank) the number of rows or columns (the size)
         * @param {number} [cols=rows] - The number of columns
         * @example
         * const result = Chalkboard.matr.isSizeOf([[1, 2, 3], [4, 5, 6]], 2, 3); // Returns true
         */
        export const isSizeOf = (matr: ChalkboardMatrix, rows: number, cols: number = rows): boolean => {
            if (!Array.isArray(matr) || matr.length > 0 && !Array.isArray(matr[0])) throw new Error(`Chalkboard.matr.isSizeOf: Parameter "matr" must be a matrix.`);
            if (!Number.isInteger(rows) || rows < 0) throw new Error(`Chalkboard.matr.isSizeOf: Parameter "rows" must be a non-negative integer.`);
            if (!Number.isInteger(cols) || cols < 0) throw new Error(`Chalkboard.matr.isSizeOf: Parameter "cols" must be a non-negative integer.`);
            return Chalkboard.matr.rows(matr) === rows && Chalkboard.matr.cols(matr) === cols;
        };

        /**
         * Checks if a matrix is skew-symmetric.
         * @param {ChalkboardMatrix} matr - The matrix
         * @returns {boolean}
         * @example
         * const result = Chalkboard.matr.isSkewSymmetric([[0, -2], [2, 0]]); // Returns true
         */
        export const isSkewSymmetric = (matr: ChalkboardMatrix): boolean => {
            if (!Array.isArray(matr) || matr.length > 0 && !Array.isArray(matr[0])) throw new Error(`Chalkboard.matr.isSkewSymmetric: Parameter "matr" must be a matrix.`);
            return Chalkboard.matr.isEqual(Chalkboard.matr.transpose(matr), Chalkboard.matr.negate(matr));
        };

        /**
         * Checks if a matrix is square.
         * @param {ChalkboardMatrix} matr - The matrix
         * @returns {boolean}
         * @example
         * const result = Chalkboard.matr.isSquare([[1, 2], [3, 4]]); // Returns true
         */
        export const isSquare = (matr: ChalkboardMatrix): boolean => {
            if (!Array.isArray(matr) || matr.length > 0 && !Array.isArray(matr[0])) throw new Error(`Chalkboard.matr.isSquare: Parameter "matr" must be a matrix.`);
            return Chalkboard.matr.rows(matr) === Chalkboard.matr.cols(matr);
        };

        /**
         * Checks if a matrix is symmetric.
         * @param {ChalkboardMatrix} matr - The matrix
         * @returns {boolean}
         * @example
         * const result = Chalkboard.matr.isSymmetric([[1, 2], [2, 3]]); // Returns true
         */
        export const isSymmetric = (matr: ChalkboardMatrix): boolean => {
            if (!Array.isArray(matr) || matr.length > 0 && !Array.isArray(matr[0])) throw new Error(`Chalkboard.matr.isSymmetric: Parameter "matr" must be a matrix.`);
            return Chalkboard.matr.isEqual(matr, Chalkboard.matr.transpose(matr));
        };

        /**
         * Checks if a matrix is an upper triangular matrix.
         * @param {ChalkboardMatrix} matr - The matrix
         * @returns {boolean}
         * @example
         * const result = Chalkboard.matr.isUpperTriangular([[1, 2], [0, 3]]); // Returns true
         */
        export const isUpperTriangular = (matr: ChalkboardMatrix): boolean => {
            if (!Array.isArray(matr) || matr.length > 0 && !Array.isArray(matr[0])) throw new Error(`Chalkboard.matr.isUpperTriangular: Parameter "matr" must be a matrix.`);
            if (Chalkboard.matr.isSquare(matr)) {
                if (Chalkboard.matr.isSizeOf(matr, 2)) {
                    return Chalkboard.matr.isApproxEqual(matr, Chalkboard.matr.init([matr[0][0], matr[0][1]], [0, matr[1][1]]));
                } else if (Chalkboard.matr.isSizeOf(matr, 3)) {
                    return Chalkboard.matr.isApproxEqual(matr, Chalkboard.matr.init([matr[0][0], matr[0][1], matr[0][2]], [0, matr[1][1], matr[1][2]], [0, 0, matr[2][2]]));
                } else if (Chalkboard.matr.isSizeOf(matr, 4)) {
                    return Chalkboard.matr.isApproxEqual(matr, Chalkboard.matr.init([matr[0][0], matr[0][1], matr[0][2], matr[0][3]], [0, matr[1][1], matr[1][2], matr[1][3]], [0, 0, matr[2][2], matr[2][3]], [0, 0, 0, matr[3][3]]));
                } else {
                    let score = 0;
                    for (let i = 0; i < Chalkboard.matr.rows(matr); i++) {
                        for (let j = 0; j < i; j++) {
                            if (matr[i][j] !== 0) score++;
                        }
                    }
                    return score === 0;
                }
            } else {
                return false;
            }
        };

        /**
         * Checks if a matrix is a zero matrix.
         * @param {ChalkboardMatrix} matr - The matrix
         * @returns {boolean}
         * @example
         * const result = Chalkboard.matr.isZero([[0, 0], [0, 0]]); // Returns true
         */
        export const isZero = (matr: ChalkboardMatrix): boolean => {
            if (!Array.isArray(matr) || matr.length > 0 && !Array.isArray(matr[0])) throw new Error(`Chalkboard.matr.isZero: Parameter "matr" must be a matrix.`);
            return Chalkboard.matr.isApproxEqual(matr, Chalkboard.matr.zero(Chalkboard.matr.rows(matr), Chalkboard.matr.cols(matr)));
        };

        /**
         * Initializes a Lehmer matrix.
         * @param {number} size - The number of rows or columns of the matrix
         * @returns {ChalkboardMatrix}
         * @example
         * const result = Chalkboard.matr.Lehmer(4); // Returns the 4-by-4 Lehmer matrix
         */
        export const Lehmer = (size: number): ChalkboardMatrix => {
            if (!Number.isInteger(size) || size < 1) throw new Error(`Chalkboard.matr.Lehmer: Parameter "size" must be a positive integer.`);
            if (size === 2) {
                return Chalkboard.matr.init([1 / 1, 1 / 2], [1 / 2, 1 / 1]);
            } else if (size === 3) {
                return Chalkboard.matr.init([1 / 1, 1 / 2, 1 / 3], [1 / 2, 1 / 1, 2 / 3], [1 / 3, 2 / 3, 1 / 1]);
            } else if (size === 4) {
                return Chalkboard.matr.init([1 / 1, 1 / 2, 1 / 3, 1 / 4], [1 / 2, 1 / 1, 2 / 3, 1 / 2], [1 / 3, 2 / 3, 1 / 1, 3 / 4], [1 / 4, 1 / 2, 3 / 4, 1 / 1]);
            } else {
                const result = Chalkboard.matr.init();
                for (let i = 0; i < size; i++) {
                    result.push([]);
                    for (let j = 0; j < size; j++) {
                        result[i].push(Math.min(i + 1, j + 1) / Math.max(i + 1, j + 1));
                    }
                }
                return result;
            }
        };

        /**
         * Initializes a lower binomial matrix.
         * @param {number} size - The number of rows or columns of the matrix
         * @returns {ChalkboardMatrix}
         * @example
         * const result = Chalkboard.matr.lowerBinomial(4); // Returns a lower-triangular Pascal matrix
         */
        export const lowerBinomial = (size: number): ChalkboardMatrix => {
            if (!Number.isInteger(size) || size < 1) throw new Error(`Chalkboard.matr.lowerBinomial: Parameter "size" must be a positive integer.`);
            if (size === 2) {
                return Chalkboard.matr.init([1, 0], [1, 1]);
            } else if (size === 3) {
                return Chalkboard.matr.init([1, 0, 0], [1, 1, 0], [1, 2, 1]);
            } else if (size === 4) {
                return Chalkboard.matr.init([1, 0, 0, 0], [1, 1, 0, 0], [1, 2, 1, 0], [1, 3, 3, 1]);
            } else {
                const result = Chalkboard.matr.init();
                for (let i = 0; i < size; i++) {
                    result.push([]);
                    for (let j = 0; j < size; j++) {
                        result[i].push(Chalkboard.numb.binomial(i, j));
                    }
                }
                return result;
            }
        };

        /**
         * Initializes a lower shift matrix.
         * @param {number} size - The number of rows or columns of the matrix
         * @returns {ChalkboardMatrix}
         * @example
         * const result = Chalkboard.matr.lowerShift(4); // Returns the 4-by-4 lower shift matrix
         */
        export const lowerShift = (size: number): ChalkboardMatrix => {
            if (!Number.isInteger(size) || size < 1) throw new Error(`Chalkboard.matr.lowerShift: Parameter "size" must be a positive integer.`);
            if (size === 2) {
                return Chalkboard.matr.init([0, 0], [1, 0]);
            } else if (size === 3) {
                return Chalkboard.matr.init([0, 0, 0], [1, 0, 0], [0, 1, 0]);
            } else if (size === 4) {
                return Chalkboard.matr.init([0, 0, 0, 0], [1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0]);
            } else {
                const result = Chalkboard.matr.init();
                for (let i = 0; i < size; i++) {
                    result[i] = [];
                    for (let j = 0; j < size; j++) {
                        result[i][j] = Chalkboard.numb.Kronecker(i, j + 1);
                    }
                }
                return result;
            }
        };

        /**
         * Initializes a lower triangular matrix.
         * @param {number} size - The number of rows or columns
         * @param {number[]} elements - The elements on and below the main diagonal
         * @returns {ChalkboardMatrix}
         * @example
         * const result = Chalkboard.matr.lowerTriangular(3, 1, 2, 3, 4, 5, 6); // Returns a lower-triangular matrix
         */
        export const lowerTriangular = (size: number, ...elements: number[]): ChalkboardMatrix => {
            if (!Number.isInteger(size) || size < 1) throw new Error(`Chalkboard.matr.lowerTriangular: Parameter "size" must be a positive integer.`);
            if (elements.length > 0 && !Number.isFinite(elements[0]) || elements.length > 1 && !Number.isFinite(elements[elements.length - 1])) throw new Error(`Chalkboard.matr.lowerTriangular: Parameter "elements" must begin and end with finite numbers.`);
            if (size === 2) {
                return Chalkboard.matr.init([elements[0] || 0, 0], [elements[1] || 0, elements[2] || 0]);
            } else if (size === 3) {
                return Chalkboard.matr.init([elements[0] || 0, 0, 0], [elements[1] || 0, elements[2] || 0, 0], [elements[3] || 0, elements[4] || 0, elements[5] || 0]);
            } else if (size === 4) {
                return Chalkboard.matr.init(
                    [elements[0] || 0, 0, 0, 0],
                    [elements[1] || 0, elements[2] || 0, 0, 0],
                    [elements[3] || 0, elements[4] || 0, elements[5] || 0, 0],
                    [elements[6] || 0, elements[7] || 0, elements[8] || 0, elements[9] || 0]
                );
            } else {
                elements = Array.isArray(elements[0]) ? elements[0] : elements;
                const result = Chalkboard.matr.init();
                let index = 0;
                for (let i = 0; i < size; i++) {
                    result[i] = [];
                    for (let j = 0; j < size; j++) {
                        result[i][j] = j <= i ? elements[index++] || 0 : 0;
                    }
                }
                return result;
            }
        };

        /**
         * Calculates the LU decomposition of a matrix.
         * @param {ChalkboardMatrix} matr - The matrix
         * @returns {{L: ChalkboardMatrix, U: ChalkboardMatrix}}
         * @example
         * const result = Chalkboard.matr.LUdecomp([[4, 3], [6, 3]]); // Returns the lower and upper factors
         */
        export const LUdecomp = (matr: ChalkboardMatrix): { L: ChalkboardMatrix; U: ChalkboardMatrix } => {
            if (Chalkboard.matr.isSquare(matr)) {
                const L = Chalkboard.matr.identity(Chalkboard.matr.rows(matr)),
                    U = Chalkboard.matr.fill(0, Chalkboard.matr.rows(matr));
                for (let j = 0; j < Chalkboard.matr.cols(matr); j++) {
                    for (let i = 0; i <= j; i++) {
                        let sum = 0;
                        for (let k = 0; k < i; k++) {
                            sum += L[i][k] * U[k][j];
                        }
                        U[i][j] = matr[i][j] - sum;
                    }
                    for (let i = j + 1; i < Chalkboard.matr.rows(matr); i++) {
                        let sum = 0;
                        for (let k = 0; k < j; k++) {
                            sum += L[i][k] * U[k][j];
                        }
                        L[i][j] = (matr[i][j] - sum) / U[j][j];
                    }
                }
                return { L: L, U: U };
            } else {
                throw new Error(`Chalkboard.matr.LUdecomp: Parameter "matr" must be of type ChalkboardMatrix that is square.`);
            }
        };

        /**
         * Calculates the multiplication of two matrices.
         * @param {ChalkboardMatrix} matr1 - The first matrix
         * @param {ChalkboardMatrix} matr2 - The second matrix
         * @returns {ChalkboardMatrix}
         * @example
         * const result = Chalkboard.matr.mul([[1, 2], [3, 4]], [[0, 1], [1, 0]]); // Returns [[2, 1], [4, 3]]
         */
        export const mul = (matr1: ChalkboardMatrix, matr2: ChalkboardMatrix): ChalkboardMatrix => {
            if (Chalkboard.matr.cols(matr1) === Chalkboard.matr.rows(matr2)) {
                if (Chalkboard.matr.isSizeOf(matr1, 2) && Chalkboard.matr.isSizeOf(matr2, 2, 1)) {
                    return Chalkboard.matr.init(
                        [matr1[0][0] * matr2[0][0] + matr1[0][1] * matr2[1][0]],
                        [matr1[1][0] * matr2[0][0] + matr1[1][1] * matr2[1][0]]
                    );
                } else if (Chalkboard.matr.isSizeOf(matr1, 2) && Chalkboard.matr.isSizeOf(matr2, 2)) {
                    return Chalkboard.matr.init(
                        [matr1[0][0] * matr2[0][0] + matr1[0][1] * matr2[1][0], matr1[0][0] * matr2[0][1] + matr1[0][1] * matr2[1][1]],
                        [matr1[1][0] * matr2[0][0] + matr1[1][1] * matr2[1][0], matr1[1][0] * matr2[0][1] + matr1[1][1] * matr2[1][1]]
                    );
                } else if (Chalkboard.matr.isSizeOf(matr1, 3) && Chalkboard.matr.isSizeOf(matr2, 3, 1)) {
                    return Chalkboard.matr.init(
                        [matr1[0][0] * matr2[0][0] + matr1[0][1] * matr2[1][0] + matr1[0][2] * matr2[2][0]],
                        [matr1[1][0] * matr2[0][0] + matr1[1][1] * matr2[1][0] + matr1[1][2] * matr2[2][0]],
                        [matr1[2][0] * matr2[0][0] + matr1[2][1] * matr2[1][0] + matr1[2][2] * matr2[2][0]]
                    );
                } else if (Chalkboard.matr.isSizeOf(matr1, 3) && Chalkboard.matr.isSizeOf(matr2, 3)) {
                    return Chalkboard.matr.init(
                        [matr1[0][0] * matr2[0][0] + matr1[0][1] * matr2[1][0] + matr1[0][2] * matr2[2][0], matr1[0][0] * matr2[0][1] + matr1[0][1] * matr2[1][1] + matr1[0][2] * matr2[2][1], matr1[0][0] * matr2[0][2] + matr1[0][1] * matr2[1][2] + matr1[0][2] * matr2[2][2]],
                        [matr1[1][0] * matr2[0][0] + matr1[1][1] * matr2[1][0] + matr1[1][2] * matr2[2][0], matr1[1][0] * matr2[0][1] + matr1[1][1] * matr2[1][1] + matr1[1][2] * matr2[2][1], matr1[1][0] * matr2[0][2] + matr1[1][1] * matr2[1][2] + matr1[1][2] * matr2[2][2]],
                        [matr1[2][0] * matr2[0][0] + matr1[2][1] * matr2[1][0] + matr1[2][2] * matr2[2][0], matr1[2][0] * matr2[0][1] + matr1[2][1] * matr2[1][1] + matr1[2][2] * matr2[2][1], matr1[2][0] * matr2[0][2] + matr1[2][1] * matr2[1][2] + matr1[2][2] * matr2[2][2]]
                    );
                } else if (Chalkboard.matr.isSizeOf(matr1, 4) && Chalkboard.matr.isSizeOf(matr2, 4, 1)) {
                    return Chalkboard.matr.init(
                        [matr1[0][0] * matr2[0][0] + matr1[0][1] * matr2[1][0] + matr1[0][2] * matr2[2][0] + matr1[0][3] * matr2[3][0]],
                        [matr1[1][0] * matr2[0][0] + matr1[1][1] * matr2[1][0] + matr1[1][2] * matr2[2][0] + matr1[1][3] * matr2[3][0]],
                        [matr1[2][0] * matr2[0][0] + matr1[2][1] * matr2[1][0] + matr1[2][2] * matr2[2][0] + matr1[2][3] * matr2[3][0]],
                        [matr1[3][0] * matr2[0][0] + matr1[3][1] * matr2[1][0] + matr1[3][2] * matr2[2][0] + matr1[3][3] * matr2[3][0]]
                    );
                } else if (Chalkboard.matr.isSizeOf(matr1, 4) && Chalkboard.matr.isSizeOf(matr2, 4)) {
                    return Chalkboard.matr.init(
                        [matr1[0][0] * matr2[0][0] + matr1[0][1] * matr2[1][0] + matr1[0][2] * matr2[2][0] + matr1[0][3] * matr2[3][0], matr1[0][0] * matr2[0][1] + matr1[0][1] * matr2[1][1] + matr1[0][2] * matr2[2][1] + matr1[0][3] * matr2[3][1], matr1[0][0] * matr2[0][2] + matr1[0][1] * matr2[1][2] + matr1[0][2] * matr2[2][2] + matr1[0][3] * matr2[3][2], matr1[0][0] * matr2[0][3] + matr1[0][1] * matr2[1][3] + matr1[0][2] * matr2[2][3] + matr1[0][3] * matr2[3][3]],
                        [matr1[1][0] * matr2[0][0] + matr1[1][1] * matr2[1][0] + matr1[1][2] * matr2[2][0] + matr1[1][3] * matr2[3][0], matr1[1][0] * matr2[0][1] + matr1[1][1] * matr2[1][1] + matr1[1][2] * matr2[2][1] + matr1[1][3] * matr2[3][1], matr1[1][0] * matr2[0][2] + matr1[1][1] * matr2[1][2] + matr1[1][2] * matr2[2][2] + matr1[1][3] * matr2[3][2], matr1[1][0] * matr2[0][3] + matr1[1][1] * matr2[1][3] + matr1[1][2] * matr2[2][3] + matr1[1][3] * matr2[3][3]],
                        [matr1[2][0] * matr2[0][0] + matr1[2][1] * matr2[1][0] + matr1[2][2] * matr2[2][0] + matr1[2][3] * matr2[3][0], matr1[2][0] * matr2[0][1] + matr1[2][1] * matr2[1][1] + matr1[2][2] * matr2[2][1] + matr1[2][3] * matr2[3][1], matr1[2][0] * matr2[0][2] + matr1[2][1] * matr2[1][2] + matr1[2][2] * matr2[2][2] + matr1[2][3] * matr2[3][2], matr1[2][0] * matr2[0][3] + matr1[2][1] * matr2[1][3] + matr1[2][2] * matr2[2][3] + matr1[2][3] * matr2[3][3]],
                        [matr1[3][0] * matr2[0][0] + matr1[3][1] * matr2[1][0] + matr1[3][2] * matr2[2][0] + matr1[3][3] * matr2[3][0], matr1[3][0] * matr2[0][1] + matr1[3][1] * matr2[1][1] + matr1[3][2] * matr2[2][1] + matr1[3][3] * matr2[3][1], matr1[3][0] * matr2[0][2] + matr1[3][1] * matr2[1][2] + matr1[3][2] * matr2[2][2] + matr1[3][3] * matr2[3][2], matr1[3][0] * matr2[0][3] + matr1[3][1] * matr2[1][3] + matr1[3][2] * matr2[2][3] + matr1[3][3] * matr2[3][3]]
                    );
                } else {
                    const result = Chalkboard.matr.init();
                    for (let i = 0; i < Chalkboard.matr.rows(matr1); i++) {
                        result[i] = [];
                        for (let j = 0; j < Chalkboard.matr.cols(matr2); j++) {
                            result[i][j] = 0;
                            for (let k = 0; k < Chalkboard.matr.cols(matr1); k++) {
                                result[i][j] += matr1[i][k] * matr2[k][j];
                            }
                        }
                    }
                    return result;
                }
            } else {
                throw new Error(`Chalkboard.matr.mul: Parameters "matr1" and "matr2" must be of type ChalkboardMatrix where the numbers of columns of "matr1" must be equivalent to the number of rows of "matr2".`);
            }
        };

        /**
         * Calculates the Kronecker multiplication of two matrices.
         * @param {ChalkboardMatrix} matr1 - The first matrix
         * @param {ChalkboardMatrix} matr2 - The second matrix
         * @returns {ChalkboardMatrix}
         * @example
         * const result = Chalkboard.matr.mulKronecker([[1, 2], [3, 4]], [[0, 1], [1, 0]]); // Returns the Kronecker product
         */
        export const mulKronecker = (matr1: ChalkboardMatrix, matr2: ChalkboardMatrix): ChalkboardMatrix => {
            if (!Array.isArray(matr1) || matr1.length > 0 && !Array.isArray(matr1[0])) throw new Error(`Chalkboard.matr.mulKronecker: Parameter "matr1" must be a matrix.`);
            if (!Array.isArray(matr2) || matr2.length > 0 && !Array.isArray(matr2[0])) throw new Error(`Chalkboard.matr.mulKronecker: Parameter "matr2" must be a matrix.`);
            if (Chalkboard.matr.isSizeOf(matr1, 2) && Chalkboard.matr.isSizeOf(matr2, 2)) {
                return Chalkboard.matr.init(
                    [matr1[0][0] * matr2[0][0], matr1[0][0] * matr2[0][1], matr1[0][1] * matr2[0][0], matr1[0][1] * matr2[0][1]],
                    [matr1[0][0] * matr2[1][0], matr1[0][0] * matr2[1][1], matr1[0][1] * matr2[1][0], matr1[0][1] * matr2[1][1]],
                    [matr1[1][0] * matr2[0][0], matr1[1][0] * matr2[0][1], matr1[1][1] * matr2[0][0], matr1[1][1] * matr2[0][1]],
                    [matr1[1][0] * matr2[1][0], matr1[1][0] * matr2[1][1], matr1[1][1] * matr2[1][0], matr1[1][1] * matr2[1][1]]
                );
            } else if (Chalkboard.matr.isSizeOf(matr1, 3) && Chalkboard.matr.isSizeOf(matr2, 3)) {
                return Chalkboard.matr.init(
                    [matr1[0][0] * matr2[0][0], matr1[0][0] * matr2[0][1], matr1[0][0] * matr2[0][2], matr1[0][1] * matr2[0][0], matr1[0][1] * matr2[0][1], matr1[0][1] * matr2[0][2], matr1[0][2] * matr2[0][0], matr1[0][2] * matr2[0][1], matr1[0][2] * matr2[0][2]],
                    [matr1[0][0] * matr2[1][0], matr1[0][0] * matr2[1][1], matr1[0][0] * matr2[1][2], matr1[0][1] * matr2[1][0], matr1[0][1] * matr2[1][1], matr1[0][1] * matr2[1][2], matr1[0][2] * matr2[1][0], matr1[0][2] * matr2[1][1], matr1[0][2] * matr2[1][2]],
                    [matr1[0][0] * matr2[2][0], matr1[0][0] * matr2[2][1], matr1[0][0] * matr2[2][2], matr1[0][1] * matr2[2][0], matr1[0][1] * matr2[2][1], matr1[0][1] * matr2[2][2], matr1[0][2] * matr2[2][0], matr1[0][2] * matr2[2][1], matr1[0][2] * matr2[2][2]],
                    [matr1[1][0] * matr2[0][0], matr1[1][0] * matr2[0][1], matr1[1][0] * matr2[0][2], matr1[1][1] * matr2[0][0], matr1[1][1] * matr2[0][1], matr1[1][1] * matr2[0][2], matr1[1][2] * matr2[0][0], matr1[1][2] * matr2[0][1], matr1[1][2] * matr2[0][2]],
                    [matr1[1][0] * matr2[1][0], matr1[1][0] * matr2[1][1], matr1[1][0] * matr2[1][2], matr1[1][1] * matr2[1][0], matr1[1][1] * matr2[1][1], matr1[1][1] * matr2[1][2], matr1[1][2] * matr2[1][0], matr1[1][2] * matr2[1][1], matr1[1][2] * matr2[1][2]],
                    [matr1[1][0] * matr2[2][0], matr1[1][0] * matr2[2][1], matr1[1][0] * matr2[2][2], matr1[1][1] * matr2[2][0], matr1[1][1] * matr2[2][1], matr1[1][1] * matr2[2][2], matr1[1][2] * matr2[2][0], matr1[1][2] * matr2[2][1], matr1[1][2] * matr2[2][2]],
                    [matr1[2][0] * matr2[0][0], matr1[2][0] * matr2[0][1], matr1[2][0] * matr2[0][2], matr1[2][1] * matr2[0][0], matr1[2][1] * matr2[0][1], matr1[2][1] * matr2[0][2], matr1[2][2] * matr2[0][0], matr1[2][2] * matr2[0][1], matr1[2][2] * matr2[0][2]],
                    [matr1[2][0] * matr2[1][0], matr1[2][0] * matr2[1][1], matr1[2][0] * matr2[1][2], matr1[2][1] * matr2[1][0], matr1[2][1] * matr2[1][1], matr1[2][1] * matr2[1][2], matr1[2][2] * matr2[1][0], matr1[2][2] * matr2[1][1], matr1[2][2] * matr2[1][2]],
                    [matr1[2][0] * matr2[2][0], matr1[2][0] * matr2[2][1], matr1[2][0] * matr2[2][2], matr1[2][1] * matr2[2][0], matr1[2][1] * matr2[2][1], matr1[2][1] * matr2[2][2], matr1[2][2] * matr2[2][0], matr1[2][2] * matr2[2][1], matr1[2][2] * matr2[2][2]]
                );
            } else if (Chalkboard.matr.isSizeOf(matr1, 4) && Chalkboard.matr.isSizeOf(matr2, 4)) {
                return Chalkboard.matr.init(
                    [matr1[0][0] * matr2[0][0], matr1[0][0] * matr2[0][1], matr1[0][0] * matr2[0][2], matr1[0][0] * matr2[0][3], matr1[0][1] * matr2[0][0], matr1[0][1] * matr2[0][1], matr1[0][1] * matr2[0][2], matr1[0][1] * matr2[0][3], matr1[0][2] * matr2[0][0], matr1[0][2] * matr2[0][1], matr1[0][2] * matr2[0][2], matr1[0][2] * matr2[0][3], matr1[0][3] * matr2[0][0], matr1[0][3] * matr2[0][1], matr1[0][3] * matr2[0][2], matr1[0][3] * matr2[0][3]],
                    [matr1[0][0] * matr2[1][0], matr1[0][0] * matr2[1][1], matr1[0][0] * matr2[1][2], matr1[0][0] * matr2[1][3], matr1[0][1] * matr2[1][0], matr1[0][1] * matr2[1][1], matr1[0][1] * matr2[1][2], matr1[0][1] * matr2[1][3], matr1[0][2] * matr2[1][0], matr1[0][2] * matr2[1][1], matr1[0][2] * matr2[1][2], matr1[0][2] * matr2[1][3], matr1[0][3] * matr2[1][0], matr1[0][3] * matr2[1][1], matr1[0][3] * matr2[1][2], matr1[0][3] * matr2[1][3]],
                    [matr1[0][0] * matr2[2][0], matr1[0][0] * matr2[2][1], matr1[0][0] * matr2[2][2], matr1[0][0] * matr2[2][3], matr1[0][1] * matr2[2][0], matr1[0][1] * matr2[2][1], matr1[0][1] * matr2[2][2], matr1[0][1] * matr2[2][3], matr1[0][2] * matr2[2][0], matr1[0][2] * matr2[2][1], matr1[0][2] * matr2[2][2], matr1[0][2] * matr2[2][3], matr1[0][3] * matr2[2][0], matr1[0][3] * matr2[2][1], matr1[0][3] * matr2[2][2], matr1[0][3] * matr2[2][3]],
                    [matr1[0][0] * matr2[3][0], matr1[0][0] * matr2[3][1], matr1[0][0] * matr2[3][2], matr1[0][0] * matr2[3][3], matr1[0][1] * matr2[3][0], matr1[0][1] * matr2[3][1], matr1[0][1] * matr2[3][2], matr1[0][1] * matr2[3][3], matr1[0][2] * matr2[3][0], matr1[0][2] * matr2[3][1], matr1[0][2] * matr2[3][2], matr1[0][2] * matr2[3][3], matr1[0][3] * matr2[3][0], matr1[0][3] * matr2[3][1], matr1[0][3] * matr2[3][2], matr1[0][3] * matr2[3][3]],
                    [matr1[1][0] * matr2[0][0], matr1[1][0] * matr2[0][1], matr1[1][0] * matr2[0][2], matr1[1][0] * matr2[0][3], matr1[1][1] * matr2[0][0], matr1[1][1] * matr2[0][1], matr1[1][1] * matr2[0][2], matr1[1][1] * matr2[0][3], matr1[1][2] * matr2[0][0], matr1[1][2] * matr2[0][1], matr1[1][2] * matr2[0][2], matr1[1][2] * matr2[0][3], matr1[1][3] * matr2[0][0], matr1[1][3] * matr2[0][1], matr1[1][3] * matr2[0][2], matr1[1][3] * matr2[0][3]],
                    [matr1[1][0] * matr2[1][0], matr1[1][0] * matr2[1][1], matr1[1][0] * matr2[1][2], matr1[1][0] * matr2[1][3], matr1[1][1] * matr2[1][0], matr1[1][1] * matr2[1][1], matr1[1][1] * matr2[1][2], matr1[1][1] * matr2[1][3], matr1[1][2] * matr2[1][0], matr1[1][2] * matr2[1][1], matr1[1][2] * matr2[1][2], matr1[1][2] * matr2[1][3], matr1[1][3] * matr2[1][0], matr1[1][3] * matr2[1][1], matr1[1][3] * matr2[1][2], matr1[1][3] * matr2[1][3]],
                    [matr1[1][0] * matr2[2][0], matr1[1][0] * matr2[2][1], matr1[1][0] * matr2[2][2], matr1[1][0] * matr2[2][3], matr1[1][1] * matr2[2][0], matr1[1][1] * matr2[2][1], matr1[1][1] * matr2[2][2], matr1[1][1] * matr2[2][3], matr1[1][2] * matr2[2][0], matr1[1][2] * matr2[2][1], matr1[1][2] * matr2[2][2], matr1[1][2] * matr2[2][3], matr1[1][3] * matr2[2][0], matr1[1][3] * matr2[2][1], matr1[1][3] * matr2[2][2], matr1[1][3] * matr2[2][3]],
                    [matr1[1][0] * matr2[3][0], matr1[1][0] * matr2[3][1], matr1[1][0] * matr2[3][2], matr1[1][0] * matr2[3][3], matr1[1][1] * matr2[3][0], matr1[1][1] * matr2[3][1], matr1[1][1] * matr2[3][2], matr1[1][1] * matr2[3][3], matr1[1][2] * matr2[3][0], matr1[1][2] * matr2[3][1], matr1[1][2] * matr2[3][2], matr1[1][2] * matr2[3][3], matr1[1][3] * matr2[3][0], matr1[1][3] * matr2[3][1], matr1[1][3] * matr2[3][2], matr1[1][3] * matr2[3][3]],
                    [matr1[2][0] * matr2[0][0], matr1[2][0] * matr2[0][1], matr1[2][0] * matr2[0][2], matr1[2][0] * matr2[0][3], matr1[2][1] * matr2[0][0], matr1[2][1] * matr2[0][1], matr1[2][1] * matr2[0][2], matr1[2][1] * matr2[0][3], matr1[2][2] * matr2[0][0], matr1[2][2] * matr2[0][1], matr1[2][2] * matr2[0][2], matr1[2][2] * matr2[0][3], matr1[2][3] * matr2[0][0], matr1[2][3] * matr2[0][1], matr1[2][3] * matr2[0][2], matr1[2][3] * matr2[0][3]],
                    [matr1[2][0] * matr2[1][0], matr1[2][0] * matr2[1][1], matr1[2][0] * matr2[1][2], matr1[2][0] * matr2[1][3], matr1[2][1] * matr2[1][0], matr1[2][1] * matr2[1][1], matr1[2][1] * matr2[1][2], matr1[2][1] * matr2[1][3], matr1[2][2] * matr2[1][0], matr1[2][2] * matr2[1][1], matr1[2][2] * matr2[1][2], matr1[2][2] * matr2[1][3], matr1[2][3] * matr2[1][0], matr1[2][3] * matr2[1][1], matr1[2][3] * matr2[1][2], matr1[2][3] * matr2[1][3]],
                    [matr1[2][0] * matr2[2][0], matr1[2][0] * matr2[2][1], matr1[2][0] * matr2[2][2], matr1[2][0] * matr2[2][3], matr1[2][1] * matr2[2][0], matr1[2][1] * matr2[2][1], matr1[2][1] * matr2[2][2], matr1[2][1] * matr2[2][3], matr1[2][2] * matr2[2][0], matr1[2][2] * matr2[2][1], matr1[2][2] * matr2[2][2], matr1[2][2] * matr2[2][3], matr1[2][3] * matr2[2][0], matr1[2][3] * matr2[2][1], matr1[2][3] * matr2[2][2], matr1[2][3] * matr2[2][3]],
                    [matr1[2][0] * matr2[3][0], matr1[2][0] * matr2[3][1], matr1[2][0] * matr2[3][2], matr1[2][0] * matr2[3][3], matr1[2][1] * matr2[3][0], matr1[2][1] * matr2[3][1], matr1[2][1] * matr2[3][2], matr1[2][1] * matr2[3][3], matr1[2][2] * matr2[3][0], matr1[2][2] * matr2[3][1], matr1[2][2] * matr2[3][2], matr1[2][2] * matr2[3][3], matr1[2][3] * matr2[3][0], matr1[2][3] * matr2[3][1], matr1[2][3] * matr2[3][2], matr1[2][3] * matr2[3][3]],
                    [matr1[3][0] * matr2[0][0], matr1[3][0] * matr2[0][1], matr1[3][0] * matr2[0][2], matr1[3][0] * matr2[0][3], matr1[3][1] * matr2[0][0], matr1[3][1] * matr2[0][1], matr1[3][1] * matr2[0][2], matr1[3][1] * matr2[0][3], matr1[3][2] * matr2[0][0], matr1[3][2] * matr2[0][1], matr1[3][2] * matr2[0][2], matr1[3][2] * matr2[0][3], matr1[3][3] * matr2[0][0], matr1[3][3] * matr2[0][1], matr1[3][3] * matr2[0][2], matr1[3][3] * matr2[0][3]],
                    [matr1[3][0] * matr2[1][0], matr1[3][0] * matr2[1][1], matr1[3][0] * matr2[1][2], matr1[3][0] * matr2[1][3], matr1[3][1] * matr2[1][0], matr1[3][1] * matr2[1][1], matr1[3][1] * matr2[1][2], matr1[3][1] * matr2[1][3], matr1[3][2] * matr2[1][0], matr1[3][2] * matr2[1][1], matr1[3][2] * matr2[1][2], matr1[3][2] * matr2[1][3], matr1[3][3] * matr2[1][0], matr1[3][3] * matr2[1][1], matr1[3][3] * matr2[1][2], matr1[3][3] * matr2[1][3]],
                    [matr1[3][0] * matr2[2][0], matr1[3][0] * matr2[2][1], matr1[3][0] * matr2[2][2], matr1[3][0] * matr2[2][3], matr1[3][1] * matr2[2][0], matr1[3][1] * matr2[2][1], matr1[3][1] * matr2[2][2], matr1[3][1] * matr2[2][3], matr1[3][2] * matr2[2][0], matr1[3][2] * matr2[2][1], matr1[3][2] * matr2[2][2], matr1[3][2] * matr2[2][3], matr1[3][3] * matr2[2][0], matr1[3][3] * matr2[2][1], matr1[3][3] * matr2[2][2], matr1[3][3] * matr2[2][3]],
                    [matr1[3][0] * matr2[3][0], matr1[3][0] * matr2[3][1], matr1[3][0] * matr2[3][2], matr1[3][0] * matr2[3][3], matr1[3][1] * matr2[3][0], matr1[3][1] * matr2[3][1], matr1[3][1] * matr2[3][2], matr1[3][1] * matr2[3][3], matr1[3][2] * matr2[3][0], matr1[3][2] * matr2[3][1], matr1[3][2] * matr2[3][2], matr1[3][2] * matr2[3][3], matr1[3][3] * matr2[3][0], matr1[3][3] * matr2[3][1], matr1[3][3] * matr2[3][2], matr1[3][3] * matr2[3][3]]
                );
            } else {
                const result = Chalkboard.matr.init();
                for (let i = 0; i < Chalkboard.matr.rows(matr1); i++) {
                    for (let j = 0; j < Chalkboard.matr.cols(matr1); j++) {
                        for (let k = 0; k < Chalkboard.matr.rows(matr2); k++) {
                            for (let l = 0; l < Chalkboard.matr.cols(matr2); l++) {
                                if (!result[i * Chalkboard.matr.rows(matr2) + k]) {
                                    result[i * Chalkboard.matr.rows(matr2) + k] = [];
                                }
                                result[i * Chalkboard.matr.rows(matr2) + k][j * Chalkboard.matr.cols(matr2) + l] = matr1[i][j] * matr2[k][l];
                            }
                        }
                    }
                }
                return result;
            }
        };

        /**
         * Calculates the multiplication of a matrix with a vector.
         * @param {ChalkboardMatrix} matr - The matrix
         * @param {ChalkboardVector} vect - The vector
         * @returns {ChalkboardMatrix | ChalkboardVector}
         * @example
         * const result = Chalkboard.matr.mulVector([[1, 2], [3, 4]], Chalkboard.vect.init(1, -1)); // Returns the transformed vector
         */
        export const mulVector = (matr: ChalkboardMatrix, vect: ChalkboardVector): ChalkboardMatrix | ChalkboardVector => {
            vect = $(vect, "Chalkboard.matr.mulVector") as { x: number, y: number, z?: number, w?: number };
            if (Chalkboard.vect.isDimensionOf(vect, 2)) {
                if (Chalkboard.matr.rows(matr) === 2) {
                    return Chalkboard.matr.toVector(Chalkboard.matr.mul(matr, Chalkboard.vect.toMatrix(vect)), 2);
                } else {
                    return Chalkboard.matr.mul(matr, Chalkboard.vect.toMatrix(vect));
                }
            } else if (Chalkboard.vect.isDimensionOf(vect, 3)) {
                if (Chalkboard.matr.rows(matr) === 3) {
                    return Chalkboard.matr.toVector(Chalkboard.matr.mul(matr, Chalkboard.vect.toMatrix(vect)), 3);
                } else {
                    return Chalkboard.matr.mul(matr, Chalkboard.vect.toMatrix(vect));
                }
            } else if (Chalkboard.vect.isDimensionOf(vect, 4)) {
                if (Chalkboard.matr.rows(matr) === 4) {
                    return Chalkboard.matr.toVector(Chalkboard.matr.mul(matr, Chalkboard.vect.toMatrix(vect)), 4);
                } else {
                    return Chalkboard.matr.mul(matr, Chalkboard.vect.toMatrix(vect));
                }
            } else {
                throw new Error(`Chalkboard.matr.mulVector: Parameter "vect" must be of type ChalkboardVector with 2, 3, or 4 dimensions.`);
            }
        };

        /**
         * Calculates the negation of a matrix.
         * @param {ChalkboardMatrix} matr - The matrix
         * @returns {ChalkboardMatrix}
         * @example
         * const result = Chalkboard.matr.negate([[1, -2], [3, -4]]); // Returns [[-1, 2], [-3, 4]]
         */
        export const negate = (matr: ChalkboardMatrix): ChalkboardMatrix => {
            if (!Array.isArray(matr) || matr.length > 0 && !Array.isArray(matr[0])) throw new Error(`Chalkboard.matr.negate: Parameter "matr" must be a matrix.`);
            if (Chalkboard.matr.isSizeOf(matr, 2)) {
                return Chalkboard.matr.init([-matr[0][0], -matr[0][1]], [-matr[1][0], -matr[1][1]]);
            } else if (Chalkboard.matr.isSizeOf(matr, 3)) {
                return Chalkboard.matr.init([-matr[0][0], -matr[0][1], -matr[0][2]], [-matr[1][0], -matr[1][1], -matr[1][2]], [-matr[2][0], -matr[2][1], -matr[2][2]]);
            } else if (Chalkboard.matr.isSizeOf(matr, 4)) {
                return Chalkboard.matr.init([-matr[0][0], -matr[0][1], -matr[0][2], -matr[0][3]], [-matr[1][0], -matr[1][1], -matr[1][2], -matr[1][3]], [-matr[2][0], -matr[2][1], -matr[2][2], -matr[2][3]], [-matr[3][0], -matr[3][1], -matr[3][2], -matr[3][3]]);
            } else {
                const result = Chalkboard.matr.init();
                for (let i = 0; i < Chalkboard.matr.rows(matr); i++) {
                    result[i] = [];
                    for (let j = 0; j < Chalkboard.matr.cols(matr); j++) {
                        result[i][j] = -matr[i][j];
                    }
                }
                return result;
            }
        };

        /**
         * Calculates the element-wise L_(p,q) norm of a matrix.
         * @param {ChalkboardMatrix} matr - The matrix
         * @param {number} [p=2] - The exponent of each element and the denominator of the exponent of the sum of the rows
         * @param {number} [q=2] - The numerator of the exponent of the sum of the rows and the denominator of the exponent of the sum of the summed rows
         * @returns {number}
         * @example
         * const result = Chalkboard.matr.norm([[3, 4]]); // Returns 5
         */
        export const norm = (matr: ChalkboardMatrix, p: number = 2, q: number = 2): number => {
            if (!Array.isArray(matr) || matr.length > 0 && !Array.isArray(matr[0])) throw new Error(`Chalkboard.matr.norm: Parameter "matr" must be a matrix.`);
            if (!Number.isFinite(p) || p <= 0) throw new Error(`Chalkboard.matr.norm: Parameter "p" must be greater than 0.`);
            if (!Number.isFinite(q) || q <= 0) throw new Error(`Chalkboard.matr.norm: Parameter "q" must be greater than 0.`);
            if (Chalkboard.matr.isSizeOf(matr, 2) && p === 2 && q === 2) {
                return Chalkboard.real.sqrt(matr[0][0] * matr[0][0] + matr[0][1] * matr[0][1] + matr[1][0] * matr[1][0] + matr[1][1] * matr[1][1]);
            } else if (Chalkboard.matr.isSizeOf(matr, 3) && p === 2 && q === 2) {
                return Chalkboard.real.sqrt(matr[0][0] * matr[0][0] + matr[0][1] * matr[0][1] + matr[0][2] * matr[0][2] + matr[1][0] * matr[1][0] + matr[1][1] * matr[1][1] + matr[1][2] * matr[1][2] + matr[2][0] * matr[2][0] + matr[2][1] * matr[2][1] + matr[2][2] * matr[2][2]);
            } else if (Chalkboard.matr.isSizeOf(matr, 4) && p === 2 && q === 2) {
                return Chalkboard.real.sqrt(matr[0][0] * matr[0][0] + matr[0][1] * matr[0][1] + matr[0][2] * matr[0][2] + matr[0][3] * matr[0][3] + matr[1][0] * matr[1][0] + matr[1][1] * matr[1][1] + matr[1][2] * matr[1][2] + matr[1][3] * matr[1][3] + matr[2][0] * matr[2][0] + matr[2][1] * matr[2][1] + matr[2][2] * matr[2][2] + matr[2][3] * matr[2][3] + matr[3][0] * matr[3][0] + matr[3][1] * matr[3][1] + matr[3][2] * matr[3][2] + matr[3][3] * matr[3][3]);
            } else {
                let result = 0;
                for (let i = 0; i < Chalkboard.matr.rows(matr); i++) {
                    let rowResult = 0;
                    for (let j = 0; j < Chalkboard.matr.cols(matr); j++) {
                        rowResult += Chalkboard.real.pow(matr[i][j], p) as number;
                    }
                    result += Chalkboard.real.pow(rowResult, q / p) as number;
                }
                return Chalkboard.real.pow(result, 1 / q) as number;
            }
        };

        /**
         * Calculates the normalization of a matrix with the element-wise L_(p, q) norm.
         * @param {ChalkboardMatrix} matr - The matrix
         * @param {number} [p=2] - The exponent of each element and the denominator of the exponent of the sum of the rows
         * @param {number} [q=2] - The numerator of the exponent of the sum of the rows and the denominator of the exponent of the sum of the summed rows
         * @returns {ChalkboardMatrix}
         * @example
         * const result = Chalkboard.matr.normalize([[3, 4]]); // Returns a unit-norm matrix
         */
        export const normalize = (matr: ChalkboardMatrix, p: number = 2, q: number = 2): ChalkboardMatrix => {
            if (!Array.isArray(matr) || matr.length > 0 && !Array.isArray(matr[0])) throw new Error(`Chalkboard.matr.normalize: Parameter "matr" must be a matrix.`);
            if (!Number.isFinite(p) || p <= 0) throw new Error(`Chalkboard.matr.normalize: Parameter "p" must be greater than 0.`);
            if (!Number.isFinite(q) || q <= 0) throw new Error(`Chalkboard.matr.normalize: Parameter "q" must be greater than 0.`);
            if (Chalkboard.matr.isSizeOf(matr, 2)) {
                return Chalkboard.matr.init(
                    [matr[0][0] / Chalkboard.matr.norm(matr, p, q), matr[0][1] / Chalkboard.matr.norm(matr, p, q)],
                    [matr[1][0] / Chalkboard.matr.norm(matr, p, q), matr[1][1] / Chalkboard.matr.norm(matr, p, q)]
                );
            } else if (Chalkboard.matr.isSizeOf(matr, 3)) {
                return Chalkboard.matr.init(
                    [matr[0][0] / Chalkboard.matr.norm(matr, p, q), matr[0][1] / Chalkboard.matr.norm(matr, p, q), matr[0][2] / Chalkboard.matr.norm(matr, p, q)],
                    [matr[1][0] / Chalkboard.matr.norm(matr, p, q), matr[1][1] / Chalkboard.matr.norm(matr, p, q), matr[1][2] / Chalkboard.matr.norm(matr, p, q)],
                    [matr[2][0] / Chalkboard.matr.norm(matr, p, q), matr[2][1] / Chalkboard.matr.norm(matr, p, q), matr[2][2] / Chalkboard.matr.norm(matr, p, q)]
                );
            } else if (Chalkboard.matr.isSizeOf(matr, 4)) {
                return Chalkboard.matr.init(
                    [matr[0][0] / Chalkboard.matr.norm(matr, p, q), matr[0][1] / Chalkboard.matr.norm(matr, p, q), matr[0][2] / Chalkboard.matr.norm(matr, p, q), matr[0][3] / Chalkboard.matr.norm(matr, p, q)],
                    [matr[1][0] / Chalkboard.matr.norm(matr, p, q), matr[1][1] / Chalkboard.matr.norm(matr, p, q), matr[1][2] / Chalkboard.matr.norm(matr, p, q), matr[1][3] / Chalkboard.matr.norm(matr, p, q)],
                    [matr[2][0] / Chalkboard.matr.norm(matr, p, q), matr[2][1] / Chalkboard.matr.norm(matr, p, q), matr[2][2] / Chalkboard.matr.norm(matr, p, q), matr[2][3] / Chalkboard.matr.norm(matr, p, q)],
                    [matr[3][0] / Chalkboard.matr.norm(matr, p, q), matr[3][1] / Chalkboard.matr.norm(matr, p, q), matr[3][2] / Chalkboard.matr.norm(matr, p, q), matr[3][3] / Chalkboard.matr.norm(matr, p, q)]
                );
            } else {
                const result = Chalkboard.matr.init();
                for (let i = 0; i < Chalkboard.matr.rows(matr); i++) {
                    result[i] = [];
                    for (let j = 0; j < Chalkboard.matr.cols(matr); j++) {
                        result[i][j] = matr[i][j] / Chalkboard.matr.norm(matr, p, q);
                    }
                }
                return result;
            }
        };

        /**
         * Calculates the element-wise L_(p,q) norm squared of a matrix.
         * @param {ChalkboardMatrix} matr - The matrix
         * @param {number} [p=2] - The exponent of each element and the denominator of the exponent of the sum of the rows
         * @param {number} [q=2] - The numerator of the exponent of the sum of the rows
         * @returns {number}
         * @example
         * const result = Chalkboard.matr.normsq([[3, 4]]); // Returns 25
         */
        export const normsq = (matr: ChalkboardMatrix, p: number = 2, q: number = 2): number => {
            if (!Array.isArray(matr) || matr.length > 0 && !Array.isArray(matr[0])) throw new Error(`Chalkboard.matr.normsq: Parameter "matr" must be a matrix.`);
            if (!Number.isFinite(p) || p <= 0) throw new Error(`Chalkboard.matr.normsq: Parameter "p" must be greater than 0.`);
            if (!Number.isFinite(q) || q <= 0) throw new Error(`Chalkboard.matr.normsq: Parameter "q" must be greater than 0.`);
            if (Chalkboard.matr.isSizeOf(matr, 2) && p === 2 && q === 2) {
                return matr[0][0] * matr[0][0] + matr[0][1] * matr[0][1] + matr[1][0] * matr[1][0] + matr[1][1] * matr[1][1];
            } else if (Chalkboard.matr.isSizeOf(matr, 3) && p === 2 && q === 2) {
                return matr[0][0] * matr[0][0] + matr[0][1] * matr[0][1] + matr[0][2] * matr[0][2] + matr[1][0] * matr[1][0] + matr[1][1] * matr[1][1] + matr[1][2] * matr[1][2] + matr[2][0] * matr[2][0] + matr[2][1] * matr[2][1] + matr[2][2] * matr[2][2];
            } else if (Chalkboard.matr.isSizeOf(matr, 4) && p === 2 && q === 2) {
                return matr[0][0] * matr[0][0] + matr[0][1] * matr[0][1] + matr[0][2] * matr[0][2] + matr[0][3] * matr[0][3] + matr[1][0] * matr[1][0] + matr[1][1] * matr[1][1] + matr[1][2] * matr[1][2] + matr[1][3] * matr[1][3] + matr[2][0] * matr[2][0] + matr[2][1] * matr[2][1] + matr[2][2] * matr[2][2] + matr[2][3] * matr[2][3] + matr[3][0] * matr[3][0] + matr[3][1] * matr[3][1] + matr[3][2] * matr[3][2] + matr[3][3] * matr[3][3];
            } else {
                let result = 0;
                for (let i = 0; i < Chalkboard.matr.rows(matr); i++) {
                    let rowResult = 0;
                    for (let j = 0; j < Chalkboard.matr.cols(matr); j++) {
                        rowResult += Chalkboard.real.pow(matr[i][j], p) as number;
                    }
                    result += Chalkboard.real.pow(rowResult, q / p) as number;
                }
                return result;
            }
        };

        /**
         * Calculates the null space of a matrix.
         * @param {ChalkboardMatrix} matr - The matrix
         * @returns {ChalkboardMatrix}
         * @example
         * const result = Chalkboard.matr.nullspace([[1, 2, 3], [2, 4, 6]]); // Returns a basis for the null space
         */
        export const nullspace = (matr: ChalkboardMatrix): ChalkboardMatrix => {
            if (!Array.isArray(matr) || matr.length > 0 && !Array.isArray(matr[0])) throw new Error(`Chalkboard.matr.nullspace: Parameter "matr" must be a matrix.`);
            const augmented = matr.map((row) => row.slice().concat(Array(Chalkboard.matr.rows(matr)).fill(0)));
            const rowEchelonForm = Chalkboard.matr.Gaussian(augmented);
            return rowEchelonForm.filter((row: number[]) => row.slice(0, Chalkboard.matr.rows(matr)).every((element) => element === 0)).map((row: number[]) => row.slice(Chalkboard.matr.rows(matr)));
        };

        /**
         * Calculates the permanent of a matrix.
         * @param {ChalkboardMatrix} matr - The matrix
         * @returns {number}
         * @example
         * const result = Chalkboard.matr.perm([[0, 1], [1, 0]]); // Returns -1
         */
        export const perm = (matr: ChalkboardMatrix): number => {
            if (Chalkboard.matr.isSquare(matr)) {
                if (Chalkboard.matr.rows(matr) === 1) {
                    return matr[0][0];
                } else if (Chalkboard.matr.rows(matr) === 2) {
                    return matr[0][0] * matr[1][1] + matr[0][1] * matr[1][0];
                } else if (Chalkboard.matr.rows(matr) === 3) {
                    return matr[0][0] * (matr[1][1] * matr[2][2] + matr[1][2] * matr[2][1]) + matr[0][1] * (matr[1][0] * matr[2][2] + matr[1][2] * matr[2][0]) + matr[0][2] * (matr[1][0] * matr[2][1] + matr[1][1] * matr[2][0]);
                } else if (Chalkboard.matr.rows(matr) === 4) {
                    return matr[0][0] * (matr[1][1] * (matr[2][2] * matr[3][3] + matr[2][3] * matr[3][2]) + matr[1][2] * (matr[2][1] * matr[3][3] + matr[2][3] * matr[3][1]) + matr[1][3] * (matr[2][1] * matr[3][2] + matr[2][2] * matr[3][1])) + matr[0][1] * (matr[1][0] * (matr[2][2] * matr[3][3] + matr[2][3] * matr[3][2]) + matr[1][2] * (matr[2][0] * matr[3][3] + matr[2][3] * matr[3][0]) + matr[1][3] * (matr[2][0] * matr[3][2] + matr[2][2] * matr[3][0])) + matr[0][2] * (matr[1][0] * (matr[2][1] * matr[3][3] + matr[2][3] * matr[3][1]) + matr[1][1] * (matr[2][0] * matr[3][3] + matr[2][3] * matr[3][0]) + matr[1][3] * (matr[2][0] * matr[3][1] + matr[2][1] * matr[3][0])) + matr[0][3] * (matr[1][0] * (matr[2][1] * matr[3][2] + matr[2][2] * matr[3][1]) + matr[1][1] * (matr[2][0] * matr[3][2] + matr[2][2] * matr[3][0]) + matr[1][2] * (matr[2][0] * matr[3][1] + matr[2][1] * matr[3][0]));
                } else {
                    let result = 0;
                    for (let i = 0; i < Chalkboard.matr.rows(matr); i++) {
                        const cofactor = matr[0][i] * Chalkboard.matr.perm(Chalkboard.matr.cofactor(matr, 0, i));
                        result += Math.abs(cofactor);
                    }
                    return result;
                }
            } else {
                throw new Error(`Chalkboard.matr.perm: Parameter "matr" must be of type ChalkboardMatrix that is square.`);
            }
        };

        /**
         * Calculates the exponentiation of a matrix.
         * @param {ChalkboardMatrix} matr - The matrix
         * @param {number} num - The exponent
         * @returns {ChalkboardMatrix}
         * @example
         * const result = Chalkboard.matr.pow([[1, 1], [1, 0]], 5); // Returns the fifth power of the Fibonacci matrix
         */
        export const pow = (matr: ChalkboardMatrix, num: number): ChalkboardMatrix => {
            if (!Number.isInteger(num) || num < 0) throw new Error(`Chalkboard.matr.pow: Parameter "num" must be a non-negative integer.`);
            if (Chalkboard.matr.isSquare(matr)) {
                if (num === 0) {
                    return Chalkboard.matr.identity(Chalkboard.matr.rows(matr));
                } else {
                    let result = matr;
                    for (let i = 1; i < num; i++) {
                        result = Chalkboard.matr.mul(matr, result);
                    }
                    return result;
                }
            } else {
                throw new Error(`Chalkboard.matr.pow: Parameter "matr" must be of type ChalkboardMatrix that is square.`);
            }
        };

        /**
         * Prints a matrix in the console.
         * @param {ChalkboardMatrix} matr - The matrix
         * @returns {void}
         * @example
         * Chalkboard.matr.print([[1, 2], [3, 4]]); // Prints the matrix
         */
        export const print = (matr: ChalkboardMatrix): void => {
            if (!Array.isArray(matr) || matr.length > 0 && !Array.isArray(matr[0])) throw new Error(`Chalkboard.matr.print: Parameter "matr" must be a matrix.`);
            console.log(Chalkboard.matr.toString(matr));
        };

        /**
         * Returns a matrix with a row or column removed (pulled out).
         * @param {ChalkboardMatrix} matr - The matrix
         * @param {number} index - The index of the row or column to pull
         * @param {number} axis - The axis to pull from, which is 0 for the rows or 1 for the columns
         * @returns {ChalkboardMatrix}
         * @example
         * const result = Chalkboard.matr.pull([[1, 2], [3, 4]], 0, 0); // Removes the first row
         */
        export const pull = (matr: ChalkboardMatrix, index: number, axis: 0 | 1): ChalkboardMatrix => {
            if (!Array.isArray(matr) || matr.length > 0 && !Array.isArray(matr[0])) throw new Error(`Chalkboard.matr.pull: Parameter "matr" must be a matrix.`);
            if (axis !== 0 && axis !== 1) throw new Error(`Chalkboard.matr.pull: Parameter "axis" must be 0 or 1.`);
            if (!Number.isInteger(index) || index < 0 || axis === 0 && index >= Chalkboard.matr.rows(matr) || axis === 1 && index >= Chalkboard.matr.cols(matr)) throw new Error(`Chalkboard.matr.pull: Parameter "index" must be an integer within the selected axis bounds.`);
            if (axis === 0) {
                matr.splice(index, 1);
                return matr;
            } else if (axis === 1) {
                for (let i = 0; i < Chalkboard.matr.rows(matr); i++) {
                    matr[i].splice(index, 1);
                }
                return matr;
            } else {
                throw new Error(`Chalkboard.matr.pull: Parameter "axis" must be 0 or 1.`);
            }
        };

        /**
         * Returns a matrix with a row or column added (pushed in).
         * @param {ChalkboardMatrix} matr - The matrix
         * @param {number} index - The index of the row or column to push
         * @param {number} axis - The axis to push to, which is 0 for the rows or 1 for the columns
         * @param {number[]} elements - The elements to push
         * @returns {ChalkboardMatrix}
         * @example
         * const result = Chalkboard.matr.push([[1, 2], [3, 4]], 1, 0, [5, 6]); // Inserts a row at index 1
         */
        export const push = (matr: ChalkboardMatrix, index: number, axis: 0 | 1, elements: number[]): ChalkboardMatrix => {
            if (!Array.isArray(matr) || matr.length > 0 && !Array.isArray(matr[0])) throw new Error(`Chalkboard.matr.push: Parameter "matr" must be a matrix.`);
            if (axis !== 0 && axis !== 1) throw new Error(`Chalkboard.matr.push: Parameter "axis" must be 0 or 1.`);
            if (!Number.isInteger(index) || index < 0 || axis === 0 && index > Chalkboard.matr.rows(matr) || axis === 1 && index > Chalkboard.matr.cols(matr)) throw new Error(`Chalkboard.matr.push: Parameter "index" must be an integer within the selected axis insertion bounds.`);
            if (!Array.isArray(elements)) throw new Error(`Chalkboard.matr.push: Parameter "elements" must be an array.`);
            if (axis === 0 && elements.length !== Chalkboard.matr.cols(matr) || axis === 1 && elements.length !== Chalkboard.matr.rows(matr)) throw new Error(`Chalkboard.matr.push: Parameter "elements" must have the same length as the unselected matrix axis.`);
            if (axis === 0) {
                matr.splice(index, 0, elements);
                return matr;
            } else if (axis === 1) {
                for (let i = 0; i < Chalkboard.matr.rows(matr); i++) {
                    matr[i].splice(index, 0, elements[i]);
                }
                return matr;
            } else {
                throw new Error(`Chalkboard.matr.push: Parameter "axis" must be 0 or 1.`);
            }
        };

        /**
         * Calculates the QR decomposition of a matrix.
         * @param {ChalkboardMatrix} matr - The matrix
         * @returns {{Q: ChalkboardMatrix, R: ChalkboardMatrix}}
         * @example
         * const result = Chalkboard.matr.QRdecomp([[1, 1], [1, -1]]); // Returns the orthogonal and upper-triangular factors
         */
        export const QRdecomp = (matr: ChalkboardMatrix): { Q: ChalkboardMatrix; R: ChalkboardMatrix } => {
            if (!Array.isArray(matr) || matr.length > 0 && !Array.isArray(matr[0])) throw new Error(`Chalkboard.matr.QRdecomp: Parameter "matr" must be a matrix.`);
            const Q = Chalkboard.matr.identity(Chalkboard.matr.rows(matr)),
                R = Chalkboard.matr.copy(matr);
            for (let j = 0; j < Math.min(Chalkboard.matr.rows(matr), Chalkboard.matr.cols(matr)) - (Chalkboard.matr.rows(matr) > Chalkboard.matr.cols(matr) ? 0 : 1); j++) {
                let norm = 0;
                for (let i = j; i < Chalkboard.matr.rows(matr); i++) {
                    norm += R[i][j] * R[i][j];
                }
                norm = Chalkboard.real.sqrt(norm);
                const v = [];
                v[0] = norm - R[j][j];
                let normalizer = v[0] * v[0];
                for (let i = 1; i < Chalkboard.matr.rows(matr) - j; i++) {
                    v[i] = -R[i + j][j];
                    normalizer += v[i] * v[i];
                }
                normalizer = 1 / Chalkboard.real.sqrt(normalizer);
                for (let i = 0; i < v.length; i++) {
                    v[i] *= normalizer;
                }
                R[j][j] = norm;
                for (let i = j + 1; i < Chalkboard.matr.rows(R); i++) {
                    R[i][j] = 0;
                }
                for (let k = j + 1; k < Chalkboard.matr.cols(R); k++) {
                    let dot = 0;
                    for (let i = 0; i < v.length; i++) {
                        dot += v[i] * R[i + j][k];
                    }
                    dot *= 2;
                    for (let i = 0; i < v.length; i++) {
                        R[i + j][k] -= dot * v[i];
                    }
                }
                for (let k = 0; k < Chalkboard.matr.cols(Q); k++) {
                    let dot = 0;
                    for (let i = 0; i < v.length; i++) {
                        dot += v[i] * Q[k][i + j];
                    }
                    dot *= 2;
                    for (let i = 0; i < v.length; i++) {
                        Q[k][i + j] -= dot * v[i];
                    }
                }
            }
            return { Q: Q, R: R };
        };

        /**
         * Initializes a random matrix.
         * @param {number} rows - The number of rows or (if the cols parameter is blank) the number of rows or columns (the size)
         * @param {number} [cols=rows] - The number of columns
         * @param {number} [inf=0] - The lower bound
         * @param {number} [sup=1] - The upper bound
         * @returns {ChalkboardMatrix}
         * @example
         * const result = Chalkboard.matr.random(3, 3, -1, 1); // Returns a random 3-by-3 matrix
         */
        export const random = (rows: number, cols: number = rows, inf: number = 0, sup: number = 1): ChalkboardMatrix => {
            if (!Number.isInteger(rows) || rows < 0) throw new Error(`Chalkboard.matr.random: Parameter "rows" must be a non-negative integer.`);
            if (!Number.isInteger(cols) || cols < 0) throw new Error(`Chalkboard.matr.random: Parameter "cols" must be a non-negative integer.`);
            if (inf !== undefined && (!Number.isFinite(inf))) throw new Error(`Chalkboard.matr.random: Parameter "inf" must be a finite number.`);
            if (sup !== undefined && (!Number.isFinite(sup))) throw new Error(`Chalkboard.matr.random: Parameter "sup" must be a finite number.`);
            if (rows === 2 && cols === 2) {
                return Chalkboard.matr.init([Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup)], [Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup)]);
            } else if (rows === 3 && cols === 3) {
                return Chalkboard.matr.init([Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup)], [Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup)], [Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup)]);
            } else if (rows === 4 && cols === 4) {
                return Chalkboard.matr.init([Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup)], [Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup)], [Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup)], [Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup)]);
            } else {
                const result = Chalkboard.matr.init();
                for (let i = 0; i < rows; i++) {
                    result.push([]);
                    for (let j = 0; j < cols; j++) {
                        result[i].push(Chalkboard.numb.random(inf, sup));
                    }
                }
                return result;
            }
        };

        /**
         * Calculates the rank of a matrix.
         * @param {ChalkboardMatrix} matr - The matrix
         * @returns {number}
         * @example
         * const result = Chalkboard.matr.rank([[1, 2], [2, 4]]); // Returns 1
         */
        export const rank = (matr: ChalkboardMatrix): number => {
            if (!Array.isArray(matr) || matr.length > 0 && !Array.isArray(matr[0])) throw new Error(`Chalkboard.matr.rank: Parameter "matr" must be a matrix.`);
            return Chalkboard.matr.Gaussian(matr).filter((row: number[]) => row.some((element) => element !== 0)).length;
        };

        /**
         * Calculates the reciprocal of a matrix.
         * @param {ChalkboardMatrix} matr - The matrix
         * @returns {ChalkboardMatrix}
         * @example
         * const result = Chalkboard.matr.reciprocate([[1, 2], [4, 8]]); // Returns [[1, 0.5], [0.25, 0.125]]
         */
        export const reciprocate = (matr: ChalkboardMatrix): ChalkboardMatrix => {
            if (!Array.isArray(matr) || matr.length > 0 && !Array.isArray(matr[0])) throw new Error(`Chalkboard.matr.reciprocate: Parameter "matr" must be a matrix.`);
            if (Chalkboard.matr.isSizeOf(matr, 2)) {
                return Chalkboard.matr.init([1 / matr[0][0], 1 / matr[0][1]], [1 / matr[1][0], 1 / matr[1][1]]);
            } else if (Chalkboard.matr.isSizeOf(matr, 3)) {
                return Chalkboard.matr.init([1 / matr[0][0], 1 / matr[0][1], 1 / matr[0][2]], [1 / matr[1][0], 1 / matr[1][1], 1 / matr[1][2]], [1 / matr[2][0], 1 / matr[2][1], 1 / matr[2][2]]);
            } else if (Chalkboard.matr.isSizeOf(matr, 4)) {
                return Chalkboard.matr.init([1 / matr[0][0], 1 / matr[0][1], 1 / matr[0][2], 1 / matr[0][3]], [1 / matr[1][0], 1 / matr[1][1], 1 / matr[1][2], 1 / matr[1][3]], [1 / matr[2][0], 1 / matr[2][1], 1 / matr[2][2], 1 / matr[2][3]], [1 / matr[3][0], 1 / matr[3][1], 1 / matr[3][2], 1 / matr[3][3]]);
            } else {
                const result = Chalkboard.matr.init();
                for (let i = 0; i < Chalkboard.matr.rows(matr); i++) {
                    result[i] = [];
                    for (let j = 0; j < Chalkboard.matr.cols(matr); j++) {
                        result[i][j] = 1 / matr[i][j];
                    }
                }
                return result;
            }
        };

        /**
         * Returns a matrix with the number of rows and columns changed.
         * @param {ChalkboardMatrix} matr - The matrix
         * @param {number} rows - The number of rows to change to or (if the cols parameter is blank) the number of rows or columns (the size) to change to
         * @param {nmber} [cols=rows] - The number of columns to change to
         * @returns {ChalkboardMatrix}
         * @example
         * const result = Chalkboard.matr.resize([[1, 2], [3, 4]], 1, 4); // Returns [[1, 2, 3, 4]]
         */
        export const resize = (matr: ChalkboardMatrix, rows: number, cols: number = rows): ChalkboardMatrix => {
            if (!Array.isArray(matr) || matr.length > 0 && !Array.isArray(matr[0])) throw new Error(`Chalkboard.matr.resize: Parameter "matr" must be a matrix.`);
            if (!Number.isInteger(rows) || rows < 0) throw new Error(`Chalkboard.matr.resize: Parameter "rows" must be a non-negative integer.`);
            if (!Number.isInteger(cols) || cols < 0) throw new Error(`Chalkboard.matr.resize: Parameter "cols" must be a non-negative integer.`);
            const result = Chalkboard.matr.init();
            const matrrows = Chalkboard.matr.rows(matr);
            const matrcols = Chalkboard.matr.cols(matr);
            for (let i = 0; i < rows; i++) {
                result.push([]);
                for (let j = 0; j < cols; j++) {
                    result[i].push(i < matrrows && j < matrcols ? matr[i][j] : 0);
                }
            }
            return result;
        };

        /**
         * Initializes a rotation matrix.
         * @param {number} radx - The xy-rotation in radians (for 2D) or the x-rotation in radians (for 3D)
         * @param {number} [rady] - The y-rotation in radians (for 3D)
         * @param {number} [radz] - The z-rotation in radians (for 3D)
         * @returns {ChalkboardMatrix}
         * @example
         * const result = Chalkboard.matr.rotator(Chalkboard.PI(1 / 2)); // Returns a quarter-turn rotation matrix
         */
        export const rotator = (radx: number, rady?: number, radz?: number): ChalkboardMatrix => {
            if (!Number.isFinite(radx)) throw new Error(`Chalkboard.matr.rotator: Parameter "radx" must be a finite number.`);
            if (rady !== undefined && (!Number.isFinite(rady))) throw new Error(`Chalkboard.matr.rotator: Parameter "rady" must be a finite number.`);
            if (radz !== undefined && (!Number.isFinite(radz))) throw new Error(`Chalkboard.matr.rotator: Parameter "radz" must be a finite number.`);
            if (rady === undefined && radz === undefined) {
                return Chalkboard.matr.init([Math.cos(radx), -Math.sin(radx)], [Math.sin(radx), Math.cos(radx)]);
            } else {
                const matrx = Chalkboard.matr.init([1, 0, 0], [0, Math.cos(radx), -Math.sin(radx)], [0, Math.sin(radx), Math.cos(radx)]),
                    matry = Chalkboard.matr.init([Math.cos(rady!), 0, Math.sin(rady!)], [0, 1, 0], [-Math.sin(rady!), 0, Math.cos(rady!)]),
                    matrz = Chalkboard.matr.init([Math.cos(radz!), -Math.sin(radz!), 0], [Math.sin(radz!), Math.cos(radz!), 0], [0, 0, 1]);
                return Chalkboard.matr.mul(Chalkboard.matr.mul(matrz, matry), matrx);
            }
        };

        /**
         * Calculates the rounding of a matrix.
         * @param {ChalkboardMatrix} matr - The matrix
         * @returns {ChalkboardMatrix}
         * @example
         * const result = Chalkboard.matr.round([[1.2, 2.7], [-3.5, 4.4]]); // Returns [[1, 3], [-3, 4]]
         */
        export const round = (matr: ChalkboardMatrix): ChalkboardMatrix => {
            if (!Array.isArray(matr) || matr.length > 0 && !Array.isArray(matr[0])) throw new Error(`Chalkboard.matr.round: Parameter "matr" must be a matrix.`);
            if (Chalkboard.matr.isSizeOf(matr, 2)) {
                return Chalkboard.matr.init([Math.round(matr[0][0]), Math.round(matr[0][1])], [Math.round(matr[1][0]), Math.round(matr[1][1])]);
            } else if (Chalkboard.matr.isSizeOf(matr, 3)) {
                return Chalkboard.matr.init([Math.round(matr[0][0]), Math.round(matr[0][1]), Math.round(matr[0][2])], [Math.round(matr[1][0]), Math.round(matr[1][1]), Math.round(matr[1][2])], [Math.round(matr[2][0]), Math.round(matr[2][1]), Math.round(matr[2][2])]);
            } else if (Chalkboard.matr.isSizeOf(matr, 4)) {
                return Chalkboard.matr.init([Math.round(matr[0][0]), Math.round(matr[0][1]), Math.round(matr[0][2]), Math.round(matr[0][3])], [Math.round(matr[1][0]), Math.round(matr[1][1]), Math.round(matr[1][2]), Math.round(matr[1][3])], [Math.round(matr[2][0]), Math.round(matr[2][1]), Math.round(matr[2][2]), Math.round(matr[2][3])], [Math.round(matr[3][0]), Math.round(matr[3][1]), Math.round(matr[3][2]), Math.round(matr[3][3])]);
            } else {
                const result = Chalkboard.matr.init();
                for (let i = 0; i < Chalkboard.matr.rows(matr); i++) {
                    result[i] = [];
                    for (let j = 0; j < Chalkboard.matr.cols(matr); j++) {
                        result[i][j] = Math.round(matr[i][j]);
                    }
                }
                return result;
            }
        };

        /**
         * Returns the number of rows in a matrix.
         * @param {ChalkboardMatrix} matr - The matrix
         * @returns {number}
         * @example
         * const result = Chalkboard.matr.rows([[1, 2, 3], [4, 5, 6]]); // Returns 2
         */
        export const rows = (matr: ChalkboardMatrix): number => {
            if (!Array.isArray(matr) || matr.length > 0 && !Array.isArray(matr[0])) throw new Error(`Chalkboard.matr.rows: Parameter "matr" must be a matrix.`);
            return matr.length;
        };

        /**
         * Calculates the row space of a matrix.
         * @param {ChalkboardMatrix} matr - The matrix
         * @returns {ChalkboardMatrix}
         * @example
         * const result = Chalkboard.matr.rowspace([[1, 2], [2, 4], [0, 1]]); // Returns a basis for the row space
         */
        export const rowspace = (matr: ChalkboardMatrix): ChalkboardMatrix => {
            if (!Array.isArray(matr) || matr.length > 0 && !Array.isArray(matr[0])) throw new Error(`Chalkboard.matr.rowspace: Parameter "matr" must be a matrix.`);
            return Chalkboard.matr.Gaussian(matr).filter((row: number[]) => row.some((element: number) => element !== 0));
        };

        /**
         * Initializes a scaling matrix.
         * @param {ChalkboardVector} vect - The coordinates to use represented as a vector
         * @returns {ChalkboardMatrix}
         * @example
         * const result = Chalkboard.matr.scaler(Chalkboard.vect.init(2, 3)); // Returns a two-dimensional scaling matrix
         */
        export const scaler = (vect: ChalkboardVector): ChalkboardMatrix => {
            vect = $(vect, "Chalkboard.matr.scaler") as { x: number, y: number, z?: number, w?: number };
            if (typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "undefined" && typeof vect.w === "undefined") {
                return Chalkboard.matr.init([vect.x, 0], [0, vect.y]);
            } else if (typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "undefined") {
                return Chalkboard.matr.init([vect.x, 0, 0], [0, vect.y, 0], [0, 0, vect.z]);
            } else if (typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "number") {
                return Chalkboard.matr.init([vect.x, 0, 0, 0], [0, vect.y, 0, 0], [0, 0, vect.z, 0], [0, 0, 0, vect.w]);
            } else {
                throw new Error(`Chalkboard.matr.scaler: Parameter "vect" must be of type ChalkboardVector with 2, 3, or 4 dimensions.`);
            }
        };

        /**
         * Calculates the scalar multiplication of a matrix.
         * @param {ChalkboardMatrix} matr - The matrix
         * @param {number} num - The number
         * @returns {ChalkboardMatrix}
         * @example
         * const result = Chalkboard.matr.scl([[1, 2], [3, 4]], 2); // Returns [[2, 4], [6, 8]]
         */
        export const scl = (matr: ChalkboardMatrix, num: number): ChalkboardMatrix => {
            if (!Array.isArray(matr) || matr.length > 0 && !Array.isArray(matr[0])) throw new Error(`Chalkboard.matr.scl: Parameter "matr" must be a matrix.`);
            if (!Number.isFinite(num)) throw new Error(`Chalkboard.matr.scl: Parameter "num" must be a finite number.`);
            if (Chalkboard.matr.isSizeOf(matr, 2, 1)) {
                return Chalkboard.matr.init([matr[0][0] * num], [matr[1][0] * num]);
            } else if (Chalkboard.matr.isSizeOf(matr, 2)) {
                return Chalkboard.matr.init([matr[0][0] * num, matr[0][1] * num], [matr[1][0] * num, matr[1][1] * num]);
            } else if (Chalkboard.matr.isSizeOf(matr, 3, 1)) {
                return Chalkboard.matr.init([matr[0][0] * num], [matr[1][0] * num], [matr[2][0] * num]);
            } else if (Chalkboard.matr.isSizeOf(matr, 3)) {
                return Chalkboard.matr.init([matr[0][0] * num, matr[0][1] * num, matr[0][2] * num], [matr[1][0] * num, matr[1][1] * num, matr[1][2] * num], [matr[2][0] * num, matr[2][1] * num, matr[2][2] * num]);
            } else if (Chalkboard.matr.isSizeOf(matr, 4, 1)) {
                return Chalkboard.matr.init([matr[0][0] * num], [matr[1][0] * num], [matr[2][0] * num], [matr[3][0] * num]);
            } else if (Chalkboard.matr.isSizeOf(matr, 4)) {
                return Chalkboard.matr.init([matr[0][0] * num, matr[0][1] * num, matr[0][2] * num, matr[0][3] * num], [matr[1][0] * num, matr[1][1] * num, matr[1][2] * num, matr[1][3] * num], [matr[2][0] * num, matr[2][1] * num, matr[2][2] * num, matr[2][3] * num], [matr[3][0] * num, matr[3][1] * num, matr[3][2] * num, matr[3][3] * num]);
            } else {
                const result = Chalkboard.matr.init();
                for (let i = 0; i < Chalkboard.matr.rows(matr); i++) {
                    result[i] = [];
                    for (let j = 0; j < Chalkboard.matr.cols(matr); j++) {
                        result[i][j] = matr[i][j] * num;
                    }
                }
                return result;
            }
        };

        /**
         * Calculates the solution to a system of linear equations defined by a coefficients matrix and a constants matrix.
         * @param {ChalkboardMatrix} matrA - The coefficients matrix
         * @param {ChalkboardMatrix} matrB - The constants matrix
         * @returns {ChalkboardMatrix}
         * @example
         * const result = Chalkboard.matr.solve([[2, 1], [1, -1]], [[5], [1]]); // Solves the linear system
         */
        export const solve = (matrA: ChalkboardMatrix, matrB: ChalkboardMatrix): ChalkboardMatrix => {
            if (Chalkboard.matr.isSquare(matrA)) {
                if (Chalkboard.matr.rows(matrA) === Chalkboard.matr.rows(matrB)) {
                    if (Chalkboard.matr.det(matrA) !== 0) {
                        return Chalkboard.matr.mul(Chalkboard.matr.invert(matrA), matrB);
                    } else {
                        throw new Error(`Chalkboard.matr.solve: Parameter "matrA" must be of type ChalkboardMatrix that has a non-zero determinant.`);
                    }
                } else {
                    throw new Error(`Chalkboard.matr.solve: Parameters "matrA" and "matrB" must be of type ChalkboardMatrix with equivalent numbers of rows.`);
                }
            } else {
                throw new Error(`Chalkboard.matr.solve: Parameter "matrA" must be of type ChalkboardMatrix that is square.`);
            }
        };

        /**
         * Calculates the subtraction of two matrices.
         * @param {ChalkboardMatrix} matr1 - The first matrix
         * @param {ChalkboardMatrix} matr2 - The second matrix
         * @returns {ChalkboardMatrix}
         * @example
         * const result = Chalkboard.matr.sub([[5, 8], [13, 21]], [[2, 3], [5, 8]]); // Returns [[3, 5], [8, 13]]
         */
        export const sub = (matr1: ChalkboardMatrix, matr2: ChalkboardMatrix): ChalkboardMatrix => {
            if (Chalkboard.matr.isSizeEqual(matr1, matr2)) {
                if (Chalkboard.matr.isSizeOf(matr1, 2)) {
                    return Chalkboard.matr.init(
                        [matr1[0][0] - matr2[0][0], matr1[0][1] - matr2[0][1]],
                        [matr1[1][0] - matr2[1][0], matr1[1][1] - matr2[1][1]]
                    );
                } else if (Chalkboard.matr.isSizeOf(matr1, 3)) {
                    return Chalkboard.matr.init(
                        [matr1[0][0] - matr2[0][0], matr1[0][1] - matr2[0][1], matr1[0][2] - matr2[0][2]],
                        [matr1[1][0] - matr2[1][0], matr1[1][1] - matr2[1][1], matr1[1][2] - matr2[1][2]],
                        [matr1[2][0] - matr2[2][0], matr1[2][1] - matr2[2][1], matr1[2][2] - matr2[2][2]]
                    );
                } else if (Chalkboard.matr.isSizeOf(matr1, 4)) {
                    return Chalkboard.matr.init(
                        [matr1[0][0] - matr2[0][0], matr1[0][1] - matr2[0][1], matr1[0][2] - matr2[0][2], matr1[0][3] - matr2[0][3]],
                        [matr1[1][0] - matr2[1][0], matr1[1][1] - matr2[1][1], matr1[1][2] - matr2[1][2], matr1[1][3] - matr2[1][3]],
                        [matr1[2][0] - matr2[2][0], matr1[2][1] - matr2[2][1], matr1[2][2] - matr2[2][2], matr1[2][3] - matr2[2][3]],
                        [matr1[3][0] - matr2[3][0], matr1[3][1] - matr2[3][1], matr1[3][2] - matr2[3][2], matr1[3][3] - matr2[3][3]]
                    );
                } else {
                    const result = Chalkboard.matr.init();
                    for (let i = 0; i < Chalkboard.matr.rows(matr1); i++) {
                        result[i] = [];
                        for (let j = 0; j < Chalkboard.matr.cols(matr1); j++) {
                            result[i][j] = matr1[i][j] - matr2[i][j];
                        }
                    }
                    return result;
                }
            } else {
                throw new Error(`Chalkboard.matr.sub: Parameters "matr1" and "matr2" must be of type ChalkboardMatrix with equivalent numbers of rows and columns.`);
            }
        };

        /**
         * Initializes a symmetric binomial matrix.
         * @param {number} size - The number of rows or columns of the matrix
         * @returns {ChalkboardMatrix}
         * @example
         * const result = Chalkboard.matr.symmetricBinomial(4); // Returns a symmetric Pascal matrix
         */
        export const symmetricBinomial = (size: number): ChalkboardMatrix => {
            if (!Number.isInteger(size) || size < 1) throw new Error(`Chalkboard.matr.symmetricBinomial: Parameter "size" must be a positive integer.`);
            if (size === 2) {
                return Chalkboard.matr.init([1, 1], [1, 2]);
            } else if (size === 3) {
                return Chalkboard.matr.init([1, 1, 1], [1, 2, 3], [1, 3, 6]);
            } else if (size === 4) {
                return Chalkboard.matr.init([1, 1, 1, 1], [1, 2, 3, 4], [1, 3, 6, 10], [1, 4, 10, 20]);
            } else {
                return Chalkboard.matr.mul(Chalkboard.matr.lowerBinomial(size), Chalkboard.matr.upperBinomial(size));
            }
        };

        /**
         * Converts a matrix to an array.
         * @param {ChalkboardMatrix} matr - The matrix
         * @returns {number[]}
         * @example
         * const result = Chalkboard.matr.toArray([[1, 2], [3, 4]]); // Returns [1, 2, 3, 4]
         */
        export const toArray = (matr: ChalkboardMatrix): number[] => {
            if (!Array.isArray(matr) || matr.length > 0 && !Array.isArray(matr[0])) throw new Error(`Chalkboard.matr.toArray: Parameter "matr" must be a matrix.`);
            if (Chalkboard.matr.isSizeOf(matr, 2)) {
                return [matr[0][0], matr[0][1], matr[1][0], matr[1][1]];
            } else if (Chalkboard.matr.isSizeOf(matr, 3)) {
                return [matr[0][0], matr[0][1], matr[0][2], matr[1][0], matr[1][1], matr[1][2], matr[2][0], matr[2][1], matr[2][2]];
            } else if (Chalkboard.matr.isSizeOf(matr, 4)) {
                return [matr[0][0], matr[0][1], matr[0][2], matr[0][3], matr[1][0], matr[1][1], matr[1][2], matr[1][3], matr[2][0], matr[2][1], matr[2][2], matr[2][3], matr[3][0], matr[3][1], matr[3][2], matr[3][3]];
            } else {
                const result = [];
                for (let i = 0; i < Chalkboard.matr.rows(matr); i++) {
                    for (let j = 0; j < Chalkboard.matr.cols(matr); j++) {
                        result.push(matr[i][j]);
                    }
                }
                return result;
            }
        };

        /**
         * Converts a matrix to an object.
         * @param {ChalkboardMatrix} matr - The matrix
         * @returns {object}
         * @example
         * const result = Chalkboard.matr.toObject([[1, 2], [3, 4]]); // Returns an indexed object
         */
        export const toObject = (matr: ChalkboardMatrix): object => {
            if (!Array.isArray(matr) || matr.length > 0 && !Array.isArray(matr[0])) throw new Error(`Chalkboard.matr.toObject: Parameter "matr" must be a matrix.`);
            if (Chalkboard.matr.isSizeOf(matr, 2)) {
                return {
                    i1: { j1: matr[0][0], j2: matr[0][1] },
                    i2: { j1: matr[1][0], j2: matr[1][1] }
                };
            } else if (Chalkboard.matr.isSizeOf(matr, 3)) {
                return {
                    i1: { j1: matr[0][0], j2: matr[0][1], j3: matr[0][2] },
                    i2: { j1: matr[1][0], j2: matr[1][1], j3: matr[1][2] },
                    i3: { j1: matr[2][0], j2: matr[2][1], j3: matr[2][2] }
                };
            } else if (Chalkboard.matr.isSizeOf(matr, 4)) {
                return {
                    i1: { j1: matr[0][0], j2: matr[0][1], j3: matr[0][2], j4: matr[0][3] },
                    i2: { j1: matr[1][0], j2: matr[1][1], j3: matr[1][2], j4: matr[1][3] },
                    i3: { j1: matr[2][0], j2: matr[2][1], j3: matr[2][2], j4: matr[2][3] },
                    i4: { j1: matr[3][0], j2: matr[3][1], j3: matr[3][2], j4: matr[3][3] }
                };
            } else {
                const result: { [key: string]: { [key: string]: number } } = {};
                for (let i = 0; i < Chalkboard.matr.rows(matr); i++) {
                    result["i" + (i + 1)] = {};
                    for (let j = 0; j < Chalkboard.matr.cols(matr); j++) {
                        result["i" + (i + 1)]["j" + (j + 1)] = matr[i][j];
                    }
                }
                return result;
            }
        };

        /**
         * Converts a matrix to a set.
         * @param {ChalkboardMatrix} matr - The matrix
         * @returns {ChalkboardSet<number>}
         * @example
         * const result = Chalkboard.matr.toSet([[1, 1], [2, 3]]); // Returns the set {1, 2, 3}
         */
        export const toSet = (matr: ChalkboardMatrix): ChalkboardSet<number> => {
            if (!Array.isArray(matr) || matr.length > 0 && !Array.isArray(matr[0])) throw new Error(`Chalkboard.matr.toSet: Parameter "matr" must be a matrix.`);
            return Chalkboard.abal.set(Chalkboard.matr.toArray(matr));
        };

        /**
         * Converts a matrix to a string.
         * @param {ChalkboardMatrix} matr - The matrix
         * @returns {string}
         * @example
         * const result = Chalkboard.matr.toString([[1, 2], [3, 4]]); // Returns a matrix string
         */
        export const toString = (matr: ChalkboardMatrix): string => {
            if (!Array.isArray(matr) || matr.length > 0 && !Array.isArray(matr[0])) throw new Error(`Chalkboard.matr.toString: Parameter "matr" must be a matrix.`);
            if (Chalkboard.matr.isSizeOf(matr, 2)) {
                return (
                    "[ " + matr[0][0].toString() + " " + matr[0][1].toString() +
                    " ]\n[ " + matr[1][0].toString() + " " + matr[1][1].toString() + " ]"
                );
            } else if (Chalkboard.matr.isSizeOf(matr, 3)) {
                return (
                    "[ " + matr[0][0].toString() + " " + matr[0][1].toString() + " " + matr[0][2].toString() +
                    " ]\n[ " + matr[1][0].toString() + " " + matr[1][1].toString() + " " + matr[1][2].toString() +
                    " ]\n[ " + matr[2][0].toString() + " " + matr[2][1].toString() + " " + matr[2][2].toString() + " ]"
                );
            } else if (Chalkboard.matr.isSizeOf(matr, 4)) {
                return (
                    "[ " + matr[0][0].toString() + " " + matr[0][1].toString() + " " + matr[0][2].toString() + " " + matr[0][3].toString() +
                    " ]\n[ " + matr[1][0].toString() + " " + matr[1][1].toString() + " " + matr[1][2].toString() + " " + matr[1][3].toString() +
                    " ]\n[ " + matr[2][0].toString() + " " + matr[2][1].toString() + " " + matr[2][2].toString() + " " + matr[2][3].toString() +
                    " ]\n[ " + matr[3][0].toString() + " " + matr[3][1].toString() + " " + matr[3][2].toString() + " " + matr[3][3].toString() + " ]"
                );
            } else {
                let result = "";
                for (let i = 0; i < Chalkboard.matr.rows(matr); i++) {
                    result += "[ ";
                    for (let j = 0; j < Chalkboard.matr.cols(matr); j++) {
                        result += matr[i][j].toString() + " ";
                    }
                    result = result.trimEnd() + " ]\n";
                }
                return result;
            }
        };

        /**
         * Converts a matrix to a tensor.
         * @param {ChalkboardMatrix} matr - The matrix
         * @param {number[]} size - The number of rows, columns, tubes, etc. of the tensor represented as a single array or a sequence of arguments
         * @returns {ChalkboardTensor}
         * @example
         * const result = Chalkboard.matr.toTensor([[1, 2], [3, 4]], 2, 2); // Returns an equivalent rank-2 tensor
         */
        export const toTensor = (matr: ChalkboardMatrix, ...size: number[]): ChalkboardTensor => {
            if (!Array.isArray(matr) || matr.length > 0 && !Array.isArray(matr[0])) throw new Error(`Chalkboard.matr.toTensor: Parameter "matr" must be a matrix.`);
            size = Array.isArray(size[0]) ? size[0] : size;
            if (size.length > 0 && (!Number.isInteger(size[0]) || size[0] < 0) || size.length > 1 && (!Number.isInteger(size[size.length - 1]) || size[size.length - 1] < 0)) throw new Error(`Chalkboard.matr.toTensor: Parameter "size" must begin and end with non-negative integers.`);
            return Chalkboard.tens.resize(matr, ...size);
        };

        /**
         * Converts a matrix to a typed array.
         * @param {ChalkboardMatrix} matr - The matrix
         * @param {"int8" | "int16" | "int32" | "float32" | "float64" | "bigint64"} [type="float32"] - The type of the typed array, which can be "int8", "int16", "int32", "float32", "float64", or "bigint64" (optional, defaults to "float32")
         * @returns {Int8Array | Int16Array | Int32Array | Float32Array | Float64Array | BigInt64Array}
         * @example
         * const result = Chalkboard.matr.toTypedArray([[1, 2], [3, 4]], "float64"); // Returns a Float64Array
         */
        export const toTypedArray = (matr: ChalkboardMatrix, type: "int8" | "int16" | "int32" | "float32" | "float64" | "bigint64" = "float32"): Int8Array | Int16Array | Int32Array | Float32Array | Float64Array | BigInt64Array => {
            const arr = Chalkboard.matr.toArray(matr);
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
            throw new Error(`Chalkboard.matr.toTypedArray: Parameter "type" must be int8, int16, int32, float32, float64, or bigint64.`);
        };

        /**
         * Converts a matrix to a vector.
         * @param {ChalkboardMatrix} matr - The matrix
         * @param {number} dimension - The dimension of the vector which can be either 2, 3, or 4
         * @param {number} index - The index of the row or column of the matrix which is the first component of the converted vector
         * @param {number} [axis=0] - The axis of the matrix to convert, which is 0 for the rows or 1 for the columns
         * @returns {ChalkboardVector}
         * @example
         * const result = Chalkboard.matr.toVector([[3, 4], [5, 12]], 2, 1, 0); // Returns the second row as a vector
         */
        export const toVector = (matr: ChalkboardMatrix, dimension: 2 | 3 | 4, index: number = 0, axis: 0 | 1 = 0): ChalkboardVector => {
            if (!Array.isArray(matr) || matr.length > 0 && !Array.isArray(matr[0])) throw new Error(`Chalkboard.matr.toVector: Parameter "matr" must be a matrix.`);
            if (dimension !== 2 && dimension !== 3 && dimension !== 4) throw new Error(`Chalkboard.matr.toVector: Parameter "dimension" must be 2, 3, or 4.`);
            if (axis !== 0 && axis !== 1) throw new Error(`Chalkboard.matr.toVector: Parameter "axis" must be 0 or 1.`);
            if (!Number.isInteger(index) || index < 0 || axis === 0 && (index >= Chalkboard.matr.cols(matr) || dimension > Chalkboard.matr.rows(matr)) || axis === 1 && (index >= Chalkboard.matr.rows(matr) || dimension > Chalkboard.matr.cols(matr))) throw new Error(`Chalkboard.matr.toVector: Parameter "index" and parameter "dimension" must fit within the selected matrix axis.`);
            if (dimension === 2) {
                if (axis === 0) {
                    return Chalkboard.vect.init(matr[0][index], matr[1][index]);
                } else if (axis === 1) {
                    return Chalkboard.vect.init(matr[index][0], matr[index][1]);
                } else {
                    throw new Error(`Chalkboard.matr.toVector: Parameter "axis" must be 0 or 1.`);
                }
            } else if (dimension === 3) {
                if (axis === 0) {
                    return Chalkboard.vect.init(matr[0][index], matr[1][index], matr[2][index]);
                } else if (axis === 1) {
                    return Chalkboard.vect.init(matr[index][0], matr[index][1], matr[index][2]);
                } else {
                    throw new Error(`Chalkboard.matr.toVector: Parameter "axis" must be 0 or 1.`);
                }
            } else if (dimension === 4) {
                if (axis === 0) {
                    return Chalkboard.vect.init(matr[0][index], matr[1][index], matr[2][index], matr[3][index]);
                } else if (axis === 1) {
                    return Chalkboard.vect.init(matr[index][0], matr[index][1], matr[index][2], matr[index][3]);
                } else {
                    throw new Error(`Chalkboard.matr.toVector: Parameter "axis" must be 0 or 1.`);
                }
            } else {
                throw new Error(`Chalkboard.matr.toVector: Parameter "dimension" must be 2, 3, or 4.`);
            }
        };

        /**
         * Calculates the trace of a matrix.
         * @param {ChalkboardMatrix} matr - The matrix
         * @returns {number}
         * @example
         * const result = Chalkboard.matr.trace([[2, 1], [3, 5]]); // Returns 7
         */
        export const trace = (matr: ChalkboardMatrix): number => {
            if (Chalkboard.matr.isSquare(matr)) {
                if (Chalkboard.matr.rows(matr) === 2) {
                    return matr[0][0] + matr[1][1];
                } else if (Chalkboard.matr.rows(matr) === 3) {
                    return matr[0][0] + matr[1][1] + matr[2][2];
                } else if (Chalkboard.matr.rows(matr) === 4) {
                    return matr[0][0] + matr[1][1] + matr[2][2] + matr[3][3];
                } else {
                    let result = 0;
                    for (let i = 0; i < Chalkboard.matr.rows(matr); i++) {
                        result += matr[i][i];
                    }
                    return result;
                }
            } else {
                throw new Error(`Chalkboard.matr.trace: Parameter "matr" must be of type ChalkboardMatrix that is square.`);
            }
        };

        /**
         * Calculates the transpose of a matrix.
         * @param {ChalkboardMatrix} matr - The matrix
         * @returns {ChalkboardMatrix}
         * @example
         * const result = Chalkboard.matr.transpose([[1, 2, 3], [4, 5, 6]]); // Returns [[1, 4], [2, 5], [3, 6]]
         */
        export const transpose = (matr: ChalkboardMatrix): ChalkboardMatrix => {
            if (!Array.isArray(matr) || matr.length > 0 && !Array.isArray(matr[0])) throw new Error(`Chalkboard.matr.transpose: Parameter "matr" must be a matrix.`);
            if (Chalkboard.matr.isSizeOf(matr, 2)) {
                return Chalkboard.matr.init([matr[0][0], matr[1][0]], [matr[0][1], matr[1][1]]);
            } else if (Chalkboard.matr.isSizeOf(matr, 3)) {
                return Chalkboard.matr.init([matr[0][0], matr[1][0], matr[2][0]], [matr[0][1], matr[1][1], matr[2][1]], [matr[0][2], matr[1][2], matr[2][2]]);
            } else if (Chalkboard.matr.isSizeOf(matr, 4)) {
                return Chalkboard.matr.init([matr[0][0], matr[1][0], matr[2][0], matr[3][0]], [matr[0][1], matr[1][1], matr[2][1], matr[3][1]], [matr[0][2], matr[1][2], matr[2][2], matr[3][2]], [matr[0][3], matr[1][3], matr[2][3], matr[3][3]]);
            } else {
                const result = Chalkboard.matr.init();
                for (let i = 0; i < Chalkboard.matr.cols(matr); i++) {
                    result[i] = [];
                    for (let j = 0; j < Chalkboard.matr.rows(matr); j++) {
                        result[i][j] = matr[j][i];
                    }
                }
                return result;
            }
        };

        /**
         * Initializes a translation matrix.
         * @param {ChalkboardVector} vect - The coordinates to use represented as a vector
         * @returns {ChalkboardMatrix}
         * @example
         * const result = Chalkboard.matr.translator(Chalkboard.vect.init(3, -2)); // Returns a two-dimensional translation matrix
         */
        export const translator = (vect: ChalkboardVector): ChalkboardMatrix => {
            vect = $(vect, "Chalkboard.matr.translator") as { x: number, y: number, z?: number, w?: number };
            if (typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "undefined" && typeof vect.w === "undefined") {
                return Chalkboard.matr.init([1, 0, vect.x], [0, 1, vect.y], [0, 0, 1]);
            } else if (typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "undefined") {
                return Chalkboard.matr.init([1, 0, 0, vect.x], [0, 1, 0, vect.y], [0, 0, 1, vect.z], [0, 0, 0, 1]);
            } else if (typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "number") {
                return Chalkboard.matr.init([1, 0, 0, 0, vect.x], [0, 1, 0, 0, vect.y], [0, 0, 1, 0, vect.z], [0, 0, 0, 1, vect.w], [0, 0, 0, 0, 1]);
            } else {
                throw new Error(`Chalkboard.matr.translator: Parameter "vect" must be of type ChalkboardVector with 2, 3, or 4 dimensions.`);
            }
        };

        /**
         * Initializes an upper binomial matrix.
         * @param {number} size - The number of rows or columns of the matrix
         * @returns {ChalkboardMatrix}
         * @example
         * const result = Chalkboard.matr.upperBinomial(4); // Returns an upper-triangular Pascal matrix
         */
        export const upperBinomial = (size: number): ChalkboardMatrix => {
            if (!Number.isInteger(size) || size < 1) throw new Error(`Chalkboard.matr.upperBinomial: Parameter "size" must be a positive integer.`);
            if (size === 2) {
                return Chalkboard.matr.init([1, 1], [0, 1]);
            } else if (size === 3) {
                return Chalkboard.matr.init([1, 2, 1], [0, 1, 1], [0, 0, 1]);
            } else if (size === 4) {
                return Chalkboard.matr.init([1, 3, 3, 1], [0, 1, 2, 1], [0, 0, 1, 1], [0, 0, 0, 1]);
            } else {
                const result = Chalkboard.matr.init();
                for (let i = 0; i < size; i++) {
                    result.push([]);
                    for (let j = 0; j < size; j++) {
                        result[i].push(Chalkboard.numb.binomial(j, i));
                    }
                }
                return result;
            }
        };

        /**
         * Initializes an upper shift matrix.
         * @param {number} size - The number of rows or columns of the matrix
         * @returns {ChalkboardMatrix}
         * @example
         * const result = Chalkboard.matr.upperShift(4); // Returns the 4-by-4 upper shift matrix
         */
        export const upperShift = (size: number): ChalkboardMatrix => {
            if (!Number.isInteger(size) || size < 1) throw new Error(`Chalkboard.matr.upperShift: Parameter "size" must be a positive integer.`);
            if (size === 2) {
                return Chalkboard.matr.init([0, 1], [0, 0]);
            } else if (size === 3) {
                return Chalkboard.matr.init([0, 1, 0], [0, 0, 1], [0, 0, 0]);
            } else if (size === 4) {
                return Chalkboard.matr.init([0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1], [0, 0, 0, 0]);
            } else {
                const result = Chalkboard.matr.init();
                for (let i = 0; i < size; i++) {
                    result[i] = [];
                    for (let j = 0; j < size; j++) {
                        result[i][j] = Chalkboard.numb.Kronecker(i + 1, j);
                    }
                }
                return result;
            }
        };

        /**
         * Initializes an upper triangular matrix.
         * @param {number} size - The number of rows or columns
         * @param {number[]} elements - The elements on and above the main diagonal
         * @returns {ChalkboardMatrix}
         * @example
         * const result = Chalkboard.matr.upperTriangular(3, 1, 2, 3, 4, 5, 6); // Returns an upper-triangular matrix
         */
        export const upperTriangular = (size: number, ...elements: number[]): ChalkboardMatrix => {
            if (!Number.isInteger(size) || size < 1) throw new Error(`Chalkboard.matr.upperTriangular: Parameter "size" must be a positive integer.`);
            if (elements.length > 0 && !Number.isFinite(elements[0]) || elements.length > 1 && !Number.isFinite(elements[elements.length - 1])) throw new Error(`Chalkboard.matr.upperTriangular: Parameter "elements" must begin and end with finite numbers.`);
            if (size === 2) {
                return Chalkboard.matr.init([elements[0] || 0, elements[1] || 0], [0, elements[2] || 0]);
            } else if (size === 3) {
                return Chalkboard.matr.init([elements[0] || 0, elements[1] || 0, elements[2] || 0], [0, elements[3] || 0, elements[4] || 0], [0, 0, elements[5] || 0]);
            } else if (size === 4) {
                return Chalkboard.matr.init([elements[0] || 0, elements[1] || 0, elements[2] || 0, elements[3] || 0], [0, elements[4] || 0, elements[5] || 0, elements[6] || 0], [0, 0, elements[7] || 0, elements[8] || 0], [0, 0, 0, elements[9] || 0]);
            } else {
                elements = Array.isArray(elements[0]) ? elements[0] : elements;
                const result = Chalkboard.matr.init();
                let index = 0;
                for (let i = 0; i < size; i++) {
                    result[i] = [];
                    for (let j = 0; j < size; j++) {
                        result[i][j] = j >= i ? elements[index++] || 0 : 0;
                    }
                }
                return result;
            }
        };

        /**
         * Initializes a zero matrix.
         * @param {number} rows - The number of rows or (if the cols parameter is blank) the number of rows or columns (the size)
         * @param {number} [cols=rows] - The number of columns
         * @returns {ChalkboardMatrix}
         * @example
         * const result = Chalkboard.matr.zero(2, 3); // Returns a 2-by-3 zero matrix
         */
        export const zero = (rows: number, cols: number = rows): ChalkboardMatrix => {
            if (!Number.isInteger(rows) || rows < 0) throw new Error(`Chalkboard.matr.zero: Parameter "rows" must be a non-negative integer.`);
            if (!Number.isInteger(cols) || cols < 0) throw new Error(`Chalkboard.matr.zero: Parameter "cols" must be a non-negative integer.`);
            if (rows === 2 && cols === 2) {
                return Chalkboard.matr.init([0, 0], [0, 0]);
            } else if (rows === 3 && cols === 3) {
                return Chalkboard.matr.init([0, 0, 0], [0, 0, 0], [0, 0, 0]);
            } else if (rows === 4 && cols === 4) {
                return Chalkboard.matr.init([0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]);
            } else {
                const result = Chalkboard.matr.init();
                for (let i = 0; i < rows; i++) {
                    result[i] = [];
                    for (let j = 0; j < cols; j++) {
                        result[i][j] = 0;
                    }
                }
                return result;
            }
        };
    }
}
