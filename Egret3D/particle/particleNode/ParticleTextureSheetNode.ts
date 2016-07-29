﻿module egret3d {

    /**
    * @language zh_CN
    * @class egret3d.ParticleTextureSheetNode
    * @classdesc
    * uv序列帧
    * @see egret3d.AnimationNode
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class ParticleTextureSheetNode extends AnimationNode {

        /**
        * @private
        * 最大支持的颜色变化数量
        */
        private _sheetData: ParticleDataTextureSheet;
        private _animationState: ParticleAnimationState;
        private _sheetFloatData: Float32Array = new Float32Array(5);
        private attribute_textureSheetData: GLSL.VarRegister;
        //const frame
        private _floatCompressData1: Float32Array;
        private _floatCompressData2: Float32Array;
        constructor() {
            super();
            //##FilterBegin## ##Particle##
            //##FilterEnd##

        }

        /**
        * @language zh_CN
        * 填充UV滚动
        * @param data ParticleDataNode 粒子数据来源
        * @version Egret 3.0
        * @platform Web,Native
        */
        public initNode(data: ParticleDataNode, args: any): void {
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