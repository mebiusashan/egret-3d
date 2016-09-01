module egret3d {
    //静态模型使用多材质 和 材质球特殊光效贴图
    export class Class_Matcap extends Class_View3D {

        private laohu: Mesh;
        private view1: View3D;
        private lights: LightGroup = new LightGroup();

        private cameraCtl: LookAtController;

        constructor() {
            super();

            var view1: View3D = new View3D(0, 0, window.innerWidth, window.innerHeight);
            view1.camera3D.lookAt(new Vector3D(0, 1000, -1000), new Vector3D(0, 0, 0));
            view1.backColor = 0xffffffff;

            // view1.render = new MultiRender(PassType.matCapPass);
            //view1.render.renderToTexture(256, 256, FrameBufferFormat.UNSIGNED_BYTE_RGB);

            var bgImg: HTMLImageElement = <HTMLImageElement>document.getElementById("bg");
            var tex: ImageTexture = new ImageTexture(bgImg);
            view1.backImage = tex;

            this._egret3DCanvas.addView3D(view1);
            this.view1 = view1;

            var load: URLLoader = new URLLoader("resource/basier/3191b290.obj.esm");
            load.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onLoad, this);


            var dirLight: DirectLight = new DirectLight(new Vector3D(-0.0, 0.6, 0.2));
            dirLight.diffuse = 0xffffff;
            this.lights.addLight(dirLight);

            //var po: PointLight = new PointLight(0xffffff);
            //po.y = 200;
            //po.z = 200;
            //this.lights.addLight(po);

            //var spo: SpotLight = new SpotLight(0xffffff);
            //spo.rotationX = 90;
            //spo.y = 200;
            //this.lights.addLight(spo);

            this.cameraCtl = new LookAtController(view1.camera3D, new Object3D());
            this.cameraCtl.distance = 1000;
            this.cameraCtl.rotationX = 60;


            this._egret3DCanvas.addEventListener(Event3D.ENTER_FRAME, this.update, this);
        }

        protected mat: TextureMaterial;
        protected onLoad(e: LoaderEvent3D) {

            var ge: Geometry = e.loader.data;
            var mesh: Mesh = new Mesh(ge, new TextureMaterial());

            this.view1.addChild3D(mesh);
            this.laohu = mesh;

           for (var i: number = 0; i < mesh.geometry.subGeometrys.length; ++i) {
                var sub: SubGeometry = ge.subGeometrys[i];
                var mat = <TextureMaterial>mesh.getMaterial(i);
                if (!mat) {
                    mat = new TextureMaterial();
                    mesh.addSubMaterial(i, mat);
                }

                var loadtex: URLLoader = new URLLoader("resource/gray.png");
                //var loadtex: URLLoader = new URLLoader("resource/basier/" + sub.textureDiffuse);
                loadtex.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onLoadTexture, this);
                loadtex["mat"] = mat;
                mat.ambientColor = 0xffffff;

                var loadtex: URLLoader = new URLLoader("resource/basier/" + sub.textureNormal);
                loadtex.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onLoadNormalTexture, this);
                loadtex["mat"] = mat;

                var loadtex: URLLoader = new URLLoader("resource/matcap/red.jpg");  
                loadtex.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onLoadMatCapTexture, this);
                loadtex["mat"] = mat;
            }
        }

        protected onLoadTexture(e: LoaderEvent3D) {
            e.loader["mat"].diffuseTexture = e.loader.data;
        }

        protected onLoadNormalTexture(e: LoaderEvent3D) {
            e.loader["mat"].normalTexture = e.loader.data;
        }

        protected onLoadMatCapTexture(e: LoaderEvent3D) {
            e.loader["mat"].matcapTexture = e.loader.data;
        }

        public update(e: Event3D) {
            this.cameraCtl.update();
        }
    }
}