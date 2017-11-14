// Keeps n number of characters at the start of a string and removes the rest.
export default function keepStart(x, n){
  return x.toString().slice(0, +n)
}