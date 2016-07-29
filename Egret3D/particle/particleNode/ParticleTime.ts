module egret3d {

    /**
    * @private
    */
    export class ParticleTime extends AnimationNode {

        private _node: ParticleDataLife;
        /**
        * 所有单位粒子的生命周期
        */
        private _lifeValue: ValueShape;
        private attribute_time: GLSL.VarRegister;
        private _animationState: ParticleAnimationState;



        constructor() {
            super();
            //##FilterBegin## ##Particle##
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
            //##FilterBegin## ##Particle##
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
            //##FilterEnd##
        }

        /**
        * private
        * 出生时间创建(const)
        */
        private createBornTimeConst(count: number, emission: ParticleDataEmission): Array<number> {
            var bornTimeArray: Array<number> = [];
            //##FilterBegin## ##Particle##
            //##FilterEnd##
            return bornTimeArray;
        }

        /**
         * private
         * 出生时间创建(bezier);
         */
        private createBornTimeBezier(count: number, emission: ParticleDataEmission): Array<number> {
            var bornTimeArray: Array<number> = [];
            //##FilterBegin## ##Particle##
            //##FilterEnd##
            return bornTimeArray;
        }


        /**
        * private
        * 插入粒子爆炸生成
        */
        private burstParticle(bursts: Array<Point>, bornTimeArray: Array<number>, count: number): Array<number> {
            //##FilterBegin## ##Particle##
            //##FilterEnd##
            return bornTimeArray;
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