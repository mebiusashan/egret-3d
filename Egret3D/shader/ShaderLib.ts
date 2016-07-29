module egret3d {
	/**
	* @private
	*/
	export class ShaderLib {
		static lib: { [key:string]: string } = 
		{
 			"alphaMask_fs":
			"uniform sampler2D maskTexture ; \n" +
			"void main(void){ \n" +
			"float maskAlpha = texture2D( maskTexture , uv_0 ).x; \n" +
			"if(maskAlpha * diffuseColor.w < 0.001){ \n" +
			"discard; \n" +
			"} \n" +
			"materialSource.alpha *= maskAlpha; \n" +
			"} \n",

			"AOMap_fs":
			"uniform sampler2D aoTexture ; \n" +
			"uniform float aoPower ; \n" +
			"void main(void){ \n" +
			"float ao = texture2D( aoTexture , varying_uv1 ).x ; \n" +
			"diffuseColor.xyz *= (ao * aoPower) ; \n" +
			"} \n",

			"baseShadowPass_fs":
			"varying vec2 varying_uv0; \n" +
			"varying vec4 varying_color; \n" +
			"vec4 outColor ; \n" +
			"vec2 uv_0; \n" +
			"void main() { \n" +
			"uv_0 = varying_uv0; \n" +
			"} \n",

			"baseShadowPass_vs":
			"attribute vec3 attribute_position; \n" +
			"attribute vec2 attribute_uv0; \n" +
			"attribute vec4 attribute_color; \n" +
			"uniform mat4 uniform_ProjectionMatrix ; \n" +
			"varying vec2 varying_uv0; \n" +
			"varying vec4 varying_color; \n" +
			"vec3 e_position = vec3(0.0, 0.0, 0.0); \n" +
			"vec4 outPosition ; \n" +
			"void main(void){ \n" +
			"e_position = attribute_position; \n" +
			"varying_color = attribute_color; \n" +
			"varying_uv0 = attribute_uv0; \n" +
			"} \n",

			"base_fs":
			"#extension GL_OES_standard_derivatives : enable \n" +
			"varying vec3 varying_eyeNormal  ; \n" +
			"varying vec2 varying_uv0; \n" +
			"varying vec4 varying_color; \n" +
			"uniform mat4 uniform_ViewMatrix ; \n" +
			"vec4 outColor ; \n" +
			"vec4 diffuseColor ; \n" +
			"vec4 specularColor ; \n" +
			"vec4 ambientColor; \n" +
			"vec4 light ; \n" +
			"vec3 normal; \n" +
			"vec2 uv_0; \n" +
			"vec3 flatNormals(vec3 pos) { \n" +
			"vec3 fdx = dFdx(pos); \n" +
			"vec3 fdy = dFdy(pos); \n" +
			"return normalize(cross(fdx, fdy)); \n" +
			"} \n" +
			"void main() { \n" +
			"diffuseColor  = vec4(1.0,1.0,1.0,1.0); \n" +
			"specularColor = vec4(0.0,0.0,0.0,0.0); \n" +
			"ambientColor  = vec4(0.0,0.0,0.0,0.0); \n" +
			"light         = vec4(1.0,1.0,1.0,1.0); \n" +
			"normal = normalize(varying_eyeNormal) ; \n" +
			"uv_0 = varying_uv0; \n" +
			"} \n",

			"base_vs":
			"attribute vec3 attribute_position; \n" +
			"attribute vec3 attribute_normal; \n" +
			"attribute vec4 attribute_color; \n" +
			"attribute vec2 attribute_uv0; \n" +
			"vec3 e_position = vec3(0.0, 0.0, 0.0); \n" +
			"uniform mat4 uniform_ModelMatrix ; \n" +
			"uniform mat4 uniform_ViewMatrix ; \n" +
			"uniform mat4 uniform_ProjectionMatrix ; \n" +
			"varying vec3 varying_eyeNormal  ; \n" +
			"varying vec2 varying_uv0; \n" +
			"varying vec4 varying_color; \n" +
			"vec4 outPosition ; \n" +
			"mat4 transpose(mat4 inMatrix) { \n" +
			"vec4 i0 = inMatrix[0]; \n" +
			"vec4 i1 = inMatrix[1]; \n" +
			"vec4 i2 = inMatrix[2]; \n" +
			"vec4 i3 = inMatrix[3]; \n" +
			"mat4 outMatrix = mat4( \n" +
			"vec4(i0.x, i1.x, i2.x, i3.x), \n" +
			"vec4(i0.y, i1.y, i2.y, i3.y), \n" +
			"vec4(i0.z, i1.z, i2.z, i3.z), \n" +
			"vec4(i0.w, i1.w, i2.w, i3.w) \n" +
			"); \n" +
			"return outMatrix; \n" +
			"} \n" +
			"mat4 inverse(mat4 m) { \n" +
			"float \n" +
			"a00 = m[0][0], a01 = m[0][1], a02 = m[0][2], a03 = m[0][3], \n" +
			"a10 = m[1][0], a11 = m[1][1], a12 = m[1][2], a13 = m[1][3], \n" +
			"a20 = m[2][0], a21 = m[2][1], a22 = m[2][2], a23 = m[2][3], \n" +
			"a30 = m[3][0], a31 = m[3][1], a32 = m[3][2], a33 = m[3][3], \n" +
			"b00 = a00 * a11 - a01 * a10, \n" +
			"b01 = a00 * a12 - a02 * a10, \n" +
			"b02 = a00 * a13 - a03 * a10, \n" +
			"b03 = a01 * a12 - a02 * a11, \n" +
			"b04 = a01 * a13 - a03 * a11, \n" +
			"b05 = a02 * a13 - a03 * a12, \n" +
			"b06 = a20 * a31 - a21 * a30, \n" +
			"b07 = a20 * a32 - a22 * a30, \n" +
			"b08 = a20 * a33 - a23 * a30, \n" +
			"b09 = a21 * a32 - a22 * a31, \n" +
			"b10 = a21 * a33 - a23 * a31, \n" +
			"b11 = a22 * a33 - a23 * a32, \n" +
			"det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06; \n" +
			"return mat4( \n" +
			"a11 * b11 - a12 * b10 + a13 * b09, \n" +
			"a02 * b10 - a01 * b11 - a03 * b09, \n" +
			"a31 * b05 - a32 * b04 + a33 * b03, \n" +
			"a22 * b04 - a21 * b05 - a23 * b03, \n" +
			"a12 * b08 - a10 * b11 - a13 * b07, \n" +
			"a00 * b11 - a02 * b08 + a03 * b07, \n" +
			"a32 * b02 - a30 * b05 - a33 * b01, \n" +
			"a20 * b05 - a22 * b02 + a23 * b01, \n" +
			"a10 * b10 - a11 * b08 + a13 * b06, \n" +
			"a01 * b08 - a00 * b10 - a03 * b06, \n" +
			"a30 * b04 - a31 * b02 + a33 * b00, \n" +
			"a21 * b02 - a20 * b04 - a23 * b00, \n" +
			"a11 * b07 - a10 * b09 - a12 * b06, \n" +
			"a00 * b09 - a01 * b07 + a02 * b06, \n" +
			"a31 * b01 - a30 * b03 - a32 * b00, \n" +
			"a20 * b03 - a21 * b01 + a22 * b00) / det; \n" +
			"} \n" +
			"void main(void){ \n" +
			"e_position = attribute_position; \n" +
			"varying_color = attribute_color; \n" +
			"varying_uv0 = attribute_uv0; \n" +
			"} \n",

			"bezier":
			"vec2 quadratic_bezier(vec2 A, vec2 B, vec2 C, float t) \n" +
			"{ \n" +
			"vec2 D = mix(A, B, t); \n" +
			"vec2 E = mix(B, C, t); \n" +
			"return mix(D, E, t); \n" +
			"} \n" +
			"vec2 cubic_bezier(vec2 A, vec2 B, vec2 C, vec2 D, float t) \n" +
			"{ \n" +
			"vec2 E = mix(A, B, t); \n" +
			"vec2 F = mix(B, C, t); \n" +
			"vec2 G = mix(C, D, t); \n" +
			"return quadratic_bezier(E, F, G, t); \n" +
			"} \n",

			"bloom_fs":
			"varying vec2 varying_uv0; \n" +
			"uniform sampler2D diffuseTexture; \n" +
			"void main() \n" +
			"{ \n" +
			"vec2 uv = vec2(varying_uv0.x,1.0-varying_uv0.y); \n" +
			"float dx = 1.0/float(1024.0); \n" +
			"float dy = 1.0/float(1024.0); \n" +
			"vec4 outColor ; \n" +
			"vec4 color = outColor = texture2D(diffuseTexture,uv.xy); \n" +
			"color += texture2D(diffuseTexture,uv.xy+vec2(dx*3.0,0.0)); \n" +
			"color += texture2D(diffuseTexture,uv.xy+vec2(0.0,dy)); \n" +
			"color += texture2D(diffuseTexture,uv.xy+vec2(dx*3.0,dy)); \n" +
			"color += texture2D(diffuseTexture,uv.xy+vec2(0.0,dy*2.0)); \n" +
			"color += texture2D(diffuseTexture,uv.xy+vec2(dx*3.0,dy*2.0)); \n" +
			"color += texture2D(diffuseTexture,uv.xy+vec2(0.0,dy*3.0)); \n" +
			"color += texture2D(diffuseTexture,uv.xy+vec2(dx*3.0,dy*3.0)); \n" +
			"color /= 8.0; \n" +
			"vec4 cout = vec4(0.0,0.0,0.0,0.0); \n" +
			"float lum = color.x * 0.3 + color.y *0.59 + color.z * 0.11; \n" +
			"vec4 p = color*(lum/0.1); \n" +
			"p /= vec4(vec4(1.0,1.0,1.0,0.0)+p); \n" +
			"float luml = (p.x+p.y+p.z)/3.0; \n" +
			"if (luml > 0.8) \n" +
			"{ \n" +
			"cout = color ; \n" +
			"} \n" +
			"gl_FragColor = cout ; \n" +
			"} \n",

			"colorGradients_fs":
			"varying vec4 varying_pos; \n" +
			"uniform float uniform_colorGradientsSource[10] ; \n" +
			"void main(void){ \n" +
			"vec3 posStart = vec3(uniform_colorGradientsSource[0], uniform_colorGradientsSource[1], uniform_colorGradientsSource[2]); \n" +
			"vec3 posEnd = vec3(uniform_colorGradientsSource[3], uniform_colorGradientsSource[4], uniform_colorGradientsSource[5]); \n" +
			"vec4 color = vec4(uniform_colorGradientsSource[6], uniform_colorGradientsSource[7], uniform_colorGradientsSource[8], uniform_colorGradientsSource[9]); \n" +
			"color.w = color.w * clamp((varying_pos.y - posStart.y) / (posEnd.y - posStart.y), 0.0, 1.0); \n" +
			"diffuseColor.xyz = clamp(diffuseColor.xyz / diffuseColor.w,0.0,1.0); \n" +
			"diffuseColor.xyz = diffuseColor.xyz * (1.0 - color.w) + color.xyz * color.w; \n" +
			"} \n" +
			"  \n",

			"colorTransform_fs":
			"uniform vec4 uniform_colorTransformVec4 ; \n" +
			"uniform mat4 uniform_colorTransformM44 ; \n" +
			"void main(){ \n" +
			"diffuseColor = uniform_colorTransformM44 * diffuseColor; \n" +
			"diffuseColor = diffuseColor + uniform_colorTransformVec4; \n" +
			"} \n",

			"color_fragment":
			"vec4 diffuseColor ; \n" +
			"void main() { \n" +
			"if( diffuseColor.w == 0.0 ){ \n" +
			"discard; \n" +
			"} \n" +
			"diffuseColor = vec4(1.0, 1.0, 1.0, 1.0); \n" +
			"if( diffuseColor.w <= materialSource.cutAlpha ){ \n" +
			"discard; \n" +
			"}else \n" +
			"diffuseColor.xyz *= diffuseColor.w ; \n" +
			"} \n",

			"combin_fs":
			"uniform sampler2D colorTexture; \n" +
			"void main(void){ \n" +
			"} \n",

			"cube_fragment":
			"uniform samplerCube diffuseTexture ; \n" +
			"varying vec3 varying_pos; \n" +
			"vec4 diffuseColor ; \n" +
			"void main() { \n" +
			"if( diffuseColor.w == 0.0 ){ \n" +
			"discard; \n" +
			"} \n" +
			"vec3 uvw = normalize(varying_pos.xyz); \n" +
			"diffuseColor = vec4(textureCube(diffuseTexture, uvw.xyz)); \n" +
			"if( diffuseColor.w <= materialSource.cutAlpha ){ \n" +
			"discard; \n" +
			"}else \n" +
			"diffuseColor.xyz *= diffuseColor.w ; \n" +
			"} \n",

			"cube_vertex":
			"varying vec3 varying_pos; \n" +
			"void main(void){ \n" +
			"varying_pos =  e_position; \n" +
			"}  \n",

			"detail_Bending_vs":
			"uniform float uniformTime[4] ; \n" +
			"void main(void){ \n" +
			"e_position = attribute_position; \n" +
			"varying_uv0 = attribute_uv0; \n" +
			"varying_color = attribute_color; \n" +
			"vec4 curve = SmoothTriangleWave(vec4(sin(uniformTime[0]*0.001),1.0,1.0,1.0)); \n" +
			"e_position.xyz += curve.x * vec3(1.0,0.5,0.0) * ( attribute_color.xyz) ; \n" +
			"} \n",

			"diffuseShadowPass_fs":
			"uniform sampler2D diffuseTexture; \n" +
			"vec4 diffuseColor ; \n" +
			"void main() { \n" +
			"diffuseColor = varying_color ; \n" +
			"if( diffuseColor.w == 0.0 ){ \n" +
			"discard; \n" +
			"} \n" +
			"diffuseColor = texture2D(diffuseTexture , uv_0 ); \n" +
			"if( diffuseColor.w <= 0.3 ){ \n" +
			"discard; \n" +
			"} \n" +
			"} \n",

			"diffuse_fragment":
			"uniform sampler2D diffuseTexture; \n" +
			"vec4 diffuseColor ; \n" +
			"void main() { \n" +
			"diffuseColor = texture2D(diffuseTexture , uv_0 ); \n" +
			"if( diffuseColor.w <= materialSource.cutAlpha ){ \n" +
			"discard; \n" +
			"} \n" +
			"} \n",

			"diffuse_vertex":
			"attribute vec3 attribute_normal; \n" +
			"attribute vec4 attribute_color; \n" +
			"varying vec4 varying_mvPose; \n" +
			"void main(void){ \n" +
			"mat4 mvMatrix = mat4(uniform_ViewMatrix * uniform_ModelMatrix); \n" +
			"varying_mvPose = mvMatrix * vec4( e_position , 1.0 )  ; \n" +
			"mat4 normalMatrix = inverse(mvMatrix) ; \n" +
			"normalMatrix = transpose(normalMatrix); \n" +
			"varying_eyeNormal = mat3(normalMatrix) * -attribute_normal ; \n" +
			"outPosition = varying_mvPose ; \n" +
			"varying_color = attribute_color; \n" +
			"} \n",

			"directLight_fragment":
			"const int max_directLight = 0 ; \n" +
			"uniform float uniform_directLightSource[9*max_directLight] ; \n" +
			"varying vec4 varying_mvPose; \n" +
			"uniform mat4 uniform_ViewMatrix; \n" +
			"mat4 normalMatrix ; \n" +
			"struct DirectLight{ \n" +
			"vec3 direction; \n" +
			"vec3 diffuse; \n" +
			"vec3 ambient; \n" +
			"}; \n" +
			"mat4 transpose(mat4 inMatrix) { \n" +
			"vec4 i0 = inMatrix[0]; \n" +
			"vec4 i1 = inMatrix[1]; \n" +
			"vec4 i2 = inMatrix[2]; \n" +
			"vec4 i3 = inMatrix[3]; \n" +
			"mat4 outMatrix = mat4( \n" +
			"vec4(i0.x, i1.x, i2.x, i3.x), \n" +
			"vec4(i0.y, i1.y, i2.y, i3.y), \n" +
			"vec4(i0.z, i1.z, i2.z, i3.z), \n" +
			"vec4(i0.w, i1.w, i2.w, i3.w) \n" +
			"); \n" +
			"return outMatrix; \n" +
			"} \n" +
			"mat4 inverse(mat4 m) { \n" +
			"float \n" +
			"a00 = m[0][0], a01 = m[0][1], a02 = m[0][2], a03 = m[0][3], \n" +
			"a10 = m[1][0], a11 = m[1][1], a12 = m[1][2], a13 = m[1][3], \n" +
			"a20 = m[2][0], a21 = m[2][1], a22 = m[2][2], a23 = m[2][3], \n" +
			"a30 = m[3][0], a31 = m[3][1], a32 = m[3][2], a33 = m[3][3], \n" +
			"b00 = a00 * a11 - a01 * a10, \n" +
			"b01 = a00 * a12 - a02 * a10, \n" +
			"b02 = a00 * a13 - a03 * a10, \n" +
			"b03 = a01 * a12 - a02 * a11, \n" +
			"b04 = a01 * a13 - a03 * a11, \n" +
			"b05 = a02 * a13 - a03 * a12, \n" +
			"b06 = a20 * a31 - a21 * a30, \n" +
			"b07 = a20 * a32 - a22 * a30, \n" +
			"b08 = a20 * a33 - a23 * a30, \n" +
			"b09 = a21 * a32 - a22 * a31, \n" +
			"b10 = a21 * a33 - a23 * a31, \n" +
			"b11 = a22 * a33 - a23 * a32, \n" +
			"det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06; \n" +
			"return mat4( \n" +
			"a11 * b11 - a12 * b10 + a13 * b09, \n" +
			"a02 * b10 - a01 * b11 - a03 * b09, \n" +
			"a31 * b05 - a32 * b04 + a33 * b03, \n" +
			"a22 * b04 - a21 * b05 - a23 * b03, \n" +
			"a12 * b08 - a10 * b11 - a13 * b07, \n" +
			"a00 * b11 - a02 * b08 + a03 * b07, \n" +
			"a32 * b02 - a30 * b05 - a33 * b01, \n" +
			"a20 * b05 - a22 * b02 + a23 * b01, \n" +
			"a10 * b10 - a11 * b08 + a13 * b06, \n" +
			"a01 * b08 - a00 * b10 - a03 * b06, \n" +
			"a30 * b04 - a31 * b02 + a33 * b00, \n" +
			"a21 * b02 - a20 * b04 - a23 * b00, \n" +
			"a11 * b07 - a10 * b09 - a12 * b06, \n" +
			"a00 * b09 - a01 * b07 + a02 * b06, \n" +
			"a31 * b01 - a30 * b03 - a32 * b00, \n" +
			"a20 * b03 - a21 * b01 + a22 * b00) / det; \n" +
			"} \n" +
			"void calculateDirectLight( MaterialSource materialSource ){ \n" +
			"float lambertTerm , specular ; \n" +
			"vec3 dir ,viewDir = normalize(varying_mvPose.xyz/varying_mvPose.w); \n" +
			"for(int i = 0 ; i < max_directLight ; i++){ \n" +
			"DirectLight directLight ; \n" +
			"directLight.direction = (normalMatrix * vec4(uniform_directLightSource[i*9],uniform_directLightSource[i*9+1],uniform_directLightSource[i*9+2],1.0)).xyz; \n" +
			"directLight.diffuse = vec3(uniform_directLightSource[i*9+3],uniform_directLightSource[i*9+4],uniform_directLightSource[i*9+5]); \n" +
			"directLight.ambient = vec3(uniform_directLightSource[i*9+6],uniform_directLightSource[i*9+7],uniform_directLightSource[i*9+8]); \n" +
			"dir = normalize(directLight.direction) ; \n" +
			"light.xyzw += LightingBlinnPhong(dir,directLight.diffuse,directLight.ambient,normal,viewDir,0.5); \n" +
			"} \n" +
			"} \n" +
			"void main() { \n" +
			"normalMatrix = inverse(uniform_ViewMatrix); \n" +
			"normalMatrix = transpose(normalMatrix); \n" +
			"calculateDirectLight( materialSource ); \n" +
			"} \n",

			"endShadowPass_fs":
			"void main() { \n" +
			"if(varying_color.w<=0.0){ \n" +
			"discard; \n" +
			"} \n" +
			"outColor.x =  outColor.y = outColor.z = varying_ViewPose.z/varying_ViewPose.w  ; \n" +
			"outColor.w = 1.0 ; \n" +
			"gl_FragColor = outColor ; \n" +
			"} \n",

			"endShadowPass_vs":
			"void main() { \n" +
			"outPosition = uniform_ProjectionMatrix * outPosition ; \n" +
			"gl_Position = outPosition ; \n" +
			"} \n" +
			"                       \n",

			"end_fs":
			"vec4 diffuseColor ; \n" +
			"vec4 specularColor ; \n" +
			"vec4 ambientColor; \n" +
			"vec4 light ; \n" +
			"void main() { \n" +
			"outColor.xyz = (light.xyz+materialSource.ambient) * diffuseColor.xyz * materialSource.diffuse * varying_color.xyz; \n" +
			"outColor.w = materialSource.alpha * diffuseColor.w * varying_color.w; \n" +
			"outColor.xyz *= outColor.w; \n" +
			"gl_FragColor = outColor; \n" +
			"} \n",

			"end_vs":
			"vec4 endPosition ; \n" +
			"uniform float uniform_materialSource[20]; \n" +
			"void main() { \n" +
			"gl_PointSize = 50.0; \n" +
			"gl_PointSize = uniform_materialSource[18]; \n" +
			"gl_Position = uniform_ProjectionMatrix * outPosition ; \n" +
			"} \n" +
			"                       \n",

			"environmentDiffuse_vertex":
			"void main(){ \n" +
			"} \n",

			"environmentMapping_fragment":
			"uniform samplerCube environmentMapTex ; \n" +
			"uniform float reflectValue; \n" +
			"void main(){ \n" +
			"vec3 r = reflect(-vec3(0.0,0.0,1.0),  normal  ); \n" +
			"vec4 reflectiveColor = textureCube(environmentMapTex,r.xyz); \n" +
			"diffuseColor.xyz = mix( diffuseColor.xyz,reflectiveColor.xyz, specularColor.y + reflectValue ); \n" +
			"} \n" +
			"          \n",

			"expFog_fs":
			"struct Fog{ \n" +
			"vec3 fogColor  ; \n" +
			"float globalDensity ; \n" +
			"vec3 distance ; \n" +
			"}; \n" +
			"varying vec4 varying_pos; \n" +
			"uniform float uniform_globalFog[7]; \n" +
			"void main(void){ \n" +
			"Fog fog; \n" +
			"fog.fogColor = vec3(uniform_globalFog[0],uniform_globalFog[1],uniform_globalFog[2]); \n" +
			"fog.globalDensity = uniform_globalFog[3]; \n" +
			"fog.distance = vec2(uniform_globalFog[4], uniform_globalFog[5]); \n" +
			"float d = distance(uniform_eyepos,varying_pos.xyz); \n" +
			"float distFog = max( 0.0 , d - fog.distance.x )* fog.distance.y; \n" +
			"float fogFactor = (1.0-exp( -distFog * 0.000001 * fog.globalDensity )) ; \n" +
			"diffuseColor.xyz = mix( diffuseColor.xyz  , fog.fogColor , min(fogFactor,1.0) ); \n" +
			"} \n" +
			"  \n",

			"expHeightFog_fs":
			"struct Fog{ \n" +
			"vec3 fogColor  ; \n" +
			"float globalDensity ; \n" +
			"float fogStartDistance ; \n" +
			"float fogHeightStart ; \n" +
			"float fogAlpha ; \n" +
			"}; \n" +
			"varying vec4 varying_pos; \n" +
			"uniform float uniform_globalFog[7]; \n" +
			"vec3 applyFog( float yDistance, vec3  vpos , Fog fog ) \n" +
			"{ \n" +
			"float d = distance(uniform_eyepos,varying_pos.xyz); \n" +
			"float distFog = max( 0.0 , d - fog.fogStartDistance ) ; \n" +
			"float yFog = max(0.0, (vpos.y - fog.fogHeightStart - yDistance) )  ; \n" +
			"float fogAmount =  1.0-(exp(-distFog * fog.globalDensity )) + (exp(-yFog * fog.globalDensity )); \n" +
			"return mix( diffuseColor.xyz,fog.fogColor, clamp(fogAmount,0.0,fog.fogAlpha) ); \n" +
			"} \n" +
			"void main(void){ \n" +
			"Fog fog; \n" +
			"fog.fogColor = vec3(uniform_globalFog[0],uniform_globalFog[1],uniform_globalFog[2]); \n" +
			"fog.globalDensity = uniform_globalFog[3]; \n" +
			"fog.fogStartDistance = uniform_globalFog[4] ; \n" +
			"fog.fogHeightStart = uniform_globalFog[5] ; \n" +
			"fog.fogAlpha = uniform_globalFog[6] ; \n" +
			"float yd = uniform_eyepos.y - varying_pos.y ; \n" +
			"diffuseColor.xyz = applyFog( yd , varying_pos.xyz , fog ); \n" +
			"} \n" +
			"  \n",

			"flatNormal_fs":
			"#extension GL_OES_standard_derivatives : enable \n" +
			"vec3 flatNormal(vec3 pos){ \n" +
			"vec3 fdx = dFdx(pos); \n" +
			"vec3 fdy = dFdy(pos); \n" +
			"return normalize(cross(fdx, fdy)); \n" +
			"} \n",

			"gamma_fs":
			"const float gamma = 2.2; \n" +
			"float toLinear_float_v1(float v) { \n" +
			"return pow(v, gamma); \n" +
			"} \n" +
			"vec2 toLinear_vec2_v1(vec2 v) { \n" +
			"return pow(v, vec2(gamma)); \n" +
			"} \n" +
			"vec3 toLinear_vec3_v1(vec3 v) { \n" +
			"return pow(v, vec3(gamma)); \n" +
			"} \n" +
			"vec4 toLinear_vec4_v1(vec4 v) { \n" +
			"return vec4(toLinear_vec3_v1(v.rgb), v.a); \n" +
			"} \n" +
			"float toGamma_float_v2(float v) { \n" +
			"return pow(v, 1.0 / gamma); \n" +
			"} \n" +
			"vec2 toGamma_vec2_v2(vec2 v) { \n" +
			"return pow(v, vec2(1.0 / gamma)); \n" +
			"} \n" +
			"vec3 toGamma_vec3_v2(vec3 v) { \n" +
			"return pow(v, vec3(1.0 / gamma)); \n" +
			"} \n" +
			"vec4 toGamma_vec4_v2(vec4 v) { \n" +
			"return vec4(toGamma_vec3_v2(v.rgb), v.a); \n" +
			"} \n" +
			"vec4 textureLinear(sampler2D uTex, vec2 uv) { \n" +
			"return toLinear_vec4_v1(texture2D(uTex, uv)); \n" +
			"} \n",

			"gaussian_H_fs":
			"varying vec2 varying_uv0; \n" +
			"uniform sampler2D diffuseTexture; \n" +
			"void main() \n" +
			"{ \n" +
			"vec2 uv = vec2(varying_uv0.x,1.0-varying_uv0.y); \n" +
			"float d = 1.0/float(1024.0); \n" +
			"vec4 color = vec4(0.0,0.0,0.0,0.0); \n" +
			"color +=     texture2D(diffuseTexture,uv.xy+vec2(-8.0*d,0.0))* 0.001; \n" +
			"color +=     texture2D(diffuseTexture,uv.xy+vec2(-7.0*d,0.0))* 0.105; \n" +
			"color +=     texture2D(diffuseTexture,uv.xy+vec2(-6.0*d,0.0))* 0.217; \n" +
			"color +=     texture2D(diffuseTexture,uv.xy+vec2(-5.0*d,0.0))* 0.344; \n" +
			"color +=     texture2D(diffuseTexture,uv.xy+vec2(-4.0*d,0.0))* 0.492; \n" +
			"color +=     texture2D(diffuseTexture,uv.xy+vec2(-3.0*d,0.0))* 0.55; \n" +
			"color +=     texture2D(diffuseTexture,uv.xy+vec2(-2.0*d,0.0))* 0.69; \n" +
			"color +=     texture2D(diffuseTexture,uv.xy+vec2(-1.0*d,0.0))* 0.70; \n" +
			"color +=     texture2D(diffuseTexture,uv.xy) * 1.0; \n" +
			"color +=     texture2D(diffuseTexture,uv.xy+vec2(1.0*d,0.0)) * 0.70; \n" +
			"color +=     texture2D(diffuseTexture,uv.xy+vec2(2.0*d,0.0)) * 0.69; \n" +
			"color +=     texture2D(diffuseTexture,uv.xy+vec2(3.0*d,0.0)) * 0.55; \n" +
			"color +=     texture2D(diffuseTexture,uv.xy+vec2(4.0*d,0.0)) * 0.492; \n" +
			"color +=     texture2D(diffuseTexture,uv.xy+vec2(5.0*d,0.0)) * 0.344; \n" +
			"color +=     texture2D(diffuseTexture,uv.xy+vec2(6.0*d,0.0)) * 0.217; \n" +
			"color +=     texture2D(diffuseTexture,uv.xy+vec2(7.0*d,0.0)) * 0.105; \n" +
			"color +=     texture2D(diffuseTexture,uv.xy+vec2(8.0*d,0.0)) * 0.001; \n" +
			"color /= 8.0; \n" +
			"gl_FragColor = color ; \n" +
			"} \n",

			"gaussian_V_fs":
			"varying vec2 varying_uv0; \n" +
			"uniform sampler2D diffuseTexture; \n" +
			"uniform sampler2D colorTexture; \n" +
			"void main() \n" +
			"{ \n" +
			"vec2 uv = vec2(varying_uv0.x,1.0-varying_uv0.y); \n" +
			"float d = 1.0/float(1024.0); \n" +
			"vec4 color = vec4(0.0,0.0,0.0,0.0); \n" +
			"color +=     texture2D(diffuseTexture,uv.xy+vec2(0.0,-8.0*d)) * 0.001; \n" +
			"color +=     texture2D(diffuseTexture,uv.xy+vec2(0.0,-7.0*d)) * 0.105; \n" +
			"color +=     texture2D(diffuseTexture,uv.xy+vec2(0.0,-6.0*d)) * 0.217; \n" +
			"color +=     texture2D(diffuseTexture,uv.xy+vec2(0.0,-5.0*d)) * 0.344; \n" +
			"color +=     texture2D(diffuseTexture,uv.xy+vec2(0.0,-4.0*d)) * 0.492; \n" +
			"color +=     texture2D(diffuseTexture,uv.xy+vec2(0.0,-3.0*d)) * 0.55; \n" +
			"color +=     texture2D(diffuseTexture,uv.xy+vec2(0.0,-2.0*d)) * 0.69; \n" +
			"color +=     texture2D(diffuseTexture,uv.xy+vec2(0.0,-1.0*d)) * 0.70; \n" +
			"color +=     texture2D(diffuseTexture,uv.xy) * 1.0; \n" +
			"color +=     texture2D(diffuseTexture,uv.xy+vec2(0.0, 1.0*d)) * 0.70; \n" +
			"color +=     texture2D(diffuseTexture,uv.xy+vec2(0.0, 2.0*d)) * 0.69; \n" +
			"color +=     texture2D(diffuseTexture,uv.xy+vec2(0.0, 3.0*d)) * 0.55; \n" +
			"color +=     texture2D(diffuseTexture,uv.xy+vec2(0.0, 4.0*d)) * 0.492; \n" +
			"color +=     texture2D(diffuseTexture,uv.xy+vec2(0.0, 5.0*d)) * 0.344; \n" +
			"color +=     texture2D(diffuseTexture,uv.xy+vec2(0.0, 6.0*d)) * 0.217; \n" +
			"color +=     texture2D(diffuseTexture,uv.xy+vec2(0.0, 7.0*d)) * 0.105; \n" +
			"color +=     texture2D(diffuseTexture,uv.xy+vec2(0.0, 8.0*d)) * 0.001; \n" +
			"color /= 8.0; \n" +
			"gl_FragColor = color + texture2D(colorTexture,uv.xy); \n" +
			"} \n",

			"hud_cull_fs":
			"varying vec2 varying_uv0; \n" +
			"uniform sampler2D diffuseTexture; \n" +
			"uniform vec2 uv_scale; \n" +
			"void main(void) { \n" +
			"vec2 uv_0 = varying_uv0; \n" +
			"uv_0 *= uv_scale; \n" +
			"vec4 color = texture2D(diffuseTexture, varying_uv0); \n" +
			"float mask = 1.0; \n" +
			"float f = uv_scale.y - varying_uv0.y; \n" +
			"if (varying_uv0.y < uv_scale.y){ \n" +
			"if(f < 0.03 && f > 0.0){ \n" +
			"mask =1.0 - (f / 0.03 * 0.9 + 0.1); \n" +
			"} \n" +
			"else{ \n" +
			"mask = 0.1; \n" +
			"} \n" +
			"} \n" +
			"color.xyz *= mask; \n" +
			"gl_FragColor  = color; \n" +
			"} \n",

			"hud_H_fs":
			"varying vec2 varying_uv0; \n" +
			"uniform sampler2D diffuseTexture; \n" +
			"void main(void) { \n" +
			"vec2 uv = vec2(varying_uv0.x ,1.0-varying_uv0.y); \n" +
			"vec4 color = texture2D(diffuseTexture, uv); \n" +
			"gl_FragColor  = color; \n" +
			"} \n",

			"hud_vs":
			"attribute vec3 attribute_position; \n" +
			"attribute vec2 attribute_uv0; \n" +
			"varying  vec2 varying_uv0; \n" +
			"uniform  mat4 uniform_ViewProjectionMatrix; \n" +
			"void main(void) { \n" +
			"vec4 pos = vec4(attribute_position, 1.0); \n" +
			"gl_Position = uniform_ViewProjectionMatrix * pos; \n" +
			"varying_uv0 = attribute_uv0; \n" +
			"} \n",

			"hud_V_fs":
			"varying vec2 varying_uv0; \n" +
			"uniform sampler2D diffuseTexture; \n" +
			"void main(void) { \n" +
			"vec4 color = texture2D(diffuseTexture, varying_uv0); \n" +
			"gl_FragColor  = color; \n" +
			"} \n",

			"lightingBase_fs":
			"vec4 LightingBlinnPhong(vec3 lightDir, vec3 lightColor , vec3 lightAmbient , vec3 normal , vec3 viewDir, float atten){ \n" +
			"float NdotL = clamp(dot (normal, lightDir),0.0,1.0); \n" +
			"vec3 diffuse = lightColor.xyz * NdotL ; \n" +
			"vec3 h = normalize (lightDir + normalize(viewDir)); \n" +
			"float nh = clamp(dot (normal, h),0.0,1.0); \n" +
			"float specPower = pow (nh, materialSource.shininess ) * materialSource.specularScale ; \n" +
			"vec3 specular = lightColor.xyz * specPower * materialSource.specular ; \n" +
			"specularColor.xyz += specular; \n" +
			"vec4 c; \n" +
			"c.rgb = (diffuse+specular+lightAmbient) * (atten * 2.0 ); \n" +
			"c.a = materialSource.alpha + (specPower * atten); \n" +
			"return c; \n" +
			"} \n" +
			"void main(void) { \n" +
			"light.xyzw = vec4(0.0,0.0,0.0,1.0) ; \n" +
			"} \n",

			"lightMapSpecularPower_fs":
			"uniform sampler2D lightTexture ; \n" +
			"varying vec2 varying_uv1 ; \n" +
			"vec4 decode_hdr( vec4 data ){ \n" +
			"vec4 res = data ; \n" +
			"res.xyz *= pow(2.0,data.w * 256.0 - 128.0); \n" +
			"return res ; \n" +
			"} \n" +
			"void main(void){ \n" +
			"vec4 lightmap = texture2D( lightTexture , varying_uv1 ); \n" +
			"lightmap.xyz = decode_hdr(lightmap).xyz; \n" +
			"lightmap.xyz = pow( 1.0 * lightmap.xyz, vec3(0.80)) ; \n" +
			"diffuseColor.xyz *= lightmap.xyz ; \n" +
			"specularColor.xyz *= lightmap.xyz ; \n" +
			"} \n",

			"lightMap_fs":
			"uniform sampler2D lightTexture ; \n" +
			"varying vec2 varying_uv1 ; \n" +
			"vec4 decode_hdr( vec4 data ){ \n" +
			"vec4 res = data ; \n" +
			"res.xyz *= pow(2.0,data.w * 256.0 - 128.0); \n" +
			"return res ; \n" +
			"} \n" +
			"void main(void){ \n" +
			"vec4 lightmap = texture2D( lightTexture , varying_uv1 ); \n" +
			"lightmap.xyz = decode_hdr(lightmap).xyz; \n" +
			"lightmap.xyz = pow( 1.0 * lightmap.xyz, vec3(0.80)) ; \n" +
			"diffuseColor.xyz *= lightmap.xyz ; \n" +
			"} \n",

			"lineFog":
			"struct Fog{ \n" +
			"vec3 fogColor  ; \n" +
			"float globalDensity ; \n" +
			"float fogStartDistance ; \n" +
			"float fogFarDistance ; \n" +
			"float fogAlpha ; \n" +
			"}; \n" +
			"varying vec4 varying_pos; \n" +
			"uniform float uniform_globalFog[7]; \n" +
			"void main(void){ \n" +
			"Fog fog; \n" +
			"fog.fogColor = vec3(uniform_globalFog[0],uniform_globalFog[1],uniform_globalFog[2]); \n" +
			"fog.globalDensity = uniform_globalFog[3]; \n" +
			"fog.fogStartDistance = uniform_globalFog[4] ; \n" +
			"fog.fogFarDistance = uniform_globalFog[5] ; \n" +
			"fog.fogAlpha = uniform_globalFog[6] ; \n" +
			"float d = varying_mvPose.z ; \n" +
			"float distFog = max( 0.0 , d -  fog.fogStartDistance ) ; \n" +
			"diffuseColor.xyz = mix( diffuseColor.xyz,fog.fogColor, clamp(distFog/fog.fogFarDistance,0.0,1.0) * fog.fogAlpha ) ; \n" +
			"} \n",

			"matCapPass_vs":
			"varying vec2 capCoord ; \n" +
			"void main(void){ \n" +
			"capCoord.x = dot(normalMatrix[0].xyz,normal); \n" +
			"capCoord.y = dot(normalMatrix[1].xyz,normal); \n" +
			"capCoord = capCoord * 0.5 + 0.5; \n" +
			"ambientColor.xyz +=  + capCoord.xyz * 2.0 - 1.0 ; \n" +
			"} \n",

			"matCap_TextureAdd_fs":
			"uniform sampler2D matcapTexture; \n" +
			"void main() { \n" +
			"vec4 capCoord ; \n" +
			"capCoord.x = -normal.x; \n" +
			"capCoord.y = normal.y; \n" +
			"capCoord.xy = capCoord.xy * 0.5 + 0.5; \n" +
			"capCoord = texture2D(matcapTexture , capCoord.xy ) * 2.0 - 1.0 ; \n" +
			"ambientColor.xyz += capCoord.xyz ; \n" +
			"} \n",

			"matCap_TextureMult_fs":
			"uniform sampler2D matcapTexture; \n" +
			"void main() { \n" +
			"vec4 capCoord ; \n" +
			"capCoord.x = -normal.x; \n" +
			"capCoord.y = normal.y; \n" +
			"capCoord.xy = capCoord.xy * 0.5 + 0.5; \n" +
			"capCoord = texture2D(matcapTexture , capCoord.xy ) ; \n" +
			"diffuseColor.xyz *= capCoord.xyz * 2.0 ; \n" +
			"} \n",

			"materialSource_fs":
			"struct MaterialSource{ \n" +
			"vec3 diffuse; \n" +
			"vec3 ambient; \n" +
			"vec3 specular; \n" +
			"float alpha; \n" +
			"float cutAlpha; \n" +
			"float shininess; \n" +
			"float roughness; \n" +
			"float albedo; \n" +
			"vec4 uvRectangle; \n" +
			"float specularScale; \n" +
			"float normalScale; \n" +
			"}; \n" +
			"uniform float uniform_materialSource[20] ; \n" +
			"MaterialSource materialSource ; \n" +
			"void main(){ \n" +
			"materialSource.diffuse.x = uniform_materialSource[0]; \n" +
			"materialSource.diffuse.y = uniform_materialSource[1]; \n" +
			"materialSource.diffuse.z = uniform_materialSource[2]; \n" +
			"materialSource.ambient.x = uniform_materialSource[3]; \n" +
			"materialSource.ambient.y = uniform_materialSource[4]; \n" +
			"materialSource.ambient.z = uniform_materialSource[5]; \n" +
			"materialSource.specular.x = uniform_materialSource[6]; \n" +
			"materialSource.specular.y = uniform_materialSource[7]; \n" +
			"materialSource.specular.z = uniform_materialSource[8]; \n" +
			"materialSource.alpha = uniform_materialSource[9]; \n" +
			"materialSource.cutAlpha = uniform_materialSource[10]; \n" +
			"materialSource.shininess = uniform_materialSource[11]; \n" +
			"materialSource.specularScale = uniform_materialSource[12]; \n" +
			"materialSource.albedo = uniform_materialSource[13]; \n" +
			"materialSource.uvRectangle.x = uniform_materialSource[14]; \n" +
			"materialSource.uvRectangle.y = uniform_materialSource[15]; \n" +
			"materialSource.uvRectangle.z = uniform_materialSource[16]; \n" +
			"materialSource.uvRectangle.w = uniform_materialSource[17]; \n" +
			"materialSource.normalScale = uniform_materialSource[19]; \n" +
			"uv_0 = varying_uv0.xy * materialSource.uvRectangle.zw + materialSource.uvRectangle.xy ; \n" +
			"} \n",

			"mulUvRoll_fs":
			"uniform float mulUvRoll[4] ; \n" +
			"uniform sampler2D diffuseTexture; \n" +
			"uniform sampler2D diffuseTexture1; \n" +
			"vec4 diffuseColor ; \n" +
			"vec2 uv_1; \n" +
			"void main() { \n" +
			"uv_1 = varying_uv0; \n" +
			"uv_0.xy += vec2(mulUvRoll[0],mulUvRoll[1]); \n" +
			"uv_1.xy += vec2(mulUvRoll[2],mulUvRoll[3]); \n" +
			"diffuseColor = texture2D(diffuseTexture , uv_0 ) * texture2D(diffuseTexture1 , uv_1 ); \n" +
			"diffuseColor.xyz = clamp(diffuseColor.xyz / diffuseColor.w,0.0,1.0); \n" +
			"} \n",

			"normalMap_fragment":
			"uniform sampler2D normalTexture; \n" +
			"varying vec2 varying_uv0        ; \n" +
			"varying vec4 varying_mvPose        ; \n" +
			"mat3 TBN ; \n" +
			"mat3 cotangentFrame(vec3 N, vec3 p, vec2 uv) { \n" +
			"vec3 dp1 = dFdx(p); \n" +
			"vec3 dp2 = dFdy(p); \n" +
			"vec2 duv1 = dFdx(uv); \n" +
			"vec2 duv2 = dFdy(uv); \n" +
			"vec3 dp2perp = cross(dp2, N); \n" +
			"vec3 dp1perp = cross(N, dp1); \n" +
			"vec3 T = dp2perp * duv1.x + dp1perp * duv2.x; \n" +
			"vec3 B = dp2perp * duv1.y + dp1perp * duv2.y; \n" +
			"float invmax = 1.0 / sqrt(max(dot(T,T), dot(B,B))); \n" +
			"return mat3(T * invmax, B * invmax, N); \n" +
			"} \n" +
			"vec3 tbn(vec3 map, vec3 N, vec3 V, vec2 texcoord) { \n" +
			"mat3 TBN = cotangentFrame(N, -V, texcoord); \n" +
			"return normalize(TBN * map); \n" +
			"} \n" +
			"void main(){ \n" +
			"vec3 normalTex = texture2D(normalTexture,uv_0).xyz *2.0 - 1.0; \n" +
			"normalTex.y *= -1.0; \n" +
			"normal.xyz = tbn( normalTex.xyz , normal.xyz , varying_mvPose.xyz , uv_0 ) ; \n" +
			"} \n",

			"particle_bezier":
			"",

			"particle_color_fs":
			"//##FilterEnd## \n",

			"particle_color_vs":
			"//##FilterEnd## \n",

			"particle_diffuse_fragment":
			"",

			"particle_end":
			"//##FilterEnd## \n",

			"particle_end_fs":
			"",

			"particle_end_vs":
			"//##FilterEnd## \n",

			"particle_follow_vs":
			"//##FilterEnd## \n",

			"particle_fs":
			"",

			"particle_rm_billboard":
			"",

			"particle_rm_mesh":
			"",

			"particle_rm_stretched":
			"",

			"particle_rotationConst":
			"",

			"particle_rotationOneBezier":
			"",

			"particle_rotationTwoBezier":
			"",

			"particle_size_vs":
			"",

			"particle_textureSheetConst":
			"",

			"particle_textureSheetOneBezier":
			"",

			"particle_textureSheetTwoBezier":
			"",

			"particle_textureSheet_vs":
			"",

			"particle_time_fs":
			"",

			"particle_time_vs":
			"",

			"particle_uv_roll_fs":
			"",

			"particle_velocity":
			"",

			"particle_velocityForceConst":
			"",

			"particle_velocityForceOneBezier":
			"",

			"particle_velocityForceOneBezierX":
			"",

			"particle_velocityForceOneBezierY":
			"",

			"particle_velocityForceOneBezierZ":
			"",

			"particle_velocityForceTwoBezier":
			"",

			"particle_velocityForceTwoBezierX1":
			"",

			"particle_velocityForceTwoBezierX2":
			"",

			"particle_velocityForceTwoBezierY1":
			"",

			"particle_velocityForceTwoBezierY2":
			"",

			"particle_velocityForceTwoBezierZ1":
			"",

			"particle_velocityForceTwoBezierZ2":
			"",

			"particle_velocityLimitConst":
			"",

			"particle_velocityLimitOneBezier":
			"",

			"particle_velocityLimitTwoBezier":
			"",

			"particle_velocityOverConst":
			"",

			"particle_velocityOverOneBezier":
			"",

			"particle_velocityOverOneBezierX":
			"",

			"particle_velocityOverOneBezierY":
			"",

			"particle_velocityOverOneBezierZ":
			"",

			"particle_velocityOverTwoBezier":
			"",

			"particle_velocityOverTwoBezierX1":
			"",

			"particle_velocityOverTwoBezierX2":
			"",

			"particle_velocityOverTwoBezierY1":
			"",

			"particle_velocityOverTwoBezierY2":
			"",

			"particle_velocityOverTwoBezierZ1":
			"",

			"particle_velocityOverTwoBezierZ2":
			"",

			"particle_vs":
			"",

			"pointLight_fragment":
			"const int max_pointLight = 0 ; \n" +
			"uniform float uniform_pointLightSource[12*max_pointLight] ; \n" +
			"varying vec4 varying_mvPose; \n" +
			"struct PointLight{ \n" +
			"vec3 position ; \n" +
			"vec3 diffuse ; \n" +
			"vec3 ambient ; \n" +
			"float intensity; \n" +
			"float radius; \n" +
			"float cutoff; \n" +
			"}; \n" +
			"void calculatePointLight(MaterialSource materialSource){ \n" +
			"vec3 N = normal; \n" +
			"vec3 viewDir = normalize(varying_mvPose.xyz/varying_mvPose.w); \n" +
			"for(int i = 0 ; i < max_pointLight ; i++){ \n" +
			"PointLight pointLight; \n" +
			"pointLight.position = vec3(uniform_pointLightSource[i*12],uniform_pointLightSource[i*12+1],uniform_pointLightSource[i*12+2]); \n" +
			"pointLight.diffuse = vec3(uniform_pointLightSource[i*12+3],uniform_pointLightSource[i*12+4],uniform_pointLightSource[i*12+5]); \n" +
			"pointLight.ambient = vec3(uniform_pointLightSource[i*12+6],uniform_pointLightSource[i*12+7],uniform_pointLightSource[i*12+8]); \n" +
			"pointLight.intensity = uniform_pointLightSource[i*12+9]; \n" +
			"pointLight.radius = uniform_pointLightSource[i*12+10]; \n" +
			"pointLight.cutoff = uniform_pointLightSource[i*12+11]; \n" +
			"vec3 lightCentre = (mat4(uniform_ViewMatrix) * vec4(pointLight.position.xyz,1.0) ).xyz ; \n" +
			"float r = pointLight.radius * 0.5 ; \n" +
			"vec3 ldir = varying_mvPose.xyz - lightCentre ; \n" +
			"float distance = length(ldir); \n" +
			"float d = max(distance - r, 0.0); \n" +
			"vec3 L = ldir / distance; \n" +
			"float denom = d/r + 1.0; \n" +
			"float attenuation = 1.0 / (denom*denom); \n" +
			"float cutoff = pointLight.cutoff ; \n" +
			"attenuation = (attenuation - cutoff) / (1.0 - cutoff); \n" +
			"attenuation = max(attenuation*pointLight.intensity, 0.0); \n" +
			"light.xyzw += LightingBlinnPhong(normalize(ldir),pointLight.diffuse,pointLight.ambient,N,(viewDir),attenuation); \n" +
			"}; \n" +
			"} \n" +
			"void main() { \n" +
			"calculatePointLight(materialSource); \n" +
			"} \n",

			"secondaryUV_vs":
			"attribute vec2 attribute_uv1; \n" +
			"varying vec2 varying_uv1 ; \n" +
			"void main(void){ \n" +
			"varying_uv1 = attribute_uv1 ; \n" +
			"} \n",

			"shadowMapping_fs":
			"uniform sampler2D shadowMapTexture; \n" +
			"uniform vec3 uniform_ShadowColor; \n" +
			"varying vec4 varying_ShadowCoord; \n" +
			"float unpackDepth(vec4 rgbaDepth){ \n" +
			"vec4 bitShift = vec4( 1.0 , 1.0/256.0 , 1.0/(256.0*256.0) , 1.0/(256.0*256.0*256.0) ); \n" +
			"float depth = dot(rgbaDepth,bitShift); \n" +
			"return depth ; \n" +
			"} \n" +
			"void main() { \n" +
			"vec3 shadowColor = vec3(1.0,1.0,1.0); \n" +
			"float shadow = 0.0; \n" +
			"if (varying_ShadowCoord.w > 0.0) { \n" +
			"vec3 shadowDepth = varying_ShadowCoord.xyz / varying_ShadowCoord.w * 0.5 + 0.5; \n" +
			"vec2 sample = clamp(shadowDepth.xy,0.0,1.0); \n" +
			"float sampleDepth = texture2D(shadowMapTexture, sample).z; \n" +
			"if(sampleDepth > shadowDepth.z) \n" +
			"shadowColor = uniform_ShadowColor; \n" +
			"} \n" +
			"diffuseColor.xyz = diffuseColor.xyz * shadowColor; \n" +
			"} \n",

			"shadowMapping_vs":
			"uniform mat4 uniform_ShadowMatrix; \n" +
			"uniform mat4 uniform_ModelMatrix; \n" +
			"varying vec4 varying_ShadowCoord; \n" +
			"void main() { \n" +
			"varying_ShadowCoord = uniform_ShadowMatrix * uniform_ModelMatrix * vec4(e_position, 1.0); \n" +
			"} \n",

			"skeletonShadowPass_vs":
			"attribute vec4 attribute_boneIndex; \n" +
			"attribute vec4 attribute_boneWeight; \n" +
			"attribute vec4 attribute_color; \n" +
			"vec4 e_boneIndex = vec4(0.0, 0.0, 0.0, 0.0); \n" +
			"vec4 e_boneWeight = vec4(0.0, 0.0, 0.0, 0.0); \n" +
			"const int bonesNumber = 0; \n" +
			"uniform vec4 uniform_PoseMatrix[bonesNumber]; \n" +
			"mat4 buildMat4(int index){ \n" +
			"vec4 quat = uniform_PoseMatrix[index * 2 + 0]; \n" +
			"vec4 translation = uniform_PoseMatrix[index * 2 + 1]; \n" +
			"float xx = quat.x * quat.x; \n" +
			"float xy = quat.x * quat.y; \n" +
			"float xz = quat.x * quat.z; \n" +
			"float xw = quat.x * quat.w; \n" +
			"float yy = quat.y * quat.y; \n" +
			"float yz = quat.y * quat.z; \n" +
			"float yw = quat.y * quat.w; \n" +
			"float zz = quat.z * quat.z; \n" +
			"float zw = quat.z * quat.w; \n" +
			"return mat4( \n" +
			"1.0 - 2.0 * (yy + zz),		2.0 * (xy + zw),		2.0 * (xz - yw),		0, \n" +
			"2.0 * (xy - zw),				1.0 - 2.0 * (xx + zz),	2.0 * (yz + xw),		0, \n" +
			"2.0 * (xz + yw),				2.0 * (yz - xw),		1.0 - 2.0 * (xx + yy),	0, \n" +
			"translation.x,				translation.y,			translation.z,			1 \n" +
			"); \n" +
			"} \n" +
			"void main(void){ \n" +
			"varying_color = attribute_color; \n" +
			"e_boneIndex = attribute_boneIndex; \n" +
			"e_boneWeight = attribute_boneWeight; \n" +
			"vec4 temp_position = vec4(attribute_position, 1.0) ; \n" +
			"mat4 m0 = buildMat4(int(e_boneIndex.x)); \n" +
			"mat4 m1 = buildMat4(int(e_boneIndex.y)); \n" +
			"mat4 m2 = buildMat4(int(e_boneIndex.z)); \n" +
			"mat4 m3 = buildMat4(int(e_boneIndex.w)); \n" +
			"outPosition = m0 * temp_position * e_boneWeight.x; \n" +
			"outPosition += m1 * temp_position * e_boneWeight.y; \n" +
			"outPosition += m2 * temp_position * e_boneWeight.z; \n" +
			"outPosition += m3 * temp_position * e_boneWeight.w; \n" +
			"e_position = outPosition.xyz; \n" +
			"outPosition = uniform_modelMatrix * uniform_viewMatrix *  outPosition; \n" +
			"} \n",

			"skeleton_vs":
			"attribute vec4 attribute_boneIndex; \n" +
			"attribute vec4 attribute_boneWeight; \n" +
			"attribute vec3 attribute_normal; \n" +
			"attribute vec4 attribute_color; \n" +
			"vec4 e_boneIndex = vec4(0.0, 0.0, 0.0, 0.0); \n" +
			"vec4 e_boneWeight = vec4(0.0, 0.0, 0.0, 0.0); \n" +
			"const int bonesNumber = 0; \n" +
			"uniform vec4 uniform_PoseMatrix[bonesNumber]; \n" +
			"varying vec4 varying_mvPose  ; \n" +
			"mat4 buildMat4(int index){ \n" +
			"vec4 quat = uniform_PoseMatrix[index * 2 + 0]; \n" +
			"vec4 translation = uniform_PoseMatrix[index * 2 + 1]; \n" +
			"float xy2 = 2.0 * quat.x * quat.y; \n" +
			"float xz2 = 2.0 * quat.x * quat.z; \n" +
			"float xw2 = 2.0 * quat.x * quat.w; \n" +
			"float yz2 = 2.0 * quat.y * quat.z; \n" +
			"float yw2 = 2.0 * quat.y * quat.w; \n" +
			"float zw2 = 2.0 * quat.z * quat.w; \n" +
			"float xx = quat.x * quat.x; \n" +
			"float yy = quat.y * quat.y; \n" +
			"float zz = quat.z * quat.z; \n" +
			"float ww = quat.w * quat.w; \n" +
			"mat4 matrix = mat4( \n" +
			"xx - yy - zz + ww, xy2 + zw2, xz2 - yw2, 0, \n" +
			"xy2 - zw2, -xx + yy - zz + ww, yz2 + xw2, 0, \n" +
			"xz2 + yw2, yz2 - xw2, -xx - yy + zz + ww, 0, \n" +
			"translation.x, translation.y, translation.z, 1 \n" +
			"); \n" +
			"return matrix; \n" +
			"} \n" +
			"void main(void){ \n" +
			"e_boneIndex = attribute_boneIndex; \n" +
			"e_boneWeight = attribute_boneWeight; \n" +
			"vec4 temp_position = vec4(attribute_position, 1.0) ; \n" +
			"vec4 temp_normal = vec4(attribute_normal, 0.0) ; \n" +
			"mat4 m0 = buildMat4(int(e_boneIndex.x)); \n" +
			"mat4 m1 = buildMat4(int(e_boneIndex.y)); \n" +
			"mat4 m2 = buildMat4(int(e_boneIndex.z)); \n" +
			"mat4 m3 = buildMat4(int(e_boneIndex.w)); \n" +
			"outPosition = m0 * temp_position * e_boneWeight.x; \n" +
			"outPosition += m1 * temp_position * e_boneWeight.y; \n" +
			"outPosition += m2 * temp_position * e_boneWeight.z; \n" +
			"outPosition += m3 * temp_position * e_boneWeight.w; \n" +
			"e_position = outPosition.xyz; \n" +
			"vec4 temp_n ; \n" +
			"temp_n = m0 * temp_normal * e_boneWeight.x; \n" +
			"temp_n += m1 * temp_normal * e_boneWeight.y; \n" +
			"temp_n += m2 * temp_normal * e_boneWeight.z; \n" +
			"temp_n += m3 * temp_normal * e_boneWeight.w; \n" +
			"mat4 mvMatrix = mat4(uniform_ViewMatrix * uniform_ModelMatrix); \n" +
			"varying_mvPose = mvMatrix * vec4( e_position , 1.0 ) ; \n" +
			"mat4 normalMatrix = inverse(mvMatrix) ; \n" +
			"normalMatrix = transpose(normalMatrix); \n" +
			"varying_eyeNormal = mat3(normalMatrix) * -attribute_normal ; \n" +
			"outPosition.xyzw = varying_mvPose.xyzw ; \n" +
			"varying_color = attribute_color; \n" +
			"} \n",

			"specularMap_fragment":
			"uniform sampler2D specularTexture; \n" +
			"void main(void){ \n" +
			"specularColor.xyz *= texture2D( specularTexture , uv_0 ).xyz ; \n" +
			"} \n",

			"staticShadowPass_vs":
			"attribute vec4 attribute_color; \n" +
			"vec4 e_boneIndex = vec4(0.0, 0.0, 0.0, 0.0); \n" +
			"vec4 e_boneWeight = vec4(0.0, 0.0, 0.0, 0.0); \n" +
			"void main(void){ \n" +
			"varying_color = attribute_color; \n" +
			"outPosition = vec4(attribute_position, 1.0) ; \n" +
			"e_position = outPosition.xyz; \n" +
			"outPosition = uniform_modelMatrix * uniform_viewMatrix * outPosition; \n" +
			"} \n",

			"tangent_vs":
			"attribute vec3 attribute_tangent; \n" +
			"void main(void){ \n" +
			"}  \n",

			"terrainRGBA_fragment":
			"uniform sampler2D blendMaskTexture ; \n" +
			"uniform sampler2D splat_0Tex ; \n" +
			"uniform sampler2D splat_1Tex ; \n" +
			"uniform sampler2D splat_2Tex ; \n" +
			"uniform sampler2D splat_3Tex ; \n" +
			"uniform float uvs[8]; \n" +
			"void main() { \n" +
			"vec4 splat_control = texture2D ( blendMaskTexture , varying_uv0 ); \n" +
			"vec4 cc = vec4(0.0,0.0,0.0,1.0); \n" +
			"vec2 uv = varying_uv0 ; \n" +
			"cc.xyz = splat_control.x * texture2D (splat_0Tex, uv * vec2(uvs[0],uvs[1])).xyz ; \n" +
			"cc.xyz += splat_control.y * texture2D (splat_1Tex, uv * vec2(uvs[2],uvs[3]) ).xyz; \n" +
			"cc.xyz += splat_control.z * vec4(texture2D (splat_2Tex, uv* vec2(uvs[4],uvs[5]))).xyz; \n" +
			"cc.xyz += (1.0-length(splat_control.xyz)) * vec4(texture2D (splat_3Tex, uv* vec2(uvs[6],uvs[7]))).xyz; \n" +
			"diffuseColor.xyz = cc.xyz ; \n" +
			"} \n",

			"uvRoll_fs":
			"uniform float uvRoll[2] ; \n" +
			"uniform sampler2D diffuseTexture; \n" +
			"vec4 diffuseColor ; \n" +
			"void main() { \n" +
			"uv_0.xy += vec2(uvRoll[0],uvRoll[1]); \n" +
			"diffuseColor = texture2D(diffuseTexture , uv_0 ); \n" +
			"} \n",

			"uvSpriteSheet_fs":
			"uniform float uvSpriteSheet[4] ; \n" +
			"uniform sampler2D diffuseTexture; \n" +
			"vec4 diffuseColor ; \n" +
			"void main() { \n" +
			"uv_0.xy *= vec2(uvSpriteSheet[2],uvSpriteSheet[3]); \n" +
			"uv_0.xy += vec2(uvSpriteSheet[0],uvSpriteSheet[1]); \n" +
			"diffuseColor = texture2D(diffuseTexture , uv_0 ); \n" +
			"} \n",

			"uvStreamerRoll_fs":
			"uniform float uvRoll[3] ; \n" +
			"uniform sampler2D diffuseTexture; \n" +
			"uniform sampler2D streamerTexture; \n" +
			"vec4 diffuseColor ; \n" +
			"void main() { \n" +
			"diffuseColor = texture2D(diffuseTexture , varying_uv0 ); \n" +
			"vec2 rollUV = varying_uv0 + vec2(uvRoll[0],uvRoll[1]) + vec2(normal.xz) * 0.5 ; \n" +
			"diffuseColor.xyz += texture2D(streamerTexture , rollUV ).xyz * uvRoll[2] ; \n" +
			"} \n",

			"varyingViewDir_vs":
			"varying vec3 varying_ViewDir; \n" +
			"uniform vec3 uniform_eyepos; \n" +
			"void main(void){ \n" +
			"varying_ViewDir = (uniform_eyepos.xyz - e_position) ; \n" +
			"} \n",

			"vertexPos_vs":
			"varying vec4 varying_pos; \n" +
			"void main() { \n" +
			"varying_pos = uniform_modelMatrix * uniform_viewMatrix * vec4(e_position, 1.0) ; \n" +
			"} \n" +
			"                       \n",

			"waterDiffuse_fs":
			"uniform sampler2D diffuseTexture; \n" +
			"vec4 diffuseColor ; \n" +
			"void main() { \n" +
			"diffuseColor.xyz *= diffuseColor.w ; \n" +
			"} \n",

			"waterNormal_fs":
			"uniform vec2 waterNormalData[4]; \n" +
			"uniform float time ; \n" +
			"uniform sampler2D normalTextureA; \n" +
			"uniform sampler2D normalTextureB; \n" +
			"varying vec2 varying_uv0        ; \n" +
			"mat3 TBN ; \n" +
			"mat3 cotangentFrame(vec3 N, vec3 p, vec2 uv) { \n" +
			"vec3 dp1 = dFdx(p); \n" +
			"vec3 dp2 = dFdy(p); \n" +
			"vec2 duv1 = dFdx(uv); \n" +
			"vec2 duv2 = dFdy(uv); \n" +
			"vec3 dp2perp = cross(dp2, N); \n" +
			"vec3 dp1perp = cross(N, dp1); \n" +
			"vec3 T = dp2perp * duv1.x + dp1perp * duv2.x; \n" +
			"vec3 B = dp2perp * duv1.y + dp1perp * duv2.y; \n" +
			"float invmax = 1.0 / sqrt(max(dot(T,T), dot(B,B))); \n" +
			"return mat3(T * invmax, B * invmax, N); \n" +
			"} \n" +
			"vec3 tbn(vec3 map, vec3 N, vec3 V, vec2 texcoord) { \n" +
			"mat3 TBN = cotangentFrame(N, -V, texcoord); \n" +
			"return normalize(TBN * map); \n" +
			"} \n" +
			"void main(void){ \n" +
			"float tempTime = mod(time,100000.0); \n" +
			"vec2 uvA = uv_0 * waterNormalData[3].x + waterNormalData[0] * tempTime ; \n" +
			"vec2 uvB = uv_0 * waterNormalData[3].y + waterNormalData[1] * tempTime  ; \n" +
			"normal = flatNormals(varying_mvPose.xyz) ; \n" +
			"TBN = cotangentFrame(normal, -varying_mvPose.xyz, uv_0 ); \n" +
			"vec3 bump1 = texture2D( normalTextureA, uvA ).rgb; \n" +
			"vec3 bump2 = texture2D( normalTextureB, uvB ).rgb; \n" +
			"vec3 bump = bump1 + bump2 - 1.0; \n" +
			"normal = normalize(TBN * bump) ; \n" +
			"normal.y *= -1.0; \n" +
			"}  \n",

			"wave_fs":
			"uniform sampler2D diffuseTexture; \n" +
			"uniform vec3 uniform_eyepos; \n" +
			"uniform vec4 waveFSData[2]; \n" +
			"varying vec4 varying_mvPose; \n" +
			"vec4 diffuseColor ; \n" +
			"void main(void){ \n" +
			"vec3 viewDir = normalize(varying_mvPose.xyz/varying_mvPose.w); \n" +
			"diffuseColor.xyz = vec3(1.0,1.0,1.0) ; \n" +
			"vec3 shallowWaterColor = waveFSData[0].xyz * waveFSData[0].w ; \n" +
			"vec3 deepWaterColor = waveFSData[1].xyz * waveFSData[1].w; \n" +
			"float facing = clamp(dot( -normalize(viewDir),normal),0.0,1.0); \n" +
			"vec3 waterColor = mix(shallowWaterColor,deepWaterColor,facing); \n" +
			"diffuseColor.xyz *= waterColor ; \n" +
			"}  \n",

			"wave_vs":
			"#define VERTEX_TEXTURES \n" +
			"attribute vec3 attribute_normal; \n" +
			"attribute vec4 attribute_color; \n" +
			"uniform mat4 uniform_modelMatrix; \n" +
			"uniform mat4 uniform_viewMatrix; \n" +
			"varying vec4 varying_mvPose; \n" +
			"uniform vec3 waveVSData[4]; \n" +
			"uniform float time ; \n" +
			"struct wave{ \n" +
			"vec3 wave_xyz_intensity_0 ; \n" +
			"vec3 wave_xyz_intensity_1 ; \n" +
			"vec3 wave_xyz_speed_0 ; \n" +
			"vec3 wave_xyz_speed_1 ; \n" +
			"}; \n" +
			"const float pi = 3.14 ; \n" +
			"vec3 calcWave2( float t , vec3 x, float amplitude, float waveLength ,float angularVelocity ,  vec3 waveDir ){ \n" +
			"angularVelocity = angularVelocity * 0.1; \n" +
			"vec3 waveVector = waveDir ; \n" +
			"float waveNumber = pi / waveLength; \n" +
			"waveVector *= waveNumber ; \n" +
			"vec3 temp ; \n" +
			"float kDotX0SubWt = dot(waveVector , x ) - angularVelocity * t  * 0.001; \n" +
			"float A = amplitude * sin(kDotX0SubWt) ; \n" +
			"temp.xz = waveDir.xz * A ; \n" +
			"temp.y += amplitude * cos(kDotX0SubWt); \n" +
			"temp = x - temp ; \n" +
			"return temp ; \n" +
			"} \n" +
			"void main(void){ \n" +
			"wave wa ; \n" +
			"wa.wave_xyz_intensity_0 = vec3(waveVSData[0]) ; \n" +
			"wa.wave_xyz_intensity_1 = vec3(waveVSData[1]) ; \n" +
			"wa.wave_xyz_speed_0 = vec3(waveVSData[2]) ; \n" +
			"wa.wave_xyz_speed_1 = vec3(waveVSData[3]) ; \n" +
			"float tempTime = mod( time , 1000000.0 ); \n" +
			"vec3 newPose1 = calcWave2(tempTime,e_position,60.0, 500.0, 20.0,vec3(1.0,0.0,1.0)); \n" +
			"newPose1 += calcWave2(tempTime,e_position,130.0, 50.0, 20.0,vec3(1.0,0.0,-0.5)); \n" +
			"newPose1 += calcWave2(tempTime,e_position,90.0, 80.0, 20.0,vec3(1.0,0.0,-1.5)); \n" +
			"e_position = newPose1 ; \n" +
			"mat4 mvMatrix = mat4(uniform_ViewMatrix * uniform_ModelMatrix); \n" +
			"varying_mvPose = mvMatrix * vec4( e_position , 1.0 )  ; \n" +
			"mat4 normalMatrix = inverse(mvMatrix) ; \n" +
			"normalMatrix = transpose(normalMatrix); \n" +
			"varying_eyeNormal = mat3(normalMatrix) * -attribute_normal ; \n" +
			"outPosition = varying_mvPose ; \n" +
			"varying_color = attribute_color; \n" +
			"}  \n",


		};
	}
}
