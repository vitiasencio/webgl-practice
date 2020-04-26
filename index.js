import { vertexShaderSource, fragmentShaderSource } from './js/shaders.js';
import { getCanvas, getRenderingContext, createShader, createProgram, createVertexBuffer, createIndexBuffer, bindAttributeToVertexBuffer } from './js/utils.js';

const CANVASID = 'myCanvas';

const vertexSize = 2;


/**
 * PASO 1 - Obtengo el canvas del HTML
 */

let canvas = getCanvas(CANVASID);

/**
 * PASO 2 - Inicializo y obtengo el contexto de dibujo sobre el canvas
 */

let gl = getRenderingContext(canvas);

/**
 * Seteo el color para limpiar el color del canvas (background color)
 */

gl.clearColor(1, 1, 1, 1);

/**
 * PASO 3 - Creo y compilo los shaders
 */

let vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
let fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

/**
 * PASO 4 - Creo un programa utilizando los shaders creados en el PASO 3
 */

let program = createProgram(gl, vertexShader, fragmentShader);

/**
 * PASO 5 - Creo un buffer para las posiciones de los vertices.
 */

const positions = [ 
    0.0, 0.0,
    1.0, 0.0,
    0.0, 0.5,
];

const colors = [
    1.0, 0.0, 0.0,
    1.0, 0.0, 0.0,
    1.0, 0.0, 0.0,
]

const positions2 = [ 
    0.0, 0.0,
    0.0, 0.5,
    -1.0, 0.0,
];

const colors2 = [
    0.0, 1.0, 0.0,
    0.0, 1.0, 0.0,
    0.0, 1.0, 0.0,
]

const indices = [
    0, 1, 2,
]

let positionBuffer = createVertexBuffer(gl, positions);
let position2Buffer = createVertexBuffer(gl, positions2);
let colorBuffer = createVertexBuffer(gl, colors)
let color2Buffer = createVertexBuffer(gl, colors2)
let indexBuffer = createIndexBuffer(gl, indices);

/**
 * PASO 6 - Obtengo la posicion del atributo de entrada al vertex shader
 */

let positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
let colorAttributeLocation = gl.getAttribLocation(program, 'vertex_color');

/**
 * PASO 7 - Creo un VAO y lo bindeo
 */

const vao = gl.createVertexArray();
gl.bindVertexArray(vao);

/**
 * PASO 8 - Habilitamos cada atributo y lo linkeamos a su buffer
 * Dejamos de tomar nota del VAO
 */

gl.enableVertexAttribArray(positionAttributeLocation);
bindAttributeToVertexBuffer(gl, positionAttributeLocation, 2, positionBuffer);
gl.enableVertexAttribArray(colorAttributeLocation);
bindAttributeToVertexBuffer(gl, colorAttributeLocation, 3, colorBuffer);

gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

gl.bindVertexArray(null);

//////////////////////
const vao2 = gl.createVertexArray();
gl.bindVertexArray(vao2);

/**
 * PASO 8 - Habilitamos cada atributo y lo linkeamos a su buffer
 * Dejamos de tomar nota del VAO
 */

gl.enableVertexAttribArray(positionAttributeLocation);
bindAttributeToVertexBuffer(gl, positionAttributeLocation, 2, position2Buffer);
gl.enableVertexAttribArray(colorAttributeLocation);
bindAttributeToVertexBuffer(gl, colorAttributeLocation, 3, color2Buffer);

gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

gl.bindVertexArray(null);
//////////////////////
/**
 * PASO 9 - Le decimos a WebGL que use el program creado con nuestros shaders
 * Bindeo el VAO.
 * Aplico el color seteato con clearColor
 */

gl.useProgram(program);

gl.bindVertexArray(vao);

gl.clear(gl.COLOR_BUFFER_BIT);

// NOTE: los uniform se setean luego del useProgram
// Uniform para el color en fragment shader
/*let colorUniformLocation = gl.getUniformLocation(program, 'u_color');

gl.uniform4f(colorUniformLocation, 0.0, 1.0, 0.0, 1.0);*/

/**
 * PASO 10 - Dibujo
 */

gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);

gl.bindVertexArray(vao2);

gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
