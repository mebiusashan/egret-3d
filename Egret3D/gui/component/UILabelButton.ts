module egret3d.gui {
         /**
    * @private
    * @class egret3d.gui.UILabelButton
    * @classdesc
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class UILabelButton extends UIButton{
      
        protected _label: string = "";		

        private _textField:gui.UITextField;
        private _textWidth: number;
        private _textHeight:number;

        constructor() {
            super();
            this._textField = new gui.UITextField();
            this._textField.autoSize = UITextFieldAutoSize.CENTER;
            this.addChild(this._textField);
            this.onRender();
            this._textHeight = -1;
            this._textWidth = -1;
        }

        public get textHeight(): number {
            return this._textHeight;
        }

        public set textHeight(value: number) {
            this._textHeight = value;
            this.onRender();
        }

        public get textWidth(): number {
            return this._textWidth; 
        }

        public set textWidth(value: number) {
            this._textWidth = value;
            this.onRender();
        }

        public get textField(): UITextField {
            return this._textField;
        }

        public get label(): string {
            return this._label;
        }	

        public set label(value: string) {
            this._label = value;
            this._textField.text = this._label;
        }	
    
        public onRender() {
            super.onRender();

            if (this._textHeight > 0) {
                this.textField.textHeight = this._textHeight;
            } else {
                this._textField.height = this._skin.height;
            }

            if (this._textWidth > 0) {
                this.textField.textWidth = this._textWidth;
            } else {
                this._textField.width = this._skin.width;
            }
        }
    }
}