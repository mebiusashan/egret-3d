module egret3d {
    /**
    * @private
    */
    export class ParticleLifeGenerator {

        private _node: ParticleDataLife;
        private _data: ParticleData;
        private _burstsClone: Point[];

        public planes: Point[];//(x, y) => (bornTime, lifeTime)
        public loopTime: number;
        public circleTime: number;

        //支持的非循环粒子，最大上限2000
        //循环的粒子，则上限由粒子中的particleCount设定
        //最后的plane数量有可能小于设定的数值.
        private _inputCount: number;
        private _tiny: number = 0.001;
        constructor() {

        }
        /**
        * 根据粒子的数据生成生命周期数据。
        * @private
        */
        public generator(data: ParticleData): void {
            //if (data.life.loop) {
            //    this._inputCount = data.property.particleCount;
            //} else {
            //    this._inputCount = 2000;
            //}
            this._inputCount = 2000;
            //reset
            this._data = data;
            this._node = data.life;
            this._burstsClone = data.emission.bursts;
            if (this._burstsClone) {
                this._burstsClone = this._burstsClone.slice();
            }

            this.planes = [];
            this.loopTime = this.circleTime = 0;

            if (this._data.emission.type == ParticleValueType.Const) {
                this.generatorConst();
            } else {
                this.generatorBezier();
            }

            this.planes.sort(function (a: Point, b: Point) {
                return a.x - b.x;
            });

            var pt: Point;
            var lastBornTime: number = 0;
            for (pt of this.planes) {
                this.circleTime = Math.max(this.circleTime, pt.x + pt.y);
                this.loopTime = Math.max(this.loopTime, pt.y);
                lastBornTime = pt.x;
            }


            if (lastBornTime > this.loopTime) {
                this.loopTime = lastBornTime;//不循环的粒子，这个数值没有意义。
            }
            this.circleTime += this._data.life.delay;

        }



        private burstPlanes(now: number, next: number): void {

            var burstItem: Point;
            var time: number;
            var burstCount: number;
            var spliceItem: boolean;
            for (var b: number = 0, bCount: number = this._burstsClone.length; b < bCount; b++) {
                burstItem = this._burstsClone[b];
                time = burstItem.x;
                spliceItem = false;
                if (time >= now && time <= next) {
                    burstCount = Math.min(burstItem.y, this._data.property.particleCount);
                    for (var i: number = 0; i < burstCount; i++) {
                        this.tryCreatePlane(time);
                    }
                    spliceItem = true;
                }
                else if (time >= this._data.life.duration) {
                    spliceItem = true;
                }
                if (spliceItem) {
                    this._burstsClone.splice(b, 1);
                    b--;
                    bCount--;
                }

            }


        }


        private generatorConst(): void {
            var rate: number = this._data.emission.rate;
            if (rate == 0) {
                //不发射粒子
                while (this._burstsClone && this._burstsClone.length > 0 && this.planes.length < this._inputCount) {
                    this.burstPlanes(0, Number.MAX_VALUE);
                }
                return;
            }

            var createInterval: number = Math.max(1 / rate, this._tiny);
            var duration: number = this._data.life.duration;
            var now: number = createInterval;
            var next: number = now + createInterval;

            while (now < this._data.life.duration && this.planes.length < this._inputCount) {
                this.tryCreatePlane(now);

                next = now + createInterval;
                //try burst
                if (this._burstsClone && this._burstsClone.length > 0) {
                    this.burstPlanes(now, next);
                }
                now = next;
            }

        }


        private generatorBezier(): void {
            var frameInterval: number = 1 / 20;
            var duration: number = this._data.life.duration;
            var now: number = frameInterval;
            var next: number = now;

            var emitFloat: number = 0;
            var emitInt: number = 0;
            var emitPerTime: number = 0;

            while (now < duration && this.planes.length < this._inputCount) {
                emitFloat += this._data.emission.bezier.calc(now / duration) * frameInterval;
                emitInt = Math.floor(emitFloat);
                emitFloat -= emitInt;
                if (emitInt > 0) {
                    emitPerTime = frameInterval / emitInt;
                    while (emitInt > 0) {
                        next += emitPerTime;
                        this.tryCreatePlane(now);
                        //try burst
                        if (this._burstsClone && this._burstsClone.length > 0) {
                            this.burstPlanes(now, next);
                        }
                        now = next;
                        emitInt--;
                    }
                } else {
                    next = now + frameInterval;
                    //try burst
                    if (this._burstsClone && this._burstsClone.length > 0) {
                        this.burstPlanes(now, next);
                    }
                    now = next;
                }
            }
        }



        private tryCreatePlane(now: number): void {
            var liveCount: number = 0;//存活的数量
            var bornTime: number;
            var pt: Point;
            var maxCount: number = this._data.property.particleCount;
            for (var i: number = 0, count: number = this.planes.length; i < count; i++) {
                pt = this.planes[i];
                bornTime = pt.x;
                if (pt.x + pt.y > now) {
                    liveCount++;
                }

            }
            //当前存活数在范围之内
            if (liveCount < maxCount) {
                pt = new Point(now, this.getLifeTime(now));
                this.planes.push(pt);
            }


        }

        private getLifeTime(time: number): number {
            var lifeType: number = this._data.life.type;
            var life: ParticleDataLife = this._data.life;
            var value1: number;
            var value2: number;
            if (life.type == ParticleValueType.Const) {
                value1 = value2 = life.max;
            } else if (life.type == ParticleValueType.RandomConst) {
                value1 = life.max;
                value2 = life.min;
            } else if (life.type == ParticleValueType.OneBezier) {
                value1 = value2 = life.bezier1.calc(time / life.duration);
            } else {
                value1 = life.bezier1.calc(time / life.duration);
                value2 = life.bezier2.calc(time / life.duration);
            }
            return Math.random() * (value1 - value2) + value2;
        }







    }


}