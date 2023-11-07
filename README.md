<p align="center"><a href="https://www.github.com/Zushah/Chalkboard"><img src="./src/logo.png" width="50%"></a></p>
<p align="center">
    <a href="https://www.github.com/Zushah/Chalkboard/releases/tag/v1.0.0"><img src="https://img.shields.io/github/v/release/Zushah/Chalkboard" alt="Latest release"></a>
    <a href="https://www.github.com/Zushah/Chalkboard/commits"><img src="https://img.shields.io/github/last-commit/Zushah/Chalkboard" alt="Last commit"></a>
    <a href="https://www.jsdelivr.com/package/gh/Zushah/Chalkboard?path=build"><img src="https://data.jsdelivr.com/v1/package/gh/Zushah/Chalkboard/badge" alt="jsDelivr traffic"></a>
    <br>
    <a href="https://zushah.github.io/Chalkboard/home.html">https://zushah.github.io/Chalkboard/home.html</a>
</p>

# Contents
<ol>
    <li><a href="#about">About</a></li>
    <li><a href="#installation">Installation</a></li>
    <li><a href="#documentation">Documentation</a></li>
    <li><a href="#example">Example</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
</ol>

# About
The Chalkboard library is a JavaScript namespace that provides a plethora of both practical and abstract mathematical functionalities for its user. It was created by [Zushah](https://www.github.com/Zushah) during 2022 and 2023. As of [version 1.0.0](https://www.github.com/Zushah/Chalkboard/releases/tag/v1.0.0), Chalkboard has 324 different commands. The library is not only available for standard JavaScript but also for [Proccesing.js](https://www.processing.org/) (compatible with the [Khan Academy editor](https://www.khanacademy.org/computer-programming/new/pjs)), as well. Chalkboard's website can be visited [here](https://zushah.github.io/Chalkboard/home.html).

# Installation
If your JavaScript project is being run within an HTML page, you can import the Chalkboard library to it with this line:
```html
<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/Zushah/Chalkboard@1.0.0/src/Chalkboard.min.js"></script>
```
Alternatively, you can simply download the [latest release](https://www.github.com/Zushah/Chalkboard/releases/tag/v1.0.0) and put the relevant files in your project's directory.

More methods and details about installing Chalkboard can be read [here](https://zushah.github.io/Chalkboard/installation.html).

# Documentation
These are all thirteen Chalkboard categories with a brief description of what they're mostly about, listed in the order they appear in the source code:
- `numb` - Number-theory-related operations
- `real` - Real-valued operations and functions
- `comp` - Complex numbers and their operations
- `quat` - Quaternions and their operations
- `plot` - Plotting real-valued functions
- `geom` - Geometric operations
- `trig` - All 24 trigonometric functions
- `stat` - Statistical operations
- `vec2` - Two-dimensional vectors and their operations
- `vec3` - Three-dimensional vectors and their operations
- `vec4` - Four-dimensional vectors and their operations
- `matr` - Several-dimensional matrices and their operations
- `calc` - Calculus and advanced mathematical operations in general

There are also four "global" commands in Chalkboard, which are:
- `README()` - Prints basic information about Chalkboard in the console
- `LOGO()` - Draws the Chalkboard logo
- `PI()` - Computes pi
- `E()` - Computes e

The comprehensive Chalkboard documentation can be visited [here](https://zushah.github.io/Chalkboard/documentation.html).

# Example
Every Chalkboard command first starts with typing "Chalkboard" followed by a period, then the name of the category of the command (all categories are listed above in the [documentation](#documentation) section) with another period, and lastly the desired command itself.
```js
Chalkboard.category.command(params);
```
Here is some code that shows off only a few basic features of Chalkboard:
```js
const cb = Chalkboard; // Chalkboard is a nice name but it's also long

let f = cb.real.function("Math.cos(2 * x)"); // f(x) = cos(2x)
let Ff = cb.calc.Fourier(f, 2); // The Fourier transform of f at x = 2

let primes = cb.numb.primeArr(0, 100); // Array of prime numbers between 0 and 100
let midPrime = cb.stat.median(primes); // Median number in the primes array

let z = cb.comp.new(1, 1); // z = 1 + i
let zsqsqrt = cb.comp.sqrt(cb.comp.sq(z)); // sqrt(z^2) = z

let r = cb.real.function(["Math.cos(t)", "Math.sin(t)"], "para"); // r(t) = (cos(t), sin(t))
cb.plot.xyplane(2); // Draws the Cartesian coordinate plane
cb.plot.function(r, 2, [0, cb.PI(1/2)]); // Draws r(t) from t = 0 to t = π/2

let a = cb.vec3.new(1, 2, 3); // Vector a = (1, 2, 3)
let b = cb.vec3.new(4, 5, 6); // Vector b = (4, 5, 6)
let c = cb.vec3.new(7, 8, 9); // Vector c = (7, 8, 9)
let axbxc = cb.vec3.vectorTriple(a, b, c); // Triple cross product between a, b, and c
cb.vec3.print(axbxc); // Prints the vector axbxc in the console

let A = cb.matr.new([0, 1, 1],  // A is a 3x3 matrix
                    [1, 0, 1],
                    [1, 1, 0]);
let Ai = cb.matr.invert(A); // Ai is the inverse of A
let AAi = cb.matr.mul(A, Ai); // AAi is the product of A and Ai
cb.matr.print(AAi); // Prints AAi in the console
```
More examples that are more interesting can be viewed [here](https://zushah.github.io/Chalkboard/examples.html).

# Contributing
<ol>
    <li>Clone Chalkboard's GitHub repository onto your PC.</li>
    <li>Pull the latest code from the repository and make a new branch based on the main branch. It is recommended to use a Git client such as GitHub Desktop.</li>
    <li>Find the folder on your PC where the repository has been cloned to and make your contributions.</li>
    <li>If you're adding new features or modifying the functionalities of old ones, please make sure you do the same for both editions (JavaScript and Processing.js) of the library.</li>
    <li>When you're done, commit the changes to your branch with a detailed description.</li>
    <li>Publish your branch to GitHub.</li>
    <li>Open a pull request. It will be reviewed soon and then merged to the main branch.</li>
</ol>

# License
The Chalkboard library is available under the [MIT License](https://www.opensource.org/license/mit/).

# Contact
[GitHub](https://www.github.com/Zushah)\
[Khan Academy](https://www.khanacademy.org/profile/zushah77)
