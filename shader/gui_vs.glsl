attribute vec4 attribute_position; 
attribute vec4 attribute_shapePosition; 
attribute vec4 attribute_uvRec; 
attribute vec4 attribute_rotate; 
attribute vec4 attribute_maskRectangle; 
attribute vec4 attribute_quad_color; 
varying vec4 varying_uv; 
varying vec4 varying_color; 
varying vec4 varying_pos; 
varying vec4 varying_mask; 
varying float varying_boolList;

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

const int FLAG_VALLID_QUAD = 0;
const int FLAG_IS_VISIBLE = 1;
const int FLAG_HAS_MASK = 2;
const int FLAG_HAS_TEXTURE = 3;
const int FLAG_IS_TEXTFIELD = 4;


bool booleanArray[5];

void decodeBooleanArray(float data){
	float headData;
	for(int i = 0; i < 5; i ++){
		data *= 0.5;
		headData = data;
		data = floor(data);
		booleanArray[i] = (headData - data) > 0.2;
	}
}

void main(void){

	gl_PointSize = uniform_materialSource[18];
	varying_pos.zw = attribute_shapePosition.zw;
	decodeBooleanArray(attribute_shapePosition.w);
	if(booleanArray[FLAG_VALLID_QUAD] == false || booleanArray[FLAG_IS_VISIBLE] == false){
		outPosition = vec4(0.0,0.0,0.0,1.0);
		gl_Position = outPosition; 
		return;
	}

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
    
    outPosition = oth * outPosition ; 
	varying_pos.xy = outPosition.xy;
    vec4 maskk = attribute_maskRectangle;
    
    sceneWH = vec3(2.0/px*devicePixelRatio,2.0/py*devicePixelRatio,1.0) ;
    
    varying_mask = vec4(maskk.xy/sceneWH.xy,(maskk.x+maskk.z)/sceneWH.x, (maskk.y+maskk.w)/(sceneWH.y)) ; 
    varying_uv = attribute_uvRec; 

	int texIndex = int(attribute_shapePosition.z);
	gl_Position = outPosition; 
    
}