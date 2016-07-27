uniform sampler2D maskTexture ;
void main(void){
	float maskAlpha = texture2D( maskTexture , uv_0 ).x;
	if(maskAlpha * diffuseColor.w < 0.001){
		discard;
	}
    materialSource.alpha *= maskAlpha;

}

