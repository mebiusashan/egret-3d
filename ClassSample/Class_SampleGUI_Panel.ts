module egret3d {
    export class Class_SampleGUI_Panel extends Class_View3D {
        protected view1: View3D;
        protected ctl; HoverController;
        protected textField: gui.UITextField;

        public constructor() {
            super();

            this.view1 = new View3D(0, 0, window.innerWidth, window.innerHeight);
            this.view1.camera3D.lookAt(new Vector3D(0, 100, -100), new Vector3D(0, 0, 0));
            this.view1.backColor = 0xff888888;
            this._egret3DCanvas.addView3D(this.view1);

            this.ctl = new HoverController(this.view1.camera3D);
            this.ctl.tiltAngle = 60;
            this.ctl.distance = 1000;

            Egret3DEngine.instance.debug = false;

            this._egret3DCanvas.start();
            this._egret3DCanvas.addEventListener(Event3D.ENTER_FRAME, this.update, this);
            var gui: QuadStage = this.view1.getGUIStage();
            TextureResourceManager.getInstance().loadTexture("resource/ui/CommonUIAtlas.json", "resource/ui/CommonUIAtlas.png", gui);
            TextureResourceManager.getInstance().loadTexture("resource/ui/fonts.json", "resource/ui/fonts.png", gui);
            TextureResourceManager.getInstance().addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onLoaded, this);
        }

        private onLoaded(e: LoaderEvent3D) {
//            var tex: Texture = TextureResourceManager.getInstance().getTexture("bg_mian_white");
//            var panel: gui.UIPanel = new gui.UIPanel();
//            panel.setStyle("background", tex);
//            panel.width = 500;
//            panel.height = 300;
//            this.view1.addGUI(panel);
//            var guad: Quad = new Quad();
//            guad.texture = TextureResourceManager.getInstance().getTexture("bg_cancel_02");
//            this.view1.addGUI(guad);

            var txt: gui.UITextField = new gui.UITextField();
            txt.text = "士";
            txt.x = 200;
            txt.y = 500;
            this.view1.addGUI(txt);
        }

        public update(e: Event3D) {
            this.ctl.update();
        }
    }
}