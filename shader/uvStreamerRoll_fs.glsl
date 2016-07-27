uniform float uvRoll[3] ;
uniform sampler2D diffuseTexture;
uniform sampler2D streamerTexture;
vec4 diffuseColor ;
void main() {
    
	diffuseColor = texture2D(diffuseTexture , varying_uv0 );
    
    vec2 rollUV = varying_uv0 + vec2(uvRoll[0],uvRoll[1]) + vec2(normal.xz) * 0.5 ;
	diffuseColor.xyz += texture2D(streamerTexture , rollUV ).xyz * uvRoll[2] ;
    
//      vec4 c = texture2D(streamerTexture , uv_0 * 0.5 ) * 0.5 ;
//   outColor = mix(c,outColor,c.w);
// gl_FragColor = outColor * varying_color; 
}