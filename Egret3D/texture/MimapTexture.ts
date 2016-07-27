module egret3d {

    /**
    * @class egret3d.MimapTexture
    * @classdesc
    * MimapTexture 贴图对象
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class MimapTexture extends ITexture {

        /**
        * @language zh_CN
        * @private
        * @version Egret 3.0
        * @platform Web,Native
        */
        public internalFormat: InternalFormat;

        /**
        * @language zh_CN
        * 贴图颜色格式
        * @version Egret 3.0
        * @platform Web,Native
        */
        public colorFormat: number;

        /**
        * @language zh_CN
        * 贴图mipmap data
        * @version Egret 3.0
        * @platform Web,Native
        */
        public mimapData: Array<MipmapData>;

        /**
        * @language zh_CN
        * 构造函数
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor() {
            super();
            this.smooth = true;
        }

        /**
        * @language zh_CN
        * @private
        * @version Egret 3.0
        * @platform Web,Native
        */
        public upload(context3D: Context3DProxy) {
            if (!this.texture2D) {
                this.texture2D = context3D.creatTexture2D();
                this.texture2D.internalFormat = this.internalFormat;
                this.texture2D.colorFormat = this.colorFormat;
                this.texture2D.mimapData = this.mimapData;

                if (this.mimapData && this.mimapData.length > 0) {
                    for (var i: number = 0; i < this.mimapData.length; i++) {
                        context3D.upLoadTextureData(i, this);
                    }
                }
                else {
                    context3D.upLoadTextureData(0, this);
                }
            }
        }

        /**
        * @language zh_CN
        * @private
        * @version Egret 3.0
        * @platform Web,Native
        */
        public uploadForcing(context3D: Context3DProxy) {
            context3D.upLoadTextureData(0, this);
        }
    }
}