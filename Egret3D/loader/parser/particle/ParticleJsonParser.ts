module egret3d {
    /**
     * @private 
     * @language zh_CN
     * @class egret3d.ParticleJsonParser
     * @classdesc
     * 用 ParticleJsonParser 解析粒子文件
     */
    export class ParticleJsonParser {

        /**
         * @language zh_CN
         * 粒子的版本号
         * @version Egret 3.0
         * @platform Web,Native
         */
        public version: string;

        private _particleData: ParticleData;
        /**
        * @language zh_CN
        * constructor 
        */
        constructor() {

        }

        /**
         * @language zh_CN
         * @param json 粒子特效的数据解析
         * @returns ParticleData
         */
        public parse(json: any, data: ParticleData): void {

            this._particleData = data;

            this.version = json.version + "";
            //property
            var propertyNode: Object = json.property;
            this.parseProperty(propertyNode);
            //emission
            var emissionNode: Object = json.emission;
            this.parseEmission(emissionNode);
            //life
            var life: Object = json.life;
            this.parseLife(life);
            //shape
            var shape: Object = json.shape;
            this.parseShape(shape);
            //rotationBirth
            var rotationBirth: Object = json.rotationBirth;
            this.parseRotationBirth(rotationBirth);
            //scaleBirth
            var scaleBirth: Object = json.scaleBirth;
            this.parseScaleBirth(scaleBirth);
            //geometry
            var geometry: Object = json.geometry;
            this.parseGeometry(geometry);
            //moveSpeed
            var moveSpeed: Object = json.moveSpeed;
            this.parseMoveSpeed(moveSpeed);
            //followTarget
            var followTarget: Object = json.followTarget;
            this.parseFollowTarget(followTarget);
            //parseBezierNode
            var scaleBezier: Object = json.scaleBezier;
            this.parseScaleBeizer(scaleBezier);
            //rotationSpeed
            var rotationSpeed: Object = json.rotationSpeed;
            this.parseRotationSpeed(rotationSpeed);
            //colorOffset
            var colorOffset: Object = json.colorOffset;
            this.parseColorOffset(colorOffset);
            //material
            var material: Object = json.mat;
            //textureSheet
            var textureSheet: Object = json.textureSheet;
            this.parseTextureSheet(textureSheet);

        }

        /**
         * @private
         * 解析基础属性
         */
        private parseProperty(node: any): void {
            var property: ParticleDataProperty = this._particleData.property;

            property.particleCount = Number(node.particleCount);
            property.prewarm = node.prewarm;
            property.bounds = this.parseVector3D(node.bounds, property.bounds);

            //color
            property.colorType = ParticleBirthColorType[node.colorType + ""];
            var colorConst1: Object = node.colorConst1;
            var colorConst2: Object = node.colorConst2;
            var gradients1: Object = node.colorGradients1;
            var gradients2: Object = node.colorGradients2;
            var tintColor: Object = node.tintColor;
            this.parseColorProperty(property, colorConst1, colorConst2, gradients1, gradients2, tintColor);
            //gravity
            property.gravity = Number(node.gravity);
            //transform
            var transform: any = node.transform;
            var rotation: number[] = transform.rotation;
            var scale: number[] = transform.scale;
            var position: number[] = transform.position;

            property.rotation = this.parseVector3D(rotation, property.rotation);
            property.scale = this.parseVector3D(scale, property.scale);
            property.position = this.parseVector3D(position, property.position);

            //render
            var render: any = node.render;

            property.renderMode = ParticleRenderModeType[render.renderMode + ""];
            property.lengthScale = Number(render.lengthScale);
            property.cameraScale = Number(render.cameraScale);
            property.speedScale = Number(render.speedScale);
            //meshFile
            property.meshFile = render.meshFile;
            if (property.meshFile == "") {
                property.meshFile = null;
            }
            //fudge
            property.sortingFudge = Number(node.sortingFudge);
        }

        /**
         * @private
         * 解析颜色属性
         */
        private parseColorProperty(property: ParticleDataProperty, c1: Object, c2: Object, cg1: Object, cg2: Object, tintColor: Object): void {
            if (c1) {
                property.colorConst1 = Color.createColor(Number(c1));
            }
            if (c2) {
                property.colorConst2 = Color.createColor(Number(c2));
            }
            if (cg1) {
                property.colorGradients1 = this.parseGradientsColor(cg1, property.colorGradients1);
            }
            if (cg2) {
                property.colorGradients2 = this.parseGradientsColor(cg2, property.colorGradients2);
            }
            if (tintColor) {
                property.tintColor = Color.createColor(Number(tintColor));
            }

        }


        /**
         * @private
         * 解析发射器数据
         */
        private parseEmission(node: any): void {
            var emission: ParticleDataEmission = this._particleData.emission;
            emission.type = ParticleValueType[node.type + ""];
            emission.rate = Number(node.rate);
            //bursts
            var bursts: any = node.bursts;
            var i: number = 0;
            var count: number = 0;
            var pt: Point;
            var item: number[];
            if (bursts) {
                emission.bursts = [];
                for (i = 0, count = bursts ? bursts.length : 0; i < count; i++) {
                    item = bursts[i];
                    pt = new Point();
                    pt.x = Number(item[0]);
                    pt.y = Number(item[1]);
                    emission.bursts.push(pt);

                }
            }
            //bezier
            var bezier: any = node.bezier;
            if (emission.type == ParticleValueType.OneBezier) {
                emission.bezier = this.parseBezierData(bezier);
            }

        }

        /**
         * @private
         * 解析生命周期相关数据
         */
        private parseLife(node: any): void {
            var life: ParticleDataLife = this._particleData.life;
            life.type = ParticleValueType[node.type + ""];
            life.min = Number(node.min);
            life.max = Number(node.max);
            life.bezier1 = this.parseBezierData(node.bezier1);
            life.bezier2 = this.parseBezierData(node.bezier2);

            life.duration = Number(node.duration);
            life.delay = Number(node.delay);
            life.loop = node.loop;

        }

        /**
         * @private
         * 解析发射器的范围类型
         */
        private parseShape(node: any): void {
            if (node == null)
                return;
            var shape: ParticleDataShape = this._particleData.shape;
            shape.type = ParticleDataShapeType[node.type + ""];
            shape.randomDirection = node.randomDirection;
            shape.emitFromShell = node.emitFromShell;
            //cube
            var cube: number[] = node.cube;
            if (cube) {
                shape.cubeW = Number(cube[0]);
                shape.cubeH = Number(cube[1]);
                shape.cubeD = Number(cube[2]);
            }
            //sphere
            shape.sphereRadius = Number(node.sphereRadius);
            //hemiSphereRadius
            shape.hemiSphereRadius = Number(node.hemiSphereRadius);
            //cone
            if (shape.type == ParticleDataShapeType.Cone) {
                var cone: any = node.cone;
                shape.coneType = ParticleConeShapeType[cone.type + ""];
                shape.coneLength = Number(cone.length);
                shape.coneRadius = Number(cone.radius);
                shape.coneAngle = Number(cone.angle);
            }
            //meshType
            shape.meshType = ParticleMeshShapeType[node.meshType + ""];
            //meshFile
            shape.meshFile = node.meshFile;
            if (shape.meshFile == "") {
                shape.meshFile = null;
            }
        }
        /**
         * @private
         * 解析粒子出生的旋转信息
         */
        private parseRotationBirth(node: any): void {
            var rotationBirth: ParticleDataRotationBirth = this._particleData.rotationBirth;
            rotationBirth.type = ParticleValueType[node.type + ""];
            rotationBirth.min = Number(node.min);
            rotationBirth.max = Number(node.max);
            rotationBirth.bezier1 = this.parseBezierData(node.bezier1);
            rotationBirth.bezier2 = this.parseBezierData(node.bezier2);

        }

        /**
         * @private
         * 解析粒子出生的缩放信息
         */
        private parseScaleBirth(node: any): void {
            var scaleBirth: ParticleDataScaleBirth = this._particleData.scaleBirth;
            scaleBirth.type = ParticleValueType[node.type + ""];
            scaleBirth.min = Number(node.min);
            scaleBirth.max = Number(node.max);
            scaleBirth.bezier1 = this.parseBezierData(node.bezier1);
            scaleBirth.bezier2 = this.parseBezierData(node.bezier2);
        }

        /**
         * @private
         * 解析粒子的几何形状
         */
        private parseGeometry(node: any): void {
            var geometry: ParticleDataGeometry = this._particleData.geometry;

            var plane: number[] = node.plane;
            geometry.planeW = Number(plane[0]);
            geometry.planeH = Number(plane[1]);
        }


        /**
         * @private
         * 解析粒子速度相关信息
         */
        private parseMoveSpeed(node: any): void {
            var moveSpeed: ParticleDataMoveSpeed = this._particleData.moveSpeed;
            moveSpeed.type = ParticleValueType[node.type + ""];
            moveSpeed.min = Number(node.min);
            moveSpeed.max = Number(node.max);
            moveSpeed.bezier1 = this.parseBezierData(node.bezier1);
            moveSpeed.bezier2 = this.parseBezierData(node.bezier2);


            var velocityOverNode: any = node.velocityOver;
            if (velocityOverNode) {
                var velocityOver: VelocityOverLifeTimeData = new VelocityOverLifeTimeData();
                velocityOver.type = ParticleValueType[velocityOverNode.type + ""];
                velocityOver.min = this.parseVector3D(velocityOverNode.min, velocityOver.min);
                velocityOver.max = this.parseVector3D(velocityOverNode.max, velocityOver.max);
                velocityOver.worldSpace = velocityOverNode.worldSpace;

                velocityOver.xBezier1 = this.parseBezierData(velocityOverNode.xBezier1);
                velocityOver.yBezier1 = this.parseBezierData(velocityOverNode.yBezier1);
                velocityOver.zBezier1 = this.parseBezierData(velocityOverNode.zBezier1);
                velocityOver.xBezier2 = this.parseBezierData(velocityOverNode.xBezier2);
                velocityOver.yBezier2 = this.parseBezierData(velocityOverNode.yBezier2);
                velocityOver.zBezier2 = this.parseBezierData(velocityOverNode.zBezier2);

                moveSpeed.velocityOver = velocityOver;
            }


            var velocityForceNode: any = node.velocityForce;
            if (velocityForceNode) {
                var velocityForce: VelocityForceLifeTimeData = new VelocityForceLifeTimeData();
                velocityForce.type = ParticleValueType[velocityForceNode.type + ""];
                velocityForce.min = this.parseVector3D(velocityForceNode.min, velocityForce.min);
                velocityForce.max = this.parseVector3D(velocityForceNode.max, velocityForce.max);
                velocityForce.worldSpace = velocityForceNode.worldSpace;

                velocityForce.xBezier1 = this.parseBezierData(velocityForceNode.xBezier1);
                velocityForce.yBezier1 = this.parseBezierData(velocityForceNode.yBezier1);
                velocityForce.zBezier1 = this.parseBezierData(velocityForceNode.zBezier1);
                velocityForce.xBezier2 = this.parseBezierData(velocityForceNode.xBezier2);
                velocityForce.yBezier2 = this.parseBezierData(velocityForceNode.yBezier2);
                velocityForce.zBezier2 = this.parseBezierData(velocityForceNode.zBezier2);

                moveSpeed.velocityForce = velocityForce;
            }

            var velocityLimitNode: any = node.velocityLimit;
            if (velocityLimitNode) {
                var velocityLimit: VelocityLimitLifeTimeData = new VelocityLimitLifeTimeData();
                velocityLimit.type = ParticleValueType[velocityLimitNode.type + ""];
                velocityLimit.min = Number(velocityLimitNode.min);
                velocityLimit.max = Number(velocityLimitNode.max);

                velocityLimit.bezier1 = this.parseBezierData(velocityLimitNode.bezier1);
                velocityLimit.bezier2 = this.parseBezierData(velocityLimitNode.bezier2);

                moveSpeed.velocityLimit = velocityLimit;
            }
        }

        /**
         * @private
         * 解析全局位置or本地位置类型
         */
        private parseFollowTarget(node: any): void {
            if (node == null)
                return;
            var followTarget: ParticleDataFollowTarget = this._particleData.followTarget = new ParticleDataFollowTarget();
            followTarget.followRotation = node.followRotation;
            followTarget.followScale = node.followScale;
        }

        /**
         * @private
         * 解析粒子生命过程中缩放变化信息
         */
        private parseScaleBeizer(node: any): void {
            if (node == null)
                return;
            var scaleBesizer: ParticleDataScaleBezier = this._particleData.scaleBezier = new ParticleDataScaleBezier();
            scaleBesizer.data = this.parseBezierData(node.bezier);
        }


        /**
        * @private
        * 解析粒子旋转角速度
        */
        private parseRotationSpeed(node: any): void {
            if (node == null)
                return;
            var rotationSpeed: ParticleDataRotationSpeed = this._particleData.rotationSpeed = new ParticleDataRotationSpeed();
            rotationSpeed.type = ParticleValueType[node.type + ""];
            rotationSpeed.min = this.parseVector3D(node.min, rotationSpeed.min);
            rotationSpeed.max = this.parseVector3D(node.max, rotationSpeed.max);

            rotationSpeed.bezier1 = this.parseBezierData(node.bezier1);
            rotationSpeed.bezier2 = this.parseBezierData(node.bezier2);

        }

        /**
        * @private
        * 解析粒子生命过程中颜色渐变信息
        */
        private parseColorOffset(node: any): void {
            if (node == null)
                return;
            var colorOffset: ParticleDataColorOffset = this._particleData.colorOffset = new ParticleDataColorOffset();
            colorOffset.data = this.parseGradientsColor(node.item, colorOffset.data);
        }


        /**
        * @private
        * 解析材质球
        */
        private parseTextureSheet(node: any): ParticleDataTextureSheet {
            if (node == null)
                return null;
            var textureSheet: ParticleDataTextureSheet = this._particleData.textureSheet = new ParticleDataTextureSheet();
            textureSheet.frameType = ParticleValueType[node.frameType + ""];
            textureSheet.tileX = Number(node.tileX);
            textureSheet.tileY = Number(node.tileY);
            textureSheet.whole = node.whole;
            textureSheet.row = Number(node.row);
            textureSheet.min = Number(node.min);
            textureSheet.max = Number(node.max);
            textureSheet.circles = Number(node.circles);
            textureSheet.bezier1 = this.parseBezierData(node.bezier1);
            textureSheet.bezier2 = this.parseBezierData(node.bezier2);

            return textureSheet;
        }



        /**
        * @private
        * 解析渐变数据
        */
        private parseGradientsColor(itemList: any, dst: ColorGradients): ColorGradients {
            dst || (dst = new ColorGradients);
            var item: Object;
            var i: number = 0;
            var count: number = 0;
            var color: Color;

            for (i = 0, count = itemList ? itemList.length : 0; i < count; i++) {
                item = itemList[i];
                dst.times.push(Number(item[0]));
                color = Color.createColor(Number(item[1]));
                dst.colors.push(color);
            }

            //排序
            var sortTimes: Array<number> = dst.times.slice();
            var sortColors: Array<Color> = dst.colors.slice();
            sortTimes.sort(function (a: number, b: number) {
                return a - b;
            });

            for (i = 0, count = dst ? dst.times.length : 0; i < count; i++) {
                var index: number = sortTimes.indexOf(dst.times[i]);
                dst.colors[i] = sortColors[index];
            }
            dst.times = sortTimes;


            return dst;
        }



        /**
        * @private
        * 解析一条贝塞尔曲线数据
        */
        private parseBezierData(node: any): BezierData {
            var bzData: BezierData = new BezierData();
            if (node == null)
                return bzData;

            var item: any;
            var i: number = 0;
            var count: number = 0;
            var pt: Point;

            for (i = 0, count = node ? node.length : 0; i < count; i++) {
                item = node[i];
                pt = new Point();
                pt.x = Number(item[1]);
                pt.y = Number(item[2]);
                if (item[0] == "pos") {
                    bzData.posPoints.push(pt);
                } else {
                    bzData.ctrlPoints.push(pt);
                }
            }
            return bzData;
        }

        /**
        * @private
        * 解析一个vector3D数据
        */
        private parseVector3D(node: number[], vector: Vector3D): Vector3D {

            if (vector == null)
                vector = new Vector3D();
            if (node) {
                vector.x = Number(node[0]);
                vector.y = Number(node[1]);
                vector.z = Number(node[2]);
            }
            return vector;
        }


    }
}


