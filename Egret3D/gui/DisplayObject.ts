module egret3d {
    /**
    * @private
    * @class egret3d.gui.DisplayObject
    * @classdesc 2D显示对象基础类
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class DisplayObject extends EventDispatcher {

        public id: number;
        public name: string;

        public aabb: Rectangle = new Rectangle();
        public pickResult: PickResult;

        public mouseEnable: boolean = true;
        public mouseChildern: boolean = true;

        public hasMouseMove: boolean = false;
        public hasMouseDown: boolean = false;
        public hasMouseUp: boolean = false;
        public hasMouseClick: boolean = false;
        public hasMouseOut: boolean = false;

        public mouseInState: boolean = false;

        protected _renderText: boolean = false;
        private _parent: DisplayObject;
        private _stage: QuadStage;
        private _childs: DisplayObject[] = [];



        protected _rgbNumber: number = 0xffffff;
        protected _alphaNumber: number = 1.0;
        protected _color: ColorTransform = new ColorTransform();
        protected _pivot: Vector3D = new Vector3D();
        protected _pos: Vector3D = new Vector3D();
        protected _rot: Vector3D = new Vector3D();
        protected _sca: Vector3D = new Vector3D(1.0, 1.0, 100.0, 100.0);

        protected _globalColor: ColorTransform = new ColorTransform();
        protected _globalPos: Vector3D = new Vector3D();
        protected _globalRot: Vector3D = new Vector3D();
        protected _globalSca: Vector3D = new Vector3D(1.0, 1.0, 100.0, 100.0);

        protected _localMaskRect: Rectangle;
        protected _globalMaskRect: Rectangle;

        protected _orientation = new Quaternion();
        protected _globalOrientation = new Quaternion();

        protected _localVisible: boolean = true;
        protected _globalVisible: boolean = true;

        protected _visibleChange: boolean = true;
        protected _colorChange: boolean = true;
        protected _transformChange: boolean = true;
        protected _maskRectChange: boolean = true;

        protected _transformInvalid: boolean = true;
        protected _renderTextInvalid: boolean = true;
        protected _maskRectInvalid: boolean = true;
        protected _colorInvalid: boolean = true;
        protected _textureInvalid: boolean = true;
        protected _visibleInvalid: boolean = true;

        protected _qut: Quaternion = new Quaternion();
        protected _vec: Vector3D = new Vector3D();
        public parentIsStage: boolean = false;

        constructor() {
            super();
        }


        public get mouseX(): number {
            var temp: DisplayObject = this;
            var x: number = Input.mouseX;
            while (temp) {
                x -= temp.x;
                if (temp.parent && !temp.parentIsStage) {
                    temp = temp.parent;
                } else {
                    temp = null;
                }
            }
            return x;
        }

        public get mouseY(): number {
            var temp: DisplayObject = this;
            var y: number = Input.mouseY;
            while (temp) {
                y -= temp.y;
                if (temp.parent && !temp.parentIsStage) {
                    temp = temp.parent;
                } else {
                    temp = null;
                }
            }
            return y;
        }


        /**
        * @language zh_CN
        * 获得当前舞台引用
        * @return 所在舞台对象，有可能为null
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get stage(): QuadStage {
            return this._stage;
        }

        /**
        * @language zh_CN
        * 获得子节点列表的引用
        * @return DisplayObject的列表
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get childs(): DisplayObject[] {
            return this._childs;
        }


        /**
        * @language zh_CN
        * 获得父亲节点，有可能为null
        * @return DisplayObject 2d显示对象引用
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get parent(): DisplayObject {
            return this._parent;
        }

     


        /**
        * @language zh_CN
        * 设定渲染类型，目前支持textfield和默认类型2种
        * @param number渲染类型，1.0为文本类型，其他未默认类型
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set renderText(value: boolean) {
            if (value != this._renderText) {
                this._renderTextInvalid = true;
                this._renderText = value;
            }
        }


        /**
        * @language zh_CN
        * 设定宽度
        * @value 宽度的数据
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set width(value: number) {
            if (value != this._sca.z) {
                this._sca.z = value;
                this.updateTransformChange(true);
            }
        }

        public get width(): number { return this._sca.z }


        /**
        * @language zh_CN
        * 设定高度数据
        * @param value 高度数据
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set height(value: number) {
            if (value != this._sca.w) {
                this._sca.w = value;
                this.updateTransformChange(true);
            }
        }

        public get height(): number { return this._sca.w }

        /**
        * @language zh_CN
        * 设定注册点x位置
        * @param value 注册点x坐标数据
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set pivotX(value: number) {
            if (value != this._pivot.x) {
                this._pivot.x = value;
                this.updateTransformChange(true);
            }
        }

        public get pivotX(): number { return this._pivot.x }

        /**
        * @language zh_CN
        * 设定注册点y位置
        * @param value 注册点y坐标数据
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set pivotY(value: number) {
            if (value != this._pivot.y) {
                this._pivot.y = value;
                this.updateTransformChange(true);
            }
        }

        public get pivotY(): number { return this._pivot.y }

        /**
        * @language zh_CN
        * 设定注册点z位置
        * @param value 注册点z坐标数据
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set pivotZ(value: number) {
            if (value != this._pivot.z) {
                this._pivot.z = value;
                this.updateTransformChange(true);
            }
        }

        public get mask(): Rectangle { return this._localMaskRect; }

        /**
        * @language zh_CN
        * 设定遮罩范围
        * @param value 遮罩范围，数据将被拷贝进来
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set mask(value: Rectangle) {
            if (value == null && this._localMaskRect == null)
                return;
            this._localMaskRect = this._localMaskRect || new Rectangle();
            this._localMaskRect.copyFrom(value);
            this.updateMaskChange(true);
        }

        public get pivotZ(): number { return this._pivot.z }

        protected calculateTransform() {
            if (!this._transformChange)
                return;

            if (this._parent != null) {
                var parentOrientation: Quaternion = this._parent.globalOrientation;
                this._globalOrientation.multiply(parentOrientation, this._orientation);
                this._globalOrientation.toEulerAngles(this._globalRot);
                var parentScale: Vector3D = this._parent.globalScale;
                this._globalSca.copyFrom(parentScale.multiply(this._sca));
                parentOrientation.transformVector(parentScale.multiply(this._pos), this._globalPos);
                this._globalPos.copyFrom(this._globalPos.add(this._parent.globalPosition));
            }
            else {
                this._globalOrientation.copyFrom(this._orientation);
                this._globalPos.copyFrom(this._pos);
                this._globalSca.copyFrom(this._sca);
                this._globalRot.copyFrom(this._rot);

            }

            this._transformChange = false;
            this.calculateMask();

            this.onUpdateTransform();
        }


        private calculateMask(): void {
            this.calculateTransform();

            if (!this._maskRectChange)
                return;

            if (this._parent) {
                if (this._localMaskRect) {
                    this._globalMaskRect = this._globalMaskRect || new Rectangle();
                    this._globalMaskRect.x = this._localMaskRect.x * this._globalSca.x + this._globalPos.x;
                    this._globalMaskRect.y = this._localMaskRect.y * this._globalSca.y + this._globalPos.y;
                    this._globalMaskRect.width = this._localMaskRect.width * this._globalSca.x;
                    this._globalMaskRect.height = this._localMaskRect.height * this._globalSca.y;
                    if (this._parent.globalMask)
                        this._globalMaskRect.innerArea(this._parent.globalMask, this._globalMaskRect);
                } else {
                    if (this._parent.globalMask) {
                        this._globalMaskRect = this._globalMaskRect || new Rectangle();
                        this._globalMaskRect.copyFrom(this._parent.globalMask);
                    } else {
                        this._globalMaskRect = null;
                    }
                }
            }
            else {
                if (this._localMaskRect) {
                    this._globalMaskRect = this._globalMaskRect || new Rectangle();
                    this._globalMaskRect.x = this._localMaskRect.x * this._globalSca.x + this._globalPos.x;
                    this._globalMaskRect.y = this._localMaskRect.y * this._globalSca.y + this._globalPos.y;
                    this._globalMaskRect.width = this._localMaskRect.width * this._globalSca.x;
                    this._globalMaskRect.height = this._localMaskRect.height * this._globalSca.y;
                } else {
                    this._globalMaskRect = null;
                }
            }

            this._maskRectChange = false;
        }

        protected onUpdateTransform() {
        }


        //------------------
        //mouse event
        public dispatchMuseDown() {
            if (this.hasEventListener(MouseEvent3D.MOUSE_DOWN)) {
                var mouseEvent: MouseEvent3D = new MouseEvent3D(MouseEvent3D.MOUSE_DOWN);
                mouseEvent.target = this;
                this.dispatchEvent(mouseEvent);
            }
        }

        public dispatchMuseUp() {
            if (this.hasEventListener(MouseEvent3D.MOUSE_UP)) {
                var mouseEvent: MouseEvent3D = new MouseEvent3D(MouseEvent3D.MOUSE_UP);
                mouseEvent.target = this;
                this.dispatchEvent(mouseEvent);
            }
        }

        public dispatchMuseClick() {
            if (this.hasEventListener(MouseEvent3D.MOUSE_CLICK)) {
                var mouseEvent: MouseEvent3D = new MouseEvent3D(MouseEvent3D.MOUSE_CLICK);
                mouseEvent.target = this;
                this.dispatchEvent(mouseEvent);
            }
        }

        public dispatchMuseMove() {
            if (this.hasEventListener(MouseEvent3D.MOUSE_MOVE)) {
                var mouseEvent: MouseEvent3D = new MouseEvent3D(MouseEvent3D.MOUSE_MOVE);
                mouseEvent.target = this;
                this.dispatchEvent(mouseEvent);
            }
        }

        public dispatchMuseOut() {
            if (this.hasEventListener(MouseEvent3D.MOUSE_OUT)) {
                var mouseEvent: MouseEvent3D = new MouseEvent3D(MouseEvent3D.MOUSE_OUT);
                mouseEvent.target = this;
                this.dispatchEvent(mouseEvent);
            }
        }



























        /**
        * @language zh_CN
        * 添加孩子节点
        * @param object 被添加的孩子节点
        * @version Egret 3.0
        * @platform Web,Native
        */
        public addChild(object: DisplayObject): DisplayObject {
            return this.doAddChildAt(object, MathUtil.MAX_VALUE);
        }

        /**
        * @language zh_CN
        * 添加孩子节点至某个index位置
        * @param object 被添加的孩子节点
        * @param index 指定的层级关系index
        * @return DisplayObject 如果添加成功，返回当前object对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        public addChildAt(object: DisplayObject, index: number): DisplayObject {
            return this.doAddChildAt(object, index);
        }

        private doAddChildAt(object: DisplayObject, index: number): DisplayObject {
            if (object == null)
                return null;
            if (object.parent) {
                throw Error("This object is already the other child object.");
            }
            if (this._childs.indexOf(object) >= 0) {
                throw Error("The same child object has been added.");
            }
            if (index < 0) {
                throw Error("Child index can not be small than 0 !");
            }

            if (index >= this._childs.length) {
                this._childs.push(object);
            } else {
                this._childs.splice(index, 0, object);
            }

            object._parent = this;
            this._stage && this._stage.setRenderListInvalid();
            object.activeStage(this._stage);
            return object;
        }

        /**
        * @language zh_CN
        * 移除某个孩子节点
        * @param object 被移除的孩子节点
        * @return DisplayObject 如果移除成功，返回当前object对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        public removeChild(object: DisplayObject): DisplayObject {
            return this.doRemoveChild(object);
        }

        /**
        * @language zh_CN
        * 移除指定层级的孩子节点
        * @param index 指定的层级
        * @return DisplayObject 如果移除成功，返回当前object对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        public removeChildAt(index: number): DisplayObject {
            return this.doRemoveChild(this._childs[index]);
        }


        private doRemoveChild(object: DisplayObject): DisplayObject {
            if (object == null)
                return null;
            var index: number = this._childs.indexOf(object);
            if (index == -1)
                throw Error("The display isn't a child of this container!");
            this._childs.splice(index, 1);
            object._parent = null;
            this._stage && this._stage.setRenderListInvalid();
            object.activeStage(null);
            return object;
        }

        /**
        * @language zh_CN
        * 交换孩子节点至指定的层级（未实现）
        * @param object 外部传入的将要交换的节点
        * @param index 指定的层级
        * @version Egret 3.0
        * @platform Web,Native
        */
        public swapChildIndex(object: DisplayObject, index: number) {

        }

        /**
        * @language zh_CN
        * 变更舞台信息，从舞台移除或者添加到舞台后触发
        * @param stage 最新的舞台数据
        * @version Egret 3.0
        * @platform Web,Native
        */
        public activeStage(stage: QuadStage): void {
            if (this._stage != stage) {
                this._stage = stage;
                this.updateMaskChange(true);
                this.updateTransformChange(true);
                this.updateColorChange(true);
                this.updateVisibleChange(true);

                for (var i: number = 0, count: number = this._childs.length; i < count; i++) {
                    this._childs[i].activeStage(stage);
                }

            }
        }

        public hasChild(display: DisplayObject): number {
            return -1;
        }

        public getChildByIndex(index: number): DisplayObject {
            return null;
        }

        public getChildByName(name: string): DisplayObject {
            return null;
        }

        /**
        * @language zh_CN
        * 在渲染之前逻辑更新，每帧执行一次
        * @param time 当前运行的总时间
        * @param delay 振间隔时间
        * @version Egret 3.0
        * @platform Web,Native
        */
        public update(time: number, delay: number) {
            this.globalPosition;
            this.globalRotation;
            this.globalScale;

            this.globalColor;
            this.globalVisible;
            this.globalMask;

            this.updateMouseAABB();
        }

        protected updateMouseAABB(): void {
            if (this.mouseEnable) {

                var pos: Vector3D = this.globalPosition;
                var sca: Vector3D = this.globalScale;

                if (this._maskRectInvalid || this._transformInvalid) {
                    //更新mouse aabb
                    this.aabb.x = pos.x;
                    this.aabb.y = pos.y;
                    //inner mask
                    this.aabb.width = this.width * sca.x;
                    this.aabb.height = this.height * sca.y;
                    if (this.globalMask) {
                        this.aabb.innerArea(this.globalMask, this.aabb);
                    }
                } else {
                    //不需要更新
                }

            } else {
                this.aabb.setTo(0, 0, 0, 0);
            }
        }

        protected updateMaskChange(change: boolean) {
            if (this._maskRectChange == change)
                return;
            this._maskRectChange = change;
            this._maskRectInvalid = change;
            for (var i: number = 0; i < this._childs.length; ++i) {
                this._childs[i].updateMaskChange(change);
            }
        }

        /**
        * @language zh_CN
        * 设置缩放/旋转/位移信息状态
        * @param change 是否有更新
        * @version Egret 3.0
        * @platform Web,Native
        */
        protected updateTransformChange(change: boolean) {
            if (this._transformChange == change)
                return;
            this._transformChange = change;
            this._transformInvalid = change;
            for (var i: number = 0; i < this._childs.length; ++i) {
                this._childs[i].updateTransformChange(change);
            }

            this.updateMaskChange(change);
        }


        protected updateVisibleChange(change: boolean): void {
            if (this._visibleChange == change)
                return;
            this._visibleChange = change;
            this._visibleInvalid = change;
            for (var i: number = 0; i < this._childs.length; ++i) {
                this._childs[i].updateVisibleChange(change);
            }
        }

        public get globalVisible(): boolean {
            if (this._visibleChange) {
                if (this._parent) {
                    this._globalVisible = this._localVisible && this._parent.globalVisible;
                } else {
                    this._globalVisible = this._localVisible;
                }
                this._visibleChange = false;
            }
            return this._globalVisible;
        }

        /**
        * @language zh_CN
        * 设置可见信息
        * @param value 是否可见
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set visible(value: boolean) {
            if (this._localVisible != value) {
                this._localVisible = value;
                this.updateVisibleChange(true);
            }
        }

        public get visible(): boolean {
            return this._localVisible;
        }

        /**
        * @language zh_CN
        * 设置颜色变换信息状态
        * @param change 是否有更新
        * @version Egret 3.0
        * @platform Web,Native
        */
        protected updateColorChange(change: boolean) {
            if (this._colorChange == change)
                return;
            this._colorChange = change;
            this._colorInvalid = change;
            for (var i: number = 0; i < this._childs.length; ++i) {
                this._childs[i].updateColorChange(change);
            }
        }

        /**
        * @language zh_CN
        * 返回 object 世界位置 x
        * @returns object 世界位置x
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get globalX(): number {
            return this.globalPosition.x;
        }

        /**
        * @language zh_CN
        * 返回 object 世界位置 y
        * @returns object 世界位置 y
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get globalY(): number {
            return this.globalPosition.y;
        }


        /**
        * @language zh_CN
        * 返回 object 世界位置 z
        * @returns object 世界位置 z
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get globalZ(): number {
            return this.globalPosition.z;
        }

        /**
        * @language zh_CN
        * 设置 object 世界位置 x
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set globalX(value: number) {
            this._vec.copyFrom(this.globalPosition);
            this._vec.x = value;
            this.globalPosition = this._vec;
        }

        /**
        * @language zh_CN
        * 设置 object 世界位置 y
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set globalY(value: number) {
            this._vec.copyFrom(this.globalPosition);
            this._vec.y = value;
            this.globalPosition = this._vec;
        }



        /**
        * @language zh_CN
        * 设置 object 世界位置 z
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set globalZ(value: number) {
            this._vec.copyFrom(this.globalPosition);
            this._vec.z = value;
            this.globalPosition = this._vec;
        }

        /**
        * @language zh_CN
        * 返回 object 世界位置
        * 返回世界坐标系的 全局位置坐标
        * @returns object 世界位置
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get globalPosition(): Vector3D {
            if (this._transformChange) {
                this.calculateTransform();
            }
            return this._globalPos;
        }

        /**
        * @language zh_CN
        * 设置 object 世界位置
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set globalPosition(pos: Vector3D) {
            if (this._parent) {
                this._parent.globalOrientation.inverse(this._qut);
                pos.subtract(this._parent.globalPosition, this._vec);
                this._qut.transformVector(this._vec, this._vec);
                this._vec.divided(this._parent.globalScale, this._vec);

                this.position = this._vec;
            }
            else {
                this.position = pos;
            }
        }


        /**
        * @language zh_CN
        * 返回 object 世界旋转x
        * @returns object 世界旋转x
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get globalRotationX(): number {
            return this.globalRotation.x;
        }


        /**
        * @language zh_CN
        * 返回 object 世界旋转y
        * @returns object 世界旋转y
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get globalRotationY(): number {
            return this.globalRotation.y;
        }


        /**
        * @language zh_CN
        * 返回 object 世界旋转z
        * @returns object 世界旋转z
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get globalRotationZ(): number {
            return this.globalRotation.z;
        }

        /**
        * @language zh_CN
        * 设置 object 世界旋转 x
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set globalRotationX(value: number) {
            this._vec.copyFrom(this.globalRotation);
            this._vec.x = value;
            this.globalRotation = this._vec;
        }

        /**
        * @language zh_CN
        * 设置 object 世界旋转 y
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set globalRotationY(value: number) {
            this._vec.copyFrom(this.globalRotation);
            this._vec.y = value;
            this.globalRotation = this._vec;
        }

        /**
        * @language zh_CN
        * 设置 object 世界旋转 z
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set globalRotationZ(value: number) {
            this._vec.copyFrom(this.globalRotation);
            this._vec.z = value;
            this.globalRotation = this._vec;
        }

        /**
        * @language zh_CN
        * 返回 object 世界旋转
        * 返回世界坐标系的 全局旋转信息
        * @returns object 世界旋转
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get globalRotation(): Vector3D {
            if (this._transformChange) {
                this.calculateTransform();
            }
            return this._globalRot;
        }


        /**
        * @language zh_CN
        * 设置 object 世界旋转
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set globalRotation(rot: Vector3D) {
            this._qut.fromEulerAngles(rot.x, rot.y, rot.z);
            this.globalOrientation = this._qut;
        }

        /**
        * @language zh_CN
        * 返回 object 世界缩放
        * 返回世界坐标系的 全局缩放信息
        * @returns object 世界缩放
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get globalScale(): Vector3D {
            if (this._transformChange) {
                this.calculateTransform();
            }
            return this._globalSca;
        }

        /**
        * @language zh_CN
        * 设置 object 世界缩放
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set globalScale(sca: Vector3D) {
            if (this._parent) {
                sca.divided(this._parent.globalScale, this._vec);
                this.scale = this._vec;
            }
            else {
                this.scale = sca;
            }
        }

        /**
        * @language zh_CN
        * 设置 object 世界缩放 x
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set globalScaleX(value: number) {
            this._vec.copyFrom(this.globalScale);
            this._vec.x = value;
            this.globalScale = this._vec;
        }

        /**
        * @language zh_CN
        * 设置 object 世界缩放 y
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set globalScaleY(value: number) {
            this._vec.copyFrom(this.globalScale);
            this._vec.y = value;
            this.globalScale = this._vec;
        }

        /**
        * @language zh_CN
        * 设置 object 世界缩放 z
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set globalScaleZ(value: number) {
            this._vec.copyFrom(this.globalScale);
            this._vec.z = value;
            this.globalScale = this._vec;
        }

        /**
        * @language zh_CN
        * 获取 object 世界缩放 x
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get globalScaleX(): number {
            return this.globalScale.x;
        }


        /**
        * @language zh_CN
        * 获取 object 世界缩放 y
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get globalScaleY(): number {
            return this.globalScale.y;
        }

        /**
        * @language zh_CN
        * 获取 object 世界缩放 z
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get globalScaleZ(): number {
            return this.globalScale.z;
        }

        /**
        * @language zh_CN 
        * 返回 object 世界旋转 四元数
        * 返回世界坐标系的 全局旋转信息，数据类型是 四元素
        * @returns object 世界旋转
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get globalOrientation(): Quaternion {
            if (this._transformChange) {
                this.calculateTransform();
            }
            return this._globalOrientation;
        }

        /**
        * @language zh_CN
        * 设置 object 世界旋转 四元数
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set globalOrientation(ori: Quaternion) {
            if (this._parent) {
                this._parent.globalOrientation.inverse(this._qut);
                this._qut.multiply(this._qut, ori);
                this.orientation = this._qut;
            }
            else {
                this.orientation = ori;
            }
        }

        public get globalMask(): Rectangle {
            if (this._maskRectChange) {
                this.calculateMask();
            }
            return this._globalMaskRect;
        }

        /**
        * @language zh_CN
        * 返回位移。</p>
        * 获取容器的坐标位置，基于父节点的位置坐标。</p>
        * @returns 位移
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get position(): Vector3D {
            return this._pos;
        }

        /**
        * @language zh_CN
        * 设置位移。</p>
        * 设置基于父节点的位置坐标，当父容器发生变化时，子节点也会变化。</p>
        * @param vec 位移
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set position(vec: Vector3D) {
            this._pos.copyFrom(vec);
            this.updateTransformChange(true);
        }

        /**
        * @language zh_CN
        * 返回旋转。</p>
        * 获取容器的旋转信息，基于父节点的旋转信息 欧拉角信息。</p>
        * @returns 旋转 欧拉角信息
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get rotation(): Vector3D {
            return this._rot;
        }

        /**
        * @language zh_CN
        * 设置旋转 。</p>
        * 设置基于父节点的旋转信息 欧拉角信息，当父容器发生变化时，子节点也会变化。</p>
        * @param vec 旋转 欧拉角信息
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set rotation(value: Vector3D) {
            this._rot.x = value.x;
            this._rot.y = value.y;
            this._rot.z = value.z;

            this._orientation.fromEulerAngles(this._rot.x, this._rot.y, this._rot.z);
            this.updateTransformChange(true);
        }

        /**
        * @language zh_CN
        * 设置旋转。</p>
        * 设置旋转 基于四元素 旋转信息，当父容器发生变化时，子节点也会变化。</p>
        * @param value 旋转
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set orientation(value: Quaternion) {
            this._orientation.copyFrom(value);
            this._orientation.toEulerAngles(this._rot);

            this.updateTransformChange(true);
        }

        /**
        * @language zh_CN
        * 设置旋转 分量x
        * @param value 分量x
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set orientationX(value: number) {
            if (this._orientation.x == value)
                return;
            this._orientation.x = value;
            this._orientation.toEulerAngles(this._rot);

            this.updateTransformChange(true);
        }

        /**
        * @language zh_CN
        * 设置旋转 分量y
        * @param value 分量y
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set orientationY(value: number) {
            if (this._orientation.y == value)
                return;
            this._orientation.y = value;
            this._orientation.toEulerAngles(this._rot);

            this.updateTransformChange(true);
        }

        /**
        * @language zh_CN
        * 设置旋转 分量z
        * @param value 分量z
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set orientationZ(value: number) {
            if (this._orientation.z == value)
                return;
            this._orientation.z = value;
            this._orientation.toEulerAngles(this._rot);

            this.updateTransformChange(true);
        }

        /**
        * @language zh_CN
        * 设置旋转 分量w
        * @param value 分量w
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set orientationW(value: number) {
            if (this._orientation.w == value)
                return;
            this._orientation.w = value;
            this._orientation.toEulerAngles(this._rot);

            this.updateTransformChange(true);
        }

        /**
        * @language zh_CN
        * 返回旋转。</p>
        * 返回 基于四元素的旋转信息。</p>
        * @returns 旋转
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get orientation(): Quaternion {
            return this._orientation;
        }

        /**
        * @language zh_CN
        * 返回缩放。</p>
        * 返回基于父容器的缩放信息。</p>
        * @returns 缩放
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get scale(): Vector3D {
            return this._sca;
        }

        /**
        * @language zh_CN
        * 设置缩放。</p>
        * 设置基于父容器的缩放信息，当父容器发生变化时，子节点也会变化。</p>
        * @param vec 缩放
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set scale(val: Vector3D) {
            this._sca = val;
            this.updateTransformChange(true);
        }

        /**
        * @language zh_CN
        * 设置x坐标。</p>
        * 设置基于父容器的位置信息，当父容器发生变化时，子节点也会变化，值不变。</p>
        * @param value x坐标
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set x(value: number) {
            if (this._pos.x == value)
                return;

            this._pos.x = value;
            this.updateTransformChange(true);
        }

        /**
        * @language zh_CN
        * 设置y坐标。</p>
        * 设置基于父容器的位置信息，当父容器发生变化时，子节点也会变化，值不变。</p>
        * @param value y坐标
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set y(value: number) {
            if (this._pos.y == value)
                return;
            this.updateTransformChange(true);
            this._pos.y = value;
        }

        /**
        * @language zh_CN
        * 设置z坐标。</p>
        * 设置基于父容器的位置信息，当父容器发生变化时，子节点也会变化，值不变。</p>
        * @param value z坐标
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set z(value: number) {
            if (this._pos.z == value)
                return;
            this._pos.z = value;
            this.updateTransformChange(true);
        }

        /**
        * @language zh_CN
        * 设置x轴旋转。</p>
        * 设置基于父容器的旋转信息，当父容器发生变化时，子节点也会变化，值不变。</p>
        * @param value x轴旋转
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set rotationX(value: number) {
            if (this._rot.x == value)
                return;
            this._rot.x = value;
            this._orientation.fromEulerAngles(this._rot.x, this._rot.y, this._rot.z);
            this.updateTransformChange(true);
        }

        /**
        * @language zh_CN
        * 设置y轴旋转。</p>
        * 设置基于父容器的旋转信息，当父容器发生变化时，子节点也会变化，值不变。</p>
        * @param value y轴旋转
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set rotationY(value: number) {
            if (this._rot.y == value)
                return;
            this._rot.y = value;
            this._orientation.fromEulerAngles(this._rot.x, this._rot.y, this._rot.z);
            this.updateTransformChange(true);
        }

        /**
        * @language zh_CN
        * 设置z轴旋转。</p>
        * 设置基于父容器的旋转信息，当父容器发生变化时，子节点也会变化，值不变。</p>
        * @param value z轴旋转
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set rotationZ(value: number) {
            if (this._rot.z == value)
                return;
            this._rot.z = value;
            this._orientation.fromEulerAngles(this._rot.x, this._rot.y, this._rot.z);
            this.updateTransformChange(true);
        }

        /**
        * @language zh_CN
        * 设置x轴缩放。</p>
        * 设置基于父容器的旋转信息，当父容器发生变化时，子节点也会变化，值不变
        * @param value x轴缩放
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set scaleX(value: number) {
            if (this._sca.x == value)
                return;
            this._sca.x = value;
            this.updateTransformChange(true);
        }

        /**
        * @language zh_CN
        * 设置y轴缩放
        *  
        * 设置基于父容器的旋转信息，当父容器发生变化时，子节点也会变化，值不变
        * @param value y轴缩放
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set scaleY(value: number) {
            if (this._sca.y == value)
                return;
            this.updateTransformChange(true);
            this._sca.y = value;
        }

        /**
        * @language zh_CN
        * 设置z轴缩放
        *  
        * 设置基于父容器的旋转信息，当父容器发生变化时，子节点也会变化，值不变
        * @param value z轴缩放
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set scaleZ(value: number) {
            if (this._sca.z == value)
                return;
            this._sca.z = value;
            this.updateTransformChange(true);
        }

        /**
        * @language zh_CN
        * 返回x坐标
        * 返回基于父容器的位置坐标信息值
        * @returns x坐标
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get x(): number {
            return this._pos.x;
        }

        /**
        * @language zh_CN
        * 返回y坐标
        *  
        * 返回基于父容器的位置坐标信息值
        * @returns y坐标
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get y(): number {
            return this._pos.y;
        }

        /**
        * @language zh_CN
        * 返回z坐标
        *  
        * 返回基于父容器的位置坐标信息值
        * @returns z坐标
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get z(): number {
            return this._pos.z
        }

        /**
        * @language zh_CN
        * 返回x旋转
        *  
        * 返回基于父容器的位置旋转信息值
        * @returns x旋转
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get rotationX(): number {
            return this._rot.x;
        }

        /**
        * @language zh_CN
        * 返回y旋转
        *  
        * 返回基于父容器的位置旋转信息值
        * @returns y旋转
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get rotationY(): number {
            return this._rot.y;
        }

        /**
        * @language zh_CN
        * 返回z旋转
        *  
        * 返回基于父容器的位置旋转信息值
        * @returns z旋转
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get rotationZ(): number {
            return this._rot.z;
        }

        /**
        * @language zh_CN
        * 返回x缩放
        * 返回基于父容器的缩放信息值
        * @returns x缩放
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get scaleX(): number {
            return this._sca.x;
        }

        /**
        * @language zh_CN
        * 返回y缩放
        * 返回基于父容器的缩放信息值
        * @returns y缩放
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get scaleY(): number {
            return this._sca.y;
        }

        /**
        * @language zh_CN
        * 返回z缩放
        * 返回基于父容器的缩放信息值
        * @returns z缩放
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get scaleZ(): number {
            return this._sca.z;
        }


        /**
        * @language zh_CN
        * 返回全局的颜色变换信息
        * @returns colorTransform
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get globalColor(): ColorTransform {
            if (this._colorChange) {
                this._color.alpha = this._alphaNumber;
                this._color.setColorRGB(this._rgbNumber);

                if (this._parent) {
                    this._globalColor.multiply(this._parent.globalColor);
                } else {
                    this._globalColor.copyFrom(this._color);
                }
                this._colorChange = false;
            }
            return this._color;
        }

        /**
        * @language zh_CN
        * 设置颜色 0xffffff格式
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set color(value: number) {
            if (this._rgbNumber != value) {
                this._rgbNumber = value;
                this.updateColorChange(true);
            }
        }

        /**
        * @language zh_CN
        * 返回颜色值 0xffffff格式
        * @returns color
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get color(): number {
            return this._rgbNumber;
        }


        /**
        * @language zh_CN
        * 设置alpha值[0,1]之间的一个数
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set alpha(value: number) {
            this._alphaNumber = value;
            if (this._alphaNumber != value) {
                this._alphaNumber = value;
                this.updateColorChange(true);
            }
        }

        /**
        * @language zh_CN
        * 获得alpha值，[0,1]之间的一个数
        * @returns number alpha
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get alpha(): number {
            return this._alphaNumber;
        }




    }
}