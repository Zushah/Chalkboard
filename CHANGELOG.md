# Chalkboard changelog
All notable changes of every update of Chalkboard are recorded in this file.

## [v3.0.1 Euler](https://www.github.com/Zushah/Chalkboard/releases/tag/v3.0.1) - 03/09/2026
The sixteenth release of Chalkboard.
Commits: [`v3.0.0...v3.0.1`](https://www.github.com/Zushah/Chalkboard/compare/v3.0.0...v3.0.1)
- Changed both `calc.fxdx` (5829.1ms → 0.7ms for a thousand calls) and `calc.fxydxdy` (495242.4ms → 2.1ms for a thousand calls) to be over 99.99% faster by using the adaptive-step Simpson's method instead of the fixed-step Simpson's/Riemann's method.
- Changed `real.ln` to be about 99.91% faster (911.5ms → 0.8ms for a thousand calls) by using a Taylor series with range reduction.
- Changed `numb.divisors` to be about 99.40% faster (1317.5ms → 7.9ms for a thousand calls of the divisors of one million) by using the trial division algorithm.
- Changed `stat.unique` to be about 90.59% faster (99794.9ms → 9392.2ms for a thousand calls on a million-element array) by using a fast-path for arrays with primitive types.
- Changed `stat.median` to be about 74.78% faster (31883.1ms → 8039.8ms for a thousand calls on a million-element array) and `stat.quartile` to be about 83.24% faster (43875.6ms → 7354.8ms for a thousand calls on a million-element array) by using the quickselect algorithm for sorting.
- Changed `stat.mode` to be about 71.33% faster (27550.3ms → 7897.9ms for a thousand calls on a million-element array) by using a frequency map algorithm.
- Changed `numb.primeArr` to be about 44.05% faster (672.4ms → 376.2ms for a hundred thousand calls of the primes among the first thousand numbers) and `numb.compositeArr` to be about 38.48% faster (1742.1ms → 1071.8ms for a hundred thousand calls of the composites among the first thousand numbers) by using the Sieve of Eratosthenes.
- Changed `trig.arctan` to be about 21.20% faster (36.8ms → 29.0ms for a million calls) by manually unrolling the Maclaurin series.
- Changed `E` to use a Maclaurin series and changed `PI` to use the Gauss-Legendre algorithm.
- Changed `numb.combination` to use binomial coefficients instead of factorials and `numb.permutation` to use iterated multiplication instead of factorials.
- Changed `real.pow` to use the binary exponentiation algorithm instead of native Math functions, `real.sqrt` to use the Newton-Raphson method instead of native Math functions, and `real.tetration` to use iterated exponentation instead of recursive calls.
- Changed `real.discriminant`, `real.quadratic`, and `real.quadraticFormula` to use `"standard"` and `"vertex"` as the options for their `form` parameter rather than `"stan"` and `"vert"`.
- Changed `real.erf` and `real.Gamma` to use Chalkboard functions instead of native Math functions.
- Fixed `real.root` which was doing unnecessary calculations for 0 and not doing anything for odd roots of negative numbers.

## [v3.0.0 Euler](https://www.github.com/Zushah/Chalkboard/releases/tag/v3.0.0) - 03/02/2026
The fifteenth release of Chalkboard.
Commits: [`v2.4.0...v3.0.0`](https://www.github.com/Zushah/Chalkboard/compare/v2.4.0...v3.0.0)
- Added `REGISTRY` and `REGISTER` which enable the inclusion of custom functions in `real.parse` and `comp.parse`.
- Added `diff.init` which defines ordinary differential equations (both singles and systems).
- Added `diff.solve` which calculates the solutions of differential equations using either Euler's method, the midpoint method, Heun's method, Ralston's method, or the fourth-order Runge-Kutta method, and added `diff.solveAdaptive` which calculates the solutions of differential equations using the Dormand-Prince (or Runge–Kutta–Fehlberg) method.
- Added `diff.at`, `diff.closestIndex`, `diff.component`, `diff.derivative`, `diff.error`, `diff.phase`, `diff.sample`, and `diff.toScalarSeries` which calculate various different helping utilities for differential equations and their solutions.
- Added `diff.exponential`, `diff.linear1`, `diff.linear2`, `diff.logistic`, and `diff.separable` which define basic types of differential equations.
- Added `diff.harmonic`, `diff.harmonicDamped`, `diff.harmonicForced`, `diff.massSpringDamper`, `diff.pendulum`, `diff.pendulumDrag`, and `diff.pendulumDriven` which define differential equations for classic physics demonstrations.
- Added `diff.Kepler2D` and `diff.Kepler3D` which define differential equations for Kepler two-body problems in 2D and 3D, respectively, and added `diff.LotkaVolterra` which defines a differential equation for a Lotka-Volterra predator-prey model, and added `diff.SIS`, `diff.SIR`, and `diff.SEIR` which define differential equations for SIR (susceptible-infected-recovered), SIS (susceptible-infected-susceptible), and SEIR (susceptible-exposed-infected-recovered) epidemic models, respectively.
- Added `diff.Bernoulli` which defines a Bernoulli equation, `diff.BesselJ` which defines a Bessel function of the first kind, `diff.BesselI` which defines a modified Bessel equation of the first kind, `diff.Duffing` which defines a Duffing attractor, `diff.Gompertz` which defines a Gompertz equation, and `diff.Lorenz` which defines a Lorenz attractor.
- Added `plot.ode` which plots solutions of differential equations.
- Added `calc.fft`, `calc.ifft`, `calc.dft`, `calc.idft`, `calc.rfft`, `calc.irfft`, `calc.fftfreq`, `calc.fftshift`, and `calc.ifftshift` which calculate various different Fourier transform operations on arrays.
- Added `calc.iFourier` which calculates the inverse Fourier transform of a `ChalkboardFunction` and thus corresponds to `calc.Fourier`.
- Added `numb.convert` which can convert numbers from and to various measurement units of length, area, mass, volume, pressure, time, and temperature.
- Added `comp.sin`, `comp.cos`, `comp.tan`, and `comp.exp` which calculates those functions for complex-valued inputs.
- Added `real.erf` which calculates the error function and `real.Gamma` which calculates the gamma function.
- Added `matr.Cholesky` which calculates the Cholesky decomposition of a matrix.
- Added `comp.isApproxEqual`, `comp.isEqual`, `comp.isInverse`, `comp.isNormalized`, `comp.isZero`, `matr.isApproxEqual`, `quat.isApproxEqual`, `quat.isEqual`, `quat.isInverse`, `quat.isNormalized`, `quat.isZero`, `tens.isApproxEqual`, `tens.isZero`, and `vect.isApproxEqual`.
- Added tests in the `./test/` folder for all of the near-700 functions of Chalkboard.
- Added Terser to manually generate the `./dist/Chalkboard.min.js` file whereas before it was automatically generated by jsDelivr's Terser.
- Removed `PARSEPREFIX` because of the total rewrite of `real.parse` and `comp.parse` which now use the new `REGISTRY` and `REGISTER`.
- Removed `LOGO` because the Chalkboard logo is now rendered with an SVG and a Python script.
- Removed `README` (the function in the code, not the file in the repo) because it was useless.
- Removed ESLint and Prettier because I don't like them.
- Changed TypeScript build target to ES2023 instead of ES5.
- Changed everything regarding `ChalkboardFunction` (so in other words, essentially all of the `calc`, `comp`, `real`, and `plot` namespaces, as well as a handful of functions in the `numb`, `stat`, `trig`, and `vect` namespaces) such that they now use native JavaScript function references (with a `rule` property) instead of string-based definitions (with a `definition` property). Furthermore, the `type` properties of functions (e.g. `"expl"`, `"pola"`, `"curv"`, etc.) are now automatically configured instead of needing to be explicitly provided. They have also been renamed to be more descriptive (e.g. `"expl"` changed to `"scalar2d"`, `"mult"` changed to `"scalar3d"`, `"curv"` changed to `"curve2d"`, etc.). Additionally, `ChalkboardVectorField` has been removed and replaced with `ChalkboardFunction` (that has a `type` of `"vector2d"`, `"vector3d"`, and `"vector4d"`), although both `real.define` and `vect.field` are still available to be used to define vector fields. Also, the `field` property has been added to `ChalkboardFunction` to explicitly differentiate functions in the field of real numbers from functions in the field of complex numbers ("`field`" here refers to the algebraic structure, not the function type of vector fields). Talking about functions in the field of complex numbers, they can now be defined with `comp.define` in two different ways: two functions of two variables that denote the real and imaginary parts of the function as they take two real numbers and return a real number (old feature) or one function of one variable that denotes an explicit complex function as it takes one complex number and returns a complex number (new feature). Lastly, since the function types are automatically configured based on the function signatures instead of explicitly inputted by strings, the `config` parameter of `plot.definition` has two new options which are `isInverse` and `isPolar` (and `plot.dfdx`, `plot.d2fdx2`, and `plot.fxdx` also have the `isInverse` option) so that plotting inverse and polar functions is still available with the new `"scalar2d"` function type that replaced the `"inve"` and `"pola"` types.
- Changed everything regarding `real.parse` and `comp.parse` such that they will now be able to support advanced algebraic expression handling. The user can input mathematical expressions such as `"(2x - 3y)^4"` and the parser will automatically expand and simplify them algebraically. These functions can evaluate expressions using a `values` object to substitute variables, for example, inputting the expression `"(2x - 3y)^4"` and `values: { x: 1, y: 2 }` will return `256`. Additionally, the abstract syntax tree (AST) of any expression can be obtained by the `returnAST` option, a JSON string of an AST can be obtained by the `returnJSON` option, or a string of the corresponding LaTeX code can be generated by the `returnLaTeX` option. There is also fine-tunable control over numerical precision using the `roundTo` option, which rounds results to the specified place value, such as using `roundTo: 0.0001` to ensure that `"1 - 0.9"` yields `0.1` instead of floating-point imprecision. Custom functions are now registered explicitly using `REGISTER`, replacing the previous string-based `PARSEPREFIX` system. This makes it more secure and flexible, allowing for user-defined functions to be safely added and used within mathematical expressions evaluated by Chalkboard's parsers. The registered functions are centralized in `REGISTRY`.
- Changed `bool.parse` to have `values`, `returnAST`, `returnJSON`, and `returnLaTeX` options like `real.parse` and `comp.parse` do, and changed `bool.isEqual`, `bool.Karnaugh`, `bool.mapping`, `bool.minimize`, `bool.toCNF`, and `bool.toDNF` to accomodate the changes to `bool.parse`.
- Changed every function in the `numb` namespace to have thorough error-checking.
- Changed `calc.Fourier`, `trig.arcsin`, `trig.arccos`, `trig.arctan`, `trig.arccsc`, `trig.arcsec`, and `trig.arccot` to run faster.
- Changed `matr.isIdentity`, `matr.isLowerTriangular`, `matr.isUpperTriangular`, `matr.isOrthogonal`, `matr.isZero`, `vect.isNormalized`, `vect.isOrthogonal`, `vect.isParallel`, and `vect.isZero` to use the new `matr.isApproxEqual` or `vect.isApproxEqual`.
- Changed the license of Chalkboard from MIT to MPL-2.0.
- Fixed `comp.toString` and `quat.toString` which were not working as intended when the imaginary parts were 1 or -1.
- Fixed `matr.isDiagonal` which was actually returning false for diagonal matrices.
- Fixed `numb.compositeArr` which was treating 0 and 1 as composites, fixed `numb.Fibonacci` which had a broken recursive calculation, fixed `numb.Gaussian` which had an ambiguous height parameter and an incorrect Box-Muller transform, fixed `numb.Euler` which was not using distinct prime factors, fixed `numb.prime` which was not handling small indices correctly, fixed `numb.gcd` and `numb.lcm` which were not using absolute values, fixed `numb.toDecimal` which was not preserving the original sign of a number, fixed `numb.map` which was not avoiding division by zero, and fixed `numb.toFraction` to have an iterative maximum.
- Fixed `stat.regression` which was incorrect in its calculation of power regressions.
- Fixed `stat.mul` and `stat.cummul` which were always returning 0.
- Fixed `stat.mean` which was always returning 0 for its calculation of geometric means.
- Fixed `trig.arccos`, `trig.arccsc`, and `trig.arcsec` which were broken due to singularities and undefined domains.

## [v2.4.0 Noether](https://www.github.com/Zushah/Chalkboard/releases/tag/v2.4.0) - 04/28/2025
The fourteenth release of Chalkboard.
Commits: [`v2.3.0...v2.4.0`](https://www.github.com/Zushah/Chalkboard/compare/v2.3.0...v2.4.0)
- Added `vect.modeConfig` which can change the input/output mode of the `vect` commands so that they can accept and return vectors (`"vector"` mode, which is the default), arrays (`"array"` mode), typed arrays (`"float32array"` or `"float64array"` modes), matrices (`"matrix"` mode), strings (`"string"` mode), or JSON strings (`"json"` mode).
- Added `abal.monoid`, `abal.isMonoid`, and `abal.isSubmonoid` which defines and checks for the algebraic structures known as monoids.
- Added `abal.toTypedArray`, `comp.toTypedArray`, `matr.toTypedArray`, `quat.toTypedArray`, `tens.toTypedArray` and `vect.toTypedArray` which convert sets, structures, complex numbers, matrices, quaternions, tensors, and vectors to six different possible typed arrays.
- Added `real.zero` which defines a zero function of a specified type.
- Removed `comp.zero` and `quat.zero` because they were redundant as `comp.init` and `quat.init` already have their feature.
- Changed `trig.cos` and `trig.sin` to be roughly ten times faster.
- Changed `abal.group`, `abal.ring`, and `abal.field` to no longer use presets for sets and operations.
- Changed `abal.isSubset`, `abal.isSubgroup`, `abal.isSubring`, and `abal.isSubfield` to be able to work with infinite sets.
- Changed `abal.isClosed`, `abal.isEqual`, and `abal.direct` to be able to work with monoids.
- Changed `bool.modeConfig` to be able to work case-insensitively.
- Changed `matr.zero` and `tens.zero` to input the size of the zero matrix or tensor directly instead of inputting another matrix or tensor.
- Changed all of the `vect` commands to work with the new `vect.modeConfig` feature.
- Changed `APPLY` and some of the `calc`, `matr`, `quat`, and `real` commands to work with the new `vect.modeConfig` feature.
- Changed all of the `plot` commands to work with the new `plot.getContext` fix.
- Fixed `plot.PARSED_CONTEXT` by replacing it with `plot.getContext` as it was throwing false errors when no HTML `<canvas>` element was available even if the `plot` commands weren't in use.
- Fixed `numb.isRational` which was giving inaccurate results because it was able to turn any floating-point number into a fraction even if it's mathematically inaccurate.

## [v2.3.0 Boole](https://www.github.com/Zushah/Chalkboard/releases/tag/v2.3.0) - 04/14/2025
The thirteenth release of Chalkboard.
Commits: [`v2.2.0...v2.3.0`](https://www.github.com/Zushah/Chalkboard/compare/v2.2.0...v2.3.0)
- Added `I` which calculates the number i.
- Added boolean algebra functionalities with the new `bool` category containing 23 commands, which are mentioned below.
- Added `bool.AND`, `bool.OR`, `bool.XOR`, `bool.COND`, `bool.CONV`, `bool.BICOND`, `bool.NOT`, `bool.NAND`, `bool.NOR`, `bool.NCOND`, `bool.NCONV`, and `bool.NBICOND` which are boolean operations that act on two or more values.
- Added `bool.parse` which evaluates or simplifies a boolean expression, `bool.minimize` which minimizes a boolean expression, and `bool.isEqual` which checks if two boolean expressions are logically equivalent.
- Added `bool.truthTable` which calculates the truth table for one or more boolean operators.
- Added `bool.Karnaugh` which defines the Karnaugh map (or K-map) for a boolean expression and `bool.mapping` which defines a function that maps inputs to outputs based on truth tables.
- Added `bool.primeImplicants` which calculates the prime implicants of a boolean expression using its Karnaugh map.
- Added `bool.toCNF` which converts a boolean expression to conjunctive normal form and `bool.toDNF` which converts a boolean expression to disjunctive normal form.
- Added `bool.modeConfig` which can change the mode of the `bool` commands to output either `1`/`0` (which is `"binary"` mode) or `true`/`false` (which is `"boolean"` mode).
- Added `numb.toBinary`, `numb.toHexadecimal`, and `numb.toOctal` which convert numbers from decimal representation to binary, hexadecimal, or octal representations.
- Added `numb.toDecimal` which converts a number from another representation back to decimal representation.
- Added `real.absolute`, `real.add`, `real.compose`, `real.div`, `real.mul`, `real.negate`, `real.pow` `real.reciprocate`, `real.scl`, `real.sub`, and `real.translate` which calculate the absolute value of a function, the addition of two functions, the composition of two functions, the division of two functions, the multiplication of two functions, the negation of a function, the exponentation of a function, the reciprocation of a function, the scalar multiplication of a function, the subtraction of two functions, and the translation of a function, respectively.
- Added `real.polynomial` which defines a polynomial function based on inputted coefficients, and added `real.randomPolynomial` which defines a polynomial of a specified degree with random coefficients.
- Changed `real.define` to be written more efficiently.
- Changed `stat.random` to have its first parameter be the length of the array instead of the last.
- Fixed `comp.pow`, `matr.norm`, `matr.normsq`, `plot.definition`, and `stat.regression` which were throwing type errors because of the updated `real.pow` function which can now handle not only numbers but also functions.
- Fixed `comp.zero`, `quat.zero`, and `vect.zero` which were unnecessarily using erasing operations.

## [v2.2.0 Galois](https://www.github.com/Zushah/Chalkboard/releases/tag/v2.2.0) - 04/07/2025
The twelfth release of Chalkboard.
Commits: [`v2.1.0...v2.2.0`](https://www.github.com/Zushah/Chalkboard/compare/v2.1.0...v2.2.0)
- Added abstract algebra functionalities with the new `abal` category containing 76 commands, so only a few notable ones are mentioned below.
- Added `abal.set` which defines a mathematical set, as well as `abal.Z` which defines the set of integers or the set of integers modulo n, `abal.Q` which defines the set of rational numbers, `abal.R` which defines the set of real numbers, and `abal.C` which defines the set of complex numbers or the set of nth roots of unity.
- Added `abal.union`, `abal.intersection`, `abal.complement`, `abal.difference`, `abal.symmetricDifference`, `abal.Cartesian`, `abal.powerSet`, `abal.isSubset`, and `abal.isSuperset` which respectively calculate the union of two sets, the intersection of two sets, the complement of a set, the difference of two sets, the symmetric difference of two sets, the Cartesian product of two sets, the power set of a set, whether or not a set is a subset of another set, and whether or not a set is a superset of another set.
- Added `abal.group`, `abal.ring`, and `abal.field` which define the algebraic structures known as groups, rings, and fields.
- Added `abal.direct` which calculates the direct sum or direct product of two algebraic structures.
- Added `abal.cosets` and `abal.quotient` which respectively calculate the cosets or quotient structure of two inputted algebraic structures.
- Added `abal.homomorphism`, `abal.endomorphism`, `abal.isomorphism`, `abal.automorphism`, `abal.idmorphism`, and `abal.invmorphism` which define various types of morphisms between one or two algebraic structures.
- Added `abal.compose` which calculates the composition morphism of two given morphisms.
- Added `abal.image`, `abal.preimage`, and `abal.kernel` which respectively calculate the image, preimage, or kernel of a given morphism.
- Added `abal.cardinality` which calculates the cardinality of a set or the set of a structure.
- Added `abal.isEqual` which checks if two sets, structures, or morphisms are equal.
- Added `abal.copy` which creates a copy of a set, structure, or morphism.
- Added `abal.toArray`, `abal.toMatrix`, `abal.toObject`, `abal.toString`, `abal.toTensor`, and `abal.toVector` which convert sets or structures to arrays, matricies, objects, strings, tensors, or vectors, and `abal.print` prints a set or structure in the console.
- Added `stat.Bayes` which calculates the posterior probability given prior probabilities.
- Added `stat.expected` which calculates the expected value of an array given the probabilities of its elements.
- Added `stat.normal` and `stat.inormal` which respectively calculate the values of the standard normal distribution and cumulative distribution function of the standard normal distribution.
- Added `stat.resampling` which resamples an array either by the bootstrap or jackknife methods.
- Added `stat.interpolate` which linearly or quadratically interpolates missing elements in an array.
- Added `stat.absolute` which takes the absolute value of the elements of an array, `stat.negate` which negates the elements of an array, `stat.add` which adds the elements of two arrays, `stat.sub` which subtracts the elements of two arrays, `stat.dot` which calculates the dot product of two arrays, `stat.scl` which scales the elements of an array by a given number, `stat.sum` which calculates the sum of the elements of an array, `stat.mul` which calculates the product of the elements of an array, and `stat.reverse` which reverses the elements of an array.
- Added `stat.cumsum`, `stat.cummul`, `stat.cummax`, and `stat.cummin` which respectively calculate the cumululative sum, product, maximum, and minimum of an array.
- Added `stat.meanMoving` and `stat.meanWeighted` which respectively calculate the moving and weighted averages of an array.
- Added `stat.covariance` which calculates the covariance of two arrays and `stat.correlationCoefficient` which calculates the correlation coefficient of two arrays.
- Added `stat.interquartileRange` which calculates the interquartile range of an array.
- Added `stat.zscored` which standardizes the elements of an array by their mean and standard deviation.
- Added `stat.pad` which pads an array by a given element to a given length.
- Added `stat.unique` which deduplicates an array of numbers, arrays, objects, etc.
- Added `matr.toSet`, `stat.toSet` and `tens.toSet` to convert matrices, arrays, and tensors to sets.
- Added `numb.toFraction` to convert decimals to fractions and `numb.isRational` to check if a number is rational.
- Changed `APPLY` to work for sets and algebraic structures introduced in the `abal` category.
- Changed `stat.change` and `stat.chiSquared` to be written more succinctly.
- Changed `stat.confidenceInterval` to use an adjustable confidence level.
- Changed `stat.toMatrix` to be able to use only one parameter for the size of the matrix instead of requiring two.
- Changed `matr.rotator` to be faster.
- Changed `comp.toString` to output 1, i, -1, or -i when 1+0i, 0+1i, -1+0i, or 0-1i are inputted.
- Fixed `comp.div` which was broken for who knows how long because it was using the wrong formula for some reason.
- Fixed `matr.resize` which was always returning zero matrices.
- Fixed `matr.zero` which was unnecessarily using erasing operations.
- Fixed `tens.init` which had an expression assigned to itself.
- Fixed `geom.rectangularprismA` thanks to @gyang0's contribution [here](https://github.com/Zushah/Chalkboard/pull/5).

## [v2.1.0 Seki](https://www.github.com/Zushah/Chalkboard/releases/tag/v2.1.0) - 01/22/2024
The eleventh release of Chalkboard.
Commits: [`v2.0.0...v2.1.0`](https://www.github.com/Zushah/Chalkboard/compare/v2.0.0...v2.1.0)
- Added a total of 26 `.isFoo` commands in the `matr`, `tens`, and `vect` categories that check if a matrix, tensor, or vector fulfills a particular property (for example, `matr.isDiagonal` checks if a matrix is a diagonal matrix).
- Added `matr.norm`, `matr.normsq`, and `matr.normalize` to calculate the norm of a matrix or normalize a matrix.
- Added `matr.eigenvalue` and `matr.eigenvector` to calculate the dominant eigenvalue and eigenvector of a matrix.
- Added `matr.diagonal`, `matr.lowerTriangular`, and `matr.upperTriangular` to initialize a diagonal or triangular matrix.
- Added `matr.lowerBinomial`, `matr.symmetricBinomial`, `matr.upperBinomial`, `matr.lowerShift`, and `matr.upperShift` to replace the removed `matr.binomial` and `matr.shift` commands.
- Added `matr.perm` to calculate the permanent of a matrix.
- Added `comp.toMatrix` and `quat.toMatrix` to convert a complex number or a quaternion to a matrix.
- Added `comp.argBetween` to calculate the argument between two complex numbers.
- Added `numb.isApproxEqual` to check if two numbers are approximately equal.
- Added `numb.mod` to calculate the mathematically-correct modulo (instead of the symmetric modulo which is what the `%` operator does).
- Added `numb.roundTo` to round a number to the nearest inputted positional index (or place value).
- Removed `matr.binomial` and `matr.shift`.
- Changed nearly all of the `matr` commands to work significantly faster for 2x2, 3x3, and 4x4 matrices (for example, multiplications are about 67% faster, inversions are about 85% faster, and determinants are about 95% faster) when compared with previous versions of Chalkboard.
- Changed `matr.adjugate`, `matr.cofactor`, `matr.push`, `matr.pull`, and `matr.toVector` to use a zero-based index instead of a one-based index.
- Changed `matr.concat`, `matr.push`, `matr.pull`, `matr.toVector`, and `vect.toMatrix` to use an `axis` parameter instead of a `type` parameter.
- Changed `matr.push`, `matr.pull`, and `matr.toVector` to have their `rowORcol` parameter be renamed as `index`.
- Changed `calc.fds` and `calc.fnds` to work with the changes in `matr.toVector`.
- Changed `matr.reduce` to be renamed as `matr.Gaussian`.
- Changed nearly all of the `vect` commands to use the new `vect.isDimensionOf` command instead of a ridiculous amount of `typeof` operators.
- Changed `tens.rank` to use the length of `tens.size` instead of doing its own calculation.
- Changed `tens.empty`, `tens.fill`, `tens.random`, and `tens.resize` to use a ternary operator instead of an `if` statement to check whether a sequence of arguments or an array is inputted into their `size` parameters.
- Changed `numb.Bernoullian` to not have an unnecessary `if` statement for its optional parameter.

## [v2.0.0 al-Khwarizmi](https://www.github.com/Zushah/Chalkboard/releases/tag/v2.0.0) - 01/08/2024
The tenth release of Chalkboard.
Commits: [`v1.7.0...v2.0.0`](https://www.github.com/Zushah/Chalkboard/compare/v1.7.0...v2.0.0)
- Rewrote everything in TypeScript, applied ESLint and Prettier, and remade the website with TypeDoc.
- Added `APPLY` which applies a callback function in an element-wise manner on a complex number, matrix, quaternion, tensor, or vector.
- Added the `vect` category which merges the `vec2`, `vec3`, and `vec4` categories into one.
- Added `VERSION` and `VERSIONALIAS` which return the installed version and its alias, respectively.
- Removed the `vec2`, `vec3`, and `vec4` categories.
- Removed `quat.fromVector` because it's been replaced by `vect.toQuaternion`.
- Removed `plot.vec3` because it was weird.
- Changed everything due to the TypeScript rewrite and the vector categories merge.
- Changed all of the `.new` commands to be renamed as `.init`.
- Changed `real.function` to be renamed as `real.define`, `comp.function` to be renamed as `comp.define`, and `plot.function` to be renamed as `plot.definition`.
- Changed `LOGO` to draw the logo as a circle instead of a square.
- Changed `matr.mulvec` to be renamed as `matr.mulVector`.
- Fixed `matr.mulVector` which didn't work when the rows of the matrix equaled the dimension of the vector.
- Discontinued the Processsing.js edition of the library, meaning it will no longer be updated and it will only be available on the Khan Academy release (it will no longer be available on GitHub).

## [v1.7.0 Descartes](https://www.github.com/Zushah/Chalkboard/releases/tag/v1.7.0) - 01/01/2024
The ninth release of Chalkboard.
Commits: [`v1.6.0...v1.7.0`](https://www.github.com/Zushah/Chalkboard/compare/v1.6.0...v1.7.0)
- Added tensors (multidimensional multidimensional matrices, or n-dimensional arrays) with 29 commands in the new `tens` category.
- Added 12 more matrix commands: copying, resizing, five new primitive matrices (exchange, shift, binomial, Hilbert, Lehmer), concatenating, multiplying with vectors, Kronecker sum, Kronecker product, and converting to a tensor.
- Added `.copy` commands for complex numbers, quaternions, and vectors.
- Added `stat.toTensor` to convert an array to a tensor.
- Added quaternion division with `quat.div`.
- Added `PARSEPREFIX` as a Chalkboard global which makes it easier to add custom functions to Chalkboard functions than the `init` parameter in `real.parse` and `comp.parse`.
- Added `CONTEXT` as a Chalkboard global to replace the removed `plot.CONTEXT`.
- Removed `plot.CONTEXT`.
- Changed all of the `plot` commands, `LOGO`, and `geom.line3D` to use the new `CONTEXT` constant instead of `plot.CONTEXT`.
- Changed all of the `plot` commands to use `config.x` and `config.y` to determine their position on the canvas instead of `config.origin`.
- Changed all of the `plot` commands' initialization of the `config` parameter to be two less lines long.
- Changed `matr.plot` to have a `config.domain` option.
- Changed `real.parse` and `comp.parse` to no longer have an `init` parameter.
- Changed many of the `comp` and `quat` commands to accept regular numbers (not just complex numbers and quaternions) as inputs.
- Changed `comp.new` and `quat.new` to be able to accept only one argument as the real part and fill the imaginary part(s) with zeroes.
- Changed `stat.eq`, `stat.ineq`, `stat.lt`, and `stat.gt` to use `Array.isArray` instead of `.constructor === Array`.
- Changed `stat.toVector` to have an `index` parameter to change the index of the array to start at when defining a vector.
- Changed all of the integration commands (`calc.fxdx`, `calc.fxydxdy`, `calc.fds`, `calc.frds`, `calc.fnds`, and `calc.fzdz`) to use `inf` and `sup` for the bounds in their parameters instead of `a`, `b`, `c`, and `d`.
- Changed `matr.new` to accept one array of arrays (already-constructed matrix) as an input instead of only multiple arrays (to use as rows to construct a matrix).
- Changed the order of `matr.random`'s parameters.
- Changed `matr.fill`, `matr.empty`, and `matr.random` to make square matrices with the size inputted into the `rows` parameter if nothing is inputted into the `cols` parameter.
- Changed `matr.LUdecomp` and `matr.QRdecomp` to use `matr.fill` instead of `matr.zero` composed with `matr.empty`.
- Fixed `plot.matr` which hadn't been working for who knows how long because of a critical misspelling (`vec2.plot` instead of `plot.vec2`).
- Fixed (rewrote) `numb.binomial` which kept giving "callstack size exceeded" errors for some reason.
- Fixed (rewrote) `matr.QRdecomp` thanks to [@JentGent](https://www.github.com/JentGent)'s [implementation](https://www.github.com/JentGent/linalg/blob/main/linalg.js#L519).

## [v1.6.0 Fermat](https://www.github.com/Zushah/Chalkboard/releases/tag/v1.6.0) - 12/25/2023
The eighth release of Chalkboard.
Commits: [`v1.5.0...v1.6.0`](https://www.github.com/Zushah/Chalkboard/compare/v1.5.0...v1.6.0)
- Added a new type of function: the inverse function (`type` of `"inve"`).
- Added `stat.regression` to calculate different types of statistical regression models (linear, polynomial, exponential, etc.).
- Added `plot.CONTEXT` which determines the `CanvasRenderingContext2D` to use for plots.
- Added LU decomposition and QR decomposition for matrices with `matr.LUdecomp` and `matr.QRdecomp`.
- Added `matr.push` and `matr.pull` to add or remove rows or columns from matrices.
- Added `matr.fill` to create a new matrix with a single value for all of the elements.
- Added more commands for generating random numbers: `numb.exponential`, `numb.Bernoullian`, and `numb.Poissonian`.
- Added `numb.Goldbach` to return an even number as a sum of two prime numbers.
- Added `numb.Euler` to calculate Euler's totient function on a number.
- Added `stat.shuffle` to randomly shuffle an array and `stat.subsets` to return all of the possible subsets of an array.
- Changed all of the `plot` commands to use an optional `config` object parameter to configure their customizations (size, color, domain, etc.) instead of separate parameters for each of them.
- Changed `real.function`, `real.val`, `calc.dfdx`, `calc.d2fdx2`, and `calc.fxdx` to accomodate the new `"inve"` function type.
- Changed all of the `plot` commands, the `LOGO` command, and the `geom.line3D` command to use the new `plot.CONTEXT` value instead of `ctx` and `canvas`.
- Changed `matr.empty` and `matr.random` to use `rows` and `cols` as parameters for the size of the matrix instead of `dimension`, and renamed the `dimension` parameter for `matr.identity` to `size`.
- Changed `real.nrt` to be renamed as `real.root` (so `stat.mean` had to be changed since it was used there), and changed the `n` parameter in `comp.root` to be renamed as `index`.
- Changed `numb.random` to use its default values only if the parameters are undefined instead of if the parameters are falsy.
- Changed `matr.new` to use its `matrix` parameter instead of leaving it as declared but unused.
- Changed `comp.d2fdz2` which was incorrectly named as `comp.df2dz2`.
- Fixed (rewrote) `numb.Gaussian` which basically didn't work at all.
- Fixed `real.pow` which returned `NaN` for 0 raised to the power of 0.
- Fixed the default domain for `plot.function` which was incorrectly using the domain for domain colorings instead of normal graphs.

## [v1.5.0 Cauchy](https://www.github.com/Zushah/Chalkboard/releases/tag/v1.5.0) - 12/18/2023
The seventh release of Chalkboard.
Commits: [`v1.4.0...v1.5.0`](https://www.github.com/Zushah/Chalkboard/compare/v1.4.0...v1.5.0)
- Added Chalkboard as an npm package, so now it can be used on the server-side just like the client side.
- Added `comp.function`, `comp.parse`, and `comp.val` to define, parse, and evaluate complex functions.
- Added `calc.dfdz`, `calc.d2fdz2`, and `calc.fzdz` to calculate the first derivatives, second derivatives, and antiderivatives of complex functions.
- Added approximations of functions using Taylor series with `calc.Taylor` and `plot.Taylor`.
- Added `comp.pow` to calculate the exponentiation of a complex number.
- Added `comp.root` to calculate the roots of a complex number.
- Added `comp.invert` (calculates the multiplicative inverse of a complex number) to replace the functionality of `comp.reciprocate`.
- Removed `stat.gte` and `stat.lte` and respectively incorporated their functionalities into `stat.gt` and `stat.lt`.
- Changed `comp.reciprocate` to return the reciprocals of the components of a complex number instead of returning the multiplicative inverse of a complex number.
- Changed `stat.gt` and `stat.lt` to have `includeEnd` parameters which determines whether the conditional they check for is "greater/less than" (input false) or "greater/less than or equal to" (input true).
- Changed `plot.barplot` and `plot.lineplot` to use the new functionalities of `stat.gt` and `stat.lt` instead of the removed `stat.gte` and `stat.lte`.
- Changed `comp.Re` and `comp.Im` to respectively return the real and imaginary components of complex functions, too, instead of only the real and imaginary components of complex numbers.
- Changed `stat.toObject` to return an object with its properties named based on the array's index instead of the array's element.
- Changed `trig.arctan2` to use `Math.atan` instead of `trig.arctan` to be faster.
- Changed the name of `calc.frdt` to `calc.frds`.
- Changed `plot.function` to accept complex functions as inputs to plot their domain colorings.
- Fixed the error messages in `calc.dfdrt` which were misspelled.
- Fixed `plot.field` to include the upper bounds in its domain.

## [v1.4.0 Herschel](https://www.github.com/Zushah/Chalkboard/releases/tag/v1.4.0) - 12/11/2023
The sixth release of Chalkboard.
Commits: [`v1.3.1...v1.4.0`](https://www.github.com/Zushah/Chalkboard/compare/v1.3.1...v1.4.0)
- Added many new commands for arrays: creating an array of random numbers, calculating different types of the norm (and the squared norm) of an array, calculating the normalized array, calculating the array that has the numbers that are equal to, greater than (or equal to), less than (or equal to), or some compound inequality of another number or array, calculating the skewness and kurtosis of an array, calculating the different quartiles of an array, and converting an array to a vector, matrix, object, string, or printing it in the console.
- Added `plot.barplot`, `plot.lineplot`, and `plot.scatterplot` to plot arrays of data.
- Added `.constrain` commands for numbers, arrays, complex numbers, quaternions, vectors, and matrices to constrain their values within a range.
- Added `trig.arctan2` to accurately calculate the angle between a vector and the positive x-axis.
- Added `numb.sum` and `numb.mul` for the calculation of specified summation and product formulae.
- Added `.reflect` and `.refract` commands for vectors to calculate reflection and refraction vectors.
- Added `real.pingpong` to calculate the ping-pong function.
- Added `geom.mid` to calculate the midpoint between two multidimensional points.
- Changed all of the `plot` commands to return an array of data containing all of the ordered pairs of plotted points instead of returning a string with details on what was plotted and how.
- Changed `real.parse` to have an optional command to input initializing code before the return function.
- Changed `vec2.ang`, `comp.arg`, and `comp.ln` to use `trig.arctan2` instead of `trig.arctan`.
- Changed `real.Heaviside`, `real.Dirac`, `real.ramp`, and `real.rect` to have parameters for the `edge` (the starting point) and the `scl` (scalar multiplication) of their respective functions.
- Changed `comp.new` and `quat.new` to have a `type` property (like the `.new` commands for vectors) that's always set to `"comp"` and `"quat"`, respectively.
- Changed `geom.dist` and `geom.distsq` to be written with loops instead of array methods.
- Changed `calc.frdt` to also work for three-dimensional (instead of only two-dimensional) vector fields and parametric curves.
- Fixed `calc.dfrdt` which didn't work due to a slight misspelling in an `if()` statement.

## [v1.3.1 Heaviside](https://www.github.com/Zushah/Chalkboard/releases/tag/v1.3.1) - 12/04/2023
The fifth release of Chalkboard.
Commits: [`v1.3.0...v1.3.1`](https://www.github.com/Zushah/Chalkboard/compare/v1.3.0...v1.3.1)
- Fixed `matr.translator` which was misspelled.
- Fixed `matr.rotator` which didn't work for two-dimensional rotations and was also misspelled.
- Fixed `calc.grad` which didn't work for vector fields because of another misspelling.

## [v1.3.0 Heaviside](https://www.github.com/Zushah/Chalkboard/releases/tag/v1.3.0) - 12/04/2023
The fourth release of Chalkboard.
Commits: [`v1.2.0...v1.3.0`](https://www.github.com/Zushah/Chalkboard/compare/v1.2.0...v1.3.0)
- Added multivariable calculus, with commands for directional differentiation, multivariable chain rule, gradient (partial differentiation), double gradient (second-order partial differentiation), divergence, curl, double integration, line/surface integration, arc length, surface area, and curvature.
- Added second-order differentiation with `calc.d2fdx2`, unit tangent vectors for parametric curves with `calc.tangent`, unit normal vectors with `calc.normal`, and unit binormal vectors with `calc.binormal`.
- Functions that previously had the `type` property of `"para"` should now be changed to `"curv"`.
- Added `.field` and `.fromField` commmands for vectors which define vector fields and evaluate them at particular vectors, respectively.
- Added `plot.field` and `plot.d2fdx2` to plot vector fields and second-order derivatives, respectively.
- Added `.proj` and `.oproj` commands for vectors which calculate the vector projections and rejections, respectively.
- Added commands for vectors to convert between coordinate systems (`vec2.fromPolar`, `vec3.toSpherical`, etc).
- Changed `matr.toVector` to have another optional parameter for the row/column of a matrix to define a vector from.
- Added `comp.scl` and `quat.scl`, and changed all of the `.magset` commands to work using their respective `.scl` commands.
- Added a `type` parameter to `stat.mean` to enable the calculation of different types of means: arithmetic, geometric, and harmonic.
- Removed `geom.dist2D` and `geom.dist3D` and replaced them with `geom.dist` and `geom.distsq` which can calculate the distance between any-dimensional points.
- Removed `vec2.rotate2D`, `vec3.rotatex`, `vec3.rotatey`, and `vec3.rotatez` because all vector rotations can be handled with rotation matrices.
- Removed `matr.rotater2D` and `matr.rotater3D` and replaced them with `matr.rotater` which can do both 2D and 3D rotations depending on the number of parameters inputted (one parameter required for 2D rotations, three parameters required for 3D rotations).
- Removed `real.sqrt` from returning a complex number when the input is negative because it would sometimes cause bugs.
- Changed `real.function`, `real.parse`, `calc.dfdx`, and `calc.fxdx` to work for the new `"mult"` function type for multivariable functions, the new `"curv"` function type for parametric curves, and the new `"surf"` function type for parametric surfaces.
- Changed all `plot` commands so they can now optionally have their opacity changed with the `rgba` parameter (which previously used to only be `rgb`).
- Changed `numb.Gaussian` to use `for(;;)` instead of `while(typeof x === "undefined")`.
- Changed the name of `calc.average` to `calc.mean`.
- Fixed `matr.invert` returning `NaN` values when `0` is on the diagonal of a matrix, thanks to [@bhavjitChauhan](https://www.github.com/bhavjitChauhan).

## [v1.2.0 Cayley](https://www.github.com/Zushah/Chalkboard/releases/tag/v1.2.0) - 11/27/2023
The third release of Chalkboard.
Commits: [`v1.1.0...v1.2.0`](https://www.github.com/Zushah/Chalkboard/compare/v1.1.0...v1.2.0)
- Added new matrix commands for the trace of a matrix, the row space of a matrix, the column space, and null space, the exponentation, the row Echelon form (Gaussian elimination), solving systems of linear equations, and conversion of a matrix to an object.
- Added `plot.comp`, `plot.vec2`, `plot.vec3`, and `plot.matr` to replace `comp.display`, `vec2.display`, `vec3.display`, and `matr.display`.
- Added `numb.binomial` to calculate binomial coefficients.
- Removed `vec2.fromNumber`, `vec3.angcos`, `vec4.angcos`, and `matr.dimension`.
- Removed all of the `.addScl` (scalar addition) commands for vectors.
- Changed all of the `matr` commands to work for matrices of any and all dimensions (previously there was a four-by-four dimension limit).
- Changed all of the `.mulScl` (scalar multiplication) commands for vectors and matrices to be renamed as `.scl`.
- Changed `numb.random` to have both of its parameters be optional (no parameters inputted returns a random number between 0 and 1).
- Changed `numb.Gaussian` to use `while(typeof x === "undefined")` instead of `while(true)`.
- Fixed the `vec2.magset` and `vec3.magset` commands which would return vectors in the wrong dimensions.

## [v1.1.0 Riemann](https://www.github.com/Zushah/Chalkboard/releases/tag/v1.1.0) - 11/13/2023
The second release of Chalkboard.
Commits: [`v1.0.0...v1.1.0`](https://www.github.com/Zushah/Chalkboard/compare/v1.0.0...v1.1.0)
- Added `numb.prime` to calculate the nth prime number, `numb.nextPrime` to calculate the next prime number, and `numb.primeGap` to calculate the prime gap with an interval.
- Added `numb.factors` to calculate the prime factorization of a number and `numb.divisors` to calculate the divisors of a number.
- Added `numb.Gaussian` to calculate a random number based on a Gaussian distribution.
- Added `.convolution`, `.correlation`, and `.autocorrelation` commands in the `stat`, `calc`, and `plot` categories to calculate and plot the discrete and continuous convolutions, cross-correlations, and autocorrelations of arrays and functions, respectively.
- Added `stat.error` to calculate the standard error of an array.
- Added `matr.cofactor` and `matr.adjugate` to calculate the cofactor and adjugate matrices of a matrix.
- Removed `calc.rOdO` because polar differentation can now be done with `calc.fxdx` instead.
- Changed `calc.fxdx` to work using Simpson's rule instead of the trapezoidal Riemann sum.
- Changed `real.val`, `calc.dfdx`, and `calc.fxdx` to work for all Chalkboard functions regardless of their `type` (before they only worked for `"expl"` functions).
- Changed `matr.det` and `matr.transpose` to work for all matrices regardless of their dimension.
- Changed `numb.Fibonacci` to have a cache so it works faster.
- Changed the order of the lower and upper values in the `stat.confidenceInterval` return array.
- Changed `plot.function` and `numb.factorial` to be more written slightly more efficiently.
- Changed the name of the `position` parameter in `stat.Gaussian` to `mean`.
- Changed the name of `numb.prime` (the command that checks if a number is prime) to `numb.isPrime`, so parts of `numb.primeArr` and `prime.compositeArr` had to be changed, too.

## [v1.0.0 Euclid](https://www.github.com/Zushah/Chalkboard/releases/tag/v1.0.0) - 11/06/2023
The first release of Chalkboard.
Commits: [`v1.0.0...main`](https://www.github.com/Zushah/Chalkboard/compare/v1.0.0...main)
