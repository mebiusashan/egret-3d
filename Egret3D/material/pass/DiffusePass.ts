module egret3d {

    /**
    * @private
    */
    export class DiffusePass extends MaterialPass {

        constructor(materialData: MaterialData) {
            super(materialData);
            this._passID = PassType.diffusePass;
        }

        /**
        * @language zh_CN
        * @private
        * 初始化 UseMethod。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public initUseMethod(animation: IAnimation, geom: Geometry) {
            super.initUseMethod(animation, geom);
        }
    }
} 