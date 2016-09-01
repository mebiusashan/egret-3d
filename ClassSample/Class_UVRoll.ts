module egret3d {
    export class Class_UVRoll extends Class_View3D {

        protected view1: View3D;
        protected ctl; HoverController;
        protected plane: Mesh;
        protected matPlane: TextureMaterial;
        constructor() {
            super();

            var view1: View3D = new View3D(0, 0, window.innerWidth, window.innerHeight);
            view1.camera3D.lookAt(new Vector3D(0, 100, -100), new Vector3D(0, 0, 0));
            view1.backColor = 0xff000000;
            this._egret3DCanvas.addView3D(view1);
            this.view1 = view1;
            this.ctl = new HoverController(view1.camera3D);
            this.ctl.tiltAngle = 60;
            this.ctl.distance = 1000;

            var bgImg: HTMLImageElement = <HTMLImageElement>document.getElementById("bg");
            var tex: ImageTexture = new ImageTexture(bgImg);
            this.view1.backImage = tex;

            this._egret3DCanvas.start();
            this._egret3DCanvas.addEventListener(Event3D.ENTER_FRAME, this.update, this);

            this.matPlane = new TextureMaterial();
        
            this.matPlane.repeat = true;
            this.matPlane.blendMode = BlendMode.ADD; 
            this.plane = new Mesh(new PlaneGeometry(1000,1000,100,100,1,1), this.matPlane);
            this.view1.addChild3D(this.plane);

            var uvRollMethod: UVRollMethod = new UVRollMethod();
            this.matPlane.diffusePass.addMethod(uvRollMethod);
            uvRollMethod.start(true);

            var loadDiffuse: URLLoader = new URLLoader("resource/effect/Lava_05.png");
            loadDiffuse.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onLoadDiffuse, this);

        }

        protected onLoadDiffuse(e:LoaderEvent3D) {
            this.matPlane.diffuseTexture = e.loader.data;
        }


        public update(e: Event3D) {
            this.ctl.update();
        }
    }
}