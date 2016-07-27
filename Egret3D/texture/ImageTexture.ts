module egret3d {

     /**
     * @class egret3d.ImageTexture
     * @classdesc
     * ImageTexture 类为 图像贴图
     * 
     * 图像贴图用于封装 HTMLImageElement（网页图像元素）到引擎内部可使用的Texture2D对象, </p>
      * HTMLImageElement 可通过内嵌HTML文件中获取。</p>
     *
      *
     * 示例：
     * 假设html中已有 &lt;img id="t1" src="xxx.png" /&gt;
     * <pre>
     * var img: HTMLImageElement = <HTMLImageElement>document.getElementById("t1");
     * var imageTexture: egret3d.ImageTexture = new egret3d.ImageTexture(img);
      * </pre>
     * @version Egret 3.0
     * @platform Web,Native
     */
    export class ImageTexture extends ITexture {

        /**
        * @language zh_CN
        * 贴图数据
        * @version Egret 3.0
        * @platform Web,Native
        */
        public imageData: HTMLImageElement;


        /**
        * @language zh_CN
        * 构造函数
        * @param img HTMLImageElement（网页图像元素）
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor(img: HTMLImageElement) {
            super();
            this.imageData = img;
        }

        public get width(): number {
            return this.imageData.width;
        }

        public get height(): number {
            return this.imageData.height;
        }

        /**
        * @language zh_CN
        * 上传贴图数据给GPU
        * @param context3D
        * @version Egret 3.0
        * @platform Web,Native
        */
        public upload(context3D: Context3DProxy) {
            if (!this.texture2D) {
                this.texture2D = context3D.creatTexture2D();
                this.texture2D.internalFormat = InternalFormat.ImageData;
                this.texture2D.imageData = this.imageData;
              
                this.texture2D.colorFormat = ContextConfig.ColorFormat_RGBA8888;
                context3D.upLoadTextureData(0, this );
            }
        }

        /**
        * @language zh_CN
        * 强制上传贴图数据给GPU，强制要求贴图更新。
        * 在video 贴图类型需要立即改变显卡中的贴图内存
        * @param context3D
        * @version Egret 3.0
        * @platform Web,Native
        */
        public uploadForcing(context3D: Context3DProxy) {
            context3D.upLoadTextureData(0, this );
        }
    }
}