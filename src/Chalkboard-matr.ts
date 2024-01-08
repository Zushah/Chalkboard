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
            const result = Chalkboard.matr.init();
            for (let i = 0; i < Chalkboard.matr.rows(matr); i++) {
                result[i] = [];
                for (let j = 0; j < Chalkboard.matr.cols(matr); j++) {
                    result[i][j] = Math.abs(matr[i][j]);
                }
            }
            return result;
        };

        /**
         * Calculates the addition of two matrices.
         * @param {ChalkboardMatrix} matr1 - The first matrix
         * @param {ChalkboardMatrix} matr2 - The second matrix
         * @returns {ChalkboardMatrix}
         */
        export const add = (matr1: ChalkboardMatrix, matr2: ChalkboardMatrix): ChalkboardMatrix => {
            if (Chalkboard.matr.rows(matr1) === Chalkboard.matr.rows(matr2) && Chalkboard.matr.cols(matr1) === Chalkboard.matr.cols(matr2)) {
                const result = Chalkboard.matr.init();
                for (let i = 0; i < Chalkboard.matr.rows(matr1); i++) {
                    result[i] = [];
                    for (let j = 0; j < Chalkboard.matr.cols(matr1); j++) {
                        result[i][j] = matr1[i][j] + matr2[i][j];
                    }
                }
                return result;
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
                if (Chalkboard.matr.rows(matr1) === Chalkboard.matr.rows(matr2)) {
                    return Chalkboard.matr.init(matr1.concat(matr2));
                } else {
                    throw new TypeError('Parameters "matr1" and "matr2" must be of type "ChalkboardMatrix" with equivalent numbers of rows.');
                }
            } else if (type === "col") {
                if (Chalkboard.matr.cols(matr1) === Chalkboard.matr.cols(matr2)) {
                    const result = Chalkboard.matr.init();
                    for (let i = 0; i < Chalkboard.matr.rows(matr1); i++) {
                        result.push(matr1[i].concat(matr2[i]));
                    }
                    return result;
                } else {
                    throw new TypeError('Parameters "matr1" and "matr2" must be of type "ChalkboardMatrix" with equivalent numbers of columns.');
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
            const result = Chalkboard.matr.init();
            for (let i = 0; i < Chalkboard.matr.rows(matr); i++) {
                result[i] = [];
                for (let j = 0; j < Chalkboard.matr.cols(matr); j++) {
                    result[i][j] = Chalkboard.numb.constrain(matr[i][j], range);
                }
            }
            return result;
        };

        /**
         * Copies a matrix.
         * @param {ChalkboardMatrix} matr - The matrix
         * @returns {ChalkboardMatrix}
         */
        export const copy = (matr: ChalkboardMatrix): ChalkboardMatrix => {
            const result = Chalkboard.matr.init();
            for (let i = 0; i < Chalkboard.matr.rows(matr); i++) {
                result.push([]);
                for (let j = 0; j < Chalkboard.matr.cols(matr); j++) {
                    result[i].push(matr[i][j]);
                }
            }
            return result;
        };

        /**
         * Calculates the determinant of a matrix.
         * @param {ChalkboardMatrix} matr - The matrix
         * @returns {number}
         */
        export const det = (matr: ChalkboardMatrix): number => {
            if (Chalkboard.matr.rows(matr) === Chalkboard.matr.cols(matr)) {
                let result = 0;
                if (Chalkboard.matr.rows(matr) === 1) {
                    return matr[0][0];
                } else if (Chalkboard.matr.rows(matr) === 2) {
                    return matr[0][0] * matr[1][1] - matr[0][1] * matr[1][0];
                } else {
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
         * Initializes an empty matrix.
         * @param {number} rows - The number of rows
         * @param {number} cols - The number of columns
         * @returns {ChalkboardMatrix}
         */
        export const empty = (rows: number, cols: number = rows): ChalkboardMatrix => {
            const result = Chalkboard.matr.init();
            for (let i = 0; i < rows; i++) {
                result.push([]);
                for (let j = 0; j < cols; j++) {
                    result[i].push(null as unknown as number);
                }
            }
            return result;
        };

        /**
         * Initializes an exchange matrix.
         * @param {number} size - The number of rows or columns of the matrix
         * @returns {ChalkboardMatrix}
         */
        export const exchange = (size: number): ChalkboardMatrix => {
            const result = Chalkboard.matr.fill(0, size, size);
            for (let i = 0; i < size; i++) {
                for (let j = 0; j < size; j++) {
                    if (i + j === size - 1) {
                        result[i][j] = 1;
                    }
                }
            }
            return result;
        };

        /**
         * Initializes a matrix filled with one number.
         * @param {number} element - The numberto fill the elements with
         * @param {number} rows - The number of rows
         * @param {number} cols - The number of columns
         * @returns {ChalkboardMatrix}
         */
        export const fill = (element: number, rows: number, cols: number = rows): ChalkboardMatrix => {
            const result = Chalkboard.matr.init();
            for (let i = 0; i < rows; i++) {
                result.push([]);
                for (let j = 0; j < cols; j++) {
                    result[i].push(element);
                }
            }
            return result;
        };

        /**
         * Initializes a Hilbert matrix.
         * @param {number} size - The number of rows or columns of the matrix
         * @returns {ChalkboardMatrix}
         */
        export const Hilbert = (size: number): ChalkboardMatrix => {
            const result = Chalkboard.matr.init();
            for (let i = 0; i < size; i++) {
                result.push([]);
                for (let j = 0; j < size; j++) {
                    result[i].push(1 / (i + j + 1));
                }
            }
            return result;
        };

        /**
         * Initializes an identity matrix.
         * @param {number} size - The number of rows or columns of the matrix
         * @returns {ChalkboardMatrix}
         */
        export const identity = (size: number): ChalkboardMatrix => {
            const result = Chalkboard.matr.init();
            for (let i = 0; i < size; i++) {
                result.push(Array(size).fill(0));
                result[i][i] = 1;
            }
            return result;
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
            } else {
                throw new TypeError('Parameter "matr" must be of type "ChalkboardMatrix" that is square.');
            }
        };

        /**
         * Initializes a Lehmer matrix.
         * @param {number} size - The number of rows or columns of the matrix
         * @returns {ChalkboardMatrix}
         */
        export const Lehmer = (size: number): ChalkboardMatrix => {
            const result = Chalkboard.matr.init();
            for (let i = 0; i < size; i++) {
                result.push([]);
                for (let j = 0; j < size; j++) {
                    result[i].push(Math.min(i + 1, j + 1) / Math.max(i + 1, j + 1));
                }
            }
            return result;
        };

        /**
         * Calculates the LU decomposition of a matrix.
         * @param {ChalkboardMatrix} matr - The matrix
         * @returns {{L: ChalkboardMatrix, U: ChalkboardMatrix}}
         */
        export const LUdecomp = (matr: ChalkboardMatrix): { L: ChalkboardMatrix; U: ChalkboardMatrix } => {
            if (Chalkboard.matr.rows(matr) === Chalkboard.matr.cols(matr)) {
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
            const result = Chalkboard.matr.init();
            for (let i = 0; i < Chalkboard.matr.rows(matr); i++) {
                result[i] = [];
                for (let j = 0; j < Chalkboard.matr.cols(matr); j++) {
                    result[i][j] = -matr[i][j];
                }
            }
            return result;
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
         * @param {number} inf - The lower bound
         * @param {number} sup - The upper bound
         * @param {number} rows - The number of rows
         * @param {number} cols - The number of columns
         * @returns {ChalkboardMatrix}
         */
        export const random = (inf: number, sup: number, rows: number, cols: number = rows): ChalkboardMatrix => {
            const result = Chalkboard.matr.init();
            for (let i = 0; i < rows; i++) {
                result.push([]);
                for (let j = 0; j < cols; j++) {
                    result[i].push(Chalkboard.numb.random(inf, sup));
                }
            }
            return result;
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
            const result = Chalkboard.matr.init();
            for (let i = 0; i < Chalkboard.matr.rows(matr); i++) {
                result[i] = [];
                for (let j = 0; j < Chalkboard.matr.cols(matr); j++) {
                    result[i][j] = 1 / matr[i][j];
                }
            }
            return result;
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
         * @param {nmber} cols - The number of columns to change to
         * @returns {ChalkboardMatrix}
         */
        export const resize = (matr: ChalkboardMatrix, rows: number, cols: number): ChalkboardMatrix => {
            if (cols === undefined) {
                cols = rows;
            }
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
            const result = Chalkboard.matr.init();
            for (let i = 0; i < Chalkboard.matr.rows(matr); i++) {
                result[i] = [];
                for (let j = 0; j < Chalkboard.matr.cols(matr); j++) {
                    result[i][j] = Math.round(matr[i][j]);
                }
            }
            return result;
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
            const result = Chalkboard.matr.init();
            for (let i = 0; i < Chalkboard.matr.rows(matr); i++) {
                result[i] = [];
                for (let j = 0; j < Chalkboard.matr.cols(matr); j++) {
                    result[i][j] = matr[i][j] * num;
                }
            }
            return result;
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
                const result = Chalkboard.matr.init();
                for (let i = 0; i < Chalkboard.matr.rows(matr1); i++) {
                    result[i] = [];
                    for (let j = 0; j < Chalkboard.matr.cols(matr1); j++) {
                        result[i][j] = matr1[i][j] - matr2[i][j];
                    }
                }
                return result;
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
            const result = [];
            for (let i = 0; i < Chalkboard.matr.rows(matr); i++) {
                for (let j = 0; j < Chalkboard.matr.cols(matr); j++) {
                    result.push(matr[i][j]);
                }
            }
            return result;
        };

        /**
         * Converts a matrix to an object.
         * @param {ChalkboardMatrix} matr - The matrix
         * @returns {object}
         */
        export const toObject = (matr: ChalkboardMatrix): object => {
            const result: { [key: string]: { [key: string]: number } } = {};
            for (let i = 0; i < Chalkboard.matr.rows(matr); i++) {
                result["i" + (i + 1)] = {};
                for (let j = 0; j < Chalkboard.matr.cols(matr); j++) {
                    result["i" + (i + 1)]["j" + (j + 1)] = matr[i][j];
                }
            }
            return result;
        };

        /**
         * Converts a matrix to a string.
         * @param {ChalkboardMatrix} matr - The matrix
         * @returns {string}
         */
        export const toString = (matr: ChalkboardMatrix): string => {
            let result = "";
            for (let i = 0; i < Chalkboard.matr.rows(matr); i++) {
                result += "[ ";
                for (let j = 0; j < Chalkboard.matr.cols(matr); j++) {
                    result += matr[i][j].toString() + " ";
                }
                result = result.trimEnd() + " ]\n";
            }
            return result;
        };

        /**
         * Converts a matrix to a tensor.
         * @param {ChalkboardMatrix} matr - The matrix
         * @param {number[]} size - The number of rows, columns, tubes, etc. of the tensor represented as a single array or a sequence of arguments
         * @returns {ChalkboardTensor}
         */
        export const toTensor = (matr: ChalkboardMatrix, ...size: number[]): ChalkboardTensor => {
            if (Array.isArray(size[0])) {
                size = size[0];
            }
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
                let result = 0;
                for (let i = 0; i < Chalkboard.matr.rows(matr); i++) {
                    result += matr[i][i];
                }
                return result;
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
            const result = Chalkboard.matr.init();
            for (let i = 0; i < Chalkboard.matr.cols(matr); i++) {
                result[i] = [];
                for (let j = 0; j < Chalkboard.matr.rows(matr); j++) {
                    result[i][j] = matr[j][i];
                }
            }
            return result;
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
         * Calculates a matrix multiplied by zero.
         * @param {ChalkboardMatrix} matr - The matrix
         * @returns {ChalkboardMatrix}
         */
        export const zero = (matr: ChalkboardMatrix): ChalkboardMatrix => {
            const result = Chalkboard.matr.init();
            for (let i = 0; i < Chalkboard.matr.rows(matr); i++) {
                result[i] = [];
                for (let j = 0; j < Chalkboard.matr.cols(matr); j++) {
                    result[i][j] = matr[i][j] * 0;
                }
            }
            return result;
        };
    }
}
