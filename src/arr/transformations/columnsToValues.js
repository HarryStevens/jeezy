// Fixes a two-dimensional array of objects in which the column names contain values.
export default function columnsToValues(arr){
	var out = [], columns = Object.keys(arr[0]), col_name = columns.shift();
	columns.forEach(function(column){
		arr.forEach(function(row){
			var obj = {};
			obj[col_name] = row[col_name];
			obj.column = column;
			obj.value = row[column];
			out.push(obj);
		});
	});
	return out;
}