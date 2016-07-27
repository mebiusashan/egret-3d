module egret3d {
    /**
     * @class egret3d.View3D
     * @classdesc
     * VRView3D 会把场景渲染成两个视口。
     * 两个视口是由不同的摄像机渲染出来的结果，也相当由左右眼。
     * @see egret3d.Camera3D
     * @see egret3d.Scene3D
     * @see egret3d.Egret3DCanvas
     * @version Egret 3.0
     * @platform Web,Native
     */
    export class VRView3D extends View3D {


        protected leftViewPort: Rectangle;
        protected rightViewPort: Rectangle;
                
        /**
        * @language zh_CN
        * 构建一个view3d对象
        * @param x 视口的屏幕x坐标
        * @param y 视口的屏幕y坐标
        * @param width 视口的屏幕宽度
        * @param height 视口的屏幕高度
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor(x: number, y: number, width: number, height: number) {
            super(x, y, width, height, new Camera3D(CameraType.VR));
            this.leftViewPort = new Rectangle();
            this.rightViewPort = new Rectangle();
            this.updateViewport();
        }

        protected updateViewport() {
            this.leftViewPort.x = this._viewPort.x;
            this.leftViewPort.y = this._viewPort.y;
            this.leftViewPort.width = this._viewPort.width / 2;
            this.leftViewPort.height = this._viewPort.height;

            this.rightViewPort.x = this._viewPort.x + this.leftViewPort.width;
            this.rightViewPort.y = this._viewPort.y;
            this.rightViewPort.width = this.leftViewPort.width;
            this.rightViewPort.height = this.leftViewPort.height;
        }

        /**
        * @language zh_CN
        * 设置当前视口的屏幕x坐标
        * @param x 视口的屏幕x坐标
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set x(value: number) {
            this._viewPort.x = value;
            this.updateViewport();
        }
                
        /**
        * @language zh_CN
        * 设置当前视口的屏幕y坐标
        * @param y 视口的屏幕y坐标
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set y(value: number) {
            this._viewPort.y = value;
            this.updateViewport();
        }
                
        /**
        * @language zh_CN
        * 设置视口的屏幕宽度
        * @param width 视口的屏幕宽度
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set width(value: number) {
            this._viewPort.width = value;
            this._camera.aspectRatio = this._viewPort.width / this._viewPort.height;
            this.updateViewport();
        }
    
        /**
        * @language zh_CN
        * 设置视口的屏幕高度
        * @param width 视口的屏幕高度
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set height(value: number) {
            this._viewPort.height = value;
            this._camera.aspectRatio = this._viewPort.width / this._viewPort.height;
            this.updateViewport();
        }

        /**
        * @private
        * @language zh_CN
        * @version Egret 3.0
        * @platform Web,Native
        */
        public update(time: number, delay: number) {
            this._entityCollect.update(this._camera);
          //  this._render.update(time, delay, this._entityCollect, this._camera);

            //------------------
            this._numberEntity = this._entityCollect.renderList.length;
            for (this._index = 0; this._index < this._numberEntity; this._index++) {
                this._entityCollect.renderList[this._index].update(time, delay, this._camera);
            }
            //------------------

            var viewPort: Rectangle = this.leftViewPort;
            this._camera.viewPort = viewPort;

            this._camera.tap(CameraType.VR, VRType.left);

            Egret3DCanvas.context3DProxy.viewPort(viewPort.x, viewPort.y, viewPort.width, viewPort.height);
            Egret3DCanvas.context3DProxy.setScissorRectangle(viewPort.x, viewPort.y, viewPort.width, viewPort.height);

            if (this._cleanParmerts & Context3DProxy.gl.COLOR_BUFFER_BIT) {
                Egret3DCanvas.context3DProxy.clearColor(this._backColor.x, this._backColor.y, this._backColor.z, this._backColor.w);
            }
            Egret3DCanvas.context3DProxy.clear(this._cleanParmerts);
            this._render.draw(time, delay, Egret3DCanvas.context3DProxy, this._entityCollect, this._camera);


            viewPort = this.rightViewPort;
            this._camera.viewPort = viewPort;
            this._camera.tap(CameraType.VR, VRType.right);

            Egret3DCanvas.context3DProxy.viewPort(viewPort.x, viewPort.y, viewPort.width, viewPort.height);
            Egret3DCanvas.context3DProxy.setScissorRectangle(viewPort.x, viewPort.y, viewPort.width, viewPort.height);

            if (this._cleanParmerts & Context3DProxy.gl.COLOR_BUFFER_BIT) {
                Egret3DCanvas.context3DProxy.clearColor(this._backColor.x, this._backColor.y, this._backColor.z, this._backColor.w);
            }
            Egret3DCanvas.context3DProxy.clear(this._cleanParmerts);
            this._render.draw(time, delay, Egret3DCanvas.context3DProxy, this._entityCollect, this._camera);
        }
                
        /**
        * @language zh_CN
        * 获取两只眼睛之间的距离
        * @returns number 眼睛之间的距离
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get eyeDistance(): number {
            return this._camera.eyeMatrix.eyeSpace;
        }
                
        /**
        * @language zh_CN
        * 设置两只眼睛之间的距离
        * @param eyeDis  两只眼睛之间的距离
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set eyeDistance(eyeDis: number) {
            this._camera.eyeMatrix.eyeSpace = eyeDis;
        }
    }
} 