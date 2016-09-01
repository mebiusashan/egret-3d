module egret3d.gui {
    export class ToggleButton extends LabelButton {
        constructor() {
            super();
            this._toggle = true;
        }


        public get toggle(): boolean {
            return true;
        }

        public set toggle(value: boolean) {
            throw new Error("Warning: You cannot change a CheckBox's toggle.");
        }
    }

}