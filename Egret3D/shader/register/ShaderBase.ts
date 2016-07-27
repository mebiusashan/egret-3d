module egret3d {

                                            
    /**
    * @private
    * @private
    * @class egret3d.ShaderBase
    * @classdesc
    * shader 基类
    */
    export class ShaderBase {
        

        protected index: number = 0;

        protected shadersName: Array<string> = new Array<string>();
        protected endShadername: string = "";
        protected stateChange: boolean = false;

        /**
        * @language zh_CN
        * 
        */
        public maxBone: number = 0;

        public shaderType: number = -1;

        public shader: Shader;
        /**
        * @language zh_CN
        * constructor
        * @param materialData
        * @param usage
        */
        constructor(type:number) {
            this.shaderType = type; 
        }

        /**
        * @language zh_CN
        * 
        * @param shaderName xxx
        */
        public addUseShaderName(shaderName: string) {
            this.shadersName.push(shaderName);
        }

        /**
        * @language zh_CN
        * 
        * @param shaderName xxx
        */
        public addEndShaderName(shaderName: string) {
            this.endShadername = shaderName ;
        }

        /**
        * @language zh_CN
        * 
        * @returns string
        */
        public getShader(passUsage:PassUsage):Shader {

            if (this.endShadername != "") {
                var index: number = this.shadersName.indexOf(this.endShadername);
                if (index == -1) {
                    this.shadersName.push(this.endShadername);
                }
            }

            return ShaderUtil.instance.fillShaderContent(this, this.shadersName, passUsage);
        }
    }
} 