/* HELPER */
function print(array, latex) {
	console.log(inline_array(array, latex));
}

function print_part(array, start, end, latex) {
	console.log(inline_array_part(array, start, end, latex));
}


function inline_array(array, latex) {
	var out = "";
	if (latex != undefined && latex == true) {
		out += "";
		array.forEach((a) => { out += ("\\fbox{" + a + "}"); });
		out += "";
	} else {
		out += "[";
		array.slice(0, array.length-1).forEach((a) => { out += a + ", " });
		out += array[array.length-1] + "]";
	}
	return out;
}

function inline_array_part(array, start, end, latex) {
	return inline_array(array.slice(start, end+1), latex);
}


function swap(array, pos1, pos2, isHEAP) {
	var v1 = array[pos1];
	array[pos1] = array[pos2];
	array[pos2] = v1;
	if (isHEAP != undefined && isHEAP == true) {
		
		print(array, PRINT_LATEX);
	}
	
	if (VERBOSE) {
		var out = "swap ";
		if (PRINT_LATEX) out += "~~~";
		out += pos1 + " " + pos2 + ": " + inline_array(array, PRINT_LATEX);
		if (PRINT_LATEX) out += "\\\\";
		console.log(out);
	}
		
}


/* MERGESORT */
function mergeSort(E, left, right) {
	if (VERBOSE) {
		var out = "split: ";
		if (PRINT_LATEX) out += "~~";
		out += inline_array_part(E, left, right, PRINT_LATEX);
		if (PRINT_LATEX) out += "\\\\";
		console.log(out);
	}
	if(left < right) {
		var mid = Math.floor((left + right) / 2);
		mergeSort(E, left, mid);
		mergeSort(E, mid + 1, right);
		merge(E, left, mid, right);
		if (VERBOSE) {
			var out = "";
			if (PRINT_LATEX) out += "\\textbf{array:} ";
			else out += "array: ";
			out += inline_array(E, PRINT_LATEX);
			if (PRINT_LATEX) out += "\\\\";
			console.log(out);
		}else
			print(E, PRINT_LATEX);
	}
}

function merge(E, left, mid, right) {
	
	if (VERBOSE) {
		var out = "merge: " + inline_array_part(E, left, mid, PRINT_LATEX) + " + " + inline_array_part(E, mid+1, right, PRINT_LATEX);
		if (PRINT_LATEX) out += "\\\\";
		console.log(out);
	}
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
			
		swap(E, pos, next, !VERBOSE);
		pos = next;
		next = 2 * pos + 1;
	}
	if (VERBOSE) {
		var out = "heapify " + pos + "-" + (n-1) + ": " + inline_array(E, PRINT_LATEX);
		if (PRINT_LATEX) out += "\\\\";
		console.log(out);  
	}
}

function buildHeap(E) {
	for (var i = parseInt(E.length / 2) - 1; i >= 0; i--) {
		heapify(E, E.length, i);
	}
}

function heapSort(E) {
	if (VERBOSE) {
		var out = "buildHeap: ";
		if (PRINT_LATEX) out+= "~";
		out += inline_array(E, PRINT_LATEX);
		if (PRINT_LATEX) out+= "\\\\";
		console.log(out);
	}
	buildHeap(E);
	if (VERBOSE) {
		var out = "";
		if (PRINT_LATEX) out+= "\\tab\\tab~ ";
		out += inline_array(E, PRINT_LATEX);
		if (PRINT_LATEX) out+= "\\\\";
		console.log(out);
	}
	for (var i = E.length - 1; i > 0; i--) {
		swap(E, 0, i);
		heapify(E, i, 0);
	}
	if (VERBOSE) {
		var out = "";
		if (PRINT_LATEX) out+= "\\tab\\tab~ ";
		out += inline_array(E, PRINT_LATEX);
		console.log(out);
	} else
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
var VERBOSE = true;

var _Mergesort = [3, 9, 6, 4, 8, 10, 5, 2];
var _Heapsort = [3, 9, 6, 4, 8, 10, 5, 2];
var _Quicksort = [3, 9, 6, 4, 8, 10, 5, 2];


console.log("-------[ Mergesort ]------");
mergeSort(_Mergesort, 0, 7);

console.log("-------[ Heapsort ]-------");
heapSort(_Heapsort);

console.log("-------[ Quicksort ]------");
quickSort(_Quicksort, 0, 7);