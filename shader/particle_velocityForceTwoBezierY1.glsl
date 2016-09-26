//##FilterBegin## ##Particle##

uniform float uniform_velocityForceY1[35];
void calcVelocityForceBezier(float curTime, float totalTime)
{
	velocityForceTwoBezier1.y = calcBezierArea(uniform_velocityForceY1, curTime, totalTime);
}

//##FilterEnd##
