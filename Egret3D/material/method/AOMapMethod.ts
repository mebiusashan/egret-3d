module egret3d {

    /**
    * @class egret3d.AOMapMethod
    * @classdesc
    * AO贴图渲染方法。
    * 使用渲染好的AO贴图进行渲染，增加渲染表现效果。
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class AOMapMethod extends MethodBase {

        private aoPower: number = 1.0; 
        private texture: ITexture;
        /**
        * @language zh_CN
        * 创建AO贴图方法
        * @param texture AO贴图
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor(texture: ITexture) {
            super();
            this.fsShaderList[ShaderPhaseType.shadow_fragment] = this.fsShaderList[ShaderPhaseType.shadow_fragment] || [];
            this.fsShaderList[ShaderPhaseType.shadow_fragment].push("AOMap_fs");

            this.lightTexture = texture;
        }

        /**
        * @language zh_CN
        * 设置AO贴图
        * @param texture AO贴图
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set lightTexture(texture: ITexture) {
            this.texture = texture;
            this.materialData.aoTexture = this.texture;
            this.materialData.textureChange = true; 
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
            usage["aoPower"] = context3DProxy.getUniformLocation(usage.program3D, "aoPower"); 
        }
        
        /**
        * @private
        */
        public activeState(time: number, delay: number, usage: PassUsage, geometry: SubGeometry, context3DProxy: Context3DProxy, modeltransform: Matrix4_4, camera3D: Camera3D) {
            context3DProxy.uniform1f(usage["aoPower"], this.aoPower);
        }

        /**
        * @language zh_CN
        * @private
        */
        public dispose() {
        }
    }
} 