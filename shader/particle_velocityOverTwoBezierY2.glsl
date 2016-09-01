//##FilterBegin## ##Particle##

uniform float uniform_velocityOverY2[22];
void calcVelocityOverBezier(float curTime, float totalTime)
{
	velocityOverTwoBezier2.y = calcOneBezierArea(uniform_velocityOverY2, curTime, totalTime);
}

//##FilterEnd##
