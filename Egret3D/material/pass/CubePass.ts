module egret3d {
    
    /**
    * @private
    */
    export class CubePass extends MaterialPass {

        constructor(materialData: MaterialData) {
            super(materialData);
            this._passID = PassType.CubePass;
        }

        /**
        * @language zh_CN
        * @private
        * 初始化 UseMethod。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public initUseMethod(animation: IAnimation, geom: Geometry) {
            this._passChange = false;

           // this._materialData.textureMethodTypes.push(TextureMethodType.color);

            var i: number = 0;

            this._passUsage = new PassUsage();

            this._passUsage.vertexShader.shaderType = Shader.vertex;
            this._passUsage.fragmentShader.shaderType = Shader.fragment;

            //if (this._materialData.textureMethodTypes.indexOf(TextureMethodType.color) != -1) {
                this._passUsage.vertexShader.addUseShaderName("cube_vertex");
                this._passUsage.fragmentShader.addUseShaderName("cube_fragment");
           // }
        }
    }
} 