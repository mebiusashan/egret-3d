module egret3d {

    /**
    * @language zh_CN
    * @class egret3d.Navi3DTriangle
    * @classdesc
    * 纯2d的点
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class Navi3DTriangle extends Vector3D implements IQuadNode {

        private _id: number = 0;
        private _plane: Plane3D;
        private _points: Array<Navi3DPoint> = new Array<Navi3DPoint>();

        private _edges: Array<Navi3DEdge> = new Array<Navi3DEdge>();

        /**
        * @language zh_CN
        * 相邻三角形
        * @version Egret 3.0
        * @platform Web,Native
        */
        private _neibourTriangles: DoubleArray = new DoubleArray();

        /**
        * @language zh_CN
        * 点正对的边的关系表
        * @version Egret 3.0
        * @platform Web,Native
        */
        private _pointAgainstEdge: DoubleArray = new DoubleArray();

        /**
        * @language zh_CN
        * 边正对着点的关系表
        * @version Egret 3.0
        * @platform Web,Native
        */
        private _edgeAgainstPoint: DoubleArray = new DoubleArray();

        /**
        * @language zh_CN
        * 通过属性
        * @version Egret 3.0
        * @platform Web,Native
        */
        private _mask: number = 0;
        

        /**
        * @language zh_CN
        * 该三角形在四叉树里的包围盒
        * @version Egret 3.0
        * @platform Web,Native
        */
        private _aabbBox: QuadAABB;

        /**
        * @language zh_CN
        * f -- astar
        * @version Egret 3.0
        * @platform Web,Native
        */
        public f: number = 0;

        /**
        * @language zh_CN
        * g -- astar
        * @version Egret 3.0
        * @platform Web,Native
        */
        public g: number = 0;

        /**
        * @language zh_CN
        * h -- astar
        * @version Egret 3.0
        * @platform Web,Native
        */
        public h: number = 0;

        /**
        * @language zh_CN
        * 上一个节点 -- astar
        * @version Egret 3.0
        * @platform Web,Native
        */
        public parent: Navi3DTriangle;

        /**
        * @language zh_CN
        * costMultiplier
        * @version Egret 3.0
        * @platform Web,Native
        */
        public costMultiplier: number = 1.0;

        /**
        * @language zh_CN
        * 开区间ID，标记寻路批次用
        * @version Egret 3.0
        * @platform Web,Native
        */
        public openId: number = 0;

        /**
        * @language zh_CN
        * 闭区间ID，标记寻路批次用
        * @version Egret 3.0
        * @platform Web,Native
        */
        public closeId: number = 0;

        /**
        * @language zh_CN
        * 静态变量2d点
        * @version Egret 3.0
        * @platform Web,Native
        */
        private static p1: Navi3DPoint2D = new Navi3DPoint2D();

        /**
        * @language zh_CN
        * 静态变量2d点
        * @version Egret 3.0
        * @platform Web,Native
        */
        private static p2: Navi3DPoint2D = new Navi3DPoint2D();

        /**
        * @language zh_CN
        * 静态变量2d点
        * @version Egret 3.0
        * @platform Web,Native
        */
        private static p3: Navi3DPoint2D = new Navi3DPoint2D();

        /**
        * @language zh_CN
        * 静态变量2d点
        * @version Egret 3.0
        * @platform Web,Native
        */
        private static pp: Navi3DPoint2D = new Navi3DPoint2D();


        public get aabb(): QuadAABB {
            return this._aabbBox;
        }

        /**
        * @language zh_CN
        * 初始化包围盒（实现IQuadNode的接口）
        * @version Egret 3.0
        * @platform Web,Native
        */
        public initAABB(): void {
            this._aabbBox = new QuadAABB();
            //添加节点
            this._aabbBox.addPoint(this._points[0]);
            this._aabbBox.addPoint(this._points[1]);
            this._aabbBox.addPoint(this._points[2]);
        }

        /**
        * @language zh_CN
        * 该quad是否是三角形（实现IQuadNode的接口）
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get isTriangle(): boolean {
            return true;
        }

        /**
        * @language zh_CN
        * constructor
        * @param    Id   ID
        * @param    edgeA   三角形边A
        * @param    edgeB   三角形边B
        * @param    edgeC   三角形边C
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor(Id: number, edgeA: Navi3DEdge, edgeB: Navi3DEdge, edgeC: Navi3DEdge) {
            super(0, 0, 0, 0);

            this._id = Id;
            this._mask = Navi3DMaskType.WalkAble;
            this._edges.push(edgeA, edgeB, edgeC);
            var edge: Navi3DEdge;
            for (edge of this._edges) {
                if (this._points.indexOf(edge.pointA) == -1) {
                    this._points.push(edge.pointA);
                }
                if (this._points.indexOf(edge.pointB) == -1) {
                    this._points.push(edge.pointB);
                }
            }

            this.x = (this._points[0].x + this._points[1].x + this._points[2].x) / 3;
            this.y = (this._points[0].y + this._points[1].y + this._points[2].y) / 3;
            this.z = (this._points[0].z + this._points[1].z + this._points[2].z) / 3;

            this._plane = new Plane3D();
            this._plane.fromPoints(this._points[0], this._points[1], this._points[2]);
            this._plane.normalize();

            this.genarateAgainstData();

            this.initAABB();
        }


        /**
        * @language zh_CN
        * @private
        * 构建点正对着的边，以及边正对着的点的哈希表
        * @version Egret 3.0
        * @platform Web,Native
        */
        private genarateAgainstData(): void {
            var edge: Navi3DEdge;
            var point: Navi3DPoint;
            for (edge of this._edges) {
                for (point of this._points) {
                    if (edge.pointA != point && edge.pointB != point) {
                        this._edgeAgainstPoint.put(edge, point);
                        this._pointAgainstEdge.put(point, edge);
                    }
                }
            }
        }

        /**
        * @language zh_CN
        * @return 三角形的ID，在Navi3DMesh中的唯一ID
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get id(): number {
            return this._id;
        }

        /**
        * @language zh_CN
        * @return 该三角形所在平面
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get plane(): Plane3D {
            return this._plane;
        }

        /**
        * @language zh_CN
        * @return 该三角形的三个顶点
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get points(): Array<Navi3DPoint> {
            return this._points;
        }

        /**
        * @language zh_CN
        * 加入相邻三角形
        * param edge     公共边
        * param triangle 相邻三角形
        * @version Egret 3.0
        * @platform Web,Native
        */
        public addNeibour(edge: Navi3DEdge, triangle: Navi3DTriangle): void {
            if (this._edges.indexOf(edge) >= 0) {
                this._neibourTriangles.put(edge, triangle);
            }
            else {
                throw new Error("the edge is not in triangle!!!");
            }
        }

        /**
        * @language zh_CN
        * 获取相邻三角形列表
        * @param list            用于存储结果
        * @param edgeMask        边的通过属性过滤
        * @param triangleMask    三角形通过属性过滤
        * @returns Array<Navi3DTriangle> 获得到的相邻三角形的队列
        * @version Egret 3.0
        * @platform Web,Native
        */
        public getNeibourTriangles(list: Array<Navi3DTriangle> = null, edgeMask: number = 1, triangleMask: number = 1): Array<Navi3DTriangle> {
            list = list || new Array<Navi3DTriangle>();
            list.length = 0;
            var neibour: Navi3DTriangle;
            var edge: Navi3DEdge;
            var keys: Array<any> = this._neibourTriangles.getKeys();
            var obj: any;
            for (obj of keys) {
                edge = <Navi3DEdge>obj;
                if (edge.testMask(edgeMask)) {
                    neibour = this._neibourTriangles.getValueByKey(edge);
                    if (neibour.testMask(triangleMask)) {
                        list.push(neibour);
                    }
                }
            }
            return list;

        }

        /**
        * @language zh_CN
        * 使用mask对所有的边进行过滤，获得结果
        * @param list            用于存储结果
        * @param edgeMask        边的通过属性过滤
        * @returns Array<Navi3DEdge> 获得到的边的队列
        * @version Egret 3.0
        * @platform Web,Native
        */
        public getEdges(list: Array<Navi3DEdge> = null, edgeMask: number = 1): Array<Navi3DEdge> {
            list = list || new Array<Navi3DEdge>();
            list.length = 0;
            var edge: Navi3DEdge;
            for (edge of this._edges)
            {
                if (edge.testMask(edgeMask)) {
                    list.push(edge);
                }
            }
            return list;
        }

        /**
        * @language zh_CN
        * 获得通过属性
        * @returns boolean 是否通过
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get walkAble(): boolean {
            return this.testMask(Navi3DMaskType.WalkAble);
        }

        /**
        * @language zh_CN
        * 该三角形的三条边
        * @returns 该三角形的三条边
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get edges(): Array<Navi3DEdge> {
            return this._edges;
        }

        /**
        * @language zh_CN
        * 获得通过属性
        * @param value      用于过滤的值
        * @returns boolean 是否通过
        * @version Egret 3.0
        * @platform Web,Native
        */
        public testMask(value: number): boolean {
            return (this._mask & value) == value;
        }

        /**
        * @language zh_CN
        * 根据三角形的一边获取另外一个点
        * @param edge      输入边
        * @returns Navi3DPoint 端点
        * @version Egret 3.0
        * @platform Web,Native
        */
        public getEdgeAgainstPoint(edge: Navi3DEdge): Navi3DPoint {
            return this._edgeAgainstPoint.getValueByKey(edge);
        }

        /**
        * @language zh_CN
        * 根据一个顶点，获取对面的边
        * @param point     输入点
        * @returns Navi3DEdge 边
        * @version Egret 3.0
        * @platform Web,Native
        */
        public getPointAgainstEdge(point: Navi3DPoint): Navi3DEdge {
            return this._pointAgainstEdge.getValueByKey(point);
        }

        /**
        * @language zh_CN
        * 稍微快一些的共边检测，需要等到mesh初始化完毕才可以
        * @param triangle  三角形
        * @returns Navi3DEdge 公共边
        * @version Egret 3.0
        * @platform Web,Native
        */
        public getPublicEdge(triangle: Navi3DTriangle): Navi3DEdge {
            if (triangle && triangle != this) {
                var keys: Array<any> = this._neibourTriangles.getKeys();
                var obj: any;
                for (obj of keys) {
                    if (this._neibourTriangles.getValueByKey(obj) == triangle)
                        return <Navi3DEdge>obj;
                }
            }
            return null;
        }


        /**
        * @language zh_CN
        * 费时间一些的检测共边
        * @param triangle  三角形
        * @returns Navi3DEdge 公共边
        * @version Egret 3.0
        * @platform Web,Native
        */
        public loopPublicEdge(triangle: Navi3DTriangle): Navi3DEdge {
            var edgeA: Navi3DEdge;
            var edgeB: Navi3DEdge;
            if (triangle && triangle != this) {
                for (edgeA of this._edges) {
                    for (edgeB of triangle._edges) {
                        if (edgeA == edgeB)
                            return edgeA;
                    }
                }
            }
            return null;
        }

        /**
        * @language zh_CN
        * 在三角形内随机一个位置
        * @returns Vector3D 点
        * @version Egret 3.0
        * @platform Web,Native
        */
        public randomPoint(): Vector3D {
            var pt0: Vector3D = this._points[2].subtract(this._points[0]);
            //			if(Math.random() > 0.5)
            {
                pt0.scaleBy(Math.random());
            }
            pt0.incrementBy(this._points[0]);

            var pt1: Vector3D = this._points[1].subtract(pt0);

            //			if(Math.random() > 0.5)
            {
                pt1.scaleBy(Math.random());
            }
            pt1.incrementBy(pt0);

            return pt1;
        }


        /**
        * @language zh_CN
        * 判定2d点是否在一个2d的三角形内
        * @param pt0        被判定的点
        * @param pt1        三角形的顶点1
        * @param pt2        三角形的顶点2
        * @param pt3        三角形的顶点3
        * @returns boolean 是否处于三角形内
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static pointInsideTriangle(pt: Vector3D, pt0: Vector3D, pt1: Vector3D, pt2: Vector3D): boolean {
            Navi3DTriangle.pp.setTo(pt.x, pt.z);
            Navi3DTriangle.p1.setTo(pt0.x, pt0.z);
            Navi3DTriangle.p2.setTo(pt1.x, pt1.z);
            Navi3DTriangle.p3.setTo(pt2.x, pt2.z);

            return Navi3DTriangle.pointInsideTriangle2d();
        }


        
        /**
        * @language zh_CN
        * @private
        * @returns boolean 判定2d点是否在一个2d的三角形内
        * @version Egret 3.0
        * @platform Web,Native
        */
        private static pointInsideTriangle2d(): boolean {
            if (Navi3DTriangle.product2d(Navi3DTriangle.p1, Navi3DTriangle.p2, Navi3DTriangle.p3) >= 0) {
                return (Navi3DTriangle.product2d(Navi3DTriangle.p1, Navi3DTriangle.p2, Navi3DTriangle.pp) >= 0)
                    && (Navi3DTriangle.product2d(Navi3DTriangle.p2, Navi3DTriangle.p3, Navi3DTriangle.pp)) >= 0
                    && (Navi3DTriangle.product2d(Navi3DTriangle.p3, Navi3DTriangle.p1, Navi3DTriangle.pp) >= 0);
            }
            else {
                return (Navi3DTriangle.product2d(Navi3DTriangle.p1, Navi3DTriangle.p2, Navi3DTriangle.pp) <= 0)
                    && (Navi3DTriangle.product2d(Navi3DTriangle.p2, Navi3DTriangle.p3, Navi3DTriangle.pp)) <= 0
                    && (Navi3DTriangle.product2d(Navi3DTriangle.p3, Navi3DTriangle.p1, Navi3DTriangle.pp) <= 0);
            }
        }

        /**
        * @language zh_CN
        * 叉乘计算
        * @param pt1        点1
        * @param pt2        点2
        * @param pt3        点3
        * @returns number 结果值
        * @version Egret 3.0
        * @platform Web,Native
        */
        private static product2d(p1: Navi3DPoint2D, p2: Navi3DPoint2D, p3: Navi3DPoint2D): number {
            var val: number = (p1.x - p3.x) * (p2.y - p3.y) - (p1.y - p3.y) * (p2.x - p3.x);
            if (val > -0.00001 && val < 0.00001)
                val = 0;
            return val;
        }



    }
}