/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import { readdir, readFile, rm, mkdir, writeFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";
import { minify } from "terser";

const root = fileURLToPath(new URL("../", import.meta.url));
const path = (...parts) => resolve(root, ...parts);

const sources = [
    "Chalkboard.ts",
    "Chalkboard.abal.ts",
    "Chalkboard.bool.ts",
    "Chalkboard.calc.ts",
    "Chalkboard.comp.ts",
    "Chalkboard.diff.ts",
    "Chalkboard.geom.ts",
    "Chalkboard.matr.ts",
    "Chalkboard.numb.ts",
    "Chalkboard.plot.ts",
    "Chalkboard.quat.ts",
    "Chalkboard.real.ts",
    "Chalkboard.stat.ts",
    "Chalkboard.tens.ts",
    "Chalkboard.trig.ts",
    "Chalkboard.vect.ts"
];

const banner = `/*!
 * Chalkboard v3.0.5
 * Released on Monday, September 7, 2026
 * Hundreds of functions for the manifestation and manipulation of mathematical structures and systems
 * Copyright (c) Zushah and contributors
 * SPDX-License-Identifier: MPL-2.0
 * Source: https://github.com/Zushah/Chalkboard
 * Website: https://zushah.github.io/Chalkboard
 */
`;

const build = async () => {
    const actual = (await readdir(path("src"))).filter((name) => /^Chalkboard.*\.ts$/.test(name));
    const missing = actual.filter((name) => !sources.includes(name));
    const absent = sources.filter((name) => !actual.includes(name));
    if (new Set(sources).size !== sources.length || missing.length || absent.length) throw new Error(`Invalid source manifest: unlisted [${missing}], absent [${absent}], or duplicate entries`);
    await rm(path("build"), { recursive: true, force: true });
    const pkg = JSON.parse(await readFile(path("node_modules/typescript/package.json"), "utf8"));
    const compiler = spawnSync(process.execPath, [path("node_modules/typescript", pkg.bin.tsc), "--project", path("tsconfig.json")], { cwd: root, stdio: "inherit" });
    if (compiler.error) throw compiler.error;
    if (compiler.status !== 0) throw new Error(`TypeScript compilation failed (${compiler.status ?? compiler.signal})`);
    const staged = async (extension) => (await Promise.all(sources.map(async (name) => {
        const output = path("build", name.replace(/\.ts$/, extension));
        try { return await readFile(output, "utf8"); }
        catch (error) { throw new Error(`Cannot read expected staging file: ${output}`, { cause: error }); }
    }))).join("\n");
    const javascript = `${await staged(".js")}\nglobalThis.Chalkboard = Chalkboard;\n`;
    const declarations = await staged(".d.ts");
    const globals = declarations.replace(/^declare namespace Chalkboard\b/gm, "namespace Chalkboard");
    const types = `declare global {\n${globals}}\n\nexport default Chalkboard;\n`;
    const minified = await minify(javascript, { ecma: 2023, compress: true, mangle: true, format: { comments: /^!/ } });
    if (!minified.code) throw new Error("Minifier produced no output");
    const adapter = `import "./Chalkboard.js";\nexport default globalThis.Chalkboard;\n`;
    const artifacts = Object.fromEntries(Object.entries({ "Chalkboard.js": javascript, "Chalkboard.min.js": minified.code + "\n", "Chalkboard.d.ts": types, "Chalkboard.mjs": adapter }).map(([name, contents]) => [name, `${banner}\n${contents}`]));
    await rm(path("dist"), { recursive: true, force: true });
    try {
        await mkdir(path("dist"), { recursive: true });
        for (const [name, contents] of Object.entries(artifacts)) await writeFile(path("dist", name), contents);
    } catch (error) {
        await rm(path("dist"), { recursive: true, force: true });
        throw new Error("Failed to write distribution; partial output removed", { cause: error });
    }
    console.log("Build successful.\n" + Object.entries(artifacts).map(([name, contents]) => `./dist/${name}: ${(Buffer.byteLength(contents, "utf8") / 1000).toFixed(3)} kB`).join("\n"));
};

build().catch((error) => { console.error(error); process.exitCode = 1; });
