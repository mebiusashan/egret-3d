module egret3d {

    /**
    * @class egret3d.AlphaMaskMethod
    * @classdesc
    * 实现alpha遮罩渲染方法。
    * 该贴图的r通道被用于赋值到diffuse数据的alpha上面。
    * @see egret3d.MethodBase
    * @includeExample material/method/AlphaMaskMethod.ts
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class AlphaMaskMethod extends MethodBase {

        private texture: ITexture;
        /**
        * @language zh_CN
        * 创建一个AlphaMaskMethod对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor() {
            super();

            this.fsShaderList[ShaderPhaseType.shadow_fragment] = this.fsShaderList[ShaderPhaseType.shadow_fragment]|| [] ;
            this.fsShaderList[ShaderPhaseType.shadow_fragment].push("alphaMask_fs");
        }

        /**
        * @language zh_CN
        * 设置maskTexture贴图
        * @param texture maskTexture贴图
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set maskTexture(texture: ITexture) {
            this.texture = texture;
            this.materialData.maskTexture = this.texture;
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
        }

        /**
        * @private
        * @language zh_CN
        */
        public activeState(time: number, delay: number, usage: PassUsage, geometry: SubGeometry, context3DProxy: Context3DProxy, modeltransform: Matrix4_4, camera3D: Camera3D) {
        }


    }
}