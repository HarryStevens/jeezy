// Tests whether a string starts with a substring.
// Defaults to case sensitive, but you can set the third argument to true for case insensitive.
export default function startsWith(x, y, bool){
  return bool ? x.toUpperCase().startsWith(y.toUpperCase()) : x.toString().startsWith(y);
}