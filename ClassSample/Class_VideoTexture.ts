module egret3d {
    export class Class_VideoTexture extends Class_View3D {

        private view1: View3D;
        private cameraCtl: LookAtController;

        constructor() {
            super();

            var view1: View3D = new View3D(0, 0, window.innerWidth, window.innerHeight);
            view1.camera3D.lookAt(new Vector3D(0, 1000, -1000), new Vector3D(0, 0, 0));
            view1.backColor = 0xff7f7f00;
            this._egret3DCanvas.addView3D(view1);
            this.view1 = view1;

            var bgImg: HTMLImageElement = <HTMLImageElement>document.getElementById("bg");
            var tex: ImageTexture = new ImageTexture(bgImg);
            this.view1.backImage = tex;

            this.cameraCtl = new LookAtController(view1.camera3D, new Object3D());
            this.cameraCtl.distance = 1000;
            this.cameraCtl.rotationX = 60;

            var vi: VideoTexture = new VideoTexture();
            vi.source = "resource/video/Comp.mp4";
            vi.play();

            var plane: Mesh = new Mesh(new PlaneGeometry(), new TextureMaterial(vi));
            this.view1.addChild3D(plane);
        }
      
        public update(e: Event3D) {
            this.cameraCtl.update();
        }
    }
}