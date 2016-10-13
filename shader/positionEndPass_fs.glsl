varying vec4 varying_position ;
void main(){
     gl_FragColor = vec4(varying_position.xyz,1.0);
}