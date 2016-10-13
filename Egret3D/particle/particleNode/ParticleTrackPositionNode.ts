module egret3d {

    /**
    * @private
    * 追踪某个固定位置
    */
    export class ParticleTrackPositionNode extends AnimationNode {

        private _trackPosition: CubeVector3DValueShape;
        private _toCoords: Vector3D[];

        private attribute_trackPosition: GLSL.VarRegister;
        private _animationState: ParticleAnimationState;
        private _count: number;
        private _verticesDataDirty: boolean = true;
        constructor() {
            super();
            //##FilterBegin## ##Particle##
            this.name = "ParticleTrackPositionNode";

            this.vertex_ShaderName[ShaderPhaseType.local_vertex] = this.vertex_ShaderName[ShaderPhaseType.local_vertex] || [];
            this.vertex_ShaderName[ShaderPhaseType.local_vertex].push("particle_trackPosition");

            this.attribute_trackPosition = new GLSL.VarRegister();
            this.attribute_trackPosition.name = "attribute_trackPosition";
            this.attribute_trackPosition.size = 3;
            this.attributes.push(this.attribute_trackPosition);
            //##FilterEnd##
        }

        public get endCoords(): Vector3D[] {
            return this._toCoords;
        }

        /**
        * @language zh_CN
        * 将粒子的出生位置设置为原结束为止，然后重新设置结束位置
        * @param fromCoords 粒子出生位置列表
        * @param endCoords 粒子目标位置列表
        * @version Egret 3.0
        * @platform Web,Native
        */
        public trackPosition(fromCoords:Vector3D[], endCoords: Vector3D[]): void {
            //##FilterBegin## ##Particle##
            if (fromCoords.length != this._count || endCoords.length != this._count) {
                throw new Error("count don't match!");
            }

            var index: number;
            var positionIndex: number = this._animationState.emitter.positionNode.offsetIndex;
            var geometry: Geometry = this._animationState.emitter.geometry;
            var vertices: number = geometry.vertexCount / this._count;
            for (var i: number = 0; i < this._count; ++i) {
                var fromPos: Vector3D = fromCoords[i];
                var toPos: Vector3D = endCoords[i];
                //创建位置
                for (var j: number = 0; j < vertices; ++j) {
                    //from
                    index = i * vertices + j;
                    index = index * geometry.vertexAttLength + positionIndex;
                    geometry.vertexArray[index + 0] = fromPos.x;
                    geometry.vertexArray[index + 1] = fromPos.y;
                    geometry.vertexArray[index + 2] = fromPos.z;

                    //end
                    index = i * vertices + j;
                    index = index * geometry.vertexAttLength + this.attribute_trackPosition.offsetIndex;
                    geometry.vertexArray[index + 0] = toPos.x;
                    geometry.vertexArray[index + 1] = toPos.y;
                    geometry.vertexArray[index + 2] = toPos.z;
                }
            }

            this._toCoords = endCoords;
          
            this._verticesDataDirty = true;
            //##FilterEnd##
        }


        /**
        * @private
        */
        public activeState(time: number, animTime: number, delay: number, animDelay: number, usage: PassUsage, geometry: SubGeometry, context3DProxy: Context3DProxy) {
            //##FilterBegin## ##Particle##
            if (this._verticesDataDirty) {
                geometry.geometry.upload(context3DProxy);
                this._verticesDataDirty = false;
            }
            //##FilterEnd##
        }


        /**
        * @language zh_CN
        * 填充粒子过程旋转数据
        * @param data ParticleDataNode 粒子数据来源
        * @version Egret 3.0
        * @platform Web,Native
        */
        public initNode(data: ParticleDataNode): void {
            //##FilterBegin## ##Particle##
            //var node: ParticleDataRotationSpeed = <ParticleDataRotationSpeed>data;
            this._trackPosition = new CubeVector3DValueShape();
            this._trackPosition.depth = 200;
            this._trackPosition.width = 300;
            this._trackPosition.height = 100;
            //##FilterEnd##
        }

        /**
        * @language zh_CN
        * 填充顶点数据
        * @param geometry 网格数据
        * @param count 粒子数量
        * @version Egret 3.0
        * @platform Web,Native
        */
        public build(geometry: Geometry, count: number) {

            //##FilterBegin## ##Particle##
            this._animationState = <ParticleAnimationState>this.state;
            this._count = count;
            //##FilterEnd##

        }

        /**
        * @private
        * 构建结束后需要清理掉临时数据
        */
        public afterBuild(): void {
            //##FilterBegin## ##Particle##
            this._trackPosition.dispose();
            this._trackPosition = null;
            //##FilterEnd##
        }

        /**
        * @private 
        */
        public dispose(): void {
            super.dispose();
            this._trackPosition = null;
        }


    }
} 