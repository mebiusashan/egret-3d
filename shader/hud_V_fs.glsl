varying vec2 varying_uv0;

uniform sampler2D diffuseTexture;

void main(void) {
	vec4 color = texture2D(diffuseTexture, varying_uv0);
	gl_FragColor  = color;
}
