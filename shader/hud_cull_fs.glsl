varying vec2 varying_uv0;

uniform sampler2D diffuseTexture;
uniform vec2 uv_scale;

void main(void) {
	vec2 uv_0 = varying_uv0;

	uv_0 *= uv_scale;
	vec4 color = texture2D(diffuseTexture, varying_uv0);
	float mask = 1.0;
	float f = uv_scale.y - varying_uv0.y;
	if (varying_uv0.y < uv_scale.y){
		if(f < 0.03 && f > 0.0){
			mask =1.0 - (f / 0.03 * 0.9 + 0.1);
		}
		else{
			mask = 0.1;
		}
	}
	color.xyz *= mask;
	gl_FragColor  = color;
}
