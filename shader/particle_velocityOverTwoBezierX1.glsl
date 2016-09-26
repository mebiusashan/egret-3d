//##FilterBegin## ##Particle##

uniform float uniform_velocityOverX1[35];
void calcVelocityOverBezier(float curTime, float totalTime)
{
	velocityOverTwoBezier1.x = calcBezierArea(uniform_velocityOverX1, curTime, totalTime);
}

//##FilterEnd##
