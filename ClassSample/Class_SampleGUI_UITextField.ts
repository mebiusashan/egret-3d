module egret3d {

    export class Class_SampleGUI_UITextField extends Class_View3D{

        protected view1: View3D;
        protected ctl; HoverController;
        protected textField: gui.UITextField;

        public constructor(){
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
//            TextureResourceManager.getInstance().loadTexture("resource/ui/fonts.json", "resource/ui/fonts.png", gui);
//            TextureResourceManager.getInstance().loadTexture("resource/ui/CommonUIAtlas.json", "resource/ui/CommonUIAtlas.png", gui);
            TextureResourceManager.getInstance().loadTexture("resource/ui/LoginUIAtlas.json", "resource/ui/LoginUIAtlas.png", gui);
            TextureResourceManager.getInstance().addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onLoadFonts, this);
        }

        protected onLoadFonts(e: LoaderEvent3D) {
//            egret3d.gui.BitmapFont.load(TextureResourceManager.getInstance().getTextureDic());
//
//            var upState: Texture = TextureResourceManager.getInstance().getTexture("ty_anniu_a");
//            var downState: Texture = TextureResourceManager.getInstance().getTexture("ty_anniu_b");
//            var checkUpState: Texture = TextureResourceManager.getInstance().getTexture("bg_cancel_01");
//            var checkDownState: Texture = TextureResourceManager.getInstance().getTexture("bg_cancel_02");
//
//            var btn: gui.UIButton = new gui.UIButton();
//            btn.width = upState.width;
//            btn.height = upState.height;
//            btn.setStyle("up", upState);
//            btn.setStyle("down", downState);
//            this.view1.addGUI(btn);
//
//          
//            
//            var labelBtn: gui.UILabelButton = new gui.UILabelButton();
//            labelBtn.width = upState.width;
//            labelBtn.height = upState.height;
//            labelBtn.setStyle("up", upState);
//            labelBtn.setStyle("down", downState);
//            labelBtn.label = "按钮";
//            this.view1.addGUI(labelBtn);
//            labelBtn.addEventListener(MouseEvent3D.MOUSE_CLICK,
//                (e) => {
//                    console.log("click1");
//                },
//                this);
//
//            labelBtn.addEventListener(MouseEvent3D.MOUSE_CLICK,
//                (e) => {
//                    console.log("click2");
//                },
//                this);
//
//            var checkBox: gui.UICheckBox = new gui.UICheckBox();
//            checkBox.width = checkUpState.width;
//            checkBox.height = checkUpState.height;
//            checkBox.setStyle("up", checkUpState);
//            checkBox.setStyle("down", checkUpState);
//            checkBox.setStyle("downAndSelected", checkDownState);
//            checkBox.setStyle("upAndSelected", checkDownState);
//            checkBox.label = "checkbox";
//            checkBox.y = 100;
//            checkBox.x = 100;
//            this.view1.addGUI(checkBox);
//
//            var radioButtonGroup: gui.UIRadioButtonGroup = new gui.UIRadioButtonGroup();
//            for (var i: number = 0; i < 10; i++) {
//                var radioBtn: gui.UIRadioButton = new gui.UIRadioButton();
//               
//                radioBtn.setStyle("up", checkUpState);
//                radioBtn.setStyle("down", checkUpState);
//                radioBtn.setStyle("downAndSelected", checkDownState);
//                radioBtn.setStyle("upAndSelected", checkDownState);
//                radioBtn.width = checkUpState.width;
//                radioBtn.height = checkUpState.height;
//                radioBtn.label  = "btn " + i;
//                radioBtn.y = 150;
//                radioBtn.x = i * (radioBtn.buttonAndLabelWidth + 5);
//                this.view1.addGUI(radioBtn);
////                radioButtonGroup.addItem(radioBtn);
//            }

            var progressBar: gui.UIProgressBar = new gui.UIProgressBar();
            progressBar.height = 29;
            progressBar.width = 500;
            progressBar.setStyle("background", TextureResourceManager.getInstance().getTexture("l_jdt_dise.png"));
            progressBar.setStyle("bar", TextureResourceManager.getInstance().getTexture("l_jdt_hong.png"));
            this.view1.addGUI(progressBar);
            setInterval(() => {
                if (progressBar.ratio === 1) {
                    progressBar.ratio = 0;
                }
                    progressBar.ratio += 0.001;
                },
                16);
            progressBar.y = 200;
          
//            var list: gui.UIList = new gui.UIList();
//            list.width = 300;
//            list.height = 200;
//            list.setStyle("background", TextureResourceManager.getInstance().getTexture("bg_mian_white"));
//            list.y = 250;
//            for (var i: number = 0; i < 31; i++) {
//                var labelBtn: gui.UILabelButton = new gui.UILabelButton();
//                labelBtn.width = upState.width;
//                labelBtn.height = upState.height;
//                labelBtn.setStyle("up", upState);
//                labelBtn.setStyle("down", downState);
//                labelBtn.label = "按钮" + i;
//                list.addItem(labelBtn);
//                labelBtn.addEventListener(MouseEvent3D.MOUSE_CLICK,
//                    (e) => {
//                        list.removeItem(labelBtn);
//                    },
//                    this);
//            }
//            this.view1.addGUI(list);
        }

        public update(e: Event3D) {
            this.ctl.update();
        }
    }

}