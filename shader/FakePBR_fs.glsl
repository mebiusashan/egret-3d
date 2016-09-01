#extension GL_OES_standard_derivatives:enable

#define max_directLight 1 
struct DirectLight{
   vec3 direction;
	 vec3 diffuse;
	 vec3 ambient;
};
//const int max_directLight = 1 ;
uniform float uniform_directLightSource[9*max_directLight] ;
varying vec4 varying_mvPose; 
varying vec3 varying_eyeNormal; 
varying vec2 varying_uv0; 
uniform sampler2D albedoTex; 
uniform sampler2D normalTex; 
uniform sampler2D glossTex; 
uniform sampler2D specularTex; 
uniform sampler2D opacityTex; 

uniform mat4 uniform_ViewMatrix; 
mat3 TBN; 
mat4 normalMatrix ;
vec3 normalDirection;
vec3 light;
vec3 normalTexColor ;
vec4 opacityTexColor ;
vec4 glossTexColor ;
vec4 specularTexColor ;
vec4 albedoTexColor ;
vec2 uv_0;
mat4 transpose(mat4 inMatrix) {
    vec4 i0 = inMatrix[0];
    vec4 i1 = inMatrix[1];
    vec4 i2 = inMatrix[2];
    vec4 i3 = inMatrix[3];

    mat4 outMatrix = mat4(
                 vec4(i0.x, i1.x, i2.x, i3.x),
                 vec4(i0.y, i1.y, i2.y, i3.y),
                 vec4(i0.z, i1.z, i2.z, i3.z),
                 vec4(i0.w, i1.w, i2.w, i3.w)
                 );

    return outMatrix;
}

mat4 inverse(mat4 m) {
  float
      a00 = m[0][0], a01 = m[0][1], a02 = m[0][2], a03 = m[0][3],
      a10 = m[1][0], a11 = m[1][1], a12 = m[1][2], a13 = m[1][3],
      a20 = m[2][0], a21 = m[2][1], a22 = m[2][2], a23 = m[2][3],
      a30 = m[3][0], a31 = m[3][1], a32 = m[3][2], a33 = m[3][3],

      b00 = a00 * a11 - a01 * a10,
      b01 = a00 * a12 - a02 * a10,
      b02 = a00 * a13 - a03 * a10,
      b03 = a01 * a12 - a02 * a11,
      b04 = a01 * a13 - a03 * a11,
      b05 = a02 * a13 - a03 * a12,
      b06 = a20 * a31 - a21 * a30,
      b07 = a20 * a32 - a22 * a30,
      b08 = a20 * a33 - a23 * a30,
      b09 = a21 * a32 - a22 * a31,
      b10 = a21 * a33 - a23 * a31,
      b11 = a22 * a33 - a23 * a32,

      det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

  return mat4(
      a11 * b11 - a12 * b10 + a13 * b09,
      a02 * b10 - a01 * b11 - a03 * b09,
      a31 * b05 - a32 * b04 + a33 * b03,
      a22 * b04 - a21 * b05 - a23 * b03,
      a12 * b08 - a10 * b11 - a13 * b07,
      a00 * b11 - a02 * b08 + a03 * b07,
      a32 * b02 - a30 * b05 - a33 * b01,
      a20 * b05 - a22 * b02 + a23 * b01,
      a10 * b10 - a11 * b08 + a13 * b06,
      a01 * b08 - a00 * b10 - a03 * b06,
      a30 * b04 - a31 * b02 + a33 * b00,
      a21 * b02 - a20 * b04 - a23 * b00,
      a11 * b07 - a10 * b09 - a12 * b06,
      a00 * b09 - a01 * b07 + a02 * b06,
      a31 * b01 - a30 * b03 - a32 * b00,
      a20 * b03 - a21 * b01 + a22 * b00) / det;
}

vec3 unpackNormal(vec4 packednormal)
{
	return packednormal.xyz * 2.0 - 1.0;
}

mat3 cotangentFrame(vec3 N, vec3 p, vec2 uv) { 
vec3 dp1 = dFdx(p); 
vec3 dp2 = dFdy(p); 
vec2 duv1 = dFdx(uv); 
vec2 duv2 = dFdy(uv);  
vec3 dp2perp = cross(dp2, N); 
vec3 dp1perp = cross(N, dp1); 
vec3 T = dp2perp * duv1.x + dp1perp * duv2.x; 
vec3 B = dp2perp * duv1.y + dp1perp * duv2.y; 
float invmax = 1.0 / sqrt(max(dot(T,T), dot(B,B))); 
return mat3(T * invmax, B * invmax, N); 
}

//vec3 light;
//vec3 normalTexColor ;
//vec4 opacityTexColor ;
//vec4 glossTexColor ;
//vec4 specularTexColor ;
//vec4 albedoTexColor ;
//vec3(0.0,-1.0,0.0) ,  vec3(0.0,0.0,1.0) , vec3(0.9,0.9,0.9)
vec3 fakePBRLight( vec3 lightDir , vec3 viewDir , vec3 lightColor , vec3 ambient ){
    vec3 lightDirection = mat3(uniform_ViewMatrix) * normalize(lightDir);
    vec3 halfDirection = normalize( lightDirection + viewDir) ;
//////lighting
    float attenuation = 1.0 ;// UnitySampleShadowmap(i._ShadowCoord)
    vec3 attenColor = attenuation * lightColor;
    float Pi = 3.141592654;
    float InvPi = 0.31830988618;
//////gloss
    float gloss = glossTexColor.r;
    float specPow = exp2( gloss * 10.0 + 1.0 );
////// Specular:lightDir + normalize(viewDir)
    float NdotL = max(0.0, dot( normalDirection, lightDirection ));
    float specularMonochrome = max( max(specularTexColor.r, specularTexColor.g), specularTexColor.b);
    float normTerm = (specPow + 8.0 ) / (8.0 * Pi);
////// (floor(attenuation) * lightColor ) *  
    vec3 directSpecular =  (floor(attenuation) * lightColor ) * pow(max(0.0,dot(halfDirection,normalDirection)),normTerm) * specularTexColor.xyz * normTerm ;
    vec3 specular = directSpecular;
    //float specularPower = pow(max(0.0,dot(halfDirection,normalDirection)),5.0) ; 
////// Diffuse:
    NdotL = max(0.0,dot( normalDirection , normalize(lightDirection) ));
    vec3 directDiffuse = max( 0.0, NdotL) * attenColor;
    vec3 indirectDiffuse = vec3(0.0,0.0,0.0);
		 indirectDiffuse +=  ambient ; // Ambient Light UNITY_LIGHTMODEL_AMBIENT<-?????????? uniform ??float ? ????0
    vec3 diffuseColor = albedoTexColor.rgb;
    diffuseColor *= 1.0-specularMonochrome;
    vec3 diffuse = (directDiffuse + indirectDiffuse) * diffuseColor;
  /// Final Color:
    vec3 finalColor = diffuse + specular ;
    return finalColor ;
}

void calculateDirectLight(  ){
    float lambertTerm , specular ; 
    vec3 dir ,viewDir = normalize(varying_mvPose.xyz/varying_mvPose.w); 
    for(int i = 0 ; i < max_directLight ; i++){ 
         DirectLight directLight ; 
         directLight.direction = vec3(uniform_directLightSource[i*9],uniform_directLightSource[i*9+1],uniform_directLightSource[i*9+2]); 
         directLight.diffuse = vec3(uniform_directLightSource[i*9+3],uniform_directLightSource[i*9+4],uniform_directLightSource[i*9+5]); 
         directLight.ambient = vec3(uniform_directLightSource[i*9+6],uniform_directLightSource[i*9+7],uniform_directLightSource[i*9+8]); 
         dir = normalize(directLight.direction) ; 
         light.xyz += fakePBRLight( dir , viewDir , directLight.diffuse , directLight.ambient); 
    }
}

void main(void){ 
     //normalMatrix
    //  normalMatrix = inverse(uniform_ViewMatrix);
    //  normalMatrix = transpose(normalMatrix);
     //TBN
     TBN = cotangentFrame(normalize(varying_eyeNormal), normalize(-varying_mvPose.xyz) , uv_0); 
     //sampler2D
     normalTexColor = unpackNormal(texture2D(normalTex, uv_0 )) ; 
     opacityTexColor = texture2D(opacityTex, uv_0 ) ; 
     glossTexColor = texture2D(glossTex, uv_0 );
     specularTexColor = texture2D(specularTex, uv_0 );
     albedoTexColor = texture2D(albedoTex, uv_0 );
     // Perturbed normals
     normalDirection = TBN * normalTexColor.xyz ;
     if( (step(materialSource.cutAlpha,opacityTexColor.g) - 0.5) < 0.0 ){
        discard;
     }
     calculateDirectLight();
     vec4 finalRGBA = vec4(light,1.0) ;
     gl_FragColor = finalRGBA;    
}