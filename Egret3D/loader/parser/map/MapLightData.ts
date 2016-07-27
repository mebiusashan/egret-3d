module egret3d {

    /**
    * @private
    * @language zh_CN
    * @class egret3d.MapLightData
    * @classdesc
    * 顶光数据
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class MapLightData {

        public id: number = 0;
        /**
         * @language zh_CN
         * 灯光类型
         * @version Egret 3.0
         * @platform Web,Native
         */
        public type: number = 0;
        /**
         * @language zh_CN
         * diffuseColor
         * @version Egret 3.0
         * @platform Web,Native
         */
        public diffuseColor: number = 0xffffff;

        /**
         * @language zh_CN
         * ambientColor
         * @version Egret 3.0
         * @platform Web,Native
         */
        public ambientColor: number = 0xffffff;

        /**
         * @language zh_CN
         * 强度
         * @version Egret 3.0
         * @platform Web,Native
         */
        public intensity: number = 1.0;

        /**
         * @language zh_CN
         * 强度的一半
         * @version Egret 3.0
         * @platform Web,Native
         */
        public halfIntensity: number = 0.0;

        public direction: Vector3D = new Vector3D(-0.5, -0.6, 0.2);
        public position: Vector3D = new Vector3D();

        /**
         * @language zh_CN
         * 衰减值
         * @version Egret 3.0
         * @platform Web,Native
         */
        public falloff: number = 0.0;

        /**
         * @language zh_CN
         * 半径数据
         * @version Egret 3.0
         * @platform Web,Native
         */
        public radius: number = 100;
    }
}