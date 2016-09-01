//##FilterBegin## ##Particle##

uniform float uniform_velocityOverX2[22];
void calcVelocityOverBezier(float curTime, float totalTime)
{
	velocityOverTwoBezier2.x = calcOneBezierArea(uniform_velocityOverX2, curTime, totalTime);
}

//##FilterEnd##
