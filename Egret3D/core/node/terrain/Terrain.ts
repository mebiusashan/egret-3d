module egret3d {

    /**
    * @class egret3d.Terrain
    * @classdesc
    *
    * @see egret3d.Object3D
    * @see egret3d.Geometry
    * @see egret3d.MaterialBase
    * @see egret3d.IAnimation
    * @see egret3d.SkeletonAnimation
    *
    * 示例:
    * @includeExample core/node/Terrain.ts
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class Terrain extends Mesh {

        public lodQuad: LODQuad;

        public camera: Camera3D;

        public wireframe: Wireframe = new Wireframe();
        public vertex: any;
        constructor(elevationGeometry: ElevationGeometry, mat: MaterialBase = null) {
            super(elevationGeometry, mat);
            this.vertex = elevationGeometry.getVertexForIndex(0, VertexFormat.VF_POSITION, null, elevationGeometry.vertexCount);

            this.lodQuad = new LODQuad(null, this.vertex, elevationGeometry.segmentsW, elevationGeometry.segmentsH);
            this.wireframe.geometry.setVerticesForIndex(0, VertexFormat.VF_POSITION, this.vertex, elevationGeometry.vertexCount);
            this.wireframe.geometry.indexCount = elevationGeometry.faceCount * 6;
            this.addChild(this.wireframe);
        }

        /**
        * @language zh_CN
        * @private
        */

        protected bbb: boolean = true;
        public update(time: number, delay: number, camera: Camera3D) {
            super.update(time, delay, camera);
            var index: number = 0;
            if (this.bbb || true) {
                index = this.lodQuad.createIndex(index, this.geometry.indexArray, this.camera, 20);
                this.bbb = false;
                this.geometry.indexCount = index;
                this.geometry.bufferDiry = true;
                this.geometry.subGeometrys[0].count = this.geometry.indexCount;

                for (var i: number = 0; i < this.geometry.faceCount; ++i) {
                    this.wireframe.geometry.indexArray[i * 6 + 0] = this.geometry.indexArray[i * 3 + 0];
                    this.wireframe.geometry.indexArray[i * 6 + 1] = this.geometry.indexArray[i * 3 + 1];
                    this.wireframe.geometry.indexArray[i * 6 + 2] = this.geometry.indexArray[i * 3 + 1];
                    this.wireframe.geometry.indexArray[i * 6 + 3] = this.geometry.indexArray[i * 3 + 2];
                    this.wireframe.geometry.indexArray[i * 6 + 4] = this.geometry.indexArray[i * 3 + 2];
                    this.wireframe.geometry.indexArray[i * 6 + 5] = this.geometry.indexArray[i * 3 + 0];
                }

                this.wireframe.geometry.indexCount = this.geometry.faceCount * 6;

                this.wireframe.geometry.bufferDiry = true;
                if (this.wireframe.geometry.subGeometrys[0]) {
                    this.wireframe.geometry.subGeometrys[0].count = this.wireframe.geometry.indexCount;
                }
            }
        }
    }
}