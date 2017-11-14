// Returns all values of an attribute in an array of objects
export default function pluck(arr, attribute){
  return arr.map(function(d){ return d[attribute]; });
}