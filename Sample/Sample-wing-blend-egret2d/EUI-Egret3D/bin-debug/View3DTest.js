/**
 *
 * @author
 *
 */
var View3DTest = (function () {
    function View3DTest() {
        this.isRotationX = false;
        this.isRotationY = false;
        this.isRotationZ = false;
        this.rotationXSpeed = 0.5;
        this.rotationYSpeed = 0.5;
        this.rotationZSpeed = 0.5;
        ///创建Canvas对象。
        this._egret3DCanvas = new egret3d.Egret3DCanvas();
        ///Canvas的起始坐标，页面左上角为起始坐标(0,0)。
        this._egret3DCanvas.x = 0;
        this._egret3DCanvas.y = 0;
        ///设置Canvas页面尺寸。
        this._egret3DCanvas.width = 480;
        this._egret3DCanvas.height = 800;
        ///创建View3D对象,页面左上角为起始坐标(0,0),其参数依次为:
        ///@param x: number 起始坐标x,
        ///@param y: number 起始坐标y
        ///@param  width: number 显示区域的宽
        ///@param  height: number 显示区域的高
        this._view3D = new egret3d.View3D(0, 0, 480, 800);
        ///当前对象对视位置,其参数依次为:
        ///@param pos 对象的位置
        ///@param target 目标的位置
        this._view3D.camera3D.lookAt(new egret3d.Vector3D(200, 200, -1000), new egret3d.Vector3D(0, 0, 0));
        ///View3D的背景色设置
        this._view3D.backColor = 0xffffffff;
        ///将View3D添加进Canvas中
        this._egret3DCanvas.addView3D(this._view3D);
        this.CreatCube();
        this.CreatGrid();
        this.CreatSky();
        ///启动Canvas。
        this._egret3DCanvas.start();
        ///注册每帧更新，让cube进行旋转
        this._egret3DCanvas.addEventListener(egret3d.Event3D.ENTER_FRAME, this.update, this);
        ///设置window resize事件
        egret3d.Input.addEventListener(egret3d.Event3D.RESIZE, this.OnWindowResize, this);
    }
    var d = __define,c=View3DTest,p=c.prototype;
    p.CreatCube = function () {
        ///创建颜色材质
        var mat_0 = new egret3d.TextureMaterial();
        ///创建立方体对象
        var geometery_0 = new egret3d.CubeGeometry(150, 150, 150);
        ///通过材质和立方体对象生成Mesh
        this._cube = new egret3d.Mesh(geometery_0, mat_0);
        ///将mesh插入view3D
        this._view3D.addChild3D(this._cube);
    };
    /**
   * @language zh_CN
   * 创建天空盒子
   * @version Egret 3.0
   * @platform Web,Native
   */
    p.CreatSky = function () {
        ///天空贴图用于Sky类使用，其内部是将6张HTMLImageElement（网页图片元素）封装到CubeTexture对象，CubeTexture为引擎内部使用对象
        //* 需要在html中已有 < /p>
        //  < pre >
        //      <img id="t1" src= "image_front.png" />
        //      <img id="t2" src= "image_back.png" />
        //      <img id="t3" src= "image_left.png" />
        //      <img id="t4" src= "image_right.png" />
        //      <img id="t5" src= "image_up.png" />
        //      <img id="t6" src= "image_down.png" />
        //  </pre>
        var cubeTexture = egret3d.CubeTexture.createCubeTexture(document.getElementById("f"), document.getElementById("b"), document.getElementById("l"), document.getElementById("r"), document.getElementById("u"), document.getElementById("d"));
        ///创建天空盒
        var sky = new egret3d.Sky(new egret3d.CubeTextureMaterial(cubeTexture), this._view3D.camera3D);
        ///将天空盒子插入view3D
        this._view3D.addChild3D(sky);
        ///启动Canvas。
        this._egret3DCanvas.start();
    };
    /**
   * @language zh_CN
   * 创建纯色网格地面
   * @version Egret 3.0
   * @platform Web,Native
   */
    p.CreatGrid = function () {
        ///生成面板
        var mat_1 = new egret3d.ColorMaterial(0xff000000);
        var geometery_1 = new egret3d.PlaneGeometry(3000, 10000);
        var plane = new egret3d.Mesh(geometery_1, mat_1);
        plane.y = -150;
        this._view3D.addChild3D(plane);
    };
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
    p.update = function (e) {
        ///旋转
        if (this.isRotationX) {
            this._cube.rotationX += this.rotationXSpeed;
        }
        if (this.isRotationY) {
            this._cube.rotationY += this.rotationYSpeed;
        }
        if (this.isRotationZ) {
            this._cube.rotationZ += this.rotationZSpeed;
        }
    };
    return View3DTest;
}());
egret.registerClass(View3DTest,'View3DTest');
//# sourceMappingURL=View3DTest.js.map