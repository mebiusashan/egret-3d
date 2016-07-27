module egret3d {

    /**
    * @private
    */
    export class Stage implements IDisplayObject {
        id: number = -1;
        name: string = "root";
        parent: IDisplayObject = null;

        global_x: number = 0;
        global_y: number = 0;
        global_z: number = 0;
        global_rotationX: number = 0;
        global_rotationY: number = 0;
        global_rotationZ: number = 0;
        global_scaleX: number = 1;
        global_scaleY: number = 1;
        global_scaleZ: number = 1;

        x: number = 0;
        y: number = 0;
        z: number = 0;
        rotationX: number = 0;
        rotationY: number = 0;
        rotationZ: number = 0;
        scaleX: number = 1;
        scaleY: number = 1;
        scaleZ: number = 1;

        transform: Matrix4_4;
        colorTransform: ColorTransform;
        aabb: Rectangle;

        screen: any;

        children: IDisplayObject[] = [] ;

        constructor() {
        }

        public addChild(display: IDisplayObject) {
            var index: number = this.children.indexOf(display);
            if (index == -1) {
                this.children.push(display);
                display.parent = this;
            }
        }

        public removeChild(display: IDisplayObject) { }
        public swapChildIndex(display: IDisplayObject, index: number) { }
        public hasChild(display: IDisplayObject): number { return 0;}
        public getChildByIndex(index: number): IDisplayObject { return null;}
        public getChildByName(index: number): IDisplayObject { return null;}
















    }
}