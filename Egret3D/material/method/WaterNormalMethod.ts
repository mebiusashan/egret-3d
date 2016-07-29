module egret3d {

    /**
    * @language zh_CN
    * @class egret3d.UVRollMethod
    * @classdesc
    * 用来实现水面波光粼粼的效果
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class WaterNormalMethod extends MethodBase {

        private _uvData: Float32Array = new Float32Array(8);

        private _time: number = 0.0;
        private _start: boolean = false;

        private _speedU_0: Point = new Point(-0.000009, 0.0);
        private _speedU_1: Point = new Point(0.00003, 0.0);

        private _distion_intensity : Point = new Point(0.05, 0.05);

        private _normalTexture_0: ITexture; 
        private _normalTexture_1: ITexture; 

        private _normal_0_UVScale: number = 4.0; 
        private _normal_1_UVScale: number = 4.0; 


        /** 
        * @private
        * @language zh_CN
        */
        constructor() {
            super();

            //##FilterBegin## ##Water##
            //##FilterEnd##
        }

        /**
        * @language zh_CN
        * 开始播放uv动画
        * @param rest 如果为ture就是重置播放
        * @version Egret 3.0
        * @platform Web,Native
        */
        public start(rest: boolean = false) {
            //##FilterBegin## ##Water##
            //##FilterEnd##
        }

        /**
        * @language zh_CN 
        * 停止播放uv动画
        * @version Egret 3.0
        * @platform Web,Native
        */
        public stop() {
            //##FilterBegin## ##Water##
            //##FilterEnd##
        }

        /**
        * @language zh_CN 
        * 设置UV 速度
        * @param index 0 或 1
        * @param u  
        * @param v 
        * @version Egret 3.0
        * @platform Web,Native
        */
        public setUvSpeed(index: number, u: number, v: number) {
            //##FilterBegin## ##Water##
            //##FilterEnd##
        }

        /**
        * @language zh_CN 
        * 设置UV repat次数
        * @param u  
        * @param v 
        * @version Egret 3.0
        * @platform Web,Native
        */
        public setUvScale(first: number, second: number) {
            //##FilterBegin## ##Water##
            //##FilterEnd##
        }

        /**
         * @language zh_CN
         * 设置lightmap贴图
         * @param texture lightmap贴图
         * @version Egret 3.0
         * @platform Web,Native
         */
        public set normalTextureA(texture: ITexture) {
            //##FilterBegin## ##Water##
            //##FilterEnd##
        }

        /**
         * @language zh_CN
         * 设置lightmap贴图
         * @param texture lightmap贴图
         * @version Egret 3.0
         * @platform Web,Native
         */
        public set normalTextureB(texture: ITexture) {
            //##FilterBegin## ##Water##
            //##FilterEnd##
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
            //##FilterBegin## ##Water##
            //##FilterEnd##
        }

        /**
        * @private
        * @language zh_CN
        */
        public activeState(time: number, delay: number, usage: PassUsage, geometry: SubGeometry, context3DProxy: Context3DProxy, modeltransform: Matrix4_4, camera3D: Camera3D) {
            //##FilterBegin## ##Water##
            //##FilterEnd##
        }
    }
}
