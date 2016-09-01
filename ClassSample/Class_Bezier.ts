module egret3d {
    // 贝塞尔曲线
    export class Class_Bezier extends Class_View3D {

        private view1: View3D;
        private cameraCtl: LookAtController;
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
            var target: Object3D = new Object3D();
            target.position = new Vector3D(0, 15, 0);
            this.cameraCtl = new LookAtController(this.view1.camera3D, target);
            this.cameraCtl.distance = 500;
            this.cameraCtl.update();

            var bgImg: HTMLImageElement = <HTMLImageElement>document.getElementById("bg");
            var tex: ImageTexture = new ImageTexture(bgImg);
            this.view1.backImage = tex;


           
            var geom: CubeGeometry = new CubeGeometry(2, 2, 10);
            var position: Vector3D = new Vector3D();

            var plane: Mesh;
            var material: ColorMaterial = new ColorMaterial(0xfffff0);
            material.ambientColor = 0xffffff;
            material.bothside = true;

            var bezier: BezierData = new BezierData();
            //bezier.posPoints.push(new Point(0, 0));
            //bezier.posPoints.push(new Point(1.0, 0));
            //bezier.ctrlPoints.push(new Point(0.3, 0.7));
            //bezier.ctrlPoints.push(new Point(0.7, -0.7));

            bezier.posPoints.push(new Point(0.0, 0));
            bezier.posPoints.push(new Point(0.5, 60));
            bezier.posPoints.push(new Point(0.5, 60));
            bezier.posPoints.push(new Point(1.0, -40));
            bezier.ctrlPoints.push(new Point(0.1, 20));
            bezier.ctrlPoints.push(new Point(0.3, 60));
            bezier.ctrlPoints.push(new Point(0.7, 60));
            bezier.ctrlPoints.push(new Point(0.9, -40));

            var curveValue: number;
            for (var i: number = 0; i < 500; i++) {
                plane = new Mesh(geom, material);
                curveValue = bezier.calc(i / 500);
                position.setTo(i / 5, curveValue, 0);
                plane.position = position;
                this.node.addChild(plane);
            }


            this._egret3DCanvas.start();
            this._egret3DCanvas.addEventListener(Event3D.ENTER_FRAME, this.update, this);

            this.node.addChild(new AxisMesh(200));

        }

        public update(e: Event3D) {
            this.cameraCtl.update();

           
        }
    }
}