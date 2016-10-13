module egret3d {

    export class Class_SampleGUI_fonts extends Class_View3D {

        protected view1: View3D;
        protected ctl; HoverController;
        protected resourceManager: TextureResourceManager;
        constructor() {
            super();

            var view1: View3D = new View3D(0, 0, window.innerWidth, window.innerHeight);
            view1.camera3D.lookAt(new Vector3D(0, 100, -100), new Vector3D(0, 0, 0));
            view1.backColor = 0x88888888;

            this._egret3DCanvas.addView3D(view1);
            this.view1 = view1;
            this.ctl = new HoverController(view1.camera3D);
            this.ctl.tiltAngle = 60;
            this.ctl.distance = 1000;

            Egret3DEngine.instance.debug = false;
            //view1.render = new MultiRender(PassType.matCapPass);

            this._egret3DCanvas.start();
            this._egret3DCanvas.addEventListener(Event3D.ENTER_FRAME, this.update, this);
            this.resourceManager = TextureResourceManager.getInstance();

            this.resourceManager.loadTexture("resource/ui/fonts.json", "resource/ui/fonts.png", this.view1.getGUIStage());
            this.resourceManager.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onLoadFonts, this);

        }

        protected onLoadFonts(e: LoaderEvent3D) {
            egret3d.gui.BitmapFont.load(this.resourceManager.getTextureDic());
            var newTexture: Texture = egret3d.gui.BitmapFont.getTexture(("，").charCodeAt(0));

            var skin: Quad = new Quad();
            skin.color = 0x00ff00;
            skin.width = newTexture.width;
            skin.height = newTexture.height;
            skin.texture = newTexture;

            this.view1.addGUI(skin);

        }


        public update(e: Event3D) {
            this.ctl.update();
        }
    }
}