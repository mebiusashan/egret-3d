attribute vec4 attribute_position; 
attribute vec3 attribute_shapePosition; 
attribute vec4 attribute_uvRec; 
attribute vec4 attribute_rotate; 
attribute vec4 attribute_maskRectangle; 
attribute vec4 attribute_quad_color; 
varying vec4 varying_uv; 
varying vec4 varying_color; 
varying vec4 varying_pos; 
varying vec4 varying_mask; 
varying float varying_textureIndex; 
vec4 outPosition; 
uniform mat4 uniform_ModelMatrix; 
uniform mat4 uniform_ViewMatrix; 
uniform mat4 uniform_ProjectionMatrix; 
uniform mat4 uniform_orthProectMatrix; 
uniform float uniform_materialSource[20]; 

mat4 buildMat4Quat(vec4 quat){ 
float xx = quat.x * quat.x; 
float xy = quat.x * quat.y; 
float xz = quat.x * quat.z; 
float xw = quat.x * quat.w; 
float yy = quat.y * quat.y; 
float yz = quat.y * quat.z; 
float yw = quat.y * quat.w; 
float zz = quat.z * quat.z; 
float zw = quat.z * quat.w; 
return mat4( 
1.0 - 2.0 * (yy + zz),		2.0 * (xy + zw),		2.0 * (xz - yw),		0, 
2.0 * (xy - zw),				1.0 - 2.0 * (xx + zz),	2.0 * (yz + xw),		0, 
2.0 * (xz + yw),				2.0 * (yz - xw),		1.0 - 2.0 * (xx + yy),	0, 
0.0,							0.0,					0.0,					1 
); 
}
void main(void){
	
    float devicePixelRatio = 1.0;//uniform_materialSource[19];
    mat4 mvMatrix = mat4(uniform_ViewMatrix * uniform_ModelMatrix); 
    mat4 po = buildMat4Quat(attribute_rotate.xyzw); 
    mat4 oth = uniform_orthProectMatrix; 
    float px = oth[0].x ;
    float py = oth[1].y ;
    
    oth[0].x = oth[0].x / devicePixelRatio ; 
    oth[1].y = oth[1].y / devicePixelRatio ; 
    
    vec3 pos = mat3(po) * (attribute_position.xyz * vec3(attribute_uvRec.zw,1.0) ) + vec3(attribute_shapePosition.xy,1.0) ; 
    vec3 sceneWH = vec3( 1.0/ oth[0].x, -1.0/oth[1].y , 0.0 )  ; 
    outPosition = mvMatrix * vec4( pos - sceneWH , 1.0 ) ; 
    varying_color = attribute_quad_color ; 
    
    if( attribute_position.z >= 100000.0 ){ 
        varying_color.w = -1.0 ; 
    } 
    
    varying_pos = outPosition = oth * outPosition ; 
    varying_pos.w = attribute_position.w ; 
    vec4 maskk = attribute_maskRectangle;
    
    sceneWH = vec3(2.0/px*devicePixelRatio,2.0/py*devicePixelRatio,1.0) ;
    
    varying_mask = vec4(maskk.xy/sceneWH.xy,(maskk.x+maskk.z)/sceneWH.x ,  (maskk.y+maskk.w)/(sceneWH.y)) ; 
    varying_uv = attribute_uvRec; 
	varying_textureIndex = floor(attribute_shapePosition.z);
	int texIndex = int(attribute_shapePosition.z);

	if(texIndex == -2 || texIndex == -3){
		outPosition = vec4(0.0,0.0,0.0,0.0); //NULL_QUAD,NULL_INVISIBLE
	}else{
		gl_Position = outPosition; 
	}
	gl_PointSize = uniform_materialSource[18];
    
}