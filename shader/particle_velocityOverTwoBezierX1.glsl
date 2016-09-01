//##FilterBegin## ##Particle##

uniform float uniform_velocityOverX1[22];
void calcVelocityOverBezier(float curTime, float totalTime)
{
	velocityOverTwoBezier1.x = calcOneBezierArea(uniform_velocityOverX1, curTime, totalTime);
}

//##FilterEnd##
