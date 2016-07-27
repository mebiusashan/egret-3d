module egret3d {

    /*
    * @private
    */
    export class PostRender extends RenderBase{

        private _hud: HUD = new HUD();

        constructor(vs: string, fs:string ) {
            super();
            this._hud.vsShader = vs;
            this._hud.fsShader = fs;
        }

        public setRenderToTexture(width: number, height: number, format: FrameBufferFormat = FrameBufferFormat.UNSIGNED_BYTE_RGB) {
            this.renderTexture = new RenderTexture(width, height, FrameBufferFormat.UNSIGNED_BYTE_RGB);
        }

        public draw(time: number, delay: number, context3D: Context3DProxy, collect: CollectBase, camera: Camera3D, backViewPort: Rectangle = null, posList:any ) {
            this.numEntity = collect.renderList.length;

            if (this.renderTexture) {
                this.renderTexture.upload(context3D);
                context3D.setRenderToTexture(this.renderTexture.texture2D, true , 0);
            }
            //--------render container--------------
            this._hud.viewPort = camera.viewPort;
            this._hud.x = camera.viewPort.x;
            this._hud.y = camera.viewPort.y;
            this._hud.width = camera.viewPort.width;
            this._hud.height = camera.viewPort.height;
            this._hud.diffuseTexture = posList["end"]; 
            this._hud["colorTexture"] = posList["colorTexture"]; 
            this._hud.draw(context3D);
            //--------------------------------------
            context3D.setRenderToBackBuffer();
            if (backViewPort) {
                context3D.viewPort(backViewPort.x, backViewPort.y, backViewPort.width, backViewPort.height);
                context3D.setScissorRectangle(backViewPort.x, backViewPort.y, backViewPort.width, backViewPort.height);
            }
        }
    }
}