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
        private _animationState: ParticleAnimationState;
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
            this._animationState = <ParticleAnimationState>this.state;

            var colorOffsetIndex: number = this._animationState.emitter.data.geometry.hasNormalData ? 6 : 3;

            var vertices: number = geometry.vertexCount / count;
            var index: number = 0;

            var timeOffsetIndex: number = this._animationState.emitter.timeNode.offsetIndex;
            var particleIndex: number = 0;

            var clr1: Color = new Color();
            var clr2: Color = new Color();

            var progress: number = 0;
            var duration: number = this._animationState.emitter.data.life.duration;

            for (var i: number = 0; i < count; ++i) {
                particleIndex = i * vertices;
                this.timeIndex = particleIndex * geometry.vertexAttLength + timeOffsetIndex;
                this.bornTime = geometry.vertexArray[this.timeIndex + 0];          //出生时间
                //this.life = geometry.verticesData[this.timeIndex + 1];              //单次生命周期时间
                //this.id = geometry.verticesData[this.timeIndex + 2];              //下标(i)
                progress = this.bornTime / duration;
                progress = progress - Math.floor(progress);                         //取小数部分
                this.lerpBirthColor(clr1, clr2, progress);

                clr1.a /= 0xff;
                clr1.r /= 0xff;
                clr1.g /= 0xff;
                clr1.b /= 0xff;

                for (var j: number = 0; j < vertices; ++j) {
                    index = i * vertices + j;
                    index = index * geometry.vertexAttLength + colorOffsetIndex;

                    geometry.vertexArray[index + 0] = clr1.r;
                    geometry.vertexArray[index + 1] = clr1.g;
                    geometry.vertexArray[index + 2] = clr1.b;
                    geometry.vertexArray[index + 3] = clr1.a;
                }
            }

            //##FilterEnd##
        }

        //##FilterBegin## ##Particle##

        /**
        * @private
        * 根据每种出生颜色数据，相应获得一个颜色
        */
        private lerpBirthColor(c1: Color, c2: Color, t: number): void {
            if (this._node.colorType == ParticleBirthColorType.Const) {
                c1.copyFrom(this._node.colorConst1);
            } else if (this._node.colorType == ParticleBirthColorType.RandomConst) {
                c1.randomColor(this._node.colorConst1, this._node.colorConst2, true);
            } else if (this._node.colorType == ParticleBirthColorType.OneGradients) {
                this._node.colorGradients1.lerpColor(t, c1);
            } else if (this._node.colorType == ParticleBirthColorType.TwoGradients) {
                this._node.colorGradients1.lerpColor(t, c1);
                this._node.colorGradients2.lerpColor(t, c2);
                c1.lerp(c1, c2, 0.5);
            }

        }

        //##FilterEnd##


        /**
        * @private 
        */
        public dispose(): void {
            super.dispose();
            this._node = null;
        }


    }
} 