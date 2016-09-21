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
            var node: ParticleDataScaleBirth = this._node = <ParticleDataScaleBirth>data;

            this._scaleValue = new ConstRandomValueShape();
            this._scaleValue.max = node.max;
            this._scaleValue.min = node.min;
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
            var scaleArray: number[] = this._scaleValue.calculate(count);
            var vertices: number = geometry.vertexCount / count;
            var index: number = 0;

            var progress: number = 0;
            var duration: number = this._animationState.emitter.data.life.duration;
            var timeOffsetIndex: number = this._animationState.emitter.timeNode.offsetIndex;
            var particleIndex: number = 0;
            var timeIndex: number;
            var bornTime: number;


            var scale: number = 0;
            for (var i: number = 0; i < count; ++i) {
                //
                if (this._node.type == ParticleValueType.OneBezier || this._node.type == ParticleValueType.TwoBezier) {
                    timeIndex = particleIndex * geometry.vertexAttLength + timeOffsetIndex;
                    bornTime = geometry.vertexArray[timeIndex + 0];          //出生时间
                    progress = bornTime / duration;
                    progress = progress - Math.floor(progress);               //取小数部分
                    scale = this._node.bezier1.calc(progress);
                    if (this._node.type == ParticleValueType.TwoBezier) {
                        var random: number = Math.random();
                        scale *= random;
                        scale += this._node.bezier2.calc(progress) * (1 - random);
                    }
                } else {
                    scale = scaleArray[i];
                }
                for (var j: number = 0; j < vertices; ++j) {
                    index = i * vertices + j;
                    index = index * geometry.vertexAttLength;
                    geometry.vertexArray[index + 0] *= scale;
                    geometry.vertexArray[index + 1] *= scale;
                    geometry.vertexArray[index + 2] *= scale;

                }
            }


            //##FilterEnd##
        }

        /**
        * @private
        * 构建结束后需要清理掉临时数据
        */
        public afterBuild(): void {
            //##FilterBegin## ##Particle##
            this._scaleValue.dispose();
            this._scaleValue = null;
            //##FilterEnd##
        }



        /**
        * @private 
        */
        public dispose(): void {
            super.dispose();
            this._animationState = null;
            this._node = null;
            this._scaleValue = null;
        }

    }
} 