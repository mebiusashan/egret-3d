//##FilterBegin## ##Particle##


uniform float uniform_velocityForceZ[22];
void calcVelocityForceBezier(float curTime, float totalTime)
{
	velocityForceOneBezier.z = calcOneBezierArea(uniform_velocityForceZ, curTime, totalTime);
}


//##FilterEnd##
