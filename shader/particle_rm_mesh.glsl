//##FilterBegin## ##Particle##
mat4 getRenderModeMatrix(mat4 cameraMatrix, mat4 modelMatrix) {
	return mat4( 
		vec4(1.0, 0.0, 0.0, 0.0), 
		vec4(0.0, 1.0, 0.0, 0.0), 
		vec4(0.0, 0.0, 1.0, 0.0), 
		vec4(0.0, 0.0, 0.0, 1.0) 
	); 
}


//##FilterEnd##
