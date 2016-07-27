module egret3d {

    /**
    * @private
    * @class egret3d.CubeMethod
    * @classdesc
    * @see egret3d.MethodBase
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class CubeMethod extends MethodBase {

        private texture: ITexture;
        /**
        * @language zh_CN
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor() {
            super();


            this.vsShaderList[ShaderPhaseType.global_vertex] = this.fsShaderList[ShaderPhaseType.global_vertex] || [];
            this.vsShaderList[ShaderPhaseType.global_vertex].push("cube_vertex");

            this.fsShaderList[ShaderPhaseType.diffuse_fragment] = this.fsShaderList[ShaderPhaseType.diffuse_fragment] || [];
            this.fsShaderList[ShaderPhaseType.diffuse_fragment].push("cube_fragment");
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