/*
    Chalkboard
    Version 3.0.1 Euler
    Released March 9th, 2026
    Authored by Zushah: https://www.github.com/Zushah
    Test: Chalkboard Namespace
*/

import assert from "assert";
import cb from "../dist/Chalkboard.js";

// VERSION, VERSIONALIAS
{
    assert.strictEqual(cb.VERSION, "3.0.1");
    assert.strictEqual(cb.VERSIONALIAS, "Euler");
}

// PI, E
{
    assert.ok(Math.abs(cb.PI(0) - 0) < 1e-16);
    assert.ok(Math.abs(cb.PI() - Math.PI) < 1e-15);
    assert.ok(Math.abs(cb.PI(2) - 2 * Math.PI) < 1e-14);
    assert.ok(Math.abs(cb.E(0) - 1) < 1e-16);
    assert.ok(Math.abs(cb.E() - Math.E) < 1e-15);
    assert.ok(Math.abs(cb.E(2) - (Math.exp(2))) < 1e-14);
}

// I
{
    assert.deepStrictEqual(cb.I(0), { a: 1, b: 0 });
    assert.deepStrictEqual(cb.I(1), { a: 0, b: 1 });
    assert.deepStrictEqual(cb.I(2), { a: -1, b: 0 });
    assert.deepStrictEqual(cb.I(3), { a: 0, b: -1 });
    assert.deepStrictEqual(cb.I(4), { a: 1, b: 0 });
}

// REGISTRY, REGISTER
{
    cb.REGISTER("plusone", (x) => x + 1);
    assert.strictEqual(typeof cb.REGISTRY.plusone, "function");
    assert.strictEqual(cb.REGISTRY.plusone(2), 3);
    assert.strictEqual(cb.real.parse("plusone(2)"), "3");
    if (!Object.prototype.hasOwnProperty.call(cb.REGISTRY, "plusone")) delete cb.REGISTRY.plusone;
}

// CONTEXT
{
    const old = cb.CONTEXT;
    assert.strictEqual(typeof cb.CONTEXT, "string");
    cb.CONTEXT = "ctx";
    assert.strictEqual(cb.CONTEXT, "ctx");
    cb.CONTEXT = old;
}

// APPLY
{
    assert.deepStrictEqual(cb.APPLY(5, (x) => x - 2), 3);
    assert.deepStrictEqual(cb.APPLY(cb.comp.init(1, 2), (x) => x + 1), { a: 2, b: 3 });
    assert.deepStrictEqual(cb.APPLY(cb.quat.init(1, 2, 3, 4), (x) => 2 * x), { a: 2, b: 4, c: 6, d: 8 });
    assert.deepStrictEqual(cb.APPLY(cb.vect.init(1, 2), (x) => x * x), { x: 1, y: 4 });
    assert.deepStrictEqual(cb.APPLY(cb.vect.init(1, 2, 3), (x) => x + 10), { x: 11, y: 12, z: 13 });
    assert.deepStrictEqual(cb.APPLY(cb.vect.init(1, 2, 3, 4), (x) => -x), { x: -1, y: -2, z: -3, w: -4 });
    assert.deepStrictEqual(cb.APPLY(cb.matr.init([1, 2], [3, 4]), (x) => x + 1), [[2, 3], [4, 5]]);
    assert.deepStrictEqual(cb.APPLY(cb.tens.init([[1, 2], [3, 4]], [[5, 6], [7, 8]]), (x) => x * 0), [[[0, 0], [0, 0]], [[0, 0], [0, 0]]]);
    assert.deepStrictEqual(cb.APPLY(cb.abal.set([1, 2, 3]), (x) => x + 10), [11, 12, 13]);
    assert.deepStrictEqual(cb.APPLY(cb.abal.group(cb.abal.Z(4), (a, b) => (a + b) % 4), (x) => x * 2), [0, 2, 4, 6]);
}
