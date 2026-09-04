# Chalkboard documentation
The documentation for Chalkboard can be found [here](https://zushah.github.io/Chalkboard) and its source code can be found [here](https://www.github.com/Zushah/zushah.github.io/blob/main/Chalkboard).

Documentation uses an isolated TypeScript v6.0.3, TypeDoc v0.28.20, and material theme v1.4.1 toolchain until TypeDoc supports TypeScript v7.0.2. From the repository root, install it once with `npm --prefix docs ci`, then run `npm run docs`. The configuration stays at `./typedoc.json` in the repository root; its output directory remains the sibling website checkout. For a local preview elsewhere, use `npm run docs -- --out ./preview` (relative to `./docs/`).

This documentation package only generates the website. The root TypeScript v7.0.2 compiler owns source checking and distribution builds. Running `npm ci` in the repository root does not install documentation dependencies.
