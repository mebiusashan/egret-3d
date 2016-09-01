//##FilterBegin## ##Particle##

uniform float uniform_velocityLimit[22];

void main() {
	if(discard_particle < TrueOrFalse){
		velocityLimitVec2.x = calcOneBezierArea(uniform_velocityLimit, currentTime, curParticle.life);
		velocityLimitVec2.y = 1.0;
	}
}

//##FilterEnd##
