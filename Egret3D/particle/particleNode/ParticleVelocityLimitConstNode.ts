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