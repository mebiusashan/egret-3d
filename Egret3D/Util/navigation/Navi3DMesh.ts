module egret3d
{

    /**
    * @language zh_CN
    * @class egret3d.Navi3DMesh
    * @classdesc
    * 解析寻路网格生成的对象
    * @version Egret 3.0
    * @platform Web,Native
    */
	export class Navi3DMesh
    {

        private _nav3dPoints: Array<Navi3DPoint>;
        private _nav3dEdges: Array<Navi3DEdge>;
        private _nav3dTriangles:Array<Navi3DTriangle>;
        private _path: Array<Vector3D>;
        /**
        * @language zh_CN
        * aId_bId的形式创建map表 a小于b
        * @version Egret 3.0
        * @platform Web,Native
        */
		private _edgesDict:DoubleArray;

        /**
        * @language zh_CN
        * AStar
        * @version Egret 3.0
        * @platform Web,Native
        */
        private _nav3dAstar: Navi3DAstar;

        /**
        * @language zh_CN
        * 路径分析对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        private _nav3dFunnel: Navi3DFunnel;

        /**
        * @language zh_CN
        * 四叉树
        * @version Egret 3.0
        * @platform Web,Native
        */
		private _terrainQuad:QuadRoot;

        /**
        * @language zh_CN
        * 寻路结果
        * @version Egret 3.0
        * @platform Web,Native
        */
        private _triangleList: Array<Navi3DTriangle>;

        /**
        * @language zh_CN
        * 网格中的边列表
        * @version Egret 3.0
        * @platform Web,Native
        */
		public get edges():Array<Navi3DEdge>
		{
            return this._nav3dEdges;
        }

        /**
        * @language zh_CN
        * 网格中的点列表
        * @returns  Array<Navi3DPoint> 点列表
        * @version Egret 3.0
        * @platform Web,Native
        */
		public get points():Array<Navi3DPoint>
		{
            return this._nav3dPoints;
        }

        /**
        * @language zh_CN
        * 寻路结果中，3d点位置列表
        * @returns Array<Vector3D> 3d点位置列表
        * @version Egret 3.0
        * @platform Web,Native
        */
		public get path():Array<Vector3D>
		{
            return this._path;
		}

        /**
        * @language zh_CN
        * 网格中的三角形列表
        * @returns Array<Navi3DTriangle> 三角形列表
        * @version Egret 3.0
        * @platform Web,Native
        */
		public get triangles():Array<Navi3DTriangle>
		{
            return this._nav3dTriangles;
		}
		
		
		/**
        * @language zh_CN
        * constructor
        * @param    pointList   顶点数据列表
        * @param    triangleIndexList   顶点顺序列表
        * @version Egret 3.0
        * @platform Web,Native
        */
		constructor(pointList:Array<Vector3D>, triangleIndexList:Array<Array<number>>)
		{
			this._nav3dPoints = new Array<Navi3DPoint>();
            this._nav3dEdges = new Array<Navi3DEdge>();
            this._nav3dTriangles = new Array<Navi3DTriangle>();
            this._edgesDict = new DoubleArray();
			
            this.initPoints(pointList);
            this.initEdgesAndTriangles(triangleIndexList);
			
            this.createConnections();
			
			
            this._nav3dAstar = new Navi3DAstar();
            this._nav3dFunnel = new Navi3DFunnel();
			
           
            this._terrainQuad = new QuadRoot(8, 128);
            this._terrainQuad.createQuadTree(this._nav3dTriangles);
		}

		/**
        * @language zh_CN
        * 输入一个点，获取一个能匹配的三角形
        * @param    point   输入的点
        * @param    threshold   结果三角形最大距离阈值
        * @returns   Navi3DTriangle 返回三角形
        * @version Egret 3.0
        * @platform Web,Native
        */
        public getTriangleAtPoint(point: Vector3D, threshold: number = 5):Navi3DTriangle
		{
			return this._terrainQuad.getTriangleAtPoint(point, threshold);
		}
		
		/**
        * @language zh_CN
        * 输入起点终点，搜寻路径
        * @param    startPt   起点
        * @param    endPt   终点
        * @param    aiRadius   寻路肥胖半径
        * @returns  boolean  是否成功
        * @version Egret 3.0
        * @platform Web,Native
        */
		public findPath(startPt:Vector3D, endPt:Vector3D, aiRadius:number = 5):boolean
		{
			this._path = null;
            this._triangleList = null;
			
			var startNode:Navi3DTriangle = this.getTriangleAtPoint(startPt, 10);
            var endNode: Navi3DTriangle = this.getTriangleAtPoint(endPt, 10);
			
            var success: boolean = this._nav3dAstar.findPath(this, startNode, endNode);
			if(success)
			{
                this._triangleList = this._nav3dAstar.channel;
                success = this._nav3dFunnel.searchPath(this, startPt, endPt, this._triangleList, aiRadius);
                this._path = this._nav3dFunnel.path;
				return success;
			}
			return false;
		}

        /**
        * @language zh_CN
        * 初始化顶点列表
        * @param    pointList   顶点坐标列表
        * @version Egret 3.0
        * @platform Web,Native
        */
		private initPoints(pointList:Array<Vector3D>):void
		{
			var point:Vector3D;
			var nevPoint:Navi3DPoint;
			var count:number = pointList.length;
			for(var i:number = 0; i < count; i ++)
			{
				point = pointList[i];
				nevPoint = new Navi3DPoint(i, point.x, point.y, point.z);
                this._nav3dPoints.push(nevPoint);
			}
		}

        /**
        * @language zh_CN
        * 初始化三角形和边列表
        * @param    triangleIndexList   三角形顶点顺序列表
        * @version Egret 3.0
        * @platform Web,Native
        */
		private initEdgesAndTriangles(triangleIndexList:Array<Array<number>>):void
		{
			var indexOrderList:Array<number>;
			
			var edge0:Navi3DEdge;
			var edge1:Navi3DEdge;
			var edge2:Navi3DEdge;
			
			var triangle:Navi3DTriangle;
			
			var count:number = triangleIndexList.length;
			for(var i:number = 0; i < count; i ++)
			{
				indexOrderList = triangleIndexList[i];
				edge0 = this.tryCreateEdge(indexOrderList[0], indexOrderList[1]);
                edge1 = this.tryCreateEdge(indexOrderList[1], indexOrderList[2]);
                edge2 = this.tryCreateEdge(indexOrderList[2], indexOrderList[0]);
				
				if(edge0 == null || edge1 == null || edge2 == null)
					continue;
				triangle = new Navi3DTriangle(i, edge0, edge1, edge2);
                this._nav3dTriangles.push(triangle);
			}
		}

        /**
        * @language zh_CN
        * 根据两个点的ID，创建一条边
        * @param    pointAId   点A
        * @param    pointBId   点B
        * @returns  Navi3DEdge  创建的边
        * @version Egret 3.0
        * @platform Web,Native
        */
        private tryCreateEdge(pointAId: number, pointBId: number): Navi3DEdge {
            if (pointAId == pointBId) {
                throw new Error("edge point index error!!!");
            }
            if (pointAId > pointBId) {
                var tempId: number = pointAId;
                pointAId = pointBId;
                pointBId = tempId;
            }
            var edge: Navi3DEdge = this._edgesDict.getValueByKey(pointAId + "_" + pointBId);
            if (edge == null) {
                edge = new Navi3DEdge(this._nav3dPoints[pointAId], this._nav3dPoints[pointBId]);
                this._nav3dEdges.push(edge);
                this._edgesDict.put(pointAId + "_" + pointBId, edge);

            }
            return edge;
        }

        /**
        * @language zh_CN
        * 创建关系表
        * @version Egret 3.0
        * @platform Web,Native
        */
		private createConnections():void
		{
            var triangleACount: number = this._nav3dTriangles.length;
            var triangleBCount: number = this._nav3dTriangles.length;
			var triangleA:Navi3DTriangle;
			var triangleB:Navi3DTriangle;
			var edge:Navi3DEdge;
            var publicEdge: Navi3DEdge;

            for (var i: number = 0; i < triangleACount; i++) {
                //边上面记录拥有这条边的三角形
                triangleA = this._nav3dTriangles[i];
                for (edge of triangleA.edges) {
                    edge.addTriangleOwners(triangleA);
                }


                for (var j: number = 0; j < triangleBCount; j++) {
                    //三角形相邻关系
                    triangleB = this._nav3dTriangles[j];
                    if (triangleA == triangleB)
                        continue;
                    publicEdge = triangleA.loopPublicEdge(triangleB);
                    if (publicEdge) {
                        triangleA.addNeibour(publicEdge, triangleB);
                        triangleB.addNeibour(publicEdge, triangleA);
                    }
                }
            }
			
		}
		
		
	}
}