struct Fog{
   vec3 fogColor  ;
   float globalDensity ;
   vec3 distance ;
};
varying vec4 varying_pos;
uniform float uniform_globalFog[7];
void main(void){
    Fog fog; 
    fog.fogColor = vec3(uniform_globalFog[0],uniform_globalFog[1],uniform_globalFog[2]); 
    fog.globalDensity = uniform_globalFog[3]; 
    fog.distance = vec2(uniform_globalFog[4], uniform_globalFog[5]); 
    float d = distance(uniform_eyepos,varying_pos.xyz); 
    float distFog = max( 0.0 , d - fog.distance.x )* fog.distance.y; 
    float fogFactor = (1.0-exp( -distFog * 0.000001 * fog.globalDensity )) ; 
    diffuseColor.xyz = mix( diffuseColor.xyz  , fog.fogColor , min(fogFactor,1.0) ); 
}




 