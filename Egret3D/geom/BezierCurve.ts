module egret3d {
     /**
     * @private
     * @language zh_CN
     * @class egret3d.BezierCurve
     * @classdesc
     * 贝塞尔曲线
     * @version Egret 3.0
     * @platform Web,Native
     */
    export class BezierCurve {
        constructor() {

        }

        public calcLineX(pos: Array<Point>, t: number): number {
            var A0: Point;
            var A1: Point;
            for (var i: number = 0, count: number = pos.length - 1; i < count; i++) {
                A0 = pos[i];
                A1 = pos[i + 1];
                if (A0.x <= t && A1.x >= t) {
                    break;
                }
            }
            return this.mix(A0.y, A1.y, (t - A0.x) / (t - A1.x));
        }

        public calcBezierY(pos: Array<Point>, ctrl: Array<Point>, t: number): number {

            var A0: Point;
            var B0: Point;
            var A1: Point;
            var B1: Point;

            for (var i: number = 0; i < 3; i++) {
                if (t >= pos[i].x && t <= pos[i + 1].x) {
                    A0 = pos[i];
                    B0 = ctrl[i];

                    A1 = pos[i + 1];
                    B1 = ctrl[i + 1];
                    break;
                }
            }
            if (!A0) {
                A0 = pos[pos.length - 1];
            }
            if (!B0) {
                B0 = ctrl[ctrl.length - 1];
            }
            A1 = A1 || A0;
            B1 = B1 || B0;

            t = (t - A0.x) / (A1.x - A0.x);
            return this.cubic_bezier(A0.y, B0.y, B1.y, A1.y, t);
        }

        public calcBezierX(pos: Array<Point>, ctrl: Array<Point>, t: number): number {

            var A0: Point;
            var B0: Point;
            var A1: Point;
            var B1: Point;

            for (var i: number = 0; i < 3; i++) {
                if (t >= pos[i].x && t <= pos[i + 1].x) {
                    A0 = pos[i];
                    B0 = ctrl[i];

                    A1 = pos[i + 1];
                    B1 = ctrl[i + 1];
                    break;
                }
            }
            t = (t - A0.x) / (A1.x - A0.x);
            return this.cubic_bezier(A0.x, B0.x, B1.x, A1.x, t);
        }

        private cubic_bezier(p0: number, p1: number, p2: number, p3: number, t: number): number {
            //第一次混合
            p0 = this.mix(p0, p1, t);
            p1 = this.mix(p1, p2, t);
            p2 = this.mix(p2, p3, t);
            //第二次混合
            p0 = this.mix(p0, p1, t);
            p1 = this.mix(p1, p2, t);
            //第三次混合
            p0 = this.mix(p0, p1, t);
            return p0;

        }

        private mix(num0: number, num1: number, t: number): number {
            return num0 * (1 - t) + num1 * t;
        }



    }

    /**
    * @private
    * @language zh_CN
    * @class egret3d.BezierData
    * @classdesc
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class BezierData {
        private static SegCount: number = 2;//最多2段贝塞尔曲线
        public posPoints: Array<Point> = [];
        public ctrlPoints: Array<Point> = [];

        public lineMode: boolean = false;
        public linePoints: Array<Point> = [];

        private static calc: BezierCurve = new BezierCurve();


        constructor() {

        }

        public calc(t: number): number {
            var value: number;
            if (!this.lineMode) {
                value = BezierData.calc.calcBezierY(this.posPoints, this.ctrlPoints, t);
            } else {
                value = BezierData.calc.calcLineX(this.linePoints, t);
            }
            return value;
        }

        public trySampler(): Float32Array {
            var dataValide: boolean;
            if (this.lineMode) {
                for (var i: number = 0, count: number = this.linePoints.length; i < count; i++) {
                    if (this.linePoints[i].y != 0) {
                        dataValide = true;
                        break;
                    }
                }
            } else {
                for (var i: number = 0, count: number = this.posPoints.length; i < count; i++) {
                    if (this.posPoints[i].y != 0 || this.ctrlPoints[i].y != 0) {
                        dataValide = true;
                        break;
                    }
                }
            }

            if (dataValide) {
                return this.sampler();;
            }
            return null;
        }


        public sampler(): Float32Array {
            if (this.lineMode) {
                return this.samplerLine();
            }
            return this.samplerBezier();
        }

        private samplerLine(): Float32Array {
            const SampleNum: number = 8;
            var res: Float32Array = new Float32Array(1 + (SampleNum * 2 + 1) * 2);
            res[res.length - 1] = this.linePoints.length;
            for (var i: number = 0, count: number = this.linePoints.length; i < count; i++) {
                res[i * 2] = this.linePoints[i].x;
                res[i * 2 + 1] = this.linePoints[i].y;
            }

            return res;
        }

        /*
        * @private
        * 采样bezier变成线段的形式
        */
        private samplerBezier(): Float32Array {
            //2段bezier，第一段9个点，第二段8个点
            //每个点有(x,y)
            //最后一个数据表示当前采样了几个点，如果是bezier的情况，值是9+8；如果是线段类型，则在(1，8 + 9)之间的一个整数

            const SampleNum: number = 8;
            var res: Float32Array = new Float32Array(1 + (SampleNum * 2 + 1) * 2);

            var tempTime: number;
            var now: number = 0;
            var i: number, j: number, count: number;
            var position: number = 0;


            res[position] = now;
            position++;
            res[position] = this.posPoints[0].y;
            position++;

            for (i = 0, count = BezierData.SegCount; i < count; i++) {
                tempTime = this.posPoints[i * 2 + 1].x - this.posPoints[i * 2].x;
                tempTime /= SampleNum;

                for (j = 0; j < SampleNum; j++) {
                    now += tempTime;
                    res[position] = now;
                    position++;
                    res[position] = this.calc(now);
                    position++;
                }
            }
            //最后放入数量
            res[position] = SampleNum * 2 + 1;
            position++;

            return res;

        }
        //private doSampler1(): Float32Array {
        //    var floats: Array<number> = [];
        //    var times: Array<number> = [];

        //    var segmentTime: number;
        //    var segmentStartTime: number = 0;
        //    var segmentEndTime: number = 0;
        //    //每段有10个数据，将该段曲线分为10小段
        //    const SegmentCount: number = 9;
        //    var i: number;
        //    var count: number;

        //    for (i = 0, count = BezierData.SegCount; i < count; i++) {
        //        floats.push(this.posPoints[i * 2].y);//第一个数字
        //        segmentStartTime = this.posPoints[i * 2].x;
        //        segmentEndTime = this.posPoints[i * 2 + 1].x;
        //        segmentTime = (segmentEndTime - segmentStartTime) / SegmentCount;//该贝塞尔的每小段
        //        times.push(segmentTime);
        //        for (var j: number = 1; j < SegmentCount; j++) {
        //            floats.push(this.calc(segmentStartTime + segmentTime * j));
        //        }
        //        floats.push(this.posPoints[i * 2 + 1].y);//第10个数字
        //    }
        //    var res: Float32Array = new Float32Array(floats.length + times.length);
        //    for (i = 0, count = floats.length; i < count; i++) {
        //        res[i] = floats[i];
        //    }
        //    for (var j: number = 0, count = times.length; j < count; i++ , j++) {
        //        res[i] = times[j];
        //    }
        //    return res;
        //}

        public validate(): void {
            if (this.posPoints == null) {
                this.posPoints = [];
            }
            if (this.ctrlPoints == null) {
                this.ctrlPoints = [];
            }
            var i: number = 0, count: number = 0;
            for (i = this.posPoints.length / 2, count = BezierData.SegCount; i < count; i++) {
                this.posPoints.push(new Point(0, 0));
                this.posPoints.push(new Point(1, 0));
            }
            for (i = this.ctrlPoints.length / 2, count = BezierData.SegCount; i < count; i++) {
                this.ctrlPoints.push(new Point(0, 0));
                this.ctrlPoints.push(new Point(1, 0));
            }

            this.ctrlPoints.length = BezierData.SegCount * 2;
            this.posPoints.length = BezierData.SegCount * 2;
        }

        //___________压缩数据
        //public static compressFloats(floats: Array<number>, times:Array<number>): Float32Array {
        //    if (floats.length % 2 == 1) {
        //        floats.push(0);
        //    }
        //    var floatCount: number = 0;
        //    floatCount += BezierData.SegCount * 5;//每段有10个float高度数据，压缩后变成5个
        //    floatCount += 2;//2个float是用于放入min和range
        //    floatCount += 1;//记录是否表示所有的数据都相等

        //    floatCount += BezierData.SegCount;//每段有一个float记录该段的总时间
        //    var res: Float32Array = new Float32Array(floatCount);
        //    const maxInt: number = 4096;//最大的数，在这个范围进行压缩
        //    const maxInt_1: number = maxInt - 1;

        //    var i: number;
        //    var count: number;

        //    //获得最小和最大值
        //    var ints: Array<number> = [];
        //    ints.length = floats.length;

        //    var floatValue: number;
        //    var min: number = MathUtil.MAX_VALUE;
        //    var max: number = - min;

        //    for (i = 0, count = floats.length; i < count; i++) {
        //        floatValue = ints[i] = floats[i];
        //        max = Math.max(floatValue, max);
        //        min = Math.min(floatValue, min);
        //    }
        //    var range: number = max - min;
        //    //表示所有的数据都相等
        //    if (range > 0) {
        //        //转化每个float，于0 - maxInt之间
        //        var intValue: number = 0;
        //        for (i = 0, count = ints.length; i < count; i++) {
        //            intValue = ints[i];
        //            intValue -= min;
        //            intValue /= range;//0-1之间
        //            intValue *= maxInt_1;//0 - (maxInt - 1)之间
        //            ints[i] = Math.floor(intValue);
        //        }

        //        //2合1
        //        var int1: number;
        //        var int2: number;
        //        for (i = 0, count = ints.length / 2; i < count; i++) {
        //            int1 = ints[i * 2];
        //            int2 = ints[i * 2 + 1];
        //            res[i] = int1 + int2 / maxInt;
        //        }
        //        res[i] = min;
        //        i++;
        //        res[i] = range;
        //        i++;
        //        res[i] = 0;
        //        i++;
        //    }
        //    else {
        //        for (i = 0, count = ints.length / 2; i < count; i++) {
        //            res[i] = min;
        //        }
        //        res[i] = min;
        //        i++;
        //        res[i] = range;
        //        i++;
        //        res[i] = 1;
        //        i++;
        //    }


        //    for (var j:number = 0, count = BezierData.SegCount ; j < count; i++, j++) {
        //        res[i] = times[j];
        //    }
        //    //输出结果
        //    return res;
        //}




    }

}