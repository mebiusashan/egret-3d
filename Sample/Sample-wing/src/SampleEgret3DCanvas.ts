/**
 * @language zh_CN
 * @classdesc
 * Canvas使用示例
 * @version Egret 3.0
 * @platform Web,Native
 */
class SampleEgret3DCanvas extends SampleBase {

    /**
    * 3d画布对象
    * @version Egret 3.0
    * @platform Web,Native
    */
    protected _egret3DCanvas: egret3d.Egret3DCanvas;

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
        ///启动Canvas。
        this._egret3DCanvas.start();

        this.CloseLoadingView();

    }
}   