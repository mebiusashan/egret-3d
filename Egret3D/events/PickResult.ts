module egret3d {
                    
    /**
    * @language zh_CN
    * @class egret3d.PickResult
    * @classdesc
    * 鼠标拾取返回数据。</p>
    * 鼠标拾取模型上的交点 (本地坐标、世界坐标)。</p>
    * 鼠标拾取模型的uv。</p>
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class PickResult {
        /**
        * @language zh_CN
        * 鼠标拾取模型上的交点 (本地坐标)。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public localPosition: Vector3D = new Vector3D();
                        
        /**
        * @language zh_CN
        * 鼠标拾取模型上的交点 (世界坐标)。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public globalPosition: Vector3D = new Vector3D();

        /**
        * @language zh_CN
        * 鼠标拾取模型的uv。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public uv: Vector3D = new Vector3D();

        /**
        * @language zh_CN
        * 相交面的索引
        * @version Egret 3.0
        * @platform Web,Native
        */
        public faceIndex: number;

        /**
        * @language zh_CN
        * 相交面顶点0索引
        * @version Egret 3.0
        * @platform Web,Native
        */
        public v0: number;

        /**
        * @language zh_CN
        * 相交面顶点1索引
        * @version Egret 3.0
        * @platform Web,Native
        */
        public v1: number;

        /**
        * @language zh_CN
        * 相交面顶点2索引
        * @version Egret 3.0
        * @platform Web,Native
        */
        public v2: number;

        /**
        * @language zh_CN
        * 鼠标拣选到的所有物体
        * @version Egret 3.0
        * @platform Web,Native
        */
        public pickList: any;
    }
}