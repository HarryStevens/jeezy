import toSentenceCase from "./toSentenceCase"

// Capitalizes the first letter of every word in a string.
// Depencencies: toSentenceCase
export default function toStartCase(x, bool){
  return x.toString().split(" ").map(function(d){ return bool ? toSentenceCase(d, bool) : toSentenceCase(d); }).join(" ");
};