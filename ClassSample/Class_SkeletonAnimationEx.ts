module egret3d {

    export class Class_SkeletonAnimationEx extends Class_View3D {

        protected role: Role;
        protected view1: View3D;
        protected cameraCtl: LookAtController;

        protected equipSet: { [key: string]: Mesh } = {};

        public constructor() {
            super();

            this.view1 = new View3D(0, 0, window.innerWidth, window.innerHeight);
            this.view1.camera3D.lookAt(new Vector3D(0, 100, -100), new Vector3D(0, 0, 0));
            this.view1.backColor = 0xff888888;
            this._egret3DCanvas.addView3D(this.view1);

            this.cameraCtl = new LookAtController(this.view1.camera3D, new Object3D());
            this.cameraCtl.distance = 150;
            this.cameraCtl.rotationX = 60;

            this._egret3DCanvas.start();
            this._egret3DCanvas.addEventListener(Event3D.ENTER_FRAME, this.update, this);


            var roleLoader: RoleLoader = new RoleLoader();
            roleLoader.load("resource/test/0_dingji_f_fs/MapConfig.json");
            roleLoader.addEventListener(LoaderEvent3D.LOADER_COMPLETE, function (e: LoaderEvent3D) {
                this.role = e.target.role;
                this.view1.addChild3D(this.role);
                this.role.skeletonAnimation.play();
            }, this);
        }

        public update(e: Event3D) {
            this.cameraCtl.update();
        }
    }
}