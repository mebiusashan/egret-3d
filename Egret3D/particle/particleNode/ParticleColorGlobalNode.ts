module egret3d {

    /**
    * @language zh_CN
    * @class egret3d.ParticleColorGlobalNode
    * @classdesc
    * 颜色渐变
    * @see egret3d.AnimationNode
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class ParticleColorGlobalNode extends AnimationNode {

        /**
        * @private
        * 最大支持的颜色变化数量
        */
        private static MaxColor: number = 20;
        private _colorSegment: Float32Array = new Float32Array(ParticleColorGlobalNode.MaxColor * 2);
        constructor() {
            super();
            //##FilterBegin## ##Particle##
            //##FilterEnd##

        }

        /**
        * @language zh_CN
        * 填充粒子颜色变化数据
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

        }

        /**
        * @private
        */
        public activeState(time: number, animTime: number, delay: number, animDelay: number, usage: PassUsage, geometry: SubGeometry, context3DProxy: Context3DProxy) {
            //##FilterBegin## ##Particle##
            //##FilterEnd##
        }

        /**
        * 压缩一个颜色值到一个float中
        */
        private getGpuColor(r: number, g: number, b: number): number {
            var value: number;
            //##FilterBegin## ##Particle##
            //##FilterEnd##
            return value;
        }

        /**
        * @private 
        * 将一个颜色通道规范到0-255之间
        */
        private normalizeChannel(value: number): number {
            //##FilterBegin## ##Particle##
            //##FilterEnd##
            return value;
        }

        /**
        * @private 
        * 将时间规范到0和0.9999之间
        */
        private normalizeTime(value: number): number {
            //##FilterBegin## ##Particle##
            //##FilterEnd##
            return value;
        }

        /**
        * @private 
        * 合并alpha和time到一个float中
        */
        private getTimeAndAlpha(time: number, a: number): number {
            //##FilterBegin## ##Particle##
            //##FilterEnd##
            return a + time;
        }



    }
} 