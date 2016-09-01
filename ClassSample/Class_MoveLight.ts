module egret3d {
    //移动灯光
    export class Class_MoveLight extends Class_View3D {

        protected view1: View3D;
        protected ctl; HoverController;
        protected plane: Mesh;
        protected matPlane: TextureMaterial;
        protected lights: LightGroup = new LightGroup();
        private _p1: PointLight;
        private _p2: PointLight;
        private _p3: PointLight;
        private _p4: PointLight;
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
            //view1.render = new MultiRender(PassType.matCapPass);

            var bgImg: HTMLImageElement = <HTMLImageElement>document.getElementById("bg");
            var tex: ImageTexture = new ImageTexture(bgImg);
            view1.backImage = tex;

            this._egret3DCanvas.start();
            this._egret3DCanvas.addEventListener(Event3D.ENTER_FRAME, this.update, this);

            this._p1 = new PointLight(0xff0000);
            this._p2 = new PointLight(0x00ff00);
            this._p3 = new PointLight(0x0000ff);
            this._p4 = new PointLight(0xffcc00);

            this._p1.x = 2000 * Math.random() - 1000;
            this._p1.y = 250;
            this._p1.z = 2000 * Math.random() - 1000;

            this._p2.x = 2000 * Math.random() - 1000;
            this._p2.y = 250;
            this._p2.z = 2000 * Math.random() - 1000;

            this._p3.x = 2000 * Math.random() - 1000;
            this._p3.y = 250;
            this._p3.z = 2000 * Math.random() - 1000;

            this._p4.x = 2000 * Math.random() - 1000;
            this._p4.y = 250 ;
            this._p4.z = 2000 * Math.random() - 1000;

            this._p1.radius = 300;
            this._p2.radius = 300;
            this._p3.radius = 300;
            this._p4.radius = 300;
            this._p1.cutoff = 0.01;
            this._p3.cutoff = 0.01;
            this._p2.cutoff = 0.01;
            this._p4.cutoff = 0.01;

            this.lights.addLight(this._p1);
            this.lights.addLight(this._p3);
            this.lights.addLight(this._p2);
            this.lights.addLight(this._p4);

            var d: DirectLight = new DirectLight(new Vector3D(-0.5, -1.0, 0.0));
            d.ambient = 0xffffff;
            //this.lights.addLight(d);

            this.matPlane = new TextureMaterial();
            this.matPlane.lightGroup = this.lights;
            this.matPlane.ambientColor = 0; 
            this.matPlane.specularLevel = 1.0 ;
            this.matPlane.gloss = 100.0;

            this.matPlane.repeat = true;
            this.matPlane.uvRectangle = new Rectangle(0, 0, 1.0, 1.0);

            this.plane = new Mesh(new PlaneGeometry(10000, 10000), this.matPlane);
            this.view1.addChild3D(this.plane);
            this.plane.lightGroup = this.lights;

            var mesh: Mesh = new Mesh( new CubeGeometry(100,100,100) , new TextureMaterial( CheckerboardTexture.texture ) );
            for (var i: number = 0; i < 20; i++){
                var temp: Mesh = mesh.clone(); 

                temp.x = 2000 * Math.random() - 1000; 
                temp.y = 50 ; 
                temp.z = 2000 * Math.random() - 1000 ; 

                temp.lightGroup = this.lights;
                this.view1.addChild3D(temp);
            }


            //var loadtex: URLLoader = new URLLoader("resource/normal/Metal_SciFiFuelCrate_1k_d.png");
            var loadtex: URLLoader = new URLLoader("resource/gray.png");
            loadtex.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onLoadDiffuse, this);
            loadtex["mat"] = this.matPlane;

            //var loadtex: URLLoader = new URLLoader("resource/normal/Metal_SciFiFuelCrate_1k_n.png");
            //loadtex.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onLoadNormal, this);
            //loadtex["mat"] = this.matPlane;

            //var loadtex: URLLoader = new URLLoader("resource/normal/Metal_SciFiFuelCrate_1k_g.png");
            //loadtex.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onLoadSpecular, this);
            //loadtex["mat"] = this.matPlane;

            //this.matPlane.addPass(PassType.matCapPass);

        }

        protected onLoadDiffuse(e:LoaderEvent3D) {
            e.loader["mat"].diffuseTexture = e.loader.data;
        }

        protected onLoadNormal(e: LoaderEvent3D) {
            e.loader["mat"].normalTexture = e.loader.data;
            //mat.normalTexture.useMipmap = false;
            //mat.normalTexture.smooth = false;
        }

        protected onLoadSpecular(e: LoaderEvent3D) {
            e.loader["mat"].specularTexture = e.loader.data;

       
            //mat.normalTexture.useMipmap = false;
            //mat.normalTexture.smooth = false;
        }

        private angle: number = 0;
        public update(e: Event3D) {
            this.ctl.update();
            this.angle += 0.01;

            this._p1.x = Math.sin(this.angle) * 1200;
            this._p1.z = Math.cos(this.angle) * 1200;

            this._p2.x = Math.sin(this.angle) * 1000;
            this._p2.z = Math.cos(this.angle) * 1000;

            this._p3.x = Math.sin(this.angle) * 800;
            this._p3.z = Math.cos(this.angle) * 800;

            this._p4.x = Math.sin(this.angle) * 600;
            this._p4.z = Math.cos(this.angle) * 600;

            this._p1.radius = Math.cos(this.angle) * 300;
            this._p2.radius = Math.sin(this.angle) * 500;
            this._p3.radius = Math.cos(this.angle) * 700;

            //this.plane.rotationY += 0.05;
            //this.plane.x = Math.sin(this.angle) * 250;
        }
    }
}