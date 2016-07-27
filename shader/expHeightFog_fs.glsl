struct Fog{
   vec3 fogColor  ;
   float globalDensity ;
   float fogStartDistance ;
   float fogHeightStart ;
   float fogAlpha ;
};
varying vec4 varying_pos;
uniform float uniform_globalFog[7];

// original color of the pixel
// camera to point distance
// camera position
// camera to point vector
vec3 applyFog( float yDistance, vec3  vpos , Fog fog ) 
{
    float d = distance(uniform_eyepos,varying_pos.xyz); 
    float distFog = max( 0.0 , d - fog.fogStartDistance ) ; 
    float yFog = max(0.0, (vpos.y - fog.fogHeightStart - yDistance) )  ; 
    float fogAmount =  1.0-(exp(-distFog * fog.globalDensity )) + (exp(-yFog * fog.globalDensity )); 
    return mix( diffuseColor.xyz,fog.fogColor, clamp(fogAmount,0.0,fog.fogAlpha) );
}

 
void main(void){
    Fog fog; 
    fog.fogColor = vec3(uniform_globalFog[0],uniform_globalFog[1],uniform_globalFog[2]); 
    fog.globalDensity = uniform_globalFog[3]; 
    fog.fogStartDistance = uniform_globalFog[4] ; 
    fog.fogHeightStart = uniform_globalFog[5] ;
    fog.fogAlpha = uniform_globalFog[6] ; 
    
    float yd = uniform_eyepos.y - varying_pos.y ;
    diffuseColor.xyz = applyFog( yd , varying_pos.xyz , fog );
}




 