module egret3d{

    /**
    * @class egret3d.Picker
    * @classdesc
    * 射线对场景中的实体对像进行检测。</p>
    * 以摄像机向场景中产生的一条射线对所有场景中的对象进行拾取。</p>
    * 根据性能的需要分为几种拣选类型。</p>
    * 1.包围盒拣选。</p>
    * 2.模型拣选返回模型拣选到的位置。</p>
    * 3.模型拣选返回模型拣选到的UV坐标。</p>
    *
    * @see egret3d.Ray
    * @see egret3d.PickType
    *
    * 示例:鼠标拣选模型,拣选到的进行绕Y轴旋转
    * @includeExample core/traverse/Picker.ts
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class Picker {
        protected static ray: Ray = new Ray();
                                                        
        /**
        * @language zh_CN
        * 返回鼠标拾取对象得到的所有对象,调用之前到设置被拣选对象的pickType.
        * @param canvas 当前canvas
        * @param view 当前检测view
        * @param objects 检测的对象列表
        * @param childBox 检测是否用子包围盒 默认false就可以了 
        * @returns 拾取的object列表
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static pickObject3DList(canvas: Egret3DCanvas, view:View3D, objects: Array<IRender>, childBox:boolean = false, target:Array<IRender> = null): Array<IRender> {
            if (!target) {
                target = new Array<IRender>(); 
            }
            target.length = 0;
            var ray: Ray = this.ray;

            if (Input.mouseX < view.x || Input.mouseX > x + view.width || Input.mouseY < view.y || Input.mouseY > y + view.height) {
                return target;
            }

            var x: number = Input.mouseX - view.x;
            var y: number = Input.mouseY - view.y;


            ray.CalculateAndTransformRay(view.width, view.height, view.camera3D.modelMatrix, view.camera3D.projectMatrix, x, y);
            for (var i: number = 0; i < objects.length; ++i) {
                var renderItem: IRender = objects[i];
                var inPos: Vector3D = new Vector3D();
                switch (renderItem.pickType) {
                    case PickType.BoundPick:
                        if (renderItem.bound != null) {
                            var bound: Bound = renderItem.bound;
                            if (childBox) {
                                bound = renderItem.currentBound;
                                if (bound) {
                                    if (ray.IntersectMesh(bound.vexData, bound.indexData, bound.vexLength, bound.indexData.length / 3, 0, renderItem.modelMatrix, renderItem.pickResult)) {
                                        target.push(objects[i]);
                                    }
                                }
                            }
                            else {
                                if (ray.IntersectMesh(bound.vexData, bound.indexData, bound.vexLength, bound.indexData.length / 3, 0, renderItem.modelMatrix, renderItem.pickResult)) {
                                    target.push(objects[i]);
                                }
                            }
                        }
                        break;
                    case PickType.PositionPick:

                        var uvoffset: number = 0;

                        if (renderItem.geometry.vertexFormat & VertexFormat.VF_POSITION) {
                            uvoffset += Geometry.positionSize;
                        }

                        if (renderItem.geometry.vertexFormat & VertexFormat.VF_NORMAL) {
                            uvoffset += Geometry.normalSize;
                        }

                        if (renderItem.geometry.vertexFormat & VertexFormat.VF_TANGENT) {
                            uvoffset += Geometry.tangentSize;
                        }

                        if (renderItem.geometry.vertexFormat & VertexFormat.VF_COLOR) {
                            uvoffset += Geometry.colorSize;
                        }

                        if (ray.IntersectMeshEx(renderItem, uvoffset, renderItem.pickResult)) {
                            target.push(objects[i]);
                        }
                        break;
                    case PickType.UVPick:
                        var uvoffset: number = 0;

                        if (renderItem.geometry.vertexFormat & VertexFormat.VF_POSITION) {
                            uvoffset += Geometry.positionSize;
                        }

                        if (renderItem.geometry.vertexFormat & VertexFormat.VF_NORMAL) {
                            uvoffset += Geometry.normalSize;
                        }

                        if (renderItem.geometry.vertexFormat & VertexFormat.VF_TANGENT) {
                            uvoffset += Geometry.tangentSize;
                        }

                        if (renderItem.geometry.vertexFormat & VertexFormat.VF_COLOR) {
                            uvoffset += Geometry.colorSize;
                        }
                        if (ray.IntersectMeshEx(renderItem, uvoffset, renderItem.pickResult)) {
                            target.push(objects[i]);
                        }
                        break;
                }
            }
            return target;
        }
    }
}