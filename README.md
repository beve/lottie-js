# lottie-js

An object model for representing the Lottie JSON structure.

This library is designed to help with serializing and deserializing a Lottie JSON into an object model for validation and ease of value access and manipulation.

### Overview
---

### Documentation &amp; API
---
The documenting system used is [TypeDoc](https://typedoc.org/).

The documentation will be made available on the web soon as a way of providing secure access to it within LottieFiles team is setup. In the mean time clone the repo and run the yarn command: `yarn docs` to generate the docs to browse locally. 

The generated documentation is placed in the docs/ folder but *SHOULD NOT* be committed to git.

### Testing
---
The testing system used is [Jest](https://jestjs.io/) and each file should have an accompanying test suite for functional and integration tests.

### Development
---
Development work on the toolkit requires Nodejs and Yarn.

#### Guidelines
- Use [defensive programming](https://en.wikipedia.org/wiki/Defensive_programming) techniques: Ensure type and range of input values, cast values to native representation whenever possible, etc.
- Refrain from using external dependencies: Discuss before adding a dependency. Check with [Bundlephobia](https://bundlephobia.com/) for package size and dependencies when choosing one.
- Use code formatting in the IDE using the given eslint+prettier configs.
- Write tests to cover all functions and code branches with valid and invalid values.

#### Setting up
```
git clone https://github.com/LottieFiles/lottie-js

cd lottie-js

yarn install
```

#### Running test suite
```
yarn test
```

#### Building
```
yarn build
```
