module egret3d {

    /**
    * @class egret3d.TerrainARGBMethod
    * @classdesc
    * 地形贴图混合渲染方法。
    * 使用一张贴图中的ARGB色来进行4张贴图进行混合。
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class TerrainARGBMethod extends MethodBase {

        private controlTex: ITexture;
        private splat_0: ITexture;
        private splat_1: ITexture;
        private splat_2: ITexture;
        private splat_3: ITexture;

        private uvs: Float32Array = new Float32Array(8);

        /**
        * @language zh_CN
        * 创建地形贴图混合渲染方法 
        * @param controlTex 混合贴图
        * @param splat_0 第一张贴图
        * @param splat_1 第二张贴图
        * @param splat_2 第三张贴图
        * @param splat_3 第四张贴图
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor(controlTex: ITexture, splat_0: ITexture, splat_1: ITexture, splat_2: ITexture, splat_3: ITexture) {
            super();

            this.fsShaderList[ShaderPhaseType.diffuse_fragment] = this.fsShaderList[ShaderPhaseType.diffuse_fragment] || [];
            this.fsShaderList[ShaderPhaseType.diffuse_fragment].push("terrainRGBA_fragment");

            this.controlTex = controlTex;
            this.splat_0 = splat_0;
            this.splat_1 = splat_1;
            this.splat_2 = splat_2;
            this.splat_3 = splat_3;

            this.uvs[0] = 1.0; 
            this.uvs[1] = 1.0; 
            this.uvs[2] = 1.0; 
            this.uvs[3] = 1.0; 
            this.uvs[4] = 1.0; 
            this.uvs[5] = 1.0; 
            this.uvs[6] = 1.0; 
            this.uvs[7] = 1.0; 
        }

        /**
        * @language zh_CN
        * 设置 UVTitling。
        * @param index {Number} 图层索引
        * @param x {Number} u 的重复次数
        * @param y {Number} v 的重复次数
        * @version Egret 3.0
        * @platform Web,Native
        */
        public setUVTitling(index: number, x: number, y: number) {
            this.uvs[index * 2] = x;
            this.uvs[index * 2+1] = y;
        }

        /**
        * @language zh_CN
        * 设置第一张贴图
        * @param texture 贴图
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set splat_0_Texture(texture: ITexture) {
            this.splat_0 = texture;
            this.materialData.splat_0Tex = texture; 
            this.materialData.textureChange = true; 
        }

        /**
        * @language zh_CN
        * 设置第二张贴图
        * @param texture 贴图
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set splat_1_Texture(texture: ITexture) {
            this.splat_1 = texture;
            this.materialData.splat_1Tex = texture;
            this.materialData.textureChange = true; 

        }

        /**
        * @language zh_CN
        * 设置第三张贴图
        * @version Egret 3.0
        * @platform Web,Native
        * @param texture 贴图
        */
        public set splat_2_Texture(texture: ITexture) {
            this.splat_2 = texture;
            this.materialData.splat_2Tex = texture;
            this.materialData.textureChange = true; 
        }

        /**
        * @language zh_CN
        * 设置第四张贴图
        * @param texture 贴图
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set splat_3_Texture(texture: ITexture) {
            this.splat_3 = texture;
            this.materialData.splat_3Tex = texture;
            this.materialData.textureChange = true; 
        }


        /**
        * @language zh_CN
        * 设置混合贴图
        * @param texture 贴图
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set controlTexture(texture: ITexture) {
            this.controlTex = texture;
            this.materialData.blendMaskTexture = texture;
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
            usage["uvs"] = context3DProxy.getUniformLocation(usage.program3D, "uvs"); 
        }
        
        /**
        * @language zh_CN
        * @private
        */
        public activeState(time: number, delay: number, usage: PassUsage, geometry: SubGeometry, context3DProxy: Context3DProxy, modeltransform: Matrix4_4, camera3D: Camera3D) {
            context3DProxy.uniform1fv(usage["uvs"], this.uvs);
        }

        /**
        * @language zh_CN
        * @private
        */
        public dispose() {
        }
    }
} 