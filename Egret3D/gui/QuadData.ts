module egret3d {

    /**
    * @private
    */
    export class QuadData {
        //pos.w 0:normal 1:text 
        public static singleQuadData: Array<number> = [
          /*pos*/0.0, 0.0, 100000.0, 0.0,/*offset*/  0.0, 0.0, 0.0,  /*uv*/0.0, 0.0, 1.0, 1.0, /*rotation*/0.0, 0.0, 0.0, 1.0, /*mask*/-1.0, 0.0, 1.0, 1.0, /*color*/0.0, 0.0, 1.0, 1.0,
          /*pos*/0.0, 0.0, 100000.0, 0.0,/*offset*/  0.0, 0.0, 0.0,  /*uv*/1.0, 0.0, 1.0, 1.0, /*rotation*/0.0, 0.0, 0.0, 1.0, /*mask*/-1.0, 0.0, 1.0, 1.0, /*color*/0.0, 0.0, 1.0, 1.0,
          /*pos*/0.0, 0.0, 100000.0, 0.0,/*offset*/  0.0, 0.0, 0.0,  /*uv*/1.0, 1.0, 1.0, 1.0, /*rotation*/0.0, 0.0, 0.0, 1.0, /*mask*/-1.0, 0.0, 1.0, 1.0, /*color*/0.0, 0.0, 1.0, 1.0,
          /*pos*/0.0, 0.0, 100000.0, 0.0,/*offset*/  0.0, 0.0, 0.0,  /*uv*/0.0, 1.0, 1.0, 1.0, /*rotation*/0.0, 0.0, 0.0, 1.0, /*mask*/-1.0, 0.0, 1.0, 1.0, /*color*/0.0, 0.0, 1.0, 1.0
        ];

        ///*pos*/0.0, 0.0, 100000.0,         /*uv*/0.0, 0.0, 1.0, 1.0, /*rotation*/0.0, 0.0, 0.0, /*scale*/1.0, 1.0,
        // /*pos*/100.0, 0.0, 100000.0,      /*uv*/1.0, 0.0, 1.0, 1.0, /*rotation*/0.0, 0.0, 0.0, /*scale*/1.0, 1.0,
        // /*pos*/100.0, -100.0, 100000.0,  /*uv*/1.0, 1.0, 1.0, 1.0, /*rotation*/0.0, 0.0, 0.0, /*scale*/1.0, 1.0,
        // /*pos*/0.0, -100.0, 100000.0,     /*uv*/0.0, 1.0, 1.0, 1.0, /*rotation*/0.0, 0.0, 0.0, /*scale*/1.0, 1.0

        public static vertexLen = 23;

        public static posOffest = 0;
        public static posSize = 4;

        public static offsetOffest = 4;
        public static offsetSize = 3;

        public static uvRectangleOffest = 7;
        public static uvRectangleSize = 4;

        public static rotationOffest = 11;
        public static rotationSize = 4;

        public static scaleOffest = 15;
        public static scaleSize = 4;

        public static colorOffest = 19;
        public static colorSize = 4;

        public static singleQuadIndex: Array<number> = [0, 2, 1, 0, 3, 2];
        //public static singleQuadIndex: Array<number> = [0, 1, 2, 0, 2, 3];
        public static vertexBytes: number = QuadData.vertexLen* 4;
        public static quadVertexLen: number = QuadData.vertexLen * 4;


        public static buildGeometry(geometry: Geometry, start: number, numberQuad: number) {
            var geometry: Geometry = geometry;
            geometry.vertexFormat = VertexFormat.VF_QUADPOS | VertexFormat.VF_QUADOFFSET | VertexFormat.VF_UVREC | VertexFormat.VF_ROTATION | VertexFormat.VF_SCALE | VertexFormat.VF_QUAD_COLOR;
            var subGeometry: SubGeometry = new SubGeometry();
            geometry.vertexCount = numberQuad * 4;
            geometry.indexCount = QuadData.singleQuadIndex.length * numberQuad;

            var zIndex: number = 0;
            var offset: number = 0;
            for (var i: number = 0; i < numberQuad; i++) {
                zIndex = (i + start);
                QuadData.singleQuadData[0 * QuadData.vertexLen + 2] = zIndex;
                QuadData.singleQuadData[1 * QuadData.vertexLen + 2] = zIndex;
                QuadData.singleQuadData[2 * QuadData.vertexLen + 2] = zIndex;
                QuadData.singleQuadData[3 * QuadData.vertexLen + 2] = zIndex;

                offset = i * 4 * geometry.vertexAttLength;
                for (var j1: number = 0; j1 < QuadData.singleQuadData.length; j1++) {
                    geometry.vertexArray[offset + j1] = QuadData.singleQuadData[j1];
                }

                for (var j2: number = 0; j2 < QuadData.singleQuadIndex.length; j2++) {
                    geometry.indexArray[i * QuadData.singleQuadIndex.length + j2] = QuadData.singleQuadIndex[j2] + 4 * i;
                }
            }

            subGeometry.geometry = geometry;
            subGeometry.start = 0;
            subGeometry.count = geometry.indexCount;
            geometry.subGeometrys.push(subGeometry);
            geometry.vertexAttLength = QuadData.vertexLen;
        }
    }

}