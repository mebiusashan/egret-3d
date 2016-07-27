module egret3d {
                            
    /**
    * @private
    * @class egret3d.MultiRender
    * @classdesc
    * default render
    * 把所有需要渲染的对象，依次进行渲染
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class MultiRender extends RenderBase {
              
        private _renderItem: IRender; 

        private _i: number = 0;
        private _j: number = 0;

        private _pass: number; 

        /**
        * @language zh_CN
        * constructor
        */
        constructor( pass:number = PassType.diffusePass ) {
            super();
            this._pass = pass; 
        }

        /**
        * @language zh_CN
        * 把所有需要渲染的对象，依次进行渲染
        * @param time 当前时间
        * @param delay 每帧间隔时间
        * @param context3D 设备上下文
        * @param collect 渲染对象收集器
        * @param camera 渲染时的相机
        */
        public draw(time: number, delay: number, context3D: Context3DProxy, collect: CollectBase, camera: Camera3D, backViewPort: Rectangle = null, shadow: boolean = false) {
            this.numEntity = collect.renderList.length;

            if (this.renderTexture) {
                this.renderTexture.upload(context3D);
                context3D.setRenderToTexture(this.renderTexture.texture2D, true, 0);
            }
            var material: MaterialBase;
            for (this._renderIndex = 0; this._renderIndex < this.numEntity; this._renderIndex++) {
                this._renderItem = collect.renderList[this._renderIndex];
                if (shadow) {
                    if (!this._renderItem.material.castShadow) {
                        continue;
                    }
                    //ShadowCast.instance.calculateCamera(this._renderItem, camera);
                }

                this._renderItem.geometry.activeState(time, delay, Egret3DCanvas.context3DProxy, camera);
                for (this._i = 0; this._i < this._renderItem.geometry.subGeometrys.length; this._i++) {
                    var subGeometry = this._renderItem.geometry.subGeometrys[this._i];
                    var matID = subGeometry.matID;
                    material = this._renderItem.multiMaterial[matID] ;
                    if (material == null)
                        continue;

                    if (material.passes[this._pass]) {
                        for (this._j = material.passes[this._pass].length - 1; this._j >=0 ; this._j--){
                            material.passes[this._pass][this._j].draw(time, delay, context3D, this._renderItem.modelMatrix, camera, subGeometry, this._renderItem.animation);
                        }
                    } else if (PassUtil.PassAuto[this._pass]) {
                        for (this._j = material.passes[this._pass].length - 1; this._j >= 0; this._j--) {
                            material.passes[this._pass] = PassUtil.CreatPass(this._pass, material.materialData);
                            material.passes[this._pass][this._j].draw(time, delay, context3D, this._renderItem.modelMatrix, camera, subGeometry, this._renderItem.animation);
                        }
                    }
                }
            }

            if (this.renderTexture) {
                context3D.setRenderToBackBuffer();
                if (backViewPort) {
                    context3D.viewPort(backViewPort.x, backViewPort.y, backViewPort.width, backViewPort.height);
                    context3D.setScissorRectangle(backViewPort.x, backViewPort.y, backViewPort.width, backViewPort.height);
                }
            }
        }
    }
} 

