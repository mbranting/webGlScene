// --------- GLOBAL VARIABLES ----------------------
var canvas;
var gl;
var axis = 0;
var index = 0
var xAxis = 0;
var yAxis =1;
var zAxis = 2;
var theta = [ 0.0, 0.0, 0.0 ];
var theta2 = [ 0.5, 1.0, -0.5 ];
var near = -10;
var far = 10;
var thetaLoc;
var program;
var iBuffer;
var cBuffer;
var vColor;
var vBuffer;
var vPosition;
var modelViewMatrix, projectionMatrix;
var modelViewMatrixLoc, projectionMatrixLoc;
var eye;
var at = vec3(-0.5, 0.0, 0.0);
var up = vec3(-0.5, 6.0, 0.5);
var lightPosition = vec4(1.0, 1.0, 1.0, 0.0 );
var lightAmbient = vec4(0.2, 0.2, 0.2, 1.0 );
var lightDiffuse = vec4( 1.0, 1.0, 1.0, 1.0 );
var lightSpecular = vec4( 1.0, 1.0, 1.0, 1.0 );

var materialAmbient = vec4( 1.0, 0.0, 1.0, 1.0 );
var materialDiffuse = vec4( 1.0, 0.8, 0.0, 1.0 );
var materialSpecular = vec4( 1.0, 0.8, 0.0, 1.0 );
var materialShininess = 100.0;
var ctm;
var ambientColor, diffuseColor, specularColor;

// --------------- CUBE VECTORS ---------------------
var numVerticesC  = 36;
var verticesC= [
    vec3( -0.5, -0.5,  0.5 ),
    vec3( -0.5,  0.5,  0.5 ),
    vec3(  0.5,  0.5,  0.5 ),
    vec3(  0.5, -0.5,  0.5 ),
    vec3( -0.5, -0.5, -0.5 ),
    vec3( -0.5,  0.5, -0.5 ),
    vec3(  0.5,  0.5, -0.5 ),
    vec3(  0.5, -0.5, -0.5 )
];

var vertexColorsC = [
    vec4( 0.2, 0.4, .9, 1.0 ),  // blue
    vec4( 0.2, 0.4, 0.9, 1.0 ),  // blue
    vec4( 0.2, 0.4, 0.9, 1.0 ),  // blue
    vec4( 0.2, 0.4, 0.9, 1.0 ),  // blue
    vec4( 0.2, 0.4, 0.9, 1.0 ),  // blue
    vec4( 0.2, 0.4, 0.9, 1.0 ),  // blue
    vec4( 0.2, 0.4, 0.9, 1.0 ),  // blue
    vec4( 0.2, 0.4, 0.9, 1.0 ),  // blue
]
var vertexColorsBlack = [
    vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
    vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
    vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
    vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
    vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
    vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
    vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
    vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
    vec4( 0.0, 0.0, 0.0, 1.0 )  // black
]
var vertexColorsRed = [
    vec4( .5, 0.0,0.0, 0.8 ),  // black
    vec4( 0.5, 0.0,0.0,0.8  ),  // black
    vec4( 0.5, 0.0,0.0, 0.8 ),  // black
    vec4( 0.5,0.0,0.0,0.8 ),  // black
    vec4( 0.5, 0.0,0.0,  0.8 ),  // black
    vec4( 0.5,0.0,0.0, 0.8),  // black
    vec4( 0.5, 0.0,0.0, 0.8  ),  // black
    vec4( 0.5,0.0,0.0, 0.8 ),  // black
    vec4( 0.5, 0.0,0.0, 0.8 ),  // black
]
var vertexColorsBlue = [
    vec4( 0.0, 0.0, .6, 1.0 ),  // blue
    vec4(0.0, 0.0, .6, 1.0  ),  // blue
    vec4(0.0, 0.0, .6, 1.0 ),  // blue
    vec4(0.0, 0.0, .6, 1.0 ),  // blue
    vec4(0.0, 0.0, .6, 1.0 ),  // blue
    vec4(0.0, 0.0, .6, 1.0 ),  // blue
    vec4(0.0, 0.0, .6, 1.0 ),  // blue
    vec4(0.0, 0.0, .6, 1.0 ),  // blue
]
var indicesC = [
    1, 0, 3,
    3, 2, 1,
    2, 3, 7,
    7, 6, 2,
    3, 0, 4,
    4, 7, 3,
    6, 5, 1,
    1, 2, 6,
    4, 5, 6,
    6, 7, 4,
    5, 4, 0,
    0, 1, 5
];

// --------------- TRAP VECTORS ---------------------

var numVerticesT  = 36;
var verticesT = [
    vec3( -0.5, -0.5,  0.5 ),
    vec3( -0.5,  0.5,  0.5 ),
    vec3(  0.5,  0.5,  0.5 ),
    vec3(  0.5, -0.5,  0.5 ),
    vec3( -0.5, -0.5, -0.5 ),
    vec3( -0.6,  0.5, -0.5 ),
    vec3(  0.6,  0.5, -0.5 ),
    vec3(  0.5, -0.5, -0.5 )
];
var vertexColorsT = [
    vec4([0.8, 0.8, 0.8, 1.0]), // grey
    vec4([0.8, 0.8, 0.8, 1.0]), // grey
    vec4([0.8, 0.8, 0.8, 1.0]), // grey
    vec4([0.8, 0.8, 0.8, 1.0]), // grey
    vec4([0.8, 0.8, 0.8, 1.0]), // grey
    vec4([0.8, 0.8, 0.8, 1.0]), // grey
    vec4([0.8, 0.8, 0.8, 1.0]), // grey
    vec4([0.8, 0.8, 0.8, 1.0]) // grey
]
var vertexColorsTIn = [
    vec4([0.6, 0.6, 0.6, 1.0]), // grey
    vec4([0.6, 0.6, 0.6, 1.0]), // grey
    vec4([0.6, 0.6, 0.6, 1.0]), // grey
    vec4([0.6, 0.6, 0.6, 1.0]), // grey
    vec4([0.6, 0.6, 0.6, 1.0]), // grey
    vec4([0.6, 0.6, 0.6, 1.0]), // grey
    vec4([0.6, 0.6, 0.6, 1.0]), // grey
    vec4([0.6, 0.6, 0.6, 1.0]) // grey
]
var indicesT = [
    1, 0, 3,
    3, 2, 1,
    2, 3, 7,
    7, 6, 2,
    3, 0, 4,
    4, 7, 3,
    6, 5, 1,
    1, 2, 6,
    4, 5, 6,
    6, 7, 4,
    5, 4, 0,
    0, 1, 5
];

// -------------- PLANE VECTORS ----------------

var numVerticesP  = 6;
var verticesP = [
    vec3( -0.5, 0.5,  -.3),
    vec3(  0.5, 0.5,  -.3),
    vec3(  0.5, -0.5, -.3),
    vec3( -0.5, -0.5, -.3),
    vec3( -0.5, -0.5, .3),

];
var vertexColorsP = [
    vec4( 1.0, 1.0, 1.0, 1.0 ),  // white
    vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
    vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
    vec4( 1.0, 1.0, 1.0, 1.0 ),  // white
];
var vertexColorsP2 = [
    vec4( 1.0, 1.0, 1.0, 1.0 ),  // white
    vec4( 0.0, 0.0, 0.0, 1.0 ),  // black

    vec4( 0.0, 0.0, 0.0, 1.0 ),  // black

    vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
];
var indicesP = [
    1, 0, 2,
    0, 2, 3,
];

// -------------- LINE VECTORS HORIZONTAL ----------------

var numVerticesL  = 2;
var verticesL = [
    vec3( -0.5, 0.5,  -.3),
    vec3(  0.5, 0.5,  -.3),

];
var vertexColorsL = [
    vec4( 0.2, 0.4, .6, 1.0 ),  // blue
    vec4( 0.2, 0.4, 0.6, 1.0 ),  // blue
];
var indicesL = [
    1, 0, 2,
    0, 2, 3,
];

// -------------- LINE VECTORS VERTICAL  ----------------

var numVerticesV  = 2;
var verticesV = [
    vec3( 0.5, -0.5,  -.3),
    vec3(  0.5, 0.5,  -.3),
];
var indicesV = [
    1, 0, 2,
    0, 2, 3,
];

// -------------- PYRAMID VECTORS ----------------

var numVertices  = 4;
var vertices = [
    vec3( -0.5, -0.5,  0.5 ),
    vec3(  0.5, -0.5,  0.5 ),
    vec3(  0.5, -0.5, -0.5 ),
    vec3( -0.5, -0.5, -0.5 ),
    vec3(  0.0,  0.1,  0.0 )
];
var vertexColors = [
    vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
    vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
    vec4( 1.0, 1.0, 0.0, 1.0 ),  // yellow
    vec4( 0.0, 1.0, 0.0, 1.0 ),  // green
    vec4( 0.0, 0.0, 1.0, 1.0 )   // blue
];
var vertexColors2 = [
    vec4( 0.4, 1.0, 0.0, 1.0 ),
    vec4( 1.0, 0.0, 0.5, 1.0 ),
    vec4( 1.0, 1.0, 0.0, 1.0 ),
    vec4( 0.2, 1.0, 0.0, 1.0 ),
    vec4( 0.0, 0.3, 1.0, 1.0 )
];
var indices = [
    1, 0, 2,
    0, 2, 3,
    0, 4, 1,
    4, 1, 2,
    4, 2, 3,
    4, 3, 0
];

// --------------------------------------------------------

function setCanvas(){
    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    gl.enable(gl.DEPTH_TEST);
}
function setUpShaders(theShader){
    //
    //  Load shaders and initialize attribute buffers
    //
    program = initShaders( gl, theShader, "fragment-shader" );
    gl.useProgram( program );

    // let ambientProduct = mult(lightAmbient, materialAmbient);
    // let diffuseProduct = mult(lightDiffuse, materialDiffuse);
    // let specularProduct = mult(lightSpecular, materialSpecular);

}
function setArrayBuffer(indexArray){
    // array element buffer

    // method of the WebGL API - creates and initializes a WebGLBuffer
    // for storing data such as vertices or colors.
    // Notice the sequence: create --> bind --> buffer populate

    iBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(indexArray), gl.STATIC_DRAW);
}
function colorArrayAttributesBuffer(colorsArray){
    // color array attribute buffer
    // Notice the sequence: create --> bind --> buffer populate

    cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colorsArray), gl.STATIC_DRAW );

    // method of the WebGL API - returns the location of an
    // attribute variable in a given WebGLProgram
    // needed to match each attribute with the right color

    vColor = gl.getAttribLocation( program, "vColor" );

    // method of the WebGL API specifies the data formats and
    // locations of vertex attributes
    // in a vertex attributes array
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );
}
function  vertexArrayAttributeBuffer(vertexArray, thePosition, positionLocation){
    // vertex array attribute buffer
    // Notice the sequence: create --> bind --> buffer populate
    vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertexArray), gl.STATIC_DRAW );

    //
    vPosition = gl.getAttribLocation( program, positionLocation );

    // method of the WebGL API specifies the data formats and locations of
    // vertex attributes in a vertex attributes array.
    gl.vertexAttribPointer( thePosition, 3, gl.FLOAT, false, 0, 0 );

    // method of the WebGL API turns the generic vertex attribute array
    // on at a given index position
    gl.enableVertexAttribArray( thePosition );
}
function setAngleBasedLocation(){
    // get the integer that represents the location of a specific
    // uniform variable within a program object
    thetaLoc = gl.getUniformLocation(program, "theta");
}
let z = 0, x = 0, y= 0;
function configureTheta() {
    theta[0] = z
    theta[1] = x
    theta[2] = y
}
function listenToWebPageEvents() {
// buttons for camera movement
    document.getElementById("Button1").onclick = function () {
        z += 10
    };
    document.getElementById("Button2").onclick = function () {
        z -= 10
    };
    document.getElementById("Button3").onclick = function () {
        x += 10
    };
    document.getElementById("Button4").onclick = function () {
        x -= 10
    };
    document.getElementById("Button5").onclick = function () {
        y += 10
    };
    document.getElementById("Button6").onclick = function () {
        y -= 10
    };
}
function pyramid1(){
    setUpShaders("vertex-shader");
    setArrayBuffer(indices);
    colorArrayAttributesBuffer(vertexColors);
    vertexArrayAttributeBuffer(vertices, vPosition, "vPosition");
    setAngleBasedLocation();
    listenToWebPageEvents();
}
function cube(s, c){
    setUpShaders(s);
    setArrayBuffer(indicesC);
    colorArrayAttributesBuffer(c);
    vertexArrayAttributeBuffer(verticesC, vPosition, "vPosition");
    setAngleBasedLocation();
    listenToWebPageEvents();
}
function plane(s, c){
    setUpShaders(s);
    setArrayBuffer(indicesP);
    colorArrayAttributesBuffer(c);
    vertexArrayAttributeBuffer(verticesP, vPosition, "vPosition");
    setAngleBasedLocation();
    listenToWebPageEvents();
}
function line(s, c){
    setUpShaders(s);
    setArrayBuffer(indicesL);
    colorArrayAttributesBuffer(c);
    vertexArrayAttributeBuffer(verticesL, vPosition, "vPosition");
    setAngleBasedLocation();
    listenToWebPageEvents();
}
function lineV(s, c){
    setUpShaders(s);
    setArrayBuffer(indicesV);
    colorArrayAttributesBuffer(c);
    vertexArrayAttributeBuffer(verticesV, vPosition, "vPosition");
    setAngleBasedLocation();
    listenToWebPageEvents();
}
function trap(s, c){
    setUpShaders(s);
    setArrayBuffer(indicesT);
    colorArrayAttributesBuffer(c);
    vertexArrayAttributeBuffer(verticesT, vPosition, "vPosition");
    setAngleBasedLocation();
    listenToWebPageEvents();
}
// var nBuffer = gl.createBuffer();
// gl.bindBuffer( gl.ARRAY_BUFFER, nBuffer);
// gl.bufferData( gl.ARRAY_BUFFER, flatten(normalsArray), gl.STATIC_DRAW );
//
// var vNormal = gl.getAttribLocation( program, "vNormal" );
// gl.vertexAttribPointer( vNormal, 4, gl.FLOAT, false, 0, 0 );
// gl.enableVertexAttribArray( vNormal);
//
//
// var vBuffer = gl.createBuffer();
// gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
// gl.bufferData(gl.ARRAY_BUFFER, flatten(pointsArray), gl.STATIC_DRAW);
//
// var vPosition = gl.getAttribLocation( program, "vPosition");
// gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);
// gl.enableVertexAttribArray(vPosition);
//
// modelViewMatrixLoc = gl.getUniformLocation( program, "modelViewMatrix" );
// projectionMatrixLoc = gl.getUniformLocation( program, "projectionMatrix" );
//

window.onload = function init()
{
    setCanvas();

    // gl.uniform4fv( gl.getUniformLocation(program,
    //     "ambientProduct"),flatten(ambientProduct) );
    // gl.uniform4fv( gl.getUniformLocation(program,
    //     "diffuseProduct"),flatten(diffuseProduct) );
    // gl.uniform4fv( gl.getUniformLocation(program,
    //     "specularProduct"),flatten(specularProduct) );
    // gl.uniform4fv( gl.getUniformLocation(program,
    //     "lightPosition"),flatten(lightPosition) );
    // gl.uniform1f( gl.getUniformLocation(program,
    //     "shininess"),materialShininess );

    render();
}

function render() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    configureTheta()
    gl.uniform3fv(thetaLoc, theta);

    // eye = vec3(radius*Math.sin(theta)*Math.cos(phi),
    //     radius*Math.sin(theta)*Math.sin(phi), radius*Math.cos(theta));
    //
    // modelViewMatrix = lookAt(eye, at , up);
    // projectionMatrix = ortho(left, right, bottom, ytop, near, far);
    //
    // gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix) );
    // gl.uniformMatrix4fv(projectionMatrixLoc, false, flatten(projectionMatrix) );



    // -------------- LIGHT and MATERIAL EFFECTS ------------------------------

    /*
        Look at the shadedSphere2 example and adapt the light and material effects
     */
    // -------------------------------------------------------------------------


    theta[axis] += 1.0;


    plane("vertex-shader", vertexColorsP);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.TRIANGLES, numVerticesP, gl.UNSIGNED_BYTE, 0 ); // Notice the use of gl.LINES

    plane("vertex-shader2", vertexColorsP);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.TRIANGLES, numVerticesP, gl.UNSIGNED_BYTE, 0 ); // Notice the use of gl.LINES

    plane("vertex-shader3", vertexColorsP2);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.TRIANGLES, numVerticesP, gl.UNSIGNED_BYTE, 0 ); // Notice the use of gl.LINES

    plane("vertex-shaderA", vertexColorsP);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.TRIANGLES, numVerticesP, gl.UNSIGNED_BYTE, 0 ); // Notice the use of gl.LINES

    plane("vertex-shaderB", vertexColorsP2);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.TRIANGLES, numVerticesP, gl.UNSIGNED_BYTE, 0 ); // Notice the use of gl.LINES

    plane("vertex-shaderC", vertexColorsP2);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.TRIANGLES, numVerticesP, gl.UNSIGNED_BYTE, 0 ); // Notice the use of gl.LINES

    // Main locker block
    cube("vertex-shader4", vertexColorsC);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.TRIANGLES, numVerticesC, gl.UNSIGNED_BYTE, 0 );


    // Locker doors
    cube("vertex-shader5", vertexColorsBlue);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements(gl.LINES, numVerticesC, gl.UNSIGNED_BYTE, 0);

    cube("vertex-shader6", vertexColorsBlue);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements(gl.LINES, numVerticesC, gl.UNSIGNED_BYTE, 0);

    cube("vertex-shader7", vertexColorsBlue);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements(gl.LINES, numVerticesC, gl.UNSIGNED_BYTE, 0);

    cube("vertex-shader8", vertexColorsBlue);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements(gl.LINES, numVerticesC, gl.UNSIGNED_BYTE, 0);

    cube("vertex-shader9", vertexColorsBlue);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements(gl.LINES, numVerticesC, gl.UNSIGNED_BYTE, 0);

    cube("vertex-shader10", vertexColorsBlue);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements(gl.LINES, numVerticesC, gl.UNSIGNED_BYTE, 0);


    // lines locker 1
    line("vertex-shader11", vertexColorsL);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.LINES, numVerticesL, gl.UNSIGNED_BYTE, 0 ); // Notice the use of gl.LINES

    line("vertex-shader12", vertexColorsL);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.LINES, numVerticesL, gl.UNSIGNED_BYTE, 0 ); // Notice the use of gl.LINES

    line("vertex-shader13", vertexColorsL);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.LINES, numVerticesL, gl.UNSIGNED_BYTE, 0 ); // Notice the use of gl.LINES

    line("vertex-shader14", vertexColorsL);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.LINES, numVerticesL, gl.UNSIGNED_BYTE, 0 ); // Notice the use of gl.LINES

    line("vertex-shader15", vertexColorsL);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.LINES, numVerticesL, gl.UNSIGNED_BYTE, 0 ); // Notice the use of gl.LINES

    line("vertex-shader16", vertexColorsL);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.LINES, numVerticesL, gl.UNSIGNED_BYTE, 0 ); // Notice the use of gl.LINES

    line("vertex-shader17", vertexColorsL);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.LINES, numVerticesL, gl.UNSIGNED_BYTE, 0 ); // Notice the use of gl.LINES

    line("vertex-shader18", vertexColorsL);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.LINES, numVerticesL, gl.UNSIGNED_BYTE, 0 ); // Notice the use of gl.LINES

    line("vertex-shader19", vertexColorsL);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.LINES, numVerticesL, gl.UNSIGNED_BYTE, 0 ); // Notice the use of gl.LINES

    line("vertex-shader20", vertexColorsL);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.LINES, numVerticesL, gl.UNSIGNED_BYTE, 0 ); // Notice the use of gl.LINES

    line("vertex-shader21", vertexColorsL);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.LINES, numVerticesL, gl.UNSIGNED_BYTE, 0 ); // Notice the use of gl.LINES

    line("vertex-shader22", vertexColorsL);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.LINES, numVerticesL, gl.UNSIGNED_BYTE, 0 ); // Notice the use of gl.LINES


    // lines locker 2
    line("vertex-shader23", vertexColorsL);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.LINES, numVerticesL, gl.UNSIGNED_BYTE, 0 ); // Notice the use of gl.LINES

    line("vertex-shader24", vertexColorsL);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.LINES, numVerticesL, gl.UNSIGNED_BYTE, 0 ); // Notice the use of gl.LINES

    //UNITY
    line("vertex-shader25", vertexColorsL);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.LINES, numVerticesL, gl.UNSIGNED_BYTE, 0 ); // Notice the use of gl.LINES

    line("vertex-shader26", vertexColorsL);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.LINES, numVerticesL, gl.UNSIGNED_BYTE, 0 ); // Notice the use of gl.LINES

    line("vertex-shader27", vertexColorsL);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.LINES, numVerticesL, gl.UNSIGNED_BYTE, 0 ); // Notice the use of gl.LINES

    line("vertex-shader28", vertexColorsL);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.LINES, numVerticesL, gl.UNSIGNED_BYTE, 0 ); // Notice the use of gl.LINES

    line("vertex-shader29", vertexColorsL);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.LINES, numVerticesL, gl.UNSIGNED_BYTE, 0 ); // Notice the use of gl.LINES

    line("vertex-shader30", vertexColorsL);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.LINES, numVerticesL, gl.UNSIGNED_BYTE, 0 ); // Notice the use of gl.LINES

    line("vertex-shader31", vertexColorsL);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.LINES, numVerticesL, gl.UNSIGNED_BYTE, 0 ); // Notice the use of gl.LINES

    line("vertex-shader32", vertexColorsL);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.LINES, numVerticesL, gl.UNSIGNED_BYTE, 0 ); // Notice the use of gl.LINES

    line("vertex-shader33", vertexColorsL);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.LINES, numVerticesL, gl.UNSIGNED_BYTE, 0 ); // Notice the use of gl.LINES

    line("vertex-shader34", vertexColorsL);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.LINES, numVerticesL, gl.UNSIGNED_BYTE, 0 ); // Notice the use of gl.LINES

    // Lines Locker 3
    line("vertex-shader35", vertexColorsL);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.LINES, numVerticesL, gl.UNSIGNED_BYTE, 0 ); // Notice the use of gl.LINES
    line("vertex-shader36", vertexColorsL);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.LINES, numVerticesL, gl.UNSIGNED_BYTE, 0 ); // Notice the use of gl.LINES
    line("vertex-shader37", vertexColorsL);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.LINES, numVerticesL, gl.UNSIGNED_BYTE, 0 ); // Notice the use of gl.LINES
    line("vertex-shader38", vertexColorsL);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.LINES, numVerticesL, gl.UNSIGNED_BYTE, 0 ); // Notice the use of gl.LINES
    line("vertex-shader39", vertexColorsL);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.LINES, numVerticesL, gl.UNSIGNED_BYTE, 0 ); // Notice the use of gl.LINES
    line("vertex-shader40", vertexColorsL);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.LINES, numVerticesL, gl.UNSIGNED_BYTE, 0 ); // Notice the use of gl.LINES
    line("vertex-shader41", vertexColorsL);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.LINES, numVerticesL, gl.UNSIGNED_BYTE, 0 ); // Notice the use of gl.LINES
    line("vertex-shader42", vertexColorsL);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.LINES, numVerticesL, gl.UNSIGNED_BYTE, 0 ); // Notice the use of gl.LINES
    line("vertex-shader43", vertexColorsL);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.LINES, numVerticesL, gl.UNSIGNED_BYTE, 0 ); // Notice the use of gl.LINES
    line("vertex-shader44", vertexColorsL);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.LINES, numVerticesL, gl.UNSIGNED_BYTE, 0 ); // Notice the use of gl.LINES
    line("vertex-shader45", vertexColorsL);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.LINES, numVerticesL, gl.UNSIGNED_BYTE, 0 ); // Notice the use of gl.LINES
    line("vertex-shader46", vertexColorsL);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.LINES, numVerticesL, gl.UNSIGNED_BYTE, 0 ); // Notice the use of gl.LINES


    // Lines Locker 4
    line("vertex-shader47", vertexColorsL);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.LINES, numVerticesL, gl.UNSIGNED_BYTE, 0 ); // Notice the use of gl.LINES
    line("vertex-shader48", vertexColorsL);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.LINES, numVerticesL, gl.UNSIGNED_BYTE, 0 ); // Notice the use of gl.LINES
    line("vertex-shader49", vertexColorsL);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.LINES, numVerticesL, gl.UNSIGNED_BYTE, 0 ); // Notice the use of gl.LINES
    line("vertex-shader50", vertexColorsL);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.LINES, numVerticesL, gl.UNSIGNED_BYTE, 0 ); // Notice the use of gl.LINES
    line("vertex-shader51", vertexColorsL);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.LINES, numVerticesL, gl.UNSIGNED_BYTE, 0 ); // Notice the use of gl.LINES
    line("vertex-shader52", vertexColorsL);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.LINES, numVerticesL, gl.UNSIGNED_BYTE, 0 ); // Notice the use of gl.LINES
    line("vertex-shader53", vertexColorsL);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.LINES, numVerticesL, gl.UNSIGNED_BYTE, 0 ); // Notice the use of gl.LINES
    line("vertex-shader54", vertexColorsL);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.LINES, numVerticesL, gl.UNSIGNED_BYTE, 0 ); // Notice the use of gl.LINES
    line("vertex-shader55", vertexColorsL);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.LINES, numVerticesL, gl.UNSIGNED_BYTE, 0 ); // Notice the use of gl.LINES
    line("vertex-shader56", vertexColorsL);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.LINES, numVerticesL, gl.UNSIGNED_BYTE, 0 ); // Notice the use of gl.LINES
    line("vertex-shader57", vertexColorsL);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.LINES, numVerticesL, gl.UNSIGNED_BYTE, 0 ); // Notice the use of gl.LINES
    line("vertex-shader58", vertexColorsL);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.LINES, numVerticesL, gl.UNSIGNED_BYTE, 0 ); // Notice the use of gl.LINES


    // Lines Locker 5
    line("vertex-shader59", vertexColorsL);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.LINES, numVerticesL, gl.UNSIGNED_BYTE, 0 ); // Notice the use of gl.LINES
    line("vertex-shader60", vertexColorsL);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.LINES, numVerticesL, gl.UNSIGNED_BYTE, 0 ); // Notice the use of gl.LINES
    line("vertex-shader61", vertexColorsL);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.LINES, numVerticesL, gl.UNSIGNED_BYTE, 0 ); // Notice the use of gl.LINES
    line("vertex-shader62", vertexColorsL);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.LINES, numVerticesL, gl.UNSIGNED_BYTE, 0 ); // Notice the use of gl.LINES
    line("vertex-shader63", vertexColorsL);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.LINES, numVerticesL, gl.UNSIGNED_BYTE, 0 ); // Notice the use of gl.LINES
    line("vertex-shader64", vertexColorsL);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.LINES, numVerticesL, gl.UNSIGNED_BYTE, 0 ); // Notice the use of gl.LINES
    line("vertex-shader65", vertexColorsL);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.LINES, numVerticesL, gl.UNSIGNED_BYTE, 0 ); // Notice the use of gl.LINES
    line("vertex-shader66", vertexColorsL);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.LINES, numVerticesL, gl.UNSIGNED_BYTE, 0 ); // Notice the use of gl.LINES
    line("vertex-shader67", vertexColorsL);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.LINES, numVerticesL, gl.UNSIGNED_BYTE, 0 ); // Notice the use of gl.LINES
    line("vertex-shader68", vertexColorsL);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.LINES, numVerticesL, gl.UNSIGNED_BYTE, 0 ); // Notice the use of gl.LINES
    line("vertex-shader69", vertexColorsL);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.LINES, numVerticesL, gl.UNSIGNED_BYTE, 0 ); // Notice the use of gl.LINES
    line("vertex-shader70", vertexColorsL);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.LINES, numVerticesL, gl.UNSIGNED_BYTE, 0 ); // Notice the use of gl.LINES


    // Lines Locker 5
    line("vertex-shader71", vertexColorsL);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.LINES, numVerticesL, gl.UNSIGNED_BYTE, 0 ); // Notice the use of gl.LINES
    line("vertex-shader72", vertexColorsL);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.LINES, numVerticesL, gl.UNSIGNED_BYTE, 0 ); // Notice the use of gl.LINES
    line("vertex-shader73", vertexColorsL);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.LINES, numVerticesL, gl.UNSIGNED_BYTE, 0 ); // Notice the use of gl.LINES
    line("vertex-shader74", vertexColorsL);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.LINES, numVerticesL, gl.UNSIGNED_BYTE, 0 ); // Notice the use of gl.LINES
    line("vertex-shader75", vertexColorsL);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.LINES, numVerticesL, gl.UNSIGNED_BYTE, 0 ); // Notice the use of gl.LINES
    line("vertex-shader76", vertexColorsL);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.LINES, numVerticesL, gl.UNSIGNED_BYTE, 0 ); // Notice the use of gl.LINES
    line("vertex-shader77", vertexColorsL);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.LINES, numVerticesL, gl.UNSIGNED_BYTE, 0 ); // Notice the use of gl.LINES
    line("vertex-shader78", vertexColorsL);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.LINES, numVerticesL, gl.UNSIGNED_BYTE, 0 ); // Notice the use of gl.LINES
    line("vertex-shader79", vertexColorsL);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.LINES, numVerticesL, gl.UNSIGNED_BYTE, 0 ); // Notice the use of gl.LINES
    line("vertex-shader80", vertexColorsL);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.LINES, numVerticesL, gl.UNSIGNED_BYTE, 0 ); // Notice the use of gl.LINES
    line("vertex-shader81", vertexColorsL);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.LINES, numVerticesL, gl.UNSIGNED_BYTE, 0 ); // Notice the use of gl.LINES
    line("vertex-shader82", vertexColorsL);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.LINES, numVerticesL, gl.UNSIGNED_BYTE, 0 ); // Notice the use of gl.LINES

    // Locks
    trap("vertex-shader83", vertexColorsT);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.TRIANGLES, numVerticesT, gl.UNSIGNED_BYTE, 0 );
    trap("vertex-shader84", vertexColorsTIn);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.TRIANGLES, numVerticesT, gl.UNSIGNED_BYTE, 0 );

    trap("vertex-shader85", vertexColorsT);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.TRIANGLES, numVerticesT, gl.UNSIGNED_BYTE, 0 );
    trap("vertex-shader86", vertexColorsTIn);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.TRIANGLES, numVerticesT, gl.UNSIGNED_BYTE, 0 );

    trap("vertex-shader87", vertexColorsT);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.TRIANGLES, numVerticesT, gl.UNSIGNED_BYTE, 0 );
    trap("vertex-shader88", vertexColorsTIn);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.TRIANGLES, numVerticesT, gl.UNSIGNED_BYTE, 0 );

    trap("vertex-shader89", vertexColorsT);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.TRIANGLES, numVerticesT, gl.UNSIGNED_BYTE, 0 );
    trap("vertex-shader90", vertexColorsTIn);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.TRIANGLES, numVerticesT, gl.UNSIGNED_BYTE, 0 );

    trap("vertex-shader91", vertexColorsT);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.TRIANGLES, numVerticesT, gl.UNSIGNED_BYTE, 0 );
    trap("vertex-shader92", vertexColorsTIn);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.TRIANGLES, numVerticesT, gl.UNSIGNED_BYTE, 0 );

    trap("vertex-shader93", vertexColorsT);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.TRIANGLES, numVerticesT, gl.UNSIGNED_BYTE, 0 );
    trap("vertex-shader94", vertexColorsTIn);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.TRIANGLES, numVerticesT, gl.UNSIGNED_BYTE, 0 );


    cube("vertex-shader95", vertexColorsBlack);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.TRIANGLES, numVerticesC, gl.UNSIGNED_BYTE, 0 );

    cube("vertex-shader96", vertexColorsBlack);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.TRIANGLES, numVerticesC, gl.UNSIGNED_BYTE, 0 );

    cube("vertex-shader97", vertexColorsBlack);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.TRIANGLES, numVerticesC, gl.UNSIGNED_BYTE, 0 );

    cube("vertex-shader98", vertexColorsBlack);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.TRIANGLES, numVerticesC, gl.UNSIGNED_BYTE, 0 );

    cube("vertex-shader99", vertexColorsBlack);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.TRIANGLES, numVerticesC, gl.UNSIGNED_BYTE, 0 );

    cube("vertex-shader100", vertexColorsBlack);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.TRIANGLES, numVerticesC, gl.UNSIGNED_BYTE, 0 );


    // Brick Wall
    cube("vertex-shader4A", vertexColorsRed);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.TRIANGLES, numVerticesC, gl.UNSIGNED_BYTE, 0 );

    // Brick lines
    line("vertex-shader101", vertexColorsT);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.LINES, numVerticesL, gl.UNSIGNED_BYTE, 0 ); // Notice the use of gl.LINES

    line("vertex-shader102", vertexColorsT);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.LINES, numVerticesL, gl.UNSIGNED_BYTE, 0 ); // Notice the use of gl.LINES

    line("vertex-shader103", vertexColorsT);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.LINES, numVerticesL, gl.UNSIGNED_BYTE, 0 ); // Notice the use of gl.LINES

    line("vertex-shader104", vertexColorsT);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.LINES, numVerticesL, gl.UNSIGNED_BYTE, 0 ); // Notice the use of gl.LINES

    line("vertex-shader105", vertexColorsT);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.LINES, numVerticesL, gl.UNSIGNED_BYTE, 0 ); // Notice the use of gl.LINES

    line("vertex-shader106", vertexColorsT);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.LINES, numVerticesL, gl.UNSIGNED_BYTE, 0 ); // Notice the use of gl.LINES

    line("vertex-shader107", vertexColorsT);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.LINES, numVerticesL, gl.UNSIGNED_BYTE, 0 ); // Notice the use of gl.LINES

    line("vertex-shader108", vertexColorsT);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.LINES, numVerticesL, gl.UNSIGNED_BYTE, 0 ); // Notice the use of gl.LINES

    line("vertex-shader109", vertexColorsT);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.LINES, numVerticesL, gl.UNSIGNED_BYTE, 0 ); // Notice the use of gl.LINES


    lineV("vertex-shader110", vertexColorsT);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.LINES, numVerticesL, gl.UNSIGNED_BYTE, 0 ); // Notice the use of gl.LINES

    lineV("vertex-shader111", vertexColorsT);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.LINES, numVerticesL, gl.UNSIGNED_BYTE, 0 ); // Notice the use of gl.LINES

    lineV("vertex-shader112", vertexColorsT);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.LINES, numVerticesL, gl.UNSIGNED_BYTE, 0 ); // Notice the use of gl.LINES

    lineV("vertex-shader113", vertexColorsT);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.LINES, numVerticesL, gl.UNSIGNED_BYTE, 0 ); // Notice the use of gl.LINES

    lineV("vertex-shader114", vertexColorsT);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.LINES, numVerticesL, gl.UNSIGNED_BYTE, 0 ); // Notice the use of gl.LINES

    lineV("vertex-shader115", vertexColorsT);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.LINES, numVerticesL, gl.UNSIGNED_BYTE, 0 ); // Notice the use of gl.LINES

    trap("vertex-shader116", vertexColorsT);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.TRIANGLES, numVerticesT, gl.UNSIGNED_BYTE, 0 ); // Notice the use of gl.LINES


    // recursively render the scene to affect movement
    requestAnimFrame( render);
}