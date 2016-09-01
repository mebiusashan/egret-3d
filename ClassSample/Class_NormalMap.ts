module egret3d {
    export class Class_NormalMap extends Class_View3D {

        protected view1: View3D;
        protected ctl; HoverController;
        protected plane: Mesh;
        protected matPlane: TextureMaterial;
        protected lights: LightGroup = new LightGroup();
        constructor() {
            super();

            var view1: View3D = new View3D(0, 0, window.innerWidth, window.innerHeight);
            view1.camera3D.lookAt(new Vector3D(0, 100, -100), new Vector3D(0, 0, 0));
            view1.backColor = 0xff000000;
            this._egret3DCanvas.addView3D(view1);
            this.view1 = view1;

            var bgImg: HTMLImageElement = <HTMLImageElement>document.getElementById("bg");
            var tex: ImageTexture = new ImageTexture(bgImg);
            this.view1.backImage = tex;

            this.ctl = new HoverController(view1.camera3D);
            this.ctl.tiltAngle = 60;
            this.ctl.distance = 1000;

            this._egret3DCanvas.start();
            this._egret3DCanvas.addEventListener(Event3D.ENTER_FRAME, this.update, this);

            var po: PointLight = new PointLight(0xffffff);
            po.y = 200;
            po.z = 200;
            this.lights.addLight(po);

            this.matPlane = new TextureMaterial();
            this.matPlane.lightGroup = this.lights;
            this.plane = new Mesh(new PlaneGeometry(), this.matPlane);
            this.view1.addChild3D(this.plane);

            var loadDiffuse: URLLoader = new URLLoader("resource/floor/WOOD_1.png");

            loadDiffuse.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onLoadDiffuse, this);

            var loadNormal: URLLoader = new URLLoader("resource/floor/wood_1N.png");
            loadNormal.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onLoadNormal, this);

        }

        protected onLoadDiffuse(e:LoaderEvent3D) {
            this.matPlane.diffuseTexture = e.loader.data;
        }

        protected onLoadNormal(e: LoaderEvent3D) {
            this.matPlane.normalTexture = e.loader.data;
        }

        public update(e: Event3D) {
            this.ctl.update();
        }
    }
}