module egret3d {

    /**
    * @class egret3d.ColorTransformMethod
    * @classdesc
    * 实现偏色渲染方法。
    * 将最终渲染的argb值按照这个transform进行修正。
    * @see egret3d.MethodBase
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class ColorTransformMethod extends MethodBase {
        /**
        * @language zh_CN
        * 创建一个ColorTransformMethod对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor() {
            super();

            this.fsShaderList[ShaderPhaseType.multi_end_fragment] = this.fsShaderList[ShaderPhaseType.multi_end_fragment] || [];
            this.fsShaderList[ShaderPhaseType.multi_end_fragment].push("colorTransform_fs");
        }

        /**
        * @language zh_CN
        * 设置transform数据
        * @param trasform ColorTransform
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set colorTransform(trasform: ColorTransform) {
            this.materialData.colorTransform = trasform;
        }

        public get colorTransform(): ColorTransform {
            return this.materialData.colorTransform;
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
            usage["uniform_colorTransformVec4"] = context3DProxy.getUniformLocation(usage.program3D, "uniform_colorTransformVec4");
            usage["uniform_colorTransformM44"] = context3DProxy.getUniformLocation(usage.program3D, "uniform_colorTransformM44");
        }

        /**
        * @private
        * @language zh_CN
        */
        public activeState(time: number, delay: number, usage: PassUsage, geometry: SubGeometry, context3DProxy: Context3DProxy, modeltransform: Matrix4_4, camera3D: Camera3D) {
            context3DProxy.uniform4fv(usage["uniform_colorTransformVec4"], this.colorTransform.vec4);
            context3DProxy.uniformMatrix4fv(usage["uniform_colorTransformM44"], false, this.colorTransform.m44.rawData);
        }


    }
}