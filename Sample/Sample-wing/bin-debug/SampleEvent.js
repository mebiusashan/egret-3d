/**
* @language zh_CN
* @classdesc
* 事件注册使用示例
* @version Egret 3.0
* @platform Web,Native
*/
var SampleEvent = (function (_super) {
    __extends(SampleEvent, _super);
    function SampleEvent() {
        _super.call(this);
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
        this._view3D = new egret3d.View3D(0, 0, window.innerWidth, window.innerHeight);
        ///当前对象对视位置,其参数依次为:
        ///@param pos 对象的位置
        ///@param target 目标的位置
        this._view3D.camera3D.lookAt(new egret3d.Vector3D(0, 0, -1000), new egret3d.Vector3D(0, 0, 0));
        ///View3D的背景色设置
        this._view3D.backColor = 0xffffffff;
        ///将View3D添加进Canvas中
        this._egret3DCanvas.addView3D(this._view3D);
        ///创建默认图片材质
        var mat_Cube = new egret3d.TextureMaterial();
        ///创建立方体对象
        var geometery_Cube = new egret3d.CubeGeometry();
        ///通过材质和立方体对象生成Mesh
        this._cube = new egret3d.Mesh(geometery_Cube, mat_Cube);
        ///开启拣选
        this._cube.enablePick = true;
        ///拣选事件注册
        this._cube.addEventListener(egret3d.PickEvent3D.PICK_DOWN, this.onPickDown, this);
        ///鼠标事件注册
        ///egret3d.Input.addEventListener(egret3d.MouseEvent3D.MOUSE_DOWN, this.onMouseDown, this);
        ///将mesh插入view3D
        this._view3D.addChild3D(this._cube);
        this.InitCameraCtl();
        ///启动Canvas。
        this._egret3DCanvas.start();
        this._egret3DCanvas.addEventListener(egret3d.Event3D.ENTER_FRAME, this.update, this);
        this.CloseLoadingView();
        ///设置window resize事件
        egret3d.Input.addEventListener(egret3d.Event3D.RESIZE, this.OnWindowResize, this);
    }
    var d = __define,c=SampleEvent,p=c.prototype;
    /**
    * @language zh_CN
    * 窗口尺寸变化事件
    * @version Egret 3.0
    * @platform Web,Native
    */
    p.OnWindowResize = function (e) {
        ///重置ui大小
        this._egret3DCanvas.width = window.innerWidth;
        this._egret3DCanvas.height = window.innerHeight;
        this._view3D.width = window.innerWidth;
        this._view3D.height = window.innerHeight;
    };
    /**
    * @language zh_CN
    * 初始化相机控制
    * @version Egret 3.0
    * @platform Web,Native
    */
    p.InitCameraCtl = function () {
        ///摄像机控制类
        this.cameraCtl = new egret3d.LookAtController(this._view3D.camera3D, new egret3d.Object3D());
        ///设置目标和相机的距离   
        this.cameraCtl.distance = 1000;
        ///设置相机x轴旋转
        this.cameraCtl.rotationX = 60;
    };
    /**
    * @language zh_CN
    * 拣选按下响应事件
    * @version Egret 3.0
    * @platform Web,Native
    */
    p.onPickDown = function (event3D) {
        egret3d.Debug.instance.trace("onPickDown");
        this.EspondOnAClick();
    };
    /**
    * @language zh_CN
    * 鼠标按下响应事件
    * @version Egret 3.0
    * @platform Web,Native
    */
    p.onMouseDown = function (event3d) {
        egret3d.Debug.instance.trace("onPickDown");
        this.EspondOnAClick();
    };
    /**
    * @language zh_CN
    * 反馈
    * @version Egret 3.0
    * @platform Web,Native
    */
    p.EspondOnAClick = function () {
        if (this._cube.scaleX <= 2) {
            this._cube.scaleX += 0.5;
            this._cube.scaleY += 0.5;
            this._cube.scaleZ += 0.5;
        }
        else {
            this._cube.scaleX = 1;
            this._cube.scaleY = 1;
            this._cube.scaleZ = 1;
        }
    };
    p.update = function (e) {
        this.cameraCtl.update();
    };
    return SampleEvent;
}(SampleBase));
egret.registerClass(SampleEvent,'SampleEvent');
//# sourceMappingURL=SampleEvent.js.map