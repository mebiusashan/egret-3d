module egret3d {

    /**
    * @private
    * @language zh_CN
    * @class egret3d.Navi3DFunnel
    * @classdesc
    * 寻找路径的方法
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class Navi3DFunnel {

        /**
        * @language zh_CN
        * 寻路的mesh
        * @version Egret 3.0
        * @platform Web,Native
        */
        private _navMesh: Navi3DMesh;

        /**
        * @language zh_CN
        * 寻路对象的半径
        * @version Egret 3.0
        * @platform Web,Native
        */
        private _aiRadius: number = 0;

        /**
        * @language zh_CN
        * Navi3DRouter
        * @version Egret 3.0
        * @platform Web,Native
        */
        private _router: Navi3DRouter;

        /**
        * @language zh_CN
        * 结果
        * @version Egret 3.0
        * @platform Web,Native
        */
        private _result: Array<Vector3D>;

        /**
        * @language zh_CN
        * 公共边数据列表
        * @version Egret 3.0
        * @platform Web,Native
        */
        private _tempPublicEdgeList: Array<Navi3DEdge> = new Array<Navi3DEdge>();

        /**
        * @language zh_CN
        * 共面信息
        * @version Egret 3.0
        * @platform Web,Native
        */
        private _tempSamePlaneList: Array<boolean> = new Array<boolean>();

        /**
        * @language zh_CN
        * 误差值
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static EPSILON: number = 5;

        /**
        * @language zh_CN
        * 误差值的平方
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static POWER_EPSILON: number = Navi3DFunnel.EPSILON * Navi3DFunnel.EPSILON;

        /**
        * @language zh_CN
        * 计算用的Vector3D
        * @version Egret 3.0
        * @platform Web,Native
        */
        private static CROSS_TEST_DIRECTION: Vector3D = new Vector3D();

        /**
        * @language zh_CN
        * constructor
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor() {
            this._router = new Navi3DRouter();
        }

        /**
        * @language zh_CN
        * 搜索路径
        * @param mesh   搜索的范围
        * @param startPt   起点
        * @param endPt   终点
        * @param triangleList   三角带
        * @param radius   半径
        * @return 是否寻路成功
        * @version Egret 3.0
        * @platform Web,Native
        */
        public searchPath(mesh: Navi3DMesh, startPt: Vector3D, endPt: Vector3D, triangleList: Array<Navi3DTriangle>, radius: number = 0): boolean {
            if (radius <= 0)
                radius = 1;
            this._aiRadius = radius * 1.5;
            //
            this._navMesh = mesh;
            //起点终点判断
            if (!this.searchEnable(startPt, endPt, triangleList))
                return false;

            this.search(startPt, endPt, triangleList);
            return true;
        }

        public get path(): Array<Vector3D> {
            return this._result;
        }


        /**
        * @language zh_CN
        * 检测是否满足搜索条件
        * @param startPt   起点
        * @param endPt   终点
        * @param triangleList   三角带
        * @version Egret 3.0
        * @platform Web,Native
        */
        private searchEnable(startPt: Vector3D, endPt: Vector3D, triangleList: Array<Navi3DTriangle>): boolean {
            if (startPt == null || endPt == null || this._navMesh == null || triangleList == null)
                return false;

            if (triangleList[0].plane.classifyPoint(startPt, Navi3DFunnel.EPSILON) != PlaneClassification.INTERSECT) {
                return false;
            }
            if (triangleList[triangleList.length - 1].plane.classifyPoint(endPt, Navi3DFunnel.EPSILON) != PlaneClassification.INTERSECT) {
                return false;
            }
            return true;
        }




        /**
        * @language zh_CN
        * 执行搜索
        * @param startPt   起点坐标
        * @param endPt   终点坐标
        * @param triangleList   三角带
        * @version Egret 3.0
        * @platform Web,Native
        */
        private search(startPt: Vector3D, endPt: Vector3D, triangleList: Array<Navi3DTriangle>): void {
            this._tempPublicEdgeList.length = 0;
            this._tempSamePlaneList.length = 0;
            var i: number = 0;
            var crossedEdgeCount: number = triangleList.length - 1;
            var tr: Navi3DTriangle;
            var curEdge: Navi3DEdge;
            var pt: Vector3D;
            var plane: Plane3D;
            var crossPoint: Vector3D;

           for (i = 0; i < crossedEdgeCount; i++) {
               curEdge = triangleList[i].getPublicEdge(triangleList[i + 1]);
               curEdge.crossPoint = null;
               curEdge.initFatPoints(this._aiRadius);
               this._tempPublicEdgeList.push(curEdge);
               tr = triangleList[i];
               plane = tr.plane;
               tr = triangleList[i + 1];
               pt = tr.getEdgeAgainstPoint(curEdge);

               this._tempSamePlaneList.push(plane.classifyPoint(pt, Navi3DFunnel.EPSILON) == PlaneClassification.INTERSECT);
           }

           this._router.continuePass(startPt, endPt, this._tempPublicEdgeList[0]);
           crossedEdgeCount = this._tempPublicEdgeList.length;


            var cornerPoint: Vector3D;
            var cornerEdge: Navi3DEdge;
            var continuePass: boolean;
            var lastEdge: boolean;

            for (i = 0; i < crossedEdgeCount; i++) {
                curEdge = this._tempPublicEdgeList[i];
                tr = triangleList[i + 1];
                lastEdge = i == crossedEdgeCount - 1;
                if (lastEdge) {
                    pt = endPt;
                }
                else {
                    pt = tr.getEdgeAgainstPoint(curEdge);
                }

                continuePass = this._router.passEdge(curEdge, this._tempPublicEdgeList[i + 1], pt, lastEdge);
                if (!continuePass) {
                    cornerPoint = this._router.cornerPoint;
                    cornerEdge = this._router.cornerEdge;
                    i = this._tempPublicEdgeList.indexOf(cornerEdge);
                    this._router.continuePass(cornerPoint, endPt, this._tempPublicEdgeList[i + 1]);
                }
            }


            this.pushAllPathPoint2(startPt, endPt);
            if (this._result.length >= 3) {
                this.optimusTerminusFat();
                this.optimusByRadius();
            }



        }


        /**
        * @language zh_CN
        * 将端点换成肥胖检测点
        * @version Egret 3.0
        * @platform Web,Native
        */
        private optimusTerminusFat(): void {
            var startFat: Navi3DPointFat;
            var endFat: Navi3DPointFat;
            var pt: any;

            pt = this._result[1];
            if (pt instanceof Navi3DPointFat) {
                startFat = <Navi3DPointFat>pt;
            }

            pt = this._result[this._result.length - 2];
            if (pt instanceof Navi3DPointFat) {
                endFat = <Navi3DPointFat>pt;
            }
           
            if (startFat) {
                this._result[1] = startFat.scalePoint();
            }
            if (endFat && startFat != endFat) {
                this._result[this._result.length - 2] = endFat.scalePoint();
            }

        }


        /**
        * @language zh_CN
        * 将穿越的公共边数据里的通过点加入到结果队列中
        * @version Egret 3.0
        * @platform Web,Native
        */
        private pushAllPathPoint2(startPt: Vector3D, endPt: Vector3D): void {
            var crossedEdgeCount: number = this._tempPublicEdgeList.length;
            var curEdge: Navi3DEdge;
            var curEdgeJ: Navi3DEdge;

            this._result = new Array<Vector3D>();
            this._result.push(startPt);


            var fromPoint: Vector3D = startPt;
            var toPoint: Vector3D;
            var fatPoint: Navi3DPointFat;
            var crossPoint: Vector3D;


            for (var i: number = 0; i < crossedEdgeCount; i++) {
                curEdge = this._tempPublicEdgeList[i];
                fatPoint = null;
                if (curEdge.crossPoint) {
                    fatPoint = this.getFatPoint(curEdge, curEdge.crossPoint);
                    if (fatPoint) {
                        this._result.push(fatPoint);
                    }
                    else {
                        this._result.push(curEdge.crossPoint);
                    }
                    fromPoint = curEdge.crossPoint;
                }
                else {
                    curEdgeJ = null;
                    toPoint = null;
                    //找到下一个点
                    for (var j: number = i + 1; j < crossedEdgeCount; j++) {
                        curEdgeJ = this._tempPublicEdgeList[j];
                        toPoint = curEdgeJ.crossPoint;
                        if (toPoint) {
                            break;
                        }
                    }

                    if (toPoint == null) {
                        toPoint = endPt;
                    }
                    fatPoint = this.getFatPoint(curEdge, toPoint);
                    if (fatPoint) {
                        this._result.push(fatPoint);
                    }
                    else {
                        Navi3DFunnel.CROSS_TEST_DIRECTION.setTo(toPoint.x - fromPoint.x, 0, toPoint.z - fromPoint.z);
                        crossPoint = this._router.calcCrossEdge(curEdge, fromPoint, Navi3DFunnel.CROSS_TEST_DIRECTION);
                        this._result.push(crossPoint);
                    }
                }
            }
            this._result.push(endPt);
        }

        /**
        * @language zh_CN
        * 优化通过的点
        * @version Egret 3.0
        * @platform Web,Native
        */
        private optimusByRadius(): void {
            var optimusResult: Array<Vector3D> = new Array<Vector3D>();
            optimusResult.length = this._result.length;

            var count: number = this._result.length - 2;
            var pt0: Vector3D;
            var pt1: Vector3D;
            var pt2: Vector3D;

            var fatPt0: Navi3DPointFat;
            var fatPt1: Navi3DPointFat;
            var fatPt2: Navi3DPointFat;

            var edgePt0: Navi3DPoint;
            var edgePt1: Navi3DPoint;
            var edgePt2: Navi3DPoint;


            var centerEdge: Navi3DEdge;

            var checkEnable: boolean;
            var optimusPoint: Vector3D;
            var i: number;


            for (i = 0; i < count; i++) {
                edgePt0 = edgePt1 = edgePt2 = null;
                fatPt0 = fatPt1 = fatPt2 = null;
                checkEnable = false;
                optimusPoint = null;

                pt0 = this._result[i];
                pt1 = this._result[i + 1];
                pt2 = this._result[i + 2];
                if (pt0 instanceof Navi3DPointFat) {
                    fatPt0 = <Navi3DPointFat>pt0;
                }
                if (pt1 instanceof Navi3DPointFat) {
                    fatPt1 = <Navi3DPointFat>pt1;
                }
                if (pt2 instanceof Navi3DPointFat) {
                    fatPt2 = <Navi3DPointFat>pt2;
                }

                if (fatPt0) {
                    edgePt0 = fatPt0.ownerPoint;
                }
                if (fatPt1) {
                    edgePt1 = fatPt1.ownerPoint;
                }
                if (fatPt2) {
                    edgePt2 = fatPt2.ownerPoint;
                }

                if (edgePt0 && edgePt1 && edgePt0 == edgePt1 && edgePt1 != edgePt2) {
                    checkEnable = true;
                }

                if (edgePt2 && edgePt1 && edgePt2 == edgePt1 && edgePt0 != edgePt1) {
                    checkEnable = true;
                }

                if (checkEnable) {
                    Navi3DFunnel.CROSS_TEST_DIRECTION.copyFrom(pt0);
                    Navi3DFunnel.CROSS_TEST_DIRECTION.decrementBy(pt2);
                    centerEdge = fatPt1.ownerEdge;

                    checkEnable = this._router.hasCrossPoint(centerEdge.pointA, centerEdge.pointB, pt2, Navi3DFunnel.CROSS_TEST_DIRECTION);
                    if (checkEnable) {
                        optimusPoint = this._router.calcCrossPointOut(edgePt1, pt1, pt2, Navi3DFunnel.CROSS_TEST_DIRECTION);
                    }
                    if (optimusPoint) {
                        optimusResult[i + 1] = optimusPoint;
                    }
                }
            }
        }

        /**
        * @language zh_CN
        * 对某个边获取肥胖监测点
        * @param target 输入的坐标点
        * @version Egret 3.0
        * @platform Web,Native
        */
        private getFatPoint(edge: Navi3DEdge, target: Vector3D): Navi3DPointFat {
            if (edge == null)
                return null;
            var fatPoint: Navi3DPointFat;
            if (target instanceof Navi3DPointFat){
                fatPoint = <Navi3DPointFat>target;
            }
            var edgePoint: Navi3DPoint;
            if (fatPoint) {
                edgePoint = fatPoint.ownerPoint;
            }
            else {
                edgePoint = edge.getEqualPoint(target);
            }

            if (edgePoint == null)
                return null;
            fatPoint = edge.getFatPoint(edgePoint);
            return fatPoint;
        }









    }
}