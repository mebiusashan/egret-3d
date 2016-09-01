uniform sampler2D lightTexture ;
varying vec2 varying_uv1 ;

vec4 decode_hdr( vec4 data ){
   vec4 res = data ;
   res.xyz *= pow(2.2,data.w * 256.0 - 128.0);
   return res ;
}

void main(void){
	vec4 lightmap = texture2D( lightTexture , varying_uv1 );
	lightmap.xyz = decode_hdr(lightmap).xyz;
	lightmap.xyz = pow( 1.8 * lightmap.xyz, vec3(1.1)) ;
    diffuseColor.xyz *= lightmap.xyz ;
}



