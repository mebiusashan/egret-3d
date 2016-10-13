module egret3d {

    export class Class_SampleGUI_UITextField extends Class_View3D {

        protected view1: View3D;
        protected ctl; HoverController;
        protected textField: gui.UITextField;

        public constructor() {
            super();

            this.view1 = new View3D(0, 0, window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio);
            this.view1.camera3D.lookAt(new Vector3D(0, 100, -100), new Vector3D(0, 0, 0));
            this.view1.backColor = 0xffcccccc;
            this._egret3DCanvas.addView3D(this.view1);

            this.ctl = new HoverController(this.view1.camera3D);
            this.ctl.tiltAngle = 60;
            this.ctl.distance = 1000;

            Egret3DEngine.instance.debug = false;

            this._egret3DCanvas.start();
            this._egret3DCanvas.addEventListener(Event3D.ENTER_FRAME, this.update, this);
            var gui: QuadStage = this.view1.getGUIStage();
            TextureResourceManager.getInstance().loadTexture("resource/ui/fonts.json", "resource/ui/fonts.png", gui);
            TextureResourceManager.getInstance().loadTexture("resource/ui/GUI.json", "resource/ui/GUI.png", gui);
            TextureResourceManager.getInstance().addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onLoadFonts, this);
        }

        protected onLoadFonts(e: LoaderEvent3D) {
            gui.BitmapFont.load(TextureResourceManager.getInstance().getTextureDic());
            var upState: Texture = TextureResourceManager.getInstance().getTexture("normal.png");
            var downState: Texture = TextureResourceManager.getInstance().getTexture("pressed.png");
            var checkUpState: Texture = TextureResourceManager.getInstance().getTexture("default.png");
            var checkDownState: Texture = TextureResourceManager.getInstance().getTexture("checked.png");

            var whiteBg: Texture = TextureResourceManager.getInstance().getTexture("whitebackground.png");

            var progressBg: Texture = TextureResourceManager.getInstance().getTexture("backgroundpic.png");
            var progressBarSkin: Texture = TextureResourceManager.getInstance().getTexture("blue.png");

            var radioUpState: Texture = TextureResourceManager.getInstance().getTexture("unselected.png");
            var radioDownState: Texture = TextureResourceManager.getInstance().getTexture("selected.png");

            var sliderBar: Texture = TextureResourceManager.getInstance().getTexture("bluebackground.png");
            var sliderBackground: Texture = TextureResourceManager.getInstance().getTexture("whitebackground.png");

            var con: DisplayObject = new DisplayObject();
            this.view1.addGUI(con);
            var btn: gui.UIButton = new gui.UIButton();
            btn.width = upState.width;
            btn.height = upState.height;
            btn.setStyle("up", upState);
            btn.setStyle("down", downState);
            con.addChild(btn);

            con.visible = false;

            var labelBtn: gui.UILabelButton = new gui.UILabelButton();
            labelBtn.y = 50;
            labelBtn.width = upState.width;
            labelBtn.height = upState.height;
            labelBtn.setStyle("up", upState);
            labelBtn.setStyle("down", downState);
            labelBtn.label = "重置";
            this.view1.addGUI(labelBtn);
            labelBtn.addEventListener(MouseEvent3D.MOUSE_CLICK,
                (e) => {
                    console.log("click1");
                },
                this);

            labelBtn.addEventListener(MouseEvent3D.MOUSE_CLICK,
                (e) => {
                    console.log("click2");
                },
                this);

            var checkBox: gui.UICheckBox = new gui.UICheckBox();
            checkBox.width = checkUpState.width;
            checkBox.height = checkUpState.height;
            checkBox.setStyle("up", checkUpState);
            checkBox.setStyle("down", checkUpState);
            checkBox.setStyle("downAndSelected", checkDownState);
            checkBox.setStyle("upAndSelected", checkDownState);
            checkBox.label = "checkbox";
            checkBox.y = 100;
            this.view1.addGUI(checkBox);

            var radioButtonGroup: gui.UIRadioButtonGroup = new gui.UIRadioButtonGroup();
            for (var i: number = 0; i < 3; i++) {
                var radioBtn: gui.UIRadioButton = new gui.UIRadioButton();

                radioBtn.setStyle("up", radioUpState);
                radioBtn.setStyle("down", radioUpState);
                radioBtn.setStyle("downAndSelected", radioDownState);
                radioBtn.setStyle("upAndSelected", radioDownState);
                radioBtn.width = checkUpState.width;
                radioBtn.height = checkUpState.height;
                radioBtn.label = "btn " + i;
                radioBtn.y = 150;
                radioBtn.x = i * (radioBtn.buttonAndLabelWidth + 5);
                this.view1.addGUI(radioBtn);
                radioButtonGroup.addItem(radioBtn);
            }

            var progressBar: gui.UIProgressBar = new gui.UIProgressBar();
            progressBar.height = 29;
            progressBar.width = 500;
            progressBar.setStyle("background", progressBg);
            progressBar.setStyle("bar", progressBarSkin);
            this.view1.addGUI(progressBar);
            setInterval(() => {
                if (progressBar.ratio === 1) {
                    progressBar.ratio = 0;
                }
                progressBar.ratio += 0.001;
            },
                16);
            progressBar.y = 200;

            var slider: gui.UISlider = new gui.UISlider();
            slider.setStyle("bar", sliderBar);
            slider.setStyle("background", sliderBackground);
            slider.width = 100;
            slider.height = 20;
            slider.y = 250;
            slider.addEventListener(Event3D.CHANGE,
                (e) => {
                    console.log(slider === e.target);
                    console.log(slider.value);
                },
                this);
            this.view1.addGUI(slider);

            var list: gui.UIList = new gui.UIList();
            list.width = 460;
            list.height = 200;
            list.setStyle("background", whiteBg);
            list.y = 300;
            var texAry = ["14.png", "20.png", "38.png", "56.png", "91.png", "99+.png"];
            for (var i: number = 0; i < texAry.length; i++) {
                var tempQuad: Quad = new Quad();
                tempQuad.width = 460;
                tempQuad.height = 41;
                tempQuad.texture = TextureResourceManager.getInstance().getTexture(texAry[i]);
                list.addItem(tempQuad);
            }
            this.view1.addGUI(list);

//            var input: gui.UITextField = new gui.UITextField(gui.UITextFieldType.INPUT);
//            input
//            this.view1.addGUI(input);
        }

        public update(e: Event3D) {
            this.ctl.update();
        }
    }

}