//##FilterBegin## ##Particle##
uniform float uniform_bezierSize[35];
void main() {
	float bezierSize = calcBezierSize(uniform_bezierSize, currentTime, curParticle.life);
	localPosition.xyz *= bezierSize;
}


//##FilterEnd##
