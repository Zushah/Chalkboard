/*
    The Chalkboard Library - Number Theory Namespace
    Version 2.2.0 Galois
*/
/// <reference path="Chalkboard.ts"/>
namespace Chalkboard {
    /**
     * The number theory namespace.
     * @namespace
     */
    export namespace numb {
        /**
         * Returns a random number from a Bernoulli distribution.
         * @param {number} [p=0.5] - Probability value of distribution
         * @returns {number}
         * @example
         * // Probability of flipping a coin heads or tails
         * const bernoulliRandom = Chalkboard.numb.Bernoullian();
         */
        export const Bernoullian = (p: number = 0.5): number => {
            return Math.random() < p ? 1 : 0;
        };

        /**
         * Returns the binomial coefficient for a polynomial.
         * @param {number} n - The degree of the polynomial
         * @param {number} k - The term of the polynomial
         * @returns {number}
         * @example
         * // Returns 35
         * const coeff = Chalkboard.numb.binomial(7, 3);
         */
        export const binomial = (n: number, k: number): number => {
            if (k < 0 || k > n) {
                return 0;
            }
            if (k === 0 || k === n) {
                return 1;
            }
            if (k === 1 || k === n - 1) {
                return n;
            }
            if (n - k < k) {
                k = n - k;
            }
            let result = n;
            for (let i = 2; i <= k; i++) {
                result *= (n - i + 1) / i;
            }
            return Math.round(result);
        };

        /**
         * Returns the change of two numbers.
         * @param {number} initial - First number
         * @param {number} final - Second number
         * @returns {number}
         * @example
         * // Returns 1 or 100%
         * const change = Chalkboard.numb.change(1, 2);
         */
        export const change = (initial: number, final: number): number => {
            return (final - initial) / initial;
        };

        /**
         * Returns the combinatorial combination of two numbers.
         * @param {number} n - First number (total items)
         * @param {number} r - Second number (chosen items)
         * @returns {number}
         * @example
         * // The number of five-card hands possible from a standard fifty-two card deck is 2598960
         * const combine = Chalkboard.numb.combination(52, 5);
         */
        export const combination = (n: number, r: number): number => {
            return Chalkboard.numb.factorial(n) / (Chalkboard.numb.factorial(n - r) * Chalkboard.numb.factorial(r));
        };

        /**
         * Returns an array of composite numbers between the lower and upper bounds.
         * @param {number} inf - Lower bound
         * @param {number} sup - Upper bound
         * @returns {number[]}
         * @example
         * // Returns the array [0, 1, 4, ... , 996, 998, 999]
         * const arr = Chalkboard.numb.compositeArr(0, 1000);
         */
        export const compositeArr = (inf: number, sup: number): number[] => {
            const result = [];
            for (let i = inf; i <= sup; i++) {
                if (!Chalkboard.numb.isPrime(i)) {
                    result.push(i);
                }
            }
            return result;
        };

        /**
         * Returns the number of composite numbers between the lower and upper bounds.
         * @param {number} inf - Lower bound
         * @param {number} sup - Upper bound
         * @returns {number}
         * @example
         * // Returns 832
         * const composites = Chalkboard.numb.compositeCount(0, 1000);
         */
        export const compositeCount = (inf: number, sup: number): number => {
            return Chalkboard.numb.compositeArr(inf, sup).length;
        };

        /**
         * Returns a number constrained within a range.
         * @param {number} num - Number
         * @param {number[]} [range=[0, 1]] - Range
         * @returns {number}
         * @example
         * const n1 = Chalkboard.numb.constrain(2); // Returns 1
         * const n2 = Chalkboard.numb.constrain(1); // Returns 1
         * const n3 = Chalkboard.numb.constrain(0.5); // Returns 0.5
         * const n4 = Chalkboard.numb.constrain(0); // Returns 0
         * const n5 = Chalkboard.numb.constrain(-1); // Returns 0
         */
        export const constrain = (num: number, range: [number, number] = [0, 1]): number => {
            return Math.max(Math.min(num, range[1]), range[0]);
        };

        /**
         * Returns the divisors of a number.
         * @param {number} num - Number
         * @returns {number[]}
         * @example
         * // Returns the array [1, 2, 4, ... , 250000, 500000, 1000000]
         * const divisors = Chalkboard.numb.divisors(1000000);
         */
        export const divisors = (num: number): number[] => {
            const result = [];
            for (let i = 1; i <= num; i++) {
                if (num % i === 0) {
                    result.push(i);
                }
            }
            return result;
        };

        /**
         * Returns the value of Euler's totient function of a number.
         * @param {number} num - Number greater than 0
         * @returns {number | undefined}
         * @example
         * // Returns 4, the number of divisors of 10
         * const totient = Chalkboard.numb.Euler(10);
         */
        export const Euler = (num: number): number | undefined => {
            if (num > 0) {
                const factors = Chalkboard.numb.factors(num);
                for (let i = 0; i < factors.length; i++) {
                    num *= (factors[i] - 1) / factors[i];
                }
                return num;
            } else {
                return undefined;
            }
        };

        /**
         * Returns a random number from an exponential distribution.
         * @param {number} [l=1] - Rate parameter (lambda) of distribution
         * @returns {number}
         * @example
         * // Smaller argument means a more uniform distribution
         * const expRandom = Chalkboard.numb.exponential(0.1);
         */
        export const exponential = (l: number = 1): number => {
            return l <= 0 ? 0 : -Math.log(Math.random()) / l;
        };

        /**
         * Returns the factorial of a number.
         * @param {number} num - Number
         * @returns {number}
         * @example
         * // Returns 120
         * const factorial = Chalkboard.numb.factorial(5);
         */
        export const factorial = (num: number): number => {
            let n = 1;
            for (let i = 1; i <= num; i++) {
                n *= i;
            }
            return n;
        };

        /**
         * Returns the prime factors of a number.
         * @param {number} num - Number
         * @returns {number[]}
         * @example
         * // Returns the array [2, 2, 2, 2, 2, 2, 5, 5, 5, 5, 5, 5]
         * const factors = Chalkboard.numb.factors(1000000);
         */
        export const factors = (num: number): number[] => {
            const result = [];
            while (num % 2 === 0) {
                result.push(2);
                num /= 2;
            }
            for (let i = 3; i <= Chalkboard.real.sqrt(num); i += 2) {
                while (num % i === 0) {
                    result.push(i);
                    num /= i;
                }
            }
            if (num > 2) {
                result.push(num);
            }
            return result;
        };

        /**
         * Returns the term of the Fibonacci sequence at the inputted index.
         * @param {number} num - Index
         * @returns {number}
         * @example
         * // Returns 55
         * const fibnum = Chalkboard.numb.Fibonacci(10);
         */
        export const Fibonacci = (num: number): number => {
            const sequence = [0, 1];
            if (sequence[num] === undefined) {
                sequence.push(Chalkboard.numb.Fibonacci(num - 1) + sequence[num - 2]);
            }
            return sequence[num];
        };

        /**
         * Returns a random number from a Gaussian (or normal) distribution.
         * @param {number} height - Height of distribution
         * @param {number} mean - Mean of distribution
         * @param {number} deviation - Standard deviation of distribution
         * @returns {number}
         * @example
         * // Standard Gaussian distribution
         * const gaussRandom = Chalkboard.numb.Gaussian(1, 0, 1 / Chalkboard.real.sqrt(Chalkboard.PI(2)));
         */
        export const Gaussian = (height: number, mean: number, deviation: number): number => {
            const u1 = Math.random(),
                u2 = Math.random();
            const random = Chalkboard.real.sqrt(-2 * Chalkboard.real.ln(u1)) * Chalkboard.trig.cos(Chalkboard.PI(2) * u2);
            return random * height * Chalkboard.real.sqrt(deviation) + mean;
        };

        /**
         * Returns the greatest common divisor of two numbers.
         * @param {number} a - First number
         * @param {number} b - Second number
         * @returns {number}
         * @example
         * // Returns 17
         * const gcd = Chalkboard.numb.gcd(68, 119);
         */
        export const gcd = (a: number, b: number): number => {
            if (b === 0) {
                return a;
            }
            return Chalkboard.numb.gcd(b, a % b);
        };

        /**
         * Returns an even number as a sum of two prime numbers.
         * @param {number} num - Even number
         * @returns {number[] | undefined}
         * @example
         * // Returns [5, 7]
         * const primes = Chalkboard.numb.Goldbach(12);
         */
        export const Goldbach = (num: number): [number, number] | undefined => {
            if (num % 2 === 0) {
                if (num !== 4) {
                    let a = num / 2,
                        b = num / 2;
                    if (a % 2 === 0) {
                        a--;
                        b++;
                    }
                    while (a >= 3) {
                        if (Chalkboard.numb.isPrime(a) && Chalkboard.numb.isPrime(b)) {
                            return [a, b];
                        }
                        a -= 2;
                        b += 2;
                    }
                    return undefined;
                } else {
                    return [2, 2];
                }
            } else {
                return undefined;
            }
        };

        /**
         * Checks if two numbers are approximately equal.
         * @param {number} a - The first number
         * @param {number} b - The second number
         * @param {number} [precision=0.000001] - The precision to check
         * @returns {boolean}
         * @example
         * // Returns true
         * const approx = Chalkboard.numb.isApproxEqual(0.1 + 0.2, 0.3);
         */
        export const isApproxEqual = (a: number, b: number, precision: number = 0.000001): boolean => {
            return Math.abs(a - b) < precision;
        };

        /**
         * Checks if a number is a prime number.
         * @param {number} num - Number
         * @returns {boolean}
         * @example
         * // All of the following return true
         * Chalkboard.numb.isPrime(73939133);
         * Chalkboard.numb.isPrime(7393913);
         * Chalkboard.numb.isPrime(739391);
         * Chalkboard.numb.isPrime(73939);
         * Chalkboard.numb.isPrime(7393);
         * Chalkboard.numb.isPrime(739);
         * Chalkboard.numb.isPrime(73);
         * Chalkboard.numb.isPrime(7);
         */
        export const isPrime = (num: number): boolean => {
            for (let i = 2; i <= Chalkboard.real.sqrt(num); i++) {
                if (num % i === 0) {
                    return false;
                }
            }
            return num > 1;
        };

        /**
         * Checks if a number is rational.
         * @param {number} num - The number to check.
         * @param {number} [tolerance = 1e-8] - Tolerance for approximation (optional, defaults to 1e-8).
         * @returns {boolean}
         * @example
         * const yes = Chalkboard.numb.isRational(0.75); // Returns true
         * const no = Chalkboard.numb.isRational(Chalkboard.PI()); // Returns false
         */
        export const isRational = (num: number, tolerance: number = 1e-8): boolean => {
            if (!isFinite(num)) return false;
            try {
                const [n, d] = Chalkboard.numb.toFraction(num, tolerance);
                return Math.abs(num - n / d) < tolerance;
            } catch {
                return false;
            }
        };

        /**
         * Returns the value of the Kronecker delta function of two numbers (returns 1 if they're equal and 0 otherwise).
         * @param {number} a - First number
         * @param {number} b - Second number
         * @returns {number}
         * @example
         * const yes = Chalkboard.numb.Kronecker(1, 1); // Returns 1
         * const no = Chalkboard.numb.Kronecker(1, 10); // Returns 0
         */
        export const Kronecker = (a: number, b: number): 1 | 0 => {
            if (a === b) {
                return 1;
            } else {
                return 0;
            }
        };

        /**
         * Returns the least common multiple of two numbers.
         * @param {number} a - First number
         * @param {number} b - Second number
         * @returns {number}
         * @example
         * // Returns 12
         * const lcm = Chalkboard.numb.lcm(4, 6);
         */
        export const lcm = (a: number, b: number): number => {
            return a * (b / Chalkboard.numb.gcd(a, b));
        };

        /**
         * Returns the proportional mapping of a number from one range to another.
         * @param {number} num - Number
         * @param {number[]} range1 - First range
         * @param {number[]} range2 - Second range
         * @returns {number}
         * @example
         * // Returns 0.92
         * const map = Chalkboard.numb.map(23, [0, 25], [0, 1]);
         */
        export const map = (num: number, range1: number[], range2: number[]): number => {
            return range2[0] + (range2[1] - range2[0]) * ((num - range1[0]) / (range1[1] - range1[0]));
        };

        /**
         * Calculates the mathematically correct modulo of a mod b.
         * @param {number} a - Number
         * @param {number} b - Number
         * @returns {number}
         * @example
         * // Returns -1 (instead of 2, which is what 5 % -3 would return)
         * const mod = Chalkboard.numb.mod(5, -3);
         */
        export const mod = (a: number, b: number): number => {
            return ((a % b) + b) % b;
        };

        /**
         * Returns the product of a sequence.
         * @param {string} formula - Sequence written in product notation with the variable "n"
         * @param {number} inf - Lower bound
         * @param {number} sup - Upper bound
         * @returns {number}
         * @example
         * // Returns 120
         * const mul = Chalkboard.numb.mul("n + 1", 0, 5);
         */
        export const mul = (formula: string, inf: number, sup: number): number => {
            let result = 1;
            const f = Chalkboard.real.parse("n => " + formula);
            for (let i = inf; i <= sup; i++) {
                result *= f(i);
            }
            return result;
        };

        /**
         * Returns the prime number that succeeds the inputted number.
         * @param {number} num - Number
         * @returns {number}
         * @example
         * // Returns 541
         * const prime = Chalkboard.numb.nextPrime(523);
         */
        export const nextPrime = (num: number): number => {
            let result = num + 1;
            while (!Chalkboard.numb.isPrime(result)) {
                result++;
            }
            return result;
        };

        /**
         * Returns the combinatorial permutation of two numbers.
         * @param {number} n - First number (total items)
         * @param {number} r - Second number (chosen items)
         * @returns {number}
         * @example
         * // The number of different ways to arrange the word "MATH" is 24
         * const permute = Chalkboard.numb.permutation(4, 4);
         */
        export const permutation = (n: number, r: number): number => {
            return Chalkboard.numb.factorial(n) / Chalkboard.numb.factorial(n - r);
        };

        /**
         * Returns a random number from a Poisson distribution.
         * @param {number} [l=1] - Rate parameter (lambda) of distribution
         * @returns {number}
         * @example
         * // Smaller argument means a less uniform distribution
         * const poissonRandom = Chalkboard.numb.Poissonian(0.5);
         */
        export const Poissonian = (l: number = 1): number => {
            if (l > 0) {
                const L = Chalkboard.E(-l);
                let p = 1,
                    k = 0;
                for (; p > L; ++k) {
                    p *= Math.random();
                }
                return k - 1;
            } else {
                return 0;
            }
        };

        /**
         * Returns the nth prime number.
         * @param {number} num - The "n" in "nth prime number" (the index of the prime number in the set of all prime numbers)
         * @returns {number}
         * @example
         * // The 100th prime number is 523
         * const prime = Chalkboard.numb.prime(100);
         */
        export const prime = (num: number): number => {
            if (num === 2) {
                return 2;
            }
            let n = 1;
            let prime = 3;
            while (n < num) {
                if (Chalkboard.numb.isPrime(prime)) {
                    n++;
                }
                if (n < num) {
                    prime += 2;
                }
            }
            return prime;
        };

        /**
         * Returns an array of prime numbers between the lower and upper bounds.
         * @param {number} inf - Lower bound
         * @param {number} sup - Upper bound
         * @returns {number[]}
         * @example
         * // Returns the array [2, 3, 5, ... , 983, 991, 997]
         * const arr = Chalkboard.numb.primeArr(0, 1000);
         */
        export const primeArr = (inf: number, sup: number): number[] => {
            const result = [];
            for (let i = inf; i <= sup; i++) {
                if (Chalkboard.numb.isPrime(i)) {
                    result.push(i);
                }
            }
            return result;
        };

        /**
         * Returns the number of prime numbers between the lower and upper bounds.
         * @param {number} inf - Lower bound
         * @param {number} sup - Upper bound
         * @returns {number}
         * @example
         * // Returns 169
         * const primes = Chalkboard.numb.primeCount(0, 1000);
         */
        export const primeCount = (inf: number, sup: number): number => {
            return Chalkboard.numb.primeArr(inf, sup).length;
        };

        /**
         * Returns the largest prime gap between the lower and upper bounds.
         * @param {number} inf - Lower bound
         * @param {number} sup - Upper bound
         * @returns {number}
         * @example
         * // Returns 8, the largest prime gap between 1 and 100
         * const gap = Chalkboard.numb.primeGap(1, 100);
         */
        export const primeGap = (inf: number, sup: number): number => {
            let prime = null;
            let gap = 0;
            for (let i = inf; i <= sup; i++) {
                if (Chalkboard.numb.isPrime(i)) {
                    if (prime !== null) {
                        const temp = i - prime;
                        if (temp > gap) {
                            gap = temp;
                        }
                    }
                    prime = i;
                }
            }
            return gap;
        };

        /**
         * Returns a random number from a uniform distribution.
         * @param {number} [inf=0] - Lower bound of distribution
         * @param {number} [sup=1] - Upper bound of distribution
         * @returns {number}
         * @example
         * // Random number between -1 and 1
         * const random = Chalkboard.numb.random(-1, 1);
         */
        export const random = (inf: number = 0, sup: number = 1): number => {
            return inf + (sup - inf) * Math.random();
        };

        /**
         * Rounds a number to the nearest positional notation index (or the nearest place value).
         * @param {number} num - Number
         * @param {number} positionalIndex - The positional notation index (or place value)
         * @returns {number}
         * @example
         * // Returns 1240
         * const rounded = Chalkboard.numb.roundTo(1237, 10);
         */
        export const roundTo = (num: number, positionalIndex: number): number => {
            return Math.round(num / positionalIndex) * positionalIndex;
        };

        /**
         * Returns the sign of a number.
         * @param {number} num - Number
         * @returns {number}
         * @example
         * const pos = Chalkboard.numb.sgn(19); // Returns 1
         * const zero = Chalkboard.numb.sgn(0); // Returns 0
         * const neg = Chalkboard.numb.sgn(-5); // Returns -1
         */
        export const sgn = (num: number): -1 | 0 | 1 => {
            if (num > 0) {
                return 1;
            } else if (num < 0) {
                return -1;
            } else {
                return 0;
            }
        };

        /**
         * Returns the summation of a sequence.
         * @param {string} formula - Sequence written in summation notation with the variable "n"
         * @param {number} inf - Lower bound
         * @param {number} sup - Upper bound
         * @returns {number}
         * @example
         * // Returns almost π²/6
         * const sum = Chalkboard.numb.sum("1 / (n * n)", 0, 1000);
         */
        export const sum = (formula: string, inf: number, sup: number): number => {
            let result = 0;
            const f = Chalkboard.real.parse("n => " + formula);
            for (let i = inf; i <= sup; i++) {
                result += f(i);
            }
            return result;
        };

        /**
         * Converts a decimal to a fraction which is represented as an array of its numerator and denominator.
         * @param {number} num - The decimal
         * @param {number} [tolerance = 1e-8] - The tolerance of the approximation algorithm (optional, defaults to 1e-8)
         * @returns {[number, number]}
         * @example
         * // Returns [-5, 4]
         * const fraction = Chalkboard.numb.toFraction(-1.25);
         */
        export const toFraction = (num: number, tolerance: number = 1e-8): [number, number] => {
            if (!isFinite(num)) throw new Error('The parameter "num" must be finite to be converted to a fraction.');
            const sgn = Chalkboard.numb.sgn(num);
            num *= sgn;
            if (Number.isInteger(num)) return [sgn * num, 1];
            let h1 = 1, h2 = 0, k1 = 0, k2 = 1;
            let b = num;
            while (true) {
                let a = Math.floor(b);
                let h = a * h1 + h2, k = a * k1 + k2;
                let approx = h / k;
                if (Math.abs(num - approx) < tolerance) {
                    const g = Chalkboard.numb.gcd(h, k);
                    return [sgn * (h / g), k / g];
                }
                h2 = h1, h1 = h;
                k2 = k1, k1 = k;
                b = 1 / (b - a);
            }
        }       
    }
}
