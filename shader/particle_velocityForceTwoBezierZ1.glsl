//##FilterBegin## ##Particle##

uniform float uniform_velocityForceZ1[22];
void calcVelocityForceBezier(float curTime, float totalTime)
{
	velocityForceTwoBezier1.z = calcOneBezierArea(uniform_velocityForceZ1, curTime, totalTime);
}

//##FilterEnd##
