// Sorts an array of numbers
export default function sortNumbers(arr, order){
  return arr.sort(function(a, b){ return order == "desc" ? b - a : a - b; });
}