uniform samplerCube diffuseTexture ;
varying vec3 varying_pos;
vec4 diffuseColor ;
void main() {
    if( diffuseColor.w == 0.0 ){
		discard;
	}

	vec3 uvw = normalize(varying_pos.xyz);
	diffuseColor = vec4(textureCube(diffuseTexture, uvw.xyz));
    
    if( diffuseColor.w <= materialSource.cutAlpha ){
		discard;
	}else
		diffuseColor.xyz *= diffuseColor.w ;
}