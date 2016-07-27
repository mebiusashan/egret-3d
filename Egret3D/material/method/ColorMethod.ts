module egret3d {

    /**
    * @private
    * @class egret3d.ColorMethod
    * @classdesc
    * @see egret3d.MethodBase
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class ColorMethod extends MethodBase {

        /**
        * @language zh_CN
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor() {
            super();

            this.fsShaderList[ShaderPhaseType.diffuse_fragment] = this.fsShaderList[ShaderPhaseType.diffuse_fragment] || [];
            this.fsShaderList[ShaderPhaseType.diffuse_fragment].push("color_fragment");
        }

        /**
        * @private
        */
        public upload(time: number, delay: number, usage: PassUsage, geometry: SubGeometry, context3DProxy: Context3DProxy, modeltransform: Matrix4_4, camera3D: Camera3D) {
        }

        /**
        * @private
        * @language zh_CN
        */
        public activeState(time: number, delay: number, usage: PassUsage, geometry: SubGeometry, context3DProxy: Context3DProxy, modeltransform: Matrix4_4, camera3D: Camera3D) {
        }


    }
}