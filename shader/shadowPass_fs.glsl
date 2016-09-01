uniform sampler2D diffuseTexture;
vec4 diffuseColor ;
varying vec2 varying_uv0;
varying vec4 varying_color;
varying vec4 varying_pos;



float unpackDepth(vec4 rgbaDepth){
    vec4 bitShift = vec4( 1.0 , 1.0/256.0 , 1.0/(256.0*256.0) , 1.0/(256.0*256.0*256.0) );
    float depth = dot(rgbaDepth,bitShift);
    return depth ;
}

void main() {
	diffuseColor = varying_color ;
    if( diffuseColor.w == 0.0 ){
		discard;
	}
	diffuseColor = texture2D(diffuseTexture , varying_uv0 );
    if( diffuseColor.w <= 0.3 ){
			discard;
	}

    gl_FragColor = vec4(varying_pos.zzz, 1.0);
}



