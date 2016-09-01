module egret3d {
    //多view的鼠标拣选事件
    export class Class_Mesh extends Class_View3D {

        private cube: Mesh;
        private cube1: Mesh;
        private cube2: Mesh;
        private cube3: Mesh;
        constructor() {
            super();

            var mat: ColorMaterial = new ColorMaterial(0xfff000);
            var geometery: CubeGeometry = new CubeGeometry();
            this.cube = new Mesh(geometery, mat);

            var mat: ColorMaterial = new ColorMaterial(0xffFF00);
            this.cube1 = new Mesh(geometery, mat);

            var mat: ColorMaterial = new ColorMaterial(0xff00ff);
            this.cube2 = new Mesh(geometery, mat);

            var mat: ColorMaterial = new ColorMaterial(0xffffff);
            this.cube3 = new Mesh(geometery, mat);

            var bgImg: HTMLImageElement = <HTMLImageElement>document.getElementById("bg");
            var tex: ImageTexture = new ImageTexture(bgImg);

            var view1: View3D = new View3D(0, 0, 200, 200);
            view1.camera3D.lookAt(new Vector3D(0, 0, -1000), new Vector3D(0, 0, 0));
            view1.backColor = 0xffff0000;
            this._egret3DCanvas.addView3D(view1);
            view1.backImage = tex;


            var view2: View3D = new View3D(0, 200, 200, 200);
            view2.camera3D.lookAt(new Vector3D(0, 0, -1000), new Vector3D(0, 0, 0));
            view2.backColor = 0xff00ff00;
            this._egret3DCanvas.addView3D(view2);
            view2.backImage = tex;


            var view3: View3D = new View3D(200, 0, 200, 200);
            view3.camera3D.lookAt(new Vector3D(0, 0, -1000), new Vector3D(0, 0, 0));
            view3.backColor = 0xff0000ff;
            this._egret3DCanvas.addView3D(view3);
            view3.backImage = tex;

            var view4: View3D = new View3D(200, 200, 200, 200);
            view4.camera3D.lookAt(new Vector3D(0, 0, -1000), new Vector3D(0, 0, 0));
            view4.backColor = 0xffff00ff;
            this._egret3DCanvas.addView3D(view4);
            view4.backImage = tex;

            view1.addChild3D(this.cube);
            view2.addChild3D(this.cube1);
            view3.addChild3D(this.cube2);
            view4.addChild3D(this.cube3);

            this.cube.enablePick = true;
            this.cube1.enablePick = true;
            this.cube2.enablePick = true;
            this.cube3.enablePick = true;

            this.cube.addEventListener(PickEvent3D.PICK_CLICK, this.onClick, this);
            this.cube1.addEventListener(PickEvent3D.PICK_CLICK, this.onClick, this);
            this.cube2.addEventListener(PickEvent3D.PICK_CLICK, this.onClick, this);
            this.cube3.addEventListener(PickEvent3D.PICK_CLICK, this.onClick, this);

            this._egret3DCanvas.start();

            this._egret3DCanvas.addEventListener(Event3D.ENTER_FRAME, this.update, this);
        }

        protected onClick(e: PickEvent3D) {
            var m: Mesh = e.target;
            m.scaleX++;
        }

        public update(e: Event3D) {
            console.log(e.time);

            this.cube.rotationY += 0.5;
        }

    }
}