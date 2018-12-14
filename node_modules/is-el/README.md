![100% test coverage](https://img.shields.io/badge/coverage-100%25-brightgreen.svg)

# is-el

Utility to determine if passed value is a valid element.

## Installation
Install via npm.

```sh
$ npm i is-el --save
```

## Usage
```js
var isEl = require('is-el');

console.log(isEl(document.documentElement)); // true
console.log(isEl(document)); // false
```
