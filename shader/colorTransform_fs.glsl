uniform vec4 uniform_colorTransformVec4 ;
uniform mat4 uniform_colorTransformM44 ;
void main(){
	diffuseColor = uniform_colorTransformM44 * diffuseColor;
	diffuseColor = diffuseColor + uniform_colorTransformVec4;
}
