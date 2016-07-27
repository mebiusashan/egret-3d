varying vec3 varying_ViewDir; 
uniform vec3 uniform_eyepos; 
void main(void){ 
    varying_ViewDir = (uniform_eyepos.xyz - e_position) ; 
}