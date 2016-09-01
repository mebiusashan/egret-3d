module egret3d {
    export class Class_PointLight extends Class_View3D {

        private plane: Mesh;
        protected view1: View3D;

        private lights: LightGroup = new LightGroup();
        private cameraCtl: LookAtController;

        constructor() {
            super();

            var view1: View3D = new View3D(0, 0, window.innerWidth, window.innerHeight);
            view1.camera3D.lookAt(new Vector3D(0, 500, -500), new Vector3D(0, 0, 0));
            view1.backColor = 0xff000000;
            this._egret3DCanvas.addView3D(view1);

            var bgImg: HTMLImageElement = <HTMLImageElement>document.getElementById("bg");
            var tex: ImageTexture = new ImageTexture(bgImg);
            view1.backImage = tex;

            this.view1 = view1;
            var texLoad: URLLoader = new URLLoader("resource/chahu/Plane001.esm");
            texLoad.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.ontextload, this);

            this.cameraCtl = new LookAtController(view1.camera3D, new Object3D());
            this.cameraCtl.distance = 1000;
            this.cameraCtl.rotationX = 60;

            var po: PointLight = new PointLight(0xffffff);
            po.y = 50;
            po.z = 200;
            po.intensity = 2.0;
            this.lights.addLight(po);

            var pointMesh: Mesh = new Mesh(new SphereGeometry(15, 25, 25), new ColorMaterial());
            pointMesh.y = 50;
            pointMesh.z = 200;
            pointMesh.material.ambientColor = 0xcccccc ;
            this.view1.addChild3D(pointMesh);

            this._egret3DCanvas.start();
            this._egret3DCanvas.addEventListener(Event3D.ENTER_FRAME, this.update, this);
        }

        protected ontextload(e: LoaderEvent3D) {

            var mat: TextureMaterial = new TextureMaterial();
            mat.lightGroup = this.lights; 
            mat.ambientColor = 0;
            var mesh: Mesh = new Mesh(e.loader.data, mat);
            mesh.scale = new Vector3D(5.0,5.0,5.0);
            this.plane = mesh;
            this.view1.addChild3D(mesh);
        }


        public update(e: Event3D) {
            this.cameraCtl.update();
        }

    }
}