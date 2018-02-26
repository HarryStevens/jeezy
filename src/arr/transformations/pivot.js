import pluck from "./pluck"
import unique from "./unique"

// Returns a sort list of unique values of an attribute in an array of objects, and how many times each value appears in that array of objects
// Dependencies: pluck, unique
export default function pivot(arr, attribute){
  return unique(pluck(arr, attribute)).sort().map(function(d){ 
  	var obj = {count : arr.filter(function(e){ return e[attribute] == d; }).length};
  	obj[attribute] = d;
    return obj;
  });
}