module egret3d
{
    /**
    * @private
    * @language zh_CN
    * @class egret3d.Navi3DAstar
    * @classdesc
    * 用于Navigation Mesh中寻路的A星算法
    * @version Egret 3.0
    * @platform Web,Native
    */
	export class Navi3DAstar
    {

        private _openedList: Array<Navi3DTriangle>;
        private _closedList: Array<Navi3DTriangle>;
        private _endNode: Navi3DTriangle;
        private _startNode: Navi3DTriangle;
        private _triangleChannel: Array<Navi3DTriangle>;
		private _navMesh:Navi3DMesh;
        private _findIndex: number = 0;

        /**
        * @language zh_CN
        * constructor
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor() {
            this._openedList = new Array<Navi3DTriangle>();
            this._closedList = new Array<Navi3DTriangle>();
        }

        /**
        * @language zh_CN
        * 开始找寻路径，输入起点终点
        * param navMesh 搜索的mesh对象
        * param startTriangle 开始三角形
        * param endTriangle 结束三角形
        * @returns 是否搜索成功
        * @version Egret 3.0
        * @platform Web,Native
        */
		public findPath(navMesh:Navi3DMesh, startTriangle:Navi3DTriangle, endTriangle:Navi3DTriangle):boolean
		{
			this._findIndex ++;
            this._navMesh = navMesh;
			
            this._startNode = startTriangle;
            this._endNode = endTriangle;
			
            this._openedList.length = 0;
            this._closedList.length = 0;
			
            if (this._startNode && this._endNode)
			{
                this._startNode.g = 0;
                this._startNode.h = 0;
                this._startNode.f = 0;
                this._startNode.parent = null;
                return this.search();
			}
			return false;
		}

        /**
        * @language zh_CN
        * 搜寻
        * @return 是否搜索成功
        * @version Egret 3.0
        * @platform Web,Native
        */
        private search(): boolean {
            var node: Navi3DTriangle = this._startNode;
            var neibours: Array<Navi3DTriangle> = new Array<Navi3DTriangle>();
            var test: Navi3DTriangle;
            while (node != this._endNode) {
                neibours = node.getNeibourTriangles(neibours, Navi3DMaskType.WalkAble, Navi3DMaskType.WalkAble);
                for (test of neibours) {
                    if (test.closeId == this._findIndex)
                        continue;
                    if (test == node || !test.walkAble) {
                        continue;
                    }
                    var g: number = node.g + Navi3DPoint.calcDistance(test, node) * test.costMultiplier;
                    var h: number = Navi3DPoint.calcDistance(test, this._endNode);
                    var f: number = g + h;
                    if (test.openId == this._findIndex) {
                        if (test.f > f) {
                            test.f = f;
                            test.g = g;
                            test.h = h;
                            test.parent = node;
                        }
                    }
                    else {
                        test.f = f;
                        test.g = g;
                        test.h = h;
                        test.parent = node;
                        test.openId = this._findIndex;
                        this._openedList.push(test);
                    }
                }
                node.closeId = this._findIndex;
                this._closedList.push(node);
                if (this._openedList.length == 0) {
                    return false;
                }
                this._openedList.sort(function (a: Navi3DTriangle, b: Navi3DTriangle) {
                    return a.f - b.f;
                });
                node = <Navi3DTriangle>(this._openedList.shift());
            }
            this.buildPath();
            return true;
        }

        /**
        * @language zh_CN
        * 回溯路径列表
        * @version Egret 3.0
        * @platform Web,Native
        */
		private buildPath():void
		{
			this._triangleChannel = [];
            var node: Navi3DTriangle = this._endNode;
            this._triangleChannel.push(node);
            while (node != this._startNode)
			{
				node = node.parent;
                this._triangleChannel.unshift(node);
			}
		}

        /**
        * @language zh_CN
        * 获取结果数据（三角带）
        * @version Egret 3.0
        * @platform Web,Native
        */
		public get channel():Array<Navi3DTriangle>
		{
            return this._triangleChannel;
		}
		
		
	}
	
	
	
	
	
	
	
}
