//##FilterBegin## ##Particle##

attribute float attribute_velocityForceRandomSeed;

vec3 velocityForceTwoBezier1 = vec3(0.0);
vec3 velocityForceTwoBezier2 = vec3(0.0);

void calcVelocityForceBezier(float curTime, float totalTime)
{
}

void main() {
	if(discard_particle < TrueOrFalse){

		calcVelocityForceBezier(currentTime, curParticle.life);
		//
		velocityForceVec3.x = mix(velocityForceTwoBezier1.x, velocityForceTwoBezier2.x, attribute_velocityForceRandomSeed);
		velocityForceVec3.y = mix(velocityForceTwoBezier1.y, velocityForceTwoBezier2.y, attribute_velocityForceRandomSeed);
		velocityForceVec3.z = mix(velocityForceTwoBezier1.z, velocityForceTwoBezier2.z, attribute_velocityForceRandomSeed);
	}
}

//##FilterEnd##
