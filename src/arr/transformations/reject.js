// Filters an array of objects to remove those objects that contain a specified key-value pair.
export default function reject(arr, object){

  var keys = Object.keys(object);
  var evaluate = "";

  keys.forEach(function(key, index){
    evaluate = evaluate + (index != 0 ? " && " : "") + "d['" + key + "'] != object['" + key + "']";
  });

  return arr.filter(function(d){
    return eval(evaluate);
  });

}