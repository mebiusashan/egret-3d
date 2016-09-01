module egret3d.gui {
         /**
    * @private
    * @class egret3d.gui.UIRadioButton
    * @classdesc
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class UIRadioButton extends gui.UIToggleButtonBase {
        private _group:UIRadioButtonGroup;
        constructor() {
            super();
        }



        public set group(group: UIRadioButtonGroup) {
            this._group = group;
        }

    }
} 