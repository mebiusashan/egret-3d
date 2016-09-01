module egret3d {
    /**
    * 按回车播放动画 按1键切换摄像机
    */
    export class Class_NewScene extends Class_View3D {

        private view1: View3D;
        private cameraCtl: LookAtController;

        private node: Object3D;

        private xielong: Mesh;
        private binglong: Mesh;
        private Dummy001: Object3D;
        private mapLoader: MapLoader;
        protected lights: LightGroup = new LightGroup();

        public box: Mesh;
        constructor() {
            super();

            var view1: View3D = new View3D(0, 0, window.innerWidth, window.innerHeight);
            view1.camera3D.lookAt(new Vector3D(0, 1000, -1000), new Vector3D(0, 0, 0));
            view1.backColor = 0xff7f7f00;
            view1.camera3D.far = 1000000;

            this._egret3DCanvas.addView3D(view1);
            this.view1 = view1;

            var bgImg: HTMLImageElement = <HTMLImageElement>document.getElementById("bg");
            var tex: ImageTexture = new ImageTexture(bgImg);
            this.view1.backImage = tex;

            this.cameraCtl = new LookAtController(view1.camera3D, new Object3D());
            this.cameraCtl.distance = 1000;
            this.cameraCtl.rotationX = 60;

            this._egret3DCanvas.addEventListener(Event3D.ENTER_FRAME, this.update, this);


            this.mapLoader = new MapLoader("main");

            this.view1.addChild3D(this.mapLoader.container);
            this.node = this.mapLoader.container;

            this.mapLoader.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.OnMapLoad, this);

            Input.addEventListener(KeyEvent3D.KEY_DOWN, this.onKeyDown_Test, this);
        }

        private onTerrian(e: LoaderEvent3D) {
            console.log("ok");
        }

        private onKeyDown_Test(e: KeyEvent3D): void {
            if (e.keyCode == KeyCode.Key_Enter) {
                this.xielong = <Mesh>this.node.findObject3D("Xielong_boss");
                this.binglong = <Mesh>this.node.findObject3D("binglong");
                this.xielong.enableCulling = false;
                this.binglong.enableCulling = false;
                this.xielong.animation.play("Xielong_boss_guochang.eam");
                this.binglong.animation.play("binglong_guochang.eam");
                this.Dummy001.proAnimation.play();

            }
            else if (e.keyCode == KeyCode.Key_1) {
                this.box1.visible = !this.box1.visible;

                var camrea: egret3d.Camera3D;

                camrea = this.view1.camera3D;

                this.cameraCtl.target = this.view1.camera3D = this.oldCamrea;

                this.oldCamrea = camrea;
            }
            else if (e.keyCode == KeyCode.Key_P) {
                this.isUpdate = !this.isUpdate;

                if (this.isUpdate == true) {
                    this.xielong.animation.speed = 1;
                    this.binglong.animation.speed = 1;
                }
                else {
                    this.xielong.animation.speed = 0;
                    this.binglong.animation.speed = 0;
                }
            }
        }

        private box1: egret3d.Mesh;
        private oldCamrea: egret3d.Camera3D;
        private isUpdate: boolean = true;
        private OnMapLoad(e: LoaderEvent3D) {
            var camrea: Camera3D = <Camera3D>this.node.findObject3D("剧情摄像机");
            camrea.far = 1000000;
            camrea.aspectRatio = this.view1.width / this.view1.height;
            camrea.updateViewport(this.view1.x, this.view1.y, this.view1.width, this.view1.height);

            var box111: egret3d.Mesh = new egret3d.Mesh(new egret3d.CubeGeometry(100, 100, 100), new egret3d.ColorMaterial(0xff0000));
            box111.z = 100;
            this.box1 = new egret3d.Mesh(new egret3d.CubeGeometry(100, 100, 200), new egret3d.ColorMaterial(0x00ff00));
            this.box1.addChild(box111);
            this.box1.material.ambientColor = 0xffffff;
            camrea.addChild(this.box1);

            this.xielong = <Mesh>this.node.findObject3D("Xielong_boss");
            this.binglong = <Mesh>this.node.findObject3D("binglong");
            this.Dummy001 = this.node.findObject3D("Dummy001");

            this.oldCamrea = camrea;
        }

        private _line: Array<egret3d.Wireframe> = new Array<egret3d.Wireframe>();

        protected onLoad(e: LoaderEvent3D) {
            var m: Mesh = new Mesh(e.loader.data, new TextureMaterial());
            this.view1.addChild3D(m);
        }

        private a: number = 0;
        public update(e: Event3D) {
            if (this.box1 && this.box1.visible) {
                this.cameraCtl.update();
            }
            if (!this.isUpdate) {
                return;
            }
        }
    }
}