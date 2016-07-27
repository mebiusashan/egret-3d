module egret3d {
   
     /**
    * @class egret3d.DirectLight
    * @classdesc
    *   
    * 灯光组。</p>
    * 把需要使用的灯光，放入一个组里面，然后给材质进行渲染。
    * @see egret3d.Object3D
    * @see egret3d.LightBase
    * @see egret3d.PointLight
    * @see egret3d.SpotLight
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class LightGroup {

        /**
        * @language zh_CN  
        * 灯光个数
        * @version Egret 3.0
        * @platform Web,Native
        */
        public lightNum: number = 0;

        /**
        * @language zh_CN  
        * 方向光列表
        * @version Egret 3.0
        * @platform Web,Native
        */
        public directLightList: Array<DirectLight>;

        /**
        * @language zh_CN  
        * 聚光灯列表
        * @version Egret 3.0
        * @platform Web,Native
        */
        public spotLightList: Array<SpotLight>;

        /**
        * @language zh_CN  
        * 点光源列表
        * @version Egret 3.0
        * @platform Web,Native
        */
        public pointLightList: Array<PointLight>;

        /**
        * @language zh_CN
        * 创建一个灯光组
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor() {
            this.directLightList = new Array<DirectLight>();
            this.spotLightList = new Array<SpotLight>();
            this.pointLightList = new Array<PointLight>();
        }

        /**
        * @language zh_CN
        * 为灯光组,添加一个灯光
        * @param light Light
        * @version Egret 3.0
        * @platform Web,Native
        */
        public addLight(light: LightBase) {
            switch (light.lightType){
                case LightType.directlight:
                    this.directLightList.push(<DirectLight>light);
                    this.lightNum++;
                    break;

                case LightType.pointlight:
                    this.pointLightList.push(<PointLight>light);
                    this.lightNum++;
                    break;

                case LightType.spotLightlight:
                    this.spotLightList.push(<SpotLight>light);
                    this.lightNum++;
                    break;
            }
        }
                
        /**
        * @private
        * @language zh_CN
        * 删除一个灯光
        * @param light Light
        * @version Egret 3.0
        * @platform Web,Native
        */
        public removeLight(light: LightBase) {
            switch (light.lightType) {
                case LightType.directlight:
                    var index: number = this.directLightList.indexOf(<DirectLight>light);
                    if (index >= 0 && index < this.directLightList.length) {
                        this.directLightList.splice(index, 1);
                        this.lightNum--;
                    }
                    break;
                case LightType.pointlight:
                    var index: number = this.pointLightList.indexOf(<PointLight>light);
                    if (index >= 0 && index < this.pointLightList.length) {
                        this.pointLightList.splice(index, 1);
                        this.lightNum--;
                    }
                    break;
                case LightType.spotLightlight:
                    var index: number = this.spotLightList.indexOf(<SpotLight>light);
                    if (index >= 0 && index < this.spotLightList.length) {
                        this.spotLightList.splice(index, 1);
                        this.lightNum--;
                    }
                    break;
            }
        }
    }
} 