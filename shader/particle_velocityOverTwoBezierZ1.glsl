//##FilterBegin## ##Particle##

uniform float uniform_velocityOverZ1[22];
void calcVelocityOverBezier(float curTime, float totalTime)
{
	velocityOverTwoBezier1.z = calcOneBezierArea(uniform_velocityOverZ1, curTime, totalTime);
}


//##FilterEnd##
