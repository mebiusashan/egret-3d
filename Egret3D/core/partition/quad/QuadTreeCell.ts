module egret3d {

    /**
    * @private
    * @language zh_CN
    * @class egret3d.QuadTreeCell
    * @classdesc
    * 四叉树叶子节点
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class QuadTreeCell {

        /**
        * @language zh_CN
        * 一个叶子单元最多包含子叶子树4个
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static NUM_CHILDREN: number = 4;

        /**
        * @language zh_CN
        * (如果不是leaf)子节点的index, -1表示无子节点
        * @version Egret 3.0
        * @platform Web,Native
        */
        public childCellIndices: Array<number>;
        
        /**
        * @language zh_CN
        * (如果是leaf) 三角面的index
        * @version Egret 3.0
        * @platform Web,Native
        */
        public nodeIndices: Array<number>;

        /**
        * @language zh_CN
        * 该节点的包围框
        * @version Egret 3.0
        * @platform Web,Native
        */
        public aabb: QuadAABB;

       /**
        * @language zh_CN
        * 该叶子里面含有的顶点信息
        * @version Egret 3.0
        * @platform Web,Native
        */
        public points: Array<Vector3D>;

        /**
        * @language zh_CN
        * constructor
        * @param aabox 该叶子的包围盒
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor(aabox: QuadAABB) {
            this.childCellIndices = new Array<number>();
            this.childCellIndices.length = QuadTreeCell.NUM_CHILDREN;

            this.nodeIndices = new Array<number>();

            this.clear();

            if (aabox) {
                this.aabb = aabox.clone();
            } else {
                this.aabb = new QuadAABB();
            }
        }

        /**
        * @language zh_CN
        * Indicates if we contain triangles (if not then we should/might have children)
        * @version Egret 3.0
        * @platform Web,Native
        */
        public isLeaf(): boolean {
            return this.childCellIndices[0] == -1;
        }

        /**
        * @language zh_CN
        * 重置该叶子
        * @version Egret 3.0
        * @platform Web,Native
        */
        public clear(): void {
            for (var i: number = 0; i < QuadTreeCell.NUM_CHILDREN; i++) {
                this.childCellIndices[i] = -1;
            }
            this.nodeIndices.splice(0, this.nodeIndices.length);
        }


    }
}