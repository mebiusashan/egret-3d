//##FilterBegin## ##Particle##

uniform float uniform_velocityForceX[22];
void calcVelocityForceBezier(float curTime, float totalTime)
{
	velocityForceOneBezier.x = calcOneBezierArea(uniform_velocityForceX, curTime, totalTime);
}


//##FilterEnd##
