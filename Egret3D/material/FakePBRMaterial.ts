module egret3d {

    /**
    * @language zh_CN
    * @class egret3d.TextureMaterial
    * @classdesc
    * 纹理材质。
    * 标准的贴图材质球，可以设置三种贴图， diffuse ， normal ， speclar 贴图
    * 材质球中默认不设置纹理，显示的黑白棋盘格
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class FakePBRMaterial extends MaterialBase {

        private _fakePBR: FakePBRPass; 
        /**
         * @language zh_CN
         * 创建一个新的 TextureMaterial 对象。
         * @param texture 用来渲染的贴图，默认会给出一张棋盘格贴图
         * @param materialData 材质数据信息，可以不指定
         * @version Egret 3.0
         * @platform Web,Native
         */
        constructor(texture: ITexture = null, materialData: MaterialData = null) {
            super(materialData);

            if (!texture) {
                this.diffuseTexture = CheckerboardTexture.texture;
            } else {
                this.diffuseTexture = texture;
            }

            this.initMatPass();
        }

        protected initMatPass() {
            //this.addPass(PassType.diffusePass);
            this._fakePBR = new FakePBRPass(this.materialData);
            this.materialData.shaderPhaseTypes[PassType.diffusePass] = [];
            this.passes[PassType.diffusePass] = [this._fakePBR];
        }

        //albedoTex;
        public set albedoTexture(tex: ITexture) {
            this._fakePBR.setTexture("albedoTex", tex );
        }
        //normalTex;
        public set normalTexture(tex: ITexture) {
            this._fakePBR.setTexture("normalTex", tex);
        }
        //glossTex;
        public set glossTexture(tex: ITexture) {
            this._fakePBR.setTexture("glossTex", tex);
        }
        //specularTex;
        public set specularTexture(tex: ITexture) {
            this._fakePBR.setTexture("specularTex", tex);
        }
        //opacityTex;
        public set opacityTexture(tex: ITexture) {
            this._fakePBR.setTexture("opacityTex ", tex);
        }
        //reflectionMapTex;
        public set reflectionTexture(tex: ITexture) {
            this._fakePBR.setTexture("reflectionMap", tex);
        }

        /**
         * @language zh_CN
         * 克隆方法。
         * 将材质球克隆一份，公用shader着色器和贴图，不公用参数
         * @returns {TextureMaterial}
         * @version Egret 3.0
         * @platform Web,Native
         */
        public clone(): TextureMaterial {
            var mat: TextureMaterial = new TextureMaterial(this.diffuseTexture, this.materialData.clone());
            return mat;
        }
    }
} 