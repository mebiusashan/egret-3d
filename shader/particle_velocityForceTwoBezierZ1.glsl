//##FilterBegin## ##Particle##

uniform float uniform_velocityForceZ1[35];
void calcVelocityForceBezier(float curTime, float totalTime)
{
	velocityForceTwoBezier1.z = calcBezierArea(uniform_velocityForceZ1, curTime, totalTime);
}

//##FilterEnd##
