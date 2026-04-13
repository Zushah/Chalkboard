# Chalkboard design

This document describes the architectural design of Chalkboard as implemented in `./src/`, exercised by `./test/`, and demonstrated by `./examples/`. It complements `./README.md`, the generated API [website](https://zushah.github.io/Chalkboard/), and the `./paper/` by focusing on structure, public abstractions, subsystem boundaries, and maintainability tradeoffs.

## Table of Contents
1. [Overview](#1-overview)
   - [A. Purpose of This Document](#a-purpose-of-this-document)
   - [B. What Chalkboard Is](#b-what-chalkboard-is)
   - [C. What Chalkboard Is Not](#c-what-chalkboard-is-not)
2. [Design Objectives](#2-design-objectives)
   - [A. Research and Educational Use Cases](#a-research-and-educational-use-cases)
   - [B. API Coherence and Self-Containment](#b-api-coherence-and-self-containment)
   - [C. Cross-Environment Support](#c-cross-environment-support)
   - [D. Maintainability Priorities](#d-maintainability-priorities)
3. [System Architecture](#3-system-architecture)
   - [A. Namespace-Based Library Organization](#a-namespace-based-library-organization)
   - [B. Build, Packaging, and Distribution Model](#b-build-packaging-and-distribution-model)
   - [C. Public API Surface](#c-public-api-surface)
   - [D. Shared Core Types and Data Representations](#d-shared-core-types-and-data-representations)
4. [Core Design Patterns](#4-core-design-patterns)
   - [A. Domain-Centric Namespaces](#a-domain-centric-namespaces)
   - [B. Lightweight Mathematical Object Models](#b-lightweight-mathematical-object-models)
   - [C. Function Representation and Parsing](#c-function-representation-and-parsing)
   - [D. Cross-Namespace Composition](#d-cross-namespace-composition)
5. [Subsystem Design](#5-subsystem-design)
   - [A. Abstract Algebra](#a-abstract-algebra)
   - [B. Boolean Algebra and Logic Parsing](#b-boolean-algebra-and-logic-parsing)
   - [C. Real and Complex Function Systems](#c-real-and-complex-function-systems)
   - [D. Calculus and Differential Equations](#d-calculus-and-differential-equations)
   - [E. Matrices, Vectors, Quaternions, and Tensors](#e-matrices-vectors-quaternions-and-tensors)
   - [F. Statistics, Number Theory, and Trigonometry](#f-statistics-number-theory-and-trigonometry)
   - [G. Geometry and Plotting](#g-geometry-and-plotting)
6. [Runtime and Integration Model](#6-runtime-and-integration-model)
   - [A. Browser Integration](#a-browser-integration)
   - [B. Node.js Integration](#b-nodejs-integration)
   - [C. Plotting Context Model](#c-plotting-context-model)
   - [D. Documentation and Example Workflows](#d-documentation-and-example-workflows)
7. [Correctness, Testing, and Documentation](#7-correctness-testing-and-documentation)
   - [A. Public-API-Oriented Test Strategy](#a-public-api-oriented-test-strategy)
   - [B. Type Safety and Build Validation](#b-type-safety-and-build-validation)
   - [C. API Reference Generation](#c-api-reference-generation)
   - [D. Example Coverage and Research Communication](#d-example-coverage-and-research-communication)
8. [Maintainability Assessment](#8-maintainability-assessment)
   - [A. Architectural Strengths](#a-architectural-strengths)
   - [B. Deliberate Tradeoffs](#b-deliberate-tradeoffs)
   - [C. Known Constraints and Non-Goals](#c-known-constraints-and-non-goals)
   - [D. Evolution Guidelines for Future Contributions](#d-evolution-guidelines-for-future-contributions)

## 1. Overview

### A. Purpose of This Document

This `./DESIGN.md` file explains how Chalkboard is structured and why it is structured that way. Its audience is technically-literate reviewers and contributors who need to understand the library's architectural model, shared abstractions, verification strategy, and known constraints without reading every source file first.

### B. What Chalkboard Is

Chalkboard is a single-library mathematical environment for TypeScript and JavaScript. It exposes one public root namespace, `Chalkboard`, and organizes its capabilities into fifteen subject-oriented namespaces for abstract algebra, boolean algebra, calculus, complex analysis, differential equations, geometry, matrices, number utilities, plotting, quaternions, real-valued functions, statistics, tensors, trigonometry, and vectors.

The library is designed to make mathematical structure first-class in web-native software. Rather than only exposing scalar utilities, it models objects such as sets, algebraic structures, morphisms, typed functions, matrices, tensors, vectors, complex numbers, quaternions, and ordinary differential equations as explicit public representations that can be composed across namespaces.

Chalkboard therefore occupies a middle ground between a numerical helper library and a formal mathematical system. It supports symbolic parsing, numerical approximation, structural algebra, and browser visualization within one coherent API. Its breadth is a feature of the design: the same library can represent mathematical objects, operate on them, and visualize them without forcing users to translate between unrelated abstractions.

### C. What Chalkboard Is Not

Chalkboard is not a theorem prover, a proof assistant, or a complete computer algebra system. Its symbolic simplifiers are practical and local rather than mathematically exhaustive. Its numerical routines are designed for usable scientific and pedagogical workflows, not for the full scope of specialized high-performance numerical computing. Its plotting subsystem is a `Canvas2D`-based rendering layer, not a general charting framework or scene graph.

Chalkboard is also not organized as many independently versioned subpackages. These boundaries are deliberate: they keep the library honest about its guarantees and focused on an integrated, inspectable mathematical toolkit for the web.

## 2. Design Objectives

### A. Research and Educational Use Cases

Chalkboard is intended for projects where mathematical structure is central to the software itself. Typical use cases include exploratory simulations, pedagogical visualizations, interactive web demonstrations, mathematically expressive creative coding, and research software that benefits from staying inside the JavaScript ecosystem.

### B. API Coherence and Self-Containment

The library prioritizes a coherent user model: `Chalkboard.namespace.function`. This keeps advanced workflows readable while allowing distinct mathematical subjects to remain conceptually grouped. Chalkboard also minimizes runtime complexity by using plain JavaScript data structures and avoiding runtime dependencies in the published library.

### C. Cross-Environment Support

Chalkboard is designed to work in both browsers and Node.js. The same public API is exposed in both environments, while plotting and demonstration workflows are centered on the browser's `Canvas2D` API.

### D. Maintainability Priorities

The maintainability strategy is based on a small set of reusable contracts, a stable public surface, strong TypeScript checking, generated API documentation, examples that demonstrate intended usage, and tests that exercise the built distribution rather than only source internals. The design deliberately favors explicitness over hidden magic.

## 3. System Architecture

The architectural layers of Chalkboard are summarized below.

| Layer | Responsibility |
| --- | --- |
| Public API | The `Chalkboard` root namespace, its global exports, and the fifteen mathematical namespaces |
| Core contracts | Shared types and globals defined centrally in `./src/Chalkboard.ts` |
| Computational layer | Algebraic, symbolic, numerical, statistical, geometric, and conversion functionality |
| Visualization layer | `Canvas2D`-oriented plotting in `plot` and selected geometry rendering helpers |
| Verification and communication | Tests, TypeDoc-generated documentation website, examples, and the JOSE paper |

### A. Namespace-Based Library Organization

Chalkboard is organized as one shared TypeScript namespace extended across multiple source files. `./src/Chalkboard.ts` defines the shared public types and top-level exports, and each additional `./src/Chalkboard.namespace.ts` file extends the same namespace with a subject-specific API.

This is a deliberate coarse-grained design. The primary unit of organization is the mathematical domain, not the individual helper function. The result is a public interface that is easy to navigate conceptually, even though the internal implementation is not split into fully isolated packages.

### B. Build, Packaging, and Distribution Model

The build compiles `./src/` into a single distributable bundle at `./dist/Chalkboard.js`, emits TypeScript declaration files, and then produces a minified bundle. The published package points its `main` and `types` entries to the generated distribution files. API documentation is generated from the same source base through TypeDoc, with `./src/Chalkboard.ts` as the entry point.

This build model reinforces an important design principle: the built library is the supported product. The source is organized for maintainability, but the distribution is intentionally presented as one cohesive artifact.

### C. Public API Surface

The public API consists of:

- the root namespace `Chalkboard`
- a small set of top-level exports such as `APPLY`, `CONTEXT`, `E`, `I`, `PI`, `REGISTER`, `REGISTRY`, `VERSION`, and `VERSIONALIAS`
- fifteen domain namespaces: `abal`, `bool`, `calc`, `comp`, `diff`, `geom`, `matr`, `numb`, `plot`, `quat`, `real`, `stat`, `tens`, `trig`, and `vect`

This surface is intentionally uniform. Consumers do not need to learn different packaging conventions for different subjects; they learn one access pattern and then move across namespaces as needed.

### D. Shared Core Types and Data Representations

Chalkboard's cross-namespace interoperability depends on a small set of shared public representations defined centrally.

| Abstraction | Public representation | Design intent |
| --- | --- | --- |
| Complex number | `{ a, b }` | Lightweight complex arithmetic that composes with algebra, functions, and plotting |
| Quaternion | `{ a, b, c, d }` | Rotation-friendly 4-component representation |
| Vector | Canonical object form with `x`, `y`, optional `z`, `w`; also coercible from arrays, matrices, typed arrays, and strings | Flexible user input with predictable internal structure |
| Matrix | `number[][]` | Dense real-valued matrix representation that is simple to inspect and convert |
| Tensor | Recursive nested arrays of numbers | General-purpose tensor storage without a custom runtime container |
| Function | Tagged object containing `rule`, `field`, and `type` metadata | Enables uniform treatment of scalar, vector, curve, surface, real, and complex functions |
| Set | Membership predicate with optional explicit `elements` and optional canonical `id` | Supports both finite and metadata-backed infinite sets |
| Structure | Set plus algebraic operations and identities | Makes algebraic reasoning explicit and first-class |
| Morphism | Domain structure, codomain structure, and mapping | Makes algebraic structure-preserving maps explicit |
| ODE | Canonical first-order system object with metadata | Normalizes solver inputs and outputs across differential-equation workflows |

These representations are intentionally plain. Chalkboard prefers transparent data shapes and explicit functions over heavy class hierarchies or hidden runtime state.

Several namespaces deliberately normalize user input into these shared forms. `vect` accepts object, array, typed-array, matrix, JSON-string, and tuple-string inputs before coercing them into a canonical vector shape for internal operations. `diff.init` similarly canonicalizes scalar first-order rules, scalar second-order rules, and explicit system rules into the common `ChalkboardODE` first-order system form.

## 4. Core Design Patterns

### A. Domain-Centric Namespaces

Each namespace is responsible for a mathematically coherent subject area. This makes the public API readable and keeps related algorithms, conversions, and helper routines together. Internally, namespaces are not fully independent; they are allowed to depend on each other where that improves expressiveness and reduces duplication.

### B. Lightweight Mathematical Object Models

Chalkboard models many mathematical entities as plain objects whose fields state the behavior the rest of the library needs. For example, sets are represented by membership rules and optional enumerations, structures are represented by sets plus operations, and functions are represented by rules plus type metadata. This keeps the runtime model simple and easy to serialize, inspect, and test.

Normalization and presentation are separated where that improves ergonomics. In `vect`, operations normalize many input forms internally, while `vect.modeConfig` controls the default output representation returned by constructors and selected helpers (`vector`, `array`, `float32array`, `float64array`, `matrix`, `string`, or `json`). A similar pattern appears in `bool`: logical operators accept both booleans and `0` or `1`, and `bool.modeConfig` selects whether public results are emitted in boolean form or binary form. This keeps both namespaces flexible at the boundary without sacrificing one internal mathematical model.

### C. Function Representation and Parsing

`real`, `comp`, and `bool` share a recurring pattern: parse an expression into an internal tree-like representation, then evaluate it, simplify it, or render it as a string, JSON object, or LaTeX. `bool.parse` normalizes expressions by stripping whitespace during tokenization and recognizing `true` and `false` as literal nodes, while other alphanumeric tokens are treated as variable names.

`real.parse` is a recursive-descent parser for arithmetic expressions over real-valued variables and functions. It supports `+`, `-`, `*`, `/`, `^`, parenthesized calls, unary signs, and implicit multiplication such as `2x`, `x(y + 1)`, and `(a + b)(c + d)`. It recognizes a fixed set of built-in real functions such as `sin`, `cos`, `tan`, `abs`, `sqrt`, `log`, `ln`, `exp`, `min`, and `max`, and it can either evaluate numerically from `config.values`, return AST or JSON output, emit LaTeX, or simplify symbolically. Its simplifier performs constant folding and several algebraic rewrites, including flattening sums and products, combining like terms in common cases, distributing multiplication, and expanding some integer powers of sums.

`comp.parse` follows the same broad interface, but extends the tokenization and evaluation model to complex arithmetic. It treats `i` as a first-class literal, supports implicit multiplication such as `2i` and `z(w + 1)`, recognizes built-in complex functions such as `sq`, `sqrt`, `root`, `conj`, `invert`, `mag`, `arg`, `re`, and `im`, and accepts complex-valued substitutions through `config.values`. When an expression is purely real, it can delegate back to `real.parse`; otherwise it may either evaluate directly, or split the expression symbolically into real and imaginary parts and simplify those parts with the real parser before recombining them. One important explicit limit is that complex exponentiation with a genuinely complex exponent is not supported.

The parser registry is the main public extension point for expression parsing. `REGISTER(name, func)` inserts a numeric callback into `REGISTRY`, and the real and complex parsers consult that registry when resolving custom function names. In the complex parser, registered functions are used as real-valued extensions: they are applied only when the supplied arguments can be reduced to real numbers. This keeps the extension surface explicit and inspectable without requiring plugins to understand Chalkboard's internal AST formats.

This pattern is a major architectural motif in Chalkboard. It gives the library symbolic capabilities without requiring a separate symbolic engine or external parser dependency. The tradeoff is that symbolic support is intentionally bounded: simplification is powerful for many common cases, but it is not complete in the sense of a full computer algebra system.

### D. Cross-Namespace Composition

Higher-level namespaces are expected to build on lower-level ones. `calc` composes real, complex, vector, and matrix functionality; `diff` produces solution objects that can be sampled or plotted; `stat` uses matrix operations for regression workflows; `abal` converts among several other mathematical representations; and `plot` sits on top of the computational namespaces instead of reimplementing their logic.

This composition is deliberate. Chalkboard aims to centralize mathematical meaning in a shared set of representations so that users can move from modeling to computation to visualization without changing libraries or data models.

## 5. Subsystem Design

### A. Abstract Algebra

`abal` treats sets, algebraic structures, morphisms, and extensions as first-class objects. Finite explicit sets can be checked by enumeration, while recognized infinite sets can be represented through membership rules and canonical identifiers. This enables expressive code for groups, rings, fields, quotient-like constructions, kernels, images, and isomorphisms.

The key architectural limit is that Chalkboard does not attempt formal proof. For infinite or canonical structures, some reasoning is necessarily metadata-driven rather than exhaustive.

### B. Boolean Algebra and Logic Parsing

`bool` provides elementary logical operators together with a parser, simplifier, truth-table machinery, normal-form transformations, and Karnaugh-map-oriented minimization. The subsystem is designed for symbolic logic workflows that are small enough to remain transparent and pedagogically useful.

Its scope is intentionally narrower than full satisfiability or theorem-solving systems. The emphasis is on readable symbolic manipulation, equivalence checks, and common minimization tasks.

### C. Real and Complex Function Systems

`real` and `comp` implement Chalkboard's main expression and function abstractions. They define typed function objects, parse mathematical expressions, evaluate them numerically, simplify many common forms, and render them in multiple output formats.

The design goal is not only to compute values but also to preserve mathematical intent. Functions carry field and shape metadata, which allows the rest of the library to distinguish scalar fields, vector fields, curves, surfaces, and complex-valued functions without introducing separate object systems for each one.

### D. Calculus and Differential Equations

`calc` and `diff` provide Chalkboard's main numerical-analysis workflows. `calc` implements derivatives, integrals, transforms, vector-calculus operators, and related approximations. `diff` normalizes ordinary differential equations into canonical first-order systems, provides common model constructors, and solves them with fixed-step and adaptive Runge-Kutta methods.

These namespaces are intentionally practical rather than maximalist. They support meaningful simulation and analysis in JavaScript, but they do not claim the scope of specialized stiff solvers, PDE frameworks, or formally verified numerical packages.

### E. Matrices, Vectors, Quaternions, and Tensors

`matr`, `vect`, `quat`, and `tens` provide interoperable representations for dense matrix algebra, 2D to 4D vectors, quaternion arithmetic, and recursive tensor manipulation. Their storage models remain close to plain JavaScript arrays and objects, which keeps conversion and inspection straightforward.

This design favors clarity and portability over specialized storage backends. The tradeoff is that Chalkboard does not target sparse matrices, arbitrary-precision linear algebra, or optimized tensor runtimes.

### F. Statistics, Number Theory, and Trigonometry

`stat`, `numb`, and `trig` provide the support infrastructure that allows other namespaces to stay focused on higher-level mathematical roles. Statistics covers descriptive analysis, regression, interpolation, and resampling; number theory covers combinatorics, divisibility, sequences, distributions, and unit conversion; trigonometry provides trigonometric and hyperbolic functions used throughout the library.

These namespaces are broad by design. Their purpose is to make the larger system self-sufficient for common mathematical workflows in the browser and Node.js, while still remaining consistent with Chalkboard's plain-data, namespace-oriented architecture.

### G. Geometry and Plotting

`geom` is primarily a formula and helper namespace for geometric calculations, with limited rendering support. `plot` is the dedicated visualization layer: it samples functions, fields, matrices, vectors, complex objects, and differential-equation outputs, then renders them through the `Canvas2D` API.

Plotting is intentionally downstream of computation. Chalkboard does not maintain a separate graphics scene model; it reuses the same mathematical objects that the computational namespaces produce.

## 6. Runtime and Integration Model

### A. Browser Integration

In browser environments, Chalkboard attaches itself to `window.Chalkboard`. This keeps examples and educational use cases simple, especially where a single page combines computational code, canvas rendering, and interactive controls.

### B. Node.js Integration

In non-browser environments, Chalkboard exports the same root namespace through `module.exports`. The published package includes declaration files so that TypeScript-aware tooling can type-check consumers of the distributed bundle.

### C. Plotting Context Model

Plotting routines can work with an explicit canvas context, but Chalkboard also exposes a configurable global `CONTEXT` value that names the default rendering context variable to use. This makes browser examples concise and allows tests to stub plotting behavior without requiring a full browser runtime.

The plotting subsystem's main extension point is therefore explicit dependency injection through `config.context`: callers can redirect any plot routine to a specific `CanvasRenderingContext2D` without changing global state. When no context is supplied, `plot` resolves one through `CONTEXT`; if that lookup fails, plotting throws immediately rather than silently doing nothing.

This is a deliberate global integration point rather than an accident. It improves ergonomics, but it also means the plotting subsystem is stateful in a way the purely computational namespaces generally are not.

### D. Documentation and Example Workflows

Chalkboard's communication stack has four layers:

- `./README.md` introduces the library and its major capabilities
- TypeDoc-generated API documentation website provides function-level reference material
- `./examples/` demonstrate end-to-end workflows
- the JOSE `./paper/` explains the software's broader academic motivation and positioning

This `./DESIGN.md` file fills the gap between those materials by describing how the system is put together and what guarantees or limits a reviewer should infer from that design.

## 7. Correctness, Testing, and Documentation

### A. Public-API-Oriented Test Strategy

The tests import the built distribution from `./dist/Chalkboard.js` rather than bypassing the packaging layer and testing only source internals. This is an important architectural choice: it validates the artifact users actually install and helps detect breakage in exporting, bundling, and public behavior.

Navigating `./test/` follows the public namespace layout. `./test/Chalkboard.test.js` covers the top-level exports, while `./test/Chalkboard.namespace.test.js` covers each major namespace individually. This mirrors the API surface closely enough that contributors can usually find the relevant test file by matching the namespace name directly.

Chalkboard generally follows a fail-fast error-handling convention at public entry points. Invalid algebraic assumptions, unsupported mode names, mismatched dimensions, malformed solution objects, out-of-range indices, and missing canvas contexts typically raise `Error` or `TypeError` immediately rather than returning sentinel values. Messages are generally written in plain language and, in many newer subsystems, include the namespace and function name to make misuse easier to localize.

### B. Type Safety and Build Validation

Chalkboard is compiled with TypeScript strictness enabled, emits declaration files, and keeps its public contracts centralized. This makes cross-namespace changes easier to reason about, because changes to shared representations surface quickly through type errors and documentation updates.

### C. API Reference Generation

JSDoc comments in the source are used to generate the documentation website through TypeDoc. This keeps design intent, parameter expectations, and published API reference close to the implementation rather than splitting them across unrelated systems.

### D. Example Coverage and Research Communication

The examples in the `./examples/` folder provide demonstrable evidence that Chalkboard's namespaces work correctly across algebraic, numerical, statistical, and visual workflows. The JOSE paper then explains why these capabilities matter in a pedagogical and development context. Furthermore, there is also one concrete data-producing example for an ODE solver convergence study (`./examples/ode-study.js`), which shows how Chalkboard can be used for serious analyses where the browser is a destination rather than a barrier.

## 8. Maintainability Assessment

### A. Architectural Strengths

Chalkboard's main maintainability strengths are:

- one consistent public access pattern across the whole library
- a small set of shared mathematical representations reused across namespaces
- a domain-oriented organization that matches how users think about mathematics
- a direct path from modeling to computation to plotting using the same public objects
- no runtime dependency graph in the published package
- strict TypeScript checking and emitted declaration files
- tests, examples, and generated documentation that all target the same public library

These choices make the system broad in scope while still intelligible to contributors and reviewers.

### B. Deliberate Tradeoffs

The design also makes deliberate tradeoffs. Namespace files are large, because each namespace is intended to be a substantial subject area rather than a thin wrapper. Internal coupling exists, especially where higher-level workflows depend on lower-level algebraic or numerical primitives. Some namespaces expose mutable configuration points, such as parser registration, plotting context, or output modes.

These tradeoffs are acceptable for Chalkboard because the primary maintenance goal is a coherent mathematical environment, not maximum internal decoupling at the expense of user-facing clarity.

### C. Known Constraints and Non-Goals

Reviewers and contributors should read the following as intentional scope boundaries:

- symbolic simplification is practical and useful, but not complete
- numerical methods are approximate and not positioned as specialized scientific-computing replacements
- matrix and tensor operations use straightforward dense representations rather than specialized storage engines
- some algebraic reasoning over infinite structures relies on metadata and membership predicates rather than exhaustive verification
- plotting is `Canvas2D`-oriented and depends on the computational namespaces instead of forming a separate graphics stack

These constraints are important because they clarify what Chalkboard promises strongly and where it remains intentionally pragmatic.

### D. Evolution Guidelines for Future Contributions

Future changes should preserve the architectural principles above:

- keep public additions within mathematically coherent namespaces
- reuse existing shared representations before introducing new object models
- document limits and approximation behavior explicitly
- avoid new global mutable state unless it materially improves cross-environment usability
- add or update tests against the built distribution for public behavior changes
- update JSDoc, examples, and this document when the public design meaningfully changes

Following these rules keeps Chalkboard broad, but still reviewable and maintainable for real-world utilization.
