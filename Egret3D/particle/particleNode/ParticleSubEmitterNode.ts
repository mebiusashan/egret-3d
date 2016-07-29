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
            //##FilterBegin## ##Particle##
            //##FilterEnd##
        }

        /**
        * @language zh_CN
        * 填充粒子属性
        * @param data ParticleDataNode 粒子数据来源
        * @version Egret 3.0
        * @platform Web,Native
        */
        public initNode(data: ParticleDataNode, parent: any = null): void {
            //##FilterBegin## ##Particle##
            //##FilterEnd##
        }


        /**
        * @language zh_CN
        * 导入新的子粒子发射
        * @param subEmitter ParticleEmitter 子发射器
        * @version Egret 3.0
        * @platform Web,Native
        */
        public importSubEmitter(phase: number, subEmitter: ParticleEmitter): void {
            //##FilterBegin## ##Particle##
            //##FilterEnd##
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
            //##FilterBegin## ##Particle##
            //##FilterEnd##
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
            //##FilterBegin## ##Particle##
            //##FilterEnd##
        }

        private bornTime: number = 0;
        private life: number = 0;
        private id: number = 0;
        private timeIndex: number = 0;
        private count: number = 0;
        private position: Vector3D = new Vector3D();
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
            //##FilterBegin## ##Particle##
            //##FilterEnd##
        }

        //##FilterBegin## ##Particle##
        //##FilterEnd##

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