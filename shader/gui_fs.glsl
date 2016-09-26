varying vec4 varying_uv; 
varying vec4 varying_color; 
varying vec4 varying_pos; 
varying float varying_textureIndex; 
vec4 diffuseColor; 
uniform sampler2D uiTexture_0; 
uniform sampler2D uiTexture_1; 
uniform sampler2D uiTexture_2; 
uniform sampler2D uiTexture_3; 
uniform sampler2D uiTexture_4; 
uniform sampler2D uiTexture_5; 
uniform sampler2D uiTexture_6; 
varying vec4 varying_mask; 

void main(){ 
  if( varying_color.w == -1.0 ){
     discard; 
  }

  if(varying_mask.x>=0.0){
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
  int index = int(floor(varying_textureIndex)) ; 
  if(index < 0){
	  if(index == -1){
		diffuseColor = vec4(1.0, 1.0, 1.0, 1.0);//NULL_WHITE DEFAULT
	  }else{
		discard;								//EMPTY_QUAD INVISIBLE						
	  }
  }
  else{
	if(index==0){
		diffuseColor.xyzw = texture2D(uiTexture_0, uv ).xyzw; 
	}else if(index==1){
		diffuseColor.xyzw = texture2D(uiTexture_1, uv ).xyzw; 
	}
	else if(index==2){
		diffuseColor.xyzw = texture2D(uiTexture_2, uv ).xyzw; 
	}
	else if(index==3){
		diffuseColor.xyzw = texture2D(uiTexture_3, uv ).xyzw; 
	}
	else if(index==4){
		diffuseColor.xyzw = texture2D(uiTexture_4, uv ).xyzw; 
	}
	else if(index==5){
		diffuseColor.xyzw = texture2D(uiTexture_5, uv ).xyzw; 
	}
	else if(index==6){
		diffuseColor.xyzw = texture2D(uiTexture_6, uv ).xyzw; 
	}
  }

  
  //文字渲染部分
  if(varying_pos.w==1.0){
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
  if(diffuseColor.w < 0.01 || varying_color.w < 0.01){
    discard;
  }

  diffuseColor.xyz *= varying_color.xyz;
  diffuseColor.w *= varying_color.w;

  diffuseColor.xyz *= diffuseColor.w;
  diffuseColor = clamp(diffuseColor, 0.0, 1.0); 
  gl_FragColor = diffuseColor; 
}