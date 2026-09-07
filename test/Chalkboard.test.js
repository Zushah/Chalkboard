/*
 * Chalkboard v3.0.5
 * Released on Monday, September 7, 2026
 * Hundreds of functions for the manifestation and manipulation of mathematical structures and systems
 * Copyright (c) Zushah and contributors
 * SPDX-License-Identifier: MPL-2.0
 * Source: https://github.com/Zushah/Chalkboard
 * Website: https://zushah.github.io/Chalkboard
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import assert from "assert";
import cb from "@zushah/chalkboard";
import { readFileSync, readdirSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

// Distribution compatibility: ESM and CDN.
{
    const entry = await import("@zushah/chalkboard");
    const canonical = new URL("../dist/Chalkboard.js", import.meta.url);
    assert.strictEqual(import.meta.resolve("@zushah/chalkboard"), new URL("../dist/Chalkboard.mjs", import.meta.url).href);
    assert.deepStrictEqual(Object.keys(entry), ["default"]);
    assert.strictEqual(entry.default, cb);
    await import(canonical.href);
    assert.strictEqual(cb, globalThis.Chalkboard);
    assert.strictEqual(typeof cb.PI, "function");
    assert.strictEqual(typeof cb.comp.init, "function");
    assert.strictEqual(typeof cb.vect.init, "function");
    const adapter = readFileSync(new URL("../dist/Chalkboard.mjs", import.meta.url), "utf8");
    assert.strictEqual(adapter.replace(/\/\*[\s\S]*?\*\//g, "").trim(), 'import "./Chalkboard.js";\nexport default globalThis.Chalkboard;');
    assert.deepStrictEqual(readdirSync(new URL("../dist/", import.meta.url)).sort(), ["Chalkboard.d.ts", "Chalkboard.js", "Chalkboard.min.js", "Chalkboard.mjs"]);
    for (const name of ["Chalkboard.js", "Chalkboard.min.js", "Chalkboard.d.ts", "Chalkboard.mjs"]) {
        const code = readFileSync(new URL(`../dist/${name}`, import.meta.url), "utf8");
        assert.ok(code.startsWith("/*!\n * Chalkboard v3.0.5\n * Released on Monday, September 7, 2026\n"));
        assert.ok(code.includes("SPDX-License-Identifier: MPL-2.0"));
        assert.match(code, /^\/\*![\s\S]*?\*\/\n\n\S/, `${name}: exactly one blank line after the banner`);
        if (name.endsWith(".mjs") || name.endsWith(".d.ts")) continue;
        const context = vm.createContext({});
        vm.runInContext("window = globalThis", context);
        new vm.Script(code, { filename: name }).runInContext(context);
        assert.strictEqual(context.Chalkboard.VERSION, cb.VERSION);
        assert.strictEqual(context.Chalkboard.PI(), cb.PI());
        assert.strictEqual(JSON.stringify(context.Chalkboard.comp.init(1, 2)), '{"a":1,"b":2}');
        for (const namespace of ["abal", "bool", "calc", "comp", "diff", "geom", "matr", "numb", "plot", "quat", "real", "stat", "tens", "trig", "vect"]) assert.strictEqual(typeof context.Chalkboard[namespace], "object");
        const moduleCheck = spawnSync(process.execPath, ["--input-type=module", "--eval", `import { readFileSync } from 'node:fs'; await import('data:text/javascript;base64,' + readFileSync(${JSON.stringify(fileURLToPath(new URL(`../dist/${name}`, import.meta.url)))}).toString('base64')); if (Math.abs(globalThis.Chalkboard.PI() - Math.PI) > 1e-15) process.exit(1);`], { encoding: "utf8" });
        assert.strictEqual(moduleCheck.status, 0, moduleCheck.stderr || String(moduleCheck.error));
    }
}

// VERSION, VERSIONALIAS
{
    assert.strictEqual(cb.VERSION, "3.0.5");
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
    assert.deepStrictEqual(cb.I(-1), { a: 0, b: -1 });
    assert.deepStrictEqual(cb.I(-2), { a: -1, b: 0 });
    assert.deepStrictEqual(cb.I(-3), { a: 0, b: 1 });
    assert.deepStrictEqual(cb.I(-4), { a: 1, b: 0 });
    assert.throws(() => cb.I(0.5));
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
