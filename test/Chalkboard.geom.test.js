/*
    Chalkboard
    Version 3.0.0 Euler
    Released March 2nd, 2026
    Authored by Zushah: https://www.github.com/Zushah
    Test: Geometry Namespace
*/

import assert from "assert";
import cb from "../dist/Chalkboard.js";

// geom.circleA, geom.circleP, geom.ellipseA, geom.ellipseP, geom.sectorA, geom.sectorP, geom.squareA, geom.squareP, geom.triangleA, geom.triangleP, geom.trianglesidesA, geom.trapezoidA, geom.trapezoidP, geom.parallelogramA, geom.parallelogramP, geom.polygonA, geom.polygonP
{
    assert.strictEqual(cb.geom.circleA(2), 12.566370614359174);
    assert.strictEqual(cb.geom.circleP(2), 12.566370614359174);
    assert.strictEqual(cb.geom.ellipseA(2, 3), 18.849555921538762);
    assert.strictEqual(cb.geom.ellipseP(2, 3), 15.865439589251235);
    assert.strictEqual(cb.geom.sectorA(2, cb.PI(1/2)), 3.1415926535897936);
    assert.strictEqual(cb.geom.sectorP(2, cb.PI(1/2)), 3.1415926535897936);
    assert.strictEqual(cb.geom.squareA(3), 9);
    assert.strictEqual(cb.geom.squareP(3), 12);
    assert.strictEqual(cb.geom.triangleA(4, 3), 6);
    assert.strictEqual(cb.geom.triangleP(3, 4, 5), 12);
    assert.strictEqual(cb.geom.trianglesidesA(3, 4, 5), 6);
    assert.strictEqual(cb.geom.trapezoidA(4, 6, 3), 15);
    assert.strictEqual(cb.geom.trapezoidP(4, 6, 3, 5), 18);
    assert.strictEqual(cb.geom.parallelogramA(4, 3), 12);
    assert.strictEqual(cb.geom.parallelogramP(4, 3), 14);
    assert.strictEqual(cb.geom.polygonA(4, 2, 1), 4);
    assert.strictEqual(cb.geom.polygonP(5, 2), 10);
}

// geom.coneA, geom.coneV, geom.cubeA, geom.cubeV, geom.cylinderA, geom.cylinderV, geom.rectangularprismA, geom.rectangularprismV, geom.sphereA, geom.sphereV, geom.triangularprismA, geom.triangularprismV
{
    assert.strictEqual(cb.geom.coneA(3, 4), 75.39822368615505);
    assert.strictEqual(cb.geom.coneV(3, 6), 56.54866776461628);
    assert.strictEqual(cb.geom.cubeA(2), 24);
    assert.strictEqual(cb.geom.cubeV(2), 8);
    assert.strictEqual(cb.geom.cylinderA(2, 3), 62.83185307179588);
    assert.strictEqual(cb.geom.cylinderV(2, 3), 37.699111843077524);
    assert.strictEqual(cb.geom.rectangularprismA(1, 2, 3), 22);
    assert.strictEqual(cb.geom.rectangularprismV(1, 2, 3), 6);
    assert.strictEqual(cb.geom.sphereA(2), 50.2654824574367);
    assert.strictEqual(cb.geom.sphereV(3), 113.09733552923257);
    assert.strictEqual(cb.geom.triangularprismA(3, 4, 5, 4), 60);
    assert.strictEqual(cb.geom.triangularprismV(3, 4, 5, 4), 24.000000000000004);
}

// geom.dist, geom.distsq, geom.mid, geom.Euler, geom.Pythagorean, geom.PythagoreanTriple, geom.line3D
{
    assert.strictEqual(cb.geom.dist([0, 0], [3, 4]), 5);
    assert.strictEqual(cb.geom.distsq([0, 0], [3, 4]), 25);
    assert.deepStrictEqual(cb.geom.mid([0, 0], [2, 2]), [1, 1]);
    assert.deepStrictEqual(cb.geom.mid([0, 0, 0], [2, 4, 6]), [1, 2, 3]);
    assert.strictEqual(cb.geom.Euler(6, 12, 8), 2);
    assert.strictEqual(cb.geom.Pythagorean(3, 4), 5);
    const [a, b, c] = cb.geom.PythagoreanTriple(2, 5);
    assert.strictEqual(a % 2, 1);
    assert.strictEqual(a * a + b * b, c * c);
    const calls = [];
    const ctx = { beginPath: () => calls.push("beginPath"), moveTo: (x, y) => calls.push(["moveTo", x, y]), lineTo: (x, y) => calls.push(["lineTo", x, y]), stroke: () => calls.push("stroke") };
    cb.geom.line3D(0, 1, 0, 1, 2, 0, ctx);
    assert.deepStrictEqual(calls, ["beginPath", ["moveTo", 0, 1], ["lineTo", 1, 2], "stroke"]);
}
