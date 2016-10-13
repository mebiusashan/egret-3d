//##FilterBegin## ##Particle##


attribute vec4 attribute_color;
attribute vec3 attribute_offsetPosition;

uniform mat4 uniform_cameraMatrix;
uniform float uniform_particleState[25];

uniform mat4 uniform_ViewMatrix;

const float PI = 3.1415926 ;
float currentTime = 0.0;
float totalTime = 0.0;

const float TrueOrFalse = 0.5;
const float Tiny = 0.0001;
vec4 localPosition = vec4(0.0,0.0,0.0,1.0);
vec3 velocityBaseVec3 = vec3(0.0,0.0,0.0);
vec3 velocityOverVec3 = vec3(0.0,0.0,0.0);
vec3 velocityForceVec3 = vec3(0.0,0.0,0.0);
vec2 velocityBezierWeightVec2 = vec2(1.0, 1.0);
vec2 velocityLimitVec2 = vec2(0.0,0.0);

vec3 followTargetPosition = vec3(0.0,0.0,0.0);
vec3 followTargetScale = vec3(1.0,1.0,1.0);
vec4 followTargetRotation = vec4(0.0,0.0,0.0,0.0);

varying vec3 varyingViewDir ;

float discard_particle = 0.0;

ParticleStateData particleStateData;

void e_discard(){
	discard_particle = 1.0;
}

struct ParticleStateData{
	float time;						
	float loop;						
	float worldSpace;				

	float scaleX;					
	float scaleY;					
	float scaleZ;					
	float rotationX;				
	float rotationY;				
	float rotationZ;				
	float rotationW;

	float positionX;				
	float positionY;				
	float positionZ;				

	float loopTime;					
	float delay;					
	float duration;					
	float gravity;					
	float velocityOverWorldSpace;	
	float velocityForceWorldSpace;	
	float velocityLimitDampen;

	float cameraScale;
	float speedScale;
	float lengthScale;
	float renderMode;
	float stayAtEnd;
};

mat4 buildRotMat4(vec3 rot)
{
	//____________
	float s;
	float c;

	s = sin(rot.x);
	c = cos(rot.x);
	
	mat4 ret = mat4(
	vec4(1.0, 0.0, 0.0, 0.0),
	vec4(0.0, c, s, 0.0),
	vec4(0.0, -s, c, 0.0),
	vec4(0.0, 0.0, 0.0, 1.0)
	);
	
	//____________
	s = sin(rot.y);
	c = cos(rot.y);
	
	ret = mat4(
	vec4(c, 0.0, -s, 0.0),
	vec4(0.0, 1.0, 0.0, 0.0),
	vec4(s, 0.0, c, 0.0),
	vec4(0.0, 0.0, 0.0, 1.0)
	) * ret;


	//____________
	s = sin(rot.z);
	c = cos(rot.z);

	ret = mat4(
	vec4(c, s, 0.0, 0.0),
	vec4(-s, c, 0.0, 0.0),
	vec4(0.0, 0.0, 1.0, 0.0),
	vec4(0.0, 0.0, 0.0, 1.0)
	) * ret;

	return ret;
}

mat4 buildMat4Quat(vec4 quat){

  float xx = quat.x * quat.x;
  float xy = quat.x * quat.y;
  float xz = quat.x * quat.z;
  float xw = quat.x * quat.w;

  float yy = quat.y * quat.y;
  float yz = quat.y * quat.z;
  float yw = quat.y * quat.w;

  float zz = quat.z * quat.z;
  float zw = quat.z * quat.w;

   return mat4(
	   1.0 - 2.0 * (yy + zz),		2.0 * (xy + zw),		2.0 * (xz - yw),		0,
	   2.0 * (xy - zw),				1.0 - 2.0 * (xx + zz),	2.0 * (yz + xw),		0,
	   2.0 * (xz + yw),				2.0 * (yz - xw),		1.0 - 2.0 * (xx + yy),	0,
	   0.0,							0.0,					0.0,					1
   );
}

float easeInOut(float t){
	t = clamp(t, 0.0, 1.0);
	float p0;
	float p1;
	float p2;
	if(t <= 0.5){ 
		p0 = 0.0; 
		p1 = 0.0; 
		p2 = 0.5; 
	}else{ 
		p0 = 0.5; 
		p1 = 1.0; 
		p2 = 1.0; 
		t -= 0.5;
	}
	t *= 2.0;

	p0 = mix(p0, p1, t);
	p1 = mix(p1, p2, t);

	p0 = mix(p0, p1, t);
	return p0;

}
vec3 cubicPos;
void calcCubicPos(float time, float totalTime, vec3 fromPos, vec3 endPos){
	
}
void trackPosition(){
}


void main(void) {

	particleStateData.time							= uniform_particleState[0];
	particleStateData.loop							= uniform_particleState[1];
	particleStateData.worldSpace					= uniform_particleState[2];
	particleStateData.scaleX						= uniform_particleState[3];
	particleStateData.scaleY						= uniform_particleState[4];
	particleStateData.scaleZ						= uniform_particleState[5];
	particleStateData.rotationX						= uniform_particleState[6];
	particleStateData.rotationY						= uniform_particleState[7];
	particleStateData.rotationZ						= uniform_particleState[8];
	particleStateData.rotationW						= uniform_particleState[9];
	particleStateData.positionX						= uniform_particleState[10];
	particleStateData.positionY						= uniform_particleState[11];
	particleStateData.positionZ						= uniform_particleState[12];
	particleStateData.loopTime						= uniform_particleState[13];
	particleStateData.delay							= uniform_particleState[14];
	particleStateData.duration						= uniform_particleState[15];
	particleStateData.gravity						= uniform_particleState[16];
	particleStateData.velocityOverWorldSpace		= uniform_particleState[17];
	particleStateData.velocityForceWorldSpace		= uniform_particleState[18];
	particleStateData.velocityLimitDampen			= uniform_particleState[19];

	particleStateData.cameraScale					= uniform_particleState[20];
	particleStateData.speedScale					= uniform_particleState[21];
	particleStateData.lengthScale					= uniform_particleState[22];
	particleStateData.renderMode					= uniform_particleState[23];
	particleStateData.stayAtEnd						= uniform_particleState[24];

    //varying_mvPose = mvMatrix * vec4( e_position , 1.0 ) ; 
	mat4 modeViewMatrix = mat4(uniform_ViewMatrix * uniform_ModelMatrix); 
	outPosition = localPosition = vec4(e_position, 1.0);

}


//##FilterEnd##
