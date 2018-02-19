import isArray from "../../arr/queries/isArray"
import sortNumbers from "../../arr/transformations/sortNumbers"

// Split a string at a numerical index or at each index in an array of numerical indices.
// Example: splitAtIndex("Hello world", "Hello world".length - 1) --> ["Hello worl", "d"]
// Example: splitAtIndex("Hello world", [1, "Hello world".length - 1]) --> ["H", "ello worl", "d"]
export default function splitAtIndex(str, i){
	if (!str || typeof(str) !== "string") {
		throw new Error("The first argument must be a string.");
	}
	if (!i || (typeof(i) !== "number" && !isArray(i)) ) {
		throw new Error("The second argument must be a number or an array.");	
	}

	if (typeof(i) == "number"){
		return [str.substring(0, i), str.substring(i)];	
	} else {

		if (i.some(function(num){
			return typeof(num) !== "number"
		})) {
			throw new Error("Every item in the second argument array must be a number.")
		}

		var out = sortNumbers(i).map(function(num, num_i){
			return str.substring(i[num_i - 1], num);
		});
		out.push(str.substring(i[i.length - 1]));
		return out;
	}
}