import { vertexShaderSource, fragmentShaderSource } from './js/shaders.js';
import { getCanvas, getRenderingContext, createShader, createProgram, createVertexBuffer, bindAttributeToVertexBuffer } from './js/utils.js';

const CANVASID = 'myCanvas';

let canvas = getCanvas(CANVASID);

let gl = getRenderingContext(canvas);

let vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
let fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

let program = createProgram(gl, vertexShader, fragmentShader);

let positionAttributeLocation = gl.getAttribLocation(program, 'a_position');

let colorUniformLocation = gl.getUniformLocation(program, 'u_color');

const positions = [ -0.5, -0.5,
                    0.5, -0.5,
                    0, 0.3,
                    -0.5, 0.5,
                    0, 0.3,
                    0.5, 0.5,
                  ],
       vertexCount = positions.length;


let positionBuffer = createVertexBuffer(gl,positions);


let vao = gl.createVertexArray();

gl.bindVertexArray(vao);

gl.enableVertexAttribArray(positionAttributeLocation);


bindAttributeToVertexBuffer(gl, positionAttributeLocation, 2, positionBuffer);

gl.bindVertexArray(null);

// Tell it to use our program (pair of shaders)
gl.useProgram(program);


// NOTE: los uniform se setean luego del useProgram
// Uniform para el color en fragment shader
gl.uniform4f(colorUniformLocation, 0.0, 1.0, 0.0, 1.0);

// Bind the attribute/buffer set we want
gl.bindVertexArray(vao);

// Clear the canvas
gl.clearColor(1, 1, 1, 1);
gl.clear(gl.COLOR_BUFFER_BIT);

gl.drawArrays(gl.TRIANGLES, 0, vertexCount);

