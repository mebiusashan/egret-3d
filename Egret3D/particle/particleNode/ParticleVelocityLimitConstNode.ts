module egret3d {

    /**
    * @language zh_CN
    * @class egret3d.ParticleVelocityLimitConstNode
    * @classdesc
    * 粒子速度节点限制(常量的影响方式)
    * @see egret3d.AnimationNode
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class ParticleVelocityLimitConstNode extends AnimationNode {

        private attribute_velocityLimit: GLSL.VarRegister;
        private _animationState: ParticleAnimationState;
        private _limitValue: ConstRandomValueShape;

        constructor() {
            super();
            //##FilterBegin## ##Particle##
            this.name = "ParticleVelocityLimitConstNode";

            this.vertex_ShaderName[ShaderPhaseType.global_vertex] = this.vertex_ShaderName[ShaderPhaseType.global_vertex] || [];
            this.vertex_ShaderName[ShaderPhaseType.global_vertex].push("particle_velocityLimitConst");

            this.attribute_velocityLimit = new GLSL.VarRegister();
            this.attribute_velocityLimit.name = "attribute_velocityLimit";
            this.attribute_velocityLimit.size = 1;
            this.attributes.push(this.attribute_velocityLimit);

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
            this._limitValue = new ConstRandomValueShape();
            this._limitValue.max = node.velocityLimit.max;
            this._limitValue.min = node.velocityLimit.min;
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

            var vertices: number = geometry.vertexCount / count;
            var index: number = 0;

            var data: Array<number> = this._limitValue.calculate(count);
            for (var i: number = 0; i < count; ++i) {
                var limit: number = data[i];

                for (var j: number = 0; j < vertices; ++j) {
                    index = i * vertices + j;
                    index = index * geometry.vertexAttLength + this.attribute_velocityLimit.offsetIndex;
                    geometry.vertexArray[index + 0] = limit;
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
            this._limitValue.dispose();
            this._limitValue = null;
            //##FilterEnd##
        }


        /**
        * @private 
        */
        public dispose(): void {
            super.dispose();
            this._animationState = null;
            this._limitValue = null;
        }

    }
} 