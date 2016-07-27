module egret3d {
    /**
     * @private
     * @language zh_CN
     * @class egret3d.EyesMatrix
     * @classdesc
     * 可使用 EyesMatrix 类 对左，右眼睛矩阵的操作
     * 它会在摄像机的位置做一个左 右偏移 模拟出眼睛的矩阵
     * @version Egret 3.0
     * @platform Web,Native
     */
    export class EyesMatrix {
                                               
        /**
        * @language zh_CN
        * 左眼睛矩阵
        */
        public leftEyeMatrix: Matrix4_4;
                                                       
        /**
        * @language zh_CN
        * 右眼睛矩阵
        */
        public rightEyeMatrix: Matrix4_4;
                                                               
        /**
        * @language zh_CN
        * @private
        */
        public eyeSpace: number = 1;

        private eyePosition: Vector3D = new Vector3D();
        private eyeRotation: Vector3D = new Vector3D(0,1,0);

        private eyeLookTarget: Vector3D;
        private eyeFocalLength: number = 180;

        private leftPos: Vector3D = new Vector3D();
        private rightPos: Vector3D = new Vector3D();
        private targetPos: Vector3D = new Vector3D(0.0, 0.0, this.eyeFocalLength);
        private lookAtPos: Vector3D = new Vector3D();
        private quaternion: Quaternion = new Quaternion();
        private dir: Vector3D = new Vector3D();
                                                       
        /**
        * @language zh_CN
        * constructor
        */
        constructor() {
            this.leftEyeMatrix = new Matrix4_4();
            this.rightEyeMatrix = new Matrix4_4();
        }
                                                               
        /**
        * @private
        * @language zh_CN
        * 数据更新
        * @param matrix 当前相机矩阵
        */
        public update(camera: Camera3D) {
            camera.globalOrientation.transformVector(Vector3D.X_AXIS, this.dir);
            this.dir.normalize();
            this.leftEyeMatrix.copyFrom(camera.modelMatrix);
            this.rightEyeMatrix.copyFrom(camera.modelMatrix);
            var space: number = this.eyeSpace * 0.5;
            this.leftEyeMatrix.appendTranslation(-this.dir.x * space, -this.dir.y * space, -this.dir.z * space);
            this.rightEyeMatrix.appendTranslation(this.dir.x * space, this.dir.y * space, this.dir.z * space);
        }
    }
}