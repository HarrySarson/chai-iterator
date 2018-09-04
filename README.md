
# chai-iterator: Assertions for iterable objects

[![Greenkeeper badge](https://badges.greenkeeper.io/harrysarson/chai-iterator.svg)](https://greenkeeper.io/)

[![Version][version-badge]][npm]
[![Build][build-badge]][travis]
[![Coverage][coverage-badge]][coveralls]
[![Dependencies][dependencies-badge]][greenkeeper]

## Contents

- [Overview](#overview)
- [Compatibility](#compatibility)
- [Installation](#installation)
- [Setup](#setup)
- [Expect/Should API](#expectshould-api)
- [Assert API](#assert-api)
- [License](#license)

## Overview

**chai-iterator** extends the [Chai][chai] assertion library with methods for
testing [iterable][iterable] objects. Introduced in the
[ES2015 specification][ecma-iterable], iterable objects have an
[`@@iterator`][iterator-method] method, which allows us to iterate over them with
a [`for...of`][for-of] loop. A number of [built-in][built-in-iterable] types are
iterable by default, while [custom iterable objects][custom-iterable] may also
be defined. chai-iterator makes it easy to test all such objects.

#### You may not need chai-iterator

In many cases the [array spread operator][array-spread] is the best way to test iterables.
chai-iterator is however very usefull for testing part of a very long (or infinite) iterable.

#### Basic usage

Here is a fairly exhaustive sample of the assertions we can make using Chai
Iterator. While we could just as easily use `expect` or `assert`, we'll use
Chai's `should()` [assertion style][assertion-style], just to be different.

```js
[2, 3, 5].should.be.iterable;

[2, 3, 5].should.iterate.over([2, 3, 5]);
[2, 3, 5].should.iterate.from([2, 3]);
[2, 3, 5].should.iterate.until([3, 5]);

[2, 3, 5].should.iterate.for.lengthOf(3);
[2, 3, 5].should.iterate.for.length.above(2);
[2, 3, 5].should.iterate.for.length.below(4);
[2, 3, 5].should.iterate.for.length.of.at.least(3);
[2, 3, 5].should.iterate.for.length.of.at.most(3);
[2, 3, 5].should.iterate.for.length.within(2, 4);

[2, 3, 5].should.not.iterate.over([1, 2, 3]);
[{n: 2}, {n: 3}].should.deep.iterate.from([{n: 2}]);
```

Let's not limit ourselves to Arrays; we can test any iterable object.

```js
'abcde'.should.iterate.until(['c', 'd', 'e']);
```

And we can pass any iterable as our expected values too.

```js
'abcde'.should.iterate.until('cde');
```

#### User-defined iterable objects

chai-iterator is best used to test
[user-defined iterable objects][custom-iterable], like the one constructed by
the following [class][class].

```js
class Count {

  constructor(start=0, step=1) {
    this.start = start;
    this.step = step;
  }

  *[Symbol.iterator]() {
    for (let n = this.start; true; n += this.step) {
      yield n;
    }
  }
}
```

The sequence generated by `Count.prototype[@@iterator]()` is infinite;
it continues to yield values indefinitely. Still, we can safely
use the [`from()`](#iteratefromexpected) assertion with it, since it will
terminate as soon as our expected iterable is done.

```js
let tens = new Count(10, 10);

tens.should.be.iterable;
tens.should.iterate.from([10, 20, 30]);
tens.should.iterate.from([10, 20, 30, 40, 50]);
```

Just don't go trying to use [`over()`](#iterateoverexpected) or
[`until()`](#iterateuntilexpected) on infinite sequences. The former will always
fail and the latter will never stop.

#### Generators and iterators

Let's generate the [fibonacci sequence][fibonacci-sequence]. A
[generator function][generator-function] is just a function that returns a
[`Generator`][generator] object &mdash; an [iterator][iterator] that is also
[iterable][iterable]. We can test a `Generator` just as we would any other
iterable.

```js
function* fibonacci() {
  for (let [x, y] = [1, 1]; true; [x, y] = [y, x + y]) {
    yield x;
  }
}

fibonacci().should.iterate.from([1, 1, 2, 3, 5]);
```

Be careful though. Iterators can't go back in time. Once a value has
been yielded, it is lost forever. And so the following assertions pass.

```js
let fiborator = fibonacci();

fiborator.should.iterate.from([1, 1, 2, 3, 5]);
fiborator.should.iterate.from([8, 13, 21, 34]);
```

It usually makes more sense to construct a new `Generator` for each assertion.

```js
fibonacci().should.iterate.from([1, 1, 2, 3, 5]);
fibonacci().should.iterate.from([1, 1, 2, 3, 5, 8, 13]);
```

## Compatibility

chai-iterator requires that [`Symbol.iterator`][iterator-method] be
available in the environment. In [Node][node], this means the version must be
v4.0 or greater. While the latest versions of [most browsers][browser-list] are
compatible, web-facing projects should almost certainly use a polyfill.

The [Babel polyfill][babel-polyfill] is one option for environments that do not
natively support `Symbol.iterator`. More minimally, we can get away with just
two sub-modules from the [core-js][core-js] library, like so.

```js
require('core-js/es6/symbol');
require('core-js/fn/symbol/iterator');
```

## Installation

Install chai-iterator using [npm][npm]. And be sure, of course, to install [Chai][chai-npm].

```sh
npm install --save chai chai-iterator
```

## Setup

chai-iterator can be imported as a [Node][node] module, an [AMD][amd]
module, or included in an HTML [`<script>`][script-tag] tag. For
[TypeScript][typescript] users, declarations are installed with the package.

#### Node

To set up chai-iterator for [Node][node], make sure the version is v4.0 or
higher, as prior versions lack support for the [`@@iterator`][iterator-method]
method.

```js
const chai = require('chai');
const chaiIterator = require('chai-iterator');

chai.use(chaiIterator);
```

#### AMD

chai-iterator can be set up inside of an [AMD][amd] module like so.

```js
define((require, exports, module) => {
  let chai = require('chai');
  let chaiIterator = require('chai-iterator');

  chai.use(chaiIterator);
});
```

#### HTML script tag

chai-iterator can be included via a [`<script>`][script-tag] tag. If it is
loaded after `chai.js`, Chai will use it automatically.

```html
<script src="chai.js"></script>
<script src="chai-iterator.js"></script>
```

#### TypeScript

[TypeScript][typescript] declarations are included in the package. To use them,
ensure chai-iterator is installed with [npm][npm], then install the declarations
and their dependencies via [typings][typings]. And be sure to install the
declarations for [chai][chai-typings].

```sh
typings install --save-dev npm~chai npm:chai-iterator
```

In the [compiler options][compiler-options], set `"target"` to `"es6"`, or at
least include a reference to [`lib.es6.d.ts`][es6-lib]. Now the following will
just work.

```ts
import chai = require("chai");
import chaiIterator = require("chai-iterator");

chai.use(chaiIterator);

[2, 3, 5].should.iterate.over([2, 3, 5]);
```

## Expect/Should API

#### Assertions

- [`iterable`](#iterable)
- [`iterate.over()`](#iterateoverexpected)
- [`iterate.from()`](#iteratefromexpected)
- [`iterate.until()`](#iterateuntilexpected)
- [`iterate.for.lengthOf()`](#iterateforlengthofn)
- [`iterate.for.length.above()`](#iterateforlengthaboven)
- [`iterate.for.length.below()`](#iterateforlengthbelown)
- [`iterate.for.length.of.at.least()`](#iterateforlengthofatleastn)
- [`iterate.for.length.of.at.most()`](#iterateforlengthofatmostn)
- [`iterate.for.length.within()`](#iterateforlengthwithinmin-max)

#### `iterable`

Asserts that the target is an iterable object, i.e., that it has an
[`@@iterator`][iterator-method] method.

```js
expect([2, 3, 5]).to.be.iterable;
expect('abcdefg').to.be.iterable;
expect(12345).not.to.be.iterable;
```

#### `iterate.over(expected)`

Asserts that the target iterates over a given sequence of values. Set the
[`deep`][deep] flag to use deep equality to compare values.

| Param     | Type     | Description         |
| :-------- | :------- | :------------------ |
| expected  | `object` | An iterable object. |

```js
expect([2, 3, 5]).to.iterate.over([2, 3, 5]);
expect('abcdefg').to.itetate.over('abcdefg');
expect([2, 3, 5]).not.to.iterate.over([2, 3]);
expect([{n: 2}, {n: 3}]).to.deep.iterate.over([{n: 2}, {n: 3}]);
```

#### `iterate.from(expected)`

Asserts that the target begins iterating over a given sequence of values. Set
the [`deep`][deep] flag to use deep equality to compare values.

| Param     | Type     | Description         |
| :-------- | :------- | :------------------ |
| expected  | `object` | An iterable object. |

```js
expect([2, 3, 5]).to.iterate.from([2, 3]);
expect('abcdefg').to.iterate.from('abc');
expect([2, 3, 5]).not.to.iterate.from([3, 5]);
expect([{n: 2}, {n: 3}]).to.deep.iterate.from([{n: 2}]);
```

#### `iterate.until(expected)`

Asserts that the target ends iteration with a given sequence of values. Set the
[`deep`][deep] flag to use deep equality to compare values.

| Param     | Type     | Description         |
| :-------- | :------- | :------------------ |
| expected  | `object` | An iterable object. |

```js
expect([2, 3, 5]).to.iterate.until([3, 5]);
expect('abcdefg').to.iterate.until('efg');
expect([2, 3, 5]).not.to.iterate.until([2, 3]);
expect([{n: 2}, {n: 3}]).to.deep.iterate.until([{n: 3}]);
```

#### `iterate.for.lengthOf(n)`

Asserts that the target yields exactly *n* values.

| Param  | Type     | Description         |
| :----- | :------- | :------------------ |
| n      | `number` | A positive integer  |

```js
expect([2, 3, 5]).to.iterate.for.lengthOf(3);
expect('abcdefg').to.iterate.for.lengthOf(7);
expect([2, 3, 5]).not.to.iterate.for.lengthOf(7);
```

#### `iterate.for.length.above(n)`

Asserts that the target yields more than *n* values.

| Param  | Type     | Description         |
| :----- | :------- | :------------------ |
| n      | `number` | A positive integer  |

```js
expect([2, 3, 5]).to.iterate.for.length.above(2);
expect('abcdefg').to.iterate.for.length.above(5);
expect([2, 3, 5]).not.to.iterate.for.length.above(3);
```

#### `iterate.for.length.below(n)`

Asserts that the target yields fewer than *n* values.

| Param  | Type     | Description         |
| :----- | :------- | :------------------ |
| n      | `number` | A positive integer  |

```js
expect([2, 3, 5]).to.iterate.for.length.below(4);
expect('abcdefg').to.iterate.for.length.below(10);
expect([2, 3, 5]).not.to.iterate.for.length.below(3);
```

#### `iterate.for.length.of.at.least(n)`

Asserts that the target yields at least *n* values.

| Param  | Type     | Description         |
| :----- | :------- | :------------------ |
| n      | `number` | A positive integer  |

```js
expect([2, 3, 5]).to.iterate.for.length.of.at.least(2);
expect([2, 3, 5]).to.iterate.for.length.of.at.least(3);
expect([2, 3, 5]).not.to.iterate.for.length.of.at.least(4);
```

#### `iterate.for.length.of.at.most(n)`

Asserts that the target yields at most *n* values.

| Param  | Type     | Description         |
| :----- | :------- | :------------------ |
| n      | `number` | A positive integer  |

```js
expect([2, 3, 5]).to.iterate.for.length.of.at.most(4);
expect([2, 3, 5]).to.iterate.for.length.of.at.most(3);
expect([2, 3, 5]).not.to.iterate.for.length.of.at.most(2);
```

#### `iterate.for.length.within(min, max)`

Asserts that the target yields between *min* and *max* values, inclusive.

| Param  | Type     | Description          |
| :----- | :------- | :------------------- |
| min    | `number` | A positive integer   |
| max    | `number` | A positive integer   |

```js
expect([2, 3, 5]).to.iterate.for.length.within(2, 4);
expect([2, 3, 5]).to.iterate.for.length.within(3, 3);
expect([2, 3, 5]).not.to.iterate.for.length.within(4, 7);
```

## Assert API

#### Assertions

- [`isIterable()`](#isiterablevalue-message)
- [`isNotIterable()`](#isnotiterablevalue-message)
- [`iteratesOver()`](#iteratesovervalue-expected-message)
- [`doesNotIterateOver()`](#doesnotiterateovervalue-expected-message)
- [`deepIteratesOver()`](#deepiteratesovervalue-expected-message)
- [`doesNotDeepIterateOver()`](#doesnotdeepiterateovervalue-expected-message)
- [`iteratesFrom()`](#iteratesfromvalue-expected-message)
- [`doesNotIterateFrom()`](#doesnotiteratefromvalue-expected-message)
- [`deepIteratesFrom()`](#deepiteratesfromvalue-expected-message)
- [`doesNotDeepIterateFrom()`](#doesnotdeepiteratefromvalue-expected-message)
- [`iteratesUntil()`](#iteratesuntilvalue-expected-message)
- [`doesNotIterateUntil()`](#doesnotiterateuntilvalue-expected-message)
- [`deepIteratesUntil()`](#deepiteratesuntilvalue-expected-message)
- [`doesNotDeepIterateUntil()`](#doesnotdeepiterateuntilvalue-expected-message)
- [`lengthOf()`](#lengthofvalue-n-message)

#### Parameters

The parameters for the assert methods are as follows.

| Param    | Type     | Description                              |
| :------- | :------- | :--------------------------------------- |
| value    | `any`    | Any value.                               |
| expected | `object` | An iterable object.                      |
| n        | `number` | A positive integer.                      |
| message? | `string` | An optional message to display on error. |

#### `isIterable(value, [message])`

Asserts that a value is an iterable object, i.e., that it is an object with
an [`@@iterator`][iterator-method] method.

```js
assert.isIterable([2, 3, 5]);
assert.isIterable('abcdefg');
```

#### `isNotIterable(value, [message])`

Asserts that a value is not an iterable object, i.e., that it lacks an
[`@@iterator`][iterator-method] method.

```js
assert.isNotIterable(235);
assert.isNotIterable(true);
```

#### `iteratesOver(value, expected, [message])`

Asserts that a value iterates exactly over a given sequence of values.

```js
assert.iteratesOver([2, 3, 5], [2, 3, 5]);
assert.iteratesOver('abcdefg', 'abcdefg');
```

#### `doesNotIterateOver(value, expected, [message])`

Asserts that a value does not iterate exactly over a given sequence of values.

```js
assert.doesNotIterateOver([2, 3, 5], [1, 2, 3]);
assert.doesNotIterateOver('abcdefg', 'abc');
```

#### `deepIteratesOver(value, expected, [message])`

Asserts that a value iterates exactly over a given sequence of values, using
deep equality.

```js
assert.deepIteratesOver([{n: 2}, {n: 3}], [{n: 2}, {n: 3}]);
assert.deepIteratesOver([[0, 2], [1, 3]], [[0, 2], [1, 3]]);
```

#### `doesNotDeepIterateOver(value, expected, [message])`

Asserts that a value does not iterate exactly over a given sequence of values,
using deep equality.

```js
assert.doesNotDeepIterateOver([{n: 2}, {n: 3}], [{n: 5}, {n: 7}]);
assert.doesNotDeepIterateOver([[0, 2], [1, 3]], [[1, 3], [0, 2]]);
```

#### `iteratesFrom(value, expected, [message])`

Asserts that a value begins iteration with a given sequence of values.

```js
assert.iteratesFrom([2, 3, 5], [2, 3, 5]);
assert.iteratesFrom([2, 3, 5], [2, 3]);
assert.iteratesFrom('abcdefg', 'abc');
assert.iteratesFrom('abcdefg', '');
```

#### `doesNotIterateFrom(value, expected, [message])`

Asserts that a value does not begin iteration with a given sequence of values.

```js
assert.doesNotIterateFrom([2, 3, 5], [3, 5]);
assert.doesNotIterateFrom('abcdefg', 'cdef');
```

#### `deepIteratesFrom(value, expected, [message])`

Asserts that a value begins iteration with a given sequence of values, using
deep equality.

```js
assert.deepIteratesFrom([{n: 2}, {n: 3}], [{n: 2}]);
assert.deepIteratesFrom([[0, 2], [1, 3]], [[0, 2]]);
```

#### `doesNotDeepIterateFrom(value, expected, [message])`

Asserts that a value does not begin iteration with a given sequence of values,
using deep equality.

```js
assert.doesNotDeepIterateFrom([{n: 2}, {n: 3}], [{n: 5}]);
assert.doesNotDeepIterateFrom([[0, 2], [1, 3]], [[1, 3]]);
```

#### `iteratesUntil(value, expected, [message])`

Asserts that a value ends iteration with a given sequence of values.

```js
assert.iteratesUntil([2, 3, 5], [2, 3, 5]);
assert.iteratesUntil([2, 3, 5], [3, 5]);
assert.iteratesUntil('abcdefg', 'efg');
assert.iteratesUntil('abcdefg', '');
```

#### `doesNotIterateUntil(value, expected, [message])`

Asserts that a value does not end iteration with a given sequence of values.

```js
assert.doesNotIterateUntil([2, 3, 5], [2, 3]);
assert.doesNotIterateUntil('abcdefg', 'cdef');
```

#### `deepIteratesUntil(value, expected, [message])`

Asserts that a value ends iteration with a given sequence of values, using
deep equality.

```js
assert.deepIteratesUntil([{n: 2}, {n: 3}], [{n: 3}]);
assert.deepIteratesUntil([[0, 2], [1, 3]], [[1, 3]]);
```

#### `doesNotDeepIterateUntil(value, expected, [message])`

Asserts that a value does not end iteration with a given sequence of values,
using deep equality.

```js
assert.doesNotDeepIterateUntil([{n: 2}, {n: 3}], [{n: 5}]);
assert.doesNotDeepIterateUntil([[0, 2], [1, 3]], [[0, 2]]);
```

#### `lengthOf(value, n, [message])`

Asserts that an iterable yields a given number of values. If *value* is not an
iterable object, or if it has a `'length'` property, Chai's built-in
[`assert.lengthOf()`][chai-assert-lengthof] will be used.

```js
function* range(min=0, max=Infinity, step=1) {
  for (let n = min; n < max; n += step) {
    yield n;
  }
}

assert.lengthOf(range(0, 10), 10);
assert.lengthOf(range(6, 42), 36);
```

## License

Copyright &copy; 2016&ndash;2017 Akim McMath. Licensed under the [MIT License][license].

[version-badge]: https://badge.fury.io/js/chai-iterator.svg
[build-badge]: https://travis-ci.com/harrysarson/chai-iterator.svg?branch=master
[coverage-badge]: https://coveralls.io/repos/github/harrysarson/chai-iterator/badge.svg?branch=master
[dependencies-badge]: https://badges.greenkeeper.io/harrysarson/chai-iterator.svg

[npm]: https://www.npmjs.com/package/chai-iterator
[travis]: https://travis-ci.org/harrysarson/chai-iterator
[coveralls]: https://coveralls.io/github/harrysarson/chai-iterator?branch=master
[greenkeeper]: https://greenkeeper.io

[chai]: http://chaijs.com/
[iterable]: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Iteration_protocols#iterable
[ecma-iterable]: http://www.ecma-international.org/ecma-262/6.0/#sec-iterable-interface
[iterator-method]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/iterator
[for-of]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of
[array-spread]: (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) 
[built-in-iterable]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#Builtin_iterables
[custom-iterable]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#User-defined_iterables
[assertion-style]: http://chaijs.com/guide/styles/
[class]: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes
[fibonacci-sequence]: https://en.wikipedia.org/wiki/Fibonacci_number
[generator-function]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*
[generator]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator
[iterator]: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Iteration_protocols#iterator
[node]: https://nodejs.org/
[browser-list]: https://kangax.github.io/compat-table/es6/#test-well-known_symbols_Symbol.iterator,_existence
[babel-polyfill]: https://babeljs.io/docs/usage/polyfill/
[core-js]: https://github.com/zloirock/core-js
[amd]: https://github.com/amdjs/amdjs-api/wiki/AMD
[script-tag]: https://developer.mozilla.org/en/docs/Web/HTML/Element/script
[typescript]: http://www.typescriptlang.org/
[chai-typings]: https://github.com/typed-typings/npm-chai
[typings]: https://github.com/typings/typings
[compiler-options]: https://www.typescriptlang.org/docs/handbook/compiler-options.html
[es6-lib]: https://github.com/Microsoft/TypeScript/blob/master/lib/lib.es6.d.ts
[deep]: http://chaijs.com/api/bdd/#method_deep
[chai-npm]: https://www.npmjs.com/package/chai
[chai-assert-lengthof]: http://chaijs.com/api/assert/#method_lengthof
