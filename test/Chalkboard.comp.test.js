/*
    The Chalkboard Library - Complex Numbers Namespace Tests
    Version 2.4.0 Noether
*/

import assert from "assert";
import cb from "../dist/Chalkboard.js";

// comp.init
{
    const z = cb.comp.init(1, -2);
    assert.strictEqual(z.a, 1);
    assert.strictEqual(z.b, -2);
}

// comp.absolute, comp.arg, comp.conjugate, comp.Im, comp.invert, comp.negate, comp.random, comp.Re, comp.reciprocate, comp.round, comp.slope
{
    const z = cb.comp.init(1, -2);
    assert.deepStrictEqual(cb.comp.absolute(z), { a: 1, b: 2 });
    assert.strictEqual(cb.comp.arg(z), -1.1071487177940904);
    assert.deepStrictEqual(cb.comp.conjugate(z), { a: 1, b: 2 });
    assert.strictEqual(cb.comp.Im(z), -2);
    assert.deepStrictEqual(cb.comp.invert(z), { a: 0.2, b: 0.4 });
    assert.deepStrictEqual(cb.comp.negate(z), { a: -1, b: 2 });
    const r = cb.comp.random(); assert.strictEqual(typeof r.a, "number"); assert.strictEqual(typeof r.b, "number");
    assert.strictEqual(cb.comp.Re(z), 1);
    assert.deepStrictEqual(cb.comp.reciprocate(z), { a: 1, b: -0.5 });
    assert.deepStrictEqual(cb.comp.round(r), { a: Math.round(r.a), b: Math.round(r.b) });
    assert.strictEqual(cb.comp.slope(z), -2);
}

// comp.argBetween, comp.constrain, comp.dist, comp.distsq, comp.mag, comp.magset, comp.magsq, comp.normalize
{
    const z = cb.comp.init(1, -2);
    const w = cb.comp.init(-3, 4);
    assert.strictEqual(cb.comp.argBetween(z, w), 2.961739153797315);
    assert.deepStrictEqual(cb.comp.constrain(z, [-1, 1]), { a: 1, b: -1});
    assert.deepStrictEqual(cb.comp.dist(z, w), 7.211102550927979);
    assert.strictEqual(cb.comp.distsq(z, w), 52);
    assert.deepStrictEqual(cb.comp.mag(z), 2.23606797749979);
    assert.deepStrictEqual(cb.comp.magset(z, 5), { a: 2.23606797749979, b: -4.47213595499958 });
    assert.strictEqual(cb.comp.magsq(z), 5);
    assert.deepStrictEqual(cb.comp.normalize(z), { a: 0.4472135954999579, b: -0.8944271909999159 });
}

// comp.add, comp.div, comp.mul, comp.pow, comp.scl, comp.sub
{
    const z = cb.comp.init(1, -2);
    const w = cb.comp.init(-3, 4);
    assert.deepStrictEqual(cb.comp.add(z, w), { a: -2, b: 2 });
    assert.deepStrictEqual(cb.comp.div(z, w), { a: -0.44, b: 0.08 });
    assert.deepStrictEqual(cb.comp.mul(z, w), { a: 5, b: 10 });
    assert.deepStrictEqual(cb.comp.scl(z, 2), { a: 2, b: -4 });
    assert.deepStrictEqual(cb.comp.sub(z, w), { a: 4, b: -6 });
}

// comp.pow, comp.root, comp.rotate, comp.sq, comp.sqrt
{
    const z = cb.comp.init(1, -2);
    assert.deepStrictEqual(cb.comp.pow(z, 3), { a: -11, b: 2 });
    assert.deepStrictEqual(cb.comp.root(z, 4), [{ a: 1.1763010734364077, b: -0.3341624842102652 }, { a: 0.33416248421026506, b: 1.1763010734364074 }, { a: -1.1763010734364077, b: 0.33416248421026484 }, { a: -0.33416248421014944, b: -1.1763010734363915 }]);
    assert.deepStrictEqual(cb.comp.rotate(z, 1), { a: 2.2232442754839328, b: -0.23913362692838272 });
    assert.deepStrictEqual(cb.comp.sq(z), { a: -3, b: -4 });
    assert.deepStrictEqual(cb.comp.sqrt(z), { a: 1.272019649514069, b: -0.7861513777574234 });
}

// comp.cos, comp.Euler, comp.exp, comp.ln, comp.sin, comp.tan
{
    const z = cb.comp.init(1, -2);
    assert.deepStrictEqual(cb.comp.cos(z), { a: 2.0327230070196642, b: 3.051897799151799 });
    assert.deepStrictEqual(cb.comp.Euler(1), { a: 0.5403023058681397, b: 0.8414709848078965 });
    assert.deepStrictEqual(cb.comp.exp(z), { a: -1.1312043837568135, b: -2.4717266720048188 });
    assert.deepStrictEqual(cb.comp.ln(z), { a: 0.8047189562170279, b: -1.1071487177940904 });
    assert.deepStrictEqual(cb.comp.sin(z), { a: 3.1657785132161664, b: -1.9596010414216047 });
    assert.deepStrictEqual(cb.comp.tan(z), { a: 0.033812826079896635, b: -1.0147936161466335 });
}

// comp.copy, comp.print, comp.toArray, comp.toMatrix, comp.toString, comp.toTypedArray, comp.toVector
{
    const z = cb.comp.init(1, -2);
    const zcopy = cb.comp.copy(z); assert.strictEqual(zcopy.a, 1); assert.strictEqual(zcopy.b, -2);
    assert.doesNotThrow(() => cb.comp.print(z));
    assert.deepStrictEqual(cb.comp.toArray(z), [1, -2]);
    assert.deepStrictEqual(cb.comp.toMatrix(z), [[1, 2], [-2, 1]]);
    assert.strictEqual(cb.comp.toString(z), "1 - 2i");
    assert.deepStrictEqual(cb.comp.toTypedArray(z, "float32"), new Float32Array([1, -2]));
    assert.deepStrictEqual(cb.comp.toVector(z), { x: 1, y: -2 });
}

// comp.define, comp.val
{
    const z = cb.comp.init(1, -2);
    const f = cb.comp.define((z) => cb.comp.add(z, 1));
    const g = cb.comp.define([(a, b) => a*a - b*b, (a, b) => 2*a*b]);
    assert.deepStrictEqual(cb.comp.val(f, z), { a: 2, b: -2 });
    assert.deepStrictEqual(cb.comp.val(g, z), { a: -3, b: -4 });
}

// comp.parse
{
    assert.deepStrictEqual(cb.comp.parse("1 - 2i"), { a: 1, b: -2 });
    assert.strictEqual(cb.comp.parse("1 - 2i", { returnLaTeX: true }), "1 - 2i");
    assert.strictEqual(cb.comp.parse("1 - 2i", { returnJSON: true }), '{"type":"complex","a":1,"b":-2}');
    assert.deepStrictEqual(cb.comp.parse("1 - 2i", { returnAST: true }), { type: "complex", a: 1, b: -2 });
    assert.deepStrictEqual(cb.comp.parse("1 - 2i", { values: { z: cb.comp.init(1, 2) } }), { a: 1, b: -2 });

    assert.strictEqual(cb.comp.parse("z*z + 1"), "z^2 + 1");
    assert.strictEqual(cb.comp.parse("z*z + 1", { returnLaTeX: true }), "z^{2} + 1");
    assert.strictEqual(cb.comp.parse("z*z + 1", { returnJSON: true }), '{"type":"add","left":{"type":"mul","left":{"type":"var","name":"z"},"right":{"type":"var","name":"z"}},"right":{"type":"num","value":1}}');
    assert.deepStrictEqual(cb.comp.parse("z*z + 1", { returnAST: true}), { type: "add", left: { type: "mul", left: { type: "var", name: "z" }, right: { type: "var", name: "z" } }, right: { type: "num", value: 1 } });
    assert.deepStrictEqual(cb.comp.parse("z*z + 1", { values: { z: cb.comp.init(1, 2) } }), { a: -2, b: 4 });

    assert.strictEqual(cb.comp.parse("(2x + 3y)^4"), "16x^4 + 81y^4 + 96x^3 * y + 216x^2 * y^2 + 216y^3 * x");
    assert.strictEqual(cb.comp.parse("(2x + 3y)^4", { returnLaTeX: true }), "16x^{4} + 81y^{4} + 96x^{3} \\cdot y + 216x^{2} \\cdot y^{2} + 216y^{3} \\cdot x");
    assert.strictEqual(cb.comp.parse("(2x + 3y)^4", { returnJSON: true }), '{"type":"pow","base":{"type":"add","left":{"type":"mul","left":{"type":"num","value":2},"right":{"type":"var","name":"x"}},"right":{"type":"mul","left":{"type":"num","value":3},"right":{"type":"var","name":"y"}}},"exponent":{"type":"num","value":4}}');
    assert.deepStrictEqual(cb.comp.parse("(2x + 3y)^4", { returnAST: true }), { type: "pow", base: { type: "add", left: { type: "mul", left: { type: "num", value: 2 }, right: { type: "var", name: "x" } }, right: { type: "mul", left: { type: "num", value: 3 }, right: { type: "var", name: "y" } } }, exponent: { type: "num", value: 4 } });
    assert.deepStrictEqual(cb.comp.parse("(2x + 3y)^4", { values: { x: 4, y: 5 } }), { a: 279841, b: 0 });

    assert.deepStrictEqual(cb.comp.parse("(1 + exp(2i))(3 + sin(4i))"), { a: -23.063091995275588, b: 18.66119676638661 });
    assert.strictEqual(cb.comp.parse("(1 + exp(2i))(3 + sin(4i))", { returnLaTeX: true }), "-23.063091995275588 + 18.66119676638661i");
    assert.strictEqual(cb.comp.parse("(1 + exp(2i))(3 + sin(4i))", { returnJSON: true }), '{"type":"add","left":{"type":"add","left":{"type":"add","left":{"type":"complex","a":3,"b":0},"right":{"type":"func","name":"sin","args":[{"type":"complex","a":0,"b":4}]}},"right":{"type":"mul","left":{"type":"func","name":"exp","args":[{"type":"complex","a":0,"b":2}]},"right":{"type":"complex","a":3,"b":0}}},"right":{"type":"mul","left":{"type":"func","name":"exp","args":[{"type":"complex","a":0,"b":2}]},"right":{"type":"func","name":"sin","args":[{"type":"complex","a":0,"b":4}]}}}');
    assert.deepStrictEqual(cb.comp.parse("(1 + exp(2i))(3 + sin(4i))", { returnAST: true }), { type: "add", left: { type: "add", left: { type: "add", left: { type: "complex", a: 3, b: 0 }, right: { type: "func", name: "sin", args: [ { type: "complex", a: 0, b: 4 } ] } }, right: { type: "mul", left: { type: "func", name: "exp", args: [ { type: "complex", a: 0, b: 2 } ] }, right: { type: "complex", a: 3, b: 0 } } }, right: { type: "mul", left: { type: "func", name: "exp", args: [ { type: "complex", a: 0, b: 2 } ] }, right: { type: "func", name: "sin", args: [ { type: "complex", a: 0, b: 4 } ] } } });
    assert.deepStrictEqual(cb.comp.parse("(1 + exp(2i))(3 + sin(4i))", { values: { z: cb.comp.init(1, 2) } }), { a: -23.063091995275588, b: 18.66119676638661 });

    assert.deepStrictEqual(cb.comp.parse("5 * 2 + 3 * 4i + i + 6 - 7i"), { a: 16, b: 6 });
    assert.strictEqual(cb.comp.parse("5 * 2 + 3 * 4i + i + 6 - 7i", { returnLaTeX: true }), "16 + 6i");
    assert.strictEqual(cb.comp.parse("5 * 2 + 3 * 4i + i + 6 - 7i", { returnJSON: true }), '{"type":"complex","a":16,"b":6}');
    assert.deepStrictEqual(cb.comp.parse("5 * 2 + 3 * 4i + i + 6 - 7i", { returnAST: true }), { type: "complex", a: 16, b: 6 });
    assert.deepStrictEqual(cb.comp.parse("5 * 2 + 3 * 4i + i + 6 - 7i", { values: { z: cb.comp.init(1, 2) } }), { a: 16, b: 6 });
}

console.log("🟩 Chalkboard.comp tests passed.");
