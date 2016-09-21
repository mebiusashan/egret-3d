module egret3d {

    /**
    * @private
    */
    export class PickPass extends MaterialPass {
        constructor(materialData: MaterialData) {
            super(materialData);
            this._passID = PassType.PickPass;
        }

        public initUseMethod(animation: IAnimation, geom: Geometry) {
            this._passChange = false;
            var i: number = 0;
            this._passUsage = new PassUsage();

            this._vs_shader_methods = {};
            this._fs_shader_methods = {};


            if (animation) {
                if (animation.skeletonAnimationController) {
                    this._passUsage.maxBone = animation.skeletonAnimationController.jointNum * 2;

                    this.addMethodShaders(this._passUsage.vertexShader, ["pickPass_skeleton_vs"]);
                }
            }
            else {
                this.addMethodShaders(this._passUsage.vertexShader, ["pickPass_vs"]);
            }


            this.addMethodShaders(this._passUsage.fragmentShader, ["pickPass_fs"]);
        }
    }
}