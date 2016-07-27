module egret3d {

    /*
    * @private
    */
    export interface IPost{
        drawRectangle: Rectangle ;
        drawTexture( time: number, delay: number, context3D: Context3DProxy, collect: CollectBase, camera: Camera3D, backViewPort: Rectangle , posList:any );
    }
}