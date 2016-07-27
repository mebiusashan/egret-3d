module egret3d {

    /**
    * @language zh_CN
    * @class egret3d.UVRollMethod
    * @classdesc
    * 用来实现UV流光滚动效果的渲染方法
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class StreamerMethod extends MethodBase {

        private _uvRoll: Float32Array = new Float32Array(3);
        private _speedU: number = 0.0001;
        private _speedV: number = 0.0001;
        private _intensity: number = 0.9;
        private _time: number = 0.0;
        private _start: boolean = false;
        private _steamerTexture: ITexture;

        /**
        * @private
        * @language zh_CN
        */
        constructor() {
            super();

            this.fsShaderList[ShaderPhaseType.diffuse_fragment] = this.fsShaderList[ShaderPhaseType.diffuse_fragment] || [];
            this.fsShaderList[ShaderPhaseType.diffuse_fragment].push("uvStreamerRoll_fs");

            this.start();
        }

        /**
        * @language zh_CN
        * 用来UV u的滚动速度
        * @param value u的滚动速度
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set speedU(value: number) {
            this._speedU = value;
        }
        
        /**
        * @language zh_CN
        * 获取UV u的滚动速度
        * @returns number u的滚动速度
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get speedU(): number {
            return this._speedU;
        }
        
        /**
        * @language zh_CN
        * 用来UV v的滚动速度
        * @param value v的滚动速度
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set speedV(value: number) {
            this._speedV = value;
        }
                
        /**
        * @language zh_CN
        * 获取UV v的滚动速度
        * @returns number v的滚动速度
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get speedV(): number {
            return this._speedV;
        }

        /**
        * @language zh_CN
        * 设置流动贴图
        * @param tex 流动贴图
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set steamerTexture(tex: ITexture) {
            this._steamerTexture = tex; 
            this.materialData["streamerTexture"] = tex;
            this.materialData.textureChange = true; 
        }

        /**
        * @language zh_CN
        * 获取流动贴图
        * @returns ITexture 流动贴图
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get steamerTexture(): ITexture {
            return this._steamerTexture;
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
            usage["uvRoll"] = context3DProxy.getUniformLocation(usage.program3D, "uvRoll");
        }
        
        /**
        * @private
        * @language zh_CN
        */
        public activeState(time: number, delay: number, usage: PassUsage, geometry: SubGeometry, context3DProxy: Context3DProxy, modeltransform: Matrix4_4, camera3D: Camera3D) {
            if (this._start) {
                this._time += delay;
                this._uvRoll[0] = this._time * this._speedU;
                this._uvRoll[1] = this._time * this._speedV;
                this._uvRoll[2] = this._intensity ;
                context3DProxy.uniform1fv(usage["uvRoll"], this._uvRoll);
            }
        }
    }
}
