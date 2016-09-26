//##FilterBegin## ##Particle##

uniform float uniform_velocityOverY2[35];
void calcVelocityOverBezier(float curTime, float totalTime)
{
	velocityOverTwoBezier2.y = calcBezierArea(uniform_velocityOverY2, curTime, totalTime);
}

//##FilterEnd##
