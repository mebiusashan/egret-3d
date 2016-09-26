module egret3d {

    /**
    * @private
    */
    export class QuadStage extends EventDispatcher {
        public static moreQuad: number = 500;


        private _childList: DisplayObject[] = [];
        private _quadMeshs: QuadMesh[] = [];
        private _quadCurHistory: number[] = [];
        private _quadLastHistory: number[] = [];
        private _textureGroup: GUITextureGroup;
        private _view3D: View3D;
        private _guiEventFire: GUIEventFire;
        private _renderListInvalid: boolean = false;
        private _guiContainer: Object3D;
        public quadList: Quad[] = [];

        constructor(view3D: View3D) {
            super();
            this._view3D = view3D;
            this._guiEventFire = new GUIEventFire(this);
            this._textureGroup = new GUITextureGroup();
            this._guiContainer = new Object3D();
            this.changeCamera();
        }

        /**
        * @language zh_CN
        * 注册ui用到的贴图素材源，最多7张。
        * @param texture gui所用到的贴图
        * @version Egret 3.0
        * @platform Web,Native
        */
        public registerTexture(texture: Texture): boolean {
            return this._textureGroup.register(texture);
        }

        public changeCamera() {
            if (this._guiContainer.parent)
                this._guiContainer.parent.removeChild(this._guiContainer);
            this._view3D.camera3D.addChild(this._guiContainer);
        }

        private creatQuadMesh() {
            var quadMesh: QuadMesh = new QuadMesh(this._quadMeshs.length * QuadStage.moreQuad);
            this._quadMeshs.push(quadMesh);
            this._guiContainer.addChild(quadMesh);
        }

        private getChildQuads(displayObject: DisplayObject, quadChilds: Quad[]) {
            var i: number = 0;
            var tempDisplayObject: DisplayObject;

            /*判断当前 displayObject 类型,优先放入*/
            var quad: Quad;
            if (displayObject instanceof Quad) {
                // add to quad list
                quad = <Quad>displayObject;
                quadChilds.push(quad);
            }

            /*获取最深的显示对象*/
            while (i < displayObject.childs.length) {
                tempDisplayObject = displayObject.childs[i++];
                this.getChildQuads(tempDisplayObject, quadChilds);
            }
        }

        /**
        * @language zh_CN
        * 添加孩子到舞台上
        * @param object 添加的2d显示对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        public addChild(object: DisplayObject) {
            if (!object) {
                throw Error("This object is null");
            }
            if (object.parent) {
                throw Error("parent isn't null");
            }
            this._childList.push(object);
            object.activeStage(this);
            object.parentIsStage = true;
            this.setRenderListInvalid();
        }

        /**
        * @language zh_CN
        * 标记当前渲染队列需要重新计算
        * @version Egret 3.0
        * @platform Web,Native
        */
        public setRenderListInvalid(): void {
            this._renderListInvalid = true;
        }

        private updateRenderList() {
            this.quadList.length = 0;
            for (var i: number = 0; i < this._childList.length; i++) {
                this.getChildQuads(this._childList[i], this.quadList);
            }
            // if quadMesh not enough then creat new 
            if (this.quadList.length > this._quadMeshs.length * QuadStage.moreQuad) {
                var less: number = Math.ceil((this.quadList.length / QuadStage.moreQuad)) - this._quadMeshs.length;
                for (var i: number = 0; i < less; i++) {
                    this.creatQuadMesh();
                }
            }
        }

        /**
        * @language zh_CN
        * 从舞台上移除某个孩子节点
        * @param object 添加的2d显示对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        public removeChild(object: DisplayObject) {
            var index: number = this._childList.indexOf(object);
            if (index != -1) {
                this._childList.splice(index, 1);
            }
            //if (quad instanceof Quad) {
            //    if (this.quadList.length < this.quadMeshs.length * QuadStage.moreQuad) {
            //        var tempQuadMesh: QuadMesh = (this.quadMeshs.splice(this.quadMeshs.length - 1, 1))[0];
            //        this._view3D.camera3D.removeChild(tempQuadMesh);
            //        tempQuadMesh.dispose();
            //    }
            //}


            object.activeStage(null);
            object.parentIsStage = false;
            this.setRenderListInvalid();
        }

        /**
        * @language zh_CN
        * 在渲染之前逻辑更新，每帧执行一次
        * @param time 当前运行的总时间
        * @param delay 振间隔时间
        * @param context3DProxy 上下文引用
        * @param view3D 视图引用
        * @version Egret 3.0
        * @platform Web,Native
        */
        public update(time: number, delay: number, context3DProxy: Context3DProxy, view3D: View3D) {
            //collect render list
            if (this._renderListInvalid) {
                this._renderListInvalid = false;
                this.updateRenderList();
            }
            Context3DProxy.gl.disable(Context3DProxy.gl.DEPTH_TEST);

            //update data
            var i: number;
            var len: number = this.quadList.length;
            for (i = 0; i < len; i++) {
                this.quadList[i].update(time, delay);
            }
            //fire mouse event
            this._guiEventFire.fire();

            //update by zoon
            var geometryIndex: number;
            for (i = 0; i < len; i++) {
                geometryIndex = Math.floor(i / QuadStage.moreQuad);
                this.quadList[i].updateVertices(i % QuadStage.moreQuad, this._quadMeshs[geometryIndex].geometry, i);
            }

            //clear data
            this.clearInvalidVertices(len);

            //upload vertex data
            var quad: QuadMesh;
            for (i = 0; i < this._quadMeshs.length; i++) {
                quad = this._quadMeshs[i];
                quad.geometry.upload(context3DProxy, Context3DProxy.gl.DYNAMIC_DRAW);
                this._textureGroup.activeTexture(quad);
            }

            Context3DProxy.gl.enable(Context3DProxy.gl.DEPTH_TEST);

        }



        private clearInvalidVertices(count: number): void {
            this._quadCurHistory.length = 0;
            var index: number = 0;
            while (count >= QuadStage.moreQuad) {
                this._quadCurHistory[index] = QuadStage.moreQuad;
                count -= QuadStage.moreQuad;
                index++;
            }
            if (count > 0) {
                this._quadCurHistory[index] = count;
            }
            
            count = this._quadMeshs.length;
            var lastCount: number = 0;
            var currentCount: number = 0;

            for (index = 0; index < count; index++) {
                lastCount = this._quadLastHistory[index] || 0;
                currentCount = this._quadCurHistory[index] || 0;
                if (currentCount < lastCount) {
                    //clear at index
                    for (var i: number = currentCount; i < lastCount; i++) {
                        Quad.clear(i, this._quadMeshs[index].geometry);
                    }
                }
            }
            //交换保存的数据
            var temp: any = this._quadCurHistory;
            this._quadCurHistory = this._quadLastHistory;
            this._quadLastHistory = temp;
        }















        //------------------
        //mouse event
        public dispatchMuseDown() {
            if (this.hasEventListener(MouseEvent3D.MOUSE_DOWN)) {
                var mouseEvent: MouseEvent3D = new MouseEvent3D(MouseEvent3D.MOUSE_DOWN);
                mouseEvent.target = this;
                this.dispatchEvent(mouseEvent);
            }
        }

        public dispatchMuseUp() {
            if (this.hasEventListener(MouseEvent3D.MOUSE_UP)) {
                var mouseEvent: MouseEvent3D = new MouseEvent3D(MouseEvent3D.MOUSE_UP);
                mouseEvent.target = this;
                this.dispatchEvent(mouseEvent);
            }
        }

        public dispatchMuseClick() {
            if (this.hasEventListener(MouseEvent3D.MOUSE_CLICK)) {
                var mouseEvent: MouseEvent3D = new MouseEvent3D(MouseEvent3D.MOUSE_CLICK);
                mouseEvent.target = this;
                this.dispatchEvent(mouseEvent);
            }
        }

        public dispatchMuseMove() {
            if (this.hasEventListener(MouseEvent3D.MOUSE_MOVE)) {
                var mouseEvent: MouseEvent3D = new MouseEvent3D(MouseEvent3D.MOUSE_MOVE);
                mouseEvent.target = this;
                this.dispatchEvent(mouseEvent);
            }
        }

        public dispatchMouseOut() {
            if (this.hasEventListener(MouseEvent3D.MOUSE_OUT)) {
                var mouseEvent: MouseEvent3D = new MouseEvent3D(MouseEvent3D.MOUSE_OUT);
                mouseEvent.target = this;
                this.dispatchEvent(mouseEvent);
            }
        }

        public dispatchMouseOver() {
            if (this.hasEventListener(MouseEvent3D.MOUSE_OVER)) {
                var mouseEvent: MouseEvent3D = new MouseEvent3D(MouseEvent3D.MOUSE_OVER);
                mouseEvent.target = this;
                this.dispatchEvent(mouseEvent);
            }
        }

    }
}