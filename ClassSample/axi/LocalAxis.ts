module egret3d {
    
    /**
    * @private
    */
    export class LocalMeshData {
        public mesh: Mesh;

        constructor(axis: string) {

            var cubeGeometry = null;

            switch (axis) {
                case "x":
                    cubeGeometry = new CubeGeometry(100, 10, 10);
                    break;
                case "y":
                    cubeGeometry = new CubeGeometry(10, 100, 10);
                    break;
                case "z":
                    cubeGeometry = new CubeGeometry(10, 10, 100);
                    break;
            }

            this.mesh = new Mesh(cubeGeometry, new TextureMaterial());
        }
    }

    /**
    * @private
    */
    export class LocalAxis extends Object3D {

        private _xyz: LocalMeshData[] = [];
        private _currentDownIndex: number = -1;
        private _currentAxisIndex: number = 0;
        private _axisColor: number[] = [0xffff0000, 0xff00ff00, 0xff0000ff];
        private _canvas3d: Egret3DCanvas = null;
        private _view3d: View3D = null;
        private _bindNode: Mesh = null;

        public constructor(canvas3d: Egret3DCanvas, view3d: View3D) {
            super();
            this._canvas3d = canvas3d;
            this._view3d = view3d;
            this.initialize();
        }

        public bind(node: Mesh): void {
            this._bindNode = node;
            this.x = node.x;
            this.y = node.y;
            this.z = node.z;
        }

        public initialize(): void {
            this._xyz.push(new LocalMeshData("x"));
            this._xyz.push(new LocalMeshData("y"));
            this._xyz.push(new LocalMeshData("z"));
            for (var i = 0; i < this._xyz.length; i++) {
                this._xyz[i].mesh.enablePick = true;
                this._xyz[i].mesh.addEventListener(PickEvent3D.PICK_DOWN, this.onPickDown, this);
                this.addChild(this._xyz[i].mesh);
            }

            Input.addEventListener(MouseEvent3D.MOUSE_DOWN, this.onMouseDown, this);
            Input.addEventListener(MouseEvent3D.MOUSE_MOVE, this.onMouseMove, this);
            Input.addEventListener(MouseEvent3D.MOUSE_UP, this.onMouseUp, this);

            this._xyz[0].mesh.material.diffuseColor = this._axisColor[0];
            this._xyz[1].mesh.material.diffuseColor = this._axisColor[1];
            this._xyz[2].mesh.material.diffuseColor = this._axisColor[2];

            Input.addEventListener(MouseEvent3D.MOUSE_MOVE, function (e: MouseEvent3D) {
                if (this._currentDownIndex == -1) {
                    var meshArray: Mesh[] = <Mesh[]>Picker.pickObject3DList(this._canvas3d, this._view3d,
                        [
                            this._xyz[0].mesh,
                            this._xyz[1].mesh,
                            this._xyz[2].mesh
                        ]);

                    var axisIndex: number = -1;

                    if (meshArray.length > 0) {
                        for (var index = 0; index < this._xyz.length; index++) {
                            if (this._xyz[index].mesh == meshArray[0]) {
                                axisIndex = index;
                                break;
                            }
                        }
                    }

                    if (this._currentAxisIndex != -1) {

                        this._xyz[this._currentAxisIndex].mesh.material.diffuseColor = this._axisColor[this._currentAxisIndex];

                        this._currentAxisIndex = -1;
                    }

                    if (axisIndex != -1) {

                        this._currentAxisIndex = axisIndex;

                        this._xyz[this._currentAxisIndex].mesh.material.diffuseColor = 0xffffff00;
                    }
                }
            }, this);
        }

        public isPick(): boolean {

            var meshArray: Mesh[] = <Mesh[]>Picker.pickObject3DList(this._canvas3d, this._view3d,
                [
                    this._xyz[0].mesh,
                    this._xyz[1].mesh,
                    this._xyz[2].mesh
                ]);

            return meshArray.length != 0;
        }

        private getCurrentIndex(mesh: Mesh): number {
            for (var i = 0; i < this._xyz.length; i++) {
                if (this._xyz[i].mesh == mesh) {
                    return i;
                }
            }
            return -1;
        }

        private caheWorldPosition: Vector3D = new Vector3D();
        private onMouseDown(e: MouseEvent3D): void {
            this.sp.x = this.position.x;
            this.sp.y = this.position.y;
            this.sp.z = this.position.z;

            this._view3d.camera3D.object3DToScreenRay(this.sp, this.sp);

            this.mousePosition.x = Input.mouseX;
            this.mousePosition.y = Input.mouseY;
            this.mousePosition.z = this.sp.z;

            this._view3d.camera3D.ScreenRayToObject3D(this.mousePosition, this.caheWorldPosition );
        }

        private mousePosition: Vector3D = new Vector3D();
        private dely: Vector3D = new Vector3D();
        private sp: Vector3D = new Vector3D();
        private onMouseMove(e: MouseEvent3D): void {
            if (this._currentDownIndex <= -1) {
                return;
            }

            this.sp.x = this.position.x;
            this.sp.y = this.position.y;
            this.sp.z = this.position.z;

            this._view3d.camera3D.object3DToScreenRay(this.sp, this.sp);

            this.mousePosition.x = Input.mouseX;
            this.mousePosition.y = Input.mouseY;
            this.mousePosition.z = this.sp.z;

            this._view3d.camera3D.ScreenRayToObject3D(this.mousePosition,this.dely);

            this.dely.x = this.dely.x - this.caheWorldPosition.x;
            this.dely.y = this.dely.y - this.caheWorldPosition.y;
            this.dely.z = this.dely.z - this.caheWorldPosition.z;

            //console.log("pvec:" + this.sp.toString());
            //console.log("pvec(" + pvec.x * this._view3d.width + " , " + pvec.y * this._view3d.height, " , " + pvec.z + ")");
            //console.log("dely:" + dely.toString());

            switch (this._currentDownIndex) {
                case 0://x;
                    this.x += this.dely.x;
                    if (this._bindNode != null) {
                        this._bindNode.x += this.dely.x;
                    }
                    break;
                case 1://y;
                    this.y += this.dely.y;
                    if (this._bindNode != null) {
                        this._bindNode.y += this.dely.y;
                    }
                    break;
                case 2://z;
                    this.z += this.dely.z;
                    if (this._bindNode != null) {
                        this._bindNode.z += this.dely.z;
                    }
                    break;
            }

            this._view3d.camera3D.ScreenRayToObject3D(new Vector3D(Input.mouseX, Input.mouseY, this.mousePosition.z), this.caheWorldPosition);
        }

        private onMouseUp(e: MouseEvent3D): void {
            this._currentDownIndex = -1;
        }

        private onPickDown(e: MouseEvent3D): void {

            var index: number = this.getCurrentIndex(e.target);

            this._currentDownIndex = index;

            if (index <= -1) {
                return;
            }

            switch (this._currentDownIndex) {
                case 0://x;
                    break;
                case 1://y;
                    break;
                case 2://z;
                    break;
            }
        }
    }
}