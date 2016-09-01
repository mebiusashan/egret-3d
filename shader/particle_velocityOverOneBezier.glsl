//##FilterBegin## ##Particle##

vec3 velocityTwoBezier = vec3(0.0);
void calcVelocityOverBezier(float curTime, float totalTime)
{
}

void main() {
	if(discard_particle < TrueOrFalse){

		calcVelocityOverBezier(currentTime, curParticle.life);
		//
		velocityOverVec3.xyz = velocityTwoBezier.xyz;
	}
}

//##FilterEnd##
