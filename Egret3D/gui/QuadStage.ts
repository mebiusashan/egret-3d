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

        public quadList: Quad[] = [];

        constructor(view3D: View3D) {
            super();
            this._view3D = view3D;
            this._guiEventFire = new GUIEventFire(this);
            this._textureGroup = new GUITextureGroup();
        }


        public registerTexture(texture: Texture): boolean {
            return this._textureGroup.register(texture);
        }

        private creatQuadMesh() {
            var quadMesh: QuadMesh = new QuadMesh(this._quadMeshs.length * QuadStage.moreQuad);
            this._quadMeshs.push(quadMesh);
            this._view3D.camera3D.addChild(quadMesh);
        }

        private getChildQuads(displayObject: DisplayObject, quadChilds: Quad[]) {
            var i: number = 0;
            var tempDisplayObject: DisplayObject;

            /*判断当前 displayObject 类型,优先放入*/
            displayObject.init();
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

        public addChild(displayObject: DisplayObject) {
            if (!displayObject) {
                throw Error("This object is null");
            }
            if (displayObject.parent) {
                throw Error("parent isn't null");
            }
            this._childList.push(displayObject);
            displayObject.activeFromStage(this);
            this.setRenderListInvalid();
        }


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

        public removeChild(quad: DisplayObject) {
            var index: number = this._childList.indexOf(quad);
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


            quad.activeFromStage(null);
            this.setRenderListInvalid();
        }

        public update(time: number, delay: number, context3DProxy: Context3DProxy, view3D: View3D) {

            if (this._renderListInvalid) {
                this._renderListInvalid = false;
                this.updateRenderList();
            }

            Context3DProxy.gl.disable(Context3DProxy.gl.DEPTH_TEST);

            this._guiEventFire.fire();
            var i: number;
            var index: number;
            var len: number = this.quadList.length;
            var quad: QuadMesh;
            for (i = 0; i < len; i++) {
                //update by zoon
                index = (i - (i % QuadStage.moreQuad)) / QuadStage.moreQuad;
                this.quadList[i].update(time, delay, i % QuadStage.moreQuad, this._quadMeshs[index].geometry, view3D, i);
            }

            //clear data
            this.clearInvalidVertices(len);

            for (i = 0; i < this._quadMeshs.length; i++) {
                quad = this._quadMeshs[i];
                quad.geometry.upload(Egret3DCanvas.context3DProxy, Context3DProxy.gl.DYNAMIC_DRAW);
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