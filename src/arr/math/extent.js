import max from "./max"
import min from "./min"

// Returns ths minimum and maximum values of an array as the array [min, max].
// Depencencies: max, min
export default function extent(arr){
  return [min(arr), max(arr)];
}