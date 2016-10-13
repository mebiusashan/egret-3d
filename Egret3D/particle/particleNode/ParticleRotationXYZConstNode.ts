module egret3d {

    /**
    * @private
    * 粒子的旋转角速度，当前实现为XYZ轴的速度
    */
    export class ParticleRotationXYZConstNode extends AnimationNode {

        private _rotationSpeed: Vec3ConstRandomValueShape;
        private attribute_rotSpeedXYZ: GLSL.VarRegister;
        private attribute_rotBirthXYZ: GLSL.VarRegister;
        constructor() {
            super();
            //##FilterBegin## ##Particle##
            this.name = "ParticleRotationXYZConstNode";

            this.vertex_ShaderName[ShaderPhaseType.local_vertex] = this.vertex_ShaderName[ShaderPhaseType.local_vertex] || [];
            this.vertex_ShaderName[ShaderPhaseType.local_vertex].push("particle_rotationXYZConst");

            this.attribute_rotBirthXYZ = new GLSL.VarRegister();
            this.attribute_rotBirthXYZ.name = "attribute_rotBirthXYZ";
            this.attribute_rotBirthXYZ.size = 3;
            this.attributes.push(this.attribute_rotBirthXYZ);

            this.attribute_rotSpeedXYZ = new GLSL.VarRegister();
            this.attribute_rotSpeedXYZ.name = "attribute_rotSpeedXYZ";
            this.attribute_rotSpeedXYZ.size = 3;
            this.attributes.push(this.attribute_rotSpeedXYZ);

            


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
            this._rotationSpeed = new Vec3ConstRandomValueShape();
            this._rotationSpeed.maxX = node.max.x;
            this._rotationSpeed.maxY = node.max.y;
            this._rotationSpeed.maxZ = node.max.z;
            this._rotationSpeed.minX = node.min.x;
            this._rotationSpeed.minY = node.min.y;
            this._rotationSpeed.minZ = node.min.z;
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
            var data: any[] = this._rotationSpeed.calculate(count);
            var birthRotX: number;
            var birthRotY: number;
            var birthRotZ: number;
            for (var i: number = 0; i < count; ++i) {
                var rot: Vector3D = data[i];
                birthRotX = Math.random() * 360 - 180;
                birthRotY = Math.random() * 360 - 180;
                birthRotZ = Math.random() * 360 - 180;
                for (var j: number = 0; j < vertices; ++j) {
                    index = i * vertices + j;
                    index = index * geometry.vertexAttLength + this.attribute_rotSpeedXYZ.offsetIndex;

                    geometry.vertexArray[index + 0] = rot.x;
                    geometry.vertexArray[index + 1] = rot.y;
                    geometry.vertexArray[index + 2] = rot.z;

                    index = i * vertices + j;
                    index = index * geometry.vertexAttLength + this.attribute_rotBirthXYZ.offsetIndex;
                    geometry.vertexArray[index + 0] = birthRotX;
                    geometry.vertexArray[index + 1] = birthRotY;
                    geometry.vertexArray[index + 2] = birthRotZ;

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
            this._rotationSpeed.dispose();
            this._rotationSpeed = null;
            //##FilterEnd##
        }

        /**
        * @private 
        */
        public dispose(): void {
            super.dispose();
            this._rotationSpeed = null;
        }


    }
} 