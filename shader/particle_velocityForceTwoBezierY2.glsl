//##FilterBegin## ##Particle##

uniform float uniform_velocityForceY2[22];
void calcVelocityForceBezier(float curTime, float totalTime)
{
	velocityForceTwoBezier2.y = calcOneBezierArea(uniform_velocityForceY2, curTime, totalTime);
}

//##FilterEnd##
