module egret3d {
    /**
    * @private
    */
    export interface IDisplayObject {
        id: number;
        name: string;
        parent: IDisplayObject;

        global_x: number;
        global_y: number;
        global_z: number;
        global_rotationX: number;
        global_rotationY: number;
        global_rotationZ: number;
        global_scaleX: number;
        global_scaleY: number;
        global_scaleZ: number;

        x: number;
        y: number;  
        z: number;
        rotationX: number;
        rotationY: number;
        rotationZ: number;
        scaleX: number;
        scaleY: number;
        scaleZ: number;

        transform: Matrix4_4;
        colorTransform: ColorTransform;
        aabb: Rectangle;

        screen: any;
        children: IDisplayObject[];

        addChild(display: IDisplayObject);
        removeChild(display: IDisplayObject);
        swapChildIndex(display: IDisplayObject, index: number);
        hasChild(display: IDisplayObject): number;
        getChildByIndex(index: number):IDisplayObject;
        getChildByName(index: number): IDisplayObject;

    }
}