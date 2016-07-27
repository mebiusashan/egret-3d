module egret3d {

    /**
    * @class egret3d.ColorGradientsMethod
    * @classdesc
    * 实现颜色渐变叠加
    * @see egret3d.MethodBase
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class ColorGradientsMethod extends MethodBase {


        private _posStart: Vector3D = new Vector3D();
        private _posEnd: Vector3D = new Vector3D();
        private _color: Color = new Color();;
        /**
        * @language zh_CN
        * 创建一个ColorGradientsMethod对象
        * @version Egret 3.0
        * @platform Web,Native
        */
      
        constructor() {
            super();

            this.fsShaderList[ShaderPhaseType.multi_end_fragment] = this.fsShaderList[ShaderPhaseType.multi_end_fragment] || [];
            this.fsShaderList[ShaderPhaseType.multi_end_fragment].push("colorGradients_fs");

            this.vsShaderList[ShaderPhaseType.local_vertex] = this.vsShaderList[ShaderPhaseType.local_vertex] || [];
            this.vsShaderList[ShaderPhaseType.local_vertex].push("vertexPos_vs");
        }

        /**
        * @language zh_CN
        * 设置颜色渐变数据
        * @param posStart Vector3D
        * @param posEnd Vector3D
        * @param color Color
        * @version Egret 3.0
        * @platform Web,Native
        */
        public setStartData(posStart: Vector3D, posEnd: Vector3D, color: Color) {
            this._color.copyFrom(color);
            this._posStart.copyFrom(posStart);
            this._posEnd.copyFrom(posEnd);
            this._posStart.w = 0;
            this._posEnd.w = 0;
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
            usage["uniform_colorGradientsSource"] = context3DProxy.getUniformLocation(usage.program3D, "uniform_colorGradientsSource");
        }

        private _zeroVector: Vector3D = new Vector3D();
        private _helpVector: Vector3D = new Vector3D();
        private _helpMatrix: Matrix4_4 = new Matrix4_4();
        /**
        * @private
        * @language zh_CN
        */
        public activeState(time: number, delay: number, usage: PassUsage, geometry: SubGeometry, context3DProxy: Context3DProxy, modeltransform: Matrix4_4, camera3D: Camera3D) {
            this._helpMatrix.identity();
            this._helpMatrix.copyFrom(camera3D.viewMatrix);

            //start
            this._helpMatrix.transformVector(this._posStart, this._helpVector);
            this.materialData.colorGradientsSource[0] = this._helpVector.x;
            this.materialData.colorGradientsSource[1] = this._helpVector.y;
            this.materialData.colorGradientsSource[2] = this._helpVector.z;

            //end
            this._helpMatrix.transformVector(this._posEnd, this._helpVector);
            this.materialData.colorGradientsSource[3] = this._helpVector.x;
            this.materialData.colorGradientsSource[4] = this._helpVector.y;
            this.materialData.colorGradientsSource[5] = this._helpVector.z;

            //color
            this.materialData.colorGradientsSource[6] = this._color.r;
            this.materialData.colorGradientsSource[7] = this._color.g;
            this.materialData.colorGradientsSource[8] = this._color.b;
            this.materialData.colorGradientsSource[9] = this._color.a;

            context3DProxy.uniform1fv(usage["uniform_colorGradientsSource"], this.materialData.colorGradientsSource);
        }

    }
}