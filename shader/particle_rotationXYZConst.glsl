//##FilterBegin## ##Particle##
attribute vec3 attribute_rotSpeedXYZ ;
attribute vec3 attribute_rotBirthXYZ ;

mat4 mat4RotateXYZ;
float particle(  ParticleData curParticle ){
	vec3 rot = (attribute_rotBirthXYZ + particleStateData.time * attribute_rotSpeedXYZ);
	rot = mod(rot, 360.0) * (PI / 180.0);
	mat4RotateXYZ = buildRotMat4(rot);
	localPosition = mat4RotateXYZ * localPosition; 
}

//##FilterEnd##
