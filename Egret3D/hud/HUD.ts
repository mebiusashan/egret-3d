module egret3d {

    /**
    * @class egret3d.HUD
    * @classdesc
    * HUD直接渲染在屏幕上的一张贴图</p>
    * 可直接指定2维坐标，贴图的宽度和高度。</p>
    * 其底层渲染也是由4个顶点构成，顶点数据结构有位置信息和uv信息。</p>
    * 其所有的HUD对象的顶点信息数据都是共用的。</p>
    * @version Egret 3.0
    * @platform Web,Native
    */
     export class HUD {

        private static singleQuadData: Float32Array =  new Float32Array([
            -1.0, -1.0, 0.0, 0.0, 1.0,
            1.0, -1.0, 0.0, 1.0, 1.0,
            1.0, 1.0, 0.0, 1.0, 0.0,
            -1.0, 1.0, 0.0, 0.0, 0.0
        ]);

        private static singleQuadIndex: Uint16Array = new Uint16Array([0, 1, 2, 0, 2, 3]);
        private static vertexBytes: number = 20;

        protected _diffuseTexture: ITexture;
        protected _viewPort: Rectangle;
        protected _rectangle: Rectangle = new Rectangle();
        protected _transformMatrix: Matrix4_4 = new Matrix4_4();
        protected _change: boolean = false;
        protected _rotation: Vector3D = new Vector3D();
        protected _scale: Vector3D = new Vector3D(1, 1, 1);
        protected _position: Vector3D = new Vector3D();
        protected _transformComponents: Vector3D[] = [];

        private _indexBuffer3D: IndexBuffer3D;
        private _vertexBuffer3D: VertexBuffer3D;
        private _changeTexture: boolean = false;
        private _textureStage: boolean = false;
        
        private _vertexFormat: number = VertexFormat.VF_POSITION | VertexFormat.VF_UV0;
        private _uv_scale: Float32Array = new Float32Array(2);

        /**
        * @language zh_CN
        * 名字
        * @version Egret 3.0
        * @platform Web,Native
        */
        public name: string = "";
        /**
        * @language zh_CN
        * 显示双面的开关。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public bothside: boolean = false;

        /**
        * @language zh_CN
        * cull模式。 正面可见ContextConfig.BACK 背面可见ContextConfig.FRONT
        * @version Egret 3.0
        * @platform Web,Native
        */
        public cullMode: number = ContextConfig.BACK;


        /**
        * @language zh_CN
        * 是否可见
        * @version Egret 3.0
        * @platform Web,Native
        */
        public visible: boolean = true;

        public vsShader: string = "hud_vs" ; 
        public fsShader: string = "hud_V_fs" ;

        protected _passUsage: PassUsage = new PassUsage();
        protected _attList: Array<GLSL.Attribute> = new Array<GLSL.Attribute>();


        /**
        * @language zh_CN
        * 创建一个HUD对象
        * @param x 屏幕x坐标 默认值 0
        * @param y 屏幕y坐标 默认值 0
        * @param width hud宽度 默认值 100
        * @param height hud高度 默认值 100
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor(x: number = 0, y: number = 0, width: number = 100, height: number = 100) {
            this._transformComponents.push(this._position);
            this._transformComponents.push(this._rotation);
            this._transformComponents.push(this._scale);
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this._uv_scale[0] = 1.0;
            this._uv_scale[1] = 1.0;
        }

        /**
        * @language zh_CN
        * 返回HUD的漫反射贴图。
        * @returns ITexture 漫反射贴图
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get diffuseTexture(): ITexture {
            return this._diffuseTexture;
        }

        /**
         * @language zh_CN
         * 设置HUD的漫反射贴图。
         * @param texture ITexture
         * @version Egret 3.0
         * @platform Web,Native
         */
        public set diffuseTexture(texture: ITexture) {
            this._changeTexture = true;
            this._diffuseTexture = texture;
        }

        /**
        * @language zh_CN
        * 设置x坐标
        * @param value x坐标
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set x(value: number) {
            this._change = true;
            this._rectangle.x = value;
        }

        /**
        * @language zh_CN
        * 设置y坐标
        * @param value y坐标
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set y(value: number) {
            this._change = true;
            this._rectangle.y = value;
        }

        /**
        * @language zh_CN
        * 得到x坐标
        * @returns number x坐标
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get x(): number {

            return this._rectangle.x;
        }

        /**
        * @language zh_CN
        * 得到y坐标
        * @returns number y坐标
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get y(): number {
            return this._rectangle.y;
        }

        /**
        * @language zh_CN
        * 设置HUD的宽度
        * @param value HUD宽
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set width(value: number) {
            this._change = true;
            this._rectangle.width = value;
        }

        /**
        * @language zh_CN
        * 设置HUD的高度
        * @param value HUD高
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set height(value: number) {
            this._change = true;
            this._rectangle.height = value;
        }

        /**
        * @language zh_CN
        *  得到HUD的宽度
        * @returns number HUD的宽度宽
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get width(): number {
            return this._rectangle.width;
        }

        /**
        * @language zh_CN
        * 得到HUD的高度
        * @returns number HUD的高度
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get height(): number {

            return this._rectangle.height;
        }

        /**
        * @language zh_CN
        * 返回x旋转
        * @returns x旋转
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get rotationX(): number {
            return this._rotation.x;
        }

        /**
        * @language zh_CN
        * 返回y旋转
        * @returns y旋转
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get rotationY(): number {
            return this._rotation.y;
        }

        /**
        * @language zh_CN
        * 返回z旋转
        * @returns z旋转
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get rotationZ(): number {
            return this._rotation.z;
        }

        /**
        * @language zh_CN
        * 设置x轴旋转。</p>
        * @param value x轴旋转
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set rotationX(value: number) {
            this._change = true;
            if (this._rotation.x == value)
                return;
            this._rotation.x = value;
        }

        /**
        * @language zh_CN
        * 设置y轴旋转。</p>
        * @param value y轴旋转
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set rotationY(value: number) {
            this._change = true;
            if (this._rotation.y == value)
                return;
            this._rotation.y = value;
        }

        /**
        * @language zh_CN
        * 设置z轴旋转。</p>
        * @param value z轴旋转
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set rotationZ(value: number) {
            this._change = true;
            if (this._rotation.z == value)
                return;

            this._rotation.z = value;
        }

        /**
        * @private
        */
        public set viewPort(viewPort: Rectangle) {
            this._viewPort = viewPort;
        }

        /**
        * @private
        */
        public set uScale(u: number) {
            //this._change = true;
            this._uv_scale[0] = u;

            if (this._uv_scale[0] > 1.0) {
                this._uv_scale[0] = 1.0;
            }
            if (this._uv_scale[0] < 0.0) {
                this._uv_scale[0] = 0.0;
            }
        }

        /**
        * @private
        */
        public set vScale(v: number) {
            //this._change = true;

            this._uv_scale[1] = v;
            if (this._uv_scale[1] > 1.0) {
                this._uv_scale[1] = 1.0;
            }
            if (this._uv_scale[1] < 0.0) {
                this._uv_scale[1] = 0.0;
            }
        }

        /**
        * @private
        */
        public get uScale():number {
            return this._uv_scale[0];
        }

        /**
        * @private
        */
        public get vScale(): number {
            return this._uv_scale[1];
        }

        /**
        * @private
        */
        public get transformMatrix(): Matrix4_4 {
            if (!this._viewPort) {
                return this._transformMatrix;
            }
            if (this._change) {

                //this._scale.x = this._rectangle.width / this._viewPort.width * 2.0;
                //this._scale.y = this._rectangle.height / this._viewPort.height * 2.0;

                //this._position.x = -(this._viewPort.width - (this._rectangle.x + this._viewPort.x + this._rectangle.width / 2) * 2.0) * (1 / this._viewPort.width);
                //this._position.y = (this._viewPort.height - (this._rectangle.y + this._viewPort.y + this._rectangle.height / 2) * 2.0) * (1 / this._viewPort.height);;
                this._scale.x = this._rectangle.width / this._viewPort.width;
                this._scale.y = this._rectangle.height / this._viewPort.height;

                this._position.x = MathUtil.ScreenToPosition(this._rectangle.x, this._rectangle.width, this._viewPort.width);
                this._position.y = -MathUtil.ScreenToPosition(this._rectangle.y, this._rectangle.height, this._viewPort.height);

                this._transformMatrix.recompose(this._transformComponents);
                this._change = false;
            }
            return this._transformMatrix;
        }

        protected updateTexture(context: Context3DProxy) {
            var sampler2D: GLSL.Sampler2D;
            for (var index in this._passUsage.sampler2DList) {
                sampler2D = this._passUsage.sampler2DList[index];
                sampler2D.uniformIndex = context.getUniformLocation(this._passUsage.program3D, sampler2D.varName);
                sampler2D.texture = this[sampler2D.varName];
            }
            this._changeTexture = false;
        }

        /**
        * @private
        */
        public upload(context: Context3DProxy) {
            if (!this._vertexBuffer3D) {
                this._vertexBuffer3D = context.creatVertexBuffer(HUD.singleQuadData);
            }

            if (!this._indexBuffer3D) {
                this._indexBuffer3D = context.creatIndexBuffer(HUD.singleQuadIndex);
            }


            this._passUsage.vertexShader.shaderType = Shader.vertex;
            this._passUsage.fragmentShader.shaderType = Shader.fragment;

            this._passUsage.vertexShader.addUseShaderName(this.vsShader);
            this._passUsage.fragmentShader.addUseShaderName(this.fsShader);

            //this._passUsage.vertexShader.addUseShaderName("hud_vs");
            //this._passUsage.fragmentShader.addUseShaderName("hud_fs");

            this._passUsage.vertexShader.shader = this._passUsage.vertexShader.getShader(this._passUsage);
            this._passUsage.fragmentShader.shader = this._passUsage.fragmentShader.getShader(this._passUsage);

            this._passUsage.program3D = ShaderPool.getProgram(this._passUsage.vertexShader.shader.id, this._passUsage.fragmentShader.shader.id);

            for (var property in this._passUsage) {
                if ((<string>property).indexOf("uniform") != -1) {
                    if (this._passUsage[property]) {
                        (<GLSL.Uniform>this._passUsage[property]).uniformIndex = context.getUniformLocation(this._passUsage.program3D, property);
                    }
                }
            }

            this._attList.length = 0;
            var offset: number = 0;
            if (this._passUsage.attribute_position) {
                if (!this._passUsage.attribute_position.uniformIndex) {
                    this._passUsage.attribute_position.uniformIndex = context.getShaderAttribLocation(this._passUsage.program3D, this._passUsage.attribute_position.varName);
                }

                this._attList.push(this._passUsage.attribute_position);
                this._passUsage.attribute_position.size = Geometry.positionSize;
                this._passUsage.attribute_position.dataType = ContextConfig.FLOAT;
                this._passUsage.attribute_position.normalized = false;
                this._passUsage.attribute_position.stride = HUD.vertexBytes;
                this._passUsage.attribute_position.offset = offset;

                offset += Geometry.positionSize * Float32Array.BYTES_PER_ELEMENT;
            }

            if (this._passUsage.attribute_uv0) {
                if (!this._passUsage.attribute_uv0.uniformIndex) {
                    this._passUsage.attribute_uv0.uniformIndex = context.getShaderAttribLocation(this._passUsage.program3D, this._passUsage.attribute_uv0.varName);
                }

                this._attList.push(this._passUsage.attribute_uv0);

                this._passUsage.attribute_uv0.size = Geometry.uvSize;
                this._passUsage.attribute_uv0.dataType = ContextConfig.FLOAT;
                this._passUsage.attribute_uv0.normalized = false;
                this._passUsage.attribute_uv0.stride = HUD.vertexBytes;
                this._passUsage.attribute_uv0.offset = offset;

                offset += Geometry.uvSize * Float32Array.BYTES_PER_ELEMENT;
            }

            this._passUsage["uv_scale"] = context.getUniformLocation(this._passUsage.program3D, "uv_scale");
        }

        /**
        * @private
        */
        public draw(contextProxy: Context3DProxy,camera:Camera3D = null ) {
            if (!this.visible) {
                return;
            }
            if (!this._passUsage.program3D) {
                this.upload(contextProxy); 
            }

            contextProxy.setProgram(this._passUsage.program3D);
            contextProxy.bindVertexBuffer(this._vertexBuffer3D);
            contextProxy.bindIndexBuffer(this._indexBuffer3D);

            for (var i: number = 0; i < 8; i++) {
                Context3DProxy.gl.disableVertexAttribArray(i);
            }

            for (var i: number = 0; i < this._attList.length; ++i) {
                var attribute: GLSL.Attribute = this._attList[i];
                if (attribute.uniformIndex >= 0) {
                    contextProxy.vertexAttribPointer(attribute.uniformIndex, attribute.size, attribute.dataType, attribute.normalized, attribute.stride, attribute.offset);
                }
            }

            if (this._changeTexture) {
                this.updateTexture(contextProxy);
            }

            //texture 2D
            var sampler2D: GLSL.Sampler2D;
            for (var index in this._passUsage.sampler2DList) {
                sampler2D = this._passUsage.sampler2DList[index];
                if (!sampler2D.texture) {
                    continue;
                }
                sampler2D.texture.upload(contextProxy);
                contextProxy.setTexture2DAt(sampler2D.activeTextureIndex, sampler2D.uniformIndex, sampler2D.index, sampler2D.texture.texture2D);
                if (this._textureStage) {
                    sampler2D.texture.activeState(contextProxy);
                    this._textureStage = false;
                }
            }

            if (this._passUsage.uniform_ViewProjectionMatrix) {
                contextProxy.uniformMatrix4fv(this._passUsage.uniform_ViewProjectionMatrix.uniformIndex, false, this.transformMatrix.rawData);
            }

            if (this._passUsage.uniform_ViewMatrix && camera) {
                contextProxy.uniformMatrix4fv(this._passUsage.uniform_ViewMatrix.uniformIndex, false, camera.viewMatrix.rawData);
            }

            if (this._passUsage.uniform_ProjectionMatrix && camera) {
                contextProxy.uniformMatrix4fv(this._passUsage.uniform_ProjectionMatrix.uniformIndex, false, camera.projectMatrix.rawData);
            }

            if (this._passUsage["uv_scale"] && this._passUsage["uv_scale"] != -1) {
                contextProxy.uniform2f(this._passUsage["uv_scale"], this._uv_scale[0], this._uv_scale[1]);
            }

            contextProxy.setCulling(this.cullMode);

            if (this.bothside) {
                contextProxy.disableCullFace();
            } else
                contextProxy.enableCullFace();

            contextProxy.enableBlend();
            contextProxy.setBlendFactors(ContextConfig.SRC_ALPHA, ContextConfig.ONE_MINUS_SRC_ALPHA);
            contextProxy.drawElement(DrawMode.TRIANGLES, 0, 6);
            contextProxy.clear(ContextConfig.DEPTH_BUFFER_BIT);
        }
    }
}