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



        /**
        * @private
        */
        public activeState(time: number, animTime: number, delay: number, animDelay: number, usage: PassUsage, geometry: SubGeometry, context3DProxy: Context3DProxy) {
            //##FilterBegin## ##Particle##
            //##FilterEnd##
        }



    }
} 