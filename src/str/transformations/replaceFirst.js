// Replaces the first instance of substring (y) with substring (z) in a string (x).
// Uses the same functionality as the native Javascript String.replace() method
// (http://www.w3schools.com/jsref/jsref_replace.asp).
export default function replaceFirst(x, y, z){
  return x.toString().replace(y, z);
}