module egret3d {

    /**
     * @private 
     * @language zh_CN
     * @class egret3d.EPAParser
     * @classdesc
     * 用 EPMParser 类 解析.epa 文件
     */
    export class EPAParser {

        /**
         * @language zh_CN
         * @param datas 加载的二进制流
         * @returns PropertyAnim
         */
        public static parse(datas: ArrayBuffer): PropertyAnim {
            var bytes: ByteArray = new ByteArray(datas);

            //验证标识头：'E' 'P' 'A' '\0'
            if (bytes.readUnsignedInt() != 0x65706100) {
                return null;
            }

            //版本号;
            var version: number = bytes.readUnsignedInt();

            if (!EPAVersion.versionDictionary[version]) {
                console.log("egret3d engine not found " + version + " version");
                return null;
            }
            return EPAVersion.versionDictionary[version](bytes);
        }
    }
}