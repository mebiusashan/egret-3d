attribute vec3 attribute_position;
attribute vec2 attribute_uv0;

varying  vec2 varying_uv0;                      
uniform  mat4 uniform_ViewProjectionMatrix;

void main(void) {
    vec4 pos = vec4(attribute_position, 1.0);
    gl_Position = uniform_ViewProjectionMatrix * pos;
    varying_uv0 = attribute_uv0;
}