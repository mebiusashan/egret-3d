//##FilterBegin## ##Particle##

uniform float uniform_velocityForceY[22];
void calcVelocityForceBezier(float curTime, float totalTime)
{
	velocityForceOneBezier.y = calcOneBezierArea(uniform_velocityForceY, curTime, totalTime);
}


//##FilterEnd##
