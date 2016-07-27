module egret3d {

    /**
    * @class egret3d.RenderTexture
    * @classdesc
    * 渲染到内容到一张贴图
    * @see egret3d.ITexture
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class RenderTexture extends ITexture{

        /**
        * @language zh_CN
        * 帧buffer的格式
        * @version Egret 3.0
        * @platform Web,Native
        */
        public frameBufferFormat: FrameBufferFormat = FrameBufferFormat.UNSIGNED_BYTE_RGB;

        /**
        * @language zh_CN
        * 构造函数
        * @param width  贴图的宽度 默认参数 默认为512
        * @param height 贴图的高度 默认参数 默认为512
        * @param frameBufferFormat 帧buffer的格式 默认参数 FrameBufferFormat.UNSIGNED_BYTE_RGB
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor(width: number = 512, height: number = 512, frameBufferFormat: FrameBufferFormat = FrameBufferFormat.UNSIGNED_BYTE_RGB) {
            super();
            this.useMipmap = false;
            this.width = width;
            this.height = height;
            this.frameBufferFormat = frameBufferFormat;
        }

        /**
        * @language zh_CN
        * @private
        * @version Egret 3.0
        * @platform Web,Native
        */
        public upload(context3D: Context3DProxy) {
            if (!this.texture2D) {
                this.texture2D = context3D.createFramebuffer(this.width, this.height, this.frameBufferFormat );
            }
        }

        /**
        * @language zh_CN
        * @private
        * @version Egret 3.0
        * @platform Web,Native
        */
        public uploadForcing(context3D: Context3DProxy) {

        }
    }
} 