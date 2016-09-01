module egret3d.gui {

         /**
    * @private
    * @class egret3d.gui.UIPanel
    * @classdesc
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class UIPanel extends UIElement {
        protected _background: Quad;
        protected _container: UIElement;
        private _w: number;
        private _h:number;

        constructor() {
            super();
            this._background = new Quad();
            this._container = new UIElement();

            super.addChild(this._background);
            super.addChild(this._container);
            
            this._w = 100;
            this._h = 100;
            this.updateMask();
        }

        private updateMask() {
            this.mask = new Rectangle(0, 0, this._w, this._h);
        }

        public get background(): Quad {
            return this._background;
        }

        public set width(value: number) {
            this._w = value;
            this._background.width = value;
            this.updateMask();
        }

        public get width(): number {
            return this._w;
        }

        public set height(value: number) {
            this._h = value;
            this._background.height = value;
            this.updateMask();
        }

        public get height(): number {
            return this._h;
        }

        public onRender() {
            super.onRender();
            this.drawBackground();
            this.updateMask();
        }

        private drawBackground() {
            var texture :Texture = this.getStyle("background");
            this._background.texture = texture;
        }

        public setStyle(style: string, value: Texture) {
            super.setStyle(style, value);
            this.onRender();
        }

        public addChild(display: DisplayObject): DisplayObject {
            return this._container.addChild(display);
        }

        public addChildAt(display: DisplayObject, index: number): DisplayObject {
            return this._container.addChildAt(display, index);
        }

        public removeChild(display: DisplayObject): DisplayObject {
            return this._container.removeChild(display);
        }

        public removeChildAt(index: number): DisplayObject {
            return this._container.removeChildAt(index);
        }

        public swapChildIndex(display: DisplayObject, index: number) {
            this._container.swapChildIndex(display, index);
        }

        public hasChild(display: DisplayObject): number {
            return this._container.hasChild(display);
        }

        public getChildByIndex(index: number): DisplayObject {
            return this._container.getChildByIndex(index);
        }

        public getChildByName(index: number): DisplayObject {
            return this._container.getChildByName(index);
        }
    }
}