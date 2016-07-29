module egret3d {

    /**
     * @language zh_CN
     * @class egret3d.ParticleAnimationState
     * @classdesc
     * 粒子动画状态机
     * @version Egret 3.0
     * @platform Web,Native
     */
    export class ParticleAnimationState implements IAnimationState {

        /**
        * @language zh_CN
        * 动画状态机名字
        * @version Egret 3.0
        * @platform Web,Native
        */
        public name: string;

        /**
        * @language zh_CN
        * 动画效果节点列表
        * @version Egret 3.0
        * @platform Web,Native
        */
        public animNodes: AnimationNode[];

        /**
        * @language zh_CN
        * 动画关键帧列表
        * @version Egret 3.0
        * @platform Web,Native
        */
        public keyFrames: AnimationCurve[];

        /**
        * @language zh_CN
        * 新增顶点个数总量
        * @version Egret 3.0
        * @platform Web,Native
        */
        public numberOfVertices: number = 0;

        /**
        * @language zh_CN
        * 新增顶点的长度
        * @version Egret 3.0
        * @platform Web,Native
        */
        public vertexSizeInBytes: number = 0;

        /**
        * @language zh_CN
        * 动画状态机顶点着色器文件名列表
        * @version Egret 3.0
        * @platform Web,Native
        */
        public vertex_shaders: { [shaderPhaseType: number]: string[] } = {};

        /**
        * @language zh_CN
        * 动画状态机片段着色器文件名列表
        * @version Egret 3.0
        * @platform Web,Native
        */
        public fragment_shaders: { [shaderPhaseType: number]: string[] } = {};

        /**
        * @language zh_CN
        * 对于每个面片而言周期时间
        * @version Egret 3.0
        * @platform Web,Native
        */
        public loopTime: number = 0;

        /**
        * @language zh_CN
        * 粒子走完一轮所需要的总时间(秒)
        * @version Egret 3.0
        * @platform Web,Native
        */
        public circleTime: number = 0;

        /**
        * @language zh_CN
        * 是否反转 1.0是反转 0.0是不反转
        * @version Egret 3.0
        * @platform Web,Native
        */
        public reverse: number = 1.0;//0.0/1.0

        /**
        * @language zh_CN
        * 跟随的目标
        * @version Egret 3.0
        * @platform Web,Native
        */
        public followTarget: Object3D = null;


        public directionArray: Array<Vector3D>;
        /**
        * @private
        */
        private _emitter: ParticleEmitter;

        /**
        * @language zh_CN
        * 构造函数
        * @param name 粒子动画状态名
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor(name: string, emitter: ParticleEmitter) {
            this._emitter = emitter;
            this.name = name;

            this.animNodes = [];
            this.keyFrames = [];
        }

        /**
       * @language zh_CN
       * 获取发射器
       * @return ParticleEmitter
       * @version Egret 3.0
       * @platform Web,Native
       */
        public get emitter(): ParticleEmitter {
            return this._emitter;
        }

        /**
        * @language zh_CN
        * 添加动画功能节点
        * 添加继承 animNodeBase 功能节点 例如粒子的 加速度功能节点，匀速功能节点
        * @param node 节点对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        public addNode(node: AnimationNode) {
            node.state = this;
            this.animNodes.push(node);
        }

        /**
        * @language zh_CN
        * 移除动画功能节点
        * 删除指定的动画功能节点，但是不能动态删除，需要进行 功能重置
        * @param node 节点对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        public removeNode(node: AnimationNode) {
            var index: number = this.animNodes.indexOf(node);
            if (index != -1)
                this.animNodes.splice(index, 1);
        }

        /**
       * @language zh_CN
       * 清空分配好的动画节点
       * @param node 节点对象
       * @version Egret 3.0
       * @platform Web,Native
       */
        public clean() {
            this.animNodes.length = 0;
        }

        private addShaderPhase(sourcePhase: { [shaderPhase: number]: string[] }, targetPhase: { [shaderPhase: number]: string[] }) {
            //##FilterBegin## ##Particle##
            //##FilterEnd##
        }

        /**
        * @language zh_CN
        * 计算节点
        * @private 
        */
        public calculate(geometry: Geometry) {
            //##FilterBegin## ##Particle##
            //##FilterEnd##
        }

        /**
        * @language zh_CN
        * @private 
        */
        public fill(geometry: Geometry, maxParticle: number) {
            //##FilterBegin## ##Particle##
            //##FilterEnd##
        }

        /**
        * @language zh_CN
        * @private 
        */
        public update(animTime: number, delay: number, geometry: Geometry) {
            //##FilterBegin## ##Particle##
            //##FilterEnd##
        }



        private _particleProperty: Float32Array = new Float32Array(22);
        private _particleFsData: Float32Array = new Float32Array(3);
        /**
        * @language zh_CN
        * @private 
        */
        public activeState(time: number, animTime: number, delay: number, animDelay: number, usage: PassUsage, geometry: SubGeometry, context3DProxy: Context3DProxy, camera3D: Camera3D) {
            //##FilterBegin## ##Particle##
            //##FilterEnd##
        }


    }
}