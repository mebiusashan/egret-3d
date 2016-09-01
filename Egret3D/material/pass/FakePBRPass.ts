module egret3d {

    /**
    * @private
    */
    export class FakePBRPass extends MaterialPass {

        constructor(materialData: MaterialData) {
            super(materialData);
            this._passID = PassType.diffusePass;
        }

        public setTexture(name:string, texture: Texture) {
            this._materialData[name] = texture;
        }

        /**
        * @language zh_CN
        * @private
        * 初始化 UseMethod。
        * @version Egret 3.0
        * @platform Web,Native
        */
        //public initUseMethod(animation: IAnimation, geom: Geometry) {
        //    super.initUseMethod(animation, geom);
        //}

        public initUseMethod(animation: IAnimation, geom: Geometry) {
            this._passChange = false;
            var i: number = 0;
            this._passUsage = new PassUsage();

            this._vs_shader_methods = {};
            this._fs_shader_methods = {};

            if (this.lightGroup) {
                this._passUsage.maxDirectLight = this.lightGroup.directLightList.length;
                this._passUsage.maxSpotLight = this.lightGroup.spotLightList.length;
                this._passUsage.maxPointLight = this.lightGroup.pointLightList.length;

                //this._vs_shader_methods[ShaderPhaseType.local_vertex] = this._vs_shader_methods[ShaderPhaseType.local_vertex] || [];
                //this._fs_shader_methods[ShaderPhaseType.lighting_fragment] = [];
                //this._fs_shader_methods[ShaderPhaseType.lighting_fragment].push("lightingBase_fs");

                if (this.lightGroup.directLightList.length) {
                    this._passUsage.directLightData = new Float32Array(DirectLight.stride * this.lightGroup.directLightList.length);
                }
                //if (this.lightGroup.spotLightList.length) {
                //    this._passUsage.spotLightData = new Float32Array(SpotLight.stride * this.lightGroup.spotLightList.length);
                //    this._fs_shader_methods[ShaderPhaseType.lighting_fragment].push("spotLight_fragment");
                //}
                //if (this.lightGroup.pointLightList.length) {
                //    this._passUsage.pointLightData = new Float32Array(PointLight.stride * this.lightGroup.pointLightList.length);
                //    this._fs_shader_methods[ShaderPhaseType.lighting_fragment].push("pointLight_fragment");
                //}
            }

            //pre Phase ---------------------------------------------------
            this.addMethodShaders(this._passUsage.vertexShader, ["FakePBR_vs"]);
            this.addMethodShaders(this._passUsage.fragmentShader, ["materialSource_fs"]);
            this.addMethodShaders(this._passUsage.fragmentShader, ["FakePBR_fs"]);
        }
    }
}
