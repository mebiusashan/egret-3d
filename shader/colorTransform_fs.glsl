uniform float uniform_colorTransformAlpha ;
uniform mat4 uniform_colorTransformM44 ;
void main(){
	diffuseColor.xyz = (uniform_colorTransformM44 * vec4(diffuseColor.xyz, 1.0)).xyz;
	diffuseColor.w *= diffuseColor.w * uniform_colorTransformAlpha;
	//alpha mode
	//if(alphaMode){ 
	//	diffuseColor.xyz *= uniform_colorTransformAlpha; 
	//}
}
