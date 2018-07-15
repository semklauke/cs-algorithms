/* HELPER */
function print(array, latex) {
	if (latex != undefined && latex == true) {
		var out = "\\[";
		array.forEach((a) => { out += ("\\fbox{" + a + "}"); });
		console.log(out + "\\]");
	} else {
		console.log(array);
	}
}

function swap(array, pos1, pos2, isHEAP) {
	var v1 = array[pos1];
	array[pos1] = array[pos2];
	array[pos2] = v1;
	if (isHEAP != undefined && isHEAP == true)
		print(array, PRINT_LATEX);
}


/* MERGESORT */
function mergeSort(E, left, right) {
	if(left < right) {
		var mid = Math.floor((left + right) / 2);
		mergeSort(E, left, mid);
		mergeSort(E, mid + 1, right);
		merge(E, left, mid, right);
		print(E, PRINT_LATEX);
	}
}

function merge(E, left, mid, right) {
	var a = left; var b = mid +1;
	var Eold = E.slice(0);
	for(; left <= right; left++)
	{
		if(a > mid) {
			E[left] = Eold[b];
			b++;
		} else if (b>right || Eold[a] <= Eold[b]) {
			E[left] = Eold[a];
			a++;
		} else {
			E[left] = Eold[b];
			b++;
		}
	}
}

/* HEAPSORT */
function heapify(E, n, pos) {
	var next = 2 * pos + 1;
	while (next < n) {
		if (next + 1 < n && E[next+1] > E[next] )
			next = next + 1;
			
		if (E[pos] >= E[next])
			break;
			
		swap(E, pos, next, true);
		pos = next;
		next = 2 * pos + 1;
	}
}

function buildHeap(E) {
	for (var i = parseInt(E.length / 2) - 1; i >= 0; i--) {
		heapify(E, E.length, i);
	}
}

function heapSort(E) {
	buildHeap(E);
	for (var i = E.length - 1; i > 0; i--) {
		swap(E, 0, i);
		heapify(E, i, 0);
	}
	print(E, PRINT_LATEX);
}



/* QUICKSORT */

function partition(E, left, right) {
	var ppos = right;
	var pivot = E[ppos];
	while (true) {
		while (left < right && E[left] < pivot) left++;
		while (left < right && E[right] >= pivot) right--;
		if (left >= right)
			break;
		swap(E, left, right);
	}
	swap(E, left, ppos);
	print(E, PRINT_LATEX);
	return left;
}

function quickSort(E, left, right) {
	if (left < right) {
		var i = partition(E, left, right);
		quickSort(E, left, i-1);
		quickSort(E, i+1, right);
	}
}



/* RUNNING */

var PRINT_LATEX = false;

var _Mergesort = [9, 0, 6, 2, 5, 1, 4, 8];
var _Heapsort = [9, 2, 9, 6, 5, 1, 0, 7];
var _Quicksort = [6, 4, 4, 9, 3, 2, 7, 5];

console.log("-------[ Mergesort ]------");
mergeSort(_Mergesort, 0, 7);

console.log("-------[ Heapsort ]-------");
heapSort(_Heapsort);

console.log("-------[ Quicksort ]------");
quickSort(_Quicksort, 0, 7);