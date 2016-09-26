//##FilterBegin## ##Particle##

uniform float uniform_velocityForceY2[35];
void calcVelocityForceBezier(float curTime, float totalTime)
{
	velocityForceTwoBezier2.y = calcBezierArea(uniform_velocityForceY2, curTime, totalTime);
}

//##FilterEnd##
