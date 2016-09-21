module egret3d {

    /**
    * @class egret3d.ContextTexture3D
    * @classdesc
    * 由6加Texture2D 组成
    * 可以使一个6面体上贴出不同的贴图
    * @see egret3d.Program3D
    * @see egret3d.IndexBuffer3D
    * @see egret3d.VertexBuffer3D
    * @see egret3d.ContextTexture2D
    * @see egret3d.Shader
    * @see egret3d.CubeTexture
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class ContextTexture3D {

        /**
       * @language zh_CN
       * @private
       * 提交显卡的 index
        * @version Egret 3.0
        * @platform Web,Native
       */
        public index: number;

        /**
        * @language zh_CN
        * @private
        * 显卡中上传使用的 border 边框像素大小
        * @version Egret 3.0
        * @platform Web,Native
        */
        public border: number;

        /**
        * @language zh_CN
        * @private
        * 纹理贴图的颜色模式
        * @version Egret 3.0
        * @platform Web,Native
        */
        public colorformat: number;

        /**
        * @language zh_CN
        * @private
        * 纹理贴图标准的格式
        * @version Egret 3.0
        * @platform Web,Native
        */
        public internalformat: InternalFormat;

        /**
        * @language zh_CN
        * @private
        * context.creatTexture()接口生成的GPU纹理
        * @version Egret 3.0
        * @platform Web,Native
        */
        public texture: WebGLTexture;

        /**
         * @language zh_CN
         * 是否使用mipmap
        * @version Egret 3.0
        * @platform Web,Native
         */
        public useMipmap: boolean;

        /**
         * @language zh_CN
         * mipmap数据
        * @version Egret 3.0
        * @platform Web,Native
         */
        public mimapData: Array<MipmapData>;

        public image_front: ContextTexture2D;
        public image_back: ContextTexture2D;
        public image_left: ContextTexture2D;
        public image_right: ContextTexture2D;
        public image_up: ContextTexture2D;
        public image_down: ContextTexture2D;

        /**
         * @language zh_CN
         * 构造函数
        * @version Egret 3.0
        * @platform Web,Native
         */
        constructor() {
            this.border = 0;
            this.useMipmap = true;
            this.colorformat = ContextConfig.ColorFormat_RGBA8888;
            this.internalformat = InternalFormat.PixelArray;
            this.mimapData = new Array<MipmapData>();
        }

        /**
        * @language zh_CN
        * 释放接口
        * @version Egret 3.0
        * @platform Web,Native
        */
        public dispose(): void {
            if (this.texture) {
                Context3DProxy.gl.deleteTexture(this.texture);
                this.texture = null;
            }

            if (this.image_front) {
                this.image_front.dispose();
                this.image_front = null;
            }

            if (this.image_back) {
                this.image_back.dispose();
                this.image_back = null;
            }

            if (this.image_left) {
                this.image_left.dispose();
                this.image_left = null;
            }

            if (this.image_right) {
                this.image_right.dispose();
                this.image_right = null;
            }

            if (this.image_up) {
                this.image_up.dispose();
                this.image_up = null;
            }

            if (this.image_down) {
                this.image_down.dispose();
                this.image_down = null;
            }
        } 
 
    }
}