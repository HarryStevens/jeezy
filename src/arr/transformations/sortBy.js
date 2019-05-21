// Sorts an array of objects by the values of an attribute
export default function sortBy(arr, attribute, order){
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