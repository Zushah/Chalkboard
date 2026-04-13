/*
    Chalkboard
    Version 3.0.2 Euler
    Released April 13th, 2026
    Authored by Zushah: https://www.github.com/Zushah
    Test: Quaternion Namespace
*/

import assert from "assert";
import cb from "../dist/Chalkboard.js";

// quat.init
{
    const q = cb.quat.init(1, 2, 3, 4);
    assert.strictEqual(q.a, 1);
    assert.strictEqual(q.b, 2);
    assert.strictEqual(q.c, 3);
    assert.strictEqual(q.d, 4);
}

// quat.absolute, quat.conjugate, quat.invert, quat.negate, quat.random, quat.reciprocate, quat.round
{
    const q = cb.quat.init(1, 2, 3, 4);
    assert.deepStrictEqual(cb.quat.absolute(q), { a: 1, b: 2, c: 3, d: 4 });
    assert.deepStrictEqual(cb.quat.conjugate(q), { a: 1, b: -2, c: -3, d: -4 });
    assert.deepStrictEqual(cb.quat.invert(q), { a: 0.03333333333333333, b: -0.06666666666666667, c: -0.1, d: -0.13333333333333333 });
    assert.deepStrictEqual(cb.quat.negate(q), { a: -1, b: -2, c: -3, d: -4 });
    const r = cb.quat.random(); assert.strictEqual(typeof r.a, "number"); assert.strictEqual(typeof r.b, "number"); assert.strictEqual(typeof r.c, "number"); assert.strictEqual(typeof r.d, "number");
    assert.deepStrictEqual(cb.quat.reciprocate(q), { a: 1, b: 0.5, c: 0.3333333333333333, d: 0.25 });
    assert.deepStrictEqual(cb.quat.round(r), { a: Math.round(r.a), b: Math.round(r.b), c: Math.round(r.c), d: Math.round(r.d) });
}

// quat.constrain, quat.dist, quat.distsq, quat.mag, quat.magset, quat.magsq, quat.normalize
{
    const q = cb.quat.init(1, 2, 3, 4);
    const p = cb.quat.init(5, 6, 7, 8);
    assert.deepStrictEqual(cb.quat.constrain(q, [0, 1]), { a: 1, b: 1, c: 1, d: 1 });
    assert.strictEqual(cb.quat.dist(q, p), 8);
    assert.strictEqual(cb.quat.distsq(q, p), 64);
    assert.strictEqual(cb.quat.mag(q), 5.477225575051661);
    assert.deepStrictEqual(cb.quat.magset(q, 10), { a: 1.8257418583505536, b: 3.651483716701107, c: 5.47722557505166, d: 7.302967433402214 });
    assert.strictEqual(cb.quat.magsq(q), 30);
    assert.deepStrictEqual(cb.quat.normalize(q), { a: 0.18257418583505536, b: 0.3651483716701107, c: 0.5477225575051661, d: 0.7302967433402214 });
}

// quat.add, quat.div, quat.mul, quat.scl, quat.sub
{
    const q = cb.quat.init(1, 2, 3, 4);
    const p = cb.quat.init(5, 6, 7, 8);
    assert.deepStrictEqual(cb.quat.add(q, p), { a: 6, b: 8, c: 10, d: 12 });
    assert.deepStrictEqual(cb.quat.div(q, p), { a: 0.40229885057471264, b: 0, c: 0.09195402298850575, d: 0.04597701149425287 });
    assert.deepStrictEqual(cb.quat.mul(q, p), { a: -60, b: 12, c: 30, d: 24 });
    assert.deepStrictEqual(cb.quat.scl(q, 2), { a: 2, b: 4, c: 6, d: 8 });
    assert.deepStrictEqual(cb.quat.sub(q, p), { a: -4, b: -4, c: -4, d: -4 });
}

// quat.fromAxis, quat.toRotation
{
    const axis = cb.vect.init(0, 1, 0);
    const rad = cb.PI(1/2);
    const q = cb.quat.fromAxis(axis, rad);
    assert.deepStrictEqual(q, { a: 0.7071067811865474, b: 0, c: 0.7071067811865476, d: 0 });
    const v = cb.vect.init(1, 0, 1);
    assert.deepStrictEqual(cb.quat.toRotation(q, v), { x: 0.9999999999999997, y: 0, z: -1.0000000000000004 });
}

// quat.isApproxEqual, quat.isEqual, quat.isInverse, quat.isNormalized, quat.isZero
{
    const q = cb.quat.init(1, 2, 3, 4);
    const r = cb.quat.init(1.000000000000001, 2.000000000000001, 3.000000000000001, 4.000000000000001);
    assert.strictEqual(cb.quat.isApproxEqual(q, r), true);
    assert.strictEqual(cb.quat.isEqual(q, r), false);
    assert.strictEqual(cb.quat.isInverse(q, cb.quat.invert(q)), true);
    assert.strictEqual(cb.quat.isNormalized(q), false);
    assert.strictEqual(cb.quat.isZero(cb.quat.init(0, 0, 0, 0)), true);
}

// quat.copy, quat.print, quat.toArray, quat.toMatrix, quat.toString, quat.toTypedArray, quat.toVector
{
    const q = cb.quat.init(1, 2, 3, 4);
    const qcopy = cb.quat.copy(q); assert.strictEqual(qcopy.a, 1); assert.strictEqual(qcopy.b, 2); assert.strictEqual(qcopy.c, 3); assert.strictEqual(qcopy.d, 4);
    assert.doesNotThrow(() => cb.quat.print(q));
    assert.deepStrictEqual(cb.quat.toArray(q), [1, 2, 3, 4]);
    assert.deepStrictEqual(cb.quat.toMatrix(q), [[1, -2, -3, -4], [2, 1, -4, 3], [3, 4, 1, -2], [4, -3, 2, 1]]);
    assert.strictEqual(cb.quat.toString(q), "1 + 2i + 3j + 4k");
    assert.deepStrictEqual(cb.quat.toTypedArray(q, "float32"), new Float32Array([1, 2, 3, 4]));
    assert.deepStrictEqual(cb.quat.toVector(q), { x: 1, y: 2, z: 3, w: 4 });
}
