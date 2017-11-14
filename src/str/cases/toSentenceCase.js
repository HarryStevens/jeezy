import firstLetter from "../queries/firstLetter"

// Capitalizes the first letter of the first word in a string.
export default function toSentenceCase(x, bool){
  x = bool ? x.toString().toLowerCase() : x.toString();
  var first_letter = firstLetter(x);
  return first_letter ? x.replace(first_letter, first_letter.toUpperCase()) : x;
};