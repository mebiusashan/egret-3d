//##FilterBegin## ##Particle##

uniform float uniform_velocityForceZ2[22];
void calcVelocityForceBezier(float curTime, float totalTime)
{
	velocityForceTwoBezier2.z = calcOneBezierArea(uniform_velocityForceZ2, curTime, totalTime);
}

//##FilterEnd##
