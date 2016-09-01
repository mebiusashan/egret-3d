module egret3d {

    /**
    * @language zh_CN
    * 实时阴影渲染需要提供的数据接口。
    * 基于shadow mapping 的阴影算法,
    * 当前阴影只支持方向光,
    * 默认灯光方向是 Vector3D(1, -1, 0), 阴影摄像机为此灯光的子节点,
    * 阴影渲染摄像机的位置为Vector3D(-707, 707, 0),
    * 摄像机 near 1 far 3000  width 2048 height 2048 ,
    * 当渲染阴影的物体超出阴影摄像机的范围阴影将不会渲染阴影,
    * 可以进行调节阴影摄像机的 位置 和 其它参数来进行处理,
    * this.directLight 当前渲染阴影的灯光,
    * this.shadowCamera 当前渲染阴影的摄像机
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class ShadowCast {
        private static _instance: ShadowCast;

        private _boundBox: BoundBox = new BoundBox();
        /**
        * @language zh_CN
        * 开启阴影渲染
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static enableShadow: boolean = false;

        /**
        * @language zh_CN
        * @private
        * 阴影贴图的宽
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static textureSizeWidth: number = 1024 * 4;

        /**
        * @language zh_CN
        * @private
        * 阴影贴图的高
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static textureSizeHeight: number = 1024 * 4;

        /**
        * @language zh_CN
        * 渲染阴影的摄像机
        * @version Egret 3.0
        * @platform Web,Native
        */
        public shadowCamera: Camera3D;

        /**
        * @language zh_CN
        * 阴影渲染器
        * @version Egret 3.0
        * @platform Web,Native
        */
        public shadowRender: MultiRender;

        /**
        * @language zh_CN
        * 阴影渲染器
        * @version Egret 3.0
        * @platform Web,Native
        */
        public directLight: DirectLight;

        /**
        * @language zh_CN
        * 单例
        * @returns ShadowCast 实例返回
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static get instance(): ShadowCast {
            if (!ShadowCast._instance) {
                ShadowCast._instance = new ShadowCast();
            }
            return ShadowCast._instance;
        }

        /**
        * @private
        * @language zh_CN
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor() {
            this.shadowCamera = new Camera3D(CameraType.orthogonal);
            this.shadowRender = new MultiRender(PassType.shadowPass);
            this.shadowRender.setRenderToTexture(ShadowCast.textureSizeWidth, ShadowCast.textureSizeHeight, FrameBufferFormat.UNSIGNED_BYTE_RGBA);
            this.castShadowLight(new DirectLight(new Vector3D(0, -1, 1)));

            var v: Vector3D = MathUtil.CALCULATION_VECTOR3D;
            v.copyFrom(this.directLight.dir);
            v.negate();
            v.scaleBy(1000);
            //this.directLight.position = v;
            this.shadowCamera.globalPosition = v;
        }

        /**
        * @language zh_CN
        * 设置阴影贴图的宽度和高度
        * @param width 宽度
        * @param height 高度
        * @version Egret 3.0
        * @platform Web,Native
        */
        public setTextureSize(width: number, height: number) {
            ShadowCast.textureSizeWidth = width;
            ShadowCast.textureSizeHeight = height;
            this.shadowRender.setRenderToTexture(ShadowCast.textureSizeWidth, ShadowCast.textureSizeHeight, FrameBufferFormat.UNSIGNED_BYTE_RGBA);
        }

        /**
        * @language zh_CN
        * 如需要渲染阴影必须先设置当前阴影灯光，暂支持方向光
        * 灯光中的变换会用于阴影像机的变换
        * 注意:在阴影摄像机视锥中的物体,阴影才会渲染.
        * @param light 实例返回
        * @version Egret 3.0
        * @platform Web,Native
        */
        public castShadowLight(light: DirectLight) {
            this.directLight = light;
            this.shadowCamera.updateViewport(0, 0, 2048, 2048);
            this.shadowCamera.near = 1;
            this.shadowCamera.far = 3000;
            light.addChild(this.shadowCamera);

            var box: Mesh = new Mesh(new CubeGeometry());
            this.shadowCamera.addChild(box);
        }

        /**
        * @private
        * @language zh_CN
        * @version Egret 3.0
        * @platform Web,Native
        */
        public update(entityCollect: EntityCollect, camera:Camera3D, time:number, delay:number, viewPort:Rectangle ) {

            //entityCollect.update(this.shadowCamera);

            this.calculateBoundBox(entityCollect);

            Egret3DCanvas.context3DProxy.clearColor(1.0,1.0,1.0,1.0);
            Egret3DCanvas.context3DProxy.clear(Context3DProxy.gl.COLOR_BUFFER_BIT | Context3DProxy.gl.DEPTH_BUFFER_BIT);

            this.shadowRender.draw(time, delay, Egret3DCanvas.context3DProxy, entityCollect, this.shadowCamera, viewPort);
        }

        private calculateBoundBox(entityCollect: EntityCollect) {

            this._boundBox.min.copyFrom(new Vector3D(99999999, 99999999, 99999999));
            this._boundBox.max.copyFrom(new Vector3D(-99999999, -99999999, -99999999));

            for (var i: number = 0; i < entityCollect.renderList.length; i++) {
                var item: IRender = entityCollect.renderList[i];
                if (!item.material || !item.material.castShadow) {
                    continue;
                }
                var boundBox: BoundBox = <BoundBox>item.bound;

                
                if (this._boundBox.max.x < boundBox.max.x + item.globalX) {
                    this._boundBox.max.x = boundBox.max.x + item.globalX;
                }
                if (this._boundBox.max.y < boundBox.max.y + item.globalY) {
                    this._boundBox.max.y = boundBox.max.y + item.globalY;
                }
                if (this._boundBox.max.z < boundBox.max.z + item.globalZ) {
                    this._boundBox.max.z = boundBox.max.z + item.globalZ;
                }

                if (this._boundBox.min.x > boundBox.min.x + item.globalX) {
                    this._boundBox.min.x = boundBox.min.x + item.globalX;
                }
                if (this._boundBox.min.y > boundBox.min.y + item.globalY) {
                    this._boundBox.min.y = boundBox.min.y + item.globalY;
                }

                if (this._boundBox.min.z > boundBox.min.z + item.globalZ) {
                    this._boundBox.min.z = boundBox.min.z + item.globalZ;
                }
            }

            this._boundBox.fillBox(this._boundBox.min, this._boundBox.max);

            var v: Vector3D = MathUtil.CALCULATION_VECTOR3D;
            v.copyFrom(this.directLight.dir);
            v.negate();
            v.scaleBy(this._boundBox.radius);
            v.add(this._boundBox.center, v);

            this.shadowCamera.globalPosition = v;

            this.shadowCamera.updateViewport(0, 0, this._boundBox.radius * 2, this._boundBox.radius * 2);
            this.shadowCamera.far = this._boundBox.radius * 2;
        }
    }
}