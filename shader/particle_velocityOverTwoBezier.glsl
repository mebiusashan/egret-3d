//##FilterBegin## ##Particle##


attribute float attribute_velocityOverRandomSeed;

vec3 velocityOverTwoBezier1 = vec3(0.0);
vec3 velocityOverTwoBezier2 = vec3(0.0);

void calcVelocityOverBezier(float curTime, float totalTime)
{
}

void main() {
	if(discard_particle < TrueOrFalse){

		calcVelocityOverBezier(currentTime, curParticle.life);
		//
		velocityOverVec3.x = mix(velocityOverTwoBezier1.x, velocityOverTwoBezier2.x, attribute_velocityOverRandomSeed);
		velocityOverVec3.y = mix(velocityOverTwoBezier1.y, velocityOverTwoBezier2.y, attribute_velocityOverRandomSeed);
		velocityOverVec3.z = mix(velocityOverTwoBezier1.z, velocityOverTwoBezier2.z, attribute_velocityOverRandomSeed);
	}
}

//##FilterEnd##
