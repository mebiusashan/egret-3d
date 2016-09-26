//##FilterBegin## ##Particle##

uniform float uniform_velocityForceX2[35];
void calcVelocityForceBezier(float curTime, float totalTime)
{
	velocityForceTwoBezier2.x = calcBezierArea(uniform_velocityForceX2, curTime, totalTime);
}

//##FilterEnd##
