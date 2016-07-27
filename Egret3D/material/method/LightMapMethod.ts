module egret3d {
    
    /**
    * @class egret3d.LightmapMethod
    * @classdesc
    * 实现lightmap渲染方法。
    * 在三维软件里实现打好光，然后渲染把场景各表面的光照输出到贴图上。
    * 然后使用模型的第2UV，渲染出Lightmap效果，lightmap贴图需要自己烘焙。
    * @see egret3d.MethodBase
    * @includeExample material/method/LightmapMethod.ts
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class LightmapMethod extends MethodBase {

        private texture: ITexture;
        /**
        * @language zh_CN
        * 创建一个LightmapMethod对象
        * @param useSpecularPower 是否使用高功率，默认参数为true
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor( useSpecularPower:boolean = true ) {
            super();

            this.vsShaderList[ShaderPhaseType.local_vertex] = this.vsShaderList[ShaderPhaseType.local_vertex] || [];
            this.vsShaderList[ShaderPhaseType.local_vertex].push("secondaryUV_vs");

            if (useSpecularPower){
                this.fsShaderList[ShaderPhaseType.shadow_fragment] = this.fsShaderList[ShaderPhaseType.shadow_fragment] || [];
                this.fsShaderList[ShaderPhaseType.shadow_fragment].push("lightMapSpecularPower_fs");
            } else {
                this.fsShaderList[ShaderPhaseType.shadow_fragment] = this.fsShaderList[ShaderPhaseType.shadow_fragment] || [];
                this.fsShaderList[ShaderPhaseType.shadow_fragment].push("lightMap_fs");
            }
        }

        /**
        * @language zh_CN
        * 设置lightmap贴图
        * @param texture lightmap贴图
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set lightTexture(texture: ITexture) {
            this.texture = texture;
            if (this.materialData.lightTexture != this.texture) {
                this.materialData.lightTexture = this.texture;
                this.materialData.lightTexture.useMipmap = false;
                this.materialData.textureChange = true;
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
            
        }

        /**
        * @private
        * @language zh_CN
        */
        public activeState(time: number, delay: number, usage: PassUsage, geometry: SubGeometry, context3DProxy: Context3DProxy, modeltransform: Matrix4_4, camera3D: Camera3D) {
        }


    }
}