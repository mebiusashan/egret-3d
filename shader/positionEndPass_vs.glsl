varying vec4 varying_position ;
void main(){
    gl_Position = uniform_ProjectionMatrix * outPosition ;
    varying_position = gl_Position.xyzw; 
}