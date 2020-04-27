import { vertexShaderSource, fragmentShaderSource } from './js/shaders.js';
import { getCanvas, getRenderingContext, createShader, createProgram, createVertexBuffer, bindAttributeToVertexBuffer, createIndexBuffer } from './js/utils.js';
import { mat4, glMatrix } from './js/gl-matrix/index.js'

const CANVASID = 'myCanvas';

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
gl.enable(gl.DEPTH_TEST);
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

const vertexPositions = [
  -1, 1, 1,   
  1, 1, 1,    
  1, 1, -1,   
  -1, 1, -1,  
  -1, -1, 1,  
  1, -1, 1,   
  1, -1, -1,  
  -1, -1, -1  
]

const vertexColors = [
  1, 0, 1,    
  1, 1, 1,    
  0, 1, 1,    
  0, 0, 1,    
  1, 0, 0,    
  1, 1, 0,    
  0, 1, 0,    
  0, 0, 0     
]

const indices = [
  // cara de arriba
  0, 1, 3,
  3, 1, 2,
  // abajo
  7, 5, 4,
  5, 7, 6,
  // izquierda
  3, 4, 0,
  3, 7, 4,
  // derecha
  5, 2, 1,
  5, 6, 2,
  // adelante
  4, 1, 0,
  4, 5, 1,
  // atrás
  6, 3, 2,
  6, 7, 3,
]

let positionBuffer = createVertexBuffer(gl, vertexPositions);
let colorBuffer = createVertexBuffer(gl, vertexColors);
let indexBuffer = createIndexBuffer(gl, indices)

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
bindAttributeToVertexBuffer(gl, positionAttributeLocation, 3, positionBuffer);
gl.enableVertexAttribArray(colorAttributeLocation);
bindAttributeToVertexBuffer(gl, colorAttributeLocation, 3, colorBuffer);

gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

gl.bindVertexArray(null);


/**
 * PASO 9 - Le decimos a WebGL que use el program creado con nuestros shaders
 * Bindeo el VAO.
 * Aplico el color seteato con clearColor
 */

gl.useProgram(program);

gl.bindVertexArray(vao);

/**
 * CAMERA SETUP
 */
const viewMatrixLocation = gl.getUniformLocation(program, "viewMatrix")
const projectionMatrixLocation = gl.getUniformLocation(program, "projectionMatrix")

const viewMatrix = mat4.create()
const projectionMatrix = mat4.create()

const eye = [2, 2, 9]
const center = [0, 0, 0]
const up = [0, 1, 0]
mat4.lookAt(viewMatrix, eye, center, up)

const fov = glMatrix.toRadian(45)
const aspect = canvas.width / canvas.height
const near = 0.1
const far = 10
mat4.perspective(projectionMatrix, fov, aspect, near, far)

gl.uniformMatrix4fv(viewMatrixLocation, false, viewMatrix)
gl.uniformMatrix4fv(projectionMatrixLocation, false, projectionMatrix)

/**
 * END CAMERA SETUP
 */

gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

// NOTE: los uniform se setean luego del useProgram
// Uniform para el color en fragment shader

/**
 * PASO 10 - Dibujo
 */

gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
