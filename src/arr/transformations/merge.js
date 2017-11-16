import shallowCopy from "../other/shallowCopy"

// Merges two arrays of objects on a specified property.
// Keeps each object of the first array,
// and adds the matching properties of the first matched object in the second array.
export default function merge(arr1, arr2, property){
	var keys1 = Object.keys(arr1[0]);
	var keys2 = Object.keys(arr2[0]);

	if (keys1.indexOf(property) == -1) throw new Error(property + " not in first array.");
	if (keys2.indexOf(property) == -1) throw new Error(property + " not in second array.");

	var clone = shallowCopy(arr1);

	clone.forEach(function(d){
		var match = arr2.filter(function(e){ return d[property] == e[property]; });
		keys2.forEach(function(key){
			var prop = keys1.indexOf(key) == -1 ? key : key + "2";
			d[prop] = match[0] ? match[0][key] : "NA";
		});
		return d;
	});

	return clone;
}