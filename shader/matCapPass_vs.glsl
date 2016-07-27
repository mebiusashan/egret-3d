varying vec2 capCoord ;
void main(void){
        capCoord.x = dot(normalMatrix[0].xyz,normal);
        capCoord.y = dot(normalMatrix[1].xyz,normal);
        capCoord = capCoord * 0.5 + 0.5;
        ambientColor.xyz +=  + capCoord.xyz * 2.0 - 1.0 ;
}