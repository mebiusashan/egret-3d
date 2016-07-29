module egret3d {

    /**
   * @class egret3d.ParticleEmitter
   * @classdesc
   * 粒子发射器 
   * @see egret3d.Mesh
   * @version Egret 3.0
   * @platform Web,Native 
   */
    export class ParticleEmitter extends Mesh {



        private _timeNode: ParticleTime;
        private _positionNode: ParticlePosition;

        private _geometryShape: Geometry;
        private particleAnimation: ParticleAnimation;
        private _particleState: ParticleAnimationState;
        private _subEmitterNode: ParticleSubEmitterNode;
        private _isEmitterDirty: boolean = true;

        private _userNodes: AnimationNode[] = [];

        private _data: ParticleData;
        private _externalGeometry: Geometry;



        /**
        * @language zh_CN
        * 构造函数
        * @param geo Geometry 几何数据
        * @param data ParticleData 生成粒子的数据来源
        * @param material 粒子的材质
        * @version Egret 3.0
        * @platform Web,Native 
        */
        constructor(data: ParticleData, material: MaterialBase = null) {
            super(null, material);

            //##FilterBegin## ##Particle##
            //##FilterEnd##
        }

        /**
        * @language zh_CN
        * 渲染排序的参数，数值越大，先渲染</p>
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get drawOrder(): number {
            return this._data.property.sortingFudge;
        }

        /**
        * @private
        * 添加子发射器
        */
        public addSubEmitter(phase: number, subEmitter: ParticleEmitter): void {
            //##FilterBegin## ##Particle##
            //##FilterEnd##
        }
        /**
        * @language zh_CN
        * @private
        * 重新构建这个粒子
        * @param geo Geometry 几何数据
        * @param data ParticleData 生成粒子的数据来源
        * @param material 粒子的材质
        * @version Egret 3.0
        * @platform Web,Native 
        */
        private buildParticle(): void {
            //##FilterBegin## ##Particle##
            //##FilterEnd##
        }

        /**
        * @language zh_CN
        * 根据粒子的配置信息，生成geometry
        * @return Geometry
        * @version Egret 3.0
        * @platform Web,Native
        */
        private createPlane(): Geometry {
            var geo: Geometry;
            //##FilterBegin## ##Particle##
            //##FilterEnd##
            return geo;
        }

        public get data(): ParticleData {
            return this._data;
        }


        /**
        * @language zh_CN
        * 获取时间节点
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get timeNode(): ParticleTime {
            return this._timeNode;
        }

        /**
        * @language zh_CN
        * 获取位置节点
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get positionNode(): ParticlePosition {
            return this._positionNode;
        }

        /**
        * @language zh_CN
        * 设置跟随的目标，如果设置了，粒子发射器会跟随目标 
        * @param o 粒子发射器会跟随目标 
        * @version Egret 3.0
        * @platform Web,Native 
        */
        public set followTarget(o: Object3D) {
            this._particleState.followTarget = o;
        }

        /**
        * @language zh_CN
        * 获取跟随的目标
        * @returns Object3D 跟随的目标 
        * @version Egret 3.0
        * @platform Web,Native 
        */
        public get followTarget(): Object3D {
            return this._particleState.followTarget;
        }


        /**
        * @language zh_CN
        * 给粒子发射器添加 粒子效果节点
        * @param node 粒子效果节点 
        * @version Egret 3.0
        * @platform Web,Native 
        */
        private addAnimNode(node: AnimationNode) {
            //##FilterBegin## ##Particle##
            //##FilterEnd##
        }

        /**
        * @language zh_CN
        * 移除粒子发射器上的效果节点
        * @param node 粒子效果节点 
        * @version Egret 3.0
        * @platform Web,Native 
        */
        private removeAnimNode(node: AnimationNode) {
            //##FilterBegin## ##Particle##
            //##FilterEnd##
        }

        /**
        * @language zh_CN
        * 播放粒子
        * @param prewarm 是否预热
        * @version Egret 3.0
        * @platform Web,Native 
        */
        public play(prewarm: boolean = false) {
            //##FilterBegin## ##Particle##
            //##FilterEnd##
        }


        /**
        * @language zh_CN
        * 结束播放粒子
        * @version Egret 3.0
        * @platform Web,Native 
        */
        public stop(): void {
            this.animation.stop();
        }



        /**
        * @private
        */
        protected initialize() {
            //##FilterBegin## ##Particle##
            //##FilterEnd##
        }

        /**
        * @private
        * 根据ParticleData中的数据初始化
        */
        private initMainAnimNode() {
            //##FilterBegin## ##Particle##
            //##FilterEnd##
        }

        private initUserAnimNode() {
            //##FilterBegin## ##Particle##
            //##FilterEnd##
        }

        private initEndNode(): void {
            //##FilterBegin## ##Particle##
            //##FilterEnd##
        }

        /**
        * @language zh_CN
        * @private
        * 构建包围盒
        * @version Egret 3.0
        * @platform Web,Native
        */
        private initBoudBox(vector: Vector3D) {
            //##FilterBegin## ##Particle##
            //##FilterEnd##
        }

        /**
        * @language zh_CN
        * @public
        * 循环完毕的次数，用于检测是否单个循环结束
        * @return number 循环次数
        * @version Egret 3.0
        * @platform Web,Native
        */

        public get loopProgress(): number {
            var p: number;
            //##FilterBegin## ##Particle##
            //##FilterEnd##
            return p;
        }

        /**
        * @language zh_CN
        * @private
        * @version Egret 3.0
        * @platform Web,Native
        */
        public update(time: number, delay: number, camera: Camera3D) {
            //##FilterBegin## ##Particle##
            //##FilterEnd##
        }



        /**
        * @language zh_CN
        * 克隆一个模型
        * @returns 克隆后的粒子
        * @version Egret 3.0
        * @platform Web,Native
        */
        public clone(): ParticleEmitter {
            var newParticle: ParticleEmitter;
            //##FilterBegin## ##Particle##
            //##FilterEnd##
            return newParticle;
        }



    }
}