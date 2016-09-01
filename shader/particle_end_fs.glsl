//##FilterBegin## ##Particle##

//far
//near
//blendMode
const float TrueOrFalse = 0.5;
uniform float uniform_particleFsData[3];
void main() {
	float blendMode = uniform_particleFsData[2];
	outColor.xyz = diffuseColor.xyz * materialSource.diffuse * varying_color.xyz * globalColor.xyz; 
	outColor.w = diffuseColor.w * varying_color.w * globalColor.w; 
	//ALPHA
	if(blendMode < TrueOrFalse){ 
		outColor.xyz *= outColor.w; 
	}
	outColor = clamp(outColor, 0.0, 1.0); 
    gl_FragColor = outColor;
}

//##FilterEnd##




