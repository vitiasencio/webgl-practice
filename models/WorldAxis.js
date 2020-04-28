import { createVertexBuffer, createIndexBuffer, bindAttributeToVertexBuffer } from '../js/utils.js';
import { mat4, glMatrix } from '../js/gl-matrix/index.js'

export class Axis {

    vertexPositions = [
      0.0, 0.0, 0.0,
      1.0, 0.0, 0.0,
      0.0, 0.0, 0.0,
      0.0, 1.0, 0.0,
      0.0, 0.0, 0.0,
      0.0, 0.0, 1.0,
    ];
    vertexColors = [
      1.0, 0.0, 0.0,
      1.0, 0.0, 0.0,
      0.0, 1.0, 0.0,
      0.0, 1.0, 0.0,
      0.0, 0.0, 1.0,
      0.0, 0.0, 1.0,
    ];
    
    indices = [
        0, 1,
        2, 3,
        4, 5
    ];

    scaleMatrix;

    modelMatrix;

    scale;

    gl;
    program;
    vao;

    constructor(gl,program) {
        this.gl = gl;
        this.program = program;

        this.scaleMatrix = mat4.create();
        this.modelMatrix = mat4.create();

        this.scale = 3;

        mat4.fromScaling(this.scaleMatrix, [this.scale, this.scale, this.scale]);

        let positionBuffer = createVertexBuffer(gl, this.vertexPositions);
        let colorBuffer = createVertexBuffer(gl, this.vertexColors);
        let indexBuffer = createIndexBuffer(gl, this.indices)

        let positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
        let colorAttributeLocation = gl.getAttribLocation(program, 'vertex_color');

        this.vao = gl.createVertexArray();
        this.gl.bindVertexArray(this.vao);

        this.gl.enableVertexAttribArray(positionAttributeLocation);
        bindAttributeToVertexBuffer(this.gl, positionAttributeLocation, 3, positionBuffer);
        this.gl.enableVertexAttribArray(colorAttributeLocation);
        bindAttributeToVertexBuffer(this.gl, colorAttributeLocation, 3, colorBuffer);

        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

        this.gl.bindVertexArray(null);

    }

    render(){

        mat4.identity(this.modelMatrix);
        mat4.multiply(this.modelMatrix, this.scaleMatrix, this.modelMatrix);

        const modelMatrixLocation = this.gl.getUniformLocation(this.program, "modelMatrix")
        this.gl.uniformMatrix4fv(modelMatrixLocation, false, this.modelMatrix)

        this.gl.bindVertexArray(this.vao);
        this.gl.drawElements(this.gl.LINES, this.indices.length, this.gl.UNSIGNED_SHORT, 0);
        this.gl.bindVertexArray(null);

    }

}