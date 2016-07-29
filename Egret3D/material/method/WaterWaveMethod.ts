module egret3d {

    /**
    * @language zh_CN
    * @class egret3d.UVRollMethod
    * @classdesc
    * 用来实现水面顶点波动效果
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class WaterWaveMethod extends MethodBase {

        private _waveVSData: Float32Array = new Float32Array(12);
        private _waveFSData: Float32Array = new Float32Array(8);
        private _time: number = 0.0;
        private _start: boolean = false;

        private _wave_xyz_intensity_0: Vector3D = new Vector3D(120.0, 50.0, 70.0);
        private _wave_xyz_intensity_1: Vector3D = new Vector3D(80.0, 40.0, 80.0);
        private _wave_xyz_speed_0: Vector3D = new Vector3D(0.001, 0.001, -0.001);
        private _wave_xyz_speed_1: Vector3D = new Vector3D(0.001, 0.001, 0.001);

        private _waveTexture:ITexture ;
        /**
        * @private
        * @language zh_CN
        */
        constructor() {
            super();

            //##FilterBegin## ##Water##
	        //##FilterEnd##
        }

        /**
        * @language zh_CN
        * 设置深水颜色
        * @param color 颜色 a r b g
        */
        public set deepWaterColor(color: number) {
            //##FilterBegin## ##Water##
            //##FilterEnd##
        }


        /**
        * @language zh_CN
        * 获取深水颜色
        * @param color 颜色 a r b g
        */
        public get deepWaterColor():number {
            var r = this._waveFSData[0] * 255.0;
            var g = this._waveFSData[1] * 255.0;
            var b = this._waveFSData[2] * 255.0;
            var a = this._waveFSData[3] * 255.0;
            return (a << 24) | (r << 16) | (g << 8) | b; 
        }

        /**
        * @language zh_CN
        * 设置浅水颜色
        * @param color 颜色
        */
        public set shallowWaterColor(color: number) {
            //##FilterBegin## ##Water##
            //##FilterEnd##
        }

        /**
        * @language zh_CN
        * 获取浅水颜色
        * @param color 颜色 a r b g
        */
        public get shallowWaterColor(): number {
            var r = this._waveFSData[4] * 255.0;
            var g = this._waveFSData[5] * 255.0;
            var b = this._waveFSData[6] * 255.0;
            var a = this._waveFSData[7] * 255.0;
            return (a << 24) | (r << 16) | (g << 8) | b;
        }

        /**
        * @language zh_CN
        * 水贴图
        * @param texture  水贴图
        */
        public set waveTexture(texture: ITexture) {
            //##FilterBegin## ##Water##
            //##FilterEnd##
        }

        /**
        * @language zh_CN
        * 开始播放uv动画
        * @param rest 如果为ture就是重置播放
        * @version Egret 3.0
        * @platform Web,Native
        */
        public start(rest: boolean = false) {
            //##FilterBegin## ##Water##
            //##FilterEnd##
        }
                
        /**
        * @language zh_CN 
        * 停止播放uv动画
        * @version Egret 3.0
        * @platform Web,Native
        */
        public stop() {
            //##FilterBegin## ##Water##
            //##FilterEnd##
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
            //##FilterBegin## ##Water##
            //##FilterEnd##
        }
        
        /**
        * @private
        * @language zh_CN
        */
        public activeState(time: number, delay: number, usage: PassUsage, geometry: SubGeometry, context3DProxy: Context3DProxy, modeltransform: Matrix4_4, camera3D: Camera3D) {
            //##FilterBegin## ##Water##
            //##FilterEnd##
        }
    }
}
