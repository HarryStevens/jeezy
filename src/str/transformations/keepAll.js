// Keeps all instances of a character or a sequence of characters (y) in a string (x).
// Removes everything else. Returns a blank string if the substring doesn't appear in the original string.
export default function keepAll(x, y){
  return x.toString().split("").map(function(d){ if (d == y) return d; }).join("");
}