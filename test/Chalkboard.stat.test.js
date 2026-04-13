/*
    Chalkboard
    Version 3.0.2 Euler
    Released April 13th, 2026
    Authored by Zushah: https://www.github.com/Zushah
    Test: Statistics Namespace
*/

import assert from "assert";
import cb from "../dist/Chalkboard.js";

// stat.array, stat.pad, stat.reverse, stat.unique
{
    assert.deepStrictEqual(cb.stat.array(1, 5), [1, 2, 3, 4, 5]);
    assert.deepStrictEqual(cb.stat.pad([1, 2], 4, 9), [1, 2, 9, 9]);
    assert.deepStrictEqual(cb.stat.reverse([1, 2, 3]), [3, 2, 1]);
    assert.deepStrictEqual(cb.stat.unique([1, 1, 2, 2, 3, 3]), [1, 2, 3]);
}

// stat.absolute, stat.negate, stat.add, stat.sub, stat.scl, stat.sum, stat.mul, stat.dot, stat.change, stat.constrain
{
    assert.deepStrictEqual(cb.stat.absolute([-1, 2, -3]), [1, 2, 3]);
    assert.deepStrictEqual(cb.stat.negate([1, -2, 3]), [-1, 2, -3]);
    assert.deepStrictEqual(cb.stat.add([1, 2], [3, 4]), [4, 6]);
    assert.deepStrictEqual(cb.stat.sub([5, 7], [2, 3]), [3, 4]);
    assert.deepStrictEqual(cb.stat.scl([1, 2, 3], 2), [2, 4, 6]);
    assert.strictEqual(cb.stat.sum([1, 2, 3, 4]), 10);
    assert.strictEqual(cb.stat.mul([1, 2, 3, 4]), 24);
    assert.strictEqual(cb.stat.dot([1, 2, 3], [4, 5, 6]), 32);
    assert.deepStrictEqual(cb.stat.change([10, 20], [15, 10]), [0.5, -0.5]);
    assert.deepStrictEqual(cb.stat.constrain([-1, 0.5, 2], [0, 1]), [0, 0.5, 1]);
}

// stat.chiSquared, stat.Bayes
{
    assert.deepStrictEqual(cb.stat.chiSquared([10, 20], [10, 10]), [0, 10]);
    assert.strictEqual(cb.stat.Bayes(0.01, 0.9, 0.1), 0.08333333333333333);
}

// stat.cumsum, stat.cummul, stat.cummax, stat.cummin
{
    assert.deepStrictEqual(cb.stat.cumsum([1, 2, 3]), [1, 3, 6]);
    assert.deepStrictEqual(cb.stat.cummul([2, 3, 4]), [2, 6, 24]);
    assert.deepStrictEqual(cb.stat.cummax([1, 3, 2, 5]), [1, 3, 3, 5]);
    assert.deepStrictEqual(cb.stat.cummin([3, 2, 4, 1]), [3, 2, 2, 1]);
}

// stat.min, stat.max, stat.range, stat.percentile, stat.quartile, stat.interquartileRange
{
    assert.strictEqual(cb.stat.min([1, 2, 3, 4, 5]), 1);
    assert.strictEqual(cb.stat.max([1, 2, 3, 4, 5]), 5);
    assert.strictEqual(cb.stat.range([1, 2, 3, 4, 5]), 4);
    assert.strictEqual(cb.stat.percentile([1, 2, 3, 4, 5], 0), 0);
    assert.strictEqual(cb.stat.percentile([1, 2, 3, 4, 5], 5), 100);
    assert.strictEqual(cb.stat.percentile([1, 2, 3, 4, 5], 3), 60);
    assert.strictEqual(cb.stat.quartile([1, 2, 3, 4, 5], "Q1"), 1.5);
    assert.strictEqual(cb.stat.quartile([1, 2, 3, 4, 5], "Q2"), 3);
    assert.strictEqual(cb.stat.quartile([1, 2, 3, 4, 5], "Q3"), 4.5);
    assert.strictEqual(cb.stat.interquartileRange([1, 2, 3, 4, 5]), 3);
}

// stat.mean, stat.meanMoving, stat.meanWeighted, stat.median, stat.mode, stat.variance, stat.deviation, stat.error, stat.mad, stat.zscored
{
    assert.strictEqual(cb.stat.mean([1, 2, 3, 4, 5]), 3);
    assert.strictEqual(cb.stat.mean([1, 2, 3, 4, 5], "geometric"), 2.605171084697329);
    assert.strictEqual(cb.stat.mean([1, 2, 3, 4, 5], "harmonic"), 2.18978102189781);
    assert.deepStrictEqual(cb.stat.meanMoving([1, 2, 3, 4], 2), [1.5, 2.5, 3.5]);
    assert.strictEqual(cb.stat.meanWeighted([10, 20, 30], [1, 2, 3]), 23.333333333333332);
    assert.strictEqual(cb.stat.median([5, 1, 3, 2, 4]), 3);
    assert.strictEqual(cb.stat.mode([1, 2, 2, 3, 3, 3]), 3);
    assert.strictEqual(cb.stat.variance([1, 2, 3, 4, 5]), 2);
    assert.strictEqual(cb.stat.deviation([1, 2, 3, 4, 5]), 1.414213562373095);
    assert.strictEqual(cb.stat.error([1, 2, 3, 4, 5]), 0.6324555320336758);
    assert.strictEqual(cb.stat.mad([1, 1, 2, 2]), 0.5);
    assert.deepStrictEqual(cb.stat.zscored([1, 2, 3]), [-1.224744871391589, 0, 1.224744871391589]);
}

// stat.covariance, stat.correlationCoefficient, stat.normalize, stat.norm, stat.normsq
{
    const x = [1, 2, 3];
    const y = [1, 2, 3];
    assert.strictEqual(cb.stat.covariance(x, y), cb.stat.variance(x));
    assert.strictEqual(cb.stat.correlationCoefficient(x, y), 1);
    const n = cb.stat.normalize([2, 4]);
    assert.strictEqual(cb.stat.norm(n), 1);
    assert.strictEqual(cb.stat.norm([3, 4]), 5);
    assert.strictEqual(cb.stat.norm([3, 4], "L1"), 7);
    assert.strictEqual(cb.stat.norm([3, 4], "LInfinity"), 4);
    assert.strictEqual(cb.stat.normsq([3, 4]), 25);
}

// stat.eq, stat.gt, stat.lt, stat.ineq
{
    assert.deepStrictEqual(cb.stat.eq([1, 2, 3], 2), [2]);
    assert.deepStrictEqual(cb.stat.gt([1, 2, 3], 2), [3]);
    assert.deepStrictEqual(cb.stat.gt([1, 2, 3], 2, true), [2, 3]);
    assert.deepStrictEqual(cb.stat.lt([1, 2, 3], 2), [1]);
    assert.deepStrictEqual(cb.stat.lt([1, 2, 3], 2, true), [1, 2]);
    assert.deepStrictEqual(cb.stat.ineq([1, 2, 3, 4], 2, 4), [3]);
    assert.deepStrictEqual(cb.stat.ineq([1, 2, 3, 4], 2, 4, true, true), [2, 3, 4]);
}

// stat.normal, stat.inormal, stat.confidenceInterval, stat.Gaussian
{
    assert.strictEqual(cb.stat.normal(0), 0.3989422804014327);
    assert.strictEqual(cb.stat.inormal(0.5), 0);
    assert.deepStrictEqual(cb.stat.confidenceInterval([1, 2, 3, 4, 5], 0.95), [1.7604099354042595, 4.23959006459574]);
    assert.strictEqual(cb.real.val(cb.stat.Gaussian(2, 0, 1), 0), 2);
}

// stat.random, stat.shuffle, stat.subsets, stat.interpolate, stat.resampling
{
    const r = cb.stat.random(5, 0, 1);
    assert.strictEqual(r.length, 5);
    const sh = cb.stat.shuffle([1, 2, 3, 4]);
    assert.strictEqual(sh.length, 4);
    assert.deepStrictEqual(cb.stat.unique(sh).sort((a, b) => a - b), [1, 2, 3, 4]);
    assert.deepStrictEqual(cb.stat.subsets([1, 2, 3]), [[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]]);
    assert.deepStrictEqual(cb.stat.interpolate([1, null, 3, null, null, 6]), [1, 2, 3, 4, 5, 6]);
    assert.deepStrictEqual(cb.stat.resampling([0, 1, 2, 3], 3, "bootstrap").length, 3);
    assert.deepStrictEqual(cb.stat.resampling([0, 1, 2, 3], undefined, "jackknife"), [[1, 2, 3], [0, 2, 3], [0, 1, 3], [0, 1, 2]]);
}

// stat.convolution, stat.correlation, stat.autocorrelation
{
    assert.deepStrictEqual(cb.stat.convolution([1, 1], [1, 1]), [1, 2, 1]);
    assert.deepStrictEqual(cb.stat.correlation([1, 2, 3], [4, 5, 6]), [6, 17, 32, 23, 12]);
    assert.deepStrictEqual(cb.stat.autocorrelation([1, 2, 3]), [3, 8, 14, 8, 3]);
}

// stat.expected, stat.skewness, stat.kurtosis
{
    assert.strictEqual(cb.stat.expected([0, 1], [0.25, 0.75]), 0.75);
    assert.strictEqual(cb.stat.expected([0, 1]), 0.5);
    assert.strictEqual(cb.stat.skewness([1, 2, 3, 4, 5]), 0);
    assert.strictEqual(cb.stat.kurtosis([1, 2, 3, 4, 5]), 5.5000000000000036);
}

// stat.regression
{
    assert.strictEqual(cb.real.val(cb.stat.regression([[0, 1], [1, 3], [2, 5]], "linear"), 2), 5);
    assert.strictEqual(cb.real.val(cb.stat.regression([[0, 0], [1, 1], [2, 4]], "polynomial", 2), 3), 9);
    assert.strictEqual(cb.real.val(cb.stat.regression([[1, 2], [2, 16], [3, 54]], "power"), 2), 16);
    assert.strictEqual(cb.real.val(cb.stat.regression([[0, 2], [1, 2*cb.E(0.5)], [2, 2*cb.E()]], "exponential"), 1), 3.2974425414002564);
    assert.strictEqual(cb.real.val(cb.stat.regression([[1, 1], [2, 1+2*cb.real.ln(2)], [4, 1+2*cb.real.ln(4)]], "logarithmic"), 2), 2.386294361119891);
}

// stat.print, stat.toString, stat.toObject, stat.toMatrix, stat.toVector, stat.toTensor, stat.toSet
{
    assert.doesNotThrow(() => cb.stat.print([1, 2, 3]));
    assert.strictEqual(cb.stat.toString([1, 2, 3]), "[1, 2, 3]");
    assert.deepStrictEqual(cb.stat.toObject([10, 20]), { _0: 10, _1: 20 });
    assert.deepStrictEqual(cb.stat.toMatrix([1, 2, 3, 4], 2, 2), [[1, 2], [3, 4]]);
    assert.deepStrictEqual(cb.stat.toVector([1, 2, 3], 2), { x: 1, y: 2 });
    assert.deepStrictEqual(cb.stat.toVector([1, 2, 3, 4], 3), { x: 1, y: 2, z: 3 });
    assert.deepStrictEqual(cb.stat.toTensor([1, 2, 3, 4], 2, 2), [[1, 2], [3, 4]]);
    assert.ok(cb.stat.toSet([1, 2, 2, 3]).contains(1) && cb.stat.toSet([1, 2, 2, 3]).contains(3) && !cb.stat.toSet([1, 2, 2, 3]).contains(4));
}
