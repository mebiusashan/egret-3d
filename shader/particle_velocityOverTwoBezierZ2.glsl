//##FilterBegin## ##Particle##

uniform float uniform_velocityOverZ2[22];
void calcVelocityOverBezier(float curTime, float totalTime)
{
	velocityOverTwoBezier2.z = calcOneBezierArea(uniform_velocityOverZ2, curTime, totalTime);
}

//##FilterEnd##
