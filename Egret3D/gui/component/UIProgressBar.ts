module egret3d.gui {
         /**
    * @private
    * @class egret3d.gui.UIProgressBar
    * @classdesc
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class UIProgressBar extends UIElement {

        private _background: Quad;
        private _bar:Quad;
        private _ratio: number;
        private _mask:Rectangle = new Rectangle()
        constructor() {
            super();
            this._background = new Quad();
            this.addChild(this._background);
            this._bar = new Quad();
            this.addChild(this._bar);
            this._ratio = 0.5;
        }

        /**
         * 0-1;
         * 
         * @param value 
         * @returns {} 
         */
        public set ratio(value: number) {
            if (value > 1) {
                value = 1;
            }else if (value < 0) {
                value = 0;
            }
            this._ratio = value;
            this.updateBar();
        }

        public get ratio(): number {
            return this._ratio;
        }

        public set width(value: number) {
            this._background.width = this._bar.width = value;
        }

        public set height(value: number) {
            this._background.height = this._bar.height = value;
        }
        
        public setBarRect(x: number, y: number, w: number, h: number) {
            this._bar.x = x;
            this._bar.y = y;
            this._bar.width = w;
            this._bar.height = h;
        }

        public get bar(): DisplayObject {
            return this._bar;
        }

        public get background(): DisplayObject {
            return this._background;
        }

        private updateBar() {
            this._mask.width = this._ratio * this._bar.width;
            this._mask.height = this._bar.height;
            this._bar.mask = this._mask;
        }

        public setStyle(style: string, value: Texture) {
            super.setStyle(style, value);
            this.updateStyle();
            this.updateBar();
        }

        private updateStyle() {
            this._background.texture = this.getStyle("background");
            this._bar.texture = this.getStyle("bar");
        }
        
    }
}