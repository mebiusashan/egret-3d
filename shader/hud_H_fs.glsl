varying vec2 varying_uv0;

uniform sampler2D diffuseTexture;

void main(void) {
	vec2 uv = vec2(varying_uv0.x ,1.0-varying_uv0.y);
	vec4 color = texture2D(diffuseTexture, uv);
	gl_FragColor  = color;
}
