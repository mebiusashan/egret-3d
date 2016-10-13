module egret3d {
    /**
    * 实时阴影渲染
    * 动态模型的使用方式也一样
    * 使用之前可以看下 ShadowCast
    */
    export class Class_DirectLightShadow extends Class_View3D {

        protected view1: View3D;
        protected ctl; LookAtController;
        protected lights: LightGroup = new LightGroup();

        protected plane: Mesh;
        protected cube: Mesh;
        constructor() {
            super();


            var view1: View3D = new View3D(0, 0, this._egret3DCanvas.width, this._egret3DCanvas.height);
            //view1.camera3D.lookAt(new Vector3D(0, 100, -100), new Vector3D(0, 0, 0));
            view1.backColor = 0xffcccccc;
            this._egret3DCanvas.addView3D(view1);
            this.view1 = view1;
            //this.ctl = new HoverController(view1.camera3D);
            //this.ctl.tiltAngle = 60;
            //this.ctl.distance = 1500;

            this.ctl = new LookAtController(this.view1.camera3D, new Object3D());
            this.ctl.distance = 1000;
                                                   
            var bgImg: HTMLImageElement = <HTMLImageElement>document.getElementById("bg");
            var tex: ImageTexture = new ImageTexture(bgImg);
            view1.backImage = tex;

            this._egret3DCanvas.start();
            this._egret3DCanvas.addEventListener(Event3D.ENTER_FRAME, this.update, this);

            this.init();
        }

        private cam: Camera3D;

        private init() {
            
            this.plane = new Mesh(new PlaneGeometry(2000, 2000));
            //this.plane.lightGroup = this.lights;

            // 渲染阴影
            //this.plane.material.castShadow = true;
            // 接受阴影 
            this.plane.material.acceptShadow = true;
            this.view1.addChild3D(this.plane);

            this.cube = new Mesh(new CubeGeometry(100, 100, 100));
            //this.cube.lightGroup = this.lights;
            // 渲染阴影
            this.cube.material.castShadow = true;
            this.cube.material.acceptShadow = true;
            this.view1.addChild3D(this.cube);
            this.cube.y = 50;
            //this.cube.x = -1900;
            this.ctl.lookAtObject = this.cube;

            // 打开渲染阴影的视锥体
            //this.view1.addChild3D(ShadowCast.instance.directLight);
            //ShadowCast.instance.shadowCamera.frustum.visible = true;

            for (var i: number = 0; i < 10; ++i) {
                var m: Mesh = new Mesh(new CubeGeometry());
                this.view1.addChild3D(m);
                m.x = 100 * i;
                m.material.castShadow = true;
                m.material.acceptShadow = true;
            }

            var texture: ITexture = ShadowCast.instance.shadowRender.renderTexture;
            var gui: QuadStage = this.view1.getGUIStage();
            gui.registerTexture(texture);

            var quat: Quad = new Quad();
            quat.texture = texture;
            this.view1.addGUI(quat);
            this.ctl.lookAtObject = this.cube;


        }

        public update(e: Event3D) {

            this.ctl.update();
        }
    }
}