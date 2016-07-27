uniform float uniformTime[4] ;
void main(void){
	e_position = attribute_position; 
varying_uv0 = attribute_uv0; 
  
  varying_color = attribute_color; 
vec4 curve = SmoothTriangleWave(vec4(sin(uniformTime[0]*0.001),1.0,1.0,1.0));
 e_position.xyz += curve.x * vec3(1.0,0.5,0.0) * ( attribute_color.xyz) ;
}