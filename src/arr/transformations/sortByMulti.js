import is from "../queries/isArray"
import sortBy from "./sortBy"

// Sorts an array of objects multiple times by the values of the attributes you specify
// Dependencies: is, sortBy
export default function sortByMulti(arr, order_array){
  order_array.forEach(function(order){
    arr = is(arr) ? sortBy(arr, order[0], order[1]) : sortBy(arr, order);
  });
  return arr;
}