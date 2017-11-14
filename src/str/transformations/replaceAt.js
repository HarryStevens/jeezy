// Replaces the characters of a string with another string beginning at a specific index.
export default function replaceAt(string, index, replacement){
  if (!index) index = 0;
  return string.substr(0, index) + replacement + string.substr(index + replacement.length);
}