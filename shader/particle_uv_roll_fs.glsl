//##FilterBegin## ##Particle##

uniform float uniform_particleUVRoll[2];
void calcUVCoord() {
	uv_0.xy += vec2(varying_particleData.x * uniform_particleUVRoll[0], varying_particleData.x * uniform_particleUVRoll[1]);
}

//##FilterEnd##
