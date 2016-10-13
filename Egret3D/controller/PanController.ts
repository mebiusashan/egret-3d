module egret3d {

    /**
    * @private
    * @class egret3d.HoverController
    * @classdesc
    * 摄像机控制器 ,实现摄像机平滑移动
    * 指定摄像机看向的目标对象
    * 1.按下鼠标左键并移动鼠标(或手机手指滑动)可以使摄像机绕着目标进行旋转.
    * 2.滑动鼠标滚轮(或双指滑动)可以控制摄像机的视距.
    *
    * 示例:
    * @includeExample controller/ctl/HoverController.ts
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class PanController extends ControllerBase {


        private _view: View3D;
        private _step: number = 5.0;
        private _panAngle: number = 0;
        private _down: boolean = false;

        private _startVec3D: Vector3D = new Vector3D();
        private _endVec3D: Vector3D = new Vector3D();
        private _currentVec3D: Vector3D = new Vector3D();
        private _fixinterpolate: Vector3D = new Vector3D();
        private _fix: Vector3D = new Vector3D();
        private _final: Vector3D = new Vector3D();

        private _rotaAngle: Vector3D = new Vector3D();
        private _looat: Vector3D = new Vector3D();
        private _dir: Vector3D = new Vector3D();
        private _up: Vector3D = new Vector3D();
        private _pos: Vector3D = new Vector3D();

        private _maxFov: number = 90;
        private _minFov: number = 30; 

        private _calQua: Quaternion = new Quaternion();
        private _useCompass: boolean = false;
        private _gyroCtrlloer: OrientationController;
        /**
        * @language zh_CN
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor(view: View3D ,targe:Object3D ) {
            super(null, null);
            this._gyroCtrlloer = new OrientationController();
            this._gyroCtrlloer.start();

            this._target = targe; 
            this._view = view;
            this._currentVec3D.z = this._final.z = view.camera3D.fieldOfView;

            Input.addEventListener(MouseEvent3D.MOUSE_MOVE, this.mouseMove, this);
            Input.addEventListener(MouseEvent3D.MOUSE_WHEEL, this.mouseWheel, this);
            Input.addEventListener(MouseEvent3D.MOUSE_UP, this.mouseUp, this);
            Input.addEventListener(MouseEvent3D.MOUSE_DOWN, this.mouseDown, this);

            Input.addEventListener(TouchEvent3D.TOUCH_END, this.touchUp, this);
            Input.addEventListener(TouchEvent3D.TOUCH_START, this.touchDown, this);
            Input.addEventListener(TouchEvent3D.TOUCH_MOVE, this.touchMove, this);

            this.useCompass( true );
        }

        private mouseDown(e: MouseEvent3D) {
            this._down = true;
        }

        private mouseUp(e: MouseEvent3D) {
            this._down = false;
        }

        private mouseMove(e: MouseEvent3D) {
            if (this._down) {
                //angle
                this._final.x -= Input.mouseOffsetX / (this._step * this._step);
                this._final.y -= Input.mouseOffsetY / (this._step * this._step);
            }
            this.useCompass(false);
        }

        private touchDown(e: MouseEvent3D) { 
            this._down = true;
            
        }

        private touchUp(e: MouseEvent3D) {
            this._down = false;
        }

        private touchMove(e: TouchEvent3D) {
            if (e.targetTouches.length == 1) {
                if (this._down) {
                    //angle
                    this._final.x -= Input.mouseOffsetX / (this._step * this._step);
                    this._final.y -= Input.mouseOffsetY / (this._step * this._step);
                }
            }
            else {
                this.mouseWheel(null);
            }
            this.useCompass(false);
        }

        private mouseWheel(e: MouseEvent3D) {
            this._final.z -= Input.wheelDelta / (this._step * this._step);
        }

        public useCompass( flag:boolean ) {
            if (flag && flag != this._useCompass) {
                this._useCompass = true;
                this._target.rotationX = 270 ;
            } else if (!flag && flag != this._useCompass) {
                this._useCompass = false;
                this._target.rotationX = 0;
            }
        }

        /**
        * @language zh_CN
        * 控制器数据更新
        * @param interpolate
        * @version Egret 3.0
        * @platform Web,Native
        */
        public update(interpolate: boolean = true): void {
            if (this._useCompass) {
                this._gyroCtrlloer.update(this._view);
            } else {
                this._fix.x = this._final.x - this._currentVec3D.y;
                this._fix.y = this._final.y - this._currentVec3D.x;
                this._fix.z = this._final.z - this._currentVec3D.z;

                this._currentVec3D.y += this._fix.x / this._step;
                this._currentVec3D.x += this._fix.y / this._step;

                //this._target.rotationX = this._currentVec3D.x;
                //this._target.childs[0].rotationY = this._currentVec3D.y;

                this._rotaAngle.x = this._currentVec3D.x;
                this._rotaAngle.y = this._currentVec3D.y;

                this._calQua.fromEulerAngles(this._rotaAngle.x, this._rotaAngle.y, 0);
                this._calQua.transformVector(Vector3D.Z_AXIS, this._dir);


                this._calQua.fromEulerAngles(this._rotaAngle.x, this._rotaAngle.y, this._rotaAngle.z);
                this._calQua.transformVector(Vector3D.Y_AXIS, this._up);

                this._view.camera3D.lookAt(this._pos, this._dir, this._up);

                //this._view.camera3D.lookAt(new Vector3D(), new Vector3D(0, 0, 10), Vector3D.Y_AXIS);

                var tmp: number = this._currentVec3D.z + this._fix.z / this._step;;
                if (this._maxFov > tmp && tmp > this._minFov)
                    this._currentVec3D.z = tmp;
                else
                    this._final.z = this._currentVec3D.z;
                this._view.camera3D.fieldOfView = this._currentVec3D.z;
            }
        }
    }
}

//this._fix.x = this._final.x - this._view.camera3D.globalRotationY;
//this._fix.y = this._final.y - this._view.camera3D.globalRotationX;
//this._view.camera3D.globalRotationY += this._fix.x / this._step;
//this._view.camera3D.globalRotationX += this._fix.y / this._step;