module egret3d {

    /**
    * @language zh_CN
    * @class egret3d.Skeleton
    * @classdesc
    * Skeleton 类表示骨架类，其中包含若干个 Joint（骨骼关节） 对象。
    * 
    * @version Egret 3.0
    * @platform Web,Native
    * @includeExample animation/skeletonAnimation/Skeleton.ts
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class Skeleton {

        /**
        * @language zh_CN
        * 骨架包含的骨骼
        * @version Egret 3.0
        * @platform Web,Native
        */
        public joints: Array<Joint> = [];

        constructor() {
        }

        /**
        * @language zh_CN
        * 克隆新骨架对象
        * @returns Skeleton 新骨架对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        public clone(): Skeleton {

            var skeleton: Skeleton = new Skeleton();

            for (var i: number = 0; i < this.joints.length; i++) {
                skeleton.joints.push(this.joints[i].clone());
            }

            return skeleton;
        }

        /**
        * @language zh_CN
        * 骨骼数量
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get jointNum(): number {
            return this.joints.length;
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

            for (var i: number = 0; i < this.joints.length; i++) {
                if (this.joints[i].name == name)
                    return i;
            }

            return -1;
        }
    }
}