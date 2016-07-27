module egret3d {

    /**
    * @language zh_CN
    * @class egret3d.Navi3DPoint
    * @classdesc
    * 网格的点
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class Navi3DPoint extends Vector3D {

        /**
        * @language zh_CN
        * 计算用的Vector3D
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static CALC_VECTOR3D1: Vector3D = new Vector3D();

        /**
        * @language zh_CN
        * 计算用的Vector3D
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static CALC_VECTOR3D2: Vector3D = new Vector3D();

        /**
        * @language zh_CN
        * 计算用的Vector3D
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static CALC_VECTOR3D3: Vector3D = new Vector3D();

        /**
        * @language zh_CN
        * 计算用的Vector3D
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static CALC_VECTOR3D4: Vector3D = new Vector3D();

        /**
        * @language zh_CN
        * 计算用的Vector3D
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static CALC_VECTOR3D5: Vector3D = new Vector3D();


        private _pointId: number = 0;

        /**
        * @language zh_CN
        * constructor
        * @param    id   顶点id
        * @param    X   坐标x
        * @param    Y   坐标y
        * @param    Z   坐标z
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor(id: number, X: number, Y: number, Z: number) {
            super(X, Y, Z, 0);
            this._pointId = id;
        }

        /**
        * @language zh_CN
        * 在Navi3DMesh中的唯一id
        * @returns number 唯一id
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get id(): number {
            return this._pointId;
        }

        /**
        * @language zh_CN
        * 判定两个坐标位置是否等价
        * @param    p1   坐标1
        * @param    p2   坐标2
        * @returns  boolean 是否等价
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static equalPoint(p1: Vector3D, p2: Vector3D): boolean {
            return (p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y) + (p1.z - p2.z) * (p1.z - p2.z) < Navi3DFunnel.POWER_EPSILON;
        }

        /**
        * @language zh_CN
        * 计算两个坐标点之间的距离
        * @param    p1   坐标1
        * @param    p2   坐标2
        * @returns number   距离
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static calcDistance(pt1: Vector3D, pt2: Vector3D): number {
            Navi3DPoint.CALC_VECTOR3D3.setTo(pt1.x - pt2.x, pt1.y - pt2.y, pt1.z - pt2.z);
            return Navi3DPoint.CALC_VECTOR3D3.length;
        }

    }
}