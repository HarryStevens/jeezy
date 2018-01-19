import isArray from "../queries/isArray"
import pluck from "../transformations/pluck"

// Given a data set (an array of objects)
// and a list of columns (an array with a list of numeric columns),
// calculate the Pearson correlation coeffient for each pair of columns
// and return a correlation matrix, where each object takes the form
// {column_a, column_a, correlation}
// Dependencies: pluck
export default function correlationMatrix(data, cols){
	// Error handling
	if (!data){
		throw new Error("You must pass a first argument.");
	} else if (!cols){
		throw new Error("You must pass a second argument.");
	} else if (!isArray(data)){
		throw new Error("The first argument must be an array.");
	} else if (!isArray(cols)){
		throw new Error("The second argument must be an array.");
	}

  var out = [];
  cols.forEach(function(colx){
    cols.forEach(function(coly){
      var arrays = calcArrays(data, colx, coly)
      var obj = {column_x: colx, column_y: coly, correlation: pearson(arrays[0], arrays[1])}
      out.push(obj);
    });
  });
  return out;
}

function calcArrays(data, column_a, column_b){
  var array_a = pluck(data, column_a);
  var array_b = pluck(data, column_b);
  return [array_a, array_b];
}

// Source: https://memory.psych.mun.ca/tech/js/correlation.shtml
// Takes two arrays of numbers
function pearson(x, y) {
  var shortestArrayLength = 0;

  if (x.length == y.length) {
    shortestArrayLength = x.length;
  } else if (x.length > y.length) {
    shortestArrayLength = y.length;
    console.error('x has more items in it, the last ' + (x.length - shortestArrayLength) + ' item(s) will be ignored');
  } else {
    shortestArrayLength = x.length;
    console.error('y has more items in it, the last ' + (y.length - shortestArrayLength) + ' item(s) will be ignored');
  }

  var xy = [];
  var x2 = [];
  var y2 = [];

  for (var i = 0; i < shortestArrayLength; i++) {
    xy.push(x[i] * y[i]);
    x2.push(x[i] * x[i]);
    y2.push(y[i] * y[i]);
  }

  var sum_x = 0;
  var sum_y = 0;
  var sum_xy = 0;
  var sum_x2 = 0;
  var sum_y2 = 0;

  for (var i = 0; i < shortestArrayLength; i++) {
    sum_x += x[i];
    sum_y += y[i];
    sum_xy += xy[i];
    sum_x2 += x2[i];
    sum_y2 += y2[i];
  }

  var step1 = (shortestArrayLength * sum_xy) - (sum_x * sum_y);
  var step2 = (shortestArrayLength * sum_x2) - (sum_x * sum_x);
  var step3 = (shortestArrayLength * sum_y2) - (sum_y * sum_y);
  var step4 = Math.sqrt(step2 * step3);
  var answer = step1 / step4;

  return answer;
}