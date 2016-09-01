module egret3d {
    export class Class_NavigationMesh extends Class_View3D {

        private view1: View3D;
        private _naviMesh: Navi3DMesh;
        private _pathWireFrame: Wireframe;
        private cameraCtl: LookAtController;
        constructor() {
            super();

            var view1: View3D = new View3D(0, 0, window.innerWidth, window.innerHeight);
            view1.camera3D.lookAt(new Vector3D(0, 1000, -1000), new Vector3D(0, 0, 0));
            view1.backColor = 0xff7f7f00;

            this._egret3DCanvas.addView3D(view1);
            this.view1 = view1;

            var bgImg: HTMLImageElement = <HTMLImageElement>document.getElementById("bg");
            var tex: ImageTexture = new ImageTexture(bgImg);
            this.view1.backImage = tex;

            this.cameraCtl = new LookAtController(view1.camera3D, new Object3D());
            this.cameraCtl.distance = 1000;
            this.cameraCtl.rotationX = 60;



            this.createNaviMesh();
            this.createWireFrame();

            this._egret3DCanvas.start();
            this._egret3DCanvas.addEventListener(Event3D.ENTER_FRAME, this.update, this);
        }


        private createWireFrame(): void {
            var meshVertexData = [];

            var meshIndicesData = [];


           
            var edges: Array<Navi3DEdge> = this._naviMesh.edges;
            var points: Array<Navi3DPoint> = this._naviMesh.points;

            var count: number;
            var point: Vector3D;
            var edge: Navi3DEdge;
            var i: number = 0;

            count = points.length;
            for (i = 0; i < count; i++) {
                point = points[i];
                meshVertexData.push(point.x, point.y, point.z, 1.0, 0.0, 0.0, 1.0);// x y z r g b a
            }

            count = edges.length;
            for (i = 0; i < count; i++) {
                edge = edges[i];
                meshIndicesData.push(edge.pointA.id, edge.pointB.id);
            }
        }

        private static Size: number = 200;
        private _positionY: number = -Class_NavigationMesh.Size;
        private _pointCoordList:Array<Vector3D> = new Array<Vector3D>();
        private _vertexIndexList: Array<Array<number>> = new Array<Array<number>>();

        private _scale: number = 3;
        private _xOffset: number = 0;
        private _zOffset: number = 0;
        private createNaviMesh(): void {
            var angle: number;
            var pt: Vector3D;
            var curVertexCount: number = 36 * 2;
            var i: number = 0
            for (i = 0; i < curVertexCount / 2; i++) {
                angle = i * Math.PI * 2 / 24;

                //螺旋外圈
                pt = new Vector3D(Math.sin(angle) * Class_NavigationMesh.Size, this._positionY, Math.cos(angle) * Class_NavigationMesh.Size);
                this._pointCoordList.push(pt);
                pt = pt.clone();
                this._pointCoordList[2 * i].x += this._xOffset;
                this._pointCoordList[2 * i].z += this._zOffset;

                //螺旋内圈
                pt.x /= this._scale;
                pt.z /= this._scale;
                this._scale += 0.01;

                this._pointCoordList.push(pt);
                this._pointCoordList[2 * i + 1].x += this._xOffset;
                this._pointCoordList[2 * i + 1].z += this._zOffset;
                this._xOffset += 4;
                this._zOffset += 4;

                if (i < 24) {
                    this._positionY += 20;
                }
            }


            //平面部分的三角形
            var platVertexA: Vector3D = this._pointCoordList[0];
            var platVertexB: Vector3D = this._pointCoordList[1];
            var platVertexCount: number = 0;

            for (i = 0; i < platVertexCount / 2; i++) {

                platVertexA = platVertexA.clone();
                platVertexB = platVertexB.clone();

                platVertexA.x -= 100;
                platVertexB.x -= 100;

                this._pointCoordList.unshift(platVertexA, platVertexB);
            }


            //构建三角形
            var tCount: number = curVertexCount + platVertexCount - 2;
            var indicies: Array<number>;

            for (var j: number = 0; j < tCount; j++) {
                indicies = new Array<number>();
                indicies.push(j);
                indicies.push(j + 1);
                indicies.push(j + 2);
                this._vertexIndexList.push(indicies);
            }

            this._naviMesh = new Navi3DMesh(this._pointCoordList, this._vertexIndexList);
        }


        private randomPath():void
		{
            var indexStart: number, indexEnd: number;
            indexStart = this._naviMesh.triangles.length * Math.random();
            indexEnd = this._naviMesh.triangles.length * Math.random();
            indexStart = Math.floor(indexStart);
            indexEnd = Math.floor(indexEnd);

            var startNode: Navi3DTriangle, endNode: Navi3DTriangle;

            var startPoint: Vector3D = this._naviMesh.triangles[indexStart].randomPoint();
            var endPoint: Vector3D = this._naviMesh.triangles[indexEnd].randomPoint();

            this.findPathFromPoint(startPoint, endPoint);
        }


        private findPathFromPoint(f: Vector3D, t: Vector3D): void {
            var time: number = new Date().getTime();
            console.log(f.x, f.y, f.z, t.x, t.y, t.z);
            //f.setTo(187.70807647744004, 280, 118.22329192860805);
            //t.setTo(109.09339033058711, 180.65538407432982, 127.51791953946402);
            var success: boolean = this._naviMesh.findPath(f, t, 10);
            console.log("寻路耗时：", new Date().getTime() - time);

            if (this._pathWireFrame) {
                this.view1.scene.removeChild3D(this._pathWireFrame);
                this._pathWireFrame.dispose();
                this._pathWireFrame = null;
            }
            if (success) {
                this.updatePathWireFrame(this._naviMesh.path);
            }
        }

        private updatePathWireFrame(array: Array<Vector3D>): void {
            var point: Vector3D;
            var pathVertexData = [];
            var pathIndicesData = [];

            for (var i:number = 0, count:number = array.length; i < count; i++) {
                point = array[i];
                pathVertexData.push(point.x, point.y, point.z, 0.0, 1.0, 0.0, 1.0);// x y z r g b a
                if (i < (count - 1)) {
                    pathIndicesData.push(i, i + 1);
                }
            }

        }

        private time: number = 0;
        public update(e: Event3D) {
            this.cameraCtl.update();

            var step: number = new Date().getTime() - this.time;
            if (step > 1000) {
                this.time = new Date().getTime();
                this.randomPath();
            }
           
        }
    }
}