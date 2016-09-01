module egret3d {
    export class Class_Scene extends Class_View3D {

        private cube: Mesh;
        private cube2: Mesh;
        private view1: View3D;
        private cameraCtl: LookAtController;

        constructor() {
            super();

            var view1: View3D = new View3D(0, 0, window.innerWidth, window.innerHeight);
            view1.camera3D.lookAt(new Vector3D(0, 1000, -1000), new Vector3D(0, 0, 0));
            view1.backColor = 0xff000000;

            this._egret3DCanvas.addView3D(view1);
            this.view1 = view1;

            this.cube = new Mesh(new CubeGeometry(10, 40, 10), null);
            this.view1.addChild3D(this.cube);

            this.cube2 = new Mesh(new CubeGeometry(10, 40, 10), null);
            this.view1.addChild3D(this.cube2);


            this._egret3DCanvas.addEventListener(Event3D.ENTER_FRAME, this.update, this);

            this.cameraCtl = new LookAtController(this.view1.camera3D, new Object3D());
            this.cameraCtl.distance = 1000;
        }


        private angle: number = 0;
        public update(e: Event3D) {
            this.cameraCtl.update();
            //this.obj.rotationY++;
            this.angle += 0.01;
            this.cube.x = Math.cos(this.angle) * 300;
            this.cube.z = Math.sin(this.angle) * 300;

            this.cube.rotationX = 0;
            this.cube.rotationY = 90;
            this.cube.rotationZ = this.angle * 100;

            this.cube2.orientation = this.cube.globalOrientation;
            //this.cube2.rotationY = this.cube.globalRotationY;
            //this.cube2.rotationX = this.cube.globalRotationX;
            //this.cube2.rotationZ = this.cube.globalRotationZ;

        }
    }
}