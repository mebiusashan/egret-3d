module egret3d {
       /**
    * @private
    */
    export class GUIEventFire {

        private _finalist: Quad[];
        private _mouseList: Quad[];
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

        private mouseOut(e: MouseEvent3D) {
            var list = this.getMousePickList();
            if (list.length > 0) {
                var pick: Quad = list[0];
                pick.pickResult = pick.pickResult || new PickResult();
                pick.pickResult.pickList = list;
                pick.dispatchMuseOut();
            }
            this._quadStage.dispatchMouseOut();
        }

        private mouseDown(e: MouseEvent3D) {
            var list = this.getMousePickList();
            if (list.length > 0) {
                var pick: Quad = list[0];
                pick.pickResult = pick.pickResult || new PickResult();
                pick.pickResult.pickList = list;
                pick.dispatchMuseDown();
            }
            this._quadStage.dispatchMuseDown();
        }

        private mouseUp(e: MouseEvent3D) {
            var list = this.getMousePickList();
            if (list.length > 0) {
                var pick: Quad = list[0];
                pick.pickResult = pick.pickResult || new PickResult();
                pick.pickResult.pickList = list;
                pick.dispatchMuseUp();
            }
            this._quadStage.dispatchMuseUp();
        }

        private mouseOver(e: MouseEvent3D) {
            var list = this.getMousePickList();
            if (list.length>0){
                var pick: Quad = list[0];
                pick.mouseInState = true;
                pick.pickResult = pick.pickResult || new PickResult();
                pick.pickResult.pickList = list;
                pick.dispatchMuseUp();
            }
            this._quadStage.dispatchMouseOver();
        }

        private mouseMove(e: MouseEvent3D) {
            var list = this.getMousePickList();
            if (list.length > 0) {
                var pick: Quad = list[0];
                pick.mouseInState = true;
                pick.pickResult = pick.pickResult || new PickResult();
                pick.pickResult.pickList = list;
                pick.dispatchMuseMove();
            }
            this._quadStage.dispatchMuseMove();
        }

        private mouseClick(e: MouseEvent3D) {
            var list = this.getMousePickList();
            if (list.length > 0) {
                var pick: Quad = list[0];
                pick.mouseInState = true;
                pick.pickResult = pick.pickResult || new PickResult();
                pick.pickResult.pickList = list;
                pick.dispatchMuseClick();
            }
            this._quadStage.dispatchMuseClick();
        }

        //public hasMouseMove: boolean = false;
        //public hasMouseDown: boolean = false;
        //public hasMouseUp: boolean = false;
        //public hasMouseClick: boolean = false;
        //public hasMouseOut: boolean = false;
       public fire() {
           this._finalist = this._quadStage.quadList;
       }

        private getMousePickList(): Quad[] {
            var i: number;
            this._mouseList.length = 0;
            var quad: Quad;
            if (this._finalist) {
                for (i = 0; i < this._finalist.length; i++) {
                    quad = this._finalist[i];
                    if (quad.globalVisible && quad.mouseEnable && quad.aabb.inner(Input.mouseX, Input.mouseY)) {
                        //mouse down
                        this._mouseList.push(quad);
                    }
                }
            }
            //已经排序了不需要排序
            //return pickList = SortUtil.sortAB(this._mouseList);


            //todo
            //???        是否需要颠倒
            this._mouseList.reverse();
            return this._mouseList;
        }
    }
}