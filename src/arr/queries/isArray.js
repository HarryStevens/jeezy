// Test whether an element is an array
export default function isArray(arr){
  return typeof(arr) == "object" && arr.length >= 0;
}