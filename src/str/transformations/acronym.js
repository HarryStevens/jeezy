// Turns a string into an acronym.
export default function acronym(x){
  return x.split(" ").map(function(d){ return d[0]; }).join("");
}