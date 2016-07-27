module egret3d {
    /**
    * @language zh_CN
    * @private
    * @class egret3d.MatSphereData
    * @classdesc
    * 材质球的特效数据
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class MatSphereData {
        /**
         * @language zh_CN
         * diffuse贴图的索引（name）
         * @version Egret 3.0
         * @platform Web,Native
         */
        public id: string = "";
        /**
         * @language zh_CN
         * diffuse贴图的索引（name）
         * @version Egret 3.0
         * @platform Web,Native
         */
        public diffuseTextureName: string = "";

        /**
         * @language zh_CN
         * normal贴图的索引（name）
         * @version Egret 3.0
         * @platform Web,Native
         */
        public normalTextureName: string = "";

        /**
         * @language zh_CN
         * specular贴图的索引（name）
         * @version Egret 3.0
         * @platform Web,Native
         */
        public specularTextureName: string = "";

        /**
        * @language zh_CN
        * matcap贴图的索引（name）
        * @version Egret 3.0
        * @platform Web,Native
        */
        public matcapTextureName: string = "";

        /**
         * @language zh_CN
         * diffuse的颜色，0xffffff格式
         * @version Egret 3.0
         * @platform Web,Native
         */
        public diffuseColor: number = 0;

        /**
         * @language zh_CN
         * ambient的颜色，0xffffff格式
         * @version Egret 3.0
         * @platform Web,Native
         */
        public ambientColor: number = 0;

        /**
         * @language zh_CN
         * specular的颜色，0xffffff格式
         * @version Egret 3.0
         * @platform Web,Native
         */
        public specularColor: number = 0;

        /**
         * @language zh_CN
         * 透明度
         * @version Egret 3.0
         * @platform Web,Native
         */
        public alpha: number = 0;

        /**
         * @language zh_CN
         * specular增强等级
         * @version Egret 3.0
         * @platform Web,Native
         */
        public specularLevel: number = 0;

        /**
         * @language zh_CN
         * 光泽系数
         * @version Egret 3.0
         * @platform Web,Native
         */
        public gloss: number = 0;

        /**
         * @language zh_CN
         * ambient的强度
         * @version Egret 3.0
         * @platform Web,Native
         */
        public ambientPower: number = 0;

        /**
         * @language zh_CN
         * diffuse的强度
         * @version Egret 3.0
         * @platform Web,Native
         */
        public diffusePower: number = 0;

        /**
         * @language zh_CN
         * normal的强度
         * @version Egret 3.0
         * @platform Web,Native
         */
        public normalPower: number = 0;

        /**
         * @language zh_CN
         * 是否产生阴影
         * @version Egret 3.0
         * @platform Web,Native
         */
        public castShadow: boolean = false;

        /**
         * @language zh_CN
         * 是否接受阴影
         * @version Egret 3.0
         * @platform Web,Native
         */
        public acceptShadow: boolean = false;

        /**
         * @language zh_CN
         * 是否平滑采样贴图
         * @version Egret 3.0
         * @platform Web,Native
         */
        public smooth: boolean = false;

        /**
         * @language zh_CN
         * 采样贴图的边缘是否重复
         * @version Egret 3.0
         * @platform Web,Native
         */
        public repeat: boolean = false;

        /**
         * @language zh_CN
         * 是否开启双面渲染
         * @version Egret 3.0
         * @platform Web,Native
         */
        public bothside: boolean = false;

        /**
         * @language zh_CN
         * 绘制模式设定
         * @version Egret 3.0
         * @platform Web,Native
         */
        public drawMode: number = 0;

        /**
         * @language zh_CN
         * 剔除模式设定
         * @version Egret 3.0
         * @platform Web,Native
         */
        public cullMode: number = 0;

        /**
         * @language zh_CN
         * 叠加模式
         * @version Egret 3.0
         * @platform Web,Native
         */
        public blendMode: number = 0;

        /**
         * @language zh_CN
         * alpha裁切值
         * @version Egret 3.0
         * @platform Web,Native
         */
        public cutAlpha: number = 0.7;

        /**
         * @language zh_CN
         * 材质球拥有的特效
         * @version Egret 3.0
         * @platform Web,Native
         */
        public methods: MatMethodData[] = [];

        public lightIds: Array<number> = [];

        /**
         * @language zh_CN
         * 材质球uv区域
         * @version Egret 3.0
         * @platform Web,Native
         */
        public uvRectangle: Rectangle = new Rectangle(0, 0, 1, 1);
    }
}