module egret3d {
    /**
     * @private 
     * @language zh_CN
     * @class egret3d.ParticleXmlParser
     * @classdesc
     * 用 ParticleXmlParser 解析粒子文件
     */
    export class ParticleXmlParser {

        /**
         * @language zh_CN
         * 粒子的版本号
         * @version Egret 3.0
         * @platform Web,Native
         */
        public version: number = 1;

        private _particleData: ParticleData;
        private _xml: any;
        /**
        * @language zh_CN
        * constructor 
        */
        constructor() {

        }

        /**
         * @language zh_CN
         * @param xml 粒子特效的数据解析
         * @returns ParticleData
         */
        public parse(text: string): ParticleData {
            this._particleData = new ParticleData();

            this._xml = XMLParser.parse(text);

            this.version = Number(this.getNode(this._xml, "version").textContent);
            //property
            var propertyNode: Node = this.getNode(this._xml,"property");
            this.parseProperty(propertyNode);
            //emission
            var emissionNode: Node = this.getNode(this._xml, "emission");
            this.parseEmission(emissionNode);
            //life
            var life: Node = this.getNode(this._xml, "life");
            this.parseLife(life);
            //shape
            var shape: Node = this.getNode(this._xml, "shape");
            this.parseShape(shape);
            //rotationBirth
            var rotationBirth: Node = this.getNode(this._xml, "rotationBirth");
            this.parseRotationBirth(rotationBirth);
            //scaleBirth
            var scaleBirth: Node = this.getNode(this._xml, "scaleBirth");
            this.parseScaleBirth(scaleBirth);
            //geometry
            var geometry: Node = this.getNode(this._xml, "geometry");
            this.parseGeometry(geometry);
            //moveSpeed
            var moveSpeed: Node = this.getNode(this._xml, "moveSpeed");
            this.parseMoveSpeed(moveSpeed);
            //followTarget
            var followTarget: Node = this.getNode(this._xml, "followTarget");
            this.parseFollowTarget(followTarget);
            //parseBezierNode
            var scaleBezier: Node = this.getNode(this._xml, "scaleBezier");
            this.parseScaleBeizer(scaleBezier);
            //rotationSpeed
            var rotationSpeed: Node = this.getNode(this._xml, "rotationSpeed");
            this.parseRotationSpeed(rotationSpeed);
            //colorOffset
            var colorOffset: Node = this.getNode(this._xml, "colorOffset");
            this.parseColorOffset(colorOffset);
            //material
            var material: Node = this.getNode(this._xml, "mat");
            //textureSheet
            var textureSheet: Node = this.getNode(this._xml, "textureSheet");
            this.parseTextureSheet(textureSheet);



            this._particleData.validate();
            this._particleData.scaleBy(ParticleData.SCALE_VALUE);

            return this._particleData;
        }

        /**
         * @private
         * 解析基础属性
         */
        private parseProperty(node: Node): void {
            var property: ParticleDataProperty = this._particleData.property;

            property.particleCount = Number(this.getNode(node, "particleCount").textContent);
            property.prewarm = this.getNode(node, "prewarm").textContent == "true";

            var bounds: Node = this.getNode(node, "bounds");
            property.bounds = this.parseVector3D(bounds, property.bounds);

            //color
            property.colorType = ParticleBirthColorType[this.getNode(node, "colorType").textContent];
            var colorConst1: Node = this.getNode(node, "colorConst1");
            var colorConst2: Node = this.getNode(node, "colorConst2");
            var gradients1: Node = this.getNode(node, "colorGradients1");
            var gradients2: Node = this.getNode(node, "colorGradients2");
            //tint color
            var tintColor: Node = this.getNode(node, "tintColor");
            this.parseColorProperty(property, colorConst1, colorConst2, gradients1, gradients2, tintColor);
            //gravity
            property.gravity = Number(this.getNode(node, "gravity").textContent);
            //transform
            var transform: Node = this.getNode(node, "transform");
            var rotation: Node = this.getNode(transform, "rotation");
            var scale: Node = this.getNode(transform, "scale");
            var position: Node = this.getNode(transform, "position");

            property.rotation = this.parseVector3D(rotation, property.rotation);
            property.scale = this.parseVector3D(scale, property.scale);
            property.position = this.parseVector3D(position, property.position);

            //render
            var render: Node = this.getNode(node, "render");

            var renderMode: Node = this.getNode(render, "renderMode");
            if (renderMode) {
                property.renderMode = ParticleRenderModeType[renderMode.textContent];
            }

            var lengthScale: Node = this.getNode(render, "lengthScale");
            if (lengthScale) {
                property.lengthScale = Number(lengthScale.textContent);
            }
            var cameraScale: Node = this.getNode(render, "cameraScale");
            if (cameraScale) {
                property.cameraScale = Number(cameraScale.textContent);
            }
            var speedScale: Node = this.getNode(render, "speedScale");
            if (speedScale) {
                property.speedScale = Number(speedScale.textContent);
            }
            //meshFile
            var meshFile: Node = this.getNode(render, "meshFile");
            if (meshFile) {
                property.meshFile = meshFile.textContent;
            }

            //fudge
            var sortingFudge: Node = this.getNode(node, "sortingFudge");
            if (sortingFudge) {
                property.sortingFudge = Number(sortingFudge.textContent);
            }
        }

        /**
         * @private
         * 解析颜色属性
         */
        private parseColorProperty(property: ParticleDataProperty, c1: Node, c2: Node, cg1: Node, cg2: Node, tintColor:Node): void {
            if (c1) {
                property.colorConst1 = Color.createColor(Number(c1.textContent));
            }
            if (c2) {
                property.colorConst2 = Color.createColor(Number(c2.textContent));
            }
            if (cg1) {
                var itemList: NodeList = this.getNodeList(cg1, "item");
                property.colorGradients1 = this.parseGradientsColor(itemList, property.colorGradients1);
            }
            if (cg2) {
                var itemList: NodeList = this.getNodeList(cg2, "item");
                property.colorGradients2 = this.parseGradientsColor(itemList, property.colorGradients2);
            }
            if (tintColor) {
                property.tintColor = Color.createColor(Number(tintColor.textContent));
            }

        }


        /**
         * @private
         * 解析发射器数据
         */
        private parseEmission(node: Node): void {
            var emission: ParticleDataEmission = this._particleData.emission;
            emission.type = ParticleValueType[this.getNode(node, "type").textContent];
            emission.rate = Number(this.getNode(node, "rate").textContent);
            var bursts: Node = this.getNode(node, "bursts");
            var item: Node;
            var nodeName: string;
            var i: number = 0;
            var count: number = 0;
            var pt: Point;
            if (bursts) {
                emission.bursts = [];
                var itemList: NodeList = this.getNodeList(bursts, "item");
                for (i = 0, count = itemList ? itemList.length : 0; i < count; i++) {
                    item = itemList[i];
                    pt = new Point();
                    emission.bursts.push(pt);
                    this.eachAttr(item, function (label: string, value: string): void {
                        if (label == "time") {
                            pt.x = Number(value);
                        } else if (label == "count") {
                            pt.y = Number(value);
                        }
                    });
                }
            }
            var bezier: Node = this.getNode(node, "bezier");
            if (emission.type == ParticleValueType.OneBezier) {
                emission.bezier = this.parseBezierData(bezier);
            }

        }

        /**
         * @private
         * 解析生命周期相关数据
         */
        private parseLife(node: Node): void {
            var life: ParticleDataLife = this._particleData.life;
            life.type = ParticleValueType[this.getNode(node, "type").textContent];
            life.min = Number(this.getNode(node, "min").textContent);
            life.max = Number(this.getNode(node, "max").textContent);
            life.bezier1 = this.parseBezierData(this.getNode(node, "bezier1"));
            life.bezier2 = this.parseBezierData(this.getNode(node, "bezier2"));

            life.duration = Number(this.getNode(node, "duration").textContent);
            life.delay = Number(this.getNode(node, "delay").textContent);
            life.loop = this.getNode(node, "loop").textContent == "true";

        }

        /**
         * @private
         * 解析发射器的范围类型
         */
        private parseShape(node: Node): void {
            if (node == null)
                return;
            var shape: ParticleDataShape = this._particleData.shape;
            shape.type = ParticleDataShapeType[this.getNode(node, "type").textContent];
            shape.randomDirection = this.getNode(node, "randomDirection").textContent == "true";
            //cube
            var cube: Node = this.getNode(node, "cube");
            this.eachAttr(cube, function (label: string, value: string): void {
                if (label == "width") {
                    shape.cubeW = Number(value);
                } else if (label == "height") {
                    shape.cubeH = Number(value);
                } else if (label == "depth") {
                    shape.cubeD = Number(value);
                }
            });
            //sphere
            var sphereRadius: Node = this.getNode(node, "sphereRadius");
            if (sphereRadius) {
                shape.sphereRadius = Number(sphereRadius.textContent);
            }
            //hemiSphereRadius
            var hemiSphereRadius: Node = this.getNode(node, "hemiSphereRadius");
            if (hemiSphereRadius) {
                shape.hemiSphereRadius = Number(hemiSphereRadius.textContent);
            }
            //cone
            var cone: Node = this.getNode(node, "cone");
            this.eachAttr(cone, function (label: string, value: string): void {
                if (label == "type") {
                    shape.coneType = ParticleConeShapeType[value];
                } else if (label == "length") {
                    shape.coneLength = Number(value);
                } else if (label == "radius") {
                    shape.coneRadius = Number(value);
                } else if (label == "angle") {
                    shape.coneAngle = Number(value);
                }
            });

            //meshType
            var meshType: Node = this.getNode(node, "meshType");
            if (meshType) {
                shape.meshType = ParticleMeshShapeType[meshType.textContent];
            }

            //meshFile
            var meshFile: Node = this.getNode(node, "meshFile");
            if (meshFile) {
                shape.meshFile = meshFile.textContent;
            }
        }
        /**
         * @private
         * 解析粒子出生的旋转信息
         */
        private parseRotationBirth(node: Node): void {
            var rotationBirth: ParticleDataRotationBirth = this._particleData.rotationBirth;
            rotationBirth.type = ParticleValueType[this.getNode(node, "type").textContent];
            rotationBirth.min = Number(this.getNode(node, "min").textContent);
            rotationBirth.max = Number(this.getNode(node, "max").textContent);
            rotationBirth.bezier1 = this.parseBezierData(this.getNode(node, "bezier1"));
            rotationBirth.bezier2 = this.parseBezierData(this.getNode(node, "bezier2"));

        }

        /**
         * @private
         * 解析粒子出生的缩放信息
         */
        private parseScaleBirth(node: Node): void {
            var scaleBirth: ParticleDataScaleBirth = this._particleData.scaleBirth;
            scaleBirth.type = ParticleValueType[this.getNode(node, "type").textContent];
            scaleBirth.min = Number(this.getNode(node, "min").textContent);
            scaleBirth.max = Number(this.getNode(node, "max").textContent);
            scaleBirth.bezier1 = this.parseBezierData(this.getNode(node, "bezier1"));
            scaleBirth.bezier2 = this.parseBezierData(this.getNode(node, "bezier2"));
        }

        /**
         * @private
         * 解析粒子的几何形状
         */
        private parseGeometry(node: Node): void {
            var geometry: ParticleDataGeometry = this._particleData.geometry;
            
            var plane: Node = this.getNode(node, "plane");
            this.eachAttr(plane, function (label: string, value: string): void {
                if (label == "width") {
                    geometry.planeW = Number(value);
                } else if (label == "height") {
                    geometry.planeH = Number(value);
                }
            });
            
        }


        /**
         * @private
         * 解析粒子速度相关信息
         */
        private parseMoveSpeed(node: Node): void {
            var moveSpeed: ParticleDataMoveSpeed = this._particleData.moveSpeed;
            moveSpeed.type = ParticleValueType[this.getNode(node, "type").textContent];
            moveSpeed.min = Number(this.getNode(node, "min").textContent);
            moveSpeed.max = Number(this.getNode(node, "max").textContent);
            moveSpeed.bezier1 = this.parseBezierData(this.getNode(node, "bezier1"));
            moveSpeed.bezier2 = this.parseBezierData(this.getNode(node, "bezier2"));


            var velocityOverNode: Node = this.getNode(node, "velocityOver");
            if (velocityOverNode) {
                var velocityOver: VelocityOverLifeTimeData = new VelocityOverLifeTimeData();
                velocityOver.type = ParticleValueType[this.getNode(velocityOverNode, "type").textContent];
                var min: Node = this.getNode(velocityOverNode, "min");
                var max: Node = this.getNode(velocityOverNode, "max");
                velocityOver.min = this.parseVector3D(min, velocityOver.min);
                velocityOver.max = this.parseVector3D(max, velocityOver.max);
                velocityOver.worldSpace = this.getNode(velocityOverNode, "worldSpace").textContent == "true";

                velocityOver.xBezier1 = this.parseBezierData(this.getNode(velocityOverNode, "xBezier1"));
                velocityOver.yBezier1 = this.parseBezierData(this.getNode(velocityOverNode, "yBezier1"));
                velocityOver.zBezier1 = this.parseBezierData(this.getNode(velocityOverNode, "zBezier1"));
                velocityOver.xBezier2 = this.parseBezierData(this.getNode(velocityOverNode, "xBezier2"));
                velocityOver.yBezier2 = this.parseBezierData(this.getNode(velocityOverNode, "yBezier2"));
                velocityOver.zBezier2 = this.parseBezierData(this.getNode(velocityOverNode, "zBezier2"));

                moveSpeed.velocityOver = velocityOver;
            }


            var velocityForceNode: Node = this.getNode(node, "velocityForce");
            if (velocityForceNode) {
                var velocityForce: VelocityForceLifeTimeData = new VelocityForceLifeTimeData();
                velocityForce.type = ParticleValueType[this.getNode(velocityForceNode, "type").textContent];
                var min: Node = this.getNode(velocityForceNode, "min");
                var max: Node = this.getNode(velocityForceNode, "max");
                velocityForce.min = this.parseVector3D(min, velocityForce.min);
                velocityForce.max = this.parseVector3D(max, velocityForce.max);
                velocityForce.worldSpace = this.getNode(velocityForceNode, "worldSpace").textContent == "true";

                velocityForce.xBezier1 = this.parseBezierData(this.getNode(velocityForceNode, "xBezier1"));
                velocityForce.yBezier1 = this.parseBezierData(this.getNode(velocityForceNode, "yBezier1"));
                velocityForce.zBezier1 = this.parseBezierData(this.getNode(velocityForceNode, "zBezier1"));
                velocityForce.xBezier2 = this.parseBezierData(this.getNode(velocityForceNode, "xBezier2"));
                velocityForce.yBezier2 = this.parseBezierData(this.getNode(velocityForceNode, "yBezier2"));
                velocityForce.zBezier2 = this.parseBezierData(this.getNode(velocityForceNode, "zBezier2"));

                moveSpeed.velocityForce = velocityForce;
            }

            var velocityLimitNode: Node = this.getNode(node, "velocityLimit");
            if (velocityLimitNode) {
                var velocityLimit: VelocityLimitLifeTimeData = new VelocityLimitLifeTimeData();
                velocityLimit.type = ParticleValueType[this.getNode(velocityLimitNode, "type").textContent];
                var min: Node = this.getNode(velocityLimitNode, "min");
                var max: Node = this.getNode(velocityLimitNode, "max");
                velocityLimit.min = Number(min.textContent);
                velocityLimit.max = Number(max.textContent);

                velocityLimit.bezier1 = this.parseBezierData(this.getNode(velocityLimitNode, "bezier1"));
                velocityLimit.bezier2 = this.parseBezierData(this.getNode(velocityLimitNode, "bezier2"));

                moveSpeed.velocityLimit = velocityLimit;
            }



        }

        /**
         * @private
         * 解析全局位置or本地位置类型
         */
        private parseFollowTarget(node: Node): void {
            if (node == null)
                return;
            var followTarget: ParticleDataFollowTarget = this._particleData.followTarget = new ParticleDataFollowTarget();
            followTarget.followRotation = this.getNode(node, "followRotation").textContent == "true";
            followTarget.followScale = this.getNode(node, "followScale").textContent == "true";

            
        }

        /**
         * @private
         * 解析粒子生命过程中缩放变化信息
         */
        private parseScaleBeizer(node: Node): void {
            if (node == null)
                return;
            var scaleBesizer: ParticleDataScaleBezier = this._particleData.scaleBezier = new ParticleDataScaleBezier();
            scaleBesizer.data = this.parseBezierData(this.getNode(node, "bezier"));
        }


         /**
         * @private
         * 解析粒子旋转角速度
         */
        private parseRotationSpeed(node: Node): void {
            if (node == null)
                return;
            var rotationSpeed: ParticleDataRotationSpeed = this._particleData.rotationSpeed = new ParticleDataRotationSpeed();
            rotationSpeed.type = ParticleValueType[this.getNode(node, "type").textContent];
            var min: Node = this.getNode(node, "min");
            var max: Node = this.getNode(node, "max");
            rotationSpeed.min = this.parseVector3D(min, rotationSpeed.min);
            rotationSpeed.max = this.parseVector3D(max, rotationSpeed.max);

            rotationSpeed.bezier1 = this.parseBezierData(this.getNode(node, "bezier1"));
            rotationSpeed.bezier2 = this.parseBezierData(this.getNode(node, "bezier2"));

        }

         /**
         * @private
         * 解析粒子生命过程中颜色渐变信息
         */
        private parseColorOffset(node: Node): void {
            if (node == null)
                return;
            var colorOffset: ParticleDataColorOffset = this._particleData.colorOffset = new ParticleDataColorOffset();
            var itemList: NodeList = this.getNodeList(node, "item");
            colorOffset.data = this.parseGradientsColor(itemList, colorOffset.data);
        }


        /**
        * @private
        * 解析材质球
        */
        private parseTextureSheet(node: Node): ParticleDataTextureSheet {
            if (node == null)
                return null;
            var textureSheet: ParticleDataTextureSheet = this._particleData.textureSheet = new ParticleDataTextureSheet();
            textureSheet.frameType = ParticleValueType[this.getNode(node, "frameType").textContent];
            textureSheet.tileX = Number(this.getNode(node, "tileX").textContent);
            textureSheet.tileY = Number(this.getNode(node, "tileY").textContent);
            textureSheet.whole = this.getNode(node, "whole").textContent == "true";
            textureSheet.row = Number(this.getNode(node, "row").textContent);
            textureSheet.min = Number(this.getNode(node, "min").textContent);
            textureSheet.max = Number(this.getNode(node, "max").textContent);
            textureSheet.circles = Number(this.getNode(node, "circles").textContent);
            textureSheet.bezier1 = this.parseBezierData(this.getNode(node, "bezier1"));
            textureSheet.bezier2 = this.parseBezierData(this.getNode(node, "bezier2"));

            return textureSheet;
        }

        

         /**
         * @private
         * 解析渐变数据
         */
        private parseGradientsColor(itemList: NodeList, dst:ColorGradients): ColorGradients {
            dst || (dst = new ColorGradients);
            var item: Node;
            var i: number = 0;
            var count: number = 0;
            var pt: Point;
            var color: Color;
            var time: number;
            for (i = 0, count = itemList ? itemList.length : 0; i < count; i++) {
                item = itemList[i];
                this.eachAttr(item, function (label: string, value: string): void {
                    if (label == "time") {
                        dst.times.push(Number(value));
                    } else if (label == "color") {
                        color = Color.createColor(Number(value));
                        dst.colors.push(color);
                    }
                });
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
        private parseBezierData(node: Node): BezierData {
            var bzData: BezierData = new BezierData();
            if (node == null)
                return bzData;
            var posList: NodeList = this.getNodeList(node, "pos");
            var ctrlList: NodeList = this.getNodeList(node, "ctrl");
            var item: Node;
            var i: number = 0;
            var count: number = 0;
            var pt: Point;

            for (i = 0, count = posList ? posList.length : 0; i < count; i++) {
                item = posList[i];
                pt = new Point();
                bzData.posPoints.push(pt);
                this.eachAttr(item, function (label: string, value: string): void {
                    if (label == "x") {
                        pt.x = Number(value);
                    } else if (label == "y") {
                        pt.y = Number(value);
                    }
                });
            }

            for (i = 0, count = ctrlList ? ctrlList.length : 0; i < count; i++) {
                item = ctrlList[i];
                pt = new Point();
                bzData.ctrlPoints.push(pt);
                this.eachAttr(item, function (label: string, value: string): void {
                    if (label == "x") {
                        pt.x = Number(value);
                    } else if (label == "y") {
                        pt.y = Number(value);
                    }
                });
            }

            return bzData;
        }

         /**
         * @private
         * 解析一个vector3D数据
         */
        private parseVector3D(node: Node, vector: Vector3D): Vector3D {
            if (vector == null)
                vector = new Vector3D();
            this.eachAttr(node, function (label: string, value: string): void {
                if (label == "x") {
                    vector.x = Number(value);
                } else if (label == "y") {
                    vector.y = Number(value);
                } else if (label == "z") {
                    vector.z = Number(value);
                }
            });
            return vector;
        }

         /**
         * @private
         * 在obj中，获取name的元素，第一个
         */
        private getNode(obj:any, name: string): Node {
            if (obj == null)
                return null;
            var list: NodeList = obj.getElementsByTagName(name);
            if (list == null || list.length == 0)
                return null;
            return list[0];
        }

        /**
         * @private
         * 在obj中，获取name的元素列表
         */
        private getNodeList(obj: any, name: string): NodeList {
            if (obj == null)
                return null;
            var list: NodeList = obj.getElementsByTagName(name);
            if(list == null || list.length == 0)
                return null;
            return list;
        }


        private eachAttr(item: Node, fun: Function): void {
            XMLParser.eachXmlAttr(item, fun);
        }

    }
}