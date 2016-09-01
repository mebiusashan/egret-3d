module egret3d {

    /**
    * @private
    */
    export class ParticleTime extends AnimationNode {
        /**
        * 所有单位粒子的生命周期
        */
        private attribute_time: GLSL.VarRegister;
        private _animationState: ParticleAnimationState;


        constructor() {
            super();
            //##FilterBegin## ##Particle##

            this.name = "ParticleSpeedNode";

            this.vertex_ShaderName[ShaderPhaseType.local_vertex] = this.vertex_ShaderName[ShaderPhaseType.local_vertex] || [];
            this.vertex_ShaderName[ShaderPhaseType.local_vertex].push("particle_bezier");
            this.vertex_ShaderName[ShaderPhaseType.local_vertex].push("particle_time_vs");

            this.fragment_ShaderName[ShaderPhaseType.start_fragment] = this.fragment_ShaderName[ShaderPhaseType.start_fragment] || [];
            this.fragment_ShaderName[ShaderPhaseType.start_fragment].push("particle_time_fs");

            this.fragment_ShaderName[ShaderPhaseType.diffuse_fragment] = this.fragment_ShaderName[ShaderPhaseType.diffuse_fragment] || [];
            this.fragment_ShaderName[ShaderPhaseType.diffuse_fragment].push("particle_diffuse_fragment");

            this.attribute_time = new GLSL.VarRegister();
            this.attribute_time.name = "attribute_time";
            this.attribute_time.size = 3;
            this.attributes.push(this.attribute_time);

            //##FilterEnd##
        }


        /**
        * @language zh_CN
        * 填充粒子生命周期数据
        * @param data ParticleDataNode 粒子数据来源
        * @version Egret 3.0
        * @platform Web,Native
        */
        public initNode(data: ParticleDataNode): void {

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
            var generator: ParticleLifeGenerator = this._animationState.emitter.generator;
            var vertices: number = geometry.vertexCount / count;
            var index: number = 0;
            var pt: Point;
            var planes: Point[] = generator.planes;
            for (var i: number = 0; i < count; ++i) {
                pt = planes[i];
                for (var j: number = 0; j < vertices; ++j) {
                    index = i * vertices + j;
                    index = index * geometry.vertexAttLength + this.attribute_time.offsetIndex;
                    geometry.vertexArray[index + 0] = pt.x;                        //出生时间
                    geometry.vertexArray[index + 1] = pt.y;                        //单次生命周期时间
                    geometry.vertexArray[index + 2] = i;                           //下标
                }
            }

            //对于每个面片而言，取摩的时间（周期）
            this._animationState.loopTime = generator.loopTime;
            //最后一个面片消失的时间
            this._animationState.circleTime = generator.circleTime;

            //##FilterEnd##
        }



        /**
        * @private
        * 构建结束后需要清理掉临时数据
        */
        public afterBuild(): void {
            //##FilterBegin## ##Particle##
            //##FilterEnd##
        }


        /**
       * @language zh_CN
       * 获取时间节点在geometry的顶点数据中偏移量
       * @return number
       * @version Egret 3.0
       * @platform Web,Native
       */
        public get offsetIndex(): number {
            return this.attribute_time.offsetIndex;
        }

    }
} 