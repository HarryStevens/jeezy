# jeezy
JavaScript. Easy.

[![Build Status](https://travis-ci.org/HarryStevens/jeezy.svg?branch=master)](https://travis-ci.org/HarryStevens/jeezy) [![Coverage Status](https://coveralls.io/repos/github/HarryStevens/jeezy/badge.svg?branch=master)](https://coveralls.io/github/HarryStevens/jeezy?branch=master)

<b>jeezy</b> is a JavaScript library for manipulating data. It provides lots of useful functions and has no dependencies, so it won't add a lot of code to your project.

- [Installation](#installation)
- [Usage](#usage)
- [Tests](#tests)
- [Contributing](#contributing)

## <a name="installation" href="#installation">Installation</a>

### npm
```bash
npm install jeezy --save
```
```js
var jz = require("jeezy");
```

### Web browser

In vanilla, a `jz` global is exported. You can use the CDN from unpkg.
```html
<script src="https://unpkg.com/jeezy@1.13.1/lib/jeezy.js"></script>
<script src="https://unpkg.com/jeezy@1.13.1/lib/jeezy.min.js"></script>
```
If you'd rather host it yourself, download `jeezy.js` or `jeezy.min.js` from the [`lib` directory](https://github.com/HarryStevens/jeezy/tree/master/lib).
```html
<script src="path/to/jeezy.js"></script>
<script src="path/to/jeezy.min.js"></script>
```

## <a name="usage" href="#usage">Usage</a>

### Arrays
Javascript has many [built-in methods for manipulating arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array). These functions are meant to supplement those.
* [Arrays: Math](#array-math)
* [Arrays: Queries](#array-queries)
* [Arrays: Transformations](#array-transformations)
* [Arrays: Other](#array-other)

### Numbers
Javascript has many [built-in methods for manipulating numbers](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number). These functions are meant to supplement those.
* [Numbers: Queries](#number-queries)
* [Numbers: Other](#number-other)

### Strings
Javascript has many [built-in methods for manipulating strings](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String). These functions are meant to supplement those.
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

<a name="array-correlationMatrix" href="#array-correlationMatrix">#</a> jz.arr.<b>correlationMatrix</b>(<i>data</i>, <i>columns</i>)

Given a <em>data</em> set (an array of objects) and a list of <em>columns</em> (an array with a list of numeric columns), calculate the Pearson correlation coeffient for each pair of columns and return a correlation matrix, which is an array of objects where each object takes the form `{column_x: String, column_y: String, correlation: Number}`. [Demo](https://bl.ocks.org/HarryStevens/302d078a089caf5aeb13e480b86fdaeb)

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

<a name="array-columnsToValues" href="#array-columnsToValues">#</a> jz.arr.<b>columnsToValues</b>(<i>array</i>)

Expands a two-dimensional array of objects in which the column names contain values.

```js
var data = [{year: 2015, Bob: 6, Steve: 10}, {year: 2016, Bob: 7, Steve: 12}, {year: 2017, Bob: 4, Steve: 16}];
data = jz.arr.columnsToValues(data);
/*
[ { year: 2015, column: "Bob", value: 6 },
  { year: 2016, column: "Bob", value: 7 },
  { year: 2017, column: "Bob", value: 4 },
  { year: 2015, column: "Steve", value: 10 },
  { year: 2016, column: "Steve", value: 12 },
  { year: 2017, column: "Steve", value: 16 } ]
*/
jz.arr.renameProperty(data, {in: "column", out: "first_name"});
```

<a name="array-flatten" href="#array-flatten">#</a> jz.arr.<b>flatten</b>(<i>array</i>)

Flattens an array of arrays into a single array.

```js
var arrays = [[1],[2],[3]];
jz.arr.flatten(arrays); // [1, 2, 3]
```

<a name="array-merge" href="#array-merge">#</a> jz.arr.<b>merge</b>(<i>array1</i>, <i>array2</i>, <i>property</i>)

Merges two arrays of objects on a specified property. Keeps each object of the first array, and adds the matching properties of the first matched object in the second array.

<a name="array-pivot" href="#array-pivot">#</a> jz.arr.<b>pivot</b>(<i>array</i>, <i>string</i>)

Pivots an array of objects around the unique values of an attribute. Returns the unique values and the count of how many times each appears in the original array.

```js
var json = [ { value: 1 }, { value: 2 }, { value: 3 }, { value: 1 }, { value: 2 } ];
jz.arr.pivot(json, "value"); // [ { value: 1, count: 2 }, { value: 2, count: 2 }, { value: 3, count: 1 } ]
```

<a name="array-pluck" href="#array-pluck">#</a> jz.arr.<b>pluck</b>(<i>array</i>, <i>string</i>)

Returns all the values of a specified attribute or mapping function from an array of objects.

```js
var json = [ { value: 1 }, { value: 2 }, { value: 3 }, { value: 1 }, { value: 2 } ];
jz.arr.pluck(json, "value"); // [1, 2, 3, 1, 2]
jz.arr.pluck(json, function(d){ return d.value + 1; }); // [2, 3, 4, 2, 3]
```

<a name="array-propertyToNumber" href="#array-propertyToNumber">#</a> jz.arr.<b>propertyToNumber</b>(<i>data</i>, <i>string OR array of strings</i> [, <i>coerce function</i>])

Coerces the type of a property to a number in every object in an array of objects. The second argument can be a string with a single property name, or an array of strings with one or more property names.

By default, non-numeric values will be converted to `NaN`. But you can pass an optional third argument – a <i>coerce function</i> to decide how to deal with non-numeric values. However, if the function you pass returns a non-numeric value, that value will itself be coerced to `NaN`.

Examples of coerce functions are:
```js
function(d){ return jz.str.keepNumber(d); }
function(d){ return 0; }
```

<a name="array-removeItem" href="#array-removeItem">#</a> jz.arr.<b>removeItem</b>(<i>array</i>, <i>item</i>)

Removes an item from an array, and returns the array.

<a name="array-removeProperty" href="#array-removeProperty">#</a> jz.arr.<b>removeProperty</b>(<i>array</i>, <i>property string OR array of property strings</i>)

Removes a property or properties from every object in an array of objects. The second argument can be a string or, if you want to remove multiple properties, an array of strings.

```js
var json = [ { value: 1, name: "Bob", age: 30 }, { value: 2, name: "Steve", age: 23 }, { value: 3, name: "John", age: 40 }, { value: 1, name: "Tim", age: 6 }, { value: 2, name: "Jake", age: 92 } ];
jz.arr.removeProperty(json, "age"); // [ { value: 1, name: "Bob" }, { value: 2, name: "Steve" }, { value: 3, name: "John" }, { value: 1, name: "Tim" }, { value: 2, name: "Jake" } ]
jz.arr.removeProperty(json, ["value", "age"]); // [ { name: "Bob" }, { name: "Steve" }, { name: "John" }, { name: "Tim" }, { name: "Jake" } ]
```

<a name="array-renameProperty" href="#array-renameProperty">#</a> jz.arr.<b>renameProperty</b>(<i>array</i>, <i>renamer</i>)

Renames a property or properties in every object of an array of objects. You must pass a "renamer" as the second argument. If you are only renaming one property, the renamer can be an object with the properties "in", the value of which is a string with the input property name, and "out", the value of which is a string with the output property name. If you are renaming multiple properties, the renamer can be an array of objects, where each object has the "in" and "out" properties of the single renamer.

```js
var json = [ { value: 1, name: "Bob", age: 30 }, { value: 2, name: "Steve", age: 23 } ];
jz.arr.renameProperty(json, {in: "value", out: "number"}) // [ { number: 1, name: "Bob", age: 30 }, { number: 2, name: "Steve", age: 23 } ];
jz.arr.renameProperty(json, [{in: "value", out: "number"}, {in: "age", out: "shoes"}]); // [ { number: 1, name: "Bob", shoes: 30 }, { number: 2, name: "Steve", shoes: 23 } ];
```

<a name="array-shuffle" href="#array-shuffle">#</a> jz.arr.<b>shuffle</b>(<i>array</i>)

Shuffles an array.

<a name="array-sortBy" href="#array-sortBy">#</a> jz.arr.<b>sortBy</b>(<i>array</i>[, <i>order</i>])

Sorts an array of objects by the values of an attribute. The attribute can be either a string representing a property in each object, or an accessor modifying each object. You can specify the order of the sort as descending or ascending by using "desc" or "asc" as the optional third argument. If there is no third argument, the sort order defaults to ascending.

```js
var json = [ { value: "a", count: 2 }, { value: "b", count: 2 }, { value: "c", count: 1 } ]
jz.arr.sortBy(json, "count"); // [ { value: "c", count: 1 }, { value: "a", count: 2 }, { value: "b", count: 2 } ]
jz.arr.sortBy(json, "count", "asc"); // [ { value: "c", count: 1 }, { value: "a", count: 2 }, { value: "b", count: 2 } ]
jz.arr.sortBy(json, "count", "desc"); // [ { value: "b", count: 2 }, { value: "a", count: 2 }, { value: "c", count: 1 } ]
```

<a name="array-sortNumbers" href="#array-sortNumbers">#</a> jz.arr.<b>sortNumbers</b>(<i>array</i>[, <i>order</i>])

Sorts an array of numbers in ascending order by default. For descending order, pass "desc" as <i>order</i>.

<a name="array-unique" href="#array-unique">#</a> jz.arr.<b>unique</b>(<i>array</i>)

Returns unique values of an array.

<a name="array-uniqueBy" href="#array-uniqueBy">#</a> jz.arr.<b>uniqueBy</b>(<i>array</i>, <i>string</i>)

Returns an array of unique values of an object property or mapping function in an array of objects.

```js
var json = [ { value: 1, name: "Bob", age: 6}, { value: 2, name: "Steve", age: 6}, { value: 3, name: "John", age: 6}, { value: 1, name: "Tim", age: 23}, { value: 2, name: "Jake", age: 30}, { value: 3, name: "John", age: 40}, { value: 1, name: "Tim", age: 92} ];
jz.arr.uniqueBy(json, "age"); // [ 6, 23, 30, 40, 92 ]
jz.arr.uniqueBy(json, "name"); // [ "Bob", "Steve", "John", "Tim", "Jake" ]
jz.arr.uniqueBy(json, "value"); // [ 1, 2, 3 ]
jz.arr.uniqueBy(json, function(d){ return d.value + 1; }); // [2, 3, 4]
```

### <a name="array-other" href="#array-other">Arrays: Other</a>

Miscellaneous array functions.

<a name="array-deepCopy" href="#array-deepCopy">#</a> jz.arr.<b>deepCopy</b>(<i>array</i>)

Returns a deep copy of an array.

<a name="array-random" href="#array-random">#</a> jz.arr.<b>random</b>(<i>array</i>)

Returns a random item from an array.

<a name="array-shallowCopy" href="#array-shallowCopy">#</a> jz.arr.<b>shallowCopy</b>(<i>array</i>)

Returns a shallow copy of an array.

---

### <a name="number-queries" href="#number-queries">Numbers: Queries</a>

Functions for testing numbers for certain properties.

<a name="number-isEven" href="#number-isEven">#</a> jz.num.<b>isEven</b>(<i>integer</i>)

Tests whether an integer is even.

### <a name="number-other" href="#number-other">Numbers: Other</a>

Miscellaneous number functions.

<a name="number-randBetween" href="#number-randBetween">#</a> jz.num.<b>randBetween</b>(<i>min</i>, <i>max</i>)

Returns a random integer between two specified integers. If the second integer is less than the first, returns the first.

---

### <a name="string-cases" href="#string-cases">Strings: Cases</a>

Functions for changing the case of words and characters.

<a name="string-toCamelCase" href="#string-toCamelCase">#</a> jz.str.<b>toCamelCase</b>(<i>string</i>)

Transforms a string into camel case.

```js
jz.str.toCamelCase("Hello world!"); // "helloWorld"
```

<a name="string-toSentenceCase" href="#string-toSentenceCase">#</a> jz.str.<b>toSentenceCase</b>(<i>string[, boolean]</i>)

Capitalizes the first letter of the first word in a string. Defaults to ignoring capital letters after the first letter. Set the second argument to `true` to include them.

```js
var string = "new rules grant F.B.I., DEA & CIA access to 'raw' NSA surveillance data";
jz.str.toSentenceCase(string); // "New rules grant F.B.I., DEA & CIA access to 'raw' NSA surveillance data"
jz.str.toSentenceCase(string, true); // "New rules grant f.b.i., dea & cia access to 'raw' nsa surveillance data"
```

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

Capitalizes the first letter of every word in a string. Defaults to ignoring capital letters after the first letter. Set the second argument to `true` to include them.

```js
jz.str.toStartCase("Hello world!"); // "Hello World!";

var string = "new rules grant F.B.I., DEA & CIA access to 'raw' NSA surveillance data";
jz.str.toStartCase(string); // "New Rules Grant F.B.I., DEA & CIA Access To 'Raw' NSA Surveillance Data"
jz.str.toStartCase(string, true); // "New Rules Grant F.b.i., Dea & Cia Access To 'Raw' Nsa Surveillance Data"
```

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

<a name="string-numberOrdinal" href="#string-numberOrdinal">#</a> jz.str.<b>numberOrdinal</b>(<i>string</i>)

Returns an ordinal number (1st, 2nd, 3rd, 4th, ...).

<a name="string-numberPrepend" href="#string-numberPrepend">#</a> jz.str.<b>numberPrepend</b>(<i>string</i>, <i>number</i>, <i>prepend_character</i>)

Adds a `prepend_character` before a string so that the length of the string equals a given number of characters. Does nothing to the string if it is already the same length or longer than the number of characters.
If you do not specify a `prepend_character`, it defaults to `"0"`. If you specify a `prepend_character` of length greater than one, it uses just the first character.
```js
jz.str.numberPrepend("1234", 6); // "001234"
```

### <a name="string-queries" href="#string-queries">Strings: Queries</a>

Functions for testing strings for certain properties.

<a name="string-count" href="#string-count">#</a> jz.str.<b>count</b>(<i>string</i>, <i>substring</i>)

Counts the number of times a substring occurs in a string.

<a name="string-endsWith" href="#string-endsWith">#</a> jz.str.<b>endsWith</b>(<i>string</i>, <i>substring</i>[, <i>boolean</i>])

Tests whether a string ends with a substring. Defaults to case sensitive, but you can set the third argument to <i>true</i> for case insensitive.

```js
jz.str.endsWith("Hello world", "LD"); // false
jz.str.endsWith("Hello world", "LD", true); // true
jz.str.endsWith("Hello world", "LD", false); // false
```

<a name="string-firstLetter" href="#string-firstLetter">#</a> jz.str.<b>firstLetter</b>(<i>string</i>)

Returns the first letter of a string. If there are no letters in the string, returns `null`.

```js
jz.str.firstLetter("Hello world!"); // "H"
jz.str.firstLetter("!!Hello world!"); // "H"
jz.str.firstLetter("!"); // null
```

<a name="string-hasDigit" href="#string-hasDigit">#</a> jz.str.<b>hasDigit</b>(<i>string</i>)

Tests whether a string contains any digits.

<a name="string-includes" href="#string-includes">#</a> jz.str.<b>includes</b>(<i>string</i>, <i>string</i>[, <i>boolean</i>])

Tests whether a string includes a substring. Defaults to case sensitive, but you can set the third argument to <i>true</i> for case insensitive.

```js
jz.str.includes("Hello world", "WO"); // false
jz.str.includes("Hello world", "WO", true); // true
jz.str.includes("Hello world", "WO", false); // false
```

<a name="string-isAllCaps" href="#string-isAllCaps">#</a> jz.str.<b>isAllCaps</b>(<i>string</i>)

Tests whether a string contains only capital letters. Ignores symbols and numbers.

```js
jz.str.isAllCaps("JEEZY"); // true
jz.str.isAllCaps("JEE-ZY"); // true
jz.str.isAllCaps("JEEZy"); // false
```

<a name="string-isAllDigits" href="#string-isAllDigits">#</a> jz.str.<b>isAllDigits</b>(<i>string</i>)

Tests whether a string contains only digits.

<a name="string-isAllLower" href="#string-isAllLower">#</a> jz.str.<b>isAllLower</b>(<i>string</i>)

Tests whether a string contains only lowercase letters. Ignores symbols and numbers.

```js
jz.str.isAllLower("jeezy"); // true
jz.str.isAllLower("jee-zy"); // true
jz.str.isAllLower("Jeezy"); // false
```

<a name="string-isUpperCase" href="#string-isUpperCase">#</a> jz.str.<b>isUpperCase</b>(<i>character</i>)

Tests whether a character is upper case.

<a name="string-startsWith" href="#string-startsWith">#</a> jz.str.<b>startsWith</b>(<i>string</i>, <i>substring</i>[, <i>boolean</i>])

Tests whether a string starts with a substring. Defaults to case sensitive, but you can set the third argument to <i>true</i> for case insensitive.

```js
jz.str.startsWith("Hello world", "he"); // false
jz.str.startsWith("Hello world", "he", true); // true
jz.str.startsWith("Hello world", "he", false); // false
```

### <a name="string-transformations" href="#string-transformations">Strings: Transformations</a>

Functions for applying various transformations to strings.

<a name="string-acronym" href="#string-acronym">#</a> jz.str.<b>acronym</b>(<i>string</i>)

Turns a string into an acronym.

<a name="string-keepAll" href="#string-keepAll">#</a> jz.str.<b>keepAll</b>(<i>string</i>, <i>substring</i>)

Keeps all instances of a substring in a string. Removes everything else. Returns a blank string if the substring does not appear in the original string.

<a name="string-keepEnd" href="#string-keepEnd">#</a> jz.str.<b>keepEnd</b>(<i>string</i>, <i>number</i>)

Keeps a certain number of characters at the end of a string and removes the rest.

<a name="string-keepNumber" href="#string-keepNumber">#</a> jz.str.<b>keepNumber</b>(<i>string</i>)

Keeps only digits and periods in a string.

```js
+jz.str.keepNumber("254.62px"); // 254.62
```

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

<a name="string-randomString" href="#string-randomString">#</a> jz.str.<b>randomString</b>(<i>n</i>)

Creates a string of randomized characters of `n` length. If `n` is not specified, the string will be 5 characters long.

<a name="string-splitAfterFirst" href="#string-splitAfterFirst">#</a> jz.str.<b>splitAfterFirst</b>(<i>string</i>, <i>char</i>)

Split a string at the first instance of a character or a sequence of characters (`char`). Returns an array with two items. The first item is everything that came before `char`, while the second item is everything that came after. `char` itself is removed.

```js
jz.str.splitAfterFirst("Hello world", "o"); // ["Hell", " world"]
jz.str.splitAfterFirst("Good morning world", "or"); // ["Good m", "ning world"]
jz.str.splitAfterFirst("Hello world", "x"); // ["Hello world", ""]
```

<a name="string-splitAfterLast" href="#string-splitAfterLast">#</a> jz.str.<b>splitAfterLast</b>(<i>string</i>, <i>char</i>)

Split a string at the last instance of a character or a sequence of characters (`char`). Returns an array with two items. The first item is everything that came before `char`, while the second item is everything that came after. `char` itself is removed.

```js
jz.str.splitAfterLast("Hello world", "o"); // ["Hello w", "rld"]
jz.str.splitAfterLast("Good morning world", "or"); // ["Good morning w", "ld"]
jz.str.splitAfterLast("Hello world", "x"); // ["Hello world", ""]
```

<a name="string-splitAtIndex" href="#string-splitAtIndex">#</a> jz.str.<b>splitAtIndex</b>(<i>string</i>, <i>number OR array of numbers</i>)

Split a string at a numerical index or at each index in an array of numerical indices.

```js
jz.str.splitAtIndex("Hello world", "Hello world".length - 1); // ["Hello worl", "d"]
jz.str.splitAtIndex("Hello world", [1, "Hello world".length - 1]); // ["H", "ello worl", "d"]
```

## <a name="tests" href="#tests">Tests</a>

```bash
npm test # Test
npm run cover # Test and run a coverage report
```

## <a name="contributing" href="#contributing">Contributing</a>

jeezy uses [rollup](https://rollupjs.org/) to bundle several small modules, usually containing just one function, into a library. To add a function, create a file in the appropriate subdirectory within the [`src` directory](https://github.com/HarryStevens/jeezy/tree/master/src), and then export it from [`arrays.js`](https://github.com/HarryStevens/jeezy/blob/master/src/arr/arrays.js), [`numbers.js`](https://github.com/HarryStevens/jeezy/blob/master/src/num/numbers.js), or [`strings.js`](https://github.com/HarryStevens/jeezy/blob/master/src/str/strings.js). 

To bundle the library:
```bash
npm run rollup # Bundle
npm run build # Bundle and minify
```

In lieu of a formal style guide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality.