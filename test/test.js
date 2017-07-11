"use strict";

var expect = require("chai").expect;
var jz = require("../lib/jeezy");
var strings = jz.str;
var arrays = jz.arr;
var num = jz.num;

var arr = [1,2,3,4,5,6,7,8,9,10];
var json = [ { value: 1, name: "Bob" }, { value: 2, name: "Steve" }, { value: 3, name: "John" }, { value: 1, name: "Tim" }, { value: 2, name: "Jake" } ];

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

	it("should sort by multiple attributes", function(){
		var sort = arrays.sortByMulti(json, ["name", ["value", "desc"]]);
		expect(sort[0].value).to.equal(3);
		expect(sort[1].name).to.equal("Jake");
		expect(sort[2].name).to.equal("Steve");
	});

	it("should sort an array of objects by the values of an attribute", function(){
		var t = arrays.pivot(json, "value");
		
		var x = arrays.sortBy(t, "count");
		var y = arrays.sortBy(t, "count", "asc");
		var z = arrays.sortBy(t, "count", "desc");

		expect(x[0].value).to.equal(3);
		expect(y[0].value).to.equal(3);
		expect(z[0].count).to.equal(2);
	
	});

	it("should pivot an array of objects around an attribute", function(){
		var t = arrays.pivot(json, "value");
		expect(t.length).to.equal(3);
		expect(t[2].value).to.equal(3);
		expect(t[2].count).to.equal(1);
	});	

	it("should pluck values from an array of objects", function(){
		var t = arrays.pluck(json, "value");
		expect(t.length).to.equal(5);
		expect(t[2]).to.equal(3);
	});

	it("should return unique values of an array", function(){
		var a = arrays.unique([1,2,4,2,3,6,1,5]);
		var b = arrays.unique(["Apple", "Pear", "Apple"]);
		expect(a.length).to.equal(6);
		expect(b.length).to.equal(2);
		expect(b[0]).to.equal("Apple");
		expect(b[1]).to.equal("Pear");
	});

  it("should calculate the average of an array of numbers", function(){
      var a = arrays.average([10,20]);
      expect(a).to.equal(15);
  });

  it("should calculate the extent of an array of numbers", function(){
      var a = arrays.extent(arrays.shuffle(arr));
      expect(a[0]).to.equal(1);
      expect(a[1]).to.equal(10);
  });

  it("should know whether an array is or is not an array", function(){
      expect(arrays.is([])).to.equal(true);
			expect(arrays.is(["1", "2"])).to.equal(true);
			expect(arrays.is(arr)).to.equal(true);
			expect(arrays.is("a")).to.equal(false);
			expect(arrays.is(1)).to.equal(false);
			expect(arrays.is(true)).to.equal(false);
			expect(arrays.is({"name": "bob"})).to.equal(false);
			expect(arrays.is(function(d){ return d; })).to.equal(false);
  });

  it("should calculate the median of an array of numbers", function(){
    expect(arrays.median([1,10,7])).to.equal(7);
		expect(arrays.median([1,10,7,5])).to.equal(6);
		expect(arrays.median([1,6,3,9,28])).to.equal(6);
  });

  it("should sort an array of numbers in ascending order", function(){
    var shuffled = arrays.shuffle(arr);
		expect(arrays.sortNumbers(shuffled)).to.equal(arr);
		expect(arrays.sortNumbers(shuffled, "asc")).to.equal(arr);
    expect(arrays.sortNumbers(shuffled, "desc")).to.equal(arr.reverse());
  });

  it("should sort an array of numbers in descending order", function(){
    var shuffled = arrays.shuffle(arr);
    expect(arrays.sortNumbers(shuffled, "desc")).to.equal(arr.reverse());
  });

  it("should calculate the sum of an array of numbers", function(){
  	expect(arrays.sum([1,2,3])).to.equal(6);
  });

  it("should flatten an array of arrays", function(){
  	var x = [[1],[2],[3]]
  	var y = arrays.flatten(x);
  	expect(y.length).to.equal(3);
  	expect(y[0]).to.equal(1);
  });

});

describe("#number", function(){

  /*
  / NUMBER TESTS
  */

  it("should generate a random number between two specified numbers", function(){
  	var a = num.randBetween(10, 100);
  	expect(a).to.be.at.least(10);
  	expect(a).to.be.at.most(100);
  });

});

describe("#string", function(){
	
	/*
	/ STRING TESTS
	*/

	it("should return the first letter of a string", function(){
		expect(strings.firstLetter("Hello world!")).to.equal("H");
		expect(strings.firstLetter("!!Hello world!")).to.equal("H");
		expect(strings.firstLetter("!")).to.equal(null);
	});

  it("should count the number of times a string occurs in a substring", function(){
      var a = strings.count(test, "l");
      expect(a).to.equal(3);
  });

  it("should know whether a string ends with a substring", function(){
			var b0 = strings.endsWith(test, "D!"); // false
			var b1 = strings.endsWith(test, "D!", false); // false
			var b2 = strings.endsWith(test, "D!", true); // true
			expect(b0).to.equal(false);
			expect(b1).to.equal(false);
			expect(b2).to.equal(true);
  });

  it("should know whether a string includes a substring", function(){
  	var c0 = strings.includes("Hello world", "WO"); // false
		var c1 = strings.includes("Hello world", "WO", true); // true
		var c2 = strings.includes("Hello world", "WO", false); // false
		expect(c0).to.equal(false);
		expect(c1).to.equal(true);
		expect(c2).to.equal(false);
  });

  it("should know whether a string is all capital letters", function(){
	  var d0 = strings.isAllCaps("YOOOO"); // true
		var d1 = strings.isAllCaps("YO!"); // true
		var d2 = strings.isAllCaps("YoO!"); // false
		expect(d0).to.equal(true);
		expect(d1).to.equal(true);
		expect(d2).to.equal(false);
  });

  it("should know whether a string is all digits", function(){
  	var e0 = strings.isAllDigits(testNum); // false;
		var e1 = strings.isAllDigits(strings.removeAll(testNum, ",")); // false
		var e2 = strings.isAllDigits(strings.removeAll(testNum, ",").replace(".", "")); // true
		expect(e0).to.equal(false);
		expect(e1).to.equal(false);
		expect(e2).to.equal(true);
  });

  it("should know whether a string is all lower case", function(){
		var f0 = strings.isAllLower(test); // false
		var f1 = strings.isAllLower(test.toLowerCase() + "3"); // true
		expect(f0).to.equal(false);
		expect(f1).to.equal(true);
  });

  it("should keep only the specified characters", function(){
  	var g = strings.keepAll(test, "l"); // "lll"
  	expect(g).to.equal("lll");
  });

  it("should keep the ending n characters", function(){
  	var ga = strings.keepEnd(test, 3); // "ld!"
		expect(ga).to.equal("ld!");
  });

  it("should keep only one of the specific characters, assuming it exists", function(){
		var h0 = strings.keepOne(test, "l"); // "l"
		var h1 = strings.keepOne(test, "z"); // ""
		expect(h0).to.equal("l");
		expect(h1).to.equal("");
  });

  it("should keep the starting n characters", function(){
  	var i = strings.keepStart(test, 3); // "Hel"
		expect(i).to.equal("Hel");
  });

  it("should add commas to my number string", function(){
  	var j = strings.numberCommas(1234123.234); // "1,234,123.234"
		expect(j).to.equal("1,234,123.234");
  });

  it("should round my number string to a specific number of decimals", function(){
  	var k0 = strings.numberDecimals(1234123.2134, 2); // "1234123.21" 
		var k1 = strings.numberDecimals(1234123, 2); // "1234123.00"
		expect(k0).to.equal("1234123.21");
		expect(k1).to.equal("1234123.00");
  });

  it("should add commas to my number string according to the Indian number system", function(){
  	var l = strings.numberLakhs(1345122345.235); // "1,34,51,22,345.235"
		expect(l).to.equal("1,34,51,22,345.235");
  });

  it("should prepend zeros to a string until it is n digits long, unless it is already as long or longer", function(){
  	var m0 = strings.numberPrependZeros(1234, 4); // "1234"
		var m1 = strings.numberPrependZeros(123, 4); // "0123"
		var m2 = strings.numberPrependZeros(12345, 4); // "12345"
		var m3 = strings.numberPrependZeros(1, 4); // "0001"
		var m4 = strings.numberPrependZeros("", 4); // "0000"
		var m5 = strings.numberPrependZeros("red", 4); // "0red"
		expect(m0).to.equal("1234");
		expect(m1).to.equal("0123");
		expect(m2).to.equal("12345");
		expect(m3).to.equal("0001");
		expect(m4).to.equal("0000");
		expect(m5).to.equal("0red");
  });

  it("should remove all of a specified character", function(){
		var n0 = strings.removeAll("Hello Jill how are you lady?", "l"); // "Heo Ji how are you ady?"
		var n1 = strings.removeAll("Hello Jill how are you lady?", "ll"); // "Heo Ji how are you lady?"
		expect(n0).to.equal("Heo Ji how are you ady?");
		expect(n1).to.equal("Heo Ji how are you lady?");
  });
  
  it("should remove all digits from a string", function(){
		var o = strings.removeDigits(testNum); // ",,."
		expect(o).to.equal(",,.");
  });

  it("should remove the first instance of a specified character from a string", function(){
  	var p = strings.removeFirst(test, "l"); // "Helo world!"
		expect(p).to.equal("Helo world!");
  });

  it("should remove the last instance of a specified character from a string", function(){
  	var q = strings.removeLast(test, "l"); // "Hello word!"
		expect(q).to.equal("Hello word!");
  });

	it("should remove all symbols from a string", function(){
  	var r = strings.removeSymbols(test); // "Hello world"
		expect(r).to.equal("Hello world");
  });

  it("should remove specified HTML tags from a string", function(){
  	var s0 = strings.removeTags(testTags); // "Hello world!"
		var s1 = strings.removeTags(testTags, ["i"]); // "<i>Hello</i> world!"
		expect(s0).to.equal("Hello world!");
		expect(s1).to.equal("<i>Hello</i> world!");
  });

  it("should replace all of one substring with another", function(){
  	var t = strings.replaceAll(test, "l", "z"); // "Hezzo worzd!"
		expect(t).to.equal("Hezzo worzd!");
  });

  it("should replace a string at a specified place", function(){
		var ta = strings.replaceAt(test, 6, "Jonny"); // "Hello Jonny!"
		expect(ta).to.equal("Hello Jonny!");
  });

  it("should replace the first instance of a substring with another", function(){
  	var u = strings.replaceFirst(test, "l", "z"); // "Hezlo world!"
  	expect(u).to.equal("Hezlo world!");
  });

	it("should replace the last instance of a substring with another", function(){
  	var v = strings.replaceLast(test, "l", "z"); // "Hello worzd!"
  	expect(v).to.equal("Hello worzd!");
  });

	it("should reverse the characters in a string", function(){
  	var w = strings.reverseCharacters(test); // "!dlrow olleH"
  	expect(w).to.equal("!dlrow olleH");
  });

  it("should reverse the words in a string", function(){
  	var x = strings.reverseWords(test); // "world! Hello"
  	expect(x).to.equal("world! Hello");
  });

	it("should test if a string starts with a substring", function(){
	  var ab0 = strings.startsWith("Hello world", "he"); // false
		var ab1 = strings.startsWith("Hello world", "he", true); // true
		var ab2 = strings.startsWith("Hello world", "he", false); // false
		expect(ab0).to.equal(false);
		expect(ab1).to.equal(true);
		expect(ab2).to.equal(false);
  });	

	it("should convert a string to camel case", function(){
	  var ac = strings.toCamelCase(test); // "helloWorld"
		expect(ac).to.equal("helloWorld");
  });	

	it("should convert a string to sentence case", function(){
	  var ad = strings.toSentenceCase(testTitle, true); // "New rules grant f.b.i., dea & cia access to 'raw' nsa surveillance data"
	  var ad1 = strings.toSentenceCase(testTitle); // "New rules grant F.B.I., DEA & CIA access to 'raw' NSA surveillance data"
	  var ad2 = strings.toSentenceCase(testTitle); // "New rules grant F.B.I., DEA & CIA access to 'raw' NSA surveillance data"
		expect(ad).to.equal("New rules grant f.b.i., dea & cia access to 'raw' nsa surveillance data");
		expect(ad1).to.equal("New rules grant F.B.I., DEA & CIA access to 'raw' NSA surveillance data");
		expect(ad2).to.equal("New rules grant F.B.I., DEA & CIA access to 'raw' NSA surveillance data");
  });

	it("should convert a string to slug case", function(){
	  var ae = strings.toSlugCase(test); // "hello-world"
		expect(ae).to.equal("hello-world");
  });

	it("should convert a string to snake case", function(){
	  var af = strings.toSnakeCase(test); // "hello_world"
		expect(af).to.equal("hello_world");
  });

	it("should convert a string to start case", function(){
	  var ag = strings.toStartCase(test); // "Hello World!"
	  var ag0 = strings.toStartCase(testTitle);
	  var ag1 = strings.toStartCase(testTitle, true);
		expect(ag).to.equal("Hello World!");
		expect(ag0).to.equal("New Rules Grant F.B.I., DEA & CIA Access To 'Raw' NSA Surveillance Data");
		expect(ag1).to.equal("New Rules Grant F.b.i., Dea & Cia Access To 'Raw' Nsa Surveillance Data");
  });

	it("should convert a string to title case", function(){
		var ah0 = strings.toTitleCase("the quick brown fox jumps over the lazy dog"); // "The Quick Brown Fox Jumps Over the Lazy Dog"
		var ah1 = strings.toTitleCase("javascript: a beginner's guide to the language of the web"); // "Javascript: A Beginner's Guide to the Language of the Web"
		var ah2 = strings.toTitleCase("james comey to remain on as FBI director"); // "James Comey to Remain on as FBI Director"
		var ah3 = strings.toTitleCase(testTitle); // "New Rules Grant F.B.I., DEA & CIA Access to 'Raw' NSA Surveillance Data"
    var ah4 = strings.toTitleCase("i am an animal. an idiot. an amazing man.")//to test multiple sentences. when sentences start with a preposition/conjunction/article.
    var ah5 = strings.toTitleCase("i am from the F.B.I.. an amazingly creepy and an amazingly weird organisation.")
    var ah6 = strings.toTitleCase(testTitle0); // "This Is a Title: And This Is a Subtitle"

		expect(ah0).to.equal("The Quick Brown Fox Jumps over the Lazy Dog");
		expect(ah1).to.equal("Javascript: A Beginner's Guide to the Language of the Web");
		expect(ah2).to.equal("James Comey to Remain on as FBI Director");
		expect(ah3).to.equal("New Rules Grant F.B.I., DEA & CIA Access to 'Raw' NSA Surveillance Data");
    expect(ah4).to.equal("I Am an Animal. An Idiot. An Amazing Man.");
    expect(ah5).to.equal("I Am from the F.B.I.. An Amazingly Creepy and an Amazingly Weird Organisation.")
    expect(ah6).to.equal("This Is a Title: And This Is a Subtitle")
  });	

});