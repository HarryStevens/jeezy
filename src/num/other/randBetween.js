// Returns a random integer between two other integers
export default function randBetween(min, max){
  return Math.floor(Math.random() * (max - min + 1) + min);
}