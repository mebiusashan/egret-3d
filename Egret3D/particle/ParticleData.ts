module egret3d {
    /**
    * @language zh_CN
    * 粒子数据节点类型
    * @version Egret 3.0
    * @platform Web,Native
    */
    export enum ParticleDataNodeType {
        //以下类型必须有
        Property,
        Emission,
        Life,
        Shape,
        RotationBirth,
        ScaleBirth,
        Geometry,
        MoveSpeed,
        //其他挂接节点
        FollowTarget,
        ScaleBezier,
        RotationSpeed,
        ColorOffset,
        TextureSheet,
        //Acceleration,
    }

    /**
    * @language zh_CN
    * 子发射器阶段
    * @version Egret 3.0
    * @platform Web,Native
    */
    export enum ParticleDataSubEmitterPhase {
        BIRTH,
        COLLISION,
        DEATH
    }

    /**
    * @language zh_CN
    * 粒子数据类型
    * @version Egret 3.0
    * @platform Web,Native
    */
    export enum ParticleValueType{
        Const,
        RandomConst,
        OneBezier,
        TwoBezier,
    }


    /**
    * @language zh_CN
    * 粒子的几何形状
    * @version Egret 3.0
    * @platform Web,Native
    */
    export enum ParticleRenderModeType {
        Billboard,
        StretchedBillboard,
        HorizontalBillboard,
        VerticalBillboard,
        Mesh,
    }


    /**
    * @language zh_CN
    * 粒子出生颜色
    * @version Egret 3.0
    * @platform Web,Native
    */
    export enum ParticleBirthColorType {
        Const,
        RandomConst,
        OneGradients,
        TwoGradients,
    }


    /**
    * @language zh_CN
    * 发射器形状
    * @version Egret 3.0
    * @platform Web,Native
    */
    export enum ParticleDataShapeType {
        Point,
        Cube,
        Sphere,
        HemiSphere,
        Cone,
        Mesh,
    }

    /**
    * @language zh_CN
    * 外置模型发射器类型
    * @version Egret 3.0
    * @platform Web,Native
    */
    export enum ParticleMeshShapeType {
        Vertex,
        Triangle,
        Edge,
    }


    /**
    * @language zh_CN
    * 圆筒发射器类型
    * @version Egret 3.0
    * @platform Web,Native
    */
    export enum ParticleConeShapeType {
        Base,
        BaseShell,
        Volume,
        VolumeShell,
    }






    /**
     * @private
     * @class egret3d.ParticleData
     */
    export class ParticleData {

        public fileUrl: string;
        public fileName: string;

        public property: ParticleDataProperty = new ParticleDataProperty();
        public emission: ParticleDataEmission = new ParticleDataEmission();
        public life: ParticleDataLife = new ParticleDataLife();
        public shape: ParticleDataShape = new ParticleDataShape();
        public rotationBirth: ParticleDataRotationBirth = new ParticleDataRotationBirth();
        public scaleBirth: ParticleDataScaleBirth = new ParticleDataScaleBirth();
        public geometry: ParticleDataGeometry = new ParticleDataGeometry();
        public moveSpeed: ParticleDataMoveSpeed = new ParticleDataMoveSpeed();

        public followTarget: ParticleDataFollowTarget;
        public scaleBezier: ParticleDataScaleBezier;
        public rotationSpeed: ParticleDataRotationSpeed;
        public colorOffset: ParticleDataColorOffset;

        public materialData: MatSphereData;
        public textureSheet: ParticleDataTextureSheet;

        public static SCALE_VALUE: number = 1;
        /**
        * @language zh_CN
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor() {
        }

        public validate(): void {
            this.property.validate();
            this.emission.validate();
            this.life.validate();
            this.shape.validate();
            this.rotationBirth.validate();
            this.scaleBirth.validate();
            this.geometry.validate();
            this.moveSpeed.validate();

           
            if (this.scaleBezier) {
                this.scaleBezier.validate();
            }
            if (this.rotationSpeed) {
                this.rotationSpeed.validate();
            }
            if (this.colorOffset) {
                this.colorOffset.validate();
            }
            if (this.followTarget) {
                this.followTarget.validate();
            }
            if (this.textureSheet) {
                this.textureSheet.validate();
            }

        }



        public scaleBy(value: number): void {
            //
            this.property.bounds.scaleBy(value);
            this.property.gravity *= value;
            this.property.position.scaleBy(value);

            //
            this.shape.cubeW *= value;
            this.shape.cubeH *= value;
            this.shape.cubeD *= value;

            this.shape.sphereRadius *= value;

            this.shape.hemiSphereRadius *= value;

            this.shape.coneLength *= value;
            this.shape.coneRadius *= value;

            //
            this.geometry.planeW *= value;
            this.geometry.planeH *= value;

            //
            this.moveSpeed.max *= value;
            this.moveSpeed.min *= value;
            if (this.moveSpeed.bezier1) {
                this.moveSpeed.bezier1.scaleBy(value);
            }
            if (this.moveSpeed.bezier2) {
                this.moveSpeed.bezier2.scaleBy(value);
            }
            if (this.moveSpeed.velocityOver) {
                this.moveSpeed.velocityOver.scaleBy(value);
            }
            if (this.moveSpeed.velocityLimit) {
                this.moveSpeed.velocityLimit.scaleBy(value);
            }
            if (this.moveSpeed.velocityForce) {
                this.moveSpeed.velocityForce.scaleBy(value);
            }

            //

        }
    }


    export class ParticleDataNode {
        protected _nodeType: number;
        constructor(node:number) {
            this._nodeType = node;
        }
        public get nodeType(): number {
            return this._nodeType;
        }
    }

    /**
    * @language zh_CN
    * 粒子的基础属性
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class ParticleDataProperty extends ParticleDataNode {
        public particleCount: number = 10;

        public bounds: Vector3D = new Vector3D(10, 10, 10);
        //初始颜色
        public colorType: number = ParticleBirthColorType.Const;
        public colorConst1: Color = new Color(255, 255, 255, 255);
        public colorConst2: Color = new Color(255, 255, 255, 255);
        public colorGradients1: ColorGradients;
        public colorGradients2: ColorGradients;
        //颜色矫正
        public tintColor: Color = new Color(128, 128, 128, 128);
        //重力
        public gravity: number = 0;
        //是否预热
        public prewarm: boolean = false;

        public rotation: Vector3D = new Vector3D(0, 0, 0, 1);
        public scale: Vector3D = new Vector3D(1, 1, 1, 1);
        public position: Vector3D = new Vector3D(0, 0, 0, 1);

        public sortingFudge: number = 0;
        //render mode
        public renderMode: number = ParticleRenderModeType.Billboard;
        public cameraScale: number = 0.0;
        public speedScale: number = 0.0;
        public lengthScale: number = 1.0;

        public meshFile: string;
        public geometry: Geometry;

        constructor() {
            super(ParticleDataNodeType.Property);
        }

        public validate(): void {
            if(this.bounds == null) {
                this.bounds = new Vector3D(10, 10, 10);
            }
            if (this.bounds.x < 0) {
                this.bounds.x = 1;
            }
            if (this.bounds.y < 0) {
                this.bounds.y = 1;
            }
            if (this.bounds.z < 0) {
                this.bounds.z = 1;
            }
            if (this.particleCount < 0) {
                this.particleCount = 10;
            }
            if (this.colorConst1 == null) {
                this.colorConst1 = new Color(255, 255, 255, 255);
            }
            if (this.colorConst2 == null) {
                this.colorConst2 = new Color(255, 255, 255, 255);
            }
            if (this.colorType == ParticleBirthColorType.OneGradients || this.colorType == ParticleBirthColorType.TwoGradients) {
                if (this.colorGradients1 == null) {
                    this.colorGradients1 = new ColorGradients();
                }
            }
            if (this.colorType == ParticleBirthColorType.TwoGradients) {
                if (this.colorGradients2 == null) {
                    this.colorGradients2 = new ColorGradients();
                }
            }

            if (this.rotation == null) {
                this.rotation = new Vector3D(0, 0, 0, 1);
            }
            if (this.scale == null) {
                this.scale = new Vector3D(1, 1, 1, 1);
            }
            if (this.position == null) {
                this.rotation = new Vector3D(0, 0, 0, 1);
            }
        }
    } 

    export class ParticleDataEmission extends ParticleDataNode {
        public rate: number = 10;
        public type: number = ParticleValueType.Const;
        public bursts: Array<Point>;

        public bezier: BezierData = new BezierData();
        constructor() {
            super(ParticleDataNodeType.Emission);
        }

        public validate(): void {
            if (this.rate < 0) {
                this.rate = 0.00001;
            }
            if (this.type == ParticleValueType.OneBezier) {
                if (this.bezier == null) {
                    this.bezier = new BezierData();
                }
                this.bezier.validate();
            }
        }
    }


    export class ParticleDataLife extends ParticleDataNode{
        public type: number = ParticleValueType.Const;
        public max: number = 0;
        public min: number = 0;
        public bezier1: BezierData;
        public bezier2: BezierData;
       
        public duration: number = 5;


        public delay: number = 0;
        public loop: boolean = true;
        

        constructor() {
            super(ParticleDataNodeType.Life);
        }
        public validate(): void {
            if (this.max <= 0) {
                this.max = 1;
            }
            if (this.min > this.max) {
                this.min = this.max;
            }
            //life
            if (this.type == ParticleValueType.Const) {
                this.min = this.max;
            }
            if (this.type == ParticleValueType.RandomConst) {
                if (this.min > this.max) {
                    this.min = this.max;
                }
            }
            if (this.type == ParticleValueType.OneBezier || this.type == ParticleValueType.TwoBezier) {
                if (this.bezier1 == null) {
                    this.bezier1 = new BezierData();
                }
                this.bezier1.validate();
            }
            if (this.type == ParticleValueType.TwoBezier) {
                if (this.bezier2 == null) {
                    this.bezier2 = new BezierData();
                }
                this.bezier2.validate();
            }
            //delay
            if (this.delay < 0) {
                this.delay = 0;
            }
            //duration
            if (this.duration < 0) {
                this.duration = 5;
            }
           
        }
    }

    export class ParticleDataShape extends ParticleDataNode {


        //粒子分布类型
        public type: number = ParticleDataShapeType.Cube;
        public randomDirection: boolean = false;

        //正方体
        public cubeW: number = 0;
        public cubeH: number = 0;
        public cubeD: number = 0;

        //球型
        public sphereRadius: number = 10;

        //半球
        public hemiSphereRadius: number = 10;

        //圆筒状
        public coneType: number = ParticleConeShapeType.Volume;
        public coneLength: number = 10;
        public coneRadius: number = 10;
        public coneAngle: number = 30;

        //mesh类型发射器的类型
        public meshType: number = ParticleMeshShapeType.Vertex;
        public meshFile: string;
        public geometry: Geometry;

        constructor() {
            super(ParticleDataNodeType.Shape);
        }
        public validate(): void {
            if (this.type == ParticleDataShapeType.Cube) {
                if (this.cubeW < 0) {
                    this.cubeW = 0;
                }
                if (this.cubeH < 0) {
                    this.cubeH = 0;
                }
                if (this.cubeD < 0) {
                    this.cubeD = 0;
                }
            }
            else if (this.type == ParticleDataShapeType.Sphere) {
                if (this.sphereRadius < 0) {
                    this.sphereRadius = 10;
                }
            }
        }
    }










    export class ParticleDataRotationBirth extends ParticleDataNode {
        //初始角度
        public type: number = ParticleValueType.Const;
        public max: number = 0;
        public min: number = 0;
        public bezier1: BezierData;
        public bezier2: BezierData;
        constructor() {
            super(ParticleDataNodeType.RotationBirth);
        }
        public validate(): void {

            if (this.type == ParticleValueType.Const) {
                this.min = this.max;
            }
            if (this.type == ParticleValueType.RandomConst) {
                if (this.min > this.max) {
                    this.min = this.max;
                }
            }
            if (this.type == ParticleValueType.OneBezier || this.type == ParticleValueType.TwoBezier) {
                if (this.bezier1 == null) {
                    this.bezier1 = new BezierData();
                }
                this.bezier1.validate();
            }
            if (this.type == ParticleValueType.TwoBezier) {
                if (this.bezier2 == null) {
                    this.bezier2 = new BezierData();
                }
                this.bezier2.validate();
            }
        }
    }



    export class ParticleDataScaleBirth extends ParticleDataNode {
        //初始缩放值
        public type: number = ParticleValueType.Const;
        public max: number = 1;
        public min: number = 1;
        public bezier1: BezierData;
        public bezier2: BezierData;
        constructor() {
            super(ParticleDataNodeType.ScaleBirth);
        }
        public validate(): void {

            if (this.type == ParticleValueType.Const) {
                this.min = this.max;
            }
            if (this.type == ParticleValueType.RandomConst) {
                if (this.min > this.max) {
                    this.min = this.max;
                }
            }
            if (this.type == ParticleValueType.OneBezier || this.type == ParticleValueType.TwoBezier) {
                if (this.bezier1 == null) {
                    this.bezier1 = new BezierData();
                }
                this.bezier1.validate();
            }
            if (this.type == ParticleValueType.TwoBezier) {
                if (this.bezier2 == null) {
                    this.bezier2 = new BezierData();
                }
                this.bezier2.validate();
            }
        }
    }


    export class ParticleDataGeometry extends ParticleDataNode {
        //粒子模型
        public planeW: number = 10;
        public planeH: number = 10;

        constructor() {
            super(ParticleDataNodeType.Geometry);
        }

        public validate(): void {
           
                if (this.planeW < 0) {
                    this.planeW = 10;
                }
                if (this.planeH < 0) {
                    this.planeH = 10;
                }
           

        }
    }

    
    


    export class ParticleDataMoveSpeed extends ParticleDataNode {
       
        //初始速度
        public type: number = ParticleValueType.Const;
        public max: number = 0;
        public min: number = 0;
        public bezier1: BezierData;
        public bezier2: BezierData;

        //叠加速度
        public velocityOver: VelocityOverLifeTimeData;
        //速度限制
        public velocityLimit: VelocityLimitLifeTimeData;
        //加速度
        public velocityForce: VelocityForceLifeTimeData;

        constructor() {
            super(ParticleDataNodeType.MoveSpeed);
        }

        public validate(): void {
            if (this.velocityOver) {
                this.velocityOver.validate();
            }
            if (this.velocityLimit) {
                this.velocityLimit.validate();
            }
            if (this.velocityForce) {
                this.velocityForce.validate();
            }
            if (this.type == ParticleValueType.Const) {
                this.min = this.max;
            }
            if (this.type == ParticleValueType.RandomConst) {
                if (this.min > this.max) {
                    this.min = this.max;
                }
            }
            if (this.type == ParticleValueType.OneBezier || this.type == ParticleValueType.TwoBezier) {
                if (this.bezier1 == null) {
                    this.bezier1 = new BezierData();
                }
                this.bezier1.validate();
            }
            if (this.type == ParticleValueType.TwoBezier) {
                if (this.bezier2 == null) {
                    this.bezier2 = new BezierData();
                }
                this.bezier2.validate();
            }
        }
    }


    export class VelocityLimitLifeTimeData{
        public type: number = ParticleValueType.Const;
        public max: number = 0;
        public min: number = 0;

        public bezier1: BezierData = new BezierData();
        public bezier2: BezierData = new BezierData();

        constructor() {
        }

        public validate(): void {
            if (this.max < 0) {
                this.max = 0;
            }
            if (this.min > this.max) {
                this.min = this.max;
            }

            if (this.type == ParticleValueType.Const) {
                this.min = this.max;
            }
            
            if (this.type == ParticleValueType.OneBezier || this.type == ParticleValueType.TwoBezier) {
                if (this.bezier1 == null) {
                    this.bezier1 = new BezierData();
                }
                this.bezier1.validate();
            }
            
            if (this.type == ParticleValueType.TwoBezier) {
                if (this.bezier2 == null) {
                    this.bezier2 = new BezierData();
                }               
                this.bezier2.validate();
            }

        }

        public scaleBy(value: number): void {
            this.min *= value;
            this.max *= value;
            if (this.bezier1) {
                this.bezier1.scaleBy(value);
            }
            if (this.bezier2) {
                this.bezier2.scaleBy(value);
            }

        }
    }


    export class VelocityOverLifeTimeData {
        public type: number = ParticleValueType.Const;
        public max: Vector3D = new Vector3D();
        public min: Vector3D = new Vector3D();
        public worldSpace: boolean = false;

        public xBezier1: BezierData = new BezierData();
        public yBezier1: BezierData = new BezierData();
        public zBezier1: BezierData = new BezierData();
                                   
        public xBezier2: BezierData = new BezierData();
        public yBezier2: BezierData = new BezierData();
        public zBezier2: BezierData = new BezierData();

        public validate(): void {

            if (this.max == null) {
                this.max = new Vector3D();
            }
            if (this.min == null) {
                this.min = this.max.clone();
            }
            if (this.type == ParticleValueType.OneBezier || this.type == ParticleValueType.TwoBezier) {
                if (this.xBezier1 == null) {
                    this.xBezier1 = new BezierData();
                }
                if (this.yBezier1 == null) {
                    this.yBezier1 = new BezierData();
                }
                if (this.zBezier1 == null) {
                    this.zBezier1 = new BezierData();
                }

                this.xBezier1.validate();
                this.yBezier1.validate();
                this.zBezier1.validate();
            }

            if (this.type == ParticleValueType.TwoBezier) {
                if (this.xBezier2 == null) {
                    this.xBezier2 = new BezierData();
                }
                if (this.yBezier2 == null) {
                    this.yBezier2 = new BezierData();
                }
                if (this.zBezier2 == null) {
                    this.zBezier2 = new BezierData();
                }
                this.xBezier2.validate();
                this.yBezier2.validate();
                this.zBezier2.validate();
            }

        }

        public scaleBy(value: number): void {
            this.min.scaleBy(value);
            this.max.scaleBy(value);
            if (this.xBezier1) {
                this.xBezier1.scaleBy(value);
            }
            if (this.yBezier1) {
                this.yBezier1.scaleBy(value);
            }
            if (this.zBezier1) {
                this.zBezier1.scaleBy(value);
            }
            if (this.xBezier2) {
                this.xBezier2.scaleBy(value);
            }
            if (this.yBezier2) {
                this.yBezier2.scaleBy(value);
            }
            if (this.zBezier2) {
                this.zBezier2.scaleBy(value);
            }

        }
    }


    export class VelocityForceLifeTimeData {
        public type: number = ParticleValueType.Const;
        public max: Vector3D = new Vector3D();
        public min: Vector3D = new Vector3D();
        public worldSpace: boolean = false;

        public xBezier1: BezierData = new BezierData();
        public yBezier1: BezierData = new BezierData();
        public zBezier1: BezierData = new BezierData();

        public xBezier2: BezierData = new BezierData();
        public yBezier2: BezierData = new BezierData();
        public zBezier2: BezierData = new BezierData();

        public validate(): void {

            if (this.max == null) {
                this.max = new Vector3D();
            }
            if (this.min == null) {
                this.min = this.max.clone();
            }
            if (this.type == ParticleValueType.OneBezier || this.type == ParticleValueType.TwoBezier) {
                if (this.xBezier1 == null) {
                    this.xBezier1 = new BezierData();
                }
                if (this.yBezier1 == null) {
                    this.yBezier1 = new BezierData();
                }
                if (this.zBezier1 == null) {
                    this.zBezier1 = new BezierData();
                }

                this.xBezier1.validate();
                this.yBezier1.validate();
                this.zBezier1.validate();
            }

            if (this.type == ParticleValueType.TwoBezier) {
                if (this.xBezier2 == null) {
                    this.xBezier2 = new BezierData();
                }
                if (this.yBezier2 == null) {
                    this.yBezier2 = new BezierData();
                }
                if (this.zBezier2 == null) {
                    this.zBezier2 = new BezierData();
                }
                this.xBezier2.validate();
                this.yBezier2.validate();
                this.zBezier2.validate();
            }

        }

        public scaleBy(value: number): void {
            this.min.scaleBy(value);
            this.max.scaleBy(value);
            if (this.xBezier1) {
                this.xBezier1.scaleBy(value);
            }
            if (this.yBezier1) {
                this.yBezier1.scaleBy(value);
            }
            if (this.zBezier1) {
                this.zBezier1.scaleBy(value);
            }
            if (this.xBezier2) {
                this.xBezier2.scaleBy(value);
            }
            if (this.yBezier2) {
                this.yBezier2.scaleBy(value);
            }
            if (this.zBezier2) {
                this.zBezier2.scaleBy(value);
            }

        }
    }


    //export class ParticleDataAcceleration extends ParticleDataNode {
    //    //加速度
    //    public max: Vector3D = new Vector3D();
    //    public min: Vector3D = new Vector3D();
    //    public accelerationWorld: boolean = false;

    //    constructor() {
    //        super(ParticleDataNodeType.Acceleration);
    //    }

    //    public validate(): void {
    //        if (this.max == null) {
    //            this.max = new Vector3D();
    //        }
    //        if (this.min == null) {
    //            this.min = new Vector3D();
    //        }
    //        if (this.min.x > this.max.x) {
    //            this.min.x = this.max.x;
    //        }
    //        if (this.min.y > this.max.y) {
    //            this.min.y = this.max.y;
    //        }
    //        if (this.min.z > this.max.z) {
    //            this.min.z = this.max.z;
    //        }
    //    }
    //}

    export class ParticleDataScaleBezier extends ParticleDataNode {
        //粒子缩放贝塞尔曲线
        public data: BezierData = new BezierData();
        constructor() {
            super(ParticleDataNodeType.ScaleBezier);
        }

        public validate(): void {
            if (this.data == null) {
                this.data = new BezierData();
            }
            this.data.validate();
        }
    }



    export class ParticleDataRotationSpeed extends ParticleDataNode {
        //角速度
        public max: Vector3D = new Vector3D();
        public min: Vector3D = new Vector3D();
        
        public type: number = ParticleValueType.Const;

        public bezier1: BezierData = new BezierData();
        public bezier2: BezierData = new BezierData();
        constructor() {
            super(ParticleDataNodeType.RotationSpeed);
        }


        public validate(): void {

            if (this.max == null) {
                this.max = new Vector3D();
            }
            if (this.min == null) {
                this.min = this.max.clone();
            }
            if (this.type == ParticleValueType.OneBezier || this.type == ParticleValueType.TwoBezier) {
                if (this.bezier1 == null) {
                    this.bezier1 = new BezierData();
                }
                this.bezier1.validate();
            }

            if (this.type == ParticleValueType.TwoBezier) {
                if (this.bezier2 == null) {
                    this.bezier2 = new BezierData();
                }
                this.bezier2.validate();
            }

        }
    }

    export class ParticleDataColorOffset extends ParticleDataNode {
        //粒子颜色变化贝塞尔曲线
        public data: ColorGradients = new ColorGradients();
        constructor() {
            super(ParticleDataNodeType.ColorOffset);
        }

        public validate(): void {
            if (this.data.colors == null) {
                this.data.colors = [];
            }
            if (this.data.times == null) {
                this.data.times = [];
            }
        }
    }

    export class ParticleDataFollowTarget extends ParticleDataNode {
        //跟随
        public followRotation: boolean = true;
        public followScale: boolean = true;

        constructor() {
            super(ParticleDataNodeType.FollowTarget);
        }

        public validate(): void {

        }

    }

    export class ParticleDataTextureSheet extends ParticleDataNode {

        /**
        * @language zh_CN
        * tileX 序列帧划分为多少列
        */
        public tileX: number = 1;

        /**
        * @language zh_CN
        * tileY 序列帧划分为多少行
        */
        public tileY: number = 1;

        /**
        * @language zh_CN
        * whole 范围是否为全部帧
        */
        public whole: boolean = true;

        /**
        * @language zh_CN
        * frameType 帧控制类型
        */
        public frameType: number = ParticleValueType.Const;

        /**
        * @language zh_CN
        * randomRow 是否随机单行
        */
        public randomRow: boolean = false;

        /**
        * @language zh_CN
        * row 指定锁定第几行播放
        */
        public row: number = 0;

        /**
        * @language zh_CN
        * min 常量范围最小值
        */
        public min: number = 0;


        /**
        * @language zh_CN
        * max 常量范围最大值
        */
        public max: number = 0;

        /**
        * @language zh_CN
        * circles 循环播放次数，最小值为1
        */
        public circles: number = 1;


        /**
        * @language zh_CN
        * bezier1 第一条贝塞尔曲线
        */
        public bezier1: BezierData = new BezierData();


        /**
        * @language zh_CN
        * bezier2 第二条贝塞尔曲线
        */
        public bezier2: BezierData = new BezierData();


        /**
        * @language zh_CN
        * constructor
        */
        constructor() {
            super(ParticleDataNodeType.TextureSheet);
        }


        public validate(): void {
            //
            if (this.tileX < 0) {
                this.tileX = 1;
            }
            this.tileX = Math.floor(this.tileX);
            //
            if (this.tileY < 0) {
                this.tileY = 1;
            }
            this.tileY = Math.floor(this.tileY);
            //
            if (this.max < 0) {
                this.max = 0;
            }
            if (this.min > this.max) {
                this.min = this.max;
            }
            //
            if (this.frameType == ParticleValueType.OneBezier || this.frameType == ParticleValueType.TwoBezier) {
                if (this.bezier1 == null) {
                    this.bezier1 = new BezierData();
                }
                this.bezier1.validate();
            }
            //
            if (this.frameType == ParticleValueType.TwoBezier) {
                if (this.bezier2 == null) {
                    this.bezier2 = new BezierData();
                }
                this.bezier2.validate();
            }
            //
            if (this.circles < 1) {
                this.circles = 1;
            }


        }
    }






    
}