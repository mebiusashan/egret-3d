//##FilterBegin## ##Particle##
uniform float uniform_bezierSize[22];
void main() {
	float bezierSize = calcOneBezierSize(uniform_bezierSize, currentTime, curParticle.life);
	localPosition.xyz *= bezierSize;
}


//##FilterEnd##
