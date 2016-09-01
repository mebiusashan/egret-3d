module egret3d {
    // 骨骼动画性能测试
    export class Class_CapabilityTest extends Class_View3D {

        private view1: View3D;

        private cameraCtl: LookAtController;

        private mesh: Mesh;
        private meshList: Array<Mesh> = [];

        private mapLoader: MapLoader;
        constructor() {
            super();

            var view1: View3D = new View3D(0, 0, window.innerWidth, window.innerHeight);
            view1.camera3D.lookAt(new Vector3D(0, 1000, -1000), new Vector3D(0, 0, 0));
            view1.backColor = 0xffffffff;

            this._egret3DCanvas.addView3D(view1);
            this.view1 = view1;

            var bgImg: HTMLImageElement = <HTMLImageElement>document.getElementById("bg");
            var tex: ImageTexture = new ImageTexture(bgImg);
            this.view1.backImage = tex;

            //var load: URLLoader = new URLLoader("resource/modle/sunce/body_6.esm");
            //load.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onEsm, this);


            this.cameraCtl = new LookAtController(view1.camera3D, new Object3D());
            this.cameraCtl.distance = 1000;
            this.cameraCtl.rotationX = 60;

            this._egret3DCanvas.addEventListener(Event3D.ENTER_FRAME, this.update, this);

            this.mapLoader = new MapLoader("resource/modle/MapConfig.xml");
            this.mapLoader.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onMaploader, this);
        }

        private onMaploader(e: LoaderEvent3D) {
            var meshs: Mesh[] = [];
            meshs[0] = <Mesh>this.mapLoader.container.findObject3D("chengyu");
            meshs[1] = <Mesh>this.mapLoader.container.findObject3D("sunce");

            var width: number = 200;
            var height: number = 300;

            for (var i: number = 0; i < 200 ; ++i) {

                var row: number = i / 10;
                var col: number = i % 10;

                var idx: number = 0;
                idx = Math.random() * meshs.length;
                idx = Math.floor(idx);

                var mesh: Mesh = meshs[idx].clone();
                this.meshList.push(mesh);
                this.view1.addChild3D(mesh);
                mesh.x = row * height - 10 * height / 2;
                mesh.z = col * width - 10 * width / 2;

                idx = Math.random() * mesh.animation.skeletonAnimationController.animStateNames.length;
                idx = Math.floor(idx);
                mesh.animation.play(mesh.animation.skeletonAnimationController.animStateNames[idx]);
            }
        }

        public update(e: Event3D) {
            this.cameraCtl.update();
        }
    }
}