module egret3d {
    export class Class_Terrain extends Class_View3D {

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
            this.matPlane.specularLevel = 0.5 ;
            this.matPlane.gloss = 1.0;
            this.matPlane.repeat = true;
            this.matPlane.uvRectangle = new Rectangle(0, 0, 1.0, 1.0);

            var dirLight: DirectLight = new DirectLight(new Vector3D(-0.7, 1.0, 0.0));
            
            var lightGroup: LightGroup = new LightGroup();
            lightGroup.addLight(dirLight);

            this.plane = new Mesh(new PlaneGeometry(500, 500), this.matPlane);
            this.plane.lightGroup = lightGroup; 

            this.view1.addChild3D(this.plane);

            this.terrainMethod = new TerrainARGBMethod(
                CheckerboardTexture.texture,
                CheckerboardTexture.texture,
                CheckerboardTexture.texture,
                CheckerboardTexture.texture,
                CheckerboardTexture.texture
            );

            this.matPlane.diffusePass.addMethod(this.terrainMethod);

            var loadBlend: URLLoader = new URLLoader("resource/terrain/blend_newjuqing_1_1_1.png");
            var loadSplat_0: URLLoader = new URLLoader("resource/terrain/Ptown_GroundStone_Set2_diff_trOut.png");
            var loadSplat_1: URLLoader = new URLLoader("resource/terrain/532.png");
            var loadSplat_2: URLLoader = new URLLoader("resource/terrain/331.png");
            var loadSplat_3: URLLoader = new URLLoader("resource/terrain/2.png");

            loadBlend.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onLoadBlend, this);
            loadSplat_0.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onLoadSplat_0, this);
            loadSplat_1.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onLoadSplat_1, this);
            loadSplat_2.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onLoadSplat_2, this);
            loadSplat_3.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onLoadSplat_3, this); 

        }

        protected onLoadBlend(e:LoaderEvent3D) {
            this.terrainMethod.controlTexture = e.loader.data;
        }

        protected onLoadSplat_0(e: LoaderEvent3D) {
            this.terrainMethod.splat_0_Texture = e.loader.data;
        }

        protected onLoadSplat_1(e: LoaderEvent3D) {
            this.terrainMethod.splat_1_Texture = e.loader.data;
        }

        protected onLoadSplat_2(e: LoaderEvent3D) {
            this.terrainMethod.splat_2_Texture = e.loader.data;
        }

        protected onLoadSplat_3(e: LoaderEvent3D) {
            this.terrainMethod.splat_3_Texture = e.loader.data;
        }


        private angle: number = 0;
        public update(e: Event3D) {
            this.ctl.update();
            this.angle+=0.01;
        }
    }
}