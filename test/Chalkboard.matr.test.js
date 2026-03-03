/*
    Chalkboard
    Version 3.0.0 Euler
    Released March 2nd, 2026
    Authored by Zushah: https://www.github.com/Zushah
    Test: Matrix Namespace
*/

import assert from "assert";
import cb from "../dist/Chalkboard.js";

// matr.init
{
    const m = cb.matr.init([1, 2], [3, 4]);
    assert.deepStrictEqual(m, [[1, 2], [3, 4]]);
    const n = cb.matr.init([[1, 2], [3, 4]]);
    assert.deepStrictEqual(n, [[1, 2], [3, 4]]);
}

// matr.absolute, matr.copy, matr.negate, matr.reciprocate, matr.round
{
    const m = cb.matr.init([1.6, -2.4], [-3.1, 4.8]);
    assert.deepStrictEqual(cb.matr.absolute(m), [[1.6, 2.4], [3.1, 4.8]]);
    const mcopy = cb.matr.copy(m); assert.deepStrictEqual(mcopy, [[1.6, -2.4], [-3.1, 4.8]]);
    assert.deepStrictEqual(cb.matr.negate(m), [[-1.6, 2.4], [3.1, -4.8]]);
    assert.deepStrictEqual(cb.matr.reciprocate(cb.matr.init([2, 4], [8, 10])), [[0.5, 0.25], [0.125, 0.1]]);
    assert.deepStrictEqual(cb.matr.round(m), [[2, -2], [-3, 5]]);
}

// matr.add, matr.addKronecker, matr.mul, matr.mulKronecker, matr.mulVector, matr.pow, matr.scl, matr.sub
{
    const m1 = cb.matr.init([1, 2], [3, 4]);
    const m2 = cb.matr.init([5, 6], [7, 8]);
    assert.deepStrictEqual(cb.matr.add(m1, m2), [[6, 8], [10, 12]]);
    assert.deepStrictEqual(cb.matr.addKronecker(cb.matr.identity(2), cb.matr.identity(2)), cb.matr.scl(cb.matr.identity(4), 2));
    assert.deepStrictEqual(cb.matr.mul(m1, m2), [[19, 22], [43, 50]]);
    assert.deepStrictEqual(cb.matr.mulKronecker(m1, m2), [[5, 6, 10, 12], [7, 8, 14, 16], [15, 18, 20, 24], [21, 24, 28, 32]]);
    assert.deepStrictEqual(cb.matr.mulVector(m1, cb.vect.init(1, 2)), { x: 5, y: 11 });
    assert.deepStrictEqual(cb.matr.pow(m1, 2), [[7, 10], [15, 22]]);
    assert.deepStrictEqual(cb.matr.scl(m1, 2), [[2, 4], [6, 8]]);
    assert.deepStrictEqual(cb.matr.sub(m1, m2), [[-4, -4], [-4, -4]]);
}

// matr.diagonal, matr.empty, matr.exchange, matr.fill, matr.Hilbert, matr.identity, matr.Lehmer, matr.lowerBinomial, matr.lowerShift, matr.lowerTriangular, matr.random, matr.rotator, matr.scaler, matr.symmetricBinomial, matr.translator, matr.upperBinomial, matr.upperShift, matr.upperTriangular, matr.zero
{
    assert.deepStrictEqual(cb.matr.diagonal(2, 5, 6), [[5, 0], [0, 6]]);
    assert.deepStrictEqual(cb.matr.empty(2), [[null, null], [null, null]]);
    assert.deepStrictEqual(cb.matr.exchange(2), [[0, 1], [1, 0]]);
    assert.deepStrictEqual(cb.matr.fill(7, 2), [[7, 7], [7, 7]]);
    assert.deepStrictEqual(cb.matr.Hilbert(2), [[1, 0.5], [0.5, 1/3]]);
    assert.deepStrictEqual(cb.matr.identity(2), [[1, 0], [0, 1]]);
    assert.deepStrictEqual(cb.matr.Lehmer(2), [[1, 0.5], [0.5, 1]]);
    assert.deepStrictEqual(cb.matr.lowerBinomial(2), [[1, 0], [1, 1]]);
    assert.deepStrictEqual(cb.matr.lowerShift(2), [[0, 0], [1, 0]]);
    assert.deepStrictEqual(cb.matr.lowerTriangular(2, 1, 2, 3), [[1, 0], [2, 3]]);
    const r = cb.matr.random(2); assert.strictEqual(typeof r[0][0], "number");
    assert.strictEqual(cb.matr.rotator(0)[0][0], 1);
    assert.strictEqual(cb.matr.rotator(0)[1][1], 1);
    assert.deepStrictEqual(cb.matr.scaler(cb.vect.init(2, 3)), [[2, 0], [0, 3]]);
    assert.deepStrictEqual(cb.matr.symmetricBinomial(2), [[1, 1], [1, 2]]);
    assert.deepStrictEqual(cb.matr.translator(cb.vect.init(2, 3)), [[1, 0, 2], [0, 1, 3], [0, 0, 1]]);
    assert.deepStrictEqual(cb.matr.upperBinomial(2), [[1, 1], [0, 1]]);
    assert.deepStrictEqual(cb.matr.upperShift(2), [[0, 1], [0, 0]]);
    assert.deepStrictEqual(cb.matr.upperTriangular(2, 1, 2, 3), [[1, 2], [0, 3]]);
    assert.deepStrictEqual(cb.matr.zero(2), [[0, 0], [0, 0]]);
}

// matr.cols, matr.det, matr.eigenvalue, matr.eigenvector, matr.norm, matr.normsq, matr.perm, matr.rank, matr.rows, matr.trace
{
    const m = cb.matr.init([1, 2], [3, 4]);
    assert.strictEqual(cb.matr.cols(m), 2);
    assert.strictEqual(cb.matr.det(m), -2);
    assert.strictEqual(cb.matr.rows(m), 2);
    assert.strictEqual(cb.matr.trace(m), 5);
    assert.strictEqual(cb.matr.perm(m), 10);
    assert.strictEqual(cb.matr.rank(m), 2);
    assert.strictEqual(cb.matr.norm(cb.matr.init([1, 2], [3, 4])), 5.477225575051661);
    assert.strictEqual(cb.matr.normsq(cb.matr.init([1, 2], [3, 4])), 30);
    const em = cb.matr.init([2, 0], [0, 3]);
    assert.ok(cb.matr.eigenvalue(em) > 2.9);
    assert.ok(cb.matr.eigenvector(em).length === 2);
}

// matr.isApproxEqual, matr.isDiagonal, matr.isEqual, matr.isIdentity, matr.isInvertible, matr.isLowerTriangular, matr.isOrthogonal, matr.isSizeEqual, matr.isSizeOf, matr.isSkewSymmetric, matr.isSquare, matr.isSymmetric, matr.isUpperTriangular, matr.isZero
{
    const m1 = cb.matr.init([1, 2], [3, 4]);
    const i = cb.matr.identity(2);
    assert.strictEqual(cb.matr.isApproxEqual(m1, cb.matr.init([1.000000000000001, 2.000000000000001], [3.000000000000001, 4.000000000000001])), true);
    assert.strictEqual(cb.matr.isDiagonal(cb.matr.init([1, 0], [0, 2])), true);
    assert.strictEqual(cb.matr.isEqual(m1, cb.matr.init([1, 2], [3, 4])), true);
    assert.strictEqual(cb.matr.isIdentity(i), true);
    assert.strictEqual(cb.matr.isInvertible(m1), true);
    assert.strictEqual(cb.matr.isLowerTriangular(cb.matr.init([1, 0], [2, 3])), true);
    assert.strictEqual(cb.matr.isOrthogonal(i), true);
    assert.strictEqual(cb.matr.isSizeEqual(m1, i), true);
    assert.strictEqual(cb.matr.isSizeOf(m1, 2), true);
    assert.strictEqual(cb.matr.isSkewSymmetric(cb.matr.init([0, 2], [-2, 0])), true);
    assert.strictEqual(cb.matr.isSquare(m1), true);
    assert.strictEqual(cb.matr.isSymmetric(cb.matr.init([1, 2], [2, 1])), true);
    assert.strictEqual(cb.matr.isUpperTriangular(cb.matr.init([1, 2], [0, 3])), true);
    assert.strictEqual(cb.matr.isZero(cb.matr.zero(2)), true);
}

// matr.adjugate, matr.Cholesky, matr.cofactor, matr.colspace, matr.concat, matr.constrain, matr.Gaussian, matr.invert, matr.LUdecomp, matr.normalize, matr.nullspace, matr.pull, matr.push, matr.QRdecomp, matr.resize, matr.rowspace, matr.solve, matr.transpose
{
    const m1 = cb.matr.init([1, 2], [3, 4]);
    assert.deepStrictEqual(cb.matr.adjugate(m1, 0, 0), [[4]]);
    assert.deepStrictEqual(cb.matr.cofactor(m1, 0, 0), [[4]]);
    assert.deepStrictEqual(cb.matr.colspace(m1), [[1, -0], [0, 1]]);
    assert.deepStrictEqual(cb.matr.concat(m1, m1, 1), [[1, 2, 1, 2], [3, 4, 3, 4]]);
    assert.deepStrictEqual(cb.matr.constrain(m1, [0, 2]), [[1, 2], [2, 2]]);
    assert.deepStrictEqual(cb.matr.Gaussian(cb.matr.copy(m1)), [[1, 0], [-0, 1]]);
    assert.deepStrictEqual(cb.matr.invert(m1), [[-2, 1], [1.5, -0.5]]);
    assert.deepStrictEqual(cb.matr.normalize(cb.matr.init([3, 4], [0, 0])), [[0.6, 0.8], [0, 0]]);
    assert.deepStrictEqual(cb.matr.pull(cb.matr.copy(m1), 0, 0), [[3, 4]]);
    assert.deepStrictEqual(cb.matr.push(cb.matr.copy(m1), 0, 0, [5, 6]), [[5, 6], [1, 2], [3, 4]]);
    assert.deepStrictEqual(cb.matr.resize(m1, 3, 3), [[1, 2, 0], [3, 4, 0], [0, 0, 0]]);
    assert.deepStrictEqual(cb.matr.rowspace(cb.matr.copy(m1)), [[1, 0], [-0, 1]]);
    assert.deepStrictEqual(cb.matr.solve(m1, cb.matr.init([5], [11])), [[1], [2]]);
    assert.deepStrictEqual(cb.matr.transpose(m1), [[1, 3], [2, 4]]);
    const pdm = cb.matr.init([4, 12, -16], [12, 37, -43], [-16, -43, 98]);
    const cholesky = cb.matr.Cholesky(pdm);
    assert.deepStrictEqual(cholesky.L, [[2, 0, 0], [6, 1, 0], [-8, 5, 3]]);
    const lu = cb.matr.LUdecomp(m1);
    assert.deepStrictEqual(lu.L, [[1, 0], [3, 1]]);
    assert.deepStrictEqual(lu.U, [[1, 2], [0, -2]]);
    assert.ok(Array.isArray(cb.matr.nullspace(cb.matr.init([1, -1], [-2, 2]))));
    const qr = cb.matr.QRdecomp(cb.matr.init([12, -51, 4], [6, 167, -68], [-4, 24, -41]));
    assert.ok(qr.Q && qr.R);
}

// matr.print, matr.toArray, matr.toObject, matr.toSet, matr.toString, matr.toTensor, matr.toTypedArray, matr.toVector
{
    const m = cb.matr.init([1, 2], [3, 4]);
    assert.doesNotThrow(() => cb.matr.print(m));
    assert.deepStrictEqual(cb.matr.toArray(m), [1, 2, 3, 4]);
    assert.deepStrictEqual(cb.matr.toObject(m), { i1: { j1: 1, j2: 2 }, i2: { j1: 3, j2: 4 } });
    assert.ok(cb.matr.toSet(m));
    assert.strictEqual(cb.matr.toString(m), "[ 1 2 ]\n[ 3 4 ]");
    assert.deepStrictEqual(cb.matr.toTensor(m, 2, 2), [[1, 2], [3, 4]]);
    assert.deepStrictEqual(cb.matr.toTypedArray(m, "float32"), new Float32Array([1, 2, 3, 4]));
    assert.deepStrictEqual(cb.matr.toVector(m, 2, 0, 0), { x: 1, y: 3 });
}
