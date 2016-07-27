module egret3d {
    /**
    * @language zh_CN
    * @private
    * @class egret3d.MaterialMethodData
    * @classdesc
    * 材质球的特效数据
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class MatMethodData {
        public static methodType: any = {
            lightmapMethod: "lightmapMethod",
            uvRollMethod: "uvRollMethod",
            mulUvRollMethod: "mulUvRollMethod",
            alphaMaskMethod: "alphaMaskMethod",
            streamerMethod: "streamerMethod",
            terrainARGBMethod: "terrainARGBMethod",
            waterWaveMethod: "waterWaveMethod",
            waterNormalMethod: "waterNormalMethod",
            particleUVRoll: "particleUVRoll",
        };

        public id: string = "";

        /**
         * @language zh_CN
         * 特效的类型
         * @version Egret 3.0
         * @platform Web,Native
         */
        public type: string = "";

        /**
         * @language zh_CN
         * 是否增强specular的强度
         * @version Egret 3.0
         * @platform Web,Native
         */
        public usePower: boolean = false;

        /**
         * @language zh_CN
         * 贴图索引数据（name）
         * @version Egret 3.0
         * @platform Web,Native
         */
        public texturesData: any = [];

        /**
         * @language zh_CN
         * u的滚动速度
         * @version Egret 3.0
         * @platform Web,Native
         */
        public uSpeed: number = 0;

        /**
         * @language zh_CN
         * v的滚动速度
         * @version Egret 3.0
         * @platform Web,Native
         */
        public vSpeed: number = 0;
    }
}