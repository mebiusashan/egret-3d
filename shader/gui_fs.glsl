varying vec4 varying_uv; 
varying vec4 varying_color; 
varying vec4 varying_pos; 
varying vec4 varying_mask; 
vec4 diffuseColor; 
uniform sampler2D uiTexture_0; 
uniform sampler2D uiTexture_1; 
uniform sampler2D uiTexture_2; 
uniform sampler2D uiTexture_3; 
uniform sampler2D uiTexture_4; 
uniform sampler2D uiTexture_5; 
uniform sampler2D uiTexture_6; 

const int FLAG_VALLID_QUAD = 0;
const int FLAG_IS_VISIBLE = 1;
const int FLAG_HAS_MASK = 2;
const int FLAG_HAS_TEXTURE = 3;
const int FLAG_IS_TEXTFIELD = 4;

bool booleanArray[5];

void decodeBooleanArray(float data){
	float headData;

	data *= 0.5;
	headData = data;
	data = floor(data);
	booleanArray[0] = (headData - data) > 0.2;

	data *= 0.5;
	headData = data;
	data = floor(data);
	booleanArray[1] = (headData - data) > 0.2;

	data *= 0.5;
	headData = data;
	data = floor(data);
	booleanArray[2] = (headData - data) > 0.2;

	data *= 0.5;
	headData = data;
	data = floor(data);
	booleanArray[3] = (headData - data) > 0.2;

	data *= 0.5;
	headData = data;
	data = floor(data);
	booleanArray[4] = (headData - data) > 0.2;
}

void main(void){

	decodeBooleanArray(varying_pos.w);
	
	
	if(booleanArray[FLAG_VALLID_QUAD] == false || booleanArray[FLAG_IS_VISIBLE] == false){
		discard;
	}

	if(booleanArray[FLAG_HAS_MASK]){
      vec4 mask = varying_mask;
      if( (2.0*mask.x-1.0) > varying_pos.x){ 
		discard; 
      } 
      if( (-2.0*mask.y+1.0) < varying_pos.y){
		discard; 
      }
      if( (2.0*mask.z-1.0) < varying_pos.x){
		discard; 
      }
      if( (-2.0*mask.w+1.0) > varying_pos.y){
		discard; 
      }
	}

	vec2 uv = varying_uv.xy ;
	int index = int(floor(varying_pos.z)); 
	if(booleanArray[FLAG_HAS_TEXTURE] == false){
		diffuseColor = vec4(1.0, 1.0, 1.0, 1.0);//NULL_WHITE DEFAULT
	}
	else{
		if(index==0){
			diffuseColor = texture2D(uiTexture_0, uv ); 
		}
		else if(index==1){
			diffuseColor = texture2D(uiTexture_1, uv ); 
		}
		else if(index==2){
			diffuseColor = texture2D(uiTexture_2, uv ); 
		}
		else if(index==3){
			diffuseColor = texture2D(uiTexture_3, uv ); 
		}
		else if(index==4){
			diffuseColor = texture2D(uiTexture_4, uv ); 
		}
		else if(index==5){
			diffuseColor = texture2D(uiTexture_5, uv ); 
		}
		else if(index==6){
			diffuseColor = texture2D(uiTexture_6, uv ); 
		}

		//文字渲染部分
		if(booleanArray[FLAG_IS_TEXTFIELD]){
			int clrChannel = int(uv.x);
			uv.x -= float(clrChannel);
			float fontAlpha = 1.0;
			if(clrChannel == 0){
				fontAlpha = diffuseColor.x;
			}else if(clrChannel == 1){
				fontAlpha = diffuseColor.y;
			} else if(clrChannel == 2){
				fontAlpha = diffuseColor.z;
			}else if(clrChannel == 3){
				fontAlpha = diffuseColor.w;
			}
			//文本的颜色最多为255，而实际上应该可以达到256，所以这里弥补一下。
			if(fontAlpha > 0.9){
				fontAlpha = 1.0;
			}
			diffuseColor = vec4(1.0, 1.0, 1.0, fontAlpha);
		}

	}
 
	if(diffuseColor.w < 0.01 || varying_color.w < 0.01){
		discard;
	}

	diffuseColor.xyz *= varying_color.xyz;
	diffuseColor.w *= varying_color.w;

	diffuseColor.xyz *= diffuseColor.w;
	diffuseColor = clamp(diffuseColor, 0.0, 1.0); 
	gl_FragColor = diffuseColor; 
}