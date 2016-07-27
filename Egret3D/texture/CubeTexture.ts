module egret3d {
    /**
     * @class egret3d.CubeTexture
     * @classdesc
     * CubeTexture 类为天空贴图
     *
     * 天空贴图用于Sky类使用，其内部是将6张HTMLImageElement（网页图片元素）封装到CubeTexture对象，CubeTexture为引擎内部使用对象。</p>
     *
     * 示例：</p>
     * 假设html中已有</p>
     <pre>
     <img id="t1" src="image_front.png" />
     <img id="t2" src="image_back.png" />
     <img id="t3" src="image_left.png" />
     <img id="t4" src="image_right.png" />
     <img id="t5" src="image_up.png" />
     <img id="t6" src="image_down.png" />
     </pre>
     使用示例：</p>
     <pre>
     var cubeTexture: CubeTexture = CubeTexture.createCubeTexture(
     <HTMLImageElement>document.getElementById("t1"),
     <HTMLImageElement>document.getElementById("t2"),
     <HTMLImageElement>document.getElementById("t3"),
     <HTMLImageElement>document.getElementById("t4"),
     <HTMLImageElement>document.getElementById("t5"),
     <HTMLImageElement>document.getElementById("t6")
     );
     </pre>
     * @see egret3d.Sky
     * @version Egret 3.0
     * @platform Web,Native
     */
    export class CubeTexture extends ITexture {

        /**
        * @language zh_CN
        * image_front 前部ITexture图片元素
        * @version Egret 3.0
        * @platform Web,Native
        */
        public image_front: Texture2D;

        /**
        * @language zh_CN
        * image_back 背部ITexture图片元素
        * @version Egret 3.0
        * @platform Web,Native
        */
        public image_back: Texture2D;

        /**
        * @language zh_CN
        * image_left 左部ITexture图片元素
        * @version Egret 3.0
        * @platform Web,Native
        */
        public image_left: Texture2D;

        /**
        * @language zh_CN
        * image_right 右部ITexture图片元素
        * @version Egret 3.0
        * @platform Web,Native
        */
        public image_right: Texture2D;

        /**
        * @language zh_CN
        * image_up 顶部ITexture图片元素
        * @version Egret 3.0
        * @platform Web,Native
        */
        public image_up: Texture2D;


        /**
        * @language zh_CN
        * image_down 底部ITexture图片元素
        * @version Egret 3.0
        * @platform Web,Native
        */
        public image_down: Texture2D;

        /**
         * @language zh_CN
         * 构造函数
         * @param image_front 默认参为null 前部HTMLImageElement图片元素
         * @param image_back 默认参为null 背部HTMLImageElement图片元素
         * @param image_left 默认参为null 左部HTMLImageElement图片元素
         * @param image_right 默认参为null 右部HTMLImageElement图片元素
         * @param image_up 默认参为null 顶部HTMLImageElement图片元素
         * @param image_down 默认参为null 底部HTMLImageElement图片元素
         */
        constructor(image_front: Texture2D = null,
            image_back: Texture2D = null,
            image_left: Texture2D = null,
            image_right: Texture2D = null,
            image_up: Texture2D = null,
            image_down: Texture2D = null) {
            super();

            this.image_front = image_front;
            this.image_back = image_back;
            this.image_left = image_left;
            this.image_right = image_right;
            this.image_up = image_up;
            this.image_down = image_down;
        }

        /**
         * @language zh_CN
         * 创建CubuTexture
         * @param image_front 前部HTMLImageElement图片元素
         * @param image_back 背部HTMLImageElement图片元素
         * @param image_left 左部HTMLImageElement图片元素
         * @param image_right 右部HTMLImageElement图片元素
         * @param image_up 顶部HTMLImageElement图片元素
         * @param image_down 底部HTMLImageElement图片元素
         */
        public static createCubeTexture(image_front: HTMLImageElement,
            image_back: HTMLImageElement,
            image_left: HTMLImageElement,
            image_right: HTMLImageElement,
            image_up: HTMLImageElement,
            image_down: HTMLImageElement): CubeTexture {

            var front: Texture2D = new Texture2D();
            front.imageData = image_front;

            var back: Texture2D = new Texture2D();
            back.imageData = image_back;

            var left: Texture2D = new Texture2D();
            left.imageData = image_left;

            var right: Texture2D = new Texture2D();
            right.imageData = image_right;

            var up: Texture2D = new Texture2D();
            up.imageData = image_up;

            var down: Texture2D = new Texture2D();
            down.imageData = image_down;

            var cubeTexture: CubeTexture = new CubeTexture(front, back, left, right, up, down);
            return cubeTexture;
        }

        /**
         * @language zh_CN
         * 设置CubuTexture
         * @param cubeTexture 源CubuTexture
         * @param image_front 前部ITexture图片元素
         * @param image_back 背部ITexture图片元素
         * @param image_left 左部ITexture图片元素
         * @param image_right 右部ITexture图片元素
         * @param image_up 顶部ITexture图片元素
         * @param image_down 底部ITexture图片元素
         */
        public static setCubeTexture(cubeTexture: CubeTexture, image_front: ITexture,
            image_back: ITexture,
            image_left: ITexture,
            image_right: ITexture,
            image_up: ITexture,
            image_down: ITexture) {
            cubeTexture.image_front = image_front.texture2D;
            cubeTexture.image_back = image_back.texture2D;
            cubeTexture.image_left = image_left.texture2D;
            cubeTexture.image_right = image_right.texture2D;
            cubeTexture.image_up = image_up.texture2D;
            cubeTexture.image_down = image_down.texture2D;
        }

        /**
         * @language zh_CN
         * 上传贴图数据给GPU
         * 更新上传 cube 贴图纹理到GPU 现存中缓存起来
         * @param context3D
         */
        public upload(context3D: Context3DProxy) {
            if (!this.image_front ||
                !this.image_back ||
                !this.image_left ||
                !this.image_right ||
                !this.image_up ||
                !this.image_down) {
                return;
            }
            if (!this.texture3D) {

                this.texture3D = context3D.creatCubeTexture();
                this.texture3D.border = 0;

                this.texture3D.image_front = this.image_front;
                this.texture3D.image_back = this.image_back;
                this.texture3D.image_left = this.image_left;
                this.texture3D.image_right = this.image_right;
                this.texture3D.image_up = this.image_up;
                this.texture3D.image_down = this.image_down;
                context3D.uploadCubetexture(this.texture3D);
            }
        }

        public uploadForcing(context3D: Context3DProxy) {

        }
    }
}