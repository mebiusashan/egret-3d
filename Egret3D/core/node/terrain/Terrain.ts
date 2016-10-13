module egret3d {

    /**
    * @class egret3d.Terrain
    * @classdesc
    *
    * @see egret3d.Mesh
    *
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class Terrain extends Mesh {

        /**
        * @language zh_CN
        * lod处理对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        public lodQuadTree: LODQuadTree;

        private vertex: any;

        /**
        * @language zh_CN
        * 构造函数
        * @param heightmap 高度图
        * @param width 地形宽度 默认1000
        * @param height 地形主度 默认100
        * @param depth 地形长度 默认1000
        * @param segmentsW 格子列 默认128
        * @param segmentsH 格子行 默认128
        * @param useLod 是否使用lod  如果使用lod segmentsW和segmentsH必须相等并且是2的n次方
        * @param mat 材质 默认为null
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor(heightmap: ImageTexture, width: number = 1000, height: number = 100, depth: number = 1000, segmentsW: number = 128, segmentsH: number = 128, useLod: boolean = false, mat: MaterialBase = null) {
            super(new ElevationGeometry(heightmap, width, height, depth, segmentsW, segmentsH), mat);

            if (useLod) {
                if (segmentsW == segmentsH && (segmentsW & (segmentsW - 1)) == 0) {
                    this.vertex = this.geometry.getVertexForIndex(0, VertexFormat.VF_POSITION, null, this.geometry.vertexCount);
                    this.lodQuadTree = new LODQuadTree(this.vertex, segmentsW);
                    this.lodQuadTree.onUpdate(this.modelMatrix);
                    //this.wireframe.geometry.setVerticesForIndex(0, VertexFormat.VF_POSITION, this.vertex, this.geometry.vertexCount);
                    //this.wireframe.geometry.indexCount = this.geometry.faceCount * 6;
                    //this.addChild(this.wireframe);
                }
                else {
                    Egret3DLog.outError("地形宽高不相等或者不是2的N次方!");
                }
            }
        }

        protected onUpdateTransform() {
            super.onUpdateTransform();
            if (this.lodQuadTree) {
                this.lodQuadTree.onUpdate(this.modelMatrix);
            }
        }

        /**
        * @language zh_CN
        * 开启或关闭LOD
        * @param useLod 开启或关闭
        * @version Egret 3.0
        * @platform Web,Native
        */
        public startLOD(useLod: boolean) {
            if (useLod && !this.lodQuadTree) {
                var eleGeo: ElevationGeometry = <ElevationGeometry>this.geometry;

                if (eleGeo.segmentsW == eleGeo.segmentsH && (eleGeo.segmentsW & (eleGeo.segmentsW - 1)) == 0) {
                    this.vertex = this.geometry.getVertexForIndex(0, VertexFormat.VF_POSITION, null, this.geometry.vertexCount);
                    this.lodQuadTree = new LODQuadTree(this.vertex, eleGeo.segmentsW);
                    this.lodQuadTree.onUpdate(this.modelMatrix);
                }
                else {
                    Egret3DLog.outError("地形宽高不相等或者不是2的N次方!");
                }
            }
            else {
                if (this.lodQuadTree) {
                    this.lodQuadTree.enable = false;
                }
            }
        }

        /**
        * @language zh_CN
        * @private
        */
        public update(time: number, delay: number, camera: Camera3D) {
            super.update(time, delay, camera);

            if (this.lodQuadTree) {

                var index: number = 0;

                index = this.lodQuadTree.build(index, this.geometry.indexArray, camera);
                this.geometry.indexCount = index;
                this.geometry.bufferDiry = true;
                this.geometry.subGeometrys[0].count = this.geometry.indexCount;
                if (!this.lodQuadTree.enable) {
                    this.lodQuadTree = null;
                }

                //for (var i: number = 0; i < this.geometry.faceCount; ++i) {
                //    this.wireframe.geometry.indexArray[i * 6 + 0] = this.geometry.indexArray[i * 3 + 0];
                //    this.wireframe.geometry.indexArray[i * 6 + 1] = this.geometry.indexArray[i * 3 + 1];
                //    this.wireframe.geometry.indexArray[i * 6 + 2] = this.geometry.indexArray[i * 3 + 1];
                //    this.wireframe.geometry.indexArray[i * 6 + 3] = this.geometry.indexArray[i * 3 + 2];
                //    this.wireframe.geometry.indexArray[i * 6 + 4] = this.geometry.indexArray[i * 3 + 2];
                //    this.wireframe.geometry.indexArray[i * 6 + 5] = this.geometry.indexArray[i * 3 + 0];
                //}

                //this.wireframe.geometry.indexCount = this.geometry.faceCount * 6;

                //this.wireframe.geometry.bufferDiry = true;
                //if (this.wireframe.geometry.subGeometrys[0]) {
                //    this.wireframe.geometry.subGeometrys[0].count = this.wireframe.geometry.indexCount;
                //}
            }
        }
    }
}