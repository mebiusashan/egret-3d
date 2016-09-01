//##FilterBegin## ##Particle##

uniform float uniform_velocityOverY1[22];
void calcVelocityOverBezier(float curTime, float totalTime)
{
	velocityOverTwoBezier1.y = calcOneBezierArea(uniform_velocityOverY1, curTime, totalTime);
}

//##FilterEnd##
