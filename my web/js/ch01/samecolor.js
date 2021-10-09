"use strict";

var gl1,gl2;
var points;

window.onload = function init() {
	var canvas1 = document.getElementById("square-canvas");
	var canvas2 = document.getElementById("triangle-canvas");
	gl1 = WebGLUtils.setupWebGL(canvas1);
	if (!gl1) {
		alert("WebGL isn't available");
	}

	gl2 = WebGLUtils.setupWebGL(canvas2);
	if (!gl2) {
		alert("WebGL isn't available");
	}
	
	// Four Vertices
	var vertices1 = [
		-0.5, -0.5,
		0.5, -0.5,
		0.5, 0.5,
		-0.5, 0.5
	];

	var vertices2 = [
		-1.0, -1.0,
		0.0, 1.0,
		1.0, -1.0
	];
	
	// Configure WebGL
	gl1.viewport(0, 0, canvas1.width, canvas1.height);
	gl1.clearColor(1.0, 1.0, 1.0, 1.0);

	gl2.viewport(0, 0, canvas2.width, canvas2.height);
	gl2.clearColor(1.0, 1.0, 1.0, 1.0);

	// Load shaders and initialize attribute buffers
	var program1 = initShaders(gl1, "vertex-shader", "fragment-shader");
	gl1.useProgram(program1);
	
	var program2 = initShaders(gl2, "vertex-shader", "fragment-shader");
	gl2.useProgram(program2);
	
	// Load the data into the GPU
	var bufferId1 = gl1.createBuffer();
	gl1.bindBuffer(gl1.ARRAY_BUFFER, bufferId);
	gl1.bufferData(gl1.ARRAY_BUFFER, new Float32Array(vertices), gl1.STATIC_DRAW);

	var bufferId2 = gl2.createBuffer();
	gl1.bindBuffer(gl2.ARRAY_BUFFER, bufferId);
	gl1.bufferData(gl2.ARRAY_BUFFER, new Float32Array(vertices), gl2.STATIC_DRAW);
	
	// Associate external shader variables with data buffer
	var vPosition1 = gl1.getAttribLocation(program1, "vPosition1");
	gl1.vertexAttribPointer(vPosition1, 2, gl1.FLOAT, false, 0, 0);
	gl1.enableVertexAttribArray(vPosition1);
	render1();
	
	var vPosition2 = gl2.getAttribLocation(program2, "vPosition2");
	gl2.vertexAttribPointer(vPosition2, 2, gl2.FLOAT, false, 0, 0);
	gl2.enableVertexAttribArray(vPosition2);
	render2();
	
}

function render1() {
	gl1.clear(gl1.COLOR_BUFFER_BIT);
	gl1.drawArrays(gl1.TRIANGLE_FAN, 0, 4);
	//gl.drawArrays( gl.TRIANGLES, 0, 9 );
	//gl.drawArrays( gl.TRIANGLE_FANS, 3, 6 );
}
function render2() {
	gl2.clear(gl2.COLOR_BUFFER_BIT);
	gl2.drawArrays(gl2.TRIANGLE_FAN, 0, 4);
	//gl.drawArrays( gl.TRIANGLES, 0, 9 );
	//gl.drawArrays( gl.TRIANGLE_FANS, 3, 6 );
}