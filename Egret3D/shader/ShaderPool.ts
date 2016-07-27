module egret3d {

    /**
    * @private
    */
    export class ShaderPool {
        //总shader的map容器
        static programlib: HashMap = new HashMap();
        static vsShaderHashMap: HashMap = new HashMap();
        static fsShaderHashMap: HashMap = new HashMap();

        private static context: Context3DProxy;
        constructor() {
            
        }

        public static register(context: Context3DProxy) {
            this.context = context;
        }

        public static getGPUShader( shaderType:number , shaderID:string , source:string ):Shader {
            var shader: Shader = this.vsShaderHashMap.getValue(shaderID);
            if (!shader) {
                shader = this.fsShaderHashMap.getValue(shaderID);
            }

            if (!shader) {
                if (shaderType == Shader.vertex) {
                    shader = this.context.creatVertexShader(source);
                    shader.id = shaderID;
                    this.vsShaderHashMap.add(shaderID, shader);
                } else if (shaderType == Shader.fragment) {
                    shader = this.context.creatFragmentShader(source);
                    shader.id = shaderID;
                    this.fsShaderHashMap.add(shaderID, shader);
                }
            }

            return shader;
        }

        public static getProgram(vs_shaderID: string, fs_shaderID: string): Program3D {

            var vsShader: Shader = this.vsShaderHashMap.getValue(vs_shaderID);
            var fsShader: Shader = this.fsShaderHashMap.getValue(fs_shaderID);
            var name: string = vsShader.id + "_" +  fsShader.id;
            var program3D: Program3D;
            if (this.programlib.isHas(name)) {
                program3D = this.programlib.getValue(name);
            } else {
                program3D = this.registerProgram(vsShader, fsShader);
                this.programlib.add(name,program3D);
            }
            return this.programlib.getValue(name);
        }

        private static unRegisterShader(list: Array<string>) {
            //to delet shader
        }

        private static registerProgram(vsShader: Shader, fsShader: Shader):Program3D {
            var program3D: Program3D = this.context.creatProgram(vsShader, fsShader);
            return program3D; 
        }

        private static unRegisterProgram(vsKey: string, fsKey: string) {
            //to delet program
        }
    }
}


  






      