//##FilterBegin## ##Particle##
uniform float uniform_rotationBezier[35];

float particle(  ParticleData curParticle ){
	if(discard_particle < TrueOrFalse){
		float rot = calcBezierSize(uniform_rotationBezier, currentTime, curParticle.life);
		rot = currentTime * rot * (PI / 180.0);
		localPosition = buildRotMat4(vec3(0.0,0.0,rot)) * localPosition;
	}
}
//##FilterEnd##
