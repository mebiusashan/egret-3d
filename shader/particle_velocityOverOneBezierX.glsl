//##FilterBegin## ##Particle##

uniform float uniform_velocityOverX[35];
void calcVelocityOverBezier(float curTime, float totalTime)
{
	velocityTwoBezier.x = calcBezierArea(uniform_velocityOverX, curTime, totalTime);
}

//##FilterEnd##
