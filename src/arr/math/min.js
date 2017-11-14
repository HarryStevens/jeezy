// Returns the minimum value of an array.
export default function min(arr){
  return arr.reduce(function(a, b) {
    return Math.min(a, b);
	});
}