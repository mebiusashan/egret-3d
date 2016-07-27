uniform sampler2D matcapTexture;
void main() {
  	vec4 capCoord ; 
	capCoord.x = -normal.x; 
	capCoord.y = normal.y; 
	capCoord.xy = capCoord.xy * 0.5 + 0.5; 
	capCoord = texture2D(matcapTexture , capCoord.xy ) ; 
	diffuseColor.xyz *= capCoord.xyz * 2.0 ; 
}



