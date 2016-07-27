module egret3d {
    /**
    * @private
    * @class egret3d.CameraAnimationManager
    * @classdesc
    * 摄像机管理器
    * 管理所有摄像机动画
    * @see egret3d.Camera3D
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class CameraManager {

        public static instance: CameraManager = new CameraManager();
        public cameras: Array<Camera3D> = new Array<Camera3D>();
        
        /**
        * @language zh_CN
        * 构建一个摄像机管理对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor() {
        }

        public addCamera(camera: Camera3D) {
            this.cameras.push(camera);
        }

        /**
        * @language zh_CN
        * 更新所有的摄像机
        * @param time 当前时间
        * @param delay 每帧间隔时间
        * @version Egret 3.0
        * @platform Web,Native
        */
        public update(time:number, delay:number) {

            //for (var i: number = 0; i < this.cameras.length; ++i) {
            //    this.cameras[i].update(time, delay, this.cameras[i]);
            //}
        }
    }
} 