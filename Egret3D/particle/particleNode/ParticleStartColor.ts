module egret3d {

    /**
    * @language zh_CN
    * @class egret3d.ParticleStartColor
    * @classdesc
    * 粒子起始颜色，用顶点色实现
    * @see egret3d.AnimationNode
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class ParticleStartColor extends AnimationNode {

        /**
        * @private
        */
        private _node: ParticleDataProperty;
        private particleAnimationState: ParticleAnimationState;
        constructor() {
            super();
            this.name = "ParticleStartColor";
        }


        /**
        * @language zh_CN
        * 填充粒子发射器起始颜色
        * @param data ParticleDataNode 粒子数据来源
        * @version Egret 3.0
        * @platform Web,Native
        */
        public initNode(data: ParticleDataNode): void {
            this._node = <ParticleDataProperty>data;
        }

        private bornTime: number = 0;
        private life: number = 0;
        private id: number = 0;
        private timeIndex: number = 0;

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

        //##FilterBegin## ##Particle##
        //##FilterEnd##

    }
} 