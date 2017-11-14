import keepAll from "./keepAll"

// Keeps one instance of a substring (y) in a string (x),
// even if y appears multiple times. Removes everything else.
// Returns a blank string if y does not appear in x.
// Dependencies: keepAll
export default function keepOne(x, y){
  return keepAll(x, y).charAt(0);
}