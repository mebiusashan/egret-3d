module egret3d {

    /**
    * @class egret3d.CameraAnimationController
    * @classdesc
    * 摄像机动画控制器。
    * 每个摄像机动画绑定一个摄像机，控制摄像机的行为
    * 可以更换绑定的摄像机
    * @see egret3d.Camera3D
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class CameraAnimationController{
        /**
        * @language zh_CN
        * 动画播放完一个周期的事件
        */
        public static EVENT_CAMERA_COMPLETE: string = "event_camera_complete";

        /**
        * @language zh_CN
        * 相机动画每帧数据列表
        * @version Egret 3.0
        * @platform Web,Native
        */
        public cameraAnimationFrames: Array<CameraAnimationFrame> = [];
        
        /**
        * @language zh_CN
        * 相机动画名字
        * @version Egret 3.0
        * @platform Web,Native
        */
        public name: string;

        private _camera: Camera3D;
        private _playing: boolean = false;
        private _playTime: number = 0;
        private _currentFrameIndex: number = 0;
        private _loop: boolean = true;
        private _smooth: boolean = true;
        private _cameraAnimationFrame: CameraAnimationFrame = new CameraAnimationFrame();
        private _event: Event3D = new Event3D();
        private _quatCurrentFrame: Quaternion = new Quaternion();
        private _quatnNextFrame: Quaternion = new Quaternion();
        private _quatn: Quaternion = new Quaternion();
        /**
        * @language zh_CN
        * 构造函数
        * @param camera 需要一个摄像机对象来创建摄像机动画
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor(camera: Camera3D = null) {
            this._camera = camera;

            this._cameraAnimationFrame.fov = 45;
            this._cameraAnimationFrame.rotation = new Vector3D();
            this._cameraAnimationFrame.translation = new Vector3D();
        }

        /**
        * @language zh_CN
        * 绑定动画控制的相机
        * @param camera
        * @version Egret 3.0
        * @platform Web,Native
        */
        public bindCamera(camera: Camera3D): void {

            this._camera = camera;
        }

        /**
        * @language zh_CN
        * 播放相机动画 是否循环
        * @param isLoop 是否循环播放
        * @version Egret 3.0
        * @platform Web,Native
        */
        public play(isLoop: boolean): void {


            if (this.cameraAnimationFrames.length <= 0)
                return;

            this._loop = isLoop;
            this._playTime = 0;
            this._camera.isController = false;
            this._playing = true;
        }

        /**
        * @language zh_CN
        * 停止播放相机动画
        * @version Egret 3.0
        * @platform Web,Native
        */
        public stop(): void {
            this._camera.isController = true;
            this._playing = false;
        }

        /**
        * @private
        * @language zh_CN
        * 数据更新
        * @param time 当前时间
        * @param delay 每帧间隔时间
        * @version Egret 3.0
        * @platform Web,Native
        */
        public update(time: number, delay: number) {


            if (!this._playing)
                return;

            this._playTime += delay * 5;

            var Tnow: number = this._playTime % ((this.cameraAnimationFrames[this.cameraAnimationFrames.length - 1].time - this.cameraAnimationFrames[0].time) + (160));

            var currentFrameIndex: number = Math.floor(Tnow / (160)) % this.cameraAnimationFrames.length;

            if (this._currentFrameIndex > currentFrameIndex) {
                if (!this._loop) {
                    this._playing = false;
                    this._camera.isController = true;
                }
                if (this._camera) {
                    this._event.eventType = CameraAnimationController.EVENT_CAMERA_COMPLETE;
                    this._event.target = this;
                    this._camera.dispatchEvent(this._event);
                }
            }

            this._currentFrameIndex = currentFrameIndex;

            var currentFrame: CameraAnimationFrame = this.cameraAnimationFrames[currentFrameIndex];

            if (this._smooth) {

                var nextFrameIndex: number = (currentFrameIndex + 1) % this.cameraAnimationFrames.length;

                var nextFrame: CameraAnimationFrame = this.cameraAnimationFrames[nextFrameIndex];

                var t: number = (Tnow - currentFrame.time) / Math.abs(nextFrame.time - currentFrame.time);
                
                ///(v1.x - v0.x) * t + v0.x;
                this._cameraAnimationFrame.fov = (nextFrame.fov - currentFrame.fov) * t + currentFrame.fov;

                this._quatCurrentFrame.fromEulerAngles(currentFrame.rotation.x, currentFrame.rotation.y, currentFrame.rotation.z);

                this._quatnNextFrame.fromEulerAngles(nextFrame.rotation.x, nextFrame.rotation.y, nextFrame.rotation.z);

                this._quatn.lerp(this._quatCurrentFrame, this._quatnNextFrame, t);

                this._quatn.toEulerAngles(this._cameraAnimationFrame.rotation);

                this._cameraAnimationFrame.translation.lerp(currentFrame.translation, nextFrame.translation, t);
            }
            else {
                this._cameraAnimationFrame.fov = currentFrame.fov;
                this._cameraAnimationFrame.rotation.copyFrom(currentFrame.rotation);
                this._cameraAnimationFrame.translation.copyFrom(currentFrame.translation);
            }

            //this._camera.fieldOfView = this._cameraAnimationFrame.fov;

            this._camera.rotation = this._cameraAnimationFrame.rotation;
            this._camera.position = this._cameraAnimationFrame.translation;
        }
    }
    
    /**
    * @class egret3d.CameraAnimationFrame
    * @classdesc
    * 摄像机动画每帧数据
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class CameraAnimationFrame {
        /**
        * @language zh_CN
        * 帧时间
        * @version Egret 3.0
        * @platform Web,Native
        */
        public time: number;

        /**
        * @language zh_CN
        * 观察时y 轴方向的角度，就是观察范围夹角。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public fov: number;

        /**
        * @language zh_CN
        * 旋转
        * @version Egret 3.0
        * @platform Web,Native
        */
        public rotation: Vector3D;

        /**
        * @language zh_CN
        * 平移
        * @version Egret 3.0
        * @platform Web,Native
        */
        public translation: Vector3D;
        
        /**
        * @private
        * @language zh_CN
        * 计算时用的矩阵
        */
        public matrix: Matrix4_4;

    }
}