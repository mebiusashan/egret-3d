module egret3d {
    
    /**
     * @language zh_CN
     * @class egret3d.IAnimationState
     * @classdesc
     * 动画状态机
     * 为粒子系统时,会保存相应的粒子功能节点
     * @version Egret 3.0
     * @platform Web,Native
     */
    export interface IAnimationState {
        
        /**
        * @language zh_CN
        * 动画状态机名字
        * @version Egret 3.0
        * @platform Web,Native
        */
        name: string;
                
        /**
        * @language zh_CN
        * 动画状态机顶点着色器文件名列表
        * @version Egret 3.0
        * @platform Web,Native
        */
        vertex_shaders?: { [shaderPhaseType: number]: string[] };
                                         
                        

    
        /**
        * @language zh_CN
        * 动画状态机片段着色器文件名列表
        * @version Egret 3.0
        * @platform Web,Native
        */
        fragment_shaders?: { [shaderPhaseType: number]: string[] };
                                
        /**
        * @language zh_CN
        * 新增顶点个数总量
        * @version Egret 3.0
        * @platform Web,Native
        */
        numberOfVertices?: number;
                                        
        /**
        * @language zh_CN
        * 新增顶点的长度
        * @version Egret 3.0
        * @platform Web,Native
        */
        vertexSizeInBytes?: number;
                                                
        /**
        * @language zh_CN
        * 动画效果节点列表
        * @version Egret 3.0
        * @platform Web,Native
        */
        animNodes?: AnimationNode[];
                                                        
        /**
        * @language zh_CN
        * 动画关键帧列表
        * @version Egret 3.0
        * @platform Web,Native
        */
        keyFrames?: AnimationCurve[];
    }
}