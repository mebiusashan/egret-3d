module egret3d {
    export class Class_ParticleParser extends Class_View3D {

        private _view3D: View3D;
        private _cameraCrl: LookAtController;

        private _particle: ParticleEmitter;
        private _cube: Mesh;
        private _xmlLoader: URLLoader;
        private _particleData: ParticleData;
        private _particleLoader: MapLoader;

        public static view: View3D;
        constructor() {
            super();
            this._egret3DCanvas.addEventListener(Event3D.ENTER_FRAME, this.update, this);

            var view1: View3D = new View3D(0, 0, 1920, 1080);
            this._view3D = view1;

            var scale: number = 100;

            view1.camera3D.lookAt(new Vector3D(0, -500, -500), new Vector3D(0, 0, 0));
            view1.camera3D.far = 1000 * scale;

            view1.backColor = 0xff000000;
            this._egret3DCanvas.addView3D(view1);

            this._cameraCrl = new LookAtController(this._view3D.camera3D, new Object3D());
            this._cameraCrl.distance = 100 * scale;
            this._cameraCrl.scaleSpeed(scale);

            this._particleLoader = new MapLoader("resource/scene/test/MapConfig.json");
            this._particleLoader.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onParticleLoad, this);
            this._view3D.addChild3D(this._particleLoader.container);

            //view1.addChild3D(new AxisMesh(10000));
            Class_ParticleParser.view = this._view3D;
            //var loader: URLLoader = new URLLoader("resource/scene/test/Texture/foam_tiled3.png");
            //loader.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onTex, this);

        }

        private onTex(e: LoaderEvent3D): void {
            for (var i: number = 0; i < 400; i++) {
                var hud: HUD = new HUD(Math.random() * 1000, Math.random() * 800, 100, 100);
                this._view3D.addHUD(hud);
                hud.diffuseTexture = e.loader.data;
            }
        }


        private onParticleLoad(e: LoaderEvent3D): void {
            this._particleLoader;
        }
        
        private angle: number = 0;
        public update(e: Event3D) {
            this._cameraCrl.update();
            //this.obj.rotationY++;
            if (this.angle > 300) {
                this.angle = 0;
                ParticleAnimation.Reset = true;
            } else {
                ParticleAnimation.Reset = false;
            }
            this.angle += 1;

        }

    }
}