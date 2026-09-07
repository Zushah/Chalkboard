# Contributing to Chalkboard

Thank you for considering to contribute to Chalkboard! This document provides guidelines and instructions for doing so.

## How to Ask Questions

If you have a question about how to use Chalkboard, please first check the [`README.md`](https://github.com/Zushah/Chalkboard/blob/main/README.md) file, or the [`./examples/`](https://github.com/Zushah/Chalkboard/tree/main/examples) folder, or above all, the [documentation](https://zushah.github.io/Chalkboard). If you still need help, feel free to open an [issue](https://github.com/Zushah/Chalkboard/issues) with the `question` tag.

## How to Report Bugs

If you find a bug in the source code, please open an [issue](https://github.com/Zushah/Chalkboard/issues). 
- Tag the issue as `bug`
- Give it a descriptive title
- Explain the steps to reproduce the behavior
- Include the expected behavior vs the actual behavior
- Provide details about your environment (i.e. browser/node, etc.)

## How to Suggest Features

If you have an idea for a new feature or an improvement to an existing one, please submit an [issue](https://github.com/Zushah/Chalkboard/issues).
- Tag the issue as `feature`
- Explain why this feature would be beneficial
- Provide at least one example of how the new feature would be used

## How to Contribute Code

1. Fork the `Zushah/Chalkboard` repository and clone it.
2. Create a new branch for your contribution with a useful but concise name.
3. Install development dependencies with `npm install`, which will install [TypeScript](https://www.npmjs.com/package/typescript) and [Terser](https://www.npmjs.com/package/terser). Note that Chalkboard has zero runtime dependencies and it is highly preferable to keep it that way.
4. Make your contribution. Make sure each commit is focused on a single contribution, whether it's big or small. Also, please try to follow the existing code and documentation styles and conventions and whatnot.
5. Build the bundles and run the tests with `npm run build` and `npm run test`, respectively, or simply `npm run dev`. Make sure all tests pass. Update current tests or add new tests if applicable. Also, make sure to visually inspect or manually exercise `./examples/` files that are possibly affected by your contribution. Update current examples or add new examples if applicable.
6. Use `npm run restore` to restore the built JavaScript bundles of the latest release, since new bundles are only committed for new releases.
7. Submit a [pull request](https://github.com/Zushah/Chalkboard/pulls) against the `main` branch of the `Zushah/Chalkboard` repository. In the pull request's description, thoroughly explain your contribution and, if applicable, link it to relevant open [issues](https://github.com/Zushah/Chalkboard/issues). Thanks!

## License

By contributing to Chalkboard, you agree that your contributions will be licensed under the [Mozilla Public License 2.0](https://github.com/Zushah/Chalkboard/blob/main/LICENSE.md).
