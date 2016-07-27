uniform sampler2D aoTexture ;
uniform float aoPower ;
void main(void){
    float ao = texture2D( aoTexture , varying_uv1 ).x ;
	//vec3 cc = (1.0-ao) * ttt.xyz * (1.0-aoPower);
	diffuseColor.xyz *= (ao * aoPower) ; 
}

