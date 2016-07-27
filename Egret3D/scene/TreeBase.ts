module egret3d {
                                
    /**
    * @private
    * @class egret3d.TreeBase
    * @classdesc
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class TreeBase {
        private _root: Object3D;
        private _searchList: Array<Object3D> = new Array<Object3D>() ; 
        constructor(object3D: Object3D) {
            this._root = object3D; 
        }

        public infrustumList(camera: Camera3D): Object3D[] {
            this._searchList.length = 0; 
            return this._searchList ;
        }
    }
}