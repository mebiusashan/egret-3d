//##FilterBegin## ##Particle##
attribute float attribute_rotationRandomSeed;
uniform float uniform_rotationBezier[35];
uniform float uniform_rotationBezier2[35];


float particle(  ParticleData curParticle ){
	if(discard_particle < TrueOrFalse){
		vec2 rotationTwoBezier = vec2(0.0);
		rotationTwoBezier.x = calcBezierArea(uniform_rotationBezier, currentTime, curParticle.life);
		rotationTwoBezier.y = calcBezierArea(uniform_rotationBezier2, currentTime, curParticle.life);
		float rot = mix(rotationTwoBezier.x, rotationTwoBezier.y, attribute_rotationRandomSeed);
		rot = currentTime * rot * (PI / 180.0);
		localPosition = buildRotMat4(vec3(0.0,0.0,rot)) * localPosition;
	}
}
//##FilterEnd##
