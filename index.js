import { vertexShaderSource, fragmentShaderSource } from './js/shaders.js';
import { getCanvas, getRenderingContext, createShader, createProgram, createVertexBuffer, bindAttributeToVertexBuffer } from './js/utils.js';

const CANVASID = 'myCanvas',
      positions = [ -0.5, -0.5, 1.0, 0.0, 0.0,
                    0.5, -0.5,  0.0, 1.0, 0.0,
                    0, 0.3,     0.0, 0.0, 1.0,
                  ],
      vertexCount = positions.length,
      vertexSize = 5;

let canvas = getCanvas(CANVASID);

let gl = getRenderingContext(canvas);

// Clear the canvas (background color)
gl.clearColor(1, 1, 1, 1);
gl.clear(gl.COLOR_BUFFER_BIT);

let vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
let fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

let program = createProgram(gl, vertexShader, fragmentShader);


let positionBuffer = createVertexBuffer(gl,positions);

let positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
let colorAttributeLocation = gl.getAttribLocation(program, 'vertex_color');

bindAttributeToVertexBuffer(gl, positionAttributeLocation, 2, positionBuffer, vertexSize, 0);
bindAttributeToVertexBuffer(gl, colorAttributeLocation, 3, positionBuffer, vertexSize, 2);

gl.enableVertexAttribArray(positionAttributeLocation);
gl.enableVertexAttribArray(colorAttributeLocation);

// Tell it to use our program (pair of shaders)
gl.useProgram(program);

// NOTE: los uniform se setean luego del useProgram
// Uniform para el color en fragment shader
/*let colorUniformLocation = gl.getUniformLocation(program, 'u_color');

gl.uniform4f(colorUniformLocation, 0.0, 1.0, 0.0, 1.0);*/

gl.drawArrays(gl.TRIANGLES, 0, vertexCount);

