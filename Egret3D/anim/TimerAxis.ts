module egret3d {
    /**
    * @private
    */
    export class TimerAxis extends EventDispatcher {

        public static TIME_EVENT: string = "TimeEvent";

        protected _timeEvent: Event3D = new Event3D();

        protected _times: Array<number> = new Array<number>();
        protected _processTimes: Array<number> = new Array<number>();
        protected _timer: number = 0;
        protected _start: boolean = false;
        constructor() {
            super();
        }

        public start() {
            this._timer = 0;
            this._start = true;
            this._processTimes.length = 0;
            for (var i: number = 0; i < this._times.length; ++i) {
                this._processTimes[i] = this._times[i];
            }
        }

        public addTimerAxis(time: number) {
            this._times.push(time);
        }

        public clearTimerAxis() {
            this._times.length = 0;
            this._processTimes.length = 0;
        }

        public reset() {
            this._processTimes.length = 0;
            this._timer = 0;
            this._start = false;
            for (var i: number = 0; i < this._times.length; ++i) {
                this._processTimes[i] = this._times[i];
            }
        }

        public update(delay: number, time: number) {
            if (!this._start) {
                return;
            }
            this._timer += delay;
            console.log(this._timer + "update");
            for (var i: number = 0; i < this._processTimes.length; ++i) {
                if (this._timer >= this._processTimes[i]) {

                    this._timeEvent.eventType = TimerAxis.TIME_EVENT;
                    this._timeEvent.data = this._processTimes[i];
                    this.dispatchEvent(this._timeEvent);

                    this._processTimes.splice(i, 1);
                    break;
                }
            }
        }
    }
}