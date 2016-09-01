module egret3d {
    // 渲染层级的指定
    export class Class_AlphaTest extends Class_View3D {

        private laohu: Mesh;
        private view1: View3D;
        private lights: LightGroup = new LightGroup();

        private cameraCtl: LookAtController;

        constructor() {
            super();

            var view1: View3D = new View3D(0, 0, window.innerWidth, window.innerHeight);
            view1.camera3D.lookAt(new Vector3D(0, 1000, -1000), new Vector3D(0, 0, 0));
            view1.backColor = 0xffffffff;

            var bgImg: HTMLImageElement = <HTMLImageElement>document.getElementById("bg");
            var tex: ImageTexture = new ImageTexture(bgImg);
            view1.backImage = tex;

            this._egret3DCanvas.addView3D(view1);
            this.view1 = view1;

            this.cameraCtl = new LookAtController(view1.camera3D, new Object3D());
            this.cameraCtl.distance = 1000;
            this.cameraCtl.rotationX = 60;

            var loadtex: URLLoader = new URLLoader("resource/effect/blossom_01.png");
            loadtex.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onLoadAlphaTexture, this);

            var loadtex: URLLoader = new URLLoader("resource/effect/smoke_0008.png");
            loadtex.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onLoadMatCapTexture, this);

            this._egret3DCanvas.addEventListener(Event3D.ENTER_FRAME, this.update, this);
        }

        private onLoadAlphaTexture(e: LoaderEvent3D) {
            var texture: ITexture = e.loader.data;
            var plane_2: Mesh = new Mesh(new PlaneGeometry(), new TextureMaterial(texture));
            plane_2.material.blendMode = BlendMode.NORMAL;
            plane_2.material.cutAlpha = 0;
            plane_2.x = 50;
            plane_2.y -= 50;
            plane_2.name = "plane_2";
            plane_2.tag.name = "normalAlphaObject";
            this.view1.addChild3D(plane_2);
        }

        private onLoadMatCapTexture(e: LoaderEvent3D) {
            var s_0: Mesh = new Mesh(new SphereGeometry(150, 100, 100), new TextureMaterial(CheckerboardTexture.texture));
            s_0.material.cutAlpha = 0;
            s_0.material.blendMode = BlendMode.NORMAL;
            s_0.name = "s_0";
            this.view1.addChild3D(s_0);

           var texture: ITexture = e.loader.data;
            //var plane_0: Mesh = new Mesh(new PlaneGeometry(), new TextureMaterial(texture));
            //plane_0.material.cutAlpha = 0;
            //plane_0.material.blendMode = BlendMode.ALPHA;
            //plane_0.x = 150;
            //plane_0.name = "plane_0";
            //this.view1.addChild3D(plane_0);
            
            var plane_1: Mesh = new Mesh(new PlaneGeometry(), new TextureMaterial(texture));
            plane_1.material.blendMode = BlendMode.ADD;
            plane_1.material.cutAlpha = 0;
            plane_1.x = 100;
            plane_1.y -= 25;
            plane_1.name = "plane_1";
            //plane_1.tag.name = "alphaObject";
            this.view1.addChild3D(plane_1);


        }

        public update(e: Event3D) {
            this.cameraCtl.update();
            Egret3DState.showTime(Math.floor(1000 / e.delay), e.delay);
        }
    }
}