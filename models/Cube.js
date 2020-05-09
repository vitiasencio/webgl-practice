import { createVertexBuffer, createIndexBuffer, bindAttributeToVertexBuffer } from '../js/utils.js';
import { mat4, glMatrix } from '../js/gl-matrix/index.js'

export class Cube {

    vertexPositions = [
      -1, 1, 1,   
      1, 1, 1,    
      1, 1, -1,   
      -1, 1, -1,  
      -1, -1, 1,  
      1, -1, 1,   
      1, -1, -1,  
      -1, -1, -1  
    ];
    vertexColors = [
      1, 0, 1,    
      1, 1, 1,    
      0, 1, 1,    
      0, 0, 1,    
      1, 0, 0,    
      1, 1, 0,    
      0, 1, 0,    
      0, 0, 0     
    ];
    
    indices = [
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
    ];

    color;

    scaleMatrix;
    rotateMatrix;
    translateMatrix;

    rotation;
    scale;

    modelMatrix;

    gl;
    program;
    vao;

    constructor(gl,program) {
        this.gl = gl;
        this.program = program;

        let posx = this.randomPos(-2,2);
        let posy = this.randomPos(-2,2);
        let posz = this.randomPos(-2,2);

        this.rotation = 0;
        this.scale = 0.5;

        this.scaleMatrix = mat4.create();
        this.rotateMatrix = mat4.create();
        this.translateMatrix = mat4.create();
        this.modelMatrix = mat4.create();
        
        mat4.fromScaling(this.scaleMatrix, [this.scale, this.scale, this.scale]);
        mat4.fromTranslation(this.translateMatrix, [posx, posy, posz]);

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

        mat4.fromRotation(this.rotateMatrix, glMatrix.toRadian(this.rotation++%360), [1, 0, 1]);
        this.rotation = this.rotation % 360;

        mat4.identity(this.modelMatrix);
        mat4.multiply(this.modelMatrix, this.scaleMatrix, this.modelMatrix);
        mat4.multiply(this.modelMatrix, this.rotateMatrix, this.modelMatrix);
        mat4.multiply(this.modelMatrix, this.translateMatrix, this.modelMatrix);

        const modelMatrixLocation = this.gl.getUniformLocation(this.program, "modelMatrix")
        this.gl.uniformMatrix4fv(modelMatrixLocation, false, this.modelMatrix)

        this.gl.bindVertexArray(this.vao);
        this.gl.drawElements(this.gl.TRIANGLES, this.indices.length, this.gl.UNSIGNED_SHORT, 0);
        this.gl.bindVertexArray(null);

    }

    randomPos(min, max) {
        return min + (max - min) * Math.random();
    }
}