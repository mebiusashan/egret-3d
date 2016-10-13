module egret3d {
    // 地型高度图的使用
    export class Class_HeightMap  extends Class_View3D {

        protected view1: View3D;
        protected ctl; LookAtController;
        protected plane: Mesh;
        protected lights: LightGroup = new LightGroup();
        protected matPlane: TextureMaterial;

        private terrainMethod: TerrainARGBMethod;


        protected textField: gui.UITextField;
        constructor() {
            super();



            this.view1 = new View3D(0, 0, window.innerWidth, window.innerHeight);
            this.view1.camera3D.lookAt(new Vector3D(0, 100, -100), new Vector3D(0, 0, 0));
            this.view1.backColor = 0xff000000;
            this._egret3DCanvas.addView3D(this.view1);
            this.ctl = new LookAtController(this.view1.camera3D, new Object3D());
            this.ctl.distance = 1000;
            this.view1.camera3D.far = 100000;

            var bgImg: HTMLImageElement = <HTMLImageElement>document.getElementById("bg");
            var tex: ImageTexture = new ImageTexture(bgImg);
            //this.view1.backImage = tex;

            this._egret3DCanvas.start();
            this._egret3DCanvas.addEventListener(Event3D.ENTER_FRAME, this.update, this);

            this.matPlane = new TextureMaterial();

            var loadtex: URLLoader = new URLLoader("resource/terrain/ziyan_xinshou/Heightmap_0.jpg");
            loadtex.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onLoadHeightMap, this);
            loadtex["mat"] = this.matPlane;

            Egret3DEngine.instance.debug = true;

            Input.addEventListener(KeyEvent3D.KEY_DOWN, this.onKeyDown, this);

            var gui: QuadStage = this.view1.getGUIStage();
            TextureResourceManager.getInstance().loadTexture("resource/ui/fonts.json", "resource/ui/fonts.png", gui);
            TextureResourceManager.getInstance().addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onLoadFonts, this);


        }
        protected onLoadFonts(e: LoaderEvent3D) {
            egret3d.gui.BitmapFont.load(TextureResourceManager.getInstance().getTextureDic());


            this.textField = new gui.UITextField();
            this.view1.addGUI(this.textField);
            this.textField.text = "23232323";
        }

        protected terrain: Terrain;
        protected onKeyDown(e: KeyEvent3D) {
            switch (e.keyCode) {
                case KeyCode.Key_1:
                    this.terrain.material.drawMode = DrawMode.LINES;
                    break;
                case KeyCode.Key_2:
                    this.terrain.material.drawMode = DrawMode.TRIANGLES;
                    break;
                case KeyCode.Key_3:
                    this.terrain.material.drawMode = DrawMode.POINTS;
                    break;
                case KeyCode.Key_4:
                    this.terrain.material.drawMode = DrawMode.LINE_STRIP;
                    break;
                case KeyCode.Key_5:
                    //this.terrain.wireframe.visible = !this.terrain.wireframe.visible;
                    break;
                //case KeyCode.Key_6:
                //    if (this.terrain.camera == this.camera) {
                //        this.terrain.camera = this.view1.camera3D;
                //    }
                //    else {
                //        this.terrain.camera = this.camera;
                //        this.camera.aspectRatio = this.view1.camera3D.aspectRatio;
                //        this.camera.fieldOfView = this.view1.camera3D.fieldOfView;
                //        this.camera.modelMatrix = this.view1.camera3D.modelMatrix;
                //    }
                //    break;
            }
        }

        protected onLoadHeightMap2(e: LoaderEvent3D) {
            e.loader["mat"].diffuseTexture = e.data;
        }

        protected onLoadHeightMap(e: LoaderEvent3D) {
            var heightImage: ImageTexture = <ImageTexture>e.loader.data; 
            var mat: TextureMaterial = new TextureMaterial();
            //var mesh: Mesh = new Mesh(envHeightGeometry, mat);
            
            var mesh: Terrain = new Terrain(heightImage, 10240, 1000, 10240, 128, 128, false, mat);
            this.view1.addChild3D(mesh);
            this.terrain = mesh;

            var loadmaptex: URLLoader = new URLLoader("resource/terrain/331.png");
            loadmaptex.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onLoadHeightMap2, this);
            loadmaptex["mat"] = mat;
        }

        public update(e: Event3D) {
            this.ctl.update();

            if (this.textField && this.terrain) {
                this.textField.text = "face:" + this.terrain.geometry.faceCount.toString();
            }
            //this.camera.rotationY++;
        }
    }
}