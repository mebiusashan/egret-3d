module egret3d {
    /*
    * @private
    */
    export class AxisMesh extends Object3D{

        private _lineX: Mesh;
        private _lineY: Mesh;
        private _lineZ: Mesh;

        private _boxX: Mesh;
        private _boxY: Mesh;
        private _boxZ: Mesh;

        private _xMat: ColorMaterial;
        private _yMat: ColorMaterial;
        private _zMat: ColorMaterial;


        constructor(axisSize: number = 100) {
            super();
            
            this._xMat = new ColorMaterial(0xff0000);
            this._xMat.ambientColor = 0xf0f0f0;

            this._yMat = new ColorMaterial(0x00ff00);
            this._yMat.ambientColor = 0xf0f0f0;

            this._zMat = new ColorMaterial(0x0000ff);
            this._zMat.ambientColor = 0xf0f0f0;

            var geom: CubeGeometry;

            var lineSize: number = axisSize / 100;
            geom = new CubeGeometry(axisSize, lineSize, lineSize);
            this._lineX = new Mesh(geom, this._xMat);
            this.addChild(this._lineX);

            geom = new CubeGeometry(lineSize, axisSize, lineSize);
            this._lineY = new Mesh(geom, this._yMat);
            this.addChild(this._lineY);

            geom = new CubeGeometry(lineSize, lineSize, axisSize);
            this._lineZ = new Mesh(geom, this._zMat);
            this.addChild(this._lineZ);

            var boxSize: number = axisSize / 25;
            var offset: number = (axisSize - boxSize) / 2;
            geom = new CubeGeometry(boxSize, boxSize, boxSize);

            this._boxX = new Mesh(geom, this._xMat);
            this._boxX.position = new Vector3D(offset, 0, 0);
            this.addChild(this._boxX);

            this._boxY = new Mesh(geom, this._yMat);
            this._boxY.position = new Vector3D(0, offset, 0);
            this.addChild(this._boxY);

            this._boxZ = new Mesh(geom, this._zMat);
            this._boxZ.position = new Vector3D(0, 0, offset);
            this.addChild(this._boxZ);

        }


    }
}