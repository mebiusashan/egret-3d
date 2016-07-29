module egret3d {

    /**
    * @private
    * 粒子初始化的尺寸大小
    */
    export class ParticleScale extends AnimationNode {

        private _scaleValue: ConstRandomValueShape;
        private _animationState: ParticleAnimationState;
        private _node: ParticleDataScaleBirth;
        constructor() {
            super();

            this.name = "ParticleScale";
        }

        /**
        * @language zh_CN
        * 填充粒子尺寸缩放数据
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
    }
} 