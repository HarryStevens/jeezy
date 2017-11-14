import pluck from "./pluck"
import sortNumbers from "./sortNumbers"
import unique from "./unique"

// Returns a sorted list of unique values of an attribute in an array of objects, and how many times each value appears in that array of objects
// Dependencies: pluck, sortNumbers, unique
export default function uniqueBy(arr, attribute){
  var ret = unique(pluck(arr, attribute)).sort().map(function(d){ return d });
  return typeof ret[0] == "number" ? sortNumbers(ret) : ret.sort();
}