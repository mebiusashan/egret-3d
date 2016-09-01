module egret3d {
    //方向光使用
    export class Class_DirectLight extends Class_View3D {
        private cameraCtl: LookAtController;
        private cube: Mesh;
        constructor() {
            super();

            var mat: ColorMaterial = new ColorMaterial(0xffffff);
            var geometery: CubeGeometry = new CubeGeometry();
            this.cube = new Mesh(geometery, mat);

            var mat2: ColorMaterial = new ColorMaterial(0xffffff);
            var geometery2: CubeGeometry = new CubeGeometry();
            var cube2: Mesh = new Mesh(geometery, mat);

            var view1: View3D = new View3D(0, 0, window.innerWidth, window.innerHeight);
            view1.camera3D.lookAt(new Vector3D(0, 0, -1000), new Vector3D(0, 0, 0));
            view1.backColor = 0xff000000;
            this._egret3DCanvas.addView3D(view1);

            var bgImg: HTMLImageElement = <HTMLImageElement>document.getElementById("bg");
            var tex: ImageTexture = new ImageTexture(bgImg);
            view1.backImage = tex;

            this.cameraCtl = new LookAtController(view1.camera3D, new Object3D());
            this.cameraCtl.distance = 1000;
            this.cameraCtl.rotationX = 60;

            cube2.x = 80;
            view1.addChild3D(this.cube);
            view1.addChild3D(cube2);

            var lights: LightGroup = new LightGroup();

            var dirLight: DirectLight = new DirectLight(new Vector3D(-0.5, -0.6, 0.2));
            dirLight.diffuse = 0xffffff ;
            lights.addLight(dirLight);

            this.cube.material.lightGroup = lights;

            this._egret3DCanvas.start();
            this._egret3DCanvas.addEventListener(Event3D.ENTER_FRAME, this.update, this);
        }

        public update(e: Event3D) {
            this.cameraCtl.update();
            //this.cube.rotationY += 0.5;
        }

    }
}