import sum from "./sum"

// Returns the average value of an array of numbers.
// Dependencies: sum
export default function average(arr){
  return sum(arr) / arr.length;
}