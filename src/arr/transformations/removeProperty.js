import is from "../queries/isArray";
import deepCopy from "../other/deepCopy";

// Removes a property from every object in an array of object. Returns a new array and does not change the original one.
// The second argument can be a string or, if you want to remove multiple properties, an array of strings.
// Dependencies: is
export default function removeProperty(arr, property){
  var d = deepCopy(arr);

  d.forEach(function(obj){
    
    if (is(property)){
      property.forEach(function(prop){
        delete obj[prop];
      });
    } else {
      delete obj[property];  
    }
    
  });

  return d;
}