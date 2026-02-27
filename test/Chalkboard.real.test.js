/*
    The Chalkboard Library - Real Namespace Tests
    Version 2.4.0 Noether
*/

import assert from "assert";
import cb from "../dist/Chalkboard.js";

// real.define, real.val, real.zero
{
    const f = cb.real.define((x) => x * x + 1);
    assert.ok(f.field === "real" && f.type === "scalar2d");
    assert.strictEqual(cb.real.val(f, 2), 5);
    const z = cb.real.zero();
    assert.strictEqual(z.type, "scalar2d");
    assert.strictEqual(cb.real.val(z, 999), 0);
    const v = cb.real.define([(x, y) => x + y, (x, y) => x - y]);
    assert.strictEqual(v.type, "vector2d");
    assert.deepStrictEqual(cb.real.val(v, cb.vect.init(3, 1)), { x: 4, y: 2 });
}

// real.linear, real.slope, real.discriminant, real.quadratic, real.linearFormula, real.quadraticFormula, real.polynomial, real.randomPolynomial
{
    assert.strictEqual(cb.real.slope(0, 1, 1, 3), 2);
    const lin = cb.real.linear(0, 1, 1, 3);
    assert.strictEqual(lin.type, "scalar2d");
    assert.strictEqual(cb.real.val(lin, 2), 5);
    assert.strictEqual(cb.real.linearFormula(2, 1), -0.5);
    assert.strictEqual(cb.real.linearFormula(2, 1, 3), 1.5);
    assert.strictEqual(cb.real.linearFormula(0, 1, 1, 3), -0.5);
    assert.strictEqual(cb.real.discriminant(1, -3, 2), 1);
    const quad = cb.real.quadratic(1, -3, 2);
    assert.strictEqual(quad.type, "scalar2d");
    assert.strictEqual(cb.real.val(quad, 2), 0);
    assert.deepStrictEqual(cb.real.quadraticFormula(1, -3, 2), [2, 1]);
    const poly = cb.real.polynomial([1, 0, -1]);
    assert.strictEqual(poly.type, "scalar2d");
    assert.strictEqual(cb.real.val(poly, 2), 3);
    const rpoly = cb.real.randomPolynomial(3);
    assert.strictEqual(rpoly.type, "scalar2d");
    assert.ok(Number.isFinite(cb.real.val(rpoly, 2)));
}

// real.add, real.sub, real.mul, real.div, real.scl, real.negate, real.reciprocate, real.absolute, real.pow
{
    const c1 = cb.real.define([(t) => t, (t) => t * t]);
    const c2 = cb.real.define([(t) => 1, (t) => 2 * t]);
    assert.strictEqual(c1.type, "curve2d");
    assert.strictEqual(c2.type, "curve2d");
    assert.deepStrictEqual(cb.real.val(cb.real.add(c1, c2), 2), { x: 3, y: 8 });
    assert.deepStrictEqual(cb.real.val(cb.real.sub(c1, c2), 2), { x: 1, y: 0 });
    assert.deepStrictEqual(cb.real.val(cb.real.mul(c1, c2), 2), { x: 2, y: 16 });
    assert.deepStrictEqual(cb.real.val(cb.real.div(c1, c2), 2), { x: 2, y: 1 });
    assert.deepStrictEqual(cb.real.val(cb.real.scl(c1, 2), 2), { x: 4, y: 8 });
    assert.deepStrictEqual(cb.real.val(cb.real.negate(c1), 2), { x: -2, y: -4 });
    assert.deepStrictEqual(cb.real.val(cb.real.reciprocate(cb.real.define([(t) => t + 1, (t) => t + 3])), 1), { x: 0.5, y: 0.25 });
    assert.deepStrictEqual(cb.real.val(cb.real.absolute(cb.real.define([(t) => -t, (t) => t - 3])), 2), { x: 2, y: 1 });
    assert.deepStrictEqual(cb.real.val(cb.real.pow(cb.real.define([(t) => t, (t) => t + 1]), 2), 2), { x: 4, y: 9 });
    assert.ok(Math.abs(cb.real.pow(2, 3) - 8) < 0.01);
}

// real.compose, real.translate
{
    const f = cb.real.define((x) => x + 1);
    const g = cb.real.define((x) => 2 * x);
    assert.throws(() => cb.real.compose(f, g));
    const s = cb.real.define((x) => x * x);
    const t = cb.real.translate(s, 3);
    assert.strictEqual(t.type, "scalar2d");
    assert.strictEqual(cb.real.val(t, 0), 9);
    assert.strictEqual(cb.real.val(t, 2), 1);
}

// real.lerp, real.qerp
{
    assert.strictEqual(cb.real.lerp([0, 10], 0.25), 2.5);
    assert.strictEqual(cb.real.qerp([0, 0], [1, 1], [2, 0], 0.5), 0.75);
}

// real.Dirac, real.Heaviside, real.ramp, real.rect, real.pingpong
{
    assert.strictEqual(cb.real.Dirac(0), 1);
    assert.strictEqual(cb.real.Dirac(1), 0);
    assert.strictEqual(cb.real.Dirac(1, 1), 1);
    assert.strictEqual(cb.real.Heaviside(-1), 0);
    assert.strictEqual(cb.real.Heaviside(0), 1);
    assert.strictEqual(cb.real.ramp(-1), 0);
    assert.strictEqual(cb.real.ramp(2, 1, 2), 4);
    assert.strictEqual(cb.real.rect(0), 1);
    assert.strictEqual(cb.real.rect(2), 0);
    assert.strictEqual(cb.real.pingpong(3, 2), 1);
}

// real.sqrt, real.root, real.tetration, real.ln, real.log, real.log10, real.erf, real.Gamma
{
    assert.strictEqual(cb.real.sqrt(9), 3);
    assert.strictEqual(cb.real.root(27, 3), 3);
    assert.strictEqual(cb.real.tetration(2, 3), 16);
    assert.ok(Math.abs(cb.real.ln(cb.E()) - 1) < 1e-4);
    assert.ok(Math.abs(cb.real.log(2, 8) - 3) < 1e-4);
    assert.ok(Math.abs(cb.real.log10(1000) - 3) < 1e-4);
    assert.ok(Math.abs(cb.real.erf(0)) < 1e-4);
    assert.ok(Math.abs(cb.real.Gamma(5) - 24) < 1e-4);
}

// real.parse
{
    assert.strictEqual(cb.real.parse(""), "");
    assert.strictEqual(cb.real.parse("2+2"), "4");
    assert.strictEqual(cb.real.parse("x^2 + 2x + 1"), "x^2 + 2x + 1");
    assert.strictEqual(cb.real.parse("x^2 + 2x + 1", { values: { x: 3 } }), 16);
    assert.strictEqual(cb.real.parse("x^2 + 2x + 1", { returnLaTeX: true }), "x^{2} + 2x + 1");
    assert.strictEqual(cb.real.parse("x^2 + 2x + 1", { returnJSON: true }), '{"type":"add","left":{"type":"add","left":{"type":"pow","base":{"type":"var","name":"x"},"exponent":{"type":"num","value":2}},"right":{"type":"mul","left":{"type":"num","value":2},"right":{"type":"var","name":"x"}}},"right":{"type":"num","value":1}}');
    assert.deepStrictEqual(cb.real.parse("x^2 + 2x + 1", { returnAST: true }), { type: "add", left: { type: "add", left: { type: "pow", base: { type: "var", name: "x" }, exponent: { type: "num", value: 2 } }, right: { type: "mul", left: { type: "num", value: 2 }, right: { type: "var", name: "x" } } }, right: { type: "num", value: 1 } });
}

console.log("🟩 Chalkboard.real tests passed.");
