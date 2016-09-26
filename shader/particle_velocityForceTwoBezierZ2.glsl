//##FilterBegin## ##Particle##

uniform float uniform_velocityForceZ2[35];
void calcVelocityForceBezier(float curTime, float totalTime)
{
	velocityForceTwoBezier2.z = calcBezierArea(uniform_velocityForceZ2, curTime, totalTime);
}

//##FilterEnd##
