module egret3d {

    /**
    * @private
    * @class egret3d.AlphaMaskMethod
    * @classdesc
    * 实现实时阴影渲染方法
    * @see egret3d.MethodBase
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class ShadowMethod extends MethodBase {

        constructor(material: MaterialBase) {
            super();
            this.materialData = material.materialData;

            this.vsShaderList[ShaderPhaseType.local_vertex] = this.vsShaderList[ShaderPhaseType.local_vertex] || [];
            this.vsShaderList[ShaderPhaseType.local_vertex].push("shadowMapping_vs");

            this.fsShaderList[ShaderPhaseType.shadow_fragment] = this.fsShaderList[ShaderPhaseType.shadow_fragment] || [];
            this.fsShaderList[ShaderPhaseType.shadow_fragment].push("shadowMapping_fs");
        }

        /**
        * @language zh_CN
        * 设置阴影贴图
        * @param texture 阴影贴图
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set shadowMapTexture(texture: ITexture) {
            if (this.materialData.shadowMapTexture != texture) {
                this.materialData.shadowMapTexture = texture;
                this.materialData.textureChange = true;
            }
        }

        /**
        * @language zh_CN
        * 获取阴影贴图
        * @returns ITexture 阴影贴图
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get shadowMapTexture(): ITexture {
            return this.materialData.shadowMapTexture;
        }

        /**
        * @private
        */
        public upload(time: number, delay: number, usage: PassUsage, geometry: SubGeometry, context3DProxy: Context3DProxy, modeltransform: Matrix4_4, camera3D: Camera3D) {
            //usage["uniform_ShadowMatrix"] = context3DProxy.getUniformLocation(usage.program3D, "uniform_ShadowMatrix");
        }

        /**
        * @private
        */

        public activeState(time: number, delay: number, usage: PassUsage, geometry: SubGeometry, context3DProxy: Context3DProxy, modeltransform: Matrix4_4, camera3D: Camera3D) {
            if (ShadowCast.instance.shadowCamera) {
                context3DProxy.uniformMatrix4fv(usage.uniform_ShadowMatrix.uniformIndex, false, ShadowCast.instance.shadowCamera.viewProjectionMatrix.rawData);
            }

            context3DProxy.uniform3fv(usage.uniform_ShadowColor.uniformIndex, this.materialData.shadowColor);
        }
    }
}