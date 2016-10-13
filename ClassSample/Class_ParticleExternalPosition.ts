module egret3d {
    export class Class_ParticleExternalPosition extends Class_View3D {

        protected view1: View3D;
        protected cameraCrl: LookAtController;
        private particle: ParticleEmitter;

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

            //这里生成了位置列表
            var count: number = 50;
            var posList: Vector3D[] = [];
            var pt: Vector3D;
            for (var i: number = 0; i < count; i++) {
                pt = new Vector3D();
                pt.x = 2 * (i - count / 2);
                pt.y = 2 * (count / 2) * Math.sin(i / count * 2 * Math.PI);
                posList.push(pt);
            }
            //
            this.initParticle(count, posList);
        }


        private initParticle(count: number, posList:Vector3D[]): void {

            var mat: TextureMaterial = new TextureMaterial();
            mat.bothside = true;
            mat.ambientColor = 0xffffff;
            mat.blendMode = BlendMode.ADD;

            var data: ParticleData = new ParticleData();
            data.geometry.planeW = data.geometry.planeH = 12;


            var life: ParticleDataLife = data.life;
            life.type = ParticleValueType.RandomConst;
            life.max = 1;
            life.min = 1;
            life.duration = 1;
            life.delay = 0;
            life.loop = true;

            var emission: ParticleDataEmission = data.emission;
            emission.rate = 0;

            emission.bursts = [new Point(0, count)];

            var property: ParticleDataProperty = data.property;
            property.particleCount = count;
            property.bounds.setTo(MathUtil.MAX_VALUE, MathUtil.MAX_VALUE, MathUtil.MAX_VALUE);
            property.renderMode = ParticleRenderModeType.Billboard;
            property.stayAtEnd = true;

            property.colorConst1.setTo(255, 255, 255, 255);
            property.colorConst2.setTo(255, 255, 255, 255);

            var shape: ParticleDataShape = data.shape;
            shape.type = ParticleDataShapeType.External;
            shape.externalPositionList = posList;

            var sheetTexture: ParticleDataTextureSheet = data.textureSheet = new ParticleDataTextureSheet();
            sheetTexture.tileX = 8.0;
            sheetTexture.tileY = 1.0;
            sheetTexture.whole = true;
            sheetTexture.randomRow = false;
            sheetTexture.row = 0.0;
            sheetTexture.frameType = ParticleValueType.RandomConst;
            sheetTexture.min = 0.0;
            sheetTexture.max = 7.0;
            sheetTexture.circles = 1.0;




            data.validate();
            this.particle = new ParticleEmitter(data, mat);
            this.particle.play();

            this.view1.addChild3D(this.particle);
            this.view1.addChild3D(new AxisMesh(200));


            var loadtex: URLLoader = new URLLoader("resource/starWalk/effect_8.png");
            loadtex.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onLoadTexture, this);
            loadtex["mat"] = mat;



            var vv: HTMLInputElement = <HTMLInputElement>document.createElement("input");
            vv.type = "submit";
            vv.value = "rest";
            document.body.appendChild(vv);
            vv.onmousedown = (e: MouseEvent) => this.mouseDown(e);

        }



        protected mouseDown(e: MouseEvent) {
            this.particle.animation.animTime = 0.0;
        }

        protected onLoadTexture(e: LoaderEvent3D) {
            e.loader["mat"].diffuseTexture = e.loader.data;
        }

        private angle: number = 0;
        public update(e: Event3D) {
            this.cameraCrl.update();

        }

    }
} 