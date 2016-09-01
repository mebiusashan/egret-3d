module egret3d {

    /**
    * @private
    */
    export class ParticleSizeGlobalNode extends AnimationNode {

        private _floatCompressData: Float32Array;
        private _node: ParticleDataScaleBezier;
        constructor() {
            super();
            //##FilterBegin## ##Particle##
            this.name = "ParticleSizeGlobalNode";

            this.vertex_ShaderName[ShaderPhaseType.local_vertex] = this.vertex_ShaderName[ShaderPhaseType.local_vertex] || [];
            this.vertex_ShaderName[ShaderPhaseType.local_vertex].push("particle_size_vs");
            //|sa,sc ea,ec|  每个段的形式
            //##FilterEnd##
        }

        /**
        * @language zh_CN
        * 填充粒子初始旋转数据
        * @param data ParticleDataNode 粒子数据来源
        * @version Egret 3.0
        * @platform Web,Native
        */
        public initNode(data: ParticleDataNode): void {
            //##FilterBegin## ##Particle##
            this._node = <ParticleDataScaleBezier>data;
            this._floatCompressData = this._node.data.sampler();
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

        }

        /**
        * @private
        */
        public activeState(time: number, animTime: number, delay: number, animDelay: number, usage: PassUsage, geometry: SubGeometry, context3DProxy: Context3DProxy) {
            //##FilterBegin## ##Particle##
            context3DProxy.uniform1fv(usage["uniform_bezierSize"].uniformIndex, this._floatCompressData);
            //##FilterEnd##
        }


    }
}  