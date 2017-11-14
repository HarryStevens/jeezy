// Tests whether a string x ends with a substring y.
// Defaults to case sensitive, but you can set the third argument to true for case insensitive.
export default function endsWith(x, y, bool){
  x = x.toString();
  return bool ? x.toUpperCase().endsWith(y.toUpperCase()) : x.endsWith(y);
}