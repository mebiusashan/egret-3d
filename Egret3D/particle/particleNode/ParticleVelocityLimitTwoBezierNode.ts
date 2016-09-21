module egret3d {

    /**
    * @language zh_CN
    * @class egret3d.ParticleVelocityLimitTwoBezierNode
    * @classdesc
    * 粒子速度限制,贝塞尔曲线获得
    * @see egret3d.AnimationNode
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class ParticleVelocityLimitTwoBezierNode extends AnimationNode {
        //##FilterBegin## ##Particle##
        private _floatCompressData: Float32Array;
        private _floatCompressData2: Float32Array;
        private _node: ParticleDataMoveSpeed;
        private attribute_randomSeed: GLSL.VarRegister;
        private _animationState: ParticleAnimationState;
        //##FilterEnd##
        constructor() {
            super();
            //##FilterBegin## ##Particle##
            this.name = "ParticleVelocityLimitTwoBezierNode";

            this.vertex_ShaderName[ShaderPhaseType.global_vertex] = this.vertex_ShaderName[ShaderPhaseType.global_vertex] || [];
            this.vertex_ShaderName[ShaderPhaseType.global_vertex].push("particle_velocityLimitTwoBezier");

            this.attribute_randomSeed = new GLSL.VarRegister();
            this.attribute_randomSeed.name = "attribute_velocityLimitRandomSeed";
            this.attribute_randomSeed.size = 1;
            this.attributes.push(this.attribute_randomSeed);
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
            this._node = <ParticleDataMoveSpeed>data;
            this._floatCompressData = this._node.velocityLimit.bezier1.sampler();
            this._floatCompressData2 = this._node.velocityLimit.bezier2.sampler();
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
            for (var i: number = 0; i < count; ++i) {
                var random: number = Math.random();
                for (var j: number = 0; j < vertices; ++j) {
                    index = i * vertices + j;
                    index = index * geometry.vertexAttLength + this.attribute_randomSeed.offsetIndex;
                    geometry.vertexArray[index + 0] = random;
                }
            }
            //##FilterEnd##
        }



        /**
        * @private
        */
        public activeState(time: number, animTime: number, delay: number, animDelay: number, usage: PassUsage, geometry: SubGeometry, context3DProxy: Context3DProxy) {
            //##FilterBegin## ##Particle##
            context3DProxy.uniform1fv(usage["uniform_velocityLimit"].uniformIndex, this._floatCompressData);
            context3DProxy.uniform1fv(usage["uniform_velocityLimit2"].uniformIndex, this._floatCompressData2);
            //##FilterEnd##
        }


        /**
        * @private 
        */
        public dispose(): void {
            super.dispose();
            this._floatCompressData = null;
            this._floatCompressData2 = null;
            this._animationState = null;
            this._node = null;
        }

    }
} 