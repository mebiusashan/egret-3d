module egret3d {
    export class WireframeLine extends Wireframe{

        private _vb: Array<number> 
        private _ib: Array<number> 

        private _start: Vector3D;
        private _end: Vector3D;
        private _startColor: number = 0xff00ff00;
        private _endColor: number = 0xff0000ff;
        constructor(start: Vector3D, end: Vector3D, startColor: number = 0xff00ff00, endColor: number = 0xff0000ff ) {
            super();
            this._vb = new Array<number>();
            this._ib = new Array<number>();

            this.material.diffuseColor = 0xffffffff;

            this.setStartAndEndPosition(start, end);
            this.setStartAndEndColor(startColor, endColor);
        }

        public setStartAndEndPosition(start: Vector3D, end: Vector3D) {
            this._start = start; 
            this._end = end; 
            this.updateLine();
        }

        public setStartAndEndColor(startColor: number, endColor: number) {
            this._startColor = startColor;
            this._endColor = endColor;
            this.updateLine();
        }

        private updateLine() {
            this._vb.length = 0;
            this._ib.length = 0;

            var a = Color.getColor(this._startColor);
            var b = Color.getColor(this._endColor);

            this._vb.push(this._start.x, this._start.y, this._start.z, a.x, a.y, a.z, a.w); 
            this._vb.push(this._end.x, this._end.y, this._end.z, b.x, b.y, b.z, b.w); 

            for (var i: number = 0; i < this._vb.length / 3; ++i) {
                this._ib.push(i);
            }

            this.geometry.setVerticesForIndex(0, VertexFormat.VF_POSITION | VertexFormat.VF_COLOR, this._vb, this._vb.length / 7);
            this.geometry.setVertexIndices(0, this._ib);
        }

    }
}