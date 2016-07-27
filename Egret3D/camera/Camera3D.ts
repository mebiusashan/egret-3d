module egret3d {

    /**
    * 摄像机类型
    * @version Egret 3.0
    * @platform Web,Native
    */
    export enum CameraType {

        /**
        * 透视投影
        * @version Egret 3.0
        * @platform Web,Native
        */
        perspective,

        /**
        * 正交投影
        * @version Egret 3.0
        * @platform Web,Native
        */
        orthogonal,

        /**
        * VR投影
        * @version Egret 3.0
        * @platform Web,Native
        */
        VR
    };

    /**
    * VR类型
    * @private
    * @version Egret 3.0
    * @platform Web,Native
    */
    export enum VRType {

        /**
        * 左眼
        * @private
        * @version Egret 3.0
        * @platform Web,Native
        */
        left,

        /**
        * 右眼
        * @private
        * @version Egret 3.0
        * @platform Web,Native
        */
        right
    };
    /**
    * @class egret3d.Camera3D
    * @classdesc
    * 相机数据处理，生成3D摄相机。</p>
    * 渲染场景从摄像机视点到缓冲区。</p>
    * 相机分为透视摄像机、正交摄像机、VR摄像机。</p>
    * 默认相机朝向是(0, 0, 1) 头朝向是(0, 1, 0)
    *
    * @see egret3d.Matrix4_4
    * @see egret3d.Object3D
    * 
    * @includeExample camera/Camera3D.ts
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class Camera3D extends Object3D {

        /**
         * @language zh_CN
         * 相机投影矩阵
         * @version Egret 3.0
         * @platform Web,Native
         */
        public projectMatrix: Matrix4_4 = new Matrix4_4();

        /**
        * @private
        * @language zh_CN
        * 眼睛矩阵(左，右眼) 实现VR时会用到
        * @version Egret 3.0
        * @platform Web,Native
        */
        public eyeMatrix: EyesMatrix;

        /**
         * @language zh_CN        
         * 相机的视椎体，用来检测是否在当前相机可视范围内
         * @version Egret 3.0
         * @platform Web,Native
         */
        public frustum: Frustum = new Frustum();

        public viewPort: Rectangle = new Rectangle();

        private _viewPort: Rectangle = new Rectangle();

        private _scissorRect: Rectangle = new Rectangle();

        private _aspectRatio: number = 1.0;

        private _fovY: number = 45.0;

        private _near: number = 1;

        private _far: number = 10000.0;

        private temp: Matrix4_4 = new Matrix4_4();

        private _lookAtPosition: Vector3D = new Vector3D();

        private _up: Vector3D = new Vector3D(0, 1, 0);

        private _cameraType: number = 0;

        private _cameraMatrixChange: boolean = false;

        private _viewMatrix: Matrix4_4 = new Matrix4_4();

        private _tempQuat: Quaternion = new Quaternion();

        private _normalMatrix: Matrix4_4 = new Matrix4_4();

        private _unprojection: Matrix4_4 = new Matrix4_4();

        protected _animation: any = [];

        /**
         * @language zh_CN        
         * constructor
         * @param cameraType 相机类型
         * @version Egret 3.0
         * @platform Web,Native
         */
        constructor(cameraType: CameraType = CameraType.perspective) {
            super();
            this.cameraType = cameraType;
            CameraManager.instance.addCamera(this);
        }

        /**
         * @language zh_CN        
         * 设置相机类型
         * @param cameraType 相机类型
         * @version Egret 3.0
         * @platform Web,Native
         */
        public set cameraType(cameraType: CameraType) {
            this._cameraType = cameraType;
            switch (cameraType) {
                case CameraType.orthogonal:
                    this.projectMatrix.ortho(this._viewPort.width, this._viewPort.height, this._near, this._far);
                    //this.updataOrth();
                    break;
                case CameraType.perspective:
                    this.projectMatrix.perspective(this._fovY, this._aspectRatio, this._near, this._far);
                    break;
                case CameraType.VR:
                    this.projectMatrix.perspective(this._fovY, 1.0, this._near, this._far);
                    this.eyeMatrix = this.eyeMatrix || new EyesMatrix();
                    break;
            }
        }

        /**
        * @private
        * @language zh_CN        
        * 打开VR相机
        * @param cameraType 相机类型
        * @param vrType VR类型
        * @version Egret 3.0
        * @platform Web,Native
        */
        public tap(cameraType: CameraType, vrType: VRType = null) {
            if (cameraType == CameraType.VR) {
                this.eyeMatrix.update(this);
                if (vrType == VRType.left) {
                    this.viewMatrix.copyFrom(this.eyeMatrix.leftEyeMatrix);
                } else if (vrType == VRType.right) {
                    this.viewMatrix.copyFrom(this.eyeMatrix.rightEyeMatrix);
                }
                this.viewMatrix.invert();
            }
        }

        /**
        * @language zh_CN        
        * 设置相机横纵比
        *  
        * @param value 横纵比
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set aspectRatio(value: number) {
            if (this._aspectRatio != value) {
                this._aspectRatio = value;
                this.cameraType = this._cameraType;
            }
        }

        /**
        * @language zh_CN        
        * 返回相机横纵比
        *  
        * @returns number 横纵比
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get aspectRatio(): number {
            return this._aspectRatio;
        }

        /**
        * @language zh_CN
        * 设置相机fovY
        *  
        * @param value fovY
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set fieldOfView(value: number) {
            if (this._fovY != value) {
                this._fovY = value;
                this.cameraType = this._cameraType;
            }
        }

        /**
        * @language zh_CN
        * 返回相机fovY
        *  
        * @returns number fovY
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get fieldOfView(): number {
            return this._fovY;
        }

        /**
        * @language zh_CN
        * 设置相机近截面
        *  
        * @param value 近截面
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set near(value: number) {
            if (this._near != value) {
                this._near = value;
                this.cameraType = this._cameraType;
            }
        }

        /**
        * @language zh_CN
        * 返回相机近截面
        *  
        * @returns 近截面
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get near(): number {
            return this._near;
        }

        /**
        * @language zh_CN
        * 设置相机远截面
        *  
        * @param value 远截面
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set far(value: number) {
            if (this._far != value) {
                this._far = value;
                this.cameraType = this._cameraType;
            }
        }

        /**
        * @language zh_CN
        * 返回相机远截面
        *  
        * @returns 远截面
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get far(): number {
            return this._far;
        }

        /**
        * @language zh_CN
        * 返回相机视图投影矩阵
        *  
        * @returns 视图投影矩阵
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get viewProjectionMatrix(): Matrix4_4 {
            this.temp.copyFrom(this.viewMatrix);
            this.temp.multiply(this.projectMatrix);
            return this.temp;
        }


        ///**
        //* @language zh_CN
        //* 视图noormal矩阵
        //* normal 矩阵用来纠正透视相机影响视图变形，所影响的法线轴变形，一般用 modeviewMatrix 的逆举证的转置矩阵。
        //* @version Egret 3.0
        //* @platform Web,Native
        //*/
        //public get normalMatrix(): Matrix4_4 {
        //    this._normalMatrix.copyFrom(this.viewMatrix);
        //    this._normalMatrix.multiply(this.projectMatrix);
        //    return this._normalMatrix; 
        //}

        /**
         * @private
         * @language zh_CN
         * @param x number
         * @param y number
         * @param width number
         * @param height number
         * @version Egret 3.0
         * @platform Web,Native
         */
        public updateScissorRect(x: number, y: number, width: number, height: number) {
            this._scissorRect.x = x;
            this._scissorRect.y = y;
            this._scissorRect.width = width;
            this._scissorRect.height = height;
        }

        /**
         * @language zh_CN
         * 更新视口
         * @param x number
         * @param y number
         * @param width number
         * @param height number
         * @version Egret 3.0
         * @platform Web,Native
         */
        public updateViewport(x: number, y: number, width: number, height: number) {
            this._viewPort.x = x;
            this._viewPort.y = y;
            this._viewPort.width = width;
            this._viewPort.height = height;
        }

        /**
         * @language zh_CN
         * 当前对象对视位置
         * @param pos 对象的位置
         * @param target 目标的位置
         * @param up 向上的方向
         * @version Egret 3.0
         * @platform Web,Native
         */
        public lookAt(pos: Vector3D, target: Vector3D, up: Vector3D = Vector3D.Y_AXIS) {
            this.position = pos;
            this._lookAtPosition.copyFrom(target);
            this._up.copyFrom(up);
            this._viewMatrix.lookAt(this._pos, this._lookAtPosition, this._up);
            this._viewMatrix.invert();

            var prs: Vector3D[] = this._viewMatrix.decompose(Orientation3D.QUATERNION);
            this._tempQuat.x = prs[1].x;
            this._tempQuat.y = prs[1].y;
            this._tempQuat.z = prs[1].z;
            this._tempQuat.w = prs[1].w;
            this.orientation = this._tempQuat;
        }

        protected onUpdateTransform() {
            this._viewMatrix.copyFrom(this._modelMatrix3D);
            this._viewMatrix.invert();
        }

        /**
         * @language zh_CN
         *  
         * 相机视图矩阵
         * @version Egret 3.0
         * @platform Web,Native
         */
        public get viewMatrix(): Matrix4_4 {
            if (this._transformChange) {
                this.modelMatrix;
            }
            return this._viewMatrix;
        }

        /**
         * @language zh_CN
         *  
         * 相机目标点
         * @version Egret 3.0
         * @platform Web,Native
         */
        public get lookAtPosition(): Vector3D {
            return this._lookAtPosition;
        }

        private raw: Float32Array = new Float32Array(16);
        /**
        * @private
        * @language zh_CN
        * 更新正交矩阵
        * @version Egret 3.0
        * @platform Web,Native
        */
        public updataOrth() {
            var _projectionHeight: number = 2000;
            var _yMax: number = _projectionHeight * .5;
            var _xMax: number = _yMax * this._aspectRatio;

            var left: number, right: number, top: number, bottom: number;
            ///return 
            if (this._scissorRect.x == 0 && this._scissorRect.y == 0 && this._scissorRect.width == this._viewPort.width && this._scissorRect.height == this._viewPort.height) {
                /// assume symmetric frustum
                left = -_xMax;
                right = _xMax;
                top = -_yMax;
                bottom = _yMax;

                this.raw[0] = 2 / (_projectionHeight * this._aspectRatio);
                this.raw[5] = 2 / _projectionHeight;
                this.raw[10] = 1 / (this._far - this._near);
                this.raw[14] = this._near / (this._near - this._far);
                this.raw[1] = this.raw[2] = this.raw[3] = this.raw[4] =
                    this.raw[6] = this.raw[7] = this.raw[8] = this.raw[9] =
                    this.raw[11] = this.raw[12] = this.raw[13] = 0;
                this.raw[15] = 1;

            } else {

                var xWidth: number = _xMax * (this._viewPort.width / this._scissorRect.width);
                var yHgt: number = _yMax * (this._viewPort.height / this._scissorRect.height);
                var center: number = _xMax * (this._scissorRect.x * 2 - this._viewPort.width) / this._scissorRect.width + _xMax;
                var middle: number = -_yMax * (this._scissorRect.y * 2 - this._viewPort.height) / this._scissorRect.height - _yMax;

                left = center - xWidth;
                right = center + xWidth;
                top = middle - yHgt;
                bottom = middle + yHgt;

                this.raw[0] = 2 * 1 / (right - left);
                this.raw[5] = -2 * 1 / (top - bottom);
                this.raw[10] = 1 / (this._far - this._near);

                this.raw[12] = (right + left) / (right - left);
                this.raw[13] = (bottom + top) / (bottom - top);
                this.raw[14] = this._near / (this.near - this.far);

                this.raw[1] = this.raw[2] = this.raw[3] = this.raw[4] =
                    this.raw[6] = this.raw[7] = this.raw[8] = this.raw[9] = this.raw[11] = 0;
                this.raw[15] = 1;
            }

            this.projectMatrix.copyRawDataFrom(this.raw);
        }

        /**
         * @language zh_CN
         * 检测对象是否在相机视椎体内
         * @param object 需要体测的对象
         * @returns 成功返回true
         * @version Egret 3.0
         * @platform Web,Native
         */
        public isVisibleToCamera(renderItem: IRender): boolean {
            //尝试刷新modelMatrix的值，有可能changed为true
            renderItem.modelMatrix;
            return renderItem.bound.inBound(this.frustum);
        }

        /**
         * @language zh_CN
         * 增加相机动画
         * @param name 相机动画名字
         * @param ani 相机动画
         * @version Egret 3.0
         * @platform Web,Native
         */
        public addAnimation(name: string, ani: CameraAnimationController) {
            this._animation[name] = ani;
        }

        /**
        * @language zh_CN
        * 播放某个动画
        * 根据动画名字来播放，指定摄像机，并且控制动画是否循环播放
        * @param name 动画名
        * @param isLoop 是否循环
        * @version Egret 3.0
        * @platform Web,Native
        */
        public play(name: string, isLoop: boolean = false) {
            if (this._animation[name]) {
                this._animation[name].bindCamera(this);
                this._animation[name].play(isLoop);
            }
        }

        /**
        * @private
        * @language zh_CN
        * 当前对象数据更新
        * @param camera 当前渲染的摄相机
        * @param time 当前时间
        * @param delay 每帧时间间隔
        * @version Egret 3.0
        * @platform Web,Native
        */
        public update(time: number, delay: number, camera: Camera3D) {
            super.update(time, delay, camera);
            for (var key in this._animation) {
                this._animation[key].update(time, delay);
            }
        }

        private _halfw: number;
        private _halfh: number;

        /**
        * @private
        * @language zh_CN
        * 3维坐标转2维屏幕坐标
        * @param n 3维坐标
        * @param target 2维屏幕坐标 默认为null 为null会返回一个新的对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        public object3DToScreenRay(n: Vector3D, target: Vector3D = null): Vector3D {
            if (!target) {
                target = new Vector3D()
            }
            this._halfw = this.viewPort.width * 0.5;
            this._halfh = this.viewPort.height * 0.5;

            target = this.viewMatrix.transformVector(n, target);
            this.project(target, target);

            target.x = this._halfw + target.x * this._halfw;
            target.y = this.viewPort.height - (this._halfh - target.y * this._halfh);
            return target;
        }

        /**
        * @private
        * @language zh_CN
        * 2维屏幕坐标转3维坐标
        * @param n 2维屏幕坐标
        * @param target 3维坐标 默认为null 为null会返回一个新的对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        public ScreenRayToObject3D(n: Vector3D, target: Vector3D = null): Vector3D {
            if (!target) {
                target = new Vector3D()
            }
            this._halfw = this.viewPort.width * 0.5;
            this._halfh = this.viewPort.height * 0.5;

            target.x = (n.x - this._halfw) / this._halfw;
            target.y = (this._halfh - (this.viewPort.height - n.y)) / this._halfh;

            this.unproject(target.x, target.y, n.z, target);
            this.modelMatrix.transformVector(target, target);

            return target;
        }

        private v: Vector3D = new Vector3D();
        private p: Vector3D = new Vector3D();
        private unproject(nX: number, nY: number, sZ: number, target: Vector3D): Vector3D {
            target.x = nX;
            target.y = -nY;
            target.z = sZ;
            target.w = 1.0;

            target.x *= sZ;
            target.y *= sZ;

            this._unprojection.copyFrom(this.projectMatrix);
            this._unprojection.invert();

            this._unprojection.transformVector(target, target);

            target.z = sZ;

            return target;
        }

        private project(n: Vector3D, target: Vector3D): Vector3D {
            target = this.projectMatrix.transformVector(n, target);
            target.x = target.x / target.w;
            target.y = -target.y / target.w;

            target.z = n.z;

            return target;
        }

        protected onMakeTransform() {
            MathUtil.CALCULATION_VECTOR3D.x = 1;
            MathUtil.CALCULATION_VECTOR3D.y = 1;
            MathUtil.CALCULATION_VECTOR3D.z = 1;
            this._modelMatrix3D.makeTransform(this._globalPos, MathUtil.CALCULATION_VECTOR3D, this._globalOrientation);
        }
    }
} 