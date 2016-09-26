//##FilterBegin## ##Particle##


uniform float uniform_velocityForceZ[35];
void calcVelocityForceBezier(float curTime, float totalTime)
{
	velocityForceOneBezier.z = calcBezierArea(uniform_velocityForceZ, curTime, totalTime);
}


//##FilterEnd##
