module egret3d.gui {
         /**
    * @private
    * @class egret3d.gui.UIButton
    * @classdesc
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class UIButton extends UIElement {

        public _skin: Quad;
        private _enable: boolean;

        protected _state: string;
        protected _isDowning:boolean;

        protected static STATE_DOWN: string = "down";
        protected static STATE_UP: string = "up";
        protected static STATE_DISABLE: string = "disable";

        constructor() {
            super();
            this._skin = new Quad();
            this.addChild(this._skin);
            this._state = UIButton.STATE_UP;
            this._enable = true;
            this._isDowning = false;
            this._skin.addEventListener(MouseEvent3D.MOUSE_DOWN, this.mouseEventHandler, this);
            this._skin.addEventListener(MouseEvent3D.MOUSE_OUT, this.mouseEventHandler, this);
            this._skin.addEventListener(MouseEvent3D.MOUSE_OVER, this.mouseEventHandler, this);
        }

        public set width(value: number) {
            this._skin.width = value;
            this.onRender();
        }

        public set height(value: number) {
            this._skin.height = value;
            this.onRender();
        }

        public get width(): number {
            return this._skin.width;
        }

        public get height(): number {
            return this._skin.height;
        }

        public setStyle(style: string, value: Texture): void {
            super.setStyle(style, value);
            this.onRender();
        }

        protected  mouseEventHandler(event: MouseEvent3D) {
            if (!this._enable) return;

            if (event.eventType === MouseEvent3D.MOUSE_DOWN) {
                this.startPress();
            } else if (event.eventType === MouseEvent3D.MOUSE_UP) {
                this.endPress();
            }else if (event.eventType === MouseEvent3D.MOUSE_OUT) {
                this.mouseOut();
            }else if (event.eventType === MouseEvent3D.MOUSE_OVER) {
                this.mouseOver();
            }
        }

        protected mouseOut() {
            this.setMouseState(UIButton.STATE_UP);
        }

        protected mouseOver() {
            if (this._isDowning) {
                this.setMouseState(UIButton.STATE_DOWN);
            }
        }

        protected startPress(): void {
            this._skin.addEventListener(MouseEvent3D.MOUSE_UP, this.mouseEventHandler, this);
            this.stage.addEventListener(MouseEvent3D.MOUSE_UP, this.onStageEnd, this);
            this._isDowning = true;

            this.setMouseState(UIButton.STATE_DOWN);
            this.dispatchEvent(new MouseEvent3D(MouseEvent3D.MOUSE_DOWN, this));
        }

        protected onStageEnd(event: MouseEvent3D): void {
            console.log("stage up");
            this.stage.removeEventListener(MouseEvent3D.MOUSE_UP, this.onStageEnd, this);
            this._skin.removeEventListener(MouseEvent3D.MOUSE_UP, this.mouseEventHandler,this);
            this.setMouseState(UIButton.STATE_UP);
            this._isDowning = false;
        }

        protected endPress(): void {
            this.dispatchEvent(new MouseEvent3D(MouseEvent3D.MOUSE_UP, this));
            this.dispatchEvent(new MouseEvent3D(MouseEvent3D.MOUSE_CLICK, this));
            this.setMouseState(UIButton.STATE_UP);
            this._isDowning = false;
            this.stage.removeEventListener(MouseEvent3D.MOUSE_UP, this.onStageEnd, this);
            this._skin.removeEventListener(MouseEvent3D.MOUSE_UP, this.mouseEventHandler, this);
            console.log("btn up");

        }

        public get enable(): boolean {
            return this._enable;
        }

        public set enable(value: boolean) {
            this._enable = value;
            this.mouseEnable = value;
        }

        public setMouseState(state: string): void {
            if (this._state === state) { return; }
            this._state = state;
            this.onRender();
        }

        public onRender() {
            this.drawBackground();
        }

        protected drawBackground() {
            var skin: Texture = this.enable ? this.getStyle(this._state) : this.getStyle(UIButton.STATE_DISABLE);
            this._skin.texture = skin;

        }
    }

    export class ButtonLabelPlacement {
        public static BOTTOM: string = "bottom";
        public static TOP: string = "top";
        public static LEFT: string = "left";
        public static RIGHT: string = "right";
    }
}