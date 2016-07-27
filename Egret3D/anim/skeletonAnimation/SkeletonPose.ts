module egret3d {

    /**
    * @language zh_CN
    * @class egret3d.SkeletonPose
    * @classdesc
    * SkeletonPose 类为单帧骨架动画数据，若干个SkeletonPose组合成SkeletonAnimationClip， 做为骨骼骨架序列数据
    * 
    * @version Egret 3.0
    * @platform Web,Native
    * @includeExample animation/skeletonAnimation/SkeletonPose.ts
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class SkeletonPose {

        /**
        * @language zh_CN
        * 骨架包含的骨骼
        * @version Egret 3.0
        * @platform Web,Native
        */
        public joints: Array<Joint> = [];

        /**
        * @language zh_CN
        * 当前骨架的帧时间
        * @version Egret 3.0
        * @platform Web,Native
        */
        public frameTime: number;

        private static _temp_v0: Vector3D = new Vector3D();
        private static _temp_v1: Vector3D = new Vector3D();
        private static _temp_v2: Vector3D = new Vector3D();
        private static _temp_q0: Quaternion = new Quaternion();
        private static _temp_q1: Quaternion = new Quaternion();
        private static _temp_q2: Quaternion = new Quaternion();
        private static _temp_jointMatrix: Matrix4_4 = new Matrix4_4();
        private static _temp_matrixDecomposeA: Vector3D[] = [new Vector3D(), new Vector3D(), new Vector3D()];
        private static _temp_matrixDecomposeB: Vector3D[] = [new Vector3D(), new Vector3D(), new Vector3D()];

        constructor() {
        }

        /**
        * @language zh_CN
        * 克隆新骨架对象
        * @returns Skeleton 新骨架对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        public clone(): SkeletonPose {

            var skeletonPose: SkeletonPose = new SkeletonPose();

            skeletonPose.frameTime = this.frameTime;

            for (var i: number = 0; i < this.joints.length; i++) {
                skeletonPose.joints.push(this.joints[i].clone());
            }

            return skeletonPose;
        }

        /**
        * @language zh_CN
        * 骨架插值计算
        * @param skeletonA 骨架A
        * @param skeletonB 骨架B
        * @param t 时间因子(0~1);
        * @version Egret 3.0
        * @platform Web,Native
        */
        public lerp(skeletonPoseA: SkeletonPose, skeletonPoseB: SkeletonPose, t: number): SkeletonPose {

            if (skeletonPoseA.joints.length != skeletonPoseB.joints.length) {
                throw Error("Bone number does not match!");
            }

            if (this.joints.length < skeletonPoseA.joints.length) {
                for (var i: number = this.joints.length; i <= skeletonPoseA.joints.length; ++i) {
                    this.joints.push(new Joint(""));
                }
            }

            this.frameTime = (skeletonPoseB.frameTime - skeletonPoseA.frameTime) * t + skeletonPoseA.frameTime;

            for (var i: number = 0; i < skeletonPoseA.joints.length; ++i) {

                var jointA: Joint = skeletonPoseA.joints[i];

                var jointB: Joint = skeletonPoseB.joints[i];

                var joint: Joint = this.joints[i];

                joint.name = jointA.name;

                joint.parent = jointA.parent;

                joint.parentIndex = jointA.parentIndex;

                joint.scale.lerp(jointA.scale, jointB.scale, t);

                joint.orientation.slerp(jointA.orientation, jointB.orientation, t);

                joint.translation.slerp(jointA.translation, jointB.translation, t);

                joint.buildLocalMatrix(joint.scale, joint.orientation, joint.translation);

                joint.worldMatrixValid = jointA.worldMatrixValid;

                if (joint.worldMatrixValid) {

                    //pos rot scale
                    var decomposeA: Vector3D[] = jointA.worldMatrix.decompose(Orientation3D.QUATERNION, SkeletonPose._temp_matrixDecomposeA);
                    var decomposeB: Vector3D[] = jointB.worldMatrix.decompose(Orientation3D.QUATERNION, SkeletonPose._temp_matrixDecomposeB);

                    //pos;
                    SkeletonPose._temp_v0.slerp(decomposeA[0], decomposeB[0], t);
                    //rot;
                    SkeletonPose._temp_q1.x = decomposeA[1].x;
                    SkeletonPose._temp_q1.y = decomposeA[1].y;
                    SkeletonPose._temp_q1.z = decomposeA[1].z;
                    SkeletonPose._temp_q1.w = decomposeA[1].w;
                    SkeletonPose._temp_q2.x = decomposeB[1].x;
                    SkeletonPose._temp_q2.y = decomposeB[1].y;
                    SkeletonPose._temp_q2.z = decomposeB[1].z;
                    SkeletonPose._temp_q2.w = decomposeB[1].w;
                    SkeletonPose._temp_q0.slerp(SkeletonPose._temp_q1, SkeletonPose._temp_q2, t);
                    //scale;
                    SkeletonPose._temp_v1.lerp(decomposeA[2], decomposeB[2], t);

                    joint.worldMatrix.makeTransform(SkeletonPose._temp_v0, SkeletonPose._temp_v1, SkeletonPose._temp_q0);
                }

                //this.joints.push(jointA.clone());

                //this.joints[i].worldMatrix.copyFrom(jointA.worldMatrix);

                //this.joints[i].worldMatrixValid = jointA.worldMatrixValid;
            }

            //this.calculateJointWorldMatrix();

            return this;
        }

        /**
        * @language zh_CN
        * 计算当前骨架内所有骨骼的世界矩阵
        * @version Egret 3.0
        * @platform Web,Native
        */
        public calculateJointWorldMatrix(): void {

            for (var i: number = 0; i < this.joints.length; ++i) {
                this.calculateAbsoluteMatrix(i);
            }
            
        }

        //递归函数，用于计算骨骼世界矩阵
        private calculateAbsoluteMatrix(jointIndex: number): void {

            var joint: Joint = this.joints[jointIndex];

            if (joint.parentIndex >= 0) {
                this.calculateAbsoluteMatrix(joint.parentIndex);
            }

            if (!joint.worldMatrixValid) {

                joint.worldMatrix.copyFrom(joint.localMatrix);

                if (joint.parentIndex >= 0) {
                    joint.worldMatrix.append(this.joints[joint.parentIndex].worldMatrix);
                }

                joint.worldMatrixValid = true;
            }
        }

        /**
        * @language zh_CN
        * 更新GPU所需的骨骼缓存数据
        * @param skeleton 蒙皮骨骼骨架
        * @returns Float32Array 缓存数据
        * @version Egret 3.0
        * @platform Web,Native
        */
        public updateGPUCacheData(skeleton: Skeleton, skeletonMatrixData: Float32Array, offset: Vector3D): Float32Array {

            for (var i: number = 0; i < skeleton.joints.length; ++i) {

                for (var j: number = 0; j < this.joints.length; ++j) {

                    if (skeleton.joints[i].name != this.joints[j].name)
                        continue;

                    SkeletonPose._temp_jointMatrix.copyFrom(skeleton.joints[i].inverseMatrix);

                    SkeletonPose._temp_jointMatrix.append(this.joints[j].worldMatrix);

                    var test: Vector3D[] = SkeletonPose._temp_jointMatrix.decompose(Orientation3D.QUATERNION, SkeletonPose._temp_matrixDecomposeA);

                    skeletonMatrixData[i * 8 + 0] = test[1].x;
                    skeletonMatrixData[i * 8 + 1] = test[1].y;
                    skeletonMatrixData[i * 8 + 2] = test[1].z;
                    skeletonMatrixData[i * 8 + 3] = test[1].w;

                    skeletonMatrixData[i * 8 + 4] = test[0].x - offset.x;
                    skeletonMatrixData[i * 8 + 5] = test[0].y - offset.y;
                    skeletonMatrixData[i * 8 + 6] = test[0].z - offset.z;

                    skeletonMatrixData[i * 8 + 7] = 1;

                    break;
                }

            }

            return skeletonMatrixData;
        }

        /**
        * @language zh_CN
        * 通过名称查找指定骨骼
        * @param name 骨骼名称
        * @return 骨骼对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        public findJoint(name: string): Joint {

            for (var i: number = 0; i < this.joints.length; i++) {
                if (this.joints[i].name == name)
                    return this.joints[i];
            }

            return null;
        }

        /**
        * @language zh_CN
        * 通过名称查找骨骼索引编号
        * @param name 骨骼名称
        * @returns number 骨骼索引编号
        * @version Egret 3.0
        * @platform Web,Native
        */
        public findJointIndex(name: string): number {

            if ("" == name)
                return -1;

            for (var i: number = 0; i < this.joints.length; i++) {
                if (this.joints[i].name == name)
                    return i;
            }

            return -1;
        }

        /**
        * @language zh_CN
        * 重置骨骼世界矩阵;
        * @param name 骨骼名称
        * @returns number 骨骼索引编号
        * @version Egret 3.0
        * @platform Web,Native
        */
        public resetWorldMatrix(): void {

            for (var i: number = 0; i < this.joints.length; i++) {
                this.joints[i].worldMatrixValid = false;
            }
        }
    }
}