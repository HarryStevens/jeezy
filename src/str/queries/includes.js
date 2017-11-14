// Tests whether a string includes another string.
// Defaults to case sensitive, but you can set the third argument to true for case insensitive.
export default function includes(x, y, bool){
  x = x.toString();
  return bool ? x.toUpperCase().indexOf(y.toUpperCase()) != -1 : x.indexOf(y) != -1;
}