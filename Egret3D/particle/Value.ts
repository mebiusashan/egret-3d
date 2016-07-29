module egret3d {

    /**
    * @private
    */
    export enum ValueType {
        float,
        vec2,
        vec3,
        vec4
    }
        
    /**
    * @private
    */
    export class ValueShape {
        public valueType: ValueType;
        public calculate(num: number, valueShape:ValueShape = null ): any {
            new Error("asd");
            return null;
        }
        public dispose(): void {
        }
    }
        
    /**
    * @private
    */
    export class ConstValueShape extends ValueShape {
        public valueType: ValueType = ValueType.float;

        public value: number = 5;
        public calculate(num: number): any {
            var values: number[] = [];
            for (var i: number = 0; i < num; i++) {
                values.push(this.value);
            }
            return values;
        }
    }
            
    /**
    * @private
    */
    export class ConstRandomValueShape extends ValueShape {
        public valueType: ValueType = ValueType.float;

        public min: number = 0;
        public max: number = 100;
        public calculate(num: number): any {
            var values: number[] = [];
            for (var i: number = 0; i < num; i++) {
                values.push(this.min + Math.random() * (this.max - this.min));
            }
            return values;
        }
    }
            
    /**
    * @private
    */
    export class Vec2ConstValueShape extends ValueShape {
        public valueType: ValueType = ValueType.vec2;

        public minX: number = 0;
        public minY: number = 0;
        public calculate(num: number): any {
            var values: Point[] = [];
            for (var i: number = 0; i < num; i++) {
                var p: Point = new Point();
                p.x = this.minX ;
                p.y = this.minY ;
                values.push(p);
            }
            return values;
        }
    }
            
    /**
    * @private
    */
    export class Vec2ConstRandomValueShape extends ValueShape {
        public valueType: ValueType = ValueType.vec2;

        public minX: number = 0;
        public minY: number = 0;
        public maxX: number = 100;
        public maxY: number = 100;
        public calculate(num: number): any {
            var values: Point[] = [];
            for (var i: number = 0; i < num; i++) {
                var p: Point = new Point();
                p.x = this.minX + Math.random() * (this.maxX - this.minX);
                p.y = this.minY + Math.random() * (this.maxY - this.minY);
                values.push(p);
            }
            return values;
        }
    }
            
    /**
    * @private
    */
    export class Vec3ConstValueShape extends ValueShape {
        public valueType: ValueType = ValueType.vec3;

        public minX: number = 0;
        public minY: number = 0;
        public minZ: number = 0;
        public calculate(num: number): any {
            var values: Vector3D[] = [];
            for (var i: number = 0; i < num; i++) {
                var p: Vector3D = new Vector3D();
                p.x = this.minX;
                p.y = this.minY;
                p.z = this.minZ;
                values.push(p);
            }
            return values;
        }
    }
            
    /**
    * @private
    */
    export class Vec3ConstRandomValueShape extends ValueShape {
        public valueType: ValueType = ValueType.vec3;

        public minX: number = -50;
        public minY: number = -50;
        public minZ: number = -50;
        public maxX: number = 50;
        public maxY: number = 50;
        public maxZ: number = 50;
        public calculate(num: number): any {
            var values: Vector3D[] = [];
            for (var i: number = 0; i < num; i++) {
                var p: Vector3D = new Vector3D();
                p.x = this.minX + Math.random() * (this.maxX - this.minX);
                p.y = this.minY + Math.random() * (this.maxY - this.minY);
                p.z = this.minZ + Math.random() * (this.maxZ - this.minZ);
                values.push(p);
            }
            return values;
        }
    }
            
    /**
    * @private
    */
    export class CubeVector3DValueShape extends ValueShape {
        public valueType: ValueType = ValueType.vec3;

        public width: number = 100;
        public height: number = 100;
        public depth: number = 100;

        /**
        * @language zh_CN
        * @param num 
        * @param parameters [width, height, depth]
        * @returns Vector3D[] 
        */
        public calculate(num: number): any{
            var values: Vector3D[] = [];
            var val: Vector3D;
            for (var i: number = 0; i < num; i++) {
                val = new Vector3D();
                val.x = Math.random() * this.width - (this.width*0.5) ;
                val.y = Math.random() * this.height - (this.height * 0.5);
                val.z = Math.random() * this.depth - (this.depth * 0.5);
                values.push(val);
            }
            return values;
        }
    }
            
    /**
    * @private
    */
    export class PlaneValueShape extends ValueShape {
        public valueType: ValueType = ValueType.vec3;

        public width: number = 100;
        public height: number = 100;
        public calculate(num: number): any {
            var values: Vector3D[] = [];
            var pos: Vector3D;
            for (var i: number = 0; i < num; i++) {
                pos = new Vector3D();
                pos.x = Math.random() * this.width - (this.width * 0.5);
                pos.y = 0;
                pos.z = Math.random() * this.height - (this.height * 0.5);
                values.push(pos);
            }
            return values;
        }
    }


    /**
    * @private
    * 圆锥体
    */
    export class ConeValueShape extends ValueShape {
        public valueType: ValueType = ValueType.vec3;

        public radius: number = 20;
        public angle: number = 20;
        public length: number = 20;
        public coneType: number = ParticleConeShapeType.Volume;
        //圆锥的尖端延长方向的交汇点，如果angle为0，则这个交汇点是为null，若angle为90，则交汇点为（0，0，0）
        public origPoint: Vector3D;
        //用于记录这个点发出的粒子默认朝向
        public directions: Vector3D[];

        public dispose(): void {
            if (this.directions) {
                this.directions.length = 0;
            }
            this.origPoint = null;
            this.directions = null;
        }

        public calculate(count: number): any {
            if (this.angle > 90) {
                this.angle = 90;
            }
            if (this.radius <= 0) {
                this.radius = 0.01;
            }
            if (this.angle == 90) {
                this.origPoint = new Vector3D();
            } else if (this.angle == 0) {
                this.origPoint = null;
            } else {
                this.origPoint = new Vector3D();
                this.origPoint.z = - this.radius / Math.tan(this.angle * Math.PI / 180);
            }

            var values: Vector3D[];
            this.directions = [];
            if (this.coneType == ParticleConeShapeType.Volume) {
                if (this.angle == 90) {
                    values = this.calculateBase(count);
                } else {
                    values = this.calculateVolume(count);
                }
            } else if (this.coneType == ParticleConeShapeType.VolumeShell) {
                if (this.angle == 90) {
                    values = this.calculateBaseShell(count);
                } else {
                    values = this.calculateVolumeShell(count);
                }
            } else if (this.coneType == ParticleConeShapeType.Base) {
                values = this.calculateBase(count);
            } else if (this.coneType == ParticleConeShapeType.BaseShell) {
                values = this.calculateBaseShell(count);
            }
            return values;
        }

        //在底部圆的内部随机一个位置
        private calculateBase(count:number): any {
            var pos: Vector3D;
            var dir: Vector3D;
            var values: Vector3D[] = [];
            var tempAngle: number;
            var targetRadius: number;
            for (var i: number = 0; i < count; i++) {
                tempAngle = Math.random() * Math.PI * 2;
                pos = new Vector3D();
                pos.z = 0;
                targetRadius = Math.random() * this.radius;
                pos.x = Math.sin(tempAngle) * targetRadius;
                pos.y = Math.cos(tempAngle) * targetRadius;

                if (this.origPoint) {
                    dir = pos.subtract(this.origPoint);
                    dir.normalize();
                } else {
                    dir = new Vector3D(0, 0, 1);
                }

                values.push(pos);
                this.directions.push(dir);
            }

            return values;
        }

        //在底部圆的周围随机一个位置
        private calculateBaseShell(count: number): any {
            var pos: Vector3D;
            var dir: Vector3D;
            var values: Vector3D[] = [];
            var tempAngle: number;
            var targetRadius: number;
            for (var i: number = 0; i < count; i++) {
                tempAngle = Math.random() * Math.PI * 2;
                pos = new Vector3D();
                pos.z = 0;
                targetRadius = this.radius;
                pos.x = Math.sin(tempAngle) * targetRadius;
                pos.y = Math.cos(tempAngle) * targetRadius;

                if (this.origPoint) {
                    dir = pos.subtract(this.origPoint);
                    dir.normalize();
                } else {
                    dir = new Vector3D(0, 0, 1);
                }

                values.push(pos);
                this.directions.push(dir);
            }

            return values;
        }

        //在圆锥体内随机一个位置
        private calculateVolume(count: number): any {
            var pos: Vector3D;
            var dir: Vector3D;
            var values: Vector3D[] = [];
            var tempAngle: number;
            var targetRadius: number;
            for (var i: number = 0; i < count; i++) {
                tempAngle = Math.random() * Math.PI * 2;
                pos = new Vector3D();
                pos.z = this.length * Math.random();
                targetRadius = this.radius * Math.random();
                if (this.origPoint) {
                    targetRadius *= (pos.z - this.origPoint.z) / (-this.origPoint.z);
                }
                pos.x = Math.sin(tempAngle) * targetRadius;
                pos.y = Math.cos(tempAngle) * targetRadius;

                if (this.origPoint) {
                    dir = pos.subtract(this.origPoint);
                    dir.normalize();
                } else {
                    dir = new Vector3D(0, 0, 1);
                }

                values.push(pos);
                this.directions.push(dir);
            }

            return values;
        }

        //在圆锥体圆筒壳随机一个位置
        private calculateVolumeShell(count: number): any {
            var pos: Vector3D;
            var dir: Vector3D;
            var values: Vector3D[] = [];
            var tempAngle: number;
            var targetRadius: number;
            for (var i: number = 0; i < count; i++) {
                tempAngle = Math.random() * Math.PI * 2;
                pos = new Vector3D();
                pos.z = this.length * Math.random();
                targetRadius = this.radius;
                if (this.origPoint) {
                    targetRadius *= (pos.z - this.origPoint.z) / (-this.origPoint.z);
                }
                pos.x = Math.sin(tempAngle) * targetRadius;
                pos.y = Math.cos(tempAngle) * targetRadius;

                if (this.origPoint) {
                    dir = pos.subtract(this.origPoint);
                    dir.normalize();
                } else {
                    dir = new Vector3D(0, 0, 1);
                }

                values.push(pos);
                this.directions.push(dir);
            }

            return values;
        }



    }
            
  
    /**
    * @private
    * 线性分布
    */
    class LineValueShape extends ValueShape {
        public valueType: ValueType = ValueType.vec3;

        public points: Vector3D[] = [new Vector3D(), new Vector3D(100, 0, 0), new Vector3D(100, 200, 0)];

        public calculate(num: number): any {
            if (this.points.length == 1) return this.points;

            var values: Vector3D[] = [];
            var pos: Vector3D;
            var numLen: number = 0;
            var segment: number = 0;
            for (var i: number = 1; i < this.points.length; i++) {
                numLen += Vector3D.distance(this.points[i - 1], this.points[i]);
            }
            segment = numLen / num;
            var ntmp: Vector3D = new Vector3D();
            var sourceD: number = 0; 
            var nD: number = 0; 
            var len: number = 0 ; 
            for (var i: number = 1; i < this.points.length; i++) {

                ntmp.x = this.points[i].x - this.points[i - 1].x;
                ntmp.y = this.points[i].y - this.points[i - 1].y;
                ntmp.z = this.points[i].z - this.points[i - 1].z; 

                ntmp.normalize();
                ntmp.scaleBy(segment + len);

                sourceD = Vector3D.distance(this.points[i - 1], this.points[i]);
                nD = Vector3D.distance(ntmp, this.points[i]);

                if (nD > sourceD) {
                    len += nD;
                }

            }

            return values;
        }
    }
    
    /**
    * @private
    * 球表面分布
    */
    class BallSurfaceValueShape extends ValueShape {
        public valueType: ValueType = ValueType.vec3;

        //parameters = [R]
        public calculate(num: number, ...parameters): any {
            var values: Vector3D[] = [];
            var r: number = parameters[0][0];
            values = this.getPoints1(num, r);
            return values;
        }

        private getPoints1(num: number, r: number): Vector3D[] {
            var values: Vector3D[] = [];
            var x: number;
            var y: number;
            var z: number;
            var s: number;
            var n: number;
            for (var i: number = 0; i < num; i++) {
                x = Math.random() * 2 - 1;
                y = Math.random() * 2 - 1;
                z = Math.random() * 2 - 1;
                s = x * x + y * y + z * z;
                if (s > 1) {
                    i--;
                } else {
                    n = Math.sqrt(s);
                    values.push(new Vector3D(x / n * r, y / n * r, z / n * r));
                }
            }
            return values;
        }

        private getPoints2(num: number, r: number): Vector3D[] {
            var values: Vector3D[] = [];
            for (var i: number = 0; i < num; i++) {

            }
            return values;
        }
    }
        
    /**
    * @private
    * 球内分布
    */
    export class BallValueShape extends ValueShape {
        public valueType: ValueType = ValueType.vec3;

        public r: number = 10;

        //parameters = [R]
        public calculate(num: number): any {
            var values: Vector3D[] = [];
            values = this.getPoints1(num, this.r);
            return values;
        }

        private getPoints1(num: number, r: number): Vector3D[] {
            var values: Vector3D[] = [];
            var x: number;
            var y: number;
            var z: number;
            var pos: Vector3D;
            var radio: Vector3D = new Vector3D(0, 0, 0);
            for (var i: number = 0; i < num; i++) {
                x = Math.random() * 2 * r - r;
                y = Math.random() * 2 * r - r;
                z = Math.random() * 2 * r - r;
                pos = new Vector3D(x, y, z);
                if (Vector3D.distance(radio, pos) > r) {
                    i--;
                } else {
                    values.push(pos);
                }
            }
            return values;
        }
    }


    /**
    * @private
    * 半球内分布
    */
    export class HemiBallValueShape extends ValueShape {
        public valueType: ValueType = ValueType.vec3;

        public r: number = 10;

        //parameters = [R]
        public calculate(num: number): any {
            var values: Vector3D[] = [];
            values = this.getPoints1(num, this.r);
            return values;
        }

        private getPoints1(num: number, r: number): Vector3D[] {
            var values: Vector3D[] = [];
            var x: number;
            var y: number;
            var z: number;
            var pos: Vector3D;
            var radio: Vector3D = new Vector3D(0, 0, 0);
            for (var i: number = 0; i < num; i++) {
                x = Math.random() * 2 * r - r;
                y = Math.random() * 2 * r - r;
                z = Math.abs(Math.random() * 2 * r - r);
                pos = new Vector3D(x, y, z);
                if (Vector3D.distance(radio, pos) > r) {
                    i--;
                } else {
                    values.push(pos);
                }
            }
            return values;
        }
    }


    /**
    * @private
    * 平面圆
    */
    class CircleValueShape extends ValueShape {
        public valueType: ValueType = ValueType.vec3;


        public calculate(num: number, ...parameters): any {
            var values: Vector3D[];
            var tmpPar = parameters[0];
            var r: number = tmpPar[0];

            //var time: number = new Date().getTime();
            values = this.createRandomPoint1(num, r);//createRandomPoint1 比 createRandomPoint2 大部分情况下快了15% - 25%, 少数情况下略高于createRandomPoint2
            //console.log('createRandomPoint1 cost time: ', new Date().getTime() - time);
            //time = new Date().getTime();
            //this.createRandomPoint2(num, r);
            //console.log('createRandomPoint2 cost time: ', new Date().getTime() - time);
            return values;

        }
        //非稳定算法.但是因为没有三角函数和开平方的计算.反而在大部分情况下效率会更高
        private createRandomPoint1(num: number, r: number): Vector3D[] {
            var values: Vector3D[] = [];
            var d: number = r * 2;
            for (var i: number = 0; i < num; i++) {
                var x = Math.random() * d - r;
                var z = Math.random() * d - r;
                if ((x * x + z * z) > (r * r)) {
                    i--;
                } else {
                    values.push(new Vector3D(x, 0, z));
                }
            }
            return values;
        }

        private createRandomPoint2(num: number, r: number): Vector3D[] {
            var values: Vector3D[] = [];
            var pos: Vector3D;
            var tempR: number;
            var theta: number;
            for (var i: number = 0; i < num; i++) {
                pos = new Vector3D();
                tempR = Math.sqrt(Math.random()) * r;
                theta = Math.random() * 360;
                pos.x = tempR * Math.sin(theta);
                pos.z = tempR * Math.cos(theta);
                pos.y = 0;
                values.push(pos);
            }
            return values;
        }
    }


    /**
     * @private
     */
    export class Mesh3DValueShape extends ValueShape {
        private static vct1: Vector3D = new Vector3D();
        private static vct2: Vector3D = new Vector3D();
        private static vct3: Vector3D = new Vector3D();

        public valueType: ValueType = ValueType.vec3;
        public normalList: Vector3D[] = [];
        public geometry: Geometry;
        public type: number = ParticleMeshShapeType.Edge;
        /**
        * @language zh_CN
        * @param num 
        * @param parameters [width, height, depth]
        * @returns Vector3D[] 
        */
        public calculate(num: number): any {
            var values: Vector3D[] = [];
            if (this.type == ParticleMeshShapeType.Edge) {
                this.edgePosition(values, num);
            } else if (this.type == ParticleMeshShapeType.Triangle) {
                this.trianglePosition(values, num);
            } else if (this.type == ParticleMeshShapeType.Vertex) {
                this.vertexPosition(values, num);
            }
            return values;
        }


        private edgePosition(values:Vector3D[], num:number): void {
            var val: Vector3D;
            var normal: Vector3D;
            var triangleCount: number = this.geometry.indexData.length / 3;
            var vc1: Vector3D;
            var vc2: Vector3D;
            var random: number;

            var xyz: number[] = [];
            for (var i: number = 0; i < num; i++) {
                val = new Vector3D();
                values.push(val);
               

                var index0: number = 3 * Math.floor(triangleCount * Math.random());//第n个三角形
                var index1: number = index0 + 1;
                var index2: number = index0 + 2;

                //获取三角形的三个顶点
                xyz.length = 0;
                this.geometry.getVertexForIndex(index0 + 0, VertexFormat.VF_POSITION, xyz);
                Mesh3DValueShape.vct1.setTo(xyz[0], xyz[1], xyz[2]);

                xyz.length = 0;
                this.geometry.getVertexForIndex(index0 + 1, VertexFormat.VF_POSITION, xyz);
                Mesh3DValueShape.vct2.setTo(xyz[0], xyz[1], xyz[2]);

                xyz.length = 0;
                this.geometry.getVertexForIndex(index0 + 2, VertexFormat.VF_POSITION, xyz);
                Mesh3DValueShape.vct3.setTo(xyz[0], xyz[1], xyz[2]);

                normal = this.calcNormal(Mesh3DValueShape.vct1, Mesh3DValueShape.vct2, Mesh3DValueShape.vct3);
                this.normalList.push(normal);
                //在三角形上获得一条边
                random = Math.random();
                if (random < 0.333) {
                    vc1 = Mesh3DValueShape.vct1;
                    vc2 = Mesh3DValueShape.vct2;
                } else if (random < 0.666) {
                    vc1 = Mesh3DValueShape.vct2;
                    vc2 = Mesh3DValueShape.vct3;
                } else {
                    vc1 = Mesh3DValueShape.vct3;
                    vc2 = Mesh3DValueShape.vct1;
                }
                //在这条直线上随机一个位置
                vc1.lerp(vc1, vc2, Math.random());
                val.copyFrom(vc1);

                
            }
        }

        private trianglePosition(values: Vector3D[], num: number): void {
            var val: Vector3D;
            var normal: Vector3D;

            var triangleCount: number = this.geometry.indexData.length / 3;
            var vc1: Vector3D = new Vector3D();
            var vc2: Vector3D = new Vector3D();
            var random: number;

            var xyz: number[] = [];
            for (var i: number = 0; i < num; i++) {
                val = new Vector3D();
                values.push(val);

                var index0: number = 3 * Math.floor(triangleCount * Math.random());//第n个三角形
                var index1: number = index0 + 1;
                var index2: number = index0 + 2;

                //获取三角形的三个顶点
                xyz.length = 0;
                this.geometry.getVertexForIndex(index0 + 0, VertexFormat.VF_POSITION, xyz);
                Mesh3DValueShape.vct1.setTo(xyz[0], xyz[1], xyz[2]);

                xyz.length = 0;
                this.geometry.getVertexForIndex(index0 + 1, VertexFormat.VF_POSITION, xyz);
                Mesh3DValueShape.vct2.setTo(xyz[0], xyz[1], xyz[2]);

                xyz.length = 0;
                this.geometry.getVertexForIndex(index0 + 2, VertexFormat.VF_POSITION, xyz);
                Mesh3DValueShape.vct3.setTo(xyz[0], xyz[1], xyz[2]);

                normal = this.calcNormal(Mesh3DValueShape.vct1, Mesh3DValueShape.vct2, Mesh3DValueShape.vct3);
                this.normalList.push(normal);
                //在两条边上分别随机一个位置
                vc1.lerp(Mesh3DValueShape.vct1, Mesh3DValueShape.vct2, Math.random());
                vc2.lerp(Mesh3DValueShape.vct2, Mesh3DValueShape.vct3, Math.random());
                //连接两个随机位置的线段，之间随机一个位置
                val.lerp(vc1, vc2, Math.random());


            }
        }

        private vertexPosition(values: Vector3D[], num: number): void {
            var val: Vector3D;
            var normal: Vector3D;

            var triangleCount: number = this.geometry.indexData.length / 3;
            var random: number;

            var xyz: number[] = [];
            for (var i: number = 0; i < num; i++) {
                val = new Vector3D();
                values.push(val);

                var index0: number = 3 * Math.floor(triangleCount * Math.random());//第n个三角形
                var index1: number = index0 + 1;
                var index2: number = index0 + 2;

                //获取三角形的三个顶点
                xyz.length = 0;
                this.geometry.getVertexForIndex(index0 + 0, VertexFormat.VF_POSITION, xyz);
                Mesh3DValueShape.vct1.setTo(xyz[0], xyz[1], xyz[2]);

                xyz.length = 0;
                this.geometry.getVertexForIndex(index0 + 1, VertexFormat.VF_POSITION, xyz);
                Mesh3DValueShape.vct2.setTo(xyz[0], xyz[1], xyz[2]);

                xyz.length = 0;
                this.geometry.getVertexForIndex(index0 + 2, VertexFormat.VF_POSITION, xyz);
                Mesh3DValueShape.vct3.setTo(xyz[0], xyz[1], xyz[2]);

                normal = this.calcNormal(Mesh3DValueShape.vct1, Mesh3DValueShape.vct2, Mesh3DValueShape.vct3);
                this.normalList.push(normal);
                
                //在三角形上获得一条边
                random = Math.random();
                if (random < 0.333) {
                    val.copyFrom(Mesh3DValueShape.vct1);
                } else if (random < 0.666) {
                    val.copyFrom(Mesh3DValueShape.vct2);
                } else {
                    val.copyFrom(Mesh3DValueShape.vct3);
                }

            }
        }

        private static crsVector1: Vector3D = new Vector3D();
        private static crsVector2: Vector3D = new Vector3D();
        private normal: Vector3D;
        private calcNormal(pt0: Vector3D, pt1: Vector3D, pt2: Vector3D): Vector3D {
            Mesh3DValueShape.crsVector1.setTo(pt1.x - pt0.x, pt1.y - pt0.y, pt1.z - pt0.z);
            Mesh3DValueShape.crsVector2.setTo(pt2.x - pt0.x, pt2.y - pt0.y, pt2.z - pt0.z);
            this.normal = Mesh3DValueShape.crsVector1.crossProduct(Mesh3DValueShape.crsVector2);
            this.normal.normalize();
            return this.normal;
        }
        
    }


                
    /**
    * @private
    * 贝塞尔曲线, 以Y为平面, parameters = [p0, p1, p2, p3]
    */
    class BezierCurveValueShape extends ValueShape {
        public valueType: ValueType = ValueType.vec3;


        public calculate(num: number, ...parameters): any {
            var values: Vector3D[] = [];
            //var tmpPar = parameters[0];
            var tmpPar: Vector3D[] = [];
            tmpPar.push(new Vector3D(0, 0, 0));
            tmpPar.push(new Vector3D(-200, 1000, 700));
            tmpPar.push(new Vector3D(200, -50, 300));
            tmpPar.push(new Vector3D(-300, -220, 500));

            var p0: Vector3D = tmpPar[0];
            var p1: Vector3D = tmpPar[1];
            var p2: Vector3D = tmpPar[2];
            var p3: Vector3D = tmpPar[3];
            var t: number;
            var yt: number;
            var x: number;
            var y: number;
            var z: number;
            for (var i: number = 0; i < num; i++) {
                t = Math.random();
                yt = 1 - t;
                x = p0.x * yt * yt * yt + 3 * p1.x * yt * yt * t + 3 * p2.x * yt * t * t + p3.x * t * t * t;
                y = p0.y * yt * yt * yt + 3 * p1.y * yt * yt * t + 3 * p2.y * yt * t * t + p3.y * t * t * t;
                z = p0.z * yt * yt * yt + 3 * p1.z * yt * yt * t + 3 * p2.z * yt * t * t + p3.z * t * t * t;
                values.push(new Vector3D(x, y, z));
            }
            return values;
        }
    }
                
    /**
    * @private
    */
    export class Value {
        private emitter: any = {};
        private static _instance: Value = new Value();
        constructor() {
            //this.emitter[ValueType.constValue] = new ConstValueShape();
            //this.emitter[ValueType.line] = new LineValueShape();
            //this.emitter[ValueType.plane] = new PlaneValueShape();
            //this.emitter[ValueType.cube3D] = new CubeVector3DValueShape();
            //this.emitter[ValueType.sphere] = new BallValueShape();
            //this.emitter[ValueType.sphere_plane] = new BallSurfaceValueShape();
            //this.emitter[ValueType.cylinder] = new CylinderValueShape();
        }

        public static calculate(count: number, valueShape: ValueShape):Array<any> {
            return valueShape.calculate(count, valueShape);
        }

        public static getValues(count: number, valueType: ValueType, parameters ) {
        }
    }

}