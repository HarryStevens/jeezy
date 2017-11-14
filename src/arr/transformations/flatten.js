// Flattens an array of arrays into a single array
export default function flatten(arr){
  return [].concat.apply([], arr);
}