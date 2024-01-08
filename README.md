<p align="center"><a href="https://www.github.com/Zushah/Chalkboard"><img src="https://raw.githubusercontent.com/Zushah/Chalkboard/main/assets/Chalkboard-logo.png" width="50%"></a></p>
<p align="center">
    <a href="https://www.github.com/Zushah/Chalkboard/releases/tag/v2.0.0"><img src="https://img.shields.io/badge/release-v2.0.0_al--Khwarizmi-blueviolet?logo=github&logoColor=white" alt="Latest release"></a>
    <a href="https://www.codefactor.io/repository/github/zushah/chalkboard"><img src="https://img.shields.io/codefactor/grade/github/Zushah/Chalkboard?color=blue&logo=codefactor&logoColor=white" alt="CodeFactor grade"></a>
    <a href="https://bundlephobia.com/package/@zushah/chalkboard@2.0.0"><img src="https://img.shields.io/bundlephobia/min/%40zushah/chalkboard?color=darkgreen&logo=files&logoColor=white" alt="Minified size"></a>
    <a href="https://www.npmjs.com/package/@zushah/chalkboard"><img src="https://img.shields.io/npm/dm/%40zushah/chalkboard?logo=npm&logoColor=white" alt="npm downloads"></a>
    <a href="https://www.github.com/Zushah/Chalkboard/blob/main/LICENSE.md"><img src="https://img.shields.io/github/license/Zushah/Chalkboard?color=yellow&logo=opensourceinitiative&logoColor=white" alt="MIT License"></a>
    <a href="https://en.wikipedia.org/wiki/TypeScript"><img src="https://img.shields.io/github/languages/top/Zushah/Chalkboard?color=orange&logo=typescript&logoColor=white" alt="Written in TypeScript"></a>
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
The Chalkboard library is a JavaScript namespace that provides a plethora of both practical and abstract mathematical functionalities for its user. It was developed by [Zushah](https://www.github.com/Zushah) during 2022 and 2023 and then [released](https://www.github.com/Zushah/Chalkboard/releases/tag/v1.0.0) on November 6, 2023. As per the latest release of [v2.0.0 al-Khwarizmi](https://www.github.com/Zushah/Chalkboard/releases/tag/v2.0.0), Chalkboard has 410 different commands. The library is available for regular JavaScript on both the client-side and the server-side as well as [Proccesing.js](https://www.processing.org/) (fully compatible with [Khan Academy](https://www.khanacademy.org/cs/chalkboard/6708642430369792)). Chalkboard's website can be visited [here](https://zushah.github.io/Chalkboard).

# Installation
If your JavaScript project is being run on the client-side within a webpage, you can install Chalkboard with this HTML tag:
```html
<script src="https://cdn.jsdelivr.net/gh/Zushah/Chalkboard@2.0.0/dist/Chalkboard.min.js"></script>
```
If your JavaScript project is being run on the server-side within the [Node.js](https://nodejs.org/en) environment, you can install Chalkboard with this console command:
```bash
npm install @zushah/chalkboard
```
Alternatively, you can simply download the [latest release](https://www.github.com/Zushah/Chalkboard/releases/tag/v2.0.0) and put the relevant files in your project's directory.

Chalkboard can also be downloaded on [Khan Academy](https://www.khanacademy.org) from the code in the corresponding [release](https://www.khanacademy.org/cs/chalkboard/6708642430369792).

# Documentation
Chalkboard has twelve categories of commands:
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

Lastly, Chalkboard has seven data types (also known as Chalkboard objects):
- `ChalkboardComplex` - Complex numbers
- `ChalkboardFunction` - Mathematical functions
- `ChalkboardMatrix` - Matrices
- `ChalkboardQuaternion` - Quaternions
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
// or
const cb = require("@zushah/chalkboard"); // Initialize in Node with CommonJS
// or
import cb from "@zushah/chalkboard"; // Initiialize in Node with ES Modules

let f = cb.real.define("Math.cos(2 * x)"); // f(x) = cos(2x)
let dfdx = cb.calc.dfdx(f, 2); // Derivative of f at x = 0
let fxdx = cb.calc.fxdx(f, 0, 2); // Antiderivative of f from x = 0 to x = 2
let fourier = cb.calc.Fourier(f, 2); // Fourier transform of f at x = 2

let f = cb.vec3.field("x", "y", "z"); // f(x, y, z) = (x, y, z)
let r = cb.real.define(["Math.cos(s) * Math.cos(t)", "Math.sin(s) * Math.cos(t)", "Math.sin(t)"], "surf"); // r(s, t) = (cos(s)cos(t), sin(s)cos(t), sin(t))
let fnds = cb.calc.fnds(f, r, cb.PI(-1/2), cb.PI(1/2), 0, cb.PI(2)); // Flux of the radial vector field through the unit sphere

let primes = cb.numb.primeArr(0, 100); // Array of prime numbers between 0 and 100
let midPrime = cb.stat.median(primes); // Median number in the primes array
cb.plot.barplot(primes, cb.stat.array(0, 100, 11), {size: 5, strokeStyle: "black", fillStyle: "blue"}); // Barplot of the primes array with a bin size of 10, a scale of 2, a stroke color of black, and a fill color of blue

let z = cb.comp.init(1, 1); // z = 1 + i
let zsqsqrt = cb.comp.sqrt(cb.comp.sq(z)); // The square root of z squared equals z
let f = cb.comp.define("a*a - b*b + 1", "2*a*b"); // f(z) = z^2 + 1
cb.plot.definition(f); // Plots the domain coloring of f

let r = cb.real.define(["Math.cos(t)", "Math.sin(t)"], "curv"); // r(t) = (cos(t), sin(t))
cb.plot.xyplane({size: 2}); // Draws the Cartesian coordinate plane scaled by 2
cb.plot.definition(r, {size: 2, strokeStyle: "rgb(255, 100, 100)", domain: [0, cb.PI(2)]}); // Plots r(t) scaled by 2 colored light red from t = 0 to t = π/2

let a = cb.vect.init(1, 2, 3); // Vector a = (1, 2, 3)
let b = cb.vect.init(4, 5, 6); // Vector b = (4, 5, 6)
let c = cb.vect.init(7, 8, 9); // Vector c = (7, 8, 9)
let axbxc = cb.vect.vectorTriple(a, b, c); // Triple cross product between a, b, and c
cb.vect.print(axbxc); // Prints axbxc in the console

let m = cb.matr.init( // m is a 5x5 matrix
    [0, 1, 1, 1, 1],
    [1, 0, 1, 1, 1],
    [1, 1, 0, 1, 1],
    [1, 1, 1, 0, 1],
    [1, 1, 1, 1, 0]
);
let mi = cb.matr.invert(m); // mi is the inverse of m
let mmi = cb.matr.mul(m, mi); // mmi is the product of m and mi
cb.matr.print(mmi); // Prints mmi in the console

let t = cb.tens.init( // t is a 2x2x2 rank-3 tensor
    [
        [1, 2],
        [3, 4]
    ],
    [
        [5, 6],
        [7, 8]
    ]
);
let tt = cb.tens.mul(t, t); // tt is a 2x2x2x2x2x2 rank-6 tensor
let ttm = cb.tens.resize(tt, 8, 8); // ttm is an 8x8 matrix (or rank-2 tensor)
cb.tens.print(tt); // Prints tt in the console just to see what it looks like for fun

// Takes the factorial of each element of t
let factorialt = cb.APPLY(t, (x) => {
    return cb.numb.factorial(x);
});
```
More examples that are more interesting can be seen [here](https://zushah.github.io/Chalkboard/examples/index.html) with their source code [here](https://www.github.com/Zushah/Chalkboard/tree/main/examples).

# Contributing
<ol>
    <li>Fork Chalkboard's GitHub repository. Make sure the fork is based on the main branch.</li>
    <li>Clone the repository, download the dependencies with `npm install`, and then make your contributions to your fork.</li>
    <li>When you're done, commit the changes to your fork with a detailed description.</li>
    <li>Open a pull request. It will be reviewed soon and then merged to the main branch.</li>
</ol>

NOTE: If you want to change the documentation, you will also have to clone the [zushah.github.io repository](https://www.github.com/Zushah/zushah.github.io) because that's where the files are generated.

The changelog can be read [here](https://www.github.com/Zushah/Chalkboard/blob/main/CHANGELOG.md).

The Chalkboard library is available under the [MIT License](https://www.github.com/Zushah/Chalkboard/blob/main/LICENSE.md).

# Acknowledgments
Thanks to [@bhavjitChauhan](https://www.github.com/bhavjitChauhan) for his [contribution](https://www.github.com/Zushah/Chalkboard/pull/1) to [v1.3.0 Heaviside](https://www.github.com/Zushah/Chalkboard/releases/tag/v1.3.0).\
Thanks to [@gyang0](https://www.github.com/gyang0) for his [contribution](https://www.github.com/Zushah/zushah.github.io/pull/1) to the [documentation](https://www.github.com/Zushah/zushah.github.io/tree/main/Chalkboard).\
Thanks to [@JentGent](https://www.github.com/JentGent) for his [implementation](https://www.github.com/JentGent/linalg/blob/main/linalg.js#L519) for calculating QR decomposition which was [adapted](https://www.github.com/Zushah/Chalkboard/commit/1dce0dbac82b38f9a550dd496bc878c402a92442) into [v1.7.0 Descartes](https://www.github.com/Zushah/Chalkboard/releases/tag/v1.7.0).

# Contact
[GitHub](https://www.github.com/Zushah)\
[Khan Academy](https://www.khanacademy.org/profile/zushah77)
