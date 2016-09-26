//##FilterBegin## ##Particle##

varying vec3 varying_textureSheetData;
//start const

uniform float uniform_textureSheet[5];
//tileX tileY circles frameFrom frameTo

uniform float uniform_frameBezier1[35];
uniform float uniform_frameBezier2[35];

vec2 getSheetOffset(float frame, float tileX, float tileY)
{
	frame = floor(frame);
	vec2 ret = vec2(0.0); 
	ret.x = (1.0 / tileX) * mod(frame, tileX); 
	ret.y = frame / tileX;

	ret.y = floor(ret.y);
	ret.y = (1.0 / tileY) * ret.y; 
	return ret;
}

void calcUVCoord() {
	vec2 rectUV = vec2(1.0 / uniform_textureSheet[0], 1.0 / uniform_textureSheet[1]);
	uv_0.xy *= rectUV;
	
	float frame = varying_textureSheetData.x + varying_textureSheetData.y;
	float currentTime = varying_particleData.x * uniform_textureSheet[2];
	currentTime = mod(currentTime, varying_particleData.y);

	float b1 = calcBezierSize(uniform_frameBezier1, currentTime2, varying_particleData.y);
	float b2 = calcBezierSize(uniform_frameBezier2, currentTime2, varying_particleData.y);
	float bezierFrame = mix(b1, b2, varying_particleData.z);
	bezierFrame = clamp(bezierFrame, uniform_textureSheet[3], uniform_textureSheet[4]);
	frame += bezierFrame;
	uv_0.xy += getSheetOffset(frame, uniform_textureSheet[0], uniform_textureSheet[1]);

}
//##FilterEnd##
