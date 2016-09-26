//##FilterBegin## ##Particle##

uniform float uniform_velocityForceX[35];
void calcVelocityForceBezier(float curTime, float totalTime)
{
	velocityForceOneBezier.x = calcBezierArea(uniform_velocityForceX, curTime, totalTime);
}


//##FilterEnd##
