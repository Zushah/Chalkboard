/*
    Chalkboard
    Version 3.0.0 Euler
    Released March 2nd, 2026
    Authored by Zushah: https://www.github.com/Zushah
    Test: Boolean Algebra Namespace
*/

import assert from "assert";
import cb from "../dist/Chalkboard.js";

// bool.modeConfig, bool.AND, bool.OR, bool.NOT
{
    cb.bool.modeConfig("boolean");
    assert.strictEqual(cb.bool.AND(true, true), true);
    cb.bool.modeConfig("binary");
    assert.strictEqual(cb.bool.AND(1, 1, 0), 0);
    assert.strictEqual(cb.bool.OR(0, 1), 1);
    assert.strictEqual(cb.bool.NOT(0), 1);
    cb.bool.modeConfig("boolean");
}

// bool.AND, bool.OR, bool.NOT, bool.XOR, bool.NAND, bool.NOR
{
    assert.strictEqual(cb.bool.AND(true, true, false), false);
    assert.strictEqual(cb.bool.OR(false, false, true), true);
    assert.strictEqual(cb.bool.NOT(false), true);
    assert.strictEqual(cb.bool.NOT(false, false, false), true);
    assert.strictEqual(cb.bool.NOT(false, true, false), false);
    assert.strictEqual(cb.bool.XOR(true, false, false), true);
    assert.strictEqual(cb.bool.XOR(true, true), false);
    assert.strictEqual(cb.bool.NAND(true, true), false);
    assert.strictEqual(cb.bool.NAND(true, false), true);
    assert.strictEqual(cb.bool.NOR(false, false), true);
    assert.strictEqual(cb.bool.NOR(true, false), false);
}

// bool.COND, bool.CONV, bool.BICOND, bool.NCOND, bool.NCONV, bool.NBICOND
{
    assert.strictEqual(cb.bool.COND(true, false), false);
    assert.strictEqual(cb.bool.COND(false, false, true), true);
    assert.strictEqual(cb.bool.CONV(false, true), false);
    assert.strictEqual(cb.bool.CONV(true, false), true);
    assert.strictEqual(cb.bool.BICOND(true, true, true), true);
    assert.strictEqual(cb.bool.BICOND(true, false), false);
    assert.strictEqual(cb.bool.NCOND(true, false), true);
    assert.strictEqual(cb.bool.NCOND(true, true), false);
    assert.strictEqual(cb.bool.NCONV(false, true), true);
    assert.strictEqual(cb.bool.NCONV(true, false), false);
    assert.strictEqual(cb.bool.NBICOND(true, false), true);
    assert.strictEqual(cb.bool.NBICOND(true, true), false);
}

// bool.toCNF, bool.toDNF
{
    assert.strictEqual(cb.bool.toCNF("x & (y | z)"), "x & (y | z)");
    assert.strictEqual(cb.bool.toDNF("x & (y | z)"), "(x & y) | (x & z)");
}

// bool.Karnaugh, bool.primeImplicants, bool.minimize, bool.mapping, bool.truthTable
{
    cb.bool.modeConfig("boolean");
    assert.deepStrictEqual(cb.bool.Karnaugh("x & y", ["x", "y"]), [[false, false], [false, true]]);
    assert.deepStrictEqual(cb.bool.primeImplicants("x & y | x & z", ["x", "y", "z"]).slice().sort(), ["x & y", "x & z"].sort());
    assert.strictEqual(cb.bool.minimize("x & y | x & z", ["x", "y", "z"]), "(z | y) & x");

    const f = cb.bool.mapping([[false, false], [false, true], [true, false], [true, true]], [[false, false], [true, false], [true, false], [true, true]]);
    assert.deepStrictEqual(f(false, false), [false, false]);
    assert.deepStrictEqual(f(true, false), [true, false]);
    assert.deepStrictEqual(f(true, true), [true, true]);

    const table = cb.bool.truthTable(cb.bool.AND, cb.bool.OR);
    assert.deepStrictEqual(table, [[false, false, false, false], [false, true, false, true], [true, false, false, true], [true, true, true, true]]);
}

// bool.parse, bool.isEqual
{
    cb.bool.modeConfig("boolean");
    assert.strictEqual(cb.bool.parse("x & !x | y & x | y & !x"), "y");
    assert.strictEqual(cb.bool.parse("(x & y) | (x & z)"), "(y | z) & x");
    assert.strictEqual(cb.bool.parse("x & y | z", { values: { x: true, y: false, z: true } }), true);
    assert.strictEqual(cb.bool.parse("x & y | z", { values: { x: true, y: false, z: false } }), false);

    assert.strictEqual(cb.bool.parse("x & y", { returnLaTeX: true }), "x \\land y");
    assert.strictEqual(cb.bool.parse("x & y", { returnJSON: true }), '{"type":"and","left":{"type":"var","name":"x"},"right":{"type":"var","name":"y"}}');
    assert.deepStrictEqual(cb.bool.parse("x & y", { returnAST: true }), { type: "and", left: { type: "var", name: "x" }, right: { type: "var", name: "y" } });
    assert.strictEqual(cb.bool.parse("x & y", { values: { x: true, y: false } }), false);

    assert.strictEqual(cb.bool.isEqual("x & y", "y & x"), true);
    assert.strictEqual(cb.bool.isEqual("x | y", "x & y"), false);
}
