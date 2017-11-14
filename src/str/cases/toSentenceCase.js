import firstLetter from "../queries/firstLetter"
import flatten from "../../arr/transformations/flatten"

// Capitalizes the first letter of the first word in a string.
export default function toSentenceCase(x, bool){
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
  		out = flatten(out.map(function(d){ return d.split(splitter).map(function(e, i, data){ return mapper(e, i, data, splitter); }); }))
  	});

  	return out;

  	function mapper(d, i, data, splitter){
  		return data.length == 0 ? d :
  			i < data.length - 1 ? d + splitter :
  			d;
  	}
  }
}