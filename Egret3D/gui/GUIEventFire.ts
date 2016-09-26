module egret3d {
       /**
    * @private
    */
    export class GUIEventFire {

        private _finalist: DisplayObject[];
        private _mouseList: DisplayObject[];
        private _quadStage: QuadStage;
        constructor( quadStage:QuadStage ) {
            this._mouseList = [];
            this._quadStage = quadStage;

            Input.addEventListener(MouseEvent3D.MOUSE_DOWN, this.mouseDown, this);
            Input.addEventListener(MouseEvent3D.MOUSE_UP, this.mouseUp, this);
            Input.addEventListener(MouseEvent3D.MOUSE_OVER, this.mouseOver, this);
            Input.addEventListener(MouseEvent3D.MOUSE_CLICK, this.mouseClick, this);
            Input.addEventListener(MouseEvent3D.MOUSE_MOVE, this.mouseMove, this);
            Input.addEventListener(MouseEvent3D.MOUSE_OUT, this.mouseOut, this);

            Input.addEventListener(TouchEvent3D.TOUCH_START, this.mouseDown, this);
            Input.addEventListener(TouchEvent3D.TOUCH_END, this.mouseUp, this);
            Input.addEventListener(TouchEvent3D.TOUCH_MOVE, this.mouseMove, this);
        }

        private dispatchMouseEvent(eventType: string) {
            //todo 事件冒泡加入捕获阶段
            //todo 事件阻断机制
            var list = this.getMousePickList();
            var target: DisplayObject;
            var currentTraget: DisplayObject;
            if (list.length === 0) {
                //当没有任何对象被点击时. 抛出舞台事件
                var evt: MouseEvent3D = new MouseEvent3D(eventType);
                evt.target = this._quadStage;
                evt.currentTarget = this._quadStage;
                this._quadStage.dispatchEvent(evt);
                return;
            }
            target = list[0];//最上层显示对象
            currentTraget = target;

            while (currentTraget) {
                var event: MouseEvent3D = new MouseEvent3D(eventType);
                event.target = target;
                event.currentTarget = currentTraget;
                currentTraget.dispatchEvent(event);
                if (!currentTraget.parentIsStage) {
                    currentTraget = currentTraget.parent;
                } else {
                    currentTraget = null;
                }
            }

            var stageEvent: MouseEvent3D = new MouseEvent3D(eventType);
            stageEvent.target = target;
            stageEvent.currentTarget = this._quadStage;
            this._quadStage.dispatchEvent(stageEvent);
        }

        private onTouchStart(e: TouchEvent3D) {

        }

        private onTouchEnd(e: TouchEvent3D) {

        }

        private onTouchMove(e: TouchEvent3D) {

        }

        private mouseOut(e: MouseEvent3D) {
            this.dispatchMouseEvent(MouseEvent3D.MOUSE_DOWN);
        }

        private mouseDown(e: MouseEvent3D) {
            this.dispatchMouseEvent(MouseEvent3D.MOUSE_DOWN);
        }

        private mouseUp(e: MouseEvent3D) {
            this.dispatchMouseEvent(MouseEvent3D.MOUSE_UP);
        }

        private mouseOver(e: MouseEvent3D) {
            this.dispatchMouseEvent(MouseEvent3D.MOUSE_OVER);
        }

        private mouseMove(e: MouseEvent3D) {
            this.dispatchMouseEvent(MouseEvent3D.MOUSE_MOVE);
        }

        private mouseClick(e: MouseEvent3D) {
            this.dispatchMouseEvent(MouseEvent3D.MOUSE_CLICK);
        }

    
       public fire() {
           this._finalist = this._quadStage.quadList;
       }


        private getGlobalRect(dis: DisplayObject): Rectangle {
            var rect: Rectangle = new Rectangle();
            rect.copyFrom(dis.aabb);
            dis = dis.parent;
            while (dis) {
                rect.x += dis.x;
                rect.y += dis.y;
                dis = dis.parent;
            }
            return rect;
        }


        private getMousePickList(): DisplayObject[] {
            var i: number;
            this._mouseList.length = 0;
            var quad: DisplayObject;
            if (this._finalist) {
                for (i = 0; i < this._finalist.length; i++) {
                    quad = this._finalist[i];
//                    console.log("quad.aabb: ", quad.aabb);
//                    console.log("mouseX: ", Input.mouseX, "mouseY: ", Input.mouseY);
                    if (quad.globalVisible && quad.mouseEnable && quad.aabb.inner(Input.mouseX, Input.mouseY)) {
                        this._mouseList.push(quad);
                    }
                }
            }

            this._mouseList.reverse();
            return this._mouseList;
        }
    }
}