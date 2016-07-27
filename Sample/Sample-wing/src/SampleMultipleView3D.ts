/**
 * @language zh_CN
 * @classdesc
 * 创建多个个View3D使用示例
 * @version Egret 3.0
 * @platform Web,Native
 */
class SampleMultipleView3D extends SampleBase {
    /**
    * Canvas操作对象
    * @version Egret 3.0
    * @platform Web,Native
    */
    protected _egret3DCanvas: egret3d.Egret3DCanvas;

    protected _cubeArray: Array<egret3d.Mesh>;


    public constructor() {

        super();

        this._cubeArray = new Array<egret3d.Mesh>();

        ///创建Canvas对象。
        this._egret3DCanvas = new egret3d.Egret3DCanvas();
        ///Canvas的起始坐标，页面左上角为起始坐标(0,0)。
        this._egret3DCanvas.x = 0;
        this._egret3DCanvas.y = 0;
        ///设置Canvas页面尺寸。
        this._egret3DCanvas.width = window.innerWidth;
        this._egret3DCanvas.height = window.innerHeight;
        ///每个view3d的显示大小
        var viewHeight = window.innerHeight * 0.5;
        var viewWidth = window.innerWidth * 0.5;
        ///背景色数组
        var colors: Array<number> = new Array<number>();
        colors.push(0xff000000);
        colors.push(0xffffffff);
        colors.push(0xffffffff);
        colors.push(0xff000000);
        ///生成四个view3d填充Canvas
        for(var i: number = 0;i < 2;i++) {
            for(var j: number = 0;j < 2;j++) {

                ///起始坐标计算
                var index = i * 2 + j;
                var startPosX = j * viewWidth;
                var startPosY = i * viewHeight;
                ///创建View3D对象,页面左上角为起始坐标(0,0),其参数依次为:
                ///@param x: number 起始坐标x,
                ///@param y: number 起始坐标y
                ///@param  width: number 显示区域的宽
                ///@param  height: number 显示区域的高
                var view3D = new egret3d.View3D(startPosX,startPosY,viewWidth,viewHeight);
                ///当前对象对视位置,其参数依次为:
                ///@param pos 对象的位置
                ///@param target 目标的位置
                view3D.camera3D.lookAt(new egret3d.Vector3D(0,0,-1000),new egret3d.Vector3D(0,0,0));
                ///View3D的背景色设置
                view3D.backColor = colors[index];
                ///将View3D添加进Canvas中
                this._egret3DCanvas.addView3D(view3D);

                ///创建颜色材质
                var mat: egret3d.TextureMaterial = new egret3d.TextureMaterial();
                ///创建立方体对象
                var geometery: egret3d.CubeGeometry = new egret3d.CubeGeometry();
                ///通过材质和立方体对象生成Mesh
                var cube = new egret3d.Mesh(geometery,mat);
                ///将mesh插入view3D
                view3D.addChild3D(cube);

                this._cubeArray.push(cube);

            }
        }
        ///启动Canvas。
        this._egret3DCanvas.start();
        this._egret3DCanvas.addEventListener(egret3d.Event3D.ENTER_FRAME,this.update,this);



        this.CloseLoadingView();
    }


    public update(e: egret3d.Event3D) {
      
        ///旋转
        var len = this._cubeArray.length;
        for(var i = 0;i < len;i++) {
            this._cubeArray[i].rotationY += 0.5;
        }
    }
}    