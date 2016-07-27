module egret3d {

    /*
    * @private
    */
    export class MainPass implements IPost{

        public drawRectangle: Rectangle;
        public mainPassRender: MultiRender; 
         
        private _debugHud: HUD = new HUD();

        constructor() {
            this.mainPassRender = new MultiRender(PassType.diffusePass);
            this.mainPassRender.setRenderToTexture(2048, 2048, FrameBufferFormat.UNSIGNED_BYTE_RGB);

            this._debugHud.fsShader = "hud_H_fs";
            this._debugHud.x = 512;
            this._debugHud.y = 0;
            this._debugHud.width = 256;
            this._debugHud.height = 256;
        }

        public drawTexture(time: number, delay: number, context3D: Context3DProxy, collect: CollectBase, camera: Camera3D, backViewPort: Rectangle, posList: any) {
            this.mainPassRender.draw(time, delay, context3D, collect, camera, backViewPort);

            //this._debugHud.viewPort = camera.viewPort;
            //this._debugHud.diffuseTexture = this.mainPassRender.renderTexture;
            //this._debugHud.draw(context3D);

            posList["mainPass"] = this.mainPassRender.renderTexture;
            posList["end"] = this.mainPassRender.renderTexture;
            posList["colorTexture"] = this.mainPassRender.renderTexture;
        }
    }
} 