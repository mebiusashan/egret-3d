//##FilterBegin## ##Particle##
mat4 getRenderModeMatrix(mat4 cameraMatrix, mat4 modelMatrix) {
	mat4 matrix = mat4(
		cameraMatrix[0],
		cameraMatrix[1],
		cameraMatrix[2],
		vec4(0.0, 0.0, 1.0, 1.0));
	return matrix;
}

//##FilterEnd##
