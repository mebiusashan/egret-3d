module egret3d {

    /*
    * @private
    */
    export class DeferredShadingProcessing implements IPost{

        public drawRectangle: Rectangle;

        public colorPassRender: MultiRender; 
        public PositionPassRender: MultiRender; 
        public NormalPassRender: MultiRender; 
         
        private _debugHud: HUD = new HUD();
        private tex: ImageTexture;
        constructor() {
            this.colorPassRender = new MultiRender(PassType.colorPass);
            this.colorPassRender.setRenderToTexture(2048, 2048, FrameBufferFormat.UNSIGNED_BYTE_RGB);

            this.PositionPassRender = new MultiRender( PassType.depthPass_8 );
            this.PositionPassRender.setRenderToTexture(2048, 2048, FrameBufferFormat.FLOAT_RGBA);

            this.NormalPassRender = new MultiRender(PassType.normalPass);
            this.NormalPassRender.setRenderToTexture(2048, 2048, FrameBufferFormat.UNSIGNED_BYTE_RGB);

            this._debugHud.fsShader = "hud_H_fs";
            this._debugHud.x = 512;
            this._debugHud.y = 0;
            this._debugHud.width = 256;
            this._debugHud.height = 256;
        }

        public drawTexture(time: number, delay: number, context3D: Context3DProxy, collect: CollectBase, camera: Camera3D, backViewPort: Rectangle, posList: any) {
          this.colorPassRender.draw(time, delay, context3D, collect, camera, backViewPort);
          this.NormalPassRender.draw(time, delay, context3D, collect, camera, backViewPort);
          this.PositionPassRender.draw(time, delay, context3D, collect, camera, backViewPort);
      
          posList["colorPass"] = this.colorPassRender.renderTexture;
          posList["positionPass"] = this.PositionPassRender.renderTexture;
          posList["normalPass"] = this.NormalPassRender.renderTexture;

          this._debugHud.viewPort = camera.viewPort;
          this._debugHud.diffuseTexture = this.colorPassRender.renderTexture;
          this._debugHud.draw(context3D);
        }
    }
} 