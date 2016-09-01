module egret3d {

    /**
    * @language zh_CN
    * quad对象，枚举出一些异常情况
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class QuadNullType {
        //没有贴图的QUAD
        public static NULL_TEXTURE: number = -1;
        //空的QUAD
        public static NULL_QUAD: number = -2;
        //不可见
        public static NULL_INVISIBLE: number = -3;
    }

    /**
    * @private
    */
    export class Quad extends DisplayObject {
        protected _texture: Texture;
        protected _globalIndex: number = -1;//记录上一次在全局位置的下标
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

        public update(time: number, delay: number, zIndex: number, geometry: Geometry, view3D: View3D, globalIndex: number) {

            if (!geometry.sharedVertexBuffer)
                return;
            //parent px&py&pz need add offest , rx&ry&rz need add , sx&sy&sz need add . on cpu ?

            
           

            var index: number = 0;
            var pos: Vector3D = this.globalPosition;
            var rot: Vector3D = this.globalRotation;
            var sca: Vector3D = this.globalScale;
            this.globalColor;
            this.globalVisible;

            var verticesData: Float32Array = geometry.sharedVertexBuffer.arrayBuffer;

            this._renderTypeInvalid = this._renderTypeInvalid || this._transformInvalid;

            if (this._globalIndex != globalIndex) {
                this._globalIndex = globalIndex;
                this._colorInvalid = this._transformInvalid = this._renderTypeInvalid = this._textureInvalid = this._visibleChange = this._maskRectInvalid = true;
            }

            if (this.mouseEnable) {
                this.aabb.x = pos.x;
                this.aabb.y = pos.y;
                this.aabb.width = this.width * sca.x;
                this.aabb.height = this.height * sca.y;
            }

            var positionFrom: number;
            var positionOffset: number = geometry.vertexAttLength;

            if (this._transformInvalid) {
                this._transformInvalid = false;

                //________________(x,y)
                positionFrom = zIndex * QuadData.quadVertexLen + QuadData.offsetOffest;
                for (var i: number = 0; i < 4; i++) {
                    index = positionFrom + i * positionOffset;
                    verticesData[index] = pos.x;
                    verticesData[index + 1] = -pos.y;
                }

                //____________________(width,height)
                positionFrom = zIndex * QuadData.quadVertexLen + QuadData.posOffest;
                //0
                index = positionFrom + 0 * positionOffset;
                verticesData[index] = 0;
                verticesData[index + 1] = 0;
                //verticesData[index + 2] = -zIndex;

                //1
                index = positionFrom + 1 * positionOffset;
                verticesData[index] = this.width;
                verticesData[index + 1] = 0;
                //verticesData[index + 2] = -zIndex;

                //2
                index = positionFrom + 2 * positionOffset;
                verticesData[index] = this.width;
                verticesData[index + 1] = -this.height;
                //verticesData[index + 2] = -zIndex;

                //3
                index = positionFrom + 3 * positionOffset;
                verticesData[index] = 0;
                verticesData[index + 1] = -this.height;
                //verticesData[index + 2] = -zIndex;



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


            if (this._renderTypeInvalid) {
                this._renderTypeInvalid = false;
                //____________________render Type
                positionFrom = zIndex * QuadData.quadVertexLen + QuadData.posOffest;
                for (var i: number = 0; i < 4; i++) {
                    index = positionFrom + i * positionOffset;
                    verticesData[index + 3] = this._renderType;
                }
            }



            if (this._textureInvalid || this._visibleInvalid) {
                this._textureInvalid = false;
                this._visibleInvalid = false;
                //____________________gui index
                var texId: number = QuadNullType.NULL_TEXTURE;
                var uvRec: Rectangle;
                if (this._texture) {
                    uvRec = this._texture.uvRectangle;
                    //use gui index
                    texId = this._texture.guiIndex;
                } else {
                    //hav no texture
                    texId = QuadNullType.NULL_TEXTURE;
                    uvRec = Quad.DefaultUVRect;
                }

                if (this.visible == false) {
                    texId = QuadNullType.NULL_INVISIBLE;
                }

                //rotation upload GPU , on GPU caculate;
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
                positionFrom = zIndex * QuadData.quadVertexLen + QuadData.offsetOffest;
                for (var i: number = 0; i < 4; i++) {
                    index = positionFrom + i * positionOffset;
                    verticesData[index + 2] = texId;
                }
            }


            if (this._maskRectInvalid) {
                this._maskRectInvalid = false;
                //____________________mask x y width height
                var globalMask: Rectangle = this.globalMask;
                if (globalMask) {
                    var maskX: number, maskY: number, maskW: number, maskH: number;

                    maskX = globalMask.x;      //                0;
                    maskY = globalMask.y;      //                0;
                    maskW = globalMask.width;  //                50;
                    maskH = globalMask.height; //                600;

                    positionFrom = zIndex * QuadData.quadVertexLen + QuadData.scaleOffest;
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
        }

        public static clear(zIndex: number, geometry: Geometry): void {
            var verticesData: Float32Array = geometry.sharedVertexBuffer.arrayBuffer;
            if (!verticesData)
                return;
            //empty
            var index: number;
            var positionFrom: number = zIndex * QuadData.quadVertexLen + QuadData.offsetOffest;
            for (var i: number = 0; i < 4; i++) {
                index = positionFrom + i * geometry.vertexAttLength;
                verticesData[index + 2] = QuadNullType.NULL_QUAD;
            }
        }

    }
} 