module egret3d {

    /**
    * @private
    */
    export enum CurveType { Line, BesselCurve };

    /**
    * @language zh_CN
    * @class egret3d.AnimCurve
    * @classdesc
    * AnimCurve 类为动画曲线，其中包含该曲线的类型，起始结束时刻以及参数�?
    * 
    * @version Egret 3.0
    * @platform Web,Native
    * @includeExample animation/PropertyAnimation/AnimCurve.ts
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class AnimCurve {

        /**
        * @private
        */
        public type: CurveType = CurveType.Line;

        /**
        * @private
        */
        public start: Point = new Point();

        /**
        * @private
        */
        public end: Point = new Point();

        /**
        * @private
        */
        public c1: Point = new Point();

        /**
        * @private
        */
        public c2: Point = new Point();

        /**
        * @private
        */
        public cache: number[] = null;

        /**
        * @private
        */
        public useCache: boolean = false;

        public constructor() {
        }

        /**
        * @language zh_CN
        * 计算数�?
        * @param time 某个时刻
        * @returns number 该时刻对应的数�?
        * @version Egret 3.0
        * @platform Web,Native
        */
        public calculateValue(time: number): number {

            if (time < this.start.x || time > this.end.x) {
                return 0;
            }

            if (this.useCache) {
                return this.cache[Math.floor(time - this.start.x)];
            }

            switch (this.type) {
                case CurveType.Line:
                    return this.valueFromLine(time);
                case CurveType.BesselCurve:
                    return this.valueFromBesselCurve(time);
            }
            
            return 0;
        }

        protected valueFromLine(time: number): number {

            var t: number = (time - this.start.x) / (this.end.x - this.start.x);

            return this.start.y + t * (this.end.y - this.start.y);
        }

        protected valueFromBesselCurve(time: number): number {

            var t: number = (time - this.start.x) / (this.end.x - this.start.x);

            var _1t: number = 1 - t;

            var _1t2: number = _1t * _1t;

            var _1t3: number = _1t2 * _1t;
            
            return this.start.y * _1t3 + 3 * this.c1.y * t * _1t2 + 3 * this.c2.x * t * t * _1t + this.end.y * t * t * t;
        }

        /**
        * @private
        */
        public cacheCurveData(): void {

            this.cache = [];

            for (var time = this.start.x; time < this.end.x; time++) {
                this.cache.push(this.calculateValue(time));
            }

            this.useCache = true;
        }
    }
}