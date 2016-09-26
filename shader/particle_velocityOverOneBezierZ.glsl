//##FilterBegin## ##Particle##

uniform float uniform_velocityOverZ[35];
void calcVelocityOverBezier(float curTime, float totalTime)
{
	velocityTwoBezier.z = calcBezierArea(uniform_velocityOverZ, curTime, totalTime);
}

//##FilterEnd##
