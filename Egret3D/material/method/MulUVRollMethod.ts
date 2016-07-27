module egret3d {

    /**
    * @language zh_CN
    * @class egret3d.UVRollMethod
    * @classdesc
    * 用来实现多UV滚动效果的渲染方法
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class MulUVRollMethod extends MethodBase {

        private _uvRoll: Float32Array = new Float32Array(4);

        private _uvSpeed: Float32Array = new Float32Array(4);

        private _time: number = 0.0;
        private _start: boolean = false;
        private _diffuseTexture1: ITexture;

        /**
        * @private
        * @language zh_CN
        */
        constructor() {
            super();

            this.fsShaderList[ShaderPhaseType.diffuse_fragment] = this.fsShaderList[ShaderPhaseType.diffuse_fragment] || [];
            this.fsShaderList[ShaderPhaseType.diffuse_fragment].push("mulUvRoll_fs");

            this._uvSpeed[0] = 0.00005;
            this._uvSpeed[1] = 0.0;
            this._uvSpeed[2] = 0.00005;
            this._uvSpeed[3] = 0.0;
        }

        /**
        * @language zh_CN
        * 用来UV u的滚动速度
        * @param value u的滚动速度
        * @version Egret 3.0
        * @platform Web,Native
        */
        public setSpeedU(index: number, value: number) {
            this._uvSpeed[index *2 + 0 ] = value;
        }

        /**
        * @language zh_CN
        * 获取UV u的滚动速度
        * @returns number u的滚动速度
        * @version Egret 3.0
        * @platform Web,Native
        */
        public getSpeedU(index:number): number {
            return this._uvSpeed[index * 2 + 0];
        }

        /**
        * @language zh_CN
        * 用来UV v的滚动速度
        * @param value v的滚动速度
        * @version Egret 3.0
        * @platform Web,Native
        */
        public setSpeedV(index: number, value: number) {
            this._uvSpeed[index * 2 + 1] = value;
        }

        /**
        * @language zh_CN
        * 获取UV v的滚动速度
        * @returns number v的滚动速度
        * @version Egret 3.0
        * @platform Web,Native
        */
        public getSpeedV(index: number): number {
            return this._uvSpeed[index * 2 + 1];
        }

        /**
        * @language zh_CN
        * 开始播放uv动画
        * @param rest 如果为ture就是重置播放
        * @version Egret 3.0
        * @platform Web,Native
        */
        public start(rest: boolean = false) {
            if (rest)
                this._time = 0;
            this._start = true;
        }

        /**
        * @language zh_CN
        * 停止播放uv动画
        * @version Egret 3.0
        * @platform Web,Native
        */
        public stop() {
            this._start = false;
        }

        /**
        * @language zh_CN
        * 设置流动贴图
        * @param tex 流动贴图
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set diffuseTexture1(tex: ITexture) {
            this._diffuseTexture1 = tex;
            this.materialData["diffuseTexture1"] = tex;
            this.materialData.textureChange = true;
        }

        /**
        * @language zh_CN
        * 获取流动贴图
        * @returns ITexture 流动贴图
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get diffuseTexture1(): ITexture {
            return this._diffuseTexture1;
        }

        /**
        * @private
        * @language zh_CN
        * @param time
        * @param delay
        * @param usage
        * @param materialData
        * @param geometry
        * @param context3DProxy
        * @param modeltransform 
        * @param modeltransform
        * @param camera3D
        */
        public upload(time: number, delay: number, usage: PassUsage, geometry: SubGeometry, context3DProxy: Context3DProxy, modeltransform: Matrix4_4, camera3D: Camera3D) {
            usage["mulUvRoll"] = context3DProxy.getUniformLocation(usage.program3D, "mulUvRoll");
        }

        /**
        * @private
        * @language zh_CN
        */
        public activeState(time: number, delay: number, usage: PassUsage, geometry: SubGeometry, context3DProxy: Context3DProxy, modeltransform: Matrix4_4, camera3D: Camera3D) {
            if (this._start) {
                this._time += delay;
                for (var i: number = 0; i < 4; ++i) {
                    this._uvRoll[i] = this._time * this._uvSpeed[i];
                }
                context3DProxy.uniform1fv(usage["mulUvRoll"], this._uvRoll);
            }
        }
    }
}
