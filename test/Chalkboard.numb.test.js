/*
    Chalkboard
    Version 3.0.0 Euler
    Released March 2nd, 2026
    Authored by Zushah: https://www.github.com/Zushah
    Test: Number Theory Namespace
*/

import assert from "assert";
import cb from "../dist/Chalkboard.js";

// numb.factorial, numb.Fibonacci, numb.binomial, numb.combination, numb.permutation, numb.mul, numb.sum
{
    assert.strictEqual(cb.numb.factorial(5), 120);
    assert.strictEqual(cb.numb.Fibonacci(10), 55);
    assert.strictEqual(cb.numb.binomial(5, 2), 10);
    assert.strictEqual(cb.numb.combination(5, 2), 10);
    assert.strictEqual(cb.numb.permutation(4, 4), 24);
    assert.strictEqual(cb.numb.sum((i) => i, 1, 4), 10);
    assert.strictEqual(cb.numb.mul((i) => i, 1, 4), 24);
}

// numb.isPrime, numb.prime, numb.primeArr, numb.primeCount, numb.compositeArr, numb.compositeCount, numb.nextPrime, numb.primeGap, numb.gcd, numb.lcm, numb.factors, numb.divisors, numb.Goldbach, numb.Kronecker, numb.mod, numb.sgn
{
    assert.strictEqual(cb.numb.isPrime(2), true);
    assert.strictEqual(cb.numb.isPrime(9), false);
    assert.strictEqual(cb.numb.prime(1), 2);
    assert.strictEqual(cb.numb.prime(5), 11);
    assert.deepStrictEqual(cb.numb.primeArr(0, 10), [2, 3, 5, 7]);
    assert.strictEqual(cb.numb.primeCount(0, 10), 4);
    assert.deepStrictEqual(cb.numb.compositeArr(0, 10), [4, 6, 8, 9, 10]);
    assert.strictEqual(cb.numb.compositeCount(0, 10), 5);
    assert.strictEqual(cb.numb.nextPrime(5), 7);
    assert.strictEqual(cb.numb.primeGap(2, 13), 4);
    assert.strictEqual(cb.numb.gcd(12, 18), 6);
    assert.strictEqual(cb.numb.lcm(12, 18), 36);
    assert.deepStrictEqual(cb.numb.factors(60), [2, 2, 3, 5]);
    assert.deepStrictEqual(cb.numb.divisors(12), [1, 2, 3, 4, 6, 12]);
    assert.deepStrictEqual(cb.numb.Goldbach(28), [11, 17]);
    assert.strictEqual(cb.numb.Kronecker(3, 3), 1);
    assert.strictEqual(cb.numb.Kronecker(3, 4), 0);
    assert.strictEqual(cb.numb.mod(-1, 5), 4);
    assert.strictEqual(cb.numb.sgn(-5), -1);
    assert.strictEqual(cb.numb.sgn(0), 0);
    assert.strictEqual(cb.numb.sgn(5), 1);
}

// numb.isApproxEqual, numb.isRational, numb.constrain, numb.change, numb.roundTo, numb.map, numb.convert, numb.toBinary, numb.toDecimal, numb.toFraction, numb.toHexadecimal, numb.toOctal, numb.Euler
{
    assert.strictEqual(cb.numb.isApproxEqual(0.1 + 0.2, 0.3, 1e-12), true);
    assert.strictEqual(cb.numb.isRational(3 / 4), true);
    assert.strictEqual(cb.numb.isRational(cb.PI()), false);
    assert.strictEqual(cb.numb.constrain(5, [0, 10]), 5);
    assert.strictEqual(cb.numb.constrain(-1, [0, 10]), 0);
    assert.strictEqual(cb.numb.constrain(11, [0, 10]), 10);
    assert.strictEqual(cb.numb.change(100, 110), 0.1);
    assert.strictEqual(cb.numb.roundTo(1.2345, 0.01), 1.23);
    assert.deepStrictEqual(cb.numb.map(23, [0, 25], [0, 1]), 0.92);
    assert.strictEqual(cb.numb.convert(100, "cm", "m"), 1);
    assert.deepStrictEqual(cb.numb.convert([0, 100], "cm", "m"), [0, 1]);
    assert.strictEqual(cb.numb.convert(0, "c", "f"), 31.999999999999986);
    assert.strictEqual(cb.numb.toBinary(10), "1010");
    assert.strictEqual(cb.numb.toBinary(10, true), "0b1010");
    assert.strictEqual(cb.numb.toDecimal("0b1010", 2), 10);
    assert.deepStrictEqual(cb.numb.toFraction(0.75), [3, 4]);
    assert.strictEqual(cb.numb.toHexadecimal(255), "ff");
    assert.strictEqual(cb.numb.toHexadecimal(255, true, true), "0xFF");
    assert.strictEqual(cb.numb.toOctal(10), "12");
    assert.strictEqual(cb.numb.toOctal(10, true), "0o12");
    assert.strictEqual(cb.numb.Euler(9), 6);
}

// numb.Bernoullian, numb.Gaussian, numb.Poissonian, numb.exponential, numb.random
{
    assert.strictEqual(cb.numb.Bernoullian(0), 0);
    assert.strictEqual(cb.numb.Bernoullian(1), 1);
    const g = cb.numb.Gaussian(0, 1);
    assert.ok(Number.isFinite(g));
    const p = cb.numb.Poissonian(2);
    assert.ok(Number.isInteger(p));
    assert.ok(p >= 0);
    const e = cb.numb.exponential(2);
    assert.ok(Number.isFinite(e));
    assert.ok(e >= 0);
    assert.strictEqual(cb.numb.random(5, 5), 5);
}
