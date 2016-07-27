module egret3d {
        
    /**
     * @private 
     * @language zh_CN
     * @class egret3d.ECAVersion
     * @classdesc
     */
    export class ECAVersion {
        static versionDictionary: any = {
            1: (bytes: ByteArray) => ECAVersion.parserVersion_1(bytes),
        };

        public static parserVersion_1(bytes: ByteArray): CameraAnimationController {
         
            var cameraAnimationController: CameraAnimationController = new CameraAnimationController();

            var nFrame: number = bytes.readUnsignedInt();

            var cameraAnimationFrame: CameraAnimationFrame = null;

            var scaling: Vector3D = new Vector3D(1, 1, 1, 1);

            while (nFrame--) {

                cameraAnimationFrame = new CameraAnimationFrame();

                cameraAnimationFrame.time = bytes.readInt();

                cameraAnimationFrame.fov = bytes.readFloat();

                cameraAnimationFrame.rotation = new Vector3D(
                    bytes.readFloat() * MathUtil.RADIANS_TO_DEGREES + 90,
                    bytes.readFloat() * MathUtil.RADIANS_TO_DEGREES,
                    bytes.readFloat() * MathUtil.RADIANS_TO_DEGREES);

                cameraAnimationFrame.translation = new Vector3D(
                    bytes.readFloat(),
                    bytes.readFloat(),
                    bytes.readFloat());

                cameraAnimationFrame.matrix = new Matrix4_4();
                cameraAnimationFrame.matrix.recompose([cameraAnimationFrame.translation, cameraAnimationFrame.rotation, scaling]);

                cameraAnimationController.cameraAnimationFrames.push(cameraAnimationFrame);
            }

            return cameraAnimationController;
        }
    }
} 