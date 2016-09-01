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
    export class GUIMethod extends MethodBase {

        /**
        * @language zh_CN
        * 创建一个AlphaMaskMethod对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor() {
            super();

            this.vsShaderList[ShaderPhaseType.base_vertex] = this.vsShaderList[ShaderPhaseType.base_vertex]|| [] ;
            this.vsShaderList[ShaderPhaseType.base_vertex].push("gui_vs");

            this.fsShaderList[ShaderPhaseType.base_fragment] = this.fsShaderList[ShaderPhaseType.base_fragment] || [];
            this.fsShaderList[ShaderPhaseType.base_fragment].push("gui_fs");

        }

        /**
        * @language zh_CN
        * 设置lightmap贴图
        * @param texture lightmap贴图
        * @version Egret 3.0
        * @platform Web,Native
        */
        public setTextures(index: number, texture: ITexture) {
            var textureName: string = "uiTexture_" + index.toString(); 
            this.materialData[textureName] = texture;
            this.materialData[textureName].useMipmap = false;
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