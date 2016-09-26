//##FilterBegin## ##Particle##

uniform float uniform_velocityOverZ1[35];
void calcVelocityOverBezier(float curTime, float totalTime)
{
	velocityOverTwoBezier1.z = calcBezierArea(uniform_velocityOverZ1, curTime, totalTime);
}


//##FilterEnd##
