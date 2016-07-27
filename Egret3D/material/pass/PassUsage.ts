module egret3d {

     /**
     * @private
     * @class egret3d.MethodUsageData
     * @classdesc
     * 方法中需要用到的数据。
     * @version Egret 3.0
     * @platform Web,Native
     */
    export class PassUsage {

        /**
         * @language zh_CN
         */
        public uniform_1ivs: Array<GLSL.Uniform>;
        /**
         * @language zh_CN
         */
        public uniform_1fvs: Array<GLSL.Uniform>;

        /**
         * @language zh_CN
         */
        public uniform_2ivs: Array<GLSL.Uniform>;
        /**
         * @language zh_CN
         */
        public uniform_2fvs: Array<GLSL.Uniform>;

        /**
         * @language zh_CN
         */
        public uniform_3ivs: Array<GLSL.Uniform>;
        /**
         * @language zh_CN
         */
        public uniform_3fvs: Array<GLSL.Uniform>;

        /**
         * @language zh_CN
         */
        public uniform_4ivs: Array<GLSL.Uniform>;
        /**
         * @language zh_CN
         */
        public uniform_4fvs: Array<GLSL.Uniform>;
        //---------------------------------------------
        //---------------------------------------------
        /**
         * @language zh_CN
         */
        public attribute_position: GLSL.Attribute;

        /**
         * @language zh_CN
         */
        public attribute_normal: GLSL.Attribute;
        /**
         * @language zh_CN
         */
        public attribute_tangent: GLSL.Attribute;
        /**
         * @language zh_CN
         */
        public attribute_color: GLSL.Attribute;
        /**
         * @language zh_CN
         */
        public attribute_uv0: GLSL.Attribute;
        /**
         * @language zh_CN
         */
        public attribute_uv1: GLSL.Attribute;
        /**
         * @language zh_CN
         */
        public attribute_boneIndex: GLSL.Attribute;
        /**
         * @language zh_CN
         */
        public attribute_boneWeight: GLSL.Attribute;

        //---------------------------------------------
        //---------------[particle]--------------------
        /**
         * @language zh_CN
         */
        public attribute_offset: GLSL.Attribute;

        public attribute_billboardXYZ: GLSL.Attribute;

        public attribute_lifecycle: GLSL.Attribute;

        public attribute_direction: GLSL.Attribute;

        public attribute_speed: GLSL.Attribute;

        public attribute_startScale: GLSL.Attribute;

        public attribute_endScale: GLSL.Attribute;

        public attribute_startColor: GLSL.Attribute;

        public attribute_endColor: GLSL.Attribute;


        public attribute_rotate: GLSL.Attribute;
        /**
         * @language zh_CN
         */
        public attribute_acceleRotate: GLSL.Attribute;
        /**
         * @language zh_CN
         */
        public attribute_scale: GLSL.Attribute;
        /**
         * @language zh_CN
         */
        public attribute_acceleScale: GLSL.Attribute;

        /**
         * @language zh_CN
         */
        /**
         * @language zh_CN
         */
        public attribute_startSpaceLifeTime: GLSL.Attribute;
        //---------------------------------------------
        //---------------------------------------------


        /**
         * @language zh_CN
         */
        public varying_pos: GLSL.Attribute;
        /**
         * @language zh_CN
         */
        public varying_normal: GLSL.Attribute;
        /**
         * @language zh_CN
         */
        public varying_tangent: GLSL.Attribute;
        /**
         * @language zh_CN
         */
        public varying_color: GLSL.Attribute;
        /**
         * @language zh_CN
         */
        public varying_uv0: GLSL.Attribute;
        /**
         * @language zh_CN
         */
        public varying_uv1: GLSL.Attribute;
        /**
         * @language zh_CN
         */
        public varying_eyeNormal: GLSL.Attribute;
        /**
         * @language zh_CN
         */
        public varying_eyedir: GLSL.Attribute;

        /**
         * @language zh_CN
         */
        public TBN: GLSL.Attribute;
        
        /**
         * @language zh_CN
         */
        public uniform_ModelMatrix: GLSL.Uniform;
        /**
         * @language zh_CN
         */
        public uniform_ProjectionMatrix: GLSL.Uniform;
        /**
         * @language zh_CN
         */
        public uniform_ViewProjectionMatrix: GLSL.Uniform;
        /**
         * @language zh_CN
         */
        public uniform_ViewMatrix: GLSL.Uniform;
        /**
        * @language zh_CN
        */
        public uniform_ModelViewMatrix: GLSL.Uniform;
        /**
         * @language zh_CN
         */
        public uniform_NormalMatrix: GLSL.Uniform;
        /**
         * @language zh_CN
         */
        public uniform_ShadowMatrix: GLSL.Uniform;
        /**
         * @language zh_CN
         */
        public uniform_eyepos: GLSL.Uniform;
        
        /**
         * @language zh_CN
         */
        public uniform_PoseMatrix: GLSL.Uniform;

        /**
         * @language zh_CN
         */
        public uniform_sceneWidth: GLSL.Uniform;
        /**
         * @language zh_CN
         */
        public uniform_sceneHeight: GLSL.Uniform;

        /**
         * @language zh_CN
         */
        public uniform_time: GLSL.Uniform;

        /**
         * @language zh_CN
         */
        public uniform_cameraMatrix: GLSL.Uniform;

        public uniform_enableBillboardXYZ: GLSL.Uniform;

        public uniform_startColor: GLSL.Uniform;

        public uniform_endColor: GLSL.Uniform;

        public uniform_startScale: GLSL.Uniform;

        public uniform_endScale: GLSL.Uniform;

        public uniform_startRot: GLSL.Uniform;

        public uniform_endRot: GLSL.Uniform;

        /**
         * @language zh_CN
         */
        public sampler2DList: Array<GLSL.Sampler2D> = new Array<GLSL.Sampler2D>(); 
        /**
         * @language zh_CN
         */
        public sampler3DList: Array<GLSL.Sampler3D> = new Array<GLSL.Sampler3D>(); 

        /**
         * @language zh_CN
         */
        public uniform_materialSource: GLSL.Uniform;

        /**
         * @language zh_CN
         */
        public uniform_LightSource: GLSL.Uniform;
        /**
         * @language zh_CN
         */
        public uniform_lightModelSource: GLSL.Uniform;

        /**
         * @language zh_CN
         */
        public uniform_directLightSource:GLSL.Uniform;
        /**
         * @language zh_CN
         */
        public uniform_sportLightSource: GLSL.Uniform;
        /**
         * @language zh_CN
         */
        public uniform_pointLightSource:GLSL.Uniform ;
        /**
         * @language zh_CN
         */
        public uniform_skyLightSource: GLSL.Uniform;

        public uniform_ShadowColor: GLSL.Uniform;

        //----------------------------------------------
        //----------------------------------------------
        /**
         * @language zh_CN
         */
        public program3D: Program3D;
        /**
         * @language zh_CN
         */
        public vs_shader: Shader;
        /**
         * @language zh_CN
         */
        public fs_shader: Shader;
        //----------------------------------------------

        //public vertexShaderRegister: ver;
   
        public vertexShader: ShaderBase = new ShaderBase(Shader.vertex);
        public fragmentShader: ShaderBase = new ShaderBase(Shader.fragment);

        public maxDirectLight: number = 0;
        public maxSpotLight: number = 0;
        public maxPointLight: number = 0; 
        public maxBone: number = 0; 

        public directLightData: Float32Array ;
        public spotLightData: Float32Array ;
        public pointLightData: Float32Array;

        public attributeDiry: boolean = true;

        /**
         * @language zh_CN
         */
        public dispose() {
        }

    }
}