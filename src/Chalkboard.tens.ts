/*
 * Chalkboard - Tensor Namespace
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

/// <reference path="Chalkboard.ts"/>
namespace Chalkboard {
    /**
     * The tensor namespace.
     * @namespace
     */
    export namespace tens {
        /** @ignore */
        const $broadcast = (tens1: ChalkboardTensor, size1: number[], tens2: ChalkboardTensor, size2: number[], callback: (a: number, b: number) => number, caller: string): ChalkboardTensor => {
            const n = Math.max(size1.length, size2.length), size: number[] = [], pad1: number[] = [], pad2: number[] = [];
            for (let k = 0; k < n; k++) {
                const a = size1[size1.length - n + k] ?? 1, b = size2[size2.length - n + k] ?? 1;
                if (a !== b && a !== 1 && b !== 1) throw new Error(`Chalkboard.tens.${caller}: Parameters "tens1" and "tens2" must have broadcastable sizes.`);
                size.push(a === 1 ? b : a);
                pad1.push(a);
                pad2.push(b);
            }
            const walk = (arr1: ChalkboardTensor[], arr2: ChalkboardTensor[], depth: number): ChalkboardTensor[] => {
                const result: ChalkboardTensor[] = [];
                if (depth === n - 1) {
                    if (pad1[depth] === 1) {
                        const a = arr1[0] as number;
                        for (let i = 0; i < size[depth]; i++) {
                            result[i] = callback(a, (pad2[depth] === 1 ? arr2[0] : arr2[i]) as number);
                        }
                    } else if (pad2[depth] === 1) {
                        const b = arr2[0] as number;
                        for (let i = 0; i < size[depth]; i++) {
                            result[i] = callback(arr1[i] as number, b);
                        }
                    } else {
                        for (let i = 0; i < size[depth]; i++) {
                            result[i] = callback(arr1[i] as number, arr2[i] as number);
                        }
                    }
                } else {
                    for (let i = 0; i < size[depth]; i++) {
                        result[i] = walk((pad1[depth] === 1 ? arr1[0] : arr1[i]) as ChalkboardTensor[], (pad2[depth] === 1 ? arr2[0] : arr2[i]) as ChalkboardTensor[], depth + 1);
                    }
                }
                return result;
            };
            let wrap1 = tens1, wrap2 = tens2;
            for (let i = size1.length; i < n; i++) wrap1 = [wrap1];
            for (let i = size2.length; i < n; i++) wrap2 = [wrap2];
            return walk(wrap1 as ChalkboardTensor[], wrap2 as ChalkboardTensor[], 0);
        };

        /** @ignore */
        const $contract = (tens: ChalkboardTensor, size: number[], axis1: number, axis2: number): ChalkboardTensor | number => {
            const flat = $flatten(tens), n = size.length, stride: number[] = new Array(n);
            stride[n - 1] = 1;
            for (let k = n - 2; k >= 0; k--) stride[k] = stride[k + 1] * size[k + 1];
            const keep: number[] = [];
            for (let k = 0; k < n; k++) if (k !== axis1 && k !== axis2) keep.push(k);
            const diag = stride[axis1] + stride[axis2], m = size[axis1];
            const sum = (offset: number): number => {
                let result = 0;
                for (let i = 0; i < m; i++) result += flat[offset + i * diag];
                return result;
            };
            if (keep.length === 0) return sum(0);
            const build = (depth: number, offset: number): ChalkboardTensor[] => {
                const result: ChalkboardTensor[] = [], axis = keep[depth];
                for (let j = 0; j < size[axis]; j++) {
                    result[j] = depth === keep.length - 1 ? sum(offset + j * stride[axis]) : build(depth + 1, offset + j * stride[axis]);
                }
                return result;
            };
            return build(0, 0);
        };

        /** @ignore */
        const $copy = (tens: ChalkboardTensor): ChalkboardTensor => {
            if (!Array.isArray(tens)) return tens;
            if (!Array.isArray(tens[0])) return tens.slice();
            const result: ChalkboardTensor[] = [];
            for (let i = 0; i < tens.length; i++) {
                result[i] = $copy(tens[i]);
            }
            return result;
        };

        /** @ignore */
        const $flatten = (tens: ChalkboardTensor): number[] => {
            if (!Array.isArray(tens)) return [tens];
            const result: number[] = [];
            const flatten = (tens: ChalkboardTensor[]): void => {
                for (let i = 0; i < tens.length; i++) {
                    const t = tens[i];
                    if (Array.isArray(t)) {
                        flatten(t);
                    } else {
                        result.push(t);
                    }
                }
            };
            flatten(tens);
            return result;
        };

        /** @ignore */
        const $isApproxEqual = (tens1: ChalkboardTensor, tens2: ChalkboardTensor, precision: number, numeric: boolean, caller: string): boolean => {
            const size = $shape(tens1, numeric, caller, "tens1");
            let result = true;
            const walk = (arr1: ChalkboardTensor[], arr2: ChalkboardTensor, depth: number): boolean => {
                if (!Array.isArray(arr2) || arr2.length !== size[depth]) return false;
                if (depth === size.length - 1) {
                    for (let i = 0; i < arr2.length; i++) {
                        const a = arr1[i] as number, b = arr2[i] as number;
                        if (typeof b !== "number" && (numeric || b !== null)) return false;
                        if (result && a !== b && !(Math.abs(a - b) < precision)) result = false;
                    }
                } else {
                    for (let i = 0; i < arr2.length; i++) {
                        if (!walk(arr1[i] as ChalkboardTensor[], arr2[i], depth + 1)) return false;
                    }
                }
                return true;
            };
            if (size.length === 0) {
                const a = tens1 as number, b = tens2 as number;
                return $shape(tens2, numeric, caller, "tens2").length === 0 && (a === b || Math.abs(a - b) < precision);
            }
            if (walk(tens1 as ChalkboardTensor[], tens2, 0)) return result;
            $shape(tens2, numeric, caller, "tens2");
            return false;
        };

        /** @ignore */
        const $isSizeEqual = (size1: number[], size2: number[]): boolean => {
            return size1.length === size2.length && size1.every((n, i) => n === size2[i]);
        };

        /** @ignore */
        const $map = (tens: ChalkboardTensor, callback: (x: number) => number): ChalkboardTensor => {
            if (!Array.isArray(tens)) return callback(tens);
            const result: ChalkboardTensor[] = [];
            if (Array.isArray(tens[0])) {
                for (let i = 0; i < tens.length; i++) {
                    result[i] = $map(tens[i], callback);
                }
            } else {
                for (let i = 0; i < tens.length; i++) {
                    result[i] = callback(tens[i] as number);
                }
            }
            return result;
        };

        /** @ignore */
        const $outer = (tens1: ChalkboardTensor, tens2: ChalkboardTensor): ChalkboardTensor => {
            if (!Array.isArray(tens1)) return $map(tens2, (b) => tens1 * b);
            const result: ChalkboardTensor[] = [];
            for (let i = 0; i < tens1.length; i++) result[i] = $outer(tens1[i], tens2);
            return result;
        };

        /** @ignore */
        const $permute = (tens: ChalkboardTensor, size: number[], axes: number[]): ChalkboardTensor => {
            const n = size.length;
            if (n === 0) return tens;
            const flat = $flatten(tens), stride: number[] = new Array(n);
            stride[n - 1] = 1;
            for (let k = n - 2; k >= 0; k--) stride[k] = stride[k + 1] * size[k + 1];
            const outSize = axes.map((a) => size[a]), outStride = axes.map((a) => stride[a]);
            const build = (depth: number, offset: number): ChalkboardTensor[] => {
                const result: ChalkboardTensor[] = [];
                for (let j = 0; j < outSize[depth]; j++) {
                    result[j] = depth === n - 1 ? flat[offset + j * outStride[depth]] : build(depth + 1, offset + j * outStride[depth]);
                }
                return result;
            };
            return build(0, 0);
        };

        /** @ignore */
        const $resize = (tens: ChalkboardTensor, size: number[]): ChalkboardTensor => {
            if (size.length === 0) return 0;
            const entries = $flatten(tens);
            let index = 0;
            const refill = (depth: number): ChalkboardTensor[] => {
                const result: ChalkboardTensor[] = [];
                for (let i = 0; i < size[depth]; i++) {
                    if (depth === size.length - 1) {
                        result[i] = index < entries.length ? entries[index++] : 0;
                    } else {
                        result[i] = refill(depth + 1);
                    }
                }
                return result;
            };
            return refill(0);
        };

        /** @ignore */
        const $shape = (tens: ChalkboardTensor, numeric: boolean, caller: string, name: string): number[] => {
            if (typeof tens === "number") return [];
            if (!Array.isArray(tens)) throw new Error(`Chalkboard.tens.${caller}: Parameter "${name}" must be a tensor.`);
            const size: number[] = [];
            const seen = new Set<ChalkboardTensor[]>();
            for (let t: ChalkboardTensor = tens; Array.isArray(t); t = t[0]) {
                if (seen.has(t)) throw new Error(`Chalkboard.tens.${caller}: Parameter "${name}" must be a tensor.`);
                seen.add(t);
                size.push(t.length);
            }
            const walk =(t: ChalkboardTensor, depth: number): void => {
                if (!Array.isArray(t) || t.length !== size[depth]) throw new Error(`Chalkboard.tens.${caller}: Parameter "${name}" must be a rectangular tensor.`);
                if (depth === size.length - 1) {
                    for (let i = 0; i < t.length; i++) {
                        if (typeof t[i] !== "number" && (numeric || t[i] !== null)) throw new Error(`Chalkboard.tens.${caller}: Parameter "${name}" must be a tensor whose leaves are ${numeric ? "numbers" : "numbers or null"}.`);
                    }
                } else {
                    for (let i = 0; i < t.length; i++) {
                        walk(t[i], depth + 1);
                    }
                }
            };
            walk(tens, 0);
            return size;
        };

        /** @ignore */
        const $size = (size: number[], caller: string): number[] => {
            size = Array.isArray(size[0]) ? size[0] : size;
            for (let i = 0; i < size.length; i++) {
                if (!Number.isInteger(size[i]) || size[i] < 0) throw new Error(`Chalkboard.tens.${caller}: Parameter "size" must contain only non-negative integers.`);
            }
            return size;
        };

        /** @ignore */
        const $string = (tens: ChalkboardTensor, indentation: number): string => {
            if (typeof tens === "number") {
                return "\t".repeat(indentation) + String(tens) + "\n";
            } else if (Array.isArray(tens[0])) {
                let result = "\t".repeat(indentation) + "[\n";
                for (let i = 0; i < tens.length; i++) {
                    result += $string(tens[i], indentation + 1);
                }
                result += "\t".repeat(indentation) + "]\n";
                return result;
            } else {
                let result = "\t".repeat(indentation) + "[ ";
                for (let i = 0; i < tens.length; i++) {
                    result += String(tens[i]) + " ";
                }
                result += "]\n";
                return result;
            }
        };

        /** @ignore */
        const $zip = (tens1: ChalkboardTensor, tens2: ChalkboardTensor, callback: (a: number, b: number) => number): ChalkboardTensor => {
            if (Array.isArray(tens1)) {
                const result: ChalkboardTensor[] = [];
                for (let i = 0; i < tens1.length; i++) {
                    const a = tens1[i], b = Array.isArray(tens2) ? tens2[i] : tens2;
                    result[i] = Array.isArray(a) ? $zip(a, b, callback) : callback(a, b as number);
                }
                return result;
            } else if (Array.isArray(tens2)) {
                const result: ChalkboardTensor[] = [];
                for (let i = 0; i < tens2.length; i++) {
                    const b = tens2[i];
                    result[i] = Array.isArray(b) ? $zip(tens1, b, callback) : callback(tens1, b);
                }
                return result;
            } else {
                return callback(tens1, tens2);
            }
        };

        /**
         * Calculates the absolute value of a tensor.
         * @param {ChalkboardTensor} tens - The tensor
         * @returns {ChalkboardTensor}
         * @example
         * const result = Chalkboard.tens.absolute([[-1, 2], [-3, 4]]); // Returns [[1, 2], [3, 4]]
         */
        export const absolute = (tens: ChalkboardTensor): ChalkboardTensor => {
            $shape(tens, true, "absolute", "tens");
            return $map(tens, (x) => Math.abs(x));
        };

        /**
         * Calculates the addition of two tensors, which are broadcast together as in NumPy (their sizes are aligned from the right, and axes of length 1 or missing axes are stretched).
         * @param {ChalkboardTensor} tens1 - The first tensor
         * @param {ChalkboardTensor} tens2 - The second tensor
         * @returns {ChalkboardTensor}
         * @example
         * const result = Chalkboard.tens.add([[1, 2], [3, 4]], [[4, 3], [2, 1]]); // Returns [[5, 5], [5, 5]]
         * const broadcast = Chalkboard.tens.add([[1, 2, 3], [4, 5, 6]], [10, 20, 30]); // Returns [[11, 22, 33], [14, 25, 36]]
         */
        export const add = (tens1: ChalkboardTensor, tens2: ChalkboardTensor): ChalkboardTensor => {
            const size1 = $shape(tens1, true, "add", "tens1"), size2 = $shape(tens2, true, "add", "tens2");
            if (Array.isArray(tens1) && Array.isArray(tens2) && !$isSizeEqual(size1, size2)) return $broadcast(tens1, size1, tens2, size2, (a, b) => a + b, "add");
            return $zip(tens1, tens2, (a, b) => a + b);
        };

        /**
         * Calculates the concatenation of two tensors.
         * @param {ChalkboardTensor} tens1 - The first tensor
         * @param {ChalkboardTensor} tens2 - The second tensor
         * @param {number} [axis=0] - The axis to concatenate along, starting from 0 for the outermost axis
         * @returns {ChalkboardTensor}
         * @example
         * const result = Chalkboard.tens.concat([[1, 2]], [[3, 4]], 1); // Returns [[1, 2, 3, 4]]
         */
        export const concat = (tens1: ChalkboardTensor, tens2: ChalkboardTensor, axis: number = 0): ChalkboardTensor => {
            const size1 = $shape(tens1, false, "concat", "tens1"), size2 = $shape(tens2, false, "concat", "tens2");
            if (!Number.isInteger(axis) || axis < 0 || axis >= Math.min(size1.length, size2.length)) throw new Error(`Chalkboard.tens.concat: Parameter "axis" must be a non-negative integer less than both tensor ranks.`);
            if (size1.length !== size2.length || size1.some((n, i) => i !== axis && n !== size2[i])) throw new Error(`Chalkboard.tens.concat: Parameters "tens1" and "tens2" must have equal sizes except along the concatenated axis.`);
            const concatAtAxis = (arr1: ChalkboardTensor, arr2: ChalkboardTensor, currentAxis: number): ChalkboardTensor => {
                if (currentAxis === axis) {
                    return $copy((arr1 as ChalkboardTensor[]).concat(arr2));
                }
                return (arr1 as ChalkboardTensor[]).map((element, index) => concatAtAxis(element, (arr2 as ChalkboardTensor[])[index], currentAxis + 1));
            };
            return concatAtAxis(tens1, tens2, 0);
        };

        /**
         * Calculates a tensor constrained within a range.
         * @param {ChalkboardTensor} tens - The tensor
         * @param {number[]} [range=[0, 1]] - The range
         * @returns {ChalkboardTensor}
         * @example
         * const result = Chalkboard.tens.constrain([[-1, 0.5], [2, 1]], [0, 1]); // Returns [[0, 0.5], [1, 1]]
         */
        export const constrain = (tens: ChalkboardTensor, range: [number, number] = [0, 1]): ChalkboardTensor => {
            $shape(tens, true, "constrain", "tens");
            if (!Array.isArray(range) || range.length !== 2 || !Number.isFinite(range[0]) || !Number.isFinite(range[1]) || range[0] > range[1]) throw new Error(`Chalkboard.tens.constrain: Parameter "range" must be an array of two finite numbers whose first element is less than or equal to its second element.`);
            return $map(tens, (x) => Math.max(Math.min(x, range[1]), range[0]));
        };

        /**
         * Calculates the contraction of a tensor over two of its axes, which sums the entries whose indices along both axes are equal and removes those axes (as in NumPy's trace with axis arguments).
         * @param {ChalkboardTensor} tens - The tensor
         * @param {number} [axis1=0] - The first axis
         * @param {number} [axis2=1] - The second axis, which must have the same length as the first axis
         * @returns {ChalkboardTensor | number}
         * @example
         * const result = Chalkboard.tens.contract([[[1, 2], [3, 4], [5, 6]], [[7, 8], [9, 10], [11, 12]]], 0, 2); // Returns [9, 13, 17]
         */
        export const contract = (tens: ChalkboardTensor, axis1: number = 0, axis2: number = 1): ChalkboardTensor | number => {
            const size = $shape(tens, true, "contract", "tens");
            if (size.length < 2) throw new Error(`Chalkboard.tens.contract: Parameter "tens" must have a rank of at least two.`);
            if (!Number.isInteger(axis1) || axis1 < 0 || axis1 >= size.length) throw new Error(`Chalkboard.tens.contract: Parameter "axis1" must be a non-negative integer less than the tensor rank.`);
            if (!Number.isInteger(axis2) || axis2 < 0 || axis2 >= size.length) throw new Error(`Chalkboard.tens.contract: Parameter "axis2" must be a non-negative integer less than the tensor rank.`);
            if (axis1 === axis2) throw new Error(`Chalkboard.tens.contract: Parameters "axis1" and "axis2" must be different axes.`);
            if (size[axis1] !== size[axis2]) throw new Error(`Chalkboard.tens.contract: Parameters "axis1" and "axis2" must be axes of equal length.`);
            return $contract(tens, size, axis1, axis2);
        };

        /**
         * Copies a tensor.
         * @param {ChalkboardTensor} tens - The tensor
         * @returns {ChalkboardTensor}
         * @example
         * const result = Chalkboard.tens.copy([[[1, 2]], [[3, 4]]]); // Returns an independent copy
         */
        export const copy = (tens: ChalkboardTensor): ChalkboardTensor => {
            $shape(tens, false, "copy", "tens");
            return $copy(tens);
        };

        /**
         * Initializes an empty tensor.
         * @param {number[]} size - The size
         * @returns {ChalkboardTensor}
         * @example
         * const result = Chalkboard.tens.empty(2, 3, 4); // Returns an empty 2-by-3-by-4 tensor
         */
        export const empty = (...size: number[]): ChalkboardTensor => {
            size = $size(size, "empty");
            const newNDArray = (size: number[]): ChalkboardTensor | null => {
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
         * @param {number} element - The number to fill the elements with, which may be NaN or infinite
         * @param {number[]} size - The size
         * @returns {ChalkboardTensor}
         * @example
         * const result = Chalkboard.tens.fill(1, 2, 2, 2); // Returns a 2-by-2-by-2 tensor of ones
         */
        export const fill = (element: number, ...size: number[]): ChalkboardTensor => {
            if (typeof element !== "number") throw new Error(`Chalkboard.tens.fill: Parameter "element" must be a number.`);
            size = $size(size, "fill");
            const newNDArray = (size: number[]): ChalkboardTensor => {
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
            $shape(tensor, false, "init", "tensor");
            return $copy(tensor);
        };

        /**
         * Checks if two tensors are approximately equal within a particular precision. Infinities of the same sign are approximately equal, while NaN is never approximately equal to anything.
         * @param {ChalkboardTensor} tens1 - The first tensor
         * @param {ChalkboardTensor} tens2 - The second tensor
         * @param {number} [precision=0.000001] - The precision to check
         * @returns {boolean}
         * @example
         * const result = Chalkboard.tens.isApproxEqual([[1, 2]], [[1, 2.0000001]]); // Returns true
         */
        export const isApproxEqual = (tens1: ChalkboardTensor, tens2: ChalkboardTensor, precision: number = 0.000001): boolean => {
            if (!Number.isFinite(precision) || precision <= 0) throw new Error(`Chalkboard.tens.isApproxEqual: Parameter "precision" must be a positive finite number.`);
            return $isApproxEqual(tens1, tens2, precision, true, "isApproxEqual");
        };

        /**
         * Checks if two tensors are equal.
         * @param {ChalkboardTensor} tens1 - The first tensor
         * @param {ChalkboardTensor} tens2 - The second tensor
         * @returns {boolean}
         * @example
         * const result = Chalkboard.tens.isEqual([[1, 2]], [[1, 2]]); // Returns true
         */
        export const isEqual = (tens1: ChalkboardTensor, tens2: ChalkboardTensor): boolean => {
            return $isApproxEqual(tens1, tens2, 0, false, "isEqual");
        };

        /**
         * Checks if two tensors have equal ranks.
         * @param {ChalkboardTensor} tens1 - The first tensor
         * @param {ChalkboardTensor} tens2 - The second tensor
         * @returns {boolean}
         * @example
         * const result = Chalkboard.tens.isRankEqual([[1, 2]], [[3, 4], [5, 6]]); // Returns true
         */
        export const isRankEqual = (tens1: ChalkboardTensor, tens2: ChalkboardTensor): boolean => {
            return $shape(tens1, false, "isRankEqual", "tens1").length === $shape(tens2, false, "isRankEqual", "tens2").length;
        };

        /**
         * Checks if a tensor is of a particular rank.
         * @param {ChalkboardTensor} tens - The tensor
         * @param {number} rank - The rank
         * @returns {boolean}
         * @example
         * const result = Chalkboard.tens.isRankOf([[[1]]], 3); // Returns true
         */
        export const isRankOf = (tens: ChalkboardTensor, rank: number): boolean => {
            const size = $shape(tens, false, "isRankOf", "tens");
            if (!Number.isInteger(rank) || rank < 0) throw new Error(`Chalkboard.tens.isRankOf: Parameter "rank" must be a non-negative integer.`);
            return size.length === rank;
        };

        /**
         * Checks if two tensors have equal sizes.
         * @param {ChalkboardTensor} tens1 - The first tensor
         * @param {ChalkboardTensor} tens2 - The second tensor
         * @returns {boolean}
         * @example
         * const result = Chalkboard.tens.isSizeEqual([[1, 2]], [[3, 4]]); // Returns true
         */
        export const isSizeEqual = (tens1: ChalkboardTensor, tens2: ChalkboardTensor): boolean => {
            return $isSizeEqual($shape(tens1, false, "isSizeEqual", "tens1"), $shape(tens2, false, "isSizeEqual", "tens2"));
        };

        /**
         * Checks if a tensor is of a particular size.
         * @param {ChalkboardTensor} tens - The tensor
         * @param {number[]} size - The size
         * @returns {boolean}
         * @example
         * const result = Chalkboard.tens.isSizeOf([[[1, 2]], [[3, 4]]], 2, 1, 2); // Returns true
         */
        export const isSizeOf = (tens: ChalkboardTensor, ...size: number[]): boolean => {
            return $isSizeEqual($shape(tens, false, "isSizeOf", "tens"), $size(size, "isSizeOf"));
        };

        /**
         * Checks if a tensor has a uniform size (analogous to checking if a matrix is square).
         * @param {ChalkboardTensor} tens - The tensor
         * @returns {boolean}
         * @example
         * const result = Chalkboard.tens.isSizeUniform([[1, 2], [3, 4]]); // Returns true
         */
        export const isSizeUniform = (tens: ChalkboardTensor): boolean => {
            const size = $shape(tens, false, "isSizeUniform", "tens");
            return size.every((n) => n === size[0]);
        };

        /**
         * Checks if a tensor is a zero tensor. Elements that are NaN or infinite are never zero.
         * @param {ChalkboardTensor} tens - The tensor
         * @returns {boolean}
         * @example
         * const result = Chalkboard.tens.isZero([[0, 0], [0, 0]]); // Returns true
         */
        export const isZero = (tens: ChalkboardTensor): boolean => {
            $shape(tens, true, "isZero", "tens");
            const check = (tens: ChalkboardTensor): boolean => {
                if (!Array.isArray(tens)) return Math.abs(tens) < 0.000001;
                for (let i = 0; i < tens.length; i++) {
                    const t = tens[i];
                    if (Array.isArray(t) ? !check(t) : !(Math.abs(t) < 0.000001)) return false;
                }
                return true;
            };
            return check(tens);
        };

        /**
         * Calculates the tensor (outer) product of two tensors, whose axes are the axes of the first tensor followed by the axes of the second tensor, so that the entry at index (i, ..., j, ...) is the product of the entries at (i, ...) and (j, ...); a number operand multiplies every entry of the other operand.
         * @param {ChalkboardTensor} tens1 - The first tensor
         * @param {ChalkboardTensor} tens2 - The second tensor
         * @returns {ChalkboardTensor}
         * @example
         * const result = Chalkboard.tens.mul([1, 2], [3, 4]); // Returns [[3, 4], [6, 8]]
         */
        export const mul = (tens1: ChalkboardTensor, tens2: ChalkboardTensor): ChalkboardTensor => {
            $shape(tens1, true, "mul", "tens1");
            $shape(tens2, true, "mul", "tens2");
            return $outer(tens1, tens2);
        };

        /**
         * Calculates the Hadamard (elementwise) product of two tensors, which are broadcast together as in NumPy (their sizes are aligned from the right, and axes of length 1 or missing axes are stretched).
         * @param {ChalkboardTensor} tens1 - The first tensor
         * @param {ChalkboardTensor} tens2 - The second tensor
         * @returns {ChalkboardTensor}
         * @example
         * const result = Chalkboard.tens.mulHadamard([[1, 2], [3, 4]], [[5, 6], [7, 8]]); // Returns [[5, 12], [21, 32]]
         * const broadcast = Chalkboard.tens.mulHadamard([[1, 2], [3, 4]], [10, 100]); // Returns [[10, 200], [30, 400]]
         */
        export const mulHadamard = (tens1: ChalkboardTensor, tens2: ChalkboardTensor): ChalkboardTensor => {
            const size1 = $shape(tens1, true, "mulHadamard", "tens1"), size2 = $shape(tens2, true, "mulHadamard", "tens2");
            if (Array.isArray(tens1) && Array.isArray(tens2) && !$isSizeEqual(size1, size2)) return $broadcast(tens1, size1, tens2, size2, (a, b) => a * b, "mulHadamard");
            return $zip(tens1, tens2, (a, b) => a * b);
        };

        /**
         * Calculates the negation of a tensor.
         * @param {ChalkboardTensor} tens - The tensor
         * @returns {ChalkboardTensor}
         * @example
         * const result = Chalkboard.tens.negate([[1, -2], [3, -4]]); // Returns [[-1, 2], [-3, 4]]
         */
        export const negate = (tens: ChalkboardTensor): ChalkboardTensor => {
            $shape(tens, true, "negate", "tens");
            return $map(tens, (x) => -x);
        };

        /**
         * Calculates the permutation of the axes of a tensor, so that axis k of the result is axis axes[k] of the tensor (as in NumPy's transpose with an axes argument).
         * @param {ChalkboardTensor} tens - The tensor
         * @param {number[]} axes - The order of the axes, as a permutation of the integers from 0 to the tensor rank minus one, either as a sequence of arguments or one array
         * @returns {ChalkboardTensor}
         * @example
         * const result = Chalkboard.tens.permute([[[1, 2, 3]], [[4, 5, 6]]], 2, 0, 1); // Returns [[[1], [4]], [[2], [5]], [[3], [6]]]
         */
        export const permute = (tens: ChalkboardTensor, ...axes: number[]): ChalkboardTensor => {
            const size = $shape(tens, false, "permute", "tens");
            axes = Array.isArray(axes[0]) ? axes[0] : axes;
            if (axes.length !== size.length || new Set(axes).size !== size.length || Array.from(axes).some((a) => !Number.isInteger(a) || a < 0 || a >= size.length)) throw new Error(`Chalkboard.tens.permute: Parameter "axes" must be a permutation of the integers from 0 to the tensor rank minus one.`);
            return $permute(tens, size, axes);
        };

        /**
         * Prints a tensor in the console.
         * @param {ChalkboardTensor} tens - The tensor
         * @returns {void}
         * @example
         * Chalkboard.tens.print([[[1, 2]], [[3, 4]]]); // Prints the tensor
         */
        export const print = (tens: ChalkboardTensor): void => {
            $shape(tens, false, "print", "tens");
            console.log($string(tens, 0));
        };

        /**
         * Returns a tensor with elements in an axis removed (pulled out).
         * @param {ChalkboardTensor} tens - The tensor
         * @param {number} axis - The axis, starting from 0 for the outermost axis
         * @param {number} index - The index of the elements to pull
         * @returns {ChalkboardTensor}
         * @example
         * const result = Chalkboard.tens.pull([[[1, 2]], [[3, 4]]], 1, 0); // Removes the first outer slice
         */
        export const pull = (tens: ChalkboardTensor, axis: number, index: number): ChalkboardTensor => {
            const size = $shape(tens, false, "pull", "tens");
            if (!Number.isInteger(axis) || axis < 0 || axis >= size.length) throw new Error(`Chalkboard.tens.pull: Parameter "axis" must be a non-negative integer less than the tensor rank.`);
            if (!Number.isInteger(index) || index < 0 || index >= size[axis]) throw new Error(`Chalkboard.tens.pull: Parameter "index" must be an integer within the selected axis bounds.`);
            const remove = (tensor: ChalkboardTensor[], currentAxis: number): void => {
                if (currentAxis === 0) {
                    tensor.splice(index, 1);
                } else {
                    for (let i = 0; i < tensor.length; i++) {
                        remove(tensor[i] as ChalkboardTensor[], currentAxis - 1);
                    }
                }
            };
            remove(tens as ChalkboardTensor[], axis);
            return tens;
        };

        /**
         * Returns a tensor with elements in an axis added (pushed in).
         * @param {ChalkboardTensor} tens - The tensor
         * @param {number} axis - The axis, starting from 0 for the outermost axis
         * @param {number} index - The index at which to insert the elements
         * @param {ChalkboardTensor} elements - The elements to push
         * @returns {ChalkboardTensor}
         * @example
         * const result = Chalkboard.tens.push([[[1, 2]]], 1, 1, [[3, 4]]); // Returns [[[1, 2], [3, 4]]]
         */
        export const push = (tens: ChalkboardTensor, axis: number, index: number, elements: ChalkboardTensor): ChalkboardTensor => {
            const size = $shape(tens, false, "push", "tens");
            if (!Number.isInteger(axis) || axis < 0 || axis >= size.length) throw new Error(`Chalkboard.tens.push: Parameter "axis" must be a non-negative integer less than the tensor rank.`);
            if (!Number.isInteger(index) || index < 0 || index > size[axis]) throw new Error(`Chalkboard.tens.push: Parameter "index" must be an integer within the selected axis insertion bounds.`);
            if (!$isSizeEqual($shape(elements, false, "push", "elements"), size.slice(0, axis).concat(size.slice(axis + 1)))) throw new Error(`Chalkboard.tens.push: Parameter "elements" must be a tensor whose size equals the size of "tens" without the selected axis.`);
            const insert = (tensor: ChalkboardTensor[], currentAxis: number, currentElements: ChalkboardTensor): ChalkboardTensor[] => {
                if (currentAxis === 0) {
                    tensor.splice(index, 0, currentElements);
                } else {
                    for (let i = 0; i < tensor.length; i++) {
                        insert(tensor[i] as ChalkboardTensor[], currentAxis - 1, (currentElements as ChalkboardTensor[])[i]);
                    }
                }
                return tensor;
            };
            return insert(tens as ChalkboardTensor[], axis, elements);
        };

        /**
         * Initializes a random tensor.
         * @param {number} inf - The lower bound
         * @param {number} sup - The upper bound
         * @param {number[]} size - The size
         * @returns {ChalkboardTensor}
         * @example
         * const result = Chalkboard.tens.random(-1, 1, 2, 2, 2); // Returns a random 2-by-2-by-2 tensor
         */
        export const random = (inf: number, sup: number, ...size: number[]): ChalkboardTensor => {
            if (!Number.isFinite(inf)) throw new Error(`Chalkboard.tens.random: Parameter "inf" must be a finite number.`);
            if (!Number.isFinite(sup)) throw new Error(`Chalkboard.tens.random: Parameter "sup" must be a finite number.`);
            size = $size(size, "random");
            const newNDArray = (size: number[]): ChalkboardTensor => {
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
         * @example
         * const result = Chalkboard.tens.rank([[[1, 2]], [[3, 4]]]); // Returns 3
         */
        export const rank = (tens: ChalkboardTensor): number => {
            return $shape(tens, false, "rank", "tens").length;
        };

        /**
         * Calculates the reciprocal of a tensor.
         * @param {ChalkboardTensor} tens - The tensor
         * @returns {ChalkboardTensor}
         * @example
         * const result = Chalkboard.tens.reciprocate([[1, 2], [4, 8]]); // Returns [[1, 0.5], [0.25, 0.125]]
         */
        export const reciprocate = (tens: ChalkboardTensor): ChalkboardTensor => {
            $shape(tens, true, "reciprocate", "tens");
            return $map(tens, (x) => 1 / x);
        };

        /**
         * Returns a tensor with the same entries in row-major order but a different size, which must contain the same number of entries (unlike resize, which truncates or pads with zeros).
         * @param {ChalkboardTensor} tens - The tensor
         * @param {number[]} size - The size to change to, either as a sequence of arguments or one array
         * @returns {ChalkboardTensor}
         * @example
         * const result = Chalkboard.tens.reshape([1, 2, 3, 4, 5, 6], 2, 3); // Returns [[1, 2, 3], [4, 5, 6]]
         */
        export const reshape = (tens: ChalkboardTensor, ...size: number[]): ChalkboardTensor => {
            const shape = $shape(tens, false, "reshape", "tens");
            size = $size(size, "reshape");
            if (size.reduce((a, b) => a * b, 1) !== shape.reduce((a, b) => a * b, 1)) throw new Error(`Chalkboard.tens.reshape: Parameter "size" must have a product equal to the number of entries of "tens".`);
            if (size.length === 0) return $flatten(tens)[0];
            return $resize(tens, size);
        };

        /**
         * Returns a tensor with its size changed.
         * @param {ChalkboardTensor} tens - The tensor
         * @param {number[]} size - The size to change to
         * @returns {ChalkboardTensor}
         * @example
         * const result = Chalkboard.tens.resize([[1, 2], [3, 4]], 4); // Returns [1, 2, 3, 4]
         */
        export const resize = (tens: ChalkboardTensor, ...size: number[]): ChalkboardTensor => {
            $shape(tens, false, "resize", "tens");
            return $resize(tens, $size(size, "resize"));
        };

        /**
         * Calculates the rounding of a tensor.
         * @param {ChalkboardTensor} tens - The tensor
         * @returns {ChalkboardTensor}
         * @example
         * const result = Chalkboard.tens.round([[1.2, 2.7], [-3.5, 4.4]]); // Returns [[1, 3], [-3, 4]]
         */
        export const round = (tens: ChalkboardTensor): ChalkboardTensor => {
            $shape(tens, true, "round", "tens");
            return $map(tens, (x) => Math.round(x));
        };

        /**
         * Calculates the scalar multiplication of a tensor.
         * @param {ChalkboardTensor} tens - The tensor
         * @param {number} num - The number, which may be NaN or infinite
         * @returns {ChalkboardTensor}
         * @example
         * const result = Chalkboard.tens.scl([[1, 2], [3, 4]], 2); // Returns [[2, 4], [6, 8]]
         */
        export const scl = (tens: ChalkboardTensor, num: number): ChalkboardTensor => {
            $shape(tens, true, "scl", "tens");
            if (typeof num !== "number") throw new Error(`Chalkboard.tens.scl: Parameter "num" must be a number.`);
            return $map(tens, (x) => x * num);
        };

        /**
         * Returns the size of a tensor.
         * @param {ChalkboardTensor} tens - The tensor
         * @returns {number[]}
         * @example
         * const result = Chalkboard.tens.size([[[1, 2]], [[3, 4]]]); // Returns [2, 1, 2]
         */
        export const size = (tens: ChalkboardTensor): number[] => {
            return $shape(tens, false, "size", "tens");
        };

        /**
         * Calculates the subtraction of two tensors, which are broadcast together as in NumPy (their sizes are aligned from the right, and axes of length 1 or missing axes are stretched).
         * @param {ChalkboardTensor} tens1 - The first tensor
         * @param {ChalkboardTensor} tens2 - The second tensor
         * @returns {ChalkboardTensor}
         * @example
         * const result = Chalkboard.tens.sub([[5, 8], [13, 21]], [[2, 3], [5, 8]]); // Returns [[3, 5], [8, 13]]
         * const broadcast = Chalkboard.tens.sub([10], [[1], [2]]); // Returns [[9], [8]]
         */
        export const sub = (tens1: ChalkboardTensor, tens2: ChalkboardTensor): ChalkboardTensor => {
            const size1 = $shape(tens1, true, "sub", "tens1"), size2 = $shape(tens2, true, "sub", "tens2");
            if (Array.isArray(tens1) && Array.isArray(tens2) && !$isSizeEqual(size1, size2)) return $broadcast(tens1, size1, tens2, size2, (a, b) => a - b, "sub");
            return $zip(tens1, tens2, (a, b) => a - b);
        };

        /**
         * Converts a tensor to an array.
         * @param {ChalkboardTensor} tens - The tensor
         * @returns {number[]}
         * @example
         * const result = Chalkboard.tens.toArray([[[1, 2]], [[3, 4]]]); // Returns [1, 2, 3, 4]
         */
        export const toArray = (tens: ChalkboardTensor): number[] => {
            $shape(tens, false, "toArray", "tens");
            return $flatten(tens);
        };

        /**
         * Converts a tensor to a matrix.
         * @param {ChalkboardTensor} tens - The tensor
         * @returns {ChalkboardMatrix}
         * @example
         * const result = Chalkboard.tens.toMatrix([[[1, 2]], [[3, 4]]]); // Returns a matrix containing the tensor values
         */
        export const toMatrix = (tens: ChalkboardTensor): ChalkboardMatrix => {
            $shape(tens, false, "toMatrix", "tens");
            const result = Chalkboard.matr.init();
            const arr = $flatten(tens);
            const rows = (tens as ChalkboardTensor[]).length || 1;
            for (let j = 0; j < rows; j++) {
                result.push(arr.slice((j * arr.length) / rows, ((j + 1) * arr.length) / rows));
            }
            return result;
        };

        /**
         * Converts a tensor to an object.
         * @param {ChalkboardTensor} tens - The tensor
         * @returns {object}
         * @example
         * const result = Chalkboard.tens.toObject([[1, 2], [3, 4]]); // Returns a nested object
         */
        export const toObject = (tens: ChalkboardTensor): object | number => {
            $shape(tens, false, "toObject", "tens");
            const objectify = (tens: ChalkboardTensor): object | number => {
                if (Array.isArray(tens)) {
                    const result: { [key: string]: number | object } = {};
                    for (let i = 0; i < tens.length; i++) {
                        result["_" + (i + 1)] = objectify(tens[i]);
                    }
                    return result;
                } else {
                    return tens;
                }
            };
            return objectify(tens);
        };

        /**
         * Converts a tensor to a set.
         * @param {ChalkboardTensor} tens - The tensor 
         * @returns {ChalkboardSet<number>}
         * @example
         * const result = Chalkboard.tens.toSet([[1, 1], [2, 3]]); // Returns the set {1, 2, 3}
         */
        export const toSet = (tens: ChalkboardTensor): ChalkboardSet<number> => {
            $shape(tens, true, "toSet", "tens");
            return Chalkboard.abal.set($flatten(tens));
        };

        /**
         * Converts a tensor to a string.
         * @param {ChalkboardTensor} tens - The tensor
         * @returns {string}
         * @example
         * const result = Chalkboard.tens.toString([[[1, 2]], [[3, 4]]], 2); // Returns an indented tensor string
         */
        export const toString = (tens: ChalkboardTensor, indentation: number = 0): string => {
            $shape(tens, false, "toString", "tens");
            if (!Number.isInteger(indentation) || indentation < 0) throw new Error(`Chalkboard.tens.toString: Parameter "indentation" must be a non-negative integer.`);
            return $string(tens, indentation);
        };

        /**
         * Converts a tensor to a typed array.
         * @param {ChalkboardTensor} tens - The tensor
         * @param {"int8" | "int16" | "int32" | "float32" | "float64" | "bigint64"} [type="float32"] - The type of the typed array, which can be "int8", "int16", "int32", "float32", "float64", or "bigint64" (optional, defaults to "float32")
         * @returns {Int8Array | Int16Array | Int32Array | Float32Array | Float64Array | BigInt64Array}
         * @example
         * const result = Chalkboard.tens.toTypedArray([[1, 2], [3, 4]], "float64"); // Returns a Float64Array
         */
        export const toTypedArray = (tens: ChalkboardTensor, type: "int8" | "int16" | "int32" | "float32" | "float64" | "bigint64" = "float32"): Int8Array | Int16Array | Int32Array | Float32Array | Float64Array | BigInt64Array => {
            $shape(tens, true, "toTypedArray", "tens");
            const arr = $flatten(tens);
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
         * @example
         * const result = Chalkboard.tens.toVector([[3, 4], [5, 12]], 2, 1); // Returns the second two-dimensional vector
         */
        export const toVector = (tens: ChalkboardTensor, dimension: number, index: number = 0): ChalkboardVector => {
            $shape(tens, true, "toVector", "tens");
            if (dimension !== 2 && dimension !== 3 && dimension !== 4) throw new Error(`Chalkboard.tens.toVector: Parameter "dimension" must be 2, 3, or 4.`);
            const arr = $flatten(tens);
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
         * Calculates the transpose of a tensor by reversing the order of its axes, so that the entry at index (i, j, ..., k) moves to (k, ..., j, i).
         * @param {ChalkboardTensor} tens - The tensor
         * @returns {ChalkboardTensor}
         * @example
         * const result = Chalkboard.tens.transpose([[1, 2, 3], [4, 5, 6]]); // Returns [[1, 4], [2, 5], [3, 6]]
         */
        export const transpose = (tens: ChalkboardTensor): ChalkboardTensor => {
            const size = $shape(tens, false, "transpose", "tens");
            return $permute(tens, size, size.map((_, k) => size.length - 1 - k));
        };

        /**
         * Initializes a zero tensor.
         * @param {number[]} size - The size
         * @returns {ChalkboardTensor}
         * @example
         * const result = Chalkboard.tens.zero(2, 2, 2); // Returns a 2-by-2-by-2 zero tensor
         */
        export const zero = (...size: number[]): ChalkboardTensor => {
            size = $size(size, "zero");
            const newNDArray = (size: number[]): ChalkboardTensor => {
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
