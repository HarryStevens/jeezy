import shuffle from "../../arr/transformations/shuffle"

// Randomly shuffles a string's characters.
// Dependencies: shuffle
export default function shuffleCharacters(x){
  return shuffle(x.toString().split("")).join("");
}