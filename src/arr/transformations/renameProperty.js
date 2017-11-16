import deepCopy from "../other/deepCopy"
import is from "../queries/isArray"

// Renames a property or properties in every object of an array of objects.
// You must pass a "renamer" as the second argument.
// If you are only renaming one property, the renamer can be an object with the properties
// "in", the value of which is a string with the input property name,
// and "out", the value of which is a string with the output property name.
// If you are renaming multiple properties, the renamer can be an array of objects,
// where each object has the "in" and "out" properties of the single renamer.
export default function renameProperty(arr, renamer){
	var clone = deepCopy(arr);
	clone.forEach(function(row){
		if (is(renamer)){
			renamer.forEach(function(rename){
				renameRow(row, rename);
			});
		} else {
			renameRow(row, renamer);
		}
		return row;
	});
	return clone;
	function renameRow(row, rename){
		row[rename.out] = row[rename.in];
		delete row[rename.in];
	}
}