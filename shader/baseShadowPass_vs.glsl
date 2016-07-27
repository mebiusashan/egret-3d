attribute vec3 attribute_position;
attribute vec2 attribute_uv0;
attribute vec4 attribute_color;

uniform mat4 uniform_ProjectionMatrix ;

varying vec2 varying_uv0;
varying vec4 varying_color;

vec3 e_position = vec3(0.0, 0.0, 0.0);
vec4 outPosition ;
void main(void){
    e_position = attribute_position;
    varying_color = attribute_color;
    varying_uv0 = attribute_uv0;
}