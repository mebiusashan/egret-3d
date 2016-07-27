//uniform float AveLum;
//uniform int imgH,imgW;
varying vec2 varying_uv0;
uniform sampler2D diffuseTexture;
uniform sampler2D colorTexture;

// const float curve[12] = [-3.0,-2.5,-2.0,-1.5,-1.0,-0.5,0.0,0.5,1.0,1.5,2.0,2.5,3.0];
// const float delayPos[12] = [-3.0,-2.5,-2.0,-1.5,-1.0,-0.5,0.0,0.5,1.0,1.5,2.0,2.5,3.0];
void main()
{
    vec2 uv = vec2(varying_uv0.x,1.0-varying_uv0.y); 
	 float d = 1.0/float(1024.0); 
	 vec4 color = vec4(0.0,0.0,0.0,0.0); 
	 color +=     texture2D(diffuseTexture,uv.xy+vec2(0.0,-8.0*d)) * 0.001;
	 color +=     texture2D(diffuseTexture,uv.xy+vec2(0.0,-7.0*d)) * 0.105;
	 color +=     texture2D(diffuseTexture,uv.xy+vec2(0.0,-6.0*d)) * 0.217;
	 color +=     texture2D(diffuseTexture,uv.xy+vec2(0.0,-5.0*d)) * 0.344;
	 color +=     texture2D(diffuseTexture,uv.xy+vec2(0.0,-4.0*d)) * 0.492;
	 color +=     texture2D(diffuseTexture,uv.xy+vec2(0.0,-3.0*d)) * 0.55; 
	 color +=     texture2D(diffuseTexture,uv.xy+vec2(0.0,-2.0*d)) * 0.69; 
	 color +=     texture2D(diffuseTexture,uv.xy+vec2(0.0,-1.0*d)) * 0.70; 
	 color +=     texture2D(diffuseTexture,uv.xy) * 1.0; 
	 color +=     texture2D(diffuseTexture,uv.xy+vec2(0.0, 1.0*d)) * 0.70; 
	 color +=     texture2D(diffuseTexture,uv.xy+vec2(0.0, 2.0*d)) * 0.69; 
	 color +=     texture2D(diffuseTexture,uv.xy+vec2(0.0, 3.0*d)) * 0.55; 
	 color +=     texture2D(diffuseTexture,uv.xy+vec2(0.0, 4.0*d)) * 0.492;
	 color +=     texture2D(diffuseTexture,uv.xy+vec2(0.0, 5.0*d)) * 0.344;
	 color +=     texture2D(diffuseTexture,uv.xy+vec2(0.0, 6.0*d)) * 0.217;
	 color +=     texture2D(diffuseTexture,uv.xy+vec2(0.0, 7.0*d)) * 0.105;
	 color +=     texture2D(diffuseTexture,uv.xy+vec2(0.0, 8.0*d)) * 0.001;
	 color /= 8.0; 
	 //color *= 2.0 ;
    gl_FragColor = color + texture2D(colorTexture,uv.xy);
	
}