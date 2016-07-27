uniform float mulUvRoll[4] ;
uniform sampler2D diffuseTexture;
uniform sampler2D diffuseTexture1;
vec4 diffuseColor ;
vec2 uv_1;
void main() {
	uv_1 = varying_uv0;
    uv_0.xy += vec2(mulUvRoll[0],mulUvRoll[1]);
	uv_1.xy += vec2(mulUvRoll[2],mulUvRoll[3]);

	diffuseColor = texture2D(diffuseTexture , uv_0 ) * texture2D(diffuseTexture1 , uv_1 );
	diffuseColor.xyz = clamp(diffuseColor.xyz / diffuseColor.w,0.0,1.0);
}