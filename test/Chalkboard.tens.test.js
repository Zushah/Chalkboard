/*
    The Chalkboard Library - Tensor Namespace Tests
    Version 2.4.0 Noether
*/

import assert from "assert";
import cb from "../dist/Chalkboard.js";

// tens.init
{
    const t1 = cb.tens.init([[[1, 2], [3, 4]], [[5, 6], [7, 8]]]);
    assert.deepStrictEqual(t1, [[[1, 2], [3, 4]], [[5, 6], [7, 8]]]);
    const t2 = cb.tens.init([[1, 2], [3, 4]]);
    assert.deepStrictEqual(t2, [[1, 2], [3, 4]]);
}

// tens.absolute, tens.copy, tens.negate, tens.reciprocate, tens.round
{
    const t = cb.tens.init([[-1.6, 2.4], [3.1, -4.8]]);
    assert.deepStrictEqual(cb.tens.absolute(t), [[1.6, 2.4], [3.1, 4.8]]);
    const tcopy = cb.tens.copy(t); assert.deepStrictEqual(tcopy, [[-1.6, 2.4], [3.1, -4.8]]);
    assert.deepStrictEqual(cb.tens.negate(t), [[1.6, -2.4], [-3.1, 4.8]]);
    assert.deepStrictEqual(cb.tens.reciprocate(cb.tens.init([[2, 4], [8, 10]])), [[0.5, 0.25], [0.125, 0.1]]);
    assert.deepStrictEqual(cb.tens.round(t), [[-2, 2], [3, -5]]);
}

// tens.add, tens.mul, tens.scl, tens.sub
{
    const t1 = cb.tens.init([1, 2], [3, 4]);
    const t2 = cb.tens.init([5, 6], [7, 8]);
    assert.deepStrictEqual(cb.tens.add(t1, t2), [[6, 8], [10, 12]]);
    assert.deepStrictEqual(cb.tens.mul(t1, t2), [[[[5, 6], [10, 12]], [[7, 8], [14, 16]]], [[[15, 18], [20, 24]], [[21, 24], [28, 32]]]]);
    assert.deepStrictEqual(cb.tens.scl(t1, 2), [[2, 4], [6, 8]]);
    assert.deepStrictEqual(cb.tens.sub(t1, t2), [[-4, -4], [-4, -4]]);
}

// tens.empty, tens.fill, tens.random, tens.zero
{
    assert.deepStrictEqual(cb.tens.empty(2, 2), [[null, null], [null, null]]);
    assert.deepStrictEqual(cb.tens.fill(7, 2, 2), [[7, 7], [7, 7]]);
    const r = cb.tens.random(0, 1, 2, 2); assert.strictEqual(typeof r[0][0], "number");
    assert.deepStrictEqual(cb.tens.zero(2, 2), [[0, 0], [0, 0]]);
}

// tens.rank, tens.size
{
    const t = cb.tens.init([[[1, 2], [3, 4]]]);
    assert.strictEqual(cb.tens.rank(t), 3);
    assert.deepStrictEqual(cb.tens.size(t), [1, 2, 2]);
}

// tens.isEqual, tens.isRankEqual, tens.isRankOf, tens.isSizeEqual, tens.isSizeOf, tens.isSizeUniform
{
    const t1 = cb.tens.init([[1, 2], [3, 4]]);
    const t2 = cb.tens.init([[5, 6], [7, 8]]);
    assert.strictEqual(cb.tens.isEqual(t1, cb.tens.init([[1, 2], [3, 4]])), true);
    assert.strictEqual(cb.tens.isRankEqual(t1, t2), true);
    assert.strictEqual(cb.tens.isRankOf(t1, 2), true);
    assert.strictEqual(cb.tens.isSizeEqual(t1, t2), true);
    assert.strictEqual(cb.tens.isSizeOf(t1, 2, 2), true);
    assert.strictEqual(cb.tens.isSizeUniform(t1), true);
}

// tens.concat, tens.constrain, tens.contract, tens.pull, tens.push, tens.resize, tens.transpose
{
    const t1 = cb.tens.init([1, 2]);
    const t2 = cb.tens.init([3, 4]);
    assert.deepStrictEqual(cb.tens.concat(t1, t2, 1), [1, 2, 3, 4]);
    assert.deepStrictEqual(cb.tens.constrain(cb.tens.init([-1, 2]), [0, 1]), [0, 1]);
    assert.strictEqual(cb.tens.contract(cb.tens.init([[1, 2], [3, 4]])), 5);
    const t3 = cb.tens.init([[1, 2], [3, 4]]);
    assert.deepStrictEqual(cb.tens.pull(cb.tens.copy(t3), 1, 0), [[2], [4]]);
    assert.deepStrictEqual(cb.tens.push(cb.tens.copy(t3), 1, 0, [5, 6]), [[5, 1, 2], [6, 3, 4]]);
    assert.deepStrictEqual(cb.tens.resize(cb.tens.init([1, 2, 3, 4]), 2, 2), [[1, 2], [3, 4]]);
    assert.deepStrictEqual(cb.tens.transpose(cb.tens.init([[1, 2, 3], [4, 5, 6]])), [[1, 2], [3, 4], [5, 6]]);
}

// tens.print, tens.toArray, tens.toMatrix, tens.toObject, tens.toSet, tens.toString, tens.toTypedArray, tens.toVector
{
    const t = cb.tens.init([[1, 2], [3, 4]]);
    assert.doesNotThrow(() => cb.tens.print(t));
    assert.deepStrictEqual(cb.tens.toArray(t), [1, 2, 3, 4]);
    assert.deepStrictEqual(cb.tens.toMatrix(t), [[1, 2], [3, 4]]);
    assert.deepStrictEqual(cb.tens.toObject(t), { _1: { _1: 1, _2: 2 }, _2: { _1: 3, _2: 4 } });
    assert.ok(cb.tens.toSet(t));
    assert.strictEqual(typeof cb.tens.toString(t), "string");
    assert.deepStrictEqual(cb.tens.toTypedArray(t, "float32"), new Float32Array([1, 2, 3, 4]));
    assert.deepStrictEqual(cb.tens.toVector(t, 2, 0), { x: 1, y: 2 });
}

console.log("🟩 Chalkboard.tens tests passed.");
