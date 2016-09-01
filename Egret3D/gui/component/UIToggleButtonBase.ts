module egret3d.gui {
         /**
    * @private
    * @class egret3d.gui.UIToggleButtonBase
    * @classdesc
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class UIToggleButtonBase extends UILabelButton {
        private _selected:boolean;

        protected static STATE_DOWN_AND_SELECTED:string  = "downAndSelected";
        protected static STATE_UP_AND_SELECTED: string = "upAndSelected";
        private _textPadding :number;
        constructor() {
            super();
            this._selected = false;
            this._textPadding = 5;
            this.textField.autoSize = UITextFieldAutoSize.LEFT;
            this.textWidth = 45;
            this.onRender();
        }


        public get buttonAndLabelWidth(): number {
            return this._skin.width + this.textPadding + this.textWidth;
        }
      

        public get textPadding(): number {
            return this._textPadding;
        }

        public set textPadding(value: number) {
            this._textPadding = value;
            this.onRender();
        }

        public onRender() {
            super.onRender();
            this.textField.x = this._skin.width + this._textPadding;
        }

        public get selected(): boolean {
            return this._selected;
        }
        public set selected(value: boolean) {
            if (this._selected === value) return;
            this._selected = value;
            this._selected ? this.setMouseState(UIToggleButtonBase.STATE_UP_AND_SELECTED) : this.setMouseState(UIButton.STATE_UP);
            var evt: Event3D = new Event3D(Event3D.CHANGE);
            evt.target = this;
            this.dispatchEvent(evt);
        }

        public setMouseState(state: string): void {
            if (state === UIButton.STATE_DOWN) {
                this._selected ? super.setMouseState(UIToggleButtonBase.STATE_DOWN_AND_SELECTED) : super.setMouseState(UIButton.STATE_DOWN);
            }else if (state === UIButton.STATE_UP) {
                this._selected ? super.setMouseState(UIToggleButtonBase.STATE_UP_AND_SELECTED) : super.setMouseState(UIButton.STATE_UP);
            } else {
                super.setMouseState(state);
            }
        }

        protected startPress(): void {
            super.startPress();
            this._selected ? this.setMouseState(UIToggleButtonBase.STATE_DOWN_AND_SELECTED) : this.setMouseState(UIButton.STATE_DOWN);
        }

        protected endPress() {
            super.endPress();
            this.selected = !this.selected;
            this._selected ? this.setMouseState(UIToggleButtonBase.STATE_UP_AND_SELECTED) : this.setMouseState(UIButton.STATE_UP);
        }
       
    }
} 