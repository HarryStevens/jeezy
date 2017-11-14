import replaceAll from "./replaceAll"

// Removes all instances of a substring (y) from a string (x).
// Dependencies: replaceAll
export default function removeAll(x, y){
  x = x.toString();
  return replaceAll(x, y , "");
}