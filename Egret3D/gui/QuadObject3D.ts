module egret3d {

    /**
    * @private
    */
    class QuadData {
        public static singleQuadData: Array<number> = [
            -1.0, -1.0, 0.0, 0.0, 1.0,
            1.0, -1.0, 0.0, 1.0, 1.0,
            1.0, 1.0, 0.0, 1.0, 0.0,
            -1.0, 1.0, 0.0, 0.0, 0.0
        ];
        public static singleQuadIndex: Array<number> = [0, 1, 2, 0, 2, 3];
        public static vertexBytes: number = 20;
        public static numberQuad: number = 1000;

        public static buildGeometry():Geometry {
            var geometry = new Geometry();
            geometry.vertexFormat = VertexFormat.VF_POSITION | VertexFormat.VF_UV0;
            var subGeometry: SubGeometry = new SubGeometry();

            var vertexData: number[] = geometry.verticesData;
            var indexData: number[] = geometry.indexData;
            for (var i: number = 0; i < QuadData.numberQuad; i++) {
                for (var j1: number = 0; j1 < QuadData.singleQuadData.length; j1++) {
                    vertexData.push(QuadData.singleQuadData[j1]);
                }
                for (var j2: number = 0; j2 < QuadData.singleQuadIndex.length; j2++) {
                    indexData.push(QuadData.singleQuadIndex[j2] + j2 * 4);
                }
            }

            subGeometry.geometry = geometry;
            subGeometry.start = 0;
            subGeometry.count = indexData.length;
            geometry.subGeometrys.push(subGeometry);
            return geometry;
        }
    }

    export class QuadObject3D extends Mesh { 
        static numberQuad: number = 1000;

        private _vertexData: number[];
        private _indexData: number[];
        private _countID: number = 0;
        private _textures: ITexture[] ; 
        constructor() {
            super(QuadData.buildGeometry(), new TextureMaterial(CheckerboardTexture.texture)); 
            this.tag.name == "gui";
            // add material GUIMethod
        }

        public creatQuadRenderItem(): QuadRenderItem {
            var quadRenderItem: QuadRenderItem = new QuadRenderItem();
            quadRenderItem.id = this._countID++;
            quadRenderItem.geometry = this.geometry; 
            quadRenderItem.textures = this._textures; 
            return quadRenderItem; //new quad ID
        }

        public onUpdate() {
        }

    }
}