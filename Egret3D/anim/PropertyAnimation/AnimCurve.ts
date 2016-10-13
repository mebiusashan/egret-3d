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

            switch (this.type & 0xffff) {
                case CurveType.Line:
                    return this.valueFromLine(time);
                case CurveType.BesselCurve:
                    return this.valueFromBesselCurve(time);
                case 3:
                    return this.colorValueFromLine(time);
            }
            
            return 0;
        }

        protected valueFromLine(time: number): number {

            var t: number = (time - this.start.x) / (this.end.x - this.start.x);

            return this.start.y + t * (this.end.y - this.start.y);
        }

        protected colorValueFromLine(time: number): number {

            var a0: number = (this.start.y >> 24) & 0xff;
            var r0: number = (this.start.y >> 16) & 0xff;
            var g0: number = (this.start.y >> 8) & 0xff ;
            var b0: number = (this.start.y & 0xff);

            var a1: number = (this.end.y >> 24) & 0xff;
            var r1: number = (this.end.y >> 16) & 0xff;
            var g1: number = (this.end.y >> 8) & 0xff;
            var b1: number = (this.end.y & 0xff);

            var t: number = (time - this.start.x) / (this.end.x - this.start.x);

            var a: number = Math.floor(a0 + t * (a1 - a0));
            var r: number = Math.floor(r0 + t * (r1 - r0));
            var g: number = Math.floor(g0 + t * (g1 - g0));
            var b: number = Math.floor(b0 + t * (b1 - b0));
            return ((a << 24) | (r << 16) | (g << 8) | b) >>> 0;
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