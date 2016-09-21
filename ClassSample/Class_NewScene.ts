module egret3d {
    /**
    * 按回车播放动画 按1键切换摄像机
    */
    export class Class_NewScene extends Class_View3D {

        private view1: View3D;
        private cameraCtl: LookAtController;
        private node: Object3D;
        private mapLoader: MapLoader;





        constructor() {
            super();

            var view1: View3D = new View3D(0, 0, window.innerWidth, window.innerHeight);
            view1.camera3D.lookAt(new Vector3D(0, 1000, 0), new Vector3D(0, 0, 0));
            view1.camera3D.far = 1000000;

            this._egret3DCanvas.addView3D(view1);
            this.view1 = view1;


            this.cameraCtl = new LookAtController(view1.camera3D, new Object3D());
            this.cameraCtl.distance = 1000;
            this.cameraCtl.lookAtObject.x = 0;
            this.cameraCtl.lookAtObject.z = 0;
            this.cameraCtl.rotationX = 60;

            this._egret3DCanvas.addEventListener(Event3D.ENTER_FRAME, this.update, this);

            this.mapLoader = new MapLoader("resource/scene/main/MapConfig.json");
            this.mapLoader.autoPlayAnimation = true;  
            this.mapLoader.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.OnMapLoad, this);

           
            

            this.view1.addChild3D(this.mapLoader.container);
            this.node = this.mapLoader.container;

        }

        private OnMapLoad(e: LoaderEvent3D) {

            //this.OnLoadCameraAni();

            //var camrea: Camera3D = <Camera3D>this.node.findObject3D("Camera");
            //camrea.proAnimation.play();

            //var cameraControl: Object3D = <Object3D>this.node.findObject3D("Object3D");

            //this.view1.camera3D = camrea;



            //var lights: LightGroup = new LightGroup();
            //var po: PointLight = new PointLight(0xff0000);
            //po.x = 0;
            //po.y = 167;
            //po.z = 0;
            //po.intensity = 8;
            //po.radius = 397;
            //lights.addLight(po);


            var cube: Mesh = new Mesh(new CubeGeometry(), new TextureMaterial());
         
            //cube.lightGroup = lights;
            //this.view1.addChild3D(cube);
            //var mesh: Mesh = <Mesh>this.node.findObject3D("Plane");
            //mesh.material.lightGroup = lights
            //mesh.lightGroup = lights;  



            //var camrea: Camera3D = <Camera3D>this.node.findObject3D("Camera");
            //camrea.far = 1000000;
            //camrea.aspectRatio = this.view1.width / this.view1.height;
            //camrea.updateViewport(this.view1.x, this.view1.y, this.view1.width, this.view1.height);
            //this.view1.camera3D = camrea;

            //var mesh_0: Mesh = <Mesh>this.node.findObject3D("zhanshen_weapon");
            //mesh_0.animation.play("zhanshen_weapon_Take 001.eam");

            //var mesh_1: Mesh = <Mesh>this.node.findObject3D("zhanshen");
            //mesh_1.animation.play("zhanshen_Take 001.eam");

            //var movePos_0: Object3D = <Object3D>this.node.findObject3D("zhanshen_MovePos");
            //movePos_0.proAnimation.play();


            //var mesh_2: Mesh = <Mesh>this.node.findObject3D("boss02");
            //mesh_2.animation.play("boss02_Take 001.eam");

            //var movePos_1: Object3D = <Object3D>this.node.findObject3D("boss02_MovePos");
            //movePos_1.proAnimation.play();



            //var mesh_3: Mesh = <Mesh>this.node.findObject3D("boss01_weapon");
            //mesh_3.animation.play("boss01_weapon_Take 001.eam");

            //var mesh_4: Mesh = <Mesh>this.node.findObject3D("boss01");
            //mesh_4.animation.play("boss01_Take 001.eam");

            //var movePos_1: Object3D = <Object3D>this.node.findObject3D("boss01_MovePos");
            //movePos_1.proAnimation.play();

        }
    

        public update(e: Event3D) {
            this.cameraCtl.update();
        }
    }


}