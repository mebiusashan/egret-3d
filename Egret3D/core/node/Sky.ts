module egret3d {
                    
    /**
    * @class egret3d.Sky
    * @classdesc
    * 场景中天空盒子，是6面体cube，以6张无缝结合的贴图构成.
    *
    * @see egret3d.CubeTexture
    * @see egret3d.CubeTextureMaterial
    *
    * 示例:
    * @version Egret 3.0
    * @platform Web,Native
    * @includeExample core/node/Sky.ts
    */
    export class Sky extends Mesh  {

        /**
        * @language zh_CN
        * 天空的摄像机
        * @version Egret 3.0
        * @platform Web,Native
        */
        public camera: Camera3D;

        /**
        * @language zh_CN
        * 构建一个天空盒子对象
        * @param geometry 天空模型数据
        * @param material 天空材质
        * @param camera 天空渲染相机
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor(geometry: Geometry, material: MaterialBase, camera: Camera3D = null) {
            super(geometry, material);
            this.camera = camera;
            material.cullMode = ContextConfig.FRONT;
            material.ambientColor = 0xffffff;
            if (!this.bound) {
                this.bound = this.buildBoundBox();
            }
        }
                        
        /**
        * @language zh_CN
        * 当前对象数据更新，只有在视锥内的对象才会执行此更新
        * @param camera 当前渲染的摄相机
        * @param time 当前时间
        * @param delay 每帧时间间隔
        * @version Egret 3.0
        * @platform Web,Native
        */
        public update(time: number, delay: number, camera: Camera3D) {
            super.update(time, delay, camera);
            if (this.camera) {
                this.position = this.camera.globalPosition;
            }
        }
    }
} 