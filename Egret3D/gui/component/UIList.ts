module egret3d.gui {

         /**
    * @private
    * @class egret3d.gui.UIList
    * @classdesc
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class UIList extends egret3d.gui.UIPanel{

        private _selectedIndex: number;
        private _selectedItem:any;
        private _items:DisplayObject[];
        private _gap:number;
        private _startDrag:boolean;
        private _containerHeight:number;
      

        constructor() {
            super();
            this._items = [];
            this._gap = 5;
            this._selectedIndex = -1;
            this._selectedItem = null;
            this.addEventListener(MouseEvent3D.MOUSE_DOWN, this.onMouseDown, this);
            
            this._startDrag = false;
            this._container.height = 0;
        }


        private onMouseDown(event: MouseEvent3D) {
            this._startDrag = true;
            this.addEventListener(MouseEvent3D.MOUSE_UP, this.onMouseUp, this);
            this.addEventListener(MouseEvent3D.MOUSE_MOVE, this.onMouseMove, this);
            this.stage.addEventListener(MouseEvent3D.MOUSE_UP, this.onMouseUp, this);
            console.log("mousedown");

        }

        private onMouseUp(event: MouseEvent3D) {
            this._startDrag = false;
            this.removeEventListener(MouseEvent3D.MOUSE_UP, this.onMouseUp, this);
            this.removeEventListener(MouseEvent3D.MOUSE_MOVE, this.onMouseMove, this);
            this.stage.removeEventListener(MouseEvent3D.MOUSE_UP, this.onMouseUp, this);
            console.log("mouseup");
            
        }

        private onMouseMove(event: MouseEvent3D) {
            if (this._startDrag) {
//                this._container.x += Input.mouseOffsetX;
                this._container.y += Input.mouseOffsetY;
                if (this._container.y > 0) {
                    this._container.y = 0;
                } else if (this._containerHeight < this.height) {
                    this._container.y = 0;
                } else if (this._container.y < this.height - this._containerHeight) {
                    this._container.y = this.height - this._containerHeight;
                }

            } 
        }

        public updateView() {
            var sum: number = 0;
            for (var i: number = 0; i < this._items.length; i++) {
                var child: DisplayObject = this._items[i];
                child.y = sum;
                sum = child.y + child.height + this._gap;
            }

            this._containerHeight = sum;
        }

        public get gap(): number {
            return this._gap;
        }

        public set gap(value: number) {
            this._gap = value;
            this.updateView();
        }

        public get selectedIndex(): number {
            return this._selectedIndex;
        }

        public set selectedIndex(value: number) {
            this._selectedIndex = value;
        }
         
        public get selectedItem(): UIElement {
            return this._selectedItem;
        }

        public set selectedItem(item: UIElement) {
            this._selectedItem = item;
        }

        /**
         * 添加item元素. 默认添加到尾部
         * @param item 
         * @param index  
         * @returns {} 
         */
        public addItem(item: DisplayObject) {
            this._items.push(item);
            this.addChildAt(item, this._container.childs.length);
            
            this.updateView();
        }

        public removeItem(item: DisplayObject) {
            this.removeChild(item);
            this._items.splice(this._items.indexOf(item), 1);
            this.updateView();
        }

    }
} 