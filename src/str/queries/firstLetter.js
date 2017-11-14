// Returns the first letter of a string. Returns null if there are no letters in the string.
export default function firstLetter(x){
  var y = x.match(/\b[a-zA-Z]/);
  return y ? y[0] : null;
}