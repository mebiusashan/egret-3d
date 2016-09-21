//##FilterBegin## ##Particle##
varying vec4 varying_pos;
float particle( ParticleData curParticle ){
	return 1.0 ;
}

mat4 buildModelMatrix(vec4 quat, vec3 scale, vec3 position)
{
	//缩放
	mat4 ret = mat4( 
		vec4(scale.x, 0.0, 0.0, 0.0), 
		vec4(0.0, scale.y, 0.0, 0.0), 
		vec4(0.0, 0.0, scale.z, 0.0), 
		vec4(0.0, 0.0, 0.0, 1.0) 
	);
	//旋转
	ret = buildMat4Quat(quat) * ret; 
	 
	//平移
	ret[3][0] = position.x;
	ret[3][1] = position.y;
	ret[3][2] = position.z;

	return ret;
}

vec3 calcParticleMove(vec3 distanceXYZ){
	//限速
	if(velocityLimitVec2.y > TrueOrFalse){
		vec3 temp = distanceXYZ * distanceXYZ;
		float distanceCurrent = sqrt(temp.x + temp.y + temp.z);
		float distanceLimit = velocityLimitVec2.x;
		if(distanceLimit < Tiny){
			return vec3(0.0);
		}

		

		if(distanceCurrent > distanceLimit){
			//float ratio = (distanceCurrent - distanceLimit) * (1.0 - particleStateData.velocityLimitDampen) + distanceLimit;
			//distanceXYZ *= ratio / distanceCurrent;

			float nowFrame = currentTime / 0.017;
			float dampen = 1.0 - particleStateData.velocityLimitDampen;
			float startDistance = (distanceCurrent - distanceLimit) / nowFrame;
			float distanceResult = 0.0;
			float tempDistance = startDistance;
			for(int i = 1; i < 600; i++){
				distanceResult += tempDistance;
				tempDistance *= dampen;
				if(float(i) > nowFrame)
					break;
			}

			distanceXYZ *= (distanceResult + distanceLimit) / distanceCurrent;

		}
	}
	return distanceXYZ;
}

mat4 getRenderModeMatrix(mat4 cameraMatrix, mat4 modelMatrix){
	return cameraMatrix;
}

//rewrite by stretched
float updateStretchedBillBoard(vec4 startPos, vec4 newPos){
	return 1.0;	
}

void main(void) {
	if(discard_particle > TrueOrFalse){ 
		outPosition = vec4(0.0,0.0,0.0,0.0); 
	}else{

		//vec3 velocityBaseVec3
		//vec3 velocityOverVec3
		//vec2 velocityLimitVec2
		//vec3 velocityForceVec3
		//vec2 velocityBezierWeightVec2
		//float currentTime

		//相对发射器的位置
		vec3 position_emitter = attribute_offsetPosition;

		vec3 velocityLocalVec3 = velocityBaseVec3 * currentTime;
		vec3 velocityWorldVec3 = vec3(0.0,0.0,0.0);
		vec3 velocityMultiVec3 = vec3(0.0,0.0,0.0);

		if(particleStateData.velocityOverWorldSpace < TrueOrFalse){
			velocityLocalVec3 += velocityOverVec3;		
		}else{
			velocityWorldVec3 += velocityOverVec3;
		}

		if(particleStateData.velocityForceWorldSpace < TrueOrFalse){
			velocityLocalVec3 += velocityForceVec3;
		}else{
			velocityWorldVec3 += velocityForceVec3;
		}

		if(particleStateData.worldSpace > TrueOrFalse){
			//followTargetPosition
			//followTargetScale
			//followTargetRotation

		}else{
			followTargetPosition.x = particleStateData.positionX;
			followTargetPosition.y = particleStateData.positionY;
			followTargetPosition.z = particleStateData.positionZ;

			//followTargetScale.x = particleStateData.scaleX;
			//followTargetScale.y = particleStateData.scaleY;
			//followTargetScale.z = particleStateData.scaleZ;

			followTargetRotation.x = particleStateData.rotationX;
			followTargetRotation.y = particleStateData.rotationY;
			followTargetRotation.z = particleStateData.rotationZ;
			followTargetRotation.w = particleStateData.rotationW;

		}

		mat4 followRotQuat = buildMat4Quat(followTargetRotation);
		velocityLocalVec3 = (followRotQuat * vec4(velocityLocalVec3, 1.0)).xyz;

		mat4 modelMatrix = buildModelMatrix(followTargetRotation, followTargetScale, followTargetPosition);
		if(particleStateData.renderMode == 4.0){
			position_emitter.xyz += localPosition.xyz;
		}
		position_emitter = (modelMatrix * vec4(position_emitter, 1.0)).xyz; 

		//固定速度+速度叠加+加速度叠加
		velocityMultiVec3 = velocityLocalVec3 + velocityWorldVec3;
		//限制速度（计算平均速度）
		velocityMultiVec3 = calcParticleMove(velocityMultiVec3);
		//重力
		velocityMultiVec3.y -= 4.9 * currentTime * currentTime * particleStateData.gravity;// 0.5 * g * t * t;
		
		
		//是否需要修改local position指向运动方向，直接修改localPosition
		vec3 origPosition = position_emitter;
		position_emitter += velocityMultiVec3; 

		float dirEnable = updateStretchedBillBoard(vec4(origPosition, 1.0), vec4(position_emitter, 1.0));
		if(dirEnable > TrueOrFalse){
			if(particleStateData.renderMode == 4.0){
				outPosition.xyz = position_emitter.xyz;
			}else{
				mat4 billboardMatrix = getRenderModeMatrix(uniform_cameraMatrix, modelMatrix);
				outPosition = billboardMatrix * localPosition;
				outPosition.xyz += position_emitter.xyz;
			}
			outPosition = uniform_ViewMatrix * outPosition;
		}else{
			outPosition = vec4(0.0,0.0,0.0,0.0); 
		}
	}
	gl_Position = uniform_ProjectionMatrix * outPosition ; 
	varying_pos = gl_Position;
}
	
//##FilterEnd##