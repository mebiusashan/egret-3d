module egret3d {

    /*
    * @private
    */
    export class AmbientOcclusion implements IPost{

        public drawRectangle: Rectangle;

        private postRender: PostRender;
        private _debugHud: HUD = new HUD();
        constructor() {
            this.postRender = new PostRender("hud_vs", "SSAO");//SSAO
            //this.postRender.setRenderToTexture(1024, 1024, FrameBufferFormat.UNSIGNED_BYTE_RGB);
            //this._debugHud.fsShader = "hud_H_fs";
            //this._debugHud.x = 512+256;
            //this._debugHud.y = 0;
            //this._debugHud.width = 128;
            //this._debugHud.height = 128;
        }

        public drawTexture(time: number, delay: number, context3D: Context3DProxy, collect: CollectBase, camera: Camera3D, backViewPort: Rectangle, posList: any) {
            this.postRender.hud["colorPass"] = posList["colorPass"]; 
            this.postRender.hud["positionPass"] = posList["positionPass"]; 
            this.postRender.hud["normalPass"] = posList["normalPass"]; 
            this.postRender.draw(time, delay, context3D, collect, camera, backViewPort, posList);
            posList["end"] = this.postRender.renderTexture ;
        }
    }
}