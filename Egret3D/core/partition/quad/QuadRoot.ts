module egret3d {

    /**
    * @private
    * @language zh_CN
    * @class egret3d.QuadRoot
    * @classdesc
    * 创建四叉树的根对象。当前只能用于管理场景中静态的Object，
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class QuadRoot {

         /**
         * @language zh_CN
	     * 一个Cell中最多几个三角
	     */
        private _maxNodesPerCell: number;

        /**
         * @language zh_CN
	     * 一个cell单元最小划分到多小
	     */
        private _minCellSize: number;

        /**
         * @language zh_CN
	     * 四叉树
	     */
        private _quadTree: QuadTree;

        /**
         * @language zh_CN
	     * 碰撞到的三角
	     */
        private _collisionNodesIdx: Array<number>;

        /**
         * @language zh_CN
	     * 碰撞检测用aabb
	     */
        private _segBox: QuadAABB;


        /**
         * @language zh_CN
	     * 存放检测的nodes结果
	     */
        private _collisionNodes: Array<IQuadNode>;

        /**
        * @language zh_CN
        * constructor
        * @param maxNodesPerCell 一个Cell中最多几个节点
        * @param minCellSize 一个cell单元最小划分到多小
        */
        constructor(maxNodesPerCell: number = 10, minCellSize: number = 500) {
            this._maxNodesPerCell = maxNodesPerCell;
            this._minCellSize = minCellSize;
            this._segBox = new QuadAABB;
            this._collisionNodesIdx = new Array<number>();
            this._collisionNodes = new Array<IQuadNode>();
        }

        /**
        * @language zh_CN
        * 创建并构造四叉树
        * @param nodes 需要插入到四叉树中的节点列表
        */
        public createQuadTree(nodes: Array<IQuadNode>): void {

            this._quadTree = new QuadTree();
            this._quadTree.initNodes(nodes);
            this._quadTree.buildQuadTree(this._maxNodesPerCell, this._minCellSize);
        }



        /**
        * @language zh_CN
        * 在设定范围内，框选出一批节点
        * @param minX 框选范围最小x值
        * @param minY 框选范围最小y值
        * @param maxX 框选范围最大x值
        * @param maxY 框选范围最大y值
        * @return Array<IQuadNode>
        */
        public getNodesByAABB(minX: number, minY: number, maxX: number, maxY: number): Array<IQuadNode> {
            // 创建一个射线的boundingbox
            this._segBox.clear();
            this._segBox.maxPosX = maxX;
            this._segBox.maxPosY = maxY;
            this._segBox.minPosX = minX;
            this._segBox.minPosY = minY;

            // 获取Boundingbox中的nodes
            this._collisionNodesIdx.length = 0;
            this._collisionNodes.length = 0;
            var numNodes: number = this._quadTree.getNodesIntersectingtAABox(this._collisionNodesIdx, this._segBox);
            var quadNode: IQuadNode;
            for (var i: number = 0; i < this._collisionNodesIdx.length; i++) {
                quadNode = this._quadTree.getQuadNode(this._collisionNodesIdx[i]);
                this._collisionNodes.push(quadNode);
            }
            return this._collisionNodes;

        }

        /**
        * @language zh_CN
        * 给定一个三维坐标点，获取节点中最为接近的一个三角形
        * @param point 给定的点
        * @param threshold 设定的阈值，超出这个距离则视为放弃
        * @return Navi3DTriangle
        */
        public getTriangleAtPoint(point: Vector3D, threshold: number = 5): Navi3DTriangle {
            // 创建一个射线的boundingbox
            this._segBox.clear();
            this._segBox.setAABox(point.x, point.z, 1, 1);

            this._collisionNodesIdx.length = 0;
            this._collisionNodes.length = 0;
            // 获取Boundingbox中的node的ID
            var numTriangles: number = this._quadTree.getNodesIntersectingtAABox(this._collisionNodesIdx, this._segBox);

            // 检查那个三角与点(x,y)相交
            var minDistance: number = Number.MAX_VALUE;
            var curDistance: number = 0;
            var minTriangle: Navi3DTriangle;
            var quadNode: IQuadNode;
            var triangle: Navi3DTriangle;
            var box: QuadAABB;
            for (var i: number = 0; i < this._collisionNodesIdx.length; i++) {
                quadNode = this._quadTree.getQuadNode(this._collisionNodesIdx[i]);
                box = quadNode.aabb;
                if (!Navi3DTriangle.pointInsideTriangle(point, box.points[0], box.points[1], box.points[2])) {
                    continue;
                }
                triangle = <Navi3DTriangle>quadNode;
                curDistance = Math.abs(triangle.plane.distance(point));
                if (curDistance > threshold)
                    continue;
                if (quadNode == null || curDistance <= minDistance) {
                    minTriangle = triangle;
                    minDistance = curDistance;
                }
            }

            return minTriangle;
        }

    }
}
