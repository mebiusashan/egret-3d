module egret3d {
    export class Class_QuadTree extends Class_View3D {

        private view1: View3D;
        //private cameraCtl: LookAtController;
        private node: Object3D;
        constructor() {
            super();

            var view1: View3D = new View3D(0, 0, window.innerWidth, window.innerHeight);
            view1.camera3D.lookAt(new Vector3D(200, 0, -200), new Vector3D(0, 0, 0));
            view1.backColor = 0xff010101;

            this._egret3DCanvas.addView3D(view1);
            this.view1 = view1;
            this.node = new Object3D();
            this.view1.addChild3D(this.node);
            //this.cameraCtl = new LookAtController(view1.camera3D, new Object3D());
            //this.cameraCtl.distance = 1000;
            //this.cameraCtl.rotationX = 60;

            var bgImg: HTMLImageElement = <HTMLImageElement>document.getElementById("bg");
            var tex: ImageTexture = new ImageTexture(bgImg);
            this.view1.backImage = tex;

            this.node.rotationX = 40;
            this.node.rotationY = -50;
            this.node.position = new Vector3D(400, -100, 200);
           
            var geom: PlaneGeometry = new PlaneGeometry(40, 40);
            var position: Vector3D = new Vector3D();

            var plane: Mesh;
            var material: ColorMaterial = new ColorMaterial(0xf0f000);
            material.ambientColor = 0xffffff;
            material.bothside = true;
            for (var i: number = 0; i < 100; i++) {
                plane = new Mesh(geom, material);
                position.setTo((Math.random() - 0.5) * 2000, (Math.random() - 0.5) * 2000, (Math.random() - 0.5) * 2000);
                plane.position = position;
                plane.rotationX = Math.random() * 360;
                plane.rotationY = Math.random() * 360;
                this.node.addChild(plane);
            }


            this._egret3DCanvas.start();
            this._egret3DCanvas.addEventListener(Event3D.ENTER_FRAME, this.update, this);

            //this.view1.scene.createQuadTree();

        }

        public update(e: Event3D) {
            //this.cameraCtl.update();

            this.view1.camera3D.rotationX += 0.1;
            this.view1.camera3D.rotationY += 0.1;
        }
    }
}