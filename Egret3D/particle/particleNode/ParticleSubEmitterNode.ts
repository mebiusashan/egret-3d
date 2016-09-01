module egret3d {

    /**
    * @language zh_CN
    * @class egret3d.ParticleSubEmitterNode
    * @classdesc
    * 粒子跟随效果节点
    * @see egret3d.AnimationNode
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class ParticleSubEmitterNode extends AnimationNode {

        /**
        * @language zh_CN
        * 子发射器
        * @version Egret 3.0
        * @platform Web,Native
        */
        private _animationState: ParticleAnimationState;
        private _lifeCircles: Array<number>;

        private _birthPhase: ParticleSubEmitterNodePhase;
        private _collisionPhase: ParticleSubEmitterNodePhase;
        private _deathPhase: ParticleSubEmitterNodePhase;

        private _parent: Object3D;
        private _empty: boolean = true;
        constructor() {
            super();
            this._birthPhase = new ParticleSubEmitterNodePhase(ParticleDataSubEmitterPhase.BIRTH);
            this._collisionPhase = new ParticleSubEmitterNodePhase(ParticleDataSubEmitterPhase.COLLISION);
            this._deathPhase = new ParticleSubEmitterNodePhase(ParticleDataSubEmitterPhase.DEATH);
            this.name = "ParticleSubEmitterNode";
        }

        /**
        * @language zh_CN
        * 填充粒子属性
        * @param data ParticleDataNode 粒子数据来源
        * @version Egret 3.0
        * @platform Web,Native
        */
        public initNode(data: ParticleDataNode, parent: any = null): void {
            this._parent = parent;
        }


        /**
        * @language zh_CN
        * 导入新的子粒子发射
        * @param subEmitter ParticleEmitter 子发射器
        * @version Egret 3.0
        * @platform Web,Native
        */
        public importSubEmitter(phase: number, subEmitter: ParticleEmitter): void {
            var nodePhase: ParticleSubEmitterNodePhase;
            if (phase == ParticleDataSubEmitterPhase.BIRTH) {
                nodePhase = this._birthPhase;
            } else if (phase == ParticleDataSubEmitterPhase.COLLISION) {
                nodePhase = this._collisionPhase;
            } else if (phase == ParticleDataSubEmitterPhase.DEATH) {
                nodePhase = this._deathPhase;
            }

            if (nodePhase) {
                this._empty = false;
                nodePhase.importSubEmitter(subEmitter);
            }
        }


        /**
        * @language zh_CN
        * 获取子粒子
        * @param phase 某个阶段的子粒子
        * @return ParticleEmitter列表
        * @version Egret 3.0
        * @platform Web,Native
        */
        public getSubEmitters(phase: number): ParticleEmitter[] {
            if (phase == ParticleDataSubEmitterPhase.BIRTH) {
                return this._birthPhase.playing.getKeys();
            } else if (phase == ParticleDataSubEmitterPhase.COLLISION) {
                return this._collisionPhase.playing.getKeys();
            } else if (phase == ParticleDataSubEmitterPhase.DEATH) {
                return this._deathPhase.playing.getKeys();
            }
            return null;
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
            this.count = count;
            this._animationState = <ParticleAnimationState>this.state;
            //先重置成-1，然后每帧检测每个粒子的上一帧的所属出身次数和下一帧的出身次数，判定是否要刷新他的初始位置
            this._lifeCircles = [];
            for (var i: number = 0; i < this.count; i++) {
                this._lifeCircles[i] = -1;
            }
        }

        private bornTime: number = 0;
        private life: number = 0;
        private id: number = 0;
        private timeIndex: number = 0;
        private count: number = 0;
        private position: Vector3D = new Vector3D();
        private ignoreEmit: boolean;
        /**
        * @language zh_CN
        * @param animTime 动画当前时间（单位为ms）
        * @param delay  这一帧的时间跨度
        * @param geometry 几何对象
        * 顶点数据是否需要重新upload
        * @version Egret 3.0
        * @platform Web,Native
        */
        public update(animTime: number, delay: number, geometry: Geometry) {
            if (this._empty)
                return;
            //回收已经可以结束的子特效
            this.recycleParticle();
            //卡顿了就不发射子粒子了
            this.ignoreEmit = delay > 25;
            //非循环的粒子生命周期达上限
            var loop: boolean = this._animationState.emitter.data.life.loop;
            var maxLife: number = this._animationState.loopTime + this._animationState.emitter.data.life.duration;
            if (!loop && (animTime * 0.001 >= maxLife)) {
                return;
            }

            //animTime += delay;
            var index: number = 0;
            var vertices: number = geometry.vertexCount / this.count;
            var particleIndex: number = 0;

            var positionOffsetIndex: number = this._animationState.emitter.positionNode.offsetIndex;
            var timeOffsetIndex: number = this._animationState.emitter.timeNode.offsetIndex;
            var particleTime: number = animTime * 0.001 - this._animationState.emitter.data.life.delay;
            var verticesData: any = geometry.sharedVertexBuffer ? geometry.sharedVertexBuffer.arrayBuffer : geometry.vertexArray;
            //没有跟随对象，使用自己
            var followTarget: Object3D = this._animationState.followTarget || this._animationState.emitter;
            for (var i: number = 0; i < this.count; ++i) {

                particleIndex = i * vertices;
                this.timeIndex = particleIndex * geometry.vertexAttLength + timeOffsetIndex;

                this.bornTime = verticesData[this.timeIndex + 0];          //出生时间
                this.life = verticesData[this.timeIndex + 1];              //单次生命周期时间
                //this.id = array32[this.timeIndex + 2];                //下标(i)

                var curCircleIndex: number = -1;

                if (particleTime >= this.bornTime) {
                    //粒子超时了，并且不需要继续循环
                    if (particleTime > (this.bornTime + this.life) && !loop)
                        continue;
                    curCircleIndex = Math.floor((particleTime - this.bornTime) / this._animationState.loopTime);

                    if (curCircleIndex != this._lifeCircles[i]) {
                        //不发射
                        this._lifeCircles[i] = curCircleIndex;
                        if (this.ignoreEmit) {
                            continue;
                        }
                        index = particleIndex * geometry.vertexAttLength + positionOffsetIndex;
                        //position
                        this.position.x = verticesData[index + 0];
                        this.position.y = verticesData[index + 1];
                        this.position.z = verticesData[index + 2];

                        this.emitParticleAtPhase(this._birthPhase, this.position);
                    }
                }
            }

        }


        private _added: boolean = false;
        private _orientation: Quaternion = new Quaternion();
        private emitParticleAtPhase(phase: ParticleSubEmitterNodePhase, pos: Vector3D): void {
            var bakEmitter: ParticleEmitter;
            var bakEmitters: ParticleEmitter[] = phase.playing.getKeys();

            var playingArr: ParticleEmitter[];
            var recycleArr: ParticleEmitter[];
            var newParticle: ParticleEmitter;
            this._orientation.copyFrom(this._parent.orientation);
            this._orientation.w *= -1;
            for (var i: number = 0, count: number = bakEmitters.length; i < count; i++) {
                bakEmitter = bakEmitters[i];

                recycleArr = phase.recycle.getValueByKey(bakEmitter);
                playingArr = phase.playing.getValueByKey(bakEmitter);
                newParticle = recycleArr.shift();
                if (newParticle == null) {
                    newParticle = new ParticleEmitter(bakEmitter.data, bakEmitter.material);
                }
                playingArr.push(newParticle);
                newParticle.play();
                newParticle.position = pos;
                newParticle.orientation = this._orientation;
                this._parent.addChild(newParticle);


            }
        }



        private recycleParticle(): void {
            this.recycleParticleAtPhase(this._birthPhase);
            this.recycleParticleAtPhase(this._collisionPhase);
            this.recycleParticleAtPhase(this._deathPhase);
        }

        private recycleParticleAtPhase(phaseNode: ParticleSubEmitterNodePhase): void {
            var bakEmiter: ParticleEmitter;

            var playingArr: ParticleEmitter[];
            var recycleArr: ParticleEmitter[];
            var tempParticle: ParticleEmitter;
            var j: number;
            var jCount: number;

            var bakEmitters: ParticleEmitter[] = phaseNode.playing.getKeys();

            for (var i: number = 0, count: number = bakEmitters.length; i < count; i++) {
                bakEmiter = bakEmitters[i];
                playingArr = phaseNode.playing.getValueByKey(bakEmiter);
                recycleArr = phaseNode.recycle.getValueByKey(bakEmiter);

                for (j = playingArr.length - 1; j >= 0; j--) {
                    tempParticle = playingArr[j];
                    if (tempParticle.loopProgress > 1) {
                        playingArr.splice(j, 1);
                        tempParticle.stop();
                        this._parent.removeChild(tempParticle);
                        recycleArr.push(tempParticle);
                    }
                }

            }
        }

        /**
        * @private
        */
        public activeState(time: number, animTime: number, delay: number, animDelay: number, usage: PassUsage, geometry: SubGeometry, context3DProxy: Context3DProxy) {

        }
    }






    export class ParticleSubEmitterNodePhase {

        public playing: DoubleArray = new DoubleArray();
        public recycle: DoubleArray = new DoubleArray();

        constructor(phase: number) {

        }

        public importSubEmitter(subEmitter: ParticleEmitter): void {
            if (this.playing.getKeys().indexOf(subEmitter) >= 0)
                return;
            this.playing.put(subEmitter, []);
            this.recycle.put(subEmitter, []);
        }

    }

} 