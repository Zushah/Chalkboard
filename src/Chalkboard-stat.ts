/*
    The Chalkboard Library - Statistics Namespace
    Version 1.7.0 Descartes
*/
/// <reference path="Chalkboard.ts"/>
namespace Chalkboard {
    export namespace stat {
        export const array = (inf: number, sup: number, length: number = sup - inf + 1): number[] => {
            let result = [];
            let step = (sup - inf) / (length - 1);
            for(let i = 0; i < length; i++) {
                result.push(inf + (step * i));
            }
            return result;
        }
        export const autocorrelation = (arr: number[]): number[] => {
            return Chalkboard.stat.correlation(arr, arr);
        }
        export const change = (arr1: number[], arr2: number[]): number[] => {
            let result = [];
            if(arr1.length === arr2.length) {
                for(let i = 0; i < arr1.length; i++) {
                    result.push(Chalkboard.numb.change(arr1[i], arr2[i]));
                }
                return result;
            } else {
                throw new RangeError("Parameters \"arr1\" and \"arr2\" must be of type \"number[]\" with the same \"length\" property.");
            }
        }
        export const chiSquared = (arr1: number[], arr2: number[]): number[] => {
            let result = [];
            if(arr1.length === arr2.length) {
                for(let i = 0; i < arr1.length; i++) {
                    result.push(((arr1[i] - arr2[i]) * (arr1[i] - arr2[i])) / arr2[i]);
                }
                return result;
            } else {
                throw new RangeError("Parameters \"arr1\" and \"arr2\" must be of type \"number[]\" with the same \"length\" property.");
            }
        }
        export const confidenceInterval = (arr: number[]): [number, number] => {
            return [Chalkboard.stat.mean(arr) - 1.96 * (Chalkboard.stat.deviation(arr) / Chalkboard.real.sqrt(arr.length)), Chalkboard.stat.mean(arr) + 1.96 * (Chalkboard.stat.deviation(arr) / Chalkboard.real.sqrt(arr.length))];
        }
        export const constrain = (arr: number[], range: [number, number] = [0, 1]): number[] => {
            let result = [];
            for(let i = 0; i < arr.length; i++) {
                result.push(Chalkboard.numb.constrain(arr[i], range));
            }
            return result;
        }
        export const convolution = (arr1: number[], arr2: number[]): number[] => {
            let result = [];
            for(let i = 0; i < arr1.length + arr2.length - 1; i++) {
                let sum = 0;
                for(let j = Math.max(0, i - arr2.length + 1); j < Math.min(arr1.length, i + 1); j++) {
                    sum += arr1[j] * arr2[i - j];
                }
                result.push(sum);
            }
            return result;
        }
        export const correlation = (arr1: number[], arr2: number[]): number[] => {
            let result = [];
            for(let i = 0; i < arr1.length + arr2.length - 1; i++) {
                let sum = 0;
                for(let j = Math.max(0, i - arr2.length + 1); j < Math.min(arr1.length, i + 1); j++) {
                    sum += arr1[j] * arr2[arr2.length - 1 - i + j];
                }
                result.push(sum);
            }
            return result;
        }
        export const deviation = (arr: number[]): number => {
            let result = 0;
            for(let i = 0; i < arr.length; i++) {
                result += (arr[i] - Chalkboard.stat.mean(arr)) * (arr[i] - Chalkboard.stat.mean(arr));
            }
            return Chalkboard.real.sqrt(result / arr.length);
        }
        export const error = (arr: number[]): number => {
            return Chalkboard.stat.deviation(arr) / Chalkboard.real.sqrt(arr.length);
        }
        export const eq = (arr: number[], arrORnum: number | number[]): number[] => {
            let result = [];
            if(Array.isArray(arrORnum)) {
                if(arr.length === arrORnum.length) {
                    for(let i = 0; i < arr.length; i++) {
                        if(arr[i] === arrORnum[i]) {
                            result.push(arr[i]);
                        }
                    }
                }
            } else {
                for(let i = 0; i < arr.length; i++) {
                    if(arr[i] === arrORnum) {
                        result.push(arr[i]);
                    }
                }
            }
            return result;
        }
        export const Gaussian = (height: number, mean: number, deviation: number): ChalkboardFunction => {
            return Chalkboard.real.define(height.toString() + " * Math.exp(-((x - " + mean.toString() + ") * (x - " + mean.toString() + ")) / (2 * " + deviation.toString() + " * " + deviation.toString() + "))");
        }
        export const gt = (arr: number[], arrORnum: number | number[], includeEnd: boolean = false): number[] => {
            let result = [];
            if(Array.isArray(arrORnum)) {
                if(arr.length === arrORnum.length) {
                    for(let i = 0; i < arr.length; i++) {
                        if(includeEnd) {
                            if(arr[i] >= arrORnum[i]) {
                                result.push(arr[i]);
                            }
                        } else {
                            if(arr[i] > arrORnum[i]) {
                                result.push(arr[i]);
                            }
                        }
                    }
                }
            } else {
                for(let i = 0; i < arr.length; i++) {
                    if(includeEnd) {
                        if(arr[i] >= arrORnum) {
                            result.push(arr[i]);
                        }
                    } else {
                        if(arr[i] > arrORnum) {
                            result.push(arr[i]);
                        }
                    }
                }
            }
            return result;
        }
        export const ineq = (arr: number[], inf: number, sup: number, includeInf: boolean = false, includeSup: boolean = false): number[] => {
            let result = [];
            if(Array.isArray(inf) && Array.isArray(sup)) {
                if(arr.length === inf.length && arr.length === sup.length) {
                    for(let i = 0; i < arr.length; i++) {
                        if(includeInf) {
                            if(includeSup) {
                                if(arr[i] >= inf[i] && arr[i] <= sup[i]) {
                                    result.push(arr[i]);
                                }
                            } else {
                                if(arr[i] >= inf[i] && arr[i] < sup[i]) {
                                    result.push(arr[i]);
                                }
                            }
                        } else {
                            if(includeSup) {
                                if(arr[i] > inf[i] && arr[i] <= sup[i]) {
                                    result.push(arr[i]);
                                }
                            } else {
                                if(arr[i] > inf[i] && arr[i] < sup[i]) {
                                    result.push(arr[i]);
                                }
                            }
                        }
                    }
                }
            } else {
                for(let i = 0; i < arr.length; i++) {
                    if(includeInf) {
                        if(includeSup) {
                            if(arr[i] >= inf && arr[i] <= sup) {
                                result.push(arr[i]);
                            }
                        } else {
                            if(arr[i] >= inf && arr[i] < sup) {
                                result.push(arr[i]);
                            }
                        }
                    } else {
                        if(includeSup) {
                            if(arr[i] > inf && arr[i] <= sup) {
                                result.push(arr[i]);
                            }
                        } else {
                            if(arr[i] > inf && arr[i] < sup) {
                                result.push(arr[i]);
                            }
                        }
                    }
                }
            }
            return result;
        }
        export const kurtosis = (arr: number[]): number => {
            let result = 0;
            let mean = Chalkboard.stat.mean(arr);
            let deviation = Chalkboard.stat.deviation(arr);
            for(let i = 0; i < arr.length; i++) {
                result += (arr[i] - mean) * (arr[i] - mean) * (arr[i] - mean) * (arr[i] - mean);
            }
            return result / (deviation * deviation * deviation * deviation) - 3;
        }
        export const lt = (arr: number[], arrORnum: number | number[], includeEnd: boolean = false): number[] => {
            let result = [];
            if(Array.isArray(arrORnum)) {
                if(arr.length === arrORnum.length) {
                    for(let i = 0; i < arr.length; i++) {
                        if(includeEnd) {
                            if(arr[i] <= arrORnum[i]) {
                                result.push(arr[i]);
                            }
                        } else {
                            if(arr[i] < arrORnum[i]) {
                                result.push(arr[i]);
                            }
                        }
                    }
                }
            } else {
                for(let i = 0; i < arr.length; i++) {
                    if(includeEnd) {
                        if(arr[i] <= arrORnum) {
                            result.push(arr[i]);
                        }
                    } else {
                        if(arr[i] < arrORnum) {
                            result.push(arr[i]);
                        }
                    }
                }
            }
            return result;
        }
        export const mad = (arr: number[]): number => {
            let result = 0;
            for(let i = 0; i < arr.length; i++) {
                result += Math.abs(arr[i] - Chalkboard.stat.mean(arr));
            }
            return result / arr.length;
        }
        export const max = (arr: number[]): number => {
            let max = arr[0];
            for(let i = 0; i < arr.length; i++) {
                if(arr[i] > max) {
                    max = arr[i];
                }
            }
            return max;
        }
        export const mean = (arr: number[], type: "arithmetic" | "geometric" | "harmonic" = "arithmetic"): number => {
            let result = 0;
            if(type === "arithmetic") {
                for(let i = 0; i < arr.length; i++) {
                    result += arr[i];
                }
                return result / arr.length;
            } else if(type === "geometric") {
                for(let i = 0; i < arr.length; i++) {
                    result *= arr[i];
                }
                return Chalkboard.real.root(Math.abs(result), arr.length);
            } else if(type === "harmonic") {
                for(let i = 0; i < arr.length; i++) {
                    result += 1 / arr[i];
                }
                return arr.length / result;
            } else {
                throw new TypeError("Parameter \"type\" must be \"arithmetic\", \"geometric\", or \"harmonic\".");
            }
        }
        export const median = (arr: number[]): number => {
            let temp = arr.slice().sort(function(a, b) {
                return a - b;
            });
            if(temp.length % 2 === 1) {
                return temp[Math.floor(temp.length / 2)];
            } else {
                return (temp[temp.length / 2] + temp[(temp.length / 2) - 1]) / 2;
            }
        }
        export const min = (arr: number[]): number => {
            let min = arr[0];
            for(let i = 0; i < arr.length; i++) {
                if(arr[i] < min) {
                    min = arr[i];
                }
            }
            return min;
        }
        export const mode = (arr: number[]): number => {
            let temp = arr.slice().sort(function(a, b) {
                return a - b;
            });
            let bestStr = 1;
            let currStr = 1;
            let bestElm = temp[0];
            let currElm = temp[0];
            for(let i = 1; i < temp.length; i++) {
                if(temp[i - 1] !== temp[i]) {
                    if(currStr > bestStr) {
                        bestStr = currStr;
                        bestElm = currElm;
                    }
                    currStr = 0;
                    currElm = temp[i];
                }
                currStr++;
            }
            if(currStr > bestStr) {
                return currElm;
            } else {
                return bestElm;
            }
        }
        export const norm = (arr: number[], type: "L0" | "L1" | "L2" | "LInfinity" = "L2"): number => {
            let result = 0;
            if(type === "L0") {
                for(let i = 0; i < arr.length; i++) {
                    if(arr[i] !== 0) {
                        result += 1;
                    }
                }
                return result;
            } else if(type === "L1") {
                for(let i = 0; i < arr.length; i++) {
                    result += Math.abs(arr[i]);
                }
                return result;
            } else if(type === "L2") {
                for(let i = 0; i < arr.length; i++) {
                    result += arr[i] * arr[i];
                }
                return Chalkboard.real.sqrt(result);
            } else if(type === "LInfinity") {
                return Math.abs(Chalkboard.stat.max(arr));
            } else {
                throw new TypeError("Parameter \"type\" must be \"L0\", \"L1\", \"L2\", or \"LInfinity\".");
            }
        }
        export const normalize = (arr: number[], type: "L0" | "L1" | "L2" | "LInfinity" = "L2"): number[] => {
            let result = [];
            let norm = Chalkboard.stat.norm(arr, type);
            for(let i = 0; i < arr.length; i++) {
                result.push(arr[i] / norm);
            }
            return result;
        }
        export const normsq = (arr: number[], type: "L0" | "L1" | "L2" | "LInfinity" = "L2"): number => {
            let result = 0;
            if(type === "L0") {
                for(let i = 0; i < arr.length; i++) {
                    if(arr[i] !== 0) {
                        result += 1;
                    }
                }
                return result * result;
            } else if(type === "L1") {
                for(let i = 0; i < arr.length; i++) {
                    result += Math.abs(arr[i]);
                }
                return result * result;
            } else if(type === "L2") {
                for(let i = 0; i < arr.length; i++) {
                    result += arr[i] * arr[i];
                }
                return result;
            } else if(type === "LInfinity") {
                return Math.abs(Chalkboard.stat.max(arr)) * Math.abs(Chalkboard.stat.max(arr));
            } else {
                throw new TypeError("Parameter \"type\" must be \"L0\", \"L1\", \"L2\", or \"LInfinity\".");
            }
        }
        export const percentile = (arr: number[], num: number): number => {
            let result = 0;
            for(let i = 0; i < arr.length; i++) {
                if(num >= arr[i]) {
                    result++;
                }
            }
            return (result / arr.length) * 100;
        }
        export const print = (arr: number[]): void => {
            console.log(Chalkboard.stat.toString(arr));
        }
        export const quartile = (arr: number[], type: "Q1" | "Q2" | "Q3"): number => {
            let temp = arr.slice().sort(function(a, b) {
                return a - b;
            });
            let lo = temp.slice(0, Math.floor(temp.length / 2));
            let hi = temp.slice(Math.ceil(temp.length / 2));
            if(type === "Q1") {
                return Chalkboard.stat.median(lo);
            } else if(type === "Q2") {
                return Chalkboard.stat.median(arr);
            } else if(type === "Q3") {
                return Chalkboard.stat.median(hi);
            } else {
                throw new TypeError("Parameter \"type\" must be \"Q1\", \"Q2\", or \"Q3\".");
            }
        }
        export const random = (inf: number, sup: number, length: number): number[] => {
            let result = [];
            for(let i = 0; i < length; i++) {
                result.push(Chalkboard.numb.random(inf, sup));
            }
            return result;
        }
        export const range = (arr: number[]): number => {
            return Chalkboard.stat.max(arr) - Chalkboard.stat.min(arr);
        }
        export const regression = (data: number[][], type: "linear" | "polynomial" | "power" | "exponential" | "logarithmic" = "linear", degree: number = 2): ChalkboardFunction => {
            if(type === "linear") {
                let x = 0, y = 0;
                let xx = 0, xy = 0;
                for(let i = 0; i < data.length; i++) {
                    x += data[i][0];
                    y += data[i][1];
                    xx += data[i][0] * data[i][0];
                    xy += data[i][0] * data[i][1];
                }
                let a = (data.length * xy - x * y) / (data.length * xx - x * x),
                    b = (y / data.length) - (a * x) / data.length;
                return Chalkboard.real.define(a + " * x + " + b);
            } else if(type === "polynomial") {
                let A = Chalkboard.matr.init();
                for(let i = 0; i < data.length; i++) {
                    A.push([]);
                    for(let j = 0; j <= degree; j++) {
                        A[i].push(Chalkboard.real.pow(data[i][0], j));
                    }
                }
                let AT = Chalkboard.matr.transpose(A);
                let B = Chalkboard.matr.init();
                for(let i = 0; i < data.length; i++) {
                    B.push([data[i][1]]);
                }
                let ATA = Chalkboard.matr.mul(AT, A);
                let ATAI = Chalkboard.matr.invert(ATA);
                let x = Chalkboard.matr.mul(Chalkboard.matr.mul(ATAI, AT), B);
                let coeff = [];
                for(let i = 0; i < x.length; i++) {
                    coeff.push(x[i][0]);
                }
                let f = coeff[0].toString() + " + " + coeff[1].toString() + " * x";
                for(let i = 2; i <= degree; i++) {
                    f += " + " + coeff[i].toString() + " * Math.pow(x, " + i + ")";
                }
                return Chalkboard.real.define(f);
            } else if(type === "power") {
                let arr = [0, 0, 0, 0];
                for(let i = 0; i < data.length; i++) {
                    arr[0] += Chalkboard.real.ln(data[i][0]);
                    arr[1] += data[i][1] * Chalkboard.real.ln(data[i][0]);
                    arr[2] += data[i][1];
                    arr[3] += Chalkboard.real.ln(data[i][0]) * Chalkboard.real.ln(data[i][0]);
                }
                let a = Chalkboard.E((arr[2] - ((data.length * arr[1] - arr[2] * arr[0]) / (data.length * arr[3] - arr[0] * arr[0])) * arr[0]) / data.length),
                    b = (data.length * arr[1] - arr[2] * arr[0]) / (data.length * arr[3] - arr[0] * arr[0]);
                return Chalkboard.real.define(a + " * Math.pow(x, " + b + ")");
            } else if(type === "exponential") {
                let arr = [0, 0, 0, 0, 0, 0];
                for(let i = 0; i < data.length; i++) {
                    arr[0] += data[i][0];
                    arr[1] += data[i][1];
                    arr[2] += data[i][0] * data[i][0] * data[i][1];
                    arr[3] += data[i][1] * Chalkboard.real.ln(data[i][1]);
                    arr[4] += data[i][0] & data[i][1] * Chalkboard.real.ln(data[i][1]);
                    arr[5] += data[i][0] * data[i][1];
                }
                let a = Chalkboard.E((arr[2] * arr[3] - arr[5] * arr[4]) / (arr[1] * arr[2] - arr[5] * arr[5])),
                    b = (arr[1] * arr[4] - arr[5] * arr[3]) / (arr[1] * arr[2] - arr[5] * arr[5]);
                return Chalkboard.real.define(a + "* Math.exp(" + b + " * x)");
            } else if(type === "logarithmic") {
                let arr = [0, 0, 0, 0];
                for(let i = 0; i < data.length; i++) {
                    arr[0] += Chalkboard.real.ln(data[i][0]);
                    arr[1] += data[i][1] * Chalkboard.real.ln(data[i][0]);
                    arr[2] += data[i][1];
                    arr[3] += Chalkboard.real.ln(data[i][0]) * Chalkboard.real.ln(data[i][0]);
                }
                let a = (arr[2] - ((data.length * arr[1] - arr[2] * arr[0]) / (data.length * arr[3] - arr[0] * arr[0])) * arr[0]) / data.length,
                    b = (data.length * arr[1] - arr[2] * arr[0]) / (data.length * arr[3] - arr[0] * arr[0]);
                return Chalkboard.real.define(a + " + " + b + " * Math.log(x)");
            } else {
                throw new TypeError("Parameter \"type\" must be \"linear\", \"polynomial\", \"power\", \"exponential\", or \"logarithmic\".");
            }
        }
        export const shuffle = (arr: number[]): number[] => {
            let index, temp, rindex;
            for(index = arr.length - 1; index > 0; index--) {
                rindex = Math.floor(Chalkboard.numb.random(0, index + 1));
                temp = arr[index];
                arr[index] = arr[rindex];
                arr[rindex] = temp;
            }
            return arr;
        }
        export const skewness = (arr: number[]): number => {
            let result = 0;
            let mean = Chalkboard.stat.mean(arr);
            let deviation = Chalkboard.stat.deviation(arr);
            for(let i = 0; i < arr.length; i++) {
                result += (arr[i] - mean) * (arr[i] - mean) * (arr[i] - mean);
            }
            return result / ((arr.length - 1) * (deviation * deviation * deviation));
        }
        export const subsets = (arr: number[]): number[][] => {
            let result: number[][] = [[]];
            arr.sort();
            for(let i = 0; i < arr.length; i++) {
                if(i === 0 || arr[i] !== arr[i - 1]) {
                    let curr = arr[i];
                    let subsetsWithCurr = [];
                    for(let j = 0; j < result.length; j++) {
                        let subset = result[j].slice();
                        subset.push(curr);
                        subsetsWithCurr.push(subset);
                    }
                    result = result.concat(subsetsWithCurr);
                }
            }
            return result;
        }
        export const toMatrix = (arr: number[], rows: number, cols: number): ChalkboardMatrix => {
            let result = Chalkboard.matr.init();
            let index = 0;
            for(let i = 0; i < rows; i++) {
                result[i] = [];
                for(let j = 0; j < cols; j++) {
                    if(index < arr.length) {
                        result[i].push(arr[index]);
                    } else {
                        result[i].push(0);
                    }
                    index++;
                }
            }
            return result;
        }
        export const toObject = (arr: number[]): object => {
            let result: {[key: string]: number} = {};
            for(let i = 0; i < arr.length; i++) {
                result["_" + i.toString()] = arr[i];
            }
            return result;
        }
        export const toString = (arr: number[]): string => {
            return "[" + arr.join(", ") + "]";
        }
        export const toTensor = (arr: number[], ...size: number[]): ChalkboardTensor => {
            if(Array.isArray(size[0])) {
                size = size[0];
            }
            return Chalkboard.tens.resize(arr, ...size);
        }
        export const toVector = (arr: number[], dimension: 2 | 3 | 4, index: number = 0): ChalkboardVector => {
            if(dimension === 2) {
                return Chalkboard.vect.init(arr[index], arr[index + 1]);
            } else if(dimension === 3) {
                return Chalkboard.vect.init(arr[index], arr[index + 1], arr[index + 2]);
            } else if(dimension === 4) {
                return Chalkboard.vect.init(arr[index], arr[index + 1], arr[index + 2], arr[index + 3]);
            } else {
                throw new RangeError("Parameter \"dimension\" must be 2, 3, or 4.");
            }
        }
        export const variance = (arr: number[]): number => {
            let result = 0;
            for(let i = 0; i < arr.length; i++) {
                result += (arr[i] - Chalkboard.stat.mean(arr)) * (arr[i] - Chalkboard.stat.mean(arr));
            }
            return result / arr.length;
        }
    }
}