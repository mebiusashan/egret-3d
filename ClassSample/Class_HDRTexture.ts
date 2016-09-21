module egret3d {
    //加载HDR贴图
    export class Class_HDRTexture extends Class_View3D {

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
            //var loadtex: URLLoader = new URLLoader("resource/effect/fire.png");
           var loadtex: URLLoader = new URLLoader("resource/hdr/LightmapFar-1.png");
             //var loadtex: URLLoader = new URLLoader("resource/hdr/LightmapFar-2.hdr");
            loadtex.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onLoadAlphaTexture, this);

            this._egret3DCanvas.addEventListener(Event3D.ENTER_FRAME, this.update, this);
        }

        private onLoadAlphaTexture(e: LoaderEvent3D) {
            var texture: ITexture = e.loader.data;

            var plane_2: Mesh = new Mesh(new PlaneGeometry(1000,1000,1,1,10,10), new TextureMaterial(texture));
            plane_2.material.blendMode = BlendMode.NORMAL;
            plane_2.material.cutAlpha = 0;
            plane_2.material.repeat = true;
            plane_2.name = "plane_2";
            plane_2.tag.name = "normalObject";
            this.view1.addChild3D(plane_2);
        }

        public update(e: Event3D) {
            this.cameraCtl.update();
            Egret3DState.showTime(Math.floor(1000 / e.delay), e.delay);
        }
    }
}