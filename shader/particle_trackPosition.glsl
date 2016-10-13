//##FilterBegin## ##Particle##

attribute vec3 attribute_trackPosition;
void calcCubicPos(float time, float totalTime, vec3 fromPos, vec3 endPos){ 
 
	vec3 distanceVec3 = endPos - fromPos; 
	float distanceFloat = dot(distanceVec3, distanceVec3); 
	distanceFloat = sqrt(distanceFloat); 
	float t = time / totalTime; 
	t = easeInOut(t); 
	vec3 centerPos = distanceVec3 * 0.5 + fromPos; 
	vec3 zeroPos = vec3(0.0, distanceFloat * 0.05, 0.0); 
	zeroPos = mix(centerPos, zeroPos, 0.6); 
	vec3 bezier1 = mix(fromPos, zeroPos, t); 
	vec3 bezier2 = mix(zeroPos, endPos, t); 
	vec3 bezier3 = mix(bezier1, bezier2, t); 
	cubicPos = bezier3 - fromPos; 
	t = clamp(time / totalTime, 0.0, 1.0); 
	if(t > 0.8){ 
	t = (1.0 - t) * 5.0; 
	}else if(t > 0.2){ 
	t = 1.0; 
	}else{ 
	t *= 5.0; 
	} 
	t = 0.5 * (1.0 - cos(t * PI)); 
	vec4 nrmVec4 = mat4RotateXYZ * vec4(attribute_normal, 1.0); 
	vec3 nrmPos = normalize(nrmVec4.xyz); 
	nrmPos = nrmPos * t * distanceFloat * 0.04; 
	t = clamp(time / totalTime, 0.0, 1.0); 
	float heightOffset = 0.0; 
	heightOffset = sin(t * 3.0 * PI) * distanceFloat * 0.2 * sqrt(t * (1.0 - t)); 
	cubicPos += nrmPos; 
	cubicPos.y += heightOffset; 
}
void trackPosition(){ 
 
	calcCubicPos(currentTime - 0.017, curParticle.life, attribute_offsetPosition, attribute_trackPosition); 
	vec3 lastOffset = cubicPos; 
	calcCubicPos(currentTime, curParticle.life, attribute_offsetPosition, attribute_trackPosition); 
	vec3 curOffset = cubicPos; 
	vec3 trackVec3 = curOffset - lastOffset; 
	trackVec3 = normalize(trackVec3); 
	float ratio = dot(localPosition.xyz, trackVec3); 
	float t = clamp(currentTime / curParticle.life, 0.0, 1.0); 
	t = 0.5 * (1.0 - cos(t * PI * 2.0)); 
	t = sqrt(t); 
	float speed = sqrt(dot(curOffset - lastOffset, curOffset - lastOffset)); 
	trackVec3 *= speed * 2.0 * t; 
	localPosition.xyz += ratio * trackVec3; 
	localPosition.xyz += curOffset; 
}



float particle( ParticleData curParticle ){
	trackPosition();
}

//##FilterEnd##
