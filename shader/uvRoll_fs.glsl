uniform float uvRoll[2] ;
uniform sampler2D diffuseTexture;
vec4 diffuseColor ;
void main() {
    uv_0.xy += vec2(uvRoll[0],uvRoll[1]);
	diffuseColor = texture2D(diffuseTexture , uv_0 );
}