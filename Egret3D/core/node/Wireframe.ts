module egret3d {
    /**
     * @language zh_CN
     * @class egret3d.Wireframe
     * @classdesc
     * 渲染线框 以线的形式渲染顶点。
     * 使用LINES的模式进行渲染。
     * 会使用两个索引来进行渲染一个线段。
     * 实例化一个Wireframe对象之后需要把geometry顶点数据和索引数据填充
     * @see egret3d.Geometry.setVerticesForIndex
     * @see egret3d.Geometry.indexData
     * @see egret3d.Geometry
     * @version Egret 3.0
     * @platform Web,Native
     */
    export class Wireframe extends IRender {

        /**
        * @language zh_CN
        * 构造
        * @param src  画线顶点数据列表 默认为null 没有设置数据 可以调用 this.fromVertexs 或 this.fromGeometry设置数据 
        * @param vf 画线顶点数据格式 默认为 VertexFormat.VF_POSITION (x, y, z) 可以加上颜色 VertexFormat.VF_COLOR (r, g, b, a)
        * 每个顶点数据格式必须统一
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor(src: any = null, vf: VertexFormat = VertexFormat.VF_POSITION) {
            super();
            this.type = "wireframe";
            this.geometry = new Geometry();

            this.material = new ColorMaterial(0xff0000);
            this.addSubMaterial(0, this.material);

            this.material.drawMode = DrawMode.LINES;
            this.geometry.vertexFormat = VertexFormat.VF_POSITION | VertexFormat.VF_NORMAL | VertexFormat.VF_COLOR | VertexFormat.VF_UV0;
            this.fromVertexs(src, vf);
        }

        /**
        * @language zh_CN
        * 设置画线顶点数据 规则是把传入的所有点依次连接
        * @param src  画线顶点数据列表 
        * @param vf 画线顶点数据格式 默认为 VertexFormat.VF_POSITION (x, y, z) 可以加上颜色 VertexFormat.VF_COLOR (r, g, b, a)
        * 每个顶点数据格式必须统一
        * @version Egret 3.0
        * @platform Web,Native
        */
        public fromVertexs(src: any, vf: VertexFormat = VertexFormat.VF_POSITION) {
            if (src) {
                this.geometry.setVerticesForIndex(0, vf, src, src.length / GeometryUtil.fromVertexFormatToLength(vf));
                this.geometry.indexCount = (this.geometry.vertexCount - 1) * 2;
                for (var i: number = 0; i < this.geometry.vertexCount - 1; ++i) {
                    this.geometry.indexArray[i * 2 + 0] = i;
                    this.geometry.indexArray[i * 2 + 1] = i + 1;
                }
            }
        }

         /**
        * @language zh_CN
        * 设置画线顶点数据 规则是把传入的点两两相连
        * @param src  画线顶点数据列表 
        * @param vf 画线顶点数据格式 默认为 VertexFormat.VF_POSITION (x, y, z) 可以加上颜色 VertexFormat.VF_COLOR (r, g, b, a)
        * 每个顶点数据格式必须统一
        * @version Egret 3.0
        * @platform Web,Native
        */
        public fromVertexsEx(src: any, vf: VertexFormat = VertexFormat.VF_POSITION) {
            if (src) {
                this.geometry.setVerticesForIndex(0, vf, src, src.length / GeometryUtil.fromVertexFormatToLength(vf));
                this.geometry.indexCount = this.geometry.vertexCount;
                for (var i: number = 0; i < this.geometry.vertexCount; ++i) {
                    this.geometry.indexArray[i] = i;
                }
            }
        }

        /**
        * @language zh_CN
        * 设置画线顶点数据来源为Geometry 规则是按面连接
        * @param geo  画线顶点数据来源 只会用到Geometry 和坐标数据和颜色数据
        * @version Egret 3.0
        * @platform Web,Native
        */
        public fromGeometry(geo: Geometry) {
            var target: any = [];
            geo.getVertexForIndex(0, VertexFormat.VF_POSITION | VertexFormat.VF_COLOR, target, geo.vertexCount);
            this.geometry.setVerticesForIndex(0, VertexFormat.VF_POSITION | VertexFormat.VF_COLOR, target, geo.vertexCount);
            this.geometry.indexCount = geo.faceCount * 6;
            for (var i: number = 0; i < geo.faceCount; ++i) {
                var _0: number = geo.indexArray[i * 3 + 0];
                var _1: number = geo.indexArray[i * 3 + 1];
                var _2: number = geo.indexArray[i * 3 + 2];

                this.geometry.indexArray[i * 6 + 0] = _0;
                this.geometry.indexArray[i * 6 + 1] = _1;

                this.geometry.indexArray[i * 6 + 2] = _1;
                this.geometry.indexArray[i * 6 + 3] = _2;

                this.geometry.indexArray[i * 6 + 4] = _2;
                this.geometry.indexArray[i * 6 + 5] = _0;
            }
        }
    }
}