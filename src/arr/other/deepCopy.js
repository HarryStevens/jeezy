// Returns a deep copy of an array.
export default function(arr){
	return JSON.parse(JSON.stringify(arr));
}