module egret3d.gui {
    export class CheckBox extends ToggleButton {

        private static checkBoxStyle:Object = {
            icon: null,
            upIcon: "CheckBox_upIcon", downIcon: "CheckBox_downIcon", overIcon: "CheckBox_overIcon",
            disabledIcon: "CheckBox_disabledIcon",
            selectedDisabledIcon: "CheckBox_selectedDisabledIcon",
            focusRectSkin: null,
            focusRectPadding: null,
            selectedUpIcon: "CheckBox_selectedUpIcon", selectedDownIcon: "CheckBox_selectedDownIcon", selectedOverIcon: "CheckBox_selectedOverIcon",
            textFormat: null,
            disabledTextFormat: null,
            embedFonts: null,
            textPadding: 5 
        };

        public static getStyleDefinition(): Object { return this.checkBoxStyle; }


        constructor() {
            super();

        }


    }
}