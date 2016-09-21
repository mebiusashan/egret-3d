uniform sampler2D shadowMapTexture;
uniform vec4 uniform_ShadowColor;

varying vec4 varying_ShadowCoord;

float unpackDepth(vec4 rgbaDepth){
    vec4 bitShift = vec4( 1.0 , 1.0/256.0 , 1.0/(256.0*256.0) , 1.0/(256.0*256.0*256.0) );
    float depth = dot(rgbaDepth,bitShift);
    return depth ;
}

void main() {

	vec3 shadowColor = vec3(1.0,1.0,1.0); 
	float offset = uniform_ShadowColor.w; 
	//vec3 shadowDepth = varying_ShadowCoord.xyz / varying_ShadowCoord.w * 0.5 + 0.5; 
	//vec2 sample = clamp(shadowDepth.xy,0.0,1.0); 

	vec2 sample = varying_ShadowCoord.xy / varying_ShadowCoord.w * 0.5 + 0.5; 
	sample = clamp(sample,0.0,1.0);

	vec4 sampleDepth = texture2D(shadowMapTexture, sample).xyzw; 
	float depth = varying_ShadowCoord.z;
	
	if (sampleDepth.z != 0.0) {
		//if( shadowDepth.y > 1.0){ 
		//	sampleDepth.z = depth ; 
		//} 
		//
		//if( shadowDepth.z > 1.0 - offset){ 
		//	sampleDepth.z = depth ; 
		//}
		//
		//if( shadowDepth.x < 0.0 ){ 
		//	sampleDepth.z = depth ; 
		//} 
	  	//
		//if( shadowDepth.x >1.0 ){ 
		//	sampleDepth.z = depth ; 
		//}

		if( sampleDepth.z < depth - offset) { 
			shadowColor = uniform_ShadowColor.xyz; 
		}
	}
	

	diffuseColor.xyz = diffuseColor.xyz * shadowColor; 
}
