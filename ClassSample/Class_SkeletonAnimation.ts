module egret3d {
    // 按键播放 1. 2. 3. 4
    export class Class_SkeletonAnimation extends Class_View3D {

        private view1: View3D;
        private cameraCtl: LookAtController;
        private meshs: Mesh[] = [];
        private lights: LightGroup = new LightGroup();

        public constructor() {

            super();

            this.view1 = new View3D(0, 0, window.innerWidth, window.innerHeight);
            this.view1.camera3D.lookAt(new Vector3D(0, 1000, -1000), new Vector3D(0, 0, 0));
            this.view1.backColor = 0xff707070;
            this.view1.backImage = new ImageTexture(<HTMLImageElement>document.getElementById("bg"));
            this._egret3DCanvas.addView3D(this.view1);

            this.cameraCtl = new LookAtController(this.view1.camera3D, new Object3D());
            this.cameraCtl.distance = 150;
            this.cameraCtl.rotationX = 60;

            this._egret3DCanvas.addEventListener(Event3D.ENTER_FRAME, this.update, this);

            Input.addEventListener(KeyEvent3D.KEY_DOWN, this.onKeyDown_Test, this);

            //this.load3DModel("resource/anim/xiaoqiao/", "Object01.esm", ["Object01.eam"]);
            //this.load3DModel("resource/anim/xiaoqiao/", "Plane01.esm", ["Plane01.eam"]);
            //this.load3DModel("resource/anim/xiaoqiao/", "Plane02.esm", ["Plane02.eam"]);
            //this.load3DModel("resource/anim/xiaoqiao/", "Object03.esm");
            //this.load3DModel("resource/anim/xiaoqiao/", "Object07.esm", ["Object01.eam"]);
            //this.load3DModel("resource/anim/xiaoqiao/", "1531_poisdragon02.esm", ["1531_poisdragon02_New Animation.eam"]);
            //this.load3DModel("resource/anim/xiaoqiao/", "zhanshen.esm", ["zhanshen.eam"]);
            //this.load3DModel("resource/anim/xiaoqiao/", "zhanshen_weapon.esm", ["zhanshen_weapon.eam"]);
            //this.load3DModel("resource/anim/xiaoqiao/", "body_27.esm", ["idle_1.eam", "run_1.eam", "attack_1.eam", "attack_2.eam", "skill_1.eam", "skill_2.eam", "skill_3.eam", "skill_4.eam"]);
            this.load3DModel("resource/anim/ganning/", "Ganning.esm", ["Idle.eam", "Run.eam", "Attack1.eam", "Death.eam"]);

            var p: PointLight = new PointLight(0xffffff);
            p.y = 250;
            p.intensity = 1;
            p.radius = 300;
            p.cutoff = 0.01;
            this.lights.addLight(p);

            //var d: DirectLight = new DirectLight(new Vector3D(-0.5, -1.0, 0.0));
            //d.ambient = 0xffffff;
            //this.lights.addLight(d);


            var plane:Mesh = new Mesh(new PlaneGeometry(2000, 2000));
            //this.plane.lightGroup = this.lights;

            // 渲染阴影
            plane.material.castShadow = true;
            // 接受阴影 
            plane.material.acceptShadow = true;
            this.view1.addChild3D(plane);


            Input.addEventListener(MouseEvent3D.MOUSE_DOWN, this.onMouseDown, this);

        }
        private onMouseDown(e: MouseEvent3D) {
            var objects: IRender[] = [];

            var t0: number = Date.now();
            Picker.pickObject3DList(this._egret3DCanvas, this.view1, [this.meshs[0]], false, objects);
            var t1: number = Date.now();
            console.log(t1 - t0);
            for (var i: number = 0; i < objects.length; ++i) {
                objects[i].rotationY++;
            }
        }

        private onKeyDown_Test(e: KeyEvent3D): void {

            switch (e.keyCode) {
                case KeyCode.Key_1:
                case KeyCode.Key_2:
                case KeyCode.Key_3:
                case KeyCode.Key_4:
                case KeyCode.Key_5:
                case KeyCode.Key_6:
                case KeyCode.Key_7:
                case KeyCode.Key_8:
                case KeyCode.Key_9:

                    var index: number = e.keyCode - KeyCode.Key_1;

                    for (var i: number = 0; i < this.meshs.length; ++i) {
                        if (this.meshs[i].animation) {
                            //this.meshs[i].animation.skeletonAnimationController.isLoop = false;
                            this.meshs[i].animation.skeletonAnimationController.play(this.meshs[i].animation.animStateNames[Math.min(index, this.meshs[i].animation.animStateNames.length - 1)]);
                        }
                    }

                    //var plane01: Mesh = this.findMeshFromName("Plane01.esm");

                    //var plane02: Mesh = this.findMeshFromName("Plane02.esm");

                    //var Object03: Mesh = this.findMeshFromName("Object03.esm");

                    //var box: Mesh = new Mesh(new CubeGeometry(10, 10, 10), new ColorMaterial(0xff0000));
                    //this.view1.addChild3D(box);
                    //plane01.animation.skeletonAnimationController.bindToJointPose("Bone53", box);

                    //var box2: Mesh = new Mesh(new CubeGeometry(10, 10, 10), new ColorMaterial(0xff0000));
                    //this.view1.addChild3D(box2);
                    //plane02.animation.skeletonAnimationController.bindToJointPose("Bone76", box2);

                    break;
            }
        }

        public findMeshFromName(name: string): Mesh {
            for (var i: number = 0; i < this.meshs.length; ++i) {
                if (this.meshs[i].name == name) {
                    return this.meshs[i];
                }
            }

            return null;
        }

        public load3DModel(url: string, esm: string, eams: string[] = []): void {

            var urlLoad: URLLoader = new URLLoader(url + esm);

            urlLoad["url"] = url;

            urlLoad["eams"] = eams;

            urlLoad["fileName"] = esm;

            urlLoad.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onESMLoadComplete, this);
        }

        private onFrameChange(e: Event3D): void {
            //console.log("onFrameChange: " + e.data);
        }

        private onPlayComplete(e: Event3D): void {
            //console.log("onPlayComplete: " + e.data);
        }

        private onESMLoadComplete(e: LoaderEvent3D): void {

            var mesh: Mesh = new Mesh(e.loader.data, new TextureMaterial());

            mesh.animation.skeletonAnimationController.addEventListener(SkeletonAnimationEvent3D.EVENT_FRAME_CHANGE, this.onFrameChange, this);
            mesh.animation.skeletonAnimationController.addEventListener(SkeletonAnimationEvent3D.EVENT_PLAY_COMPLETE, this.onPlayComplete, this);

            mesh.enableCulling = false;

            mesh.name = e.loader["fileName"];

            //this.meshs.push(mesh);
            this.view1.addChild3D(mesh);
            this.meshs.push(mesh);
            mesh.pickType = PickType.PositionPick;

            mesh.material.ambientColor = 0xffffffff;
            mesh.material.castShadow = true;

            var url: string = e.loader["url"];

            var eams: string[] = e.loader["eams"];

            if (eams && eams.length > 0) {
                for (var i: number = 0; i < eams.length; i++) {

                    var urlLoad: URLLoader = new URLLoader(url + eams[i]);

                    urlLoad["eam"] = eams[i];

                    urlLoad["mesh"] = mesh;
                    urlLoad["eamLength"] = eams.length;

                    urlLoad.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onEAMLoadComplete, this);
                }
            }

            var textureURL: string = mesh.geometry.subGeometrys[0].textureDiffuse;

            var textureLoad: URLLoader = new URLLoader(url + textureURL);

            textureLoad.addEventListener(LoaderEvent3D.LOADER_COMPLETE, function fun(e: LoaderEvent3D) {
                mesh.material.diffuseTexture = e.loader.data;
            }, this);
        }

        private onEAMLoadComplete(e: LoaderEvent3D): void {

            var mesh: Mesh = e.loader["mesh"];

            var clip: SkeletonAnimationClip = <SkeletonAnimationClip>e.loader.data;

            clip.animationName = e.loader["eam"];

            mesh.animation.skeletonAnimationController.addSkeletonAnimationClip(clip);

            if (mesh.animation.animStateNames.length == e.loader["eamLength"]) {

                for (var x: number = 0; x < 10; x++) {

                    var cloneMesh:Mesh = mesh.clone();
                    cloneMesh.pickType = PickType.PositionPick;
                    cloneMesh.lightGroup = this.lights;

                    cloneMesh.x = -80 * 5 + x * 80;
                    this.view1.addChild3D(cloneMesh);
                    this.meshs.push(cloneMesh);
                }
            }

        }

        public update(e: Event3D) {
            this.cameraCtl.update();
        }
    }
}