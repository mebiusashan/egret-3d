module egret3d.gui {
         /**
    * @private
    * @class egret3d.gui.UIElement
    * @classdesc
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class UIElement extends UILayout {

        protected instanceStyles: Object;

        private static defaultStyles:Object = {
        }

        constructor() {
            super();
            this.instanceStyles = {};
        }

        public onRender() {
        }
        public onUpdate() {
        }
        public onEvent() {
        }


        public setStyle(style: string, value: Texture): void
        {
            if (this.instanceStyles[style] === value)
            {
                return;
            }
                this.instanceStyles[style] = value;

        }

        public getStyle(style: string): Texture {
            return this.instanceStyles[style];
        }


        public static getStyleDefinition():Object {			
            return this.defaultStyles;
        }

        public static mergeStyles(...list):Object {
            var styles:Object = {};
            var l:number = list.length;
            for (var i: number=0; i<l; i++) {
                var styleList: Object = list[i];
                for (var n in styleList) {
                    if (styles[n] != null) { continue; }
                    styles[n] = list[i][n];
                }
            }
            return styles;
        }
    }

}