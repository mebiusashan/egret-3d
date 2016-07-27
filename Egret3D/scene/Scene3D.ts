module egret3d {

    /**
    * @private
    */
    export class Scene3D {
        private _tree: TreeBase; 
        private _root: Object3D = new Object3D();

        /**
        * @language zh_CN
        * 四叉树根对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        private _quad: QuadRoot;
        constructor() {
            this._tree = new TreeBase(this._root);
        }
        
        /**
        * @language zh_CN
        * 返回渲染根节点
        * 返回渲染场景的 scene3D 
        * @returns Object3D
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get root(): Object3D {
            return this._root;
        }

        /**
        * @language zh_CN
        * 返回剖分场景四叉树根信息
        * @returns QuadRoot
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get quad(): QuadRoot {
            return this._quad;
        }

        /**
        * @language zh_CN
        * 将一个 Object3D 实例添加到 Scene3D 实例中。
        * 将一个 Object3D 实例添加到 Scene3D 实例中。参与scene3D中的显示树优化，并且即时渲染出来
        * @param  child3D {Object3D}
        * @version Egret 3.0
        * @platform Web,Native
        */
        public addChild3D(child3D: Object3D) {
            this._root.addChild(child3D);
            // to do add renderlist tree
        }

        public removeChild3D(child3D: Object3D) {
            this._root.removeChild(child3D);
            // to do add renderlist tree
        }

        public update() {
        }

        public infrustumList(camera: Camera3D): Object3D[] {
            return this._tree.infrustumList(camera);
        }

        /**
        * @language zh_CN
        * 根据当前场景的节点分布情况，生成四叉树
        * @version Egret 3.0
        * @platform Web,Native
        */
        public createQuadTree(): void {
            this._quad = new QuadRoot(8, 128);
            var nodes: Array<IQuadNode> = new Array<IQuadNode>();
            this.collectQuadList(nodes, this.root);
            this._quad.createQuadTree(nodes);
        }

        /**
        * @language zh_CN
        * 遍历一个Object3D及其child节点，如果能够进入视锥体，则放入返回的列表中
        * @param  nodes 用于返回Quad元素结果
        * @param  obj   待遍历的对象
        * @returns Array<IQuadNode>
        * @version Egret 3.0
        * @platform Web,Native
        */
        private collectQuadList(nodes: Array<IQuadNode>, obj: Object3D): Array<IQuadNode> {
            nodes = nodes || new Array<IQuadNode>();
            var mesh: Mesh;
            if(obj instanceof Mesh) {
                mesh = <Mesh>obj;
                if (mesh.aabb) {
                    nodes.push(mesh);
                }
            }
            
            var child: Object3D;
            if(obj.childs && obj.childs.length > 0) {
                for (child of obj.childs) {
                    this.collectQuadList(nodes, child);
                }
            }

            return nodes;
        }



    }
} 