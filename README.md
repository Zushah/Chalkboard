<p align="center"><a href="https://www.github.com/Zushah/Chalkboard"><img src="https://raw.githubusercontent.com/Zushah/Chalkboard/main/assets/Chalkboard-logo.png" width="50%"></a></p>
<p align="center">
    <a href="https://www.github.com/Zushah/Chalkboard/releases/tag/v2.2.0"><img src="https://img.shields.io/badge/release-v2.2.0_Galois-blueviolet?logo=github&logoColor=white" alt="Latest release"></a>
    <a href="https://www.codefactor.io/repository/github/zushah/chalkboard"><img src="https://img.shields.io/codefactor/grade/github/Zushah/Chalkboard?color=blue&logo=codefactor&logoColor=white" alt="CodeFactor grade"></a>
    <a href="https://bundlephobia.com/package/@zushah/chalkboard@2.2.0"><img src="https://img.shields.io/bundlephobia/min/%40zushah/chalkboard?color=darkgreen&logo=files&logoColor=white" alt="Minified size"></a>
    <a href="https://www.npmjs.com/package/@zushah/chalkboard"><img src="https://img.shields.io/npm/dm/%40zushah/chalkboard?logo=npm&logoColor=white" alt="npm downloads"></a>
    <a href="https://www.github.com/Zushah/Chalkboard/blob/main/LICENSE.md"><img src="https://img.shields.io/github/license/Zushah/Chalkboard?color=yellow&logo=opensourceinitiative&logoColor=white" alt="MIT License"></a>
    <a href="https://www.github.com/microsoft/TypeScript"><img src="https://img.shields.io/github/languages/top/Zushah/Chalkboard?color=blue&logo=typescript&logoColor=white" alt="Written in TypeScript"></a>
    <a href="https://www.jsdelivr.com/package/gh/Zushah/Chalkboard"><img src="https://img.shields.io/jsdelivr/gh/hm/Zushah/Chalkboard?color=crimson&logo=jsdelivr&logoColor=white" alt="jsDelivr requests"></a> 
    <br>
    <a href="https://zushah.github.io/Chalkboard">https://zushah.github.io/Chalkboard</a>
</p>

# Contents
<ol>
    <li><a href="#about">About</a></li>
    <li><a href="#installation">Installation</a></li>
    <li><a href="#documentation">Documentation</a></li>
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
    <li><a href="#contact">Contact</a></li>
</ol>

# About
The Chalkboard library is a JavaScript namespace that provides a plethora of both practical and abstract mathematical functionalities for its user. It was developed by [Zushah](https://www.github.com/Zushah) during 2022 and 2023 and then [released](https://www.github.com/Zushah/Chalkboard/releases/tag/v1.0.0) on November 6, 2023. As per the latest release of [v2.2.0 Galois](https://www.github.com/Zushah/Chalkboard/releases/tag/v2.2.0), Chalkboard has 564 unique commands. The library is available for regular JavaScript on both the client-side and the server-side as well as [Proccesing.js](https://www.processing.org/) (fully compatible with [Khan Academy](https://www.khanacademy.org/cs/chalkboard/6708642430369792)). Chalkboard's website can be visited [here](https://zushah.github.io/Chalkboard).

# Installation
If your JavaScript project is being run on the client-side within a webpage, you can install Chalkboard with this HTML tag:
```html
<script src="https://cdn.jsdelivr.net/gh/Zushah/Chalkboard@2.2.0/dist/Chalkboard.min.js"></script>
```
If your JavaScript project is being run on the server-side within the [Node.js](https://nodejs.org/en) environment, you can install Chalkboard with this console command:
```bash
npm install @zushah/chalkboard
```
Alternatively, you can simply download the [latest release](https://www.github.com/Zushah/Chalkboard/releases/tag/v2.2.0) and put the relevant files in your project's directory.

Chalkboard can also be downloaded on [Khan Academy](https://www.khanacademy.org) from the code in the corresponding [release](https://www.khanacademy.org/cs/chalkboard/6708642430369792).

# Documentation
Chalkboard has thirteen categories of commands:
- `abal` - Abstract algebra definitions, sets, operations, structures, and morphisms
- `calc` - Single/multi-variable real/complex-valued calculus operations
- `comp` - Complex number and complex function operations
- `geom` - Geometric operations
- `matr` - Multidimensional matrix operations
- `numb` - Number-theory-related operations
- `plot` - Plotting real and complex functions, complex numbers, vectors, matrices, and statistical graphs
- `quat` - Quaternion operations
- `real` - Real number and real function operations
- `stat` - Statistical array operations
- `tens` - Tensor (multidimensional multidimensional matrix) operations
- `trig` - Trigonometric function operations
- `vect` - Two-, three-, and four-dimensional vector and vector field operations

There are also eight "global" commands and constants, which are:
- `APPLY` - Applies a callback function in an element-wise manner on a Chalkboard object
- `CONTEXT` - The JavaScript canvas rendering context to use for plotting
- `E()` - Computes the number e
- `LOGO()` - Draws the Chalkboard logo
- `PARSEPREFIX` - Used for adding custom functions to the Chalkboard parser
- `PI()` - Computes the number π
- `README()` - Prints basic information about Chalkboard in the console
- `VERSION` - The installed version of Chalkboard
- `VERSIONALIAS` - The alias of the installed version of Chalkboard

Lastly, Chalkboard has eleven data types (also known as Chalkboard objects):
- `ChalkboardComplex` - Complex numbers
- `ChalkboardFunction` - Mathematical functions
- `ChalkboardMatrix` - Matrices
- `ChalkboardMorphism` - Morphisms
- `ChalkboardQuaternion` - Quaternions
- `ChalkboardSet` - Sets
- `ChalkboardStructure` - Algebraic structures
- `ChalkboardStructureExtension` - Algebraic structure extensions
- `ChalkboardTensor` - Tensors
- `ChalkboardVector` - Vectors
- `ChalkboardVectorField` - Vector fields

The comprehensive Chalkboard documentation can be visited [here](https://zushah.github.io/Chalkboard).

# Getting Started
After installing Chalkboard into your program, you can immediately get started with using it. Every Chalkboard command begins with typing "Chalkboard" followed by a period, then the name of the category of the command (all categories are listed above in the [documentation](#documentation) section) with another period, and lastly the desired command itself.
```js
Chalkboard.category.command(parameters);
```
Here is some code that shows off only a few features of Chalkboard:
```js
const cb = Chalkboard; // Initialize in a browser
const cb = require("@zushah/chalkboard"); // Initialize in Node with CommonJS
import cb from "@zushah/chalkboard"; // Initiialize in Node with ES Modules

const f = cb.real.define("Math.cos(2 * x)"); // f(x) = cos(2x)
const dfdx = cb.calc.dfdx(f, 2); // Derivative of f at x = 0
const fxdx = cb.calc.fxdx(f, 0, 2); // Antiderivative of f from x = 0 to x = 2
const fourier = cb.calc.Fourier(f, 2); // Fourier transform of f at x = 2

const f = cb.vect.field("x", "y", "z"); // f(x, y, z) = (x, y, z)
const r = cb.real.define(["Math.cos(s) * Math.cos(t)", "Math.sin(s) * Math.cos(t)", "Math.sin(t)"], "surf"); // r(s, t) = (cos(s)cos(t), sin(s)cos(t), sin(t))
const fnds = cb.calc.fnds(f, r, cb.PI(-1/2), cb.PI(1/2), 0, cb.PI(2)); // Flux of the radial vector field through the unit sphere

const primes = cb.numb.primeArr(0, 100); // Array of prime numbers between 0 and 100
const midPrime = cb.stat.median(primes); // Median number in the primes array
cb.plot.barplot(primes, cb.stat.array(0, 100, 11), {size: 5, strokeStyle: "black", fillStyle: "blue"}); // Barplot of the primes array with a bin size of 10, a scale of 2, a stroke color of black, and a fill color of blue

const z = cb.comp.init(1, 1); // z = 1 + i
const zsqsqrt = cb.comp.sqrt(cb.comp.sq(z)); // The square root of z squared equals z
const f = cb.comp.define("a*a - b*b + 1", "2*a*b"); // f(z) = z^2 + 1
cb.plot.definition(f); // Plots the domain coloring of f

const r = cb.real.define(["Math.cos(t)", "Math.sin(t)"], "curv"); // r(t) = (cos(t), sin(t))
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

const Z4 = cb.abal.Z(4); // The set of integers modulo 4 is the set {0, 1, 2, 3}
const C4 = cb.abal.C(4); // The set of fourth roots of unity is the set {1, i, -1, -i}
const G = cb.abal.group(Z4, (a, b) => (a + b) % 4); // The group G is the set Z4 with mod 4 addition
const H = cb.abal.group(C4, (z, w) => cb.comp.mul(z, w)); // The group H is the set C4 with complex multiplication
const F = cb.abal.isomorphism(G, H, (n) => cb.comp.round(cb.comp.pow(cb.comp.init(0, 1), n))); // The isomorphism F: G → H is defined by F(n) = i^n for all n in Z4
```
Several examples that are rather interesting can be seen [here](https://zushah.github.io/Chalkboard/examples/index.html), and their source code is [here](https://www.github.com/Zushah/Chalkboard/tree/main/examples).

# Contributing
<ol>
    <li>Fork Chalkboard's GitHub repository. Make sure the fork is based on the main branch.</li>
    <li>Clone the repository, download the dev dependencies with `npm install`, and then make your contributions to your fork.</li>
    <li>When you're done, commit the changes to your fork with a detailed description.</li>
    <li>Open a pull request. It will be reviewed soon and then merged to the main branch.</li>
</ol>

NOTE: If you want to change the documentation, you will also have to clone the [zushah.github.io repository](https://www.github.com/Zushah/zushah.github.io) because that's where the files are generated.

The changelog can be read [here](https://www.github.com/Zushah/Chalkboard/blob/main/CHANGELOG.md).

The Chalkboard library is available under the [MIT License](https://www.github.com/Zushah/Chalkboard/blob/main/LICENSE.md).

# Acknowledgments
Thanks to [@bhavjitChauhan](https://www.github.com/bhavjitChauhan) for his contribution ([here](https://www.github.com/Zushah/Chalkboard/pull/1)) to [v1.3.0 Heaviside](https://www.github.com/Zushah/Chalkboard/releases/tag/v1.3.0).\
Thanks to [@gyang0](https://www.github.com/gyang0) for his contributions ([here](https://www.github.com/Zushah/zushah.github.io/pull/1) and [here](https://github.com/Zushah/Chalkboard/pull/5)) to the [documentation](https://www.github.com/Zushah/zushah.github.io/tree/main/Chalkboard).\
Thanks to [@JentGent](https://www.github.com/JentGent) for his implementation ([here](https://www.github.com/JentGent/linalg/blob/main/linalg.js#L519)) for calculating QR decomposition which was [adapted](https://www.github.com/Zushah/Chalkboard/commit/1dce0dbac82b38f9a550dd496bc878c402a92442) into [v1.7.0 Descartes](https://www.github.com/Zushah/Chalkboard/releases/tag/v1.7.0).

# Contact
[GitHub](https://www.github.com/Zushah)\
[Khan Academy](https://www.khanacademy.org/profile/zushah77)
