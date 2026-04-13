/*
    Chalkboard
    Version 3.0.2 Euler
    Released April 13th, 2026
    Authored by Zushah: https://www.github.com/Zushah
    Test: Trigonometry Namespace
*/

import assert from "assert";
import cb from "../dist/Chalkboard.js";

// trig.toRad, trig.toDeg, trig.coterminal
{
    assert.ok(Math.abs(cb.trig.toRad(180) - cb.PI()) < 1e-12);
    assert.ok(Math.abs(cb.trig.toDeg(cb.PI()) - 180) < 1e-12);
    assert.ok(Math.abs(cb.trig.coterminal(cb.PI(5)) - cb.PI()) < 1e-12);
    assert.ok(Math.abs(cb.trig.coterminal(-cb.PI()) + cb.PI()) < 1e-12);
}

// trig.sin, trig.cos, trig.tan, trig.sec, trig.csc, trig.cot
{
    assert.ok(Math.abs(cb.trig.sin(0) - 0) < 1e-12);
    assert.ok(Math.abs(cb.trig.sin(cb.PI(1/2)) - 1) < 1e-12);
    assert.ok(Math.abs(cb.trig.cos(0) - 1) < 1e-12);
    assert.ok(Math.abs(cb.trig.cos(cb.PI()) + 1) < 1e-12);
    assert.ok(Math.abs(cb.trig.tan(0) - 0) < 1e-12);
    assert.ok(Math.abs(cb.trig.tan(cb.PI(1/4)) - 1) < 1e-12);
    assert.ok(Math.abs(cb.trig.sec(0) - 1) < 1e-6);
    assert.ok(Math.abs(cb.trig.csc(cb.PI(1/2)) - 1) < 1e-6);
    assert.ok(Math.abs(cb.trig.cot(cb.PI(1/4)) - 1) < 1e-6);
}

// trig.sinh, trig.cosh, trig.tanh, trig.sech, trig.csch, trig.coth
{
    assert.ok(Math.abs(cb.trig.sinh(0) - 0) < 1e-12);
    assert.ok(Math.abs(cb.trig.cosh(0) - 1) < 1e-12);
    assert.ok(Math.abs(cb.trig.tanh(0) - 0) < 1e-12);
    assert.ok(Math.abs(cb.trig.sech(0) - 1) < 1e-12);
    assert.ok(Math.abs(cb.trig.csch(1) - 1 / cb.trig.sinh(1)) < 1e-12);
    assert.ok(Math.abs(cb.trig.coth(2) - cb.trig.cosh(2) / cb.trig.sinh(2)) < 1e-12);
}

// trig.arcsin, trig.arccos, trig.arctan, trig.arctan2, trig.arccot, trig.arccsc, trig.arcsec
{
    assert.ok(Math.abs(cb.trig.arcsin(1) - cb.PI(1/2)) < 1e-6);
    assert.ok(Math.abs(cb.trig.arcsin(-1) + cb.PI(1/2)) < 1e-6);
    assert.ok(Math.abs(cb.trig.arccos(1) - 0) < 1e-6);
    assert.ok(Math.abs(cb.trig.arccos(-1) - cb.PI()) < 1e-6);
    assert.ok(Math.abs(cb.trig.arctan(1) - cb.PI(1/4)) < 1e-6);
    assert.ok(Math.abs(cb.trig.arctan2(1, 1) - cb.PI(1/4)) < 1e-6);
    assert.ok(Math.abs(cb.trig.arccot(0) - cb.PI(1/2)) < 1e-3);
    assert.ok(Math.abs(cb.trig.arccsc(1) - cb.PI(1/2)) < 1e-3);
    assert.ok(Math.abs(cb.trig.arcsec(1) - 0) < 1e-3);
}

// trig.arcsinh, trig.arccosh, trig.arctanh, trig.arccoth, trig.arccsch, trig.arcsech
{
    assert.ok(Math.abs(cb.trig.arcsinh(0) - 0) < 1e-6);
    assert.ok(Math.abs(cb.trig.arccosh(1) - 0) < 1e-6);
    assert.ok(Math.abs(cb.trig.arctanh(0) - 0) < 1e-6);
    assert.ok(Math.abs(cb.trig.arccoth(2) - Math.log(3) / 2) < 1e-3);
    assert.ok(Math.abs(cb.trig.arccsch(1) - Math.log(1 + Math.sqrt(2))) < 1e-3);
    assert.ok(Math.abs(cb.trig.arcsech(1) - 0) < 1e-3);
}
