// Replaces all instances of substring (y) with substring (z) in a string (x).
export default function replaceAll(x, y, z){
  return x.toString().replace(new RegExp(y, "g"), z);
}