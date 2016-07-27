module egret3d
{
    /**
    * @private
    * @language zh_CN
    * @class egret3d.Navi3DPoint2D
    * @classdesc
    * 纯2d的点
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class Navi3DPoint2D {
        /**
        * @language zh_CN
        * 坐标x
        * @version Egret 3.0
        * @platform Web,Native
        */
        public x: number;

        /**
        * @language zh_CN
        * 坐标y
        * @version Egret 3.0
        * @platform Web,Native
        */
        public y: number;

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
        * 将该点设置到指定位置
        * @param X   x坐标
        * @param Y   y坐标
        * @version Egret 3.0
        * @platform Web,Native
        */
        public setTo(X: number, Y: number): void {
            this.x = X;
            this.y = Y;
        }

        /**
        * @language zh_CN
        * 是否和某个位置等价
        * @param X   x坐标
        * @param Y   y坐标
        * @return 是否等价
        * @version Egret 3.0
        * @platform Web,Native
        */
        public equals(X: number, Y: number): boolean {
            return X == this.x && Y == this.y;
        }

		/**
        * @language zh_CN
        * 是否和某个位置等价
        * @param pt   点
        * @return 是否等价
        * @version Egret 3.0
        * @platform Web,Native
        */
        public equalPoint(pt: Navi3DPoint2D): boolean {
            return this.equals(pt.x, pt.y);
        }

		/**
        * @language zh_CN
        * 获取长度
        * @return 长度
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get length(): number {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        }

        /**
        * @language zh_CN
        * 克隆一个该位置点
        * @return 克隆的点
        * @version Egret 3.0
        * @platform Web,Native
        */
        public clone(): Navi3DPoint2D {
            var point: Navi3DPoint2D = new Navi3DPoint2D();
            point.setTo(this.x, this.y);
            return point;
        }

        /**
        * @language zh_CN
        * 标准化，长度设为1
        * @version Egret 3.0
        * @platform Web,Native
        */
        public normalize(): void {
            var size: number = length;
            if (size == 0)
                return;
            this.setTo(this.x / size, this.y / size);
        }


    }
}