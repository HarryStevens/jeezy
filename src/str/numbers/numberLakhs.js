import removeAll from "../transformations/removeAll"

// Adds commas to a number string for thousands, lakhs, crores, and so on. 
// This is according to the Indian numbering system (https://en.wikipedia.org/wiki/Indian_numbering_system).
// Dependencies: removeAll
export default function numberLakhs(x){
  x = removeAll(x, ",");
  var afterPoint = x.indexOf(".") > 0 ? x.substring(x.indexOf("."), x.length) : "";
  x = Math.floor(x).toString();
  var lastThree = x.substring(x.length - 3), otherNumbers = x.substring(0, x.length - 3);
  lastThree = otherNumbers != "" ? "," + lastThree : lastThree;
  return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree + afterPoint;
};