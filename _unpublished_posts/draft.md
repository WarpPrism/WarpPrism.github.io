~~~javascript
function quickSort(arr) {
	if (Object.prototype.toString.call(arr) != '[object Array]') {
		return 'Error: Not Array Object';
	}
	if (arr.length <= 1) {
		return arr;
	}

	var middle = Math.floor(arr.length / 2);
	var pivot = arr.splice(middle, 1)[0];
	var left = [], right = [];
	for (var i = 0; i < arr.length; i++) {
		if (arr[i] < pivot) {
			left.push(arr[i]);
		} else {
			right.push(arr[i]);
		}
	}
	return (quickSort(left).concat([pivot], quickSort(right)));
}

var a = [10, 3, 8, 0, 10, 2, 78, 09, 33, 2, 10.65, 89, 106];
console.log(quickSort(a));
var b = new Function();
console.log(quickSort(b));
~~~
