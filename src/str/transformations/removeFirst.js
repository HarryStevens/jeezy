// Removes the first instance of a substring (y) from a string (x).
export default function removeFirst(x, y){
  return x.toString().replace(y, "");
}