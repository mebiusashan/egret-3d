module egret3d {

    /**
    * @language zh_CN
    * @class egret3d.ParticleVelocityOverConstNode
    * @classdesc
    * 粒子速度节点叠加(常量的影响方式)
    * @see egret3d.AnimationNode
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class ParticleVelocityOverConstNode extends AnimationNode {
        private _overValue: Vec3ConstRandomValueShape;
        private attribute_velocityOver: GLSL.VarRegister;
        private particleAnimationState: ParticleAnimationState;
        constructor() {
            super();
            //##FilterBegin## ##Particle##
            this.name = "ParticleVelocityOverConstNode";

            this.vertex_ShaderName[ShaderPhaseType.global_vertex] = this.vertex_ShaderName[ShaderPhaseType.global_vertex] || [];
            this.vertex_ShaderName[ShaderPhaseType.global_vertex].push("particle_velocityOverConst");

            this.attribute_velocityOver = new GLSL.VarRegister();
            this.attribute_velocityOver.name = "attribute_velocityOverConst";
            this.attribute_velocityOver.size = 3;
            this.attributes.push(this.attribute_velocityOver);
            //##FilterEnd##

        }

        /**
        * @language zh_CN
        * 填充粒子移动速度数据
        * @param data ParticleDataNode 粒子数据来源
        * @version Egret 3.0
        * @platform Web,Native
        */
        public initNode(data: ParticleDataNode): void {
            //##FilterBegin## ##Particle##
            var node: ParticleDataMoveSpeed = <ParticleDataMoveSpeed>data;
            this._overValue = new Vec3ConstRandomValueShape();
            this._overValue.maxX = node.velocityOver.max.x;
            this._overValue.maxY = node.velocityOver.max.y;
            this._overValue.maxZ = node.velocityOver.max.z;

            this._overValue.minX = node.velocityOver.min.x;
            this._overValue.minY = node.velocityOver.min.y;
            this._overValue.minZ = node.velocityOver.min.z;

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
            this.particleAnimationState = <ParticleAnimationState>this.state;

            var vertices: number = geometry.vertexCount / count;
            var index: number = 0;

            var data: Array<Vector3D> = this._overValue.calculate(count);
            for (var i: number = 0; i < count; ++i) {
                var over: Vector3D = data[i];

                for (var j: number = 0; j < vertices; ++j) {
                    index = i * vertices + j;
                    index = index * geometry.vertexAttLength + this.attribute_velocityOver.offsetIndex;

                    geometry.vertexArray[index + 0] = over.x;
                    geometry.vertexArray[index + 1] = over.y;
                    geometry.vertexArray[index + 2] = over.z;
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
            this._overValue.dispose();
            this._overValue = null;
            //##FilterEnd##
        }



    }
} 