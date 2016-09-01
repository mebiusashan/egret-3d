 
struct Fog{
   vec3 fogColor  ;
   float globalDensity ;
   float fogStartDistance ;
   float fogFarDistance ;
   float fogAlpha ;
};

uniform float uniform_globalFog[7];
varying vec4 varying_mvPose;
void main(void){
    Fog fog; 
    fog.fogColor = vec3(uniform_globalFog[0],uniform_globalFog[1],uniform_globalFog[2]); 
    fog.globalDensity = uniform_globalFog[3]; 
    fog.fogStartDistance = uniform_globalFog[4] ;
    fog.fogFarDistance = uniform_globalFog[5] ;
    fog.fogAlpha = uniform_globalFog[6] ;
    
	float d = varying_mvPose.z ; 
	float distFog = max( 0.0 , d -  fog.fogStartDistance ) ; 
	diffuseColor.xyz = mix( diffuseColor.xyz,fog.fogColor, clamp(distFog/fog.fogFarDistance,0.0,1.0) * fog.fogAlpha ) ; 
}
