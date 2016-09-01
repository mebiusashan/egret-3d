//##FilterBegin## ##Particle##

uniform float uniform_velocityForceX2[22];
void calcVelocityForceBezier(float curTime, float totalTime)
{
	velocityForceTwoBezier2.x = calcOneBezierArea(uniform_velocityForceX2, curTime, totalTime);
}

//##FilterEnd##
