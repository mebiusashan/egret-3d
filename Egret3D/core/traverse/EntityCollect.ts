module egret3d {

    /**
    * @private
    * @class egret3d.EntityCollect
    * @classdesc
    * Object3D 渲染对象收集器,把渲染对象进行可视筛选，
    * 并且划分渲染层级，依次排序到加入列表.
    *
    * @see egret3d.Scene3D
    * @see egret3d.View3D
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class EntityCollect extends CollectBase {

        public softRenderItems: { [key: string]: IRender[] } = {};
        public numberVertex: number = 0;
        public numberFace: number = 0;
        public numberDraw: number = 0;
        public numberSkin: number = 0;
        public numberAnimation: number = 0;
        public numberParticle: number = 0;
        
        /**
        * @language zh_CN
        * constructor
        * @param root 渲染根节点
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor() {
            super();
        }

        private applyRender(child: any, camera: Camera3D) {
            if (!child.visible) {
                return;
            }
            if ( child["material"] )
                this.addRenderList(<IRender>child, camera);

            for (var i: number = 0; i < child.childs.length; i++) {
                this.applyRender(child.childs[i], camera);
            }
        }

        /**
        * @language zh_CN
        * 尝试将一个渲染对象，进行视锥体裁剪，放入到渲染队列中
        * @param root 渲染根节点
        * @version Egret 3.0
        * @platform Web,Native
        */
        private addRenderList(renderItem: IRender, camera: Camera3D) {

            if (renderItem.enableCulling) {
                if (!camera.isVisibleToCamera(renderItem)) {
                    return;
                }
            }

            if (renderItem.material) {
                if (renderItem.tag.name == "normalObject" && renderItem.material.materialData.alphaBlending) {
                    this.softRenderItems["alphaObject"].push(renderItem);
                }
                else {
                    for (var i: number = 0; i < Layer.layerType.length; i++) {
                        if (renderItem.tag.name == Layer.layerType[i]) {
                            this.softRenderItems[Layer.layerType[i]].push(renderItem);
                        }
                    }
                }

                if (Egret3DEngine.instance.debug) {
                    this.numberFace += renderItem.geometry.faceCount;
                    this.numberVertex += renderItem.geometry.vertexCount;
                    this.numberDraw += 1;

                    if (renderItem.animation)
                        this.numberSkin += 1;
                    if (renderItem.proAnimation)
                        this.numberAnimation += 1;
                    if (renderItem.type == "particleEmit")
                        this.numberParticle += 1;
                }

            }

            if (renderItem.enablePick) {
                this.mousePickList.push(renderItem);
            }
        }
                
        /**
        * @language zh_CN
        * 数据更新 处理需要渲染的对象
        * @param camera 当前摄像机
        * @version Egret 3.0
        * @platform Web,Native
        */
        public update(camera: Camera3D) {
            super.update(camera);

            this.numberFace = 0 ;
            this.numberVertex = 0;
            this.numberDraw = 0;
            this.numberSkin = 0;
            this.numberAnimation = 0;
            this.numberParticle = 0 ;
            
            this.clearLayerList();

            this.renderList.length = 0;
            this.mousePickList.length = 0;

            if (this.rootScene.quad) {
                var box: BoundBox = camera.frustum.box;
                var quadList: Array<IQuadNode> = this.rootScene.quad.getNodesByAABB(box.min.x, box.min.z, box.max.x, box.max.z);
                 
                this.appendQuadList(quadList, camera);
                //var time4: number = new Date().getTime();
                //console.log("200/" + quadList.length + "/" + this.renderList.length, "time:" + (time2 - time1) + "/" + (time4 - time2) + "(" + (time3 - time2) + "," + (time4 - time3) + ")");
            }
            else {
                this.applyRender(this.rootScene.root, camera);
            }

            var listLen: number;
            for (var j: number = 0; j < Layer.layerType.length; j++) {
                listLen = this.softRenderItems[Layer.layerType[j]].length;
               
                this.softRenderItems[Layer.layerType[j]].sort(this.sortByOrder);
                   
                for (var i: number = 0; i < listLen; i++) {
                    this.renderList.push(this.softRenderItems[Layer.layerType[j]][i] );
                }
            }
        }

        /**
        * @language zh_CN
        * 根据当前场景的节点分布情况，生成四叉树
        * @version Egret 3.0
        * @param quadList   需要被判定是否在视锥体里的节点列表
        * @param camera     相机
        * @platform Web,Native
        */
        private appendQuadList(quadList: Array<IQuadNode>, camera: Camera3D) {
            var mesh: Mesh;
            var node: IQuadNode;
            for (node of quadList) {
                if (!(node instanceof Mesh))
                    continue;
                mesh = <Mesh>node;
                if (mesh && mesh.visible && mesh["material"])
                    this.addRenderList(mesh, camera);
            }
        }

        //protected findLayer(object3d: Object3D): Layer {
        //    var typeIndex: number = object3d.layer >> 24;
        //    var layerIndex: number = object3d.layer & 0x00FFFFFF;
        //    if (typeIndex < this._tags.length && typeIndex >= 0) {
        //        if (layerIndex < this._tags[typeIndex].layers.length && layerIndex >= 0) {
        //            return this._tags[typeIndex].layers[layerIndex];
        //        }
        //    }
        //    return this._tags[0].layers[0];
        //}

        //protected findTag(object3d: Object3D): Tag {
        //    var typeIndex: number = object3d.layer >> 24;
        //    if (typeIndex < this._tags.length && typeIndex >= 0) {
        //        return this._tags[typeIndex];
        //    }
        //    return this._tags[0];
        //}

        protected clearLayerList() {
            for (var i: number = 0; i < Layer.layerType.length; i++) {
                if (!this.softRenderItems[Layer.layerType[i]]) {
                    this.softRenderItems[Layer.layerType[i]] = [];
                }
                else
                    this.softRenderItems[Layer.layerType[i]].length = 0;
            }
        }

        protected sort(a: Object3D, b: Object3D, camera: Camera3D) {
            var dis_0: number = Vector3D.distance(a.globalPosition, camera.position);
            var dis_1: number = Vector3D.distance(b.globalPosition, camera.position);
            if (dis_0 > dis_1) {
                return -1;
            }
            else if (dis_0 < dis_1) {
                return 1;
            }

            return 0;
        }


        protected sortByOrder(a: IRender, b: IRender) {
            return b.drawOrder - a.drawOrder;
        }

    }
}