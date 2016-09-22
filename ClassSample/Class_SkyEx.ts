module egret3d {
    export class Class_SkyEx extends Class_View3D {

        private plane: Mesh;
        protected view1: View3D;

        protected cameraCrl: LookAtController;

        protected loadList: URLLoader[] = [];
        constructor() {
            super();

            var view1: View3D = new View3D(0, 0, window.innerWidth, window.innerHeight);
            this.view1 = view1;

            view1.camera3D.lookAt(new Vector3D(0, 500, -500), new Vector3D(0, 0, 0));
            view1.backColor = 0xff000000;
            this._egret3DCanvas.addView3D(view1);

            this.cameraCrl = new LookAtController(this.view1.camera3D, new Object3D());
            this.cameraCrl.distance = 1000;

            this._egret3DCanvas.start();
            this._egret3DCanvas.addEventListener(Event3D.ENTER_FRAME, this.update, this);

            this.loadList[0] = new URLLoader("resource/SkyBox/cloudy_noon_FR.png");
            this.loadList[1] = new URLLoader("resource/SkyBox/cloudy_noon_BK.png");
            this.loadList[2] = new URLLoader("resource/SkyBox/cloudy_noon_LF.png");
            this.loadList[3] = new URLLoader("resource/SkyBox/cloudy_noon_RT.png");
            this.loadList[4] = new URLLoader("resource/SkyBox/cloudy_noon_UP.png");
            this.loadList[5] = new URLLoader("resource/SkyBox/cloudy_noon_DN.png");

            for (var i: number = 0; i < 6; ++i) {
                this.loadList[i].addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.ontextload, this);
            }
        }

        protected ontextload(e: LoaderEvent3D) {

            var isComplete: boolean = true;
            for (var i: number = 0; i < 6; ++i) {
                if (!this.loadList[i].data) {
                    isComplete = false;
                    break;
                }
            }

            if (isComplete) {
                var cubeTexture: CubeTexture = CubeTexture.createCubeTextureByImageTexture(
                    this.loadList[0].data,
                    this.loadList[1].data,
                    this.loadList[2].data,
                    this.loadList[3].data,
                    this.loadList[4].data,
                    this.loadList[5].data
                );

                var sky: Mesh = new Mesh(new SphereGeometry(5000, 20, 20), new CubeTextureMaterial(cubeTexture));
                sky.material.cullMode = ContextConfig.FRONT;
                this.view1.addChild3D(sky);
            }
        }

        public update(e: Event3D) {
            this.cameraCrl.update();
        }
    }
}