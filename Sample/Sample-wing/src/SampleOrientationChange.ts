/**
 * @language zh_CN
 * @classdesc
 * OrientationChange事件使用示例
 * @version Egret 3.0
 * @platform Web,Native
 */
class SampleOrientationChange extends SampleBase {

    /**
    * 手机朝向枚举
    * @version Egret 3.0
    * @platform Web,Native
    */
    private orientation: egret3d.Orientation;

    /**
     * 速度
     * @version Egret 3.0
     * @platform Web,Native
     */
    private static speed: number = 0.2;

    /**
    * Canvas操作对象
    * @version Egret 3.0
    * @platform Web,Native
    */
    protected _egret3DCanvas: egret3d.Egret3DCanvas;
    /**
    * View3D操作对象
    * @version Egret 3.0
    * @platform Web,Native
    */
    protected _view3D: egret3d.View3D;
    /**
    * 立方体对象
    * @version Egret 3.0
    * @platform Web,Native
    */
    protected _cube: egret3d.Mesh;

    public constructor() {


        super();

        ///创建Canvas对象。
        this._egret3DCanvas = new egret3d.Egret3DCanvas();
        ///Canvas的起始坐标，页面左上角为起始坐标(0,0)。
        this._egret3DCanvas.x = 0;
        this._egret3DCanvas.y = 0;
        ///设置Canvas页面尺寸。
        this._egret3DCanvas.width = window.innerWidth;
        this._egret3DCanvas.height = window.innerHeight;
        ///创建View3D对象,页面左上角为起始坐标(0,0),其参数依次为:
        ///@param x: number 起始坐标x,
        ///@param y: number 起始坐标y
        ///@param  width: number 显示区域的宽
        ///@param  height: number 显示区域的高
        this._view3D = new egret3d.View3D(0,0,window.innerWidth,window.innerHeight);
        ///当前对象对视位置,其参数依次为:
        ///@param pos 对象的位置
        ///@param target 目标的位置
        this._view3D.camera3D.lookAt(new egret3d.Vector3D(0,0,-1000),new egret3d.Vector3D(0,0,0));
        ///View3D的背景色设置
        this._view3D.backColor = 0xffffffff;
        ///将View3D添加进Canvas中
        this._egret3DCanvas.addView3D(this._view3D);

        ///创建TextureMaterial
        var mat: egret3d.TextureMaterial = new egret3d.TextureMaterial();
        ///创建立方体对象
        var geometery: egret3d.CubeGeometry = new egret3d.CubeGeometry();
        ///通过材质和立方体对象生成Mesh
        this._cube = new egret3d.Mesh(geometery,mat);
        ///将mesh插入view3D
        this._view3D.addChild3D(this._cube);

        ///生成运动范围底板
        var mat_1: egret3d.ColorMaterial = new egret3d.ColorMaterial(0xff000000);
        var geometery_1: egret3d.PlaneGeometry = new egret3d.PlaneGeometry(400,400);
        var plane = new egret3d.Mesh(geometery_1,mat_1);
        plane.z = 300;
        plane.rotation = new egret3d.Vector3D(-90,0,-45);
        this._view3D.addChild3D(plane);

        ///启动Canvas。
        this._egret3DCanvas.start();
        ///设置window resize事件
        egret3d.Input.addEventListener(egret3d.Event3D.RESIZE,this.OnWindowResize,this);

        this.CloseLoadingView();

        ///注册OrientationChange事件
        egret3d.Input.addEventListener(egret3d.OrientationEvent3D.ORIENTATION_CHANGE,this.OnOrientationChange,this);

        ///注册每帧更新，用于更新用户操作
        this._egret3DCanvas.addEventListener(egret3d.Event3D.ENTER_FRAME,this.update,this);

    }

    public update(e: egret3d.Event3D) {
        ///旋转角度设置
        this._cube.rotationY += 0.5;
        this._cube.rotationX += 0.5;
        this.OnMove(e.delay);
    }

    /**
    * @language zh_CN        
    * OrientationChange响应事件
    * @version Egret 3.0
    * @platform Web,Native
    */
    private OnOrientationChange(e: egret3d.OrientationEvent3D): void {
        this.orientation = e.orientation;
    }


    /**
    * @language zh_CN        
    * 运动
    * @version Egret 3.0
    * @platform Web,Native
    */
    private OnMove(time: number): void {

        if(this.orientation == null || this.orientation == undefined) {
            return;
        }

        switch(this.orientation) {
            case egret3d.Orientation.Portrait_Primary:
                if(this._cube.x != 0) {
                    this._cube.x += SampleOrientationChange.speed * time * (this._cube.x >= 0 ? -1 : 1);
                    if(this._cube.x <= 0.1 && this._cube.x >= -0.1) {
                        this._cube.x = 0;
                    }
                }
                if(this._cube.y >= -200) {
                    this._cube.y += SampleOrientationChange.speed * time * -1;
                }
                break;
            case egret3d.Orientation.Portrait_Secondary:
                if(this._cube.x != 0) {
                    this._cube.x += SampleOrientationChange.speed * time * (this._cube.x >= 0 ? -1 : 1);
                    if(this._cube.x <= 0.1 && this._cube.x >= -0.1) {
                        this._cube.x = 0;
                    }
                }
                if(this._cube.y <= 200) {
                    this._cube.y += SampleOrientationChange.speed * time * 1;
                }
                break;
            case egret3d.Orientation.Landscape_Primary:
                if(this._cube.y != 0) {
                    this._cube.y += SampleOrientationChange.speed * time * (this._cube.y >= 0 ? -1 : 1);
                    if(this._cube.y <= 0.1 && this._cube.y >= -0.1) {
                        this._cube.y = 0;
                    }
                }
                if(this._cube.x >= -200) {
                    this._cube.x += SampleOrientationChange.speed * time * -1;
                }
                break;
            case egret3d.Orientation.Landscape_Secondary:
                if(this._cube.y != 0) {
                    this._cube.y += SampleOrientationChange.speed * time * (this._cube.y >= 0 ? -1 : 1);
                    if(this._cube.y <= 0.1 && this._cube.y >= -0.1) {
                        this._cube.y = 0;
                    }
                }
                if(this._cube.x <= 200) {
                    this._cube.x += SampleOrientationChange.speed * time * 1;
                }
                break;
        }

    }

    /**
    * @language zh_CN        
    * 窗口尺寸变化事件
    * @version Egret 3.0
    * @platform Web,Native
    */
    private OnWindowResize(e: egret3d.Event3D): void {
        ///重置ui大小
        this._egret3DCanvas.width = window.innerWidth;
        this._egret3DCanvas.height = window.innerHeight;
        this._view3D.width = window.innerWidth;
        this._view3D.height = window.innerHeight;
    }
}    