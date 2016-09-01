//##FilterBegin## ##Particle##

uniform float uniform_velocityOverX[22];
void calcVelocityOverBezier(float curTime, float totalTime)
{
	velocityTwoBezier.x = calcOneBezierArea(uniform_velocityOverX, curTime, totalTime);
}

//##FilterEnd##
