#define VERTEX_TEXTURES

attribute vec3 attribute_normal;
attribute vec4 attribute_color;

//uniform mat4 uniform_NormalMatrix;
uniform mat4 uniform_modelMatrix;
uniform mat4 uniform_viewMatrix;

varying vec4 varying_mvPose;

uniform vec3 waveVSData[4];
uniform float time ;
struct wave{
    vec3 wave_xyz_intensity_0 ;
    vec3 wave_xyz_intensity_1 ;
    vec3 wave_xyz_speed_0 ;
    vec3 wave_xyz_speed_1 ;
};

const float pi = 3.14 ;
vec3 calcWave2( float t , vec3 x, float amplitude, float waveLength ,float angularVelocity ,  vec3 waveDir ){
  
   angularVelocity = angularVelocity * 0.1;
   vec3 waveVector = waveDir ;
   float waveNumber = pi / waveLength;
   waveVector *= waveNumber ;
  
  vec3 temp ; 
   float kDotX0SubWt = dot(waveVector , x ) - angularVelocity * t  * 0.001;
   float A = amplitude * sin(kDotX0SubWt) ;
   temp.xz = waveDir.xz * A ;
   temp.y += amplitude * cos(kDotX0SubWt);
   temp = x - temp ;
   return temp ;
}

void main(void){
   wave wa ; 
    wa.wave_xyz_intensity_0 = vec3(waveVSData[0]) ; 
    wa.wave_xyz_intensity_1 = vec3(waveVSData[1]) ; 
    wa.wave_xyz_speed_0 = vec3(waveVSData[2]) ; 
    wa.wave_xyz_speed_1 = vec3(waveVSData[3]) ; 
    
    float tempTime = mod( time , 1000000.0 ); 
	vec3 newPose1 = calcWave2(tempTime,e_position,60.0, 500.0, 20.0,vec3(1.0,0.0,1.0)); 
	newPose1 += calcWave2(tempTime,e_position,130.0, 50.0, 20.0,vec3(1.0,0.0,-0.5)); 
	newPose1 += calcWave2(tempTime,e_position,90.0, 80.0, 20.0,vec3(1.0,0.0,-1.5)); 
    e_position = newPose1 ; 
    
    mat4 mvMatrix = mat4(uniform_ViewMatrix * uniform_ModelMatrix); 
    
    varying_mvPose = mvMatrix * vec4( e_position , 1.0 )  ; 
    
    mat4 normalMatrix = inverse(mvMatrix) ;
    normalMatrix = transpose(normalMatrix); 
    
    varying_eyeNormal = mat3(normalMatrix) * -attribute_normal ; 
    
    outPosition = varying_mvPose ; 
    varying_color = attribute_color; 
} 