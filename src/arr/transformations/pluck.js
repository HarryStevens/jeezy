// Returns all values of an attribute or mapping function in an array of objects
export default function pluck(arr, mapper){
  return arr.map(function(d){ return typeof(mapper) === "string" ? d[mapper] : mapper(d); });
}