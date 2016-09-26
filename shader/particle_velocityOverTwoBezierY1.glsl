//##FilterBegin## ##Particle##

uniform float uniform_velocityOverY1[35];
void calcVelocityOverBezier(float curTime, float totalTime)
{
	velocityOverTwoBezier1.y = calcBezierArea(uniform_velocityOverY1, curTime, totalTime);
}

//##FilterEnd##
