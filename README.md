<p align="center"><a href="https://www.github.com/Zushah/Chalkboard"><img src="./src/logo.png" width="50%"></a></p>
<p align="center">
    <a href="https://www.github.com/Zushah/Chalkboard/releases/tag/v1.3.0" target="_blank"><img src="https://img.shields.io/github/v/release/Zushah/Chalkboard" alt="Latest release"></a>
    <a href="https://www.codefactor.io/repository/github/zushah/chalkboard" target="_blank"><img src="https://www.codefactor.io/repository/github/zushah/chalkboard/badge" alt="CodeFactor grade"></a>
    <a href="https://www.github.com/Zushah/Chalkboard/commits" target="_blank"><img src="https://img.shields.io/github/last-commit/Zushah/Chalkboard" alt="Last commit"></a>
    <a href="https://github.com/Zushah/Chalkboard/blob/main/LICENSE" target="_blank"><img src="https://img.shields.io/badge/license-MIT-yellow" alt="Minified size"></a>
    <a href="https://www.jsdelivr.com/package/gh/Zushah/Chalkboard?path=build" target="_blank"><img src="https://data.jsdelivr.com/v1/package/gh/Zushah/Chalkboard/badge" alt="JSDelivr traffic"></a>
    <br>
    <a href="https://zushah.github.io/Chalkboard/home.html" target="_blank">https://zushah.github.io/Chalkboard/home.html</a>
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
The Chalkboard library is a JavaScript namespace that provides a plethora of both practical and abstract mathematical functionalities for its user. It was developed by [Zushah](https://www.github.com/Zushah) during 2022 and 2023 and then [released](https://github.com/Zushah/Chalkboard/releases/tag/v1.0.0) on November 6, 2023. As per the latest release of [v1.3.0](https://www.github.com/Zushah/Chalkboard/releases/tag/v1.3.0), Chalkboard has 380 different commands. The library is available for regular JavaScript as well as [Proccesing.js](https://www.processing.org/) (fully compatible with [Khan Academy](https://www.khanacademy.org/cs/chalkboard/6708642430369792)). Chalkboard's website can be visited [here](https://zushah.github.io/Chalkboard/home.html).

# Installation
If your JavaScript project is being run within an HTML webpage, you can import the latest version of the Chalkboard library into it with this line:
```html
<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/Zushah/Chalkboard@1.3.0/src/Chalkboard.min.js"></script>
```
Alternatively, you can simply download the [latest release](https://www.github.com/Zushah/Chalkboard/releases/tag/v1.3.0) and put the relevant files in your project's directory.

More methods and details about installing Chalkboard can be read [here](https://zushah.github.io/Chalkboard/installation.html).

# Documentation
These are all thirteen Chalkboard categories with a brief description of what they're mostly about, and listed in the order they appear in the source code:
- `numb` - Number-theory-related operations
- `real` - Real-valued function operations
- `comp` - Complex number operations
- `quat` - Quaternion operations
- `plot` - Plotting functions and function operations
- `geom` - Geometric formulae operations
- `trig` - Trigonometric function operations
- `stat` - Statistical array operations
- `vec2` - Two-dimensional vector operations
- `vec3` - Three-dimensional vector operations
- `vec4` - Four-dimensional vector operations
- `matr` - Multidimensional matrix operations
- `calc` - Single- and multi-variable calculus operations

There are also four "global" commands in Chalkboard, which are:
- `README()` - Prints basic information about Chalkboard in the console
- `LOGO()` - Draws the Chalkboard logo
- `PI()` - Computes the number pi
- `E()` - Computes the number e

The comprehensive Chalkboard documentation can be visited [here](https://zushah.github.io/Chalkboard/documentation.html).

# Getting Started
After installing Chalkboard into your program, you can immediately get started with using it. Every Chalkboard command begins with typing "Chalkboard" followed by a period, then the name of the category of the command (all categories are listed above in the [documentation](#documentation) section) with another period, and lastly the desired command itself.
```js
Chalkboard.category.command(params);
```
Here is some code that shows off only a few basic features of Chalkboard:
```js
const cb = Chalkboard; // Chalkboard is a nice name but it's also long

let f = cb.real.function("Math.cos(2 * x)"); // f(x) = cos(2x)
let dfdx = cb.calc.dfdx(f, 2); // Derivative of f at x = 0
let fxdx = cb.calc.fxdx(f, 0, 2); // Antiderivative of f from x = 0 to x = 2
let fourier = cb.calc.Fourier(f, 2); // Fourier transform of f at x = 2

let f = cb.vec3.field("x", "y", "z"); // f(x, y, z) = (x, y, z)
let r = cb.real.function(["Math.cos(s) * Math.cos(t)", "Math.sin(s) * Math.cos(t)", "Math.sin(t)"], "surf"); // r(s, t) = (cos(s)cos(t), sin(s)cos(t), sin(t))
let fnds = cb.calc.fnds(f, r, cb.PI(-1/2), cb.PI(1/2), 0, cb.PI(2)); // Flux of the radial vector field through the unit sphere

let primes = cb.numb.primeArr(0, 100); // Array of prime numbers between 0 and 100
let midPrime = cb.stat.median(primes); // Median number in the primes array

let z = cb.comp.new(1, 1); // z = 1 + i
let zsqsqrt = cb.comp.sqrt(cb.comp.sq(z)); // sqrt(z^2) = z

let r = cb.real.function(["Math.cos(t)", "Math.sin(t)"], "curv"); // r(t) = (cos(t), sin(t))
cb.plot.xyplane(2); // Draws the Cartesian coordinate plane
cb.plot.function(r, 2, [0, cb.PI(1/2)]); // Plots r(t) from t = 0 to t = π/2

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
More examples (which are more interesting) can be seen [here](https://zushah.github.io/Chalkboard/examples.html) with their source code [here](https://github.com/Zushah/Chalkboard/tree/main/examples).

# Contributing
<ol>
    <li>Clone or fork Chalkboard's GitHub repository.</li>
    <li>If you cloned the repository, pull the latest code and make a new branch based on the main branch. If you forked it, then just make sure it's based on the main branch.</li>
    <li>Make your contributions to your branch or fork.</li>
    <li>If you're adding new features or modifying the functionalities of old ones, please make sure you do the same for both editions (JavaScript and Processing.js) of the library.</li>
    <li>When you're done, commit the changes to your branch or fork with a detailed description.</li>
    <li>Publish your branch or fork to GitHub.</li>
    <li>Open a pull request. It will be reviewed soon and then merged to the main branch.</li>
</ol>

The Chalkboard library is available under the [MIT License](https://www.opensource.org/license/mit/) which can be viewed [here](https://github.com/Zushah/Chalkboard/blob/main/LICENSE).

# Acknowledgements
Thanks to [Bhavjit Chauhan](https://github.com/bhavjitChauhan) for his [contribution](https://github.com/Zushah/Chalkboard/commit/d3f0a82f0c2b1351f391908ef2d6f78403881259) to [v1.3.0](https://www.github.com/Zushah/Chalkboard/releases/tag/v1.3.0).

# Contact
[GitHub](https://www.github.com/Zushah)\
[Khan Academy](https://www.khanacademy.org/profile/zushah77)
