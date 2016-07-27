module egret3d {
                            
    /**
    * @private
    * @class egret3d.RenderBase
    * @classdesc
    * 渲染器基类
    */
    export class RenderBase {

        ///protected _context3D: Context3DProxy;
        protected _renderIndex: number = 0;
        public renderTexture: RenderTexture; 
        public numEntity: number = 0; 

        /**
        * @language zh_CN
        * constructor
        */
        constructor() {
            ///this.camera3D = camera3D;
        }
               
        public setRenderToTexture(width: number, height: number, format: FrameBufferFormat= FrameBufferFormat.UNSIGNED_BYTE_RGB) {
            this.renderTexture = new RenderTexture(width, height, format);
            //this.renderTexture.

        }
                                 
        /**
        * @language zh_CN
        * 每帧渲染
        * @param time 当前时间
        * @param delay 每帧间隔时间
        * @param context3D 设备上下文
        * @param collect 渲染对象收集器
        * @param camera 渲染时的相机
        */
        public draw(time: number, delay: number, context3D: Context3DProxy, collect: CollectBase, camera: Camera3D, backViewPort: Rectangle = null, shadow:boolean = false) {
        }
    }
} 