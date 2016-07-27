uniform samplerCube environmentMapTex ;
uniform float reflectValue;
void main(){
  	vec3 r = reflect(-vec3(0.0,0.0,1.0),  normal  );
	vec4 reflectiveColor = textureCube(environmentMapTex,r.xyz);
	diffuseColor.xyz = mix( diffuseColor.xyz,reflectiveColor.xyz, specularColor.y + reflectValue );  
}
         