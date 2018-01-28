import is from "../queries/isArray"

// Coerces the type of a property to a number in every object in an array of objects.
// The second argument can be a string with a single property name, or an array of strings with one or more property names.
// Optional third argument 
// - coerce (function) By default, non-numeric values will be converted to NaN. But you can pass a function to decide how to deal with non-numeric values. However, if the function you pass returns a non-numeric value, that value will itself be coerced to NaN.
// 		Example: function(d){ return jz.str.keepNumbers(d) }
//		Example: function(d){ return 0; }
export default function propertyToNumber(data, prop, coerce){

	if (data == undefined){
		throw new Error("You must pass a first argument.");
	}

	if (prop == undefined){
		throw new Error("You must pass a second argument.");
	}

	if (!is(data)){
		throw new Error("The first argument must be an array.");
	}

	if (!is(prop) && typeof(prop) !== "string") {
		throw new Error("The second argument must be a string or an array.");
	}

	if (coerce && typeof(coerce) !== "function") {
		throw new Error("The third argument must be a function.");
	}

	// did a coercing function get passed
	coerce = coerce ? coerce : function(){ return NaN; }

	// if the second argument is an array
	if (is(prop)){
		data.forEach(function(d, i){
			prop.forEach(function(p){
				if (typeof(p) !== "string"){
					throw new Error("Each item in the second array must be a string.")
				}

				d[p] = isNaN(+d[p]) ? +coerce(d[p]) : +d[p];

			});
			return d;
		});
		return data;
	}

	// if the second argument is a string
	else {
		data.forEach(function(d){
			d[prop] = isNaN(+d[prop]) ? +coerce(d[prop]) : +d[prop];
			return d;
		});
		return data;
	}
}