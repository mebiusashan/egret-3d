//##FilterBegin## ##Particle##

uniform float uniform_velocityForceY1[22];
void calcVelocityForceBezier(float curTime, float totalTime)
{
	velocityForceTwoBezier1.y = calcOneBezierArea(uniform_velocityForceY1, curTime, totalTime);
}

//##FilterEnd##
