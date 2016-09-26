module egret3d {
    export class Class_ParticleModelEmitter extends Class_View3D {

        protected view1: View3D;
        protected mesh: Mesh;
        protected cameraCrl: LookAtController;
        private particle: ParticleEmitter;
        private texture: ITexture;
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

            this.cameraCrl = new LookAtController(this.view1.camera3D, new Object3D());
            this.cameraCrl.distance = 1000;


            var loadtex: URLLoader = new URLLoader("resource/scene/particle/vase_round.png");
            loadtex.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onLoadTexture1, this);

        }

        private onLoadTexture1(e: LoaderEvent3D): void {
            this.texture = e.loader.data;
            this.initMesh();
        }
        private onModelLoaded(e: LoaderEvent3D): void {
            var geo: Geometry = e.loader.data;
            //particle
            //this.mesh = new Mesh(new CubeGeometry(60, 60, 60));
            //this.mesh = new Mesh(new PlaneGeometry(100, 100));
            //this.mesh = new Mesh(new SphereGeometry(50));

            var meshMat: TextureMaterial = new TextureMaterial();
            meshMat.bothside = false;
            meshMat.ambientColor = 0x808080;
            meshMat.diffuseColor = 0x808080;
            meshMat.blendMode = BlendMode.NORMAL;
            meshMat.diffuseTexture = this.texture;

            this.mesh = new Mesh(geo, meshMat);
            this.view1.addChild3D(this.mesh);


            var mat: TextureMaterial = new TextureMaterial();
            mat.bothside = true;
            mat.ambientColor = 0xffffff;
            mat.blendMode = BlendMode.ADD;

            var data: ParticleData = new ParticleData();
            data.geometry.planeW = data.geometry.planeH = 12;

            var shape: ParticleDataShape = data.shape;
            shape.type = ParticleDataShapeType.Mesh;
            shape.meshType = ParticleMeshShapeType.Vertex;

            shape.meshFile = "test";
            shape.geometry = this.mesh.geometry;

            var life: ParticleDataLife = data.life;
            life.max = 4;
            life.min = 4;
            life.duration = 4;
            life.delay = 0;
            life.loop = true;

            var emission: ParticleDataEmission = data.emission;
            emission.rate = 100;

            var property: ParticleDataProperty = data.property;
            property.particleCount = 600;
            property.bounds.setTo(MathUtil.MAX_VALUE, MathUtil.MAX_VALUE, MathUtil.MAX_VALUE);

            //property.renderMode = ParticleRenderModeType.StretchedBillboard;
            property.colorConst1.setTo(255, 255, 255, 255);
            property.colorConst2.setTo(255, 255, 255, 255);


            var speed: ParticleDataMoveSpeed = data.moveSpeed;
            speed.max = 1;
            speed.min = 1;

            var colorOffset: ParticleDataColorOffset = new ParticleDataColorOffset();
            data.colorOffset = colorOffset;

            colorOffset.data.colors.push(new Color(255.0, 255.0, 255.0, 0.0));

            colorOffset.data.colors.push(new Color(255.0, 0.0, 0.0, 255.0));
            colorOffset.data.colors.push(new Color(0.0, 255.0, 0.0, 255.0));
            colorOffset.data.colors.push(new Color(0.0, 0.0, 255.0, 255.0));


            colorOffset.data.colors.push(new Color(255.0, 255.0, 255.0, 255.0));
            colorOffset.data.colors.push(new Color(255.0, 255.0, 255.0, 0.0));

            colorOffset.data.times.push(0.0);

            colorOffset.data.times.push(0.2);
            colorOffset.data.times.push(0.4);
            colorOffset.data.times.push(0.6);

            colorOffset.data.times.push(0.8);
            colorOffset.data.times.push(1.0);

            //var sizeBezier: ParticleDataScaleBezier = new ParticleDataScaleBezier();
            //data.scaleBezier = sizeBezier;

            //sizeBezier.data.posPoints.push(new Point(0, 0));
            //sizeBezier.data.posPoints.push(new Point(0.4, 2));
            //sizeBezier.data.posPoints.push(new Point(0.4, 2));
            //sizeBezier.data.posPoints.push(new Point(1.0, 0.2));

            //sizeBezier.data.ctrlPoints.push(new Point(0, 1));
            //sizeBezier.data.ctrlPoints.push(new Point(0.3, 2));
            //sizeBezier.data.ctrlPoints.push(new Point(0.6, 2));
            //sizeBezier.data.ctrlPoints.push(new Point(1.0, 0.2));


            data.validate();
            this.particle = new ParticleEmitter(data, mat);
            this.particle.play();

            this.view1.addChild3D(this.particle);
            //this.view1.addChild3D(new AxisMesh(200));


            var loadtex: URLLoader = new URLLoader("resource/effect/glow_0005.png");
            loadtex.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onLoadTexture, this);
            loadtex["mat"] = mat;



            var vv: HTMLInputElement = <HTMLInputElement>document.createElement("input");
            vv.type = "submit";
            vv.value = "rest";
            document.body.appendChild(vv);
            vv.onmousedown = (e: MouseEvent) => this.mouseDown(e);

        }


        private initMesh(): void {
          
            var modelLoader: URLLoader = new URLLoader("resource/scene/particle/0_Object001.esm");
            modelLoader.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onModelLoaded, this);
        }

        protected mouseDown(e: MouseEvent) {
            this.particle.play();
        }

        protected onLoadTexture(e: LoaderEvent3D) {
            e.loader["mat"].diffuseTexture = e.loader.data;
        }

        private angle: number = 0;
        public update(e: Event3D) {
            this.cameraCrl.update();
            if (this.mesh && this.particle) {
                this.angle += 0.2;
                this.mesh.rotationZ = this.particle.rotationZ = this.angle;
            }
        }

    }
} 