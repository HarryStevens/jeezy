// Transforms a string into title case, where the first letter of every word is capitalized except for certain prepositions, articles and conjunctions.
export default function toTitleCase(x) {
  var smalls = [];
  var articles = ["A", "An", "The"].forEach(function(d){ smalls.push(d); });
  var conjunctions = ["And", "But", "Or", "Nor", "So", "Yet"].forEach(function(d){ smalls.push(d); })
  var prepositions = ["As", "At", "Atop", "By", "Into", "It", "In", "For", "From", "Of", "Onto", "On", "Out", "Over", "Per", "To", "Unto", "Up", "Upon", "With"].forEach(function(d){ smalls.push(d); });
  
  x = x.split("").reverse().join("") + " ";

  x = x.replace(/['"]?[a-z]['"]?(?= )/g, function(match){ return match.toUpperCase(); });

  x = x.split("").slice(0, -1).reverse().join("")

  x = x.replace(/ .*?(?= )/g, function(match){
    
    if (smalls.indexOf(match.substr(1)) !== -1) {
      return match.toLowerCase();
    }
    return match;
  });


  //smalls at the start of sentences shouldbe capitals. Also includes when the sentence ends with an abbreviation.
  x = x.replace(/(([^\.]\w\. )|(\.[\w]*?\.\. )).*?(?=[ \.])/g, function(match) {
    var word = match.split(" ")[1];
    var letters = word.split("");

    letters[0] = letters[0].toUpperCase();
    word = letters.join("");

    if(smalls.indexOf(word) !== -1) {
      return match.split(" ")[0] + " " + word;
    }

    return match;
  });

  x = x.replace(/: .*?(?= )/g, function(match){ 
    var first_letter = match.match(/\b[a-z]/);
    return match.replace(first_letter[0], first_letter[0].toUpperCase()); 
  });
  
  return x;
}