
export function getCanvas(id) {
    let myCanvas = document.querySelector(`#${id}`);

    if(!myCanvas){
        throw new Error(`No canvas with id ${id} was found.`);
    }

    return myCanvas;
}

export function getRenderingContext(canvas){
    let gl = canvas.getContext('webgl2');

    if(!gl){
        throw new Error('No rendering context found.')
    }

    return gl;
}

export function createShader(gl, type, source){
    let shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    
    let success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);

    if(success){
        return shader;
    }

    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
}

export function createProgram(gl, vertexShader, fragmentShader){
    
    let program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    let success = gl.getProgramParameter(program, gl.LINK_STATUS);

    if(success){
        return program;
    } 

    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
}

export function createVertexBuffer(gl, data) {
    let positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    return positionBuffer;
}

export function bindAttributeToVertexBuffer(gl, positionAttributeLocation, attributeSize, positionBuffer, vertexSize, offset){
    
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.vertexAttribPointer( positionAttributeLocation, attributeSize, gl.FLOAT, false, vertexSize*Float32Array.BYTES_PER_ELEMENT, offset*Float32Array.BYTES_PER_ELEMENT );
    gl.bindBuffer(gl.ARRAY_BUFFER,null);
    
}

export function createIndexBuffer(gl, data) {
    let indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(data), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

    return indexBuffer;
}