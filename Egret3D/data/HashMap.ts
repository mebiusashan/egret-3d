module egret3d {

    /*
    * @private
    * @class egret3d.HashMap
    * @classdesc
    * 用来做数据存储使用 hash map 映射表
    * <p> 通用的hash map 映射表  key为键 value为任意类型的值 
    * <p> 还可以通过开启开关使用双线列表能正常使用list带有顺序的存储方式
    *
    */
    export class HashMap {
        private data: { [key: string]: any } = [];
        private list: Array<any> = new Array<any>();

        constructor(useOrderList: boolean = false) {
            if (useOrderList) {
                this.list = new Array<any>();
            }
        }

        public isHas(key: string): boolean {
            if (this.data[key]) return true;
            return false;
        }

        public getValue(key: string): any {
            return this.data[key];
        }

        public getList(): Array<any> {
            return this.list;
        }

        public add(key: string, value: any) {
            this.data[key] = value;
            if (this.list){
                this.list.push(value);
            }
        }

        public remove(key: string) {
            if (this.list) {
                var index: number = this.list.indexOf(this.data[key]);
                if (index != -1) {
                    this.list.splice(index);
                }
            }
            delete this.data[key]; 
        }

        public dispose() {
            delete this.data;
            delete this.list; 
        }
    }
} 