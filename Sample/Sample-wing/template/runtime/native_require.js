
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/egret3d.js",
	"bin-debug/Main.js",
	"bin-debug/SampleBase.js",
	"bin-debug/SampleAnimation.js",
	"bin-debug/SampleCreateCube.js",
	"bin-debug/SampleCubeTransform.js",
	"bin-debug/SampleCullMode.js",
	"bin-debug/SampleDeviceMotion.js",
	"bin-debug/SampleDeviceOrientation.js",
	"bin-debug/SampleDirLight.js",
	"bin-debug/SampleEgret3DCanvas.js",
	"bin-debug/SampleEvent.js",
	"bin-debug/SampleGeometryUtil.js",
	"bin-debug/SampleMultipleView3D.js",
	"bin-debug/SampleOrientationChange.js",
	"bin-debug/SamplePointLight.js",
	"bin-debug/SampleSky.js",
	"bin-debug/SampleStaticModel.js",
	"bin-debug/SampleTextureCube.js",
	"bin-debug/SampleUvRoll.js",
	"bin-debug/SampleUvSpriteSheet.js",
	"bin-debug/SampleView3D.js",
	//----auto game_file_list end----
];

var window = this;

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    egret_native.requireFiles();
    egret.TextField.default_fontFamily = "/system/fonts/DroidSansFallback.ttf";
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 30,
		scaleMode: "noScale",
		contentWidth: 640,
		contentHeight: 960,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:30,textColor:0x00c200,bgAlpha:0.9",
		showLog: false,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel(egret.TextField.default_fontFamily, 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};