module egret3d {
    /**
     * @language zh_CN
     * @class egret3d.CubeGeometry
     * @classdesc
     * CubeGeometry类 表示立方体</p>
     *
     * 示例：</p>
     * 用 CubeGeometry 对象创建一个mesh，并给予默认纹理材质TextureMaterial（默认为棋盘格纹理）; </p>
     <pre>
      var box: egret3d.Mesh = new egret3d.Mesh( new egret3d.CubeGeometry(), new egret3d.TextureMaterial() );
     </pre>
     * 
     * @see egret3d.Geometry
     * @see egret3d.Mesh
     * @version Egret 3.0
     * @platform Web,Native
     * @includeExample geometry/CubeGeometry.ts
     */
    export class CubeGeometry extends Geometry {


        private _width: number = 80;
        /**
        * @language zh_CN
        * Cube宽度
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get width(): number {
            return this._width;
        }


        private _height: number = 80;
        /**
        * @language zh_CN
        * Cube高度
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get height(): number {
            return this._height;
        }


        private _depth: number = 80;
        /**
        * @language zh_CN
        * Cube深度
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get depth(): number {
            return this._depth;
        }

        /**
        * @language zh_CN
        * 构造函数
        * @param width 宽度 默认为80
        * @param height 高度 默认为80
        * @param depth 深度 默认为80
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor(width: number = 80, height: number = 80, depth: number = 80) {
            super();
            this._width = width;
            this._height = height;
            this._depth = depth;
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

            this.verticesData = new Array<number>();
            this.indexData = new Array<number>();

            this.verticesData.push(
                -this._width * 0.5, -this._height * 0.5, -this._depth * 0.5, 0.0, 0.0, -10.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 1.0, 0.0, 0, 0,
                -this._width * 0.5, this._height * 0.5, -this._depth * 0.5, 0.0, 0.0, -10.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 1.0, 1.0, 0, 0,
                this._width * 0.5, this._height * 0.5, -this._depth * 0.5, 0.0, 0.0, -10.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 0.0, 1.0, 0, 0,

                this._width * 0.5, this._height * 0.5, -this._depth * 0.5, 0.0, 0.0, -10.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 0.0, 1.0, 0, 0,
                this._width * 0.5, -this._height * 0.5, -this._depth * 0.5, 0.0, 0.0, -10.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 0.0, 0.0, 0, 0,
                -this._width * 0.5, -this._height * 0.5, -this._depth * 0.5, 0.0, 0.0, -10.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 1.0, 0.0, 0, 0,

                -this._width * 0.5, -this._height * 0.5, this._depth * 0.5, 0.0, 0.0, 10.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 0.0, 0.0, 0, 0,
                this._width * 0.5, -this._height * 0.5, this._depth * 0.5, 0.0, 0.0, 10.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 1.0, 0.0, 0, 0,
                this._width * 0.5, this._height * 0.5, this._depth * 0.5, 0.0, 0.0, 10.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 1.0, 1.0, 0, 0,

                this._width * 0.5, this._height * 0.5, this._depth * 0.5, 0.0, 0.0, 10.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 1.0, 1.0, 0, 0,
                -this._width * 0.5, this._height * 0.5, this._depth * 0.5, 0.0, 0.0, 10.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 0.0, 1.0, 0, 0,
                -this._width * 0.5, -this._height * 0.5, this._depth * 0.5, 0.0, 0.0, 10.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 0.0, 0.0, 0, 0,

                -this._width * 0.5, -this._height * 0.5, -this._depth * 0.5, 0.0, -10.0, 0.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 0.0, 0.0, 0, 0,
                this._width * 0.5, -this._height * 0.5, -this._depth * 0.5, 0.0, -10.0, 0.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 1.0, 0.0, 0, 0,
                this._width * 0.5, -this._height * 0.5, this._depth * 0.5, 0.0, -10.0, 0.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 1.0, 1.0, 0, 0,

                this._width * 0.5, -this._height * 0.5, this._depth * 0.5, 0.0, -10.0, 0.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 1.0, 1.0, 0, 0,
                -this._width * 0.5, -this._height * 0.5, this._depth * 0.5, 0.0, -10.0, 0.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 0.0, 1.0, 0, 0,
                -this._width * 0.5, -this._height * 0.5, -this._depth * 0.5, 0.0, -10.0, 0.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 0.0, 0.0, 0, 0,

                this._width * 0.5, -this._height * 0.5, -this._depth * 0.5, 10.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 0.0, 0.0, 0, 0,
                this._width * 0.5, this._height * 0.5, -this._depth * 0.5, 10.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 1.0, 0.0, 0, 0,
                this._width * 0.5, this._height * 0.5, this._depth * 0.5, 10.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 1.0, 1.0, 0, 0,

                this._width * 0.5, this._height * 0.5, this._depth * 0.5, 10.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 1.0, 1.0, 0, 0,
                this._width * 0.5, -this._height * 0.5, this._depth * 0.5, 10.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 0.0, 1.0, 0, 0,
                this._width * 0.5, -this._height * 0.5, -this._depth * 0.5, 10.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 0.0, 0.0, 0, 0,

                this._width * 0.5, this._height * 0.5, -this._depth * 0.5, 0.0, 10.0, 0.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 0.0, 0.0, 0, 0,
                -this._width * 0.5, this._height * 0.5, -this._depth * 0.5, 0.0, 10.0, 0.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 1.0, 0.0, 0, 0,
                -this._width * 0.5, this._height * 0.5, this._depth * 0.5, 0.0, 10.0, 0.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 1.0, 1.0, 0, 0,

                -this._width * 0.5, this._height * 0.5, this._depth * 0.5, 0.0, 10.0, 0.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 1.0, 1.0, 0, 0,
                this._width * 0.5, this._height * 0.5, this._depth * 0.5, 0.0, 10.0, 0.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 0.0, 1.0, 0, 0,
                this._width * 0.5, this._height * 0.5, -this._depth * 0.5, 0.0, 10.0, 0.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 0.0, 0.0, 0, 0,

                -this._width * 0.5, this._height * 0.5, -this._depth * 0.5, -10.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 0.0, 0.0, 0, 0,
                -this._width * 0.5, -this._height * 0.5, -this._depth * 0.5, -10.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 1.0, 0.0, 0, 0,
                -this._width * 0.5, -this._height * 0.5, this._depth * 0.5, -10.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 1.0, 1.0, 0, 0,

                - this._width * 0.5, -this._height * 0.5, this._depth * 0.5, -10.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 1.0, 1.0, 0, 0,
                -this._width * 0.5, this._height * 0.5, this._depth * 0.5, -10.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 0.0, 1.0, 0, 0,
                -this._width * 0.5, this._height * 0.5, -this._depth * 0.5, -10.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 0.0, 0.0, 0, 0
            );

            if (front) {
                this.indexData.push(
                    0, 2, 1, 3, 5, 4,
                    6, 8, 7, 9, 11, 10,
                    12, 14, 13, 15, 17, 16,
                    18, 20, 19, 21, 23, 22,
                    24, 26, 25, 27, 29, 28,
                    30, 32, 31, 33, 35, 34);
            }
            else {
                this.indexData.push(
                    0, 1, 2, 3, 4, 5,
                    6, 7, 8, 9, 10, 11,
                    12, 13, 14, 15, 16, 17,
                    18, 19, 20, 21, 22, 23,
                    24, 25, 26, 27, 28, 29,
                    30, 31, 32, 33, 34, 35);
            }

            this.buildDefaultSubGeometry();
        }
    }
}