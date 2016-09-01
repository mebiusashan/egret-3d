//##FilterBegin## ##Particle##

uniform float uniform_velocityForceX1[22];
void calcVelocityForceBezier(float curTime, float totalTime)
{
	velocityForceTwoBezier1.x = calcOneBezierArea(uniform_velocityForceX1, curTime, totalTime);
}

//##FilterEnd##
