module egret3d {

    /**
    * @private
    * @language zh_CN
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class ShadowCast {
        private static _instance: ShadowCast;
        private static _enable: boolean = false; 

        public shadowRender: RenderBase[]; 
        public shadowCamera: Camera3D;

        public distance: number = 2000;
        public dir: Vector3D = new Vector3D(0, -1, -1);


        public static get instance(): ShadowCast {
            if (!ShadowCast._instance) {
                ShadowCast._instance = new ShadowCast();
            }
            return ShadowCast._instance;
        }

        constructor() {
            this.init();
        }

        //使用阴影
        public static enableShadow(flag: boolean) {
            this._enable = flag; 
        }

        private init() {
            this.shadowRender = [];
        }

        public castShadowLight() {
            this.shadowRender.push(new MultiRender(PassType.shadowPass));
            this.shadowCamera = new Camera3D();
            //this.shadowCamera.cameraType = CameraType.orthogonal;
            //this.shadowCamera.updateViewport(0, 0, 1024, 768);
            //this.shadowCamera.near = 500;
            //this.shadowCamera.far = 1500;
            this.shadowCamera.lookAt(new Vector3D(0, 1000, -1000), new Vector3D(0, 0, 0));
            this.shadowRender[this.shadowRender.length - 1].setRenderToTexture(512, 512);
        }

        public calculateCamera(object3d: Object3D, camera: Camera3D) {
            MathUtil.CALCULATION_VECTOR3D.copyFrom(this.dir);
            MathUtil.CALCULATION_VECTOR3D.normalize();
            MathUtil.CALCULATION_VECTOR3D.negate();
            MathUtil.CALCULATION_VECTOR3D.scaleBy(this.distance);
            camera.lookAt(MathUtil.CALCULATION_VECTOR3D, object3d.position);
        }
    }
}