---
title: 'Chalkboard: A Library at the Intersection of Pure Mathematics and Web Engineering'
tags:
    - TypeScript
    - JavaScript
    - Pure mathematics
    - Web engineering
    - Abstract computation
    - Pedagogical visualization
    - Creative coding
authors:
    - name: Z. U. Shah
      orcid: 0009-0000-8655-5530
      affiliation: "1"
affiliations:
    - name: University of South Carolina, United States
      index: 1
date: 2 March 2026
bibliography: paper.bib
---

# Summary

Chalkboard is a library at the intersection of pure mathematics and web engineering. It facilitates the construction and manipulation of computational structures and analytical systems in JavaScript and Node.js environments.

The library provides a comprehensive system of functionalities, including but not limited to defining isomorphisms between algebraic structures, computing the flux of vector fields over parameterized surfaces, simulating systems of differential equations, visualizing statistical regression models, simplifying and evaluating both real- and complex-valued expressions, executing multidimensional matrix operations, and automating Karnaugh map minimizations.

Rather than operating as a bag of isolated utilities, Chalkboard is organized into coalesced namespaces, which provides an ergonomic API for mathematical abstractions and pedagogical applications. Ultimately, Chalkboard is intended to serve as a foundational engine for projects where mathematical structure is primary, not periphery.

# Statement of Need

Historically, computational prowess for formal mathematics has been dominated by languages such as Python, Julia, and C++. However, as academic notebooks, interactive visualizations, and educational utilities increasingly flourish on the web, there is a growing need for formal mathematics that is native to JavaScript as well.

Chalkboard addresses this need as a mathematics system for the web. It is designed to allow researchers, web developers, and educators to build rigorously analytical and highly visual programs in modern web applications.

# State of the Field

While the JavaScript ecosystem contains several established and excellent mathematical libraries, such as Math.js [@mathjs], Decimal.js [@decimaljs], and stdlib [@stdlibjs], these projects are heavily focused on utilities for raw numerical calculations. They lack the infrastructure to comfortably handle pure mathematical concepts, such as defining quotient groups as sets of cosets with operations inherited from their parent groups, processing solutions of nth-dimensional systems of differential equations, or generating prime implicants of boolean expressions.

When "build" versus "contribute" approaches were considered, it became clear that the existing libraries are insufficient for empowering users with high-level abstractions for pure mathematics. Integrating formal structures into inherently numerical calculators would require fundamental architectural rewrites of those libraries. Therefore, Chalkboard was built as a structural abstraction layer for formal mathematical objects in JavaScript, enabling first-class representations of abstract algebra, complex analysis, and number theory directly on the web.

# Software Design

Existing JavaScript mathematical libraries often present as amalgamations of helper functions, which can easily lead to disorganization in sophisticated codebases. To avoid this, Chalkboard is designed for both pure and applied mathematical concepts to be organized into fifteen coherent namespaces (for example, `Chalkboard.abal` for abstract algebra, `Chalkboard.comp` for complex numbers, and `Chalkboard.diff` for differential equations) of almost seven hundred functions in total.

To illustrate this ergonomic approach, consider how Chalkboard provides a declarative syntax that mirrors the style of writing pure mathematics:
```js
// Define sets
const Z4 = Chalkboard.abal.Z(4);
const C4 = Chalkboard.abal.C(4);

// Define groups
const G = Chalkboard.abal.group(Z4, (m, n) => (m + n) % 4);
const H = Chalkboard.abal.group(C4, (z, w) => Chalkboard.comp.mul(z, w));

// Define isomorphism
const F = Chalkboard.abal.isomorphism(G, H, (n) => Chalkboard.I(n));
```
In the snippet above, Chalkboard defines a group isomorphism $F: G \to H$ between the additive group of integers modulo 4, $G = (\mathbb{Z}_4, +)$, and the multiplicative group of fourth roots of unity, $H = (\mathbb{C}_4, \times)$. Rather than treating these as mere arrays, the library represents them as custom `ChalkboardStructure` datatypes (in fact, it has a total of eleven custom datatypes, facilitating the functions in various namespaces to be able to "understand" their mathematical contexts), which allow the `Chalkboard.abal` namespace to treat them as virtual algebraic structures, and thus robustly assess the group axioms for them. This enables the library to verify that the mapping $F(n) = i^n$ preserves the underlying structure, or in other words, to verify that the operation in the domain $G$ is perfectly mirrored by the operation in the codomain $H$.

# Research Impact Statement

Chalkboard significantly lowers the barrier to entry of creatively and powerfully demonstrating mathematical beauty and curiosity on the web. Its [documentation](https://zushah.github.io/Chalkboard) includes a variety of [examples](https://zushah.github.io/Chalkboard/examples) to get started with: for physics, Chalkboard can simulate the [three-body problem](https://zushah.github.io/Chalkboard/examples/threebody.html) with a 12-dimensional ordinary differential equation and model [fluid flow](https://zushah.github.io/Chalkboard/examples/fluid.html) using particles moving along a vector field; it supports abstract algebra and number theory with thorough namespaces that allow visual demonstrations of [group isomorphisms](https://zushah.github.io/Chalkboard/examples/isomorphism.html) and [modular arithmetic symmetry](https://zushah.github.io/Chalkboard/examples/mandala.html); it is also highly capable in applied contexts, from rendering real-time statistical [telemetry dashboards](https://zushah.github.io/Chalkboard/examples/telemetry.html) to executing 3D rotations with both [matrices](https://zushah.github.io/Chalkboard/examples/matr-donut.html) and [quaternions](https://zushah.github.io/Chalkboard/examples/quat-donut.html); lastly, it can effectively exhibit classic explanatory graphics, such as the [Mandelbrot set](https://zushah.github.io/Chalkboard/examples/mandelbrot.html) from the subject of complex numbers and [Newton's method](https://zushah.github.io/Chalkboard/examples/newton.html) from the subject of calculus.

![Chalkboard is used to visualize the group isomorphism between the integers modulo 4 ($\mathbb{Z}_4$) and the fourth roots of unity ($\mathbb{C}_4$).](paper.png)

# AI Usage Disclosure

During the development of this library, the author used Anthropic's Claude and Google's Gemini for assistance with testing and debugging the code at various stages. The author has reviewed, modified, and validated all AI-generated code to ensure that it accurately adheres to his architectural decisions.

# Acknowledgements

The author would like to acknowledge the contributors who have helped develop Chalkboard. Specifically, thanks to GitHub users [\@bhavjitChauhan](https://www.github.com/bhavjitChauhan) for his contribution of adding partial pivoting to the matrix inversion function, [\@gyang0](https://www.github.com/gyang0) for his contributions to the documentation of the plotting and geometry namespaces, and [\@JentGent](https://www.github.com/JentGent) for his open-source implementation [@jentgent_linalg] of QR decomposition that was adapted into the matrix namespace.

# References
