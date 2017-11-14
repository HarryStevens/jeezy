// Creates a string of randomized characters of n length. n defaults to 5.
export default function randomString(n) {
  if (!n) n = 5;

  var x = "",
    p = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < n; i++) {
    x += p.charAt(Math.floor(Math.random() * p.length));
  }

  return x;
}