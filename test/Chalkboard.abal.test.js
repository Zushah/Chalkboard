/*
    Chalkboard
    Version 3.0.0 Euler
    Released March 2nd, 2026
    Authored by Zushah: https://www.github.com/Zushah
    Test: Abstract Algebra Namespace
*/

import assert from "assert";
import cb from "../dist/Chalkboard.js";

// abal.set, abal.copy, abal.cardinality, abal.isEmpty, abal.isSubset, abal.isSuperset, abal.isEqual
{
    const A = cb.abal.set([1, 2, 2, 3]);

    assert.ok(A.contains(1));
    assert.ok(A.contains(3));
    assert.strictEqual(A.contains(4), false);

    assert.strictEqual(cb.abal.cardinality(A), 3);
    assert.strictEqual(cb.abal.isEmpty(A), false);
    assert.strictEqual(cb.abal.isEmpty(cb.abal.set([])), true);

    assert.strictEqual(cb.abal.isSubset(cb.abal.set([2, 3]), A), true);
    assert.strictEqual(cb.abal.isSuperset(A, cb.abal.set([2, 3])), true);

    const Ac = cb.abal.copy(A);
    assert.ok(cb.abal.isEqual(A, Ac));

    const Z = cb.abal.Z();
    assert.strictEqual(cb.abal.cardinality(Z), Infinity);
    assert.ok(Z.contains(-5));
}

// abal.union, abal.intersection, abal.difference, abal.symmetricDifference, abal.complement, abal.Cartesian, abal.powerSet
{
    const A = cb.abal.set([1, 2, 3]);
    const B = cb.abal.set([3, 4]);
    assert.ok(cb.abal.isEqual(cb.abal.union(A, B), cb.abal.set([1, 2, 3, 4])));
    assert.ok(cb.abal.isEqual(cb.abal.intersection(A, B), cb.abal.set([3])));
    assert.ok(cb.abal.isEqual(cb.abal.difference(A, B), cb.abal.set([1, 2])));
    assert.ok(cb.abal.isEqual(cb.abal.symmetricDifference(A, B), cb.abal.set([1, 2, 4])));
    assert.ok(cb.abal.isEqual(cb.abal.complement(A, cb.abal.set([1, 2, 3, 4])), cb.abal.set([4])));
    assert.strictEqual(cb.abal.cardinality(cb.abal.Cartesian(cb.abal.set([1, 2]), cb.abal.set(["a", "b"]))), 4);
    assert.ok(cb.abal.Cartesian(cb.abal.set([1, 2]), cb.abal.set(["a", "b"])).contains([1, "a"]));
    assert.strictEqual(cb.abal.cardinality(cb.abal.powerSet(cb.abal.set([1, 2, 3]))), 8);
}

// abal.toArray, abal.toObject, abal.toString, abal.toMatrix, abal.toTensor, abal.toVector, abal.toTypedArray
{
    const A = cb.abal.set([1, 2, 3, 4]);
    assert.deepStrictEqual(cb.abal.toArray(A), [1, 2, 3, 4]);
    assert.deepStrictEqual(cb.abal.toObject(A), { _0: 1, _1: 2, _2: 3, _3: 4 });
    assert.strictEqual(cb.abal.toString(A), "[1, 2, 3, 4]");
    assert.deepStrictEqual(cb.abal.toMatrix(A, 2, 2), [[1, 2], [3, 4]]);
    assert.deepStrictEqual(cb.abal.toTensor(A, 2, 2), [[1, 2], [3, 4]]);
    assert.deepStrictEqual(cb.abal.toVector(A, 4), { x: 1, y: 2, z: 3, w: 4 });
    assert.deepStrictEqual(cb.abal.toTypedArray(A, "int16"), new Int16Array([1, 2, 3, 4]));
}

// abal.N, abal.P, abal.Z, abal.Q, abal.R, abal.C, abal.D, abal.S, abal.A, abal.M, abal.GL
{
    const N = cb.abal.N();
    assert.ok(N.contains(1));
    assert.strictEqual(N.contains(0), false);

    const P = cb.abal.P();
    assert.ok(P.contains(2));
    assert.strictEqual(P.contains(4), false);

    const Z5 = cb.abal.Z(5);
    assert.ok(Z5.contains(0));
    assert.ok(Z5.contains(4));
    assert.ok(!Z5.contains(5));

    const Q = cb.abal.Q();
    assert.ok(Q.contains(1 / 2));

    const R = cb.abal.R();
    assert.ok(R.contains(cb.PI()));

    const C4 = cb.abal.C(4);
    assert.strictEqual(cb.abal.cardinality(C4), 4);
    assert.ok(C4.contains(cb.comp.init(1, 0)));

    const D3 = cb.abal.D(3);
    assert.ok(D3.contains("r0"));
    assert.ok(D3.contains("s2"));

    const S3 = cb.abal.S(3);
    assert.strictEqual(cb.abal.cardinality(S3), 6);
    assert.ok(S3.contains([0, 1, 2]));

    const A3 = cb.abal.A(3);
    assert.strictEqual(cb.abal.cardinality(A3), 3);
    assert.ok(A3.contains([0, 1, 2]));

    const M23 = cb.abal.M(2, 3);
    assert.ok(M23.contains([[1, 0, 0], [0, 1, 0]]));

    const GL2 = cb.abal.GL(2);
    assert.ok(GL2.contains([[1, 0], [0, 1]]));
    assert.ok(!GL2.contains([[1, 0], [0, 0]]));
}

// abal.isClosed, abal.isCommutative, abal.monoid, abal.isMonoid, abal.isSubmonoid, abal.group, abal.isGroup, abal.isSubgroup, abal.isNormalSubgroup, abal.cyclicSubgroup, abal.isCyclicSubgroup, abal.order, abal.Lagrange, abal.center, abal.Cayley
{
    const Z4 = cb.abal.Z(4);
    const add4 = (a, b) => (a + b) % 4;

    const G = cb.abal.group(Z4, add4);
    assert.strictEqual(cb.abal.isGroup(G), true);
    assert.strictEqual(cb.abal.isCommutative(G), true);
    assert.strictEqual(cb.abal.isClosed(Z4, add4), true);

    const H = cb.abal.group(cb.abal.set([0, 2]), add4, 0, (x) => (4 - x) % 4);
    assert.strictEqual(cb.abal.isSubgroup(G, H.set), true);
    assert.strictEqual(cb.abal.isNormalSubgroup(G, H.set), true);

    const cyc = cb.abal.cyclicSubgroup(G, 1);
    assert.strictEqual(cb.abal.isCyclicSubgroup(G, cyc), true);
    assert.strictEqual(cb.abal.order(G, 1), 4);
    assert.strictEqual(cb.abal.Lagrange(G, H.set), true);

    const ZG = cb.abal.center(G);
    assert.ok(cb.abal.isEqual(ZG, G.set));

    const table = cb.abal.Cayley(G);
    assert.strictEqual(table.length, 4);
    assert.deepStrictEqual(table[0], [0, 1, 2, 3]);

    const mul3 = (a, b) => (a * b) % 3;
    const M = cb.abal.monoid(cb.abal.Z(3), mul3, 1);
    assert.strictEqual(cb.abal.isMonoid(M), true);
    const Msub = cb.abal.monoid(cb.abal.set([1]), mul3, 1);
    assert.strictEqual(cb.abal.isSubmonoid(M, Msub.set), true);
}

// abal.ring, abal.isRing, abal.isSubring, abal.field, abal.isField, abal.isSubfield, abal.isIdeal, abal.principalIdeal, abal.isPrincipalIdeal, abal.quotient, abal.direct
{
    const Z4 = cb.abal.Z(4);
    const add4 = (a, b) => (a + b) % 4;
    const mul4 = (a, b) => (a * b) % 4;

    const R4 = cb.abal.ring(Z4, add4, mul4);
    assert.strictEqual(cb.abal.isRing(R4), true);
    assert.strictEqual(cb.abal.isIdentity(R4, 0, "add"), false);
    assert.strictEqual(cb.abal.isIdentity(R4, 1, "mul"), true);
    assert.strictEqual(cb.abal.isInverse(R4, 1, 3, "add"), true);
    assert.strictEqual(cb.abal.isInverse(R4, 3, 3, "mul"), true);

    const I2 = cb.abal.principalIdeal(R4, 2);
    assert.strictEqual(cb.abal.isIdeal(R4, I2), true);
    assert.strictEqual(cb.abal.isPrincipalIdeal(R4, I2), true);
    assert.ok(I2.contains(0));
    assert.ok(I2.contains(2));

    const Rring = cb.abal.ring(cb.abal.R(), (a, b) => a + b, (a, b) => a * b);
    assert.strictEqual(cb.abal.isSubring(Rring, cb.abal.Q()), true);

    const F = cb.abal.field(cb.abal.R(), (a, b) => a + b, (a, b) => a * b);
    assert.strictEqual(cb.abal.isField(F), true);
    const Cfield = cb.abal.field(cb.abal.C(), (x, y) => cb.comp.add(x, y), (x, y) => cb.comp.mul(x, y));
    assert.strictEqual(cb.abal.isSubfield(Cfield, cb.abal.R()), true);

    const G = cb.abal.group(cb.abal.Z(4), add4);
    const H = cb.abal.group(cb.abal.set([0, 2]), add4, 0, (x) => (4 - x) % 4);
    const QG = cb.abal.quotient(G, H);
    assert.strictEqual(cb.abal.cardinality(QG.set), 2);

    const Z2 = cb.abal.ring(cb.abal.Z(2), (a, b) => (a + b) % 2, (a, b) => (a * b) % 2);
    const prod = cb.abal.direct(Z2, Z2, "product");
    assert.strictEqual(cb.abal.cardinality(prod.set), 4);
    assert.doesNotThrow(() => cb.abal.direct(Z2, Z2, "sum"));
}

// abal.homomorphism, abal.isHomomorphism, abal.endomorphism, abal.isEndomorphism, abal.automorphism, abal.isAutomorphism, abal.isInjective, abal.isSurjective, abal.isBijective, abal.isIsomorphism, abal.isomorphism, abal.invmorphism, abal.idmorphism, abal.isIdentity, abal.compose, abal.kernel, abal.image, abal.preimage, abal.isExact, abal.isInverse
{
    const Z4 = cb.abal.group(cb.abal.Z(4), (a, b) => (a + b) % 4);
    const Z2 = cb.abal.group(cb.abal.Z(2), (a, b) => (a + b) % 2);

    const mod2 = cb.abal.homomorphism(Z4, Z2, (x) => x % 2);
    assert.strictEqual(cb.abal.isHomomorphism(mod2), true);
    assert.strictEqual(cb.abal.isSurjective(mod2), true);
    assert.strictEqual(cb.abal.isInjective(mod2), false);
    assert.strictEqual(cb.abal.isBijective(mod2), false);

    const ker = cb.abal.kernel(mod2);
    assert.ok(ker.contains(0));
    assert.ok(ker.contains(2));

    const img = cb.abal.image(mod2);
    assert.ok(img.contains(0));
    assert.ok(img.contains(1));

    const pre = cb.abal.preimage(mod2, cb.abal.set([1]));
    assert.ok(pre.contains(1));
    assert.ok(pre.contains(3));

    const id2 = cb.abal.idmorphism(Z2);
    assert.strictEqual(id2.mapping(1), 1);

    const comp = cb.abal.compose(mod2, id2);
    assert.strictEqual(comp.mapping(3), 1);

    const Z3 = cb.abal.group(cb.abal.Z(3), (a, b) => (a + b) % 3);
    const endo = cb.abal.endomorphism(Z3, (x) => (2 * x) % 3);
    assert.strictEqual(cb.abal.isEndomorphism(endo), true);

    const auto = cb.abal.automorphism(Z3, (x) => (2 * x) % 3);
    assert.strictEqual(cb.abal.isAutomorphism(auto), true);
    assert.strictEqual(cb.abal.isIsomorphism(auto), true);

    const iso = cb.abal.isomorphism(Z3, Z3, (x) => (2 * x) % 3);
    const inv = cb.abal.invmorphism(iso);
    assert.strictEqual(inv.mapping(1), 2);
    assert.strictEqual(inv.mapping(2), 1);
    assert.strictEqual(cb.abal.isIsomorphism(iso), true);

    const trivial = cb.abal.group(cb.abal.set([0]), (a, b) => 0, 0, (x) => 0);
    const toTrivial = cb.abal.homomorphism(Z2, trivial, (x) => 0);
    assert.strictEqual(cb.abal.isExact(mod2, toTrivial), true);
}

// abal.ringExtension, abal.fieldExtension
{
    const Zring = cb.abal.ring(cb.abal.Z(), (a, b) => a + b, (a, b) => a * b);
    const Qring = cb.abal.ring(cb.abal.Q(), (a, b) => a + b, (a, b) => a * b);

    const ZtoQ = cb.abal.ringExtension(Zring, Qring);
    assert.strictEqual(ZtoQ.degree, Infinity);
    assert.strictEqual(ZtoQ.isAlgebraic, false);

    const QtoZ = cb.abal.ringExtension(Qring, Zring, Infinity, [], false, false, false);
    assert.strictEqual(QtoZ.degree, Infinity);

    const Rfield = cb.abal.field(cb.abal.R(), (a, b) => a + b, (a, b) => a * b);
    const Cfield = cb.abal.field(cb.abal.C(), (x, y) => cb.comp.add(x, y), (x, y) => cb.comp.mul(x, y));

    assert.throws(() => cb.abal.fieldExtension(Rfield, Cfield));
    const CtoR = cb.abal.fieldExtension(Cfield, Rfield, 2, [cb.vect.init(1, 0), cb.vect.init(0, 1)], true, true, true);
    assert.strictEqual(CtoR.degree, 2);
    assert.strictEqual(CtoR.isFinite, true);
}

// abal.coset, abal.print
{
    const Z4 = cb.abal.group(cb.abal.Z(4), (a, b) => (a + b) % 4);
    const H = cb.abal.group(cb.abal.set([0, 2]), (a, b) => (a + b) % 4, 0, (x) => (4 - x) % 4);
    const cosets = cb.abal.coset(Z4, H);

    assert.strictEqual(cb.abal.cardinality(cosets), 2);
    assert.ok(cosets.contains(cb.abal.set([0, 2])));
    assert.ok(cosets.contains(cb.abal.set([1, 3])));

    assert.doesNotThrow(() => cb.abal.print(cosets));
}
