module egret3d {

    /**
    * @language zh_CN
    * @class egret3d.ParticleVelocityOverTwoBezierNode
    * @classdesc
    * 粒子速度叠加节点,双贝塞尔曲线获得
    * @see egret3d.AnimationNode
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class ParticleVelocityOverTwoBezierNode extends AnimationNode {
        private _node: ParticleDataMoveSpeed;
        private attribute_randomSeed: GLSL.VarRegister;
        private _floatCompressDataX1: Float32Array;
        private _floatCompressDataY1: Float32Array;
        private _floatCompressDataZ1: Float32Array;
        private _floatCompressDataX2: Float32Array;
        private _floatCompressDataY2: Float32Array;
        private _floatCompressDataZ2: Float32Array;

        private _animationState: ParticleAnimationState;
        constructor() {
            super();
            //##FilterBegin## ##Particle##
            this.name = "ParticleVelocityOverTwoBezierNode";



            this.attribute_randomSeed = new GLSL.VarRegister();
            this.attribute_randomSeed.name = "attribute_velocityOverRandomSeed";
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
            this._floatCompressDataX1 = this._node.velocityOver.xBezier1.trySampler();
            this._floatCompressDataY1 = this._node.velocityOver.yBezier1.trySampler();
            this._floatCompressDataZ1 = this._node.velocityOver.zBezier1.trySampler();

            this._floatCompressDataX2 = this._node.velocityOver.xBezier2.trySampler();
            this._floatCompressDataY2 = this._node.velocityOver.yBezier2.trySampler();
            this._floatCompressDataZ2 = this._node.velocityOver.zBezier2.trySampler();


            this.vertex_ShaderName[ShaderPhaseType.global_vertex] = this.vertex_ShaderName[ShaderPhaseType.global_vertex] || [];
            this.vertex_ShaderName[ShaderPhaseType.global_vertex].push("particle_velocityOverTwoBezier");

            if (this._floatCompressDataX1) {
                this.vertex_ShaderName[ShaderPhaseType.global_vertex].push("particle_velocityOverTwoBezierX1");
            }
            if (this._floatCompressDataX2) {
                this.vertex_ShaderName[ShaderPhaseType.global_vertex].push("particle_velocityOverTwoBezierX2");
            }
            if (this._floatCompressDataY1) {
                this.vertex_ShaderName[ShaderPhaseType.global_vertex].push("particle_velocityOverTwoBezierY1");
            }
            if (this._floatCompressDataY2) {
                this.vertex_ShaderName[ShaderPhaseType.global_vertex].push("particle_velocityOverTwoBezierY2");
            }
            if (this._floatCompressDataZ1) {
                this.vertex_ShaderName[ShaderPhaseType.global_vertex].push("particle_velocityOverTwoBezierZ1");
            }
            if (this._floatCompressDataZ2) {
                this.vertex_ShaderName[ShaderPhaseType.global_vertex].push("particle_velocityOverTwoBezierZ2");
            }
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
            if (this._floatCompressDataX1) {
                context3DProxy.uniform1fv(usage["uniform_velocityOverX1"].uniformIndex, this._floatCompressDataX1);
            }
            if (this._floatCompressDataX2) {
                context3DProxy.uniform1fv(usage["uniform_velocityOverX2"].uniformIndex, this._floatCompressDataX2);
            }
            if (this._floatCompressDataY1) {
                context3DProxy.uniform1fv(usage["uniform_velocityOverY1"].uniformIndex, this._floatCompressDataY1);
            }
            if (this._floatCompressDataY2) {
                context3DProxy.uniform1fv(usage["uniform_velocityOverY2"].uniformIndex, this._floatCompressDataY2);
            }
            if (this._floatCompressDataZ1) {
                context3DProxy.uniform1fv(usage["uniform_velocityOverZ1"].uniformIndex, this._floatCompressDataZ1);
            }
            if (this._floatCompressDataZ2) {
                context3DProxy.uniform1fv(usage["uniform_velocityOverZ2"].uniformIndex, this._floatCompressDataZ2);
            }
            //##FilterEnd##
        }


        /**
        * @private 
        */
        public dispose(): void {
            super.dispose();
            this._floatCompressDataX1 = this._floatCompressDataY1 = this._floatCompressDataZ1 = null;
            this._floatCompressDataX2 = this._floatCompressDataY2 = this._floatCompressDataZ2 = null;

            this._node = null;
            this._animationState = null;
        }



    }
} 