module egret3d {
    // 播放声音
    export class Class_Audio extends Class_View3D {

        private view1: View3D;
        private cameraCtl: LookAtController;

        protected _manager: egret3d.AudioManager;
        protected _sound: egret3d.Sound;
        protected _channel: egret3d.Channel;
        protected _channel3d: egret3d.Channel3d;

        constructor() {
            super();

            var view1: View3D = new View3D(0, 0, window.innerWidth, window.innerHeight);
            //view1.camera3D.lookAt(new Vector3D(0, 1000, -1000), new Vector3D(0, 0, 0));
            view1.backColor = 0xff7f7f00;

            this._egret3DCanvas.addView3D(view1);
            this.view1 = view1;

            this.view1.camera3D.z = -1000;

            var bgImg: HTMLImageElement = <HTMLImageElement>document.getElementById("bg");
            var tex: ImageTexture = new ImageTexture(bgImg);
            this.view1.backImage = tex;

            this.cameraCtl = new LookAtController(view1.camera3D, new Object3D());
            this.cameraCtl.distance = 1000;
            this.cameraCtl.rotationX = 60;

            var wir: egret3d.Wireframe = new egret3d.Wireframe();
            wir.material.diffuseColor = 0xffffff;
            wir.material.ambientColor = 0xffffff;
            this.view1.addChild3D(wir);

            var geom: egret3d.Geometry = wir.geometry;

            var width: number = 200;
            var height: number = 200;

            var row: number = 10;
            var col: number = 10;

            var point_row: number = row + 1;
            var point_col: number = col + 1;

            var vb: Array<number> = new Array<number>();
            var ib: Array<number> = new Array<number>();

            for (var i: number = 0; i < point_row; ++i) {
                vb.push(-width * col / 2, 0, height * i - height * row / 2);
                vb.push(width * col / 2, 0, height * i - height * row / 2);
            }

            for (var i: number = 0; i < point_col; ++i) {
                vb.push(width * i - width * col / 2, 0, height * col / 2);
                vb.push(width * i - width * col / 2, 0, -height * col / 2);
            }

            for (var i: number = 0; i < vb.length / 3; ++i) {
                ib.push(i);
            }

            geom.setVerticesForIndex(0, egret3d.VertexFormat.VF_POSITION, vb, vb.length / 3);
            geom.setVertexIndices(0, ib);

            var box: Mesh = new Mesh(new CubeGeometry(), new TextureMaterial());
            this.view1.addChild3D(box);

            this._egret3DCanvas.addEventListener(Event3D.ENTER_FRAME, this.update, this);



            //生成一个新的 Sound 对象 ，将声音数据加载到 Sound 对象中。
            this._sound = egret3d.AudioManager.instance.createSound("resource/audio/天空の城ラピュタ.mp3", () => this._success, () => this._error);

            this._manager = egret3d.AudioManager.instance;
            // 生成一个新的 Channel 对象来播放该声音。
            this._channel = this._manager.playSound(this._sound, { "volume": 1, "loop": true });

            // 生成一个新的 Channel3d 对象来播放该声音。
            this._channel3d = this._manager.playSound3d(this._sound, new egret3d.Vector3D(0, 0, 0), { "volume": 1, "loop": true });
            this._channel3d.maxDistance = 1000;
            this._channel3d.minDistance = 0;
            //Channel 可停止声音并监控音量。
        }

        private _success(): void {
            console.log("loadSuccess")
        }

        private _error(): void {
            console.log("loadError")
        }

        private _line: Array<egret3d.Wireframe> = new Array<egret3d.Wireframe>();

        protected onLoad(e: LoaderEvent3D) {
            var m: Mesh = new Mesh(e.loader.data, new TextureMaterial());
            this.view1.addChild3D(m);
        }

        public update(e: Event3D) {
            this.cameraCtl.update();
            this._channel3d.listener = this.view1.camera3D.position;
        }
    }
}