/**
* @language zh_CN
* @classdesc
* DeviceMotion事件使用示例
* @version Egret 3.0
* @platform Web,Native
*/
class SampleDeviceMotion extends SampleBase {

    /**
    * 动画播放控制器
    * @version Egret 3.0
    * @platform Web,Native
    */
    private isPlaying: boolean = false;
    /**
     * 动画播放时长
     * @version Egret 3.0
     * @platform Web,Native
     */
    private playTime: number = 0;

    /**
     * 加速度
     * @version Egret 3.0
     * @platform Web,Native
     */
    private lastX: number;
    private lastY: number;
    private lastZ: number;

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
        ///重置
        this.lastX = 0;
        this.lastY = 0;
        this.lastZ = 0;

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

        ///启动Canvas。
        this._egret3DCanvas.start();
        ///设置window resize事件
        egret3d.Input.addEventListener(egret3d.Event3D.RESIZE,this.OnWindowResize,this);

        this.CloseLoadingView();

        ///注册OrientationChange事件
        egret3d.Input.addEventListener(egret3d.OrientationEvent3D.DEVICE_MOTION,this.OnDeviceMotion,this);

        ///注册每帧更新，用于更新用户操作
        this._egret3DCanvas.addEventListener(egret3d.Event3D.ENTER_FRAME,this.update,this);

    }

    public update(e: egret3d.Event3D) {
        if(this.isPlaying) {
            if(this.playTime >= 5000) {
                this.playTime = 0;
                this.isPlaying = false;
            } else {
                this.playTime += e.delay;
            }
            ///旋转角度设置
            this._cube.rotationY += 0.5;
            this._cube.rotationX += 0.5;
        }
    }

    /**
    * @language zh_CN        
    * DeviceMotion响应事件，简易判断摇晃幅度，进行动画播放控制
    * @version Egret 3.0
    * @platform Web,Native
    */
    private OnDeviceMotion(e: egret3d.OrientationEvent3D): void {
        var speed = 25;
        var acceleration = e.accelerationIncludingGravity;//将传感值赋给acceleration 
        var x = acceleration.x;
        var y = acceleration.y;
        var z = acceleration.z;
        if(Math.abs(x - this.lastX) > speed || Math.abs(y - this.lastY) > speed) {
            // TODO:在此处可以实现摇一摇之后所要进行的数据逻辑操作 
            if(this.isPlaying == false) {
                this.isPlaying = true;
            }
        }
        this.lastX = x;
        this.lastY = y;
        this.lastZ = z;
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