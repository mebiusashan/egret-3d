module egret3d {

    /**
     * @private
     * @class egret3d.MaterialData
     */
    export class MaterialData extends Object {
        /**
        * @private
        * @language zh_CN
        * 材质类型数组。
        * @每个材质球可能会有很多种贴图方法，而这个是做为默认支持的材质方法的添加通道。要使用的方法
        * @default MaterialType.DIFFUSE
        * @version Egret 3.0
        * @platform Web,Native
        */
        public shaderPhaseTypes: { [passID: number]: ShaderPhaseType[] } = {}; 

        /**
        * @language zh_CN
        * 深度 pass usage data。
        * @version Egret 3.0
        * @platform Web,Native
        */
        //public depthPassUsageData: PassUsage = new PassUsage(); 

        /**
        * @language zh_CN
        * 法线 pass usage 数据。
        * @version Egret 3.0
        * @platform Web,Native
        */
        //public normalPassUsageData: PassUsage = new PassUsage(); 

        /**
        * @language zh_CN
        * position pass usage 数据。
        * @version Egret 3.0
        * @platform Web,Native
        */
        //public positionPassUsageData: PassUsage = new PassUsage(); 

        /**
        * @language zh_CN
        * post pass usage 数据。
        * @version Egret 3.0
        * @platform Web,Native
        */
        //public postPassUsageData: PassUsage = new PassUsage(); 

        /**
        * @language zh_CN
        * 灯光 pass usage 数据。
        * @version Egret 3.0
        * @platform Web,Native
        */
        //public lightPassUsageData: PassUsage = new PassUsage(); 

        /**
        * @language zh_CN
        * 阴影 pass usage 数据。
        * @version Egret 3.0
        * @platform Web,Native
        */
        //public shadowPassUsageData: PassUsage = new PassUsage(); 

        /**
        * @language zh_CN
        * 材质球ID。
        * <p> 一个合成材质球，可以多维合成，用于标记 subGeometry 所用的材质方法
        * @version Egret 3.0
        * @platform Web,Native
        */
        public matID: number = 0;

        /**
        * @language zh_CN
        * 渲染模式。
        * @default DrawMode.TRIANGLES
        * @version Egret 3.0
        * @platform Web,Native
        */
        public drawMode: number = DrawMode.TRIANGLES; 

        /**
        * @language zh_CN
        * 渲染模式。
        * @default DrawMode.TRIANGLES
        * @version Egret 3.0
        * @platform Web,Native
        */
        public useMipmap: boolean = true;

        /**
        * @language zh_CN
        * 阴影贴图。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public shadowMapTexture: ITexture;

        /**
        * @language zh_CN
        * 漫反射贴图。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public diffuseTexture: ITexture;//= CheckerboardTexture.texture ;

        /**
        * @language zh_CN
        * 法线贴图。
        * @default CheckerboardTexture.texture
        * @version Egret 3.0
        * @platform Web,Native
        */
        public normalTexture: ITexture = CheckerboardTexture.texture;

        /**
        * @language zh_CN
        * matCapTexture。
        * @default CheckerboardTexture.texture
        * @version Egret 3.0
        * @platform Web,Native
        */
        public matcapTexture: ITexture = CheckerboardTexture.texture;

        /**
        * @language zh_CN
        * 特效贴图。
        * @default CheckerboardTexture.texture
        * @version Egret 3.0
        * @platform Web,Native
        */
        public specularTexture: ITexture = CheckerboardTexture.texture;

        /**
        * @language zh_CN
        * 灯光贴图。
        * @default CheckerboardTexture.texture
        * @version Egret 3.0
        * @platform Web,Native
        */
        public lightTexture: ITexture = CheckerboardTexture.texture ;


        /**
        * @language zh_CN
        * 遮罩贴图。
        * @default CheckerboardTexture.texture
        * @version Egret 3.0
        * @platform Web,Native
        */
        public maskTexture: ITexture = CheckerboardTexture.texture;

        /**
        * @language zh_CN
        * ao 贴图。
        * @default CheckerboardTexture.texture
        * @version Egret 3.0
        * @platform Web,Native
        */
        public aoTexture: ITexture = CheckerboardTexture.texture;

        /**
        * @language zh_CN
        * 环境贴图。
        * @default CheckerboardTexture.texture
        * @version Egret 3.0
        * @platform Web,Native
        */
        public environmentTexture: ITexture = CheckerboardTexture.texture;


        /**
        * @language zh_CN
        * mask 贴图。
        * @default CheckerboardTexture.texture
        * @version Egret 3.0
        * @platform Web,Native
        */
        public blendMaskTexture: ITexture = CheckerboardTexture.texture;

        /**
        * @language zh_CN
        * splat_0 贴图。
        * @default CheckerboardTexture.texture
        * @version Egret 3.0
        * @platform Web,Native
        */
        public splat_0Tex: ITexture = CheckerboardTexture.texture;

        /**
        * @language zh_CN
        * splat_1 贴图。
        * @default CheckerboardTexture.texture
        * @version Egret 3.0
        * @platform Web,Native
        */
        public splat_1Tex: ITexture = CheckerboardTexture.texture;

        /**
        * @language zh_CN
        * splat_2 贴图。
        * @default CheckerboardTexture.texture
        * @version Egret 3.0
        * @platform Web,Native
        */
        public splat_2Tex: ITexture = CheckerboardTexture.texture;

        /**
        * @language zh_CN
        * splat_3 贴图。
        * @default CheckerboardTexture.texture
        * @version Egret 3.0
        * @platform Web,Native
        */
        public splat_3Tex: ITexture = CheckerboardTexture.texture;

        /**
        * @language zh_CN
        * layer。
        * @default 0
        * @version Egret 3.0
        * @platform Web,Native
        */
        public layer: number = 0;

        /**
        * @language zh_CN
        * 投射阴影 。
        * @default false
        * @version Egret 3.0
        * @platform Web,Native
        */
        public castShadow: boolean = false;

        /**
        * @language zh_CN
        * 接受阴影。
        * @default true
        * @version Egret 3.0
        * @platform Web,Native
        */
        public acceptShadow: boolean = true;


        /**
        * @language zh_CN
        * 阴影颜色
        * @version Egret 3.0
        * @platform Web,Native
        */
        public shadowColor: Float32Array = new Float32Array([0.5, 0.5, 0.6]);

        /**
        * @language zh_CN
        * 深度测试 。
        * @default true
        * @version Egret 3.0
        * @platform Web,Native
        */
        public depthTest: boolean = true;

        /**
        * @language zh_CN
        * 深度测试模式
        * @default true
        * @version Egret 3.0
        * @platform Web,Native
        */
        public depthMode: number = 0;

        /**
        * @language zh_CN
        * 是否平滑 。
        * @default true
        * @version Egret 3.0
        * @platform Web,Native
        */
        public smooth: boolean = true; 

        /**
        * @language zh_CN
        * 混合模式 。
        * @default BlendMode.NORMAL
        * @version Egret 3.0
        * @platform Web,Native
        */
        public blendMode: BlendMode = BlendMode.NORMAL; 

        /**
        * @language zh_CN
        * blend_src 值。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public blend_src: number;

        /**
        * @language zh_CN
        * blend_dest 值。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public blend_dest: number;

        /**
        * @language zh_CN
        * alphaBlending。
        * @default false
        * @version Egret 3.0
        * @platform Web,Native
        */
        public alphaBlending: boolean = false; 

        /**
        * @language zh_CN
        * ambientColor 值。
        * @default 0x0
        * @version Egret 3.0
        * @platform Web,Native
        */
        public ambientColor: number = 0x333333;

        /**
        * @language zh_CN
        * diffuseColor 值。
        * @default 0xffffff
        * @version Egret 3.0
        * @platform Web,Native
        */
        public diffuseColor: number = 0xffffff;

        /**
        * @language zh_CN
        * specularColor 值。
        * @default 0xffffff
        * @version Egret 3.0
        * @platform Web,Native
        */
        public specularColor: number = 0xffffff;

        /**
        * @language zh_CN
        * 材质球的高光强度。
        * @default 8.0
        * @version Egret 3.0
        * @platform Web,Native
        */
        public specularLevel: number = 4.0;

        /**
        * @language zh_CN
        * 材质球的光滑度。
        * @default 8.0
        * @version Egret 3.0
        * @platform Web,Native
        */
        public gloss: number = 20.0;

        /**
        * @language zh_CN
        * cutAlpha 值。
        * @default 0.7
        * @version Egret 3.0
        * @platform Web,Native
        */
        public cutAlpha: number = 0.7;

       

        /**
        * @language zh_CN
        * 是否重复。
        * @default false
        * @version Egret 3.0
        * @platform Web,Native
        */
        public repeat: boolean = false;


        /**
        * @language zh_CN
        * bothside 值。
        * @default false
        * @version Egret 3.0
        * @platform Web,Native
        */
        public bothside: boolean = false;

        /**
        * @language zh_CN
        * alpha 值。
        * @default 1.0
        * @version Egret 3.0
        * @platform Web,Native
        */
        public alpha: number = 1.0;

        /**
        * @language zh_CN
        * 光照光滑程度，会影响反光的面积，强度。
        * @default 1.0
        * @version Egret 3.0
        * @platform Web,Native
        */
        //public roughness: number = 1.0; 

        
       /**
        * @language zh_CN
        * 反射颜色的强度值，出射光照的出射率。
        * @default 1.0
        * @version Egret 3.0
        * @platform Web,Native
        */
        public albedo: number = 0.95; 

        /**
        * @language zh_CN
        * 高光亮度的强度值,设置较大的值会让高光部分极亮。
        * @default 1.0
        * @version Egret 3.0
        * @platform Web,Native
        */
        public specularScale: number = 1.0; 
        public normalScale: number = 1.0; 

        /**
        * @language zh_CN
        * uv 在贴图上的映射区域，值的范围限制在0.0~1.0之间。
        * @default 1.0
        * @version Egret 3.0
        * @platform Web,Native
        */
        public uvRectangle: Rectangle = new Rectangle(0, 0, 1, 1);

        /**
        * @language zh_CN
        * ambientPower 值。
        * @default 1.0
        * @version Egret 3.0
        * @platform Web,Native
        */
        //public ambientPower: number = 1.0; 

        /**
        * @language zh_CN
        * diffusePower。
        * @default 1.0
        * @version Egret 3.0
        * @platform Web,Native
        */
        //public diffusePower: number = 1.0; 

        /**
        * @language zh_CN
        * normalPower 值。
        * @default 1.0
        * @version Egret 3.0
        * @platform Web,Native
        */
        //public normalPower: number = 1.0; 

        /**
        * @language zh_CN
        * 材质数据需要变化。
        * @default true
        * @version Egret 3.0
        * @platform Web,Native
        */
        public materialDataNeedChange: boolean = true;
        

        /**
        * @language zh_CN
        * 纹理变化。
        * @default false
        * @version Egret 3.0
        * @platform Web,Native
        */
        public textureChange: boolean = false; 

        /**
        * @language zh_CN
        * 纹理状态需要更新。
        * @default false
        * @version Egret 3.0
        * @platform Web,Native
        */
        public textureStateChage: boolean = true; 

        /**
        * @language zh_CN
        * cullFrontOrBack。
        * @default Egret3DDrive.BACK
        * @version Egret 3.0
        * @platform Web,Native
        */
        public cullFrontOrBack: number = ContextConfig.BACK;

        //data
        /**
         * @language zh_CN
         */
        public materialSourceData: Float32Array = new Float32Array(20);//20
        public materialSourceData2: Float32Array = new Float32Array(20);//20
        /**
         * @language zh_CN
         */
        public colorGradientsSource: Float32Array = new Float32Array(10);//10 xyz xyz rgba
        /**
        * @language zh_CN
        * 颜色变化信息。
        * @default false
        * @version Egret 3.0
        * @platform Web,Native
        */
        public colorTransform: ColorTransform = new ColorTransform();
        /**
         * @language zh_CN
         */
        public directLightData: Float32Array; 
        /**
         * @language zh_CN
         */
        public sportLightData: Float32Array;
        /**
         * @language zh_CN
         */
        public pointLightData: Float32Array;

        /**
        * @language zh_CN
        * 克隆方法。
        * @returns {MaterialData}
        * @version Egret 3.0
        * @platform Web,Native
        */
        public clone(): MaterialData {

            var data: MaterialData = new MaterialData();
            //data.depthPassUsageData = this.depthPassUsageData;
            //data.normalPassUsageData = this.normalPassUsageData;
            //data.positionPassUsageData = this.positionPassUsageData;
            //data.postPassUsageData = this.positionPassUsageData;
            //data.lightPassUsageData = this.positionPassUsageData;
            //data.shadowPassUsageData = this.positionPassUsageData;
            //data.textureChange = true;
            //data.textureMethodTypes = this.textureMethodTypes;

            data.drawMode = this.drawMode;
            //data.context3D = this.context3D;
            data.diffuseTexture = this.diffuseTexture;
            //data.specularTex = this.specularTex;
            //data.lightMapTex = this.lightMapTex;
            //data.environmentMapTex = this.environmentMapTex;
            data.shadowMapTexture = this.shadowMapTexture;

            for (var i: number = 0; i < 3; ++i) {
                data.shadowColor[i] = this.shadowColor[i];
            }
            //data.splat_0Tex = this.splat_0Tex;
            //data.splat_1Tex = this.splat_1Tex;
            //data.splat_2Tex = this.splat_2Tex;
            //data.splat_3Tex = this.splat_3Tex;

            data.layer = this.layer;
            data.castShadow = this.castShadow;
            data.acceptShadow = this.acceptShadow;
            data.depthTest = this.depthTest;
            data.smooth = this.smooth;
            data.blendMode = this.blendMode;
            data.blend_src = this.blend_src;
            data.blend_dest = this.blend_dest;

            data.ambientColor = this.ambientColor;
            data.diffuseColor = this.diffuseColor;
            data.specularColor = this.specularColor;
           
            data.cutAlpha = this.cutAlpha;
            data.alpha = this.alpha;
           
            data.specularLevel = this.specularLevel;
            data.gloss = this.gloss;
            data.albedo = this.albedo;

            data.specularScale = this.specularScale;
            data.materialDataNeedChange = this.materialDataNeedChange;
            data.textureChange = true;

            data.cullFrontOrBack = this.cullFrontOrBack;

            data.colorTransform = this.colorTransform;

            //material state
            return data;
        }

        /**
        * @language zh_CN
        * 销毁。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public dispose() {

            //if (this.depthPassUsageData)
            //    this.depthPassUsageData.dispose();
            //if (this.normalPassUsageData)
            //    this.normalPassUsageData.dispose();
            //if (this.normalPassUsageData)
            //    this.normalPassUsageData.dispose();
            //if (this.positionPassUsageData)
            //    this.positionPassUsageData.dispose();
            //if (this.postPassUsageData)
            //    this.postPassUsageData.dispose();
            //if (this.lightPassUsageData)
            //    this.lightPassUsageData.dispose();
            //if (this.shadowPassUsageData)
            //    this.shadowPassUsageData.dispose();

            //if (this.directLightList.length > 0) {
            //    this.directLightList.length = 0;
            //    this.directLightList = null;
            //}
            //if (this.sportLightList.length > 0) {
            //    this.sportLightList.length = 0;
            //    this.sportLightList = null;
            //}
            //if (this.pointLightList.length > 0) {
            //    this.pointLightList.length = 0;
            //    this.pointLightList = null;
            //}

        }
    }
}  