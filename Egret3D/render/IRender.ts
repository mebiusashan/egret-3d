module egret3d {
                                    
    /**
    * @class egret3d.IRender
    * @classdesc
    * 场景中的可见物体，可渲染的对象。
    * 在渲染之前会将渲染树中对象进行筛选.
    * 只有IRender对象才会进入渲染管线
    * @see egret3d.Object3D
    * @see egret3d.Geometry
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class IRender extends Object3D{


        /**
        * @language zh_CN
        * 构造函数
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor() {
            super();
        }

        /**
        * @language zh_CN
        * 网格信息。</p>
        * geometry 为渲染对象的网格信息 ，渲染对象需要 vertexBuffer  和 indexBuffer 信息 及顶点着色器shade。</p>
        * @version Egret 3.0
        * @platform Web,Native
        */
        public geometry: Geometry;

        /**
        * @language zh_CN
        * 材质信息。</p>
        * 赋予对象节点可供渲染的材质球属性，让对象加入可渲染实体列表，及渲染对象与对象之间的混合，排序。</p>
        * @version Egret 3.0
        * @platform Web,Native
        */
        public material: MaterialBase;

         /**
        * @language zh_CN
        * 对象类型。</p>
        * @version Egret 3.0
        * @platform Web,Native
        */
        public type: string ="" ;

        /**
        * @language zh_CN
        * 渲染排序的参数，数值越大，先渲染</p>
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get drawOrder(): number {
            return 0;
        }

        /**
        * @private
        * @version Egret 3.0
        * @platform Web,Native
        */
        public multiMaterial: { [matID: number]: MaterialBase } = {};

        /**
        * @private
        * @version Egret 3.0
        * @platform Web,Native
        */
        protected _materialCount: number = 0;

        /**
        * @language zh_CN
        * 动作对象，控制骨骼动画。</p>
        * 可拓展的动画功能属性，动画功能的驱动类总接口。</p>
        * @version Egret 3.0
        * @platform Web,Native
        */
        public animation: IAnimation = null;

        /**
        * @language zh_CN
        * 材质球收到光照影响的灯光组，如果需要动态添加删除灯光的，一定要注意时实性
        * @private
        * @version Egret 3.0
        * @platform Web,Native
        */
        public lightGroup: LightGroup;

        public update(time: number, delay: number, camera: Camera3D) {
            super.update(time, delay, camera);
        }
    }
}