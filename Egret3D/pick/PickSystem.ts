module egret3d {

    /**
    * @private
    * @language zh_CN
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class PickSystem {
        private static _instance: PickSystem;

        /**
        * @language zh_CN
        * 
        * @version Egret 3.0
        * @platform Web,Native
        */
        public pickRender: MultiRender;

        /**
        * @language zh_CN
        * 单例
        * @returns PickSystem 实例返回
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static get instance(): PickSystem {
            if (!PickSystem._instance) {
                PickSystem._instance = new PickSystem();
            }
            return PickSystem._instance;
        }

        public enablePick: boolean = false;

        /**
        * @private
        * @language zh_CN
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor() {
            this.pickRender = new MultiRender(PassType.PickPass);
            this.pickRender.setRenderToTexture(128, 128, FrameBufferFormat.UNSIGNED_BYTE_RGBA);
        }

     
        /**
        * @private
        * @language zh_CN
        * @version Egret 3.0
        * @platform Web,Native
        */
        public update(entityCollect: EntityCollect, camera: Camera3D, time: number, delay: number, viewPort: Rectangle) {

            Egret3DCanvas.context3DProxy.clearColor(1.0, 1.0, 1.0, 1.0);
            Egret3DCanvas.context3DProxy.clear(Context3DProxy.gl.COLOR_BUFFER_BIT | Context3DProxy.gl.DEPTH_BUFFER_BIT);

            this.pickRender.draw(time, delay, Egret3DCanvas.context3DProxy, entityCollect, camera, viewPort);
        }
    }
}