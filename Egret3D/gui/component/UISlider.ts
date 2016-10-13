module egret3d.gui {

         /**
    * @private
    * @class egret3d.gui.UISlider
    * @classdesc
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class UISlider extends gui.UIElement {
        private _background: Quad;
        private _bar:Quad;
        private _maximum: number;
        private _minimum:number;
        private _value:number;
        private _snapInterval:number;
        private _text:UITextField;
        constructor() {
            super();
            this._background = new Quad();
            this._bar =new  Quad();
            this._text = new UITextField(UITextFieldType.DYNAMIC);
            this._text.autoSize = UITextFieldAutoSize.CENTER;
            this._text.textColor = 0xff000000;

            this.addChild(this._background);
            this.addChild(this._bar);
            this.addChild(this._text);
//            this._background.color = 0xff00ffff;
//            this._bar.color = 0xffff00ff;
            this._minimum = 0;
            this._maximum = 100;
            this._snapInterval = 10;
            this.value = 50;
            this.addEventListener(MouseEvent3D.MOUSE_DOWN, this.onMouseDown, this);
        }

        public setStyle(style: string, value: Texture): void {
            super.setStyle(style, value);
            if (style === "bar") {
                this._bar.texture = value;
            } else if (style === "background") {
                this._background.texture = value;
            }
            this.onRender();
        }

        private onMouseUp(event: MouseEvent3D) {
            this.removeEventListener(MouseEvent3D.MOUSE_MOVE, this.onMouseMove, this);
            this.removeEventListener(MouseEvent3D.MOUSE_UP, this.onMouseUp, this);
        }

        private onMouseDown(event: MouseEvent3D) {
            this.addEventListener(MouseEvent3D.MOUSE_MOVE, this.onMouseMove, this);
//            this.addEventListener(MouseEvent3D.MOUSE_UP, this.onMouseUp, this);
            this.stage.addEventListener(MouseEvent3D.MOUSE_UP, this.onMouseUp, this);
            var cx: number = this.mouseX;
            this.value = cx / this._background.width * (this._maximum - this._minimum) + this._minimum;
        }

        private updateBar() {
            var ratio: number = Math.abs(this._value / (this._maximum + this._minimum));
            this._bar.width = this._background.width * ratio;
            this._text.text = this.value.toString();
        }

        public set snapInterval(value: number) {
            this._snapInterval = value;
        }

        public get snapInterval(): number {
            return this._snapInterval;
        }

        public set value(value: number) {
            if (value % this._snapInterval !== 0) {
                value = Math.round(value / this._snapInterval) * this._snapInterval;
            }
            if (this._value === value) return;
            this._value = value;

            var event: Event3D = new Event3D(Event3D.CHANGE);
            this.dispatchEvent(event);
            this.updateBar();
        }

        public get value(): number {
            return this._value;
        }

        private onMouseMove(event: MouseEvent3D) {
            var cx: number = this.mouseX;
            this.value = cx / this._background.width * (this._maximum - this._minimum) + this._minimum;
        }

        private onMouseClick(event: MouseEvent3D) {
            
        }

        public get maximum(): number {
            return this._maximum;
        }

        public get minimum(): number {
            return this._minimum;
        }

        public set maximum(value: number) {
            this._maximum = value;
        }

        public set minimum(value: number) {
            this._minimum = value;
        }

        public set backgroundColor(color: number) {
            this._background.color = color;
        }

        public set barColor(color: number) {
            this._bar.color = color;

        }

        public set width(value: number) {
            this._background.width = this._text.width = value;

        }

        public set height(value: number) {
            this._background.height = this._text.height =  this._bar.height = value;
        }

        public get width(): number {
            return this._background.width;
        }

        public get height(): number {
            return this._background.height;
        }

        public onRender() {
            super.onRender();
        }


    }
}