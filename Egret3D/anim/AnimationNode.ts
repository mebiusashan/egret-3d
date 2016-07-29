module egret3d {

    /**
     * @language zh_CN
     * @class egret3d.AnimationNode
     * @classdesc
     * 动画效果节点
     * 
     * @version Egret 3.0
     * @platform Web,Native
     */
    export class AnimationNode extends EventDispatcher {
        
        /**
        * @language zh_CN
        * 效果节点名
        * @version Egret 3.0
        * @platform Web,Native
        */
        public name: string; 

                
        /**
        * @language zh_CN
        * 顶点着色器文件名
        * @version Egret 3.0
        * @platform Web,Native
        */
        public vertex_ShaderName: { [shaderPhase: number]: string[] } = {};
        
        /**
        * @language zh_CN
        * 片断着色器文件名
        * @version Egret 3.0
        * @platform Web,Native
        */
        public fragment_ShaderName: { [shaderPhase: number]: string[] } = {};
                        
                        
        /**
        * @language zh_CN
        * shader attribute 变量列表
        * @version Egret 3.0
        * @platform Web,Native
        */
        public attributes: Array<GLSL.VarRegister> = new Array<GLSL.VarRegister>();
                                
        /**
        * @language zh_CN
        * 动画状态
        * @version Egret 3.0
        * @platform Web,Native
        */
        public state: IAnimationState; 

        /**
        * @private
        */
        public build(geometry: Geometry, count: number) {
        
        }

        /**
        * @private
        */
        public initNode(data: ParticleDataNode, arg:any): void {

        }
        /**
        * @private
        */
        public update(animTime: number, delay: number, geometry:Geometry) {
        }

        /**
        * @private
        */
        public activeState(time: number, animTime: number, delay: number, animDelay: number, usage: PassUsage, geometry: SubGeometry, context3DProxy: Context3DProxy) {
        }

        /**
        * @private
        */
        public upload() {
        }
    }
} 