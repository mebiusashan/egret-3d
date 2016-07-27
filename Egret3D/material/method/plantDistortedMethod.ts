module egret3d {

    /**
    * @language zh_CN
    * @class egret3d.UVRollMethod
    * @classdesc
    * 用来实现UV滚动效果的渲染方法
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class PlantDistortedMethod extends MethodBase {

        private _speed: Vector3D = new Vector3D();
        private _time: number = 0.0;

        private _windData: Float32Array = new Float32Array(4);
        /**
        * @private
        * @language zh_CN
        */
        constructor() {
            super();
            this.vsShaderList[ShaderPhaseType.local_vertex] = this.vsShaderList[ShaderPhaseType.local_vertex] || [];
            this.vsShaderList[ShaderPhaseType.local_vertex].push("detail_Bending_vs");
        }

        public set windDirAndSpeed(dirAndStr: Vector3D) {
            this._speed = dirAndStr; 
            this._windData[1] = dirAndStr.x;
            this._windData[2] = dirAndStr.y;
            this._windData[3] = dirAndStr.z ;
        }

        public get windDirAndSpeed(): Vector3D {
            return this._speed;
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
        public upload(time: number, delay: number, usage: PassUsage, geometry: SubGeometry, context3DProxy: Context3DProxy, moodeltransform: Matrix4_4, camera3D: Camera3D) {
            usage["uniformTime"] = context3DProxy.getUniformLocation(usage.program3D, "uniformTime");
        }
        
        /**
        * @private
        * @language zh_CN
        */
        public activeState(time: number, delay: number, usage: PassUsage, geometry: SubGeometry, context3DProxy: Context3DProxy, modeltransform: Matrix4_4, camera3D: Camera3D) {
            this._time += delay;
            this._windData[0] = this._time;
            context3DProxy.uniform1fv(usage["uniformTime"], this._windData);
        }


      }
}
