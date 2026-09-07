# Chalkboard documentation

The documentation for Chalkboard can be found [here](https://zushah.github.io/Chalkboard).

Documentation uses an isolated TypeScript v6.0.3, TypeDoc v0.28.20, and material theme v1.4.1 toolchain until TypeDoc [supports](https://github.com/TypeStrong/typedoc/issues/3098) TypeScript v7.0.2. From the repository root, install it once with `npm --prefix docs install`, then run `npm run docs`.

The complete documentation website is generated at `./docs/build/`. This directory is ignored by Git and is deployed to GitHub Pages by `./.github/workflows/docs.yaml`.

TypeDoc generates the API documentation using the `./typedoc.json` configuration. The examples homepage is maintained at `./docs/examples/index.html`, while the individual example pages are generated from the existing `./examples/*.js` files by `./scripts/build_docs.py`.

The documentation package only generates the website. The TypeScript v7.0.2 compiler in the root of the repository is responsible for source checking and distribution builds. Therefore, note that running `npm install` in the repository root does not install documentation dependencies.
