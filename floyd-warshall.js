function l(x) {console.log(x);}
function printWithInf(x) {return x == Infinity ? "$\\infty$" : x; }
function alterd(x, old) {
	if (old == null) 
		return printWithInf(x);
	if (x == old)
		return printWithInf(x);
	if (x != old) 
		return ("\\cellcolor{blue!25}"+printWithInf(x));
}
function initLast(n) {
	_LAST = Array(n); 
	for (var i = 0; i < n; i++) {
		_LAST[i] = Array(n);
		for (var j = 0; j < n; j++) _LAST[i][j] = null;
	} 
}
function copyLast(D, n) {
	_LAST = Array(n); 
	for (var i = 0; i < n; i++) {
		_LAST[i] = Array(n);
		for (var j = 0; j < n; j++) _LAST[i][j] = D[i][j];
	} 
}
var _LAST = null;


function printTabel(array, lable) {
	l("\\begin{tabular}{|c|c|c|c|c|c|}");
	l("\\hline");
	l("x & A & B & C & D & E \\\\");
	l("\\hline");

	var l1 = array.length;
	for (var i = 0; i < l1; i++) {
		var a = array[i];
		var l2 = a.length;
		var out = lable[i] + " & ";
		for (var j = 0; j < l2; j++) {
			out += alterd(a[j], _LAST[i][j]);
			if ((j+1) != l2)
				out += " & ";
		}
		out += "\\\\\n\\hline";
		l(out);
		
	}
	l("\\end{tabular}\\\\\\\\");
	copyLast(array, _n);
}


var _LABEL = ["A", "B", "C", "D", "E"];

var _W = [
	[0, 8, 1, 5, Infinity],
	[Infinity, 0, Infinity, Infinity, Infinity],
	[Infinity, 7, 0, 1, 1],
	[8, Infinity, 3, 0, 1],
	[Infinity, 3, 1, Infinity, 0]
];
var _n = 5;
var _D = [
	Array(5),
	Array(5),
	Array(5),
	Array(5),
	Array(5)
];

function floyd(W, n, D) {
	for (var i = 0; i < n; i++)
		for (var j = 0; j < n; j++)
			D[i][j] = W[i][j];
			
	for (var i = 0; i < n; i++)
		D[i][i] = 0;
	
	printTabel(D, _LABEL);
	for (var k = 0; k < n; k++) {
		for (var i = 0; i < n; i++)
			for (var j = 0; j < n ; j++)
				D[i][j] = Math.min(D[i][j], (D[i][k] + D[k][j]))
		printTabel(_D, _LABEL);
		
	}
}

initLast(_n);
floyd(_W, _n, _D);
