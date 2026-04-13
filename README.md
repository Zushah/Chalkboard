<p align="center"><a href="https://www.github.com/Zushah/Chalkboard"><img src="https://raw.githubusercontent.com/Zushah/Chalkboard/main/assets/logo.png" width="50%"></a></p>
<p align="center">
    <a href="https://www.github.com/Zushah/Chalkboard/releases/tag/v3.0.2"><img src="https://img.shields.io/badge/release-v3.0.2_Euler-327dc8?logo=github&logoColor=white" alt="Latest release is v3.0.2 Euler"></a>
    <a href="https://raw.githubusercontent.com/Zushah/Chalkboard/v3.0.2/dist/Chalkboard.js"><img src="https://img.shields.io/badge/minified-291.4_kB-327dc8?logo=javascript&logoColor=white" alt="291.4 kilobytes minified size"></a>
    <a href="https://www.npmjs.com/package/@zushah/chalkboard"><img src="https://img.shields.io/npm/dm/%40zushah/chalkboard?color=327dc8&logo=npm&logoColor=white" alt="npm downloads per month"></a>
    <a href="https://www.jsdelivr.com/package/gh/Zushah/Chalkboard"><img src="https://img.shields.io/jsdelivr/gh/hm/Zushah/Chalkboard?color=327dc8&logo=jsdelivr&logoColor=white" alt="jsDelivr requests per month"></a>
    <a href="https://www.github.com/Zushah/Chalkboard/blob/main/LICENSE.md"><img src="https://img.shields.io/badge/license-MPL--2.0-327dc8?logo=gitbook&logoColor=white" alt="Mozilla Public License 2.0"></a>
    <br>
    <a href="https://zushah.github.io/Chalkboard">https://zushah.github.io/Chalkboard</a>
</p><br>

Chalkboard is a library at the intersection of pure mathematics and web interactivity.

It facilitates the construction and manipulation of computational structures and analytical systems in TypeScript, such as:
- defining isomorphisms between algebraic structures,
- computing the flux of vector fields over parameterized surfaces,
- simulating systems of differential equations,
- visualizing statistical regression models,
- simplifying and evaluating both real- and complex-valued expressions,
- executing multidimensional matrix operations,
- automating Karnaugh map minimizations,
- and hundreds upon hundreds of more functionalities.

It is all organized in coherent namespaces rather than isolated utilities, providing an ergonomic API for mathematical abstractions and pedagogical applications in both JavaScript and Node.js environments.

## Installation
```bash
npm install @zushah/chalkboard
```
or
```html
<script src="https://cdn.jsdelivr.net/gh/Zushah/Chalkboard@3.0.2/dist/Chalkboard.min.js"></script>
```
or download the [latest release](https://www.github.com/Zushah/Chalkboard/releases/tag/v3.0.2).

## Documentation

The comprehensive Chalkboard documentation can be found [here](https://zushah.github.io/Chalkboard).

Chalkboard has almost 700 functions across fifteen namespaces:
- `abal` - Abstract algebra definitions, sets, structures, morphisms, and functions
- `bool` - Boolean algebra functions and parser
- `calc` - Single/multi-variable real/complex-valued calculus functions
- `comp` - Complex-valued functions and parser
- `diff` - Ordinary differential equations models, solvers, and functions
- `geom` - Geometric functions
- `matr` - Multidimensional matrix functions
- `numb` - Number theory functions
- `plot` - Plotting real/complex functions, differential equations, complex numbers, vectors, matrices, and statistical graphs
- `quat` - Quaternion functions
- `real` - Real-valued functions and parser
- `stat` - Statistical functions
- `tens` - Tensor functions
- `trig` - Trigonometric function functions
- `vect` - Two-, three-, and four-dimensional vector and vector field functions

There are also nine "global" functions, which are:
- `APPLY` - Applies a callback function in an element-wise manner on a Chalkboard object
- `CONTEXT` - The JavaScript canvas rendering context to use for plotting
- `E` - Computes the number e
- `I` - Computes the number i
- `PI` - Computes the number π
- `REGISTER` - Add custom functions to Chalkboard's real/complex-valued parsers
- `REGISTRY` - Stores custom functions for Chalkboard's real/complex-valued parsers
- `VERSION` - The installed version of Chalkboard
- `VERSIONALIAS` - The alias of the installed version of Chalkboard

Lastly, Chalkboard has eleven data types (also known as Chalkboard objects):
- `ChalkboardComplex` - Complex numbers
- `ChalkboardFunction` - Mathematical functions
- `ChalkboardMatrix` - Matrices
- `ChalkboardMorphism` - Morphisms
- `ChalkboardODE` - Ordinary differential equations
- `ChalkboardQuaternion` - Quaternions
- `ChalkboardSet` - Sets
- `ChalkboardStructure` - Algebraic structures
- `ChalkboardStructureExtension` - Algebraic structure extensions
- `ChalkboardTensor` - Tensors
- `ChalkboardVector` - Vectors

## Getting Started
After installing Chalkboard, you can straightforwardly get started with it, since every function begins with `Chalkboard` followed by a period, then a `namespace` (all fifteen namespaces are listed [above](#documentation)) followed by another period, and lastly the `function` itself.
```js
Chalkboard.namespace.function(parameters);
```
Ten interesting examples of Chalkboard can be found [here](https://zushah.github.io/Chalkboard/examples/index.html) and their source code can be found [here](https://www.github.com/Zushah/Chalkboard/tree/main/examples).

Here are snippets of code that show off only a few features of Chalkboard:
```js
const cb = Chalkboard; // Initialize in a browser
const cb = require("@zushah/chalkboard"); // Initialize in Node with CommonJS
import cb from "@zushah/chalkboard"; // Initialize in Node with ES Modules

const Z4 = cb.abal.Z(4); // The set of integers modulo 4 is the set {0, 1, 2, 3}
const C4 = cb.abal.C(4); // The set of fourth roots of unity is the set {1, i, -1, -i}
const G = cb.abal.group(Z4, (a, b) => (a + b) % 4); // The group G is the set Z₄ with mod 4 addition
const H = cb.abal.group(C4, (z, w) => cb.comp.mul(z, w)); // The group H is the set C₄ with complex multiplication
const F = cb.abal.isomorphism(G, H, (n) => cb.I(n)); // The isomorphism F: G → H is defined by F(n) = iⁿ for all n in Z₄
const Fi = cb.abal.invmorphism(F); // The isomorphism F⁻¹: H → G is defined by F⁻¹(z) = (2/π)·arg(z) mod 4 for all z in C₄
const S = cb.abal.set([0, 2]); // The set {0, 2} is a subset of Z₄
const K = cb.abal.group(S, (a, b) => (a + b) % 4, 0, (n) => (4 - n) % 4); // The subgroup K is the set S with mod 4 addition
const Q = cb.abal.quotient(G, K); // The quotient group Q = G/K is the set of cosets {{0, 2}, {1, 3}} with an operation inherited from G

const expr0 = cb.real.parse("x^2 + 1", { values: { x: 2 } }); // Returns 5
const expr1 = cb.real.parse("(2x + 3y)^4"); // Returns 16x^4 + 81y^4 + 96x^3y + 216x^2y^2 + 216y^3x
const expr2 = cb.real.parse("(1 + exp(2))(3 + sin(4x))"); // Returns 25.1672 + 8.3891sin(4x)
const expr3 = cb.comp.parse("exp(z)(w + 1)", { returnLaTeX: true }); // Returns w\mathrm{exp}\left(z\right) + \mathrm{exp}\left(z\right)
const expr4 = cb.comp.parse("(1 + exp(2i))(3 + sin(4i))"); // Returns -23.0631 + 18.6612i
const expr5 = cb.comp.parse("(2x + 3y)^4"); // Returns 16x^4 + 81y^4 + 96x^3y + 216x^2y^2 + 216y^3x
const expr6 = cb.comp.parse("z^2 + 1", { values: { z: Chalkboard.comp.init(1, 2) } }); // Returns -2 + 4i
const expr7 = cb.bool.parse("x & !x | y & x | y & !x"); // Returns y
const expr8 = cb.bool.parse("x & y | z", { values: { x: true, y: false, z: true } }); // Returns true
const expr9 = cb.bool.parse("x & y", { returnAST: true }); // Returns {"type":"and","left":{"type":"var","name":"x"},"right":{"type":"var","name":"y"}}

const f = cb.real.define((x) => cb.trig.cos(2*x)); // f(x) = cos(2x)
const dfdx = cb.calc.dfdx(f, 2); // Derivative of f at x = 0
const fxdx = cb.calc.fxdx(f, 0, 2); // Antiderivative of f from x = 0 to x = 2
const F = cb.calc.Fourier(f, 2); // Fourier transform of f at x = 2

const f = cb.real.define((x, y, z) => x, (x, y, z) => y, (x, y, z) => z); // f(x, y, z) = (x, y, z)
const r = cb.real.define((s, t) => cb.trig.cos(s) * cb.trig.cos(t), (s, t) => cb.trig.sin(s) * cb.trig.cos(t), (s, t) => cb.trig.sin(t)); // r(s, t) = (cos(s)cos(t), sin(s)cos(t), sin(t))
const fnds = cb.calc.fnds(f, r, cb.PI(-1/2), cb.PI(1/2), 0, cb.PI(2)); // Flux of the radial vector field through the unit sphere

const f = cb.diff.harmonic(cb.PI(2)); // Defines harmonic oscillator y'' = -4π²y
const sol = cb.diff.solveAdaptive(f, { t0: 0, t1: 2, y0: { y0: 1, dy0: 0 }, h0: 0.01, hMin: 1e-6, hMax: 0.05 }); // Solves with adaptive Dormand–Prince RK45
const samples = cb.diff.sample(sol, [0, 0.25, 0.5, 0.75, 1.0]); // Samples solution at specified times
const phase = cb.diff.phase(sol, 0, 1); // Produces (y, dy) pairs for a phase plot
const err = cb.diff.error(sol, f, "LInfinity"); // Computes residual error (infinity norm) of the solution
cb.plot.ode(sol, { phase: true, i: 0, j: 1 }); // Plots the phase portrait (y vs dy) on the canvas

const primes = cb.numb.primeArr(0, 100); // Array of prime numbers between 0 and 100
const midPrime = cb.stat.median(primes); // Median number in the primes array
cb.plot.barplot(primes, cb.stat.array(0, 100, 11), {size: 5, strokeStyle: "black", fillStyle: "blue"}); // Barplot of the primes array with a bin size of 10, a scale of 2, a stroke color of black, and a fill color of blue

const z = cb.comp.init(1, 1); // z = 1 + i
const zsqsqrt = cb.comp.sqrt(cb.comp.sq(z)); // The square root of z squared equals z
const f = cb.comp.define((z) => cb.comp.add(cb.comp.sq(z), 1)); // f(z) = z^2 + 1
cb.plot.definition(f); // Plots the domain coloring of f

const r = cb.real.define((t) => cb.trig.cos(t), (t) => cb.trig.sin(t)); // r(t) = (cos(t), sin(t))
cb.plot.xyplane({size: 2}); // Draws the Cartesian coordinate plane scaled by 2
cb.plot.definition(r, {size: 2, strokeStyle: "rgb(255, 100, 100)", domain: [0, cb.PI(2)]}); // Plots r(t) scaled by 2 colored light red from t = 0 to t = π/2

const a = cb.vect.init(1, 2, 3); // Vector a = (1, 2, 3)
const b = cb.vect.init(4, 5, 6); // Vector b = (4, 5, 6)
const c = cb.vect.init(7, 8, 9); // Vector c = (7, 8, 9)
const axbxc = cb.vect.vectorTriple(a, b, c); // Triple cross product between a, b, and c
cb.vect.print(axbxc); // Prints axbxc in the console

const m = cb.matr.init( // m is a 5x5 matrix
    [0, 1, 1, 1, 1],
    [1, 0, 1, 1, 1],
    [1, 1, 0, 1, 1],
    [1, 1, 1, 0, 1],
    [1, 1, 1, 1, 0]
);
const mi = cb.matr.invert(m); // mi is the inverse of m
const mmi = cb.matr.mul(m, mi); // mmi is the product of m and mi
cb.matr.print(mmi); // Prints mmi in the console

const t = cb.tens.init( // t is a 2x2x2 rank-3 tensor
    [
        [1, 2],
        [3, 4]
    ],
    [
        [5, 6],
        [7, 8]
    ]
);
const tt = cb.tens.mul(t, t); // tt is a 2x2x2x2x2x2 rank-6 tensor
const ttm = cb.tens.resize(tt, 8, 8); // ttm is an 8x8 matrix (or rank-2 tensor)
cb.tens.print(tt); // Prints tt in the console just to see what it looks like for fun
const factorialt = cb.APPLY(t, (x) => cb.numb.factorial(x)); // Calculates the factorial of each element of t

const m = cb.numb.convert(1500, "mm", "m"); // Length conversion
const sqmi = cb.numb.convert(1000000, "m2", "mi2"); // Area conversion
const kg = cb.numb.convert(5000, "g", "kg"); // Mass conversion
const ml = cb.numb.convert(3, "gal", "mL"); // Volume conversion
const pa = cb.numb.convert(1, "atm", "Pa"); // Pressure conversion
const ns = cb.numb.convert(2, "hr", "ns"); // Time conversion
const k = cb.numb.convert(98.6, "F", "K"); // Temperature conversion
```

## Contributing
Contributions to Chalkboard are welcome! The contribution guidelines can be found [here](https://www.github.com/Zushah/Chalkboard/blob/main/CONTRIBUTING.md). Furthermore, the changelog can be found [here](https://www.github.com/Zushah/Chalkboard/blob/main/CHANGELOG.md). Lastly, the design details can be found [here](https://www.github.com/Zushah/Chalkboard/blob/main/DESIGN.md).

## Acknowledgments
- Thanks to [@bhavjitChauhan](https://www.github.com/bhavjitChauhan) for his contribution ([`d3f0a82`](https://github.com/Zushah/Chalkboard/commit/d3f0a82f0c2b1351f391908ef2d6f78403881259)) of adding partial pivoting to matrix inversion in [v1.3.0 Heaviside](https://www.github.com/Zushah/Chalkboard/releases/tag/v1.3.0).
- Thanks to [@gyang0](https://www.github.com/gyang0) for his contributions ([`00a7428`](https://github.com/Zushah/zushah.github.io/commit/00a7428bf7036fd169545b16c1845ce0ddcf0f56), [`90c9564`](https://github.com/Zushah/Chalkboard/commit/90c9564d0e12a7de1795dc034d2f9260c0336f30)) to the plotting and geometry namespaces in the [documentation](https://www.github.com/Zushah/zushah.github.io/tree/main/Chalkboard).
- Thanks to [@JentGent](https://www.github.com/JentGent) for his [implementation](https://www.github.com/JentGent/linalg/blob/main/linalg.js#L519) of QR decomposition which was adapted ([`1dce0db`](https://www.github.com/Zushah/Chalkboard/commit/1dce0dbac82b38f9a550dd496bc878c402a92442)) in [v1.7.0 Descartes](https://www.github.com/Zushah/Chalkboard/releases/tag/v1.7.0).

## License
Chalkboard is available under the [Mozilla Public License 2.0](https://www.github.com/Zushah/Chalkboard/blob/main/LICENSE.md).
