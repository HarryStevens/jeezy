// Removes anything that is not a letter or a space from a string.
export default function removeSymbols(x){
  return x.replace(/[^a-zA-Z ]/g, "");
}