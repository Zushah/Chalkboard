/*
    The Chalkboard Library - Statistics Namespace
    Version 2.2.0 Galois
*/
/// <reference path="Chalkboard.ts"/>
namespace Chalkboard {
    /**
     * The statistics namespace.
     * @namespace
     */
    export namespace stat {
        /**
         * Calculates the absolute value of all the elements of an array.
         * @param {number[]} arr - The array
         * @returns {number[]}
         */
        export const absolute = (arr: number[]): number[] => {
            const result: number[] = [];
            for (let i = 0; i < arr.length; i++) {
                result.push(Math.abs(arr[i]));
            }
            return result;
        };

        /**
         * Calculates the addition of two arrays.
         * @param {number[]} arr1 - The first array
         * @param {number[]} arr2 - The second array
         * @returns {number[]}
         */
        export const add = (arr1: number[], arr2: number[]): number[] => {
            if (arr1.length !== arr2.length) {
                throw new RangeError('Parameters "arr1" and "arr2" must have the same length.');
            }
            const result: number[] = [];
            for (let i = 0; i < arr1.length; i++) {
                result.push(arr1[i] + arr2[i]);
            }
            return result;
        };

        /**
         * Returns an array with linearly-spaced elements.
         * @param {number} inf - The lower bound
         * @param {number} sup - The upper bound
         * @param {number} [length=sup-inf+1] - The length of the array
         * @returns {number[]}
         */
        export const array = (inf: number, sup: number, length: number = sup - inf + 1): number[] => {
            const result = [];
            const step = (sup - inf) / (length - 1);
            for (let i = 0; i < length; i++) {
                result.push(inf + step * i);
            }
            return result;
        };

        /**
         * Calculates the autocorrelation of an array.
         * @param {number[]} arr - The array
         * @returns {number[]}
         */
        export const autocorrelation = (arr: number[]): number[] => {
            return Chalkboard.stat.correlation(arr, arr);
        };

        /**
         * Calculates the posterior probability using Bayes' theorem.
         * @param {number} pA - The prior probability of A (i.e. P(A))
         * @param {number} pGivenA - The probability of B given A (i.e. P(B|A))
         * @param {number} pGivenNotA - The probability of B given not A (i.e. P(B|!A))
         * @returns {number}
         */
        export const Bayes = (pA: number, pGivenA: number, pGivenNotA: number): number => {
            if (pA < 0 || pA > 1 || pGivenA < 0 || pGivenA > 1 || pGivenNotA < 0 || pGivenNotA > 1) {
                throw new RangeError('All probabilities must be between 0 and 1.');
            }
            return (pGivenA * pA) / (pGivenA * pA + pGivenNotA * (1 - pA));
        };

        /**
         * Calculates the change of two arrays.
         * @param {number[]} arr1 - The first array
         * @param {number[]} arr2 - The second array
         * @returns {number[]}
         */
        export const change = (arr1: number[], arr2: number[]): number[] => {
            if (arr1.length !== arr2.length) {
                throw new RangeError('Parameters "arr1" and "arr2" must have the same length.');
            }
            const result = [];
            for (let i = 0; i < arr1.length; i++) {
                result.push(Chalkboard.numb.change(arr1[i], arr2[i]));
            }
            return result;
        };

        /**
         * Calculates the chi-squared test of two arrays.
         * @param {number[]} arr1 - The first array
         * @param {number[]} arr2 - The second array
         * @returns {number[]}
         */
        export const chiSquared = (arr1: number[], arr2: number[]): number[] => {
            if (arr1.length !== arr2.length) {
                throw new RangeError('Parameters "arr1" and "arr2" must have the same length.');
            }
            const result = [];
            for (let i = 0; i < arr1.length; i++) {
                result.push(((arr1[i] - arr2[i]) * (arr1[i] - arr2[i])) / arr2[i]);
            }
            return result;
        };

        /**
         * Calculates the 95% confidence interval of an array.
         * @param {number[]} arr - The array
         * @returns {number[]}
         */
        export const confidenceInterval = (arr: number[], confidence: number = 0.95): [number, number] => {
            if (confidence <= 0 || confidence >= 1) {
                throw new RangeError('Parameter "confidence" must be between 0 and 1 (exclusive).');
            }
            const z = Chalkboard.stat.inormal(1 - (1 - confidence) / 2);
            const mean = Chalkboard.stat.mean(arr);
            const standardError = Chalkboard.stat.error(arr);
            return [mean - z * standardError, mean + z * standardError];
        };

        /**
         * Returns an array constrained within a range.
         * @param {number[]} arr - The array
         * @param {number[]} range - The range
         * @returns {number[]}
         */
        export const constrain = (arr: number[], range: [number, number] = [0, 1]): number[] => {
            const result = [];
            for (let i = 0; i < arr.length; i++) {
                result.push(Chalkboard.numb.constrain(arr[i], range));
            }
            return result;
        };

        /**
         * Calculates the convolution of two arrays.
         * @param {number[]} arr1 - The first array
         * @param {number[]} arr2 - The second array
         * @returns {number[]}
         */
        export const convolution = (arr1: number[], arr2: number[]): number[] => {
            const result = [];
            for (let i = 0; i < arr1.length + arr2.length - 1; i++) {
                let sum = 0;
                for (let j = Math.max(0, i - arr2.length + 1); j < Math.min(arr1.length, i + 1); j++) {
                    sum += arr1[j] * arr2[i - j];
                }
                result.push(sum);
            }
            return result;
        };

        /**
         * Calculates the cross-correlation of two arrays.
         * @param {number[]} arr1 - The first array
         * @param {number[]} arr2 - The second array
         * @returns {number[]}
         */
        export const correlation = (arr1: number[], arr2: number[]): number[] => {
            const result = [];
            for (let i = 0; i < arr1.length + arr2.length - 1; i++) {
                let sum = 0;
                for (let j = Math.max(0, i - arr2.length + 1); j < Math.min(arr1.length, i + 1); j++) {
                    sum += arr1[j] * arr2[arr2.length - 1 - i + j];
                }
                result.push(sum);
            }
            return result;
        };

        /**
         * Calculates the Pearson correlation coefficient of two arrays.
         * @param {number[]} arr1 - The first array
         * @param {number[]} arr2 - The second array
         * @returns {number}
         */
        export const correlationCoefficient = (arr1: number[], arr2: number[]): number => {
            return Chalkboard.stat.covariance(arr1, arr2) / (Chalkboard.stat.deviation(arr1) * Chalkboard.stat.deviation(arr2));
        };

        /**
         * Calculates the covariance of two arrays.
         * @param {number[]} arr1 - The first array
         * @param {number[]} arr2 - The second array
         * @returns {number}
         */
        export const covariance = (arr1: number[], arr2: number[]): number => {
            if (arr1.length !== arr2.length) {
                throw new RangeError('Parameters "arr1" and "arr2" must have the same length.');
            }
            const mean1 = Chalkboard.stat.mean(arr1);
            const mean2 = Chalkboard.stat.mean(arr2);
            let sum = 0;
            for (let i = 0; i < arr1.length; i++) {
                sum += (arr1[i] - mean1) * (arr2[i] - mean2);
            }
            return sum / arr1.length;
        };

        /**
         * Calculates the cumulative maximum of an array.
         * @param {number[]} arr - The array
         * @returns {number[]}
         */
        export const cummax = (arr: number[]): number[] => {
            const result = [];
            let max = -Infinity;
            for (const value of arr) {
                max = Math.max(max, value);
                result.push(max);
            }
            return result;
        };

        /**
         * Calculates the cumulative minimum of an array.
         * @param {number[]} arr - The array
         * @returns {number[]}
         */
        export const cummin = (arr: number[]): number[] => {
            const result = [];
            let min = Infinity;
            for (const value of arr) {
                min = Math.min(min, value);
                result.push(min);
            }
            return result;
        };

        /**
         * Calculates the cumulative product of an array.
         * @param {number[]} arr - The array
         * @returns {number[]}
         */
        export const cummul = (arr: number[]): number[] => {
            const result = [];
            let mul = 0;
            for (let i = 0; i < arr.length; i++) {
                mul *= arr[i];
                result.push(mul);
            }
            return result;
        };

        /**
         * Calculates the cumulative sum of an array.
         * @param {number[]} arr - The array
         * @returns {number[]}
         */
        export const cumsum = (arr: number[]): number[] => {
            const result = [];
            let sum = 0;
            for (let i = 0; i < arr.length; i++) {
                sum += arr[i];
                result.push(sum);
            }
            return result;
        };

        /**
         * Calculates the standard deviation of an array.
         * @param {number[]} arr - The array
         * @returns {number}
         */
        export const deviation = (arr: number[]): number => {
            let result = 0;
            for (let i = 0; i < arr.length; i++) {
                result += (arr[i] - Chalkboard.stat.mean(arr)) * (arr[i] - Chalkboard.stat.mean(arr));
            }
            return Chalkboard.real.sqrt(result / arr.length);
        };

        /**
         * Calculates the dot product of two arrays.
         * @param {number[]} arr1 - The first array
         * @param {number[]} arr2 - The second array
         * @returns {number}
         */
        export const dot = (arr1: number[], arr2: number[]): number => {
            if (arr1.length !== arr2.length) {
                throw new RangeError('Parameters "arr1" and "arr2" must have the same length.');
            }
            let result = 0;
            for (let i = 0; i < arr1.length; i++) {
                result += arr1[i] * arr2[i];
            }
            return result;
        };

        /**
         * Calculates the standard error of an array.
         * @param {number[]} arr - The array
         * @returns {number}
         */
        export const error = (arr: number[]): number => {
            return Chalkboard.stat.deviation(arr) / Chalkboard.real.sqrt(arr.length);
        };

        /**
         * Checks if the elements of an array are equal to a number or the elements of another array, and then returns an array with the elements that pass the check.
         * @param {number[]} arr - The array
         * @param {number | {number}[]} arrORnum - The array or number
         * @returns {number[]}
         */
        export const eq = (arr: number[], arrORnum: number | number[]): number[] => {
            const result = [];
            if (Array.isArray(arrORnum)) {
                if (arr.length === arrORnum.length) {
                    for (let i = 0; i < arr.length; i++) {
                        if (arr[i] === arrORnum[i]) {
                            result.push(arr[i]);
                        }
                    }
                }
            } else {
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i] === arrORnum) {
                        result.push(arr[i]);
                    }
                }
            }
            return result;
        };
        
        /**
         * Calculates the expected value of an array.
         * @param {number[]} arr - The array
         * @param {number[]} [probabilities] - The probabilities of the corresponding elements of the array (optional, defaults to equiprobable)
         * @returns {number}
         */
        export const expected = (arr: number[], probabilities?: number[]): number => {
            if (!probabilities) {
                probabilities = Array(arr.length).fill(1 / arr.length);
            }
            if (arr.length !== probabilities.length) {
                throw new RangeError('Parameters "values" and "probabilities" must have the same length.');
            }
            let result = 0;
            for (let i = 0; i < arr.length; i++) {
                result += arr[i] * probabilities[i];
            }
            return result;
        };

        /**
         * Defines a Gaussian function.
         * @param {number} height - The height of the distribution
         * @param {number} mean - The mean of the distribution
         * @param {number} deviation - The standard deviation of the distribution
         * @returns {ChalkboardFunction}
         */
        export const Gaussian = (height: number, mean: number, deviation: number): ChalkboardFunction => {
            return Chalkboard.real.define(
                height.toString() + " * Math.exp(-((x - " + mean.toString() + ") * (x - " + mean.toString() + ")) / (2 * " + deviation.toString() + " * " + deviation.toString() + "))"
            );
        };

        /**
         * Checks if the elements of an array are greater than (or equal to) a number or the elements of another array, and then returns an array with the elements that pass the check.
         * @param {number[]} arr - The array
         * @param {number | number[]} arrORnum - The array or number
         * @param {boolean} [includeEnd=false] - Whether the check is "less than" (false) or "less than or equal to" (true)
         * @returns {number[]}
         */
        export const gt = (arr: number[], arrORnum: number | number[], includeEnd: boolean = false): number[] => {
            const result = [];
            if (Array.isArray(arrORnum)) {
                if (arr.length === arrORnum.length) {
                    for (let i = 0; i < arr.length; i++) {
                        if (includeEnd) {
                            if (arr[i] >= arrORnum[i]) {
                                result.push(arr[i]);
                            }
                        } else {
                            if (arr[i] > arrORnum[i]) {
                                result.push(arr[i]);
                            }
                        }
                    }
                }
            } else {
                for (let i = 0; i < arr.length; i++) {
                    if (includeEnd) {
                        if (arr[i] >= arrORnum) {
                            result.push(arr[i]);
                        }
                    } else {
                        if (arr[i] > arrORnum) {
                            result.push(arr[i]);
                        }
                    }
                }
            }
            return result;
        };

        /**
         * Checks if the elements of an array are less than (or equal to) and greater than (or equal to) a number or the elements of another array, and then returns an array with the elements that pass the check.
         * @param {number[]} arr - The array
         * @param {number | number[]} inf - The array or number to check "less than (or equal to)" with
         * @param {number | number[]} sup - The array or number to check "greater than (or equal to)" with
         * @param {boolean} [includeInf=false] - Whether the check is "less than" (false) or "less than or equal to" (true)
         * @param {boolean} [includeSup=false] - Whether the check is "greater than" (false) or "greater than or equal to" (true)
         * @returns {number[]}
         */
        export const ineq = (arr: number[], inf: number, sup: number, includeInf: boolean = false, includeSup: boolean = false): number[] => {
            const result = [];
            if (Array.isArray(inf) && Array.isArray(sup)) {
                if (arr.length === inf.length && arr.length === sup.length) {
                    for (let i = 0; i < arr.length; i++) {
                        if (includeInf) {
                            if (includeSup) {
                                if (arr[i] >= inf[i] && arr[i] <= sup[i]) {
                                    result.push(arr[i]);
                                }
                            } else {
                                if (arr[i] >= inf[i] && arr[i] < sup[i]) {
                                    result.push(arr[i]);
                                }
                            }
                        } else {
                            if (includeSup) {
                                if (arr[i] > inf[i] && arr[i] <= sup[i]) {
                                    result.push(arr[i]);
                                }
                            } else {
                                if (arr[i] > inf[i] && arr[i] < sup[i]) {
                                    result.push(arr[i]);
                                }
                            }
                        }
                    }
                }
            } else {
                for (let i = 0; i < arr.length; i++) {
                    if (includeInf) {
                        if (includeSup) {
                            if (arr[i] >= inf && arr[i] <= sup) {
                                result.push(arr[i]);
                            }
                        } else {
                            if (arr[i] >= inf && arr[i] < sup) {
                                result.push(arr[i]);
                            }
                        }
                    } else {
                        if (includeSup) {
                            if (arr[i] > inf && arr[i] <= sup) {
                                result.push(arr[i]);
                            }
                        } else {
                            if (arr[i] > inf && arr[i] < sup) {
                                result.push(arr[i]);
                            }
                        }
                    }
                }
            }
            return result;
        };

        /**
         * Calculates an approximation of the inverse of the cumulative distribution function (CDF) of the standard normal distribution using the Beasley-Springer-Moro algorithm.
         * @param {number} p - The probability (must be between 0 and 1)
         * @returns {number}
         */
        export const inormal = (p: number): number => {
            if (p <= 0 || p >= 1) {
                throw new RangeError('Parameter "p" must be between 0 and 1 (exclusive).');
            }
            const a = [2.50662823884, -18.61500062529, 41.39119773534, -25.44106049637];
            const b = [-8.4735109309, 23.08336743743, -21.06224101826, 3.13082909833];
            const c = [0.3374754822726147, 0.9761690190917186, 0.1607979714918209,
                    0.0276438810333863, 0.0038405729373609, 0.0003951896511919,
                    0.0000321767881768, 0.0000002888167364, 0.0000003960315187];
            let x = p - 0.5;
            if (Math.abs(x) < 0.42) {
                const r = x * x;
                return x * (((a[3] * r + a[2]) * r + a[1]) * r + a[0]) /
                        ((((b[3] * r + b[2]) * r + b[1]) * r + b[0]) * r + 1);
            } else {
                const r = p < 0.5 ? p : 1 - p;
                const s = Math.log(-Math.log(r));
                let t = c[0];
                for (let i = 1; i < c.length; i++) {
                    t += c[i] * Math.pow(s, i);
                }
                return p < 0.5 ? -t : t;
            }
        };

        /**
         * Interpolates missing values (null or undefined) in an array using linear or quadratic interpolation.
         * @param {(number | null | undefined)[]} arr - The array with missing values
         * @param {"linear" | "quadratic"} [type="linear"] - The interpolation method, either "linear" or "quadratic"
         * @returns {number[]}
         */
        export const interpolate = (arr: (number | null | undefined)[], type: "linear" | "quadratic" = "linear"): number[] => {
            const result = arr.slice();
            for (let i = 0; i < result.length; i++) {
                if (result[i] == null) {
                    let prevIndex = i - 1;
                    let nextIndex = i + 1;
                    while (prevIndex >= 0 && result[prevIndex] == null) prevIndex--;
                    while (nextIndex < result.length && result[nextIndex] == null) nextIndex++;
                    const prevValue = prevIndex >= 0 ? result[prevIndex] as number : 0;
                    const nextValue = nextIndex < result.length ? result[nextIndex] as number : 0;
                    if (type === "linear") {
                        const t = (i - prevIndex) / (nextIndex - prevIndex);
                        result[i] = Chalkboard.real.lerp([prevValue, nextValue], t);
                    } else if (type === "quadratic" && prevIndex > 0 && nextIndex < result.length) {
                        const prevPrevIndex = prevIndex - 1;
                        const prevPrevValue = prevPrevIndex >= 0 ? result[prevPrevIndex] as number : prevValue;
                        const t = (i - prevIndex) / (nextIndex - prevIndex);
                        result[i] = Chalkboard.real.qerp(
                            [prevPrevIndex, prevPrevValue],
                            [prevIndex, prevValue],
                            [nextIndex, nextValue],
                            prevIndex + t * (nextIndex - prevIndex)
                        );
                    } else {
                        const t = (i - prevIndex) / (nextIndex - prevIndex);
                        result[i] = Chalkboard.real.lerp([prevValue, nextValue], t);
                    }
                }
            }
            return result as number[];
        };

        /**
         * Calculates the interquartile range of an array.
         * @param {number[]} arr - The array
         * @returns {number}
         */
        export const interquartileRange = (arr: number[]): number => {
            return Chalkboard.stat.quartile(arr, "Q3") - Chalkboard.stat.quartile(arr, "Q1");
        };

        /**
         * Calculates the kurtosis of an array.
         * @param {number[]} arr - The array
         * @returns {number}
         */
        export const kurtosis = (arr: number[]): number => {
            let result = 0;
            const mean = Chalkboard.stat.mean(arr);
            const deviation = Chalkboard.stat.deviation(arr);
            for (let i = 0; i < arr.length; i++) {
                result += (arr[i] - mean) * (arr[i] - mean) * (arr[i] - mean) * (arr[i] - mean);
            }
            return result / (deviation * deviation * deviation * deviation) - 3;
        };

        /**
         * Checks if the elements of an array are less than (or equal to) a number or the elements of another array, and then returns an array with the elements that pass the check.
         * @param {number[]} arr - The array
         * @param {number | number[]} arrORnum - The array or number
         * @param {boolean} [includeEnd=false] - Whether the check is "less than" (false) or "less than or equal to" (true)
         * @returns {number[]}
         */
        export const lt = (arr: number[], arrORnum: number | number[], includeEnd: boolean = false): number[] => {
            const result = [];
            if (Array.isArray(arrORnum)) {
                if (arr.length === arrORnum.length) {
                    for (let i = 0; i < arr.length; i++) {
                        if (includeEnd) {
                            if (arr[i] <= arrORnum[i]) {
                                result.push(arr[i]);
                            }
                        } else {
                            if (arr[i] < arrORnum[i]) {
                                result.push(arr[i]);
                            }
                        }
                    }
                }
            } else {
                for (let i = 0; i < arr.length; i++) {
                    if (includeEnd) {
                        if (arr[i] <= arrORnum) {
                            result.push(arr[i]);
                        }
                    } else {
                        if (arr[i] < arrORnum) {
                            result.push(arr[i]);
                        }
                    }
                }
            }
            return result;
        };

        /**
         * Calculates the mean absolute deviation of an array.
         * @param {number[]} arr - The array
         * @returns {number}
         */
        export const mad = (arr: number[]): number => {
            let result = 0;
            for (let i = 0; i < arr.length; i++) {
                result += Math.abs(arr[i] - Chalkboard.stat.mean(arr));
            }
            return result / arr.length;
        };

        /**
         * Returns the maximum value of an array.
         * @param {number[]} arr - The array
         * @returns {number}
         */
        export const max = (arr: number[]): number => {
            let max = arr[0];
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] > max) {
                    max = arr[i];
                }
            }
            return max;
        };

        /**
         * Calculates the mean of an array.
         * @param {number[]} arr - The array
         * @param {"arithmetic" | "geometric" | "harmonic"} [type="arithmetic"] - The type of mean, which can be "arithmetic", "geometric", or "harmonic"
         * @returns {number}
         */
        export const mean = (arr: number[], type: "arithmetic" | "geometric" | "harmonic" = "arithmetic"): number => {
            let result = 0;
            if (type === "arithmetic") {
                for (let i = 0; i < arr.length; i++) {
                    result += arr[i];
                }
                return result / arr.length;
            } else if (type === "geometric") {
                for (let i = 0; i < arr.length; i++) {
                    result *= arr[i];
                }
                return Chalkboard.real.root(Math.abs(result), arr.length);
            } else if (type === "harmonic") {
                for (let i = 0; i < arr.length; i++) {
                    result += 1 / arr[i];
                }
                return arr.length / result;
            } else {
                throw new TypeError('Parameter "type" must be "arithmetic", "geometric", or "harmonic".');
            }
        };

        /**
         * Calculates the moving mean of an array.
         * @param {number[]} arr - The array
         * @param {number} windowSize - The size of the moving window
         * @returns {number[]}
         */
        export const meanMoving = (arr: number[], windowSize: number): number[] => {
            if (windowSize <= 0 || windowSize > arr.length) {
                throw new RangeError('Parameter "windowSize" must be greater than 0 and less than or equal to the array length.');
            }
            const result = [];
            for (let i = 0; i <= arr.length - windowSize; i++) {
                const windowArr = arr.slice(i, i + windowSize);
                result.push(Chalkboard.stat.sum(windowArr) / windowSize);
            }
            return result;
        };

        /**
         * Calculates the weighted mean of an array.
         * @param {number[]} arr - The array
         * @param {number[]} weights - The weights
         * @returns {number}
         */
        export const meanWeighted = (arr: number[], weights: number[]): number => {
            if (arr.length !== weights.length) {
                throw new RangeError('Parameters "values" and "weights" must have the same length.');
            }
            let sum = 0, weightSum = 0;
            for (let i = 0; i < arr.length; i++) {
                sum += arr[i] * weights[i];
                weightSum += weights[i];
            }
            return sum / weightSum;
        };

        /**
         * Returns the median value of an array.
         * @param {number[]} arr - The array
         * @returns {number}
         */
        export const median = (arr: number[]): number => {
            const temp = arr.slice().sort(function (a, b) {
                return a - b;
            });
            if (temp.length % 2 === 1) {
                return temp[Math.floor(temp.length / 2)];
            } else {
                return (temp[temp.length / 2] + temp[temp.length / 2 - 1]) / 2;
            }
        };

        /**
         * Returns the minimum value of an array.
         * @param {number[]} arr - The array
         * @returns {number}
         */
        export const min = (arr: number[]): number => {
            let min = arr[0];
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] < min) {
                    min = arr[i];
                }
            }
            return min;
        };

        /**
         * Returns the mode (the most recurring value) of an array.
         * @param {number[]} arr - The array
         * @returns {number}
         */
        export const mode = (arr: number[]): number => {
            const temp = arr.slice().sort(function (a, b) {
                return a - b;
            });
            let bestStr = 1;
            let currStr = 1;
            let bestElm = temp[0];
            let currElm = temp[0];
            for (let i = 1; i < temp.length; i++) {
                if (temp[i - 1] !== temp[i]) {
                    if (currStr > bestStr) {
                        bestStr = currStr;
                        bestElm = currElm;
                    }
                    currStr = 0;
                    currElm = temp[i];
                }
                currStr++;
            }
            if (currStr > bestStr) {
                return currElm;
            } else {
                return bestElm;
            }
        };

        /**
         * Calculates the product of all elements in an array.
         * @param {number[]} arr - The array
         * @returns {number}
         */
        export const mul = (arr: number[]): number => {
            let result = 0;
            for (let i = 0; i < arr.length; i++) {
                result *= arr[i];
            }
            return result;
        };

        /**
         * Calculates the negation of all the elements of an array.
         * @param {number[]} arr - The array
         * @returns {number[]}
         */
        export const negate = (arr: number[]): number[] => {
            const result: number[] = [];
            for (let i = 0; i < arr.length; i++) {
                result.push(-arr[i]);
            }
            return result;
        };

        /**
         * Calculates the norm of an array.
         * @param {number[]} arr - The array
         * @param {"L0" | "L1" | "L2" | "LInfinity"} [type="L2"] - The type of norm, which can be "L0", "L1", "L2", or "LInfinity"
         * @returns {number}
         */
        export const norm = (arr: number[], type: "L0" | "L1" | "L2" | "LInfinity" = "L2"): number => {
            let result = 0;
            if (type === "L0") {
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i] !== 0) {
                        result += 1;
                    }
                }
                return result;
            } else if (type === "L1") {
                for (let i = 0; i < arr.length; i++) {
                    result += Math.abs(arr[i]);
                }
                return result;
            } else if (type === "L2") {
                for (let i = 0; i < arr.length; i++) {
                    result += arr[i] * arr[i];
                }
                return Chalkboard.real.sqrt(result);
            } else if (type === "LInfinity") {
                return Math.abs(Chalkboard.stat.max(arr));
            } else {
                throw new TypeError('Parameter "type" must be "L0", "L1", "L2", or "LInfinity".');
            }
        };

        /**
         * Calculates the value of the standard normal distribution at a given point.
         * @param {number} x - The point
         * @returns {number}
         */
        export const normal = (x: number): number => {
            const standardNormal = Chalkboard.real.define(
                "1 / Math.sqrt(2 * Math.PI) * Math.exp(-0.5 * x * x)"
            );
            return Chalkboard.real.val(standardNormal, x) as number;
        };

        /**
         * Calculates the normalization of an array.
         * @param {number[]} arr - The array
         * @param {"L0" | "L1" | "L2" | "LInfinity"} [type="L2"] - The type of norm to normalize with, which can be "L0", "L1", "L2", or "LInfinity"
         * @returns {number[]}
         */
        export const normalize = (arr: number[], type: "L0" | "L1" | "L2" | "LInfinity" = "L2"): number[] => {
            const result = [];
            const norm = Chalkboard.stat.norm(arr, type);
            for (let i = 0; i < arr.length; i++) {
                result.push(arr[i] / norm);
            }
            return result;
        };

        /**
         * Calculates the norm squared of an array.
         * @param {number[]} arr - The array
         * @param {"L0" | "L1" | "L2" | "LInfinity"} [type="L2"] - The type of norm squared, which can be "L0", "L1", "L2", or "LInfinity"
         * @returns {number}
         */
        export const normsq = (arr: number[], type: "L0" | "L1" | "L2" | "LInfinity" = "L2"): number => {
            let result = 0;
            if (type === "L0") {
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i] !== 0) {
                        result += 1;
                    }
                }
                return result * result;
            } else if (type === "L1") {
                for (let i = 0; i < arr.length; i++) {
                    result += Math.abs(arr[i]);
                }
                return result * result;
            } else if (type === "L2") {
                for (let i = 0; i < arr.length; i++) {
                    result += arr[i] * arr[i];
                }
                return result;
            } else if (type === "LInfinity") {
                return Math.abs(Chalkboard.stat.max(arr)) * Math.abs(Chalkboard.stat.max(arr));
            } else {
                throw new TypeError('Parameter "type" must be "L0", "L1", "L2", or "LInfinity".');
            }
        };

        /**
         * Pads an array with a specified number to a given length.
         * @param {number[]} arr - The array
         * @param {number} length - The desired length of the array
         * @param {number} [num=0] - The number to pad with (default is 0)
         * @returns {number[]}
         */
        export const pad = (arr: number[], length: number, num: number = 0): number[] => {
            const result = arr.slice();
            while (result.length < length) {
                result.push(num);
            }
            return result;
        };

        /**
         * Calculates the percentile of a number in an array.
         * @param {number[]} arr - The array
         * @param {number} num - The number
         * @returns {number}
         */
        export const percentile = (arr: number[], num: number): number => {
            let result = 0;
            for (let i = 0; i < arr.length; i++) {
                if (num >= arr[i]) {
                    result++;
                }
            }
            return (result / arr.length) * 100;
        };

        /**
         * Prints an array in the console.
         * @param {number[]} arr - The array
         * @returns {void}
         */
        export const print = (arr: number[]): void => {
            console.log(Chalkboard.stat.toString(arr));
        };

        /**
         * Calculates a quartile of an array.
         * @param {number[]} arr - The array
         * @param {"Q1" | "Q2" | "Q3"} type - The type of quartile, which can be "Q1", "Q2", or "Q3"
         * @returns {number}
         */
        export const quartile = (arr: number[], type: "Q1" | "Q2" | "Q3"): number => {
            const temp = arr.slice().sort(function (a, b) {
                return a - b;
            });
            const lo = temp.slice(0, Math.floor(temp.length / 2));
            const hi = temp.slice(Math.ceil(temp.length / 2));
            if (type === "Q1") {
                return Chalkboard.stat.median(lo);
            } else if (type === "Q2") {
                return Chalkboard.stat.median(arr);
            } else if (type === "Q3") {
                return Chalkboard.stat.median(hi);
            } else {
                throw new TypeError('Parameter "type" must be "Q1", "Q2", or "Q3".');
            }
        };

        /**
         * Returns an array with random elements.
         * @param {number} length - The length of the array
         * @param {number} [inf=0] - The lower bound (optional, defaults to 0)
         * @param {number} [sup=1] - The upper bound (optional, defaults to 1)
         * @returns {number[]}
         */
        export const random = (length: number, inf: number = 0, sup: number = 1): number[] => {
            const result = [];
            for (let i = 0; i < length; i++) {
                result.push(Chalkboard.numb.random(inf, sup));
            }
            return result;
        };

        /**
         * Returns the range (the maximum value minus the minimum value) of an array.
         * @param {number[]} arr - The array
         * @returns {number}
         */
        export const range = (arr: number[]): number => {
            return Chalkboard.stat.max(arr) - Chalkboard.stat.min(arr);
        };

        /**
         * Calculates a regression model for an array of data.
         * @param {number[][]} data - The data, an array of arrays that represent an ordered pair of 2D coordinates
         * @param {"linear" | "polynomial" | "power" | "exponential" | "logarithmic"} [type="linear"] - The type of regression model, which can be "linear", "polynomial", "power", "exponential", or "logarithmic"
         * @param {number} [degree=2] - The degree of the leading coefficient of the polynomial regression model
         * @returns {ChalkboardFunction}
         */
        export const regression = (data: number[][], type: "linear" | "polynomial" | "power" | "exponential" | "logarithmic" = "linear", degree: number = 2): ChalkboardFunction => {
            if (type === "linear") {
                let x = 0,
                    y = 0;
                let xx = 0,
                    xy = 0;
                for (let i = 0; i < data.length; i++) {
                    x += data[i][0];
                    y += data[i][1];
                    xx += data[i][0] * data[i][0];
                    xy += data[i][0] * data[i][1];
                }
                const a = (data.length * xy - x * y) / (data.length * xx - x * x),
                    b = y / data.length - (a * x) / data.length;
                return Chalkboard.real.define(a + " * x + " + b);
            } else if (type === "polynomial") {
                const A = Chalkboard.matr.init();
                for (let i = 0; i < data.length; i++) {
                    A.push([]);
                    for (let j = 0; j <= degree; j++) {
                        A[i].push(Chalkboard.real.pow(data[i][0], j) as number);
                    }
                }
                const AT = Chalkboard.matr.transpose(A);
                const B = Chalkboard.matr.init();
                for (let i = 0; i < data.length; i++) {
                    B.push([data[i][1]]);
                }
                const ATA = Chalkboard.matr.mul(AT, A);
                const ATAI = Chalkboard.matr.invert(ATA);
                const x = Chalkboard.matr.mul(Chalkboard.matr.mul(ATAI, AT), B);
                const coeff = [];
                for (let i = 0; i < x.length; i++) {
                    coeff.push(x[i][0]);
                }
                let f = coeff[0].toString() + " + " + coeff[1].toString() + " * x";
                for (let i = 2; i <= degree; i++) {
                    f += " + " + coeff[i].toString() + " * Math.pow(x, " + i + ")";
                }
                return Chalkboard.real.define(f);
            } else if (type === "power") {
                const arr = [0, 0, 0, 0];
                for (let i = 0; i < data.length; i++) {
                    arr[0] += Chalkboard.real.ln(data[i][0]);
                    arr[1] += data[i][1] * Chalkboard.real.ln(data[i][0]);
                    arr[2] += data[i][1];
                    arr[3] += Chalkboard.real.ln(data[i][0]) * Chalkboard.real.ln(data[i][0]);
                }
                const a = Chalkboard.E((arr[2] - ((data.length * arr[1] - arr[2] * arr[0]) / (data.length * arr[3] - arr[0] * arr[0])) * arr[0]) / data.length),
                    b = (data.length * arr[1] - arr[2] * arr[0]) / (data.length * arr[3] - arr[0] * arr[0]);
                return Chalkboard.real.define(a + " * Math.pow(x, " + b + ")");
            } else if (type === "exponential") {
                const arr = [0, 0, 0, 0, 0, 0];
                for (let i = 0; i < data.length; i++) {
                    arr[0] += data[i][0];
                    arr[1] += data[i][1];
                    arr[2] += data[i][0] * data[i][0] * data[i][1];
                    arr[3] += data[i][1] * Chalkboard.real.ln(data[i][1]);
                    arr[4] += data[i][0] & (data[i][1] * Chalkboard.real.ln(data[i][1]));
                    arr[5] += data[i][0] * data[i][1];
                }
                const a = Chalkboard.E((arr[2] * arr[3] - arr[5] * arr[4]) / (arr[1] * arr[2] - arr[5] * arr[5])),
                    b = (arr[1] * arr[4] - arr[5] * arr[3]) / (arr[1] * arr[2] - arr[5] * arr[5]);
                return Chalkboard.real.define(a + "* Math.exp(" + b + " * x)");
            } else if (type === "logarithmic") {
                const arr = [0, 0, 0, 0];
                for (let i = 0; i < data.length; i++) {
                    arr[0] += Chalkboard.real.ln(data[i][0]);
                    arr[1] += data[i][1] * Chalkboard.real.ln(data[i][0]);
                    arr[2] += data[i][1];
                    arr[3] += Chalkboard.real.ln(data[i][0]) * Chalkboard.real.ln(data[i][0]);
                }
                const a = (arr[2] - ((data.length * arr[1] - arr[2] * arr[0]) / (data.length * arr[3] - arr[0] * arr[0])) * arr[0]) / data.length,
                    b = (data.length * arr[1] - arr[2] * arr[0]) / (data.length * arr[3] - arr[0] * arr[0]);
                return Chalkboard.real.define(a + " + " + b + " * Math.log(x)");
            } else {
                throw new TypeError('Parameter "type" must be "linear", "polynomial", "power", "exponential", or "logarithmic".');
            }
        };

        /**
         * Performs resampling on an array depending on the specified resampling method.
         * @param {number[]} arr - The array
         * @param {number} [samples] - The number of samples (optional, default is 100 for "bootstrap" and the length of the array for "jackknife")
         * @param {"bootstrap" | "jackknife"} [type="bootstrap"] - The type of resampling method, which can be "bootstrap" or "jackknife"
         * @returns {number[][]}
         */
        export const resampling = (arr: number[], samples?: number, type: "bootstrap" | "jackknife" = "bootstrap"): number[][] => {
            if (type === "bootstrap") {
                const numSamples = samples ?? 100;
                const result = [];
                for (let i = 0; i < numSamples; i++) {
                    const sample = [];
                    for (let j = 0; j < arr.length; j++) {
                        sample.push(arr[Math.floor(Math.random() * arr.length)]);
                    }
                    result.push(sample);
                }
                return result;
            } else if (type === "jackknife") {
                const numSamples = samples ?? arr.length;
                const allJackknifeSamples = [];
                for (let i = 0; i < arr.length; i++) {
                    allJackknifeSamples.push(arr.slice(0, i).concat(arr.slice(i + 1)));
                }
                if (numSamples < allJackknifeSamples.length) {
                    const selectedSamples = [];
                    const usedIndices = new Set<number>();
                    while (selectedSamples.length < numSamples) {
                        const randomIndex = Math.floor(Math.random() * allJackknifeSamples.length);
                        if (!usedIndices.has(randomIndex)) {
                            usedIndices.add(randomIndex);
                            selectedSamples.push(allJackknifeSamples[randomIndex]);
                        }
                    }
                    return selectedSamples;
                }
                return allJackknifeSamples;
            } else {
                throw new TypeError('Parameter "type" must be "bootstrap" or "jackknife".');
            }
        };

        /**
         * Reverses the elements of an array.
         * @param {number[]} arr - The array
         * @returns {number[]}
         */
        export const reverse = (arr: number[]): number[] => {
            const result: number[] = [];
            for (let i = arr.length - 1; i >= 0; i--) {
                result.push(arr[i]);
            }
            return result;
        };

        /**
         * Calculates the scalar multiplication of an array.
         * @param {number[]} arr - The array
         * @param {number} num - The scalar
         * @returns {number[]}
         */
        export const scl = (arr: number[], num: number): number[] => {
            const result: number[] = [];
            for (let i = 0; i < arr.length; i++) {
                result.push(arr[i] * num);
            }
            return result;
        };

        /**
         * Returns an array with its elements randomly shuffled.
         * @param {number[]} arr - The array
         * @returns {number[]}
         */
        export const shuffle = (arr: number[]): number[] => {
            let index, temp, rindex;
            for (index = arr.length - 1; index > 0; index--) {
                rindex = Math.floor(Chalkboard.numb.random(0, index + 1));
                temp = arr[index];
                arr[index] = arr[rindex];
                arr[rindex] = temp;
            }
            return arr;
        };

        /**
         * Calculates the skewness of an array.
         * @param {number[]} arr - The array
         * @returns {number}
         */
        export const skewness = (arr: number[]): number => {
            let result = 0;
            const mean = Chalkboard.stat.mean(arr);
            const deviation = Chalkboard.stat.deviation(arr);
            for (let i = 0; i < arr.length; i++) {
                result += (arr[i] - mean) * (arr[i] - mean) * (arr[i] - mean);
            }
            return result / ((arr.length - 1) * (deviation * deviation * deviation));
        };

        /**
         * Calculates the subtraction of two arrays.
         * @param {number[]} arr1 - The first array
         * @param {number[]} arr2 - The second array
         * @returns {number[]}
         */
        export const sub = (arr1: number[], arr2: number[]): number[] => {
            if (arr1.length !== arr2.length) {
                throw new RangeError('Parameters "arr1" and "arr2" must have the same length.');
            }
            const result: number[] = [];
            for (let i = 0; i < arr1.length; i++) {
                result.push(arr1[i] - arr2[i]);
            }
            return result;
        };

        /**
         * Returns an array of all the subsets of an array.
         * @param {number[]} arr - The array
         * @returns {number[][]}
         */
        export const subsets = (arr: number[]): number[][] => {
            let result: number[][] = [[]];
            arr.sort();
            for (let i = 0; i < arr.length; i++) {
                if (i === 0 || arr[i] !== arr[i - 1]) {
                    const curr = arr[i];
                    const subsetsWithCurr = [];
                    for (let j = 0; j < result.length; j++) {
                        const subset = result[j].slice();
                        subset.push(curr);
                        subsetsWithCurr.push(subset);
                    }
                    result = result.concat(subsetsWithCurr);
                }
            }
            return result;
        };

        /**
         * Calculates the sum of all elements in an array.
         * @param {number[]} arr - The array
         * @returns {number}
         */
        export const sum = (arr: number[]): number => {
            let result = 0;
            for (let i = 0; i < arr.length; i++) {
                result += arr[i];
            }
            return result;
        };

        /**
         * Converts an array to a matrix.
         * @param {number[]} arr - The array
         * @param {number} rows - The number of rows of the matrix
         * @param {number} [cols=rows] - The number of columns of the matrix (optional, defaults to the number of rows to make a square matrix)
         * @returns {ChalkboardMatrix}
         */
        export const toMatrix = (arr: number[], rows: number, cols: number = rows): ChalkboardMatrix => {
            const result = Chalkboard.matr.init();
            let index = 0;
            for (let i = 0; i < rows; i++) {
                result[i] = [];
                for (let j = 0; j < cols; j++) {
                    if (index < arr.length) {
                        result[i].push(arr[index]);
                    } else {
                        result[i].push(0);
                    }
                    index++;
                }
            }
            return result;
        };

        /**
         * Converts an array to an object.
         * @param {number[]} arr - The array
         * @returns {object}
         */
        export const toObject = (arr: number[]): object => {
            const result: { [key: string]: number } = {};
            for (let i = 0; i < arr.length; i++) {
                result["_" + i.toString()] = arr[i];
            }
            return result;
        };

        /**
         * Converts an array to a set.
         * @param {number[]} arr - The array
         * @returns {ChalkboardSet<number>}
         */
        export const toSet = (arr: number[]): ChalkboardSet<number> => {
            return Chalkboard.abal.set(arr);
        };

        /**
         * Converts an array to a string.
         * @param {number[]} arr - The array
         * @returns {string}
         */
        export const toString = (arr: number[]): string => {
            return "[" + arr.join(", ") + "]";
        };

        /**
         * Converts an array to a tensor.
         * @param {number[]} arr - The array
         * @param {number[]} size - The size of the tensor
         * @returns {ChalkboardTensor}
         */
        export const toTensor = (arr: number[], ...size: number[]): ChalkboardTensor => {
            if (Array.isArray(size[0])) {
                size = size[0];
            }
            return Chalkboard.tens.resize(arr, ...size);
        };

        /**
         * Converts an array to a vector.
         * @param {number[]} arr - The array
         * @param {number} dimension - The dimension of the vector, which can be 2, 3, or 4
         * @param {number} [index=0] - The index of the array to start the vector
         * @returns {ChalkboardVector}
         */
        export const toVector = (arr: number[], dimension: 2 | 3 | 4, index: number = 0): ChalkboardVector => {
            if (dimension === 2) {
                return Chalkboard.vect.init(arr[index], arr[index + 1]);
            } else if (dimension === 3) {
                return Chalkboard.vect.init(arr[index], arr[index + 1], arr[index + 2]);
            } else if (dimension === 4) {
                return Chalkboard.vect.init(arr[index], arr[index + 1], arr[index + 2], arr[index + 3]);
            } else {
                throw new RangeError('Parameter "dimension" must be 2, 3, or 4.');
            }
        };

        /**
         * Returns the unique elements of an array.
         * @template T
         * @param {T[]} arr - The array
         * @returns {T[]}
         */
        export const unique = <T>(arr: T[]): T[] => {
            const stableStringify = (obj: any): string => {
                const replacer = (key: string, value: any) => {
                    if (value !== null && typeof value === "object" && !Array.isArray(value)) {
                        const sortedObj: Record<string, any> = {};
                        Object.keys(value).sort().forEach(k => {
                            sortedObj[k] = value[k];
                        });
                        return sortedObj;
                    }
                    return value;
                };
                return JSON.stringify(obj, replacer);
            };
            const getKey = (item: any): string => {
                let typePrefix: string;
                let valuePart: string;
                if (item === null) {
                    typePrefix = "null";
                    valuePart = stableStringify(item);
                } else if (Array.isArray(item)) {
                    typePrefix = "array";
                    valuePart = stableStringify(item);
                } else if (typeof item === "object") {
                    typePrefix = "object";
                    valuePart = stableStringify(item);
                } else if (typeof item === "number") {
                    typePrefix = "number";
                    if (Number.isNaN(item)) {
                        valuePart = "NaN";
                    } else if (item === Infinity) {
                        valuePart = "Infinity";
                    } else if (item === -Infinity) {
                        valuePart = "-Infinity";
                    } else {
                        valuePart = JSON.stringify(item);
                    }
                } else if (typeof item === "undefined") {
                    typePrefix = "undefined";
                    valuePart = "";
                } else {
                    typePrefix = typeof item;
                    valuePart = stableStringify(item);
                }
                return `${typePrefix}:${valuePart}`;
            };
            const seen = new Map<string, T>();
            for (const item of arr) {
                const key = getKey(item);
                if (!seen.has(key)) {
                    seen.set(key, item);
                }
            }
            return Array.from(seen.values());
        };

        /**
         * Calculates the variance of an array.
         * @param {number[]} arr - The array
         * @returns {number}
         */
        export const variance = (arr: number[]): number => {
            let result = 0;
            for (let i = 0; i < arr.length; i++) {
                result += (arr[i] - Chalkboard.stat.mean(arr)) * (arr[i] - Chalkboard.stat.mean(arr));
            }
            return result / arr.length;
        };

        /**
         * Calculates the standardization of the elements of an array according to their mean and standard deviation.
         * @param {number[]} arr - The array
         * @returns {number[]}
         */
        export const zscored = (arr: number[]): number[] => {
            let result: number[] = [];
            const mean = Chalkboard.stat.mean(arr);
            const deviation = Chalkboard.stat.deviation(arr);
            for (let i = 0; i < arr.length; i++) {
                result.push((arr[i] - mean) / deviation);
            }
            return result;
        };
    }
}
