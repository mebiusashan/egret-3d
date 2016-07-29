module egret3d {
        
    /**
     * @private 
     * @language zh_CN
     * @class egret3d.EAMVersion
     * @classdesc
     * 
     */
    export class EAMVersion {
        static versionDictionary: any = {
            1: (bytes: ByteArray) => EAMVersion.parserVersion_1(bytes),
            2: (bytes: ByteArray) => EAMVersion.parserVersion_2(bytes),
            3: (bytes: ByteArray) => EAMVersion.parserVersion_3(bytes),
        };

        public static parserVersion_1(bytes: ByteArray): SkeletonAnimationClip {

            var boneCount: number = bytes.readUnsignedByte();

            var sampling: number = bytes.readUnsignedByte();

            if (boneCount <= 0)
                return null;

            var skeletonAnimationClip: SkeletonAnimationClip = new SkeletonAnimationClip();

            var boneNameArray: Array<string> = new Array<string>();

            var parentBoneNameArray: Array<string> = new Array<string>();

            for (var i: number = 0; i < boneCount; i++) {

                boneNameArray.push(bytes.readUTF());

                parentBoneNameArray.push(bytes.readUTF());

            }

            var frameCount: number = bytes.readInt();

            var nCount: number = bytes.readInt();

            var orientation: Quaternion = new Quaternion();

            var scale: Vector3D = new Vector3D();

            var translation: Vector3D = new Vector3D();

            for (var i: number = 0; i < nCount; i++) {

                var skeletonPose: SkeletonPose = new SkeletonPose();

                skeletonPose.frameTime = bytes.readInt() / 60 / 80 * 1000;

                for (var j: number = 0; j < boneCount; j++) {

                    var jointPose: Joint = new Joint(boneNameArray[j]);

                    jointPose.parent = parentBoneNameArray[j];

                    jointPose.parentIndex = skeletonPose.findJointIndex(jointPose.parent);

                    orientation.fromEulerAngles(bytes.readFloat() * MathUtil.RADIANS_TO_DEGREES, bytes.readFloat() * MathUtil.RADIANS_TO_DEGREES, bytes.readFloat() * MathUtil.RADIANS_TO_DEGREES);

                    scale.x = bytes.readFloat();
                    scale.y = bytes.readFloat();
                    scale.z = bytes.readFloat();

                    translation.x = bytes.readFloat();
                    translation.y = bytes.readFloat();
                    translation.z = bytes.readFloat();

                    jointPose.buildLocalMatrix(scale, orientation, translation);

                    skeletonPose.joints.push(jointPose);
                }

                skeletonPose.calculateJointWorldMatrix();

                skeletonAnimationClip.addSkeletonPose(skeletonPose);
            }

            return skeletonAnimationClip;
        }

        public static parserVersion_2(bytes: ByteArray): SkeletonAnimationClip {

            //读取骨骼数;
            var boneCount: number = bytes.readUnsignedByte();

            //读取采样率;
            var sampling: number = bytes.readUnsignedByte();

            if (boneCount <= 0)
                return null;

            var skeletonAnimationClip: SkeletonAnimationClip = new SkeletonAnimationClip();

            var boneNameArray: Array<string> = new Array<string>();

            var parentBoneNameArray: Array<string> = new Array<string>();

            //读取骨骼名称;
            for (var i: number = 0; i < boneCount; i++) {
                boneNameArray.push(bytes.readUTF());
                parentBoneNameArray.push(bytes.readUTF());
            }

            //读取帧数;
            var frameCount: number = bytes.readInt();

            //读取数量;
            var nCount: number = bytes.readInt();

            //流数据;
            if (boneCount * frameCount >= 10000 && false) {
                skeletonAnimationClip.sampling = sampling;
                skeletonAnimationClip.boneCount = boneCount;
                skeletonAnimationClip.frameDataOffset = bytes.position;
                skeletonAnimationClip.sourceData = bytes;
                skeletonAnimationClip.buildInitialSkeleton(boneNameArray, parentBoneNameArray, nCount);
            }
            else {

                var orientation: Quaternion = new Quaternion();

                var scale: Vector3D = new Vector3D();

                var translation: Vector3D = new Vector3D();

                for (var i: number = 0; i < nCount; i++) {

                    var skeletonPose: SkeletonPose = new SkeletonPose();

                    //读取该帧时刻;
                    skeletonPose.frameTime = bytes.readInt() / 60 / 80 * 1000;

                    for (var j: number = 0; j < boneCount; j++) {

                        var jointPose: Joint = new Joint(boneNameArray[j]);

                        jointPose.parent = parentBoneNameArray[j];

                        jointPose.parentIndex = skeletonPose.findJointIndex(jointPose.parent);

                        //读取旋转四元数分量;
                        orientation.x = bytes.readFloat();
                        orientation.y = bytes.readFloat();
                        orientation.z = bytes.readFloat();
                        orientation.w = bytes.readFloat();

                        //读取缩放分量;
                        scale.x = bytes.readFloat();
                        scale.y = bytes.readFloat();
                        scale.z = bytes.readFloat();

                        //读取平移分量;
                        translation.x = bytes.readFloat();
                        translation.y = bytes.readFloat();
                        translation.z = bytes.readFloat();

                        jointPose.buildLocalMatrix(scale, orientation, translation);

                        skeletonPose.joints.push(jointPose);
                    }

                    skeletonPose.calculateJointWorldMatrix();

                    skeletonAnimationClip.addSkeletonPose(skeletonPose);
                }

            }

            return skeletonAnimationClip;
        }

        public static parserVersion_3(bytes: ByteArray): SkeletonAnimationClip {
            return null;
        }
    }
} 