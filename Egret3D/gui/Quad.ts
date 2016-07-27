module egret3d {

    /**
    * @private
    */
    export class Quad extends EventDispatcher {
        public name: string = "" ;
        public id: number = -1 ;
        public position: Vector3D = new Vector3D();
        public rotation: Vector3D = new Vector3D();
        public scale: Vector3D = new Vector3D(1,1,1);

        //public texture: ImageData; 

        private quadRenderItem: QuadRenderItem; 
        constructor() {
            super();
        }


    }
} 