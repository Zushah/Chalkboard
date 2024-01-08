/*
    The Chalkboard Library - Tensor Namespace
    Version 1.7.0 Descartes
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
            const result = Chalkboard.tens.init() as ChalkboardTensor[];
            if(Array.isArray(tens)) {
                for(let i = 0; i < tens.length; i++) {
                    result[i] = Chalkboard.tens.absolute(tens[i]);
                }
                return result;
            } else {
                return Math.abs(tens);
            }
        }

        /**
         * Calculates the addition of two tensors.
         * @param {ChalkboardTensor} tens1 - The first tensor
         * @param {ChalkboardTensor} tens2 - The second tensor
         * @returns {ChalkboardTensor}
         */
        export const add = (tens1: ChalkboardTensor, tens2: ChalkboardTensor): ChalkboardTensor => {
            const result = Chalkboard.tens.init() as ChalkboardTensor[];
            if(Array.isArray(tens1) && Array.isArray(tens2)) {
                for(let i = 0; i < Math.max(tens1.length, tens2.length); i++) {
                    result[i] = Chalkboard.tens.add(tens1[i] !== undefined ? tens1[i] : 0, tens2[i] !== undefined ? tens2[i] : 0);
                }
                return result;
            } else {
                return (tens1 as number) + (tens2 as number);
            }
        }

        /**
         * Calculates the concatentation of two tensors.
         * @param {ChalkboardTensor} tens1 - The first tensor
         * @param {ChalkboardTensor} tens2 - The second tensor
         * @param {number} [rank=1] - The rank to concatenate 
         * @returns {ChalkboardTensor}
         */
        export const concat = (tens1: ChalkboardTensor, tens2: ChalkboardTensor, rank: number = 1): ChalkboardTensor => {
            const concatAtRank = function(arr1: ChalkboardTensor, arr2: ChalkboardTensor, currentRank: number): ChalkboardTensor {
                if(currentRank === rank) {
                    return Chalkboard.tens.init((arr1 as ChalkboardTensor[]).concat(arr2));
                }
                return (arr1 as ChalkboardTensor[]).map(function(element, index) {
                    return concatAtRank(element, (arr2 as ChalkboardTensor[])[index], currentRank);
                });
            }
            return concatAtRank(tens1, tens2, 1);
        }

        /**
         * Calculates a tensor constrained within a range.
         * @param {ChalkboardTensor} tens - The tensor
         * @param {number[]} [range=[0, 1]] - The range
         * @returns {ChalkboardTensor}
         */
        export const constrain = (tens: ChalkboardTensor, range: [number, number] = [0, 1]): ChalkboardTensor => {
            const result = Chalkboard.tens.init() as ChalkboardTensor[];
            if(Array.isArray(tens)) {
                for(let i = 0; i < tens.length; i++) {
                    result[i] = Chalkboard.tens.constrain(tens[i], range);
                }
                return result;
            } else {
                return Chalkboard.numb.constrain(tens, range);
            }
        }

        /**
         * Calculates the contraction of a tensor.
         * @param {ChalkboardTensor} tens - The tensor
         * @returns {ChalkboardTensor | number}
         */
        export const contract = (tens: ChalkboardTensor): ChalkboardTensor | number => {
            if(Chalkboard.tens.rank(tens) > 2) {
                return Chalkboard.tens.resize(tens, Chalkboard.tens.size(tens)[0], Chalkboard.tens.size(tens).slice(1).reduce(function(a: number, b: number): number { return a * b; }) / Chalkboard.tens.size(tens)[0]);
            } else if(Chalkboard.tens.rank(tens) === 2) {
                return Chalkboard.matr.trace(tens as number[][]);
            } else {
                return tens;
            }
        }

        /**
         * Copies a tensor.
         * @param {ChalkboardTensor} tens - The tensor
         * @returns {ChalkboardTensor}
         */
        export const copy = (tens: ChalkboardTensor): ChalkboardTensor => {
            if(Array.isArray(tens)) {
                const result = Chalkboard.tens.init() as ChalkboardTensor[];
                for(let i = 0; i < tens.length; i++) {
                    result[i] = Chalkboard.tens.copy(tens[i]);
                }
                return result;
            } else {
                return tens;
            }
        }

        /**
         * Initializes an empty tensor.
         * @param {number[]} size - The size
         * @returns {ChalkboardTensor}
         */
        export const empty =  (...size: number[]): ChalkboardTensor => {
            if(Array.isArray(size[0])) {
                size = size[0];
            }
            const newNDArray = function(size: number[]): ChalkboardTensor | null {
                if(size.length === 0) {
                    return null;
                }
                const curr = size[0];
                const rest = size.slice(1);
                const result: ChalkboardTensor = [];
                for(let i = 0; i < curr; i++) {
                    result[i] = newNDArray(rest) as ChalkboardTensor;
                }
                return result;
            };
            return newNDArray(size) as ChalkboardTensor;
        }

        /**
         * Initializes a tensor filled with one number.
         * @param {number} element - The number to fill the elements with
         * @param {number[]} size - The size
         * @returns {ChalkboardTensor}
         */
        export const fill = (element: number, ...size: number[]): ChalkboardTensor => {
            if(Array.isArray(size[0])) {
                size = size[0];
            }
            const newNDArray = function(size: number[]): ChalkboardTensor {
                if(size.length === 0) {
                    return element;
                }
                const curr = size[0];
                const rest = size.slice(1);
                const result = [];
                for(let i = 0; i < curr; i++) {
                    result[i] = newNDArray(rest);
                }
                return result;
            };
            return newNDArray(size);
        }

        /**
         * Initializes a new matrix.
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
            if(tensor.length === 0) {
                return [];
            } else if(tensor.length === 1 && Array.isArray(tensor[0])) {
                tensor = tensor[0];
            } else {
                tensor = tensor;
            }
            const newNDArray = function(arr: ChalkboardTensor[]): ChalkboardTensor[] {
                return arr.map(function(subarr) {
                    if(Array.isArray(subarr)) {
                        return newNDArray(subarr);
                    } else {
                        return subarr;
                    }
                });
            };
            return newNDArray(tensor);
        }

        /**
         * Calculates the multiplication of two tensors.
         * @param {ChalkboardTensor} tens1 - The first tensor
         * @param {ChalkboardTensor} tens2 - The second tensor
         * @returns {ChalkboardTensor}
         */
        export const mul = (tens1: ChalkboardTensor, tens2: ChalkboardTensor): ChalkboardTensor => {
            const result = Chalkboard.tens.init() as ChalkboardTensor[];
            if(Array.isArray(tens1) && Array.isArray(tens2)) {
                for(let i = 0; i < tens1.length; i++) {
                    const subarr = Chalkboard.tens.init() as ChalkboardTensor[];
                    for(let j = 0; j < tens2.length; j++) {
                        subarr[j] = Chalkboard.tens.mul(tens1[i], tens2[j]);
                    }
                    result.push(subarr);
                }
                return result;
            } else {
                return (tens1 as number) * (tens2 as number);
            }
        }

        /**
         * Calculates the negation of a tensor.
         * @param {ChalkboardTensor} tens - The tensor
         * @returns {ChalkboardTensor}
         */
        export const negate = (tens: ChalkboardTensor): ChalkboardTensor => {
            const result = Chalkboard.tens.init() as ChalkboardTensor[];
            if(Array.isArray(tens)) {
                for(let i = 0; i < tens.length; i++) {
                    result[i] = Chalkboard.tens.negate(tens[i]);
                }
                return result;
            } else {
                return -tens;
            }
        }

        /**
         * Prints a tensor in the console.
         * @param {ChalkboardTensor} tens - The tensor
         * @returns {void}
         */
        export const print = (tens: ChalkboardTensor): void => {
            console.log(Chalkboard.tens.toString(tens));
        }

        /**
         * Returns a tensor with elements in a rank removed (pulled out).
         * @param {ChalkboardTensor} tens - The tensor
         * @param {number} rank - The rank
         * @param {number} index - The index of the elements to pull
         * @returns {ChalkboardTensor}
         */
        export const pull = (tens: ChalkboardTensor, rank: number, index: number): ChalkboardTensor => {
            tens = tens as ChalkboardTensor[];
            if(rank === 0) {
                tens.splice(index, 1);
                return tens;
            } else {
                for(let i = 0; i < tens.length; i++) {
                    Chalkboard.tens.pull(tens[i], rank - 1, index);
                }
                return tens;
            }
        }

        /**
         * Returns a tensor with elements in a rank added (pushed in).
         * @param {ChalkboardTensor} tens - The tensor
         * @param {number} rank - The rank
         * @param {number} index - The index of the elements to pull
         * @param {number[]} elements - The elements to push
         * @returns {ChalkboardTensor}
         */
        export const push = (tens: ChalkboardTensor, rank: number, index: number, elements: number[]): ChalkboardTensor => {
            tens = tens as ChalkboardTensor[];
            if(rank === 0) {
                tens.splice(index, 0, elements);
                return tens;
            } else {
                for(let i = 0; i < tens.length; i++) {
                    Chalkboard.tens.push(tens[i], rank - 1, index, elements[i] as unknown as number[]);
                }
                return tens;
            }
        }

        /**
         * Initializes a random tensor.
         * @param {number} inf - The lower bound
         * @param {number} sup - The upper bound
         * @param {number[]} size - The size
         * @returns {ChalkboardTensor}
         */
        export const random = (inf: number, sup: number, ...size: number[]): ChalkboardTensor => {
            if(Array.isArray(size[0])) {
                size = size[0];
            }
            const newNDArray = function(size: number[]): ChalkboardTensor {
                if(size.length === 0) {
                    return Chalkboard.numb.random(inf, sup);
                }
                const curr = size[0];
                const rest = size.slice(1);
                const result = [];
                for(let i = 0; i < curr; i++) {
                    result[i] = newNDArray(rest);
                }
                return result;
            };
            return newNDArray(size);
        }

        /**
         * Calculates the rank of a tensor.
         * @param {ChalkboardTensor} tens - The tensor
         * @returns {number}
         */
        export const rank = (tens: ChalkboardTensor): number => {
            if(Array.isArray(tens)) {
                let result = 0;
                for(let i = 0; i < tens.length; i++) {
                    result = Math.max(result, Chalkboard.tens.rank(tens[i]));
                }
                return result + 1;
            } else {
                return 0;
            }
        }

        /**
         * Calculates the reciprocal of a tensor.
         * @param {ChalkboardTensor} tens - The tensor
         * @returns {ChalkboardTensor}
         */
        export const reciprocate = (tens: ChalkboardTensor): ChalkboardTensor => {
            const result = Chalkboard.tens.init() as ChalkboardTensor[];
            if(Array.isArray(tens)) {
                for(let i = 0; i < tens.length; i++) {
                    result[i] = Chalkboard.tens.reciprocate(tens[i]);
                }
                return result;
            } else {
                return 1 / tens;
            }
        }

        /**
         * Returns a tensor with its size changed.
         * @param {ChalkboardTensor} tens - The tensor
         * @param {number[]} size - The size to change to
         * @returns {ChalkboardTensor}
         */
        export const resize = (tens: ChalkboardTensor, ...size: number[]): ChalkboardTensor => {
            if(Array.isArray(size[0])) {
                size = size[0];
            }
            const result = Chalkboard.tens.fill(0, ...size);
            const refill = function(arr1: ChalkboardTensor[], arr2: ChalkboardTensor[]): void {
                for(let i = 0; i < arr2.length; i++) {
                    if(Array.isArray(arr2[i])) {
                        refill(arr1, (arr2 as ChalkboardTensor[][])[i]);
                    } else {
                        arr2[i] = arr1.length > 0 ? arr1.shift() as ChalkboardTensor : 0;
                    }
                }
            };
            refill(Chalkboard.tens.toArray(tens), result as ChalkboardTensor[]);
            return result;
        }

        /**
         * Calculates the rounding of a tensor.
         * @param {ChalkboardTensor} tens - The tensor
         * @returns {ChalkboardTensor}
         */
        export const round = (tens: ChalkboardTensor): ChalkboardTensor => {
            const result = Chalkboard.tens.init() as ChalkboardTensor[];
            if(Array.isArray(tens)) {
                for(let i = 0; i < tens.length; i++) {
                    result[i] = Chalkboard.tens.round(tens[i]);
                }
                return result;
            } else {
                return Math.round(tens);
            }
        }

        /**
         * Calculates the scalar multiplication of a tensor.
         * @param {ChalkboardTensor} tens - The tensor
         * @param {number} num - The number
         * @returns {ChalkboardTensor}
         */
        export const scl = (tens: ChalkboardTensor, num: number): ChalkboardTensor => {
            const result = Chalkboard.tens.init() as ChalkboardTensor[];
            if(Array.isArray(tens)) {
                for(let i = 0; i < tens.length; i++) {
                    result[i] = Chalkboard.tens.scl(tens[i], num);
                }
                return result;
            } else {
                return tens * num;
            }
        }

        /**
         * Returns the size of a tensor.
         * @param {ChalkboardTensor} tens - The tensor
         * @returns {number[]}
         */
        export const size = (tens: ChalkboardTensor): number[] => {
            if(Array.isArray(tens)) {
                let result = [tens.length];
                if(Array.isArray(tens[0])) {
                    result = result.concat(Chalkboard.tens.size(tens[0]));
                }
                return result;
            } else {
                return [];
            }
        }

        /**
         * Calculates the subtraction of two tensors.
         * @param {ChalkboardTensor} tens1 - The first tensor
         * @param {ChalkboardTensor} tens2 - The second tensor
         * @returns {ChalkboardTensor}
         */
        export const sub = (tens1: ChalkboardTensor, tens2: ChalkboardTensor): ChalkboardTensor => {
            const result = Chalkboard.tens.init() as ChalkboardTensor[];
            if(Array.isArray(tens1) && Array.isArray(tens2)) {
                for(let i = 0; i < Math.max(tens1.length, tens2.length); i++) {
                    result[i] = Chalkboard.tens.sub(tens1[i] !== undefined ? tens1[i] : 0, tens2[i] !== undefined ? tens2[i] : 0);
                }
                return result;
            } else {
                return (tens1 as number) - (tens2 as number);
            }
        }

        /**
         * Converts a tensor to an array.
         * @param {ChalkboardTensor} tens - The tensor
         * @returns {number[]}
         */
        export const toArray = (tens: ChalkboardTensor): number[] => {
            const result: number[] = [];
            const flatten = function(tens: ChalkboardTensor): void {
                for(let i = 0; i < (tens as ChalkboardTensor[]).length; i++) {
                    if(Array.isArray((tens as ChalkboardTensor[])[i])) {
                        flatten((tens as ChalkboardTensor[])[i]);
                    } else {
                        result.push((tens as number[])[i]);
                    }
                }
            };
            flatten(tens);
            return result;
        }

        /**
         * Converts a tensor to a matrix.
         * @param {ChalkboardTensor} tens - The tensor
         * @returns {ChalkboardMatrix}
         */
        export const toMatrix = (tens: ChalkboardTensor): ChalkboardMatrix => {
            const result = Chalkboard.matr.init();
            const flatten = function(tens: ChalkboardTensor, result: ChalkboardMatrix): void {
                for(let i = 0; i < (tens as ChalkboardTensor[]).length; i++) {
                    if(Array.isArray((tens as ChalkboardTensor[])[i])) {
                        flatten((tens as ChalkboardTensor[])[i], result);
                    } else {
                        result.push((tens as ChalkboardMatrix)[i]);
                    }
                }
            };
            const matr = Chalkboard.matr.init();
            flatten(tens, matr);
            const rows = (tens as ChalkboardTensor[]).length || 1;
            for(let j = 0; j < rows; j++) {
                result.push(matr.slice(j * matr.length / rows, (j + 1) * matr.length / rows) as unknown as number[]);
            }
            return result;
        }

        /**
         * Converts a tensor to an object.
         * @param {ChalkboardTensor} tens - The tensor
         * @returns {object}
         */
        export const toObject = (tens: ChalkboardTensor): object | number => {
            if(Array.isArray(tens)) {
                const result: {[key: string]: number | object} = {};
                for(let i = 0; i < tens.length; i++) {
                    result["_" + (i + 1)] = Chalkboard.tens.toObject(tens[i]);
                }
                return result;
            } else {
                return tens;
            }
        }

        /**
         * Converts a tensor to a string.
         * @param {ChalkboardTensor} tens - The tensor
         * @returns {string}
         */
        export const toString = (tens: ChalkboardTensor, indentation: number = 0): string => {
            if(Array.isArray((tens as ChalkboardTensor[])[0])) {
                let result = "\t".repeat(indentation) + "[\n";
                for(let i = 0; i < (tens as ChalkboardTensor[]).length; i++) {
                    result += Chalkboard.tens.toString((tens as ChalkboardTensor[])[i], indentation + 1);
                }
                result += "\t".repeat(indentation) + "]\n";
                return result;
            } else {
                let result = "\t".repeat(indentation) + "[ ";
                for(let i = 0; i < (tens as ChalkboardTensor[]).length; i++) {
                    result += (tens as ChalkboardTensor[])[i].toString() + " ";
                }
                result += "]\n";
                return result;
            }
        }

        /**
         * Converts a tensor to a vector.
         * @param {ChalkboardTensor} tens - The tensor
         * @param {number} dimension - The dimension of the vector, which can be 2, 3, or 4
         * @param {number} [index=0] - The index to start from
         * @returns {ChalkboardVector}
         */
        export const toVector = (tens: ChalkboardTensor, dimension: number, index: number = 0): ChalkboardVector => {
            const arr = Chalkboard.tens.toArray(tens);
            if(dimension === 2) {
                return Chalkboard.vect.init(arr[index], arr[index + 1]);
            } else if(dimension === 3) {
                return Chalkboard.vect.init(arr[index], arr[index + 1], arr[index + 2]);
            } else if(dimension === 4) {
                return Chalkboard.vect.init(arr[index], arr[index + 1], arr[index + 2], arr[index + 3]);
            } else {
                throw new TypeError("Parameter \"vect\" must be of type \"ChalkboardVector\" with 2, 3, or 4 dimensions.");
            }
        }

        /**
         * Calculates the transpose of a tensor.
         * @param {ChalkboardTensor} tens - The tensor
         * @returns {ChalkboardTensor}
         */
        export const transpose = (tens: ChalkboardTensor): ChalkboardTensor => {
            return Chalkboard.tens.resize(tens, ...Chalkboard.tens.size(tens).reverse());
        }

        /**
         * Calculates a tensor multiplied by zero.
         * @param {ChalkboardTensor} tens - The tensor
         * @returns {ChalkboardTensor}
         */
        export const zero = (tens: ChalkboardTensor): ChalkboardTensor => {
            const result = Chalkboard.tens.init() as ChalkboardTensor[];
            if(Array.isArray(tens)) {
                for(let i = 0; i < tens.length; i++) {
                    result[i] = Chalkboard.tens.zero(tens[i]);
                }
                return result;
            } else {
                return 0;
            }
        }
    }
}