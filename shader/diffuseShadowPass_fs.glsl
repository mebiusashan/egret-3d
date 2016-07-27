uniform sampler2D diffuseTexture;
vec4 diffuseColor ;
void main() {
	diffuseColor = varying_color ;
    if( diffuseColor.w == 0.0 ){
		discard;
	}
	diffuseColor = texture2D(diffuseTexture , uv_0 );
    if( diffuseColor.w <= 0.3 ){
			discard;
	}
}



