import firstLetter from "../queries/firstLetter"
import removeAll from "../transformations/removeAll"

// Adds zeros before a string so that the length of the string equals a given number of characters.
// Does nothing to the string if it is already longer than the number of characters.
// If you do not specify a prepend character (c), it defaults to zero.
// If you specify c of length greater than one, it uses just the first character.
// Dependencies: firstLetter, removeAll
export default function numberPrepend(x, n, c){
	c = !c ? "0" :
		typeof(c) !== "string" ? "0" :
		c.length > 1 ? firstLetter(c) :
		c;
  for (var s = "", i = 1; i <= n - removeAll(x, ",").length; i++){
    s = s + c;
  }
  return s + removeAll(x, ",");
};