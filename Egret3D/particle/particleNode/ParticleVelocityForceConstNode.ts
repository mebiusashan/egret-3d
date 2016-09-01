module egret3d {

    /**
    * @language zh_CN
    * @class egret3d.ParticleVelocityForceConstNode(常量部分)
    * @classdesc
    * 粒子加速度效果节点
    * @see egret3d.AnimationNode
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class ParticleVelocityForceConstNode extends AnimationNode {

        /**
        * @private
        */
        private _node: ParticleDataMoveSpeed;
        private _forceValue: Vec3ConstRandomValueShape;
        private attribute_accelerationSpeed: GLSL.VarRegister;
        constructor() {
            super();
            //##FilterBegin## ##Particle##
            this.name = "ParticleVelocityForceConstNode";
            this.vertex_ShaderName[ShaderPhaseType.global_vertex] = this.vertex_ShaderName[ShaderPhaseType.global_vertex] || [];
            this.vertex_ShaderName[ShaderPhaseType.global_vertex].push("particle_velocityForceConst");

            this.attribute_accelerationSpeed = new GLSL.VarRegister();
            this.attribute_accelerationSpeed.name = "attribute_velocityForceConst";
            this.attribute_accelerationSpeed.size = 3;
            this.attributes.push(this.attribute_accelerationSpeed);
            //##FilterEnd##
        }


        /**
       * @language zh_CN
       * 填充粒子加速度数据
       * @param data ParticleDataNode 粒子数据来源
       * @version Egret 3.0
       * @platform Web,Native
       */
        public initNode(data: ParticleDataNode): void {
            //##FilterBegin## ##Particle##
            this._node = <ParticleDataMoveSpeed>data;
            var node: VelocityForceLifeTimeData = this._node.velocityForce;
            this._forceValue = new Vec3ConstRandomValueShape();
            this._forceValue.maxX = node.max.x;
            this._forceValue.maxY = node.max.y;
            this._forceValue.maxZ = node.max.z;

            this._forceValue.minX = node.min.x;
            this._forceValue.minY = node.min.y;
            this._forceValue.minZ = node.min.z;
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
            var vertices: number = geometry.vertexCount / count;
            var index: number = 0;

            var data: any[] = this._forceValue.calculate(count);
            for (var i: number = 0; i < count; ++i) {
                var accSpeed: Vector3D = data[i];
                for (var j: number = 0; j < vertices; ++j) {
                    index = i * vertices + j;
                    index = index * geometry.vertexAttLength + this.attribute_accelerationSpeed.offsetIndex;

                    geometry.vertexArray[index + 0] = accSpeed.x;
                    geometry.vertexArray[index + 1] = accSpeed.y;
                    geometry.vertexArray[index + 2] = accSpeed.z;
                }
            }

            //##FilterEnd##
        }


        /**
        * @private
        * 构建结束后需要清理掉临时数据
        */
        public afterBuild(): void {
            //##FilterBegin## ##Particle##
            this._forceValue.dispose();
            this._forceValue = null;
            //##FilterEnd##
        }


    }
} 