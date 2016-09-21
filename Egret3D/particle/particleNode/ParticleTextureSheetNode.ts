module egret3d {

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
            this.name = "ParticleTextureSheetNode";
            //

            this.attribute_textureSheetData = new GLSL.VarRegister();
            this.attribute_textureSheetData.name = "attribute_textureSheetData";
            this.attribute_textureSheetData.size = 3;
            this.attributes.push(this.attribute_textureSheetData);

            this.vertex_ShaderName[ShaderPhaseType.local_vertex] = this.vertex_ShaderName[ShaderPhaseType.local_vertex] || [];
            this.vertex_ShaderName[ShaderPhaseType.local_vertex].push("particle_textureSheet_vs");

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
            this._sheetData = args;
            this._sheetFloatData[0] = this._sheetData.tileX;
            this._sheetFloatData[1] = this._sheetData.tileY;
            this._sheetFloatData[2] = this._sheetData.circles;

            if (this._sheetData.whole) {
                this._sheetFloatData[3] = 0;
                this._sheetFloatData[4] = this._sheetData.tileX * this._sheetData.tileY - 1;
            } else {
                this._sheetFloatData[3] = 0;
                this._sheetFloatData[4] = this._sheetData.tileY - 1;
            }

            if (this._sheetData.frameType == ParticleValueType.Const || this._sheetData.frameType == ParticleValueType.RandomConst) {
                this.fragment_ShaderName[ShaderPhaseType.start_fragment] = this.fragment_ShaderName[ShaderPhaseType.start_fragment] || [];
                this.fragment_ShaderName[ShaderPhaseType.start_fragment].push("particle_textureSheetConst");


            } else if (this._sheetData.frameType == ParticleValueType.OneBezier) {
                this.fragment_ShaderName[ShaderPhaseType.start_fragment] = this.fragment_ShaderName[ShaderPhaseType.start_fragment] || [];
                this.fragment_ShaderName[ShaderPhaseType.start_fragment].push("particle_bezier");
                this.fragment_ShaderName[ShaderPhaseType.start_fragment].push("particle_textureSheetOneBezier");
                this._floatCompressData1 = this._sheetData.bezier1.sampler();

            } else if (this._sheetData.frameType == ParticleValueType.TwoBezier) {
                this.fragment_ShaderName[ShaderPhaseType.start_fragment] = this.fragment_ShaderName[ShaderPhaseType.start_fragment] || [];
                this.fragment_ShaderName[ShaderPhaseType.start_fragment].push("particle_bezier");
                this.fragment_ShaderName[ShaderPhaseType.start_fragment].push("particle_textureSheetTwoBezier");

                this._floatCompressData1 = this._sheetData.bezier1.sampler();
                this._floatCompressData2 = this._sheetData.bezier2.sampler();
            }


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
            var frameStart: number = 0;
            var frameConst: number = 0;
            var randomSeed: number = 0;
            //将frameStart放入到顶点数据中
            var index: number = 0;
            var vertices: number = geometry.vertexCount / count;
            for (var i: number = 0; i < count; ++i) {
                //frameStart
                if (this._sheetData.whole) {
                    frameStart = 0;
                } else {
                    if (this._sheetData.randomRow) {
                        frameStart = Math.floor(this._sheetData.tileY * Math.random()) * this._sheetData.tileX;
                    } else {
                        frameStart = this._sheetData.row * this._sheetData.tileX;
                    }
                }
                //frame const
                if (this._sheetData.frameType == ParticleValueType.Const || this._sheetData.frameType == ParticleValueType.RandomConst) {
                    frameConst = (this._sheetData.max - this._sheetData.min) * Math.random() + this._sheetData.min;
                    frameConst = Math.floor(frameConst);
                } else {
                    frameConst = 0;
                }

                //

                if (this._sheetData.frameType == ParticleValueType.TwoBezier) {
                    randomSeed = Math.random();
                } else {
                    randomSeed = 1;
                }
                for (var j: number = 0; j < vertices; ++j) {
                    index = i * vertices + j;
                    index = index * geometry.vertexAttLength + this.attribute_textureSheetData.offsetIndex;
                    geometry.vertexArray[index + 0] = frameStart + 0.001;//修复抖动的问题
                    geometry.vertexArray[index + 1] = frameConst;
                    geometry.vertexArray[index + 2] = randomSeed;
                }
            }

            //##FilterEnd##
        }



        /**
        * @private
        */
        public activeState(time: number, animTime: number, delay: number, animDelay: number, usage: PassUsage, geometry: SubGeometry, context3DProxy: Context3DProxy) {
            //##FilterBegin## ##Particle##
            context3DProxy.uniform1fv(usage["uniform_textureSheet"].uniformIndex, this._sheetFloatData);
            if (this._sheetData.frameType == ParticleValueType.OneBezier) {
                context3DProxy.uniform1fv(usage["uniform_frameBezier"].uniformIndex, this._floatCompressData1);
            } else if (this._sheetData.frameType == ParticleValueType.TwoBezier) {
                context3DProxy.uniform1fv(usage["uniform_frameBezier1"].uniformIndex, this._floatCompressData1);
                context3DProxy.uniform1fv(usage["uniform_frameBezier2"].uniformIndex, this._floatCompressData2);
            }
            //##FilterEnd##

        }

        /**
        * @private 
        */
        public dispose(): void {
            super.dispose();
            this._animationState = null;
            this._floatCompressData1 = this._floatCompressData2 = null;
            this._sheetData = null;
            this._sheetFloatData = null;

        }


    }
} 