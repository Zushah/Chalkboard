/*
    The Chalkboard Library - Matrix Namespace
    Version 1.7.0 Descartes
*/
/// <reference path="Chalkboard.ts"/>
namespace Chalkboard {
    export namespace matr {
        export const _new = (...matrix: number[][] | number[][][]): ChalkboardMatrix => {
            if(matrix.length === 0) {
                return [];
            } else if(Array.isArray(matrix[0]) && Array.isArray(matrix[0][0])) {
                return (matrix as number[][][])[0];
            } else {
                return matrix as number[][];
            }
        }
        export const absolute = (matr: ChalkboardMatrix): ChalkboardMatrix => {
            let result = Chalkboard.matr._new();
            for(let i = 0; i < Chalkboard.matr.rows(matr); i++) {
                result[i] = [];
                for(let j = 0; j < Chalkboard.matr.cols(matr); j++) {
                    result[i][j] = Math.abs(matr[i][j]);
                }
            }
            return result;
        }
        export const add = (matr_1: ChalkboardMatrix, matr_2: ChalkboardMatrix): ChalkboardMatrix => {
            if(Chalkboard.matr.rows(matr_1) === Chalkboard.matr.rows(matr_2) && Chalkboard.matr.cols(matr_1) === Chalkboard.matr.cols(matr_2)) {
                let result = Chalkboard.matr._new();
                for(let i = 0; i < Chalkboard.matr.rows(matr_1); i++) {
                    result[i] = [];
                    for(let j = 0; j < Chalkboard.matr.cols(matr_1); j++) {
                        result[i][j] = matr_1[i][j] + matr_2[i][j];
                    }
                }
                return result;
            } else {
                throw new TypeError("Parameters \"matr_1\" and \"matr_2\" must be of type \"ChalkboardMatrix\" with equivalent numbers of rows and columns.");
            }
        }
        export const addKronecker = (matr_1: ChalkboardMatrix, matr_2: ChalkboardMatrix): ChalkboardMatrix => {
            if(Chalkboard.matr.rows(matr_1) === Chalkboard.matr.cols(matr_1) && Chalkboard.matr.rows(matr_2) === Chalkboard.matr.cols(matr_2)) {
                return Chalkboard.matr.add(Chalkboard.matr.mulKronecker(matr_1, Chalkboard.matr.identity(Chalkboard.matr.rows(matr_1))), Chalkboard.matr.mulKronecker(Chalkboard.matr.identity(Chalkboard.matr.rows(matr_2)), matr_2));
            } else {
                throw new TypeError("Parameters \"matr_1\" and \"matr_2\" must be of type \"ChalkboardMatrix\" that are square.");
            }
        }
        export const adjugate = (matr: ChalkboardMatrix, row: number, col: number): ChalkboardMatrix => {
            return Chalkboard.matr.transpose(Chalkboard.matr.cofactor(matr, row, col));
        }
        export const binomial = (size: number, type: "lower" | "upper" | "symmetric" = "lower"): ChalkboardMatrix => {
            let result = Chalkboard.matr._new();
            for(let i = 0; i < size; i++) {
                result.push([]);
                for(let j = 0; j < size; j++) {
                    if(type === "lower") {
                        result[i].push(Chalkboard.numb.binomial(i, j));
                    } else if(type === "upper") {
                        result[i].push(Chalkboard.numb.binomial(j, i));
                    }
                }
            }
            if(type === "symmetric") {
                return Chalkboard.matr.mul(Chalkboard.matr.binomial(size, "lower"), Chalkboard.matr.binomial(size, "upper"));
            } else {
                return result;
            }
        }
        export const cofactor = (matr: ChalkboardMatrix, row: number, col: number): ChalkboardMatrix => {
            return matr.slice(0, row - 1).concat(matr.slice(row)).map(function(row) {
                return row.slice(0, col - 1).concat(row.slice(col));
            });
        }
        export const cols = (matr: ChalkboardMatrix): number => {
            return matr[0].length;
        }
        export const colspace = (matr: ChalkboardMatrix): ChalkboardMatrix => {
            return Chalkboard.matr.transpose(Chalkboard.matr.rowspace(Chalkboard.matr.transpose(matr)));
        }
        export const concat = (matr_1: ChalkboardMatrix, matr_2: ChalkboardMatrix, type: "row" | "col" = "row"): ChalkboardMatrix => {
            if(type === "row") {
                if(Chalkboard.matr.rows(matr_1) === Chalkboard.matr.rows(matr_2)) {
                    return Chalkboard.matr._new(matr_1.concat(matr_2));
                } else {
                    throw new TypeError("Parameters \"matr_1\" and \"matr_2\" must be of type \"ChalkboardMatrix\" with equivalent numbers of rows.");
                }
            } else if(type === "col") {
                if(Chalkboard.matr.cols(matr_1) === Chalkboard.matr.cols(matr_2)) {
                    let result = Chalkboard.matr._new();
                    for(let i = 0; i < Chalkboard.matr.rows(matr_1); i++) {
                        result.push(matr_1[i].concat(matr_2[i]));
                    }
                    return result;
                } else {
                    throw new TypeError("Parameters \"matr_1\" and \"matr_2\" must be of type \"ChalkboardMatrix\" with equivalent numbers of columns.");
                }
            } else {
                throw new TypeError("Parameter \"type\" must be \"row\" or \"col\".");
            }
        }
        export const constrain = (matr: ChalkboardMatrix, range: [number, number] = [0, 1]): ChalkboardMatrix => {
            let result = Chalkboard.matr._new();
            for(let i = 0; i < Chalkboard.matr.rows(matr); i++) {
                result[i] = [];
                for(let j = 0; j < Chalkboard.matr.cols(matr); j++) {
                    result[i][j] = Chalkboard.numb.constrain(matr[i][j], range);
                }
            }
            return result;
        }
        export const copy = (matr: ChalkboardMatrix): ChalkboardMatrix => {
            let result = Chalkboard.matr._new();
            for(let i = 0; i < Chalkboard.matr.rows(matr); i++) {
                result.push([]);
                for(let j = 0; j < Chalkboard.matr.cols(matr); j++) {
                    result[i].push(matr[i][j]);
                }
            }
            return result;
        }
        export const det = (matr: ChalkboardMatrix): number => {
            if(Chalkboard.matr.rows(matr) === Chalkboard.matr.cols(matr)) {
                let result = 0;
                if(Chalkboard.matr.rows(matr) === 1) {
                    return matr[0][0];
                } else if(Chalkboard.matr.rows(matr) === 2) {
                    return (matr[0][0] * matr[1][1]) - (matr[0][1] * matr[1][0]);
                } else {
                    for(let i = 0; i < Chalkboard.matr.rows(matr); i++) {
                        let cofactor = matr[0][i] * Chalkboard.matr.det(Chalkboard.matr.cofactor(matr, 1, i + 1));
                        result += i % 2 === 0 ? cofactor : -cofactor;
                    }
                    return result;
                }
            } else {
                throw new TypeError("Parameter \"matr\" must be of type \"ChalkboardMatrix\" that is square.");
            }
        }
        export const empty = (rows: number, cols: number = rows): ChalkboardMatrix => {
            let result = Chalkboard.matr._new();
            for(let i = 0; i < rows; i++) {
                result.push([]);
                for(let j = 0; j < cols; j++) {
                    result[i].push(null as unknown as number);
                }
            }
            return result;
        }
        export const exchange = (size: number): ChalkboardMatrix => {
            let result = Chalkboard.matr.fill(0, size, size);
            for(let i = 0; i < size; i++) {
                for(let j = 0; j < size; j++) {
                    if(i + j === size - 1) {
                        result[i][j] = 1;
                    }
                }
            }
            return result;
        }
        export const fill = (element: number, rows: number, cols: number = rows): ChalkboardMatrix => {
            let result = Chalkboard.matr._new();
            for(let i = 0; i < rows; i++) {
                result.push([]);
                for(let j = 0; j < cols; j++) {
                    result[i].push(element);
                }
            }
            return result;
        }
        export const Hilbert = (size: number): ChalkboardMatrix => {
            let result = Chalkboard.matr._new();
            for(let i = 0; i < size; i++) {
                result.push([]);
                for(let j = 0; j < size; j++) {
                    result[i].push(1 / (i + j + 1));
                }
            }
            return result;
        }
        export const identity = (size: number): ChalkboardMatrix => {
            let result = Chalkboard.matr._new();
            for(let i = 0; i < size; i++) {
                result.push(Array(size).fill(0));
                result[i][i] = 1;
            }
            return result;
        }
        export const invert = (matr: ChalkboardMatrix): ChalkboardMatrix => {
            if(Chalkboard.matr.rows(matr) === Chalkboard.matr.cols(matr)) {
                let result = Chalkboard.matr._new();
                let augmented = Chalkboard.matr._new();
                for(let i = 0; i < Chalkboard.matr.rows(matr); i++) {
                    augmented.push(matr[i].concat(Array(Chalkboard.matr.rows(matr)).fill(0)));
                    augmented[i][Chalkboard.matr.cols(matr) + i] = 1;
                }
                for(let row = 0; row < Chalkboard.matr.rows(matr); row++) {
                    let diagonal = augmented[row][row];
                    if(diagonal === 0) {
                        let max = row;
                        for(let i = row + 1; i < Chalkboard.matr.rows(matr); i++) {
                            if(Math.abs(augmented[i][row]) > Math.abs(augmented[max][row])) {
                                max = i;
                            }
                        }
                        let temp = augmented[row];
                        augmented[row] = augmented[max];
                        augmented[max] = temp;
                        diagonal = augmented[row][row];
                    }
                    for(let col = 0; col < 2 * Chalkboard.matr.cols(matr); col++) {
                        augmented[row][col] /= diagonal;
                    }
                    for(let i = 0; i < Chalkboard.matr.rows(matr); i++) {
                        if(i !== row) {
                            let coeff = augmented[i][row];
                            for(let j = 0; j < 2 * Chalkboard.matr.cols(matr); j++) {
                                augmented[i][j] -= coeff * augmented[row][j];
                            }
                        }
                    }
                }
                for(let i = 0; i < Chalkboard.matr.rows(matr); i++) {
                    result.push(augmented[i].slice(Chalkboard.matr.cols(matr), 2 * Chalkboard.matr.cols(matr)));
                }
                return result;
            } else {
                throw new TypeError("Parameter \"matr\" must be of type \"ChalkboardMatrix\" that is square.");
            }
        }
        export const Lehmer = (size: number): ChalkboardMatrix => {
            let result = Chalkboard.matr._new();
            for(let i = 0; i < size; i++) {
                result.push([]);
                for(let j = 0; j < size; j++) {
                    result[i].push(Math.min(i + 1, j + 1) / Math.max(i + 1, j + 1));
                }
            }
            return result;
        }
        export const LUdecomp = (matr: ChalkboardMatrix): {L: ChalkboardMatrix, U: ChalkboardMatrix} => {
            if(Chalkboard.matr.rows(matr) === Chalkboard.matr.cols(matr)) {
                let L = Chalkboard.matr.identity(Chalkboard.matr.rows(matr)),
                    U = Chalkboard.matr.fill(0, Chalkboard.matr.rows(matr));
                for(let j = 0; j < Chalkboard.matr.cols(matr); j++) {
                    for(let i = 0; i <= j; i++) {
                        let sum = 0;
                        for(let k = 0; k < i; k++) {
                            sum += L[i][k] * U[k][j];
                        }
                        U[i][j] = matr[i][j] - sum;
                    }
                    for(let i = j + 1; i < Chalkboard.matr.rows(matr); i++) {
                        let sum = 0;
                        for(let k = 0; k < j; k++) {
                            sum += L[i][k] * U[k][j];
                        }
                        L[i][j] = (matr[i][j] - sum) / U[j][j];
                    }
                }
                return {L: L, U: U};
            } else {
                throw new TypeError("Parameter \"matr\" must be of type \"ChalkboardMatrix\" that is square.");
            }
        }
        export const mul = (matr_1: ChalkboardMatrix, matr_2: ChalkboardMatrix): ChalkboardMatrix => {
            if(Chalkboard.matr.cols(matr_1) === Chalkboard.matr.rows(matr_2)) {
                let result = Chalkboard.matr._new();
                for(let i = 0; i < Chalkboard.matr.rows(matr_1); i++) {
                    result[i] = [];
                    for(let j = 0; j < Chalkboard.matr.cols(matr_2); j++) {
                        result[i][j] = 0;
                        for(let k = 0; k < Chalkboard.matr.cols(matr_1); k++) {
                            result[i][j] += matr_1[i][k] * matr_2[k][j];
                        }
                    }
                }
                return result;
            } else {
                throw new TypeError("Parameters \"matr_1\" and \"matr_2\" must be of type \"ChalkboardMatrix\" where the numbers of columns of \"matr_1\" must be equivalent to the number of rows of \"matr_2\".");
            }
        }
        export const mulKronecker = (matr_1: ChalkboardMatrix, matr_2: ChalkboardMatrix): ChalkboardMatrix => {
            let result = Chalkboard.matr._new();
            for(let i = 0; i < Chalkboard.matr.rows(matr_1); i++) {
                for(let j = 0; j < Chalkboard.matr.cols(matr_1); j++) {
                    for(let k = 0; k < Chalkboard.matr.rows(matr_2); k++) {
                        for(let l = 0; l < Chalkboard.matr.cols(matr_2); l++) {
                            if(!result[i * Chalkboard.matr.rows(matr_2) + k]) {
                                result[i * Chalkboard.matr.rows(matr_2) + k] = [];
                            }
                            result[i * Chalkboard.matr.rows(matr_2) + k][j * Chalkboard.matr.cols(matr_2) + l] = matr_1[i][j] * matr_2[k][l];
                        }
                    }
                }
            }
            return result;
        }
        export const mulVector = (matr: ChalkboardMatrix, vect: ChalkboardVector): ChalkboardMatrix | ChalkboardVector => {
            if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "undefined" && typeof vect.w === "undefined") {
                if(Chalkboard.matr.rows(matr) === 2) {
                    return Chalkboard.matr.toVector(Chalkboard.matr.mul(matr, Chalkboard.vect.toMatrix(vect)), 2);
                } else {
                    return Chalkboard.matr.mul(matr, Chalkboard.vect.toMatrix(vect));
                }
            } else if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "undefined") {
                if(Chalkboard.matr.rows(matr) === 3) {
                    return Chalkboard.matr.toVector(Chalkboard.matr.mul(matr, Chalkboard.vect.toMatrix(vect)), 3);
                } else {
                    return Chalkboard.matr.mul(matr, Chalkboard.vect.toMatrix(vect));
                }
            } else if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "number") {
                if(Chalkboard.matr.rows(matr) === 4) {
                    return Chalkboard.matr.toVector(Chalkboard.matr.mul(matr, Chalkboard.vect.toMatrix(vect)), 4);
                } else {
                    return Chalkboard.matr.mul(matr, Chalkboard.vect.toMatrix(vect));
                }
            } else {
                throw new TypeError("Parameter \"vect\" must be of type \"ChalkboardVector\" with 2, 3, or 4 dimensions.");
            }
        }
        export const negate = (matr: ChalkboardMatrix): ChalkboardMatrix => {
            let result = Chalkboard.matr._new();
            for(let i = 0; i < Chalkboard.matr.rows(matr); i++) {
                result[i] = [];
                for(let j = 0; j < Chalkboard.matr.cols(matr); j++) {
                    result[i][j] = -matr[i][j];
                }
            }
            return result;
        }
        export const nullspace = (matr: ChalkboardMatrix): ChalkboardMatrix => {
            let augmented = matr.map(function(row) {
                return row.slice().concat(Array(Chalkboard.matr.rows(matr)).fill(0));
            });
            let reduced = Chalkboard.matr.reduce(augmented);
            return reduced.filter(function(row: number[]) {
                return row.slice(0, Chalkboard.matr.rows(matr)).every(function(element) {
                    return element === 0;
                });
            }).map(function(row: number[]) {
                return row.slice(Chalkboard.matr.rows(matr));
            });
        }
        export const pow = (matr: ChalkboardMatrix, num: number): ChalkboardMatrix => {
            if(Chalkboard.matr.rows(matr) === Chalkboard.matr.cols(matr)) {
                if(num === 0) {
                    return Chalkboard.matr.identity(Chalkboard.matr.rows(matr));
                } else {
                    let result = matr;
                    for(let i = 1; i < num; i++) {
                        result = Chalkboard.matr.mul(matr, result);
                    }
                    return result;
                }
            } else {
                throw new TypeError("Parameter \"matr\" must be of type \"ChalkboardMatrix\" that is square.");
            }
        }
        export const print = (matr: ChalkboardMatrix): void => {
            console.log(Chalkboard.matr.toString(matr));
        }
        export const pull = (matr: ChalkboardMatrix, type: "row" | "col", rowORcol: number): ChalkboardMatrix => {
            rowORcol -= 1;
            if(type === "row") {
                matr.splice(rowORcol, 1);
                return matr;
            } else if(type === "col") {
                for(let i = 0; i < Chalkboard.matr.rows(matr); i++) {
                    matr[i].splice(rowORcol, 1);
                }
                return matr;
            } else {
                throw new TypeError("Parameter \"type\" must be \"row\" or \"col\".");
            }
        }
        export const push = (matr: ChalkboardMatrix, type: "row" | "col", rowORcol: number, elements: number[]): ChalkboardMatrix => {
            rowORcol -= 1;
            if(type === "row") {
                matr.splice(rowORcol, 0, elements);
                return matr;
            } else if(type === "col") {
                for(let i = 0; i < Chalkboard.matr.rows(matr); i++) {
                    matr[i].splice(rowORcol, 0, elements[i]);
                }
                return matr;
            } else {
                throw new TypeError("Parameter \"type\" must be \"row\" or \"col\".");
            }
        }
        export const QRdecomp = (matr: ChalkboardMatrix): {Q: ChalkboardMatrix, R: ChalkboardMatrix} => {
            let Q = Chalkboard.matr.identity(Chalkboard.matr.rows(matr)),
                R = Chalkboard.matr.copy(matr);
            for(let j = 0; j < Math.min(Chalkboard.matr.rows(matr), Chalkboard.matr.cols(matr)) - (Chalkboard.matr.rows(matr) > Chalkboard.matr.cols(matr) ? 0 : 1); j++) {
                let norm = 0;
                for(let i = j; i < Chalkboard.matr.rows(matr); i++) {
                    norm += R[i][j] * R[i][j];
                }
                norm = Chalkboard.real.sqrt(norm);
                let v = [];
                v[0] = norm - R[j][j];
                let normalizer = v[0] * v[0];
                for(let i = 1; i < Chalkboard.matr.rows(matr) - j; i++) {
                    v[i] = -R[i + j][j];
                    normalizer += v[i] * v[i];
                }
                normalizer = 1 / Chalkboard.real.sqrt(normalizer);
                for(let i = 0; i < v.length; i++) {
                    v[i] *= normalizer;
                }
                R[j][j] = norm;
                for(let i = j + 1; i < Chalkboard.matr.rows(R); i++) {
                    R[i][j] = 0;
                }
                for(let k = j + 1; k < Chalkboard.matr.cols(R); k++) {
                    let dot = 0;
                    for(let i = 0; i < v.length; i++) {
                        dot += v[i] * R[i + j][k];
                    }
                    dot *= 2;
                    for(let i = 0; i < v.length; i++) {
                        R[i + j][k] -= dot * v[i];
                    }
                }
                for(let k = 0; k < Chalkboard.matr.cols(Q); k++) {
                    let dot = 0;
                    for(let i = 0; i < v.length; i++) {
                        dot += v[i] * Q[k][i + j];
                    }
                    dot *= 2;
                    for(let i = 0; i < v.length; i++) {
                        Q[k][i + j] -= dot * v[i];
                    }
                }
            }
            return {Q: Q, R: R};
        }
        export const random = (inf: number, sup: number, rows: number, cols: number = rows): ChalkboardMatrix => {
            let result = Chalkboard.matr._new();
            for(let i = 0; i < rows; i++) {
                result.push([]);
                for(let j = 0; j < cols; j++) {
                    result[i].push(Chalkboard.numb.random(inf, sup));
                }
            }
            return result;
        }
        export const rank = (matr: ChalkboardMatrix): number => {
            return Chalkboard.matr.reduce(matr).filter(function(row: number[]) {
                return row.some(function(element) {
                    return element !== 0;
                });
            }).length;
        }
        export const reciprocate = (matr: ChalkboardMatrix): ChalkboardMatrix => {
            let result = Chalkboard.matr._new();
            for(let i = 0; i < Chalkboard.matr.rows(matr); i++) {
                result[i] = [];
                for(let j = 0; j < Chalkboard.matr.cols(matr); j++) {
                    result[i][j] = 1 / matr[i][j];
                }
            }
            return result;
        }
        export const reduce = (matr: ChalkboardMatrix): ChalkboardMatrix => {
            let lead = 0;
            for(let row = 0; row < Chalkboard.matr.rows(matr); row++) {
                if(lead >= Chalkboard.matr.cols(matr)) {
                    break;
                }
                let i = row;
                while(matr[i][lead] === 0) {
                    i++;
                    if(i === Chalkboard.matr.rows(matr)) {
                        i = row;
                        lead++;
                        if(Chalkboard.matr.cols(matr) === lead) {
                            return matr;
                        }
                    }
                }
                let temp = matr[i];
                matr[i] = matr[row];
                matr[row] = temp;
                let scl = matr[row][lead];
                for(let j = 0; j < Chalkboard.matr.cols(matr); j++) {
                    matr[row][j] /= scl;
                }
                for(let i = 0; i < Chalkboard.matr.rows(matr); i++) {
                    if(i !== row) {
                        let coeff = matr[i][lead];
                        for(let j = 0; j < Chalkboard.matr.cols(matr); j++) {
                            matr[i][j] -= coeff * matr[row][j];
                        }
                    }
                }
                lead++;
            }
            return matr;
        }
        export const resize = (matr: ChalkboardMatrix, rows: number, cols: number): ChalkboardMatrix => {
            if(cols === undefined) {
                cols = rows;
            }
            let result = Chalkboard.matr._new();
            let flat = Chalkboard.matr.toArray(matr);
            let index = 0;
            for(let i = 0; i < rows; i++) {
                result.push([]);
                for(let j = 0; j < cols; j++) {
                    result[i].push(index < flat.length ? flat[index++] : 0);
                }
            }
            return result;
        }
        export const rotator = (radx: number, rady?: number, radz?: number): ChalkboardMatrix => {
            if(rady === undefined && radz === undefined) {
                return Chalkboard.matr._new([Chalkboard.trig.cos(radx), -Chalkboard.trig.sin(radx)], [Chalkboard.trig.sin(radx), Chalkboard.trig.cos(radx)]);
            } else {
                let matr_x = Chalkboard.matr._new([1, 0, 0], [0, Chalkboard.trig.cos(radx), -Chalkboard.trig.sin(radx)], [0, Chalkboard.trig.sin(radx), Chalkboard.trig.cos(radx)]),
                    matr_y = Chalkboard.matr._new([Chalkboard.trig.cos(rady!), 0, Chalkboard.trig.sin(rady!)], [0, 1, 0], [-Chalkboard.trig.sin(rady!), 0, Chalkboard.trig.cos(rady!)]),
                    matr_z = Chalkboard.matr._new([Chalkboard.trig.cos(radz!), -Chalkboard.trig.sin(radz!), 0], [Chalkboard.trig.sin(radz!), Chalkboard.trig.cos(radz!), 0], [0, 0, 1]);
                return Chalkboard.matr.mul(matr_x, Chalkboard.matr.mul(matr_y, matr_z));
            }
        }
        export const round = (matr: ChalkboardMatrix): ChalkboardMatrix => {
            let result = Chalkboard.matr._new();
            for(let i = 0; i < Chalkboard.matr.rows(matr); i++) {
                result[i] = [];
                for(let j = 0; j < Chalkboard.matr.cols(matr); j++) {
                    result[i][j] = Math.round(matr[i][j]);
                }
            }
            return result;
        }
        export const rows = (matr: ChalkboardMatrix): number => {
            return matr.length;
        }
        export const rowspace = (matr: ChalkboardMatrix): ChalkboardMatrix => {
            return Chalkboard.matr.reduce(matr).filter(function(row: number[]) {
                return row.some(function(element) {
                    return element !== 0;
                });
            });
        }
        export const scaler = (vect: ChalkboardVector): ChalkboardMatrix => {
            if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "undefined" && typeof vect.w === "undefined") {
                return Chalkboard.matr._new([vect.x, 0], [0, vect.y]);
            } else if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "undefined") {
                return Chalkboard.matr._new([vect.x, 0, 0], [0, vect.y, 0], [0, 0, vect.z]);
            } else if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "number") {
                return Chalkboard.matr._new([vect.x, 0, 0, 0], [0, vect.y, 0, 0], [0, 0, vect.z, 0], [0, 0, 0, vect.w]);
            } else {
                throw new TypeError("Parameter \"vect\" must be of type \"ChalkboardVector\" with 2, 3, or 4 dimensions.");
            }
        }
        export const scl = (matr: ChalkboardMatrix, num: number): ChalkboardMatrix => {
            let result = Chalkboard.matr._new();
            for(let i = 0; i < Chalkboard.matr.rows(matr); i++) {
                result[i] = [];
                for(let j = 0; j < Chalkboard.matr.cols(matr); j++) {
                    result[i][j] = matr[i][j] * num;
                }
            }
            return result;
        }
        export const shift = (size: number, shiftAmount: number = 1): ChalkboardMatrix => {
            let result = Chalkboard.matr.fill(0, size, size);
            for(let i = 0; i < size; i++) {
                result[i] = [];
                for(let j = 0; j < size; j++) {
                    result[i][j] = Chalkboard.numb.Kronecker(i + shiftAmount, j);
                }
            }
            return result;
        }
        export const solve = (matr_A: ChalkboardMatrix, matr_B: ChalkboardMatrix): ChalkboardMatrix => {
            if(Chalkboard.matr.rows(matr_A) === Chalkboard.matr.cols(matr_A)) {
                if(Chalkboard.matr.rows(matr_A) === Chalkboard.matr.rows(matr_B)) {
                    if(Chalkboard.matr.det(matr_A) !== 0) {
                        return Chalkboard.matr.mul(Chalkboard.matr.invert(matr_A), matr_B);
                    } else {
                        throw new TypeError("Parameter \"matr_A\" must be of type \"ChalkboardMatrix\" that is invertible.");
                    }
                } else {
                    throw new TypeError("Parameters \"matr_A\" and \"matr_B\" must be of type \"ChalkboardMatrix\" with equivalent numbers of rows.");
                }
            } else {
                throw new TypeError("Parameters \"matr_A\" must be of type \"ChalkboardMatrix\" that is square.");
            }
        }
        export const sub = (matr_1: ChalkboardMatrix, matr_2: ChalkboardMatrix): ChalkboardMatrix => {
            if(Chalkboard.matr.rows(matr_1) === Chalkboard.matr.rows(matr_2) && Chalkboard.matr.cols(matr_1) === Chalkboard.matr.cols(matr_2)) {
                let result = Chalkboard.matr._new();
                for(let i = 0; i < Chalkboard.matr.rows(matr_1); i++) {
                    result[i] = [];
                    for(let j = 0; j < Chalkboard.matr.cols(matr_1); j++) {
                        result[i][j] = matr_1[i][j] - matr_2[i][j];
                    }
                }
                return result;
            } else {
                throw new TypeError("Parameters \"matr_1\" and \"matr_2\" must be of type \"ChalkboardMatrix\" with equivalent numbers of rows and columns.");
            }
        }
        export const toArray = (matr: ChalkboardMatrix): number[] => {
            let result = [];
            for(let i = 0; i < Chalkboard.matr.rows(matr); i++) {
                for(let j = 0; j < Chalkboard.matr.cols(matr); j++) {
                    result.push(matr[i][j]);
                }
            }
            return result;
        }
        export const toObject = (matr: ChalkboardMatrix): object => {
            let result: {[key: string]: {[key: string]: number}} = {};
            for(let i = 0; i < Chalkboard.matr.rows(matr); i++) {
                result["i" + (i + 1)] = {};
                for(let j = 0; j < Chalkboard.matr.cols(matr); j++) {
                    result["i" + (i + 1)]["j" + (j + 1)] = matr[i][j];
                }
            }
            return result;
        }
        export const toString = (matr: ChalkboardMatrix): string => {
            let result = "";
            for(let i = 0; i < Chalkboard.matr.rows(matr); i++) {
                result += "[ ";
                for(let j = 0; j < Chalkboard.matr.cols(matr); j++) {
                    result += matr[i][j].toString() + " ";
                }
                result = result.trimEnd() + " ]\n";
            }
            return result;
        }
        export const toTensor = (matr: ChalkboardMatrix, ...size: number[]): ChalkboardTensor => {
            if(Array.isArray(size[0])) {
                size = size[0];
            }
            return Chalkboard.tens.resize(matr, ...size);
        }
        export const toVector = (matr: ChalkboardMatrix, dimension: 2 | 3 | 4, type: "col" | "row" = "col", rowORcol: number = 1): ChalkboardVector => {
            rowORcol -= 1;
            if(dimension === 2) {
                if(type === "col") {
                    return Chalkboard.vect._new(matr[0][rowORcol], matr[1][rowORcol]);
                } else if(type === "row") {
                    return Chalkboard.vect._new(matr[rowORcol][0], matr[rowORcol][1]);
                } else {
                    throw new TypeError("Parameter \"type\" must be \"col\" or \"row\".");
                }
            } else if(dimension === 3) {
                if(type === "col") {
                    return Chalkboard.vect._new(matr[0][rowORcol], matr[1][rowORcol], matr[2][rowORcol]);
                } else if(type === "row") {
                    return Chalkboard.vect._new(matr[rowORcol][0], matr[rowORcol][1], matr[rowORcol][2]);
                } else {
                    throw new TypeError("Parameter \"type\" must be \"col\" or \"row\".");
                }
            } else if(dimension === 4) {
                if(type === "col") {
                    return Chalkboard.vect._new(matr[0][rowORcol], matr[1][rowORcol], matr[2][rowORcol], matr[3][rowORcol]);
                } else if(type === "row") {
                    return Chalkboard.vect._new(matr[rowORcol][0], matr[rowORcol][1], matr[rowORcol][2], matr[rowORcol][3]);
                } else {
                    throw new TypeError("Parameter \"type\" must be \"col\" or \"row\".");
                }
            } else {
                throw new TypeError("Parameter \"vect\" must be of type \"ChalkboardVector\" with 2, 3, or 4 dimensions.");
            }
        }
        export const trace = (matr: ChalkboardMatrix): number => {
            if(Chalkboard.matr.rows(matr) === Chalkboard.matr.cols(matr)) {
                let result = 0;
                for(let i = 0; i < Chalkboard.matr.rows(matr); i++) {
                    result += matr[i][i];
                }
                return result;
            } else {
                throw new TypeError("Parameter \"matr\" must be of type \"ChalkboardMatrix\" that is square.");
            }
        }
        export const transpose = (matr: ChalkboardMatrix): ChalkboardMatrix => {
            let result = Chalkboard.matr._new();
            for(let i = 0; i < Chalkboard.matr.cols(matr); i++) {
                result[i] = [];
                for(let j = 0; j < Chalkboard.matr.rows(matr); j++) {
                    result[i][j] = matr[j][i];
                }
            }
            return result;
        }
        export const translator = (vect: ChalkboardVector): ChalkboardMatrix => {
            if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "undefined" && typeof vect.w === "undefined") {
                return Chalkboard.matr._new([1, 0, vect.x], [0, 1, vect.y], [0, 0, 1]);
            } else if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "undefined") {
                return Chalkboard.matr._new([1, 0, 0, vect.x], [0, 1, 0, vect.y], [0, 0, 1, vect.z], [0, 0, 0, 1]);
            } else if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "number") {
                return Chalkboard.matr._new([1, 0, 0, 0, vect.x], [0, 1, 0, 0, vect.y], [0, 0, 1, 0, vect.z], [0, 0, 0, 1, vect.w], [0, 0, 0, 0, 1]);
            } else {
                throw new TypeError("Parameter \"vect\" must be of type \"ChalkboardVector\" with 2, 3, or 4 dimensions.");
            }
        }
        export const zero = (matr: ChalkboardMatrix): ChalkboardMatrix => {
            let result = Chalkboard.matr._new();
            for(let i = 0; i < Chalkboard.matr.rows(matr); i++) {
                result[i] = [];
                for(let j = 0; j < Chalkboard.matr.cols(matr); j++) {
                    result[i][j] = 0;
                }
            }
            return result;
        }
    }
}