//##FilterBegin## ##Particle##

uniform float uniform_velocityOverZ[22];
void calcVelocityOverBezier(float curTime, float totalTime)
{
	velocityTwoBezier.z = calcOneBezierArea(uniform_velocityOverZ, curTime, totalTime);
}

//##FilterEnd##
