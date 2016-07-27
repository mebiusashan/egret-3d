module egret3d {
        
    /**
    * @private
    * @class egret3d.CollectBase
    * @classdesc
    * @version Egret 3.0
    * @platform Web,Native
    * Object3D 渲染对象收集器基类
    */
    export class CollectBase {
        
        /**
        * @language zh_CN
        * 可渲染对象列表
        */
        public renderList: Array<IRender>;

        /**
        * @language zh_CN
        * 拾取列表
        */
        public mousePickList: Array<IRender>;
        public rootScene: Scene3D;
        protected _nodes: Array<IRender>;

        protected _num: number = 0;

     
        private _tempRootNode: IRender;
        private _objDict: { [id: number]: number; } = {};

        /**
        * @language zh_CN
        * constructor
        * @param root 渲染根节点
        */
        constructor(){
            this.renderList = new Array<IRender>();
            this.mousePickList = new Array<IRender>();
            this._nodes = new Array<IRender>();
        }

        public set root(rootScene: Scene3D) {
            this.rootScene = rootScene;
        }

        public get root(): Scene3D {
            return this.rootScene;
        }
                
        /**
        * @language zh_CN
        * 数据更新
        * @param camera 当前摄像机
        */
        public update(camera: Camera3D) {
            this.renderList = this._nodes;
            this.renderList.length = 0;
            camera.frustum.update(camera);
        }
                        
        /**
        * @language zh_CN
        * 查找一个对象在渲染列表的下标
        * @param obj 要查找的对象
        * @returns 返回对象在渲染列表的下标
        */
        public findRenderObject(obj: IRender): number {
            for (var i: number = 0; i < this.renderList.length; ++i) {
                if (this.renderList[i] === obj) {
                    return i;
                }
            }
            return -1;
        }
    }
}