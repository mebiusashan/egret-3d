module egret3d {
    
    /**
    * @private
    */
    export class PositionPass extends MaterialPass {

        constructor(materialData: MaterialData) {
            super(materialData);
            this._passID = PassType.CubePass;
        }

        /**
        * @language zh_CN
        * @private
        * 初始化 UseMethod。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public initUseMethod(animation: IAnimation, geom: Geometry) {

            var i: number = 0;
            this._passChange = false;
            this._passUsage = new PassUsage();
            this._passUsage.vertexShader.shaderType = Shader.vertex;
            this._passUsage.fragmentShader.shaderType = Shader.fragment;

            //pre Phase ---------------------------------------------------
            if (animation) {
                // to add accept animation shader
                if (animation.skeletonAnimationController) {
                    this._passUsage.maxBone = animation.skeletonAnimationController.jointNum * 2;

                    this._vs_shader_methods[ShaderPhaseType.start_vertex] = [];
                    this._vs_shader_methods[ShaderPhaseType.start_vertex].push("skeleton_vs");
                }
                else if (animation.particleAnimationController) {
                    this._vs_shader_methods[ShaderPhaseType.start_vertex] = [];
                    this._vs_shader_methods[ShaderPhaseType.start_vertex].push("particle_vs");

                    //to change importent
                    this.addShaderPhase(this._passID, animation.particleAnimationController.particleAnimationState.vertex_shaders, this._vs_shader_methods);
                    this.addShaderPhase(this._passID, animation.particleAnimationController.particleAnimationState.fragment_shaders, this._fs_shader_methods);
                }
            }

            this._vs_shader_methods[ShaderPhaseType.end_vertex] = this._vs_shader_methods[ShaderPhaseType.end_vertex] || [];
            this._vs_shader_methods[ShaderPhaseType.end_vertex].push("positionEndPass_vs");

            this._fs_shader_methods[ShaderPhaseType.end_fragment] = this._fs_shader_methods[ShaderPhaseType.end_fragment] || [];
            this._fs_shader_methods[ShaderPhaseType.end_fragment].push("positionEndPass_fs");

            this.phaseEnd(animation);
        }
    }
} 