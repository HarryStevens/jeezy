/*
@license: MIT License

Copyright (c) 2017 Harry Stevens

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

"use strict";

var output = (function () {

  /*
  / ARRAYS
` */

  function arr(){
    this.average = average;
    this.extent = extent;
    this.flatten = flatten;
    this.is = is;
    this.max = max;
    this.median = median;
    this.min = min;
    this.pivot = pivot;
    this.pluck = pluck;
    this.random = random;
    this.reject = reject;
    this.removeItem = removeItem;
    this.removeProperty = removeProperty;
    this.shallowCopy = shallowCopy;
    this.shuffle = shuffle;
    this.sortBy = sortBy;
    this.sortByMulti = sortByMulti;
    this.sortNumbers = sortNumbers;
    this.sum = sum;
    this.unique = unique;
    this.uniqueBy = uniqueBy;
    this.where = where;
  }

  // Returns the average value of an array of numbers.
  function average(arr){
    return sum(arr) / arr.length;
  }

  // Returns ths minimum and maximum values of an array as the array [min, max].
  function extent(arr){
    return [min(arr), max(arr)];
  }

  // Flattens an array of arrays into a single array
  function flatten(arr){
    return [].concat.apply([], arr);
  }

  // Test whether an element is an array
  function is(arr){
    return typeof(arr) == "object" && arr.length >= 0;
  }

  // Returns the maximum value of an array.
  // Dependencies: sortNumber
  function max(arr){
    return sortNumbers(arr)[arr.length - 1];
  }

  // Returns the medium value of an array of numbers.
  // Dependencies: sortNumber
  function median(arr){
    arr = sortNumbers(arr);
    var i = arr.length / 2;
    return i % 1 === 0 ? (arr[i - 1] + arr[i]) / 2 : arr[Math.floor(i)];
  }

  // Returns the minimum value of an array.
  // Dependencies: sortNumber
  function min(arr){
    return sortNumbers(arr)[0];
  }

  // Returns a sort list of unique values of an attribute in an array of objects, and how many times each value appears in that array of objects
  // Dependencies: pluck, unique
  function pivot(arr, attribute){
    return unique(pluck(arr, attribute)).sort().map(function(d){ 
      return {
        value: d,
        count: arr.filter(function(e){ return e[attribute] == d; }).length
      }
    });
  }

  // Returns all values of an attribute in an array of objects
  function pluck(arr, attribute){
    return arr.map(function(d){ return d[attribute]; });
  }

  // Returns an item at random from an array
  // Dependencies: randBetween
  function random(arr){
    return arr[randBetween(0, arr.length - 1)]
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

  // Removes a property from every object in an array of object. Returns a new array and does not change the original one.
  // The second argument can be a string or, if you want to remove multiple properties, an array of strings.
  /// Dependencies: is
  function removeProperty(arr, property){
    var d = JSON.parse(JSON.stringify(arr));

    d.forEach(function(obj){
      
      if (is(property)){
        property.forEach(function(prop){
          delete obj[prop];
        });
      } else {
        delete obj[property];  
      }
      
    });

    return d;
  }

  // Filters an array of objects to remove those objects that contain a specified key-value pair.
  function reject(arr, object){

    var keys = Object.keys(object);
    var evaluate = "";

    keys.forEach(function(key, index){
      evaluate = evaluate + (index != 0 ? " && " : "") + "d['" + key + "'] != object['" + key + "']";
    });

    return arr.filter(function(d){
      return eval(evaluate);
    });

  }

  // Creates a shallow copy of an array
  function shallowCopy(arr){
    return arr.slice();
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
    var numSort = d.every(function(d){ return typeof d[attribute] == "number" });
    var a = [];
    if (numSort){
      a = d.sort(function(a, b) {
        return a[attribute] - b[attribute];
      });  
    } else {
      a = d.sort(function(a, b){
        return a[attribute] < b[attribute] ? -1 : a[attribute] > b[attribute] ? 1 : 0
      });
    }
    return order == "desc" ? a.reverse() : a;
  }

  // Sorts an array of objects multiple times by the values of the attributes you specify
  // Dependencies: is, sortBy
  function sortByMulti(arr, order_array){
    order_array.forEach(function(order){
      arr = is(arr) ? sortBy(arr, order[0], order[1]) : sortBy(arr, order);
    });
    return arr;
  }

  // Sorts an array of numbers
  function sortNumbers(arr, order){
    var a = arr.sort(function(a, b){ return a - b; });
    return order == "desc" ? a.reverse() : a;
  }

  // Returns the sum of an array of numbers.
  function sum(arr){
    return arr.reduce(function(d, i){ return i + d; });
  }

  // Returns unique values in an array
  function unique(arr){
    return arr.filter(function(value, index, self){ return self.indexOf(value) === index; });
  }

  // Returns a sorted list of unique values of an attribute in an array of objects, and how many times each value appears in that array of objects
  // Dependencies: pluck, unique, sortNumbers
  function uniqueBy(arr, attribute){
    var ret = unique(pluck(arr, attribute)).sort().map(function(d){ return d });
    return typeof ret[0] == "number" ? sortNumbers(ret) : ret.sort();
  }

  // Filters an array of objects to return only those objects that contain a specified key-value pair.
  function where(arr, object){
    var keys = Object.keys(object);
    var evaluate = "";

    keys.forEach(function(key, index){
      evaluate = evaluate + (index != 0 ? " && " : "") + "d['" + key + "'] == object['" + key + "']";
    });

    return arr.filter(function(d){
      return eval(evaluate);
    });
  }

  /*
  / NUMBERS
  */

  function num(){
    this.isEven = isEven;
    this.randBetween = randBetween;
  }

  // Tests whether an integer is even
  function isEven(num){
    return num % 2 == 0;
  }

  // Returns a random integer between two other integers
  function randBetween(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  /*
  / STRINGS
  */

  function str(){
    this.count = count;
    this.endsWith = endsWith;
    this.firstLetter = firstLetter;
    this.includes = includes;
    this.isAllCaps = isAllCaps;
    this.isAllDigits = isAllDigits;
    this.isAllLower = isAllLower;
    this.keepAll = keepAll;
    this.keepEnd = keepEnd;
    this.keepOne = keepOne;
    this.keepStart = keepStart;
    this.numberCommas = numberCommas;
    this.numberDecimals = numberDecimals;
    this.numberLakhs = numberLakhs;
    this.numberPrependZeros = numberPrependZeros;
    this.randomString = randomString;
    this.removeAll = removeAll;
    this.removeDigits = removeDigits;
    this.removeFirst = removeFirst;
    this.removeLast = removeLast;
    this.removeSymbols = removeSymbols;
    this.removeTags = removeTags;
    this.replaceAll = replaceAll;
    this.replaceAt = replaceAt;
    this.replaceFirst = replaceFirst;
    this.replaceLast = replaceLast;
    this.reverseCharacters = reverseCharacters;
    this.reverseWords = reverseWords;
    this.shuffleCharacters = shuffleCharacters;
    this.shuffleCharactersInWords = shuffleCharactersInWords;
    this.shuffleWords = shuffleWords;
    this.startsWith = startsWith;
    this.toCamelCase = toCamelCase;
    this.toSentenceCase = toSentenceCase;
    this.toSlugCase = toSlugCase;
    this.toSnakeCase = toSnakeCase;
    this.toStartCase = toStartCase;
    this.toTitleCase = toTitleCase;
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

  // Returns the first letter of a string. Returns null if there are no letters in the string.
  function firstLetter(x){
    var y = x.match(/\b[a-zA-Z]/);
    return y ? y[0] : null;
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

  // Adds commas to a number string for thousands, millions, billions, and so on.
  // Dependencies: removeAll
  function numberCommas(x){
    return removeAll(x, ",").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Rounds a number string, both float and integer, to the nearest n decimal place.
  // Dependencies: removeAll
  function numberDecimals(x, n){
    return Number(removeAll(x, ",")).toFixed(n);
  };

  // Adds commas to a number string for thousands, lakhs, crores, and so on. 
  // This is according to the Indian numbering system(https://en.wikipedia.org/wiki/Indian_numbering_system).
  // Dependencies: removeAll
  function numberLakhs(x){
    x = removeAll(x, ",");
    var afterPoint = x.indexOf(".") > 0 ? x.substring(x.indexOf("."), x.length) : "";
    x = Math.floor(x).toString();
    var lastThree = x.substring(x.length - 3), otherNumbers = x.substring(0, x.length - 3);
    lastThree = otherNumbers != "" ? "," + lastThree : lastThree;
    return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree + afterPoint;
  };

  // Adds zeros before a string so that the length of the string equals a given number of characters.
  // Does nothing to the string if it is already longer than the number of characters.
  // Dependencies: removeAll
  function numberPrependZeros(x, n){
    for (var s = "", i = 1; i <= n - removeAll(x, ",").length; i++){
      s = s + "0";
    }
    return s + removeAll(x, ",");
  };

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

  // Removes all instances of a substring (y) from a string (x).
  // Dependencies: replaceAll
  function removeAll(x, y){
    x = x.toString();
    return replaceAll(x, y , "");
  }

  // Removes all digits from a string.
  function removeDigits(x){
    return x.replace(/\d+/g, "");
  }

  // Removes the first instance of a substring (y) from a string (x).
  function removeFirst(x, y){
    return x.toString().replace(y, "");
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

  // Replaces all instances of substring (y) with substring (z) in a string (x).
  function replaceAll(x, y, z){
    return x.toString().replace(new RegExp(y, "g"), z);
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

  // Replaces the last instance of substring (y) with substring (z) in a string (x).
  function replaceLast(x, y, z) {
    x = x.toString();
    var a = x.split("");
    a[x.lastIndexOf(y)] = z;
    return a.join("");
  }

  // Reverses the order of a string's characters.
  function reverseCharacters(x){
    return x.toString().split("").reverse().join("");
  };

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

  // Tests whether a string starts with a substring.
  // Defaults to case sensitive, but you can set the third argument to true for case insensitive.
  function startsWith(x, y, bool){
    return bool ? x.toUpperCase().startsWith(y.toUpperCase()) : x.toString().startsWith(y);
  }

  // Transforms a string into camel case.
  function toCamelCase(x){
    return x.toString().replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
      return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
    }).replace(/\s+/g, '').replace(/[^\w\-]+/g, '');
  }

  // Capitalizes the first letter of the first word in a string.
  function toSentenceCase(x, bool){
    x = bool ? x.toString().toLowerCase() : x.toString();
    var first_letter = firstLetter(x);
    return first_letter ? x.replace(first_letter, first_letter.toUpperCase()) : x;
  };

  // Transforms a string into a slug.
  function toSlugCase(x) {
    return x.toString().toLowerCase()
      .replace(/\s+/g, '-')           // Replace spaces with -
      .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
      .replace(/\-\-+/g, '-')         // Replace multiple - with single -
      .replace(/^-+/, '')             // Trim - from start of text
      .replace(/-+$/, '');            // Trim - from end of text
  }

  // Transforms a string into snake case.
  function toSnakeCase(x) {
    return x.toString().toLowerCase()
      .replace(/\s+/g, '_')           // Replace spaces with -
      .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
      .replace(/\_\_+/g, '_')         // Replace multiple - with single -
      .replace(/^_+/, '')             // Trim - from start of text
      .replace(/_+$/, '');            // Trim - from end of text
  }

  // Capitalizes the first letter of every word in a string.
  // Dependencies: toSentenceCase
  function toStartCase(x, bool){
    return x.toString().split(" ").map(function(d){ return bool ? toSentenceCase(d, bool) : toSentenceCase(d); }).join(" ");
  };

  // Transforms a string into title case, where the first letter of every word is capitalized except for certain prepositions, articles and conjunctions.
  function toTitleCase(x) {
    var smalls = [];
    var articles = ["A", "An", "The"].forEach(function(d){ smalls.push(d); });
    var conjunctions = ["And", "But", "Or", "Nor", "So", "Yet"].forEach(function(d){ smalls.push(d); })
    var prepositions = ["As", "At", "Atop", "By", "Into", "It", "In", "For", "From", "Of", "Onto", "On", "Out", "Over", "Per", "To", "Unto", "Up", "Upon", "With"].forEach(function(d){ smalls.push(d); });
    
    x = x.split("").reverse().join("") + " ";

    x = x.replace(/['"]?[a-z]['"]?(?= )/g, function(match){ return match.toUpperCase(); });

    x = x.split("").slice(0, -1).reverse().join("")

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

  return {
    arr: new arr(),
    num: new num(),
    str: new str()
  };

}());

if (typeof window === "undefined") {
  module.exports = output;
} else {
  window.jz = output;
}