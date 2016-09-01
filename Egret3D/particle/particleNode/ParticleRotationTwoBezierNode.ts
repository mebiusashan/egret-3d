module egret3d {

    /**
    * @language zh_CN
    * @class egret3d.ParticleRotationTwoBezierNode
    * @classdesc
    * 粒子z轴旋转角速度（双bezier曲线）
    * @see egret3d.AnimationNode
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class ParticleRotationTwoBezierNode extends AnimationNode {

        private _floatCompressData: Float32Array;
        private _floatCompressData2: Float32Array;
        private _node: ParticleDataRotationSpeed;
        private attribute_randomSeed: GLSL.VarRegister;
        private _animationState: ParticleAnimationState;
        constructor() {
            super();
            //##FilterBegin## ##Particle##
            this.name = "ParticleRotationTwoBezierNode";


            this.attribute_randomSeed = new GLSL.VarRegister();
            this.attribute_randomSeed.name = "attribute_rotationRandomSeed";
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
            this._node = <ParticleDataRotationSpeed>data;
            this._floatCompressData = this._node.bezier1.sampler();
            this._floatCompressData2 = this._node.bezier2.sampler();


            this.vertex_ShaderName[ShaderPhaseType.global_vertex] = this.vertex_ShaderName[ShaderPhaseType.global_vertex] || [];
            this.vertex_ShaderName[ShaderPhaseType.global_vertex].push("particle_rotationTwoBezier");
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
            context3DProxy.uniform1fv(usage["uniform_rotationBezier"].uniformIndex, this._floatCompressData);
            context3DProxy.uniform1fv(usage["uniform_rotationBezier2"].uniformIndex, this._floatCompressData2);
            //##FilterEnd##
        }



    }
} 