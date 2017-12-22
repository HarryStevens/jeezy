import is from "../queries/isArray"

// Coerces the type of a property to a number in every object in an array of objects.
// The second argument can be a string with a single property name, or an array of strings with one or more property names.
export default function propertyToNumber(data, prop){

	if (data == undefined){
		throw new Error("You must pass a first argument.")
	}

	if (prop == undefined){
		throw new Error("You must pass a second argument.")
	}

	if (!is(data)){
		throw new Error("The first argument must be an array.")
	}

	if (!is(prop) && typeof(prop) !== "string") {
		throw new Error("The second argument must be a string or an array.")	
	}

	// if the second argument is an array
	if (is(prop)){
		data.forEach(function(d){
			prop.forEach(function(p){
				if (typeof(p) !== "string"){
					throw new Error("Each item in the second array must be a string.")
				}

				d[p] = +d[p];
			});
			return d;
		});
		return data;
	}

	// if the second argument is a string
	else {
		data.forEach(function(d){
			d[prop] = +d[prop];
			return d;
		});
		return data;
	}

}