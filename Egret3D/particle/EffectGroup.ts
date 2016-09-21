module egret3d {
    /**
    * @language zh_CN
    * @class egret3d.EffectGroup
    * @classdesc
    * 特效组，可以是粒子也可以是其他动画，如uv滚动等
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class EffectGroup {
        private _animations: IAnimation[] = [];
        private _timeOffset: number[];
        private _isPlay: boolean;
        private _animCount: number = 0;

        constructor(node: Object3D) {

            this._animations = [];
            this.collectAnimations(node, this._animations); 

            this._timeOffset = [];
            this._animCount = this._timeOffset.length = this._animations.length;
            for (var index: number = 0; index < this._animCount; index++) {
                this._timeOffset[index] = 0;
            }
        }

        private collectAnimations(object: Object3D, animations:IAnimation[]): void {
            var mesh: Mesh;
            var animation: IAnimation;
            if (object instanceof Mesh) {
                mesh = <Mesh>object;
                animation = mesh.animation;
                if (animation) {
                    animations.push(animation);
                }
            }

            var childCount: number = object.childs.length;
            for (var i: number = 0; i < childCount; i++) {
                this.collectAnimations(object.childs[i], animations);
            }

        }

        public play(animName?: string, speed?: number, reset?: boolean, prewarm?: boolean): void {
            for (var index: number; index < this._animCount; index++) {
                var animator: IAnimation = this._animations[index];
                animator.play(animName, speed, reset, prewarm);
            }
            this._isPlay = true;
        }



        public resetTime(offset: number = 0): void {
            for (var index: number; index < this._animCount; index++) {
                var animator: IAnimation = this._animations[index];
                animator.animTime = this._timeOffset[index] + offset;
            }
        }


        /**
        * @language zh_CN
        * 停止动画播放
        * @version Egret 3.0
        * @platform Web,Native
        */
        public stop(): void {
            for (var index: number; index < this._animCount; index++) {
                this._animations[index].stop();
            }
            this._isPlay = false;
        }

        /**
        * @language zh_CN
        * 是否正在播放
        * @version Egret 3.0
        * @platform Web,Native
        */
        public isPlay(): boolean {
            return this._isPlay;
        }

        /**
        * @language zh_CN
        * 销毁
        * @version Egret 3.0
        * @platform Web,Native
        */
        public dispose(): void {
            this.stop();
            this._animations.length = 0;
            this._animations = null;
        }

    }

}
