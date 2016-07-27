module egret3d {
    export class SkeletonAnimationClip {

        /**
        * @language zh_CN
        * 每帧的SkeletonPose
        * @version Egret 3.0
        * @platform Web,Native
        */
        public poseArray: Array<SkeletonPose> = [];

        public animationName: string = "";


        //流数据解析测试;
        public sampling: number = 0;
        public boneCount: number = 0;
        public frameDataOffset: number = 0;
        public sourceData: ByteArray = null;
        private _frameCount: number = 0;

        private _timeLength: number = 0;
        private _skeletonPose: SkeletonPose = null;
        private _temp_scale: Vector3D = new Vector3D();
        private _temp_translation: Vector3D = new Vector3D();
        private _temp_orientation: Quaternion = new Quaternion();

        constructor() {
        }

        public get currentSkeletonPose(): SkeletonPose {
            return this._skeletonPose;
        }

        public get frameCount(): number {
            if (this.poseArray.length > 0) {
                return this.poseArray.length;
            }
            return this._frameCount;
        }

        public findJointIndex(name: string): number {
            if (!this._skeletonPose) {

                if (this.poseArray.length <= 0) {
                    return -1;
                }

                return this.poseArray[0].findJointIndex(name);
            }

            return this._skeletonPose.findJointIndex(name);
        }

        public addSkeletonPose(skeletonPose: SkeletonPose): void {
            this.poseArray.push(skeletonPose);
        }

        public buildInitialSkeleton(boneNameArray: string[], parentBoneNameArray: string[], frameCount: number): void {

            if (this._skeletonPose) {
                return;
            }

            this._frameCount = frameCount;

            this._skeletonPose = new SkeletonPose();

            for (var j: number = 0; j < this.boneCount; j++) {

                var jointPose: Joint = new Joint(boneNameArray[j]);

                jointPose.parent = parentBoneNameArray[j];

                jointPose.parentIndex = this._skeletonPose.findJointIndex(jointPose.parent);

                this._skeletonPose.joints.push(jointPose);
            }

            this.sourceData.position = this.frameDataOffset + (40 * this.boneCount + 4) * (this.frameCount - 1);

            this._timeLength = this.sourceData.readInt() / 60 / 80 * 1000;
        }

        public getSkeletonPose(index: number): SkeletonPose {

            if (this.poseArray.length > 0) {
                return this.poseArray[index];
            }
                                                    //Test;
            if (index < 0 || index >= this.frameCount * 2) {
                return null;
            }

            //Test;
            index = Math.floor(index / 2);

            return this.readSkeletonPose(index, this._skeletonPose);
        }

        private readSkeletonPose(index: number, skeletonPose: SkeletonPose): SkeletonPose {

            this.sourceData.position = this.frameDataOffset + (40 * this.boneCount + 4) * index; //每帧数据需要40 * 骨骼数 + 4字节;

            skeletonPose.frameTime = this.sourceData.readInt() / 60 / 80 * 1000;

            for (var j: number = 0; j < this.boneCount; j++) {

                //读取旋转四元数分量;
                this._temp_orientation.x = this.sourceData.readFloat();
                this._temp_orientation.y = this.sourceData.readFloat();
                this._temp_orientation.z = this.sourceData.readFloat();
                this._temp_orientation.w = this.sourceData.readFloat();

                //读取缩放分量;
                this._temp_scale.x = this.sourceData.readFloat();
                this._temp_scale.y = this.sourceData.readFloat();
                this._temp_scale.z = this.sourceData.readFloat();

                //读取平移分量;
                this._temp_translation.x = this.sourceData.readFloat();
                this._temp_translation.y = this.sourceData.readFloat();
                this._temp_translation.z = this.sourceData.readFloat();

                skeletonPose.joints[j].worldMatrixValid = false;

                skeletonPose.joints[j].buildLocalMatrix(this._temp_scale, this._temp_orientation, this._temp_translation);
            }

            skeletonPose.calculateJointWorldMatrix();

            return skeletonPose;
        }

        /**
        * @language zh_CN
        * 时间长度
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get timeLength(): number {
            if (this.poseArray.length > 0) {
                return this.poseArray[this.poseArray.length - 1].frameTime;
            }
            return this._timeLength;
        }

        /**
        * @language zh_CN
        * 骨骼数量
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get jointNum(): number {
            if (this.poseArray.length > 0) {
                return this.poseArray[0].joints.length;
            }
            return this.boneCount;
        }

        /**
        * @language zh_CN
        * 克隆SkeletonAnimationClip对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        public clone(): SkeletonAnimationClip {

            var skeletonAnimationClip: SkeletonAnimationClip = new SkeletonAnimationClip();

            skeletonAnimationClip.animationName = this.animationName;

            skeletonAnimationClip.poseArray = this.poseArray;

            skeletonAnimationClip.sampling = this.sampling;
            skeletonAnimationClip.boneCount = this.boneCount;
            skeletonAnimationClip._frameCount = this._frameCount;
            skeletonAnimationClip.frameDataOffset = this.frameDataOffset;
            skeletonAnimationClip.sourceData = this.sourceData;
            skeletonAnimationClip._timeLength = this._timeLength;
            skeletonAnimationClip._skeletonPose = this._skeletonPose;

            if (this._skeletonPose) {
                skeletonAnimationClip._skeletonPose = this._skeletonPose.clone();
            }

            return skeletonAnimationClip;
        }
    }
}