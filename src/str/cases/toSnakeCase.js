// Transforms a string into snake case.
export default function toSnakeCase(x) {
  return x.toString().toLowerCase()
    .replace(/\s+/g, "_")           // Replace spaces with _
    .replace(/[^\w\_]+/g, "")       // Remove all non-word chars
    .replace(/\_\_+/g, "_")         // Replace multiple _ with single _
    .replace(/^_+/, "")             // Trim _ from start of text
    .replace(/_+$/, "");            // Trim _ from end of text
}