# Chalkboard changelog
All notable changes of every update of the Chalkboard library are recorded in this file.

## [v1.6.0](https://www.github.com/Zushah/Chalkboard/releases/tag/v1.6.0) - 12/25/2023
The eighth release of the Chalkboard library.
Commits: [`v1.5.0...v1.6.0`](https://www.github.com/Zushah/Chalkboard/compare/v1.5.0...v1.6.0)
- Added a new type of function: the inverse function (`type` of `"inve"`)
- Added `stat.regression` to calculate different types of statistical regression models (linear, polynomial, exponential, etc.)
- Added `plot.CONTEXT` which determines the `CanvasRenderingContext2D` to use for plots
- Added LU decomposition and QR decomposition for matrices with `matr.LUdecomp` and `matr.QRdecomp`
- Added `matr.push` and `matr.pull` to add or remove rows or columns from matrices
- Added `matr.fill` to create a new matrix with a single value for all of the elements
- Added more commands for generating random numbers: `numb.exponential`, `numb.Bernoullian`, and `numb.Poissonian`
- Added `numb.Goldbach` to return an even number as a sum of two prime numbers
- Added `numb.Euler` to calculate Euler's totient function on a number
- Added `stat.shuffle` to randomly shuffle an array and `stat.subsets` to return all of the possible subsets of an array
- Changed all of the `plot` commands to use an optional `config` object parameter to configure their customizations (size, color, domain, etc.) instead of separate parameters for each of them
- Changed `real.function`, `real.val`, `calc.dfdx`, `calc.d2fdx2`, and `calc.fxdx` to accomodate the new `"inve"` function type
- Changed all of the `plot` commands, the `LOGO` command, and the `geom.line3D` command to use the new `plot.CONTEXT` value instead of `ctx` and `canvas`
- Changed `matr.empty` and `matr.random` to use `rows` and `cols` as parameters for the size of the matrix instead of `dimension`, and renamed the `dimension` parameter for `matr.identity` to `size`
- Changed `real.nrt` to be renamed as `real.root` (so `stat.mean` had to be changed since it was used there), and changed the `n` parameter in `comp.root` to be renamed as `index`
- Changed `numb.random` to use its default values only if the parameters are undefined instead of if the parameters are falsy
- Changed `matr.new` to use its `matrix` parameter instead of leaving it as declared but unused
- Changed `comp.d2fdz2` which was incorrectly named as `comp.df2dz2`
- Fixed (rewrote) `numb.Gaussian` which basically didn't work at all
- Fixed `real.pow` which returned `NaN` for 0 raised to the power of 0
- Fixed the default domain for `plot.function` which was incorrectly using the domain for domain colorings instead of normal graphs


## [v1.5.0](https://www.github.com/Zushah/Chalkboard/releases/tag/v1.5.0) - 12/18/2023
The seventh release of the Chalkboard library.
Commits: [`v1.4.0...v1.5.0`](https://www.github.com/Zushah/Chalkboard/compare/v1.4.0...v1.5.0)
- Added Chalkboard as an npm package, so now it can be used on the server-side just like the client side
- Added `comp.function`, `comp.parse`, and `comp.val` to define, parse, and evaluate complex functions
- Added `calc.dfdz`, `calc.d2fdz2`, and `calc.fzdz` to calculate the first derivatives, second derivatives, and antiderivatives of complex functions
- Added approximations of functions using Taylor series with `calc.Taylor` and `plot.Taylor`
- Added `comp.pow` to calculate the exponentiation of a complex number
- Added `comp.root` to calculate the roots of a complex number
- Added `comp.invert` (calculates the multiplicative inverse of a complex number) to replace the functionality of `comp.reciprocate`
- Removed `stat.gte` and `stat.lte` and respectively incorporated their functionalities into `stat.gt` and `stat.lt`
- Changed `comp.reciprocate` to return the reciprocals of the components of a complex number instead of returning the multiplicative inverse of a complex number
- Changed `stat.gt` and `stat.lt` to have `includeEnd` parameters which determines whether the conditional they check for is "greater/less than" (input false) or "greater/less than or equal to" (input true)
- Changed `plot.barplot` and `plot.lineplot` to use the new functionalities of `stat.gt` and `stat.lt` instead of the removed `stat.gte` and `stat.lte`
- Changed `comp.Re` and `comp.Im` to respectively return the real and imaginary components of complex functions, too, instead of only the real and imaginary components of complex numbers
- Changed `stat.toObject` to return an object with its properties named based on the array's index instead of the array's element
- Changed `trig.arctan2` to use `Math.atan` instead of `trig.arctan` to be faster
- Changed the name of `calc.frdt` to `calc.frds`
- Changed `plot.function` to accept complex functions as inputs to plot their domain colorings
- Fixed the error messages in `calc.dfdrt` which were misspelled
- Fixed `plot.field` to include the upper bounds in its domain

## [v1.4.0](https://www.github.com/Zushah/Chalkboard/releases/tag/v1.4.0) - 12/11/2023
The sixth release of the Chalkboard library.
Commits: [`v1.3.1...v1.4.0`](https://www.github.com/Zushah/Chalkboard/compare/v1.3.1...v1.4.0)
- Added many new commands for arrays: creating an array of random numbers, calculating different types of the norm (and the squared norm) of an array, calculating the normalized array, calculating the array that has the numbers that are equal to, greater than (or equal to), less than (or equal to), or some compound inequality of another number or array, calculating the skewness and kurtosis of an array, calculating the different quartiles of an array, and converting an array to a vector, matrix, object, string, or printing it in the console
- Added `plot.barplot`, `plot.lineplot`, and `plot.scatterplot` to plot arrays of data
- Added `.constrain` commands for numbers, arrays, complex numbers, quaternions, vectors, and matrices to constrain their values within a range
- Added `trig.arctan2` to accurately calculate the angle between a vector and the positive x-axis
- Added `numb.sum` and `numb.mul` for the calculation of specified summation and product formulae
- Added `.reflect` and `.refract` commands for vectors to calculate reflection and refraction vectors
- Added `real.pingpong` to calculate the ping-pong function
- Added `geom.mid` to calculate the midpoint between two multidimensional points
- Changed all of the `plot` commands to return an array of data containing all of the ordered pairs of plotted points instead of returning a string with details on what was plotted and how
- Changed `real.parse` to have an optional command to input initializing code before the return function
- Changed `vec2.ang`, `comp.arg`, and `comp.ln` to use `trig.arctan2` instead of `trig.arctan`
- Changed `real.Heaviside`, `real.Dirac`, `real.ramp`, and `real.rect` to have parameters for the `edge` (the starting point) and the `scl` (scalar multiplication) of their respective functions
- Changed `comp.new` and `quat.new` to have a `type` property (like the `.new` commands for vectors) that's always set to `"comp"` and `"quat"`, respectively
- Changed `geom.dist` and `geom.distsq` to be written with loops instead of array methods
- Changed `calc.frdt` to also work for three-dimensional (instead of only two-dimensional) vector fields and parametric curves
- Fixed `calc.dfrdt` which didn't work due to a slight misspelling in an `if()` statement

## [v1.3.1](https://www.github.com/Zushah/Chalkboard/releases/tag/v1.3.1) - 12/04/2023
The fifth release of the Chalkboard library.
Commits: [`v1.3.0...v1.3.1`](https://www.github.com/Zushah/Chalkboard/compare/v1.3.0...v1.3.1)
- Fixed `matr.translator` which was misspelled
- Fixed `matr.rotator` which didn't work for two-dimensional rotations and was also misspelled
- Fixed `calc.grad` which didn't work for vector fields because of another misspelling

## [v1.3.0](https://www.github.com/Zushah/Chalkboard/releases/tag/v1.3.0) - 12/04/2023
The fourth release of the Chalkboard library.
Commits: [`v1.2.0...v1.3.0`](https://www.github.com/Zushah/Chalkboard/compare/v1.2.0...v1.3.0)
- Added multivariable calculus, with commands for directional differentiation, multivariable chain rule, gradient (partial differentiation), double gradient (second-order partial differentiation), divergence, curl, double integration, line/surface integration, arc length, surface area, and curvature
- Added second-order differentiation with `calc.d2fdx2`, unit tangent vectors for parametric curves with `calc.tangent`, unit normal vectors with `calc.normal`, and unit binormal vectors with `calc.binormal`
- Functions that previously had the `type` property of `"para"` should now be changed to `"curv"`
- Added `.field` and `.fromField` commmands for vectors which define vector fields and evaluate them at particular vectors, respectively
- Added `plot.field` and `plot.d2fdx2` to plot vector fields and second-order derivatives, respectively
- Added `.proj` and `.oproj` commands for vectors which calculate the vector projections and rejections, respectively
- Added commands for vectors to convert between coordinate systems (`vec2.fromPolar`, `vec3.toSpherical`, etc)
- Changed `matr.toVector` to have another optional parameter for the row/column of a matrix to define a vector from
- Added `comp.scl` and `quat.scl`, and changed all of the `.magset` commands to work using their respective `.scl` commands
- Added a `type` parameter to `stat.mean` to enable the calculation of different types of means: arithmetic, geometric, and harmonic
- Removed `geom.dist2D` and `geom.dist3D` and replaced them with `geom.dist` and `geom.distsq` which can calculate the distance between any-dimensional points
- Removed `vec2.rotate2D`, `vec3.rotatex`, `vec3.rotatey`, and `vec3.rotatez` because all vector rotations can be handled with rotation matrices
- Removed `matr.rotater2D` and `matr.rotater3D` and replaced them with `matr.rotater` which can do both 2D and 3D rotations depending on the number of parameters inputted (one parameter required for 2D rotations, three parameters required for 3D rotations)
- Removed `real.sqrt` from returning a complex number when the input is negative because it would sometimes cause bugs
- Changed `real.function`, `real.parse`, `calc.dfdx`, and `calc.fxdx` to work for the new `"mult"` function type for multivariable functions, the new `"curv"` function type for parametric curves, and the new `"surf"` function type for parametric surfaces
- Changed all `plot` commands so they can now optionally have their opacity changed with the `rgba` parameter (which previously used to only be `rgb`)
- Changed `numb.Gaussian` to use `for(;;)` instead of `while(typeof x === "undefined")`
- Changed the name of `calc.average` to `calc.mean`
- Fixed `matr.invert` returning `NaN` values when `0` is on the diagonal of a matrix, thanks to [@bhavjitChauhan](https://www.github.com/bhavjitChauhan).

## [v1.2.0](https://www.github.com/Zushah/Chalkboard/releases/tag/v1.2.0) - 11/27/2023
The third release of the Chalkboard library.
Commits: [`v1.1.0...v1.2.0`](https://www.github.com/Zushah/Chalkboard/compare/v1.1.0...v1.2.0)
- Added new matrix commands for the trace of a matrix, the row space of a matrix, the column space, and null space, the exponentation, the row Echelon form (Gaussian elimination), solving systems of linear equations, and conversion of a matrix to an object
- Added `plot.comp`, `plot.vec2`, `plot.vec3`, and `plot.matr` to replace `comp.display`, `vec2.display`, `vec3.display`, and `matr.display`
- Added `numb.binomial` to calculate binomial coefficients
- Removed `vec2.fromNumber`, `vec3.angcos`, `vec4.angcos`, and `matr.dimension`
- Removed all of the `.addScl` (scalar addition) commands for vectors
- Changed all of the `matr` commands to work for matrices of any and all dimensions (previously there was a four-by-four dimension limit)
- Changed all of the `.mulScl` (scalar multiplication) commands for vectors and matrices to be renamed as `.scl`
- Changed `numb.random` to have both of its parameters be optional (no parameters inputted returns a random number between 0 and 1)
- Changed `numb.Gaussian` to use `while(typeof x === "undefined")` instead of `while(true)`
- Fixed the `vec2.magset` and `vec3.magset` commands which would return vectors in the wrong dimensions

## [v1.1.0](https://www.github.com/Zushah/Chalkboard/releases/tag/v1.1.0) - 11/13/2023
The second release of the Chalkboard library.
Commits: [`v1.0.0...v1.1.0`](https://www.github.com/Zushah/Chalkboard/compare/v1.0.0...v1.1.0)
- Added `numb.prime` to calculate the nth prime number, `numb.nextPrime` to calculate the next prime number, and `numb.primeGap` to calculate the prime gap with an interval
- Added `numb.factors` to calculate the prime factorization of a number and `numb.divisors` to calculate the divisors of a number
- Added `numb.Gaussian` to calculate a random number based on a Gaussian distribution
- Added `.convolution`, `.correlation`, and `.autocorrelation` commands in the `stat`, `calc`, and `plot` categories to calculate and plot the discrete and continuous convolutions, cross-correlations, and autocorrelations of arrays and functions, respectively
- Added `stat.error` to calculate the standard error of an array
- Added `matr.cofactor` and `matr.adjugate` to calculate the cofactor and adjugate matrices of a matrix
- Removed `calc.rOdO` because polar differentation can now be done with `calc.fxdx` instead
- Changed `calc.fxdx` to work using Simpson's rule instead of the trapezoidal Riemann sum
- Changed `real.val`, `calc.dfdx`, and `calc.fxdx` to work for all Chalkboard functions regardless of their `type` (before they only worked for `"expl"` functions)
- Changed `matr.det` and `matr.transpose` to work for all matrices regardless of their dimension
- Changed `numb.Fibonacci` to have a cache so it works faster
- Changed the order of the lower and upper values in the `stat.confidenceInterval` return array
- Changed `plot.function` and `numb.factorial` to be more written slightly more efficiently
- Changed the name of the `position` parameter in `stat.Gaussian` to `mean`
- Changed the name of `numb.prime` (the command that checks if a number is prime) to `numb.isPrime`, so parts of `numb.primeArr` and `prime.compositeArr` had to be changed, too

## [v1.0.0](https://www.github.com/Zushah/Chalkboard/releases/tag/v1.0.0) - 11/06/2023
The first release of the Chalkboard library.
Commits: [`v1.0.0...main`](https://www.github.com/Zushah/Chalkboard/compare/v1.0.0...main)