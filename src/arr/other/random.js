import randBetween from "../../num/other/randBetween"

// Returns an item at random from an array
// Dependencies: randBetween
export default function random(arr){
  return arr[randBetween(0, arr.length - 1)]
}