//##FilterBegin## ##Particle##
uniform sampler2D diffuseTexture;
vec4 diffuseColor ;
vec4 globalColor = vec4(1.0, 1.0, 1.0, 1.0);//渐变色


void calcUVCoord(){

}


void main() {
    if( diffuseColor.w == 0.0 ){
		discard;
	}
	calcUVCoord();
	diffuseColor = texture2D(diffuseTexture , uv_0 );
    
    if( diffuseColor.w < materialSource.cutAlpha ){
		discard;
	}
}



//##FilterEnd##
