module egret3d {

    /*
    * @private
    */
    export class PostRenderBuffer {

        public depthBuffer      : MultiRender;
        public normalBuffer     : MultiRender;
        public colorBuffer      : MultiRender;
        public specularBuffer   : MultiRender;
        public defaultBuffer    : MultiRender;

        public useDepthPass     : boolean = false; 
        public useNormalPass    : boolean = false; 
        public useColorPass     : boolean = false; 
        public useSpecularPass  : boolean = false; 

        private debugHUD: HUD;
        constructor( ) {
            this.debugHUD = new HUD();
        }

        public enableDepthPass(w: number, h: number, flag: boolean) {
            this.useDepthPass = flag; 
            if (flag) {
                this.depthBuffer = new MultiRender(PassType.depthPass_8);
            }
        }

        public drawRenderBuffer(time: number, delay: number, context3D: Context3DProxy, collect: CollectBase, camera: Camera3D, backViewPort: Rectangle = null) {
            if (this.useDepthPass)
                this.depthBuffer.draw(time, delay, context3D, collect, camera, backViewPort);

            this.debugHUD.diffuseTexture = this.depthBuffer.renderTexture ; 
            this.debugHUD.draw(context3D);
        }
    }
}