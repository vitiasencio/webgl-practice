export const vertexShaderSource = `#version 300 es

precision mediump float;

uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;

in vec3 a_position;
in vec3 vertex_color;

out vec3 frag_color;

void main() {
    
    frag_color = vertex_color;
    // gl_position is a special variable a vertex shader
    // is responsible for setting
    gl_Position = projectionMatrix * viewMatrix * vec4(a_position, 1);
}

`

export const fragmentShaderSource = `#version 300 es

precision mediump float;

uniform vec4 u_color;

in vec3 frag_color;

//we need to declare an output for the fragment shader
out vec4 outColor;

void main() {

    // Just set the output to a constant reddish-purple
    outColor = vec4(frag_color, 1);
}


`