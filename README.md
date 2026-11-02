<p align="center"><a href="https://github.com/Zushah/Chalkboard"><img src="https://raw.githubusercontent.com/Zushah/Chalkboard/main/assets/logo.png" width="50%"></a></p>
<p align="center">
    <a href="https://github.com/Zushah/Chalkboard/releases/tag/v3.1.0"><img src="https://img.shields.io/badge/release-v3.1.0_Ricci-327dc8?logo=github&logoColor=white" alt="Latest release is v3.1.0 Ricci"></a>
    <a href="https://raw.githubusercontent.com/Zushah/Chalkboard/v3.1.0/dist/Chalkboard.js"><img src="https://img.shields.io/badge/bundle-422.2_kB-327dc8?logo=javascript&logoColor=white" alt="422.2 kilobytes minified bundle size"></a>
    <a href="https://www.npmjs.com/package/@zushah/chalkboard"><img src="https://img.shields.io/npm/dm/%40zushah/chalkboard?color=327dc8&logo=npm&logoColor=white" alt="npm downloads per month"></a>
    <a href="https://www.jsdelivr.com/package/gh/Zushah/Chalkboard"><img src="https://img.shields.io/jsdelivr/gh/hm/Zushah/Chalkboard?color=327dc8&logo=jsdelivr&logoColor=white" alt="jsDelivr requests per month"></a>
    <a href="https://github.com/Zushah/Chalkboard/blob/main/LICENSE.md"><img src="https://img.shields.io/badge/license-MPL--2.0-327dc8?logo=gitbook&logoColor=white" alt="Mozilla Public License 2.0"></a>
    <br>
    <a href="https://zushah.github.io/Chalkboard">https://zushah.github.io/Chalkboard</a>
</p><br>

Chalkboard is a TypeScript library with hundreds of functions for the manifestation and manipulation of mathematical structures and systems, such as:

- defining isomorphisms between algebraic structures,
- computing the flux of vector fields over parameterized surfaces,
- simulating systems of differential equations,
- visualizing statistical regression models,
- simplifying and evaluating both real- and complex-valued expressions,
- contracting Riemann curvature tensors into Ricci tensors with Einstein summation,
- automating Karnaugh map minimizations,
- and hundreds upon hundreds of more functionalities.

It is all organized in coherent namespaces rather than isolated utilities, providing an ergonomic API for mathematical abstractions and pedagogical applications in both browser and Node environments.

## Installation

```bash
npm install @zushah/chalkboard
```
or
```html
<script src="https://cdn.jsdelivr.net/gh/Zushah/Chalkboard@3.1.0/dist/Chalkboard.min.js"></script>
```

## Documentation

The comprehensive Chalkboard documentation can be found [here](https://zushah.github.io/Chalkboard).

Chalkboard has 700 functions across fifteen namespaces:
- `abal` - Abstract algebra on sets (finite, infinite, and canonical ones like ℕ, ℤ, ℚ, ℝ, ℂ, Sₙ, Aₙ, Dₙ, and GLₙ), monoids, groups, rings, fields, and their extensions, along with morphisms, kernels, images, cosets, quotients, ideals, and Cayley tables.
- `bool` - Boolean algebra with twelve logical operators, a parser that simplifies and evaluates expressions, truth tables, Karnaugh maps, prime implicants, minimization, and conversion to conjunctive and disjunctive normal forms.
- `calc` - Numerical calculus on real and complex functions, curves, surfaces, and vector fields, from derivatives, gradients, divergence, and curl to arc lengths, line, surface, flux, and contour integrals, limits, Taylor series, Newton's method, and Fourier, Laplace, and fast Fourier transforms.
- `comp` - Complex numbers and complex-valued functions with arithmetic, polar forms, powers, roots, exponentials, logarithms, and trigonometric functions, plus a parser that expands, simplifies, and evaluates complex expressions.
- `diff` - Ordinary differential equations (single or systems) solved with five fixed-step methods or the adaptive Dormand–Prince method, with ready-made models ranging from oscillators and pendulums to Kepler orbits, Lorenz attractors, and SIR epidemics.
- `geom` - Plane and solid geometry with areas, perimeters, and volumes of common shapes, distances and midpoints, Pythagorean triples, and Euler characteristics.
- `matr` - Matrices of any size with Kronecker and Hadamard products, determinants, permanents, inverses, dominant eigenpairs, LU, QR, and Cholesky decompositions, Gaussian elimination, linear solvers, fundamental subspaces, and special matrices like rotation, Hilbert, and Lehmer matrices.
- `numb` - Number theory and numerical utilities with primes, divisors, factorizations, gcd and lcm, Euler's totient, Fibonacci numbers, combinatorics, random distributions, base conversions, and unit conversions.
- `plot` - Canvas plotting of real functions, complex functions (with domain coloring), derivatives, integrals, transforms, Taylor series, vector fields, matrices, ODE solutions and phase portraits, and statistical bar, line, and scatter plots.
- `quat` - Quaternions with arithmetic, conjugates, inverses, and normalization, axis-angle construction for rotating 3D vectors, and conversions to 4x4 real matrices, vectors, and arrays.
- `real` - Real-valued functions of every form (scalar functions, curves, surfaces, and vector fields) with function arithmetic and composition, special functions like the gamma and error functions, and a parser that expands, simplifies, evaluates, and renders expressions as LaTeX.
- `stat` - Statistics on arrays covering descriptive measures, moments, quantiles, cumulative operations, correlation and covariance, regression models, chi-squared tests, confidence intervals, interpolation, and resampling.
- `tens` - Tensors of any rank with broadcasting, outer, Hadamard, and contracted products, Einstein summation, Kronecker delta and Levi-Civita tensors, (anti)symmetrization, axis permutations, slicing, and reductions.
- `trig` - Trigonometric and hyperbolic functions with all of their inverses, angle conversions, and coterminal angles.
- `vect` - Two-, three-, and four-dimensional vectors and vector fields with dot, cross, and triple products, projections, reflections, refractions, coordinate-system conversions, and configurable input/output modes.

There are also nine root members, which are:
- `APPLY` - Applies a callback function in an elementwise manner on a Chalkboard object
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

Here are snippets of code that show off only a few features of Chalkboard, but you can find more interesting ones on the [website](https://zushah.github.io/Chalkboard/examples):
```js
const cb = Chalkboard; // Initialize in a browser
import cb from "@zushah/chalkboard"; // Initialize in Node

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

const g = cb.tens.identity(3); // g is the metric δᵢⱼ (the Kronecker delta) of an orthonormal frame in 3D
const gg = cb.tens.mul(g, g); // gg is the outer product gᵢⱼgₖₗ, a 3x3x3x3 rank-4 tensor
const Rijkl = cb.tens.sub(cb.tens.permute(gg, 0, 2, 1, 3), cb.tens.permute(gg, 0, 2, 3, 1)); // Rijkl is the Riemann curvature tensor Rᵢⱼₖₗ = gᵢₖgⱼₗ - gᵢₗgⱼₖ of the unit 3-sphere
const Rjl = cb.tens.contract(Rijkl, 0, 2); // Rjl is the Ricci tensor Rⱼₗ = Rⁱⱼᵢₗ, which equals 2gⱼₗ
const curve = cb.tens.einsum("ijij", Rijkl); // curve is the scalar curvature, which equals 6
const isAnti = cb.tens.isAntisymmetric(Rijkl, 0, 1); // Returns true since swapping the first two indices of Rijkl flips its sign
cb.tens.print(Rjl); // Prints Rjl in the console

const eps = cb.tens.LeviCivita(3); // eps is the Levi-Civita symbol εᵢⱼₖ
const axb = cb.tens.einsum("ijk,j,k->i", eps, [1, 2, 3], [4, 5, 6]); // Cross product (a × b)ᵢ = εᵢⱼₖaⱼbₖ, which returns [-3, 6, -3]

const X = cb.tens.init([1, 2], [3, 4], [5, 9]); // X is a data matrix of three samples of two features
const Xc = cb.tens.sub(X, cb.tens.mean(X, 0)); // Xc is X with its column means subtracted via broadcasting
const cov = cb.tens.scl(cb.tens.einsum("ni,nj->ij", Xc, Xc), 1 / 3); // cov is the 2x2 covariance matrix of X

const m = cb.numb.convert(1500, "mm", "m"); // Length conversion
const sqmi = cb.numb.convert(1000000, "m2", "mi2"); // Area conversion
const kg = cb.numb.convert(5000, "g", "kg"); // Mass conversion
const ml = cb.numb.convert(3, "gal", "mL"); // Volume conversion
const pa = cb.numb.convert(1, "atm", "Pa"); // Pressure conversion
const ns = cb.numb.convert(2, "hr", "ns"); // Time conversion
const k = cb.numb.convert(98.6, "F", "K"); // Temperature conversion
```

## Contributing

Asking questions, reporting bugs, suggesting features, and contributing code is very welcome. The guidelines can be found [here](https://github.com/Zushah/Chalkboard/blob/main/CONTRIBUTING.md).

## Acknowledgments

- [@Zushah](https://github.com/Zushah): main author.
- [@gyang0](https://github.com/gyang0): examples for plotting docs ([#1](https://github.com/Zushah/zushah.github.io/pull/1)) in [v1.4.0 Herschel](https://github.com/Zushah/Chalkboard/releases/tag/v1.4.0) and examples for geometry docs ([#5](https://github.com/Zushah/Chalkboard/pull/5)) in [v2.2.0 Galois](https://github.com/Zushah/Chalkboard/releases/tag/v2.2.0).
- [@bhavjitChauhan](https://github.com/bhavjitChauhan): partial pivoting in matrix inversion ([#1](https://github.com/Zushah/Chalkboard/pull/1)) in [v1.3.0 Heaviside](https://github.com/Zushah/Chalkboard/releases/tag/v1.3.0).
- [@JentGent](https://github.com/JentGent): QR decomposition ([1dce0db](https://github.com/Zushah/Chalkboard/commit/1dce0dbac82b38f9a550dd496bc878c402a92442)) in [v1.7.0 Descartes](https:/github.com/Zushah/Chalkboard/releases/tag/v1.7.0).

## License

Chalkboard is available under the [Mozilla Public License 2.0](https://github.com/Zushah/Chalkboard/blob/main/LICENSE.md).
