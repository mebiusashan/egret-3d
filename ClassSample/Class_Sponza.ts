module egret3d {

    export class Class_Sponza extends Class_View3D {

        public static RootPath: string = "resource/scene/sponza_Demo/";


        private view1: View3D;
        private cameraCtl: LookAtController;
        private node: Object3D;
        private mapLoader: MapLoader;
        private loadingUi: LoadingUi;

        public cameraAnimation: CameraAnimationManager;

        constructor() {
            super();

            var view1: View3D = new View3D(0, 0, window.innerWidth, window.innerHeight);
            view1.camera3D.lookAt(new Vector3D(0, 1000, 0), new Vector3D(0, 0, 0));
            view1.camera3D.far = 1000000;
            view1.backColor = 0xffffffff;

            this._egret3DCanvas.addView3D(view1);
            this.view1 = view1;


            this.loadingUi = new LoadingUi(this.view1);
            this.loadingUi.OnInit(this.OnResourceLoad, this);

            this.cameraCtl = new LookAtController(view1.camera3D, new Object3D());
            this.cameraCtl.distance = 1000;
            this.cameraCtl.lookAtObject.x = 0;
            this.cameraCtl.lookAtObject.z = 0;
            this.cameraCtl.rotationX = 60;

            egret3d.Egret3DEngine.instance.debug = true;

            this.mapLoader = new MapLoader();
            this.mapLoader.view3d = this.view1;

            this._egret3DCanvas.addEventListener(Event3D.ENTER_FRAME, this.update, this);
        }


        public OnResourceLoad() {
            this.mapLoader.load(Class_Sponza.RootPath + "MapConfig.json");
            this.mapLoader.autoPlayAnimation = true;
            this.mapLoader.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.OnMapLoad, this);
            this.view1.addChild3D(this.mapLoader.container);
            this.node = this.mapLoader.container;
        }

        private OnMapLoad(e: LoaderEvent3D) {
            //this.view1.scene.createQuadTree();
            this.OnLoadCameraAni();


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


            //var cube: Mesh = new Mesh(new CubeGeometry(), new TextureMaterial());
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

        private OnLoadCameraAni() {
            //var loader: URLLoader = new URLLoader(this.pathRoot + "ProAnim/Camera_CameraAni_02.epa");
            //loader.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onComplete, this);
            this.cameraAnimation = new CameraAnimationManager(this.node);
            this.cameraAnimation.OnManagerLoad(this.OnCompleteCameraAni, this);
        }

        private OnCompleteCameraAni() {

            //this.camera_CameraAni_02 = e.data;
            this.OnLoadFlagAni();
            //camrea.bindAnimation(this.camera_CameraAni_02);
            //camrea.proAnimation.play();
        }

        private OnLoadFlagAni() {
            var flagLoader: RoleLoader = new RoleLoader();
            flagLoader.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.OnCompleteFlagAni, this);
            flagLoader.load(Class_Sponza.RootPath + "SkinnedModel/0_sponzaflag/MapConfig.json");

        }

        private OnCompleteFlagAni(e: LoaderEvent3D) {

            var flag = e.target.role;
            this.view1.addChild3D(flag);
            flag.skeletonAnimation.play();
            this.loadingUi.OnFinished(this.WaitForUi, this);
        }

        private WaitForUi() {
            var camrea: Camera3D = <Camera3D>this.node.findObject3D("Camera");
            this.view1.camera3D = camrea;
            this.cameraAnimation.OnPlay();
        }

        public update(e: Event3D) {
            if (this.loadingUi != null) {
                this.loadingUi.OnUpdate();
            }
            this.cameraCtl.update();
        }
    }

    export class CameraAnimationManager {

        private loadIndex: number = 0;

        private playIndex: number = 0;

        private animationDatas: Array<CameraAnimationData> = new Array<CameraAnimationData>();

        private camrea: Camera3D;
        private cameraControl: Object3D;


        private onFinished: Function;
        private context: any;

        constructor(node: Object3D) {

            this.camrea = <Camera3D>node.findObject3D("Camera");
            this.cameraControl = <Camera3D>node.findObject3D("CameraControl");

            var objs: Array<Object3D> = new Array<Object3D>();
            objs.push(this.camrea);
            objs.push(this.cameraControl);

            var urls_0: Array<string> = new Array<string>();
            urls_0.push("ProAnim/Camera_CameraAni_01.epa");
            urls_0.push("ProAnim/CameraControl_CameraAni_01.epa");
            var ani_0: CameraAnimationData = new CameraAnimationData(urls_0, objs, 0);
            this.animationDatas.push(ani_0);

            var urls_1: Array<string> = new Array<string>();
            urls_1.push("ProAnim/Camera_CameraAni_02.epa");
            urls_1.push("ProAnim/CameraControl_CameraAni_02.epa");
            var ani_1: CameraAnimationData = new CameraAnimationData(urls_1, objs, 1);
            this.animationDatas.push(ani_1);

            var urls_2: Array<string> = new Array<string>();
            urls_2.push("ProAnim/Camera_CameraAni_03.epa");
            urls_2.push("ProAnim/CameraControl_CameraAni_03.epa");
            var ani_2: CameraAnimationData = new CameraAnimationData(urls_2, objs, 2);
            this.animationDatas.push(ani_2);

            var urls_3: Array<string> = new Array<string>();
            urls_3.push("ProAnim/Camera_CameraAni_04.epa");
            urls_3.push("ProAnim/CameraControl_CameraAni_04.epa");
            var ani_3: CameraAnimationData = new CameraAnimationData(urls_3, objs, 3);
            this.animationDatas.push(ani_3);

            var urls_4: Array<string> = new Array<string>();
            urls_4.push("ProAnim/Camera_CameraAni_05.epa");
            urls_4.push("ProAnim/CameraControl_CameraAni_05.epa");
            var ani_4: CameraAnimationData = new CameraAnimationData(urls_4, objs, 4);
            this.animationDatas.push(ani_4);

        }

        public OnManagerLoad(onFinished: Function, context: any) {
            if (onFinished != null && context != null) {
                this.onFinished = onFinished;
                this.context = context;
            }
            if (this.loadIndex < this.animationDatas.length) {
                this.animationDatas[this.loadIndex].OnDataLoad(this.OnManagerLoadComplete, this);
                this.loadIndex += 1;
            } else {
                this.OnManagerLoadFinished();
            }
        }

        private OnManagerLoadComplete() {


            this.OnManagerLoad(null, null);
        }

        private OnManagerLoadFinished() {
            if (this.onFinished != null) {
                this.onFinished.call(this.context);
                this.onFinished = null;
                this.context = null;
            }
        }


        public OnPlay() {
            if (this.playIndex >= this.animationDatas.length) {
                this.playIndex = 0;
            }
            this.animationDatas[this.playIndex].OnDataPlay(this.OnPlayComplete, this);
            this.playIndex += 1;
        }

        private OnPlayComplete() {
            this.OnPlay();
        }
    }

    export class CameraAnimationData {

        private loadIndex: number = 0;
        private onFinished: Function;
        private context: any;
        public index: number;
        public urls: Array<string>;
        private animations: Array<PropertyAnim> = new Array<PropertyAnim>();
        private nodeObjs: Array<Object3D> = new Array<Object3D>();


        constructor(urls: Array<string>, nodeObjs: Array<Object3D>, index: number) {
            this.urls = urls;
            this.nodeObjs = nodeObjs;
            this.index = index;
        }

        public OnDataLoad(onFinished: Function, context: any) {
            if (onFinished != null && context != null) {
                this.onFinished = onFinished;
                this.context = context;
            }
            if (this.loadIndex < this.urls.length) {
                var loader: URLLoader = new URLLoader(Class_Sponza.RootPath + this.urls[this.loadIndex]);
                loader.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.OnDataLoadComplete, this);
                this.loadIndex += 1;
            } else {
                this.OnDataLoadFinished();
            }
        }

        private OnDataLoadComplete(e: LoaderEvent3D) {
            this.animations.push(e.data);
            this.OnDataLoad(null, null);
        }

        private OnDataLoadFinished() {
            if (this.onFinished != null) {
                this.onFinished.call(this.context);
                this.onFinished = null;
                this.context = null;
            }
        }

        public OnDataPlay(onFinished: Function, context: any) {
            if (onFinished != null && context != null) {
                this.onFinished = onFinished;
                this.context = context;
            }
            var maxTime: number = -1;
            var index: number = -1;
            for (var i: number = 0; i < this.animations.length; i++) {
                if (this.animations[i].totalTime > maxTime) {
                    maxTime = this.animations[i].totalTime;
                    index = i;
                }
            }
            for (var i: number = 0; i < this.animations.length; i++) {

                this.nodeObjs[i].bindAnimation(this.animations[i]);
                if (i == index) {
                    this.nodeObjs[i].proAnimation.addEventListener(PropertyAnimEvent3D.EVENT_PLAY_COMPLETE, this.OnDataPlayFinished, this);
                }
                this.nodeObjs[i].proAnimation.isLoop = false;
                this.nodeObjs[i].proAnimation.play();
            }
        }

        private OnDataPlayFinished() {

            for (var i: number = 0; i < this.animations.length; i++) {
                this.nodeObjs[i].proAnimation.stop;
                this.nodeObjs[i].proAnimation.clearEventListener();
            }
            this.OnDataLoadFinished();
        }
    }

    export class LoadingUi {

        private view1: View3D;
        private _mask: Rectangle = new Rectangle();
        private radio: number;
        private isFinished: boolean;
        private isReady: boolean;
        private guad_0: Quad;
        private guad: Quad;
        private panel: gui.UIPanel;
        private callBack: Function;
        private context: any;

        constructor(view1: View3D) {
            this.view1 = view1;

        }
        public OnInit(callBack: Function, context: any) {
            this.callBack = callBack;
            this.context = context;

            this.isReady = false;
            this.isFinished = false;
            this.radio = 0;
            this._mask.width = 256;
            this._mask.height = 256;
            this._mask.y += 256;

            var gui: QuadStage = this.view1.getGUIStage();

            var josnStr = Class_Sponza.RootPath + "Ui/ui.json";
            var pngStr = Class_Sponza.RootPath + "Ui/ui.png";

            TextureResourceManager.getInstance().loadTexture(josnStr, pngStr, gui);
            TextureResourceManager.getInstance().addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onLoaded, this);
        }
        private onLoaded(e: LoaderEvent3D) {

            var tex: Texture = TextureResourceManager.getInstance().getTexture("EgretLoadingPage.png");
            this.panel = new gui.UIPanel();
            this.panel.setStyle("background", tex);
            this.panel.width = 2048;
            this.panel.height = 1024;
            this.panel.position = this.SetCentre(this.panel.width, this.panel.height);
            this.view1.addGUI(this.panel);

            this.guad = new Quad();
            this.guad.texture = TextureResourceManager.getInstance().getTexture("EgretLogogray.png");
            this.guad.width = 400;
            this.guad.height = 400;
            this.guad.position = this.SetCentre(this.guad.width, this.guad.height);
            this.guad.position.y -= 7;
            this.view1.addGUI(this.guad);

            this.guad_0 = new Quad();
            this.guad_0.texture = TextureResourceManager.getInstance().getTexture("EgretLogowhite.png");
            this.guad_0.width = 256;
            this.guad_0.height = 256;
            this.guad_0.position = this.SetCentre(this.guad_0.width, this.guad_0.height);
            this.guad_0.mask = this._mask;
            this.view1.addGUI(this.guad_0);

            this.callBack.call(this.context);
            this.callBack = null;
            this.context = null;
            //var txt: gui.UITextField = new gui.UITextField();
            //txt.text = "100%";
            //txt.position = this.SetCentre(200, 200);
            //this.view1.addGUI(txt);

        }
        private SetCentre(width: number, height: number): Vector3D {

            var winCentre_x = window.innerWidth * 0.5;
            var winCentre_y = window.innerHeight * 0.5;
            var targetCentre_x = width * 0.5;
            var targetCentre_y = height * 0.5;

            var vec3 = new Vector3D();
            vec3.x = winCentre_x - targetCentre_x;
            vec3.y = winCentre_y - targetCentre_y;
            vec3.z = 0;
            return vec3;
        }
        public OnUpdate() {
            if (this.isFinished) {
                return;
            }
            if (this._mask == null || this.guad_0 == null) {
                return;
            }
            if (this.isReady == false && this.radio >= 0.95) {
                return;
            }
            this.radio += 0.02;
            this._mask.y = (1 - this.radio) * 256;
            this.guad_0.mask = this._mask;
            if (this.radio > 1) {
                this.isFinished = true;
                this.guad.visible = false;
                this.panel.visible = false;
                this.guad_0.visible = false;
                this.view1.removeGUI(this.guad);
                this.view1.removeGUI(this.panel);
                this.view1.removeGUI(this.guad_0);
                if (this.callBack != null) {
                    this.callBack.call(this.context);
                    this.callBack = null;
                    this.context = null;
                }
            }
        }
        public OnFinished(callBack: Function, context: any) {
            this.callBack = callBack;
            this.context = context;
            this.isReady = true;
        }

    }
}