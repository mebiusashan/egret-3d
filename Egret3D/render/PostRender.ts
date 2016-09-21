module egret3d {

    /*
    * @private
    */
    export class PostRender extends RenderBase {

        public hud: HUD = new HUD();

        constructor(vs: string, fs: string) {
            super();
            this.hud.vsShader = vs;
            this.hud.fsShader = fs;
        }

        public setRenderToTexture(width: number, height: number, format: FrameBufferFormat = FrameBufferFormat.UNSIGNED_BYTE_RGB) {
            this.renderTexture = new RenderTexture(width, height, FrameBufferFormat.UNSIGNED_BYTE_RGB);
        }

        public draw(time: number, delay: number, context3D: Context3DProxy, collect: CollectBase, camera: Camera3D, backViewPort: Rectangle = null, posList: any) {
            this.numEntity = collect.renderList.length;

            if (this.renderTexture) {
                this.renderTexture.upload(context3D);
                context3D.setRenderToTexture(this.renderTexture.texture2D, true, 0);
            }
            //--------render container--------------
            this.hud.viewPort = camera.viewPort;
            this.hud.x = camera.viewPort.x;
            this.hud.y = camera.viewPort.y;
            this.hud.width = camera.viewPort.width;
            this.hud.height = camera.viewPort.height;

            this.hud.diffuseTexture = posList["end"];
            this.hud["colorTexture"] = posList["colorTexture"];

            this.hud.draw(context3D,camera);
            //--------------------------------------
            if (this.renderTexture)
                context3D.setRenderToBackBuffer();

            if (backViewPort) {
                context3D.viewPort(backViewPort.x, backViewPort.y, backViewPort.width, backViewPort.height);
                context3D.setScissorRectangle(backViewPort.x, backViewPort.y, backViewPort.width, backViewPort.height);
            }
        }
    }
}
