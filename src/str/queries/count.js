// Counts the number of times a substring y occurs in a string x.
export default function count(x, y){
  return (x.match(new RegExp(y, "g")) || []).length;
}