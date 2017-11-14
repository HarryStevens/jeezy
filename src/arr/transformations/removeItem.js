import shallowCopy from "../other/shallowCopy"

// Removes an item from an array, and returns the array
// Dependencies: shallowCopy
export default function removeItem(arr, item){
  var copy = shallowCopy(arr);
  var index = copy.indexOf(item);
  if (index > -1){
    copy.splice(index, 1);
  }
  return copy;
}