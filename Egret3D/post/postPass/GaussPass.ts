module egret3d {

    /*
    * @private
    */
    export class GaussPass implements IPost {

        public drawRectangle: Rectangle;

        private _h_postRender: PostRender;
        private _v_postRender: PostRender;

        private _debugHud: HUD = new HUD();
        constructor() {
            this._h_postRender = new PostRender("hud_vs", "gaussian_H_fs");
            this._h_postRender.setRenderToTexture(2048, 2048, FrameBufferFormat.UNSIGNED_BYTE_RGB);

            this._v_postRender = new PostRender("hud_vs", "gaussian_V_fs");//"gaussian_V_fs");
            this._v_postRender.setRenderToTexture(2048, 2048, FrameBufferFormat.UNSIGNED_BYTE_RGB);

            this._debugHud.fsShader = "hud_H_fs";
            this._debugHud.x = 512 + 256;
            this._debugHud.y = 0;
            this._debugHud.width = 128;
            this._debugHud.height = 128;
        }

        public drawTexture(time: number, delay: number, context3D: Context3DProxy, collect: CollectBase, camera: Camera3D, backViewPort: Rectangle, posList: any) {
           
            this._h_postRender.draw(time, delay, context3D, collect, camera, backViewPort, posList);
            posList["end"] = this._h_postRender.renderTexture;

            this._v_postRender.draw(time, delay, context3D, collect, camera, backViewPort, posList); 

            posList["end"] = this._v_postRender.renderTexture;
            posList["bloomPass"] = this._v_postRender.renderTexture;

            //this._debugHud.viewPort = camera.viewPort;
            //this._debugHud.diffuseTexture = this._v_postRender.renderTexture;
            //this._debugHud.draw(context3D);
        }
    }
}