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
 * PASO 5 - Creo un buffer para las posiciones de los vertices y otro para sus indices.
 */

const positions = [ 0.0, -0.1,    // Indice 0
                    0.0, 0.5,     // Indice 1
                    0.2, 0.1,     // Indice 2
                    0.6, 0.0,     // Indice 3
                    0.35, -0.25,  // Indice 4
                    0.45, -0.6,   // Indice 5
                    0.0, -0.45,   // Indice 6
                    -0.45, -0.6,  // Indice 7
                    -0.35, -0.25, // Indice 8
                    -0.6, 0.0,    // Indice 9
                    -0.2, 0.1,    // Indice 10
                  ],
      colors    = [ 22.0/256, 164.0/256, 228.0/256,
                    0.0, 251.0/256, 220.0/256,
                    0.0, 0.0, 1.0,
                    0.5, 0.0, 1.0,
                ];


const indexes = [ 0, 2, 1, // Triangulo 1
                  0, 3, 2, // Triangulo 2
                  0, 4, 3, // Triangulo 2
                  0, 5, 4, // Triangulo 2
                  0, 6, 5, // Triangulo 2
                  0, 7, 6, // Triangulo 2
                  0, 8, 7, // Triangulo 2
                  0, 9, 8, // Triangulo 2
                  0, 10, 9, // Triangulo 2
                  0, 1, 10, // Triangulo 2
                ];

let positionBuffer = createVertexBuffer(gl, positions);
//let colorBuffer = createVertexBuffer(gl, colors);
let indexBuffer = createIndexBuffer(gl, indexes);

/**
 * PASO 6 - Obtengo la posicion del atributo de entrada al vertex shader
 */

let positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
//let colorAttributeLocation = gl.getAttribLocation(program, 'vertex_color');

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
bindAttributeToVertexBuffer(gl, positionAttributeLocation, 2, positionBuffer, vertexSize, 0);

//gl.enableVertexAttribArray(colorAttributeLocation);
//bindAttributeToVertexBuffer(gl,colorAttributeLocation, 3, colorBuffer, 0, 0)

/**
 * Conectamos el arreglo de indices que vamos a usar.
 */
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

gl.bindVertexArray(null);

/**
 * PASO 9 - Le decimos a WebGL que use el program creado con nuestros shaders
 * Bindeo el VAO.
 * Aplico el color seteato con clearColor
 */

gl.useProgram(program);

gl.bindVertexArray(vao);

gl.clear(gl.COLOR_BUFFER_BIT);

/**
 * PASO 10 - Dibujo
 */

gl.drawElements(gl.TRIANGLES, indexes.length, gl.UNSIGNED_SHORT, 0);

