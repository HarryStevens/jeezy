import shuffle from "../../arr/transformations/shuffle"

// Randomly shuffles a string's words.
// Dependencies: shuffle  
export default function shuffleWords(x){
  return shuffle(x.toString().split(" ")).join(" ");
}