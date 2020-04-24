export const vertexShaderSource = `#version 300 es

// an attribute is an input (in) to a vertex shader
// It will receive data from a buffer

in vec2 a_position;
in vec3 vertex_color;

out vec3 frag_color;
// all shaders have a main function

void main() {
    
    frag_color = vertex_color;
    // gl_position is a special variable a vertex shader
    // is responsible for setting
    gl_Position = vec4(a_position, 0, 1);
}

`

export const fragmentShaderSource = `#version 300 es

// fragment shaders don't have a default precision so we need
// to pick one. mediump is a good default. It means "medium precision".
precision mediump float;

uniform vec4 u_color;

in vec3 frag_color;

//we need to declare an output for the fragment shader
out vec4 outColor;

void main() {

    outColor = vec4(0.0, 0.0, 1.0, 1);

}
`