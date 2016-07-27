module egret3d {

    /**
     * @private 
     * @language zh_CN
     * @class egret3d.EAMParser
     * @classdesc
     * 用 EAMParser 类 解析.eam 文件
     */
    export class EAMParser {

       /**
        * @language zh_CN
        * @param datas 加载的二进制流
        * @returns SkeletonAnimationClip
        */
        public static parse(datas: ArrayBuffer): SkeletonAnimationClip {
            var bytes: ByteArray = new ByteArray(datas);

            var fileFormatBytes: ByteArray = new ByteArray();
            bytes.readBytes(fileFormatBytes, 0, 3);

            var version: number = bytes.readUnsignedInt();


            if (!EAMVersion.versionDictionary[version]) {
                console.log("egret3d engine not found " + version + " version");
                return null;
            }

            return EAMVersion.versionDictionary[version](bytes);
        }
    }
}