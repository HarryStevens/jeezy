// Returns the maximum value of an array.
export default function max(arr){
  return arr.reduce(function(a, b) {
    return Math.max(a, b);
	});
}