module egret3d {

    /**
    * @language zh_CN
    * @class egret3d.ParticleAnimation
    * @classdesc
    * 粒子动画
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class ParticleAnimation extends EventDispatcher implements IAnimation {
                    
        /**
        * @language zh_CN
        * 粒子发射器
        * @version Egret 3.0
        * @platform Web,Native
        */
        public emit: ParticleEmitter;
            
        /**
        * @language zh_CN
        * 粒子动画状态机
        * @version Egret 3.0
        * @platform Web,Native
        */
        public particleAnimationState: ParticleAnimationState;

        /**
        * @language zh_CN
        * 总时间
        * @version Egret 3.0
        * @platform Web,Native
        */
        public animTime: number = 0;

        /**
        * @language zh_CN
        * 帧间隔时间
        * @version Egret 3.0
        * @platform Web,Native
        */
        public delay: number = 0;

        /**
        * @language zh_CN
        * 播放速度
        * @version Egret 3.0
        * @platform Web,Native
        */
        public speed: number = 1;

        /**
        * @language zh_CN
        * 获取动画列表
        * @return 动画名称数组
        * @version Egret 3.0
        * @platform Web,Native
        */
        public animStateNames: string[];

        /**
        * @language zh_CN
        * 获取动画节点
        * @return 动画节点数组
        * @version Egret 3.0
        * @platform Web,Native
        */
        public animStates: IAnimationState[];

        /**
        * @language zh_CN
        * 是否在播放
        * @version Egret 3.0
        * @platform Web,Native
        */
        private _play: boolean = false;

       


        /**
        * @language zh_CN
        * 构造函数
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor(emitter:ParticleEmitter) {
            super();
            this.animStates = [];
            this.particleAnimationState = new ParticleAnimationState("particle", emitter);
            this.addAnimState(this.particleAnimationState);
        }

       
        /**
        * @private
        * @language zh_CN
        * 更新调度
        * @param time 总时间
        * @param delay 帧间隔时间
        * @version Egret 3.0
        * @platform Web,Native
        */

        public static Reset: boolean;
        public update(time: number, delay: number, geometry: Geometry) {
            if (!this._play) {
                return;
            }
            if (ParticleAnimation.Reset) {
                this.animTime = 0;
            }
            this.delay = delay; 
            this.animTime += this.delay;
            if (this.particleAnimationState)
                this.particleAnimationState.update(this.animTime, this.delay, geometry);
        }
         /**
        * @private
        * @language zh_CN
        * 将粒子信息更新给GPU
        * @param time 当前时间
        * @param delay 当前帧时间
        * @param usage PassUsage
        * @param geometry 子几何信息
        * @param context3DProxy 上下文信息
        * @param modeltransform 模型矩阵
        * @param camera3D 相机
        * @version Egret 3.0
        * @platform Web,Native
        */
        public activeState(time: number, delay: number, usage: PassUsage, geometry: SubGeometry, context3DProxy: Context3DProxy, modeltransform: Matrix4_4, camera3D: Camera3D) {
            if (this.particleAnimationState) {
                this.particleAnimationState.activeState(time, this.animTime, delay, this.delay, usage, geometry, context3DProxy, camera3D);
            }
        }

        /**
        * @language zh_CN
        * 播放动画
        * @param animName 动画名
        * @param speed 播放速度
        * @version Egret 3.0
        * @platform Web,Native
        */
        public play(animName?: string, speed: number = 1, reset: boolean = true, prewarm: boolean = true): void {
            this._play = true;
            if (reset) {
                this.animTime = 0;
            }
            if (prewarm){
                this.animTime = this.particleAnimationState.loopTime;
            }

            this.delay = 0;
        }

        /**
        * @language zh_CN
        * 停止播放
        * @version Egret 3.0
        * @platform Web,Native
        */
        public stop() {
            this._play = false;
        }

        /**
        * @language zh_CN
        * 是否正在播放中
        * @return 是否播放中
        * @version Egret 3.0
        * @platform Web,Native
        */
        public isPlay(): boolean {
            return this._play ;
        }

        /**
        * @language zh_CN
        * 添加动画状态
        * @return 动画名称列表
        * @version Egret 3.0
        * @platform Web,Native
        */
        public addAnimState(animState: IAnimationState) {
            var has: number = this.animStates.indexOf(animState);
            if (has==-1)
                this.animStates.push( animState );
        }

        /**
        * @language zh_CN
        * 上传动画状态
        * @return 动画名称列表
        * @version Egret 3.0
        * @platform Web,Native
        */
        public removeAnimState(animState: IAnimationState) {
            var has: number = this.animStates.indexOf(animState);
            if (has != -1)
                this.animStates.splice(has,1);
        }

        /**
        * @private
        * @language zh_CN
        * 获取动画列表
        * @return 动画名称列表
        */
        public getAnimList(): string[] {
            return []; 
        }

        /**
        * @private
        * @language zh_CN
        * 获取动画节点
        * @return 动画节点数组
        */
        public getAnimNode(): AnimationNode[] {
            return [];
        }

        /**
        * @private
        * @language zh_CN
        * 克隆新的ParticleAnimation对象;
        * @return 新的ParticleAnimation对象
        */
        public clone(): IAnimation {
            return null;
        }
    }
}