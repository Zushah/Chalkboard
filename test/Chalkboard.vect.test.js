/*
    Chalkboard
    Version 3.0.0 Euler
    Released March 2nd, 2026
    Authored by Zushah: https://www.github.com/Zushah
    Test: Vector Namespace
*/

import assert from "assert";
import cb from "../dist/Chalkboard.js";

// vect.init
{
    const v2 = cb.vect.init(1, 2);
    assert.strictEqual(v2.x, 1);
    assert.strictEqual(v2.y, 2);
    const v3 = cb.vect.init(1, 2, 3);
    assert.strictEqual(v3.x, 1);
    assert.strictEqual(v3.y, 2);
    assert.strictEqual(v3.z, 3);
    const v4 = cb.vect.init(1, 2, 3, 4);
    assert.strictEqual(v4.x, 1);
    assert.strictEqual(v4.y, 2);
    assert.strictEqual(v4.z, 3);
    assert.strictEqual(v4.w, 4);
}

// vect.absolute, vect.ang, vect.copy, vect.dimension, vect.empty, vect.fill, vect.negate, vect.random, vect.reciprocate, vect.round, vect.slope
{
    const v = cb.vect.init(3, -4);
    assert.deepStrictEqual(cb.vect.absolute(v), { x: 3, y: 4 });
    assert.strictEqual(cb.vect.ang(v), -0.9272952180016123);
    const vcopy = cb.vect.copy(v); assert.strictEqual(vcopy.x, 3); assert.strictEqual(vcopy.y, -4);
    assert.strictEqual(cb.vect.dimension(v), 2);
    assert.deepStrictEqual(cb.vect.empty(2), { x: null, y: null });
    assert.deepStrictEqual(cb.vect.fill(5, 2), { x: 5, y: 5 });
    assert.deepStrictEqual(cb.vect.negate(v), { x: -3, y: 4 });
    const r = cb.vect.random(2); assert.strictEqual(typeof r.x, "number"); assert.strictEqual(typeof r.y, "number");
    assert.deepStrictEqual(cb.vect.reciprocate(v), { x: 0.3333333333333333, y: -0.25 });
    assert.deepStrictEqual(cb.vect.round(cb.vect.init(1.6, 2.1)), { x: 2, y: 2 });
    assert.strictEqual(cb.vect.slope(v), -1.3333333333333333);
}

// vect.angBetween, vect.constrain, vect.dist, vect.distsq, vect.mag, vect.magset, vect.magsq, vect.normalize
{
    const v = cb.vect.init(3, 4);
    const w = cb.vect.init(1, 0);
    assert.strictEqual(cb.vect.angBetween(v, w), 0.9272952180016123);
    assert.deepStrictEqual(cb.vect.constrain(v, [0, 1]), { x: 1, y: 1 });
    assert.strictEqual(cb.vect.dist(v, w), 4.472135954999579);
    assert.strictEqual(cb.vect.distsq(v, w), 20);
    assert.strictEqual(cb.vect.mag(v), 5);
    assert.deepStrictEqual(cb.vect.magset(v, 10), { x: 6, y: 8 });
    assert.strictEqual(cb.vect.magsq(v), 25);
    assert.deepStrictEqual(cb.vect.normalize(v), { x: 0.6, y: 0.8 });
}

// vect.add, vect.dot, vect.oproj, vect.proj, vect.scl, vect.sub
{
    const v = cb.vect.init(3, 4);
    const w = cb.vect.init(1, 0);
    assert.deepStrictEqual(cb.vect.add(v, w), { x: 4, y: 4 });
    assert.strictEqual(cb.vect.dot(v, w), 3);
    assert.deepStrictEqual(cb.vect.oproj(v, w), { x: 0, y: 4 });
    assert.deepStrictEqual(cb.vect.proj(v, w), { x: 3, y: 0 });
    assert.deepStrictEqual(cb.vect.scl(v, 2), { x: 6, y: 8 });
    assert.deepStrictEqual(cb.vect.sub(v, w), { x: 2, y: 4 });
}

// vect.cross, vect.scalarQuadruple, vect.scalarTriple, vect.vectorQuadruple, vect.vectorTriple
{
    const v = cb.vect.init(1, 0, 0);
    const w = cb.vect.init(0, 1, 0);
    const u = cb.vect.init(0, 0, 1);
    assert.deepStrictEqual(cb.vect.cross(v, w), { x: 0, y: 0, z: 1 });
    assert.strictEqual(cb.vect.scalarQuadruple(v, w, u, v), 0);
    assert.strictEqual(cb.vect.scalarTriple(v, w, u), 1);
    assert.deepStrictEqual(cb.vect.vectorQuadruple(v, w, u, v), { x: -1, y: 0, z: 0 });
    assert.deepStrictEqual(cb.vect.vectorTriple(v, w, u), { x: 0, y: 0, z: 0 });
}

// vect.reflect, vect.refract, vect.interpolate
{
    assert.deepStrictEqual(cb.vect.reflect(cb.vect.init(1, -1), cb.vect.init(0, 1)), { x: 1, y: 1 });
    assert.deepStrictEqual(cb.vect.refract(cb.vect.init(0, -1), cb.vect.init(0, 1), 1.5), { x: 0, y: -1 });
    assert.deepStrictEqual(cb.vect.interpolate(cb.vect.init(1, 2), 2, 3), { x: 1.6, y: 1.6 });
}

// vect.isApproxEqual, vect.isDimensionEqual, vect.isDimensionOf, vect.isEqual, vect.isNormalized, vect.isOrthogonal, vect.isParallel, vect.isZero
{
    const v = cb.vect.init(3, 4);
    const w = cb.vect.init(1, 0);
    assert.strictEqual(cb.vect.isApproxEqual(v, cb.vect.init(3.000000000000001, 4.000000000000001)), true);
    assert.strictEqual(cb.vect.isDimensionEqual(v, w), true);
    assert.strictEqual(cb.vect.isDimensionOf(v, 2), true);
    assert.strictEqual(cb.vect.isEqual(v, cb.vect.init(3, 4)), true);
    assert.strictEqual(cb.vect.isNormalized(cb.vect.init(0.6, 0.8)), true);
    assert.strictEqual(cb.vect.isOrthogonal(v, cb.vect.init(-4, 3)), true);
    assert.strictEqual(cb.vect.isParallel(v, cb.vect.init(6, 8)), true);
    assert.strictEqual(cb.vect.isZero(cb.vect.init(0, 0)), true);
}

// vect.fromAlternateToCartesian, vect.fromAngle, vect.fromCartesianToAlternate, vect.fromVector
{
    assert.deepStrictEqual(cb.vect.fromAlternateToCartesian(cb.vect.init(1, 0), "polar"), { x: 1, y: 0 });
    assert.deepStrictEqual(cb.vect.fromAngle(0), { x: 1, y: 0 });
    assert.deepStrictEqual(cb.vect.fromCartesianToAlternate(cb.vect.init(1, 0), "polar"), { x: 1, y: 0 });
    assert.deepStrictEqual(cb.vect.fromVector(cb.vect.init(2, 3)), { x: 2, y: 3, z: 0 });
}

// vect.modeConfig, vect.print, vect.toArray, vect.toComplex, vect.toMatrix, vect.toQuaternion, vect.toString, vect.toTensor, vect.toTypedArray, vect.zero
{
    const v = cb.vect.init(1, 2);
    cb.vect.modeConfig("array"); assert.deepStrictEqual(cb.vect.init(1, 2), [1, 2]); cb.vect.modeConfig("vector");
    assert.doesNotThrow(() => cb.vect.print(v));
    assert.deepStrictEqual(cb.vect.toArray(v), [1, 2]);
    assert.deepStrictEqual(cb.vect.toComplex(v), { a: 1, b: 2 });
    assert.deepStrictEqual(cb.vect.toMatrix(v), [[1], [2]]);
    assert.deepStrictEqual(cb.vect.toQuaternion(v), { a: 1, b: 2, c: 0, d: 0 });
    assert.strictEqual(cb.vect.toString(v), "(1, 2)");
    assert.deepStrictEqual(cb.vect.toTensor(cb.vect.init(1, 2, 3, 4), 2, 2), [[1, 2], [3, 4]]);
    assert.deepStrictEqual(cb.vect.toTypedArray(v, "float32"), new Float32Array([1, 2]));
    assert.deepStrictEqual(cb.vect.zero(2), { x: 0, y: 0 });
}

// vect.field, vect.fromField
{
    const f2 = cb.vect.field((x, y) => x * x, (x, y) => y);
    assert.deepStrictEqual(cb.vect.fromField(f2, cb.vect.init(2, 1)), { x: 4, y: 1 });
    const f3 = cb.vect.field((x, y, z) => x * y * z, (x, y, z) => x + y + z, (x, y, z) => x - y - z);
    assert.deepStrictEqual(cb.vect.fromField(f3, cb.vect.init(2, 1, 3)), { x: 6, y: 6, z: -2 });
    const f4 = cb.vect.field((x, y, z, w) => x * y * z * w, (x, y, z, w) => x + y + z + w, (x, y, z, w) => x - y - z - w, (x, y, z, w) => x * x + y * y + z * z + w * w);
    assert.deepStrictEqual(cb.vect.fromField(f4, cb.vect.init(2, 1, 3, 4)), { x: 24, y: 10, z: -6, w: 30 });
}
