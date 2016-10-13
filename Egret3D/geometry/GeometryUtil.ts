module egret3d {

    /**
    * @language zh_CN
    * @class egret3d.GeometryUtil
    * @classdesc
    * 创建Geometry的功能类
    * @see egret3d.Geometry
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class GeometryUtil {

        /**
        * @language zh_CN
        * 创建一个Geometry对象，指定了顶点的数据结构，但是顶点数据需要额外填充
        * @param vertexFromat 顶点数据格式，默认参数为 VertexFormat.VF_POSITION | VertexFormat.VF_NORMAL | VertexFormat.VF_TANGENT | VertexFormat.VF_COLOR | VertexFormat.VF_UV0 | VertexFormat.VF_UV1
        * @returns Geometry Geometry对象
        * @see egret3d.VertexFormat
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static createGeometry(vertexFromat: VertexFormat = VertexFormat.VF_POSITION | VertexFormat.VF_NORMAL | VertexFormat.VF_TANGENT | VertexFormat.VF_COLOR | VertexFormat.VF_UV0 | VertexFormat.VF_UV1): Geometry {
            var geo: Geometry = new Geometry();
            geo.vertexFormat = vertexFromat;
            return geo;
        }

        /**
        * @private
        * @language zh_CN
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static createGemetryForType(type: string, gemetry: any): Geometry {
            switch (type) {
                case "CubeGeometry":
                    return new CubeGeometry(gemetry.width, gemetry.height, gemetry.depth);
                case "CylinderGeometry":
                    return new CylinderGeometry(gemetry.height, gemetry.radius);
                case "ElevationGeometry":
                    return new ElevationGeometry(gemetry.heightmap, gemetry.width, gemetry.height, gemetry.depth, gemetry.segmentsW, gemetry.segmentsH);
                case "PlaneGeometry":
                    return new PlaneGeometry(gemetry.width, gemetry.height, gemetry.segmentsW, gemetry.segmentsH, gemetry.uScale, gemetry.vScale);
                case "SphereGeometry":
                    return new SphereGeometry(gemetry.r, gemetry.segmentsW, gemetry.segmentsH);
            }
            return null;
        }

        public static fromVertexFormatToLength(vf: VertexFormat): number {
            var length: number = 0;
            if (vf & VertexFormat.VF_POSITION) {
                length += Geometry.positionSize;
            }

            if (vf & VertexFormat.VF_NORMAL) {
                length += Geometry.normalSize;
            }

            if (vf & VertexFormat.VF_TANGENT) {
                length += Geometry.tangentSize;
            }

            if (vf & VertexFormat.VF_COLOR) {
                length += Geometry.colorSize;
            }

            if (vf & VertexFormat.VF_UV0) {
                length += Geometry.uvSize;
            }

            if (vf & VertexFormat.VF_UV1) {
                length += Geometry.uv2Size;
            }

            if (vf & VertexFormat.VF_SKIN) {
                length += Geometry.skinSize;
            }

            if (vf & VertexFormat.VF_QUAD_ORIGN) {
                length += QuadData.originalSize;
            }

            if (vf & VertexFormat.VF_QUAD_POS) {
                length += QuadData.posOffest;
            }

            if (vf & VertexFormat.VF_QUAD_UVREC) {
                length += QuadData.uvRectangleSize;
            }

            if (vf & VertexFormat.VF_QUAD_ROTATION) {
                length += QuadData.rotationSize;
            }

            if (vf & VertexFormat.VF_QUAD_MASK) {
                length += QuadData.maskSize;
            }

            if (vf & VertexFormat.VF_QUAD_COLOR) {
                length += QuadData.colorSize;
            }

            return length;
        }
    }
}