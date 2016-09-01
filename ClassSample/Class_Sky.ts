module egret3d {
    export class Class_Sky extends Class_View3D {

        private plane: Mesh;
        protected view1: View3D;

        protected cameraCrl: LookAtController;
        constructor() {
            super();

            var view1: View3D = new View3D(0, 0, window.innerWidth, window.innerHeight);
            this.view1 = view1;

            view1.camera3D.lookAt(new Vector3D(0, 500, -500), new Vector3D(0, 0, 0));
            view1.backColor = 0xff000000;
            this._egret3DCanvas.addView3D(view1);

            this.cameraCrl = new LookAtController(this.view1.camera3D, new Object3D());
            this.cameraCrl.distance = 1000;

            var texLoad: URLLoader = new URLLoader("resource/chahu\\Plane001.esm");
            texLoad.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.ontextload, this);


            var cubeTexture: CubeTexture = CubeTexture.createCubeTexture(
                <HTMLImageElement>document.getElementById("f"),
                <HTMLImageElement>document.getElementById("b"),
                <HTMLImageElement>document.getElementById("l"),
                <HTMLImageElement>document.getElementById("r"),
                <HTMLImageElement>document.getElementById("u"),
                <HTMLImageElement>document.getElementById("d")
            );

            var sky: Sky = new Sky(new CubeGeometry(10000, 10000, 10000), new CubeTextureMaterial(cubeTexture), this.view1.camera3D);

            this.view1.addChild3D(sky);

            this._egret3DCanvas.start();
            this._egret3DCanvas.addEventListener(Event3D.ENTER_FRAME, this.update, this);
        }

        protected ontextload(e: LoaderEvent3D) {

            var mesh: Mesh = new Mesh(e.loader.data, new TextureMaterial());
            this.plane = mesh;
            this.view1.addChild3D(mesh);
        }


        public update(e: Event3D) {
            this.cameraCrl.update();
        }

    }
}