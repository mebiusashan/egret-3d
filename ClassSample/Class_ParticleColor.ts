module egret3d {
    export class Class_ParticleColor extends Class_View3D {

        //private plane: Mesh;
        protected view1: View3D;

        protected cameraCrl: LookAtController;
        private particle: ParticleEmitter;

        private cube: Mesh; 
        constructor() {
            super();
            this._egret3DCanvas.addEventListener(Event3D.ENTER_FRAME, this.update, this);

            var view1: View3D = new View3D(0, 0, 1024, 768);
            this.view1 = view1;

            view1.camera3D.lookAt(new Vector3D(0, 500, -500), new Vector3D(0, 0, 0));
            view1.backColor = 0xff000000;
            this._egret3DCanvas.addView3D(view1);

            var bgImg: HTMLImageElement = <HTMLImageElement>document.getElementById("bg");
            var tex: ImageTexture = new ImageTexture(bgImg);
            //view1.backImage = tex;

            this.cameraCrl = new LookAtController(this.view1.camera3D, new Object3D());
            this.cameraCrl.distance = 1000;

            var planemat: TextureMaterial = new TextureMaterial();
            var loadtex1: URLLoader = new URLLoader("resource/effect/line_0010.png");
            loadtex1.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onLoadTexture, this);
            loadtex1["mat"] = planemat;

            this.cube = new Mesh(new CubeGeometry(10, 40, 10), null);
            this.view1.addChild3D(this.cube);

            var mat: TextureMaterial = new TextureMaterial();
            mat.bothside = true;
            mat.ambientColor = 0xffffff;
            mat.blendMode = BlendMode.ADD;
            var data: ParticleData = new ParticleData();
            data.geometry.planeW = data.geometry.planeH = 30;

            //var follow: ParticleDataFollowTarget = new ParticleDataFollowTarget();
            //data.followTarget = follow;


            var life: ParticleDataLife = data.life;
            life.max = 6;
            life.min = 6;
            life.duration = 5;
            life.delay = 0.5;
            life.loop = true;

            var emission: ParticleDataEmission = data.emission;
            emission.rate = 2;

            var property: ParticleDataProperty = data.property;
            property.particleCount = 100;
            property.renderMode = ParticleRenderModeType.StretchedBillboard;
            property.colorConst1.setTo(255, 255, 255, 255);
            property.colorConst2.setTo(255, 255, 255, 255);
            //property.gravity = 10;

            var speed: ParticleDataMoveSpeed = data.moveSpeed;
            speed.max = 50;
            speed.min = 50;

            var velocityOver: VelocityOverLifeTimeData = new VelocityOverLifeTimeData();
            speed.velocityOver = velocityOver;
            speed.velocityOver.type = ParticleValueType.OneBezier;

            var xBezier: BezierData = new BezierData();
            xBezier.posPoints.push(new Point(0, 0));
            xBezier.posPoints.push(new Point(0.5, 20));
            xBezier.posPoints.push(new Point(0.55, 20));
            xBezier.posPoints.push(new Point(1.0, 8));
           
            xBezier.ctrlPoints.push(new Point(0, 10));
            xBezier.ctrlPoints.push(new Point(0.55, 20));
            xBezier.ctrlPoints.push(new Point(0.56, 20));
            xBezier.ctrlPoints.push(new Point(1.0, 8));

            speed.velocityOver.xBezier1 = xBezier;

            var yBezier: BezierData = new BezierData();
            yBezier.posPoints.push(new Point(0, 0));
            yBezier.posPoints.push(new Point(0.7, 40));
            yBezier.posPoints.push(new Point(0.75, 40));
            yBezier.posPoints.push(new Point(1.0, 16));

            yBezier.ctrlPoints.push(new Point(0, 10));
            yBezier.ctrlPoints.push(new Point(0.75, 40));
            yBezier.ctrlPoints.push(new Point(0.76, 40));
            yBezier.ctrlPoints.push(new Point(1.0, 20));
            speed.velocityOver.yBezier1 = yBezier;

            var zBezier: BezierData = new BezierData();
            zBezier.posPoints.push(new Point(0, 0));
            zBezier.posPoints.push(new Point(0, 0));
            zBezier.ctrlPoints.push(new Point(1, 0));
            zBezier.ctrlPoints.push(new Point(1, 0));
            speed.velocityOver.zBezier1 = zBezier;


            var colorOffset: ParticleDataColorOffset = new ParticleDataColorOffset();
            data.colorOffset = colorOffset;
            colorOffset.data.colors.push(new Color(255.0, 0.0, 0.0, 255.0));
            colorOffset.data.colors.push(new Color(0.0, 255.0, 0.0, 255.0));
            colorOffset.data.colors.push(new Color(0.0, 0.0, 255.0, 255.0));
            colorOffset.data.colors.push(new Color(0.0, 255.0, 0.0, 255.0));
            colorOffset.data.colors.push(new Color(255.0, 0.0, 0.0, 128.0));
            colorOffset.data.colors.push(new Color(255.0, 0.0, 0.0, 0.0));
            colorOffset.data.times.push(0.0);
            colorOffset.data.times.push(0.2);
            colorOffset.data.times.push(0.4);
            colorOffset.data.times.push(0.6);
            colorOffset.data.times.push(0.7);
            colorOffset.data.times.push(1.0);

            var sizeBezier: ParticleDataScaleBezier = new ParticleDataScaleBezier();
            data.scaleBezier = sizeBezier;

            sizeBezier.data.posPoints.push(new Point(0, 0));
            sizeBezier.data.posPoints.push(new Point(0.5, 2));
            sizeBezier.data.posPoints.push(new Point(0.55, 2));
            sizeBezier.data.posPoints.push(new Point(1.0, 0.2));

            sizeBezier.data.ctrlPoints.push(new Point(0, 1));
            sizeBezier.data.ctrlPoints.push(new Point(0.55, 2));
            sizeBezier.data.ctrlPoints.push(new Point(0.56, 2));
            sizeBezier.data.ctrlPoints.push(new Point(1.0, 0.2));


            this.particle = new ParticleEmitter(data, mat);

            this.view1.addChild3D(new AxisMesh(200));

            this.particle.play();
            this.view1.addChild3D(this.particle);

            
           
            //this.particle.followTarget = this.cube ;

            var loadtex: URLLoader = new URLLoader("resource/effect/line_0010.png");
            loadtex.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onLoadTexture, this);
            loadtex["mat"] = mat;

            var vv: HTMLInputElement = <HTMLInputElement>document.createElement("input");
            vv.type = "submit";
            vv.value = "rest";
            document.body.appendChild(vv);
            vv.onmousedown = (e: MouseEvent) => this.mouseDown(e);
            
        }

        protected mouseDown(e: MouseEvent) {
            this.particle.play();
        }

        protected obj: Object3D;
        protected onLoadTexture(e: LoaderEvent3D) {
           e.loader["mat"].diffuseTexture = e.loader.data;
        }

        private angle: number = 0; 
        public update(e: Event3D) {
            this.cameraCrl.update();
            this.angle += 0.001;
            this.cube.x = Math.cos(this.angle * 0.4) * 200;
            this.cube.z = Math.sin(this.angle * 0.4) * 200;

            //this.cube.rotationY = this.angle * 20;
            this.cube.rotationZ = this.angle * 10;

            var scale: number = Math.sin(this.angle * 0.4);
            scale = 2 * Math.abs(scale);
            //this.cube.scale = new Vector3D(scale, scale, scale);

            //this.particle.scale = this.cube.scale;
            //this.particle.rotationX = 0;
            //this.particle.rotationY = 90;
            //this.particle.rotationZ = this.angle * 1000;

            this.cube.rotationX = 0;
            this.cube.rotationY = 90;
            this.cube.rotationZ = this.angle * 1000;
        }

    }
} 