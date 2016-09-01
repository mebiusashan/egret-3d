module egret3d {
    
    /**
    * @class egret3d.Context3DProxy
    * @classdesc
    * Context3DProxy 类提供了用于呈现几何定义图形的上下文。</p>
    *
    * 渲染上下文包括一个绘图表面及其关联的资源和状态。</p>
    * Context3DProxy 渲染上下文是一个可编程的管道，基于OpenGL ES 2.0规范。</p>
    * 您可以通过提供适当的顶点和像素片段程序来创建 2D/3D渲染器，不同的平台有不同的硬件限制，对于移动端限制要求比较大。</p>
    * 一个canvas 只能申请一个Context3DProxy。</p>
    *
    * @see egret3d.Program3D
    * @see egret3d.IndexBuffer3D
    * @see egret3d.VertexBuffer3D
    * @see egret3d.Texture2D
    * @see egret3d.Shader
    * @see egret3d.CubeTexture
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class Context3DProxy {
       

        /**
         * @language zh_CN
         * @private
         * WebGLRenderingContext 的引用
        */
        public static gl: WebGLRenderingContext;

        /**
         * @language zh_CN
         * @private
        */
        public version: string;

        /**
        * @language zh_CN
        * @private
        * 渲染3D 的驱动设备是否存在，或者丢失。
        * 一般情况下，当切换程序的时候，设备将会丢失，
        * 这个时候就需要快速重新申请设备，并将相应的资源buffer，texture重新提交至显卡
        */
        public isLost: boolean = false ;

        //-------cache-------
        private DEPTH_TEST: boolean = false;

        private CULL_FACE: boolean = false;

        private BLEND: boolean = false;

        private blend_Factors_src: number = -1;

        private blend_Factors_dst: number = -1;

        private cullingMode: number = -1;

        private depthCompareMode: number = -1;

        private program: Program3D;

        private programChange: boolean;

        private cacheVertexPoint: { [key: number]: number } = [];

        private cacheVertexFormat: number = 0; 
        
        //--------------


        /**
        * @private
        * @language zh_CN
        * get GPU Context3DProxy 
        * 注册并初始化相关 GPU 参数配置信息
        * 用于设置显卡的相关参数
        */
        public register() {

    

            var extension;
            extension = Context3DProxy.gl.getExtension('WEBGL_depth_texture') || Context3DProxy.gl.getExtension('MOZ_WEBGL_depth_texture') || Context3DProxy.gl.getExtension('WEBKIT_WEBGL_depth_texture');
            extension = Context3DProxy.gl.getExtension('EXT_texture_filter_anisotropic') || Context3DProxy.gl.getExtension('MOZ_EXT_texture_filter_anisotropic') || Context3DProxy.gl.getExtension('WEBKIT_EXT_texture_filter_anisotropic');
            extension = Context3DProxy.gl.getExtension('WEBGL_compressed_texture_s3tc') || Context3DProxy.gl.getExtension('MOZ_WEBGL_compressed_texture_s3tc') || Context3DProxy.gl.getExtension('WEBKIT_WEBGL_compressed_texture_s3tc');
            extension = Context3DProxy.gl.getExtension('WEBGL_compressed_texture_pvrtc') || Context3DProxy.gl.getExtension('WEBKIT_WEBGL_compressed_texture_pvrtc');
            extension = Context3DProxy.gl.getExtension('WEBGL_compressed_texture_etc1');
            extension = Context3DProxy.gl.getExtension('OES_element_index_uint');

            extension =  Context3DProxy.gl.getExtension('WEBGL_compressed_texture_s3tc');
            extension =  Context3DProxy.gl.getExtension("OES_texture_float_linear");
            extension = Context3DProxy.gl.getExtension("OES_texture_float");
            extension = Context3DProxy.gl.getExtension("OES_texture_half_float");
            extension = Context3DProxy.gl.getExtension("OES_texture_half_float_linear");
            extension = Context3DProxy.gl.getExtension("OES_standard_derivatives");
            extension = Context3DProxy.gl.getExtension("GL_OES_standard_derivatives");
            extension = Context3DProxy.gl.getExtension("WEBGL_draw_buffers");
            extension = Context3DProxy.gl.getExtension("WEBGL_depth_texture");
            extension = Context3DProxy.gl.getExtension("WEBGL_lose_context");
            //WEBGL_color_buffer_float
            //EXT_color_buffer_half_float
            //EXT_texture_filter_anisotropic
            //EXT_frag_depth
            //EXT_shader_texture_lod

            ContextConfig.BLEND = Context3DProxy.gl.BLEND;

            DrawMode.TRIANGLES = Context3DProxy.gl.TRIANGLES;
            DrawMode.POINTS = Context3DProxy.gl.POINTS;
            DrawMode.LINES = Context3DProxy.gl.LINES;
            DrawMode.LINE_STRIP = Context3DProxy.gl.LINE_STRIP;

            ContextConfig.FLOAT = Context3DProxy.gl.FLOAT
            ContextConfig.VERTEX_SHADER = Context3DProxy.gl.VERTEX_SHADER;
            ContextConfig.FRAGMENT_SHADER = Context3DProxy.gl.FRAGMENT_SHADER;

            ContextConfig.FRONT = Context3DProxy.gl.FRONT;
            ContextConfig.BACK = Context3DProxy.gl.BACK;
            ContextConfig.FRONT_AND_BACK = Context3DProxy.gl.FRONT_AND_BACK;

            ContextConfig.DEPTH_BUFFER_BIT = Context3DProxy.gl.DEPTH_BUFFER_BIT;
            ContextConfig.ELEMENT_ARRAY_BUFFER = Context3DProxy.gl.ELEMENT_ARRAY_BUFFER;
            ContextConfig.UNSIGNED_SHORT = Context3DProxy.gl.UNSIGNED_SHORT;

            ContextConfig.NEAREST = Context3DProxy.gl.NEAREST;
            ContextConfig.REPEAT = Context3DProxy.gl.REPEAT;
            ContextConfig.ONE = Context3DProxy.gl.ONE;
            ContextConfig.ZERO = Context3DProxy.gl.ZERO;
            ContextConfig.SRC_ALPHA = Context3DProxy.gl.SRC_ALPHA;
            ContextConfig.ONE_MINUS_SRC_ALPHA = Context3DProxy.gl.ONE_MINUS_SRC_ALPHA;
            ContextConfig.SRC_COLOR = Context3DProxy.gl.SRC_COLOR;
            ContextConfig.ONE_MINUS_SRC_COLOR = Context3DProxy.gl.ONE_MINUS_SRC_COLOR;;

            ContextConfig.ColorFormat_RGB565 = Context3DProxy.gl.RGB565;
            ContextConfig.ColorFormat_RGBA5551 = Context3DProxy.gl.RGB5_A1;
            ContextConfig.ColorFormat_RGBA4444 = Context3DProxy.gl.RGBA4;
            ContextConfig.ColorFormat_RGBA8888 = Context3DProxy.gl.RGBA;

            ContextConfig.DEPTH_TEST = Context3DProxy.gl.DEPTH_TEST;
            ContextConfig.CULL_FACE = Context3DProxy.gl.CULL_FACE;
            ContextConfig.BLEND = Context3DProxy.gl.BLEND;

            ContextConfig.LEQUAL = Context3DProxy.gl.LEQUAL;

            if (extension) {
                ContextConfig.ColorFormat_DXT1_RGB = extension.COMPRESSED_RGB_S3TC_DXT1_EXT;
                ContextConfig.ColorFormat_DXT1_RGBA = extension.COMPRESSED_RGBA_S3TC_DXT1_EXT;
                ContextConfig.ColorFormat_DXT3_RGBA = extension.COMPRESSED_RGBA_S3TC_DXT3_EXT;
                ContextConfig.ColorFormat_DXT5_RGBA = extension.COMPRESSED_RGBA_S3TC_DXT5_EXT;
            }

            ContextSamplerType.TEXTURE_0 = Context3DProxy.gl.TEXTURE0;
            ContextSamplerType.TEXTURE_1 = Context3DProxy.gl.TEXTURE1;
            ContextSamplerType.TEXTURE_2 = Context3DProxy.gl.TEXTURE2;
            ContextSamplerType.TEXTURE_3 = Context3DProxy.gl.TEXTURE3;
            ContextSamplerType.TEXTURE_4 = Context3DProxy.gl.TEXTURE4;
            ContextSamplerType.TEXTURE_5 = Context3DProxy.gl.TEXTURE5;
            ContextSamplerType.TEXTURE_6 = Context3DProxy.gl.TEXTURE6;
            ContextSamplerType.TEXTURE_7 = Context3DProxy.gl.TEXTURE7;
            ContextSamplerType.TEXTURE_8 = Context3DProxy.gl.TEXTURE8;

            console.log("requst GPU Config", Context3DProxy.gl);

            ShaderPool.register(this);
        }

        //public creatBackBuffer(x: number, y: number, width: number, height: number) {
        //    this._canvas.style.left = x.toString();
        //    this._canvas.style.top = y.toString();
        //    this._canvas.width = width;
        //    this._canvas.height = height;
        //    this.viewPort(x, y, width, height);
        //}


        /**
        * @language zh_CN
        * 视口设置定义，用来确定我们定义的视口在canvas中的所在位置
        * @param x 屏幕坐标 X
        * @param y 屏幕坐标 Y
        * @param width  宽度
        * @param height 高度
        * @see egret3d.Egret3DCanvas
        * @version Egret 3.0
        * @platform Web,Native
        */
        public viewPort(x: number, y: number, width: number, height: number) {
            Context3DProxy.gl.viewport(x, ContextConfig.canvasRectangle.height - height - y, width, height);
        }

        /**
        * @language zh_CN
        * 创建 显卡程序
        * @param vsShader
        * @param fsShader
        * @returns Program3D
        * @version Egret 3.0
        * @platform Web,Native
        */
        public creatProgram(vsShader: Shader, fsShader: Shader): Program3D {
            var shaderProgram = Context3DProxy.gl.createProgram();
            Context3DProxy.gl.attachShader(shaderProgram, vsShader.shader);
            Context3DProxy.gl.attachShader(shaderProgram, fsShader.shader);
            Context3DProxy.gl.linkProgram(shaderProgram);
            var p = Context3DProxy.gl.getProgramParameter(shaderProgram, Context3DProxy.gl.LINK_STATUS);
            if (!p) {
                alert("vsShader error" + Context3DProxy.gl.getShaderInfoLog(vsShader.shader));
                alert("fsShader error" + Context3DProxy.gl.getShaderInfoLog(fsShader.shader));
            }
            var program: Program3D = new Program3D(shaderProgram);
            return program;
        }

        /**
        * @language zh_CN
        * 创建 顶点索引流
        * @param indexData
        * @version Egret 3.0
        * @platform Web,Native
        */
        public creatIndexBuffer(indexData: Int16Array): IndexBuffer3D {

            var indexBuffer: WebGLBuffer = Context3DProxy.gl.createBuffer();
            Context3DProxy.gl.bindBuffer(Context3DProxy.gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
            Context3DProxy.gl.bufferData(Context3DProxy.gl.ELEMENT_ARRAY_BUFFER, indexData, Context3DProxy.gl.STATIC_DRAW);

            var ib: IndexBuffer3D = new IndexBuffer3D(indexBuffer);
            ib.arrayBuffer = indexData;

            return ib;
        }

        /**
        * @language zh_CN
        * 提交索引数据
        * @param indexBuffer3D 索引buffer
        * @version Egret 3.0
        * @platform Web,Native
        */
        public uploadIndexBuffer(indexBuffer3D: IndexBuffer3D) {
            Context3DProxy.gl.bindBuffer(Context3DProxy.gl.ARRAY_BUFFER, indexBuffer3D.buffer);
            Context3DProxy.gl.bufferData(Context3DProxy.gl.ARRAY_BUFFER, indexBuffer3D.arrayBuffer, Context3DProxy.gl.DYNAMIC_DRAW);
        }

        /**
        * @language zh_CN
        * 创建 顶点数据流
        * @param vertexData
        * @version Egret 3.0
        * @platform Web,Native
        */
        public creatVertexBuffer(vertexData: Float32Array, dawType: number = Context3DProxy.gl.STATIC_DRAW ): VertexBuffer3D {

            var vertexBuffer: WebGLBuffer = Context3DProxy.gl.createBuffer();
            Context3DProxy.gl.bindBuffer(Context3DProxy.gl.ARRAY_BUFFER, vertexBuffer);
            Context3DProxy.gl.bufferData(Context3DProxy.gl.ARRAY_BUFFER, vertexData, dawType );

            var vb: VertexBuffer3D = new VertexBuffer3D(vertexBuffer);
            vb.arrayBuffer = vertexData;

           // vertexData.splice(0, vertexData.length);
            //vertexData.splice(0, vertexData.length);
            return vb;
        }

        /**
        * @language zh_CN
        * 提交顶点数据
        * @param vertexBuffer3D 顶点buffer
        * @version Egret 3.0
        * @platform Web,Native
        */
        public uploadVertexBuffer(vertexBuffer3D:VertexBuffer3D) {
            Context3DProxy.gl.bindBuffer(Context3DProxy.gl.ARRAY_BUFFER, vertexBuffer3D.buffer );
            Context3DProxy.gl.bufferData(Context3DProxy.gl.ARRAY_BUFFER, vertexBuffer3D.arrayBuffer, Context3DProxy.gl.DYNAMIC_DRAW);
        }

        /**
        * @language zh_CN
        * 设置2D纹理状态 来确定贴图的采样方式
        * @param min_filter
        * @param mag_filter
        * @param wrap_u_filter
        * @param wrap_v_filter
        * @version Egret 3.0
        * @platform Web,Native
        */
        public texParameteri(target: number, pname: number, param: number) {
            Context3DProxy.gl.texParameteri(target, pname, param);
        }

        /**
        * @language zh_CN
        * 提交2D纹理
        * @param mipLevel
        * @param texture
        * @version Egret 3.0
        * @platform Web,Native
        */
        public upLoadTextureData(mipLevel: number, texture: ITexture) {
            Context3DProxy.gl.bindTexture(Context3DProxy.gl.TEXTURE_2D, texture.texture2D.textureBuffer );

            if (texture.texture2D.internalFormat == InternalFormat.ImageData) {
                Context3DProxy.gl.texImage2D(Context3DProxy.gl.TEXTURE_2D, 0, Context3DProxy.gl.RGBA, Context3DProxy.gl.RGBA, texture.texture2D.dataFormat, texture.texture2D.imageData);
                delete texture.texture2D.imageData;
            }
            else if (texture.texture2D.internalFormat == InternalFormat.CompressData) {
                this.upLoadCompressedTexture2D(mipLevel, texture.texture2D);
               
            }
            else if (texture.texture2D.internalFormat == InternalFormat.PixelArray) {
                Context3DProxy.gl.texImage2D(Context3DProxy.gl.TEXTURE_2D, mipLevel, texture.texture2D.colorFormat, texture.texture2D.mimapData[mipLevel].width, texture.texture2D.mimapData[mipLevel].height, texture.texture2D.border, texture.texture2D.colorFormat, texture.texture2D.dataFormat, texture.texture2D.mimapData[mipLevel].data);
            }
            if( texture.useMipmap )
                Context3DProxy.gl.generateMipmap(Context3DProxy.gl.TEXTURE_2D);

            //texture.activeState( this );
        }

        /**
        * @language zh_CN
        * 提交2D压缩纹理，用硬件来解析dds贴图
        * @param mipLevel
        * @param texture
        * @version Egret 3.0
        * @platform Web,Native
        */
        public upLoadCompressedTexture2D(mipLevel: number, texture: ContextTexture2D) {
            Context3DProxy.gl.compressedTexImage2D(Context3DProxy.gl.TEXTURE_2D, mipLevel, texture.colorFormat, texture.mimapData[mipLevel].width, texture.mimapData[mipLevel].height, texture.border, texture.mimapData[mipLevel].data);
        }

        /**
        * @language zh_CN
        * 创建 2维贴图 向显卡提交buffer申请 并创建Texture2D对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        public creatTexture2D(): ContextTexture2D {
            var texture: ContextTexture2D = new ContextTexture2D();
            texture.textureBuffer = Context3DProxy.gl.createTexture();
            return texture;
        }

        /**
        * @language zh_CN
        * 创建 Cube贴图 向显卡提交buffer申请 并创建Texture3D对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        public creatCubeTexture(): ContextTexture3D {
            var texture: ContextTexture3D = new ContextTexture3D();
            texture.texture = Context3DProxy.gl.createTexture();
            return texture;
        }

        /**
        * @language zh_CN
        * @private
        * @param tex
        * @version Egret 3.0
        * @platform Web,Native
        */
        public uploadCubetexture(tex: ContextTexture3D) {
            /// 创建纹理并绑定纹理数据
            Context3DProxy.gl.bindTexture(Context3DProxy.gl.TEXTURE_CUBE_MAP, tex.texture);

            if (tex.image_right.mimapData && tex.image_right.mimapData.length > 0)
                Context3DProxy.gl.texImage2D(Context3DProxy.gl.TEXTURE_CUBE_MAP_POSITIVE_X, 0, Context3DProxy.gl.RGB, tex.image_right.mimapData[0].width, tex.image_right.mimapData[0].height, 0, Context3DProxy.gl.RGB, Context3DProxy.gl.UNSIGNED_BYTE, tex.image_right.mimapData[0].data);
            else
                Context3DProxy.gl.texImage2D(Context3DProxy.gl.TEXTURE_CUBE_MAP_POSITIVE_X, 0, Context3DProxy.gl.RGB, Context3DProxy.gl.RGB, Context3DProxy.gl.UNSIGNED_BYTE, tex.image_right.imageData);

            if (tex.image_left.mimapData && tex.image_left.mimapData.length > 0)
                Context3DProxy.gl.texImage2D(Context3DProxy.gl.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, Context3DProxy.gl.RGB, tex.image_right.mimapData[0].width, tex.image_right.mimapData[0].height, 0, Context3DProxy.gl.RGB, Context3DProxy.gl.UNSIGNED_BYTE, tex.image_right.mimapData[0].data);
            else
                Context3DProxy.gl.texImage2D(Context3DProxy.gl.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, Context3DProxy.gl.RGB, Context3DProxy.gl.RGB, Context3DProxy.gl.UNSIGNED_BYTE, tex.image_left.imageData);

            if (tex.image_left.mimapData && tex.image_left.mimapData.length > 0)
                Context3DProxy.gl.texImage2D(Context3DProxy.gl.TEXTURE_CUBE_MAP_POSITIVE_Y, 0, Context3DProxy.gl.RGB, tex.image_up.mimapData[0].width, tex.image_up.mimapData[0].height, 0, Context3DProxy.gl.RGB, Context3DProxy.gl.UNSIGNED_BYTE, tex.image_up.mimapData[0].data);
            else
                Context3DProxy.gl.texImage2D(Context3DProxy.gl.TEXTURE_CUBE_MAP_POSITIVE_Y, 0, Context3DProxy.gl.RGB, Context3DProxy.gl.RGB, Context3DProxy.gl.UNSIGNED_BYTE, tex.image_up.imageData);

            if (tex.image_left.mimapData && tex.image_left.mimapData.length > 0)
                Context3DProxy.gl.texImage2D(Context3DProxy.gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, Context3DProxy.gl.RGB, tex.image_down.mimapData[0].width, tex.image_down.mimapData[0].height, 0, Context3DProxy.gl.RGB, Context3DProxy.gl.UNSIGNED_BYTE, tex.image_down.mimapData[0].data);
            else
                Context3DProxy.gl.texImage2D(Context3DProxy.gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, Context3DProxy.gl.RGB, Context3DProxy.gl.RGB, Context3DProxy.gl.UNSIGNED_BYTE, tex.image_down.imageData);

            if (tex.image_left.mimapData && tex.image_left.mimapData.length > 0)
                Context3DProxy.gl.texImage2D(Context3DProxy.gl.TEXTURE_CUBE_MAP_POSITIVE_Z, 0, Context3DProxy.gl.RGB, tex.image_back.mimapData[0].width, tex.image_back.mimapData[0].height, 0, Context3DProxy.gl.RGB, Context3DProxy.gl.UNSIGNED_BYTE, tex.image_back.mimapData[0].data);
            else
                Context3DProxy.gl.texImage2D(Context3DProxy.gl.TEXTURE_CUBE_MAP_POSITIVE_Z, 0, Context3DProxy.gl.RGB, Context3DProxy.gl.RGB, Context3DProxy.gl.UNSIGNED_BYTE, tex.image_back.imageData);

            if (tex.image_left.mimapData && tex.image_left.mimapData.length > 0)
                Context3DProxy.gl.texImage2D(Context3DProxy.gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, Context3DProxy.gl.RGB, tex.image_front.mimapData[0].width, tex.image_front.mimapData[0].height, 0, Context3DProxy.gl.RGB, Context3DProxy.gl.UNSIGNED_BYTE, tex.image_front.mimapData[0].data);
            else
                Context3DProxy.gl.texImage2D(Context3DProxy.gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, Context3DProxy.gl.RGB, Context3DProxy.gl.RGB, Context3DProxy.gl.UNSIGNED_BYTE, tex.image_front.imageData);


            ///Context3DProxy.gl.generateMipmap(Context3DProxy.gl.TEXTURE_CUBE_MAP);
            ///gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
            ///Context3DProxy.gl.texParameterf(Context3DProxy.gl.TEXTURE_CUBE_MAP, Context3DProxy.gl.TEXTURE_MAG_FILTER, Context3DProxy.gl.LINEAR_MIPMAP_NEAREST);
            ///Context3DProxy.gl.texParameterf(Context3DProxy.gl.TEXTURE_CUBE_MAP, Context3DProxy.gl.TEXTURE_MIN_FILTER, Context3DProxy.gl.LINEAR_MIPMAP_NEAREST);
            ///Context3DProxy.gl.texParameterf(Context3DProxy.gl.TEXTURE_CUBE_MAP, Context3DProxy.gl.TEXTURE_WRAP_S, Context3DProxy.gl.CLAMP_TO_EDGE);
            ///Context3DProxy.gl.texParameterf(Context3DProxy.gl.TEXTURE_CUBE_MAP, Context3DProxy.gl.TEXTURE_WRAP_T, Context3DProxy.gl.CLAMP_TO_EDGE);

            Context3DProxy.gl.texParameteri(Context3DProxy.gl.TEXTURE_CUBE_MAP, Context3DProxy.gl.TEXTURE_MAG_FILTER, Context3DProxy.gl.LINEAR);
            Context3DProxy.gl.texParameteri(Context3DProxy.gl.TEXTURE_CUBE_MAP, Context3DProxy.gl.TEXTURE_MIN_FILTER, Context3DProxy.gl.LINEAR);
            Context3DProxy.gl.texParameteri(Context3DProxy.gl.TEXTURE_CUBE_MAP, Context3DProxy.gl.TEXTURE_WRAP_S, Context3DProxy.gl.CLAMP_TO_EDGE);
            Context3DProxy.gl.texParameteri(Context3DProxy.gl.TEXTURE_CUBE_MAP, Context3DProxy.gl.TEXTURE_WRAP_T, Context3DProxy.gl.CLAMP_TO_EDGE);

            ///Context3DProxy.gl.texParameteri(Context3DProxy.gl.TEXTURE_2D, Context3DProxy.gl.TEXTURE_MIN_FILTER, min_filter);
            ///Context3DProxy.gl.texParameteri(Context3DProxy.gl.TEXTURE_2D, Context3DProxy.gl.TEXTURE_MAG_FILTER, mag_filter);
            ///Context3DProxy.gl.texParameteri(Context3DProxy.gl.TEXTURE_2D, Context3DProxy.gl.TEXTURE_WRAP_S, wrap_u_filter);
            ///Context3DProxy.gl.texParameteri(Context3DProxy.gl.TEXTURE_2D, Context3DProxy.gl.TEXTURE_WRAP_T, wrap_v_filter);
        }
        
        /**
        * @language zh_CN
        * @private
        * @param width
        * @param height
        * @param format
        * @version Egret 3.0
        * @platform Web,Native
        */
        public createFramebuffer(width: number, height: number, format: FrameBufferFormat): ContextTexture2D {
            var rttframeBuffer = Context3DProxy.gl.createFramebuffer();
            var texture2D: ContextTexture2D = this.creatTexture2D();
            var depthRenderbuffer = Context3DProxy.gl.createRenderbuffer();

            Context3DProxy.gl.bindTexture(Context3DProxy.gl.TEXTURE_2D, texture2D.textureBuffer);

            var float: Float32Array = new Float32Array(32 * 32 * 4);
            for (var i: number = 0; i < 32 * 32; i++) {
                float[i] = 1.0;
                float[i + 1] = 1.0;
                float[i + 2] = 1.0;
                float[i + 3] = 1.0;
            }

            switch (format) {
                case FrameBufferFormat.UNSIGNED_BYTE_RGB:
                    Context3DProxy.gl.texImage2D(Context3DProxy.gl.TEXTURE_2D, 0, Context3DProxy.gl.RGB, width, height, 0, Context3DProxy.gl.RGB, Context3DProxy.gl.UNSIGNED_BYTE, null);
                    break;
                case FrameBufferFormat.UNSIGNED_BYTE_RGBA:
                    Context3DProxy.gl.texImage2D(Context3DProxy.gl.TEXTURE_2D, 0, Context3DProxy.gl.RGBA, width, height, 0, Context3DProxy.gl.RGBA, Context3DProxy.gl.UNSIGNED_BYTE, null);
                    break;
                case FrameBufferFormat.FLOAT_RGB:
                    Context3DProxy.gl.texImage2D(Context3DProxy.gl.TEXTURE_2D, 0, Context3DProxy.gl.RGB, width, height, 0, Context3DProxy.gl.RGB, Context3DProxy.gl.FLOAT, float);
                    break;
                case FrameBufferFormat.FLOAT_RGBA:
                    Context3DProxy.gl.texImage2D(Context3DProxy.gl.TEXTURE_2D, 0, Context3DProxy.gl.RGBA, width, height, 0, Context3DProxy.gl.RGBA, Context3DProxy.gl.FLOAT, float);
                    break;
            }

            Context3DProxy.gl.texParameteri(Context3DProxy.gl.TEXTURE_2D, Context3DProxy.gl.TEXTURE_MAG_FILTER, Context3DProxy.gl.NEAREST);
            Context3DProxy.gl.texParameteri(Context3DProxy.gl.TEXTURE_2D, Context3DProxy.gl.TEXTURE_MIN_FILTER, Context3DProxy.gl.NEAREST);
            Context3DProxy.gl.texParameteri(Context3DProxy.gl.TEXTURE_2D, Context3DProxy.gl.TEXTURE_WRAP_S, Context3DProxy.gl.CLAMP_TO_EDGE);
            Context3DProxy.gl.texParameteri(Context3DProxy.gl.TEXTURE_2D, Context3DProxy.gl.TEXTURE_WRAP_T, Context3DProxy.gl.CLAMP_TO_EDGE);
            //Context3DProxy.gl.generateMipmap(Context3DProxy.gl.TEXTURE_2D);  

            Context3DProxy.gl.bindFramebuffer(Context3DProxy.gl.FRAMEBUFFER, rttframeBuffer);
            Context3DProxy.gl.framebufferTexture2D(Context3DProxy.gl.FRAMEBUFFER, Context3DProxy.gl.COLOR_ATTACHMENT0, Context3DProxy.gl.TEXTURE_2D, texture2D.textureBuffer, 0);

            ///配置渲染缓冲 
            Context3DProxy.gl.bindRenderbuffer(Context3DProxy.gl.RENDERBUFFER, depthRenderbuffer);
            Context3DProxy.gl.renderbufferStorage(Context3DProxy.gl.RENDERBUFFER, Context3DProxy.gl.DEPTH_COMPONENT16, width, height);

            texture2D.width = width;
            texture2D.height = height;
            texture2D.frameBuffer = rttframeBuffer;
            texture2D.renderbuffer = depthRenderbuffer;

            Context3DProxy.gl.bindFramebuffer(Context3DProxy.gl.FRAMEBUFFER, null);
            Context3DProxy.gl.bindTexture(Context3DProxy.gl.TEXTURE_2D, null);
            Context3DProxy.gl.bindRenderbuffer(Context3DProxy.gl.RENDERBUFFER, null);
            return texture2D;
        }
                
        /**
        * @language zh_CN
        * @private
        * @param texture
        * @param enableDepthAndStencil
        * @param surfaceSelector
        * @version Egret 3.0
        * @platform Web,Native
        */
        public setRenderToTexture(texture: ContextTexture2D, enableDepthAndStencil: Boolean = false, surfaceSelector: number = 0) {
            if (enableDepthAndStencil) {
                //Context3DProxy.gl.bindRenderbuffer(Context3DProxy.gl.RENDERBUFFER, texture.renderbuffer);
                //Context3DProxy.gl.renderbufferStorage(Context3DProxy.gl.RENDERBUFFER, Context3DProxy.gl.DEPTH_COMPONENT16, texture.width, texture.height);
            }

            Context3DProxy.gl.viewport(0, 0, texture.width, texture.height);
            Context3DProxy.gl.scissor(0, 0, texture.width, texture.height);

            Context3DProxy.gl.bindFramebuffer(Context3DProxy.gl.FRAMEBUFFER, texture.frameBuffer);
            Context3DProxy.gl.clearColor(0, 0, 0, 1);
            Context3DProxy.gl.clear(Context3DProxy.gl.COLOR_BUFFER_BIT | Context3DProxy.gl.DEPTH_BUFFER_BIT);

            Context3DProxy.gl.framebufferTexture2D(Context3DProxy.gl.FRAMEBUFFER, Context3DProxy.gl.COLOR_ATTACHMENT0, Context3DProxy.gl.TEXTURE_2D, texture.textureBuffer, 0);
            Context3DProxy.gl.framebufferRenderbuffer(Context3DProxy.gl.FRAMEBUFFER, Context3DProxy.gl.DEPTH_ATTACHMENT, Context3DProxy.gl.RENDERBUFFER, texture.renderbuffer);
       
        }
                        
        /**
        * @language zh_CN
        * 设置渲染缓冲为屏幕
        * @version Egret 3.0
        * @platform Web,Native
        */
        public setRenderToBackBuffer() {
            Context3DProxy.gl.bindTexture(Context3DProxy.gl.TEXTURE_2D, null);
            Context3DProxy.gl.bindFramebuffer(Context3DProxy.gl.FRAMEBUFFER, null);
            Context3DProxy.gl.bindRenderbuffer(Context3DProxy.gl.RENDERBUFFER, null);
        }
                                
        /**
        * @language zh_CN
        * 向显卡请求创建顶点shader对象 
        * @param source shader代码内容
        * @returns Shader shader对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        public creatVertexShader(source: string): Shader {
            var shader: WebGLShader = Context3DProxy.gl.createShader(Context3DProxy.gl.VERTEX_SHADER);
            Context3DProxy.gl.shaderSource(shader, source);
            Context3DProxy.gl.compileShader(shader);

            var tmpShader: Shader = new Shader(shader);
            tmpShader.id = (Shader.ID_COUNT++).toString();
            return tmpShader;
        }
                                        
        /**
        * @language zh_CN
        * 向显卡请求创建片段shader对象 
        * @param source shader代码内容
        * @returns Shader shader对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        public creatFragmentShader(source: string): Shader {
            var shader: WebGLShader = Context3DProxy.gl.createShader(Context3DProxy.gl.FRAGMENT_SHADER);
            Context3DProxy.gl.shaderSource(shader, source);
            Context3DProxy.gl.compileShader(shader);

            var tmpShader: Shader = new Shader(shader);
            tmpShader.id = (Shader.ID_COUNT++).toString();
            return tmpShader;
        }

        /**
        * @language zh_CN
        * 清除渲染buffer
        * @param BUFFER_BIT 
        * @version Egret 3.0
        * @platform Web,Native
        */
        public clear(BUFFER_BIT:number) {
            Context3DProxy.gl.clear(BUFFER_BIT);
        }

        /**
        * @language zh_CN
        * 清除渲染区域的颜色 深度
        * @param r 红色值
        * @param g 绿色值
        * @param b 蓝色值
        * @param a alpha值
        * @version Egret 3.0
        * @platform Web,Native
        */
        public clearColor(r: number, g: number, b: number, a: number) {
            Context3DProxy.gl.clearColor(r, g, b, a);
        }
        
        ///**
        //* @language zh_CN
        //* 清除渲染区域的 深度
        //* @param depth
        //*/
        //public clearDepth(depth: number=1.0) {
        //    Context3DProxy.gl.clearDepth(depth);
        //    Context3DProxy.gl.clear(Context3DProxy.gl.DEPTH_BUFFER_BIT);
        //}

                
        /**
        * @language zh_CN
        * 清除渲染区域的 模板
        * @param stencil 模板值
        * @version Egret 3.0
        * @platform Web,Native
        */
        public clearStencil(stencil: number) {
            Context3DProxy.gl.clearStencil(stencil);
        }

        /**
        * @language zh_CN
        * 使用显卡着色器
        * @param program 设置当学显卡当前渲染程序
        * @version Egret 3.0
        * @platform Web,Native
        */
        public setProgram(program: Program3D) {
            this.programChange = false;
            if (this.program == program) return;
            this.programChange = true;
            this.program = program;
            Context3DProxy.gl.useProgram(program.program);
        }

        /**
        * @language zh_CN
        * 获取矩阵变量ID
        * @param program
        * @param name
        * @version Egret 3.0
        * @platform Web,Native
        */
        public getUniformLocation(programe3D: Program3D, name: string): any {
            return Context3DProxy.gl.getUniformLocation(programe3D.program, name);
        }

        
        /**
        * @language zh_CN
        * 传值给shader一个float
        * @param location 指明要更改的uniform变量
        * @param x  uniform变量变量值
        * @version Egret 3.0
        * @platform Web,Native
        */
        public uniform1f(location: any, x: number): void {
            Context3DProxy.gl.uniform1f(location, x);
        }
                
        /**
        * @language zh_CN
        * 传值给shader 一个vec3(float, float, float) 也可以是一个vec3数组
        * @param location 指明要更改的uniform变量
        * @param v uniform变量变量值Float32Array[3]
        * @version Egret 3.0
        * @platform Web,Native
        */
        public uniform1fv(location: any, v: any): void {
            Context3DProxy.gl.uniform1fv(location, v);
        }
                
        /**
        * @language zh_CN
        * 传值给shader一个int
        * @param location 指明要更改的uniform变量
        * @param x uniform变量变量值
        * @version Egret 3.0
        * @platform Web,Native
        */
        public uniform1i(location: any, x: number): void {
            Context3DProxy.gl.uniform1i(location, x);
        }
                
        /**
        * @language zh_CN
        * 传值给shader一个int数组
        * @param location 指明要更改的uniform变量
        * @param v int数组的值
        * @version Egret 3.0
        * @platform Web,Native
        */
        public uniform1iv(location: any, v: Int32Array): void {
            Context3DProxy.gl.uniform1iv(location, v);
        }
                
        /**
        * @language zh_CN
        * 传值给shader两个float
        * @param location 指明要更改的uniform变量
        * @param x float x 的值
        * @param y float y 的值
        * @version Egret 3.0
        * @platform Web,Native
        */
        public uniform2f(location: any, x: number, y: number): void {
            Context3DProxy.gl.uniform2f(location, x, y);
        }
                        
        /**
        * @language zh_CN
        * 传值给shader vec(float, float)
        * @param location 指明要更改的uniform变量
        * @param v Float32Array[2]
        * @version Egret 3.0
        * @platform Web,Native
        */
        public uniform2fv(location: any, v: any): void {
            Context3DProxy.gl.uniform2fv(location, v);
        }
                
        /**
        * @language zh_CN
        * 传值给shader 两个int值
        * @param location 指明要更改的uniform变量
        * @param x number x 的值
        * @param y number y 的值
        * @version Egret 3.0
        * @platform Web,Native
        */
        public uniform2i(location: any, x: number, y: number): void {
            Context3DProxy.gl.uniform2i(location, x, y);
        }
                                
        /**
        * @language zh_CN
        * 传值给shader
        * @param location 指明要更改的uniform变量
        * @param v
        * @version Egret 3.0
        * @platform Web,Native
        */
        public uniform2iv(location: any, v: Int32Array): void {
            Context3DProxy.gl.uniform2iv(location, v);
        }
                        
        /**
        * @language zh_CN
        * 传值给shader 3个float
        * @param location 指明要更改的uniform变量
        * @param x
        * @param y
        * @param z
        * @version Egret 3.0
        * @platform Web,Native
        */
        public uniform3f(location: any, x: number, y: number, z: number): void {
            Context3DProxy.gl.uniform3f(location, x, y, z);
        }
                                        
        /**
        * @language zh_CN
        * 传值给shader vec3(float, float, float)
        * @param location 指明要更改的uniform变量
        * @param v Float32Array[3]
        * @version Egret 3.0
        * @platform Web,Native
        */
        public uniform3fv(location: any, v: any): void {
            Context3DProxy.gl.uniform3fv(location, v);
        }
                                
        /**
        * @language zh_CN
        * 传值给shader 3个int
        * @param location 指明要更改的uniform变量
        * @param x
        * @param y
        * @param z
        * @version Egret 3.0
        * @platform Web,Native
        */
        public uniform3i(location: any, x: number, y: number, z: number): void {
            Context3DProxy.gl.uniform3i(location, x, y, z);
        }
                                                
        /**
        * @language zh_CN
        * 传值给shader vec3(int, int, int)
        * @param location 指明要更改的uniform变量
        * @param v Int32Array[3]
        * @version Egret 3.0
        * @platform Web,Native
        */
        public uniform3iv(location: any, v: Int32Array): void {
            Context3DProxy.gl.uniform3iv(location, v);
        }
                                        
        /**
        * @language zh_CN
        * 传值给shader 4个float值
        * @param location 指明要更改的uniform变量
        * @param x
        * @param y
        * @param z
        * @param w
        * @version Egret 3.0
        * @platform Web,Native
        */
        public uniform4f(location: any, x: number, y: number, z: number, w: number): void {
            Context3DProxy.gl.uniform4f(location, x, y, z, w);
        }
                                                        
        /**
        * @language zh_CN
        * 传值给shader vec(float, float, float, float)
        * @param location 指明要更改的uniform变量
        * @param v Float32Array[4]
        * @version Egret 3.0
        * @platform Web,Native
        */
        public uniform4fv(location: any, v: any): void {
            Context3DProxy.gl.uniform4fv(location, v);
        }
                                                
        /**
        * @language zh_CN
        * 传值给shader 4个int值
        * @param location 指明要更改的uniform变量
        * @param x 
        * @param y
        * @param z
        * @param w
        * @version Egret 3.0
        * @platform Web,Native
        */
        public uniform4i(location: any, x: number, y: number, z: number, w: number): void {
            Context3DProxy.gl.uniform4i(location, x, y, z, w);
        }
                                                                
        /**
        * @language zh_CN
        * 传值给shader vec4(int, int, int, int)
        * @param location 指明要更改的uniform变量
        * @param v Int32Array[4]
        */
        public uniform4iv(location: any, v: Int32Array): void {
            Context3DProxy.gl.uniform4iv(location, v);
        }
                                                                
        /**
        * @language zh_CN
        * 传值给shader 2 * 2矩阵 
        * @param location 指明要更改的uniform变量
        * @param transpose 是否转置
        * @param value 矩阵值 Float32Array[4]
        * @version Egret 3.0
        * @platform Web,Native
        */
        public uniformMatrix2fv(location: any, transpose: boolean, value: any): void {
            Context3DProxy.gl.uniformMatrix2fv(location, transpose, value);
        }
                                                                        
        /**
        * @language zh_CN
        * 传值给shader 3 * 3矩阵 
        * @param location 指明要更改的uniform变量
        * @param transpose 是否转置
        * @param value 矩阵值 Float32Array[9]
        * @version Egret 3.0
        * @platform Web,Native
        */
        public uniformMatrix3fv(location: any, transpose: boolean, value: any): void {
            Context3DProxy.gl.uniformMatrix3fv(location, transpose, value);
        }
                                                                        
        /**
        * @language zh_CN
        * 传值给shader 4 * 4矩阵 
        * @param location 指明要更改的uniform变量
        * @param transpose 是否转置
        * @param value 矩阵值 Float32Array[16]
        * @version Egret 3.0
        * @platform Web,Native
        */
        public uniformMatrix4fv(location: any, transpose: boolean, value: any): void {
            Context3DProxy.gl.uniformMatrix4fv(location, transpose, value);
        }

        /**
        * @language zh_CN
        * 设置 绘制混合模式
        * @param src 
        * @param dst
        * @version Egret 3.0
        * @platform Web,Native
        */
        public setBlendFactors(src: number, dst: number) {
            if (this.blend_Factors_src == src && this.blend_Factors_dst == dst) return;
            this.blend_Factors_src = src;
            this.blend_Factors_dst = dst ;
            Context3DProxy.gl.blendFunc(src, dst);
        }

        /**
        * @language zh_CN
        * 设置 绘制剔除模式
        * @param mode 
        * @see egret3d.ContextConfig.FRONT
        * @see egret3d.ContextConfig.BACK
        * @version Egret 3.0
        * @platform Web,Native
        */
        public setCulling(mode: number) {
            if (this.cullingMode == mode) return;

            this.cullingMode = mode;
            Context3DProxy.gl.cullFace(mode);
        }

 
        /**
        * @language zh_CN
        * 开启 深度测试模式
        * @version Egret 3.0
        * @platform Web,Native
        */
        public enableDepth() {
            if (this.DEPTH_TEST) return;
            this.DEPTH_TEST = true; 
            Context3DProxy.gl.enable(ContextConfig.DEPTH_TEST);
        }

        /**
        * @language zh_CN
        * 关闭 深度测试模式
        * @version Egret 3.0
        * @platform Web,Native
        */
        public disableDepth() {
            if (!this.DEPTH_TEST) return;
            this.DEPTH_TEST = false;
            Context3DProxy.gl.disable(ContextConfig.DEPTH_TEST);
        }

        /**
        * @language zh_CN
        * 开启 剔除面模式
        * @version Egret 3.0
        * @platform Web,Native
        */
        public enableCullFace() {
            if (this.CULL_FACE) return;
            this.CULL_FACE = true;
            Context3DProxy.gl.enable(ContextConfig.CULL_FACE);
        }

        /**
        * @language zh_CN
        * 关闭 剔除面模式
        * @version Egret 3.0
        * @platform Web,Native
        */
        public disableCullFace() {
            if (!this.CULL_FACE) return;
            this.CULL_FACE = false;
            Context3DProxy.gl.disable(ContextConfig.CULL_FACE);
        }

        /**
        * @language zh_CN
        * 开启 混合模式
        * @version Egret 3.0
        * @platform Web,Native
        */
        public enableBlend() {
            //if (this.BLEND) return;
            //this.BLEND = true;
            Context3DProxy.gl.enable(ContextConfig.BLEND);
        }

        /**
        * @language zh_CN
        * 关闭 混合模式
        * @version Egret 3.0
        * @platform Web,Native
        */
        public disableBlend() {
            //if (!this.BLEND) return;
            //this.BLEND = false;
            Context3DProxy.gl.disable(ContextConfig.BLEND);
        }




        ///**
        // * @language zh_CN
        // * 开启 绘制模式
        // * @param cap
        // * @version Egret 3.0
        // * @platform Web,Native
        // */
        //public enable(cap: number) {
        //    Context3DProxy.gl.enable(cap);
        //}

        ///**
        //* @language zh_CN
        //* 关闭 绘制模式
        //* @param cap
        //* @version Egret 3.0
        //* @platform Web,Native
        //*/
        //public disable(cap: number) {
        //    Context3DProxy.gl.disable(cap);
        //}

        /**
        * @language zh_CN
        * 开启 深度模式 及 深度测试比较模式
        * @param flag 
        * @param compareMode
        * @version Egret 3.0
        * @platform Web,Native
        */
        public depthFunc(compareMode: number = 0) {
            if (this.depthCompareMode == compareMode) return;
            this.depthCompareMode = compareMode;
              Context3DProxy.gl.depthFunc(compareMode);
        }

        /**
        * @language zh_CN
        * 开启 深度模式 及 深度测试比较模式
        * @param flag 
        * @param compareMode
        * @version Egret 3.0
        * @platform Web,Native
        */
        public enableDepthTest(flag: boolean, compareMode: number = 0) {
            if (flag)
                Context3DProxy.gl.enable(Context3DProxy.gl.DEPTH_TEST);
        }

        /**
        * @language zh_CN
        * 获取顶点着色器变量 索引
        * @param programe 
        * @param attribName
        * @returns 着色器变量
        * @version Egret 3.0
        * @platform Web,Native
        */
        public getShaderAttribLocation(programe: Program3D, attribName: string): any {
            return Context3DProxy.gl.getAttribLocation(programe.program, attribName);
        }

        /**
        * @language zh_CN
        * 指定顶点着色器变量索引及结构
        * @param index 变量索引
        * @param size  数据个数
        * @param dataType  数据类型
        * @param normalized 是否单位化
        * @param stride 字节数
        * @param offset 当前变量字节偏移
        * @version Egret 3.0
        * @platform Web,Native
        */
        public vertexAttribPointer(index: number, size: number, dataType: number, normalized: boolean, stride: number, offset: number) {
            Context3DProxy.gl.vertexAttribPointer(index, size, dataType, normalized, stride, offset);
            Context3DProxy.gl.enableVertexAttribArray(index);
        }


        ///**
        //* @language zh_CN
        //* 激活的顶点结构
        //* @version Egret 3.0
        //* @platform Web,Native
        //*/
        //public activeVertexFormat(format: number){
        //    this.vertexFormat = format;
        //}

        /**
        * @language zh_CN
        * 关闭顶点着色器变量索引
        * @param index 变量索引
        * @version Egret 3.0
        * @platform Web,Native
        */
        //public activeAttribPointer(pointIndexTotal:any, vertexFormat:number ): boolean {
        //    var i: string;

        //    //for (i in this.cacheVertexPoint) {
        //    //    if (this.cacheVertexPoint[i] != null && pointIndexTotal[this.cacheVertexPoint[i]] == null ) {
        //    //        Context3DProxy.gl.disableVertexAttribArray(pointIndexTotal[i]);
        //    //        this.cacheVertexPoint[i] = null;
        //    //    }
        //    //}

        //    //for (var j: number = 0; j < 8;j++) {
        //    //    Context3DProxy.gl.disableVertexAttribArray(j);
        //    //}

        //    //for (i in pointIndexTotal) {
        //    //    if (pointIndexTotal[i] >= 0)
        //    //        Context3DProxy.gl.enableVertexAttribArray(pointIndexTotal[i]);
        //    //}

        //    //this.cacheVertexPoint = pointIndexTotal; 

        //    if (this.cacheVertexFormat == vertexFormat)
        //        return false;
        //    this.cacheVertexFormat = vertexFormat; 
        //    return true;
        //}

        /**
        * @language zh_CN
        * @private
        * 实时传入显卡顶点着色器变量数组数据
        * @param floats 
        * @param offest 
        * @param numLen
        * @version Egret 3.0
        * @platform Web,Native
        */
        public setVertexShaderConstData(floats: Float32Array, offest: number, numLen: number) {
            Context3DProxy.gl.vertexAttrib4fv(offest, floats.subarray(offest, numLen));
        }

        /**
        * @language zh_CN
        * @private
        * 实时传入显卡片段着色器变量数组数据
        * @param floats 
        * @param offest 
        * @param numLen
        * @version Egret 3.0
        * @platform Web,Native
        */
        public setFragmentShaderConstData(floats: Float32Array, offest: number, numLen: number) {
        }

        /**
        * @language zh_CN
        * 设置贴图采样 第一个参数并不是类型
        * @param samplerIndex  ContextSamplerType
        * @param uniLocation 
        * @param index 
        * @param texture 
        * @see egret3d.ContextSamplerType
        * @version Egret 3.0
        * @platform Web,Native
        */
        public setTexture2DAt(samplerIndex: number, uniLocation: any, index: number, texture: ContextTexture2D) {
            Context3DProxy.gl.activeTexture(samplerIndex);
            Context3DProxy.gl.bindTexture(Context3DProxy.gl.TEXTURE_2D, texture.textureBuffer);
            Context3DProxy.gl.uniform1i(uniLocation, index);
        }

        public disableTexture2DAt(samplerIndex: number, uniLocation: number, index: number) {
            //Context3DProxy.gl.activeTexture(samplerIndex);
            //Context3DProxy.gl.bindTexture(Context3DProxy.gl.TEXTURE_2D, null );
            //Context3DProxy.gl.uniform1i(uniLocation, index);
        }

        /**
        * @language zh_CN
        * 设置贴图采样 第一个参数并不是类型
        * @param samplerIndex  ContextSamplerType
        * @param uniLocation 
        * @param index 
        * @param texture 
        * @see egret3d.ContextSamplerType
        * @version Egret 3.0
        * @platform Web,Native
        */
        public setCubeTextureAt(samplerIndex: number, uniLocation: number, index: number, texture: ContextTexture3D) {
            if (!texture) {
                return;
            }
            Context3DProxy.gl.activeTexture(samplerIndex);
            Context3DProxy.gl.bindTexture(Context3DProxy.gl.TEXTURE_CUBE_MAP, texture.texture);
            Context3DProxy.gl.uniform1i(uniLocation, index);
        } 

        /**
        * @language zh_CN
        * @private
        * 设置矩形裁切区域
        * @param rectangle
        * @version Egret 3.0
        * @platform Web,Native
        */
        public setScissorRectangle(x: number, y: number, width: number, height: number) {
            Context3DProxy.gl.scissor(x, ContextConfig.canvasRectangle.height - height - y, width, height);
        }

        /**
        * @language zh_CN
        * @private
        * 设置模板测试
        * @version Egret 3.0
        * @platform Web,Native
        */
        public setStencilReferenceValue() {
        }

        /**
        * @language zh_CN
        * @private
        * 设置模板测试
        * @version Egret 3.0
        * @platform Web,Native
        */
        public setStencilActions(triangleFace: string, compareMode: string, actionOnBothPass: string, actionOnDepthFail: string, actionOnDepthPassStencilFail: string) {
        }

        /**
        * @language zh_CN
        * 绑定顶点Buffer
        * @param vertexBuffer
        * @version Egret 3.0
        * @platform Web,Native
        */
        public bindVertexBuffer(vertexBuffer: VertexBuffer3D) {
            Context3DProxy.gl.bindBuffer(Context3DProxy.gl.ARRAY_BUFFER, vertexBuffer.buffer);
        }

         /**
        * @language zh_CN
        * 绑定顶点索引Buffer
        * @param vertexBuffer
        * @version Egret 3.0
        * @platform Web,Native
        */
        public bindIndexBuffer(indexBuffer: IndexBuffer3D) {
            Context3DProxy.gl.bindBuffer(Context3DProxy.gl.ELEMENT_ARRAY_BUFFER, indexBuffer.buffer);
        }

        /**
        * @language zh_CN
        * 绘制模型元素
        * @param type 图元类型
        * @param first 第一个顶点索引
        * @param length 顶点个数
        * @version Egret 3.0
        * @platform Web,Native
        */
        public drawArrays(type: number, first: number, length: number) {
            Context3DProxy.gl.drawArrays(type, first, length);
        }

        /**
        * @language zh_CN
        * 绘制模型元素
        * @param type 图元类型
        * @param indexBuffer 索引数据
        * @param offset 顶点索引偏移 (字节数)
        * @param length 顶点个数
        * @version Egret 3.0
        * @platform Web,Native
        */
        public drawElement(type: number, offset: number, length: number) {
            Context3DProxy.gl.drawElements(type, length, Context3DProxy.gl.UNSIGNED_SHORT, offset );
        }

        /**
        * @language zh_CN
        * @private
        * 绘制提交
        * @version Egret 3.0
        * @platform Web,Native
        */
        public flush() {
            Context3DProxy.gl.flush();
        }
    }
}