import { vertexShaderSource, fragmentShaderSource } from './js/shaders.js';
import { getCanvas, getRenderingContext, createShader, createProgram, createVertexBuffer, bindAttributeToVertexBuffer, createIndexBuffer } from './js/utils.js';
import { mat4, glMatrix } from './js/gl-matrix/index.js'
import { Cube } from './models/Cube.js';

const CANVASID = 'myCanvas';

/**
 * Obtengo el canvas del HTML
 */

let canvas = getCanvas(CANVASID);

/**
 * Inicializo y obtengo el contexto de dibujo sobre el canvas
 */

let gl = getRenderingContext(canvas);

/**
 * Seteo el color para limpiar el color del canvas (background color)
 */

gl.clearColor(1, 1, 1, 1);
gl.enable(gl.DEPTH_TEST);


/**
 * Creo y compilo los shaders
 */

let vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
let fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

/**
 * Creo un programa utilizando los shaders creados en el PASO 3
 */

let program = createProgram(gl, vertexShader, fragmentShader);
gl.useProgram(program);


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
const far = 20
mat4.perspective(projectionMatrix, fov, aspect, near, far)

gl.uniformMatrix4fv(viewMatrixLocation, false, viewMatrix)
gl.uniformMatrix4fv(projectionMatrixLocation, false, projectionMatrix)

/**
 * END CAMERA SETUP
 */


gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

const sceneElements = [];

const button = document.getElementById("add-element");

button.addEventListener('click', () => {
    let newCube = new Cube(gl, program);
    sceneElements.push(newCube);
})


function renderScene() {
    
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    sceneElements.forEach(elem => {
        elem.render()
    });
    requestAnimationFrame(renderScene)
}

requestAnimationFrame(renderScene)
