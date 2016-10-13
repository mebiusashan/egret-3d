module egret3d {
    
    /**
    * @language zh_CN
    * @class egret3d.BooleanArray
    * @classdesc
    * 合并24个bool到一个float32中
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class BooleanArray {

        public static FLAG_0: number = 0;
        public static FLAG_1: number = 1;
        public static FLAG_2: number = 2;
        public static FLAG_3: number = 3;
        public static FLAG_4: number = 4;
        public static FLAG_5: number = 5;
        public static FLAG_6: number = 6;
        public static FLAG_7: number = 7;
        public static FLAG_8: number = 8;
        public static FLAG_9: number = 9;
        public static FLAG_10: number = 10;
        //...一共可以有24个，用的时候加

        private _dirty: boolean = true;
        private _makeResult: number = 0;

        private static MAX_COUNT: number = 24;
        /**
        * @language zh_CN
        * 值队列
        * @version Egret 3.0
        * @platform Web,Native
        */
        private _values: Array<boolean> = [];

        /**
        * @language zh_CN
        * constructor
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor() {
            this._values = [];
            this._values.length = BooleanArray.MAX_COUNT;
        }

         /**
        * @language zh_CN
        * 在指定的位置s设置bool值
        * @param index 指定下标
        * @param value 需要设置的bool值
        * @version Egret 3.0
        * @platform Web,Native
        */
        public setBoolean(index: number, value: boolean): void {
            if (index >= BooleanArray.MAX_COUNT)
                throw Error("BooleanArray MAX_COUNT：" + BooleanArray.MAX_COUNT);

            if (this._values[index] != value) {
                this._values[index] = value;
                this._dirty = true;
            }
        }


        /**
        * @language zh_CN
        * 在指定的位置获取bool值
        * @param index 指定下标
        * @return bool值
        * @version Egret 3.0
        * @platform Web,Native
        */
        public getBoolean(index: number): boolean{
            if (index >= BooleanArray.MAX_COUNT)
                return false;
            return this._values[index];
        }

        /**
        * @language zh_CN
        * 是否需要重新计算
        * @return bool值
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get dirty(): boolean {
            return this._dirty;
        }

        /**
        * @language zh_CN
        * 获取压缩后的值
        * @return number 压缩的结果
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get makeResult(): number {
            if (this._dirty) {
                this.make();
            }
            return this._makeResult;
        }

        private make(): number {
            this._makeResult = 0;
            for (var i: number = 0, count: number = BooleanArray.MAX_COUNT; i < count; i++) {
                if (this._values[i]) {
                    this._makeResult += 1 << i;
                }
            }
            this._dirty = false;
            return this._makeResult;
        }

        /**
        * @language zh_CN
        * 重置该列表
        * @version Egret 3.0
        * @platform Web,Native
        */
        public clear(): void {
            this._dirty = true;
            this._makeResult = 0;
            this._values.length = 0;
        }

    }
}