//##FilterBegin## ##Particle##

attribute vec3 attribute_velocityForceConst ;
float particle(   ParticleData curParticle ){
	//u = at^2
	velocityForceVec3 = 0.5 * attribute_velocityForceConst * currentTime * currentTime;
}

//##FilterEnd##
