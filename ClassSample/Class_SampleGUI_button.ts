

module egret3d {

    export class Class_SampleGUI_button extends Class_View3D {

        protected view1: View3D;
        protected ctl; HoverController;

        constructor() {
            super();

            var view1: View3D = new View3D(0, 0, window.innerWidth, window.innerHeight);
            view1.camera3D.lookAt(new Vector3D(0, 100, -100), new Vector3D(0, 0, 0));
            view1.backColor = 0x888888;

            this._egret3DCanvas.addView3D(view1);
            this.view1 = view1;
            this.ctl = new HoverController(view1.camera3D);
            this.ctl.tiltAngle = 60;
            this.ctl.distance = 1000;

            Egret3DEngine.instance.debug = false;
            //view1.render = new MultiRender(PassType.matCapPass);

            this._egret3DCanvas.start();
            this._egret3DCanvas.addEventListener(Event3D.ENTER_FRAME, this.update, this);

            var gui: QuadStage = this.view1.getGUIStage();
            TextureResourceManager.getInstance().loadTexture("resource/ui/CommonUIAtlas.json", "resource/ui/CommonUIAtlas.png", gui);
            TextureResourceManager.getInstance().addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onLoadDiffuse, this);

        }



        protected onLoadDiffuse(e: LoaderEvent3D) {
            var upState: Texture = TextureResourceManager.getInstance().getTexture("ty_anniu_a");
            var downState: Texture = TextureResourceManager.getInstance().getTexture("ty_anniu_b");

            var chkUnSelected: Texture = TextureResourceManager.getInstance().getTexture("bg_cancel_01");
            var chkSelected: Texture = TextureResourceManager.getInstance().getTexture("bg_cancel_02");


            var toggleBtn: gui.UIToggleButton = new gui.UIToggleButton();
            toggleBtn.width = upState.width;
            toggleBtn.height = upState.height;
            toggleBtn.setStyle("upSkin", upState);
            toggleBtn.setStyle("downSkin", upState);
            toggleBtn.setStyle("selectedUpSkin", downState);
            toggleBtn.setStyle("selectedDownSkin", downState);


            toggleBtn.x = 300;
            toggleBtn.y = 300;
            toggleBtn.addEventListener("eventChange", test, this);

            this.view1.addGUI(toggleBtn);


            var labelBtn: gui.UILabelButton = new gui.UILabelButton();
            labelBtn.width = upState.width;
            labelBtn.height = upState.height;
            labelBtn.setStyle("upSkin", upState);
            labelBtn.setStyle("downSkin", downState);



            labelBtn.x = 300;
            labelBtn.y = 350;
            labelBtn.addEventListener("buttonDown", test, this);


            this.view1.addGUI(labelBtn);


            var chk: gui.UICheckBox = new gui.UICheckBox();
            chk.width = chkSelected.width;
            chk.height = chkSelected.height;
            chk.setStyle("upSkin", chkUnSelected);
            chk.setStyle("downSkin", chkUnSelected);
            chk.setStyle("selectedUpSkin", chkSelected);
            chk.setStyle("selectedDownSkin", chkSelected);

            chk.x = 300;
            chk.y = 400;
            chk.addEventListener("eventChange", test, this);
            this.view1.addGUI(chk);


            function test(e: Event3D): void {
                console.log(e.data.selected);
            }
        }


        public update(e: Event3D) {
            this.ctl.update();
        }
    }
}