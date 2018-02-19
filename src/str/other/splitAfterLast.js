// Split a string at the last instance of a character or a sequence of characters (i). 
// Returns an array with two items. The first item is everything that came before i, while the second item is everything that came after.
// i itself is removed.
// Example: splitAfterLast("Hello world", "o") --> ["Hello w", "rld"]
// Example: splitAfterLast("Good morning world", "or") --> ["Good morning w", "ld"]
// Example: splitAfterLast("Hello world", "x") --> ["Hello world", ""]
export default function splitAfterLast(str, char){
	if (!str || typeof(str) !== "string") {
		throw new Error("The first argument must be a string.");
	}
	if (!char || typeof(char) !== "string") {
		throw new Error("The second argument must be a string.");	
	}

	if (char.length == 0 || str.indexOf(char) == -1) {
		return [str, ""];
	} else if (char.length == 1){
		var i = str.lastIndexOf(char);
		return [str.substring(0, i), str.substring(i + 1)]
	} else if (char.length > 1){
		var spl = str.split(char);
		var last = spl[spl.length - 1];
		spl.pop();
		return [spl.join(char), last];
	}
}