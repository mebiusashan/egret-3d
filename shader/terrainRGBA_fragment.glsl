uniform sampler2D blendMaskTexture ;
uniform sampler2D splat_0Tex ;
uniform sampler2D splat_1Tex ;
uniform sampler2D splat_2Tex ;
uniform sampler2D splat_3Tex ;

uniform float uvs[8];
void main() {
	vec4 splat_control = texture2D ( blendMaskTexture , varying_uv0 );
	vec4 cc = vec4(0.0,0.0,0.0,1.0);
	vec2 uv = varying_uv0 ;

	cc.xyz = splat_control.x * texture2D (splat_0Tex, uv * vec2(uvs[0],uvs[1])).xyz ;
	cc.xyz += splat_control.y * texture2D (splat_1Tex, uv * vec2(uvs[2],uvs[3]) ).xyz;
	cc.xyz += splat_control.z * vec4(texture2D (splat_2Tex, uv* vec2(uvs[4],uvs[5]))).xyz;
	cc.xyz += (1.0-length(splat_control.xyz)) * vec4(texture2D (splat_3Tex, uv* vec2(uvs[6],uvs[7]))).xyz;

	diffuseColor.xyz = cc.xyz ;
}



