module egret3d {

    /**
    * @language zh_CN
    * @class egret3d.ParticleVelocityNode
    * @classdesc
    * 粒子速度节点(根据粒子的出生相对位置，以及是否随机方向获得一个三维向量)
    * @see egret3d.AnimationNode
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class ParticleVelocityNode extends AnimationNode {
        //##FilterBegin## ##Particle##
        private _constValue: ConstRandomValueShape;
        private attribute_velocity: GLSL.VarRegister;

        private _node: ParticleDataMoveSpeed;
        private _animationState: ParticleAnimationState;
        //##FilterEnd##
        constructor() {
            super();
            //##FilterBegin## ##Particle##
            this.name = "ParticleVelocityNode";

            this.vertex_ShaderName[ShaderPhaseType.global_vertex] = this.vertex_ShaderName[ShaderPhaseType.global_vertex] || [];
            this.vertex_ShaderName[ShaderPhaseType.global_vertex].push("particle_velocity");

            this.attribute_velocity = new GLSL.VarRegister();
            this.attribute_velocity.name = "attribute_velocity";
            this.attribute_velocity.size = 3;
            this.attributes.push(this.attribute_velocity);
            //##FilterEnd##

        }

        /**
        * @language zh_CN
        * 填充粒子移动速度数据
        * @param data ParticleDataNode 粒子数据来源
        * @version Egret 3.0
        * @platform Web,Native
        */
        public initNode(data: ParticleDataNode): void {
            //##FilterBegin## ##Particle##
            var node: ParticleDataMoveSpeed = this._node = <ParticleDataMoveSpeed>data;
            if (node.type == ParticleValueType.Const || node.type == ParticleValueType.RandomConst) {
                this._constValue = new ConstRandomValueShape();
                this._constValue.max = node.max;
                this._constValue.min = node.min;
            }
            //##FilterEnd##
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

            var vertices: number = geometry.vertexCount / count;
            var index: number = 0;

            var constList: Array<number>;
            if (this._constValue)
               constList = this._constValue.calculate(count);

            var directionVector: Vector3D[] = this._animationState.directionArray;
            var direction: Vector3D = new Vector3D();

            //
            var progress: number = 0;
            var duration: number = this._animationState.emitter.data.life.duration;
            var timeOffsetIndex: number = this._animationState.emitter.timeNode.offsetIndex;
            var particleIndex: number = 0;
            var timeIndex: number;
            var bornTime: number;

            var speed: number;
            for (var i: number = 0; i < count; ++i) {
                particleIndex = i * vertices;

                //
                if (this._node.type == ParticleValueType.OneBezier || this._node.type == ParticleValueType.TwoBezier) {
                    timeIndex = particleIndex * geometry.vertexAttLength + timeOffsetIndex;
                    bornTime = geometry.vertexArray[timeIndex + 0];          //出生时间
                    progress = bornTime / duration;
                    progress = progress - Math.floor(progress);               //取小数部分
                    speed = this._node.bezier1.calc(progress);
                    if (this._node.type == ParticleValueType.TwoBezier) {
                        var random: number = Math.random();
                        speed *= random;
                        speed += this._node.bezier2.calc(progress) * (1 - random);
                    }
                } else {
                    speed = constList[i];
                }

                direction.copyFrom(directionVector[i]);
                direction.scaleBy(speed);

                for (var j: number = 0; j < vertices; ++j) {
                    index = i * vertices + j;
                    index = index * geometry.vertexAttLength + this.attribute_velocity.offsetIndex;

                    geometry.vertexArray[index + 0] = direction.x;
                    geometry.vertexArray[index + 1] = direction.y;
                    geometry.vertexArray[index + 2] = direction.z;

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
            this._constValue && this._constValue.dispose();
            this._constValue = null;
            //##FilterEnd##
        }


    }
} 