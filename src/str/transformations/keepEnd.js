// Keeps n number of characters at the end of a string and removes the rest.
export default function keepEnd(x, n){
  x = x.toString();
  return x.slice(x.length - n, x.length)
}