module egret3d {

    /**
    * @private
    * 粒子的旋转角速度，当前实现为Z轴的速度（todo：模型粒子或许需要同时有x/y/z三个方向的角速度）
    */
    export class ParticleRotationConstNode extends AnimationNode {

        private _rotation: ConstRandomValueShape;
        private attribute_Rotation: GLSL.VarRegister
        constructor() {
            super();
            //##FilterBegin## ##Particle##
            this.name = "ParticleRotationConstNode";

            this.vertex_ShaderName[ShaderPhaseType.local_vertex] = this.vertex_ShaderName[ShaderPhaseType.local_vertex] || [];
            this.vertex_ShaderName[ShaderPhaseType.local_vertex].push("particle_rotationConst");

            this.attribute_Rotation = new GLSL.VarRegister();
            this.attribute_Rotation.name = "attribute_rotationZ";
            this.attribute_Rotation.size = 1;
            this.attributes.push(this.attribute_Rotation);
            //##FilterEnd##
        }



        /**
        * @language zh_CN
        * 填充粒子过程旋转数据
        * @param data ParticleDataNode 粒子数据来源
        * @version Egret 3.0
        * @platform Web,Native
        */
        public initNode(data: ParticleDataNode): void {
            //##FilterBegin## ##Particle##
            var node: ParticleDataRotationSpeed = <ParticleDataRotationSpeed>data;
            this._rotation = new ConstRandomValueShape();
            this._rotation.max = node.max.z;
            this._rotation.min = node.min.z;
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
            var index: number = 0;
            var vertices: number = geometry.vertexCount / count;
            var data: any[] = this._rotation.calculate(count);

            for (var i: number = 0; i < count; ++i) {
                var rot: number = data[i];
                for (var j: number = 0; j < vertices; ++j) {
                    index = i * vertices + j;
                    index = index * geometry.vertexAttLength + this.attribute_Rotation.offsetIndex;

                    geometry.vertexArray[index + 0] = rot;
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
            this._rotation.dispose();
            this._rotation = null;
            //##FilterEnd##
        }

        /**
        * @private 
        */
        public dispose(): void {
            super.dispose();
            this._rotation = null;
        }


    }
} 