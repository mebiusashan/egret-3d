varying vec4 varying_position ;

vec4 EncodeFloatRGBA( float v ) {
  vec4 enc = vec4(1.0, 255.0, 65025.0, 16581375.0) * v;
  enc = enc-fract(enc);
  enc -= enc.yzww * vec4(1.0/255.0,1.0/255.0,1.0/255.0,0.0);
  return enc;
}

float DecodeFloatRGBA( vec4 rgba ) {
  return dot( rgba, vec4(1.0, 1.0/255.0, 1.0/65025.0, 1.0/16581375.0) );
}

float packRPass( vec4 color ){
    return DecodeFloatRGBA(color);
}

float packGPass( vec3 normal ){
    return DecodeFloatRGBA(vec4(normal,1.0));
}

float packBPass( vec3 specular , float gloss ){
    return DecodeFloatRGBA(vec4(specular,gloss));
}

float packAPass( float d ){
    return d;
}

void main(){
    //color     |c.x|c.y|c.z|id
    //normal    |n.x|n.y|   | 
    //specular  |x  |y  |z  |gloss
    //d rgba    |d.x|d.y|d.z|d.w

    vec4 gBuffer ;
    // gBuffer.x = packRPass(diffuseColor);
    // gBuffer.y = packGPass(normal);
    // gBuffer.z = packBPass(specularColor.xyz,materialSource.shininess);
    // gBuffer.w = varying_position.z/varying_position.w;
    gl_FragColor = vec4(vec3(varying_position.z),1.0) ; 
}
