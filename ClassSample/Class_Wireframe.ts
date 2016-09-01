module egret3d {
    export class Class_Wireframe extends Class_View3D {

        private view1: View3D;
        private cameraCtl: LookAtController;

        private mapLoader: MapLoader;
        constructor() {
            super();

            var view1: View3D = new View3D(0, 0, window.innerWidth, window.innerHeight);
            view1.camera3D.lookAt(new Vector3D(0, 1000, -1000), new Vector3D(0, 0, 0));
            view1.backColor = 0xff7f7f00;

            this._egret3DCanvas.addView3D(view1);
            this.view1 = view1;

            var bgImg: HTMLImageElement = <HTMLImageElement>document.getElementById("bg");
            var tex: ImageTexture = new ImageTexture(bgImg);
            //this.view1.backImage = tex;

            this.cameraCtl = new LookAtController(view1.camera3D, new Object3D());
            this.cameraCtl.distance = 1000;
            this.cameraCtl.rotationX = 60;

            var wir: egret3d.Wireframe = new egret3d.Wireframe();
            wir.material.diffuseColor = 0xffffff;
            wir.material.ambientColor = 0xffffff;
            this.view1.addChild3D(wir);

            var geom: egret3d.Geometry = wir.geometry;

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

            geom.setVerticesForIndex(0, egret3d.VertexFormat.VF_POSITION, vb, vb.length / 3);
            geom.setVertexIndices(0, ib);

            //var box: Mesh = new Mesh(new CubeGeometry(), new TextureMaterial());
            //this.view1.addChild3D(box);

            //var m: Mesh = new Mesh(new PlaneGeometry(), new TextureMaterial());
            //this.view1.addChild3D(m);
            this._egret3DCanvas.addEventListener(Event3D.ENTER_FRAME, this.update, this);

            //var load: URLLoader = new URLLoader("resource/modle/sunce/body_6.esm");
            //load.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onLoad, this);

            //var c: Mesh = new Mesh(new CylinderGeometry());
            //this.view1.addChild3D(c);

           // c = new Mesh(new PlaneGeometry());
           // this.view1.addChild3D(c);



           // c = new Mesh(new SphereGeometry());
           // this.view1.addChild3D(c);

           // c.y = 100;

           //c = new Mesh(new CubeGeometry());
           // this.view1.addChild3D(c);

           // c.z = 200;

            this.mapLoader = new MapLoader("resource/scene/scene(3)/MapConfig.json");
            this.view1.addChild3D(this.mapLoader.container);
            this.mapLoader.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onMaploader, this);
            //this._line[0] = this.buildSemicircleLien(egret3d.Vector3D.X_AXIS, 80, 25, 180, 180, 0xffff00);
            //this.view1.addChild3D(this._line[0]);
            //this._line[1] = this.buildSemicircleLien(egret3d.Vector3D.Y_AXIS, 80, 25, 180, 180, 0xffffffff);
            //this.view1.addChild3D(this._line[1]);
            //this._line[2] = this.buildSemicircleLien(egret3d.Vector3D.Z_AXIS, 80, 25, 180, 270, 0xffffffff);
            //this.view1.addChild3D(this._line[2]);
        }

        private onMaploader(e: LoaderEvent3D) {

        }

        private _line: Array<egret3d.Wireframe> = new Array<egret3d.Wireframe>();
    
        protected onLoad(e: LoaderEvent3D) {
            var m: Mesh = new Mesh(e.loader.data, new TextureMaterial());
            this.view1.addChild3D(m);
        }

        public update(e: Event3D) {
            this.cameraCtl.update();
        }
    }
}