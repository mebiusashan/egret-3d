//##FilterBegin## ##Particle##
uniform vec2 uniform_fadeOutParticleData;
varying float varying_posZ;


void fadeOutParticleByZ(){
	if(varying_posZ > uniform_fadeOutParticleData.x){
		discard;
	}

	float fadeAlpha = (uniform_fadeOutParticleData.x - varying_posZ) / uniform_fadeOutParticleData.x;
	fadeAlpha = clamp(fadeAlpha, 0.0, 1.0);
	fadeAlpha *= fadeAlpha;
	outColor.w *= fadeAlpha;

	if( diffuseColor.w < materialSource.cutAlpha ){
		discard;
	}

}
//##FilterEnd##
