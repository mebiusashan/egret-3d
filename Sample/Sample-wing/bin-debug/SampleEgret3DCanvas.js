/**
 * @language zh_CN
 * @classdesc
 * Canvas使用示例
 * @version Egret 3.0
 * @platform Web,Native
 */
var SampleEgret3DCanvas = (function (_super) {
    __extends(SampleEgret3DCanvas, _super);
    function SampleEgret3DCanvas() {
        _super.call(this);
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
    var d = __define,c=SampleEgret3DCanvas,p=c.prototype;
    return SampleEgret3DCanvas;
}(SampleBase));
egret.registerClass(SampleEgret3DCanvas,'SampleEgret3DCanvas');
//# sourceMappingURL=SampleEgret3DCanvas.js.map