module egret3d {

    /**
    * @private
    * @language zh_CN
    * @class egret3d.Navi3DRouter
    * @classdesc
    * 纯2d的点
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class Navi3DRouter {

        /**
        * @language zh_CN
        * 终点
        * @version Egret 3.0
        * @platform Web,Native
        */
        public endPoint: Vector3D;

        /**
        * @language zh_CN
        * 当前点
        * @version Egret 3.0
        * @platform Web,Native
        */
        public curPoint: Vector3D;

        /**
        * @language zh_CN
        * 射线A
        * @version Egret 3.0
        * @platform Web,Native
        */
        public rayA: Vector3D;

        /**
        * @language zh_CN
        * 射线B
        * @version Egret 3.0
        * @platform Web,Native
        */
        public rayB: Vector3D;

        /**
        * @language zh_CN
        * 射线A的对应点
        * @version Egret 3.0
        * @platform Web,Native
        */
        public rayAPoint: Navi3DPoint;

        /**
        * @language zh_CN
        * 射线B的对应点
        * @version Egret 3.0
        * @platform Web,Native
        */
        public rayBPoint: Navi3DPoint;

        /**
        * @language zh_CN
        * 静态变量射线1
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static RAY_1: Vector3D = new Vector3D();

        /**
        * @language zh_CN
        * 静态变量射线2
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static RAY_2: Vector3D = new Vector3D();

        /**
        * @language zh_CN
        * 计算用射线
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static TEST_RAY: Vector3D = new Vector3D();

        /**
        * @language zh_CN
        * 计算用射线1
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static TEST_RAY_1: Vector3D = new Vector3D();

        /**
        * @language zh_CN
        * 计算用射线2
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static TEST_RAY_2: Vector3D = new Vector3D();

        /**
        * @language zh_CN
        * 计算用的Vector3D
        * @version Egret 3.0
        * @platform Web,Native
        */
        private static CALC_CROSS_POINT: Vector3D = new Vector3D();

        /**
        * @language zh_CN
        * 计算用的Vector3D
        * @version Egret 3.0
        * @platform Web,Native
        */
        private static CALC_CROSS_TEST: Vector3D = new Vector3D();

        /**
        * @language zh_CN
        * 记录下的拐点
        * @version Egret 3.0
        * @platform Web,Native
        */
        public cornerPoint: Navi3DPoint;

        /**
        * @language zh_CN
        * 记录下的拐点所在的边
        * @version Egret 3.0
        * @platform Web,Native
        */
        public cornerEdge: Navi3DEdge;


        /**
        * @language zh_CN
        * constructor
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor() {
        }

        /**
        * @language zh_CN
        * 设定继续通过
        * @param fromPt     起点
        * @param endPt      终点
        * @param fromEdge   上一次的边
        * @version Egret 3.0
        * @platform Web,Native
        */
        public continuePass(fromPt: Vector3D, endPt: Vector3D, fromEdge: Navi3DEdge): void {
            this.resetData();
            this.curPoint = fromPt;
            this.endPoint = endPt;
            this.cornerEdge = fromEdge;
        }

        /**
        * @language zh_CN
        * 继续通过
        * @param commonEdge          公共边
        * @param nextCommonEdge      下一个公共边
        * @param targetPoint         目标点
        * @param lastEdge            是否为最后一个边
        * @returns boolean 是否通过
        * @version Egret 3.0
        * @platform Web,Native
        */
        public passEdge(commonEdge: Navi3DEdge, nextCommonEdge: Navi3DEdge, targetPoint: Vector3D, lastEdge: boolean): boolean {
            if (this.rayA == null || this.rayB == null) {
                this.rayA = Navi3DRouter.RAY_1;
                this.rayB = Navi3DRouter.RAY_2;
                this.rayAPoint = commonEdge.pointA;
                this.rayBPoint = commonEdge.pointB;

                this.rayA.setTo(this.rayAPoint.x - this.curPoint.x, 0, this.rayAPoint.z - this.curPoint.z);
                this.rayB.setTo(this.rayBPoint.x - this.curPoint.x, 0, this.rayBPoint.z - this.curPoint.z);
            }

            if (lastEdge) {
                return this.checkEndPoint(targetPoint);
            }

            Navi3DRouter.TEST_RAY.setTo(targetPoint.x - this.curPoint.x, 0, targetPoint.z - this.curPoint.z);

            if (this.isPointAtCenter(Navi3DRouter.TEST_RAY, this.rayA, this.rayB)) {
                if (!this.hasCrossPoint(nextCommonEdge.pointA, nextCommonEdge.pointB, this.rayAPoint, this.rayA)) {
                    this.rayA.copyFrom(Navi3DRouter.TEST_RAY);
                    if (targetPoint instanceof Navi3DPoint) {
                        this.rayAPoint = <Navi3DPoint>targetPoint;
                    }
                    else {
                        this.rayAPoint = null;
                    }
                    
                }
                else {
                    this.rayB.copyFrom(Navi3DRouter.TEST_RAY);
                    if (targetPoint instanceof Navi3DPoint) {
                        this.rayBPoint = <Navi3DPoint>targetPoint;
                    }
                    else {
                        this.rayBPoint = null;
                    }
                }

                var anotherPoint: Navi3DPoint = nextCommonEdge.getAnotherPoint(<Navi3DPoint>targetPoint);
                Navi3DRouter.TEST_RAY.setTo(anotherPoint.x - this.curPoint.x, 0, anotherPoint.z - this.curPoint.z);
                if (anotherPoint == this.rayAPoint || anotherPoint == this.rayBPoint || this.isPointAtCenter(Navi3DRouter.TEST_RAY, this.rayA, this.rayB)) {
                    this.cornerEdge = nextCommonEdge;
                }
            }
            else {
                var needReturn: boolean;
                Navi3DRouter.TEST_RAY_1.copyFrom(nextCommonEdge.pointA);
                Navi3DRouter.TEST_RAY_1.decrementBy(this.curPoint);
                Navi3DRouter.TEST_RAY_2.copyFrom(nextCommonEdge.pointB);
                Navi3DRouter.TEST_RAY_2.decrementBy(this.curPoint);
                Navi3DRouter.TEST_RAY_1.y = 0;
                Navi3DRouter.TEST_RAY_2.y = 0;
                if (this.isPointAtCenter(this.rayA, Navi3DRouter.TEST_RAY_1, Navi3DRouter.TEST_RAY_2)
                    || this.isPointAtCenter(this.rayB, Navi3DRouter.TEST_RAY_1, Navi3DRouter.TEST_RAY_2)) {
                    needReturn = false;
                }
                else {
                    needReturn = true;
                }

                if (needReturn) {
                    if (this.isPointAtCenter(this.rayA, Navi3DRouter.TEST_RAY, this.rayB)) {
                        this.cornerPoint = this.rayAPoint;
                    }
                    else {
                        this.cornerPoint = this.rayBPoint;
                    }

                    this.cornerEdge.crossPoint = this.cornerPoint;
                    return false;
                }
            }
            return true;
        }

        /**
        * @language zh_CN
        * @private
        * 通过边的时候，发现为抵达终点的处理函数
        * @param targetPoint          终点
        * @version Egret 3.0
        * @platform Web,Native
        */
        private checkEndPoint(targetPoint: Vector3D): boolean {

            Navi3DRouter.TEST_RAY.setTo(targetPoint.x - this.curPoint.x, 0, targetPoint.z - this.curPoint.z);
            if (this.isPointAtCenter(Navi3DRouter.TEST_RAY, this.rayA, this.rayB)) {
                //
            }
            else {
                if (this.isPointAtCenter(this.rayA, Navi3DRouter.TEST_RAY, this.rayB)) {
                    this.cornerPoint = this.rayAPoint;
                }
                else {
                    this.cornerPoint = this.rayBPoint;
                }
                this.cornerEdge.crossPoint = this.cornerPoint;
                return false;
            }
            return true;
        }

        /**
        * @language zh_CN
        * 计算射线与线段的两个fatPoint之间交点
        * @param _edge          线段
        * @param linePoint      射线起点
        * @param lineDirection  射线方向
        * @returns     Vector3D          交点
        * @version Egret 3.0
        * @platform Web,Native
        */
        public calcCrossEdge(_edge: Navi3DEdge, linePoint: Vector3D, lineDirection: Vector3D): Vector3D {
            return this.calcCrossPoint(_edge.fatPointA, _edge.fatPointB, linePoint, lineDirection);
        }

        /**
        * @language zh_CN
        * 计算射线与线段的交点
        * @param _edge          线段
        * @param linePoint      射线起点
        * @param lineDirection  射线方向
        * @returns Vector3D 交点
        * @version Egret 3.0
        * @platform Web,Native
        */
        public calcCrossPoint(segmentPt1: Vector3D, segmentPt2: Vector3D, linePoint: Vector3D, lineDirection: Vector3D): Vector3D {
            Navi3DRouter.CALC_CROSS_POINT.copyFrom(segmentPt2);
            Navi3DRouter.CALC_CROSS_POINT.decrementBy(segmentPt1);

            var scale: number = ((segmentPt1.z - linePoint.z) * lineDirection.x - (segmentPt1.x - linePoint.x) * lineDirection.z) /
                (Navi3DRouter.CALC_CROSS_POINT.x * lineDirection.z - lineDirection.x * Navi3DRouter.CALC_CROSS_POINT.z);

            if (scale > 1) {
                scale = 1;
            }
            else if (scale < 0) {
                scale = 0;
            }
            Navi3DRouter.CALC_CROSS_POINT.scaleBy(scale);
            Navi3DRouter.CALC_CROSS_POINT.incrementBy(segmentPt1);
            return Navi3DRouter.CALC_CROSS_POINT.clone();
        }


        /**
        * @language zh_CN
        * 计算射线与线段交点，如果不在线段里面，则返回null
        * @param segmentPt1      线段1端
        * @param segmentPt2      线段另一端
        * @param linePoint       射线起点
        * @param lineDirection   射线方向
        * @return Vector3D 交点
        * @version Egret 3.0
        * @platform Web,Native
        */
        public calcCrossPointOut(segmentPt1: Vector3D, segmentPt2: Vector3D, linePoint: Vector3D, lineDirection: Vector3D): Vector3D {
            Navi3DRouter.CALC_CROSS_POINT.copyFrom(segmentPt2);
            Navi3DRouter.CALC_CROSS_POINT.decrementBy(segmentPt1);

            var scale: number = ((segmentPt1.z - linePoint.z) * lineDirection.x - (segmentPt1.x - linePoint.x) * lineDirection.z) /
                (Navi3DRouter.CALC_CROSS_POINT.x * lineDirection.z - lineDirection.x * Navi3DRouter.CALC_CROSS_POINT.z);

            if (scale <= 1 && scale >= 0) {
                return null;
            }
            Navi3DRouter.CALC_CROSS_POINT.scaleBy(scale);
            Navi3DRouter.CALC_CROSS_POINT.incrementBy(segmentPt1);
            return Navi3DRouter.CALC_CROSS_POINT.clone();
        }


        /**
        * @language zh_CN
        * 判定计算射线与线段是否有交点
        * @param segmentPt1      线段1端
        * @param segmentPt2      线段另一端
        * @param linePoint       射线起点
        * @param lineDirection   射线方向
        * @returns boolean 是否有交点
        * @version Egret 3.0
        * @platform Web,Native
        */
        public hasCrossPoint(segmentPt1: Vector3D, segmentPt2: Vector3D, linePoint: Vector3D, lineDirection: Vector3D): boolean {
            Navi3DRouter.CALC_CROSS_TEST.copyFrom(segmentPt2);
            Navi3DRouter.CALC_CROSS_TEST.decrementBy(segmentPt1);

            var scale: number = ((segmentPt1.z - linePoint.z) * lineDirection.x - (segmentPt1.x - linePoint.x) * lineDirection.z) /
                (Navi3DRouter.CALC_CROSS_TEST.x * lineDirection.z - lineDirection.x * Navi3DRouter.CALC_CROSS_TEST.z);
            return scale <= 1 && scale >= 0;
        }


        /**
        * @language zh_CN
        * @private
        * 判定一个点是否在两个射线的夹角内侧
        * @param point        点
        * @param vectorA      射线A
        * @param vectorB      射线B
        * @returns boolean 是在内侧
        * @version Egret 3.0
        * @platform Web,Native
        */
        private isPointAtCenter(point: Vector3D, vectorA: Vector3D, vectorB: Vector3D): boolean {
            var cp1: Vector3D = vectorA.crossProduct(point);
            if (cp1.length == 0 && point.length < vectorA.length) {
                return true;
            }

            var cp2: Vector3D = vectorB.crossProduct(point);
            if (cp2.length == 0 && point.length < vectorB.length) {
                return true;
            }

            cp1.normalize();
            cp2.normalize();
            cp1.incrementBy(cp2);

            return cp1.length < 0.01;



        }

        /**
        * @language zh_CN
        * 重置该router
        * @version Egret 3.0
        * @platform Web,Native
        */
        public resetData(): void {
            this.cornerEdge = null;
            this.cornerPoint = null;

            this.curPoint = null;
            this.rayA = this.rayB = null;
            this.rayAPoint = this.rayBPoint = null;

            Navi3DRouter.RAY_1.setTo(0, 0, 0);
            Navi3DRouter.RAY_2.setTo(0, 0, 0);
        }



    }
}