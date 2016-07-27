void main() {
    if(varying_color.w<=0.0){
       discard;
    }
    outColor.x =  outColor.y = outColor.z = varying_ViewPose.z/varying_ViewPose.w  ;
    outColor.w = 1.0 ;
    gl_FragColor = outColor ;
}
