//##FilterBegin## ##Particle##

uniform float uniform_velocityForceX1[35];
void calcVelocityForceBezier(float curTime, float totalTime)
{
	velocityForceTwoBezier1.x = calcBezierArea(uniform_velocityForceX1, curTime, totalTime);
}

//##FilterEnd##
