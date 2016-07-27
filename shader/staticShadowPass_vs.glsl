attribute vec4 attribute_color;

vec4 e_boneIndex = vec4(0.0, 0.0, 0.0, 0.0);
vec4 e_boneWeight = vec4(0.0, 0.0, 0.0, 0.0);

void main(void){
	varying_color = attribute_color; 

	outPosition = vec4(attribute_position, 1.0) ;
	e_position = outPosition.xyz;

	outPosition = uniform_modelMatrix * uniform_viewMatrix * outPosition; 
    
}