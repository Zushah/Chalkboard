/*
    Chalkboard - Tensor Namespace
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
     * The tensor namespace.
     * @namespace
     */
    export namespace tens {
        /**
         * Calculates the absolute value of a tensor.
         * @param {ChalkboardTensor} tens - The tensor
         * @returns {ChalkboardTensor}
         */
        export const absolute = (tens: ChalkboardTensor): ChalkboardTensor => {
            if (tens === null || typeof tens !== "number" && !Array.isArray(tens)) throw new Error(`Chalkboard.tens.absolute: Parameter "tens" must be a tensor.`);
            const result = Chalkboard.tens.init() as ChalkboardTensor[];
            if (Array.isArray(tens)) {
                for (let i = 0; i < tens.length; i++) {
                    result[i] = Chalkboard.tens.absolute(tens[i]);
                }
                return result;
            } else {
                return Math.abs(tens);
            }
        };

        /**
         * Calculates the addition of two tensors.
         * @param {ChalkboardTensor} tens1 - The first tensor
         * @param {ChalkboardTensor} tens2 - The second tensor
         * @returns {ChalkboardTensor}
         */
        export const add = (tens1: ChalkboardTensor, tens2: ChalkboardTensor): ChalkboardTensor => {
            if (tens1 === null || typeof tens1 !== "number" && !Array.isArray(tens1)) throw new Error(`Chalkboard.tens.add: Parameter "tens1" must be a tensor.`);
            if (tens2 === null || typeof tens2 !== "number" && !Array.isArray(tens2)) throw new Error(`Chalkboard.tens.add: Parameter "tens2" must be a tensor.`);
            const result = Chalkboard.tens.init() as ChalkboardTensor[];
            if (Array.isArray(tens1) && Array.isArray(tens2)) {
                for (let i = 0; i < Math.max(tens1.length, tens2.length); i++) {
                    result[i] = Chalkboard.tens.add(tens1[i] !== undefined ? tens1[i] : 0, tens2[i] !== undefined ? tens2[i] : 0);
                }
                return result;
            } else {
                return (tens1 as number) + (tens2 as number);
            }
        };

        /**
         * Calculates the concatentation of two tensors.
         * @param {ChalkboardTensor} tens1 - The first tensor
         * @param {ChalkboardTensor} tens2 - The second tensor
         * @param {number} [rank=1] - The rank to concatenate
         * @returns {ChalkboardTensor}
         */
        export const concat = (tens1: ChalkboardTensor, tens2: ChalkboardTensor, rank: number = 1): ChalkboardTensor => {
            if (tens1 === null || typeof tens1 !== "number" && !Array.isArray(tens1)) throw new Error(`Chalkboard.tens.concat: Parameter "tens1" must be a tensor.`);
            if (tens2 === null || typeof tens2 !== "number" && !Array.isArray(tens2)) throw new Error(`Chalkboard.tens.concat: Parameter "tens2" must be a tensor.`);
            if (!Number.isInteger(rank) || rank < 1 || rank > Math.min(Chalkboard.tens.rank(tens1), Chalkboard.tens.rank(tens2))) throw new Error(`Chalkboard.tens.concat: Parameter "rank" must be a positive integer less than or equal to both tensor ranks.`);
            const concatAtRank = function (arr1: ChalkboardTensor, arr2: ChalkboardTensor, currentRank: number): ChalkboardTensor {
                if (currentRank === rank) {
                    return Chalkboard.tens.init((arr1 as ChalkboardTensor[]).concat(arr2));
                }
                return (arr1 as ChalkboardTensor[]).map(function (element, index) {
                    return concatAtRank(element, (arr2 as ChalkboardTensor[])[index], currentRank);
                });
            };
            return concatAtRank(tens1, tens2, 1);
        };

        /**
         * Calculates a tensor constrained within a range.
         * @param {ChalkboardTensor} tens - The tensor
         * @param {number[]} [range=[0, 1]] - The range
         * @returns {ChalkboardTensor}
         */
        export const constrain = (tens: ChalkboardTensor, range: [number, number] = [0, 1]): ChalkboardTensor => {
            if (tens === null || typeof tens !== "number" && !Array.isArray(tens)) throw new Error(`Chalkboard.tens.constrain: Parameter "tens" must be a tensor.`);
            const result = Chalkboard.tens.init() as ChalkboardTensor[];
            if (Array.isArray(tens)) {
                for (let i = 0; i < tens.length; i++) {
                    result[i] = Chalkboard.tens.constrain(tens[i], range);
                }
                return result;
            } else {
                return Chalkboard.numb.constrain(tens, range);
            }
        };

        /**
         * Calculates the contraction of a tensor.
         * @param {ChalkboardTensor} tens - The tensor
         * @returns {ChalkboardTensor | number}
         */
        export const contract = (tens: ChalkboardTensor): ChalkboardTensor | number => {
            if (tens === null || typeof tens !== "number" && !Array.isArray(tens)) throw new Error(`Chalkboard.tens.contract: Parameter "tens" must be a tensor.`);
            if (Chalkboard.tens.rank(tens) > 2) {
                return Chalkboard.tens.resize(
                    tens,
                    Chalkboard.tens.size(tens)[0],
                    Chalkboard.tens
                        .size(tens)
                        .slice(1)
                        .reduce(function (a: number, b: number): number {
                            return a * b;
                        }) / Chalkboard.tens.size(tens)[0]
                );
            } else if (Chalkboard.tens.rank(tens) === 2) {
                return Chalkboard.matr.trace(tens as number[][]);
            } else {
                return tens;
            }
        };

        /**
         * Copies a tensor.
         * @param {ChalkboardTensor} tens - The tensor
         * @returns {ChalkboardTensor}
         */
        export const copy = (tens: ChalkboardTensor): ChalkboardTensor => {
            if (tens === null || typeof tens !== "number" && !Array.isArray(tens)) throw new Error(`Chalkboard.tens.copy: Parameter "tens" must be a tensor.`);
            if (Array.isArray(tens)) {
                const result = Chalkboard.tens.init() as ChalkboardTensor[];
                for (let i = 0; i < tens.length; i++) {
                    result[i] = Chalkboard.tens.copy(tens[i]);
                }
                return result;
            } else {
                return tens;
            }
        };

        /**
         * Initializes an empty tensor.
         * @param {number[]} size - The size
         * @returns {ChalkboardTensor}
         */
        export const empty = (...size: number[]): ChalkboardTensor => {
            size = Array.isArray(size[0]) ? size[0] : size;
            if (size.length > 0 && (!Number.isInteger(size[0]) || size[0] < 0) || size.length > 1 && (!Number.isInteger(size[size.length - 1]) || size[size.length - 1] < 0)) throw new Error(`Chalkboard.tens.empty: Parameter "size" must begin and end with non-negative integers.`);
            const newNDArray = function (size: number[]): ChalkboardTensor | null {
                if (size.length === 0) {
                    return null;
                }
                const curr = size[0];
                const rest = size.slice(1);
                const result: ChalkboardTensor = [];
                for (let i = 0; i < curr; i++) {
                    result[i] = newNDArray(rest) as ChalkboardTensor;
                }
                return result;
            };
            return newNDArray(size) as ChalkboardTensor;
        };

        /**
         * Initializes a tensor filled with one number.
         * @param {number} element - The number to fill the elements with
         * @param {number[]} size - The size
         * @returns {ChalkboardTensor}
         */
        export const fill = (element: number, ...size: number[]): ChalkboardTensor => {
            if (!Number.isFinite(element)) throw new Error(`Chalkboard.tens.fill: Parameter "element" must be a finite number.`);
            size = Array.isArray(size[0]) ? size[0] : size;
            if (size.length > 0 && (!Number.isInteger(size[0]) || size[0] < 0) || size.length > 1 && (!Number.isInteger(size[size.length - 1]) || size[size.length - 1] < 0)) throw new Error(`Chalkboard.tens.fill: Parameter "size" must begin and end with non-negative integers.`);
            const newNDArray = function (size: number[]): ChalkboardTensor {
                if (size.length === 0) {
                    return element;
                }
                const curr = size[0];
                const rest = size.slice(1);
                const result = [];
                for (let i = 0; i < curr; i++) {
                    result[i] = newNDArray(rest);
                }
                return result;
            };
            return newNDArray(size);
        };

        /**
         * Initializes a new tensor.
         * @param {ChalkboardTensor[]} tensor - The n-dimensional array either as a sequence of arrays or one array
         * @returns {ChalkboardTensor}
         * @example
         * // Defines a 2x2x2 tensor [[[1, 2], [3, 4]], [[5, 6], [7, 8]]]
         * let A = Chalkboard.tens.init([[1, 2], [3, 4]],
         *                              [[5, 6], [7, 8]]);
         * let B = Chalkboard.tens.init([[[1, 2], [3, 4]],
         *                               [[5, 6], [7, 8]]]);
         */
        export const init = (...tensor: ChalkboardTensor[]): ChalkboardTensor => {
            if (tensor.length === 0) {
                return [];
            } else if (tensor.length === 1 && Array.isArray(tensor[0])) {
                tensor = tensor[0];
            }
            const newNDArray = function (arr: ChalkboardTensor[]): ChalkboardTensor[] {
                return arr.map(function (subarr) {
                    if (Array.isArray(subarr)) {
                        return newNDArray(subarr);
                    } else {
                        return subarr;
                    }
                });
            };
            return newNDArray(tensor);
        };

        /**
         * Checks if two tensors are approximately equal within a particular precision.
         * @param {ChalkboardTensor} tens1 - The first tensor
         * @param {ChalkboardTensor} tens2 - The second tensor
         * @param {number} [precision=0.000001] - The precision to check
         * @returns {boolean}
         */
        export const isApproxEqual = (tens1: ChalkboardTensor, tens2: ChalkboardTensor, precision: number = 0.000001): boolean => {
            if (tens1 === null || typeof tens1 !== "number" && !Array.isArray(tens1)) throw new Error(`Chalkboard.tens.isApproxEqual: Parameter "tens1" must be a tensor.`);
            if (tens2 === null || typeof tens2 !== "number" && !Array.isArray(tens2)) throw new Error(`Chalkboard.tens.isApproxEqual: Parameter "tens2" must be a tensor.`);
            if (precision !== undefined && (!Number.isFinite(precision))) throw new Error(`Chalkboard.tens.isApproxEqual: Parameter "precision" must be a finite number.`);
            if (Chalkboard.tens.isSizeEqual(tens1, tens2)) {
                (tens1 = tens1 as ChalkboardTensor[]), (tens2 = tens2 as ChalkboardTensor[]);
                for (let i = 0; i < tens1.length; i++) {
                    if (Array.isArray(tens1[i]) && Array.isArray(tens2[i])) {
                        if (!Chalkboard.tens.isApproxEqual(tens1[i], tens2[i], precision)) return false;
                    } else {
                        if (!Chalkboard.numb.isApproxEqual(tens1[i] as number, tens2[i] as number, precision)) return false;
                    }
                }
                return true;
            } else {
                return false;
            }
        };

        /**
         * Checks if two tensors are equal.
         * @param {ChalkboardTensor} tens1 - The first tensor
         * @param {ChalkboardTensor} tens2 - The second tensor
         * @returns {boolean}
         */
        export const isEqual = (tens1: ChalkboardTensor, tens2: ChalkboardTensor): boolean => {
            if (tens1 === null || typeof tens1 !== "number" && !Array.isArray(tens1)) throw new Error(`Chalkboard.tens.isEqual: Parameter "tens1" must be a tensor.`);
            if (tens2 === null || typeof tens2 !== "number" && !Array.isArray(tens2)) throw new Error(`Chalkboard.tens.isEqual: Parameter "tens2" must be a tensor.`);
            if (Chalkboard.tens.isSizeEqual(tens1, tens2)) {
                (tens1 = tens1 as ChalkboardTensor[]), (tens2 = tens2 as ChalkboardTensor[]);
                for (let i = 0; i < tens1.length; i++) {
                    if (Array.isArray(tens1[i]) && Array.isArray(tens2[i])) {
                        if (!Chalkboard.tens.isEqual(tens1[i], tens2[i])) return false;
                    } else {
                        if (tens1[i] !== tens2[i]) return false;
                    }
                }
                return true;
            } else {
                return false;
            }
        };

        /**
         * Checks if two tensors have equal ranks.
         * @param {ChalkboardTensor} tens1 - The first tensor
         * @param {ChalkboardTensor} tens2 - The second tensor
         * @returns {boolean}
         */
        export const isRankEqual = (tens1: ChalkboardTensor, tens2: ChalkboardTensor): boolean => {
            if (tens1 === null || typeof tens1 !== "number" && !Array.isArray(tens1)) throw new Error(`Chalkboard.tens.isRankEqual: Parameter "tens1" must be a tensor.`);
            if (tens2 === null || typeof tens2 !== "number" && !Array.isArray(tens2)) throw new Error(`Chalkboard.tens.isRankEqual: Parameter "tens2" must be a tensor.`);
            return Chalkboard.tens.rank(tens1) === Chalkboard.tens.rank(tens2);
        };

        /**
         * Checks if a tensor is of a particular rank.
         * @param {ChalkboardTensor} tens - The tensor
         * @param {number} rank - The rank
         * @returns {boolean}
         */
        export const isRankOf = (tens: ChalkboardTensor, rank: number): boolean => {
            if (tens === null || typeof tens !== "number" && !Array.isArray(tens)) throw new Error(`Chalkboard.tens.isRankOf: Parameter "tens" must be a tensor.`);
            if (!Number.isInteger(rank) || rank < 0) throw new Error(`Chalkboard.tens.isRankOf: Parameter "rank" must be a non-negative integer.`);
            return Chalkboard.tens.rank(tens) === rank;
        };

        /**
         * Checks if two tensors have equal sizes.
         * @param {ChalkboardTensor} tens1 - The first tensor
         * @param {ChalkboardTensor} tens2 - The second tensor
         * @returns {boolean}
         */
        export const isSizeEqual = (tens1: ChalkboardTensor, tens2: ChalkboardTensor): boolean => {
            if (tens1 === null || typeof tens1 !== "number" && !Array.isArray(tens1)) throw new Error(`Chalkboard.tens.isSizeEqual: Parameter "tens1" must be a tensor.`);
            if (tens2 === null || typeof tens2 !== "number" && !Array.isArray(tens2)) throw new Error(`Chalkboard.tens.isSizeEqual: Parameter "tens2" must be a tensor.`);
            if (Chalkboard.tens.isRankEqual(tens1, tens2)) {
                let score = 0;
                for (let i = 0; i < Chalkboard.tens.rank(tens1); i++) {
                    if (Chalkboard.tens.size(tens1)[i] !== Chalkboard.tens.size(tens2)[i]) score++;
                }
                return score === 0;
            } else {
                return false;
            }
        };

        /**
         * Checks if a tensor is of a particular size.
         * @param {ChalkboardTensor} tens - The tensor
         * @param {number[]} size - The size
         * @returns {boolean}
         */
        export const isSizeOf = (tens: ChalkboardTensor, ...size: number[]): boolean => {
            if (tens === null || typeof tens !== "number" && !Array.isArray(tens)) throw new Error(`Chalkboard.tens.isSizeOf: Parameter "tens" must be a tensor.`);
            size = Array.isArray(size[0]) ? size[0] : size;
            if (size.length > 0 && (!Number.isInteger(size[0]) || size[0] < 0) || size.length > 1 && (!Number.isInteger(size[size.length - 1]) || size[size.length - 1] < 0)) throw new Error(`Chalkboard.tens.isSizeOf: Parameter "size" must begin and end with non-negative integers.`);
            return Chalkboard.tens.isSizeEqual(tens, Chalkboard.tens.empty(...size));
        };

        /**
         * Checks if a tensor has a uniform size (analogous to checking if a matrix is square).
         * @param {ChalkboardTensor} tens - The tensor
         * @returns {boolean}
         */
        export const isSizeUniform = (tens: ChalkboardTensor): boolean => {
            if (tens === null || typeof tens !== "number" && !Array.isArray(tens)) throw new Error(`Chalkboard.tens.isSizeUniform: Parameter "tens" must be a tensor.`);
            let score = 0;
            for (let i = 0; i < Chalkboard.tens.rank(tens); i++) {
                if (Chalkboard.tens.size(tens)[i] !== Chalkboard.tens.size(tens)[0]) score++;
            }
            return score === 0;
        };

        /**
         * Checks if a tensor is a zero tensor.
         * @param {ChalkboardTensor} tens - The tensor
         * @returns {boolean}
         */
        export const isZero = (tens: ChalkboardTensor): boolean => {
            if (tens === null || typeof tens !== "number" && !Array.isArray(tens)) throw new Error(`Chalkboard.tens.isZero: Parameter "tens" must be a tensor.`);
            if (Array.isArray(tens)) {
                for (let i = 0; i < tens.length; i++) {
                    if (!Chalkboard.tens.isZero(tens[i])) return false;
                }
                return true;
            } else {
                return Chalkboard.numb.isApproxEqual(tens, 0);
            }
        };

        /**
         * Calculates the multiplication of two tensors.
         * @param {ChalkboardTensor} tens1 - The first tensor
         * @param {ChalkboardTensor} tens2 - The second tensor
         * @returns {ChalkboardTensor}
         */
        export const mul = (tens1: ChalkboardTensor, tens2: ChalkboardTensor): ChalkboardTensor => {
            if (tens1 === null || typeof tens1 !== "number" && !Array.isArray(tens1)) throw new Error(`Chalkboard.tens.mul: Parameter "tens1" must be a tensor.`);
            if (tens2 === null || typeof tens2 !== "number" && !Array.isArray(tens2)) throw new Error(`Chalkboard.tens.mul: Parameter "tens2" must be a tensor.`);
            const result = Chalkboard.tens.init() as ChalkboardTensor[];
            if (Array.isArray(tens1) && Array.isArray(tens2)) {
                for (let i = 0; i < tens1.length; i++) {
                    const subarr = Chalkboard.tens.init() as ChalkboardTensor[];
                    for (let j = 0; j < tens2.length; j++) {
                        subarr[j] = Chalkboard.tens.mul(tens1[i], tens2[j]);
                    }
                    result.push(subarr);
                }
                return result;
            } else {
                return (tens1 as number) * (tens2 as number);
            }
        };

        /**
         * Calculates the negation of a tensor.
         * @param {ChalkboardTensor} tens - The tensor
         * @returns {ChalkboardTensor}
         */
        export const negate = (tens: ChalkboardTensor): ChalkboardTensor => {
            if (tens === null || typeof tens !== "number" && !Array.isArray(tens)) throw new Error(`Chalkboard.tens.negate: Parameter "tens" must be a tensor.`);
            const result = Chalkboard.tens.init() as ChalkboardTensor[];
            if (Array.isArray(tens)) {
                for (let i = 0; i < tens.length; i++) {
                    result[i] = Chalkboard.tens.negate(tens[i]);
                }
                return result;
            } else {
                return -tens;
            }
        };

        /**
         * Prints a tensor in the console.
         * @param {ChalkboardTensor} tens - The tensor
         * @returns {void}
         */
        export const print = (tens: ChalkboardTensor): void => {
            if (tens === null || typeof tens !== "number" && !Array.isArray(tens)) throw new Error(`Chalkboard.tens.print: Parameter "tens" must be a tensor.`);
            console.log(Chalkboard.tens.toString(tens));
        };

        /**
         * Returns a tensor with elements in a rank removed (pulled out).
         * @param {ChalkboardTensor} tens - The tensor
         * @param {number} rank - The rank
         * @param {number} index - The index of the elements to pull
         * @returns {ChalkboardTensor}
         */
        export const pull = (tens: ChalkboardTensor, rank: number, index: number): ChalkboardTensor => {
            if (tens === null || typeof tens !== "number" && !Array.isArray(tens)) throw new Error(`Chalkboard.tens.pull: Parameter "tens" must be a tensor.`);
            const size = Chalkboard.tens.size(tens);
            if (!Number.isInteger(rank) || rank < 0 || rank >= size.length) throw new Error(`Chalkboard.tens.pull: Parameter "rank" must be a non-negative integer less than the tensor rank.`);
            if (!Number.isInteger(index) || index < 0 || index >= size[rank]) throw new Error(`Chalkboard.tens.pull: Parameter "index" must be an integer within the selected rank bounds.`);
            tens = tens as ChalkboardTensor[];
            if (rank === 0) {
                tens.splice(index, 1);
                return tens;
            } else {
                for (let i = 0; i < tens.length; i++) {
                    Chalkboard.tens.pull(tens[i], rank - 1, index);
                }
                return tens;
            }
        };

        /**
         * Returns a tensor with elements in a rank added (pushed in).
         * @param {ChalkboardTensor} tens - The tensor
         * @param {number} rank - The rank
         * @param {number} index - The index of the elements to pull
         * @param {number[]} elements - The elements to push
         * @returns {ChalkboardTensor}
         */
        export const push = (tens: ChalkboardTensor, rank: number, index: number, elements: number[]): ChalkboardTensor => {
            if (tens === null || typeof tens !== "number" && !Array.isArray(tens)) throw new Error(`Chalkboard.tens.push: Parameter "tens" must be a tensor.`);
            const size = Chalkboard.tens.size(tens);
            if (!Number.isInteger(rank) || rank < 0 || rank >= size.length) throw new Error(`Chalkboard.tens.push: Parameter "rank" must be a non-negative integer less than the tensor rank.`);
            if (!Number.isInteger(index) || index < 0 || index > size[rank]) throw new Error(`Chalkboard.tens.push: Parameter "index" must be an integer within the selected rank insertion bounds.`);
            if (!Array.isArray(elements)) throw new Error(`Chalkboard.tens.push: Parameter "elements" must be an array.`);
            tens = tens as ChalkboardTensor[];
            const insert = (tensor: ChalkboardTensor[], currentRank: number, currentElements: ChalkboardTensor): ChalkboardTensor[] => {
                if (currentRank === 0) {
                    tensor.splice(index, 0, currentElements);
                } else {
                    for (let i = 0; i < tensor.length; i++) {
                        insert(tensor[i] as ChalkboardTensor[], currentRank - 1, (currentElements as ChalkboardTensor[])[i]);
                    }
                }
                return tensor;
            };
            return insert(tens, rank, elements);
        };

        /**
         * Initializes a random tensor.
         * @param {number} inf - The lower bound
         * @param {number} sup - The upper bound
         * @param {number[]} size - The size
         * @returns {ChalkboardTensor}
         */
        export const random = (inf: number, sup: number, ...size: number[]): ChalkboardTensor => {
            if (!Number.isFinite(inf)) throw new Error(`Chalkboard.tens.random: Parameter "inf" must be a finite number.`);
            if (!Number.isFinite(sup)) throw new Error(`Chalkboard.tens.random: Parameter "sup" must be a finite number.`);
            size = Array.isArray(size[0]) ? size[0] : size;
            if (size.length > 0 && (!Number.isInteger(size[0]) || size[0] < 0) || size.length > 1 && (!Number.isInteger(size[size.length - 1]) || size[size.length - 1] < 0)) throw new Error(`Chalkboard.tens.random: Parameter "size" must begin and end with non-negative integers.`);
            const newNDArray = function (size: number[]): ChalkboardTensor {
                if (size.length === 0) {
                    return Chalkboard.numb.random(inf, sup);
                }
                const curr = size[0];
                const rest = size.slice(1);
                const result = [];
                for (let i = 0; i < curr; i++) {
                    result[i] = newNDArray(rest);
                }
                return result;
            };
            return newNDArray(size);
        };

        /**
         * Calculates the rank of a tensor.
         * @param {ChalkboardTensor} tens - The tensor
         * @returns {number}
         */
        export const rank = (tens: ChalkboardTensor): number => {
            if (tens === null || typeof tens !== "number" && !Array.isArray(tens)) throw new Error(`Chalkboard.tens.rank: Parameter "tens" must be a tensor.`);
            return Chalkboard.tens.size(tens).length;
        };

        /**
         * Calculates the reciprocal of a tensor.
         * @param {ChalkboardTensor} tens - The tensor
         * @returns {ChalkboardTensor}
         */
        export const reciprocate = (tens: ChalkboardTensor): ChalkboardTensor => {
            if (tens === null || typeof tens !== "number" && !Array.isArray(tens)) throw new Error(`Chalkboard.tens.reciprocate: Parameter "tens" must be a tensor.`);
            const result = Chalkboard.tens.init() as ChalkboardTensor[];
            if (Array.isArray(tens)) {
                for (let i = 0; i < tens.length; i++) {
                    result[i] = Chalkboard.tens.reciprocate(tens[i]);
                }
                return result;
            } else {
                return 1 / tens;
            }
        };

        /**
         * Returns a tensor with its size changed.
         * @param {ChalkboardTensor} tens - The tensor
         * @param {number[]} size - The size to change to
         * @returns {ChalkboardTensor}
         */
        export const resize = (tens: ChalkboardTensor, ...size: number[]): ChalkboardTensor => {
            if (tens === null || typeof tens !== "number" && !Array.isArray(tens)) throw new Error(`Chalkboard.tens.resize: Parameter "tens" must be a tensor.`);
            size = Array.isArray(size[0]) ? size[0] : size;
            if (size.length > 0 && (!Number.isInteger(size[0]) || size[0] < 0) || size.length > 1 && (!Number.isInteger(size[size.length - 1]) || size[size.length - 1] < 0)) throw new Error(`Chalkboard.tens.resize: Parameter "size" must begin and end with non-negative integers.`);
            const result = Chalkboard.tens.fill(0, ...size);
            const refill = function (arr1: ChalkboardTensor[], arr2: ChalkboardTensor[]): void {
                for (let i = 0; i < arr2.length; i++) {
                    if (Array.isArray(arr2[i])) {
                        refill(arr1, (arr2 as ChalkboardTensor[][])[i]);
                    } else {
                        arr2[i] = arr1.length > 0 ? (arr1.shift() as ChalkboardTensor) : 0;
                    }
                }
            };
            refill(Chalkboard.tens.toArray(tens), result as ChalkboardTensor[]);
            return result;
        };

        /**
         * Calculates the rounding of a tensor.
         * @param {ChalkboardTensor} tens - The tensor
         * @returns {ChalkboardTensor}
         */
        export const round = (tens: ChalkboardTensor): ChalkboardTensor => {
            if (tens === null || typeof tens !== "number" && !Array.isArray(tens)) throw new Error(`Chalkboard.tens.round: Parameter "tens" must be a tensor.`);
            const result = Chalkboard.tens.init() as ChalkboardTensor[];
            if (Array.isArray(tens)) {
                for (let i = 0; i < tens.length; i++) {
                    result[i] = Chalkboard.tens.round(tens[i]);
                }
                return result;
            } else {
                return Math.round(tens);
            }
        };

        /**
         * Calculates the scalar multiplication of a tensor.
         * @param {ChalkboardTensor} tens - The tensor
         * @param {number} num - The number
         * @returns {ChalkboardTensor}
         */
        export const scl = (tens: ChalkboardTensor, num: number): ChalkboardTensor => {
            if (tens === null || typeof tens !== "number" && !Array.isArray(tens)) throw new Error(`Chalkboard.tens.scl: Parameter "tens" must be a tensor.`);
            if (!Number.isFinite(num)) throw new Error(`Chalkboard.tens.scl: Parameter "num" must be a finite number.`);
            const result = Chalkboard.tens.init() as ChalkboardTensor[];
            if (Array.isArray(tens)) {
                for (let i = 0; i < tens.length; i++) {
                    result[i] = Chalkboard.tens.scl(tens[i], num);
                }
                return result;
            } else {
                return tens * num;
            }
        };

        /**
         * Returns the size of a tensor.
         * @param {ChalkboardTensor} tens - The tensor
         * @returns {number[]}
         */
        export const size = (tens: ChalkboardTensor): number[] => {
            if (tens === null || typeof tens !== "number" && !Array.isArray(tens)) throw new Error(`Chalkboard.tens.size: Parameter "tens" must be a tensor.`);
            if (Array.isArray(tens)) {
                let result = [tens.length];
                if (Array.isArray(tens[0])) {
                    result = result.concat(Chalkboard.tens.size(tens[0]));
                }
                return result;
            } else {
                return [];
            }
        };

        /**
         * Calculates the subtraction of two tensors.
         * @param {ChalkboardTensor} tens1 - The first tensor
         * @param {ChalkboardTensor} tens2 - The second tensor
         * @returns {ChalkboardTensor}
         */
        export const sub = (tens1: ChalkboardTensor, tens2: ChalkboardTensor): ChalkboardTensor => {
            if (tens1 === null || typeof tens1 !== "number" && !Array.isArray(tens1)) throw new Error(`Chalkboard.tens.sub: Parameter "tens1" must be a tensor.`);
            if (tens2 === null || typeof tens2 !== "number" && !Array.isArray(tens2)) throw new Error(`Chalkboard.tens.sub: Parameter "tens2" must be a tensor.`);
            const result = Chalkboard.tens.init() as ChalkboardTensor[];
            if (Array.isArray(tens1) && Array.isArray(tens2)) {
                for (let i = 0; i < Math.max(tens1.length, tens2.length); i++) {
                    result[i] = Chalkboard.tens.sub(tens1[i] !== undefined ? tens1[i] : 0, tens2[i] !== undefined ? tens2[i] : 0);
                }
                return result;
            } else {
                return (tens1 as number) - (tens2 as number);
            }
        };

        /**
         * Converts a tensor to an array.
         * @param {ChalkboardTensor} tens - The tensor
         * @returns {number[]}
         */
        export const toArray = (tens: ChalkboardTensor): number[] => {
            if (tens === null || typeof tens !== "number" && !Array.isArray(tens)) throw new Error(`Chalkboard.tens.toArray: Parameter "tens" must be a tensor.`);
            const result: number[] = [];
            const flatten = function (tens: ChalkboardTensor): void {
                for (let i = 0; i < (tens as ChalkboardTensor[]).length; i++) {
                    if (Array.isArray((tens as ChalkboardTensor[])[i])) {
                        flatten((tens as ChalkboardTensor[])[i]);
                    } else {
                        result.push((tens as number[])[i]);
                    }
                }
            };
            flatten(tens);
            return result;
        };

        /**
         * Converts a tensor to a matrix.
         * @param {ChalkboardTensor} tens - The tensor
         * @returns {ChalkboardMatrix}
         */
        export const toMatrix = (tens: ChalkboardTensor): ChalkboardMatrix => {
            if (tens === null || typeof tens !== "number" && !Array.isArray(tens)) throw new Error(`Chalkboard.tens.toMatrix: Parameter "tens" must be a tensor.`);
            const result = Chalkboard.matr.init();
            const flatten = function (tens: ChalkboardTensor, result: ChalkboardMatrix): void {
                for (let i = 0; i < (tens as ChalkboardTensor[]).length; i++) {
                    if (Array.isArray((tens as ChalkboardTensor[])[i])) {
                        flatten((tens as ChalkboardTensor[])[i], result);
                    } else {
                        result.push((tens as ChalkboardMatrix)[i]);
                    }
                }
            };
            const matr = Chalkboard.matr.init();
            flatten(tens, matr);
            const rows = (tens as ChalkboardTensor[]).length || 1;
            for (let j = 0; j < rows; j++) {
                result.push(matr.slice((j * matr.length) / rows, ((j + 1) * matr.length) / rows) as unknown as number[]);
            }
            return result;
        };

        /**
         * Converts a tensor to an object.
         * @param {ChalkboardTensor} tens - The tensor
         * @returns {object}
         */
        export const toObject = (tens: ChalkboardTensor): object | number => {
            if (tens === null || typeof tens !== "number" && !Array.isArray(tens)) throw new Error(`Chalkboard.tens.toObject: Parameter "tens" must be a tensor.`);
            if (Array.isArray(tens)) {
                const result: { [key: string]: number | object } = {};
                for (let i = 0; i < tens.length; i++) {
                    result["_" + (i + 1)] = Chalkboard.tens.toObject(tens[i]);
                }
                return result;
            } else {
                return tens;
            }
        };

        /**
         * Converts a tensor to a set.
         * @param {ChalkboardTensor} tens - The tensor 
         * @returns {ChalkboardSet<number>}
         */
        export const toSet = (tens: ChalkboardTensor): ChalkboardSet<number> => {
            if (tens === null || typeof tens !== "number" && !Array.isArray(tens)) throw new Error(`Chalkboard.tens.toSet: Parameter "tens" must be a tensor.`);
            return Chalkboard.abal.set(Chalkboard.tens.toArray(tens));
        };

        /**
         * Converts a tensor to a string.
         * @param {ChalkboardTensor} tens - The tensor
         * @returns {string}
         */
        export const toString = (tens: ChalkboardTensor, indentation: number = 0): string => {
            if (tens === null || typeof tens !== "number" && !Array.isArray(tens)) throw new Error(`Chalkboard.tens.toString: Parameter "tens" must be a tensor.`);
            if (!Number.isInteger(indentation) || indentation < 0) throw new Error(`Chalkboard.tens.toString: Parameter "indentation" must be a non-negative integer.`);
            if (Array.isArray((tens as ChalkboardTensor[])[0])) {
                let result = "\t".repeat(indentation) + "[\n";
                for (let i = 0; i < (tens as ChalkboardTensor[]).length; i++) {
                    result += Chalkboard.tens.toString((tens as ChalkboardTensor[])[i], indentation + 1);
                }
                result += "\t".repeat(indentation) + "]\n";
                return result;
            } else {
                let result = "\t".repeat(indentation) + "[ ";
                for (let i = 0; i < (tens as ChalkboardTensor[]).length; i++) {
                    result += (tens as ChalkboardTensor[])[i].toString() + " ";
                }
                result += "]\n";
                return result;
            }
        };

        /**
         * Converts a tensor to a typed array.
         * @param {ChalkboardTensor} tens - The tensor
         * @param {"int8" | "int16" | "int32" | "float32" | "float64" | "bigint64"} [type="float32"] - The type of the typed array, which can be "int8", "int16", "int32", "float32", "float64", or "bigint64" (optional, defaults to "float32")
         * @returns {Int8Array | Int16Array | Int32Array | Float32Array | Float64Array | BigInt64Array}
         */
        export const toTypedArray = (tens: ChalkboardTensor, type: "int8" | "int16" | "int32" | "float32" | "float64" | "bigint64" = "float32"): Int8Array | Int16Array | Int32Array | Float32Array | Float64Array | BigInt64Array => {
            const arr = Chalkboard.tens.toArray(tens);
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
            throw new Error(`Chalkboard.tens.toTypedArray: Parameter "type" must be int8, int16, int32, float32, float64, or bigint64.`);
        };

        /**
         * Converts a tensor to a vector.
         * @param {ChalkboardTensor} tens - The tensor
         * @param {number} dimension - The dimension of the vector, which can be 2, 3, or 4
         * @param {number} [index=0] - The index to start from
         * @returns {ChalkboardVector}
         */
        export const toVector = (tens: ChalkboardTensor, dimension: number, index: number = 0): ChalkboardVector => {
            if (tens === null || typeof tens !== "number" && !Array.isArray(tens)) throw new Error(`Chalkboard.tens.toVector: Parameter "tens" must be a tensor.`);
            if (dimension !== 2 && dimension !== 3 && dimension !== 4) throw new Error(`Chalkboard.tens.toVector: Parameter "dimension" must be 2, 3, or 4.`);
            const arr = Chalkboard.tens.toArray(tens);
            if (!Number.isInteger(index) || index < 0 || index + dimension > arr.length) throw new Error(`Chalkboard.tens.toVector: Parameter "index" and parameter "dimension" must fit within the flattened tensor bounds.`);
            if (dimension === 2) {
                return Chalkboard.vect.init(arr[index], arr[index + 1]);
            } else if (dimension === 3) {
                return Chalkboard.vect.init(arr[index], arr[index + 1], arr[index + 2]);
            } else if (dimension === 4) {
                return Chalkboard.vect.init(arr[index], arr[index + 1], arr[index + 2], arr[index + 3]);
            } else {
                throw new Error(`Chalkboard.tens.toVector: Parameter "dimension" must be 2, 3, or 4.`);
            }
        };

        /**
         * Calculates the transpose of a tensor.
         * @param {ChalkboardTensor} tens - The tensor
         * @returns {ChalkboardTensor}
         */
        export const transpose = (tens: ChalkboardTensor): ChalkboardTensor => {
            if (tens === null || typeof tens !== "number" && !Array.isArray(tens)) throw new Error(`Chalkboard.tens.transpose: Parameter "tens" must be a tensor.`);
            return Chalkboard.tens.resize(tens, ...Chalkboard.tens.size(tens).reverse());
        };

        /**
         * Initializes a zero tensor.
         * @param {number[]} size - The size
         * @returns {ChalkboardTensor}
         */
        export const zero = (...size: number[]): ChalkboardTensor => {
            size = Array.isArray(size[0]) ? size[0] : size;
            if (size.length > 0 && (!Number.isInteger(size[0]) || size[0] < 0) || size.length > 1 && (!Number.isInteger(size[size.length - 1]) || size[size.length - 1] < 0)) throw new Error(`Chalkboard.tens.zero: Parameter "size" must begin and end with non-negative integers.`);
            const newNDArray = function (size: number[]): ChalkboardTensor {
                if (size.length === 0) {
                    return 0;
                }
                const curr = size[0];
                const rest = size.slice(1);
                const result = [];
                for (let i = 0; i < curr; i++) {
                    result[i] = newNDArray(rest);
                }
                return result;
            };
            return newNDArray(size);
        };
    }
}
