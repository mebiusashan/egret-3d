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
    export class Wireframe extends Mesh {

        /**
         * @language zh_CN
         * @version Egret 3.0
         * @platform Web,Native
         */
        constructor() {
            super(new Geometry(), new ColorMaterial(0xff0000));
            this.material.drawMode = DrawMode.LINES;
            this.geometry.vertexFormat = VertexFormat.VF_POSITION | VertexFormat.VF_NORMAL | VertexFormat.VF_COLOR | VertexFormat.VF_UV0;
        }
    }
}