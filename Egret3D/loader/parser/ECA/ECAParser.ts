module egret3d {

    /**
     * @private 
     * @language zh_CN
     * @class egret3d.ECAParser
     * @classdesc
     * 用 EAMParser 类 解析.eca 文件
     */
    export class ECAParser {

        /**
         * @language zh_CN
         * @param datas 加载的二进制流
         * @returns CameraAnimationController
         */
        public static parse(datas: ArrayBuffer): CameraAnimationController {
            var bytes: ByteArray = new ByteArray(datas);
            var fileFormatBytes: ByteArray = new ByteArray();
            bytes.readBytes(fileFormatBytes, 0, 3);
            var version: number = bytes.readUnsignedInt();

            if (!ECAVersion.versionDictionary[version]) {
                console.log("egret3d engine not found " + version + " version");
                return null;
            }
            return ECAVersion.versionDictionary[version](bytes);
        }
    }
}