//##FilterBegin## ##Particle##

uniform float uniform_velocityOverX2[35];
void calcVelocityOverBezier(float curTime, float totalTime)
{
	velocityOverTwoBezier2.x = calcBezierArea(uniform_velocityOverX2, curTime, totalTime);
}

//##FilterEnd##
