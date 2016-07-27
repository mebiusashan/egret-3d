attribute vec4 attribute_boneIndex;
attribute vec4 attribute_boneWeight;
attribute vec3 attribute_normal;
attribute vec4 attribute_color;

vec4 e_boneIndex = vec4(0.0, 0.0, 0.0, 0.0);
vec4 e_boneWeight = vec4(0.0, 0.0, 0.0, 0.0);

const int bonesNumber = 0;
uniform vec4 uniform_PoseMatrix[bonesNumber];
//uniform mat4 uniform_NormalMatrix;
varying vec4 varying_mvPose  ;

mat4 buildMat4(int index){

  vec4 quat = uniform_PoseMatrix[index * 2 + 0];

  vec4 translation = uniform_PoseMatrix[index * 2 + 1];

//  float xx = quat.x * quat.x;
//  float xy = quat.x * quat.y;
//  float xz = quat.x * quat.z;
//  float xw = quat.x * quat.w;
//
//  float yy = quat.y * quat.y;
//  float yz = quat.y * quat.z;
//  float yw = quat.y * quat.w;
//
//  float zz = quat.z * quat.z;
//  float zw = quat.z * quat.w;
//
//  mat4 matrix = mat4(
//	   1.0 - 2.0 * (yy + zz),		2.0 * (xy + zw),		2.0 * (xz - yw),		0,
//	   2.0 * (xy - zw),				1.0 - 2.0 * (xx + zz),	2.0 * (yz + xw),		0,
//	   2.0 * (xz + yw),				2.0 * (yz - xw),		1.0 - 2.0 * (xx + yy),	0,
//	   translation.x,				translation.y,			translation.z,			1
//   );


  float xy2 = 2.0 * quat.x * quat.y;
  float xz2 = 2.0 * quat.x * quat.z;
  float xw2 = 2.0 * quat.x * quat.w;
  float yz2 = 2.0 * quat.y * quat.z;
  float yw2 = 2.0 * quat.y * quat.w;
  float zw2 = 2.0 * quat.z * quat.w;
  float xx = quat.x * quat.x;
  float yy = quat.y * quat.y;
  float zz = quat.z * quat.z;
  float ww = quat.w * quat.w;

  mat4 matrix = mat4(
	   xx - yy - zz + ww, xy2 + zw2, xz2 - yw2, 0,
	   xy2 - zw2, -xx + yy - zz + ww, yz2 + xw2, 0,
	   xz2 + yw2, yz2 - xw2, -xx - yy + zz + ww, 0,
	   translation.x, translation.y, translation.z, 1
   );

//   matrix[0].x *= translation.w;
//   matrix[0].y *= translation.w;
//   matrix[0].z *= translation.w;
//
//   matrix[1].x *= translation.w;
//   matrix[1].y *= translation.w;
//   matrix[1].z *= translation.w;
//
//   matrix[2].x *= translation.w;
//   matrix[2].y *= translation.w;
//   matrix[2].z *= translation.w;

   return matrix;
}

void main(void){
	//varying_color = attribute_color; 
	e_boneIndex = attribute_boneIndex;
	e_boneWeight = attribute_boneWeight;

	vec4 temp_position = vec4(attribute_position, 1.0) ;
	vec4 temp_normal = vec4(attribute_normal, 0.0) ;

	mat4 m0 = buildMat4(int(e_boneIndex.x));
	mat4 m1 = buildMat4(int(e_boneIndex.y));
	mat4 m2 = buildMat4(int(e_boneIndex.z));
	mat4 m3 = buildMat4(int(e_boneIndex.w));

	outPosition = m0 * temp_position * e_boneWeight.x;
	outPosition += m1 * temp_position * e_boneWeight.y;
	outPosition += m2 * temp_position * e_boneWeight.z;
	outPosition += m3 * temp_position * e_boneWeight.w;

	e_position = outPosition.xyz;

	vec4 temp_n ;
	temp_n = m0 * temp_normal * e_boneWeight.x;
	temp_n += m1 * temp_normal * e_boneWeight.y;
	temp_n += m2 * temp_normal * e_boneWeight.z;
	temp_n += m3 * temp_normal * e_boneWeight.w;
	
    mat4 mvMatrix = mat4(uniform_ViewMatrix * uniform_ModelMatrix); 
    varying_mvPose = mvMatrix * vec4( e_position , 1.0 ) ; 
    
    mat4 normalMatrix = inverse(mvMatrix) ;
    normalMatrix = transpose(normalMatrix); 
    
    varying_eyeNormal = mat3(normalMatrix) * -attribute_normal ; 
    
    outPosition.xyzw = varying_mvPose.xyzw ; 
    varying_color = attribute_color; 
}