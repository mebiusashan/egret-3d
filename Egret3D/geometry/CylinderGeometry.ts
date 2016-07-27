module egret3d {
    /**
     * @language zh_CN
     * @class egret3d.CylinderGeometry
     * @classdesc
     * CylinderGeometry类 表示圆柱体</p>
     *
     * 示例：</p>
     * 用 CylinderGeometry 对象创建一个mesh，并给予默认纹理材质TextureMaterial（默认为棋盘格纹理)</p>
     <pre>
     var box: egret3d.Mesh = new egret3d.Mesh( new egret3d.CylinderGeometry(), new egret3d.TextureMaterial() );
     </pre>
     * @see egret3d.Geometry
     * @version Egret 3.0
     * @platform Web,Native
     */
    export class CylinderGeometry extends Geometry {

        private _height: number;
        /**
        * @language zh_CN
        * 圆柱体高度
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get height(): number {
            return this._height;
        }

        private _radius: number;
        /**
        * @language zh_CN
        * 圆柱体半径
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get radius(): number {
            return this._radius;
        }

        /**
        * @language zh_CN
        * 构造函数
        * @param height 宽度 默认为100
        * @param radius 半径 默认为200
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor(height: number = 100, radius: number = 200) {
            super();
            this._height = height;
            this._radius = radius;
            this.buildGeomtry();
        }

        /**
        * @private
        * @language zh_CN
        * 生成网格
        */
        public buildGeomtry() {
            this.vertexFormat = VertexFormat.VF_POSITION | VertexFormat.VF_NORMAL | VertexFormat.VF_TANGENT | VertexFormat.VF_COLOR | VertexFormat.VF_UV0 | VertexFormat.VF_UV1;

            this.verticesData = new Array<number>();
            this.indexData = new Array<number>();

            var m_nSegments: number = 20;

            var nCurrentSegment: number = 20;

            var rDeltaSegAngle: number = (2.0 * Math.PI / m_nSegments);
            var rSegmentLength: number = 1.0 / m_nSegments;

            for (nCurrentSegment = 0; nCurrentSegment < m_nSegments; nCurrentSegment++) {
                var x0: number = this._radius * Math.sin(nCurrentSegment * rDeltaSegAngle);

                var z0: number = this._radius * Math.cos(nCurrentSegment * rDeltaSegAngle);


                this.verticesData.push(
                    x0, 0.0 + (this._height / 2.0), z0, x0, 0.0, z0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 1.0, 0.0, 0, 0,
                    x0, 0.0 - (this._height / 2.0), z0, x0, 0.0, z0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 1.0, 0.0, 0, 0);
            }

            var len_base = this.verticesData.length / 17;

            var topCenter = len_base;
            this.verticesData.push(0.0, 0.0 - (this._height / 2.0), 0.0, 0.0, -1.0, 0.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 1.0, 0.0, 0, 0);

            var buttomCenter = len_base + 1;
            this.verticesData.push(0.0, 0.0 + (this._height / 2.0), 0.0, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1, 1, 1, 1, 1.0, 0.0, 0, 0);


            for (var i = 0; i < len_base; i++) {
                if ((i & 1) != 0) {
                    this.indexData.push(

                        i,
                        i + 1 >= len_base ? i + 1 - len_base : i + 1,
                        i + 2 >= len_base ? i + 2 - len_base : i + 2,

                        topCenter,
                        i,
                        i + 2 >= len_base ? i + 2 - len_base : i + 2

                    );
                } else {
                    this.indexData.push(

                        i + 1 >= len_base ? i + 1 - len_base : i + 1,
                        i,
                        i + 2 >= len_base ? i + 2 - len_base : i + 2,


                        i,
                        buttomCenter,
                        i + 2 >= len_base ? i + 2 - len_base : i + 2

                    );
                }
            }
            var subGeometry: SubGeometry = new SubGeometry();
            subGeometry.geometry = this;
            subGeometry.start = 0;
            subGeometry.count = this.indexData.length;
            this.subGeometrys.push(subGeometry);
        }
    }
} 