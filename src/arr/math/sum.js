// Returns the sum of an array of numbers.
export default function sum(arr){
  return arr.reduce(function(d, i){ return i + d; });
}