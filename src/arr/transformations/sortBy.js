// Sorts an array of objects by the values of an attribute
export default function sortBy(arr, attribute, order){
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