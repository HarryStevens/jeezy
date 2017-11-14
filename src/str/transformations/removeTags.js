// Removes HTML tags from a string. You can pass an optional array with the tags you want to keep.
export default function removeTags(x, y){
  if (!y) y = [];
  y = y.map(function(d){ return "<" + d + ">"; }).join(",");
  y = (((y || "") + "").toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join(""); // making sure the y arg is a string containing only tags in lowercase (<a><b><c>)
  var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
      commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
  return x.replace(commentsAndPhpTags, '').replace(tags, function ($0, $1) {
      return y.indexOf("<" + $1.toLowerCase() + ">") > -1 ? $0 : "";
  });
}