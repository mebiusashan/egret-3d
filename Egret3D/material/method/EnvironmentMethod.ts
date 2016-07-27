module egret3d {

    /**
    * @language zh_CN
    * @class egret3d.UVRollMethod
    * @classdesc
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class EnvironmentMethod extends MethodBase {

        private texture: ITexture; 
        private reflectValue: number = 0.3;

        /**
        * @private
        * @language zh_CN
        */
        constructor() {
            super();

            //this.vsShaderList[ShaderPhaseType.start_vertex] = this.vsShaderList[ShaderPhaseType.start_vertex] || [];
            //this.vsShaderList[ShaderPhaseType.start_vertex].push("environmentDiffuse_vertex");

            this.fsShaderList[ShaderPhaseType.multi_end_fragment] = this.fsShaderList[ShaderPhaseType.multi_end_fragment] || [];
            this.fsShaderList[ShaderPhaseType.multi_end_fragment].push("environmentMapping_fragment");
        }


        /**
         * @language zh_CN
         * @param value 
         */
        public set reflect(value: number) {
            this.reflectValue = value;
        }

        /**
         * 
         * @returns number
         */
        public get reflect(): number {
            return this.reflectValue;
        }

        /**
         * @language zh_CN
         * @param texture 
         */
        public set environmentTexture(texture: ITexture) {
            this.texture = texture;
            if (texture) {
                if (this.materialData["environmentMapTex"] != this.texture) {
                    this.materialData["environmentMapTex"] = texture;
                    this.materialData.textureChange = true;
                }
            }
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
            usage["reflectValue"] = context3DProxy.getUniformLocation(usage.program3D, "reflectValue");
        }
        
        /**
        * @private
        * @language zh_CN
        */
        public activeState(time: number, delay: number, usage: PassUsage, geometry: SubGeometry, context3DProxy: Context3DProxy, modeltransform: Matrix4_4, camera3D: Camera3D) {
            context3DProxy.uniform1f(usage["reflectValue"], this.reflectValue);
        }
    }
}
