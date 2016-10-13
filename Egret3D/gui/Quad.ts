module egret3d {

    /**
    * @class egret3d.Quad
    * @classdesc
    * gui中基础的2d显示单元</p>
    * 在这个class中，主要完成更新顶点数据。</p>
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class Quad extends DisplayObject {

        private static FLAG_VALLID_QUAD: number = 0;
        private static FLAG_IS_VISIBLE: number = 1;
        private static FLAG_HAS_MASK: number = 2;
        private static FLAG_HAS_TEXTURE: number = 3;
        private static FLAG_IS_TEXTFIELD: number = 4;

        protected _texture: Texture;
        protected _globalIndex: number = -1;//记录上一次在全局位置的下标
        protected _boolArray: BooleanArray = new BooleanArray();

        private static IdentityVector: Vector3D = new Vector3D(1, 1, 1, 1);
        private static TempVector: Vector3D = new Vector3D();
        private static DefaultUVRect: Rectangle = new Rectangle(0, 0, 1, 1);
        constructor() {
            super();
        }

        public set texture(value: Texture) {
            if (value != this._texture) {
                this._texture = value;
                this._textureInvalid = true;
            }
        }

        //public get texture(): Texture {
        //    return this._texture;
        //}

        /**
        * @language zh_CN
        * 在渲染之前逻辑更新顶点数据，只有发生数据变化才需要更新顶点
        * @param zIndex 在geometry中下标
        * @param geometry 当前quad所在geometry
        * @param globalIndex 全局下标
        * @version Egret 3.0
        * @platform Web,Native
        */
        public updateVertices(zIndex: number, geometry: Geometry, globalIndex: number) {

            if (!geometry.sharedVertexBuffer || !geometry.sharedVertexBuffer.arrayBuffer)
                return;

            var pos: Vector3D = this.globalPosition;
            var rot: Vector3D = this.globalRotation;
            var sca: Vector3D = this.globalScale;

            if (this._globalIndex != globalIndex) {
                this._globalIndex = globalIndex;
                this._colorInvalid = this._transformInvalid = this._renderTextInvalid = this._textureInvalid = this._visibleInvalid = this._maskRectInvalid = true;
                this._boolArray.clear();
            }

            if (this._visibleInvalid) {
                this._visibleInvalid = false;
                this._boolArray.setBoolean(Quad.FLAG_IS_VISIBLE, this.globalVisible);
            }

            //一个真实的quad，而不是geometry中没有用到的部分
            this._boolArray.setBoolean(Quad.FLAG_VALLID_QUAD, true);

            //
            var index: number = 0;
            var positionFrom: number;
            var positionOffset: number = geometry.vertexAttLength;
            var verticesData: Float32Array = geometry.sharedVertexBuffer.arrayBuffer;

            if (this._transformInvalid) {
                this._transformInvalid = false;

                //________________(x,y)
                positionFrom = zIndex * QuadData.quadVertexLen + QuadData.originalOffset;
                for (var i: number = 0; i < 4; i++) {
                    index = positionFrom + i * positionOffset;
                    if (this._renderText) {
                        verticesData[index] = pos.x >> 0;
                        verticesData[index + 1] = -pos.y >> 0;
                    } else {
                        verticesData[index] = pos.x;
                        verticesData[index + 1] = -pos.y;
                    }
                }

                //____________________(width,height)
                positionFrom = zIndex * QuadData.quadVertexLen + QuadData.posOffest;
                //0
                index = positionFrom + 0 * positionOffset;
                verticesData[index] = 0;
                verticesData[index + 1] = 0;

                //1
                index = positionFrom + 1 * positionOffset;
                verticesData[index] = this.width;
                verticesData[index + 1] = 0;

                //2
                index = positionFrom + 2 * positionOffset;
                verticesData[index] = this.width;
                verticesData[index + 1] = -this.height;

                //3
                index = positionFrom + 3 * positionOffset;
                verticesData[index] = 0;
                verticesData[index + 1] = -this.height;


                //____________________(scale x y)
                positionFrom = zIndex * QuadData.quadVertexLen + QuadData.uvRectangleOffest;
                for (var i: number = 0; i < 4; i++) {
                    index = positionFrom + i * positionOffset;
                    verticesData[index + 2] = sca.x;
                    verticesData[index + 3] = sca.y;
                }


                //____________________(rotation xyzw )
                //rotation upload GPU , on GPU caculate;
                var quaternion: Quaternion = Quaternion.HELP_0;
                quaternion.fromEulerAngles(this._globalRot.x, this._globalRot.y, this._globalRot.z);

                positionFrom = zIndex * QuadData.quadVertexLen + QuadData.rotationOffest;
                for (var i: number = 0; i < 4; i++) {
                    index = positionFrom + i * positionOffset;
                    verticesData[index] = quaternion.x;
                    verticesData[index + 1] = quaternion.y;
                    verticesData[index + 2] = quaternion.z;
                    verticesData[index + 3] = quaternion.w;
                }

            }

            if (this._renderTextInvalid) {
                this._renderTextInvalid = false;
                this._boolArray.setBoolean(Quad.FLAG_IS_TEXTFIELD, this._renderText);
            }



            if (this._textureInvalid) {
                this._textureInvalid = false;
                this._boolArray.setBoolean(Quad.FLAG_HAS_TEXTURE, this._texture != null);
                //____________________gui index
                var texId: number = 0;
                var uvRec: Rectangle;

                if (this._texture) {
                    uvRec = this._texture.uvRectangle;
                    //use gui index
                    texId = this._texture.guiIndex;

                    positionFrom = zIndex * QuadData.quadVertexLen + QuadData.uvRectangleOffest;

                    index = positionFrom + 0 * positionOffset;
                    verticesData[index] = uvRec.x;
                    verticesData[index + 1] = uvRec.y;

                    index = positionFrom + 1 * positionOffset;
                    verticesData[index] = uvRec.x + uvRec.width;
                    verticesData[index + 1] = uvRec.y;

                    index = positionFrom + 2 * positionOffset;
                    verticesData[index] = uvRec.x + uvRec.width;
                    verticesData[index + 1] = uvRec.y + uvRec.height;

                    index = positionFrom + 3 * positionOffset;
                    verticesData[index] = uvRec.x;
                    verticesData[index + 1] = uvRec.y + uvRec.height;

                    //____________________texId;
                    positionFrom = zIndex * QuadData.quadVertexLen + QuadData.originalOffset;
                    for (var i: number = 0; i < 4; i++) {
                        index = positionFrom + i * positionOffset;
                        verticesData[index + 2] = texId;
                    }
                }

            }


            if (this._maskRectInvalid) {
                this._maskRectInvalid = false;
                //____________________mask x y width height
                var maskRect: Rectangle = this.globalMask;
                this._boolArray.setBoolean(Quad.FLAG_HAS_MASK, maskRect != null);
                var maskX: number, maskY: number, maskW: number, maskH: number;
                if (maskRect) {
                    maskX = maskRect.x;
                    maskY = maskRect.y;
                    maskW = maskRect.width;
                    maskH = maskRect.height;
                    positionFrom = zIndex * QuadData.quadVertexLen + QuadData.maskOffset;
                    for (var i: number = 0; i < 4; i++) {
                        index = positionFrom + i * positionOffset;
                        verticesData[index + 0] = maskX;
                        verticesData[index + 1] = maskY;
                        verticesData[index + 2] = maskW;
                        verticesData[index + 3] = maskH;
                    }
                }

            }

            if (this._colorInvalid) {
                //____________________rgba
                //calc global color
                var clrAlpha: number = this.globalColor.alpha;
                var tempVector: Vector3D = Quad.TempVector;
                this.globalColor.m44.transformVector(Quad.IdentityVector, tempVector);
                positionFrom = zIndex * QuadData.quadVertexLen + QuadData.colorOffest;
                for (var i: number = 0; i < 4; i++) {
                    index = positionFrom + i * positionOffset;
                    verticesData[index] = tempVector.x;
                    verticesData[index + 1] = tempVector.y;
                    verticesData[index + 2] = tempVector.z;
                    verticesData[index + 3] = clrAlpha;
                }
                this._colorInvalid = false;
            }

            //merge boolList
            if (this._boolArray.dirty) {
                var makeRes: number = this._boolArray.makeResult;
                positionFrom = zIndex * QuadData.quadVertexLen + QuadData.originalOffset;
                for (var i: number = 0; i < 4; i++) {
                    index = positionFrom + i * positionOffset;
                    verticesData[index + 3] = makeRes;
                }
            }
        }

        /**
        * @language zh_CN
        * 在渲染之前清理某个下标位置的顶点数据，标记为null状态
        * @param zIndex 在geometry中下标
        * @param geometry 当前quad所在geometry
        * @version Egret 3.0
        * @platform Web,Native
        */

        public static clear(zIndex: number, geometry: Geometry): void {
            if (geometry.sharedVertexBuffer && geometry.sharedVertexBuffer.arrayBuffer) {

                var verticesData: Float32Array = geometry.sharedVertexBuffer.arrayBuffer;
                //null 
                var index: number;
                var positionFrom: number = zIndex * QuadData.quadVertexLen + QuadData.originalOffset;
                for (var i: number = 0; i < 4; i++) {
                    index = positionFrom + i * geometry.vertexAttLength;
                    verticesData[index + 2] = 0;
                }

            }

        }


    }
} 