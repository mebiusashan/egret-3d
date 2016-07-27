module egret3d {
    export class ElevationGeometry extends Geometry {

        private _width: number = 100;
        private _height: number = 100;

        private _segmentsW: number = 100;
        private _segmentsH: number = 100;

        private _depth: number = 100;

        private _minElevation: number = 100;
        private _maxElevation: number = 100;

        private _heightmap: ImageTexture; 
        private _canvas: HTMLCanvasElement; 

        private _scaleU: number = 1; 
        private _scaleV: number = 1; 
        private imageData: ImageData; 


        constructor(heightmap: ImageTexture, width: number = 1000, height: number = 100, depth: number = 1000, segmentsW: number = 30, segmentsH: number = 30, maxElevation: number = 255, minElevation: number = 0) {
            super();
            this._segmentsW = segmentsW;
            this._segmentsH = segmentsH;
            this._width = width;
            this._height = height;
            this._depth = depth;
            this._minElevation = minElevation;
            this._maxElevation = maxElevation;
            this._heightmap = heightmap;

            this._canvas = document.createElement("canvas");
            var ctx:CanvasRenderingContext2D = this._canvas.getContext("2d");
            this._canvas.width = heightmap.imageData.width ;
            this._canvas.height = heightmap.imageData.height;
            ctx.drawImage(heightmap.imageData, 0, 0, heightmap.width, heightmap.height);
            document.body.appendChild(this._canvas);
            this._canvas.hidden = true;
            this.imageData = ctx.getImageData(0, 0, this._heightmap.imageData.width, this._heightmap.imageData.height);

            document.body.removeChild(this._canvas);

            this.buildGeomtry(true);
        }

        /**
       * @private
       * @language zh_CN
       * 生成网格
       * @version Egret 3.0
       * @platform Web,Native
       */
        public buildGeomtry(front: boolean) {
            this.vertexFormat = VertexFormat.VF_POSITION | VertexFormat.VF_NORMAL | VertexFormat.VF_TANGENT | VertexFormat.VF_COLOR | VertexFormat.VF_UV0 | VertexFormat.VF_UV1;

            var x: number, z: number;
            var numInds: number;
            var base: number;
            var tw: number = this._segmentsW + 1;
            var numVerts: number = (this._segmentsH + 1) * tw;
            var uDiv: number = (this._heightmap.width - 1) / this._segmentsW;
            var vDiv: number = (this._heightmap.height - 1) / this._segmentsH;
            var u: number, v: number;
            var y: number;

            //if (numVerts == this._subGeometry.numVertices) {
            //    vertices = this._subGeometry.vertexData;
            //    indices = this._subGeometry.indexData;
            // } else {
            this.verticesData = new Array<number>(numVerts * 3);
            this.indexData = new Array<number>(this._segmentsH * this._segmentsW * 6);

            numVerts = 0;
            numInds = 0;
            var col: number;

            for (var zi: number = 0; zi <= this._segmentsH; ++zi) {
                for (var xi: number = 0; xi <= this._segmentsW; ++xi) {
                    x = (xi / this._segmentsW - 0.5) * this._width;
                    z = (zi / this._segmentsH - 0.5) * this._depth;
                    u = Math.floor(xi * uDiv);
                    v = Math.floor((this._segmentsH - zi) * vDiv);

                    col = this.getPixel(u, v) & 0xff;
                    y =  (col > this._maxElevation) ? (this._maxElevation / 0xff) * this._height : ((col < this._minElevation) ? (this._minElevation / 0xff) * this._height : (col / 0xff) * this._height);

                    //pos
                    this.verticesData[numVerts++] = x;
                    this.verticesData[numVerts++] = y;//Math.random() * 1000;;
                    this.verticesData[numVerts++] = z;
                    //normal
                    this.verticesData[numVerts++] = 1.0;
                    this.verticesData[numVerts++] = 1.0;
                    this.verticesData[numVerts++] = 1.0;
                    //tan
                    this.verticesData[numVerts++] = -1.0;
                    this.verticesData[numVerts++] = 0.0;
                    this.verticesData[numVerts++] = 0.0;
                    //color
                    this.verticesData[numVerts++] = 1.0;
                    this.verticesData[numVerts++] = 1.0;
                    this.verticesData[numVerts++] = 1.0;
                    this.verticesData[numVerts++] = 1.0;
                    //uv
                    this.verticesData[numVerts++] = xi / this._segmentsW * this._scaleU;
                    this.verticesData[numVerts++] = 1.0 - zi / this._segmentsH * this._scaleV;
                    this.verticesData[numVerts++] = xi / this._segmentsW;
                    this.verticesData[numVerts++] = 1.0 - zi / this._segmentsH;

                    if (xi != this._segmentsW && zi != this._segmentsH) {
                        base = xi + zi * tw;
                        this.indexData[numInds++] = base;
                        this.indexData[numInds++] = base + tw + 1;
                        this.indexData[numInds++] = base + tw;
                        this.indexData[numInds++] = base;
                        this.indexData[numInds++] = base + 1;
                        this.indexData[numInds++] = base + tw + 1;
                    }
                }
            }

            this.updateFaceNormals();
            this.buildDefaultSubGeometry();
        }

        public getPixel(x: number, z: number): number {
            var index: number = z * (this._heightmap.imageData.width * 4) + x * 4;
            var color: number = this.imageData.data[index + 3] << 24 | this.imageData.data[index + 0] << 16 | this.imageData.data[index + 1] << 8 | this.imageData.data[index + 2];
            return color;
        }

        public getHeightBypos(x: number, z: number): number {
            var color: number = this.getPixel(x, z);

            return (color > this._maxElevation) ? (this._maxElevation / 0xff) * this._height : ((color < this._minElevation) ? (this._minElevation / 0xff) * this._height : (color / 0xff) * this._height);
        }

        private updateFaceNormals() {
            var i: number = 0, j: number = 0, k: number = 0;
            var index: number;
            var len: number = this.indexData.length;
            var x1: number, x2: number, x3: number;
            var y1: number, y2: number, y3: number;
            var z1: number, z2: number, z3: number;
            var dx1: number, dy1: number, dz1: number;
            var dx2: number, dy2: number, dz2: number;
            var cx: number, cy: number, cz: number;
            var d: number;
            var vertices: Array<number> = this.verticesData;
            var posStride: number = 17;
            var posOffset: number = 0;
            var faceNormals: number[] = []; 
            while (i < len) {

                index = posOffset + this.indexData[i+0] * posStride;
                x1 = vertices[index];
                y1 = vertices[index + 1];
                z1 = vertices[index + 2];
                index = posOffset + this.indexData[i+1] * posStride;
                x2 = vertices[index];
                y2 = vertices[index + 1];
                z2 = vertices[index + 2];
                index = posOffset + this.indexData[i+2] * posStride;
                x3 = vertices[index];
                y3 = vertices[index + 1];
                z3 = vertices[index + 2];
                dx1 = x2 - x1;
                dy1 = y2 - y1;
                dz1 = z2 - z1;
                dx2 = x3 - x1;
                dy2 = y3 - y1;
                dz2 = z3 - z1;
                cx = dz1 * dy2 - dy1 * dz2;
                cy = dx1 * dz2 - dz1 * dx2;
                cz = dy1 * dx2 - dx1 * dy2;
                d = Math.sqrt(cx * cx + cy * cy + cz * cz);

                faceNormals[j++] = cz * d;
                faceNormals[j++] = cy * d;
                faceNormals[j++] = cx * d;

                i += 3;
            }

            i = 0;
            var f1: number = 0, f2: number = 1, f3: number = 2;
            var normalStride: number = this.vertexAttLength;
            var normalOffset: number = 3;
            while (i < len) {
                index = normalOffset + this.indexData[i++] * normalStride;
                this.verticesData[index++] = faceNormals[f1];
                this.verticesData[index++] = faceNormals[f2];
                this.verticesData[index++] = faceNormals[f3];
                index = normalOffset + this.indexData[i++] * normalStride;
                this.verticesData[index++] = faceNormals[f1];
                this.verticesData[index++] = faceNormals[f2];
                this.verticesData[index++] = faceNormals[f3];
                index = normalOffset + this.indexData[i++] * normalStride;
                this.verticesData[index++] = faceNormals[f1];
                this.verticesData[index++] = faceNormals[f2];
                this.verticesData[index++] = faceNormals[f3];
                f1 += 3;
                f2 += 3;
                f3 += 3;
            }
        }

    }
}