# jeezy [![Build Status](https://travis-ci.org/HarryStevens/jz.svg?branch=master)](https://travis-ci.org/HarryStevens/jsz) [![Coverage Status](https://coveralls.io/repos/github/HarryStevens/jsz/badge.svg)](https://coveralls.io/github/HarryStevens/jsz)
*jeezy* is a JavaScript library for manipulating strings and arrays. Think of it as a portmanteau of "JavaScript" and "easy".

## Installation

### npm
```bash
npm install jeezy --save
```
```js
var jz = require("jeezy");
```

### Vanilla JS
You can use the CDN from unpkg.
```html
<script src="https://unpkg.com/jeezy/lib/jeezy.js"></script>
<script src="https://unpkg.com/jeezy/lib/jeezy.min.js"></script>
```
If you'd rather host it yourself, download `jeezy.js` or `jeezy.min.js` from the [`lib` directory](https://github.com/HarryStevens/jeezy/tree/master/lib).
```html
<script src="path/to/jeezy.js"></script>
<script src="path/to/jeezy.min.js"></script>
```

## Usage

### Arrays
Javascript has many [built-in methods for manipulating arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array). These functions are meant to supplement those.
* [Arrays: Math](#array-math)
* [Arrays: Queries](#array-queries)
* [Arrays: Transformations](#array-transformations)
* [Arrays: Other](#array-other)
### Strings
Javascript has many [built-in methods for manipulating strings](http://www.w3schools.com/jsref/jsref_obj_string.asp). These functions are meant to supplement those.
* [Strings: Cases](#string-cases)
* [Strings: Numbers](#string-numbers)
* [Strings: Queries](#string-queries)
* [Strings: Transformations](#string-transformations)
* [Strings: Other](#string-other)

---

### <a name="array-math" href="#array-math">Arrays: Math</a>

Functions for doing math with arrays of numbers.

<a name="array-average" href="#array-average">#</a> jz.arr.<b>average</b>(<i>array</i>)

Returns the average of an array of numbers.

<a name="array-extent" href="#array-extent">#</a> jz.arr.<b>extent</b>(<i>array</i>)

Returns the minimum and maximum values of an array of numbers as the array [min, max].

<a name="array-max" href="#array-max">#</a> jz.arr.<b>max</b>(<i>array</i>)

Returns the maximum value of an array of numbers.

<a name="array-median" href="#array-median">#</a> jz.arr.<b>median</b>(<i>array</i>)

Returns the median of an array of numbers.

<a name="array-min" href="#array-min">#</a> jz.arr.<b>min</b>(<i>array</i>)

Returns the minimum value of an array of numbers.

<a name="array-sum" href="#array-sum">#</a> jz.arr.<b>sum</b>(<i>array</i>)

Returns the sum of an array of numbers.


### <a name="array-queries" href="#array-queries">Arrays: Queries</a>

Functions for testing arrays for certain properties. Return booleans.

<a name="array-is" href="#array-is">#</a> jz.arr.<b>is</b>(<i>array</i>)

Tests whether an element is an array. Returns *true* or *false*.


### <a name="array-transformations" href="#array-transformations">Arrays: Transformations</a>

Functions for transforming arrays.

<a name="array-flatten" href="#array-flatten">#</a> jz.arr.<b>flatten</b>(<i>array</i>)

Flattens an array of arrays into a single array.

```js
var arrays = [[1],[2],[3]];
jz.arr.flatten(arrays); // [1, 2, 3]
```

<a name="array-shuffle" href="#array-shuffle">#</a> jz.arr.<b>shuffle</b>(<i>array</i>)

Shuffles an array.

<a name="array-sortNumbers" href="#array-sortNumbers">#</a> jz.arr.<b>sortNumbers</b>(<i>array</i>)

Sorts an array of numbers.


### <a name="array-other" href="#array-other">Arrays: Other</a>

Miscellaneous array functions.

<a name="array-random" href="#array-random">#</a> jz.arr.<b>random</b>(<i>array</i>)

Returns a random item from an array.

---

### <a name="string-cases" href="#string-cases">Strings: Cases</a>

Functions for changing the case of words and characters.

<a name="string-toCamelCase" href="#string-toCamelCase">#</a> jz.str.<b>toCamelCase</b>(<i>string</i>)

Transforms a string into camel case.

```js
jz.str.toCamelCase("Hello world!"); // "helloWorld"
```

<a name="string-toSentenceCase" href="#string-toSentenceCase">#</a> jz.str.<b>toSentenceCase</b>(<i>string</i>)

Capitalizes the first letter of the first word in a string.

<a name="string-toSlugCase" href="#string-toSlugCase">#</a> jz.str.<b>toSlugCase</b>(<i>string</i>)

Transforms a string into a slug.

```js
jz.str.toSlugCase("Hello world!"); // "hello-world"
```

<a name="string-toSnakeCase" href="#string-toSnakeCase">#</a> jz.str.<b>toSnakeCase</b>(<i>string</i>)

Transforms a string into snake case.

```js
jz.str.toSnakeCase("Hello world!"); // "hello_world"
```

<a name="string-toStartCase" href="#string-toStartCase">#</a> jz.str.<b>toStartCase</b>(<i>string</i>)

Capitalizes the first letter of every word in a string.

<a name="string-toTitleCase" href="#string-toTitleCase">#</a> jz.str.<b>toTitleCase</b>(<i>string</i>[, <i>array</i>, <i>boolean</i>])

Transforms a string into title case, where the first letter of every word is capitalized except for certain prepositions, articles and conjunctions.

```js
jz.str.toTitleCase("the quick brown fox jumps over the lazy dog"); // "The Quick Brown Fox Jumps over the Lazy Dog"
jz.str.toTitleCase("javascript: a beginner's guide to the language of the web"); // Javascript: A Beginner's Guide to the Language of the Web
jz.str.toTitleCase("james comey to remain on as FBI director"); // "James Comey to Remain on as FBI Director"
jz.str.toTitleCase("new rules grant FBI, DEA & CIA access to raw NSA surveillance data"); // New Rules Grant FBI, DEA & CIA Access to Raw NSA Surveillance Data
```

### <a name="string-numbers" href="#string-numbers">Strings: Numbers</a>

Functions for manipulating numbers as strings.

<a name="string-numberCommas" href="#string-numberCommas">#</a> jz.str.<b>numberCommas</b>(<i>string</i>)

Adds commas to a number string for thousands, millions, billions, and so on.

<a name="string-numberDecimals" href="#string-numberDecimals">#</a> jz.str.<b>numberDecimals</b>(<i>string</i>, <i>number</i>)

Rounds a number string, both float and integer, to the nearest specified decimal place.

```js
jz.str.numberDecimals("1", 2); // "1.00"
jz.str.numberDecimals("1.235", 2); // "1.24"
```

<a name="string-numberLakhs" href="#string-numberLakhs">#</a> jz.str.<b>numberLakhs</b>(<i>string</i>)

Adds commas to a number string for thousands, lakhs, crores, and so on. This is according to the [Indian numbering system](https://en.wikipedia.org/wiki/Indian_numbering_system).

<a name="string-numberPrependZeros" href="#string-numberPrependZeros">#</a> jz.str.<b>numberPrependZeros</b>(<i>string</i>, <i>number</i>)

Adds zeros before a string so that the length of the string equals a given number of characters. Does nothing to the string if it is already longer than the number of characters.
```js
jz.str.numberPrependZeros("1234", 6); // "001234"
```

### <a name="string-queries" href="#string-queries">Strings: Queries</a>

Functions for testing strings for certain properties. Will return booleans.

<a name="string-endsWith" href="#string-endsWith">#</a> jz.str.<b>endsWith</b>(<i>string</i>, <i>substring</i>[, <i>boolean</i>])

Tests whether a string ends with a substring. Defaults to case sensitive, but you can set the third argument to <i>true</i> for case insensitive.

```js
jz.str.endsWith("Hello world", "LD"); // false
jz.str.endsWith("Hello world", "LD", true); // true
jz.str.endsWith("Hello world", "LD", false); // false
```

<a name="string-includes" href="#string-includes">#</a> jz.str.<b>includes</b>(<i>string</i>, <i>string</i>[, <i>boolean</i>])

Tests whether a string includes a substring. Defaults to case sensitive, but you can set the third argument to <i>true</i> for case insensitive.

```js
jz.str.includes("Hello world", "WO"); // false
jz.str.includes("Hello world", "WO", true); // true
jz.str.includes("Hello world", "WO", false); // false
```

<a name="string-isAllCaps" href="#string-isAllCaps">#</a> jz.str.<b>isAllCaps</b>(<i>string</i>)

Tests whether a string contains only capital letters. Ignores symbols and numbers.

<a name="string-isAllDigits" href="#string-isAllDigits">#</a> jz.str.<b>isAllDigits</b>(<i>string</i>)

Tests whether a string contains only digits.

<a name="string-isAllLower" href="#string-isAllLower">#</a> jz.str.<b>isAllLower</b>(<i>string</i>)

Tests whether a string contains only lowercase letters. Ignores symbols and numbers.

<a name="string-startsWith" href="#string-startsWith">#</a> jz.str.<b>startsWith</b>(<i>string</i>, <i>substring</i>[, <i>boolean</i>])

Tests whether a string starts with a substring. Defaults to case sensitive, but you can set the third argument to <i>true</i> for case insensitive.

```js
jz.str.startsWith("Hello world", "he"); // false
jz.str.startsWith("Hello world", "he", true); // true
jz.str.startsWith("Hello world", "he", false); // false
```

### <a name="string-transformations" href="#string-transformations">Strings: Transformations</a>

Functions for applying various transformations to strings.

<a name="string-keepAll" href="#string-keepAll">#</a> jz.str.<b>keepAll</b>(<i>string</i>, <i>substring</i>)

Keeps all instances of a substring in a string. Removes everything else. Returns a blank string if the substring does not appear in the original string.

<a name="string-keepEnd" href="#string-keepEnd">#</a> jz.str.<b>keepEnd</b>(<i>string</i>, <i>number</i>)

Keeps a certain number of characters at the end of a string and removes the rest.

<a name="string-keepOne" href="#string-keepOne">#</a> jz.str.<b>keepOne</b>(<i>string</i>, <i>string</i>)

Keeps one instance of a substring in a string, even if the substring appears multiple times. Removes everything else. Returns a blank string if the substring does not appear in the original string.

<a name="string-keepStart" href="#string-keepStart">#</a> jz.str.<b>keepStart</b>(<i>string</i>, <i>number</i>)

Keeps a certain number of characters at the start of a string and removes the rest.

<a name="string-removeAll" href="#string-removeAll">#</a> jz.str.<b>removeAll</b>(<i>string</i>, <i>substring</i>)

Removes all instances of a substring from a string.

<a name="string-removeDigits" href="#string-removeDigits">#</a> jz.str.<b>removeDigits</b>(<i>string</i>)

Removes all digits from a string.

```js
jz.str.removeDigits("H1e2l3lo w45orld!6"); // Hello world!
```

<a name="string-removeFirst" href="#string-removeFirst">#</a> jz.str.<b>removeFirst</b>(<i>string</i>, <i>substring</i>)

Removes the first instance of a substring from a string.

<a name="string-removeLast" href="#string-removeLast">#</a> jz.str.<b>removeLast</b>(<i>string</i>, <i>substring</i>)

Removes the last instance of a substring from a string.

<a name="string-removeSymbols" href="#string-removeSymbols">#</a> jz.str.<b>removeSymbols</b>(<i>string</i>)

Removes anything that is not a letter or a space from a string.

<a name="string-removeTags" href="#string-removeTags">#</a> jz.str.<b>removeTags</b>(<i>string</i>[, <i>array</i>])

Removes HTML tags from a string. You can pass an optional array with the tags you want to keep.

```js
jz.str.removeTags("<span><i>Hello</i> <b>world</b>!</span>"); // Hello world!
jz.str.removeTags("<span><i>Hello</i> <b>world</b>!</span>", ["i", "span"]); // <span><i>Hello</i> world!</span>
```

<a name="string-replaceAll" href="#string-replaceAll">#</a> jz.str.<b>replaceAll</b>(<i>string</i>, <i>substringA</i>, <i>substringB</i>)

Replaces all instances of substring A in a string with substring B.

```js
jz.str.replaceAll("Hello world!", "l", "z"); // Hezzo worzd!
```

<a name="string-replaceAt" href="#string-replaceAt">#</a> jz.str.<b>replaceAt</b>(<i>string</i>, <i>index</i>, <i>replacement</i>)

Replaces the characters of a string with another string beginning at a specific index.

```js
jz.str.replaceAt("Hello world!", 6, "Jonny"); // Hello Jonny!
```

<a name="string-replaceFirst" href="#string-replaceFirst">#</a> jz.str.<b>replaceFirst</b>(<i>string</i>, <i>substringA</i>, <i>substringB</i>)

Replaces the first instance of substring A in a string with substring B. Uses the same functionality as the [native Javascript String.replace() method](http://www.w3schools.com/jsref/jsref_replace.asp).

```js
jz.str.replaceFirst("Hello world!", "l", "z"); // Hezlo world!
jz.str.replaceFirst("Hello world!", "ll", "zz"); // Hezzo world!
```

<a name="string-replaceLast" href="#string-replaceLast">#</a> jz.str.<b>replaceLast</b>(<i>string</i>, <i>substringA</i>, <i>substringB</i>)

Replaces the last instance substring A in a string with substring B.

```js
jz.str.replaceLast("Hello world!", "l", "z"); // Hello worzd!
```

<a name="string-reverseCharacters" href="#string-reverseCharacters">#</a> jz.str.<b>reverseCharacters</b>(<i>string</i>)

Reverses the order of a string's characters.

<a name="string-reverseWords" href="#string-reverseWords">#</a> jz.str.<b>reverseWords</b>(<i>string</i>)

Reverses the order of a string's words.

<a name="string-shuffleCharacters" href="#string-shuffleCharacters">#</a> jz.str.<b>shuffleCharacters</b>(<i>string</i>)

Randomly shuffles a string's characters. Uses the [Fischer-Yates shuffle](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle).

<a name="string-shuffleCharactersInWords" href="#string-shuffleCharactersInWords">#</a> jz.str.<b>shuffleCharactersInWords</b>(<i>string</i>)

Randomly shuffles the characters of each word, but keeps the words in order. Uses the [Fischer-Yates shuffle](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle).

<a name="string-shuffleWords" href="#string-shuffleWords">#</a> jz.str.<b>shuffleWords</b>(<i>string</i>)

Randomly shuffles a string's words. Uses the [Fischer-Yates shuffle](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle).

### <a name="string-other" href="#string-other">Strings: Other</a>

Miscellaneous string functions.

<a name="string-count" href="#string-count">#</a> jz.str.<b>count</b>(<i>string</i>, <i>substring</i>)

Counts the number of times a substring occurs in a string.


## Tests
```bash
npm test
```

## Contributing
In lieu of a formal style guide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code.