module egret3d.gui {
    export class LabelButton extends UIButton{

        public textField:UITextField;
        protected _labelPlacement:string = ButtonLabelPlacement.RIGHT;		
        protected _toggle: boolean = false;
        protected icon:Quad;
        protected oldMouseState: string;
        protected _label: string = "";		

        constructor() {
            super();
        }

        public get label(): string {
            return this._label;
        }	

        public set label(value: string) {
            this._label = value;
        }	

        public get labelPlacement(): string {
            return this._labelPlacement;
        }

        public get toggle(): boolean {
            return this._toggle;
        }

        public get selected():boolean {
            return (this._toggle);
        }	

        public set selected(value:boolean) {

        }


        public set toggle(value: boolean) {
            if (!value && this.selected) { this.selected = false; }
            this._toggle = value;
        }

        protected startPress() {

            if (this._toggle) {
                this.selected = !this.selected;

                this.dispatchEvent(new Event3D(Event3D.CHANGE, this));
            }

            super.startPress();

    
        }


        private static styles:Object = {
            icon: null,
            upIcon: null, downIcon: null, overIcon: null, disabledIcon: null,
            selectedDisabledIcon: null, selectedUpIcon: null, selectedDownIcon: null, selectedOverIcon: null,
            textFormat: null, disabledTextFormat: null,
            textPadding: 5, embedFonts: false
        };

        public static getStyleDefinition():Object { 
            return this.mergeStyles(this.styles, UIButton.getStyleDefinition());
        }

        public onRender() {
            super.onRender();

            this.drawIcon();
            this.drawTextFormat();
            
        }


        protected drawIcon(): void {
          
        }

        protected drawTextFormat(): void {

        }
    }
}