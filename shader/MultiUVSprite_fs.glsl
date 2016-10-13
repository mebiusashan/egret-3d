uniform vec4 multiUV ; 
uniform sampler2D diffuseTexture;
vec4 diffuseColor ;
void main() {
    vec2 scale = vec2(1.0/multiUV.xy) ; 

    float a = mod(multiUV.w , multiUV.x) ;
    float b = (multiUV.w / multiUV.x) - fract(multiUV.w / multiUV.x) ; 

    vec2 rec = scale * vec2(a,b) + uv_0 * scale;
	diffuseColor = texture2D(diffuseTexture , rec ); 

    if( diffuseColor.w < materialSource.cutAlpha ){
		discard;
	}
}



