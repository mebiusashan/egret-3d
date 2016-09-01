module egret3d {
    // 地型高度图的使用
    export class Class_HeightMap  extends Class_View3D {

        protected view1: View3D;
        protected ctl; HoverController;
        protected plane: Mesh;
        protected lights: LightGroup = new LightGroup();
        protected matPlane: TextureMaterial;

        private terrainMethod: TerrainARGBMethod;
        constructor() {
            super();

            this.view1 = new View3D(0, 0, window.innerWidth, window.innerHeight);
            this.view1.camera3D.lookAt(new Vector3D(0, 100, -100), new Vector3D(0, 0, 0));
            this.view1.backColor = 0xff000000;
            this._egret3DCanvas.addView3D(this.view1);
            this.ctl = new HoverController(this.view1.camera3D);
            this.ctl.tiltAngle = 60;
            this.ctl.distance = 1000;

            var bgImg: HTMLImageElement = <HTMLImageElement>document.getElementById("bg");
            var tex: ImageTexture = new ImageTexture(bgImg);
            //this.view1.backImage = tex;

            this._egret3DCanvas.start();
            this._egret3DCanvas.addEventListener(Event3D.ENTER_FRAME, this.update, this);

            this.matPlane = new TextureMaterial();

            var loadtex: URLLoader = new URLLoader("resource/terrain/ziyan_xinshou/Heightmap_0.jpg");
            loadtex.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onLoadHeightMap, this);
            loadtex["mat"] = this.matPlane;
           

        }

        protected onLoadHeightMap(e: LoaderEvent3D) {
            var heightImage: ImageTexture = <ImageTexture>e.loader.data; 
            var envHeightGeometry: ElevationGeometry = new ElevationGeometry(heightImage, 2000, 500, 2000, 200, 200);
            var mat: TextureMaterial = new TextureMaterial(heightImage);
            var mesh: Mesh = new Mesh(envHeightGeometry, mat);
            //mat.drawMode = DrawMode.LINES;
            this.view1.addChild3D(mesh);
        }

        public update(e: Event3D) {
            this.ctl.update();
        }
    }
}