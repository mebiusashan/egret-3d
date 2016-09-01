module egret3d {
    export class Class_Points extends Class_View3D {

        private view1: View3D;
        private cameraCtl: LookAtController;
        public geo: Geometry;
        constructor() {
            super();

            var view1: View3D = new View3D(0, 0, window.innerWidth, window.innerHeight);
            view1.camera3D.lookAt(new Vector3D(0, 1000, -1000), new Vector3D(0, 0, 0));
            view1.backColor = 0xff7f7f00;

            this._egret3DCanvas.addView3D(view1);
            this.view1 = view1;

            this.cameraCtl = new LookAtController(view1.camera3D, new Object3D());
            this.cameraCtl.distance = 1000;
            this.cameraCtl.rotationX = 60;

            var geo: Geometry = GeometryUtil.createGeometry();
            var mesh: egret3d.Mesh = new egret3d.Mesh(geo, new TextureMaterial());
            mesh.material.drawMode = DrawMode.POINTS;
            mesh.material.pointSize = 40;

            mesh.material.diffuseColor = 0xffffff;
            mesh.material.ambientColor = 0xffffff;
            this.view1.addChild3D(mesh);

            var width: number = 200;
            var height: number = 200;

            var row: number = 10;
            var col: number = 10;

            var point_row: number = row + 1;
            var point_col: number = col + 1;

            var vb: Array<number> = new Array<number>();
            var ib: Array<number> = new Array<number>();

            for (var i: number = 0; i < point_row; ++i) {
                vb.push(-width * col / 2, 0, height * i - height * row / 2);
                vb.push(width * col / 2, 0, height * i - height * row / 2);
            }

            for (var i: number = 0; i < point_col; ++i) {
                vb.push(width * i - width * col / 2, 0, height * col / 2);
                vb.push(width * i - width * col / 2, 0, -height * col / 2);
            }

            for (var i: number = 0; i < vb.length / 3; ++i) {
                ib.push(i);
            }

            geo.setVerticesForIndex(0, egret3d.VertexFormat.VF_POSITION, vb, vb.length / 3);
            geo.setVertexIndices(0, ib);

            this.geo = geo;

            this._egret3DCanvas.addEventListener(Event3D.ENTER_FRAME, this.update, this);
        }

        public isadd: boolean = false;
        public update(e: Event3D) {
            this.cameraCtl.update();

            var target: Array<number> = new Array<number>();
            for (var i: number = 0; i < this.geo.vertexCount; ++i) {

                target.length = 0;
                this.geo.getVertexForIndex(i, egret3d.VertexFormat.VF_POSITION, target);

                if (target[1] >= 100) {
                    this.isadd = false;
                }
                if (target[1] <= -100) {
                    this.isadd = true;
                }

                if (this.isadd) {
                    target[1]++;
                }
                else {
                    target[1]--;
                }


                this.geo.setVerticesForIndex(i, egret3d.VertexFormat.VF_POSITION, target);
            }
            this.geo.upload(Egret3DCanvas.context3DProxy);
        }
 
    }
}