module egret3d {

    export enum NP {
        LT,
        RT,
        LB,
        RB,
        TC,
        BC,
        LC,
        RC,
        OC,
    }

    export class LODTree {
        public c1: number = 100; // 视距差
        public c2: number = 20; // 高度差

    }

    export class LODQuad {

        public content: number[] = [];
        public chlids: LODQuad[] = [];
        public parent: LODQuad;
        public level: number = 0;
        public static nodeCount: number = 0;

        public center: Vector3D = new Vector3D();
        public radius: number = 0;

        public vertexDatas: any;

        public static v0: any = [];
        public static v1: any = [];
        public static v2: any = [];
        public static v3: any = [];
        public static v4: any = [];
        public static v5: any = [];
        public static v6: any = [];
        public static v7: any = [];
        public static v8: any = [];

        constructor(parent: LODQuad = null, geo:any = null, x: number = 0, z: number = 0) {
            this.parent = parent;
            this.vertexDatas = geo;
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

        public createNode(lt:number, rt:number , lb: number, rb:number) {

            this.content[NP.LT] = lt;
            this.content[NP.RT] = rt;
            this.content[NP.LB] = lb;
            this.content[NP.RB] = rb;

            if (this.vertexDatas) {
                this.processSphere();
            }

            if (this.content[NP.RT] - this.content[NP.LT] > 1) {

                var quad: LODQuad = null;

                var tc: number = Math.floor((this.content[NP.LT] + this.content[NP.RT]) / 2);
                var bc: number = Math.floor((this.content[NP.LB] + this.content[NP.RB]) / 2);
                var lc: number = Math.floor((this.content[NP.LT] + this.content[NP.LB]) / 2);
                var rc: number = Math.floor((this.content[NP.RT] + this.content[NP.RB]) / 2);

                var oc: number = Math.floor((this.content[NP.LT] + this.content[NP.RB]) / 2);

                this.content[NP.TC] = tc;
                this.content[NP.BC] = bc;
                this.content[NP.LC] = lc;
                this.content[NP.RC] = rc;

                this.content[NP.OC] = oc;

                quad = new LODQuad(this, this.vertexDatas);
                this.chlids[NP.LT] = quad;
                quad.createNode(lt, tc, lc, oc);

                quad = new LODQuad(this, this.vertexDatas);
                this.chlids[NP.RT] = quad;
                quad.createNode(tc, rt, oc, rc);

                quad = new LODQuad(this, this.vertexDatas);
                this.chlids[NP.LB] = quad;
                quad.createNode(lc, oc, lb, bc);

                quad = new LODQuad(this, this.vertexDatas);
                this.chlids[NP.RB] = quad;
                quad.createNode(oc, rc, bc, rb);
            }
        }

        public createIndex(index: number, indexBuffer: Uint16Array, camera: Camera3D, lod:number = 10): number {
            if (!this.isVisable(camera.frustum)) {
                return index;
            }

            if (this.content[NP.RT] - this.content[NP.LT] <= 1) {
                indexBuffer[index++] = this.content[NP.LT];
                indexBuffer[index++] = this.content[NP.RB];
                indexBuffer[index++] = this.content[NP.LB];

                indexBuffer[index++] = this.content[NP.LT];
                indexBuffer[index++] = this.content[NP.RT];
                indexBuffer[index++] = this.content[NP.RB];
                return index;
            }
            else {
                
                if (this.isDivide(camera, lod)) {
                    if (this.chlids[0]) {
                        index = this.chlids[NP.LT].createIndex(index, indexBuffer, camera, lod);
                        index = this.chlids[NP.RT].createIndex(index, indexBuffer, camera, lod);
                        index = this.chlids[NP.LB].createIndex(index, indexBuffer, camera, lod);
                        index = this.chlids[NP.RB].createIndex(index, indexBuffer, camera, lod);
                    }
                }
                else {

                    var b0: boolean = false;
                    var b1: boolean = false;
                    var b2: boolean = false;
                    var b3: boolean = false;
                    var n: number = 0;

                    if (this.chlids[4]) {
                        b0 = this.chlids[4].isDivide(camera, lod);
                    }

                    if (this.chlids[5]) {
                        b1 = this.chlids[5].isDivide(camera, lod);
                    }

                    if (this.chlids[6]) {
                        b2 = this.chlids[6].isDivide(camera, lod);
                    }

                    if (this.chlids[7]) {
                        b3 = this.chlids[7].isDivide(camera, lod);
                    }

                    indexBuffer[index++] = this.content[NP.LT];
                    indexBuffer[index++] = this.content[NP.RB];
                    indexBuffer[index++] = this.content[NP.LB];

                    indexBuffer[index++] = this.content[NP.LT];
                    indexBuffer[index++] = this.content[NP.RT];
                    indexBuffer[index++] = this.content[NP.RB];
                    if (!b0 && !b1 && !b2 && !b3) {
                        return index;
                    }

                    if (b0) {
                        n = (this.content[NP.LT] + this.content[NP.RT]) / 2;
                        indexBuffer[index++] = this.content[NP.LT];
                        indexBuffer[index++] = n;
                        indexBuffer[index++] = this.content[NP.RT];
                    }


                    if (b1) {
                        n = (this.content[NP.LB] + this.content[NP.RB]) / 2;

                        indexBuffer[index++] = n;
                        indexBuffer[index++] = this.content[NP.LB];
                        indexBuffer[index++] = this.content[NP.RB];
                    }


                    if (b2) {
                        n = (this.content[NP.LT] + this.content[NP.LB]) / 2;

                        indexBuffer[index++] = this.content[NP.LB];
                        indexBuffer[index++] = n;
                        indexBuffer[index++] = this.content[NP.LT];
                    }


                    if (b3) {
                        n = (this.content[NP.RT] + this.content[NP.RB]) / 2;

                        indexBuffer[index++] = this.content[NP.RT];
                        indexBuffer[index++] = n;
                        indexBuffer[index++] = this.content[NP.RB];
                    }
                    return index;
                }
            }
            return index;
        }

        public isVisable(frustum: Frustum): boolean {
            return frustum.inSphere(this.center, this.radius);
        }

        protected getVertex(index: number, data: any) {
            data[0] = this.vertexDatas[index * 3 + 0];
            data[1] = this.vertexDatas[index * 3 + 1];
            data[2] = this.vertexDatas[index * 3 + 2];
        }

        protected processSphere() {

            LODQuad.v0.length = 0;
            LODQuad.v1.length = 0;
            LODQuad.v2.length = 0;
            LODQuad.v3.length = 0;

            this.getVertex(this.content[NP.LT], LODQuad.v0);
            this.getVertex(this.content[NP.RT], LODQuad.v1);
            this.getVertex(this.content[NP.LB], LODQuad.v2);
            this.getVertex(this.content[NP.RB], LODQuad.v3);

            LODQuad.v4[0] = Math.min(LODQuad.v0[0], LODQuad.v1[0]);
            LODQuad.v4[0] = Math.min(LODQuad.v4[0], LODQuad.v2[0]);
            LODQuad.v4[0] = Math.min(LODQuad.v4[0], LODQuad.v3[0]);

            LODQuad.v4[1] = Math.min(LODQuad.v0[1], LODQuad.v1[1]);
            LODQuad.v4[1] = Math.min(LODQuad.v4[1], LODQuad.v2[1]);
            LODQuad.v4[1] = Math.min(LODQuad.v4[1], LODQuad.v3[1]);

            LODQuad.v4[2] = Math.min(LODQuad.v0[2], LODQuad.v1[2]);
            LODQuad.v4[2] = Math.min(LODQuad.v4[2], LODQuad.v2[2]);
            LODQuad.v4[2] = Math.min(LODQuad.v4[2], LODQuad.v3[2]);

            LODQuad.v5[0] = Math.max(LODQuad.v0[0], LODQuad.v1[0]);
            LODQuad.v5[0] = Math.max(LODQuad.v5[0], LODQuad.v2[0]);
            LODQuad.v5[0] = Math.max(LODQuad.v5[0], LODQuad.v3[0]);

            LODQuad.v5[1] = Math.max(LODQuad.v0[1], LODQuad.v1[1]);
            LODQuad.v5[1] = Math.max(LODQuad.v5[1], LODQuad.v2[1]);
            LODQuad.v5[1] = Math.max(LODQuad.v5[1], LODQuad.v3[1]);

            LODQuad.v5[2] = Math.max(LODQuad.v0[2], LODQuad.v1[2]);
            LODQuad.v5[2] = Math.max(LODQuad.v5[2], LODQuad.v2[2]);
            LODQuad.v5[2] = Math.max(LODQuad.v5[2], LODQuad.v3[2]);

            var x: number = LODQuad.v5[0] - LODQuad.v4[0];
            var y: number = LODQuad.v5[1] - LODQuad.v4[1];
            var z: number = LODQuad.v5[2] - LODQuad.v4[2];

            this.radius = Math.sqrt(x * x + y * y + z * z) / 2;

            this.center.x = LODQuad.v4[0] + x / 2;
            this.center.y = LODQuad.v4[1] + y / 2;
            this.center.z = LODQuad.v4[2] + z / 2;
        }

        protected findNeighbour(root: LODQuad, x: number, z: number) {
            var rt_lt: number = this.content[NP.RT] - this.content[NP.LT];
            if (rt_lt <= 1) {
                return;
            }

            if (this.content[0] == 18 && this.content[1] == 20 &&
                this.content[2] == 148 && this.content[3] == 150) {

                var sssss: number = 0;
            }

            var g: number = this.content[NP.RT] - this.content[NP.LT];
            var _0: number = 0;
            var _1: number = 0;
            var _2: number = 0;
            var _3: number = 0;
            var n: number = 0;

            for (var i: number = 0; i < 4; ++i) {
                switch (i) {
                    case 0:
                        _0 = this.content[NP.LT] - g * (x + 1);
                        _1 = this.content[NP.RT] - g * (x + 1);
                        _2 = this.content[NP.LT];
                        _3 = this.content[NP.RT];
                        break;
                    case 1:
                        _0 = this.content[NP.LB];
                        _1 = this.content[NP.RB];
                        _2 = this.content[NP.LB] + g * (x + 1);
                        _3 = this.content[NP.RB] + g * (x + 1);
                        break;
                    case 2:
                        _0 = this.content[NP.LT] - g;
                        _1 = this.content[NP.LT];
                        _2 = this.content[NP.LB] - g;
                        _3 = this.content[NP.LB];
                        break;
                    case 3:
                        _0 = this.content[NP.RT];
                        _1 = this.content[NP.RT] + g;
                        _2 = this.content[NP.RB];
                        _3 = this.content[NP.RB] + g;
                        break;
                }

                n = (_0 + _1 + _2 + _3) / 4;
                if (n >= 0 && n <= (x * z - 1)) {
                    this.chlids[i + 4] = root.isNeighbour(_0, _1, _2, _3);
                }
            }

            if (this.chlids[0]) {
                this.chlids[NP.LT].findNeighbour(root, x, z);
                this.chlids[NP.RT].findNeighbour(root, x, z);
                this.chlids[NP.LB].findNeighbour(root, x, z);
                this.chlids[NP.RB].findNeighbour(root, x, z);
            }
        }

        protected isNeighbour(lt: number, rt: number, lb: number, rb: number) {
            if (this.content[NP.LT] == lt &&
                this.content[NP.RT] == rt &&
                this.content[NP.LB] == lb &&
                this.content[NP.RB] == rb) {
                return this;
            }

            if (this.chlids[0]) {
                var oc: number = (lt + rt + lb + rb) / 4;

                LODQuad.v0.length = 0;
                this.getVertex(oc, LODQuad.v0);

                LODQuad.v1.length = 0;
                LODQuad.v2.length = 0;
                this.getVertex(this.chlids[NP.LT].content[NP.LT], LODQuad.v1);
                this.getVertex(this.chlids[NP.LT].content[NP.RB], LODQuad.v2);

                if (Rectangle.pointInRect(LODQuad.v0[0], LODQuad.v0[2], LODQuad.v1[0], LODQuad.v1[2], LODQuad.v2[0], LODQuad.v2[2])) {
                    return this.chlids[NP.LT].isNeighbour(lt, rt, lb, rb);
                }

                LODQuad.v1.length = 0;
                LODQuad.v2.length = 0;
                this.getVertex(this.chlids[NP.RT].content[NP.LT], LODQuad.v1);
                this.getVertex(this.chlids[NP.RT].content[NP.RB], LODQuad.v2);

                if (Rectangle.pointInRect(LODQuad.v0[0], LODQuad.v0[2], LODQuad.v1[0], LODQuad.v1[2], LODQuad.v2[0], LODQuad.v2[2])) {
                    return this.chlids[NP.RT].isNeighbour(lt, rt, lb, rb);
                }

                LODQuad.v1.length = 0;
                LODQuad.v2.length = 0;
                this.getVertex(this.chlids[NP.LB].content[NP.LT], LODQuad.v1);
                this.getVertex(this.chlids[NP.LB].content[NP.RB], LODQuad.v2);

                if (Rectangle.pointInRect(LODQuad.v0[0], LODQuad.v0[2], LODQuad.v1[0], LODQuad.v1[2], LODQuad.v2[0], LODQuad.v2[2])) {
                    return this.chlids[NP.LB].isNeighbour(lt, rt, lb, rb);
                }

                LODQuad.v1.length = 0;
                LODQuad.v2.length = 0;
                this.getVertex(this.chlids[NP.RB].content[NP.LT], LODQuad.v1);
                this.getVertex(this.chlids[NP.RB].content[NP.RB], LODQuad.v2);

                if (Rectangle.pointInRect(LODQuad.v0[0], LODQuad.v0[2], LODQuad.v1[0], LODQuad.v1[2], LODQuad.v2[0], LODQuad.v2[2])) {
                    return this.chlids[NP.RB].isNeighbour(lt, rt, lb, rb);
                }
            }

            return null;
        }

        protected isDivide(camera: Camera3D, lod: number): boolean {
            LODQuad.v0.length = 0;
            LODQuad.v1.length = 0;
            LODQuad.v2.length = 0;
            LODQuad.v3.length = 0;
            LODQuad.v4.length = 0;
            LODQuad.v5.length = 0;
            LODQuad.v6.length = 0;
            LODQuad.v7.length = 0;
            LODQuad.v8.length = 0;

            this.getVertex(this.content[NP.LT], LODQuad.v0);
            this.getVertex(this.content[NP.RT], LODQuad.v1);
            this.getVertex(this.content[NP.LB], LODQuad.v2);
            this.getVertex(this.content[NP.RB], LODQuad.v3);

            var tc: number = (this.content[NP.LT] + this.content[NP.RT]) / 2;
            var bc: number = (this.content[NP.LB] + this.content[NP.RB]) / 2;
            var lc: number = (this.content[NP.LT] + this.content[NP.LB]) / 2;
            var rc: number = (this.content[NP.RT] + this.content[NP.RB]) / 2;
            
            var oc: number = (this.content[NP.LT] + this.content[NP.RB]) / 2;

            this.getVertex(tc, LODQuad.v4);
            this.getVertex(bc, LODQuad.v5);
            this.getVertex(lc, LODQuad.v6);
            this.getVertex(rc, LODQuad.v7);
            this.getVertex(oc, LODQuad.v8);

            var dh0: number = (LODQuad.v0[2] + LODQuad.v1[2]) / 2 - LODQuad.v4[2];
            var dh1: number = (LODQuad.v2[2] + LODQuad.v3[2]) / 2 - LODQuad.v5[2];

            var dh2: number = (LODQuad.v0[2] + LODQuad.v2[2]) / 2 - LODQuad.v6[2];
            var dh3: number = (LODQuad.v1[2] + LODQuad.v3[2]) / 2 - LODQuad.v7[2];

            var dh4: number = (LODQuad.v0[2] + LODQuad.v3[2]) / 2 - LODQuad.v8[2];
            var dh5: number = (LODQuad.v1[2] + LODQuad.v2[2]) / 2 - LODQuad.v8[2];

            var dhMax: number = dh0;
            dhMax = Math.max(dhMax, dh1);
            dhMax = Math.max(dhMax, dh2);
            dhMax = Math.max(dhMax, dh3);
            dhMax = Math.max(dhMax, dh4);
            dhMax = Math.max(dhMax, dh5);
            dhMax = Math.max(dhMax, 1);

            var x: number = camera.globalX - LODQuad.v8[0];
            var y: number = camera.globalY - LODQuad.v8[1];
            var z: number = camera.globalZ - LODQuad.v8[2];
            var l: number = Math.sqrt(x * x + y * y + z * z);

            x = LODQuad.v1[0] - LODQuad.v0[0];
            y = LODQuad.v1[1] - LODQuad.v0[1];
            z = LODQuad.v1[2] - LODQuad.v0[2];
            var d: number = Math.sqrt(x * x + y * y + z * z);

            if (l / (d * lod * dhMax) < 1) {
                return true;
            }
            return false;
        }
    }
}