module egret3d.gui {
         /**
    * @private
    * @class egret3d.gui.UIRadioButtonGroup
    * @classdesc
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class UIRadioButtonGroup extends EventDispatcher {
        private _enable: boolean;
        private _selection:UIRadioButton;
        private _items:UIRadioButton[];
        constructor() {
            super();
            this._items = [];
            this._enable = true;
        }

        public set enable(value: boolean) {
            if (this._enable === value) return;
            this._enable = value;
            for (var i: number = 0; i < this._items.length; i++) {
                var item: UIRadioButton = this._items[i];
                item.enable = value;
            }
        }

        public get enable(): boolean {
            return this._enable;
        }

        public addItem(item: UIRadioButton) {
            this._items.push(item);
            item.enable = this._enable;
            item.addEventListener(Event3D.CHANGE, this.onItemChange, this);
        }

        public removeItem(item: UIRadioButton) {
            var index: number = this._items.indexOf(item);
            if (index !== -1) {
                item.removeEventListener(Event3D.CHANGE, this.onItemChange,this);
                this._items.splice(index, 1);
            }
        }

        public getRadioButtonAt(index: number): UIRadioButton {
            return this._items[index];
        } 

        private onItemChange(event: Event3D) {
            var target: UIRadioButton = event.target;
            if (target.selected === false) return;
            if (this._selection === target) {
                return;
            }
            if(this._selection) this._selection.selected = false;
            this._selection = target;
            var evt: Event3D = new Event3D(Event3D.CHANGE);
            evt.target = this;
            this.dispatchEvent(evt);
        }
    }
}