module egret3d {
    export class Class_Sponza extends Class_View3D {

        private view1: View3D;
        private cameraCtl: LookAtController;

        private mapLoader: MapLoader;
        constructor() {
            super();


            var view1: View3D = new View3D(0, 0, window.innerWidth, window.innerHeight, null);
            view1.camera3D.lookAt(new Vector3D(0, 1000, 0), new Vector3D(0, 0, 0));
            view1.backColor = 0xffcccccc;

            this._egret3DCanvas.addView3D(view1);
            this.view1 = view1;

            var bgImg: HTMLImageElement = <HTMLImageElement>document.getElementById("bg");
            var tex: ImageTexture = new ImageTexture(bgImg);
            //this.view1.backImage = tex;

            this.cameraCtl = new LookAtController(view1.camera3D, new Object3D());
            this.cameraCtl.distance = 1000;
            this.cameraCtl.rotationX = 60;

           
            this._egret3DCanvas.addEventListener(Event3D.ENTER_FRAME, this.update, this);


            this.mapLoader = new MapLoader("resource/Sponza/MapConfig.xml");
            this.mapLoader.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onMapLoader, this);
            this.view1.addChild3D(this.mapLoader.container);
        }

        protected onMapLoader(e: LoaderEvent3D) {

        }

        public update(e: Event3D) {
            this.cameraCtl.update();
        }
    }
}