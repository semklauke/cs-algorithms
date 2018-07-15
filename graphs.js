/* HELPER */
var WHITE = 0;
var GRAY = 1;
var BLACK = 2;

var _topoNum = 0;

function logArray(array, pre, color, latex) {
	var out = latex ? "\\textbf{"+ pre + ":}\\\\ \\texttt{[" : pre+":\n[";
	var l = array.length;
	array.forEach(function(x, i) {
		if (color == false) {
			var a = x +1
			out += a;
		} else if (color == true) {
			if (x == WHITE)
				out += "WHITE";
			else if (x == GRAY)
				out += "GRAY";
			else if (x == BLACK)
				out += "BLACK";
		}
		if (i != (l-1)) out += ", ";
	});
	out += latex ? "]}\\\\" : "]";
	console.log(out);
}

/* Depth First Search */

function DFS(graph, start, color, topo) {
	color[start] = GRAY;
	var l = graph[start].length;
	for (var w = 0; w < l; w++) {
		if (color[graph[start][w]] == WHITE) DFS(graph, graph[start][w], color, topo);
	}
	_topoNum++;
	topo[start] = _topoNum;
	color[start] = BLACK;
}


function DFS1(graph, start, color, stack) {
	color[start] = GRAY;
	var l = graph[start].length;
	for (var w = 0; w < l; w++) {
		if (color[graph[start][w]] == WHITE) DFS1(graph, graph[start][w], color, stack);
	}
	color[start] = BLACK;
	stack.push(start);
	
}

function DFS2(graph, start, color, leader, scc) {
	color[start] = GRAY;
	var l = graph[start].length;
	for (var w = 0; w < l; w++) {
		if (color[graph[start][w]] == WHITE) DFS2(graph, graph[start][w], color, leader, scc)
	}
	color[start] = BLACK;
	scc[start] = leader;
}


/* Kosaraju-Sharir */

function kosaraju_sharir(graph, n, graph_T, latex) {
	var _color = [];
	var _stack = [];
	var _scc = [];
	for (var i = 0; i < n; i++) {
		_color[i] = WHITE;
	}
	for (var i = 0; i < n; i++) {
		if (_color[i] == WHITE) {
			DFS1(graph, i, _color, _stack);
			logArray(_color, "color", true, latex);
			logArray(_stack, "stack", false, latex);
			if (latex) console.log("\\\\");
		}
	}
	for (var i = 0; i < n; i++) {
		_color[i] = WHITE;
	}
	var out = _stack.pop();
	console.log("========= PHASE 2 =========");
	while (out != undefined) {
		if (_color[out] == WHITE) {
			DFS2(graph_T, out, _color, out, _scc);
			logArray(_color, "color", true, latex);
			logArray(_stack, "stack", false, latex);
			logArray(_scc, "scc", false);
			if (latex) console.log("\\\\");

		}
			out = _stack.pop();
	}
}

/* topological sort */

function topoSort(graph, n) {
	var _color = [];
	var _topo = [];
	for (var i = 0; i < n; i++) {
		_color[i] = WHITE;
	}
	for (var v = 0; v < n; v++) {
		if (_color[v] == WHITE) DFS(graph, v, _color, _topo);
	}
	console.log(_topo);
}


/* RUNNING */

//bsp
var _graph1 = [
	[4],
	[2, 5],
	[1, 5, 6],
	[],
	[0, 5],
	[0, 9],
	[5, 9],
	[3, 6, 10],
	[5],
	[5, 6, 7, 8, 10],
	[9]
];

var _graph1_transponive = [
	[4, 5],
	[2],
	[1],
	[7],
	[0],
	[1, 2, 4, 6, 8, 9],
	[2, 5, 7, 9],
	[9],
	[9],
	[5, 6, 10],
	[7, 9]
];

var _graph2 = [
	[1],
	[],
	[1, 3, 5, 6, 7],
	[7],
	[8],
	[4, 8],
	[10],
	[6],
	[12, 13],
	[5, 8, 13],
	[9, 14],
	[10],
	[16],
	[16, 18],
	[13],
	[10, 11],
	[],
	[13, 16, 18],
	[],
	[18]
];


var PRINT_LATEX = true;

kosaraju_sharir(_graph1, 11, _graph1_transponive, PRINT_LATEX);
topoSort(_graph2, 20);








