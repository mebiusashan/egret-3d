module egret3d {

    /**
    * @private
    */
    export class QuadRenderItem {
        public id: number; 
        public geometry: Geometry;
        public textures: ITexture[];
        public textureID: number = 0 ;
        constructor() {

        }

          ////改变贴图
        //public changeQuadTexture(id: number, textureID: number , uvRectangl:Rectangle ) {
        //}

        ////改变位置
        //public changeQuadPosition(id: number,position:Vector3D) {
        //}

        ////改变旋转
        //public changeQuadRotation(id: number, rotation: Vector3D) {
        //}

        ////改变缩放
        //public changeQuadScale(id: number, scale: Vector3D) {
        //}
    } 
}