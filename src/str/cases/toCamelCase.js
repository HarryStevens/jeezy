// Transforms a string into camel case.
export default function toCamelCase(x){
  return x.toString().replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
    return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
  }).replace(/\s+/g, "").replace(/[^\w\-]+/g, "");
}