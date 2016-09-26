module egret3d {
                    
    /**
    * @private
    * @class egret3d.Frustum
    * @classdesc
    * 摄像机视椎体,计算出摄像机的可视范围.
    * 
    * @see egret3d.Camera3D
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class Frustum {

        public box: BoundBox;

        private _vtxNum: number = 8;
        private _planeNum: number = 6;
        private _vertex: Array<Vector3D>;
        private _tempVertices: Array<Vector3D>;

        private _pos: Vector3D;
        private _plane: Array<Plane3D>;

        private _frustum: Wireframe = new Wireframe();
        private camera: Camera3D;

        private nearCenter: Vector3D = new Vector3D();
        private farCenter: Vector3D = new Vector3D();

        /**
        * @language zh_CN
        * @private
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get vertices(): Vector3D[] {
            return this._vertex;
        }


        /**
        * @language zh_CN
        * 摄像机渲染线框
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get wireframe(): Wireframe {
            return this._frustum;
        }

        /**
        * @language zh_CN
        * 视椎体中心点
        * @version Egret 3.0
        * @platform Web,Native
        */
        public center: Vector3D;

        private _curVer: Array<Vector3D>;
        
        /**
        * @language zh_CN
        * 构造
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor(camera: Camera3D = null) {
            this.camera = camera;
            this._vertex = new Array<Vector3D>();
            for (var i: number = 0; i < this._vtxNum; ++i) {
                this._vertex.push(new Vector3D());
            }

            this._tempVertices = new Array<Vector3D>();
            for (var i: number = 0; i < this._vtxNum; ++i) {
                this._tempVertices.push(new Vector3D());
            }

            this._pos = new Vector3D();
            this._plane = new Array<Plane3D>();
            for (var i: number = 0; i < 6; ++i) {
                this._plane.push(new Plane3D());
            }
            this.box = new BoundBox(null, new Vector3D(), new Vector3D());
            ///this.box = new CubeBoxBound(new Vector3D(99999.0, 99999.0, 99999.0), new Vector3D(-99999.0, -99999.0, -99999.0));
            this.center = new Vector3D();
            this._frustum.material.diffuseColor = 0xffffff;
            this._frustum.name = "CameraFrustum";

            this._frustum.geometry.vertexCount = 8;
            this._frustum.geometry.indexCount = 24;
            this._frustum.geometry.setVertexIndices(0, [0, 1, 1, 2, 2, 3, 0, 3, 4, 5, 5, 6, 6, 7, 4, 7, 0, 4, 1, 5, 3, 7, 2, 6]);
        }

        /**
        * @language zh_CN
        * 是否可见
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set visible(value: boolean) {
            if (value) {
                if (!this._frustum.parent) {
                    this.camera.addChild(this._frustum);
                }
                else {
                    if (this._frustum.parent != this.camera) {
                        this._frustum.parent.removeChild(this._frustum);
                        this.camera.addChild(this._frustum);
                    }
                }
            }
            else {
                if (this._frustum.parent) {
                    this._frustum.parent.removeChild(this._frustum);
                }
            }
        }

        /**
        * @language zh_CN
        * 是否可见
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get visible(): boolean {
            return this._frustum.parent ? true : false;
        }

        /**
        * @language zh_CN
        * @private
        * 生成一个视椎体
        * @param fovY 观察时y 轴方向的角度，就是观察范围夹角。
        * @param aspectRatio 纵横比，在视空间宽度除以高度.
        * @param nearPlane 近裁剪面位置Z值.
        * @param farPlane 远裁剪面位置Z值.
        * @version Egret 3.0
        * @platform Web,Native
        */
        public makeFrustum(fovY: number, aspectRatio: number, nearPlane: number, farPlane: number) {
            ///var tangent: number = Math.tan(fovY / 2.0 * (Math.PI / 180.0));
            var tangent: number = Math.tan(fovY / 2.0 * (Math.PI / 180.0));

            var nearHeight: number = nearPlane * tangent;
            var nearWidth: number = nearHeight * aspectRatio;
            var farHeight: number = farPlane * tangent;
            var farWidth: number = farHeight * aspectRatio;

            /// near top right
            this._vertex[0].x = nearWidth;
            this._vertex[0].y = nearHeight;
            this._vertex[0].z = nearPlane;
            /// near top left
            this._vertex[1].x = -nearWidth;
            this._vertex[1].y = nearHeight;
            this._vertex[1].z = nearPlane;
            /// near bottom left
            this._vertex[2].x = -nearWidth;
            this._vertex[2].y = -nearHeight;
            this._vertex[2].z = nearPlane;
            /// near bottom right
            this._vertex[3].x = nearWidth;
            this._vertex[3].y = -nearHeight;
            this._vertex[3].z = nearPlane;
            /// far top right
            this._vertex[4].x = farWidth;
            this._vertex[4].y = farHeight;
            this._vertex[4].z = farPlane;
            /// far top left
            this._vertex[5].x = -farWidth;
            this._vertex[5].y = farHeight;
            this._vertex[5].z = farPlane;
            /// far bottom left
            this._vertex[6].x = -farWidth;
            this._vertex[6].y = -farHeight;
            this._vertex[6].z = farPlane;
            /// far bottom right
            this._vertex[7].x = farWidth;
            this._vertex[7].y = -farHeight;
            this._vertex[7].z = farPlane;
        }

        protected makeOrthoFrustum(w: number, h: number, zn: number, zf: number) {
            /// near top right
            this._vertex[0].x = w / 2;
            this._vertex[0].y = h / 2;
            this._vertex[0].z = zn;
            /// near top left
            this._vertex[1].x = -w / 2;
            this._vertex[1].y = h / 2;
            this._vertex[1].z = zn;
            /// near bottom left
            this._vertex[2].x = -w / 2;
            this._vertex[2].y = -h / 2;
            this._vertex[2].z = zn;
            /// near bottom right
            this._vertex[3].x = w / 2;
            this._vertex[3].y = -h / 2;
            this._vertex[3].z = zn;
            /// far top right
            this._vertex[4].x = w / 2;
            this._vertex[4].y = h / 2;
            this._vertex[4].z = zf;
            /// far top left
            this._vertex[5].x = -w / 2;
            this._vertex[5].y = h / 2;
            this._vertex[5].z = zf;
            /// far bottom left
            this._vertex[6].x = -w / 2;
            this._vertex[6].y = -h / 2;
            this._vertex[6].z = zf;
            /// far bottom right
            this._vertex[7].x = w / 2;
            this._vertex[7].y = -h / 2;
            this._vertex[7].z = zf;
        }

        protected makeOrthoToCenterFrustum(l: number, r: number, b: number, t: number, zn: number, zf: number) {
            /// near top right
            this._vertex[0].x = r;
            this._vertex[0].y = t;
            this._vertex[0].z = zn;
            /// near top left
            this._vertex[1].x = l;
            this._vertex[1].y = t;
            this._vertex[1].z = zn;
            /// near bottom left
            this._vertex[2].x = l;
            this._vertex[2].y = b;
            this._vertex[2].z = zn;
            /// near bottom right
            this._vertex[3].x = r;
            this._vertex[3].y = b;
            this._vertex[3].z = zn;
            /// far top right
            this._vertex[4].x = r;
            this._vertex[4].y = t;
            this._vertex[4].z = zf;
            /// far top left
            this._vertex[5].x = l;
            this._vertex[5].y = t;
            this._vertex[5].z = zf;
            /// far bottom left
            this._vertex[6].x = l;
            this._vertex[6].y = b;
            this._vertex[6].z = zf;
            /// far bottom right
            this._vertex[7].x = r;
            this._vertex[7].y = b;
            this._vertex[7].z = zf;
        }

        /**
        * @language zh_CN
        * 数据更新.
        * @param camera 视椎的摄像机.
        * @version Egret 3.0
        * @platform Web,Native
        */
        public updateFrustum() {
            switch (this.camera.cameraType) {
                case CameraType.perspective:
                    this.makeFrustum(this.camera.fieldOfView, this.camera.aspectRatio, this.camera.near, this.camera.far);
                    break;
                case CameraType.orthogonal:
                    this.makeOrthoFrustum(this.camera.viewPort.width, this.camera.viewPort.height, this.camera.near, this.camera.far);
                    break;
                case CameraType.orthogonalToCenter:
                    this.makeOrthoToCenterFrustum(this.camera.viewPort.x, this.camera.viewPort.y, this.camera.viewPort.width, this.camera.viewPort.height, this.camera.near, this.camera.far);
                    break;
            }

            for (var i: number = 0; i < this.vertices.length; ++i) {
                this._frustum.geometry.setVerticesForIndex(i, VertexFormat.VF_POSITION, [this.vertices[i].x, this.vertices[i].y, this.vertices[i].z], 1);
            }
        }

        /**
        * @language zh_CN
        * 数据更新.
        * @param camera 视椎的摄像机.
        * @version Egret 3.0
        * @platform Web,Native
        */
        public update() {

            /// 摄像机变化之后的顶点也变化;
            var mat: Matrix4_4 = Matrix4_4.helpMatrix ;
            mat.copyFrom(this.camera.modelMatrix);

            //this._frustum.modelMatrix = mat;

            for (var i: number = 0; i < this._vtxNum; ++i) {
                mat.transformVector(this._vertex[i], this._tempVertices[i]);
            }
            this.box.max.x = this.box.max.y = this.box.max.z = -MathUtil.MAX_VALUE;
            this.box.min.x = this.box.min.y = this.box.min.z = MathUtil.MAX_VALUE;

            for (var i: number = 0; i < this._tempVertices.length; ++i) {
                if (this.box.max.x < this._tempVertices[i].x) {
                    this.box.max.x = this._tempVertices[i].x;
                }
                if (this.box.max.y < this._tempVertices[i].y) {
                    this.box.max.y = this._tempVertices[i].y;
                }
                if (this.box.max.z < this._tempVertices[i].z) {
                    this.box.max.z = this._tempVertices[i].z;
                }

                if (this.box.min.x > this._tempVertices[i].x) {
                    this.box.min.x = this._tempVertices[i].x;
                }
                if (this.box.min.y > this._tempVertices[i].y) {
                    this.box.min.y = this._tempVertices[i].y;
                }
                if (this.box.min.z > this._tempVertices[i].z) {
                    this.box.min.z = this._tempVertices[i].z;
                }
            }

            this.box.calculateBox();

            this._plane[0].fromPoints(this._tempVertices[4], this._tempVertices[5], this._tempVertices[6]);        /// 远平面(far);
            this._plane[1].fromPoints(this._tempVertices[1], this._tempVertices[6], this._tempVertices[5]);        /// 左平面(left);
            this._plane[2].fromPoints(this._tempVertices[0], this._tempVertices[4], this._tempVertices[7]);        /// 右平面(right);

            this._plane[3].fromPoints(this._tempVertices[1], this._tempVertices[0], this._tempVertices[3]);        /// 近平面(near);
            this._plane[4].fromPoints(this._tempVertices[1], this._tempVertices[5], this._tempVertices[4]);        /// 上平面(top);
            this._plane[5].fromPoints(this._tempVertices[3], this._tempVertices[7], this._tempVertices[6]);        /// 下平面(bottom);
            for (var i: number = 0; i < this._planeNum; i++) {
                this._plane[i].normalize();
            }

            this.nearCenter.copyFrom(this._tempVertices[0].subtract(this._tempVertices[2]));
            this.nearCenter.scaleBy(0.5);
            this.nearCenter.copyFrom(this._tempVertices[2].add(this.nearCenter));

            this.farCenter.copyFrom(this._tempVertices[4].subtract(this._tempVertices[6]));
            this.farCenter.scaleBy(0.5);
            this.farCenter.copyFrom(this._tempVertices[6].add(this.farCenter));

            this.center.copyFrom(this.farCenter.subtract(this.nearCenter));
            this.center.scaleBy(0.5);
            this.center.copyFrom(this.nearCenter.add(this.center));
        }
        
        /**
        * @language zh_CN
        * 检测一个坐标点是否在视椎体内
        * @param pos 检测的坐标
        * @returns 在视椎内返回ture
        * @version Egret 3.0
        * @platform Web,Native
        */
        public inPoint(pos: Vector3D): boolean {
            var dis: number = 0;
            for (var i: number = 0; i < this._plane.length; ++i) {
                dis = this._plane[i].distance(pos);
                if (dis > 0.0) {
                    return false;
                }
            }
            return true;
        }
                
        /**
        * @language zh_CN
        * 检测一个球是否在视椎体内
        * @param center 球的坐标
        * @param radius 球的半径
        * @returns 在视椎内返回ture
        * @version Egret 3.0
        * @platform Web,Native
        */
        public inSphere(center: Vector3D, radius: number): boolean {
            var dis: number = 0;
            for (var i: number = 0; i < this._plane.length; ++i) {
                dis = this._plane[i].distance(center);
                if (dis > radius) {
                    return false;
                }
            }
            return true;
        }


        /**
        * @private
        **/
        private _tempVector: Vector3D = new Vector3D();
        /**
        * @language zh_CN
        * 检测一个盒子是否在视椎体内
        * @param box 盒子
        * @returns 在视椎内返回ture
        * @version Egret 3.0
        * @platform Web,Native
        */
        public inBox(box: BoundBox): boolean {
            var dis: number = 0;
            var planeCount: number = this._plane.length;
            for (var i: number = 0; i < planeCount; ++i) {
                var incount: number = box.vexData.length / 3;
                var vexDataLength: number = box.vexData.length;
                for (var j: number = 0; j < vexDataLength; j += 3) {
                    this._tempVector.setTo(box.vexData[j], box.vexData[j + 1], box.vexData[j + 2]);
                    this._tempVector.copyFrom(box.transform.transformVector(this._tempVector));
                    dis = this._plane[i].distance(this._tempVector);
                    if (dis > 0) {
                        incount--;
                    }
                }

                if (incount <= 0) {
                    return false;
                }
            }

            return true;
        }
    }
}