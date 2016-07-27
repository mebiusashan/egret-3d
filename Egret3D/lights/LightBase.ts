module egret3d {

    /**
    *@language zh_CN
    * @class egret3d.LightType
    *灯光类型
    * @version Egret 3.0
    * @platform Web,Native
    */
    export enum LightType {

        /**
        *@language zh_CN
        * 点光源
        * @version Egret 3.0
        * @platform Web,Native
        */
        pointlight,

        /**
        *@language zh_CN
        * 平行光
        * @version Egret 3.0
        * @platform Web,Native
        */
        directlight,

        /**
        *@language zh_CN
        * 聚光灯
        * @version Egret 3.0
        * @platform Web,Native
        */
        spotLightlight,
    }

    /**
    * @class egret3d.DirectLight
    * @classdesc
    * 灯光的基础类型。</p>
    * 所有的灯光基本要素 灯光的颜色，强度，位置，方向。</p>
    * 颜色的色值均是16进制 red:0xffff0000 argb的定义模式。</p>
    * 每个材质球所能最大使用的灯光建议别太多，能省则省，尤其是移动端，能用灯光缓存图 lightmap 最好。</p>
    * @see egret3d.Object3D
    * @see egret3d.LightGroup
    * @see egret3d.LightBase
    * @see egret3d.PointLight
    * @see egret3d.SpotLight
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class LightBase extends Object3D {

         /**
        *@language zh_CN 
        * 灯光在配置表中的id，用于和贴图建立绑定关系
        * @version Egret 3.0
        * @platform Web,Native
        */
        public lightId: Number = -1;
        /**
        *@language zh_CN 
        * 灯光类型
        * @version Egret 3.0
        * @platform Web,Native
        */
        public lightType: number = -1 ;
        /**
         * @language zh_CN  
         *@private
         * 环境颜色
         */
        protected _ambient: Vector3D = new Vector3D(0.0, 0.0, 0.0);
 
        /**
         * @language zh_CN  
         *@private
         * 漫反射  
         */
        protected _diffuse: Vector3D = new Vector3D(1.0, 1.0, 1.0);

        // /**
        // * @language zh_CN  
        // *@private
        // * 背光颜色
        // */
        //protected _halfColor: Vector3D = new Vector3D(1.0, 1.0, 1.0);
        /**
         * @language zh_CN
         *@private
         * 镜面反射  
         */
        protected _specular: Vector3D = new Vector3D(1.0, 1.0, 1.0);
        /**
         * @language zh_CN  
         *@private
         */
        protected _halfVector: Vector3D = new Vector3D(1.0, 1.0, 1.0 );


        /**
         * @language zh_CN
         *@private
         * @param value 强度
         */
        protected _intensity: number = 1;

        protected _radius = 100 ;
        protected _cutoff = 0.01 ;

         /**
         *@language zh_CN
         *@private
         * @param value 背光强度
         */
        protected _halfIntensity: number = 0.0;
 
        /**
         * @language zh_CN  
         *@private
         */
        protected _spotExponent: number = 1.1;

        /**
         * @language zh_CN  
         *@private
         */
        protected _spotCutoff: number = 0.7;
 
        /**
         * @language zh_CN  
         *@private
         */
        protected _spotCosCutoff: number = 0.1;

        /**
         * @language zh_CN  
         *@private
         */
        protected _constantAttenuation: number = 0.1;

        /**
         * @language zh_CN  
         *@private
         */
        protected _linearAttenuation: number = 0.1;

        /**
         * @language zh_CN  
         *@private
         */
        protected _quadraticAttenuation: number = 0.1;

        /**
         * @language zh_CN  
         *@private
         */
        public _lightIndex: number = -1;

        /**
         * @language zh_CN  
         *@private
         */
        protected len: number = 25;
     
        /**
         * @language zh_CN  
         *@private
         */
        protected _change: boolean = true;

        /**
         * @language zh_CN  
         *@private
         */
        protected lightViewPos: Vector3D = new Vector3D();

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
        * 设置灯光强度。</p>
        * 影响灯光的强弱显示，值的范围0~没有上限，但是值过大会导致画面过度曝光。</p>
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set intensity(value: number) {
            if (this._intensity != value){
                this._intensity = value;
                this._change = false;
            }
        }
        
        /**
        * @language zh_CN  
        * 得到灯光强度。</p>
        * 影响灯光的强弱显示，值的范围0~没有上限，但是值过大会导致画面过度曝光。</p>
        * @returns number 灯光强度
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get intensity(): number {
            return this._intensity;
        }

        /**
        * @language zh_CN  
        * 设置背光灯光强度。</p>
        * 影响背光灯光的强弱显示，值的范围0~没有上限，但是值过大会导致画面过度曝光。</p>
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set halfIntensity(value: number) {
            if (this._halfIntensity != value) {
                this._halfIntensity = value;
                this._change = false;
            }
        }
        
        /**
        * @language zh_CN  
        * 得到背光灯光强度。</p>
        * 影响背光灯光的强弱显示，值的范围0~没有上限，但是值过大会导致画面过度曝光。</p>
        * @returns number 背光灯光的强弱
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get halfIntensity(): number {
            return this._halfIntensity;
        }
                
        /**
        * @language zh_CN  
        * 设置灯光环境颜色。</p>
        * 物体在未受到光的直接照射的地方 模拟间接环境光颜色，会影响背光面的颜色。</p>
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set ambient(color: number) {
            this._ambient.w = (color >> 24 & 0xff) / 255;
            this._ambient.x = (color >> 16 & 0xff) / 255;
            this._ambient.y = (color >> 8 & 0xff) / 255;
            this._ambient.z = (color & 0xff) / 255;
            this._change = false;
        }
        
        /**
        * @language zh_CN  
        * 获取 灯光环境颜色。</p>
        * 物体在未受到光的直接照射的地方 模拟间接环境光颜色，会影响背光面的颜色。</p>
        * @returns number ambient  灯光环境颜色
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get ambient(): number {
            return 0;
        }
                        
        /**
        * @language zh_CN  
        * 设置灯光漫反射颜色。</p>
        * 直接影响最终灯光的颜色色值 16进制的颜色, 例如 red：0xffff0000。</p>
        * 也可以通过 diffusePower 来改变这个值的总体强弱
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set diffuse(color: number) {
            this._diffuse.w = (color >> 24 & 0xff) / 255;
            this._diffuse.x = (color >> 16 & 0xff) / 255;
            this._diffuse.y = (color >> 8 & 0xff) / 255;
            this._diffuse.z = (color & 0xff) / 255;
            this._change = false;
        }
                
        /**
        * @language zh_CN  
        * 设置灯光漫反射颜色。</p>
        * 直接影响最终灯光的颜色色值 16进制的颜色 例如 red：0xffff0000。</p>
        * 也可以通过 diffusePower 来改变这个值的总体强弱。</p>
        * @returns number diffuse
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get diffuse(): number {
            return 0;
        }
                                
        /**
        * @language zh_CN  
        * 设置灯光镜面高光反射颜色。</p>
        * 在灯光方向与物体和相机成一个反光角度的时候，就会产生反光，高光，而不同的物体会有不同的颜色色值，尤其是金属。</p>
        * 16进制的颜色 例如 red：0xffff0000。</p>
        * 也可以通过 specularPower 来改变这个值的总体强弱。</p>
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set specular(color: number) {
            this._specular.w = (color >> 24 & 0xff) / 255;
            this._specular.x = (color >> 16 & 0xff) / 255;
            this._specular.y = (color >> 8 & 0xff) / 255;
            this._specular.z = (color & 0xff) / 255;
            this._change = false;
        }
                        
        /**
        * @language zh_CN  
        * 在灯光方向与物体和相机成一个反光角度的时候，就会产生反光，高光，而不同的物体会有不同的颜色色值，尤其是金属。</p>
        * 16进制的颜色 例如 red：0xffff0000。</p>
        * 也可以通过 specularPower 来改变这个值的总体强弱。</p>
        * @returns number  灯光镜面高光反射颜色
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get specular(): number {
            return 0;
        }

        private init() {
            
        }

        /**
         * @language zh_CN
         * @private
         * 更新灯光数据
         * @param index 灯光ID
         * @param lightData 灯光数据
         */
        public updateLightData(camera:Camera3D,index:number, lightData: Float32Array) {
          
        }
    }
}