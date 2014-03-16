/*jslint browser:true devel:true sloppy:true vars:true plusplus:true */
/*global $: false */

function randomIntFromInterval(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function walk(n) {
	return (n + randomIntFromInterval(-2, 2));
}

function walkCanvas() {
	// shorthand
	var rw = $("body").get(0).rw;
	console.log("walking...");
	var walking = true;
	var i, j, x = [], y = [];
	// initialize the walkers
	for (i = 0; i < rw.walkerCount; i++) {
		x[i] = randomIntFromInterval(0, rw.jCanvas.width);
		y[i] = randomIntFromInterval(0, rw.jCanvas.height);
		console.log("INOIT:", i, x[i], y[i]);
	}
	j = 0;
	while (walking) {
		j++;
		for (i = 0; i < rw.walkerCount; i++) {
			rw.ctx.beginPath();
			rw.ctx.moveTo(x[i], y[i]);
			x[i] = walk(x[i]);
			y[i] = walk(y[i]);
			rw.ctx.lineTo(x[i], y[i]);
			rw.ctx.stroke();
			console.log(i, x[i], y[i]);
		}
		walking = (j < 20);
	}
}

function canvasInit() {
	// shorthand
	var rw = $("body").get(0).rw;
	// store canvas jsquery style
	rw.jCanvas = $("#theCanvas");
	// store canvas node reference
	rw.nCanvas = $("#theCanvas").get(0);
	// match canvas coordinates to physical extent of canvas
	rw.nCanvas.width = rw.jCanvas.width;
	rw.nCanvas.height = rw.jCanvas.height;
	rw.ctx = rw.nCanvas.getContext("2d");
	// hardcode for now...
	rw.walkerCount = 1;
	rw.ctx.lineWidth = 1;
	rw.ctx.strokeStyle = "#000";
	console.log("dim", rw.jCanvas.width, rw.jCanvas.height);
	console.log("canvas initialized.");
	walkCanvas();
}

function pageInit() {
	// master object to store data that persists throughout page lifetime
	$("body").get(0).rw = {};
	console.log("page initialized.");
	canvasInit();
}

$(document).ready(function () {pageInit(); });
