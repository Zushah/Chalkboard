/*
    The Chalkboard Library - Number Namespace
    Version 1.7.0 Descartes
*/
/// <reference path="Chalkboard.ts"/>
namespace Chalkboard {
    export namespace numb {
        export const Bernoullian = (p: number = 0.5): number => {
            if(p === undefined) {
                p = 0.5;
            }
            return Math.random() < p ? 1 : 0;
        }
        export const binomial = (n: number, k: number): number => {
            if(k < 0 || k > n) {
                return 0;
            }
            if(k === 0 || k === n) {
                return 1;
            }
            if(k === 1 || k === n - 1) {
                return n;
            }
            if(n - k < k) {
                k = n - k;
            }
            let result = n;
            for(let i = 2; i <= k; i++) {
                result *= (n - i + 1) / i;
            }
            return Math.round(result);
        }
        export const change = (initial: number, final: number): number => {
            return (final - initial) / initial;
        }
        export const combination = (n: number, r: number): number => {
            return Chalkboard.numb.factorial(n) / (Chalkboard.numb.factorial(n - r) * Chalkboard.numb.factorial(r));
        }
        export const compositeArr = (inf: number, sup: number): number[] => {
            let result = [];
            for(let i = inf; i <= sup; i++) {
                if(!Chalkboard.numb.isPrime(i)) {
                    result.push(i);
                }
            }
            return result;
        }
        export const compositeCount = (inf: number, sup: number): number => {
            return Chalkboard.numb.compositeArr(inf, sup).length;
        }
        export const constrain = (num: number, range: [number, number] = [0, 1]): number => {
            return Math.max(Math.min(num, range[1]), range[0]);
        }
        export const divisors = (num: number): number[] => {
            let result = [];
            for(let i = 1; i <= num; i++) {
                if(num % i === 0) {
                    result.push(i);
                }
            }
            return result;
        }
        export const Euler = (num: number): number | undefined => {
            if(num > 0) {
                let factors = Chalkboard.numb.factors(num);
                for(let i = 0; i < factors.length; i++) {
                    num *= (factors[i] - 1) / factors[i];
                }
                return num;
            } else {
                return undefined;
            }
        }
        export const exponential = (l: number = 1): number => {
            return l <= 0 ? 0 : -Math.log(Math.random()) / l;
        }
        export const factorial = (num: number): number => {
            let n = 1;
            for(var i = 1; i <= num; i++) {
                n *= i;
            }
            i--;
            return n;
        }
        export const factors = (num: number): number[] => {
            let result = [];
            while(num % 2 === 0) {
                result.push(2);
                num /= 2;
            }
            for(let i = 3; i <= Chalkboard.real.sqrt(num); i += 2) {
                while(num % i === 0) {
                    result.push(i);
                    num /= i;
                }
            }
            if(num > 2) {
                result.push(num);
            }
            return result;
        }
        export const Fibonacci = (num: number): number => {
            let sequence = [0, 1];
            if(sequence[num] === undefined) {
                sequence.push(Chalkboard.numb.Fibonacci(num - 1) + sequence[num - 2]);
            }
            return sequence[num];
        }
        export const Gaussian = (height: number, mean: number, deviation: number): number => {
            let u1 = Math.random(), u2 = Math.random();
            let random = Chalkboard.real.sqrt(-2 * Chalkboard.real.ln(u1)) * Chalkboard.trig.cos(Chalkboard.PI(2) * u2);
            return random * height * Chalkboard.real.sqrt(deviation) + mean;
        }
        export const gcd = (a: number, b: number): number => {
            if(b === 0) {
                return a;
            }
            return Chalkboard.numb.gcd(b, a % b);
        }
        export const Goldbach = (num: number): [number, number] | undefined => {
            if(num % 2 === 0) {
                if(num !== 4) {
                    let a = num / 2, b = num / 2;
                    if(a % 2 === 0) {
                        a--;
                        b++;
                    }
                    while(a >= 3) {
                        if(Chalkboard.numb.isPrime(a) && Chalkboard.numb.isPrime(b)) {
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
        }
        export const isPrime = (num: number): boolean => {
            for(let i = 2; i <= Chalkboard.real.sqrt(num); i++) {
                if(num % i === 0) {
                    return false;
                }
            }
            return num > 1;
        }
        export const Kronecker = (a: number, b: number): 1 | 0 => {
            if(a === b) {
                return 1;
            } else  {
                return 0;
            }
        }
        export const lcm = (a: number, b: number): number => {
            return a * (b / Chalkboard.numb.gcd(a, b));
        }
        export const map = (num: number, range1: number[], range2: number[]): number => {
            return range2[0] + (range2[1] - range2[0]) * ((num - range1[0]) / (range1[1] - range1[0]));
        }
        export const mul = (formula: string, inf: number, sup: number): number => {
            let result = 1;
            let f = Chalkboard.real.parse("n => " + formula);
            for(let i = inf; i <= sup; i++) {
                result *= f(i);
            }
            return result;
        }
        export const nextPrime = (num: number): number => {
            let result = num + 1;
            while(!Chalkboard.numb.isPrime(result)) {
                result++;
            }
            return result;
        }
        export const permutation = (n: number, r: number): number => {
            return Chalkboard.numb.factorial(n) / Chalkboard.numb.factorial(n - r);
        }
        export const Poissonian = (l: number = 1): number => {
            if(l > 0) {
                let L = Chalkboard.E(-l);
                let p = 1, k = 0;
                for(; p > L; ++k) {
                    p *= Math.random();
                }
                return k - 1;
            } else {
                return 0;
            }
        }
        export const prime = (num: number): number => {
            if(num === 2) {
                return 2;
            }
            let n = 1;
            let prime = 3;
            while(n < num) {
                if(Chalkboard.numb.isPrime(prime)) {
                    n++;
                }
                if(n < num) {
                    prime += 2;
                }
            }
            return prime;
        }
        export const primeArr = (inf: number, sup: number): number[] => {
            let result = [];
            for(let i = inf; i <= sup; i++) {
                if(Chalkboard.numb.isPrime(i)) {
                    result.push(i);
                }
            }
            return result;
        }
        export const primeCount = (inf: number, sup: number): number => {
            return Chalkboard.numb.primeArr(inf, sup).length;
        }
        export const primeGap = (inf: number, sup: number): number => {
            let prime = null;
            let gap = 0;
            for(let i = inf; i <= sup; i++) {
                if(Chalkboard.numb.isPrime(i)) {
                    if(prime !== null) {
                        let temp = i - prime;
                        if(temp > gap) {
                            gap = temp;
                        }
                    }
                    prime = i;
                }
            }
            return gap;
        }
        export const random = (inf: number = 0, sup: number = 1): number => {
            return inf + (sup - inf) * Math.random();
        }
        export const sgn = (num: number): -1 | 0 | 1 => {
            if(num > 0) {
                return 1;
            } else if(num < 0) {
                return -1;
            } else {
                return 0;
            }
        }
        export const sum = (formula: string, inf: number, sup: number): number => {
            let result = 0;
            let f = Chalkboard.real.parse("n => " + formula);
            for(let i = inf; i <= sup; i++) {
                result += f(i);
            }
            return result;
        }
    }
}