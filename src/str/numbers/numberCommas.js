import removeAll from "../transformations/removeAll"

// Adds commas to a number string for thousands, millions, billions, and so on.
// Dependencies: removeAll
export default function numberCommas(x){
  return removeAll(x, ",").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};