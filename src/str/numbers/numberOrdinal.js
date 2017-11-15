// Returns an ordinal number (1st, 2nd, 3rd, 4th, etc.)
export default function numberOrdinal(x) {
  var j = x % 10,
      k = x % 100;
  return j == 1 && k != 11 ? x + "st" :
  	j == 2 && k != 12 ? x + "nd" :
  	j == 3 && k != 13 ? x + "rd" :
  	x + "th";
}