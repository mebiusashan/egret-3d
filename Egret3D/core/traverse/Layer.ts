module egret3d {

    //export enum layerTypes { gui, effect, alphaObject, normalObject };
    /**
    * @private
    * @class egret3d.Layer
    * @classdesc
    * Object3D 渲染Layer
    * 每个Layer分两个渲染列表，一个是有alpha的对象列表，另一个是没有alpha的对象列表
    * 不同的Layer层级可以使用不同的渲染方式，来达到各组不同的渲染效果.
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class Layer {
        
        public static layerType: string[] = ["normalObject", "normalAlphaObject", "alphaObject", "decal", "effect", "gui"];
        //  public static layerType: string[] = ["gui", "effect", "alphaObject", "normalObject"];
        public static layerTypeThan: number[] = [3, 2, 1, 0];
        public static layerNumber: number = 5 ; 
    }
} 