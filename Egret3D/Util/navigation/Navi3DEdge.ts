module egret3d {

    /**
    * @language zh_CN
    * @class egret3d.Navi3DEdge
    * @classdesc
    * 用于Navigation Mesh中寻路的三角形边的对象
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class Navi3DEdge {

        private _edgeMask: number = 0;
        private _edgeSize: number = 0;
        private _pointA: Navi3DPoint;
        private _pointB: Navi3DPoint;
        private _triangleOwners: Array<Navi3DTriangle>;
        private _centerPoint: Vector3D;

        /**
        * @language zh_CN
        * 端点A至B的朝向矢量
        * @version Egret 3.0
        * @platform Web,Native
        */
        private _edgeDirA2B: Vector3D;

        /**
        * @language zh_CN
        * 记录穿越的点
        * @version Egret 3.0
        * @platform Web,Native
        */
        public crossPoint: Vector3D;

        /**
        * @language zh_CN
        * 靠近A的肥胖检测点
        * @version Egret 3.0
        * @platform Web,Native
        */
        public fatPointA: Navi3DPointFat;

        /**
        * @language zh_CN
        * 靠近B的肥胖检测点
        * @version Egret 3.0
        * @platform Web,Native
        */
        public fatPointB: Navi3DPointFat;

        /**
        * @language zh_CN
        * 计算用的Vector3D
        * @version Egret 3.0
        * @platform Web,Native
        */
        private static CALC_FAT_VECTOR: Vector3D = new Vector3D();

        /**
        * @language zh_CN
        * constructor
        * @param  point0 顶点0
        * @param  point1 顶点1
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor(point0: Navi3DPoint, point1: Navi3DPoint) {
            this._pointA = point0;
            this._pointB = point1;
            if (point0.id >= point1.id) {
                throw new Error("edge point order error!!!");
            }
            this._triangleOwners = new Array<Navi3DTriangle>();
            this._centerPoint = new Vector3D();
            this._edgeMask = Navi3DMaskType.WalkAble;
            Navi3DPoint.CALC_VECTOR3D1.setTo(point0.x - point1.x, point0.y - point1.y, point0.z - point1.z);
            this._edgeSize = Navi3DPoint.CALC_VECTOR3D1.length;

            this._centerPoint.setTo((point0.x + point1.x) / 2, (point0.y + point1.y) / 2, (point0.z + point1.z) / 2);
        }

        /**
        * @language zh_CN
        * 获得边长
        * @return 长度
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get size(): Number {
            return this._edgeSize;
        }


        /**
        * @language zh_CN
        * 获得所属三角形列表
        * @returns  Array<Navi3DTriangle> 三角形列表
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get triangleOwners(): Array<Navi3DTriangle> {
            return this._triangleOwners;
        }

        /**
        * @language zh_CN
        * 获得线段的中间点坐标
        * @returns Vector3D 中间点坐标
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get centerPoint(): Vector3D {
            return this._centerPoint;
        }

        /**
        * @language zh_CN
        * 初始化肥胖监测点
        * @param  radius    输入的肥胖检测半径
        * @version Egret 3.0
        * @platform Web,Native
        */
        public initFatPoints(radius: number): void {
            this._edgeDirA2B = this._pointB.subtract(this._pointA);
            this._edgeDirA2B.normalize();

            this.fatPointA = this.fatPointA || new Navi3DPointFat(this._pointA, this);
            this.fatPointB = this.fatPointB || new Navi3DPointFat(this._pointB, this);

            if (this.fatPointA.radius != radius) {
                Navi3DEdge.CALC_FAT_VECTOR.copyFrom(this._edgeDirA2B);
                Navi3DEdge.CALC_FAT_VECTOR.scaleBy(radius);
                Navi3DEdge.CALC_FAT_VECTOR.incrementBy(this._pointA);
                this.fatPointA.copyFrom(Navi3DEdge.CALC_FAT_VECTOR);
                this.fatPointA.radius = radius;
            }

            if (this.fatPointB.radius != radius) {
                Navi3DEdge.CALC_FAT_VECTOR.copyFrom(this._edgeDirA2B);
                Navi3DEdge.CALC_FAT_VECTOR.scaleBy(-radius);
                Navi3DEdge.CALC_FAT_VECTOR.incrementBy(this._pointB);
                this.fatPointB.copyFrom(Navi3DEdge.CALC_FAT_VECTOR);
                this.fatPointB.radius = radius;
            }

        }


        /**
        * @language zh_CN
        * 根据端点获取对应的肥胖检测点
        * @param  pt  端点
        * @returns Navi3DPointFat 肥胖检测点
        * @version Egret 3.0
        * @platform Web,Native
        */
        public getFatPoint(pt: Navi3DPoint): Navi3DPointFat {
            if (pt == this._pointA)
                return this.fatPointA;
            return this.fatPointB;
        }

        /**
        * @language zh_CN
        * 输入一个端点获取另外一个端点的肥胖检测点
        * @param  pt  端点
        * @returns Navi3DPointFat 肥胖检测点
        * @version Egret 3.0
        * @platform Web,Native
        */
        public getAnotherFatPoint(pt: Navi3DPoint): Navi3DPointFat {
            if (pt == this._pointA)
                return this.fatPointB;
            return this.fatPointA;
        }

        /**
        * @language zh_CN
        * 输入一个端点获取另外一个端点
        * @param  pt  端点
        * @returns Navi3DPoint 另外一个端点
        * @version Egret 3.0
        * @platform Web,Native
        */
        public getAnotherPoint(pt: Navi3DPoint): Navi3DPoint {
            if (pt == this._pointA)
                return this._pointB;
            return this._pointA;
        }

        /**
        * @language zh_CN
        * 判定一个点是否等价于某个端点
        * @param  pt 被判定的点
        * @returns Navi3DPoint 判定结果端点
        * @version Egret 3.0
        * @platform Web,Native
        */
        public containsPoint(pt: Vector3D): Navi3DPoint {
            if (Navi3DPoint.equalPoint(pt, this._pointA))
                return this._pointA;
            if (Navi3DPoint.equalPoint(pt, this._pointB))
                return this._pointB;
            return null;
        }

        /**
        * @language zh_CN
        * 添加所属三角形
        * @param  triangle 所属三角形
        * @version Egret 3.0
        * @platform Web,Native
        */
        public addTriangleOwners(triangle: Navi3DTriangle): void {
            if (triangle.edges.indexOf(this) == -1) {
                throw new Error("the edge is not belong triangle!!!");
            }
            if (this._triangleOwners.indexOf(triangle) == -1) {
                this._triangleOwners.push(triangle);
            }
        }

        /**
        * @language zh_CN
        * 获取和另外一条边的公共端点
        * @param  edge 另外一条边
        * @returns Navi3DPoint 公共边
        * @version Egret 3.0
        * @platform Web,Native
        */
        public getPublicPoint(edge: Navi3DEdge): Navi3DPoint {
            if (this._pointA == edge._pointA || this._pointA == edge._pointB) {
                return this._pointA;
            }
            else if (this._pointB == edge._pointA || this._pointB == edge._pointB) {
                return this._pointB;
            }
            return null;
        }

        /**
        * @language zh_CN
        * 输入一个点获，获取与之等价的一个端点对象
        * @param  p 输入的点
        * @returns Navi3DPoint 等价的端点
        * @version Egret 3.0
        * @platform Web,Native
        */
        public getEqualPoint(p: Vector3D): Navi3DPoint {
            if (Navi3DPoint.equalPoint(p, this._pointA))
                return this._pointA;
            if (Navi3DPoint.equalPoint(p, this._pointB))
                return this._pointB;
            return null;
        }

        /**
        * @language zh_CN
        * 端点A
        * @returns Navi3DPoint 端点A
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get pointA(): Navi3DPoint {
            return this._pointA;
        }

        /**
        * @language zh_CN
        * 端点B
        * @returns Navi3DPoint 端点B
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get pointB(): Navi3DPoint {
            return this._pointB;
        }

        /**
        * @language zh_CN
        * 记录该边的通过属性
        * @returns boolean 是否可通过
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get walkAble(): boolean {
            return (this._edgeMask & Navi3DMaskType.WalkAble) == Navi3DMaskType.WalkAble;
        }

        /**
        * @language zh_CN
        * 测试是否通过
        * @param  value 被测试的值
        * @returns boolean 是否通过
        * @version Egret 3.0
        * @platform Web,Native
        */
        public testMask(value: number): boolean {
            return (this._edgeMask & value) == value;
        }

    }
}