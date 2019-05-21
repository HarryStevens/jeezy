// https://github.com/HarryStevens/jeezy#readme Version 1.13.0. Copyright 2019 Harry Stevens.
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.jz = {})));
}(this, (function (exports) { 'use strict';

// Returns the sum of an array of numbers.
function sum(arr){
  return arr.reduce(function(d, i){ return i + d; });
}

// Returns the average value of an array of numbers.
// Dependencies: sum
function average(arr){
  return sum(arr) / arr.length;
}

// Test whether an element is an array
function isArray(arr){
  return typeof(arr) == "object" && arr.length >= 0;
}

// Returns all values of an attribute or mapping function in an array of objects
function pluck(arr, mapper){
  return arr.map(function(d){ return typeof(mapper) === "string" ? d[mapper] : mapper(d); });
}

// Given a data set (an array of objects)
// and a list of columns (an array with a list of numeric columns),
// calculate the Pearson correlation coeffient for each pair of columns
// and return a correlation matrix, where each object takes the form
// {column_a, column_a, correlation}
// Dependencies: pluck
function correlationMatrix(data, cols){
	// Error handling
	if (!data){
		throw new Error("You must pass a first argument.");
	} else if (!cols){
		throw new Error("You must pass a second argument.");
	} else if (!isArray(data)){
		throw new Error("The first argument must be an array.");
	} else if (!isArray(cols)){
		throw new Error("The second argument must be an array.");
	}

  var out = [];
  cols.forEach(function(colx){
    cols.forEach(function(coly){
      var arrays = calcArrays(data, colx, coly);
      var obj = {column_x: colx, column_y: coly, correlation: pearson(arrays[0], arrays[1])};
      out.push(obj);
    });
  });
  return out;
}

function calcArrays(data, column_a, column_b){
  var array_a = pluck(data, column_a);
  var array_b = pluck(data, column_b);
  return [array_a, array_b];
}

// Source: https://memory.psych.mun.ca/tech/js/correlation.shtml
// Takes two arrays of numbers
function pearson(x, y) {
  var shortestArrayLength = 0;

  if (x.length == y.length) {
    shortestArrayLength = x.length;
  } else if (x.length > y.length) {
    shortestArrayLength = y.length;
    console.error('x has more items in it, the last ' + (x.length - shortestArrayLength) + ' item(s) will be ignored');
  } else {
    shortestArrayLength = x.length;
    console.error('y has more items in it, the last ' + (y.length - shortestArrayLength) + ' item(s) will be ignored');
  }

  var xy = [];
  var x2 = [];
  var y2 = [];

  for (var i = 0; i < shortestArrayLength; i++) {
    xy.push(x[i] * y[i]);
    x2.push(x[i] * x[i]);
    y2.push(y[i] * y[i]);
  }

  var sum_x = 0;
  var sum_y = 0;
  var sum_xy = 0;
  var sum_x2 = 0;
  var sum_y2 = 0;

  for (var i = 0; i < shortestArrayLength; i++) {
    sum_x += x[i];
    sum_y += y[i];
    sum_xy += xy[i];
    sum_x2 += x2[i];
    sum_y2 += y2[i];
  }

  var step1 = (shortestArrayLength * sum_xy) - (sum_x * sum_y);
  var step2 = (shortestArrayLength * sum_x2) - (sum_x * sum_x);
  var step3 = (shortestArrayLength * sum_y2) - (sum_y * sum_y);
  var step4 = Math.sqrt(step2 * step3);
  var answer = step1 / step4;

  return answer;
}

// Returns the maximum value of an array.
function max(arr){
  return arr.reduce(function(a, b) {
    return Math.max(a, b);
	});
}

// Returns the minimum value of an array.
function min(arr){
  return arr.reduce(function(a, b) {
    return Math.min(a, b);
	});
}

// Returns ths minimum and maximum values of an array as the array [min, max].
// Depencencies: max, min
function extent(arr){
  return [min(arr), max(arr)];
}

// Sorts an array of numbers
function sortNumbers(arr, order){
  return arr.sort(function(a, b){ return order == "desc" ? b - a : a - b; });
}

// Returns the medium value of an array of numbers.
// Dependencies: sortNumbers
function median(arr){
  arr = sortNumbers(arr);
  var i = arr.length / 2;
  return i % 1 === 0 ? (arr[i - 1] + arr[i]) / 2 : arr[Math.floor(i)];
}

// Fixes a two-dimensional array of objects in which the column names contain values.
function columnsToValues(arr){
	var out = [], columns = Object.keys(arr[0]), col_name = columns.shift();
	columns.forEach(function(column){
		arr.forEach(function(row){
			var obj = {};
			obj[col_name] = row[col_name];
			obj.column = column;
			obj.value = row[column];
			out.push(obj);
		});
	});
	return out;
}

// Flattens an array of arrays into a single array
function flatten(arr){
  return [].concat.apply([], arr);
}

// Creates a shallow copy of an array
function shallowCopy(arr){
  return arr.slice();
}

// Merges two arrays of objects on a specified property.
// Keeps each object of the first array,
// and adds the matching properties of the first matched object in the second array.
function merge(arr1, arr2, property){
	var keys1 = Object.keys(arr1[0]);
	var keys2 = Object.keys(arr2[0]);

	if (keys1.indexOf(property) == -1) throw new Error(property + " not in first array.");
	if (keys2.indexOf(property) == -1) throw new Error(property + " not in second array.");

	var clone = shallowCopy(arr1);

	clone.forEach(function(d){
		var match = arr2.filter(function(e){ return d[property] == e[property]; });
		keys2.forEach(function(key){
			var prop = keys1.indexOf(key) == -1 ? key : key + "2";
			d[prop] = match[0] ? match[0][key] : "NA";
		});
		return d;
	});

	return clone;
}

// Returns unique values in an array
function unique(arr){
  return arr.filter(function(value, index, self){ return self.indexOf(value) === index; });
}

// Returns a sort list of unique values of an attribute in an array of objects, and how many times each value appears in that array of objects
// Dependencies: pluck, unique
function pivot(arr, attribute){
  return unique(pluck(arr, attribute)).sort().map(function(d){ 
  	var obj = {count : arr.filter(function(e){ return e[attribute] == d; }).length};
  	obj[attribute] = d;
    return obj;
  });
}

// Coerces the type of a property to a number in every object in an array of objects.
// The second argument can be a string with a single property name, or an array of strings with one or more property names.
// Optional third argument 
// - coerce (function) By default, non-numeric values will be converted to NaN. But you can pass a function to decide how to deal with non-numeric values. However, if the function you pass returns a non-numeric value, that value will itself be coerced to NaN.
// 		Example: function(d){ return jz.str.keepNumbers(d) }
//		Example: function(d){ return 0; }
function propertyToNumber(data, prop, coerce){

	if (data == undefined){
		throw new Error("You must pass a first argument.");
	}

	if (prop == undefined){
		throw new Error("You must pass a second argument.");
	}

	if (!isArray(data)){
		throw new Error("The first argument must be an array.");
	}

	if (!isArray(prop) && typeof(prop) !== "string") {
		throw new Error("The second argument must be a string or an array.");
	}

	if (coerce && typeof(coerce) !== "function") {
		throw new Error("The third argument must be a function.");
	}

	// did a coercing function get passed
	coerce = coerce ? coerce : function(){ return NaN; };

	// if the second argument is an array
	if (isArray(prop)){
		data.forEach(function(d, i){
			prop.forEach(function(p){
				if (typeof(p) !== "string"){
					throw new Error("Each item in the second array must be a string.")
				}

				d[p] = isNaN(+d[p]) ? +coerce(d[p]) : +d[p];

			});
			return d;
		});
		return data;
	}

	// if the second argument is a string
	else {
		data.forEach(function(d){
			d[prop] = isNaN(+d[prop]) ? +coerce(d[prop]) : +d[prop];
			return d;
		});
		return data;
	}
}

// Removes an item from an array, and returns the array
// Dependencies: shallowCopy
function removeItem(arr, item){
  var copy = shallowCopy(arr);
  var index = copy.indexOf(item);
  if (index > -1){
    copy.splice(index, 1);
  }
  return copy;
}

// Returns a deep copy of an array.
var deepCopy = function(arr){
	return JSON.parse(JSON.stringify(arr));
};

// Removes a property from every object in an array of object. Returns a new array and does not change the original one.
// The second argument can be a string or, if you want to remove multiple properties, an array of strings.
// Dependencies: is
function removeProperty(arr, property){
  var d = deepCopy(arr);

  d.forEach(function(obj){
    
    if (isArray(property)){
      property.forEach(function(prop){
        delete obj[prop];
      });
    } else {
      delete obj[property];  
    }
    
  });

  return d;
}

// Renames a property or properties in every object of an array of objects.
// You must pass a "renamer" as the second argument.
// If you are only renaming one property, the renamer can be an object with the properties
// "in", the value of which is a string with the input property name,
// and "out", the value of which is a string with the output property name.
// If you are renaming multiple properties, the renamer can be an array of objects,
// where each object has the "in" and "out" properties of the single renamer.
function renameProperty(arr, renamer){
	var clone = deepCopy(arr);
	clone.forEach(function(row){
		if (isArray(renamer)){
			renamer.forEach(function(rename){
				renameRow(row, rename);
			});
		} else {
			renameRow(row, renamer);
		}
		return row;
	});
	return clone;
	function renameRow(row, rename){
		row[rename.out] = row[rename.in];
		delete row[rename.in];
	}
}

// Shuffles an array
function shuffle(arr){
  var m = arr.length, t, i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = arr[m];
    arr[m] = arr[i];
    arr[i] = t;
  }
  return arr;
}

// Sorts an array of objects by the values of an attribute
function sortBy(arr, attribute, order){
  var d = arr.slice();
  var fnSort = typeof attribute === "function";
  function resolve(d){
    return fnSort ? attribute(d) : d[attribute]; 
  }
  var numSort = d.every(function(d){ return typeof resolve(d) === "number" });
  var out = [];
  if (numSort){
    out = d.sort(function(a, b) {
      return resolve(a) - resolve(b);
    });  
  } else {
    out = d.sort(function(a, b){
      var ar = resolve(a), br = resolve(b);
      return ar < br ? -1 : ar > br ? 1 : 0;
    });
  }
  return order === "desc" ? out.reverse() : out;
}

// Returns a list of unique values of an attribute or mapping function in an array of objects
// Dependencies: pluck, unique
function uniqueBy(arr, mapper){
  return unique(pluck(arr, mapper));
}

// Returns a random integer between two other integers
function randBetween(min, max){
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Returns an item at random from an array
// Dependencies: randBetween
function random(arr){
  return arr[randBetween(0, arr.length - 1)]
}

// math
// queries
// transformations
// other
var arrays = {
	average: average,
	columnsToValues: columnsToValues,
	correlationMatrix: correlationMatrix,
	deepCopy: deepCopy,
	extent: extent,
	flatten: flatten,
	is: isArray,
	max: max,
	median: median,
	merge: merge,
	min: min,
	pivot: pivot,
	pluck: pluck,
	propertyToNumber: propertyToNumber,
	removeItem: removeItem,
	removeProperty: removeProperty,
	renameProperty: renameProperty,
	random: random,
	shallowCopy: shallowCopy,
	shuffle: shuffle,
	sortBy: sortBy,
	sortNumbers: sortNumbers,
	sum: sum,
	unique: unique,
	uniqueBy: uniqueBy
};

// Tests whether an integer is even
function isEven(num){
  return num % 2 == 0;
}

// queries
// other
var numbers = {
	isEven: isEven,
	randBetween: randBetween
};

// Transforms a string into camel case.
function toCamelCase(x){
  return x.toString().replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
    return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
  }).replace(/\s+/g, "").replace(/[^\w\-]+/g, "");
}

// Returns the first letter of a string. Returns null if there are no letters in the string.
function firstLetter(x){
  var y = x.match(/\b[a-zA-Z]/);
  return y ? y[0] : null;
}

// Capitalizes the first letter of the first word in a string.
function toSentenceCase(x, bool){
  x = bool ? x.toString().toLowerCase() : x.toString();
  
  var sentences = splitByMulti(x, [". ", "! ", "? "]);
  return sentences.map(function(sentence){
  	var first_letter = firstLetter(sentence);
  	return first_letter ? sentence.replace(first_letter, first_letter.toUpperCase()) : sentence;	
  }).join("")
  
  function splitByMulti(str, arr){
  	var out = str.split(arr[0]).map(function(d, i, data){ 
  		return mapper(d, i, data, arr[0]);
  	});
  	arr.shift();
  	arr.forEach(function(splitter){
  		out = flatten(out.map(function(d){ return d.split(splitter).map(function(e, i, data){ return mapper(e, i, data, splitter); }); }));
  	});

  	return out;

  	function mapper(d, i, data, splitter){
  		return data.length == 0 ? d :
  			i < data.length - 1 ? d + splitter :
  			d;
  	}
  }
}

// Transforms a string into a slug.
function toSlugCase(x) {
  return x.toString().toLowerCase()
    .replace(/\s+/g, "-")           // Replace spaces with -
    .replace(/[^\w\-]+/g, "")       // Remove all non-word chars
    .replace(/\-\-+/g, "-")         // Replace multiple - with single -
    .replace(/^-+/, "")             // Trim - from start of text
    .replace(/-+$/, "");            // Trim - from end of text
}

// Transforms a string into snake case.
function toSnakeCase(x) {
  return x.toString().toLowerCase()
    .replace(/\s+/g, "_")           // Replace spaces with _
    .replace(/[^\w\_]+/g, "")       // Remove all non-word chars
    .replace(/\_\_+/g, "_")         // Replace multiple _ with single _
    .replace(/^_+/, "")             // Trim _ from start of text
    .replace(/_+$/, "");            // Trim _ from end of text
}

// Capitalizes the first letter of every word in a string.
// Depencencies: toSentenceCase
function toStartCase(x, bool){
  return x.toString().split(" ").map(function(d){ return bool ? toSentenceCase(d, bool) : toSentenceCase(d); }).join(" ");
}

// Transforms a string into title case, where the first letter of every word is capitalized except for certain prepositions, articles and conjunctions.
function toTitleCase(x) {
  var smalls = [];
  var articles = ["A", "An", "The"].forEach(function(d){ smalls.push(d); });
  var conjunctions = ["And", "But", "Or", "Nor", "So", "Yet"].forEach(function(d){ smalls.push(d); });
  var prepositions = ["As", "At", "Atop", "By", "Into", "It", "In", "For", "From", "Of", "Onto", "On", "Out", "Over", "Per", "To", "Unto", "Up", "Upon", "With"].forEach(function(d){ smalls.push(d); });
  
  x = x.split("").reverse().join("") + " ";

  x = x.replace(/['"]?[a-z]['"]?(?= )/g, function(match){ return match.toUpperCase(); });

  x = x.split("").slice(0, -1).reverse().join("");

  x = x.replace(/ .*?(?= )/g, function(match){
    
    if (smalls.indexOf(match.substr(1)) !== -1) {
      return match.toLowerCase();
    }
    return match;
  });


  //smalls at the start of sentences shouldbe capitals. Also includes when the sentence ends with an abbreviation.
  x = x.replace(/(([^\.]\w\. )|(\.[\w]*?\.\. )).*?(?=[ \.])/g, function(match) {
    var word = match.split(" ")[1];
    var letters = word.split("");

    letters[0] = letters[0].toUpperCase();
    word = letters.join("");

    if(smalls.indexOf(word) !== -1) {
      return match.split(" ")[0] + " " + word;
    }

    return match;
  });

  x = x.replace(/: .*?(?= )/g, function(match){ 
    var first_letter = match.match(/\b[a-z]/);
    return match.replace(first_letter[0], first_letter[0].toUpperCase()); 
  });
  
  return x;
}

// Replaces all instances of substring (y) with substring (z) in a string (x).
function replaceAll(x, y, z){
  return x.toString().replace(new RegExp(y, "g"), z);
}

// Removes all instances of a substring (y) from a string (x).
// Dependencies: replaceAll
function removeAll(x, y){
  x = x.toString();
  return replaceAll(x, y , "");
}

// Adds commas to a number string for thousands, millions, billions, and so on.
// Dependencies: removeAll
function numberCommas(x){
  return removeAll(x, ",").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Rounds a number string, both float and integer, to the nearest n decimal place.
// Dependencies: removeAll
function numberDecimals(x, n){
  return Number(removeAll(x, ",")).toFixed(n);
}

// Adds commas to a number string for thousands, lakhs, crores, and so on. 
// This is according to the Indian numbering system (https://en.wikipedia.org/wiki/Indian_numbering_system).
// Dependencies: removeAll
function numberLakhs(x){
  x = removeAll(x, ",");
  var afterPoint = x.indexOf(".") > 0 ? x.substring(x.indexOf("."), x.length) : "";
  x = Math.floor(x).toString();
  var lastThree = x.substring(x.length - 3), otherNumbers = x.substring(0, x.length - 3);
  lastThree = otherNumbers != "" ? "," + lastThree : lastThree;
  return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree + afterPoint;
}

// Returns an ordinal number (1st, 2nd, 3rd, 4th, etc.)
function numberOrdinal(x) {
  var j = x % 10,
      k = x % 100;
  return j == 1 && k != 11 ? x + "st" :
  	j == 2 && k != 12 ? x + "nd" :
  	j == 3 && k != 13 ? x + "rd" :
  	x + "th";
}

// Adds zeros before a string so that the length of the string equals a given number of characters.
// Does nothing to the string if it is already longer than the number of characters.
// If you do not specify a prepend character (c), it defaults to zero.
// If you specify c of length greater than one, it uses just the first character.
// Dependencies: firstLetter, removeAll
function numberPrepend(x, n, c){
	c = !c ? "0" :
		typeof(c) !== "string" ? "0" :
		c.length > 1 ? firstLetter(c) :
		c;
  for (var s = "", i = 1; i <= n - removeAll(x, ",").length; i++){
    s = s + c;
  }
  return s + removeAll(x, ",");
}

// Counts the number of times a substring y occurs in a string x.
function count(x, y){
  return (x.match(new RegExp(y, "g")) || []).length;
}

// Tests whether a string x ends with a substring y.
// Defaults to case sensitive, but you can set the third argument to true for case insensitive.
function endsWith(x, y, bool){
  x = x.toString();
  return bool ? x.toUpperCase().endsWith(y.toUpperCase()) : x.endsWith(y);
}

// Tests whether a string contains any digits.
function hasDigit(x){
  return /\d/.test(x);
}

// Tests whether a string includes another string.
// Defaults to case sensitive, but you can set the third argument to true for case insensitive.
function includes(x, y, bool){
  x = x.toString();
  return bool ? x.toUpperCase().indexOf(y.toUpperCase()) != -1 : x.indexOf(y) != -1;
}

// Tests whether a string contains only capital letters. Ignores symbols.
function isAllCaps(x) {
  return x === x.toUpperCase();
}

// Tests whether a string contains only digits.
function isAllDigits(x){
  return /^\d+$/.test(x);
}

// Tests whether a string contains only lowercase letters.
function isAllLower(x) {
  return x === x.toLowerCase();
}

// Tests whether a character is upper case.
function isUpperCase(char) {    
  return char >= "A" && char <= "Z";
}

// Tests whether a string starts with a substring.
// Defaults to case sensitive, but you can set the third argument to true for case insensitive.
function startsWith(x, y, bool){
  return bool ? x.toUpperCase().startsWith(y.toUpperCase()) : x.toString().startsWith(y);
}

// Turns a string into an acronym.
function acronym(x){
  return x.split(" ").map(function(d){ return d[0]; }).join("");
}

// Keeps all instances of a character or a sequence of characters (y) in a string (x).
// Removes everything else. Returns a blank string if the substring doesn't appear in the original string.
function keepAll(x, y){
  return x.toString().split("").map(function(d){ if (d == y) return d; }).join("");
}

// Keeps n number of characters at the end of a string and removes the rest.
function keepEnd(x, n){
  x = x.toString();
  return x.slice(x.length - n, x.length)
}

// Keeps only digits and periods in a string. Useful for performing actions such as `+jz.str.keepNumber("254.62px") --> 254.62
function keepNumber(x){
	return x.replace(/[^\d.-]/g, "");
}

// Keeps one instance of a substring (y) in a string (x),
// even if y appears multiple times. Removes everything else.
// Returns a blank string if y does not appear in x.
// Dependencies: keepAll
function keepOne(x, y){
  return keepAll(x, y).charAt(0);
}

// Keeps n number of characters at the start of a string and removes the rest.
function keepStart(x, n){
  return x.toString().slice(0, +n)
}

// Removes all digits from a string.
function removeDigits(x){
  return x.toString().replace(/\d+/g, "");
}

// Removes the first instance of a substring (y) from a string (x).
function removeFirst(x, y){
  return x.toString().replace(y, "");
}

// Replaces the last instance of substring (y) with substring (z) in a string (x).
function replaceLast(x, y, z) {
  x = x.toString();
  var a = x.split("");
  a[x.lastIndexOf(y)] = z;
  return a.join("");
}

// Removes the last instance of a substring (y) from a string (x).
// Dependencies: replaceLast
function removeLast(x, y){
  return replaceLast(x, y, "");
}

// Removes anything that is not a letter or a space from a string.
function removeSymbols(x){
  return x.replace(/[^a-zA-Z ]/g, "");
}

// Removes HTML tags from a string. You can pass an optional array with the tags you want to keep.
function removeTags(x, y){
  if (!y) y = [];
  y = y.map(function(d){ return "<" + d + ">"; }).join(",");
  y = (((y || "") + "").toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join(""); // making sure the y arg is a string containing only tags in lowercase (<a><b><c>)
  var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
      commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
  return x.replace(commentsAndPhpTags, '').replace(tags, function ($0, $1) {
      return y.indexOf("<" + $1.toLowerCase() + ">") > -1 ? $0 : "";
  });
}

// Replaces the characters of a string with another string beginning at a specific index.
function replaceAt(string, index, replacement){
  if (!index) index = 0;
  return string.substr(0, index) + replacement + string.substr(index + replacement.length);
}

// Replaces the first instance of substring (y) with substring (z) in a string (x).
// Uses the same functionality as the native Javascript String.replace() method
// (http://www.w3schools.com/jsref/jsref_replace.asp).
function replaceFirst(x, y, z){
  return x.toString().replace(y, z);
}

// Reverses the order of a string's characters.
function reverseCharacters(x){
  return x.toString().split("").reverse().join("");
}

// Reverses the order of a string's words.
function reverseWords(x){
  return x.toString().split(" ").reverse().join(" ");
}

// Randomly shuffles a string's characters.
// Dependencies: shuffle
function shuffleCharacters(x){
  return shuffle(x.toString().split("")).join("");
}

// Randomly shuffles the characters of each word, but keeps the words in order. 
// Dependencies: shuffleCharacters
function shuffleCharactersInWords(x){
  return x.toString().split(" ").map(function(d){ return shuffleCharacters(d); }).join(" ");
}

// Randomly shuffles a string's words.
// Dependencies: shuffle  
function shuffleWords(x){
  return shuffle(x.toString().split(" ")).join(" ");
}

// Creates a string of randomized characters of n length. n defaults to 5.
function randomString(n) {
  if (!n) n = 5;

  var x = "",
    p = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < n; i++) {
    x += p.charAt(Math.floor(Math.random() * p.length));
  }

  return x;
}

// Split a string at the first instance of a character or a sequence of characters (i). 
// Returns an array with two items. The first item is everything that came before i, while the second item is everything that came after.
// i itself is removed.
// Example: splitAfterFirst("Hello world", "o") --> ["Hell", " world"]
// Example: splitAfterFirst("Good morning world", "or") --> ["Good m", "ning world"]
// Example: splitAfterFirst("Hello world", "x") --> ["Hello world", ""]
function splitAfterFirst(str, char){
	if (!str || typeof(str) !== "string") {
		throw new Error("The first argument must be a string.");
	}
	if (!char || typeof(char) !== "string") {
		throw new Error("The second argument must be a string.");	
	}

	if (char.length == 0 || str.indexOf(char) == -1) {
		return [str, ""];
	} else if (char.length == 1){
		var i = str.indexOf(char);
		return [str.substring(0, i), str.substring(i + 1)]
	} else if (char.length > 1){
		var spl = str.split(char);
		var first = spl[0];
		spl.shift();
		return [first, spl.join(char)];
	}
}

// Split a string at the last instance of a character or a sequence of characters (i). 
// Returns an array with two items. The first item is everything that came before i, while the second item is everything that came after.
// i itself is removed.
// Example: splitAfterLast("Hello world", "o") --> ["Hello w", "rld"]
// Example: splitAfterLast("Good morning world", "or") --> ["Good morning w", "ld"]
// Example: splitAfterLast("Hello world", "x") --> ["Hello world", ""]
function splitAfterLast(str, char){
	if (!str || typeof(str) !== "string") {
		throw new Error("The first argument must be a string.");
	}
	if (!char || typeof(char) !== "string") {
		throw new Error("The second argument must be a string.");	
	}

	if (char.length == 0 || str.indexOf(char) == -1) {
		return [str, ""];
	} else if (char.length == 1){
		var i = str.lastIndexOf(char);
		return [str.substring(0, i), str.substring(i + 1)]
	} else if (char.length > 1){
		var spl = str.split(char);
		var last = spl[spl.length - 1];
		spl.pop();
		return [spl.join(char), last];
	}
}

// Split a string at a numerical index or at each index in an array of numerical indices.
// Example: splitAtIndex("Hello world", "Hello world".length - 1) --> ["Hello worl", "d"]
// Example: splitAtIndex("Hello world", [1, "Hello world".length - 1]) --> ["H", "ello worl", "d"]
function splitAtIndex(str, i){
	if (!str || typeof(str) !== "string") {
		throw new Error("The first argument must be a string.");
	}
	if (!i || (typeof(i) !== "number" && !isArray(i)) ) {
		throw new Error("The second argument must be a number or an array.");	
	}

	if (typeof(i) == "number"){
		return [str.substring(0, i), str.substring(i)];	
	} else {

		if (i.some(function(num){
			return typeof(num) !== "number"
		})) {
			throw new Error("Every item in the second argument array must be a number.")
		}

		var out = sortNumbers(i).map(function(num, num_i){
			return str.substring(i[num_i - 1], num);
		});
		out.push(str.substring(i[i.length - 1]));
		return out;
	}
}

// cases
// numbers
// queries
// transformations
// other
var strings = {
	acronym: acronym,
	count: count,
	endsWith: endsWith,
	firstLetter: firstLetter,
	hasDigit: hasDigit,
	includes: includes,
	isAllCaps: isAllCaps,
	isAllDigits: isAllDigits,
	isAllLower: isAllLower,
	isUpperCase: isUpperCase,
	keepAll: keepAll,
	keepEnd: keepEnd,
	keepNumber: keepNumber,
	keepOne: keepOne,
	keepStart: keepStart,
	numberCommas: numberCommas,
	numberDecimals: numberDecimals,
	numberLakhs: numberLakhs,
	numberOrdinal: numberOrdinal,
	numberPrepend: numberPrepend,
	randomString: randomString,
	removeAll: removeAll,
	removeDigits: removeDigits,
	removeFirst: removeFirst,
	removeLast: removeLast,
	removeSymbols: removeSymbols,
	removeTags: removeTags,
	replaceAll: replaceAll,
	replaceAt: replaceAt,
	replaceFirst: replaceFirst,
	replaceLast: replaceLast,
	reverseCharacters: reverseCharacters,
	reverseWords: reverseWords,
	shuffleCharacters: shuffleCharacters,
	shuffleCharactersInWords: shuffleCharactersInWords,
	shuffleWords: shuffleWords,
	splitAfterFirst: splitAfterFirst,
	splitAfterLast: splitAfterLast,
	splitAtIndex: splitAtIndex,
	startsWith: startsWith,
	toCamelCase: toCamelCase,
	toSentenceCase: toSentenceCase,
	toSlugCase: toSlugCase,
	toSnakeCase: toSnakeCase,
	toStartCase: toStartCase,
	toTitleCase: toTitleCase
};

exports.arr = arrays;
exports.num = numbers;
exports.str = strings;

Object.defineProperty(exports, '__esModule', { value: true });

})));
