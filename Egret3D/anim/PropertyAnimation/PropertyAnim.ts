module egret3d {

    /**
    * @language zh_CN
    * @class egret3d.PropertyAnim
    * @classdesc
    * PropertyAnim 类为曲线动画驱动器，类中保存了各个属性对应的数值曲线数据，通过时间计算某个属性在某时刻的属性数值
    * 
    * @version Egret 3.0
    * @platform Web,Native
    * @includeExample animation/PropertyAnimation/PropertyAnim.ts
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class PropertyAnim extends EventDispatcher  {

        /**
        * @language zh_CN
        * 播放速度
        * @version Egret 3.0
        * @platform Web,Native
        */
        public speed: number = 1;
        public isLoop: boolean = true;
        private _propertyArray: PropertyData[] = [];
        private _play: boolean = false;
        private _timePosition: number = 0;
        private _target: Object3D;
        private _totalTime: number = 0;
        private _changeFrameTime: number = 0;
        private _oldFrameIndex: number = 0;
        private _event3D: Event3D = new Event3D();

        public constructor() {
            super();
        }

        /**
        * @language zh_CN
        * 是否存在某个属性的曲线动画
        * @returns boolean 是否存在
        * @version Egret 3.0
        * @platform Web,Native
        */
        public IsExist(property: string): boolean {
            for (var i = 0; i < this._propertyArray.length; i++) {
                if (this._propertyArray[i].property == property) {
                    return true;
                }
            }
            return false;
        }

        /**
        * @language zh_CN
        * 添加曲线动画数据
        * @prame property 属性名
        * @prame keyFrames 曲线动画帧
        * @returns boolean 是否成功
        * @version Egret 3.0
        * @platform Web,Native
        */
        public addAnimCurve(property: string, keyFrames: AnimCurve[]): boolean {

            if (this.IsExist(property)) {
                return false;
            }

            if (null == keyFrames || keyFrames.length <= 0) {
                return false;
            }

            var propertyData: PropertyData = new PropertyData();
            propertyData.keyFrames = keyFrames;
            propertyData.property = property;
            propertyData.target = this._target;
            propertyData.isLoop = true;
            propertyData.timePosition = 0;
            this._propertyArray.push(propertyData);

            for (var i = 0; i < keyFrames.length; i++) {

                if (keyFrames[i].end.x > this._totalTime) {

                    this._totalTime = keyFrames[i].end.x;

                    keyFrames[i].cacheCurveData();
                }
            }

            this.updateBindData(propertyData);
        }

        /**
        * @language zh_CN
        * 移除曲线动画数据
        * @prame property 属性名
        * @returns AnimCurve[] 曲线动画帧
        * @version Egret 3.0
        * @platform Web,Native
        */
        public removeAnimCurve(property: string): AnimCurve[] {

            var propertyData: PropertyData = null;

            for (var i = 0; i < this._propertyArray.length; i++) {

                if (this._propertyArray[i].property == property) {

                    propertyData = this._propertyArray[i];

                    this._propertyArray.splice(i, 1);

                    return propertyData.keyFrames;
                }
            }
        }

        /**
        * @language zh_CN
        * 设置属性是否循环播放
        * @prame property 属性名
        * @prame isLoop 是否循环播放
        * @version Egret 3.0
        * @platform Web,Native
        */
        public setPropertyLoop(property: string, isLoop: boolean): void {

            var propertyData: PropertyData = null;

            for (var i = 0; i < this._propertyArray.length; i++) {

                if (this._propertyArray[i].property == property) {

                    propertyData = this._propertyArray[i];

                    propertyData.isLoop = isLoop;

                    break;
                }
            }
        }

        /**
        * @language zh_CN
        * 绑定需要驱动的Object3D对象
        * @prame target Object3D对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        public bindObject3D(target: Object3D): void {

            this._target = target;

            for (var i = 0; i < this._propertyArray.length; i++) {
                this.updateBindData(this._propertyArray[i]);
            }
        }

        private updateBindData(propertyData: PropertyData): void {

            if (!this._target) {
                return;
            }

            propertyData.target = this._target;

            var strArray: string[] = propertyData.property.split('.');

            for (var i = 0; i < strArray.length - 1; i++) {
                propertyData.target = propertyData.target[strArray[i]];
            }

            propertyData.name = strArray[strArray.length - 1];
        }

        /**
        * @language zh_CN
        * 播放属性动画
        * @version Egret 3.0
        * @platform Web,Native
        */
        public play(): void {

            if (this._play) {
                return;
            }

            this._play = true;

            this._timePosition = 0;

            for (var i = 0; i < this._propertyArray.length; i++) {
                this._propertyArray[i].timePosition = 0;
            }
        }

        /**
        * @language zh_CN
        * 停止播放属性动画
        * @version Egret 3.0
        * @platform Web,Native
        */
        public stop(): void {
            this._play = false;
        }

        /**
        * @language zh_CN
        * 时间位置
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set timePosition(value: number) {

            if (value == this._timePosition) {
                return;
            }

            var delay: number = value - this._timePosition;

            this._timePosition = value;

            if (this.isLoop) {

                this._timePosition = value % this._totalTime;

                if (this._timePosition < 0) {

                    this._timePosition += this._totalTime;

                }

            }
            else {

                if (this._timePosition < 0) {

                    this._timePosition = 0;

                    this._event3D.eventType = PropertyAnimEvent3D.EVENT_PLAY_COMPLETE;

                    this._event3D.target = this;

                    this.dispatchEvent(this._event3D);

                    this.stop();

                }
                else if (this._timePosition > this._totalTime) {

                    this._timePosition = this._totalTime;

                    this._event3D.eventType = PropertyAnimEvent3D.EVENT_PLAY_COMPLETE;

                    this._event3D.target = this;

                    this.dispatchEvent(this._event3D);

                    this.stop();

                }

            }

            if (!this._target) {
                return;
            }

            var propertyData: PropertyData;

            var keyFrames: AnimCurve[];

            for (var i = 0; i < this._propertyArray.length; i++) {

                propertyData = this._propertyArray[i];

                keyFrames = propertyData.keyFrames;

                var valueTime = propertyData.timePosition + delay;

                if (valueTime == propertyData.timePosition) {
                    continue;
                }

                var timeLength: number = keyFrames[keyFrames.length - 1].end.x;

                propertyData.timePosition = valueTime;

                if (propertyData.isLoop) {

                    propertyData.timePosition = value % timeLength;

                    if (propertyData.timePosition < 0) {

                        propertyData.timePosition += timeLength;

                    }
                }
                else {

                    if (propertyData.timePosition < 0) {

                        propertyData.timePosition = 0;

                        continue;
                    }
                    else if (propertyData.timePosition > timeLength) {

                        propertyData.timePosition = timeLength;

                        continue;
                    }
                }

                for (var j = 0; j < keyFrames.length - 1; j++) {

                    if (keyFrames[j].start.x <= propertyData.timePosition && keyFrames[j].end.x > propertyData.timePosition) {

                        propertyData.target[propertyData.name] = keyFrames[j].calculateValue(propertyData.timePosition);

                        break;
                    }
                }
            }
        }

        /**
        * @language zh_CN
        * 时间位置
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get timePosition(): number {
            return this._timePosition;
        }

        /**
        * @language zh_CN
        * 动画总时间
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get totalTime(): number {
            return this._totalTime;
        }

        /**
        * @language zh_CN
        * 更新动画数据
        * @prame delay 延迟时间
        * @version Egret 3.0
        * @platform Web,Native
        */
        public update(delay: number): void {

            if (!this._play) {
                return;
            }

            var beginTime: number = this.timePosition;

            this.timePosition += delay * this.speed;

            if (this.timePosition < beginTime) {

                this._event3D.eventType = PropertyAnimEvent3D.EVENT_PLAY_COMPLETE;

                this._event3D.target = this;

                this.dispatchEvent(this._event3D);
            }
        }

        /**
        * @language zh_CN
        * 克隆属性动画对象
        * @returns PropertyAnim 新的属性动画对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        public clone(): PropertyAnim {
            var pro: PropertyAnim = new PropertyAnim();
            pro._propertyArray = this._propertyArray;
            pro._totalTime = this._totalTime;
            return pro;
        }
    }

    /**
    * @private
    * @language zh_CN
    * @version Egret 3.0
    * @platform Web,Native
    */
    class PropertyData {
        public target: any;
        public name: string;
        public isLoop: boolean;
        public property: string;
        public timePosition: number;
        public keyFrames: AnimCurve[];
    }
}