//##FilterBegin## ##Particle##

uniform float uniform_velocityOverY[22];
void calcVelocityOverBezier(float curTime, float totalTime)
{
	velocityTwoBezier.y = calcOneBezierArea(uniform_velocityOverY, curTime, totalTime);
}

//##FilterEnd##
