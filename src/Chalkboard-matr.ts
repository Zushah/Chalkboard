/*
    The Chalkboard Library - Matrix Namespace
    Version 2.0.0 al-Khwarizmi
*/
/// <reference path="Chalkboard.ts"/>
namespace Chalkboard {
    /**
     * The matrix namespace.
     * @namespace
     */
    export namespace matr {
        /**
         * Calculates the absolute value of a matrix.
         * @param {ChalkboardMatrix} matr - The matrix
         * @returns {ChalkboardMatrix}
         */
        export const absolute = (matr: ChalkboardMatrix): ChalkboardMatrix => {
            if (Chalkboard.matr.rows(matr) === 2 && Chalkboard.matr.cols(matr) === 2) {
                return Chalkboard.matr.init([Math.abs(matr[0][0]), Math.abs(matr[0][1])],
                                            [Math.abs(matr[1][0]), Math.abs(matr[1][1])]);
            } else if (Chalkboard.matr.rows(matr) === 3 && Chalkboard.matr.cols(matr) === 3) {
                return Chalkboard.matr.init([Math.abs(matr[0][0]), Math.abs(matr[0][1]), Math.abs(matr[0][2])],
                                            [Math.abs(matr[1][0]), Math.abs(matr[1][1]), Math.abs(matr[1][2])],
                                            [Math.abs(matr[2][0]), Math.abs(matr[2][1]), Math.abs(matr[2][2])]);
            } else if (Chalkboard.matr.rows(matr) === 4 && Chalkboard.matr.cols(matr) === 4) {
                return Chalkboard.matr.init([Math.abs(matr[0][0]), Math.abs(matr[0][1]), Math.abs(matr[0][2]), Math.abs(matr[0][3])],
                                            [Math.abs(matr[1][0]), Math.abs(matr[1][1]), Math.abs(matr[1][2]), Math.abs(matr[1][3])],
                                            [Math.abs(matr[2][0]), Math.abs(matr[2][1]), Math.abs(matr[2][2]), Math.abs(matr[2][3])],
                                            [Math.abs(matr[3][0]), Math.abs(matr[3][1]), Math.abs(matr[3][2]), Math.abs(matr[3][3])]);
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
         */
        export const add = (matr1: ChalkboardMatrix, matr2: ChalkboardMatrix): ChalkboardMatrix => {
            if (Chalkboard.matr.rows(matr1) === Chalkboard.matr.rows(matr2) && Chalkboard.matr.cols(matr1) === Chalkboard.matr.cols(matr2)) {
                if (Chalkboard.matr.rows(matr1) === 2 && Chalkboard.matr.cols(matr1) === 2) {
                    return Chalkboard.matr.init([matr1[0][0] + matr2[0][0], matr1[0][1] + matr2[0][1]],
                                                [matr1[1][0] + matr2[1][0], matr1[1][1] + matr2[1][1]]);
                } else if (Chalkboard.matr.rows(matr1) === 3 && Chalkboard.matr.cols(matr1) === 3) {
                    return Chalkboard.matr.init([matr1[0][0] + matr2[0][0], matr1[0][1] + matr2[0][1], matr1[0][2] + matr2[0][2]],
                                                [matr1[1][0] + matr2[1][0], matr1[1][1] + matr2[1][1], matr1[1][2] + matr2[1][2]],
                                                [matr1[2][0] + matr2[2][0], matr1[2][1] + matr2[2][1], matr1[2][2] + matr2[2][2]]);
                } else if (Chalkboard.matr.rows(matr1) === 4 && Chalkboard.matr.cols(matr1) === 4) {
                    return Chalkboard.matr.init([matr1[0][0] + matr2[0][0], matr1[0][1] + matr2[0][1], matr1[0][2] + matr2[0][2], matr1[0][3] + matr2[0][3]],
                                                [matr1[1][0] + matr2[1][0], matr1[1][1] + matr2[1][1], matr1[1][2] + matr2[1][2], matr1[1][3] + matr2[1][3]],
                                                [matr1[2][0] + matr2[2][0], matr1[2][1] + matr2[2][1], matr1[2][2] + matr2[2][2], matr1[2][3] + matr2[2][3]],
                                                [matr1[3][0] + matr2[3][0], matr1[3][1] + matr2[3][1], matr1[3][2] + matr2[3][2], matr1[3][3] + matr2[3][3]]);
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
                throw new TypeError('Parameters "matr1" and "matr2" must be of type "ChalkboardMatrix" with equivalent numbers of rows and columns.');
            }
        };

        /**
         * Calculates the Kronecker addition of two matrices.
         * @param {ChalkboardMatrix} matr1 - The first matrix
         * @param {ChalkboardMatrix} matr2 - The second matrix
         * @returns {ChalkboardMatrix}
         */
        export const addKronecker = (matr1: ChalkboardMatrix, matr2: ChalkboardMatrix): ChalkboardMatrix => {
            if (Chalkboard.matr.rows(matr1) === Chalkboard.matr.cols(matr1) && Chalkboard.matr.rows(matr2) === Chalkboard.matr.cols(matr2)) {
                return Chalkboard.matr.add(
                    Chalkboard.matr.mulKronecker(matr1, Chalkboard.matr.identity(Chalkboard.matr.rows(matr1))),
                    Chalkboard.matr.mulKronecker(Chalkboard.matr.identity(Chalkboard.matr.rows(matr2)), matr2)
                );
            } else {
                throw new TypeError('Parameters "matr1" and "matr2" must be of type "ChalkboardMatrix" that are square.');
            }
        };

        /**
         * Calculates the adjugate matrix of a matrix at a row and column.
         * @param {ChalkboardMatrix} matr - The matrix
         * @param {number} row - The row
         * @param {number} col - The column
         * @returns {ChalkboardMatrix}
         */
        export const adjugate = (matr: ChalkboardMatrix, row: number, col: number): ChalkboardMatrix => {
            return Chalkboard.matr.transpose(Chalkboard.matr.cofactor(matr, row, col));
        };

        /**
         * Initializes a binomial matrix.
         * @param {number} size - The number of rows or columns of the matrix
         * @param {"lower" | "upper" | "symmetric"} [type="lower"] - The type of layout for the matrix, either "lower", "upper", or "symmetric"
         * @returns {ChalkboardMatrix}
         */
        export const binomial = (size: number, type: "lower" | "upper" | "symmetric" = "lower"): ChalkboardMatrix => {
            const result = Chalkboard.matr.init();
            for (let i = 0; i < size; i++) {
                result.push([]);
                for (let j = 0; j < size; j++) {
                    if (type === "lower") {
                        result[i].push(Chalkboard.numb.binomial(i, j));
                    } else if (type === "upper") {
                        result[i].push(Chalkboard.numb.binomial(j, i));
                    }
                }
            }
            if (type === "symmetric") {
                return Chalkboard.matr.mul(Chalkboard.matr.binomial(size, "lower"), Chalkboard.matr.binomial(size, "upper"));
            } else {
                return result;
            }
        };

        /**
         * Calculates the cofactor matrix of a matrix at a row and column.
         * @param {ChalkboardMatrix} matr - The matrix
         * @param {number} row - The row
         * @param {number} col - The column
         * @returns {ChalkboardMatrix}
         */
        export const cofactor = (matr: ChalkboardMatrix, row: number, col: number): ChalkboardMatrix => {
            return matr
                .slice(0, row - 1)
                .concat(matr.slice(row))
                .map(function (row) {
                    return row.slice(0, col - 1).concat(row.slice(col));
                });
        };

        /**
         * Returns the number of columns in a matrix.
         * @param {ChalkboardMatrix} matr - The matrix
         * @returns {number}
         */
        export const cols = (matr: ChalkboardMatrix): number => {
            return matr[0].length;
        };

        /**
         * Calculates the column space of a matrix.
         * @param {ChalkboardMatrix} matr - The matrix
         * @returns {ChalkboardMatrix}
         */
        export const colspace = (matr: ChalkboardMatrix): ChalkboardMatrix => {
            return Chalkboard.matr.transpose(Chalkboard.matr.rowspace(Chalkboard.matr.transpose(matr)));
        };

        /**
         * Calculates the concatentation of two matrices.
         * @param {ChalkboardMatrix} matr1 - The first matrix
         * @param {ChalkboardMatrix} matr2 - The second matrix
         * @param {"row" | "col"} [type="row"] - Set to concatenate either the rows with "row" or the columns with "col"
         * @returns {ChalkboardMatrix}
         */
        export const concat = (matr1: ChalkboardMatrix, matr2: ChalkboardMatrix, type: "row" | "col" = "row"): ChalkboardMatrix => {
            if (type === "row") {
                if (Chalkboard.matr.cols(matr1) === Chalkboard.matr.cols(matr2)) {
                    if (Chalkboard.matr.rows(matr1) === 2 && Chalkboard.matr.cols(matr1) === 2 && Chalkboard.matr.rows(matr2) === 2) {
                        return Chalkboard.matr.init([matr1[0][0], matr1[0][1]],
                                                    [matr1[1][0], matr1[1][1]],
                                                    [matr2[0][0], matr2[0][1]],
                                                    [matr2[1][0], matr2[1][1]]);
                    } else if (Chalkboard.matr.rows(matr1) === 3 && Chalkboard.matr.cols(matr1) === 3 && Chalkboard.matr.rows(matr2) === 3) {
                        return Chalkboard.matr.init([matr1[0][0], matr1[0][1], matr1[0][2]],
                                                    [matr1[1][0], matr1[1][1], matr1[1][2]],
                                                    [matr1[2][0], matr1[2][1], matr1[2][2]],
                                                    [matr2[0][0], matr2[0][1], matr2[0][2]],
                                                    [matr2[1][0], matr2[1][1], matr2[1][2]],
                                                    [matr2[2][0], matr2[2][1], matr2[2][2]]);
                    } else if (Chalkboard.matr.rows(matr1) === 4 && Chalkboard.matr.cols(matr1) === 4 && Chalkboard.matr.rows(matr2) === 4) {
                        return Chalkboard.matr.init([matr1[0][0], matr1[0][1], matr1[0][2], matr1[0][3]],
                                                    [matr1[1][0], matr1[1][1], matr1[1][2], matr1[1][3]],
                                                    [matr1[2][0], matr1[2][1], matr1[2][2], matr1[2][3]],
                                                    [matr1[3][0], matr1[3][1], matr1[3][2], matr1[3][3]],
                                                    [matr2[0][0], matr2[0][1], matr2[0][2], matr2[0][3]],
                                                    [matr2[1][0], matr2[1][1], matr2[1][2], matr2[1][3]],
                                                    [matr2[2][0], matr2[2][1], matr2[2][2], matr2[2][3]],
                                                    [matr2[3][0], matr2[3][1], matr2[3][2], matr2[3][3]]);
                    } else {
                        return Chalkboard.matr.init(matr1.concat(matr2));
                    }
                } else {
                    throw new TypeError('Parameters "matr1" and "matr2" must be of type "ChalkboardMatrix" with equivalent numbers of columns.');
                }
            } else if (type === "col") {
                if (Chalkboard.matr.rows(matr1) === Chalkboard.matr.rows(matr2)) {
                    if (Chalkboard.matr.rows(matr1) === 2 && Chalkboard.matr.cols(matr1) === 2 && Chalkboard.matr.cols(matr2) === 2) {
                        return Chalkboard.matr.init([matr1[0][0], matr1[0][1], matr2[0][0], matr2[0][1]],
                                                    [matr1[1][0], matr1[1][1], matr2[1][0], matr2[1][1]]);
                    } else if (Chalkboard.matr.rows(matr1) === 3 && Chalkboard.matr.cols(matr1) === 3 && Chalkboard.matr.cols(matr2) === 3) {
                        return Chalkboard.matr.init([matr1[0][0], matr1[0][1], matr1[0][2], matr2[0][0], matr2[0][1], matr2[0][2]],
                                                    [matr1[1][0], matr1[1][1], matr1[1][2], matr2[1][0], matr2[1][1], matr2[1][2]],
                                                    [matr1[2][0], matr1[2][1], matr1[2][2], matr2[2][0], matr2[2][1], matr2[2][2]]);
                    } else if (Chalkboard.matr.rows(matr1) === 4 && Chalkboard.matr.cols(matr1) === 4 && Chalkboard.matr.cols(matr2) === 4) {
                        return Chalkboard.matr.init([matr1[0][0], matr1[0][1], matr1[0][2], matr1[0][3], matr2[0][0], matr2[0][1], matr2[0][2], matr2[0][3]],
                                                    [matr1[1][0], matr1[1][1], matr1[1][2], matr1[1][3], matr2[1][0], matr2[1][1], matr2[1][2], matr2[1][3]],
                                                    [matr1[2][0], matr1[2][1], matr1[2][2], matr1[2][3], matr2[2][0], matr2[2][1], matr2[2][2], matr2[2][3]],
                                                    [matr1[3][0], matr1[3][1], matr1[3][2], matr1[3][3], matr2[3][0], matr2[3][1], matr2[3][2], matr2[3][3]]);
                    } else {
                        const result = Chalkboard.matr.init();
                        for (let i = 0; i < Chalkboard.matr.rows(matr1); i++) {
                            result.push(matr1[i].concat(matr2[i]));
                        }
                        return result;
                    }
                } else {
                    throw new TypeError('Parameters "matr1" and "matr2" must be of type "ChalkboardMatrix" with equivalent numbers of rows.');
                }
            } else {
                throw new TypeError('Parameter "type" must be "row" or "col".');
            }
        };

        /**
         * Calculates a matrix constrained within a range.
         * @param {ChalkboardMatrix} matr - The matrix
         * @param {number[]} [range=[0, 1]] - The range
         * @returns {ChalkboardMatrix}
         */
        export const constrain = (matr: ChalkboardMatrix, range: [number, number] = [0, 1]): ChalkboardMatrix => {
            if (Chalkboard.matr.rows(matr) === 2 && Chalkboard.matr.cols(matr) === 2) {
                return Chalkboard.matr.init([Chalkboard.numb.constrain(matr[0][0], range), Chalkboard.numb.constrain(matr[0][1], range)],
                                            [Chalkboard.numb.constrain(matr[1][0], range), Chalkboard.numb.constrain(matr[1][1], range)]);
            } else if (Chalkboard.matr.rows(matr) === 3 && Chalkboard.matr.cols(matr) === 3) {
                return Chalkboard.matr.init([Chalkboard.numb.constrain(matr[0][0], range), Chalkboard.numb.constrain(matr[0][1], range), Chalkboard.numb.constrain(matr[0][2], range)],
                                            [Chalkboard.numb.constrain(matr[1][0], range), Chalkboard.numb.constrain(matr[1][1], range), Chalkboard.numb.constrain(matr[1][2], range)],
                                            [Chalkboard.numb.constrain(matr[2][0], range), Chalkboard.numb.constrain(matr[2][1], range), Chalkboard.numb.constrain(matr[2][2], range)]);
            } else if (Chalkboard.matr.rows(matr) === 4 && Chalkboard.matr.cols(matr) === 4) {
                return Chalkboard.matr.init([Chalkboard.numb.constrain(matr[0][0], range), Chalkboard.numb.constrain(matr[0][1], range), Chalkboard.numb.constrain(matr[0][2], range), Chalkboard.numb.constrain(matr[0][3], range)],
                                            [Chalkboard.numb.constrain(matr[1][0], range), Chalkboard.numb.constrain(matr[1][1], range), Chalkboard.numb.constrain(matr[1][2], range), Chalkboard.numb.constrain(matr[1][3], range)],
                                            [Chalkboard.numb.constrain(matr[2][0], range), Chalkboard.numb.constrain(matr[2][1], range), Chalkboard.numb.constrain(matr[2][2], range), Chalkboard.numb.constrain(matr[2][3], range)],
                                            [Chalkboard.numb.constrain(matr[3][0], range), Chalkboard.numb.constrain(matr[3][1], range), Chalkboard.numb.constrain(matr[3][2], range), Chalkboard.numb.constrain(matr[3][3], range)]);
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
         */
        export const copy = (matr: ChalkboardMatrix): ChalkboardMatrix => {
            if (Chalkboard.matr.rows(matr) === 2 && Chalkboard.matr.cols(matr) === 2) {
                return Chalkboard.matr.init([matr[0][0], matr[0][1]],
                                            [matr[1][0], matr[1][1]]);
            } else if (Chalkboard.matr.rows(matr) === 3 && Chalkboard.matr.cols(matr) === 3) {
                return Chalkboard.matr.init([matr[0][0], matr[0][1], matr[0][2]],
                                            [matr[1][0], matr[1][1], matr[1][2]],
                                            [matr[2][0], matr[2][1], matr[2][2]]);
            } else if (Chalkboard.matr.rows(matr) === 4 && Chalkboard.matr.cols(matr) === 4) {
                return Chalkboard.matr.init([matr[0][0], matr[0][1], matr[0][2], matr[0][3]],
                                            [matr[1][0], matr[1][1], matr[1][2], matr[1][3]],
                                            [matr[2][0], matr[2][1], matr[2][2], matr[2][3]],
                                            [matr[3][0], matr[3][1], matr[3][2], matr[3][3]]);
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
         */
        export const det = (matr: ChalkboardMatrix): number => {
            if (Chalkboard.matr.rows(matr) === Chalkboard.matr.cols(matr)) {
                if (Chalkboard.matr.rows(matr) === 1) {
                    return matr[0][0];
                } else if (Chalkboard.matr.rows(matr) === 2) {
                    return matr[0][0] * matr[1][1] - matr[0][1] * matr[1][0];
                } else if (Chalkboard.matr.rows(matr) === 3) {
                    return matr[0][0] * (matr[1][1] * matr[2][2] - matr[1][2] * matr[2][1]) - matr[0][1] * (matr[1][0] * matr[2][2] - matr[1][2] * matr[2][0]) + matr[0][2] * (matr[1][0] * matr[2][1] - matr[1][1] * matr[2][0]);
                } else if (Chalkboard.matr.rows(matr) === 4) {
                    return matr[0][0] * (matr[1][1] * (matr[2][2] * matr[3][3] - matr[2][3] * matr[3][2]) - matr[1][2] * (matr[2][0] * matr[3][3] - matr[2][3] * matr[3][0]) + matr[1][3] * (matr[2][0] * matr[3][1] - matr[2][1] * matr[3][0])) - matr[0][1] * (matr[1][0] * (matr[2][2] * matr[3][3] - matr[2][3] * matr[3][2]) - matr[1][2] * (matr[2][0] * matr[3][3] - matr[2][3] * matr[3][0]) + matr[1][3] * (matr[2][0] * matr[3][2] - matr[2][2] * matr[3][0])) + matr[0][2] * (matr[1][0] * (matr[2][1] * matr[3][3] - matr[2][3] * matr[3][1]) - matr[1][1] * (matr[2][0] * matr[3][3] - matr[2][3] * matr[3][0]) + matr[1][3] * (matr[2][0] * matr[3][1] - matr[2][1] * matr[3][0])) - matr[0][3] * (matr[1][0] * (matr[2][1] * matr[3][2] - matr[2][2] * matr[3][1]) - matr[1][1] * (matr[2][0] * matr[3][2] - matr[2][2] * matr[3][0]) + matr[1][2] * (matr[2][0] * matr[3][1] - matr[2][1] * matr[3][0]));
                } else {
                    let result = 0;
                    for (let i = 0; i < Chalkboard.matr.rows(matr); i++) {
                        const cofactor = matr[0][i] * Chalkboard.matr.det(Chalkboard.matr.cofactor(matr, 1, i + 1));
                        result += i % 2 === 0 ? cofactor : -cofactor;
                    }
                    return result;
                }
            } else {
                throw new TypeError('Parameter "matr" must be of type "ChalkboardMatrix" that is square.');
            }
        };

        /**
         * Initializes a diagonal matrix.
         * @param {number} size - The number of rows or columns
         * @param {number[]} elements - The elements on the main diagonal
         * @returns {ChalkboardMatrix}
         */
        export const diagonal = (size: number, ...elements: number[]): ChalkboardMatrix => {
            if (size === 2) {
                return Chalkboard.matr.init([elements[0], 0],
                                            [0, elements[1]]);
            } else if (size === 3) {
                return Chalkboard.matr.init([elements[0], 0, 0],
                                            [0, elements[1], 0],
                                            [0, 0, elements[2]]);
            } else if (size === 4) {
                return Chalkboard.matr.init([elements[0], 0, 0, 0],
                                            [0, elements[1], 0, 0],
                                            [0, 0, elements[2], 0],
                                            [0, 0, 0, elements[3]]);
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
         */
        export const eigenvalue = (matr: ChalkboardMatrix, maxIterations: number = 100): number => {
            let v = Chalkboard.matr.fill(1, Chalkboard.matr.rows(matr), 1);
            for (let i = 0; i < maxIterations; i++) {
                const matrv = Chalkboard.matr.mul(matr, v);
                const max = Chalkboard.stat.max(Chalkboard.matr.toArray(Chalkboard.matr.absolute(matrv)));
                v = Chalkboard.stat.toMatrix(Chalkboard.matr.toArray(matrv).map(function (i) {
                    return i / max;
                }), Chalkboard.matr.rows(matr), 1);
            }
            const dot = function (v1: number[], v2: number[]): number {
                let result = 0;
                for (let i = 0; i < v1.length; i++) {
                    result += v1[i] * v2[i];
                }
                return result;
            }
            return dot(Chalkboard.matr.toArray(Chalkboard.matr.transpose(v)), Chalkboard.matr.toArray(Chalkboard.matr.mul(matr, v))) / dot(Chalkboard.matr.toArray(Chalkboard.matr.transpose(v)), Chalkboard.matr.toArray(v));
        };

        /**
         * Calculates the dominant eigenvector of a matrix.
         * @param {ChalkboardMatrix} matr - The matrix
         * @param {number} [maxIterations=100] - The number of iterations the algorithm runs
         * @returns {number[]}
         */
        export const eigenvector = (matr: ChalkboardMatrix, maxIterations: number = 100): number[] => {
            let v = Chalkboard.matr.fill(1, Chalkboard.matr.rows(matr), 1);
            for (let i = 0; i < maxIterations; i++) {
                const matrv = Chalkboard.matr.mul(matr, v);
                const max = Chalkboard.stat.max(Chalkboard.matr.toArray(Chalkboard.matr.absolute(matrv)));
                v = Chalkboard.stat.toMatrix(Chalkboard.matr.toArray(matrv).map(function (i) {
                    return i / max;
                }), Chalkboard.matr.rows(matr), 1);
            }
            const result = Chalkboard.matr.toArray(v);
            return result;
        };

        /**
         * Initializes an empty matrix.
         * @param {number} rows - The number of rows
         * @param {number} cols - The number of columns
         * @returns {ChalkboardMatrix}
         */
        export const empty = (rows: number, cols: number = rows): ChalkboardMatrix => {
            const _null = null as unknown as number;
            if (rows === 2 && cols === 2) {
                return Chalkboard.matr.init([_null, _null],
                                            [_null, _null]);
            } else if (rows === 3 && cols === 3) {
                return Chalkboard.matr.init([_null, _null, _null],
                                            [_null, _null, _null],
                                            [_null, _null, _null]);
            } else if (rows === 4 && cols === 4) {
                return Chalkboard.matr.init([_null, _null, _null, _null],
                                            [_null, _null, _null, _null],
                                            [_null, _null, _null, _null],
                                            [_null, _null, _null, _null]);
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
         */
        export const exchange = (size: number): ChalkboardMatrix => {
            if (size === 2) {
                return Chalkboard.matr.init([0, 1],
                                            [1, 0]);
            } else if (size === 3) {
                return Chalkboard.matr.init([0, 0, 1],
                                            [0, 1, 0],
                                            [1, 0, 0]);
            } else if (size === 4) {
                return Chalkboard.matr.init([0, 0, 0, 1],
                                            [0, 0, 1, 0],
                                            [0, 1, 0, 0],
                                            [1, 0, 0, 0]);
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
         * @param {number} element - The numberto fill the elements with
         * @param {number} rows - The number of rows
         * @param {number} cols - The number of columns
         * @returns {ChalkboardMatrix}
         */
        export const fill = (element: number, rows: number, cols: number = rows): ChalkboardMatrix => {
            if (rows === 2 && cols === 2) {
                return Chalkboard.matr.init([element, element],
                                            [element, element]);
            } else if (rows === 3 && cols === 3) {
                return Chalkboard.matr.init([element, element, element],
                                            [element, element, element],
                                            [element, element, element]);
            } else if (rows === 4 && cols === 4) {
                return Chalkboard.matr.init([element, element, element, element],
                                            [element, element, element, element],
                                            [element, element, element, element],
                                            [element, element, element, element]);
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
         * Initializes a Hilbert matrix.
         * @param {number} size - The number of rows or columns of the matrix
         * @returns {ChalkboardMatrix}
         */
        export const Hilbert = (size: number): ChalkboardMatrix => {
            if (size === 2) {
                return Chalkboard.matr.init([1/1, 1/2],
                                            [1/2, 1/3]);
            } else if (size === 3) {
                return Chalkboard.matr.init([1/1, 1/2, 1/3],
                                            [1/2, 1/3, 1/4],
                                            [1/3, 1/4, 1/5]);
            } else if (size === 4) {
                return Chalkboard.matr.init([1/1, 1/2, 1/3, 1/4],
                                            [1/2, 1/3, 1/4, 1/5],
                                            [1/3, 1/4, 1/5, 1/6],
                                            [1/4, 1/5, 1/6, 1/7]);
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
         */
        export const identity = (size: number): ChalkboardMatrix => {
            if (size === 2) {
                return Chalkboard.matr.init([1, 0],
                                            [0, 1]);
            } else if (size === 3) {
                return Chalkboard.matr.init([1, 0, 0],
                                            [0, 1, 0],
                                            [0, 0, 1]);
            } else if (size === 4) {
                return Chalkboard.matr.init([1, 0, 0, 0],
                                            [0, 1, 0, 0],
                                            [0, 0, 1, 0],
                                            [0, 0, 0, 1]);
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
         */
        export const invert = (matr: ChalkboardMatrix): ChalkboardMatrix => {
            if (Chalkboard.matr.rows(matr) === Chalkboard.matr.cols(matr)) {
                if (Chalkboard.matr.rows(matr) === 2) {
                    const det = Chalkboard.matr.det(matr);
                    return Chalkboard.matr.init([matr[1][1] / det, -matr[0][1] / det],
                                                [-matr[1][0] / det, matr[0][0] / det]);
                } else if (Chalkboard.matr.rows(matr) === 3) {
                    const det = Chalkboard.matr.det(matr);
                    return Chalkboard.matr.init([((matr[1][1] * matr[2][2]) - (matr[1][2] * matr[2][1])) / det, ((matr[0][2] * matr[2][1]) - (matr[0][1] * matr[2][2])) / det, ((matr[0][1] * matr[1][2]) - (matr[0][2] * matr[1][1])) / det],
                                                [((matr[1][2] * matr[2][0]) - (matr[1][0] * matr[2][2])) / det, ((matr[0][0] * matr[2][2]) - (matr[0][2] * matr[2][0])) / det, ((matr[0][2] * matr[1][0]) - (matr[0][0] * matr[1][2])) / det],
                                                [((matr[1][0] * matr[2][1]) - (matr[1][1] * matr[2][0])) / det, ((matr[0][1] * matr[2][0]) - (matr[0][0] * matr[2][1])) / det, ((matr[0][0] * matr[1][1]) - (matr[0][1] * matr[1][0])) / det]);
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
                    return Chalkboard.matr.init([(matr[1][1] * adj11 - matr[1][2] * adj10 + matr[1][3] * adj09) / det, (matr[0][2] * adj10 - matr[0][1] * adj11 - matr[0][3] * adj09) / det, (matr[3][1] * adj05 - matr[3][2] * adj04 + matr[3][3] * adj03) / det, (matr[2][2] * adj04 - matr[2][1] * adj05 - matr[2][3] * adj03) / det],
                                                [(matr[1][2] * adj08 - matr[1][0] * adj11 - matr[1][3] * adj07) / det, (matr[0][0] * adj11 - matr[0][2] * adj08 + matr[0][3] * adj07) / det, (matr[3][2] * adj02 - matr[3][0] * adj05 - matr[3][3] * adj01) / det, (matr[2][0] * adj05 - matr[2][2] * adj02 + matr[2][3] * adj01) / det],
                                                [(matr[1][0] * adj10 - matr[1][1] * adj08 + matr[1][3] * adj06) / det, (matr[0][1] * adj08 - matr[0][0] * adj10 - matr[0][3] * adj06) / det, (matr[3][0] * adj04 - matr[3][1] * adj02 + matr[3][3] * adj00) / det, (matr[2][1] * adj02 - matr[2][0] * adj04 - matr[2][3] * adj00) / det],
                                                [(matr[1][1] * adj07 - matr[1][0] * adj09 - matr[1][2] * adj06) / det, (matr[0][0] * adj09 - matr[0][1] * adj07 + matr[0][2] * adj06) / det, (matr[3][1] * adj01 - matr[3][0] * adj03 - matr[3][2] * adj00) / det, (matr[2][0] * adj03 - matr[2][1] * adj01 + matr[2][2] * adj00) / det]);
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
                throw new TypeError('Parameter "matr" must be of type "ChalkboardMatrix" that is square.');
            }
        };

        /**
         * Checks if two matrices are approximately equal.
         * @param {ChalkboardMatrix} matr1 - The first matrix
         * @param {ChalkboardMatrix} matr2 - The second matrix
         * @returns {boolean}
         */
        export const isApproxEqual = (matr1: ChalkboardMatrix, matr2: ChalkboardMatrix): boolean => {
            if (Chalkboard.matr.rows(matr1) === Chalkboard.matr.rows(matr2) && Chalkboard.matr.cols(matr1) === Chalkboard.matr.cols(matr2)) {
                const n = 0.000001;
                if (Chalkboard.matr.rows(matr1) === 2 && Chalkboard.matr.cols(matr1) === 2) {
                    return Math.abs(matr1[0][0] - matr2[0][0]) < n && Math.abs(matr1[0][1] - matr2[0][1]) < n && Math.abs(matr1[1][0] - matr2[1][0]) < n && Math.abs(matr1[1][1] - matr2[1][1]) < n;
                } else if (Chalkboard.matr.rows(matr1) === 3 && Chalkboard.matr.cols(matr1) === 3) {
                    return Math.abs(matr1[0][0] - matr2[0][0]) < n && Math.abs(matr1[0][1] - matr2[0][1]) < n && Math.abs(matr1[0][2] - matr2[0][2]) < n && Math.abs(matr1[1][0] - matr2[1][0]) < n && Math.abs(matr1[1][1] - matr2[1][1]) < n && Math.abs(matr1[1][2] - matr2[1][2]) < n && Math.abs(matr1[2][0] - matr2[2][0]) < n && Math.abs(matr1[2][1] - matr2[2][1]) < n && Math.abs(matr1[2][2] - matr2[2][2]) < n;
                } else if (Chalkboard.matr.rows(matr1) === 4 && Chalkboard.matr.cols(matr1) === 4) {
                    return Math.abs(matr1[0][0] - matr2[0][0]) < n && Math.abs(matr1[0][1] - matr2[0][1]) < n && Math.abs(matr1[0][2] - matr2[0][2]) < n && Math.abs(matr1[0][3] - matr2[0][3]) < n && Math.abs(matr1[1][0] - matr2[1][0]) < n && Math.abs(matr1[1][1] - matr2[1][1]) < n && Math.abs(matr1[1][2] - matr2[1][2]) < n && Math.abs(matr1[1][3] - matr2[1][3]) < n && Math.abs(matr1[2][0] - matr2[2][0]) < n && Math.abs(matr1[2][1] - matr2[2][1]) < n && Math.abs(matr1[2][2] - matr2[2][2]) < n && Math.abs(matr1[2][3] - matr2[2][3]) < n && Math.abs(matr1[3][0] - matr2[3][0]) < n && Math.abs(matr1[3][1] - matr2[3][1]) < n && Math.abs(matr1[3][2] - matr2[3][2]) < n && Math.abs(matr1[3][3] - matr2[3][3]) < n;
                } else {
                    let score = Chalkboard.matr.rows(matr1) * Chalkboard.matr.cols(matr2);
                    for (let i = 0; i < Chalkboard.matr.rows(matr1); i++) {
                        for (let j = 0; j < Chalkboard.matr.cols(matr2); j++) {
                            if (Math.abs(matr1[i][j] - matr2[i][j]) < n) score--;
                        }
                    }
                    return score === 0;
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
         */
        export const isEqual = (matr1: ChalkboardMatrix, matr2: ChalkboardMatrix): boolean => {
            if (Chalkboard.matr.rows(matr1) === Chalkboard.matr.rows(matr2) && Chalkboard.matr.cols(matr1) === Chalkboard.matr.cols(matr2)) {
                if (Chalkboard.matr.rows(matr1) === 2 && Chalkboard.matr.cols(matr1) === 2) {
                    return matr1[0][0] === matr2[0][0] && matr1[0][1] === matr2[0][1] && matr1[1][0] === matr2[1][0] && matr1[1][1] === matr2[1][1];
                } else if (Chalkboard.matr.rows(matr1) === 3 && Chalkboard.matr.cols(matr1) === 3) {
                    return matr1[0][0] === matr2[0][0] && matr1[0][1] === matr2[0][1] && matr1[0][2] === matr2[0][2] && matr1[1][0] === matr2[1][0] && matr1[1][1] === matr2[1][1] && matr1[1][2] === matr2[1][2] && matr1[2][0] === matr2[2][0] && matr1[2][1] === matr2[2][1] && matr1[2][2] === matr2[2][2];
                } else if (Chalkboard.matr.rows(matr1) === 4 && Chalkboard.matr.cols(matr1) === 4) {
                    return matr1[0][0] === matr2[0][0] && matr1[0][1] === matr2[0][1] && matr1[0][2] === matr2[0][2] && matr1[0][3] === matr2[0][3] && matr1[1][0] === matr2[1][0] && matr1[1][1] === matr2[1][1] && matr1[1][2] === matr2[1][2] && matr1[1][3] === matr2[1][3] && matr1[2][0] === matr2[2][0] && matr1[2][1] === matr2[2][1] && matr1[2][2] === matr2[2][2] && matr1[2][3] === matr2[2][3] && matr1[3][0] === matr2[3][0] && matr1[3][1] === matr2[3][1] && matr1[3][2] === matr2[3][2] && matr1[3][3] === matr2[3][3];
                } else {
                    let score = Chalkboard.matr.rows(matr1) * Chalkboard.matr.cols(matr2);
                    for (let i = 0; i < Chalkboard.matr.rows(matr1); i++) {
                        for (let j = 0; j < Chalkboard.matr.cols(matr2); j++) {
                            if (matr1[i][j] === matr2[i][j]) score--;
                        }
                    }
                    return score === 0;
                }
            } else {
                return false;
            }
        };

        /**
         * Checks if a matrix is invertible.
         * @param {ChalkboardMatrix} matr - The matrix
         * @returns {boolean}
         */
        export const isInvertible = (matr: ChalkboardMatrix): boolean => {
            return Chalkboard.matr.rows(matr) === Chalkboard.matr.cols(matr) && Chalkboard.matr.det(matr) !== 0;
        };

        /**
         * Checks if a matrix is orthogonal.
         * @param {ChalkboardMatrix} matr - The matrix
         * @returns {boolean}
         */
        export const isOrthogonal = (matr: ChalkboardMatrix): boolean => {
            if (Chalkboard.matr.isInvertible(matr)) {
                return Chalkboard.matr.isApproxEqual(Chalkboard.matr.transpose(matr), Chalkboard.matr.invert(matr));
            } else {
                return false;
            }
        };

        /**
         * Checks if a matrix is skew-symmetric.
         * @param {ChalkboardMatrix} matr - The matrix
         * @returns {boolean}
         */
        export const isSkewSymmetric = (matr: ChalkboardMatrix): boolean => {
            return Chalkboard.matr.isEqual(Chalkboard.matr.transpose(matr), Chalkboard.matr.negate(matr));
        };

        /**
         * Checks if a matrix is square.
         * @param {ChalkboardMatrix} matr - The matrix
         * @returns {boolean}
         */
        export const isSquare = (matr: ChalkboardMatrix): boolean => {
            return Chalkboard.matr.rows(matr) === Chalkboard.matr.cols(matr);
        };

        /**
         * Checks if a matrix is symmetric.
         * @param {ChalkboardMatrix} matr - The matrix
         * @returns {boolean}
         */
        export const isSymmetric = (matr: ChalkboardMatrix): boolean => {
            return Chalkboard.matr.isEqual(matr, Chalkboard.matr.transpose(matr));
        };

        /**
         * Initializes a Lehmer matrix.
         * @param {number} size - The number of rows or columns of the matrix
         * @returns {ChalkboardMatrix}
         */
        export const Lehmer = (size: number): ChalkboardMatrix => {
            if (size === 2) {
                return Chalkboard.matr.init([1/1, 1/2],
                                            [1/2, 1/1]);
            } else if (size === 3) {
                return Chalkboard.matr.init([1/1, 1/2, 1/3],
                                            [1/2, 1/1, 2/3],
                                            [1/3, 2/3, 1/1]);
            } else if (size === 4) {
                return Chalkboard.matr.init([1/1, 1/2, 1/3, 1/4],
                                            [1/2, 1/1, 2/3, 1/2],
                                            [1/3, 2/3, 1/1, 3/4],
                                            [1/4, 1/1, 3/4, 1/1]);
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
         * Initializes a lower triangular matrix.
         * @param {number} size - The number of rows or columns
         * @param {number[]} elements - The elements on and below the main diagonal
         * @returns {ChalkboardMatrix}
         */
        export const lowerTriangular = (size: number, ...elements: number[]): ChalkboardMatrix => {
            if (size === 2) {
                return Chalkboard.matr.init([elements[0], 0],
                                            [elements[1], elements[2]]);
            } else if (size === 3) {
                return Chalkboard.matr.init([elements[0], 0, 0],
                                            [elements[1], elements[2], 0],
                                            [elements[3], elements[4], elements[5]]);
            } else if (size === 4) {
                return Chalkboard.matr.init([elements[0], 0, 0, 0],
                                            [elements[1], elements[2], 0, 0],
                                            [elements[3], elements[4], elements[5], 0],
                                            [elements[6], elements[7], elements[8], elements[9]]);
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
         */
        export const LUdecomp = (matr: ChalkboardMatrix): { L: ChalkboardMatrix; U: ChalkboardMatrix } => {
            if (Chalkboard.matr.rows(matr) === Chalkboard.matr.cols(matr)) {
                const L = Chalkboard.matr.identity(Chalkboard.matr.rows(matr)), U = Chalkboard.matr.fill(0, Chalkboard.matr.rows(matr));
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
                throw new TypeError('Parameter "matr" must be of type "ChalkboardMatrix" that is square.');
            }
        };

        /**
         * Calculates the multiplication of two matrices.
         * @param {ChalkboardMatrix} matr1 - The first matrix
         * @param {ChalkboardMatrix} matr2 - The second matrix
         * @returns {ChalkboardMatrix}
         */
        export const mul = (matr1: ChalkboardMatrix, matr2: ChalkboardMatrix): ChalkboardMatrix => {
            if (Chalkboard.matr.cols(matr1) === Chalkboard.matr.rows(matr2)) {
                if (Chalkboard.matr.rows(matr1) === 2 && Chalkboard.matr.cols(matr1) === 2 && Chalkboard.matr.rows(matr2) === 2 && Chalkboard.matr.cols(matr2) === 1) {
                    return Chalkboard.matr.init([matr1[0][0] * matr2[0][0] + matr1[0][1] * matr2[1][0]],
                                                [matr1[1][0] * matr2[0][0] + matr1[1][1] * matr2[1][0]]);
                } else if (Chalkboard.matr.rows(matr1) === 2 && Chalkboard.matr.cols(matr1) === 2 && Chalkboard.matr.rows(matr2) === 2 && Chalkboard.matr.cols(matr2) === 2) {
                    return Chalkboard.matr.init([matr1[0][0] * matr2[0][0] + matr1[0][1] * matr2[1][0], matr1[0][0] * matr2[0][1] + matr1[0][1] * matr2[1][1]],
                                                [matr1[1][0] * matr2[0][0] + matr1[1][1] * matr2[1][0], matr1[1][0] * matr2[0][1] + matr1[1][1] * matr2[1][1]]);
                } else if (Chalkboard.matr.rows(matr1) === 3 && Chalkboard.matr.cols(matr1) === 3 && Chalkboard.matr.rows(matr2) === 3 && Chalkboard.matr.cols(matr2) === 1) {
                    return Chalkboard.matr.init([matr1[0][0] * matr2[0][0] + matr1[0][1] * matr2[1][0] + matr1[0][2] * matr2[2][0]],
                                                [matr1[1][0] * matr2[0][0] + matr1[1][1] * matr2[1][0] + matr1[1][2] * matr2[2][0]],
                                                [matr1[2][0] * matr2[0][0] + matr1[2][1] * matr2[1][0] + matr1[2][2] * matr2[2][0]]);
                } else if (Chalkboard.matr.rows(matr1) === 3 && Chalkboard.matr.cols(matr1) === 3 && Chalkboard.matr.rows(matr2) === 3 && Chalkboard.matr.cols(matr2) === 3) {
                    return Chalkboard.matr.init([matr1[0][0] * matr2[0][0] + matr1[0][1] * matr2[1][0] + matr1[0][2] * matr2[2][0], matr1[0][0] * matr2[0][1] + matr1[0][1] * matr2[1][1] + matr1[0][2] * matr2[2][1], matr1[0][0] * matr2[0][2] + matr1[0][1] * matr2[1][2] + matr1[0][2] * matr2[2][2]],
                                                [matr1[1][0] * matr2[0][0] + matr1[1][1] * matr2[1][0] + matr1[1][2] * matr2[2][0], matr1[1][0] * matr2[0][1] + matr1[1][1] * matr2[1][1] + matr1[1][2] * matr2[2][1], matr1[1][0] * matr2[0][2] + matr1[1][1] * matr2[1][2] + matr1[1][2] * matr2[2][2]],
                                                [matr1[2][0] * matr2[0][0] + matr1[2][1] * matr2[1][0] + matr1[2][2] * matr2[2][0], matr1[2][0] * matr2[0][1] + matr1[2][1] * matr2[1][1] + matr1[2][2] * matr2[2][1], matr1[2][0] * matr2[0][2] + matr1[2][1] * matr2[1][2] + matr1[2][2] * matr2[2][2]]);
                } else if (Chalkboard.matr.rows(matr1) === 4 && Chalkboard.matr.cols(matr1) === 4 && Chalkboard.matr.rows(matr2) === 4 && Chalkboard.matr.cols(matr2) === 1) {
                    return Chalkboard.matr.init([matr1[0][0] * matr2[0][0] + matr1[0][1] * matr2[1][0] + matr1[0][2] * matr2[2][0] + matr1[0][3] * matr2[3][0]],
                                                [matr1[1][0] * matr2[0][0] + matr1[1][1] * matr2[1][0] + matr1[1][2] * matr2[2][0] + matr1[1][3] * matr2[3][0]],
                                                [matr1[2][0] * matr2[0][0] + matr1[2][1] * matr2[1][0] + matr1[2][2] * matr2[2][0] + matr1[2][3] * matr2[3][0]],
                                                [matr1[3][0] * matr2[0][0] + matr1[3][1] * matr2[1][0] + matr1[3][2] * matr2[2][0] + matr1[3][3] * matr2[3][0]]);
                } else if (Chalkboard.matr.rows(matr1) === 4 && Chalkboard.matr.cols(matr1) === 4 && Chalkboard.matr.rows(matr2) === 4 && Chalkboard.matr.cols(matr2) === 4) {
                    return Chalkboard.matr.init([matr1[0][0] * matr2[0][0] + matr1[0][1] * matr2[1][0] + matr1[0][2] * matr2[2][0] + matr1[0][3] * matr2[3][0], matr1[0][0] * matr2[0][1] + matr1[0][1] * matr2[1][1] + matr1[0][2] * matr2[2][1] + matr1[0][3] * matr2[3][1], matr1[0][0] * matr2[0][2] + matr1[0][1] * matr2[1][2] + matr1[0][2] * matr2[2][2] + matr1[0][3] * matr2[3][2], matr1[0][0] * matr2[0][3] + matr1[0][1] * matr2[1][3] + matr1[0][2] * matr2[2][3] + matr1[0][3] * matr2[3][3]],
                                                [matr1[1][0] * matr2[0][0] + matr1[1][1] * matr2[1][0] + matr1[1][2] * matr2[2][0] + matr1[1][3] * matr2[3][0], matr1[1][0] * matr2[0][1] + matr1[1][1] * matr2[1][1] + matr1[1][2] * matr2[2][1] + matr1[1][3] * matr2[3][1], matr1[1][0] * matr2[0][2] + matr1[1][1] * matr2[1][2] + matr1[1][2] * matr2[2][2] + matr1[1][3] * matr2[3][2], matr1[1][0] * matr2[0][3] + matr1[1][1] * matr2[1][3] + matr1[1][2] * matr2[2][3] + matr1[1][3] * matr2[3][3]],
                                                [matr1[2][0] * matr2[0][0] + matr1[2][1] * matr2[1][0] + matr1[2][2] * matr2[2][0] + matr1[2][3] * matr2[3][0], matr1[2][0] * matr2[0][1] + matr1[2][1] * matr2[1][1] + matr1[2][2] * matr2[2][1] + matr1[2][3] * matr2[3][1], matr1[2][0] * matr2[0][2] + matr1[2][1] * matr2[1][2] + matr1[2][2] * matr2[2][2] + matr1[2][3] * matr2[3][2], matr1[2][0] * matr2[0][3] + matr1[2][1] * matr2[1][3] + matr1[2][2] * matr2[2][3] + matr1[2][3] * matr2[3][3]],
                                                [matr1[3][0] * matr2[0][0] + matr1[3][1] * matr2[1][0] + matr1[3][2] * matr2[2][0] + matr1[3][3] * matr2[3][0], matr1[2][0] * matr2[0][1] + matr1[2][1] * matr2[1][1] + matr1[2][2] * matr2[2][1] + matr1[2][3] * matr2[3][1], matr1[2][0] * matr2[0][2] + matr1[2][1] * matr2[1][2] + matr1[2][2] * matr2[2][2] + matr1[2][3] * matr2[3][2], matr1[2][0] * matr2[0][3] + matr1[2][1] * matr2[1][3] + matr1[2][2] * matr2[2][3] + matr1[2][3] * matr2[3][3]]);
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
                throw new TypeError('Parameters "matr1" and "matr2" must be of type "ChalkboardMatrix" where the numbers of columns of "matr1" must be equivalent to the number of rows of "matr2".');
            }
        };

        /**
         * Calculates the Kronecker multiplication of two matrices.
         * @param {ChalkboardMatrix} matr1 - The first matrix
         * @param {ChalkboardMatrix} matr2 - The second matrix
         * @returns {ChalkboardMatrix}
         */
        export const mulKronecker = (matr1: ChalkboardMatrix, matr2: ChalkboardMatrix): ChalkboardMatrix => {
            if (Chalkboard.matr.rows(matr1) === 2 && Chalkboard.matr.cols(matr1) === 2 && Chalkboard.matr.rows(matr2) === 2 && Chalkboard.matr.cols(matr2) === 2) {
                return Chalkboard.matr.init([matr1[0][0] * matr2[0][0], matr1[0][0] * matr2[0][1], matr1[0][1] * matr2[0][0], matr1[0][1] * matr2[0][1]],
                                            [matr1[0][0] * matr2[1][0], matr1[0][0] * matr2[1][1], matr1[0][1] * matr2[1][0], matr1[0][1] * matr2[1][1]],
                                            [matr1[1][0] * matr2[0][0], matr1[1][0] * matr2[0][1], matr1[1][1] * matr2[0][0], matr1[1][1] * matr2[0][1]],
                                            [matr1[1][0] * matr2[1][0], matr1[1][0] * matr2[1][1], matr1[1][1] * matr2[1][0], matr1[1][1] * matr2[1][1]]);
            } else if (Chalkboard.matr.rows(matr1) === 3 && Chalkboard.matr.cols(matr1) === 3 && Chalkboard.matr.rows(matr2) === 3 && Chalkboard.matr.cols(matr2) === 3) {
                return Chalkboard.matr.init([matr1[0][0] * matr2[0][0], matr1[0][0] * matr2[0][1], matr1[0][0] * matr2[0][2], matr1[0][1] * matr2[0][0], matr1[0][1] * matr2[0][1], matr1[0][1] * matr2[0][2], matr1[0][2] * matr2[0][0], matr1[0][2] * matr2[0][1], matr1[0][2] * matr2[0][2]],
                                            [matr1[0][0] * matr2[1][0], matr1[0][0] * matr2[1][1], matr1[0][0] * matr2[1][2], matr1[0][1] * matr2[1][0], matr1[0][1] * matr2[1][1], matr1[0][1] * matr2[1][2], matr1[0][2] * matr2[1][0], matr1[0][2] * matr2[1][1], matr1[0][2] * matr2[1][2]],
                                            [matr1[0][0] * matr2[2][0], matr1[0][0] * matr2[2][1], matr1[0][0] * matr2[2][2], matr1[0][1] * matr2[2][0], matr1[0][1] * matr2[2][1], matr1[0][1] * matr2[2][2], matr1[0][2] * matr2[2][0], matr1[0][2] * matr2[2][1], matr1[0][2] * matr2[2][2]],
                                            [matr1[1][0] * matr2[0][0], matr1[1][0] * matr2[0][1], matr1[1][0] * matr2[0][2], matr1[1][1] * matr2[0][0], matr1[1][1] * matr2[0][1], matr1[1][1] * matr2[0][2], matr1[1][2] * matr2[0][0], matr1[1][2] * matr2[0][1], matr1[1][2] * matr2[0][2]],
                                            [matr1[1][0] * matr2[1][0], matr1[1][0] * matr2[1][1], matr1[1][0] * matr2[1][2], matr1[1][1] * matr2[1][0], matr1[1][1] * matr2[1][1], matr1[1][1] * matr2[1][2], matr1[1][2] * matr2[1][0], matr1[1][2] * matr2[1][1], matr1[1][2] * matr2[1][2]],
                                            [matr1[1][0] * matr2[2][0], matr1[1][0] * matr2[2][1], matr1[1][0] * matr2[2][2], matr1[1][1] * matr2[2][0], matr1[1][1] * matr2[2][1], matr1[1][1] * matr2[2][2], matr1[1][2] * matr2[2][0], matr1[1][2] * matr2[2][1], matr1[1][2] * matr2[2][2]],
                                            [matr1[2][0] * matr2[0][0], matr1[2][0] * matr2[0][1], matr1[2][0] * matr2[0][2], matr1[2][1] * matr2[0][0], matr1[2][1] * matr2[0][1], matr1[2][1] * matr2[0][2], matr1[2][2] * matr2[0][0], matr1[2][2] * matr2[0][1], matr1[2][2] * matr2[0][2]],
                                            [matr1[2][0] * matr2[1][0], matr1[2][0] * matr2[1][1], matr1[2][0] * matr2[1][2], matr1[2][1] * matr2[1][0], matr1[2][1] * matr2[1][1], matr1[2][1] * matr2[1][2], matr1[2][2] * matr2[1][0], matr1[2][2] * matr2[1][1], matr1[2][2] * matr2[1][2]],
                                            [matr1[2][0] * matr2[2][0], matr1[2][0] * matr2[2][1], matr1[2][0] * matr2[2][2], matr1[2][1] * matr2[2][0], matr1[2][1] * matr2[2][1], matr1[2][1] * matr2[2][2], matr1[2][2] * matr2[2][0], matr1[2][2] * matr2[2][1], matr1[2][2] * matr2[2][2]]);
            } else if (Chalkboard.matr.rows(matr1) === 4 && Chalkboard.matr.cols(matr1) === 4 && Chalkboard.matr.rows(matr2) === 4 && Chalkboard.matr.cols(matr2) === 4) {
                return Chalkboard.matr.init([matr1[0][0] * matr2[0][0], matr1[0][0] * matr2[0][1], matr1[0][0] * matr2[0][2], matr1[0][0] * matr2[0][3], matr1[0][1] * matr2[0][0], matr1[0][1] * matr2[0][1], matr1[0][1] * matr2[0][2], matr1[0][1] * matr2[0][3], matr1[0][2] * matr2[0][0], matr1[0][2] * matr2[0][1], matr1[0][2] * matr2[0][2], matr1[0][2] * matr2[0][3], matr1[0][3] * matr2[0][0], matr1[0][3] * matr2[0][1], matr1[0][3] * matr2[0][2], matr1[0][3] * matr2[0][3]],
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
                                            [matr1[3][0] * matr2[3][0], matr1[3][0] * matr2[3][1], matr1[3][0] * matr2[3][2], matr1[3][0] * matr2[3][3], matr1[3][1] * matr2[3][0], matr1[3][1] * matr2[3][1], matr1[3][1] * matr2[3][2], matr1[3][1] * matr2[3][3], matr1[3][2] * matr2[3][0], matr1[3][2] * matr2[3][1], matr1[3][2] * matr2[3][2], matr1[3][2] * matr2[3][3], matr1[3][3] * matr2[3][0], matr1[3][3] * matr2[3][1], matr1[3][3] * matr2[3][2], matr1[3][3] * matr2[3][3]]);
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
         */
        export const mulVector = (matr: ChalkboardMatrix, vect: ChalkboardVector): ChalkboardMatrix | ChalkboardVector => {
            if (typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "undefined" && typeof vect.w === "undefined") {
                if (Chalkboard.matr.rows(matr) === 2) {
                    return Chalkboard.matr.toVector(Chalkboard.matr.mul(matr, Chalkboard.vect.toMatrix(vect)), 2);
                } else {
                    return Chalkboard.matr.mul(matr, Chalkboard.vect.toMatrix(vect));
                }
            } else if (typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "undefined") {
                if (Chalkboard.matr.rows(matr) === 3) {
                    return Chalkboard.matr.toVector(Chalkboard.matr.mul(matr, Chalkboard.vect.toMatrix(vect)), 3);
                } else {
                    return Chalkboard.matr.mul(matr, Chalkboard.vect.toMatrix(vect));
                }
            } else if (typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "number") {
                if (Chalkboard.matr.rows(matr) === 4) {
                    return Chalkboard.matr.toVector(Chalkboard.matr.mul(matr, Chalkboard.vect.toMatrix(vect)), 4);
                } else {
                    return Chalkboard.matr.mul(matr, Chalkboard.vect.toMatrix(vect));
                }
            } else {
                throw new TypeError('Parameter "vect" must be of type "ChalkboardVector" with 2, 3, or 4 dimensions.');
            }
        };

        /**
         * Calculates the negation of a matrix.
         * @param {ChalkboardMatrix} matr - The matrix
         * @returns {ChalkboardMatrix}
         */
        export const negate = (matr: ChalkboardMatrix): ChalkboardMatrix => {
            if (Chalkboard.matr.rows(matr) === 2 && Chalkboard.matr.cols(matr) === 2) {
                return Chalkboard.matr.init([-matr[0][0], -matr[0][1]],
                                            [-matr[1][0], -matr[1][1]]);
            } else if (Chalkboard.matr.rows(matr) === 3 && Chalkboard.matr.cols(matr) === 3) {
                return Chalkboard.matr.init([-matr[0][0], -matr[0][1], -matr[0][2]],
                                            [-matr[1][0], -matr[1][1], -matr[1][2]],
                                            [-matr[2][0], -matr[2][1], -matr[2][2]]);
            } else if (Chalkboard.matr.rows(matr) === 4 && Chalkboard.matr.cols(matr) === 4) {
                return Chalkboard.matr.init([-matr[0][0], -matr[0][1], -matr[0][2], -matr[0][3]],
                                            [-matr[1][0], -matr[1][1], -matr[1][2], -matr[1][3]],
                                            [-matr[2][0], -matr[2][1], -matr[2][2], -matr[2][3]],
                                            [-matr[3][0], -matr[3][1], -matr[3][2], -matr[3][3]]);
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
         * Calculates the null space of a matrix.
         * @param {ChalkboardMatrix} matr - The matrix
         * @returns {ChalkboardMatrix}
         */
        export const nullspace = (matr: ChalkboardMatrix): ChalkboardMatrix => {
            const augmented = matr.map(function (row) {
                return row.slice().concat(Array(Chalkboard.matr.rows(matr)).fill(0));
            });
            const reduced = Chalkboard.matr.reduce(augmented);
            return reduced
                .filter(function (row: number[]) {
                    return row.slice(0, Chalkboard.matr.rows(matr)).every(function (element) {
                        return element === 0;
                    });
                })
                .map(function (row: number[]) {
                    return row.slice(Chalkboard.matr.rows(matr));
                });
        };

        /**
         * Calculates the exponentiation of a matrix.
         * @param {ChalkboardMatrix} matr - The matrix
         * @param {number} num - The exponent
         * @returns {ChalkboardMatrix}
         */
        export const pow = (matr: ChalkboardMatrix, num: number): ChalkboardMatrix => {
            if (Chalkboard.matr.rows(matr) === Chalkboard.matr.cols(matr)) {
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
                throw new TypeError('Parameter "matr" must be of type "ChalkboardMatrix" that is square.');
            }
        };

        /**
         * Prints a matrix in the console.
         * @param {ChalkboardMatrix} matr - The matrix
         * @returns {void}
         */
        export const print = (matr: ChalkboardMatrix): void => {
            console.log(Chalkboard.matr.toString(matr));
        };

        /**
         * Returns a matrix with a row or column removed (pulled out).
         * @param {ChalkboardMatrix} matr - The matrix
         * @param {"row" | "col"} type - Set to pull either a row with "row" or a column with "col"
         * @param {number} rowORcol - The row or column to pull
         * @returns {ChalkboardMatrix}
         */
        export const pull = (matr: ChalkboardMatrix, type: "row" | "col", rowORcol: number): ChalkboardMatrix => {
            rowORcol -= 1;
            if (type === "row") {
                matr.splice(rowORcol, 1);
                return matr;
            } else if (type === "col") {
                for (let i = 0; i < Chalkboard.matr.rows(matr); i++) {
                    matr[i].splice(rowORcol, 1);
                }
                return matr;
            } else {
                throw new TypeError('Parameter "type" must be "row" or "col".');
            }
        };

        /**
         * Returns a matrix with a row or column added (pushed in).
         * @param {ChalkboardMatrix} matr - The matrix
         * @param {"row" | "col"} type - Set to pull either a row with "row" or a column with "col"
         * @param {number} rowORcol - The row or column to pull
         * @param {number[]} elements - The elements to push
         * @returns {ChalkboardMatrix}
         */
        export const push = (matr: ChalkboardMatrix, type: "row" | "col", rowORcol: number, elements: number[]): ChalkboardMatrix => {
            rowORcol -= 1;
            if (type === "row") {
                matr.splice(rowORcol, 0, elements);
                return matr;
            } else if (type === "col") {
                for (let i = 0; i < Chalkboard.matr.rows(matr); i++) {
                    matr[i].splice(rowORcol, 0, elements[i]);
                }
                return matr;
            } else {
                throw new TypeError('Parameter "type" must be "row" or "col".');
            }
        };

        /**
         * Calculates the QR decomposition of a matrix.
         * @param {ChalkboardMatrix} matr - The matrix
         * @returns {{Q: ChalkboardMatrix, R: ChalkboardMatrix}}
         */
        export const QRdecomp = (matr: ChalkboardMatrix): { Q: ChalkboardMatrix; R: ChalkboardMatrix } => {
            const Q = Chalkboard.matr.identity(Chalkboard.matr.rows(matr)), R = Chalkboard.matr.copy(matr);
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
         * @param {number} inf - The lower bound
         * @param {number} sup - The upper bound
         * @param {number} rows - The number of rows
         * @param {number} cols - The number of columns
         * @returns {ChalkboardMatrix}
         */
        export const random = (inf: number, sup: number, rows: number, cols: number = rows): ChalkboardMatrix => {
            if (rows === 2 && cols === 2) {
                return Chalkboard.matr.init([Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup)],
                                            [Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup)]);
            } else if (rows === 3 && cols === 3) {
                return Chalkboard.matr.init([Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup)],
                                            [Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup)],
                                            [Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup)]);
            } else if (rows === 4 && cols === 4) {
                return Chalkboard.matr.init([Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup)],
                                            [Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup)],
                                            [Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup)],
                                            [Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup)]);
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
         */
        export const rank = (matr: ChalkboardMatrix): number => {
            return Chalkboard.matr.reduce(matr).filter(function (row: number[]) {
                return row.some(function (element) {
                    return element !== 0;
                });
            }).length;
        };

        /**
         * Calculates the reciprocal of a matrix.
         * @param {ChalkboardMatrix} matr - The matrix
         * @returns {ChalkboardMatrix}
         */
        export const reciprocate = (matr: ChalkboardMatrix): ChalkboardMatrix => {
            if (Chalkboard.matr.rows(matr) === 2 && Chalkboard.matr.cols(matr) === 2) {
                return Chalkboard.matr.init([1 / matr[0][0], 1 / matr[0][1]],
                                            [1 / matr[1][0], 1 / matr[1][1]]);
            } else if (Chalkboard.matr.rows(matr) === 3 && Chalkboard.matr.cols(matr) === 3) {
                return Chalkboard.matr.init([1 / matr[0][0], 1 / matr[0][1], 1 / matr[0][2]],
                                            [1 / matr[1][0], 1 / matr[1][1], 1 / matr[1][2]],
                                            [1 / matr[2][0], 1 / matr[2][1], 1 / matr[2][2]]);
            } else if (Chalkboard.matr.rows(matr) === 4 && Chalkboard.matr.cols(matr) === 4) {
                return Chalkboard.matr.init([1 / matr[0][0], 1 / matr[0][1], 1 / matr[0][2], 1 / matr[0][3]],
                                            [1 / matr[1][0], 1 / matr[1][1], 1 / matr[1][2], 1 / matr[1][3]],
                                            [1 / matr[2][0], 1 / matr[2][1], 1 / matr[2][2], 1 / matr[2][3]],
                                            [1 / matr[3][0], 1 / matr[3][1], 1 / matr[3][2], 1 / matr[3][3]]);
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
         * Calculates the row echelon form of a matrix (performs Gaussian elimination on it).
         * @param {ChalkboardMatrix} matr - The matrix
         * @returns {ChalkboardMatrix}
         */
        export const reduce = (matr: ChalkboardMatrix): ChalkboardMatrix => {
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
         * Returns a matrix with the number of rows and columns changed.
         * @param {ChalkboardMatrix} matr - The matrix
         * @param {number} rows - The number of rows to change to
         * @param {nmber} [cols=rows] - The number of columns to change to
         * @returns {ChalkboardMatrix}
         */
        export const resize = (matr: ChalkboardMatrix, rows: number, cols: number = rows): ChalkboardMatrix => {
            const result = Chalkboard.matr.init();
            const flat = Chalkboard.matr.toArray(matr);
            let index = 0;
            for (let i = 0; i < rows; i++) {
                result.push([]);
                for (let j = 0; j < cols; j++) {
                    result[i].push(index < flat.length ? flat[index++] : 0);
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
         */
        export const rotator = (radx: number, rady?: number, radz?: number): ChalkboardMatrix => {
            if (rady === undefined && radz === undefined) {
                return Chalkboard.matr.init([Chalkboard.trig.cos(radx), -Chalkboard.trig.sin(radx)], [Chalkboard.trig.sin(radx), Chalkboard.trig.cos(radx)]);
            } else {
                const matrx = Chalkboard.matr.init([1, 0, 0], [0, Chalkboard.trig.cos(radx), -Chalkboard.trig.sin(radx)], [0, Chalkboard.trig.sin(radx), Chalkboard.trig.cos(radx)]),
                    matry = Chalkboard.matr.init([Chalkboard.trig.cos(rady!), 0, Chalkboard.trig.sin(rady!)], [0, 1, 0], [-Chalkboard.trig.sin(rady!), 0, Chalkboard.trig.cos(rady!)]),
                    matrz = Chalkboard.matr.init([Chalkboard.trig.cos(radz!), -Chalkboard.trig.sin(radz!), 0], [Chalkboard.trig.sin(radz!), Chalkboard.trig.cos(radz!), 0], [0, 0, 1]);
                return Chalkboard.matr.mul(Chalkboard.matr.mul(matrz, matry), matrx);
            }
        };

        /**
         * Calculates the rounding of a matrix.
         * @param {ChalkboardMatrix} matr - The matrix
         * @returns {ChalkboardMatrix}
         */
        export const round = (matr: ChalkboardMatrix): ChalkboardMatrix => {
            if (Chalkboard.matr.rows(matr) === 2 && Chalkboard.matr.cols(matr) === 2) {
                return Chalkboard.matr.init([Math.round(matr[0][0]), Math.round(matr[0][1])],
                                            [Math.round(matr[1][0]), Math.round(matr[1][1])]);
            } else if (Chalkboard.matr.rows(matr) === 3 && Chalkboard.matr.cols(matr) === 3) {
                return Chalkboard.matr.init([Math.round(matr[0][0]), Math.round(matr[0][1]), Math.round(matr[0][2])],
                                            [Math.round(matr[1][0]), Math.round(matr[1][1]), Math.round(matr[1][2])],
                                            [Math.round(matr[2][0]), Math.round(matr[2][1]), Math.round(matr[2][2])]);
            } else if (Chalkboard.matr.rows(matr) === 4 && Chalkboard.matr.cols(matr) === 4) {
                return Chalkboard.matr.init([Math.round(matr[0][0]), Math.round(matr[0][1]), Math.round(matr[0][2]), Math.round(matr[0][3])],
                                            [Math.round(matr[1][0]), Math.round(matr[1][1]), Math.round(matr[1][2]), Math.round(matr[1][3])],
                                            [Math.round(matr[2][0]), Math.round(matr[2][1]), Math.round(matr[2][2]), Math.round(matr[2][3])],
                                            [Math.round(matr[3][0]), Math.round(matr[3][1]), Math.round(matr[3][2]), Math.round(matr[3][3])]);
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
         */
        export const rows = (matr: ChalkboardMatrix): number => {
            return matr.length;
        };

        /**
         * Calculates the row space of a matrix.
         * @param {ChalkboardMatrix} matr - The matrix
         * @returns {ChalkboardMatrix}
         */
        export const rowspace = (matr: ChalkboardMatrix): ChalkboardMatrix => {
            return Chalkboard.matr.reduce(matr).filter(function (row: number[]) {
                return row.some(function (element) {
                    return element !== 0;
                });
            });
        };

        /**
         * Initializes a scaling matrix.
         * @param {ChalkboardVector} vect - The coordinates to use represented as a vector
         * @returns {ChalkboardMatrix}
         */
        export const scaler = (vect: ChalkboardVector): ChalkboardMatrix => {
            if (typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "undefined" && typeof vect.w === "undefined") {
                return Chalkboard.matr.init([vect.x, 0], [0, vect.y]);
            } else if (typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "undefined") {
                return Chalkboard.matr.init([vect.x, 0, 0], [0, vect.y, 0], [0, 0, vect.z]);
            } else if (typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "number") {
                return Chalkboard.matr.init([vect.x, 0, 0, 0], [0, vect.y, 0, 0], [0, 0, vect.z, 0], [0, 0, 0, vect.w]);
            } else {
                throw new TypeError('Parameter "vect" must be of type "ChalkboardVector" with 2, 3, or 4 dimensions.');
            }
        };

        /**
         * Calculates the scalar multiplication of a matrix.
         * @param {ChalkboardMatrix} matr - The matrix
         * @param {number} num - The number
         * @returns {ChalkboardMatrix}
         */
        export const scl = (matr: ChalkboardMatrix, num: number): ChalkboardMatrix => {
            if (Chalkboard.matr.rows(matr) === 2 && Chalkboard.matr.cols(matr) === 1) {
                return Chalkboard.matr.init([matr[0][0] * num],
                                            [matr[1][0] * num]);
            } else if (Chalkboard.matr.rows(matr) === 2 && Chalkboard.matr.cols(matr) === 2) {
                return Chalkboard.matr.init([matr[0][0] * num, matr[0][1] * num],
                                            [matr[1][0] * num, matr[1][1] * num]);
            } else if (Chalkboard.matr.rows(matr) === 3 && Chalkboard.matr.cols(matr) === 1) {
                return Chalkboard.matr.init([matr[0][0] * num],
                                            [matr[1][0] * num],
                                            [matr[2][0] * num]);
            } else if (Chalkboard.matr.rows(matr) === 3 && Chalkboard.matr.cols(matr) === 3) {
                return Chalkboard.matr.init([matr[0][0] * num, matr[0][1] * num, matr[0][2] * num],
                                            [matr[1][0] * num, matr[1][1] * num, matr[1][2] * num],
                                            [matr[2][0] * num, matr[2][1] * num, matr[2][2] * num]);
            } else if (Chalkboard.matr.rows(matr) === 4 && Chalkboard.matr.cols(matr) === 1) {
                return Chalkboard.matr.init([matr[0][0] * num],
                                            [matr[1][0] * num],
                                            [matr[2][0] * num],
                                            [matr[3][0] * num]);
            } else if (Chalkboard.matr.rows(matr) === 4 && Chalkboard.matr.cols(matr) === 4) {
                return Chalkboard.matr.init([matr[0][0] * num, matr[0][1] * num, matr[0][2] * num, matr[0][3] * num],
                                            [matr[1][0] * num, matr[1][1] * num, matr[1][2] * num, matr[1][3] * num],
                                            [matr[2][0] * num, matr[2][1] * num, matr[2][2] * num, matr[2][3] * num],
                                            [matr[3][0] * num, matr[3][1] * num, matr[3][2] * num, matr[3][3] * num]);
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
         * Initializes a shift matrix.
         * @param {number} size - The number of rows or columns of the matrix
         * @param {number} shiftAmount - The number of diagonals to shift by, where positive is rightward-shifts and negative is leftward-shifts
         * @returns {ChalkboardMatrix}
         */
        export const shift = (size: number, shiftAmount: number = 1): ChalkboardMatrix => {
            const result = Chalkboard.matr.fill(0, size, size);
            for (let i = 0; i < size; i++) {
                result[i] = [];
                for (let j = 0; j < size; j++) {
                    result[i][j] = Chalkboard.numb.Kronecker(i + shiftAmount, j);
                }
            }
            return result;
        };

        /**
         * Calculates the solution to a system of linear equations defined by a coefficients matrix and a constants matrix.
         * @param {ChalkboardMatrix} matrA - The coefficients matrix
         * @param {ChalkboardMatrix} matrB - The constants matrix
         * @returns {ChalkboardMatrix}
         */
        export const solve = (matrA: ChalkboardMatrix, matrB: ChalkboardMatrix): ChalkboardMatrix => {
            if (Chalkboard.matr.rows(matrA) === Chalkboard.matr.cols(matrA)) {
                if (Chalkboard.matr.rows(matrA) === Chalkboard.matr.rows(matrB)) {
                    if (Chalkboard.matr.det(matrA) !== 0) {
                        return Chalkboard.matr.mul(Chalkboard.matr.invert(matrA), matrB);
                    } else {
                        throw new TypeError('Parameter "matrA" must be of type "ChalkboardMatrix" that is invertible.');
                    }
                } else {
                    throw new TypeError('Parameters "matrA" and "matrB" must be of type "ChalkboardMatrix" with equivalent numbers of rows.');
                }
            } else {
                throw new TypeError('Parameters "matrA" must be of type "ChalkboardMatrix" that is square.');
            }
        };

        /**
         * Calculates the subtraction of two matrices.
         * @param {ChalkboardMatrix} matr1 - The first matrix
         * @param {ChalkboardMatrix} matr2 - The second matrix
         * @returns {ChalkboardMatrix}
         */
        export const sub = (matr1: ChalkboardMatrix, matr2: ChalkboardMatrix): ChalkboardMatrix => {
            if (Chalkboard.matr.rows(matr1) === Chalkboard.matr.rows(matr2) && Chalkboard.matr.cols(matr1) === Chalkboard.matr.cols(matr2)) {
                if (Chalkboard.matr.rows(matr1) === 2 && Chalkboard.matr.cols(matr1) === 2) {
                    return Chalkboard.matr.init([matr1[0][0] - matr2[0][0], matr1[0][1] - matr2[0][1]],
                                                [matr1[1][0] - matr2[1][0], matr1[1][1] - matr2[1][1]]);
                } else if (Chalkboard.matr.rows(matr1) === 3 && Chalkboard.matr.cols(matr1) === 3) {
                    return Chalkboard.matr.init([matr1[0][0] - matr2[0][0], matr1[0][1] - matr2[0][1], matr1[0][2] - matr2[0][2]],
                                                [matr1[1][0] - matr2[1][0], matr1[1][1] - matr2[1][1], matr1[1][2] - matr2[1][2]],
                                                [matr1[2][0] - matr2[2][0], matr1[2][1] - matr2[2][1], matr1[2][2] - matr2[2][2]]);
                } else if (Chalkboard.matr.rows(matr1) === 4 && Chalkboard.matr.cols(matr1) === 4) {
                    return Chalkboard.matr.init([matr1[0][0] - matr2[0][0], matr1[0][1] - matr2[0][1], matr1[0][2] - matr2[0][2], matr1[0][3] - matr2[0][3]],
                                                [matr1[1][0] - matr2[1][0], matr1[1][1] - matr2[1][1], matr1[1][2] - matr2[1][2], matr1[1][3] - matr2[1][3]],
                                                [matr1[2][0] - matr2[2][0], matr1[2][1] - matr2[2][1], matr1[2][2] - matr2[2][2], matr1[2][3] - matr2[2][3]],
                                                [matr1[3][0] - matr2[3][0], matr1[3][1] - matr2[3][1], matr1[3][2] - matr2[3][2], matr1[3][3] - matr2[3][3]]);
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
                throw new TypeError('Parameters "matr1" and "matr2" must be of type "ChalkboardMatrix" with equivalent numbers of rows and columns.');
            }
        };

        /**
         * Converts a matrix to an array.
         * @param {ChalkboardMatrix} matr - The matrix
         * @returns {number[]}
         */
        export const toArray = (matr: ChalkboardMatrix): number[] => {
            if (Chalkboard.matr.rows(matr) === 2 && Chalkboard.matr.cols(matr) === 2) {
                return [matr[0][0], matr[0][1], matr[1][0], matr[1][1]];
            } else if (Chalkboard.matr.rows(matr) === 3 && Chalkboard.matr.cols(matr) === 3) {
                return [matr[0][0], matr[0][1], matr[0][2], matr[1][0], matr[1][1], matr[1][2], matr[2][0], matr[2][1], matr[2][2]];
            } else if (Chalkboard.matr.rows(matr) === 4 && Chalkboard.matr.cols(matr) === 4) {
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
         */
        export const toObject = (matr: ChalkboardMatrix): object => {
            if (Chalkboard.matr.rows(matr) === 2 && Chalkboard.matr.cols(matr) === 2) {
                return {
                    i1: { j1: matr[0][0], j2: matr[0][1] },
                    i2: { j1: matr[1][0], j2: matr[1][1] }
                };
            } else if (Chalkboard.matr.rows(matr) === 3 && Chalkboard.matr.cols(matr) === 3) {
                return {
                    i1: { j1: matr[0][0], j2: matr[0][1], j3: matr[0][2] },
                    i2: { j1: matr[1][0], j2: matr[1][1], j3: matr[1][2] },
                    i3: { j1: matr[2][0], j2: matr[2][1], j3: matr[2][2] }
                };
            } else if (Chalkboard.matr.rows(matr) === 4 && Chalkboard.matr.cols(matr) === 4) {
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
         * Converts a matrix to a string.
         * @param {ChalkboardMatrix} matr - The matrix
         * @returns {string}
         */
        export const toString = (matr: ChalkboardMatrix): string => {
            if (Chalkboard.matr.rows(matr) === 2 && Chalkboard.matr.cols(matr) === 2) {
                return "[ " + matr[0][0].toString() + " " + matr[0][1].toString() + " ]\n[ " + matr[1][0].toString() + " " + matr[1][1].toString() + " ]";
            } else if (Chalkboard.matr.rows(matr) === 3 && Chalkboard.matr.cols(matr) === 3) {
                return "[ " + matr[0][0].toString() + " " + matr[0][1].toString() + " " + matr[0][2].toString() + " ]\n[ " + matr[1][0].toString() + " " + matr[1][1].toString() + " " + matr[1][2].toString() + " ]\n[ " + matr[2][0].toString() + " " + matr[2][1].toString() + " " + matr[2][2].toString() + " ]";
            } else if (Chalkboard.matr.rows(matr) === 4 && Chalkboard.matr.cols(matr) === 4) {
                return "[ " + matr[0][0].toString() + " " + matr[0][1].toString() + " " + matr[0][2].toString() + " " + matr[0][3].toString() + " ]\n[ " + matr[1][0].toString() + " " + matr[1][1].toString() + " " + matr[1][2].toString() + " " + matr[1][3].toString() + " ]\n[ " + matr[2][0].toString() + " " + matr[2][1].toString() + " " + matr[2][2].toString() + " " + matr[2][3].toString() + " ]\n[ " + matr[3][0].toString() + " " + matr[3][1].toString() + " " + matr[3][2].toString() + " " + matr[3][3].toString() + " ]";
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
         */
        export const toTensor = (matr: ChalkboardMatrix, ...size: number[]): ChalkboardTensor => {
            size = Array.isArray(size[0]) ? size[0] : size;
            return Chalkboard.tens.resize(matr, ...size);
        };

        /**
         * Converts a matrix to a vector.
         * @param {ChalkboardMatrix} matr - The matrix
         * @param {number} dimension - The dimension of the vector which can be either 2, 3, or 4
         * @param {"col" | "row"} [type="col"] - Whether the converted vector will be from the row or the column of the matrix
         * @param {number} [rowORcol=1] - The row or column number to convert
         * @returns {ChalkboardVector}
         */
        export const toVector = (matr: ChalkboardMatrix, dimension: 2 | 3 | 4, type: "col" | "row" = "col", rowORcol: number = 1): ChalkboardVector => {
            rowORcol -= 1;
            if (dimension === 2) {
                if (type === "col") {
                    return Chalkboard.vect.init(matr[0][rowORcol], matr[1][rowORcol]);
                } else if (type === "row") {
                    return Chalkboard.vect.init(matr[rowORcol][0], matr[rowORcol][1]);
                } else {
                    throw new TypeError('Parameter "type" must be "col" or "row".');
                }
            } else if (dimension === 3) {
                if (type === "col") {
                    return Chalkboard.vect.init(matr[0][rowORcol], matr[1][rowORcol], matr[2][rowORcol]);
                } else if (type === "row") {
                    return Chalkboard.vect.init(matr[rowORcol][0], matr[rowORcol][1], matr[rowORcol][2]);
                } else {
                    throw new TypeError('Parameter "type" must be "col" or "row".');
                }
            } else if (dimension === 4) {
                if (type === "col") {
                    return Chalkboard.vect.init(matr[0][rowORcol], matr[1][rowORcol], matr[2][rowORcol], matr[3][rowORcol]);
                } else if (type === "row") {
                    return Chalkboard.vect.init(matr[rowORcol][0], matr[rowORcol][1], matr[rowORcol][2], matr[rowORcol][3]);
                } else {
                    throw new TypeError('Parameter "type" must be "col" or "row".');
                }
            } else {
                throw new TypeError('Parameter "vect" must be of type "ChalkboardVector" with 2, 3, or 4 dimensions.');
            }
        };

        /**
         * Calculates the trace of a matrix.
         * @param {ChalkboardMatrix} matr - The matrix
         * @returns {number}
         */
        export const trace = (matr: ChalkboardMatrix): number => {
            if (Chalkboard.matr.rows(matr) === Chalkboard.matr.cols(matr)) {
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
                throw new TypeError('Parameter "matr" must be of type "ChalkboardMatrix" that is square.');
            }
        };

        /**
         * Calculates the transpose of a matrix.
         * @param {ChalkboardMatrix} matr - The matrix
         * @returns {ChalkboardMatrix}
         */
        export const transpose = (matr: ChalkboardMatrix): ChalkboardMatrix => {
            if (Chalkboard.matr.rows(matr) === 2 && Chalkboard.matr.cols(matr) === 2) {
                return Chalkboard.matr.init([matr[0][0], matr[1][0]],
                                            [matr[0][1], matr[1][1]]);
            } else if (Chalkboard.matr.rows(matr) === 3 && Chalkboard.matr.cols(matr) === 3) {
                return Chalkboard.matr.init([matr[0][0], matr[1][0], matr[2][0]],
                                            [matr[0][1], matr[1][1], matr[2][1]],
                                            [matr[0][2], matr[1][2], matr[2][2]]);
            } else if (Chalkboard.matr.rows(matr) === 4 && Chalkboard.matr.cols(matr) === 4) {
                return Chalkboard.matr.init([matr[0][0], matr[1][0], matr[2][0], matr[3][0]],
                                            [matr[0][1], matr[1][1], matr[2][1], matr[3][1]],
                                            [matr[0][2], matr[1][2], matr[2][2], matr[3][2]],
                                            [matr[0][3], matr[1][3], matr[2][3], matr[3][3]]);
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
         */
        export const translator = (vect: ChalkboardVector): ChalkboardMatrix => {
            if (typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "undefined" && typeof vect.w === "undefined") {
                return Chalkboard.matr.init([1, 0, vect.x], [0, 1, vect.y], [0, 0, 1]);
            } else if (typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "undefined") {
                return Chalkboard.matr.init([1, 0, 0, vect.x], [0, 1, 0, vect.y], [0, 0, 1, vect.z], [0, 0, 0, 1]);
            } else if (typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "number") {
                return Chalkboard.matr.init([1, 0, 0, 0, vect.x], [0, 1, 0, 0, vect.y], [0, 0, 1, 0, vect.z], [0, 0, 0, 1, vect.w], [0, 0, 0, 0, 1]);
            } else {
                throw new TypeError('Parameter "vect" must be of type "ChalkboardVector" with 2, 3, or 4 dimensions.');
            }
        };

        /**
         * Initializes an upper triangular matrix.
         * @param {number} size - The number of rows or columns
         * @param {number[]} elements - The elements on and above the main diagonal
         * @returns {ChalkboardMatrix}
         */
        export const upperTriangular = (size: number, ...elements: number[]): ChalkboardMatrix => {
            if (size === 2) {
                return Chalkboard.matr.init([elements[0], elements[1]],
                                            [0, elements[2]]);
            } else if (size === 3) {
                return Chalkboard.matr.init([elements[0], elements[1], elements[2]],
                                            [0, elements[3], elements[4]],
                                            [0, 0, elements[5]]);
            } else if (size === 4) {
                return Chalkboard.matr.init([elements[0], elements[1], elements[2], elements[3]],
                                            [0, elements[4], elements[5], elements[6]],
                                            [0, 0, elements[7], elements[8]],
                                            [0, 0, 0, elements[9]]);
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
         * Calculates a matrix multiplied by zero.
         * @param {ChalkboardMatrix} matr - The matrix
         * @returns {ChalkboardMatrix}
         */
        export const zero = (matr: ChalkboardMatrix): ChalkboardMatrix => {
            if (Chalkboard.matr.rows(matr) === 2 && Chalkboard.matr.cols(matr) === 2) {
                return Chalkboard.matr.init([matr[0][0] * 0, matr[0][1] * 0],
                                            [matr[1][0] * 0, matr[1][1] * 0]);
            } else if (Chalkboard.matr.rows(matr) === 3 && Chalkboard.matr.cols(matr) === 3) {
                return Chalkboard.matr.init([matr[0][0] * 0, matr[0][1] * 0, matr[0][2] * 0],
                                            [matr[1][0] * 0, matr[1][1] * 0, matr[1][2] * 0],
                                            [matr[2][0] * 0, matr[2][1] * 0, matr[2][2] * 0]);
            } else if (Chalkboard.matr.rows(matr) === 4 && Chalkboard.matr.cols(matr) === 4) {
                return Chalkboard.matr.init([matr[0][0] * 0, matr[0][1] * 0, matr[0][2] * 0, matr[0][3] * 0],
                                            [matr[1][0] * 0, matr[1][1] * 0, matr[1][2] * 0, matr[1][3] * 0],
                                            [matr[2][0] * 0, matr[2][1] * 0, matr[2][2] * 0, matr[2][3] * 0],
                                            [matr[3][0] * 0, matr[3][1] * 0, matr[3][2] * 0, matr[3][3] * 0]);
            } else {
                const result = Chalkboard.matr.init();
                for (let i = 0; i < Chalkboard.matr.rows(matr); i++) {
                    result[i] = [];
                    for (let j = 0; j < Chalkboard.matr.cols(matr); j++) {
                        result[i][j] = matr[i][j] * 0;
                    }
                }
                return result;
            }
        };
    }
}
