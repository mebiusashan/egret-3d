uniform sampler2D specularTexture;
void main(void){
    specularColor.xyz *= texture2D( specularTexture , uv_0 ).xyz ;
}

