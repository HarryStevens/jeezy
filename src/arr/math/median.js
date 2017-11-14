import sortNumbers from "../transformations/sortNumbers"

// Returns the medium value of an array of numbers.
// Dependencies: sortNumbers
export default function median(arr){
  arr = sortNumbers(arr);
  var i = arr.length / 2;
  return i % 1 === 0 ? (arr[i - 1] + arr[i]) / 2 : arr[Math.floor(i)];
}