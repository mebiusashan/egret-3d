module egret3d {

    /**
    * @private
    * @class egret3d.LODNode
    * @classdesc
    *
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class LODNode {
        public lt: number = 0;
        public rt: number = 0;
        public lb: number = 0;
        public rb: number = 0;
        public tc: number = 0;
        public bc: number = 0;
        public lc: number = 0;
        public rc: number = 0;
        public oc: number = 0;

        public center: Vector3D = new Vector3D();
        public center_0: Vector3D = new Vector3D();
        public radius: number = 0;

        public dh0: number = 0;
        public dh1: number = 0;
        public dh2: number = 0;
        public dh3: number = 0;
        public dh4: number = 0;
        public dh5: number = 0;
        public minDH: number = 0;
        public maxDH: number = 0;
        public d: number = 0;

        public childs: LODNode[] = [];
        public parent: LODNode;
        public level: number = 0;
        public isRender: boolean = false;

        public lodQuadTree: LODQuadTree;

        public static v0: any = [];
        public static v1: any = [];
        public static v2: any = [];
        public static v3: any = [];
        public static v4: any = [];
        public static v5: any = [];
        public static v6: any = [];
        public static v7: any = [];
        public static v8: any = [];

        constructor(parent: LODNode = null, lodQuadTree: LODQuadTree = null, x: number = 0, z: number = 0) {
            this.parent = parent;
            this.lodQuadTree = lodQuadTree;
            if (this.parent) {
                this.level = this.parent.level + 1;
            }

            if (x != 0 && z != 0) {
                this.createNode(0, x, (z + 1) * x, (z + 1) * (x + 1) - 1);
            }

            if (!this.parent) {
                this.findNeighbour(this, x, z);
            }
        }

        public calculateHeightDiff() {
            LODNode.v0.length = 0;
            LODNode.v1.length = 0;
            LODNode.v2.length = 0;
            LODNode.v3.length = 0;
            LODNode.v4.length = 0;
            LODNode.v5.length = 0;
            LODNode.v6.length = 0;
            LODNode.v7.length = 0;
            LODNode.v8.length = 0;

            LODNode.getVertex(this.lt, LODNode.v0, this.lodQuadTree.vertexDatas);
            LODNode.getVertex(this.rt, LODNode.v1, this.lodQuadTree.vertexDatas);
            LODNode.getVertex(this.lb, LODNode.v2, this.lodQuadTree.vertexDatas);
            LODNode.getVertex(this.rb, LODNode.v3, this.lodQuadTree.vertexDatas);

            var tc: number = (this.lt + this.rt) / 2;
            var bc: number = (this.lb + this.rb) / 2;
            var lc: number = (this.lt + this.lb) / 2;
            var rc: number = (this.rt + this.rb) / 2;

            var oc: number = (this.lt + this.rb) / 2;

            LODNode.getVertex(tc, LODNode.v4, this.lodQuadTree.vertexDatas);
            LODNode.getVertex(bc, LODNode.v5, this.lodQuadTree.vertexDatas);
            LODNode.getVertex(lc, LODNode.v6, this.lodQuadTree.vertexDatas);
            LODNode.getVertex(rc, LODNode.v7, this.lodQuadTree.vertexDatas);
            LODNode.getVertex(oc, LODNode.v8, this.lodQuadTree.vertexDatas);

            this.dh0 = (LODNode.v0[2] + LODNode.v1[2]) / 2 - LODNode.v4[2];
            this.dh1 = (LODNode.v2[2] + LODNode.v3[2]) / 2 - LODNode.v5[2];

            this.dh2 = (LODNode.v0[2] + LODNode.v2[2]) / 2 - LODNode.v6[2];
            this.dh3 = (LODNode.v1[2] + LODNode.v3[2]) / 2 - LODNode.v7[2];

            this.dh4 = (LODNode.v0[2] + LODNode.v3[2]) / 2 - LODNode.v8[2];
            this.dh5 = (LODNode.v1[2] + LODNode.v2[2]) / 2 - LODNode.v8[2];

            this.minDH = Math.max(this.dh0, this.dh1);
            this.minDH = Math.max(this.minDH, this.dh2);
            this.minDH = Math.max(this.minDH, this.dh3);
            this.minDH = Math.max(this.minDH, this.dh4);
            this.minDH = Math.max(this.minDH, this.dh5);

            this.maxDH = Math.max(this.dh0, this.dh1);
            this.maxDH = Math.max(this.maxDH, this.dh2);
            this.maxDH = Math.max(this.maxDH, this.dh3);
            this.maxDH = Math.max(this.maxDH, this.dh4);
            this.maxDH = Math.max(this.maxDH, this.dh5);
            this.maxDH = Math.max(this.maxDH, 1);

            var x = LODNode.v1[0] - LODNode.v0[0];
            var y = LODNode.v1[1] - LODNode.v0[1];
            var z = LODNode.v1[2] - LODNode.v0[2];
            this.d = Math.sqrt(x * x + y * y + z * z);
        }

        public createNode(lt: number, rt: number, lb: number, rb: number) {

            this.lt = lt;
            this.rt = rt;
            this.lb = lb;
            this.rb = rb;

            if (this.lodQuadTree.vertexDatas) {
                this.createBoundSphere();
            }

            if (this.rt - lt > 1) {
                this.calculateHeightDiff();

                var quad: LODNode = null;

                var tc: number = (lt + rt) / 2;
                var bc: number = (lb + rb) / 2;
                var lc: number = (lt + lb) / 2;
                var rc: number = (rt + rb) / 2;

                var oc: number = (lt + rb) / 2;

                this.tc = tc;
                this.bc = bc;
                this.lc = lc;
                this.rc = rc;
                this.oc = oc;

                quad = new LODNode(this, this.lodQuadTree);
                this.childs[0] = quad;
                quad.createNode(lt, tc, lc, oc);

                quad = new LODNode(this, this.lodQuadTree);
                this.childs[1] = quad;
                quad.createNode(tc, rt, oc, rc);

                quad = new LODNode(this, this.lodQuadTree);
                this.childs[2] = quad;
                quad.createNode(lc, oc, lb, bc);

                quad = new LODNode(this, this.lodQuadTree);
                this.childs[3] = quad;
                quad.createNode(oc, rc, bc, rb);
            }
        }

        protected createBoundSphere() {

            LODNode.v0.length = 0;
            LODNode.v1.length = 0;
            LODNode.v2.length = 0;
            LODNode.v3.length = 0;

            LODNode.getVertex(this.lt, LODNode.v0, this.lodQuadTree.vertexDatas);
            LODNode.getVertex(this.rt, LODNode.v1, this.lodQuadTree.vertexDatas);
            LODNode.getVertex(this.lb, LODNode.v2, this.lodQuadTree.vertexDatas);
            LODNode.getVertex(this.rb, LODNode.v3, this.lodQuadTree.vertexDatas);

            LODNode.v4[0] = Math.min(LODNode.v0[0], LODNode.v1[0]);
            LODNode.v4[0] = Math.min(LODNode.v4[0], LODNode.v2[0]);
            LODNode.v4[0] = Math.min(LODNode.v4[0], LODNode.v3[0]);

            LODNode.v4[1] = Math.min(LODNode.v0[1], LODNode.v1[1]);
            LODNode.v4[1] = Math.min(LODNode.v4[1], LODNode.v2[1]);
            LODNode.v4[1] = Math.min(LODNode.v4[1], LODNode.v3[1]);

            LODNode.v4[2] = Math.min(LODNode.v0[2], LODNode.v1[2]);
            LODNode.v4[2] = Math.min(LODNode.v4[2], LODNode.v2[2]);
            LODNode.v4[2] = Math.min(LODNode.v4[2], LODNode.v3[2]);

            LODNode.v5[0] = Math.max(LODNode.v0[0], LODNode.v1[0]);
            LODNode.v5[0] = Math.max(LODNode.v5[0], LODNode.v2[0]);
            LODNode.v5[0] = Math.max(LODNode.v5[0], LODNode.v3[0]);

            LODNode.v5[1] = Math.max(LODNode.v0[1], LODNode.v1[1]);
            LODNode.v5[1] = Math.max(LODNode.v5[1], LODNode.v2[1]);
            LODNode.v5[1] = Math.max(LODNode.v5[1], LODNode.v3[1]);

            LODNode.v5[2] = Math.max(LODNode.v0[2], LODNode.v1[2]);
            LODNode.v5[2] = Math.max(LODNode.v5[2], LODNode.v2[2]);
            LODNode.v5[2] = Math.max(LODNode.v5[2], LODNode.v3[2]);

            var x: number = LODNode.v5[0] - LODNode.v4[0];
            var y: number = LODNode.v5[1] - LODNode.v4[1];
            var z: number = LODNode.v5[2] - LODNode.v4[2];
            this.radius = Math.sqrt(x * x + y * y + z * z) / 2;

            this.center.x = LODNode.v4[0] + x / 2;
            this.center.y = LODNode.v4[1] + y / 2;
            this.center.z = LODNode.v4[2] + z / 2;

            this.center_0.copyFrom(this.center);
        }

        public static getVertex(index: number, data: any, vertexDatas: any) {
            data[0] = vertexDatas[index * 3 + 0];
            data[1] = vertexDatas[index * 3 + 1];
            data[2] = vertexDatas[index * 3 + 2];
        }

        protected isNeighbour(lt: number, rt: number, lb: number, rb: number) {
            if (this.lt == lt &&
                this.rt == rt &&
                this.lb == lb &&
                this.rb == rb) {
                return this;
            }

            if (this.childs[0]) {
                var oc: number = (lt + rt + lb + rb) / 4;

                LODNode.v0.length = 0;
                LODNode.getVertex(oc, LODNode.v0, this.lodQuadTree.vertexDatas);

                LODNode.v1.length = 0;
                LODNode.v2.length = 0;
                LODNode.getVertex(this.childs[0].lt, LODNode.v1, this.lodQuadTree.vertexDatas);
                LODNode.getVertex(this.childs[0].rb, LODNode.v2, this.lodQuadTree.vertexDatas);

                if (Rectangle.pointInRect(LODNode.v0[0], LODNode.v0[2], LODNode.v1[0], LODNode.v1[2], LODNode.v2[0], LODNode.v2[2])) {
                    return this.childs[0].isNeighbour(lt, rt, lb, rb);
                }

                LODNode.v1.length = 0;
                LODNode.v2.length = 0;
                LODNode.getVertex(this.childs[1].lt, LODNode.v1, this.lodQuadTree.vertexDatas);
                LODNode.getVertex(this.childs[1].rb, LODNode.v2, this.lodQuadTree.vertexDatas);

                if (Rectangle.pointInRect(LODNode.v0[0], LODNode.v0[2], LODNode.v1[0], LODNode.v1[2], LODNode.v2[0], LODNode.v2[2])) {
                    return this.childs[1].isNeighbour(lt, rt, lb, rb);
                }

                LODNode.v1.length = 0;
                LODNode.v2.length = 0;
                LODNode.getVertex(this.childs[2].lt, LODNode.v1, this.lodQuadTree.vertexDatas);
                LODNode.getVertex(this.childs[2].rb, LODNode.v2, this.lodQuadTree.vertexDatas);

                if (Rectangle.pointInRect(LODNode.v0[0], LODNode.v0[2], LODNode.v1[0], LODNode.v1[2], LODNode.v2[0], LODNode.v2[2])) {
                    return this.childs[2].isNeighbour(lt, rt, lb, rb);
                }

                LODNode.v1.length = 0;
                LODNode.v2.length = 0;
                LODNode.getVertex(this.childs[3].lt, LODNode.v1, this.lodQuadTree.vertexDatas);
                LODNode.getVertex(this.childs[3].rb, LODNode.v2, this.lodQuadTree.vertexDatas);

                if (Rectangle.pointInRect(LODNode.v0[0], LODNode.v0[2], LODNode.v1[0], LODNode.v1[2], LODNode.v2[0], LODNode.v2[2])) {
                    return this.childs[3].isNeighbour(lt, rt, lb, rb);
                }
            }

            return null;
        }

        protected findNeighbour(root: LODNode, x: number, z: number) {
            var g: number = this.rt - this.lt;
            if (g <= 1) {
                return;
            }

            var _0: number = 0;
            var _1: number = 0;
            var _2: number = 0;
            var _3: number = 0;
            var n: number = 0;

            if (this.lt == 16350 && this.rt == 16352 &&
                this.lb == 16608 && this.rb == 16610) {
                var sss: number = 0;
            }

            for (var i: number = 0; i < 4; ++i) {
                switch (i) {
                    case 0:
                        _0 = this.lt - g * (x + 1);
                        _1 = this.rt - g * (x + 1);
                        _2 = this.lt;
                        _3 = this.rt;
                        break;
                    case 1:
                        _0 = this.lb;
                        _1 = this.rb;
                        _2 = this.lb + g * (x + 1);
                        _3 = this.rb + g * (x + 1);
                        break;
                    case 2:
                        _0 = this.lt - g;
                        _1 = this.lt;
                        _2 = this.lb - g;
                        _3 = this.lb;
                        break;
                    case 3:
                        _0 = this.rt;
                        _1 = this.rt + g;
                        _2 = this.rb;
                        _3 = this.rb + g;
                        break;
                }

                n = (_0 + _1 + _2 + _3) / 4;
                if (n >= 0 && n <= ((x + 1) * (z + 1) - 1)) {
                    this.childs[i + 4] = root.isNeighbour(_0, _1, _2, _3);
                }
            }

            if (this.childs[0]) {
                this.childs[0].findNeighbour(root, x, z);
                this.childs[1].findNeighbour(root, x, z);
                this.childs[2].findNeighbour(root, x, z);
                this.childs[3].findNeighbour(root, x, z);
            }
        }

        public isDivide(camera: Camera3D, lod: number): boolean {
            LODNode.v0.length = 0;
            LODNode.getVertex(this.oc, LODNode.v0, this.lodQuadTree.vertexDatas_0);

            //MathUtil.CALCULATION_VECTOR3D.setTo(LODNode.v0[0], LODNode.v0[1], LODNode.v0[2]);
            //object3d.modelMatrix.transformVector(MathUtil.CALCULATION_VECTOR3D, MathUtil.CALCULATION_VECTOR3D);

            //var x: number = camera.globalX - MathUtil.CALCULATION_VECTOR3D.x;
            //var y: number = camera.globalY - MathUtil.CALCULATION_VECTOR3D.y;
            //var z: number = camera.globalZ - MathUtil.CALCULATION_VECTOR3D.z;

            var x: number = camera.globalX - LODNode.v0[0];
            var y: number = camera.globalY - LODNode.v0[1];
            var z: number = camera.globalZ - LODNode.v0[2];

            var l: number = Math.sqrt(x * x + y * y + z * z);

            if (l / (this.d * lod * this.maxDH) < 1) {
                return true;
            }
            return false;
        }

        public setIsRender(value: boolean) {
            this.isRender = value;
            if (this.childs[0]) {
                this.childs[0].setIsRender(value);
                this.childs[1].setIsRender(value);
                this.childs[2].setIsRender(value);
                this.childs[3].setIsRender(value);
            }
        }
    }

    /**
    * @private
    * @class egret3d.LODNode
    * @classdesc
    *
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class LODQuadTree {

        /**
        * @language zh_CN
        * lod微调值
        * @version Egret 3.0
        * @platform Web,Native
        */
        public lodValue: number = 16;

        /**
        * @language zh_CN
        * 每个节点的包围球半径偏移
        * @version Egret 3.0
        * @platform Web,Native
        */
        public offset: number = 200;

        /**
        * @language zh_CN
        * 每个节点的层级
        * @version Egret 3.0
        * @platform Web,Native
        */
        public level: number = 7;

        /**
        * @language zh_CN
        * 格子行数
        * @version Egret 3.0
        * @platform Web,Native
        */
        public row: number = 128;

        /**
        * @language zh_CN
        * 格子列数
        * @version Egret 3.0
        * @platform Web,Native
        */
        public col: number = 128;

        /**
        * @language zh_CN
        * 根节点
        * @version Egret 3.0
        * @platform Web,Native
        */
        public root: LODNode;

        public enable = true;

        private currentNodes: LODNode[] = [];
        private nextNodes: LODNode[] = [];

        private v0: Vector3D = new Vector3D();
        private v1: Vector3D = new Vector3D();

        public vertexDatas: any;
        public vertexDatas_0: any;

        /**
        * @private
        * @language zh_CN
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static getOrder(size:number):number {
            var order :number = 0;
            size = (size - 1) >> (0);
            do {
                size >>= 1;
                order++;
            } while (size);
            return order;
        }

        /**
        * @language zh_CN
        * 构造
        * @param vertex 地形顶点列表
        * @param size 地形格子 行列格子
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor(vertex: any, size: number) {
            this.row = size;
            this.col = size;
            
            this.vertexDatas = vertex;
            this.vertexDatas_0 = [];
            for (var i: number = 0; i < vertex.length; ++i) {
                this.vertexDatas_0[0] = vertex[i];
            }

            this.level = LODQuadTree.getOrder(size);

            this.root = new LODNode(null, this, this.row, this.col);
        }

        public build(index: number, indexBuffer: Uint16Array, camera: Camera3D): number {

            this.currentNodes.length = 0;
            this.nextNodes.length = 0;
            this.currentNodes.push(this.root);
            var node: LODNode;

            this.root.setIsRender(false);
            for (var i: number = this.level; i >= 0; --i) {
                for (var j: number = 0; j < this.currentNodes.length; ++j) {
                    node = this.currentNodes[j];

                    if (!camera.frustum.inSphere(node.center_0, node.radius + this.offset)) {
                        continue;
                    }

                    if (node.rt - node.lt <= 1) {

                        indexBuffer[index++] = node.lt;
                        indexBuffer[index++] = node.rb;
                        indexBuffer[index++] = node.lb;

                        indexBuffer[index++] = node.lt;
                        indexBuffer[index++] = node.rt;
                        indexBuffer[index++] = node.rb;
                        node.isRender = true;
                        continue;
                    }

                    if (this.enable) {
                        if (node.isDivide(camera, this.lodValue)) {
                            this.nextNodes.push(node.childs[0]);
                            this.nextNodes.push(node.childs[1]);
                            this.nextNodes.push(node.childs[2]);
                            this.nextNodes.push(node.childs[3]);
                        }
                        else {
                            node.setIsRender(true);
                        }
                    }
                    else {
                        this.nextNodes.push(node.childs[0]);
                        this.nextNodes.push(node.childs[1]);
                        this.nextNodes.push(node.childs[2]);
                        this.nextNodes.push(node.childs[3]);
                    }
                }
                var currentNodes: LODNode[] = this.currentNodes;
                this.currentNodes = this.nextNodes;
                this.nextNodes = currentNodes;
                this.nextNodes.length = 0;
            }


            this.currentNodes.length = 0;
            this.nextNodes.length = 0;
            this.currentNodes.push(this.root);
            for (var i: number = this.level; i >= 0; --i) {
                for (var j: number = 0; j < this.currentNodes.length; ++j) {
                    node = this.currentNodes[j];

                    if (node.isRender && (node.rt - node.lt) > 1) {

                        var b0: boolean = false;
                        var b1: boolean = false;
                        var b2: boolean = false;
                        var b3: boolean = false;

                        if (node.childs[4]) {
                            b0 = node.childs[4].isRender;
                        }
                        else {
                            b0 = true;
                        }

                        if (node.childs[5]) {
                            b1 = node.childs[5].isRender;
                        }
                        else {
                            b1 = true;
                        }

                        if (node.childs[6]) {
                            b2 = node.childs[6].isRender;
                        }
                        else {
                            b2 = true;
                        }

                        if (node.childs[7]) {
                            b3 = node.childs[7].isRender;
                        }
                        else {
                            b3 = true;
                        }

                        if (b0 && b1 && b2 && b3) {
                            indexBuffer[index++] = node.lt;
                            indexBuffer[index++] = node.rb;
                            indexBuffer[index++] = node.lb;

                            indexBuffer[index++] = node.lt;
                            indexBuffer[index++] = node.rt;
                            indexBuffer[index++] = node.rb;
                            continue;
                        }

                        if (b0 || !node.childs[4]) {
                            indexBuffer[index++] = node.oc;
                            indexBuffer[index++] = node.lt;
                            indexBuffer[index++] = node.rt;
                        }
                        else {
                            index = this.mendCracks(index, indexBuffer, node, node.childs[4].childs[2], 4);
                            index = this.mendCracks(index, indexBuffer, node, node.childs[4].childs[3], 4);
                        }

                        if (b1 || !node.childs[5]) {
                            indexBuffer[index++] = node.lb;
                            indexBuffer[index++] = node.oc;
                            indexBuffer[index++] = node.rb;
                        }
                        else {
                            index = this.mendCracks(index, indexBuffer, node, node.childs[5].childs[0], 5);
                            index = this.mendCracks(index, indexBuffer, node, node.childs[5].childs[1], 5);
                        }

                        if (b2 || !node.childs[6]) {
                            indexBuffer[index++] = node.lt;
                            indexBuffer[index++] = node.oc;
                            indexBuffer[index++] = node.lb;
                        }
                        else {
                            index = this.mendCracks(index, indexBuffer, node, node.childs[6].childs[1], 6);
                            index = this.mendCracks(index, indexBuffer, node, node.childs[6].childs[3], 6);
                        }

                        if (b3 || !node.childs[7]) {
                            indexBuffer[index++] = node.oc;
                            indexBuffer[index++] = node.rt;
                            indexBuffer[index++] = node.rb;
                        }
                        else {
                            index = this.mendCracks(index, indexBuffer, node, node.childs[7].childs[0], 7);
                            index = this.mendCracks(index, indexBuffer, node, node.childs[7].childs[2], 7);
                        }
                    }
                    else {
                        if (node.childs[0]) {
                            this.nextNodes.push(node.childs[0]);
                            this.nextNodes.push(node.childs[1]);
                            this.nextNodes.push(node.childs[2]);
                            this.nextNodes.push(node.childs[3]);
                        }
                    }
                }
                var currentNodes: LODNode[] = this.currentNodes;
                this.currentNodes = this.nextNodes;
                this.nextNodes = currentNodes;
                this.nextNodes.length = 0;
            }

            return index;
        }

        protected mendCracks(index: number, indexBuffer: Uint16Array, node: LODNode, node_0: LODNode, dir: number): number {
            if (!node_0) {
                return index;
            }

            switch (dir) {
                case 4:
                    if (node_0) {
                        if (node_0.isRender) {
                            indexBuffer[index++] = node.oc;
                            indexBuffer[index++] = node_0.lb;
                            indexBuffer[index++] = node_0.rb;
                        }
                        else {
                            index = this.mendCracks(index, indexBuffer, node, node_0.childs[2], 4);
                            index = this.mendCracks(index, indexBuffer, node, node_0.childs[3], 4);
                        }
                    }

                    break;
                case 5:
                    if (node_0) {
                        if (node_0.isRender) {
                            indexBuffer[index++] = node_0.lt;
                            indexBuffer[index++] = node.oc;
                            indexBuffer[index++] = node_0.rt;
                        }
                        else {
                            index = this.mendCracks(index, indexBuffer, node, node_0.childs[0], 5);
                            index = this.mendCracks(index, indexBuffer, node, node_0.childs[1], 5);
                        }
                    }

                    break;
                case 6:
                    if (node_0) {
                        if (node_0.isRender) {
                            indexBuffer[index++] = node.oc;
                            indexBuffer[index++] = node_0.rb;
                            indexBuffer[index++] = node_0.rt;
                        }
                        else {
                            index = this.mendCracks(index, indexBuffer, node, node_0.childs[1], 6);
                            index = this.mendCracks(index, indexBuffer, node, node_0.childs[3], 6);
                        }
                    }

                    break;
                case 7:
                    if (node_0) {
                        if (node_0.isRender) {
                            indexBuffer[index++] = node.oc;
                            indexBuffer[index++] = node_0.lt;
                            indexBuffer[index++] = node_0.lb;
                        }
                        else {
                            index = this.mendCracks(index, indexBuffer, node, node_0.childs[0], 7);
                            index = this.mendCracks(index, indexBuffer, node, node_0.childs[2], 7);
                        }
                    }
                    break;
            }
            return index;
        }

        public onUpdate(modle: Matrix4_4) {
            this.currentNodes.length = 0;
            this.nextNodes.length = 0;
            this.currentNodes.push(this.root);
            var node: LODNode;

            for (var i: number = this.level; i >= 0; --i) {
                for (var j: number = 0; j < this.currentNodes.length; ++j) {
                    node = this.currentNodes[j];
                    modle.transformVector(node.center, node.center_0);
                    this.nextNodes.push(node.childs[0]);
                    this.nextNodes.push(node.childs[1]);
                    this.nextNodes.push(node.childs[2]);
                    this.nextNodes.push(node.childs[3]);
                }
                var currentNodes: LODNode[] = this.currentNodes;
                this.currentNodes = this.nextNodes;
                this.nextNodes = currentNodes;
                this.nextNodes.length = 0;
            }

            for (var i: number = 0; i < this.vertexDatas.length / 3; ++i) {
                this.v0.setTo(this.vertexDatas[i * 3 + 0], this.vertexDatas[i * 3 + 1], this.vertexDatas[i * 3 + 2]);
                modle.transformVector(this.v0, this.v0);
                this.vertexDatas_0[i * 3 + 0] = this.v0.x;
                this.vertexDatas_0[i * 3 + 1] = this.v0.y;
                this.vertexDatas_0[i * 3 + 2] = this.v0.z;
            }
        }
    }
}