module egret3d {
   
    /**
     * @class egret3d.VideoTexture
     * @classdesc
     * VideoTexture 使用 Video 标签采集 video 视频 </p>
     * VideoTexture 仅且暂时只能在pc上正常使用，移动端需要直接与用户交互才可正常生成播放</p>
     * 需要设置贴图的宽度和高度。必须为2的N次</p>
     * @version Egret 3.0
     * @platform Web,Native
     */
    export class VideoTexture extends ITexture {
        private video: HTMLVideoElement;
        private canUpdataTexture: boolean = false; 
        private context: CanvasRenderingContext2D;
        private tmpCanvas: HTMLCanvasElement;

        /**
        * @language zh_CN
        * 构造函数
        * @param width 贴图宽度 默认参数 256
        * @param height 贴图高度 默认参数 256
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor( width:number = 256 , height:number = 256 ) {
            super();
            this.width = width;
            this.height = height;

            this.tmpCanvas = document.createElement("canvas");
            this.tmpCanvas.width = width;
            this.tmpCanvas.height = height;

            this.context = this.tmpCanvas.getContext('2d');

            this.video = document.createElement("video");
            this.video.msZoom = true;
            this.video.width = width;
            this.video.height = height;
            this.video.videoWidth = width;
            this.video.videoHeight = height;
            this.video.controls = false;
            this.video.autoplay = true;

            this.video.addEventListener("canplaythrough", () => this.loadReady(), true);
            this.tmpCanvas.hidden = true;
        }

        private loadReady() {
            this.canUpdataTexture = true; 
        }

        /*
        * @language zh_CN
        * 设置 视频链接
        * 设置 视频的链接地址，只要是h5 支持的格式都支持， 例如: ogv,mp4,avi
        * warning chrom need use url = http://127.0.0.1/resource/video/xxx.mp4
        * @param src 视频格式的链接地址
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set source(src:string) {
            this.video.src = src;
        }

        /**
        * @language zh_CN
        * 返回 视频链接
        * 视频的链接地址，只要是h5 支持的格式都支持， 例如:ogv,mp4,avi
        * warning chrom need use url = http://127.0.0.1/resource/video/xxx.mp4
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get source(): string {
            return this.video.src;
        }

        /**
        * @language zh_CN
        * 播放视频
        * 当视频缓冲好之后才能正常播放视频
        * @version Egret 3.0
        * @platform Web,Native
        */
        public play() {
            this.video.play();
        }
        
        /**
        * @language zh_CN
        * 暂停视频
        * 控制视频的播放暂停状态
        * @version Egret 3.0
        * @platform Web,Native
        */
        public pause() {
            this.video.pause();
        }

        /**
        * @private
        * @language zh_CN
        * 上传贴图数据给GPU
        * 将video的视频数据实时传输到GPU上
        * @param context3D 
        */
        public upload(context3D: Context3DProxy) {

            if (!this.texture2D) {
                this.texture2D = context3D.creatTexture2D();

                this.context.drawImage(this.video, 0, 0, this.width, this.height);
                Context3DProxy.gl.pixelStorei(Context3DProxy.gl.UNPACK_ALIGNMENT, 1)
                Context3DProxy.gl.bindTexture(Context3DProxy.gl.TEXTURE_2D, this.texture2D.textureBuffer);
                Context3DProxy.gl.texImage2D(Context3DProxy.gl.TEXTURE_2D, 0, Context3DProxy.gl.RGB, Context3DProxy.gl.RGB, Context3DProxy.gl.UNSIGNED_BYTE, this.tmpCanvas );

                Context3DProxy.gl.texParameteri(Context3DProxy.gl.TEXTURE_2D, Context3DProxy.gl.TEXTURE_MIN_FILTER, Context3DProxy.gl.LINEAR);
                Context3DProxy.gl.texParameteri(Context3DProxy.gl.TEXTURE_2D, Context3DProxy.gl.TEXTURE_MAG_FILTER, Context3DProxy.gl.LINEAR);
                Context3DProxy.gl.texParameteri(Context3DProxy.gl.TEXTURE_2D, Context3DProxy.gl.TEXTURE_WRAP_S, Context3DProxy.gl.CLAMP_TO_EDGE);
                Context3DProxy.gl.texParameteri(Context3DProxy.gl.TEXTURE_2D, Context3DProxy.gl.TEXTURE_WRAP_T, Context3DProxy.gl.CLAMP_TO_EDGE);

            }

            if (this.canUpdataTexture) {
                this.context.drawImage(this.video, 0, 0, this.width, this.height);

                Context3DProxy.gl.pixelStorei(Context3DProxy.gl.UNPACK_ALIGNMENT, 1)
                Context3DProxy.gl.bindTexture(Context3DProxy.gl.TEXTURE_2D, this.texture2D.textureBuffer);
                Context3DProxy.gl.texImage2D(Context3DProxy.gl.TEXTURE_2D, 0, Context3DProxy.gl.RGB, Context3DProxy.gl.RGB, Context3DProxy.gl.UNSIGNED_BYTE, this.tmpCanvas);

                Context3DProxy.gl.texParameteri(Context3DProxy.gl.TEXTURE_2D, Context3DProxy.gl.TEXTURE_MIN_FILTER, Context3DProxy.gl.LINEAR);
                Context3DProxy.gl.texParameteri(Context3DProxy.gl.TEXTURE_2D, Context3DProxy.gl.TEXTURE_MAG_FILTER, Context3DProxy.gl.LINEAR);
                Context3DProxy.gl.texParameteri(Context3DProxy.gl.TEXTURE_2D, Context3DProxy.gl.TEXTURE_WRAP_S, Context3DProxy.gl.CLAMP_TO_EDGE );
                Context3DProxy.gl.texParameteri(Context3DProxy.gl.TEXTURE_2D, Context3DProxy.gl.TEXTURE_WRAP_T, Context3DProxy.gl.CLAMP_TO_EDGE );
            }
        }

        /**
        * @private
        */
        public uploadForcing(context3D: Context3DProxy) {

        }
    }
} 