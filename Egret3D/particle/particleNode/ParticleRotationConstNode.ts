module egret3d {

    /**
    * @private
    * 粒子的旋转角速度，当前实现为Z轴的速度（todo：模型粒子或许需要同时有x/y/z三个方向的角速度）
    */
    export class ParticleRotationConstNode extends AnimationNode {

        private _rotation: ConstRandomValueShape;
        private attribute_Rotation: GLSL.VarRegister
        constructor() {
            super();
            //##FilterBegin## ##Particle##
            //##FilterEnd##
        }



        /**
        * @language zh_CN
        * 填充粒子过程旋转数据
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