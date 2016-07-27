module egret3d {
    /**
     * @private
     * @language zh_CN
     * @class egret3d.GeometryData
     * @classdesc
     * GeometryData类 表示几何形状数据
     * 
     * @version Egret 3.0
     * @platform Web,Native
     * @includeExample geometry/GeometryData.ts
     */
    export class GeometryData {

        /**
        * @language zh_CN
        * 顶点属性长度
        */
        public vertexAttLength: number = 17;

        /**
        * @language zh_CN
        * 数据长度
        */
        public length: number;

        /**
        * @language zh_CN
        * 顶点长度
        */
        public vertLen: number = 0;

        /**
        * @language zh_CN
        * 面数
        */
        public faces: number = 0;

        /**
        * @language zh_CN
        * 索引数据
        */
        public source_indexData: Array<number> = new Array<number>();
        
        /**
        * @language zh_CN
        * 顶点数据
        */
        public source_vertexData: Array<number> = new Array<number>();
        
        /**
        * @language zh_CN
        * 顶点色数据
        */
        public source_vertexColorData: Array<number> = new Array<number>();
        
        /**
        * @language zh_CN
        * 顶点法线
        */
        public source_normalData: Array<number> = new Array<number>();

        /**
        * @language zh_CN
        * 顶点切线数据
        */
        public source_tangtData: Array<number> = new Array<number>();

        /**
        * @language zh_CN
        * 顶点uv数据
        */
        public source_uvData: Array<number> = new Array<number>();

        /**
        * @language zh_CN
        * 顶点uv2数据
        */
        public source_uv2Data: Array<number> = new Array<number>();

        /**
        * @language zh_CN
        * 蒙皮数据
        */
        public source_skinData: Array<number> = new Array<number>();

        /**
        * @language zh_CN
        * 顶点索引
        */
        public vertexIndex: number = 0;
        /**
        * @language zh_CN
        * 索引数据数组
        */
        public indices: Array<number> = new Array<number>();
        /**
        * @language zh_CN
        * 顶点数据数组(x、y、z)三个number为一个顶点数据
        */
        public vertices: Array<number> = new Array<number>();
        /**
        * @language zh_CN
        * 法线数据数组(x、y、z)三个number为一个法线数据
        */
        public normals: Array<number> = new Array<number>();
        /**
        * @language zh_CN
        * 切线数据数组(x、y、z)三个number为一个切线数据
        */
        public tangts: Array<number> = new Array<number>();
        /**
        * @language zh_CN
        * 顶点颜色数据数组
        */
        public verticesColor: Array<number> = new Array<number>();
        /**
        * @language zh_CN
        * 第一套UV数据数组
        */
        public uvs: Array<number> = new Array<number>();
        /**
        * @language zh_CN
        * 第二套UV数据数组
        */
        public uv2s: Array<number> = new Array<number>();
        /**
        * @language zh_CN
        * 蒙皮数据数组
        */
        public skinMesh: Array<number> = new Array<number>();

        /**
        * @language zh_CN
        * 面法线数据数组
        */
        public faceNormals: Array<number> = new Array<number>();
        /**
        * @language zh_CN
        * 面权重数据数组
        */
        public faceWeights: Array<number> = new Array<number>();

        /**
          * @language zh_CN
          * 顶点索引数据
          */
        public vertexIndices: Array<number> = new Array<number>();

        /**
        * @language zh_CN
        * uv索引数据
        */
        public uvIndices: Array<number> = new Array<number>();

        /**
        * @language zh_CN
        * uv2索引数据
        */
        public uv2Indices: Array<number> = new Array<number>();

        /**
        * @language zh_CN
        * 法线索引数据
        */
        public normalIndices: Array<number> = new Array<number>();

        /**
        * @language zh_CN
        * 顶点色索引数据
        */
        public colorIndices: Array<number> = new Array<number>();

        /**
        * @language zh_CN
        * 索引数据数组
        */
        public indexIds: Array<any> = new Array<any>(); // used for real index lookups

        public skeleton: Skeleton;
        /**
        * @language zh_CN
        * 顶点数据数组
        */
        public vertexDatas: Array<number>;

        public matCount: number = 0;
        public material: any = {};

        /**
        * @language zh_CN
        * 
        * 构建顶点数据数组
        * @param source 未组合顶点数据的GeometryData对象
        * @param vertexFormat 生成顶点格式
        * @returns 经过组合并生成顶点数据数组的新GeometryData对象
        */
        public static buildGeomtry(source: GeometryData, vertexFormat: number): Geometry {

            var target: Geometry = new Geometry();
            target.vertexFormat = vertexFormat;

            target.skeleton = source.skeleton;

            var vertex: Vector3D = new Vector3D();
            var normal: Vector3D = new Vector3D(1.0, 1.0, 1.0);
            var color: Vector3D = new Vector3D(1.0, 1.0, 1.0, 1.0);
            var uv_0: UV = new UV(1, 0);
            var uv_1: UV = new UV(1, 0);

            var index: number = 0;
            for (var faceIndex: number = 0; faceIndex < source.faces; faceIndex++) {

                target.indexData.push(
                    faceIndex * 3 + 0,
                    faceIndex * 3 + 2,
                    faceIndex * 3 + 1);

                for (var i: number = 0; i < 3; i++) {
                    index = source.vertexIndices[faceIndex * 3 + i] * Geometry.positionSize;
                    vertex.x = source.source_vertexData[index + 0];
                    vertex.y = source.source_vertexData[index + 1];
                    vertex.z = source.source_vertexData[index + 2];

                    if (source.normalIndices && source.source_normalData && source.source_normalData.length > 0) {
                        index = source.normalIndices[faceIndex * 3 + i] * Geometry.normalSize;
                        normal.x = source.source_normalData[index + 0];
                        normal.y = source.source_normalData[index + 1];
                        normal.z = source.source_normalData[index + 2];
                    }

                    if (source.colorIndices && source.source_vertexColorData && source.source_vertexColorData.length > 0) {
                        index = source.colorIndices[faceIndex * 3 + i] * Geometry.colorSize;
                        color.x = source.source_vertexColorData[index + 0];
                        color.y = source.source_vertexColorData[index + 1];
                        color.z = source.source_vertexColorData[index + 2];
                        color.w = source.source_vertexColorData[index + 3];
                    }
                    if (source.uvIndices && source.source_uvData && source.source_uvData.length > 0) {
                        index = source.uvIndices[faceIndex * 3 + i] * Geometry.uvSize;
                        uv_0.u = source.source_uvData[index + 0];
                        uv_0.v = source.source_uvData[index + 1];
                    }
                    if (source.uv2Indices && source.source_uv2Data && source.source_uv2Data.length > 0) {
                        index = source.uv2Indices[faceIndex * 3 + i] * Geometry.uvSize;
                        uv_1.u = source.source_uv2Data[index + 0];
                        uv_1.v = source.source_uv2Data[index + 1];
                    }

                    if (vertexFormat & VertexFormat.VF_POSITION) {
                        target.source_positionData.push(vertex.x);
                        target.source_positionData.push(vertex.y);
                        target.source_positionData.push(vertex.z);
                    }

                    if (vertexFormat & VertexFormat.VF_NORMAL) {
                        target.source_normalData.push(normal.x);
                        target.source_normalData.push(normal.y);
                        target.source_normalData.push(normal.z);
                    }

                    if (vertexFormat & VertexFormat.VF_TANGENT) {
                        target.source_tangentData.push(0);
                        target.source_tangentData.push(0);
                        target.source_tangentData.push(0);
                    }

                    if (vertexFormat & VertexFormat.VF_COLOR) {
                        target.source_colorData.push(color.x);
                        target.source_colorData.push(color.y);
                        target.source_colorData.push(color.z);
                        target.source_colorData.push(color.w);
                    }

                    if (vertexFormat & VertexFormat.VF_UV0) {
                        target.source_uvData.push(uv_0.u);
                        target.source_uvData.push(uv_0.v);
                    }

                    if (vertexFormat & VertexFormat.VF_UV1) {

                        target.source_uv2Data.push(uv_1.u);
                        target.source_uv2Data.push(uv_1.v);
                    }

                    if (vertexFormat & VertexFormat.VF_SKIN) {
                        if (source.source_skinData != null && source.source_skinData.length > 0) {
                            index = source.vertexIndices[faceIndex * 3 + i] * Geometry.skinSize;
                            target.source_SkinData.push(
                                source.source_skinData[index + 0],
                                source.source_skinData[index + 2],
                                source.source_skinData[index + 4],
                                source.source_skinData[index + 6],
                                source.source_skinData[index + 1],
                                source.source_skinData[index + 3],
                                source.source_skinData[index + 5],
                                source.source_skinData[index + 7]);
                        }
                        else {
                            target.source_SkinData.push(0, 0, 0, 0, 0, 0, 0, 0);
                        }
                    }
                }
            }

       
            target.calculateVertexFormat();

           // GeometryData.updateFaceTangents(target);

            for (var i: number = 0; i < source.matCount; ++i) {
                var subGeometry: SubGeometry = new SubGeometry();
                subGeometry.matID = i;
                subGeometry.geometry = target;
                subGeometry.start = source.material[i].start * 3 * Uint16Array.BYTES_PER_ELEMENT;
                subGeometry.count = source.material[i].count * 3;
                subGeometry.textureDiffuse = source.material[i].textureDiffuse;
                subGeometry.textureNormal = source.material[i].textureNormal;
                subGeometry.textureSpecular = source.material[i].textureSpecular;
                target.subGeometrys.push(subGeometry);
            }

            return target;
        }

        //private static translateMaterialGroup(geomtryData: GeometryData): GeometryData {
        //    var faces: Array<FaceData> = geomtryData.source_faceData;
        //    var face: FaceData;
        //    var numFaces: number = faces.length;
        //    var numVerts: number;

        //    var targetGeomtryData: GeometryData = new GeometryData();

        //    targetGeomtryData.vertexAttLength = geomtryData.vertexAttLength;

        //    var j: number;
        //    for (var i: number = 0; i < numFaces; ++i) {
        //        face = faces[i];
        //        numVerts = face.indexIds.length - 1;
        //        for (j = 1; j < numVerts; ++j) {
        //            this.translateVertexData(face, j, geomtryData, targetGeomtryData);
        //            this.translateVertexData(face, 0, geomtryData, targetGeomtryData);
        //            this.translateVertexData(face, j + 1, geomtryData, targetGeomtryData);
        //        }
        //    }
        //    if (targetGeomtryData.vertices.length > 0) {
        //        targetGeomtryData.vertLen = (targetGeomtryData.vertices.length / 3) * geomtryData.vertexAttLength;
        //       targetGeomtryData.vertexDatas = new Array<number>(targetGeomtryData.vertLen)

        //        //this.updateFaceTangents(targetGeomtryData);
        //        //this.updateFaceNormals(targetGeomtryData);
        //        this.combinGeomtryData(targetGeomtryData);
        //    }

        //    return targetGeomtryData;
        //}

        //private static translateVertexData(face: FaceData, vertexIndex: number, sourceGeomtryData: GeometryData, targetGeomtryData: GeometryData) {
        //    var index: number;
        //    var vertex: Vector3D;
        //    var color: Vector3D;
        //    var vertexNormal: Vector3D;
        //    var uv: UV;

        //    if (!targetGeomtryData.indices[face.indexIds[vertexIndex]]) {

        //        index = targetGeomtryData.vertexIndex;
        //        targetGeomtryData.indices[face.indexIds[vertexIndex]] = ++targetGeomtryData.vertexIndex;

        //        vertex = sourceGeomtryData.source_vertexData[face.vertexIndices[vertexIndex] - 1];
        //        targetGeomtryData.vertices.push(vertex.x, vertex.y, vertex.z);

        //        if (sourceGeomtryData.source_vertexColorData != null && sourceGeomtryData.source_vertexColorData.length > 0) {
        //            color = sourceGeomtryData.source_vertexColorData[face.vertexIndices[vertexIndex] - 1]

        //            targetGeomtryData.verticesColor.push(color.r, color.g, color.b, color.a);
        //        }

        //        if (sourceGeomtryData.source_skinData != null && sourceGeomtryData.source_skinData.length > 0) {

        //            targetGeomtryData.skinMesh.push(
        //                sourceGeomtryData.source_skinData[(face.vertexIndices[vertexIndex] - 1) * 8 + 0],
        //                sourceGeomtryData.source_skinData[(face.vertexIndices[vertexIndex] - 1) * 8 + 2],
        //                sourceGeomtryData.source_skinData[(face.vertexIndices[vertexIndex] - 1) * 8 + 4],
        //                sourceGeomtryData.source_skinData[(face.vertexIndices[vertexIndex] - 1) * 8 + 6],
        //                sourceGeomtryData.source_skinData[(face.vertexIndices[vertexIndex] - 1) * 8 + 1],
        //                sourceGeomtryData.source_skinData[(face.vertexIndices[vertexIndex] - 1) * 8 + 3],
        //                sourceGeomtryData.source_skinData[(face.vertexIndices[vertexIndex] - 1) * 8 + 5],
        //                sourceGeomtryData.source_skinData[(face.vertexIndices[vertexIndex] - 1) * 8 + 7]
        //                );
        //        }

        //        if (face.normalIndices.length > 0) {
        //            vertexNormal = sourceGeomtryData.source_normalData[face.normalIndices[vertexIndex] - 1];
        //            targetGeomtryData.normals.push(vertexNormal.x, vertexNormal.y, vertexNormal.z);
        //        }

        //        if (face.uvIndices.length > 0) {

        //            try {
        //                uv = sourceGeomtryData.source_uvData[face.uvIndices[vertexIndex] - 1];
        //                targetGeomtryData.uvs.push(uv.u, uv.v);

        //                if (sourceGeomtryData.source_uv2Data.length > 0) {
        //                    uv = sourceGeomtryData.source_uv2Data[face.uv2Indices[vertexIndex] - 1];
        //                    targetGeomtryData.uv2s.push(uv.u, uv.v);
        //                }
        //            } catch (e) {

        //                switch (vertexIndex) {
        //                    case 0:
        //                        targetGeomtryData.uvs.push(0, 1);
        //                        break;
        //                    case 1:
        //                        targetGeomtryData.uvs.push(.5, 0);
        //                        break;
        //                    case 2:
        //                        targetGeomtryData.uvs.push(1, 1);
        //                }
        //            }


        //        }

        //    } else
        //        index = targetGeomtryData.indices[face.indexIds[vertexIndex]] - 1;

        //    targetGeomtryData.indices.push(index);
        //}

        /**
        * 4 pos
        * 3 normal
        * 4 color
        * 2 uv
        * 2 uv2s
        * length 15
        */
        private static combinGeomtryData(geomtrtData: GeometryData, needTangent:boolean = true ) {
            var index: number = 0;
            var v: number = 0;
            var n: number = 0;
            var t: number = 0;
            var u1: number = 0;
            var u2: number = 0;
            var c: number = 0;
            var skin: number = 0;
            var data: Array<number> = geomtrtData.vertexDatas ;

            while (index < geomtrtData.vertLen) {
                data[index++] = geomtrtData.vertices[v++];
                data[index++] = geomtrtData.vertices[v++];
                data[index++] = geomtrtData.vertices[v++];

                if (geomtrtData.normals && geomtrtData.normals.length) {
                    data[index++] = geomtrtData.normals[n++];
                    data[index++] = geomtrtData.normals[n++];
                    data[index++] = geomtrtData.normals[n++];
                } else {
                    data[index++] = 0;
                    data[index++] = 0;
                    data[index++] = 0;
                }

                if (geomtrtData.tangts) {
                    index++
                    index++
                    index++
                   //data[index++] = geomtrtData.tangts[t++];
                   //data[index++] = geomtrtData.tangts[t++];
                   //data[index++] = geomtrtData.tangts[t++];
                } else {
                    data[index++] = 0;
                    data[index++] = 0;
                    data[index++] = 0;
                }

                if (geomtrtData.source_vertexColorData && geomtrtData.source_vertexColorData.length) {
                    data[index++] = geomtrtData.verticesColor[c++];
                    data[index++] = geomtrtData.verticesColor[c++];
                    data[index++] = geomtrtData.verticesColor[c++];
                    data[index++] = geomtrtData.verticesColor[c++];
                } else {
                    data[index++] = 1;
                    data[index++] = 1;
                    data[index++] = 1;
                    data[index++] = 1;
                }

                if (geomtrtData.uvs && geomtrtData.uvs.length) {
                    data[index++] = geomtrtData.uvs[u1++];
                    data[index++] = geomtrtData.uvs[u1++];

                    if (geomtrtData.uv2s && geomtrtData.uv2s.length) {
                        data[index++] = geomtrtData.uv2s[u2++];
                        data[index++] = geomtrtData.uv2s[u2++];
                    }
                    else {
                        data[index++] = geomtrtData.uvs[u2++];
                        data[index++] = geomtrtData.uvs[u2++];
                    }
                } else {
                    data[index++] = 0;
                    data[index++] = 0;
                    data[index++] = 0;
                    data[index++] = 0;
                }

                if (geomtrtData.skinMesh && geomtrtData.skinMesh.length) {
                    data[index++] = geomtrtData.skinMesh[skin++];
                    data[index++] = geomtrtData.skinMesh[skin++];
                    data[index++] = geomtrtData.skinMesh[skin++];
                    data[index++] = geomtrtData.skinMesh[skin++];
                    data[index++] = geomtrtData.skinMesh[skin++];
                    data[index++] = geomtrtData.skinMesh[skin++];
                    data[index++] = geomtrtData.skinMesh[skin++];
                    data[index++] = geomtrtData.skinMesh[skin++];
                }
            }

            //if (needTangent)
            //    this.updateFaceTangents(geomtrtData
        }

		/**
         * @private
		 * Updates the normals for each face.
		 */
        public static updateFaceNormals(geomtrtData: GeometryData)
		{
            var i: number = 0, j: number = 0, k: number = 0;
            var index: number;
            var len: number = geomtrtData.indices.length;
            var x1: number, x2: number, x3: number;
            var y1: number, y2: number, y3: number;
            var z1: number, z2: number, z3: number;
            var dx1: number, dy1: number, dz1: number;
            var dx2: number, dy2: number, dz2: number;
            var cx: number, cy: number, cz: number;
            var d: number;
            var vertices: Array<number> = geomtrtData.vertexDatas ;
            var posStride: number = 17;
            var posOffset: number = 3;

      
        //if (_useFaceWeights)
        //    _faceWeights ||= new Vector.<number>(len / 3, true);

            while (i < len) {
            
                index = posOffset + geomtrtData.indices[i++] * posStride;
                x1 = vertices[index];
                y1 = vertices[index + 1];
                z1 = vertices[index + 2];
                index = posOffset + geomtrtData.indices[i++] * posStride;
                x2 = vertices[index];
                y2 = vertices[index + 1];
                z2 = vertices[index + 2];
                index = posOffset + geomtrtData.indices[i++] * posStride;
                x3 = vertices[index];
                y3 = vertices[index + 1];
                z3 = vertices[index + 2];
                dx1 = x3 - x1;
                dy1 = y3 - y1;
                dz1 = z3 - z1;
                dx2 = x2 - x1;
                dy2 = y2 - y1;
                dz2 = z2 - z1;
                cx = dz1 * dy2 - dy1 * dz2;
                cy = dx1 * dz2 - dz1 * dx2;
                cz = dy1 * dx2 - dx1 * dy2;
                d = Math.sqrt(cx * cx + cy * cy + cz * cz);
                // length of cross product = 2*triangle area
                if (true) {
                    var w: number = d * 10000;
                    if (w < 1)
                        w = 1;
                    geomtrtData.faceWeights[k++] = w;
                }
                d = 1 / d;
                geomtrtData.faceNormals[j++] = cx * d;
                geomtrtData.faceNormals[j++] = cy * d;
                geomtrtData.faceNormals[j++] = cz * d;
            }
            //_faceNormalsDirty = false;
        }
		/**
		 * Updates the vertex normals based on the geometry.
		 */
        private static updateVertexNormals(geomtrtData: GeometryData)
        {
            this.updateFaceNormals(geomtrtData);
			
			var v1:number;
            var f1: number = 0, f2: number = 1, f3: number = 2;
            var lenV: number = geomtrtData.vertexDatas.length;
            var normalStride: number = 17;
            var normalOffset: number = 3;
			
                //target ||= new Vector.<Number>(lenV, true);
                //v1 = normalOffset;
                //while(v1 < lenV) {
                //    target[v1] = 0.0;
                //    target[v1 + 1] = 0.0;
                //    target[v1 + 2] = 0.0;
                //    v1 += normalStride;
                //}
			
            var i: number = 0, k: number = 0  ;
            var lenI: number = geomtrtData.indices.length;
            var index: number;
            var weight: number;
			
                while(i < lenI) {
                    weight = geomtrtData.faceWeights[k++];
                    index = normalOffset + geomtrtData.indices[i++] * normalStride;
                    geomtrtData.vertexDatas[index] += geomtrtData.faceNormals[f1] * weight;
                    geomtrtData.vertexDatas[index++] += geomtrtData.faceNormals[f2] * weight;
                    geomtrtData.vertexDatas[index++] += geomtrtData.faceNormals[f3] * weight;
                    index = normalOffset + geomtrtData.indices[i++] * normalStride;
                    geomtrtData.vertexDatas[index] += geomtrtData.faceNormals[f1] * weight;
                    geomtrtData.vertexDatas[index++] += geomtrtData.faceNormals[f2] * weight;
                    geomtrtData.vertexDatas[index++] += geomtrtData.faceNormals[f3] * weight;
                    index = normalOffset + geomtrtData.indices[i++] * normalStride;
                    geomtrtData.vertexDatas[index] += geomtrtData.faceNormals[f1] * weight;
                    geomtrtData.vertexDatas[index++] += geomtrtData.faceNormals[f2] * weight;
                    geomtrtData.vertexDatas[index++] += geomtrtData.faceNormals[f3] * weight;
                    f1 += 3;
                    f2 += 3;
                    f3 += 3;
                }
			
			//v1 = normalOffset;
            //    while(v1 < lenV) {
            //        var vx: Number = target[v1];
            //        var vy: Number = target[v1 + 1];
            //        var vz: Number = target[v1 + 2];
            //        var d: Number = 1.0 / Math.sqrt(vx * vx + vy * vy + vz * vz);
            //        target[v1] = vx * d;
            //        target[v1 + 1] = vy * d;
            //        target[v1 + 2] = vz * d;
            //        v1 += normalStride;
            //    }
			
			//_vertexNormalsDirty = false;
        }

        private static updateFaceTangents(geometry: Geometry) {
            var i: number = 0;
            var index1: number, index2: number, index3: number;
            var len: number = geometry.indexData.length;
            var ui: number, vi: number;
            var v0: number;
            var dv1: number, dv2: number;
            var denom: number;
            var x0: number, y0: number, z0: number;
            var dx1: number, dy1: number, dz1: number;
            var dx2: number, dy2: number, dz2: number;
            var cx: number, cy: number, cz: number;
            var vertices: Array<number> = geometry.verticesData;
         //   var uvs: Array<number> = geometry.source_uvData;

            var posStride: number = geometry.vertexAttLength ;
            var posOffset: number = 0;
            var texStride: number = geometry.vertexAttLength;
            var texOffset: number = 0;

            if (geometry.vertexFormat & VertexFormat.VF_TANGENT)
                texOffset += Geometry.positionSize + Geometry.normalSize + Geometry.tangentSize;
            if (geometry.vertexFormat & VertexFormat.VF_COLOR)
                texOffset += Geometry.colorSize ;

            while (i < len) {
                index1 = geometry.indexData[i];
                index2 = geometry.indexData[i + 1];
                index3 = geometry.indexData[i + 2];

                ui = texOffset + index1 * texStride ;
                v0 = vertices[ui];                  
                                                    
                ui = texOffset + index2 * texStride ;
                dv1 = vertices[ui] - v0;            
                                                    
                ui = texOffset + index3 * texStride ;
                dv2 = vertices[ui] - v0;

                vi = posOffset + index1 * posStride;
                x0 = vertices[vi];
                y0 = vertices[(vi + 1)];
                z0 = vertices[(vi + 2)];

                vi = posOffset + index2 * posStride;
                dx1 = vertices[(vi)] - x0;
                dy1 = vertices[(vi + 1)] - y0;
                dz1 = vertices[(vi + 2)] - z0;

                vi = posOffset + index3 * posStride;
                dx2 = vertices[(vi)] - x0;
                dy2 = vertices[(vi + 1)] - y0;
                dz2 = vertices[(vi + 2)] - z0;

                cx = dv2 * dx1 - dv1 * dx2;
                cy = dv2 * dy1 - dv1 * dy2;
                cz = dv2 * dz1 - dv1 * dz2;
                denom = 1 / Math.sqrt(cx * cx + cy * cy + cz * cz);

                geometry.source_tangentData[i++] = denom * cx;
                geometry.source_tangentData[i++] = denom * cy;
                geometry.source_tangentData[i++] = denom * cz;
            }

            var k: number;
            var lenI: number = geometry.indexData.length;
            var index: number;
            var weight: number;
            var f1: number = 0, f2: number = 1, f3: number = 2;
            var tangentOffset: number = Geometry.positionSize + Geometry.normalSize; 
            var tangentStride: number = geometry.vertexAttLength;


            i = 0;

            while (i < lenI) {
                weight = 1;
                index = tangentOffset + geometry.indexData[i++] * tangentStride;
                geometry.verticesData[index++] += geometry.source_tangentData[f1] * weight;
                geometry.verticesData[index++] += geometry.source_tangentData[f2] * weight;
                geometry.verticesData[index] += geometry.source_tangentData[f3] * weight;
                index = tangentOffset + geometry.indexData[i++] * tangentStride;
                geometry.verticesData[index++] += geometry.source_tangentData[f1] * weight;
                geometry.verticesData[index++] += geometry.source_tangentData[f2] * weight;
                geometry.verticesData[index] += geometry.source_tangentData[f3] * weight;
                index = tangentOffset + geometry.indexData[i++] * tangentStride;
                geometry.verticesData[index++] += geometry.source_tangentData[f1] * weight;
                geometry.verticesData[index++] += geometry.source_tangentData[f2] * weight;
                geometry.verticesData[index] += geometry.source_tangentData[f3] * weight;
                f1 += 3;
                f2 += 3;
                f3 += 3;
            }

            var lenV: number = geometry.verticesData.length ;
            i = tangentOffset;
            while (i < lenV) {
                var vx: number = geometry.verticesData[i];
                var vy: number = geometry.verticesData[i + 1];
                var vz: number = geometry.verticesData[i + 2];
                var d: number = 1.0 / Math.sqrt(vx * vx + vy * vy + vz * vz);
                geometry.verticesData[i] = vx * d;
                geometry.verticesData[i + 1] = vy * d;
                geometry.verticesData[i + 2] = vz * d;
                i += geometry.vertexAttLength;
            }
        }
    }
}