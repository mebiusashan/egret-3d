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
        protected _lightGroup: LightGroup; 
        /**
        * @language zh_CN
        * 构建一个Mesh对象
        * @param geometry 模型数据
        * @param material 模型材质
        * @param animation 模型动画
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor(geometry: Geometry, material: MaterialBase, animation: IAnimation = null) {
            super();

            this.type = "mesh";

            this.geometry = geometry;
            if (animation) {
                this.animation = animation;
            }
            else {
                if (geometry) {
                    if (this.geometry.vertexFormat & VertexFormat.VF_SKIN) {
                        this.animation = new SkeletonAnimation(this.geometry.skeleton);
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
        public setMaterialByID() {
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
            var box: BoundBox = <BoundBox>this.bound;

            this._aabbBox.maxPosX = box.max.x;
            this._aabbBox.maxPosY = box.max.z;

            this._aabbBox.minPosX = box.min.x;
            this._aabbBox.minPosY = box.min.z;
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
         * 设置材质 lightGroup 。
         * 设置材质球接受的灯光组。
         * @param lightGroup LightGroup
         * @version Egret 3.0
         * @platform Web,Native
         */
        public set lightGroup(lightGroup: LightGroup) {
            this._lightGroup = lightGroup; 
            for (var id in this.multiMaterial ){
                this.multiMaterial[id].lightGroup = this._lightGroup; 
            }
        }

        /**
        * @language zh_CN
        * 增加一个材质
        * @param id 材质id
        * @param material 模型材质
        * @version Egret 3.0
        * @platform Web,Native
        */
        public addSubMaterial(id: number, material: MaterialBase) {
            if (!this.multiMaterial[id]) {
                this._materialCount++;
            }
            this.multiMaterial[id] = material;
            material.lightGroup = this._lightGroup; 
        }
                
        /**
        * @language zh_CN
        * 删除一个材质
        * @param id 材质id
        * @version Egret 3.0
        * @platform Web,Native
        */
        public removeSubMaterial(id: number) {
            if (this.multiMaterial[id]) {
                delete this.multiMaterial[id];
                this._materialCount--;
            }
        }
                        
        /**
        * @language zh_CN
        * 用ID得到一个材质
        * @param id 材质id
        * @version Egret 3.0
        * @platform Web,Native
        */
        public getMaterial(id: number): MaterialBase {
            return this.multiMaterial[id];
        }
                        
        /**
        * @language zh_CN
        * 得到所有材质的个数
        * @returns number
        * @version Egret 3.0
        * @platform Web,Native
        */
        public materialCount(): number {
            return this._materialCount;
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
        * 当前对象数据更新，只有在视锥内的对象才会执行此更新
        * @param camera 当前渲染的摄相机
        * @param time 当前时间
        * @param delay 每帧时间间隔
        * @version Egret 3.0
        * @platform Web,Native
        */
        public update(time: number, delay: number, camera: Camera3D) {
            super.update(time, delay, camera);

            if (this.isDisable)
                return;
            if (this.animation) {
                this.animation.update(time, delay, this.geometry);
            }
            if (this.geometry.subGeometrys.length <= 0) {
                this.geometry.buildDefaultSubGeometry();
            }
        }

        /**
        * @language zh_CN
        * @private
        * 生成包围盒
        */
        protected buildBoundBox(): Bound {
            if (!this.geometry) {
                return null;
            }
            var bound: BoundBox = new BoundBox(this);
            bound.min.copyFrom(new Vector3D(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE));
            bound.max.copyFrom(new Vector3D(-Number.MAX_VALUE, -Number.MAX_VALUE, -Number.MAX_VALUE));
            for (var i: number = 0; i < this.geometry.verticesData.length; i += this.geometry.vertexAttLength) {
                if (bound.max.x < this.geometry.verticesData[i]) {
                    bound.max.x = this.geometry.verticesData[i];
                }
                if (bound.max.y < this.geometry.verticesData[i + 1]) {
                    bound.max.y = this.geometry.verticesData[i + 1];
                }
                if (bound.max.z < this.geometry.verticesData[i + 2]) {
                    bound.max.z = this.geometry.verticesData[i + 2];
                }

                if (bound.min.x > this.geometry.verticesData[i]) {
                    bound.min.x = this.geometry.verticesData[i];
                }
                if (bound.min.y > this.geometry.verticesData[i + 1]) {   
                    bound.min.y = this.geometry.verticesData[i + 1];
                }
                if (bound.min.z > this.geometry.verticesData[i + 2]) {
                    bound.min.z = this.geometry.verticesData[i + 2];
                }
            }

            bound.fillBox(bound.min, bound.max);
            bound.createChild();

            this.bound = bound;
            this.initAABB();
            return bound;
        }

        protected _i: number; 
        protected _subGeometry: SubGeometry;
        protected _matID: number; 
        
        ///**
        //* @private
        //*/
        //public renderDiffusePass(time: number, delay: number, context3DProxy: Context3DProxy, camera3D: Camera3D) {
            

        //}


       
    }
} 