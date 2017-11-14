// Replaces the last instance of substring (y) with substring (z) in a string (x).
export default function replaceLast(x, y, z) {
  x = x.toString();
  var a = x.split("");
  a[x.lastIndexOf(y)] = z;
  return a.join("");
}