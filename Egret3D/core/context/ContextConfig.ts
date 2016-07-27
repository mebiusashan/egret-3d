module egret3d {

    /**
    * @private
    */
    export enum InternalFormat { PixelArray, CompressData, ImageData };

    /**
    * @private
    */
    //export class ColorFormat {
    //    ColorFormat_RGBA8888
    //} 

    /**
    * @private
    */
    export enum FrameBufferType { shadowFrameBufrfer, defaultFrameBuffer, positionFrameBuffer, normalFrameBuffer, specularFrameBuffer, leftEyeFrameBuffer, rightEyeFrameBuffer, nextFrameBuffer }
    
    /**
    * @private
    */
    export enum FrameBufferFormat { FLOAT_RGB, FLOAT_RGBA, UNSIGNED_BYTE_RGB, UNSIGNED_BYTE_RGBA }

    /**
    * @language zh_CN
    * 渲染混合模式
    * BlendMode 类中的一个值，用于指定要使用的混合模式。 内部绘制位图的方法有两种。 如果启用了混合模式或外部剪辑遮罩，则将通过向矢量渲染器添加有位图填充的正方形来绘制位图。 如果尝试将此属性设置为无效值，则 Flash 运行时会将此值设置为 BlendMode.NORMAL。 
    * blendMode 属性影响显示对象的每个像素。每个像素都由三种原色（红色、绿色和蓝色）组成，每种原色的值介于 0x00 和 0xFF 之间。Flash Player 或 Adobe AIR 将影片剪辑中一个像素的每种原色与背景中像素的对应颜色进行比较。例如，如果 blendMode 设置为 BlendMode.LIGHTEN，则 Flash Player 或 Adobe AIR 会将显示对象的红色值与背景的红色值进行比较，然后使用两者中较亮的一种颜色作为显示颜色的红色成分的值。
    * 下表将对 blendMode 设置进行说明。BlendMode 类定义可使用的字符串值。表中的插图显示应用于交叠于显示对象 (1) 之上的圆形显示对象 (2) 的 blendMode 值。
    * @version Egret 3.0
    * @platform Web,Native
    */
    export enum BlendMode {
        /**
         * @language zh_CN
         * 将显示对象的每个像素的 Alpha 值应用于背景。
         * @version Egret 3.0
         * @platform Web,Native
         */
        ALPHA,
        
        /**
         * @language zh_CN
         * 强制为该显示对象创建一个透明度组。
         * @version Egret 3.0
         * @platform Web,Native
         */
        LAYER, 

        /**
        * @language zh_CN
        * 该显示对象出现在背景前面。
        * @version Egret 3.0
        * @platform Web,Native
        */
        NORMAL, 

        /**
        * @language zh_CN
        * 将显示对象的原色值与背景颜色的原色值相乘，然后除以 0xFF 进行标准化，从而得到较暗的颜色。
        * @version Egret 3.0
        * @platform Web,Native
        */
        MULTIPLY, 

        /**
        * @language zh_CN
        * 将显示对象的原色值添加到它的背景颜色中，上限值为 0xFF。
        * @version Egret 3.0
        * @platform Web,Native
        */
        ADD, 


        /**
        * @language zh_CN
        * 从背景颜色的值中减去显示对象原色的值，下限值为 0。
        * @version Egret 3.0
        * @platform Web,Native
        */
        SUB, 
        /**
        * @language zh_CN
        * 将显示对象颜色的补色（反色）与背景颜色的补色相除。
        * @version Egret 3.0
        * @platform Web,Native
        */
        DIV, 
        /**
        * @language zh_CN
        * 将显示对象颜色的补色（反色）与背景颜色的补色相乘，会产生漂白效果。
        * @version Egret 3.0
        * @platform Web,Native
        */
        SCREEN,
        /**
        * @language zh_CN
        * 将显示对象的原色值添加到它的背景颜色中(较ADD稍微暗一些)，上限值为 0xFF。
        * @version Egret 3.0
        * @platform Web,Native
        */
        SOFT_ADD,

    }
    /**
     * @class egret3d.ContextSamplerType
     * @classdesc
     * 贴图采样类型
     */
    export class ContextSamplerType {

        /**
        * @language zh_CN
        * 纹理0数据
        */
        public static TEXTURE_0: any;

        /**
        * @language zh_CN
        * 纹理1数据
        */
        public static TEXTURE_1: any;
        
        /**
        * @language zh_CN
        * 纹理2数据
        */
        public static TEXTURE_2: any;
        
        /**
        * @language zh_CN
        * 纹理3数据
        */
        public static TEXTURE_3: any;
        
        /**
        * @language zh_CN
        * 纹理4数据
        */
        public static TEXTURE_4: any;
        
        /**
        * @language zh_CN
        * 纹理5数据
        */
        public static TEXTURE_5: any;
        
        /**
        * @language zh_CN
        * 纹理6数据
        */
        public static TEXTURE_6: any;
        
        /**
        * @language zh_CN
        * 纹理7数据
        */
        public static TEXTURE_7: any;
        
        /**
        * @language zh_CN
        * 纹理8数据
        */
        public static TEXTURE_8: any;

        /**
        * @language zh_CN
        * 重复 0~1 的纹理坐标 例如：5.2 % 1 = 0.2
        */
        public static REPEAT: number;

        /**
        * @language zh_CN
        * 重复 0~1 的纹理坐标 例如：5.2 % 1 = 0.2
        */
        public static NEAREST: number;

        /**
        * @language zh_CN
        * 重复 0~1 的纹理坐标 例如：5.2 % 1 = 0.2
        */
        public static LINEAR: number;
    }

    /**
    * @class egret3d.DrawMode
    * @classdesc
    * 渲染模式
    * LINES 线框显示模式
    * POINTS 点显示模式
    * TRIANGLES 三角形显示模式
    * LINE_STRIP 连接线显示模式
    */
    export class DrawMode {
                    
        /**
         * @language zh_CN
         * 线框显示模式
         */
        static LINES: number;
                            
        /**
         * @language zh_CN
         * 点显示模式
         */
        static POINTS: number;
                                    
        /**
         * @language zh_CN
         * 三角形显示模式
         */
        static TRIANGLES: number;
                                    
        /**
         * @language zh_CN
         * 连接线显示模式
         */
        static LINE_STRIP: number;

    }
          

    /**
    * @class egret3d.Egret3DDrive
    * @classdesc
    * 3d 驱动 一些配置类型
    */
    export class ContextConfig {
                    
        /**
        * @private
        */
        static Direct3D_Opengl_Auto: string = "Direct3D_Opengl_Auto";
                            
        /**
        * @private
        */
        static Direct3D_9_0: string = "Direct3D_9_0";
                            
        /**
        * @private
        */
        static Direct3D_10_0: string = "Direct3D_10_0";
                            
        /**
        * @private
        */
        static Direct3D_11_0: string = "Direct3D_11_0";
                            
        /**
        * @private
        */
        static OpenGLES_2_0: string = "OpenGLES_2_0";
                            
        /**
        * @private
        */
        static OpenGLES_3_0: string = "OpenGLES_3_0";
                            
        /**
        * @private
        */
        static OpenGL: string = "OpenGL";
                            
        /**
        * @private
        */
        static context3D: Context3DProxy;
                            
        /**
        * @private
        */
        static canvas: HTMLCanvasElement;
                            
        /**
        * @private
        */
        static VERTEX_SHADER: number;
                            
        /**
        * @private
        */
        static FRAGMENT_SHADER: number;
                            
        /**
        * @private
        */
        static BLEND: number;
                            
        /**
        * @private
        */
        static FLOAT: number;
                            
        /**
        * @private
        */
        static CULL_FACE: number;
                            
                
        /**
         * @language zh_CN
         * 裁剪正面进行反面渲染
         * @version Egret 3.0
         * @platform Web,Native
         */
        static FRONT: number;
                
        /**
        * @language zh_CN
        * 裁剪反面进行正面渲染
        * @version Egret 3.0
        * @platform Web,Native
        */
        static BACK: number;
        
        /**
        * @language zh_CN
        * 裁剪正面和反面
        * @version Egret 3.0
        * @platform Web,Native
        */
        static FRONT_AND_BACK: number;   
     
        /**
        * @language zh_CN
        * 深度测试
        * @version Egret 3.0
        * @platform Web,Native
        */
        static DEPTH_TEST: number;
 
        /**
        * @language zh_CN
        * 深度缓冲值
        * @version Egret 3.0
        * @platform Web,Native
        */
        static DEPTH_BUFFER_BIT: number;
                                    
        /**
        * @private
        */
        static ELEMENT_ARRAY_BUFFER: number;
                                            
        /**
        * @private
        */
        static UNSIGNED_SHORT: number;
                                            
        /**
        * @private
        */
        static NEAREST: number;
                                            
        /**
        * @private
        */
        static REPEAT: number;
                                            
        /**
        * @private
        */
        static ONE: number;
                                            
        /**
        * @private
        */
        static ZERO: number;
                                            
        /**
        * @private
        */
        static SRC_ALPHA: number;
                                            
        /**
        * @private
        */
        static ONE_MINUS_SRC_ALPHA: number;
                                            
        /**
        * @private
        */
        static SRC_COLOR: number;
                                            
        /**
        * @private
        */
        static ONE_MINUS_SRC_COLOR: number;
                                            
        /**
        * @private
        */
        static ColorFormat_RGB565: number;
                                            
        /**
        * @private
        */
        static ColorFormat_RGBA5551: number;
                                            
        /**
        * @private
        */
        static ColorFormat_RGBA4444: number;
                                            
        /**
        * @private
        */
        static ColorFormat_RGBA8888: number;
                                            
        /**
        * @private
        */
        static ColorFormat_DXT1_RGB: number = 0;
                                            
        /**
        * @private
        */
        static ColorFormat_DXT1_RGBA: number = 0;
                                            
        /**
        * @private
        */
        static ColorFormat_DXT3_RGBA: number = 0;
                                            
        /**
        * @private
        */
        static ColorFormat_DXT5_RGBA: number = 0;

        /**
        * canvas窗口矩形
        */
        static canvasRectangle: Rectangle ;
                                            
        /**
        * 用户窗口矩形
        */
        static clientRect: ClientRect;

        /**
        * @private
        */
        static LEQUAL: number;
    }
}