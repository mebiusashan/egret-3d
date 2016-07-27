varying vec4 varying_pos;
uniform float uniform_colorGradientsSource[10] ;
void main(void){

	vec3 posStart = vec3(uniform_colorGradientsSource[0], uniform_colorGradientsSource[1], uniform_colorGradientsSource[2]); 
	vec3 posEnd = vec3(uniform_colorGradientsSource[3], uniform_colorGradientsSource[4], uniform_colorGradientsSource[5]); 
	vec4 color = vec4(uniform_colorGradientsSource[6], uniform_colorGradientsSource[7], uniform_colorGradientsSource[8], uniform_colorGradientsSource[9]); 
	color.w = color.w * clamp((varying_pos.y - posStart.y) / (posEnd.y - posStart.y), 0.0, 1.0); 

	diffuseColor.xyz = clamp(diffuseColor.xyz / diffuseColor.w,0.0,1.0); 
	diffuseColor.xyz = diffuseColor.xyz * (1.0 - color.w) + color.xyz * color.w; 

	

}




 