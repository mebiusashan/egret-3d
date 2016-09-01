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
        constructor() {
            super();
            this._background = new Quad();
            this._bar =new  Quad();

            this.addChild(this._background);
            this.addChild(this._bar);
            this._background.color = 0;
            this._bar.color = 0xffffff;
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
            this._background.width = value;

        }

        public set height(value: number) {
            this._background.height = this._bar.height = value;
        }

        public onRender() {
            super.onRender();
        }


    }
}