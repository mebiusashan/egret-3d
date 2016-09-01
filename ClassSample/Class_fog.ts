module egret3d {
    export class Class_fog  extends Class_View3D {

        protected view1: View3D;
        protected ctl; HoverController;
        protected plane: Mesh;
        protected lights: LightGroup = new LightGroup();
        protected matPlane: TextureMaterial;

        private terrainMethod: TerrainARGBMethod;
        constructor() {
            super();

            var view1: View3D = new View3D(0, 0, window.innerWidth, window.innerHeight);
            view1.camera3D.lookAt(new Vector3D(0, 100, -100), new Vector3D(0, 0, 0));
            view1.backColor = 0xff000000;
            this._egret3DCanvas.addView3D(view1);
            this.view1 = view1;
            this.ctl = new HoverController(view1.camera3D);
            this.ctl.tiltAngle = 60;
            this.ctl.distance = 1000;

            var bgImg: HTMLImageElement = <HTMLImageElement>document.getElementById("bg");
            var tex: ImageTexture = new ImageTexture(bgImg);
            this.view1.backImage = tex;

            this._egret3DCanvas.start();
            this._egret3DCanvas.addEventListener(Event3D.ENTER_FRAME, this.update, this);

            this.matPlane = new TextureMaterial();
            var fog: FogMethod = new FogMethod();
            fog.fogStartDistance = 1000.0;
            fog.globalDensity = 0.01;
            fog.fogHeight = -1000.0;
            fog.fogAlpha = 1.0;
           

            var mesh: Mesh = new Mesh(new CubeGeometry(), this.matPlane); 
            this.matPlane.diffusePass.addMethod(fog);
            this.view1.addChild3D(mesh);
            for (var i: number = 0; i < 100; i++) {
                var tmp: Mesh = mesh.clone();
                tmp.x = Math.random() * 1500 - 750;
                tmp.y = Math.random() * 1500 - 750;
                tmp.z = Math.random() * 1500 - 750;
                this.view1.addChild3D(tmp);
            }

           

        }

        public update(e: Event3D) {
            this.ctl.update();
        }
    }
}