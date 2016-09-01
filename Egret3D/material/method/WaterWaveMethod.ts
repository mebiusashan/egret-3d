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

            this.vsShaderList[ShaderPhaseType.start_vertex] = this.vsShaderList[ShaderPhaseType.start_vertex] || [];
            this.vsShaderList[ShaderPhaseType.start_vertex].push("wave_vs");

            this.fsShaderList[ShaderPhaseType.multi_end_fragment] = this.fsShaderList[ShaderPhaseType.multi_end_fragment] || [];
            this.fsShaderList[ShaderPhaseType.multi_end_fragment].push("wave_fs");

            this.start();

            //---------------
            this._waveVSData[0] = this._wave_xyz_intensity_0.x;
            this._waveVSData[1] = this._wave_xyz_intensity_0.y;
            this._waveVSData[2] = this._wave_xyz_intensity_0.z;
                      
            this._waveVSData[3] = this._wave_xyz_intensity_1.x;
            this._waveVSData[4] = this._wave_xyz_intensity_1.y;
            this._waveVSData[5] = this._wave_xyz_intensity_1.z;
                      
            this._waveVSData[6] = this._wave_xyz_speed_0.x;
            this._waveVSData[7] = this._wave_xyz_speed_0.y;
            this._waveVSData[8] = this._wave_xyz_speed_0.z;
                      
            this._waveVSData[9] = this._wave_xyz_speed_1.x;
            this._waveVSData[10] = this._wave_xyz_speed_1.y;
            this._waveVSData[11] = this._wave_xyz_speed_1.z;

            //0.0/255.0,63.0/255.0,77.0/255.0
            //71.0/255.0,118.0/255.0,138.0/255.0
            this._waveFSData[0] = 0.0 / 255.0; 
            this._waveFSData[1] = 63.0 / 255.0; 
            this._waveFSData[2] = 77.0 / 255.0; 
            this._waveFSData[3] = 1.0; 

            this._waveFSData[4] = 71.0 / 255.0;
            this._waveFSData[5] = 118.0 / 255.0;
            this._waveFSData[6] = 138.0 / 255.0;
            this._waveFSData[7] = 1.0; 

	        //##FilterEnd##
        }

        /**
        * @language zh_CN
        * 设置深水颜色
        * @param color 颜色 a r b g
        */
        public set deepWaterColor(color: number) {
            //##FilterBegin## ##Water##

            var a = color >> 24 & 0xff;
            var r = color >> 16 & 0xff;
            var g = color >> 8 & 0xff;
            var b = color & 0xff;
            this._waveFSData[0] = r / 255.0;
            this._waveFSData[1] = g / 255.0;
            this._waveFSData[2] = b / 255.0;
            this._waveFSData[3] = a / 255.0; 

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

            var a = color >> 24 & 0xff;
            var r = color >> 16 & 0xff;
            var g = color >> 8 & 0xff;
            var b = color & 0xff;
            this._waveFSData[4] = r / 255.0;
            this._waveFSData[5] = g / 255.0;
            this._waveFSData[6] = b / 255.0;
            this._waveFSData[7] = a / 255.0; 

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

            this._waveTexture = texture;
            if (texture) {
                if (this.materialData["waveTexture"] != this._waveTexture) {
                    this.materialData["waveTexture"] = texture;
                    this.materialData.textureChange = true;
                }
            }

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

            if (rest)
                this._time = 0;
            this._start = true;

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

            this._start = false;

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

            usage["waveVSData"] = context3DProxy.getUniformLocation(usage.program3D, "waveVSData");
            usage["waveFSData"] = context3DProxy.getUniformLocation(usage.program3D, "waveFSData");
            usage["time"] = context3DProxy.getUniformLocation(usage.program3D, "time");

            //##FilterEnd##
        }
        
        /**
        * @private
        * @language zh_CN
        */
        public activeState(time: number, delay: number, usage: PassUsage, geometry: SubGeometry, context3DProxy: Context3DProxy, modeltransform: Matrix4_4, camera3D: Camera3D) {
            //##FilterBegin## ##Water##

            if (this._start) {
                this._time += delay;
            }

            context3DProxy.uniform3fv(usage["waveVSData"], this._waveVSData);
            context3DProxy.uniform4fv(usage["waveFSData"], this._waveFSData);
            context3DProxy.uniform1f(usage["time"], this._time);

            //##FilterEnd##
        }
    }
}
