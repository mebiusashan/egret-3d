module egret3d {

    /**
     * @language zh_CN
     * @class egret3d.IAnimation
     * @classdesc
     * 动画接口
     * 
     * @version Egret 3.0
     * @platform Web,Native
     * @includeExample animation/IAnimation.ts
     */
    export interface IAnimation {

        /**
        * @language zh_CN
        * 骨骼动画控制器对象
        * 只有骨骼动画对象才有此接口
        * @version Egret 3.0
        * @platform Web,Native
        */
        skeletonAnimationController?: SkeletonAnimation;

        /**
        * @language zh_CN
        * 粒子动画控制器对象。
        * 只有粒子动画对象才有此接口
        * @version Egret 3.0
        * @platform Web,Native
        */
        particleAnimationController?: ParticleAnimation;

        /**
        * @language zh_CN
        * 总时间
        * @version Egret 3.0
        * @platform Web,Native
        */
        animTime: number;

        /**
        * @language zh_CN
        * 帧间隔时间
        * @version Egret 3.0
        * @platform Web,Native
        */
        delay: number;

        /**
        * @language zh_CN
        * 动画播放速度
        * @version Egret 3.0
        * @platform Web,Native
        */
        speed: number;

        /**
        * @private
        * @language zh_CN
        * 更新调度
        * @param time 总时间
        * @param delay 帧间隔时间
        * @param geometry 几何数据
        * @version Egret 3.0
        * @platform Web,Native
        */
        update(time: number, delay: number, geometry:Geometry): void;

        /**
        * @private
        * @language zh_CN
        * GPU传值调度
        * @version Egret 3.0
        * @platform Web,Native
        */
        activeState(time: number, delay: number, usage: PassUsage, geometry: SubGeometry, context3DProxy: Context3DProxy, modeltransform: Matrix4_4, camera3D: Camera3D);
        /**
        * @language zh_CN
        * 播放动画
        * @param animName 动画名称
        * @param speed 播放速度（默认为1）
        * @param prewarm 是否预热
        * @version Egret 3.0
        * @platform Web,Native
        */
        play(animName?: string, speed?:number, reset?: boolean, prewarm?:boolean): void;

        /**
        * @language zh_CN
        * 停止动画播放
        * @version Egret 3.0
        * @platform Web,Native
        */
        stop(): void;

        /**
        * @language zh_CN
        * 是否正在播放
        * @version Egret 3.0
        * @platform Web,Native
        */
        isPlay(): boolean;

        /**
        * @language zh_CN
        * 获取动画列表
        * @version Egret 3.0
        * @platform Web,Native
        */
        animStateNames: string[];

        /**
        * @language zh_CN
        * 获取动画节点
        * @version Egret 3.0
        * @platform Web,Native
        */
        animStates: IAnimationState[];

        /**
        * @private
        * @language zh_CN
        * @version Egret 3.0
        * @platform Web,Native
        */
        addAnimState(animState: IAnimationState)

        /**
        * @private
        * @language zh_CN
        * @version Egret 3.0
        * @platform Web,Native
        */
        removeAnimState(animState: IAnimationState)

        /**
        * @language zh_CN
        * 克隆新的IAnimation对象
        * @returns IAnimation 新的IAnimation对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        clone(): IAnimation;
    }
}
