module egret3d {

    /**
    * @class egret3d.DirectLight
    * @classdesc
    *   
    * 点光源
    * 所有的灯光基本要素 灯光的颜色，强度，位置，方向
    * 颜色的色值均是16进制 red:0xffff0000 argb的定义模式
    * 每个材质球所能最大使用的灯光建议别太多，能省则省，尤其是移动端，能用灯光缓存图 lightmap 最好
    * 点光源是游戏中常常用到的动态光源，实时渲染中，灯光的数量会直接影响渲染性能
    * @see egret3d.Object3D
    * @see egret3d.LightGroup
    * @see egret3d.LightBase
    * @see egret3d.PointLight
    * @see egret3d.SpotLight
    * @includeExample lights/PointLight.ts
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class PointLight extends LightBase {

        private scenePosMat: Matrix4_4 = new Matrix4_4();
        private static scenePos: Vector3D = new Vector3D();
        /**
         * @language zh_CN
         * @private
         * 点光源的数据长度 
         */
        public static stride: number = 12;

        /**
        * @language zh_CN
        * 创建一个点光源
        * @param color 灯光颜色值
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor(color: number) {
            super();
            this.lightType = LightType.pointlight;
            this.diffuse = color;
        }

        /**
        * @language zh_CN
        * 设置灯光半径
        * @param value 灯光半径
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set radius(value: number) {
            this._radius = value;
        }

        /**
        * @language zh_CN
        * 获取灯光半径
        * @returns number 灯光半径
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get radius(): number {
            return this._radius;
        }

        /**
        * @language zh_CN
        * 设置灯光衰减度
        * @param value 灯光衰减度
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set cutoff(value: number) {
            this._cutoff = value;
        }

        /**
        * @language zh_CN
        * 获取灯光衰减度
        * @returns number 灯光衰减度
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get cutoff(): number {
            return this._cutoff;
        }

        /**
          * @language zh_CN
          *  
          * 背光颜色
          * 模拟间接光照而开发的背光，而不用去同时打两盏不同方向的组合灯光，可以优化显示效果
          * @param color 背光颜色色值
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
        * @private
        * 更新灯光数据
        * @param index 灯光ID
        * @param lightData 灯光数据
        */
        public updateLightData(camera: Camera3D, index: number, lightData: Float32Array) {
            lightData[index * PointLight.stride] = this.globalPosition.x;
            lightData[index * PointLight.stride + 1] = this.globalPosition.y;
            lightData[index * PointLight.stride + 2] = this.globalPosition.z;

            lightData[index * PointLight.stride + 3] = this._diffuse.x * this._intensity ;
            lightData[index * PointLight.stride + 4] = this._diffuse.y * this._intensity ;
            lightData[index * PointLight.stride + 5] = this._diffuse.z * this._intensity;

            lightData[index * PointLight.stride + 6] = this._ambient.x ;
            lightData[index * PointLight.stride + 7] = this._ambient.y ;
            lightData[index * PointLight.stride + 8] = this._ambient.z ;

            lightData[index * PointLight.stride + 9] = this._intensity;
            lightData[index * PointLight.stride + 10] = this._radius;
            lightData[index * PointLight.stride + 11] = this._cutoff;
        }
    }
} 