"use strict";

var expect = require("chai").expect;
var jz = require("../lib/jeezy");

var arr = [1,2,3,4,5,6,7,8,9,10];
var json = [ { value: 1, name: "Bob", age: 30 }, { value: 2, name: "Steve", age: 23 }, { value: 3, name: "John", age: 40 }, { value: 1, name: "Tim", age: 6 }, { value: 2, name: "Jake", age: 92 } ];

var test = "Hello world!";
var testNum = "12,345,679.312";
var testTags = "<span style='color:red'><i>Hello</i> <b>world</b>!</span>";
var testSentence = "The quick brown fox jumps over the lazy dog";
var testTitle = "new rules grant F.B.I., DEA & CIA access to 'raw' NSA surveillance data";
var testTitle0 = "this is a title: and this is a subtitle" ;
var testTitle1 = "M'ADOO F.B.I ARRANGES TOUR OF THE WEST TO PUSH THE LOAN; Plans Strong Appeals to Patriotism to Loosen Nation's...";

describe("#array", function() {

	/*
	/ ARRAY TESTS
	*/
	it("should calculate a correlation matrix", function(){
		var data = [];
		var cols = "abcdefghijklmnopqrstuvwxyz".split("");
		for (var i = 0; i <= 30; i++){
		  var obj = {index: i};
		  cols.forEach(col => {
		    obj[col] = jz.num.randBetween(1, 100);
		  });
		  data.push(obj);
		}
		var corr = jz.arr.correlationMatrix(data, cols);

		expect(corr.length).to.equal(676);
		expect(corr.length).to.equal(cols.length * cols.length);
		expect(corr[0].column_x).to.equal("a");
		expect(corr[0].correlation).to.equal(1);

		// errors
		expect(function(){ jz.arr.correlationMatrix() }).to.throw(Error);
		expect(function(){ jz.arr.correlationMatrix(data) }).to.throw(Error);
		expect(function(){ jz.arr.correlationMatrix("data", cols) }).to.throw(Error);
		expect(function(){ jz.arr.correlationMatrix(data, "columns") }).to.throw(Error);

	});

	it("should coerce the value of a property to a number in each object of an array of objects", function(){
		var data = [{day: "10", month: "1", year: "2017"}, {day: "12", month: "1", year: "2017"}];
		data = jz.arr.propertyToNumber(data, "day");
		expect(data[0].day).to.equal(10);
		expect(data[1].day).to.equal(12);
		expect(data[0].month).to.equal("1");
		data = jz.arr.propertyToNumber(data, ["month", "year"]);
		expect(data[0].month).to.equal(1);
		expect(data[0].year).to.equal(2017);
		expect(data[1].month).to.equal(1);
		expect(data[1].year).to.equal(2017);

		// coerce function tests
		var data2 = [{year: "2017x"}];
		data2 = jz.arr.propertyToNumber(data2, "year", function(d){ return 0; });
		expect(data2[0].year).to.equal(0);

		var data2a = [{year: "2017x"}];
		data2a = jz.arr.propertyToNumber(data2a, "year");
		expect(isNaN(data2a[0].year)).to.equal(true);

		var data3 = [{year: "2017x"}];
		data3 = jz.arr.propertyToNumber(data3, "year", function(d){ return jz.str.keepNumber(d); });
		expect(data3[0].year).to.equal(2017);

		var data4 = [{year: "2017x"}];
		data4 = jz.arr.propertyToNumber(data4, "year", function(d){ return "X"; });
		expect(isNaN(data4[0].year)).to.equal(true);
	
		// errors
		expect(function(){ jz.arr.propertyToNumber() }).to.throw(Error);
		expect(function(){ jz.arr.propertyToNumber(data) }).to.throw(Error);
		expect(function(){ jz.arr.propertyToNumber("hello", "world") }).to.throw(Error);
		expect(function(){ jz.arr.propertyToNumber(data, 3) }).to.throw(Error);
		expect(function(){ jz.arr.propertyToNumber(data, [3]) }).to.throw(Error);
		expect(function(){ jz.arr.propertyToNumber(data, "month", "x") }).to.throw(Error);
	});

	it("should turn column names into values", function(){
		var data = [{year: 2015, Bob: 6, Steve: 10}, {year: 2016, Bob: 7, Steve: 12}, {year: 2017, Bob: 4, Steve: 16}];
		data = jz.arr.columnsToValues(data);
		expect(data[0].column).to.equal("Bob");
		expect(data.length).to.equal(6);
	});

	it("should return a deep copy of an array", function(){
		expect(jz.arr.deepCopy(json)[0].value).to.equal(json[0].value);
	});

	it("should rename properties of an array", function(){
		expect(jz.arr.renameProperty(json, {in: "value", out: "number"})[0].number).to.equal(json[0].value);
	});

	it("should merge two arrays on a matching property", function(){
		var arr1 = [{name: "Bob", home: "Texas"}, {name: "Steve", home: "London"}];
		var merged = jz.arr.merge(arr1, json, "name");
		expect(merged[0].age).to.equal(30);
	});

	it("should catch an error if the matching property is not in the first array", function(){
		expect(function(){ jz.arr.merge(arr1, json, "value") }).to.throw(Error);
	});

	it("should catch an error if the matching property is not in the second array", function(){
		expect(function(){ jz.arr.merge(arr1, json, "home") }).to.throw(Error);
	});

	it ("should remove an item from an array", function(){
		var t = jz.arr.removeItem(arr, 1);
		expect(t[0]).to.equal(2);
		expect(t.length).to.equal(arr.length - 1);
	});

	it ("should clone an array", function(){
		var clone = jz.arr.shallowCopy(arr);
		expect(clone[0]).to.equal(arr[0]);
		expect(clone.length).to.equal(arr.length);
	});

	it ("should return an array of unique values of an object property in an array of objects", function(){
		var t = jz.arr.uniqueBy(json, "age");
		var u = jz.arr.uniqueBy(json, "name");
		var x = jz.arr.uniqueBy(json, "value");
		expect(t.length).to.equal(5);
		expect(t[0]).to.equal(30);
		expect(u[u.length - 1]).to.equal("Jake");
		expect(x.length).to.equal(3);
	});

	it("should delete a property or properties from every object in an array of objects", function(){
		var a = jz.arr.removeProperty(json, "name");
		var b = jz.arr.removeProperty(json, ["name", "age"])
		expect(a[0].name).to.equal(undefined);
		expect(b[0].age).to.equal(undefined);
	});

	it("should sort an array of objects by the values of an attribute", function(){
		var t = jz.arr.pivot(json, "value");
		
		var x = jz.arr.sortBy(t, "count");
		var y = jz.arr.sortBy(t, "count", "asc");
		var z = jz.arr.sortBy(t, "count", "desc");

		expect(x[0].value).to.equal(3);
		expect(y[0].value).to.equal(3);
		expect(z[0].count).to.equal(2);

		var z0 = jz.arr.sortBy(json, "name");

		expect(z0[1].name).to.equal("Jake");
	
	});

	it("should pivot an array of objects around an attribute", function(){
		var t = jz.arr.pivot(json, "value");
		expect(t.length).to.equal(3);
		expect(t[2].value).to.equal(3);
		expect(t[2].count).to.equal(1);
	});	

	it("should pluck values from an array of objects", function(){
		var t = jz.arr.pluck(json, "value");
		expect(t.length).to.equal(5);
		expect(t[2]).to.equal(3);
	});

  it("should pluck values based on a mapper from an array of objects", function(){
    var t = jz.arr.pluck(json, function(d){ return d.value + 1; });
    expect(t.length).to.equal(5);
    expect(t[2]).to.equal(4);
  });

	it("should return unique values of an array", function(){
		var a = jz.arr.unique([1,2,4,2,3,6,1,5]);
		var b = jz.arr.unique(["Apple", "Pear", "Apple"]);
		expect(a.length).to.equal(6);
		expect(b.length).to.equal(2);
		expect(b[0]).to.equal("Apple");
		expect(b[1]).to.equal("Pear");
	});

  it("should calculate the average of an array of numbers", function(){
      var a = jz.arr.average([10,20]);
      expect(a).to.equal(15);
  });

  it("should calculate the extent of an array of numbers", function(){
      var a = jz.arr.extent(jz.arr.shuffle(arr));
      expect(a[0]).to.equal(1);
      expect(a[1]).to.equal(10);
  });

  it("should know whether an array is or is not an array", function(){
      expect(jz.arr.is([])).to.equal(true);
			expect(jz.arr.is(["1", "2"])).to.equal(true);
			expect(jz.arr.is(arr)).to.equal(true);
			expect(jz.arr.is("a")).to.equal(false);
			expect(jz.arr.is(1)).to.equal(false);
			expect(jz.arr.is(true)).to.equal(false);
			expect(jz.arr.is({"name": "bob"})).to.equal(false);
			expect(jz.arr.is(function(d){ return d; })).to.equal(false);
  });

  it("should calculate the median of an array of numbers", function(){
    expect(jz.arr.median([1,10,7])).to.equal(7);
		expect(jz.arr.median([1,10,7,5])).to.equal(6);
		expect(jz.arr.median([1,6,3,9,28])).to.equal(6);
  });

  it("should sort an array of numbers in ascending order", function(){
    var shuffled = jz.arr.shuffle(arr);
		expect(jz.arr.sortNumbers(shuffled)).to.equal(arr);
		expect(jz.arr.sortNumbers(shuffled, "asc")).to.equal(arr);
    expect(jz.arr.sortNumbers(shuffled, "desc")).to.equal(arr.reverse());
  });

  it("should sort an array of numbers in descending order", function(){
    var shuffled = jz.arr.shuffle(arr);
    expect(jz.arr.sortNumbers(shuffled, "desc")).to.equal(arr.reverse());
  });

  it("should calculate the sum of an array of numbers", function(){
  	expect(jz.arr.sum([1,2,3])).to.equal(6);
  });

  it("should flatten an array of arrays", function(){
  	var x = [[1],[2],[3]]
  	var y = jz.arr.flatten(x);
  	expect(y.length).to.equal(3);
  	expect(y[0]).to.equal(1);
  });

});

describe("#number", function(){

  /*
  / NUMBER TESTS
  */

  it("should test whether an integer is even", function(){
  	expect(jz.num.isEven(1)).to.equal(false);
  	expect(jz.num.isEven(2)).to.equal(true);
  });

  it("should generate a random number between two specified numbers", function(){
  	var a = jz.num.randBetween(10, 100);
  	expect(a).to.be.at.least(10);
  	expect(a).to.be.at.most(100);
  });

});

describe("#string", function(){
	
	/*
	/ STRING TESTS
	*/
	it("should test whether a character is uppercase", function(){
		expect(jz.str.isUpperCase("C")).to.equal(true);
		expect(jz.str.isUpperCase("d")).to.equal(false);
		expect(jz.str.isUpperCase(1)).to.equal(false);
	});

	it("should turn a string into an acronym", function(){
		expect(jz.str.acronym("Central Intelligence Agency")).to.equal("CIA");
		expect(jz.str.acronym("None of the Above")).to.equal("NotA");
	});

	it("should split a string at the first instance of a character or sequence of charaters", function(){
		var a = jz.str.splitAfterFirst("Hello world", "o"); // ["Hell", " world"]
		expect(a[0]).to.equal("Hell");
		expect(a[1]).to.equal(" world");
		expect(a.length).to.equal(2);
		
		var b = jz.str.splitAfterFirst("Good morning world", "or"); // ["Good m", "ning world"]
		expect(b[0]).to.equal("Good m");
		expect(b[1]).to.equal("ning world");
		expect(b.length).to.equal(2);

		var c = jz.str.splitAfterFirst("Hello world", "x"); // ["Hello world", ""]
		expect(c[0]).to.equal("Hello world");
		expect(c[1]).to.equal("");
		expect(c.length).to.equal(2);

		// errors
		expect(function(){ jz.str.splitAfterFirst() }).to.throw(Error);
		expect(function(){ jz.str.splitAfterFirst(2) }).to.throw(Error);
		expect(function(){ jz.str.splitAfterFirst("H") }).to.throw(Error);
		expect(function(){ jz.str.splitAfterFirst("H", 2) }).to.throw(Error);		

	});

	it("should split a string at the last instance of a character or sequence of charaters", function(){
		var a = jz.str.splitAfterLast("Hello world", "o"); // ["Hell", " world"]
		expect(a[0]).to.equal("Hello w");
		expect(a[1]).to.equal("rld");
		expect(a.length).to.equal(2);
		
		var b = jz.str.splitAfterLast("Good morning world", "or"); // ["Good m", "ning world"]
		expect(b[0]).to.equal("Good morning w");
		expect(b[1]).to.equal("ld");
		expect(b.length).to.equal(2);

		var c = jz.str.splitAfterLast("Hello world", "x"); // ["Hello world", ""]
		expect(c[0]).to.equal("Hello world");
		expect(c[1]).to.equal("");
		expect(c.length).to.equal(2);

		// errors
		expect(function(){ jz.str.splitAfterLast() }).to.throw(Error);
		expect(function(){ jz.str.splitAfterLast(2) }).to.throw(Error);
		expect(function(){ jz.str.splitAfterLast("H") }).to.throw(Error);
		expect(function(){ jz.str.splitAfterLast("H", 2) }).to.throw(Error);		
	});

	it("should split a string at a numerical index or at each index in an array of numerical indices.", function(){
		var a = jz.str.splitAtIndex("Hello world", "Hello world".length - 1); // ["Hello worl", "d"]
		expect(a[0]).to.equal("Hello worl");
		expect(a[1]).to.equal("d");
		expect(a.length).to.equal(2);

		var b = jz.str.splitAtIndex("Hello world", [1, "Hello world".length - 1]); // ["H", "ello worl", "d"]
		expect(b[0]).to.equal("H");
		expect(b[1]).to.equal("ello worl");
		expect(b[2]).to.equal("d");
		expect(b.length).to.equal(3);

		// errors
		expect(function(){ jz.str.splitAtIndex() }).to.throw(Error);
		expect(function(){ jz.str.splitAtIndex(2) }).to.throw(Error);
		expect(function(){ jz.str.splitAtIndex("H") }).to.throw(Error);
		expect(function(){ jz.str.splitAtIndex("H", "W") }).to.throw(Error);
		expect(function(){ jz.str.splitAtIndex("H", {test: "object"}) }).to.throw(Error);
		expect(function(){ jz.str.splitAtIndex("H", [1, "2"]) }).to.throw(Error);
	});	

	it("should just keep a number", function(){
		expect(jz.str.keepNumber("154.36px")).to.equal("154.36");
	});

	it("should return an ordinal number", function(){
		expect(jz.str.numberOrdinal(1)).to.equal("1st");
		expect(jz.str.numberOrdinal(2)).to.equal("2nd");
		expect(jz.str.numberOrdinal(3)).to.equal("3rd");
		expect(jz.str.numberOrdinal(4)).to.equal("4th");
		expect(jz.str.numberOrdinal(11)).to.equal("11th");
		expect(jz.str.numberOrdinal(12)).to.equal("12th");
		expect(jz.str.numberOrdinal(13)).to.equal("13th");
		expect(jz.str.numberOrdinal(101)).to.equal("101st");
		expect(jz.str.numberOrdinal(102)).to.equal("102nd");
		expect(jz.str.numberOrdinal(103)).to.equal("103rd");
		expect(jz.str.numberOrdinal(104)).to.equal("104th");
		expect(jz.str.numberOrdinal(111)).to.equal("111th");
		expect(jz.str.numberOrdinal(112)).to.equal("112th");
		expect(jz.str.numberOrdinal(113)).to.equal("113th");
	});

	it("should return the first letter of a string", function(){
		expect(jz.str.firstLetter("Hello world!")).to.equal("H");
		expect(jz.str.firstLetter("!!Hello world!")).to.equal("H");
		expect(jz.str.firstLetter("!")).to.equal(null);
	});

  it("should count the number of times a string occurs in a substring", function(){
      var a = jz.str.count(test, "l");
      expect(a).to.equal(3);
  });

  it("should know whether a string ends with a substring", function(){
			var b0 = jz.str.endsWith(test, "D!"); // false
			var b1 = jz.str.endsWith(test, "D!", false); // false
			var b2 = jz.str.endsWith(test, "D!", true); // true
			expect(b0).to.equal(false);
			expect(b1).to.equal(false);
			expect(b2).to.equal(true);
  });

  it("should know whether a string includes a substring", function(){
  	var c0 = jz.str.includes("Hello world", "WO"); // false
		var c1 = jz.str.includes("Hello world", "WO", true); // true
		var c2 = jz.str.includes("Hello world", "WO", false); // false
		expect(c0).to.equal(false);
		expect(c1).to.equal(true);
		expect(c2).to.equal(false);
  });

  it("should know whether a string is all capital letters", function(){
	  var d0 = jz.str.isAllCaps("YOOOO"); // true
		var d1 = jz.str.isAllCaps("YO!"); // true
		var d2 = jz.str.isAllCaps("YoO!"); // false
		expect(d0).to.equal(true);
		expect(d1).to.equal(true);
		expect(d2).to.equal(false);
  });

  it("should know whether a string is all digits", function(){
  	var e0 = jz.str.isAllDigits(testNum); // false;
		var e1 = jz.str.isAllDigits(jz.str.removeAll(testNum, ",")); // false
		var e2 = jz.str.isAllDigits(jz.str.removeAll(testNum, ",").replace(".", "")); // true
		expect(e0).to.equal(false);
		expect(e1).to.equal(false);
		expect(e2).to.equal(true);
  });

  it("should know whether a string is all lower case", function(){
		var f0 = jz.str.isAllLower(test); // false
		var f1 = jz.str.isAllLower(test.toLowerCase() + "3"); // true
		expect(f0).to.equal(false);
		expect(f1).to.equal(true);
  });

  it("should keep only the specified characters", function(){
  	var g = jz.str.keepAll(test, "l"); // "lll"
  	expect(g).to.equal("lll");
  });

  it("should keep the ending n characters", function(){
  	var ga = jz.str.keepEnd(test, 3); // "ld!"
		expect(ga).to.equal("ld!");
  });

  it("should keep only one of the specific characters, assuming it exists", function(){
		var h0 = jz.str.keepOne(test, "l"); // "l"
		var h1 = jz.str.keepOne(test, "z"); // ""
		expect(h0).to.equal("l");
		expect(h1).to.equal("");
  });

  it("should keep the starting n characters", function(){
  	var i = jz.str.keepStart(test, 3); // "Hel"
		expect(i).to.equal("Hel");
  });

  it("should add commas to my number string", function(){
  	var j = jz.str.numberCommas(1234123.234); // "1,234,123.234"
		expect(j).to.equal("1,234,123.234");
  });

  it("should round my number string to a specific number of decimals", function(){
  	var k0 = jz.str.numberDecimals(1234123.2134, 2); // "1234123.21" 
		var k1 = jz.str.numberDecimals(1234123, 2); // "1234123.00"
		expect(k0).to.equal("1234123.21");
		expect(k1).to.equal("1234123.00");
  });

  it("should add commas to my number string according to the Indian number system", function(){
  	var l = jz.str.numberLakhs(1345122345.235); // "1,34,51,22,345.235"
		expect(l).to.equal("1,34,51,22,345.235");
  });

  it("should prepend zeros to a string until it is n digits long, unless it is already as long or longer", function(){
  	var m0 = jz.str.numberPrepend(1234, 4); // "1234"
		var m1 = jz.str.numberPrepend(123, 4); // "0123"
		var m2 = jz.str.numberPrepend(12345, 4); // "12345"
		var m3 = jz.str.numberPrepend(1, 4); // "0001"
		var m4 = jz.str.numberPrepend("", 4); // "0000"
		var m5 = jz.str.numberPrepend("red", 4); // "0red"
		var m6 = jz.str.numberPrepend("red", 4, "a"); // "0red"
		var m7 = jz.str.numberPrepend("red", 4, "ab"); // "0red"
		expect(m0).to.equal("1234");
		expect(m1).to.equal("0123");
		expect(m2).to.equal("12345");
		expect(m3).to.equal("0001");
		expect(m4).to.equal("0000");
		expect(m5).to.equal("0red");
		expect(m6).to.equal("ared");
		expect(m7).to.equal("ared");
  });

  it("should remove all of a specified character", function(){
		var n0 = jz.str.removeAll("Hello Jill how are you lady?", "l"); // "Heo Ji how are you ady?"
		var n1 = jz.str.removeAll("Hello Jill how are you lady?", "ll"); // "Heo Ji how are you lady?"
		expect(n0).to.equal("Heo Ji how are you ady?");
		expect(n1).to.equal("Heo Ji how are you lady?");
  });
  
  it("should remove all digits from a string", function(){
		var o = jz.str.removeDigits(testNum); // ",,."
		expect(o).to.equal(",,.");
  });

  it("should remove the first instance of a specified character from a string", function(){
  	var p = jz.str.removeFirst(test, "l"); // "Helo world!"
		expect(p).to.equal("Helo world!");
  });

  it("should remove the last instance of a specified character from a string", function(){
  	var q = jz.str.removeLast(test, "l"); // "Hello word!"
		expect(q).to.equal("Hello word!");
  });

	it("should remove all symbols from a string", function(){
  	var r = jz.str.removeSymbols(test); // "Hello world"
		expect(r).to.equal("Hello world");
  });

  it("should remove specified HTML tags from a string", function(){
  	var s0 = jz.str.removeTags(testTags); // "Hello world!"
		var s1 = jz.str.removeTags(testTags, ["i"]); // "<i>Hello</i> world!"
		expect(s0).to.equal("Hello world!");
		expect(s1).to.equal("<i>Hello</i> world!");
  });

  it("should replace all of one substring with another", function(){
  	var t = jz.str.replaceAll(test, "l", "z"); // "Hezzo worzd!"
		expect(t).to.equal("Hezzo worzd!");
  });

  it("should replace a string at a specified place", function(){
		var ta = jz.str.replaceAt(test, 6, "Jonny"); // "Hello Jonny!"
		expect(ta).to.equal("Hello Jonny!");
  });

  it("should replace the first instance of a substring with another", function(){
  	var u = jz.str.replaceFirst(test, "l", "z"); // "Hezlo world!"
  	expect(u).to.equal("Hezlo world!");
  });

	it("should replace the last instance of a substring with another", function(){
  	var v = jz.str.replaceLast(test, "l", "z"); // "Hello worzd!"
  	expect(v).to.equal("Hello worzd!");
  });

	it("should reverse the characters in a string", function(){
  	var w = jz.str.reverseCharacters(test); // "!dlrow olleH"
  	expect(w).to.equal("!dlrow olleH");
  });

  it("should reverse the words in a string", function(){
  	var x = jz.str.reverseWords(test); // "world! Hello"
  	expect(x).to.equal("world! Hello");
  });

	it("should test if a string starts with a substring", function(){
	  var ab0 = jz.str.startsWith("Hello world", "he"); // false
		var ab1 = jz.str.startsWith("Hello world", "he", true); // true
		var ab2 = jz.str.startsWith("Hello world", "he", false); // false
		expect(ab0).to.equal(false);
		expect(ab1).to.equal(true);
		expect(ab2).to.equal(false);
  });	

	it("should convert a string to camel case", function(){
	  var ac = jz.str.toCamelCase(test); // "helloWorld"
		expect(ac).to.equal("helloWorld");
  });	

	it("should convert a string to sentence case", function(){
	  var ad = jz.str.toSentenceCase(testTitle, true); // "New rules grant f.b.i., dea & cia access to 'raw' nsa surveillance data"
	  var ad1 = jz.str.toSentenceCase(testTitle); // "New rules grant F.B.I., DEA & CIA access to 'raw' NSA surveillance data"
	  var ad2 = jz.str.toSentenceCase(testTitle); // "New rules grant F.B.I., DEA & CIA access to 'raw' NSA surveillance data"
		expect(ad).to.equal("New rules grant f.b.i., dea & cia access to 'raw' nsa surveillance data");
		expect(ad1).to.equal("New rules grant F.B.I., DEA & CIA access to 'raw' NSA surveillance data");
		expect(ad2).to.equal("New rules grant F.B.I., DEA & CIA access to 'raw' NSA surveillance data");
  });

	it("should convert a string to slug case", function(){
	  var ae = jz.str.toSlugCase(test); // "hello-world"
		expect(ae).to.equal("hello-world");
  });

	it("should convert a string to snake case", function(){
	  var af = jz.str.toSnakeCase(test); // "hello_world"
		expect(af).to.equal("hello_world");
  });

	it("should convert a string to start case", function(){
	  var ag = jz.str.toStartCase(test); // "Hello World!"
	  var ag0 = jz.str.toStartCase(testTitle);
	  var ag1 = jz.str.toStartCase(testTitle, true);
		expect(ag).to.equal("Hello World!");
		expect(ag0).to.equal("New Rules Grant F.B.I., DEA & CIA Access To 'Raw' NSA Surveillance Data");
		expect(ag1).to.equal("New Rules Grant F.b.i., Dea & Cia Access To 'Raw' Nsa Surveillance Data");
  });

	it("should convert a string to title case", function(){
		var ah0 = jz.str.toTitleCase("the quick brown fox jumps over the lazy dog"); // "The Quick Brown Fox Jumps Over the Lazy Dog"
		var ah1 = jz.str.toTitleCase("javascript: a beginner's guide to the language of the web"); // "Javascript: A Beginner's Guide to the Language of the Web"
		var ah2 = jz.str.toTitleCase("james comey to remain on as FBI director"); // "James Comey to Remain on as FBI Director"
		var ah3 = jz.str.toTitleCase(testTitle); // "New Rules Grant F.B.I., DEA & CIA Access to 'Raw' NSA Surveillance Data"
    var ah4 = jz.str.toTitleCase("i am an animal. an idiot. an amazing man.")//to test multiple sentences. when sentences start with a preposition/conjunction/article.
    var ah5 = jz.str.toTitleCase("i am from the F.B.I.. an amazingly creepy and an amazingly weird organisation.")
    var ah6 = jz.str.toTitleCase(testTitle0); // "This Is a Title: And This Is a Subtitle"

		expect(ah0).to.equal("The Quick Brown Fox Jumps over the Lazy Dog");
		expect(ah1).to.equal("Javascript: A Beginner's Guide to the Language of the Web");
		expect(ah2).to.equal("James Comey to Remain on as FBI Director");
		expect(ah3).to.equal("New Rules Grant F.B.I., DEA & CIA Access to 'Raw' NSA Surveillance Data");
    expect(ah4).to.equal("I Am an Animal. An Idiot. An Amazing Man.");
    expect(ah5).to.equal("I Am from the F.B.I.. An Amazingly Creepy and an Amazingly Weird Organisation.")
    expect(ah6).to.equal("This Is a Title: And This Is a Subtitle")
  });	

  it("should output a random string of n length", function(){
  	var ai0 = jz.str.randomString();
  	var ai1 = jz.str.randomString(20);

  	expect(ai0.length).to.equal(5);
  	expect(ai1.length).to.equal(20);
  });

  it("should test if a string has any digits", function(){
  	var ah0 = jz.str.hasDigit("abc");
  	var ah1 = jz.str.hasDigit("a1c");
  	var ah2 = jz.str.hasDigit("123");
  	var ah3 = jz.str.hasDigit("!@#$");

  	expect(ah0).to.equal(false);
  	expect(ah1).to.equal(true);
  	expect(ah2).to.equal(true);
  	expect(ah3).to.equal(false);

  });

});