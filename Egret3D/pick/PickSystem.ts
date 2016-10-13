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
        public piexs: Uint8Array;
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
            this.pickRender.setRenderToTexture(512, 512, FrameBufferFormat.UNSIGNED_BYTE_RGBA);
            this.pickRender.drawOver = (entityCollect: EntityCollect, camera: Camera3D, time: number, delay: number, viewPort: Rectangle) => this.drawOver(entityCollect, camera, time, delay, viewPort);
            this.piexs = new Uint8Array(this.pickRender.renderTexture.width * this.pickRender.renderTexture.height * 4);
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

        private drawOver(entityCollect: EntityCollect, camera: Camera3D, time: number, delay: number, viewPort: Rectangle) {

            Context3DProxy.gl.readPixels(0, 0, this.pickRender.renderTexture.width, this.pickRender.renderTexture.height, Context3DProxy.gl.RGBA, Context3DProxy.gl.UNSIGNED_BYTE, this.piexs);
            var i: number = 0;
        }

        public getObjectId(x: number, y: number, cavans:Egret3DCanvas, view: View3D): number {

            var vx: number = x - view.x;
            var vy: number = y - view.y;
            vy = view.height - vy; 

            var xx: number = Math.floor(vx / view.width * this.pickRender.renderTexture.width);
            var yy: number = Math.floor(vy / view.height * this.pickRender.renderTexture.height);

            var index: number = yy * this.pickRender.renderTexture.width + xx;
            
            return Color.RGBAToColor(this.piexs[index * 4 + 0], this.piexs[index * 4 + 1], this.piexs[index * 4 + 2], this.piexs[index * 4 + 3]);
        }
    }
}