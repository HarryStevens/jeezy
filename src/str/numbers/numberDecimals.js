import removeAll from "../transformations/removeAll"

// Rounds a number string, both float and integer, to the nearest n decimal place.
// Dependencies: removeAll
export default function numberDecimals(x, n){
  return Number(removeAll(x, ",")).toFixed(n);
};