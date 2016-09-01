module egret3d {
    //3d 2d坐标之间相互转换
    export class Class_3DPosToScenePos extends Class_View3D {
        private cameraCtl: LookAtController;
        private cube: Mesh;
        private cube2: Mesh;
        private view: View3D;
        constructor() {
            super();

            var mat: ColorMaterial = new ColorMaterial(0xff0000);
            mat.alpha = 0.5;
            var geometery: CubeGeometry = new CubeGeometry();
            this.cube = new Mesh(geometery, mat);

            var mat2: ColorMaterial = new ColorMaterial(0x00ff00);
            mat2.alpha = 0.5;
            this.cube2 = new Mesh(geometery, mat2);

            this.view = new View3D(0, 0, window.innerWidth, window.innerHeight );
            this.view.camera3D.lookAt(new Vector3D(0, 0, -1000), new Vector3D(0, 0, 0));
            this.view.backColor = 0x464646;
            this._egret3DCanvas.addView3D(this.view);
            this.view.addChild3D(this.cube);
            this.view.addChild3D(this.cube2);

            var bgImg: HTMLImageElement = <HTMLImageElement>document.getElementById("bg");
            var tex: ImageTexture = new ImageTexture(bgImg);
            this.view.backImage = tex;

            this.cameraCtl = new LookAtController(this.view.camera3D, new Object3D());
            this.cameraCtl.distance = 1000;
            this.cameraCtl.rotationX = 60;

            this._egret3DCanvas.start();
            this._egret3DCanvas.addEventListener(Event3D.ENTER_FRAME, this.update, this);

        }

        private angle: number = 0;
        private tmpPos: Vector3D = new Vector3D();
        public update(e: Event3D) {
            this.cameraCtl.update();
            this.angle+=0.01;
            this.cube.x = Math.sin(this.angle % 360) * 100;
            this.cube.y = Math.cos(this.angle % 360) * 100;
            this.cube.z = Math.cos(this.angle % 360) * 100;

            this.tmpPos.x = this.cube.x;
            this.tmpPos.y = this.cube.y;
            this.tmpPos.z = this.cube.z;
            var scenePos: Vector3D = this.view.camera3D.object3DToScreenRay(this.tmpPos);

            this.tmpPos = this.view.camera3D.ScreenRayToObject3D( scenePos );

            console.log(this.cube.x, this.cube.y, this.cube.z, " -- ", this.tmpPos.x, this.tmpPos.y, this.tmpPos.z);

            this.cube2.x = this.tmpPos.x;
            this.cube2.y = this.tmpPos.y + 10 ;
            this.cube2.z = this.tmpPos.z;
        }

    }
}