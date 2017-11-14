// Removes all digits from a string.
export default function removeDigits(x){
  return x.toString().replace(/\d+/g, "");
}