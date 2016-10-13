module egret3d {
                
    /**
    * @class egret3d.Mesh
    * @classdesc
    * 3d模型网格 生成渲染模型
    * 创建一个Mesh网格数据和材质数据是必需的，如果是动态模型就加上动画数据
    * 继承Object3D对象，场景中实体渲染对象
    *
    * @see egret3d.Object3D
    * @see egret3d.Geometry
    * @see egret3d.MaterialBase
    * @see egret3d.IAnimation
    * @see egret3d.SkeletonAnimation
    *
    * 示例:
    * @includeExample core/node/Mesh.ts
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class Mesh extends IRender implements IQuadNode{

        protected _aabbBox: QuadAABB;
        /**
        * @language zh_CN
        * 构建一个Mesh对象
        * @param geometry 模型数据
        * @param material 模型材质 默认为null 为null做自动创建一个TextureMaterial
        * @param animation 模型动画 默认为null 没有动画可以不指定
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor(geometry: Geometry, material: MaterialBase = null, animation: IAnimation = null) {
            super();

            this.type = "mesh";
            this.geometry = geometry;
            if (animation) {
                this.animation = animation;
            }
            else {
                if (geometry) {
                    if (this.geometry.vertexFormat & VertexFormat.VF_SKIN) {
                        this.animation = new SkeletonAnimation();
                    }
                }
            }

            this.material = material ? material : new TextureMaterial() ;
            this.addSubMaterial(0, this.material);
            
            this.bound = this.buildBoundBox();
        }

        /**
        * @private
        */
        public get aabb(): QuadAABB {
            return this._aabbBox;
        }

        /**
        * @private
        */
        public initAABB():void
		{
            this._aabbBox = new QuadAABB();
            this.calcGlobalQuadAABB();
        }


        private static AABB_TL_1: Vector3D = new Vector3D();
        private static AABB_TR_1: Vector3D = new Vector3D();
        private static AABB_BL_1: Vector3D = new Vector3D();
        private static AABB_BR_1: Vector3D = new Vector3D();
        private static AABB_TL_2: Vector3D = new Vector3D();
        private static AABB_TR_2: Vector3D = new Vector3D();
        private static AABB_BL_2: Vector3D = new Vector3D();
        private static AABB_BR_2: Vector3D = new Vector3D();
        /**
        * @private
        * 更新绑定盒的全局数据，适用于静态物体
        */
        public calcGlobalQuadAABB(): void {
            var box: BoundBox = <BoundBox>this.bound;

            var mtx: Matrix4_4 = this.modelMatrix;

            Mesh.AABB_BL_2.setTo(box.min.x, box.min.y, box.min.z);
            Mesh.AABB_BR_2.setTo(box.max.x, box.min.y, box.min.z);
            Mesh.AABB_TL_2.setTo(box.min.x, box.max.y, box.min.z);
            Mesh.AABB_TR_2.setTo(box.max.x, box.max.y, box.min.z);

            Mesh.AABB_BL_1.setTo(box.min.x, box.min.y, box.max.z);
            Mesh.AABB_BR_1.setTo(box.max.x, box.min.y, box.max.z);
            Mesh.AABB_TL_1.setTo(box.min.x, box.max.y, box.max.z);
            Mesh.AABB_TR_1.setTo(box.max.x, box.max.y, box.max.z);

            mtx.transformVector(Mesh.AABB_BL_2, Mesh.AABB_BL_2);
            mtx.transformVector(Mesh.AABB_BR_2, Mesh.AABB_BR_2);
            mtx.transformVector(Mesh.AABB_TL_2, Mesh.AABB_TL_2);
            mtx.transformVector(Mesh.AABB_TR_2, Mesh.AABB_TR_2);

            mtx.transformVector(Mesh.AABB_BL_1, Mesh.AABB_BL_1);
            mtx.transformVector(Mesh.AABB_BR_1, Mesh.AABB_BR_1);
            mtx.transformVector(Mesh.AABB_TL_1, Mesh.AABB_TL_1);
            mtx.transformVector(Mesh.AABB_TR_1, Mesh.AABB_TR_1);

            this._aabbBox.maxPosX = Math.max(Mesh.AABB_TL_2.x, Mesh.AABB_TR_2.x, Mesh.AABB_BL_2.x, Mesh.AABB_BR_2.x, Mesh.AABB_TL_1.x, Mesh.AABB_TR_1.x, Mesh.AABB_BL_1.x, Mesh.AABB_BR_1.x);
            this._aabbBox.maxPosY = Math.max(Mesh.AABB_TL_2.y, Mesh.AABB_TR_2.y, Mesh.AABB_BL_2.y, Mesh.AABB_BR_2.y, Mesh.AABB_TL_1.y, Mesh.AABB_TR_1.y, Mesh.AABB_BL_1.y, Mesh.AABB_BR_1.y);

            this._aabbBox.minPosX = Math.min(Mesh.AABB_TL_2.x, Mesh.AABB_TR_2.x, Mesh.AABB_BL_2.x, Mesh.AABB_BR_2.x, Mesh.AABB_TL_1.x, Mesh.AABB_TR_1.x, Mesh.AABB_BL_1.x, Mesh.AABB_BR_1.x);
            this._aabbBox.minPosY = Math.min(Mesh.AABB_TL_2.y, Mesh.AABB_TR_2.y, Mesh.AABB_BL_2.y, Mesh.AABB_BR_2.y, Mesh.AABB_TL_1.y, Mesh.AABB_TR_1.y, Mesh.AABB_BL_1.y, Mesh.AABB_BR_1.y);

        }

        /**
        * @private
        */
        public get isTriangle():boolean
        {
            return false;
        }

        protected onUpdateTransform() {
            this._aabbBox.setOffset(this._pos);
        }

        /**
        * @language zh_CN
        * 克隆一个模型
        * @returns 克隆后的模型
        * @version Egret 3.0
        * @platform Web,Native
        */
        public clone(): Mesh {
            var ani: IAnimation = null;
            if (this.animation) {
                ani = this.animation.clone();
            }
            var cloneMesh: Mesh = new Mesh(this.geometry, this.material, ani);
            cloneMesh.multiMaterial = this.multiMaterial;
            return cloneMesh;
        }

        /**
        * @language zh_CN
        * @private
        * 生成包围盒
        */
        protected buildBoundBox(): Bound {

            var bound: BoundBox = new BoundBox(this);
            if (this.geometry && this.geometry.vertexArray) {
                bound.min.copyFrom(new Vector3D(MathUtil.MAX_VALUE, MathUtil.MAX_VALUE, MathUtil.MAX_VALUE));
                bound.max.copyFrom(new Vector3D(-MathUtil.MAX_VALUE, -MathUtil.MAX_VALUE, -MathUtil.MAX_VALUE));
                for (var i: number = 0; i < this.geometry.vertexArray.length; i += this.geometry.vertexAttLength) {
                    if (bound.max.x < this.geometry.vertexArray[i]) {
                        bound.max.x = this.geometry.vertexArray[i];
                    }
                    if (bound.max.y < this.geometry.vertexArray[i + 1]) {
                        bound.max.y = this.geometry.vertexArray[i + 1];
                    }
                    if (bound.max.z < this.geometry.vertexArray[i + 2]) {
                        bound.max.z = this.geometry.vertexArray[i + 2];
                    }

                    if (bound.min.x > this.geometry.vertexArray[i]) {
                        bound.min.x = this.geometry.vertexArray[i];
                    }
                    if (bound.min.y > this.geometry.vertexArray[i + 1]) {
                        bound.min.y = this.geometry.vertexArray[i + 1];
                    }
                    if (bound.min.z > this.geometry.vertexArray[i + 2]) {
                        bound.min.z = this.geometry.vertexArray[i + 2];
                    }
                }
            }


            bound.fillBox(bound.min, bound.max);
            bound.createChild();

            this.bound = bound;
            this.initAABB();
            return bound;
        }

       
    }
} 