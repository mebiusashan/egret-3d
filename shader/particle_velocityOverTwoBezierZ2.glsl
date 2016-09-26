//##FilterBegin## ##Particle##

uniform float uniform_velocityOverZ2[35];
void calcVelocityOverBezier(float curTime, float totalTime)
{
	velocityOverTwoBezier2.z = calcBezierArea(uniform_velocityOverZ2, curTime, totalTime);
}

//##FilterEnd##
