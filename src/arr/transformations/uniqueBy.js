import pluck from "./pluck"
import unique from "./unique"

// Returns a list of unique values of an attribute or mapping function in an array of objects
// Dependencies: pluck, unique
export default function uniqueBy(arr, mapper){
  return unique(pluck(arr, mapper));
}