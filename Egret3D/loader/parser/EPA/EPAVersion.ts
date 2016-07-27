module egret3d {

    /**
     * @private 
     * @language zh_CN
     * @class egret3d.EPAVersion
     * @classdesc
     */
    export class EPAVersion {
        static versionDictionary: any = {
            1: (bytes: ByteArray) => EPAVersion.parserVersion_1(bytes),
        };

        public static parserVersion_1(bytes: ByteArray): PropertyAnim {

            var propertyAnim: PropertyAnim = new PropertyAnim();

            //属性个数;
            var propertyCount: number = bytes.readUnsignedShort()

            for (var i = 0; i < propertyCount; i++) {

                //属性名称;
                var propertyName: string = bytes.readUTF();

                var keyFrames: AnimCurve[] = [];

                //曲线数量;
                var curveCount: number = bytes.readUnsignedShort();

                for (var j = 0; j < curveCount; j++) {

                    var animCurve: AnimCurve = new AnimCurve();
                    animCurve.type = bytes.readUnsignedInt();
                    animCurve.start.x = bytes.readFloat();
                    animCurve.start.y = bytes.readFloat();
                    animCurve.end.x = bytes.readFloat();
                    animCurve.end.y = bytes.readFloat();
                    animCurve.c1.x = bytes.readFloat();
                    animCurve.c1.y = bytes.readFloat();
                    animCurve.c2.x = bytes.readFloat();
                    animCurve.c2.y = bytes.readFloat();
                    keyFrames.push(animCurve);
                }

                propertyAnim.addAnimCurve(propertyName, keyFrames);
            }

            return propertyAnim;
        }
    }
} 