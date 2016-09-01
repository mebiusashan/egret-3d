module egret3d {
    export class Class_ParticleRotateTwoBezier extends Class_View3D {

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

            this.cameraCrl = new LookAtController(this.view1.camera3D, new Object3D());
            this.cameraCrl.distance = 1000;

            this.cube = new Mesh(new CubeGeometry(10, 40, 10), null);
            this.view1.addChild3D(this.cube);

            var mat: TextureMaterial = new TextureMaterial();
            mat.bothside = true;
            mat.ambientColor = 0xffffff;

            var data: ParticleData = new ParticleData();
            data.geometry.planeW = data.geometry.planeH = 30;

            //var follow: ParticleDataFollowTarget = new ParticleDataFollowTarget();
            //data.followTarget = follow;


            var life: ParticleDataLife = data.life;
            life.max = 4;
            life.min = 4;
            life.duration = 5;
            life.delay = 0.5;
            life.loop = true;


            var emission: ParticleDataEmission = data.emission;
            emission.rate = 1;

            var property: ParticleDataProperty = data.property;
            property.particleCount = 100;
            property.colorConst1.setTo(255, 255, 255, 255);
            property.colorConst2.setTo(255, 255, 255, 255);
            //property.gravity = 10;

            var speed: ParticleDataMoveSpeed = data.moveSpeed;
            speed.max = 50;
            speed.min = 50;

            var rotation: ParticleDataRotationSpeed = new ParticleDataRotationSpeed();
            data.rotationSpeed = rotation;
            rotation.type = ParticleValueType.TwoBezier;
            //const
            rotation.max.setTo(0, 0, 100);
            rotation.min.setTo(0, 0, -100);
            //___bezier1
            var bezier1: BezierData = new BezierData();
            bezier1.posPoints.push(new Point(0, 0));
            bezier1.posPoints.push(new Point(0.3, 160));
            bezier1.posPoints.push(new Point(0.35, 160));
            bezier1.posPoints.push(new Point(1.0, -140));
           
            bezier1.ctrlPoints.push(new Point(0, 120));
            bezier1.ctrlPoints.push(new Point(0.35, 160));
            bezier1.ctrlPoints.push(new Point(0.36, 160));
            bezier1.ctrlPoints.push(new Point(1.0, -140));
            rotation.bezier1 = bezier1;

            //___bezier2
            var bezier2: BezierData = new BezierData();
            bezier2.posPoints.push(new Point(0, 0));
            bezier2.posPoints.push(new Point(0.3, 115));
            bezier2.posPoints.push(new Point(0.35, 115));
            bezier2.posPoints.push(new Point(1.0, 130));

            bezier2.ctrlPoints.push(new Point(0, 105));
            bezier2.ctrlPoints.push(new Point(0.35, 115));
            bezier2.ctrlPoints.push(new Point(0.36, 115));
            bezier2.ctrlPoints.push(new Point(1.0, 130));
            rotation.bezier2= bezier2;

            //__bezier end


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


            this.particle = new ParticleEmitter(data, mat);

            this.view1.addChild3D(new AxisMesh(200));

            this.particle.play();
            this.view1.addChild3D(this.particle);

            
           
            //this.particle.followTarget = this.cube ;


            var vv: HTMLInputElement = <HTMLInputElement>document.createElement("input");
            vv.type = "submit";
            vv.value = "rest";
            document.body.appendChild(vv);
            vv.onmousedown = (e: MouseEvent) => this.mouseDown(e);

            var loadtex: URLLoader = new URLLoader("resource/effect/rect.png");
            loadtex.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onLoadTexture, this);
            loadtex["mat"] = mat;
        }
        protected onLoadTexture(e: LoaderEvent3D) {
            e.loader["mat"].diffuseTexture = e.loader.data;
        }

        protected mouseDown(e: MouseEvent) {
            this.particle.play();
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

            this.cube.rotationX = 0;
            this.cube.rotationY = 90;
            this.cube.rotationZ = this.angle * 1000;
        }

    }
} 