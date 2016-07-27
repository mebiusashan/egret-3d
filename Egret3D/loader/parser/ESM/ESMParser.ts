module egret3d {

    /**
     * @private 
     * @language zh_CN
     * @class egret3d.ESMParser
     * @classdesc
     * 用 ESMParser 类 解析.esm 文件
     */
    export class ESMParser {

        /**
          * @language zh_CN
          * 从二进制流中解析出模型Geometry信息
          * @param datas 加载的二进制流
          * @returns Geometry
          */
        public static parse(datas: ArrayBuffer): Geometry {

            var bytes: ByteArray = new ByteArray(datas);
            var fileFormatBytes: ByteArray = new ByteArray();
            bytes.readBytes(fileFormatBytes, 0, 3);
            var version: number = bytes.readUnsignedInt();

            if (!ESMVersion.versionDictionary[version]) {
                console.log("egret3d engine not found " + version + " version");
                return null;
            }

            var geomtryData: GeometryData = new GeometryData();
            ESMVersion.versionDictionary[version](bytes, geomtryData);
            var geomtry: Geometry;
            var vertexFormat: number = 0;
            if (geomtryData.source_skinData.length > 0) {
                vertexFormat = VertexFormat.VF_POSITION | VertexFormat.VF_NORMAL | VertexFormat.VF_TANGENT | VertexFormat.VF_COLOR | VertexFormat.VF_UV0 | VertexFormat.VF_SKIN;
                geomtry = GeometryData.buildGeomtry(geomtryData, vertexFormat);
            }
            else {
                vertexFormat = VertexFormat.VF_POSITION | VertexFormat.VF_NORMAL | VertexFormat.VF_TANGENT | VertexFormat.VF_COLOR | VertexFormat.VF_UV0 | VertexFormat.VF_UV1 ;
                geomtry = GeometryData.buildGeomtry(geomtryData, vertexFormat);
            }
            return geomtry;
        }
    }
}