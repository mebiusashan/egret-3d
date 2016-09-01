module egret3d {

    /**
    * @language zh_CN
    * @class egret3d.ParticlePosition
    * @classdesc
    * 粒子位置效果节点，刚出生相对于(0,0,0)位置的偏移量
    * @see egret3d.AnimationNode
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class ParticlePosition extends AnimationNode {

        /**
        * @private
        */
        private _positions: ValueShape;
        private _node: ParticleDataShape;

        private _animationState: ParticleAnimationState;
        private attribute_offsetPosition: GLSL.VarRegister;
        constructor() {
            super();
            //##FilterBegin## ##Particle##
            this.name = "ParticlePosition";

            this.attribute_offsetPosition = new GLSL.VarRegister();
            this.attribute_offsetPosition.name = "attribute_offsetPosition";
            this.attribute_offsetPosition.size = 3;
            this.attributes.push(this.attribute_offsetPosition);

            //##FilterEnd##
        }


        /**
        * @language zh_CN
        * 填充粒子发射器形状数据
        * @param data ParticleDataNode 粒子数据来源
        * @version Egret 3.0
        * @platform Web,Native
        */
        public initNode(data: ParticleDataNode, arg: any): void {
            //##FilterBegin## ##Particle##
            //根据粒子的属性，选择使用相机方式
            var renderMode: number = (<ParticleDataProperty>arg).renderMode;
            var renderMode_vs: string;
            if (renderMode == ParticleRenderModeType.Billboard) {
                renderMode_vs = "particle_rm_billboard";
            } else if (renderMode == ParticleRenderModeType.StretchedBillboard) {
                renderMode_vs = "particle_rm_stretched";
            }else {
                renderMode_vs = "particle_rm_mesh";
            }
            this.vertex_ShaderName[ShaderPhaseType.local_vertex] = this.vertex_ShaderName[ShaderPhaseType.local_vertex] || [];
            this.vertex_ShaderName[ShaderPhaseType.local_vertex].push(renderMode_vs);

            //初始化顶点数据
            var node: ParticleDataShape = this._node = <ParticleDataShape>data;
            if (node.type == ParticleDataShapeType.Point) {
                var pointShape: Vec3ConstValueShape = new Vec3ConstValueShape();
                pointShape.minX = 0;
                pointShape.minY = 0;
                pointShape.minZ = 0;
                this._positions = pointShape;
            }
            else if (node.type == ParticleDataShapeType.Cube) {
                var cubeShape: CubeVector3DValueShape = new CubeVector3DValueShape();
                cubeShape.width = node.cubeW;
                cubeShape.height = node.cubeH;
                cubeShape.depth = node.cubeD;
                this._positions = cubeShape;
            }
            else if (node.type == ParticleDataShapeType.Sphere) {
                var sphereShape: BallValueShape = new BallValueShape();
                sphereShape.r = node.sphereRadius;
                sphereShape.fromShell = node.emitFromShell;
                this._positions = sphereShape;
            } else if (node.type == ParticleDataShapeType.HemiSphere) {
                var hemiShape: HemiBallValueShape = new HemiBallValueShape();
                hemiShape.r = node.hemiSphereRadius;
                hemiShape.fromShell = node.emitFromShell;
                this._positions = hemiShape;
            } else if (node.type == ParticleDataShapeType.Cone) {
                var coneShape: ConeValueShape = new ConeValueShape();
                coneShape.angle = node.coneAngle;
                coneShape.length = node.coneLength;
                coneShape.radius = node.coneRadius;
                coneShape.coneType = node.coneType;

                this._positions = coneShape;

            } else if (node.type == ParticleDataShapeType.Mesh) {
                var meshShape: Mesh3DValueShape = new Mesh3DValueShape();
                meshShape.geometry = node.geometry;
                meshShape.type = node.meshType;
                this._positions = meshShape;
            }
            //##FilterEnd##

        }


        /**
        * @language zh_CN
        * 获取位置节点在geometry的顶点数据中偏移量
        * @return number
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get offsetIndex(): number {
            return this.attribute_offsetPosition.offsetIndex;
        }


        /**
        * @language zh_CN
        * 填充顶点数据
        * @param geometry 网格数据
        * @param count 粒子数量
        * @version Egret 3.0
        * @platform Web,Native
        */
        public build(geometry: Geometry, count: number) {
            //##FilterBegin## ##Particle##
            this._animationState = <ParticleAnimationState>this.state;
            var posArray: Vector3D[] = this._positions.calculate(count);
            var directionArray: Vector3D[] = this._animationState.directionArray = [];
            var meshNormalArray: Vector3D[];
            if (this._node.type == ParticleDataShapeType.Mesh) {
                meshNormalArray = (<Mesh3DValueShape>this._positions).normalList;
            }
            var vertices: number = geometry.vertexCount / count;
            var index: number = 0;
            var data: ParticleData = this._animationState.emitter.data;

            var recordPos: Vector3D = new Vector3D();//用于计算方向，缩放后的位置不能用于计算方向
            var coneShape: ConeValueShape = <ConeValueShape>this._positions;
            for (var i: number = 0; i < count; ++i) {
                var pos: Vector3D = posArray[i];
                recordPos.copyFrom(pos);
                //缩放______________________________________________________
                pos.multiply(data.property.scale, pos);

                //粒子发射方向
                var dir: Vector3D = new Vector3D();
                if (data.shape.randomDirection) {
                    dir.setTo(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5);
                } else {
                    if (this._node.type == ParticleDataShapeType.Point) {
                        dir.setTo(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5);
                    } else if (this._node.type == ParticleDataShapeType.Cube) {
                        dir.setTo(0, 0, 1, 1);
                    } else if (this._node.type == ParticleDataShapeType.Sphere) {
                        dir.copyFrom(recordPos);
                    } else if (this._node.type == ParticleDataShapeType.HemiSphere) {
                        dir.copyFrom(recordPos);
                    } else if (this._node.type == ParticleDataShapeType.Cone) {
                        dir = coneShape.directions[i];
                    } else if (this._node.type == ParticleDataShapeType.Mesh) {
                        dir.copyFrom(meshNormalArray[i]);
                    }
                }

                dir.normalize();
                directionArray.push(dir);

                //创建位置
                for (var j: number = 0; j < vertices; ++j) {
                    index = i * vertices + j;
                    index = index * geometry.vertexAttLength + this.attribute_offsetPosition.offsetIndex;

                    geometry.vertexArray[index + 0] = pos.x;
                    geometry.vertexArray[index + 1] = pos.y;
                    geometry.vertexArray[index + 2] = pos.z;
                }
            }

            //##FilterEnd##
        }

        /**
        * @private
        * 构建结束后需要清理掉临时数据
        */
        public afterBuild(): void {
            //##FilterBegin## ##Particle##
            this._positions.dispose();
            this._positions = null;

            this._animationState.directionArray.length = 0;
            this._animationState.directionArray = null;
            //##FilterEnd##
        }

    }
} 