module egret3d {

    /**
    * @language zh_CN
    * @class egret3d.Joint
    * @classdesc
    * Joint 类表示骨骼关节，属于骨架类的组成部分， Joint类属于骨架实现的内部类，无需直接实例化。
    * 
    * @version Egret 3.0
    * @platform Web,Native
    * @includeExample animation/skeletonAnimation/Joint.ts
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class Joint {

        /**
        * @language zh_CN
        * 骨骼名称
        * @version Egret 3.0
        * @platform Web,Native
        */
        public name: string;

        /**
        * @language zh_CN
        * 父骨骼名称
        * @version Egret 3.0
        * @platform Web,Native
        */
        public parent: string = null;

        /**
        * @language zh_CN
        * 父骨骼索引编号
        * @version Egret 3.0
        * @platform Web,Native
        */
        public parentIndex: number;

        /**
        * @language zh_CN
        * 骨骼缩放量
        * @version Egret 3.0
        * @platform Web,Native
        */
        public scale: Vector3D;

        /**
        * @language zh_CN
        * 骨骼旋转量
        * @version Egret 3.0
        * @platform Web,Native
        */
        public orientation: Quaternion;

        /**
        * @language zh_CN
        * 骨骼平移量
        * @version Egret 3.0
        * @platform Web,Native
        */
        public translation: Vector3D;

        /**
        * @language zh_CN
        * 骨骼本地矩阵
        * @version Egret 3.0
        * @platform Web,Native
        */
        public localMatrix: Matrix4_4;

        /**
        * @language zh_CN
        * 骨骼逆矩阵
        * @version Egret 3.0
        * @platform Web,Native
        */
        public inverseMatrix: Matrix4_4;

        /**
        * @language zh_CN
        * 骨骼世界矩阵
        * @version Egret 3.0
        * @platform Web,Native
        */
        public worldMatrix: Matrix4_4;

        /**
        * @language zh_CN
        * 骨骼世界矩阵是否有效
        * @version Egret 3.0
        * @platform Web,Native
        */
        public worldMatrixValid: boolean;

        /**
        * @language zh_CN
        * 构造函数
        * @param name 骨骼名称
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor(name: string) {
            this.name = name;
            this.parentIndex = -1;
            this.scale = new Vector3D(1, 1, 1);
            this.orientation = new Quaternion();
            this.translation = new Vector3D();
            this.localMatrix = new Matrix4_4();
            this.worldMatrix = new Matrix4_4();
            this.worldMatrixValid = false;
        }

        /**
        * @language zh_CN
        * 克隆新骨骼对象
        * @returns Joint 新骨骼对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        public clone(): Joint {
            var joint: Joint = new Joint(this.name);
            joint.parent = this.parent;
            joint.parentIndex = this.parentIndex;
            joint.scale.copyFrom(this.scale);
            joint.orientation.copyFrom(this.orientation);
            joint.translation.copyFrom(this.translation);
            joint.localMatrix.copyFrom(this.localMatrix);
            joint.worldMatrix.copyFrom(this.worldMatrix);
            joint.worldMatrixValid = this.worldMatrixValid;
            return joint;
        }

        /**
        * @language zh_CN
        * 构建骨骼本地矩阵
        * @version Egret 3.0
        * @platform Web,Native
        */
        public buildLocalMatrix(scale: Vector3D, rotation: Vector3D | Quaternion, translation: Vector3D): void {
            this.scale.copyFrom(scale);
            this.translation.copyFrom(translation);
            if (rotation instanceof Vector3D) {
                this.orientation.fromEulerAngles(rotation.x, rotation.y, rotation.z);
            }
            else {
                this.orientation.copyFrom(rotation);
            }
            this.localMatrix.makeTransform(this.translation, this.scale, this.orientation);
            this.worldMatrixValid = false;
        }

        /**
        * @language zh_CN
        * 构建骨骼逆矩阵
        * @version Egret 3.0
        * @platform Web,Native
        */
        public buildInverseMatrix(scale: Vector3D, rotation: Vector3D | Quaternion, translation: Vector3D): void {
            if (!this.inverseMatrix) {
                this.inverseMatrix = new Matrix4_4();
            }
            if (rotation instanceof Vector3D) {
                this.inverseMatrix.recompose([translation, rotation, scale]);
            }
            else {
                this.inverseMatrix.makeTransform(translation, scale, rotation);
            }
        }
    }
}