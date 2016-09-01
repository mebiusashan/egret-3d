//##FilterBegin## ##Particle##

uniform float uniform_velocityLimit[22];
uniform float uniform_velocityLimit2[22];
attribute float attribute_velocityLimitRandomSeed;
void main() {
	if(discard_particle < TrueOrFalse){
		float velocity2Limit1 = calcOneBezierArea(uniform_velocityLimit, currentTime, curParticle.life);
		float velocity2Limit2 = calcOneBezierArea(uniform_velocityLimit2, currentTime, curParticle.life);
		velocityLimitVec2.x = mix(velocity2Limit1, velocity2Limit1, attribute_velocityLimitRandomSeed);
		if(velocityLimitVec2.x < 0.0){
			velocityLimitVec2.x = 0.0;
		}
		velocityLimitVec2.y = 1.0;
	} 
}

//##FilterEnd##
