//uniform float AveLum;
//uniform int imgH,imgW;
varying vec2 varying_uv0;
uniform sampler2D diffuseTexture;
void main()
{
    vec2 uv = vec2(varying_uv0.x,1.0-varying_uv0.y);
	 float dx = 1.0/float(1024.0);
	 float dy = 1.0/float(1024.0);
	 //diffuseTexture
	 vec4 outColor ;
     vec4 color = outColor = texture2D(diffuseTexture,uv.xy);
	 color += texture2D(diffuseTexture,uv.xy+vec2(dx*3.0,0.0));

	 color += texture2D(diffuseTexture,uv.xy+vec2(0.0,dy));
	 color += texture2D(diffuseTexture,uv.xy+vec2(dx*3.0,dy));

	 color += texture2D(diffuseTexture,uv.xy+vec2(0.0,dy*2.0));
	 color += texture2D(diffuseTexture,uv.xy+vec2(dx*3.0,dy*2.0));

	 color += texture2D(diffuseTexture,uv.xy+vec2(0.0,dy*3.0));
	 color += texture2D(diffuseTexture,uv.xy+vec2(dx*3.0,dy*3.0));
	 color /= 8.0;
	 //计算该像素在Tone Mapping之后的亮度值，如果依然很大，则该像素将产生光晕
	 vec4 cout = vec4(0.0,0.0,0.0,0.0);
	 float lum = color.x * 0.3 + color.y *0.59 + color.z * 0.11;
	 vec4 p = color*(lum/0.1);
	 p /= vec4(vec4(1.0,1.0,1.0,0.0)+p);
	 float luml = (p.x+p.y+p.z)/3.0;
	 if (luml > 0.8)
	 {
	 	cout = color ;
	 }
    
    gl_FragColor = cout ;
}