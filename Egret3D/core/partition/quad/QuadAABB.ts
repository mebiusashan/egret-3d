module egret3d {
    /**
    * @private
    * @language zh_CN
    * @class egret3d.QuadAABB
    * @classdesc
    * 用于四叉树的包围盒抽象
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class QuadAABB {

        /**
        * @language zh_CN
        * 最小x位置
        * @version Egret 3.0
        * @platform Web,Native
        */
        public minPosX: number = 0;

        /**
        * @language zh_CN
        * 最小y位置
        * @version Egret 3.0
        * @platform Web,Native
        */
        public minPosY: number = 0;

        /**
        * @language zh_CN
        * 最大x位置
        * @version Egret 3.0
        * @platform Web,Native
        */
        public maxPosX: number = 0;

        /**
        * @language zh_CN
        * 最大y位置
        * @version Egret 3.0
        * @platform Web,Native
        */
        public maxPosY: number = 0;

        /**
        * @language zh_CN
        * 用于记录quad框选批次
        * @version Egret 3.0
        * @platform Web,Native
        */
        public testID: number = 0;

        /**
        * @language zh_CN
        * 所有内部点列表
        * @version Egret 3.0
        * @platform Web,Native
        */
        public points: Array<Vector3D>;

        /**
        * @language zh_CN
        * @private
        * 记录该包围盒的全局位移偏移量
        * @version Egret 3.0
        * @platform Web,Native
        */
        private offsetPosition: Vector3D;

        /**
        * @language zh_CN
        * @private
        * 设定一个微小的值
        * @version Egret 3.0
        * @platform Web,Native
        */
        private static TINY: number = 0.000001;

        /**
        * @language zh_CN
        * constructor
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor() {
            this.points = new Array<Vector3D>();
            this.offsetPosition = new Vector3D(0, 0, 0, 0);
            this.clear();
           
        }

        /**
        * @language zh_CN
        * 将该包围盒设定到以中心点(cx,cy)，纵横距离(sideY,sidex)的范围内
        * @param cx         中心x
        * @param cy         中心y
        * @param sidex      横向范围
        * @param sidey      纵向范围
        * @version Egret 3.0
        * @platform Web,Native
        */
        public setAABox(cx: number, cy: number, sideX: number, sideY: number): void {
            this.minPosX = cx - sideX / 2 - QuadAABB.TINY;
            this.maxPosX = cx + sideX / 2 + QuadAABB.TINY;
            this.minPosY = cy - sideY / 2 - QuadAABB.TINY;
            this.maxPosY = cy + sideY / 2 + QuadAABB.TINY;

            this.offsetPosition.setTo(0, 0, 0);
        }

        /**
        * @language zh_CN
        * 设置偏移量
        * @param vec        偏移坐标
        * @version Egret 3.0
        * @platform Web,Native
        */
        public setOffset(vec: Vector3D): void {
           
            this.maxPosX += vec.x - this.offsetPosition.x;
            this.minPosX += vec.x - this.offsetPosition.x;

            this.minPosY += vec.z - this.offsetPosition.z;
            this.maxPosY += vec.z - this.offsetPosition.z;

            this.offsetPosition.copyFrom(vec);
        }


        /**
        * @language zh_CN
        * 设定包含某个范围
        * @param minX         中心x
        * @param minY         中心y
        * @param maxX      横向范围
        * @param maxY      纵向范围
        * @version Egret 3.0
        * @platform Web,Native
        */
        public setContainRect(minX: number, minY: number, maxX: number, maxY: number): void {
            if (this.minPosX > minX) this.minPosX = minX;
            if (this.minPosY > minY) this.minPosY = minY;
            if (this.maxPosX < maxX) this.maxPosX = maxX;
            if (this.maxPosY < maxY) this.maxPosY = maxY;
        }

        /**
        * @language zh_CN
        * 重置包围盒
        * @version Egret 3.0
        * @platform Web,Native
        */
        public clear(): void {
            var huge: number = 1000000000;
            this.minPosX = this.minPosY = huge;
            this.maxPosX = this.maxPosY = -huge;
            this.points.length = 0;
            this.testID = 0;
            this.offsetPosition.setTo(0, 0, 0);
        }

        /**
        * @language zh_CN
        * 添加一个点
        * @param pos         点坐标
        * @version Egret 3.0
        * @platform Web,Native
        */
        public addPoint(pos: Vector3D): void {
            if (this.points.indexOf(pos) == -1) {
                if (pos.x < this.minPosX)
                    this.minPosX = pos.x - QuadAABB.TINY;
                if (pos.x > this.maxPosX)
                    this.maxPosX = pos.x + QuadAABB.TINY;
                if (pos.z < this.minPosY)
                    this.minPosY = pos.z - QuadAABB.TINY;
                if (pos.z > this.maxPosY)
                    this.maxPosY = pos.z + QuadAABB.TINY;

                this.points.push(pos);
            }
        }

        /**
        * @language zh_CN
        * 获得该对象克隆
        * @version Egret 3.0
        * @platform Web,Native
        */
        public clone(): QuadAABB {
            var aabb: QuadAABB = new QuadAABB();
            aabb.minPosX = this.minPosX;
            aabb.minPosY = this.minPosY;
            aabb.maxPosX = this.maxPosX;
            aabb.maxPosY = this.maxPosY;
            return aabb;
        }
        /**
        * @language zh_CN
        * 获得对角线长
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get radius(): number {
            return Math.sqrt((this.maxPosY - this.minPosY) * (this.maxPosY - this.minPosY) + (this.maxPosX - this.minPosX) * (this.maxPosX - this.minPosX));
        }

        /**
        * @language zh_CN
        * 获得宽
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get sideX(): number {
            return this.maxPosX - this.minPosX;
        }

        /**
        * @language zh_CN
        * 获得高
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get sideY(): number {
            return this.maxPosY - this.minPosY;
        }

        /**
        * @language zh_CN
        * 获得中心点x
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get centreX(): number {
            return (this.maxPosX - this.minPosX) * 0.5 + this.minPosX;
        }

        /**
        * @language zh_CN
        * 获得中心点y
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get centreY(): number {
            return (this.maxPosY - this.minPosY) * 0.5 + this.minPosY;
        }

        /**
        * @language zh_CN
        * 与另外一个包围盒碰撞测试
        * @param box        测试的碰撞对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        public overlapTest(box: QuadAABB): boolean {
            return (
                (this.minPosY >= box.maxPosY) ||
                (this.maxPosY <= box.minPosY) ||
                (this.minPosX >= box.maxPosX) ||
                (this.maxPosX <= box.minPosX)) ? false : true;
        }

        /**
        * @language zh_CN
        * 判定某个点在包围盒内
        * @param box        测试的点
        * @version Egret 3.0
        * @platform Web,Native
        */
        public isPointInside(pos: Vector3D): boolean {
            return ((pos.x >= this.minPosX) &&
                (pos.x <= this.maxPosX) &&
                (pos.z >= this.minPosY) &&
                (pos.z <= this.maxPosY));
        }

        /**
        * @language zh_CN
        * 与一条线段碰撞测试
        * @param p1x        线段起点x
        * @param p1y        线段起点y
        * @param p2x        线段终点x
        * @param p2y        线段终点y
        * @version Egret 3.0
        * @platform Web,Native
        */
        public isIntersectLineSegment(p1x: number, p1y: number, p2x: number, p2y: number): boolean {
            var isIntersect: boolean = false;
            // 直线方程p1-p2
            var A1: number = p1y - p2y;
            var B1: number = p2x - p1x;
            var C1: number = p1x * p2y - p2x * p1y;
            // 与AABox
            var LineIntersectY: number = (-C1 - A1 * this.minPosX) / B1;
            if (LineIntersectY <= this.maxPosY && LineIntersectY >= this.minPosY)
                isIntersect = true;
            LineIntersectY = (-C1 - A1 * this.maxPosX) / B1;
            if (LineIntersectY <= this.maxPosY && LineIntersectY >= this.minPosY)
                isIntersect = true;
            var LineIntersectX: number = (-C1 - B1 * this.minPosY) / A1;
            if (LineIntersectX <= this.maxPosX && LineIntersectX >= this.minPosX)
                isIntersect = true;
            LineIntersectX = (-C1 - B1 * this.maxPosY) / A1;
            if (LineIntersectX <= this.maxPosX && LineIntersectX >= this.minPosX)
                isIntersect = true;
            return isIntersect;
        }




    }
}