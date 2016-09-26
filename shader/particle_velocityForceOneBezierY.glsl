//##FilterBegin## ##Particle##

uniform float uniform_velocityForceY[35];
void calcVelocityForceBezier(float curTime, float totalTime)
{
	velocityForceOneBezier.y = calcBezierArea(uniform_velocityForceY, curTime, totalTime);
}


//##FilterEnd##
