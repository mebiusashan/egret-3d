module egret3d {

    /**
	* @private
    * @language zh_CN
    * @class egret3d.EventManager
    * @classdesc
    * 事件管理。
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class EventManager {

        private _canvas: Egret3DCanvas;

        private _pickEvent3d: PickEvent3D;
        private _retRenderList: Array<IRender> = new Array<IRender>();

        private get _view3ds(): Array<View3D> {
            return this._canvas.view3Ds;
        }


        /**
        * @language zh_CN
        * 构造函数
        * @param canvas 画布
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor(canvas: Egret3DCanvas) {
            this._canvas = canvas;
            this._pickEvent3d = new PickEvent3D();

            Input.addEventListener(MouseEvent3D.MOUSE_CLICK, this.onMouseClick, this);
            Input.addEventListener(MouseEvent3D.MOUSE_DOWN, this.onMouseDown, this);
            Input.addEventListener(MouseEvent3D.MOUSE_UP, this.onMouseUp, this);
            Input.addEventListener(MouseEvent3D.MOUSE_MOVE, this.onMouseMove, this);

            Input.addEventListener(TouchEvent3D.TOUCH_START, this.onTouchDown, this);
            Input.addEventListener(TouchEvent3D.TOUCH_END, this.onTouchUp, this);
            Input.addEventListener(TouchEvent3D.TOUCH_MOVE, this.onTouchMove, this);
        }
      
        /**
        * @language zh_CN
        * 清理EventManager
        * @version Egret 3.0
        * @platform Web,Native
        */
        public onClear(): void {
            this._canvas = null;
        }
        /**
        * @language zh_CN
        * 清除绑定关系。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public onClearListeners() {

        }
        /**
         * @language zh_CN
         * 分发事件。
         * @param e {any} 事件参数
         * @param typeStr {string} 事件类型
         * @version Egret 3.0
         * @platform Web,Native
         */
        private sendEvent(e: any, typeStr: string, func: Function) {
            var canvas = this._canvas;
            if (!canvas) {
                return ;
            }
            for (var i = 0; i < this._view3ds.length; i++) {
                var view = this._view3ds[i];
                if (!view.entityCollect || !view.entityCollect.mousePickList) {
                    continue;
                }
                var collect = view.entityCollect.mousePickList;
                var ret: Array<IRender> = Picker.pickObject3DList(canvas, view, collect, false, this._retRenderList);
                var len = ret.length;
                if (len <= 0) {
                    continue;
                }
                var render: IRender = null;
                var dis: number = Number.MAX_VALUE;
                var temp_dis: number = 0;
                var object3d: Mesh = null;
                var mouseChilder: boolean = false;
                for (var j: number = 0; j < len; j++) {
                    object3d = <Mesh>ret[j];
                    temp_dis = Vector3D.distance(object3d.globalPosition, view.camera3D.globalPosition);
                    if (temp_dis < dis) {
                        dis = temp_dis;
                        render = ret[j];
                    }

                    if (object3d.mouseChilder) {
                        mouseChilder = object3d.mouseChilder;
                    }
                }

                if (ret.length > 0) {
                    if (ret.length == 1 && render) {
                        render.dispatchEvent(func.call(this, typeStr, e, render));
                    }
                    else {

                        if (mouseChilder) {
                            ret = Picker.pickObject3DList(canvas, view, ret, true, this._retRenderList);
                            dis = Number.MAX_VALUE;
                            len = ret.length;
                            if (len <= 0) {
                                if (render) {
                                    render.dispatchEvent(func.call(this, typeStr, e, render));
                                }
                            }
                            else {
                                render = null;
                                for (var j: number = 0; j < len; j++) {
                                    object3d = <Mesh>ret[j];
                                    temp_dis = Vector3D.distance(object3d.globalPosition, view.camera3D.globalPosition);
                                    if (temp_dis < dis) {
                                        dis = temp_dis;
                                        render = ret[j];
                                    }
                                }
                                if (render) {
                                    render.dispatchEvent(func.call(this, typeStr, e, render));
                                }
                            }
                        }
                        else {
                            if (render) {
                                render.dispatchEvent(func.call(this, typeStr, e, render));
                            }
                        }
                    }
                }
            }
        }

        private initPickEvent3D(typeStr: string, e: any, render: IRender): PickEvent3D {
            this._pickEvent3d.eventType = typeStr;
            this._pickEvent3d.target = render;
            this._pickEvent3d.data = e;
            this._pickEvent3d.pickResult = render.pickResult;
            return this._pickEvent3d;
        }

        private onTouchMove(e: TouchEvent3D) {
            this.sendEvent(e, PickEvent3D.PICK_MOVE, this.initPickEvent3D);
        }

        private onTouchUp(e: TouchEvent3D) {
            this.sendEvent(e, PickEvent3D.PICK_UP, this.initPickEvent3D);
        }

        private onTouchDown(e: TouchEvent3D) {
            this.sendEvent(e, PickEvent3D.PICK_DOWN, this.initPickEvent3D);
        }

        private onMouseClick(e: MouseEvent3D) {
            this.sendEvent(e, PickEvent3D.PICK_CLICK, this.initPickEvent3D);
        }

        private onMouseDown(e: MouseEvent3D) {
            this.sendEvent(e, PickEvent3D.PICK_DOWN, this.initPickEvent3D);
        }

        private onMouseUp(e: MouseEvent3D) {
            this.sendEvent(e, PickEvent3D.PICK_UP, this.initPickEvent3D);
        }

        private onMouseMove(e: MouseEvent3D) {
            this.sendEvent(e, PickEvent3D.PICK_MOVE, this.initPickEvent3D);
        }
    }
}   