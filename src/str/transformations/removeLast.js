import replaceLast from "./replaceLast"

// Removes the last instance of a substring (y) from a string (x).
// Dependencies: replaceLast
export default function removeLast(x, y){
  return replaceLast(x, y, "");
}