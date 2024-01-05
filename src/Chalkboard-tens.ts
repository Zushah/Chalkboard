/*
    The Chalkboard Library - Tensor Namespace
    Version 1.7.0 Descartes
*/
/// <reference path="Chalkboard.ts"/>
namespace Chalkboard {
    export namespace tens {
        export const absolute = (tens: ChalkboardTensor): ChalkboardTensor => {
            let result = Chalkboard.tens.init() as ChalkboardTensor[];
            if(Array.isArray(tens)) {
                for(let i = 0; i < tens.length; i++) {
                    result[i] = Chalkboard.tens.absolute(tens[i]);
                }
                return result;
            } else {
                return Math.abs(tens);
            }
        }
        export const add = (tens_1: ChalkboardTensor, tens_2: ChalkboardTensor): ChalkboardTensor => {
            let result = Chalkboard.tens.init() as ChalkboardTensor[];
            if(Array.isArray(tens_1) && Array.isArray(tens_2)) {
                for(let i = 0; i < Math.max(tens_1.length, tens_2.length); i++) {
                    result[i] = Chalkboard.tens.add(tens_1[i] !== undefined ? tens_1[i] : 0, tens_2[i] !== undefined ? tens_2[i] : 0);
                }
                return result;
            } else {
                return (tens_1 as number) + (tens_2 as number);
            }
        }
        export const concat = (tens_1: ChalkboardTensor, tens_2: ChalkboardTensor, rank: number = 1): ChalkboardTensor => {
            let concatAtRank = function(arr1: ChalkboardTensor, arr2: ChalkboardTensor, currentRank: number): ChalkboardTensor {
                if(currentRank === rank) {
                    return Chalkboard.tens.init((arr1 as ChalkboardTensor[]).concat(arr2));
                }
                return (arr1 as ChalkboardTensor[]).map(function(element, index) {
                    return concatAtRank(element, (arr2 as ChalkboardTensor[])[index], currentRank);
                });
            }
            return concatAtRank(tens_1, tens_2, 1);
        }
        export const constrain = (tens: ChalkboardTensor, range: [number, number] = [0, 1]): ChalkboardTensor => {
            let result = Chalkboard.tens.init() as ChalkboardTensor[];
            if(Array.isArray(tens)) {
                for(let i = 0; i < tens.length; i++) {
                    result[i] = Chalkboard.tens.constrain(tens[i], range);
                }
                return result;
            } else {
                return Chalkboard.numb.constrain(tens, range);
            }
        }
        export const contract = (tens: ChalkboardTensor): ChalkboardTensor | number => {
            if(Chalkboard.tens.rank(tens) > 2) {
                return Chalkboard.tens.resize(tens, Chalkboard.tens.size(tens)[0], Chalkboard.tens.size(tens).slice(1).reduce(function(a: number, b: number): number { return a * b; }) / Chalkboard.tens.size(tens)[0]);
            } else if(Chalkboard.tens.rank(tens) === 2) {
                return Chalkboard.matr.trace(tens as number[][]);
            } else {
                return tens;
            }
        }
        export const copy = (tens: ChalkboardTensor): ChalkboardTensor => {
            if(Array.isArray(tens)) {
                let result = Chalkboard.tens.init() as ChalkboardTensor[];
                for(let i = 0; i < tens.length; i++) {
                    result[i] = Chalkboard.tens.copy(tens[i]);
                }
                return result;
            } else {
                return tens;
            }
        }
        export const empty =  (...size: number[]): ChalkboardTensor => {
            if(Array.isArray(size[0])) {
                size = size[0];
            }
            let newNDArray = function(size: number[]): ChalkboardTensor | null {
                if(size.length === 0) {
                    return null;
                }
                let curr = size[0];
                let rest = size.slice(1);
                let result: ChalkboardTensor = [];
                for(let i = 0; i < curr; i++) {
                    result[i] = newNDArray(rest) as ChalkboardTensor;
                }
                return result;
            };
            return newNDArray(size) as ChalkboardTensor;
        }
        export const fill = (element: number, ...size: number[]): ChalkboardTensor => {
            if(Array.isArray(size[0])) {
                size = size[0];
            }
            let newNDArray = function(size: number[]): ChalkboardTensor {
                if(size.length === 0) {
                    return element;
                }
                let curr = size[0];
                let rest = size.slice(1);
                let result = [];
                for(let i = 0; i < curr; i++) {
                    result[i] = newNDArray(rest);
                }
                return result;
            };
            return newNDArray(size);
        }
        export const init = (...tensor: ChalkboardTensor[]): ChalkboardTensor => {
            if(tensor.length === 0) {
                return [];
            } else if(tensor.length === 1 && Array.isArray(tensor[0])) {
                tensor = tensor[0];
            } else {
                tensor = tensor;
            }
            let newNDArray = function(arr: ChalkboardTensor[]): ChalkboardTensor[] {
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
        export const mul = (tens_1: ChalkboardTensor, tens_2: ChalkboardTensor): ChalkboardTensor => {
            let result = Chalkboard.tens.init() as ChalkboardTensor[];
            if(Array.isArray(tens_1) && Array.isArray(tens_2)) {
                for(let i = 0; i < tens_1.length; i++) {
                    let subarr = Chalkboard.tens.init() as ChalkboardTensor[];
                    for(let j = 0; j < tens_2.length; j++) {
                        subarr[j] = Chalkboard.tens.mul(tens_1[i], tens_2[j]);
                    }
                    result.push(subarr);
                }
                return result;
            } else {
                return (tens_1 as number) * (tens_2 as number);
            }
        }
        export const negate = (tens: ChalkboardTensor): ChalkboardTensor => {
            let result = Chalkboard.tens.init() as ChalkboardTensor[];
            if(Array.isArray(tens)) {
                for(let i = 0; i < tens.length; i++) {
                    result[i] = Chalkboard.tens.negate(tens[i]);
                }
                return result;
            } else {
                return -tens;
            }
        }
        export const print = (tens: ChalkboardTensor): void => {
            console.log(Chalkboard.tens.toString(tens));
        }
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
        export const random = (inf: number, sup: number, ...size: number[]): ChalkboardTensor => {
            if(Array.isArray(size[0])) {
                size = size[0];
            }
            let newNDArray = function(size: number[]): ChalkboardTensor {
                if(size.length === 0) {
                    return Chalkboard.numb.random(inf, sup);
                }
                let curr = size[0];
                let rest = size.slice(1);
                let result = [];
                for(let i = 0; i < curr; i++) {
                    result[i] = newNDArray(rest);
                }
                return result;
            };
            return newNDArray(size);
        }
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
        export const reciprocate = (tens: ChalkboardTensor): ChalkboardTensor => {
            let result = Chalkboard.tens.init() as ChalkboardTensor[];
            if(Array.isArray(tens)) {
                for(let i = 0; i < tens.length; i++) {
                    result[i] = Chalkboard.tens.reciprocate(tens[i]);
                }
                return result;
            } else {
                return 1 / tens;
            }
        }
        export const resize = (tens: ChalkboardTensor, ...size: number[]): ChalkboardTensor => {
            if(Array.isArray(size[0])) {
                size = size[0];
            }
            let result = Chalkboard.tens.fill(0, ...size);
            let refill = function(arr1: ChalkboardTensor[], arr2: ChalkboardTensor[]): void {
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
        export const round = (tens: ChalkboardTensor): ChalkboardTensor => {
            let result = Chalkboard.tens.init() as ChalkboardTensor[];
            if(Array.isArray(tens)) {
                for(let i = 0; i < tens.length; i++) {
                    result[i] = Chalkboard.tens.round(tens[i]);
                }
                return result;
            } else {
                return Math.round(tens);
            }
        }
        export const scl = (tens: ChalkboardTensor, num: number): ChalkboardTensor => {
            let result = Chalkboard.tens.init() as ChalkboardTensor[];
            if(Array.isArray(tens)) {
                for(let i = 0; i < tens.length; i++) {
                    result[i] = Chalkboard.tens.scl(tens[i], num);
                }
                return result;
            } else {
                return tens * num;
            }
        }
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
        export const sub = (tens_1: ChalkboardTensor, tens_2: ChalkboardTensor): ChalkboardTensor => {
            let result = Chalkboard.tens.init() as ChalkboardTensor[];
            if(Array.isArray(tens_1) && Array.isArray(tens_2)) {
                for(let i = 0; i < Math.max(tens_1.length, tens_2.length); i++) {
                    result[i] = Chalkboard.tens.sub(tens_1[i] !== undefined ? tens_1[i] : 0, tens_2[i] !== undefined ? tens_2[i] : 0);
                }
                return result;
            } else {
                return (tens_1 as number) - (tens_2 as number);
            }
        }
        export const toArray = (tens: ChalkboardTensor): number[] => {
            let result: number[] = [];
            let flatten = function(tens: ChalkboardTensor): void {
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
        export const toMatrix = (tens: ChalkboardTensor): ChalkboardMatrix => {
            let result = Chalkboard.matr.init();
            let flatten = function(tens: ChalkboardTensor, result: ChalkboardMatrix): void {
                for(let i = 0; i < (tens as ChalkboardTensor[]).length; i++) {
                    if(Array.isArray((tens as ChalkboardTensor[])[i])) {
                        flatten((tens as ChalkboardTensor[])[i], result);
                    } else {
                        result.push((tens as ChalkboardMatrix)[i]);
                    }
                }
            };
            let matr = Chalkboard.matr.init();
            flatten(tens, matr);
            let rows = (tens as ChalkboardTensor[]).length || 1;
            for(let j = 0; j < rows; j++) {
                result.push(matr.slice(j * matr.length / rows, (j + 1) * matr.length / rows) as unknown as number[]);
            }
            return result;
        }
        export const toObject = (tens: ChalkboardTensor): object | number => {
            if(Array.isArray(tens)) {
                let result: {[key: string]: number | object} = {};
                for(let i = 0; i < tens.length; i++) {
                    result["_" + (i + 1)] = Chalkboard.tens.toObject(tens[i]);
                }
                return result;
            } else {
                return tens;
            }
        }
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
        export const toVector = (tens: ChalkboardTensor, dimension: number, index: number = 0): ChalkboardVector => {
            let arr = Chalkboard.tens.toArray(tens);
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
        export const transpose = (tens: ChalkboardTensor): ChalkboardTensor => {
            return Chalkboard.tens.resize(tens, ...Chalkboard.tens.size(tens).reverse());
        }
        export const zero = (tens: ChalkboardTensor): ChalkboardTensor => {
            let result = Chalkboard.tens.init() as ChalkboardTensor[];
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