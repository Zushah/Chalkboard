/*
 * Chalkboard v3.1.0 Ricci - Tensor Namespace Tests
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import assert from "assert";
import cb from "@zushah/chalkboard";

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
    assert.deepStrictEqual(cb.tens.copy(cb.tens.empty(2, 2)), [[null, null], [null, null]]);
    assert.deepStrictEqual(cb.tens.negate(t), [[1.6, -2.4], [-3.1, 4.8]]);
    assert.deepStrictEqual(cb.tens.reciprocate(cb.tens.init([[2, 4], [8, 10]])), [[0.5, 0.25], [0.125, 0.1]]);
    assert.deepStrictEqual(cb.tens.round(t), [[-2, 2], [3, -5]]);
}

// tens.add, tens.mul, tens.mulHadamard, tens.scl, tens.sub
{
    const t1 = cb.tens.init([1, 2], [3, 4]);
    const t2 = cb.tens.init([5, 6], [7, 8]);
    assert.deepStrictEqual(cb.tens.add(t1, t2), [[6, 8], [10, 12]]);
    assert.deepStrictEqual(cb.tens.add(t1, 1), [[2, 3], [4, 5]]);
    assert.throws(() => cb.tens.add(cb.tens.empty(2, 2), 1));
    assert.deepStrictEqual(cb.tens.add([[1, 2, 3], [4, 5, 6]], [10, 20, 30]), [[11, 22, 33], [14, 25, 36]]);
    assert.deepStrictEqual(cb.tens.add([[1], [2]], [[10, 20, 30]]), [[11, 21, 31], [12, 22, 32]]);
    assert.throws(() => cb.tens.add([[1, 2, 3], [4, 5, 6]], [1, 2]));
    assert.deepStrictEqual(cb.tens.mul(t1, t2), [[[[5, 6], [7, 8]], [[10, 12], [14, 16]]], [[[15, 18], [21, 24]], [[20, 24], [28, 32]]]]);
    assert.deepStrictEqual(cb.tens.mul(2, t1), [[2, 4], [6, 8]]);
    assert.deepStrictEqual(cb.tens.mulHadamard(t1, t2), [[5, 12], [21, 32]]);
    assert.deepStrictEqual(cb.tens.mulHadamard(t1, [10, 100]), [[10, 200], [30, 400]]);
    assert.deepStrictEqual(cb.tens.scl(t1, 2), [[2, 4], [6, 8]]);
    assert.deepStrictEqual(cb.tens.scl(cb.tens.init([1, -1]), Infinity), [Infinity, -Infinity]);
    assert.deepStrictEqual(cb.tens.sub(t1, t2), [[-4, -4], [-4, -4]]);
    assert.deepStrictEqual(cb.tens.sub(10, t1), [[9, 8], [7, 6]]);
    assert.deepStrictEqual(cb.tens.sub([10], [[1], [2]]), [[9], [8]]);
}

// tens.empty, tens.fill, tens.random, tens.zero
{
    assert.deepStrictEqual(cb.tens.empty(2, 2), [[null, null], [null, null]]);
    assert.deepStrictEqual(cb.tens.fill(7, 2, 2), [[7, 7], [7, 7]]);
    const r = cb.tens.random(0, 1, 2, 2); assert.strictEqual(typeof r[0][0], "number");
    assert.deepStrictEqual(cb.tens.zero(2, 2), [[0, 0], [0, 0]]);
}

// tens.rank, tens.shape, tens.size
{
    const t = cb.tens.init([[[1, 2], [3, 4]]]);
    assert.strictEqual(cb.tens.rank(t), 3);
    assert.deepStrictEqual(cb.tens.shape(t), [1, 2, 2]);
    assert.strictEqual(cb.tens.size(t), 4);
    assert.throws(() => cb.tens.shape([[1], [2, 3]]));
}

// tens.isApproxEqual, tens.isEqual, tens.isRankEqual, tens.isRankOf, tens.isShapeEqual, tens.isShapeOf, tens.isShapeUniform, tens.isZero
{
    const t1 = cb.tens.init([[1, 2], [3, 4]]);
    const t2 = cb.tens.init([[5, 6], [7, 8]]);
    assert.strictEqual(cb.tens.isApproxEqual(t1, cb.tens.init([[1.000000000000001, 2.000000000000001], [3.000000000001, 4.0]])), true);
    assert.strictEqual(cb.tens.isApproxEqual([Infinity], [Infinity]), true);
    assert.strictEqual(cb.tens.isEqual(t1, cb.tens.init([[1, 2], [3, 4]])), true);
    assert.strictEqual(cb.tens.isEqual(3, 4), false);
    assert.strictEqual(cb.tens.isEqual([NaN], [NaN]), false);
    assert.strictEqual(cb.tens.isRankEqual(t1, t2), true);
    assert.strictEqual(cb.tens.isRankOf(t1, 2), true);
    assert.strictEqual(cb.tens.isShapeEqual(t1, t2), true);
    assert.strictEqual(cb.tens.isShapeOf(t1, 2, 2), true);
    assert.strictEqual(cb.tens.isShapeUniform(t1), true);
    assert.strictEqual(cb.tens.isZero(cb.tens.zero(2, 2)), true);
}

// tens.concat, tens.constrain, tens.contract, tens.permute, tens.pull, tens.push, tens.reshape, tens.resize, tens.transpose
{
    const t1 = cb.tens.init([1, 2]);
    const t2 = cb.tens.init([3, 4]);
    assert.deepStrictEqual(cb.tens.concat(t1, t2, 0), [1, 2, 3, 4]);
    assert.deepStrictEqual(cb.tens.concat(cb.tens.init([[1, 2]]), cb.tens.init([[3, 4]]), 1), [[1, 2, 3, 4]]);
    assert.deepStrictEqual(cb.tens.concat([[1, 2]], [[3, 4]]), [[1, 2], [3, 4]]);
    assert.deepStrictEqual(cb.tens.constrain(cb.tens.init([-1, 2]), [0, 1]), [0, 1]);
    assert.strictEqual(cb.tens.contract(cb.tens.init([[1, 2], [3, 4]])), 5);
    assert.deepStrictEqual(cb.tens.contract([[[1, 2], [3, 4], [5, 6]], [[7, 8], [9, 10], [11, 12]]], 0, 2), [9, 13, 17]);
    assert.deepStrictEqual(cb.tens.contract([[[1, 2, 3], [4, 5, 6]], [[7, 8, 9], [10, 11, 12]]]), [11, 13, 15]);
    assert.deepStrictEqual(cb.tens.permute([[[1, 2, 3]], [[4, 5, 6]]], 2, 0, 1), [[[1], [4]], [[2], [5]], [[3], [6]]]);
    const t3 = cb.tens.init([[1, 2], [3, 4]]);
    assert.deepStrictEqual(cb.tens.pull(cb.tens.copy(t3), 1, 0), [[2], [4]]);
    assert.deepStrictEqual(cb.tens.push(cb.tens.copy(t3), 1, 0, [5, 6]), [[5, 1, 2], [6, 3, 4]]);
    assert.deepStrictEqual(cb.tens.reshape([1, 2, 3, 4, 5, 6], 2, 3), [[1, 2, 3], [4, 5, 6]]);
    assert.throws(() => cb.tens.reshape([1, 2, 3, 4], 3));
    assert.deepStrictEqual(cb.tens.resize(cb.tens.init([1, 2, 3, 4]), 2, 2), [[1, 2], [3, 4]]);
    assert.deepStrictEqual(cb.tens.transpose(cb.tens.init([[1, 2, 3], [4, 5, 6]])), [[1, 4], [2, 5], [3, 6]]);
    assert.deepStrictEqual(cb.tens.transpose([[[1, 2, 3]], [[4, 5, 6]]]), [[[1, 4]], [[2, 5]], [[3, 6]]]);
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

// tens.antisymmetrize, tens.einsum, tens.identity, tens.isAntisymmetric, tens.isSymmetric, tens.LeviCivita, tens.mulContract, tens.symmetrize
{
    assert.deepStrictEqual(cb.tens.identity(3), cb.matr.identity(3));
    assert.deepStrictEqual(cb.tens.identity(2, 3), [[[1, 0], [0, 0]], [[0, 0], [0, 1]]]);
    assert.deepStrictEqual(cb.tens.LeviCivita(2), [[0, 1], [-1, 0]]);
    const epsilon = cb.tens.LeviCivita(3);
    assert.strictEqual(epsilon[0][1][2], 1);
    assert.strictEqual(epsilon[1][0][2], -1);
    assert.deepStrictEqual(cb.tens.mulContract([[1, 2], [3, 4]], [[5, 6], [7, 8]]), [[19, 22], [43, 50]]);
    assert.strictEqual(cb.tens.mulContract([1, 2, 3], [4, 5, 6]), 32);
    assert.deepStrictEqual(cb.tens.einsum("ij,jk->ik", [[1, 2], [3, 4]], [[5, 6], [7, 8]]), [[19, 22], [43, 50]]);
    assert.strictEqual(cb.tens.einsum("ii", [[1, 2], [3, 4]]), 5);
    assert.deepStrictEqual(cb.tens.einsum("ijk,j,k->i", epsilon, [1, 2, 3], [4, 5, 6]), [-3, 6, -3]);
    assert.deepStrictEqual(cb.tens.symmetrize([[1, 2], [4, 3]]), [[1, 3], [3, 3]]);
    assert.deepStrictEqual(cb.tens.antisymmetrize([[1, 2], [4, 3]]), [[0, -1], [1, 0]]);
    assert.strictEqual(cb.tens.isSymmetric([[1, 2], [2, 1]]), true);
    assert.strictEqual(cb.tens.isSymmetric([[1, 2], [3, 4]]), false);
    assert.strictEqual(cb.tens.isAntisymmetric(epsilon), true);
}

// tens.get, tens.set, tens.slice, tens.stack
{
    const t = [[1, 2, 3], [4, 5, 6]];
    assert.strictEqual(cb.tens.get(t, 1, 2), 6);
    assert.deepStrictEqual(cb.tens.get(t, 1), [4, 5, 6]);
    assert.deepStrictEqual(cb.tens.set(cb.tens.copy([[1, 2], [3, 4]]), [0, 1], 9), [[1, 9], [3, 4]]);
    assert.deepStrictEqual(cb.tens.slice([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]], [1, 3], [0, 2]), [[5, 6], [9, 10]]);
    assert.deepStrictEqual(cb.tens.stack([[1, 2], [3, 4]]), [[1, 2], [3, 4]]);
    assert.deepStrictEqual(cb.tens.stack([[1, 2], [3, 4]], 1), [[1, 3], [2, 4]]);
}

// tens.dot, tens.max, tens.mean, tens.min, tens.norm, tens.normalize, tens.normsq, tens.sum
{
    const t = [[1, 2, 3], [4, 5, 6]];
    assert.strictEqual(cb.tens.sum(t), 21);
    assert.deepStrictEqual(cb.tens.sum(t, 0), [5, 7, 9]);
    assert.deepStrictEqual(cb.tens.mean(t, 1), [2, 5]);
    assert.deepStrictEqual(cb.tens.max(t, 1), [3, 6]);
    assert.deepStrictEqual(cb.tens.min(t, 0), [1, 2, 3]);
    assert.strictEqual(cb.tens.dot([[1, 2], [3, 4]], [[1, 2], [3, 4]]), 30);
    assert.strictEqual(cb.tens.norm([[3, 4]]), 5);
    assert.strictEqual(cb.tens.norm([[3, -4]], "L1"), 7);
    assert.strictEqual(cb.tens.norm([[-5, 1]], "LInfinity"), 5);
    assert.strictEqual(cb.tens.normsq([[3, 4]]), 25);
    assert.deepStrictEqual(cb.tens.normalize([3, 4]), [0.6, 0.8]);
}
