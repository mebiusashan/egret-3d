module egret3d {

    /**
    * @language zh_CN
    * @class egret3d.DoubleArray
    * @classdesc
    * 利用2个数组实现键值对的数组
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class DoubleArray {

        /**
        * @language zh_CN
        * 键队列
        * @version Egret 3.0
        * @platform Web,Native
        */
        private _keys: Array<any> = new Array<any>();
        
        /**
        * @language zh_CN
        * 值队列
        * @version Egret 3.0
        * @platform Web,Native
        */
        private _values: Array<any> = new Array<any>();

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
        * 根据键获得下标
        * @param    key     键
        * @return           下标
        * @version Egret 3.0
        * @platform Web,Native
        */
        public getIndexByKey(key: any): number {
            return this._keys.indexOf(key);
        }

        /**
        * @language zh_CN
        * 根据键获得值
        * @param    key     键
        * @return           值
        * @version Egret 3.0
        * @platform Web,Native
        */
        public getValueByKey(key: any): any {
            var index: number = this.getIndexByKey(key);
            if (index > -1) {
                return this._values[index];
            }
            return null;
        }

        /**
        * @language zh_CN
        * 放入一个键值对
        * @param    key     键
        * @param    value   值
        * @return           原来的值
        * @version Egret 3.0
        * @platform Web,Native
        */
        public put(key: any, value: any): any {
            if (key == null)
                return null;
            var old: any = this.remove(key);
            this._keys.push(key);
            this._values.push(value);
            return old;
        }

        /**
        * @language zh_CN
        * 移除一个键值对
        * @param    key     键
        * @return           移除的值
        * @version Egret 3.0
        * @platform Web,Native
        */
        public remove(key: any): any {
            var index: number = this._keys.indexOf(key)
            var item: any;
            if (index > -1) {
                item = this._values[index];
                this._keys.splice(index, 1);
                this._values.splice(index, 1);
            }
            return item;
        }

        /**
        * @language zh_CN
        * 获取值的队列
        * @return          值的队列
        * @version Egret 3.0
        * @platform Web,Native
        */
        public getValues(): Array<any> {
            return this._values;
        }

        /**
        * @language zh_CN
        * 获取键的队列
        * @return          键的队列
        * @version Egret 3.0
        * @platform Web,Native
        */
        public getKeys(): Array<any> {
            return this._keys;
        }

        /**
        * @language zh_CN
        * 重置该哈希表
        * @version Egret 3.0
        * @platform Web,Native
        */
        public clear(): void {
            this._values.length = 0;
            this._keys.length = 0;
        }

    }
}