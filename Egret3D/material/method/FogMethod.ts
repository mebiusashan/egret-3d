module egret3d {
    /**
    * @class egret3d.FogMethod
    * @classdesc
    * Exponential Height Fog渲染方法。
    * 实现3种fog类型： line、exp、exp height
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class FogMethod extends MethodBase {

        private uniform_globalFog: Float32Array = new Float32Array(7);

        private _fogColor: number = 0x0000cc;
        private _globalDensity: number = 1.0;
        private _fogStartDistance: number = 1000;
        private _fogDistanceScale: number = 0.5;
        private _height: number = 500;
        private _fogAlpha: number = 1.0;

        /**
        * @language zh_CN
        * 创建一个雾的渲染方法
        * @param fogType 雾的类型 line/exp/expHeightFog
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor(fogType: string = "expHeightFog_fs") {
            super();

            this.vsShaderList[ShaderPhaseType.local_vertex] = this.vsShaderList[ShaderPhaseType.local_vertex] || [];
            this.vsShaderList[ShaderPhaseType.local_vertex].push( "vertexPos_vs" );

            if (fogType == "line") {
                this.fsShaderList[ShaderPhaseType.lighting_fragment].push("lineFog");
            } else if (fogType == "exp") {
                this.fsShaderList[ShaderPhaseType.lighting_fragment].push("expFog_fs");
            } else if (fogType == "expHeightFog_fs") {
                this.fsShaderList[ShaderPhaseType.lighting_fragment] = this.fsShaderList[ShaderPhaseType.lighting_fragment] || [];
                this.fsShaderList[ShaderPhaseType.lighting_fragment].push("expHeightFog_fs");
            }
            //0.5, 0.6, 0.7
            this.uniform_globalFog[0] = 0.5;
            this.uniform_globalFog[1] = 0.6;
            this.uniform_globalFog[2] = 0.7;
            this.uniform_globalFog[3] = this._globalDensity ;
            this.uniform_globalFog[4] = this._fogStartDistance;
            this.uniform_globalFog[5] = this._height;
            this.uniform_globalFog[6] = this._fogAlpha;
        }
        
        /**
        * @language zh_CN
        * 设置雾颜色
        * @param value 雾颜色 rgb  0xffffff
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set fogColor(value: number) {
            this._fogColor = value;
            this.uniform_globalFog[0] = (this._fogColor >> 16 & 0xff) / 255.0;
            this.uniform_globalFog[1] = (this._fogColor >> 8 & 0xff) / 255.0;
            this.uniform_globalFog[2] = (this._fogColor & 0xff) / 255.0;
        }
                
        /**
        * @language zh_CN
        * 获取雾颜色
        * @returns 雾颜色 rgb  0xffffff
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get fogColor( ): number {
            return this.fogColor;
        }
                        
        /**
        * @language zh_CN
        * 设置雾的全局浓度
        * @param value 雾的全局浓度
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set globalDensity(value: number) {
            this._globalDensity = value;
            this.uniform_globalFog[3] = value;
        }
                                
        /**
        * @language zh_CN
        * 获取雾的全局浓度
        * @returns number 雾的全局浓度
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get globalDensity(): number {
            return this._globalDensity;
        }
                                
        /**
        * @language zh_CN
        * 设置雾的开始距离
        * @param value 雾的开始距离
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set fogStartDistance(value: number) {
            this._fogStartDistance = value;
            this.uniform_globalFog[4] = value;
        }
                                        
        /**
        * @language zh_CN
        * 获取雾的开始距离
        * @returns number 雾的开始距离
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get fogStartDistance(): number {
            return this._fogStartDistance;
        }

        //public set fogDistanceScale(value: number) {
        //    this._fogDistanceScale = value;
        //    this.uniform_globalFog[5] = value;
        //}

        //public get fogDistanceScale(): number {
        //    return this._fogDistanceScale;
        //}
                                        
        /**
        * @language zh_CN
        * 设置雾的高度值
        * @param value 雾的高度值
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set fogHeight(value: number) {
            this._height = value;
            this.uniform_globalFog[5] = value;
        }
                                                
        /**
        * @language zh_CN
        * 获取雾的高度值
        * @returns number 雾的高度值
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get fogHeight(): number {
            return this._height;
        }
                                                
        /**
        * @language zh_CN
        * 设置雾的Alpha值
        * @param value 雾的Alpha值
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set fogAlpha(value: number) {
            this._height = value;
            this.uniform_globalFog[6] = value;
        }
                                                        
        /**
        * @language zh_CN
        * 获取雾的Alpha值
        * @returns number 雾的Alpha值
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get fogAlpha(): number {
            return this._height;
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
            usage["uniform_globalFog"] = context3DProxy.getUniformLocation(usage.program3D, "uniform_globalFog"); 
        }
        
        /**
         * @language zh_CN
         * @private
         */
        public activeState(time: number, delay: number, usage: PassUsage, geometry: SubGeometry, context3DProxy: Context3DProxy, modeltransform: Matrix4_4, camera3D: Camera3D) {
            context3DProxy.uniform1fv(usage["uniform_globalFog"], this.uniform_globalFog);
        }

        /**
         * @language zh_CN
         * @private
         */
        public dispose() {
        }
    }
} 