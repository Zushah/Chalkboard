<p align="center"><a href="https://www.github.com/Zushah/Chalkboard"><img src="./assets/Chalkboard-logo.png" width="50%"></a></p>
<p align="center">
    <a href="https://www.github.com/Zushah/Chalkboard/releases/tag/v1.5.0"><img src="https://img.shields.io/github/v/release/Zushah/Chalkboard" alt="Latest release"></a>
    <a href="https://www.codefactor.io/repository/github/zushah/chalkboard"><img src="https://www.codefactor.io/repository/github/zushah/chalkboard/badge" alt="CodeFactor grade"></a>
    <a href="https://www.npmjs.com/package/@zushah/chalkboard"><img src="https://img.shields.io/badge/node-v20.10.0-limegreen" alt="Node.js support"></a>
    <a href="https://github.com/Zushah/Chalkboard/blob/main/LICENSE.md"><img src="https://img.shields.io/badge/license-MIT-yellow" alt="MIT License"></a>
    <a href="https://www.jsdelivr.com/package/gh/Zushah/Chalkboard"><img src="https://data.jsdelivr.com/v1/package/gh/Zushah/Chalkboard/badge" alt="JSDelivr requests"></a> 
    <br>
    <a href="https://zushah.github.io/Chalkboard/home.html">https://zushah.github.io/Chalkboard/home.html</a>
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
The Chalkboard library is a JavaScript namespace that provides a plethora of both practical and abstract mathematical functionalities for its user. It was developed by [Zushah](https://www.github.com/Zushah) during 2022 and 2023 and then [released](https://github.com/Zushah/Chalkboard/releases/tag/v1.0.0) on November 6, 2023. As per the latest release of [v1.5.0](https://www.github.com/Zushah/Chalkboard/releases/tag/v1.5.0), Chalkboard has 431 different commands. The library is available for regular JavaScript on both the client-side and the server-side as well as [Proccesing.js](https://www.processing.org/) (fully compatible with [Khan Academy](https://www.khanacademy.org/cs/chalkboard/6708642430369792)). Chalkboard's website can be visited [here](https://zushah.github.io/Chalkboard/home.html).

# Installation
If your JavaScript project is being run on the client-side within a webpage, you can install Chalkboard with this HTML tag:
```html
<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/Zushah/Chalkboard@1.5.0/src/Chalkboard.min.js"></script>
```
If your JavaScript project is being run on the server-side within the [Node.js](https://nodejs.org/en) environment, you can install Chalkboard with this console command:
```bash
npm install @zushah/chalkboard@1.5.0
```
Alternatively, you can simply download the [latest release](https://www.github.com/Zushah/Chalkboard/releases/tag/v1.5.0) and put the relevant files in your project's directory.

More methods and details about installing Chalkboard can be read [here](https://zushah.github.io/Chalkboard/installation.html).

# Documentation
These are all thirteen Chalkboard categories with a brief description of what they're mostly about, and listed in the order they appear in the source code:
- `numb` - Number-theory-related operations
- `real` - Real number and real function operations
- `comp` - Complex number and complex function operations
- `quat` - Quaternion operations
- `plot` - Plotting functions, complex numbers, vectors, matrices, and statistical graphs
- `geom` - Geometric formulae operations
- `trig` - Trigonometric function operations
- `stat` - Statistical array operations
- `vec2` - Two-dimensional vector operations
- `vec3` - Three-dimensional vector operations
- `vec4` - Four-dimensional vector operations
- `matr` - Multidimensional matrix operations
- `calc` - Several-variable calculus operations

There are also four "global" commands in Chalkboard, which are:
- `README()` - Prints basic information about Chalkboard in the console
- `LOGO()` - Draws the Chalkboard logo
- `PI()` - Computes the number pi
- `E()` - Computes the number e

The comprehensive Chalkboard documentation can be visited [here](https://zushah.github.io/Chalkboard/documentation.html).

# Getting Started
After installing Chalkboard into your program, you can immediately get started with using it. Every Chalkboard command begins with typing "Chalkboard" followed by a period, then the name of the category of the command (all categories are listed above in the [documentation](#documentation) section) with another period, and lastly the desired command itself.
```js
Chalkboard.category.command(parameters);
```
Here is some code that shows off only a few features of Chalkboard:
```js
const cb = Chalkboard; // Chalkboard is a nice name but it's also long
/*
Note that this code is written on the client-side
You can write all the same code on the server-side, too, but you would have to replace the line above with:
const cb = require("@zushah/chalkboard@1.5.0");
*/

let f = cb.real.function("Math.cos(2 * x)"); // f(x) = cos(2x)
let dfdx = cb.calc.dfdx(f, 2); // Derivative of f at x = 0
let fxdx = cb.calc.fxdx(f, 0, 2); // Antiderivative of f from x = 0 to x = 2
let fourier = cb.calc.Fourier(f, 2); // Fourier transform of f at x = 2

let f = cb.vec3.field("x", "y", "z"); // f(x, y, z) = (x, y, z)
let r = cb.real.function(["Math.cos(s) * Math.cos(t)", "Math.sin(s) * Math.cos(t)", "Math.sin(t)"], "surf"); // r(s, t) = (cos(s)cos(t), sin(s)cos(t), sin(t))
let fnds = cb.calc.fnds(f, r, cb.PI(-1/2), cb.PI(1/2), 0, cb.PI(2)); // Flux of the radial vector field through the unit sphere

let primes = cb.numb.primeArr(0, 100); // Array of prime numbers between 0 and 100
let midPrime = cb.stat.median(primes); // Median number in the primes array
cb.plot.barplot(primes, cb.stat.array(0, 100, 11), 5, [[0, 0, 0], [0, 0, 255]]); // Barplot of the primes array with a bin size of 10, a scale of 2, a stroke color of black, and a fill color of blue

let z = cb.comp.new(1, 1); // z = 1 + i
let zsqsqrt = cb.comp.sqrt(cb.comp.sq(z)); // The square root of z squared equals z
let f = cb.comp.function("a*a - b*b + 1", "2*a*b"); // f(z) = z^2 + 1 for z = a + bi (a complex-valued function)
cb.plot.function(f); // Plots the domain coloring of f

let r = cb.real.function(["Math.cos(t)", "Math.sin(t)"], "curv"); // r(t) = (cos(t), sin(t))
cb.plot.xyplane(2); // Draws the Cartesian coordinate plane
cb.plot.function(r, 2, [255, 0, 0] [0, cb.PI(1/2)]); // Plots r(t) colored red from t = 0 to t = π/2

let a = cb.vec3.new(1, 2, 3); // Vector a = (1, 2, 3)
let b = cb.vec3.new(4, 5, 6); // Vector b = (4, 5, 6)
let c = cb.vec3.new(7, 8, 9); // Vector c = (7, 8, 9)
let axbxc = cb.vec3.vectorTriple(a, b, c); // Triple cross product between a, b, and c
cb.vec3.print(axbxc); // Prints axbxc in the console

let m = cb.matr.new([0, 1, 1, 1, 1],  // m is a 5x5 matrix
                    [1, 0, 1, 1, 1],
                    [1, 1, 0, 1, 1],
                    [1, 1, 1, 0, 1],
                    [1, 1, 1, 1, 0]);
let mi = cb.matr.invert(m); // mi is the inverse of m
let mmi = cb.matr.mul(m, mi); // mmi is the product of m and mi
cb.matr.print(mmi); // Prints mmi in the console
```
More examples that are more interesting can be seen [here](https://zushah.github.io/Chalkboard/examples.html) with their source code [here](https://github.com/Zushah/Chalkboard/tree/main/examples).

# Contributing
<ol>
    <li>Fork Chalkboard's GitHub repository. Make sure the fork is based on the main branch.</li>
    <li>Make your contributions to your fork. If you're adding new features or modifying the functionalities of old ones, please make sure you do the same for both editions (JavaScript and Processing.js) of the library.</li>
    <li>When you're done, commit the changes to your fork with a detailed description.</li>
    <li>Open a pull request. It will be reviewed soon and then merged to the main branch.</li>
</ol>

The changelog can be read [here](https://github.com/Zushah/Chalkboard/blob/main/CHANGELOG.md).

The Chalkboard library is available under the [MIT License](https://github.com/Zushah/Chalkboard/blob/main/LICENSE.md).

# Acknowledgements
Thanks to [Bhavjit Chauhan](https://github.com/bhavjitChauhan) for his [contribution](https://www.github.com/Zushah/Chalkboard/pull/1) to [v1.3.0](https://www.github.com/Zushah/Chalkboard/releases/tag/v1.3.0).\
Thanks to [G. Yang](https://www.github.com/gyang0) for his [contribution](https://www.github.com/Zushah/zushah.github.io/pull/1) to the [documentation](https://www.github.com/Zushah/zushah.github.io/tree/main/Chalkboard).

# Contact
[GitHub](https://www.github.com/Zushah)\
[Khan Academy](https://www.khanacademy.org/profile/zushah77)
