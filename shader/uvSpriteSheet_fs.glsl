uniform float uvSpriteSheet[4] ;
uniform sampler2D diffuseTexture;
vec4 diffuseColor ;
void main() {
    uv_0.xy *= vec2(uvSpriteSheet[2],uvSpriteSheet[3]);
    uv_0.xy += vec2(uvSpriteSheet[0],uvSpriteSheet[1]);
	diffuseColor = texture2D(diffuseTexture , uv_0 );
}