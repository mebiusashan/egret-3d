//##FilterBegin## ##Particle##

uniform float uniform_velocityOverY[35];
void calcVelocityOverBezier(float curTime, float totalTime)
{
	velocityTwoBezier.y = calcBezierArea(uniform_velocityOverY, curTime, totalTime);
}

//##FilterEnd##
