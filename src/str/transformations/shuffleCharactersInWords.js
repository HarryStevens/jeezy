import shuffleCharacters from "./shuffleCharacters"

// Randomly shuffles the characters of each word, but keeps the words in order. 
// Dependencies: shuffleCharacters
export default function shuffleCharactersInWords(x){
  return x.toString().split(" ").map(function(d){ return shuffleCharacters(d); }).join(" ");
}